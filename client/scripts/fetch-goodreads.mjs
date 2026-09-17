#!/usr/bin/env node
// client/scripts/fetch-goodreads.mjs
//
// Fetches Will's "read" shelf from Goodreads' public per-shelf RSS feed and
// writes the result to ../src/data/goodreads-books.json for the Books page.
//
// IMPORTANT: this is NOT the official Goodreads API. Goodreads retired that
// for new developers in December 2020 and never brought it back. This uses
// the same undocumented, unauthenticated per-shelf RSS feed that Goodreads
// still serves for public profiles (https://www.goodreads.com/review/list_rss/...).
// It can break or get bot-blocked without notice.
//
// This script is wired in as an npm "pre" hook (see package.json's "predev"
// and "prebuild" scripts), so npm runs it automatically before both
// `npm run dev` and `npm run build` -- no CI workflow changes needed.
//
// If the fetch fails (Goodreads outage, network hiccup, bot-detection block),
// this script leaves the existing goodreads-books.json alone instead of
// failing the build, so the site keeps showing the last successfully fetched
// list rather than breaking the deploy.

import { writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'goodreads-books.json');

const GOODREADS_USER_ID = '22527950';
const SHELF = 'read';
const MAX_PAGES = 25; // safety cap so a feed bug can't loop forever

// parseTagValue: false keeps every tag's text as a raw string -- otherwise
// fast-xml-parser auto-converts numeric-looking text to numbers, which
// silently strips leading zeros from ISBNs (e.g. "0156012952" -> 156012952).
// Numeric fields we actually want as numbers go through toNumber() below.
const parser = new XMLParser({ ignoreAttributes: true, parseTagValue: false });

function toNumber(value) {
  if (value === undefined || value === null || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function toIsoDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function normalizeItem(item) {
  const numPages =
    item.book && typeof item.book === 'object' ? item.book.num_pages : undefined;

  return {
    id: String(item.book_id ?? item.guid ?? item.link ?? `${item.title}-${item.author_name}`),
    title: String(item.title ?? '').trim(),
    author: String(item.author_name ?? '').trim(),
    isbn: item.isbn ? String(item.isbn) : null,
    averageRating: toNumber(item.average_rating),
    userRating: toNumber(item.user_rating) || null,
    numPages: toNumber(numPages),
    publishedYear: toNumber(item.book_published),
    dateRead: toIsoDate(item.user_read_at),
    dateAdded: toIsoDate(item.user_date_added),
    coverImageUrl:
      item.book_large_image_url || item.book_medium_image_url || item.book_image_url || null,
    goodreadsUrl: String(item.link ?? ''),
  };
}

async function fetchPage(page) {
  const url = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=${encodeURIComponent(
    SHELF
  )}&page=${page}`;

  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; personal-site-build/1.0; +https://williamtaylorspichiger.com)',
      Accept: 'application/rss+xml, application/xml, text/xml, */*',
    },
  });

  if (!res.ok) {
    throw new Error(`Goodreads returned HTTP ${res.status} for page ${page}`);
  }

  const xml = await res.text();
  const parsed = parser.parse(xml);
  const items = parsed?.rss?.channel?.item;

  if (!items) return [];
  return Array.isArray(items) ? items : [items];
}

async function fetchAllBooks() {
  const books = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const items = await fetchPage(page);
    if (items.length === 0) break;
    books.push(...items.map(normalizeItem));
  }
  return books;
}

function sortByDateReadDesc(books) {
  return [...books].sort((a, b) => {
    if (a.dateRead && b.dateRead) return b.dateRead.localeCompare(a.dateRead);
    if (a.dateRead) return -1;
    if (b.dateRead) return 1;
    return a.title.localeCompare(b.title);
  });
}

async function writeOutput(payload) {
  await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf-8');
}

async function main() {
  try {
    console.log(`[fetch-goodreads] Fetching "${SHELF}" shelf for user ${GOODREADS_USER_ID}...`);
    const books = sortByDateReadDesc(await fetchAllBooks());

    if (books.length === 0) {
      console.warn(
        '[fetch-goodreads] Feed returned zero books -- leaving the existing data file untouched.'
      );
      if (!existsSync(OUTPUT_PATH)) {
        await writeOutput({ generatedAt: null, shelf: SHELF, count: 0, books: [] });
      }
      return;
    }

    await writeOutput({
      generatedAt: new Date().toISOString(),
      shelf: SHELF,
      count: books.length,
      books,
    });

    console.log(
      `[fetch-goodreads] Wrote ${books.length} books to ${path.relative(process.cwd(), OUTPUT_PATH)}`
    );
  } catch (err) {
    console.warn(`[fetch-goodreads] Failed to refresh Goodreads data: ${err.message}`);
    if (existsSync(OUTPUT_PATH)) {
      console.warn('[fetch-goodreads] Keeping the existing goodreads-books.json so the build can continue.');
    } else {
      console.warn('[fetch-goodreads] No existing data file found -- writing an empty placeholder.');
      await writeOutput({ generatedAt: null, shelf: SHELF, count: 0, books: [] });
    }
  }
}

main();
