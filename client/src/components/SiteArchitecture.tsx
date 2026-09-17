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

const writeupContent = `
This site is a static React application, but "static" undersells what's actually happening behind it. There are two distinct flows worth separating: what happens when I push a change, and what happens when someone visits the site. The diagram above splits along exactly that line.

## Deploy Pipeline (CI/CD)

The source lives in a GitHub repository, built with React, TypeScript, and Vite. Every push to the \`main\` branch triggers a GitHub Actions workflow that does the actual work of getting code onto the internet: it installs dependencies, runs the Vite build (which compiles and bundles everything into static HTML/CSS/JS), then syncs the output directly into an S3 bucket with \`aws s3 sync --delete\`, so the bucket always mirrors exactly what was just built, nothing stale left behind.

That workflow authenticates to AWS using an IAM user scoped specifically for deployment, with an access key stored as a GitHub Actions secret rather than anywhere in the codebase itself. A handful of other secrets travel the same way: the Google Maps API key gets baked into the build at compile time (more on that below), and a CloudFront distribution ID tells the final step of the workflow which cache to invalidate.

That last part matters more than it sounds like it should. A CDN's entire job is to cache aggressively, which means a fresh deploy is invisible to visitors until the old cached version expires — unless the pipeline explicitly tells CloudFront "throw out everything, the origin has new content." So the workflow's last step runs \`aws cloudfront create-invalidation --paths "/*"\` right after the S3 sync, which is what makes "push to main" actually mean "live in under a minute" instead of "live eventually."

## Runtime Request Flow

When someone actually loads the site, none of the above is involved — it's a separate, much simpler path. A request for \`williamtaylorspichiger.com\` hits Route 53, which resolves it via an alias record straight to a CloudFront distribution rather than to S3 directly. That distinction is the whole reason this site has HTTPS at all: S3 has no way to terminate TLS for a custom domain on its own, so CloudFront sits in front of it specifically to hold the certificate (issued through AWS Certificate Manager) and handle the HTTPS handshake before anything reaches the origin.

From there, CloudFront fetches the actual files from the S3 bucket using Origin Access Control, a signed-request mechanism that lets CloudFront read from the bucket while the bucket itself stays completely private — no public access, no public bucket policy, nothing reachable directly. Visitors only ever talk to CloudFront; S3 is invisible to them.

CloudFront also carries a routing rule that's easy to overlook but necessary for a React app: since this is a single-page application using client-side routing (\`/books\`, \`/notes\`, \`/travel\`), a hard refresh or direct link to one of those paths has no matching object in S3 — there's no literal file at \`/books\`. CloudFront is configured to catch that 403/404 and serve \`index.html\` instead, letting React Router take over and render the right page client-side. Without that rule, every route except the homepage would 404 on a direct load.

## Google Maps Integration

The Travel page is the one part of the site that talks to something outside this AWS setup entirely. It renders GPX ride data on an interactive map using the Google Maps JavaScript API, and that call happens directly from the visitor's browser once the page has loaded — it doesn't route through CloudFront, S3, or any AWS resource. The only place AWS touches this at all is upstream, at build time: the API key is stored as a GitHub Actions secret and injected into the bundle when Vite builds the app, so it's compiled into the static JavaScript that eventually ships to the browser, which is what the browser then uses to authenticate its own requests to Google directly.

## Infrastructure, Regions, and Availability Zones

It's worth being explicit about where things actually live, because this architecture ends up mostly sidestepping the region/AZ question that a more traditional server-based setup has to deal with constantly.

The two resources that are pinned to a specific region are the S3 bucket and the ACM certificate, both in \`us-east-1\` (N. Virginia). The certificate has to be there specifically — CloudFront only accepts ACM certificates issued in \`us-east-1\`, regardless of where visitors are. S3, meanwhile, doesn't expose Availability Zones as something to choose at all: every object written to the bucket is automatically stored across at least three AZs within the region as part of how S3 works, so there's no single-AZ failure mode to worry about and nothing to configure for it.

CloudFront, Route 53, and IAM aren't regional at all. CloudFront runs across AWS's global edge network — over 400 points of presence — and serves each visitor from whichever edge location is closest to them, not from \`us-east-1\`. Route 53 is a globally distributed DNS service by design. IAM is a global service too; the IAM user used for deploys isn't tied to any region. So in practice, "where does this site run" doesn't really have a single answer — the only genuinely regional piece is the S3 bucket sitting quietly behind a global CDN.

One infrastructure note worth flagging: there's a small recurring AWS charge, around $3.60/month, coming from a VPC. Nothing in this architecture — S3, CloudFront, Route 53 — actually requires a VPC, EC2 instance, or NAT Gateway to function, so this is almost certainly a leftover resource in the default VPC rather than something intentionally part of the site. The price point is a strong hint at what it is: a single unattached Elastic IP address bills at roughly $0.005/hour, which works out to about $3.65/month — a near-exact match. A NAT Gateway, by contrast, would run closer to $32+/month just in hourly charges, so this isn't that. The fix is a quick check in the VPC console under Elastic IPs (and NAT Gateways, just to be safe) for anything unattached, and releasing it.

## Why It's Built This Way

The short version: static hosting is cheap and simple, but a plain S3 bucket can't do HTTPS on a custom domain, can't cache at the edge, and either has to be public or unreachable. Putting CloudFront in front of it solves all three at once — TLS termination, global caching, and a private origin — for a site that's otherwise about as simple as it gets. The CI/CD side exists so that "simple" doesn't mean "manual": every change ships the same way, gets validated by the same build step, and invalidates the same cache, without me ever running an AWS CLI command by hand.
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
      <div ref={diagramHostRef} className="architecture-diagram-container" />
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{writeupContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default SiteArchitecture;
