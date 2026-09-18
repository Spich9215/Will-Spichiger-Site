// client/src/components/SiteArchitecture.tsx
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { siteArchitectureDiagramXml } from '../data/site-architecture-diagram';
import './SiteArchitecture.css';

// GLOBAL flag mirroring the pattern in Map.tsx: append the diagrams.net viewer
// script to the DOM at most once, even across remounts in React Strict Mode.
let isDrawioViewerScriptAppended = false;

declare global {
  interface Window {
    GraphViewer?: {
      processElements: () => void;
    };
  }
}

const notesContent = `
## How I Built This Site

This section details the technologies and tools used in the creation and deployment of this website.

### AWS Infrastructure & Tools
* **AWS Route 53**: Registers and manages the site's domain, routing \`williamtaylorspichiger.com\` to CloudFront via a DNS alias record.
* **AWS S3**: Stores the built static site files (HTML/CSS/JS) as a private origin bucket — nothing in it is reachable directly by visitors.
* **AWS CloudFront**: A global CDN in front of S3 that terminates HTTPS, caches content at edge locations worldwide, and falls back to \`index.html\` so client-side routes work on a direct load.
* **AWS Certificate Manager (ACM)**: Issues and manages the TLS certificate (in \`us-east-1\`, as CloudFront requires) that lets the site serve HTTPS on a custom domain.
* **AWS IAM**: Provides a deploy-scoped user whose access keys, stored only as a GitHub Actions secret, let the CI pipeline authenticate to AWS without broad account access.

### Accessing External Systems
* **Google Maps JavaScript API**: Renders GPX ride data as an interactive map on the Travel page. The call happens directly from the visitor's browser, using an API key baked into the build.
* **Goodreads RSS Feed**: Goodreads retired its public API in 2020, so a prebuild script fetches their still-public per-shelf RSS feed to pull my "read" shelf automatically before every build, keeping the Books page current without manual edits.

### Software Solutions
* **Vite & React**: The core frontend framework and build tool — Vite compiles and bundles the TypeScript/React source into the static HTML/CSS/JS that ships to visitors.
* **GitHub Actions**: Automates the deploy pipeline end to end — installing dependencies, running the build, syncing output to S3, and invalidating the CloudFront cache on every push to \`main\`. Secrets (AWS keys, the Maps API key, the CloudFront distribution ID) are stored as encrypted GitHub Actions secrets rather than in the codebase.
`;

const writeupContent = `
This site is a static React application. Two flows matter: what happens when I push a change, and what happens when someone visits — the diagram above splits along that line.

## Deploy Pipeline (CI/CD)

Every push to \`main\` triggers a GitHub Actions workflow: install dependencies, run the Vite build, then \`aws s3 sync --delete\` the output into the S3 bucket so it always mirrors exactly what was just built. The workflow authenticates as an IAM user scoped to deployment, with its access key — plus the Google Maps API key and the CloudFront distribution ID — stored as GitHub Actions secrets rather than in the codebase. The last step runs \`aws cloudfront create-invalidation --paths "/*"\`, so a fresh deploy doesn't sit invisible behind CloudFront's cache until it expires on its own.

## Runtime Request Flow

A request for \`williamtaylorspichiger.com\` hits Route 53, which aliases straight to CloudFront — the reason this site has HTTPS at all, since S3 can't terminate TLS for a custom domain on its own. CloudFront holds the ACM certificate, fetches files from S3 over Origin Access Control (so the bucket itself stays completely private), and falls back to \`index.html\` on a 403/404 so direct links to client-side routes like \`/books\` don't 404.

## Google Maps Integration

The Travel page is the one part that talks outside this AWS setup: it calls the Google Maps JavaScript API directly from the visitor's browser to render GPX ride data. AWS's only role is upstream — the API key is a GitHub Actions secret baked into the bundle at build time.

## Infrastructure, Regions & Availability Zones

Only the S3 bucket and ACM certificate are pinned to a region (\`us-east-1\`, since CloudFront requires ACM certs there); S3 spreads objects across 3+ AZs automatically. CloudFront, Route 53, and IAM are all global services. One flag: a ~$3.60/month charge is almost certainly an idle, unattached Elastic IP in the default VPC (nothing here needs a VPC, EC2, or NAT Gateway) — worth releasing from the VPC console.

## Why It's Built This Way

A plain S3 bucket can't do HTTPS on a custom domain, can't cache at the edge, and has to be public or unreachable. CloudFront in front of it solves all three at once. The CI/CD pipeline exists so "simple" doesn't mean "manual" — every change ships, builds, and invalidates the cache the same way, without a manual AWS CLI command.
`;

const SiteArchitecture: React.FC = () => {
  const diagramHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = 'drawio-viewer-script';

    const renderDiagram = () => {
      const host = diagramHostRef.current;
      if (!host || !window.GraphViewer) return;

      host.innerHTML = '';
      const diagramEl = document.createElement('div');
      diagramEl.className = 'mxgraph';
      diagramEl.style.maxWidth = '100%';
      diagramEl.setAttribute(
        'data-mxgraph',
        JSON.stringify({
          highlight: '#0000ff',
          lightbox: true,
          nav: false,
          resize: true,
          toolbar: 'zoom lightbox',
          edit: '_blank',
          xml: siteArchitectureDiagramXml,
        })
      );
      host.appendChild(diagramEl);
      window.GraphViewer.processElements();
    };

    if (!isDrawioViewerScriptAppended && !document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://viewer.diagrams.net/js/viewer-static.min.js';
      script.async = true;
      script.onload = renderDiagram;
      document.body.appendChild(script);
      isDrawioViewerScriptAppended = true;
    } else {
      renderDiagram();
    }
  }, []);

  return (
    <div className="page-content site-architecture-page">
      <h2>Site Architecture</h2>
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{notesContent}</ReactMarkdown>
      </div>
      <div ref={diagramHostRef} className="architecture-diagram-container" />
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{writeupContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default SiteArchitecture;
