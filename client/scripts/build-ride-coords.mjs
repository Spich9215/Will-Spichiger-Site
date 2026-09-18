#!/usr/bin/env node
// client/scripts/build-ride-coords.mjs
//
// Pre-parses every GPX file listed in public/gpxFiles.json into plain
// {lat, lng} coordinate arrays and writes them, keyed by ride id, to
// public/ride-coords.json.
//
// Why: the Travel page used to have the browser fetch and XML-parse 30+
// individual GPX files on every visit. This script does that work once at
// build time instead, so the site ships a single pre-parsed JSON file that
// the browser fetches once and that S3/CloudFront can cache like any other
// static asset.
//
// Wired in as an npm "pre" hook (see package.json's "predev" and "prebuild"
// scripts) alongside fetch-goodreads.mjs, so it stays in sync automatically
// whenever GPX files are added, removed, or replaced.

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const GPX_FILES_MANIFEST = path.join(PUBLIC_DIR, 'gpxFiles.json');
const OUTPUT_PATH = path.join(PUBLIC_DIR, 'ride-coords.json');

// Matches each <trkpt lat="..." lon="..."> opening tag regardless of
// attribute order or surrounding whitespace/namespace prefixes, mirroring
// what the old browser-side `getElementsByTagName('trkpt')` picked up.
const TRKPT_TAG_REGEX = /<trkpt\b([^>]*)>/g;
const LAT_ATTR_REGEX = /\blat="([^"]+)"/;
const LON_ATTR_REGEX = /\blon="([^"]+)"/;

function parseTrackPoints(gpxText) {
  const coords = [];
  let match;
  while ((match = TRKPT_TAG_REGEX.exec(gpxText))) {
    const attrs = match[1];
    const lat = parseFloat(LAT_ATTR_REGEX.exec(attrs)?.[1] ?? '');
    const lng = parseFloat(LON_ATTR_REGEX.exec(attrs)?.[1] ?? '');
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) coords.push({ lat, lng });
  }
  return coords;
}

async function main() {
  const manifest = JSON.parse(await readFile(GPX_FILES_MANIFEST, 'utf-8'));
  const rideCoords = {};

  for (const ride of manifest) {
    const relativePath = decodeURIComponent(ride.file).replace(/^\//, '');
    const filePath = path.join(PUBLIC_DIR, relativePath);

    try {
      const gpxText = await readFile(filePath, 'utf-8');
      const coords = parseTrackPoints(gpxText);
      if (!coords.length) {
        console.warn(`[build-ride-coords] No track points found in "${relativePath}"`);
      }
      rideCoords[ride.id] = coords;
    } catch (e) {
      console.error(`[build-ride-coords] Failed to read/parse "${relativePath}": ${e.message}`);
    }
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(rideCoords), 'utf-8');
  const totalPoints = Object.values(rideCoords).reduce((sum, c) => sum + c.length, 0);
  console.log(
    `[build-ride-coords] Wrote ${Object.keys(rideCoords).length} rides (${totalPoints} points) to ${path.relative(
      process.cwd(),
      OUTPUT_PATH
    )}`
  );
}

main();
