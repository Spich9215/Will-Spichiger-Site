# Site Architecture

This site is a static React application. Two flows matter: what happens when I push a change, and what happens when someone visits — the diagram splits along that line.

## Deploy Pipeline (CI/CD)

Every push to `main` triggers a GitHub Actions workflow: install dependencies, run the Vite build, then `aws s3 sync --delete` the output into the S3 bucket so it always mirrors exactly what was just built. The workflow authenticates as an IAM user scoped to deployment, with its access key — plus the Google Maps API key and the CloudFront distribution ID — stored as GitHub Actions secrets rather than in the codebase. The last step runs `aws cloudfront create-invalidation --paths "/*"`, so a fresh deploy doesn't sit invisible behind CloudFront's cache until it expires on its own.

## Runtime Request Flow

A request for `williamtaylorspichiger.com` hits Route 53, which aliases straight to CloudFront — the reason this site has HTTPS at all, since S3 can't terminate TLS for a custom domain on its own. CloudFront holds the ACM certificate, fetches files from S3 over Origin Access Control (so the bucket itself stays completely private), and falls back to `index.html` on a 403/404 so direct links to client-side routes like `/books` don't 404.

## Google Maps Integration

The Travel page is the one part that talks outside this AWS setup: it calls the Google Maps JavaScript API directly from the visitor's browser to render GPX ride data. AWS's only role is upstream — the API key is a GitHub Actions secret baked into the bundle at build time.

## Infrastructure, Regions & Availability Zones

Only the S3 bucket and ACM certificate are pinned to a region (`us-east-1`, since CloudFront requires ACM certs there); S3 spreads objects across 3+ AZs automatically. CloudFront, Route 53, and IAM are all global services. One flag: a ~$3.60/month charge is almost certainly an idle, unattached Elastic IP in the default VPC (nothing here needs a VPC, EC2, or NAT Gateway) — worth releasing from the VPC console.

## Why It's Built This Way

A plain S3 bucket can't do HTTPS on a custom domain, can't cache at the edge, and has to be public or unreachable. CloudFront in front of it solves all three at once. The CI/CD pipeline exists so "simple" doesn't mean "manual" — every change ships, builds, and invalidates the cache the same way, without a manual AWS CLI command.
