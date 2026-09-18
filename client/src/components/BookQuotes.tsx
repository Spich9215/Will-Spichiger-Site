// client/src/components/BookQuotes.tsx
import React from 'react';
import { bookQuotes } from '../data/book-quotes';
import './Books.css';

const BookQuotes: React.FC = () => {
  return (
    <div className="page-content books-page">
      <h2>Book Quotes &amp; Interpretations</h2>
      <p className="books-intro">
        Passages from books I've read that stuck with me, along with what I took from them.
      </p>

      {bookQuotes.length === 0 ? (
        <p className="books-empty">No quotes added yet — check back soon.</p>
      ) : (
        <div className="book-quotes-list">
          {bookQuotes.map((entry) => (
            <blockquote key={entry.id} className="book-quote-entry">
              <p className="book-quote-text">&ldquo;{entry.quote}&rdquo;</p>
              <cite className="book-quote-source">
                {entry.bookTitle} &middot; {entry.author}
              </cite>
              <p className="book-quote-interpretation">{entry.interpretation}</p>
            </blockquote>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookQuotes;
