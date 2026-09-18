// client/src/data/book-quotes.ts
// Data source for the Book Quotes & Interpretations page. Add a new object
// to this array for each quote you want to feature.

export interface BookQuote {
  id: string;
  bookTitle: string;
  author: string;
  quote: string;
  interpretation: string;
}

export const bookQuotes: BookQuote[] = [];
