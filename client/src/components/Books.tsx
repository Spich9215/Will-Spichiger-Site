// client/src/components/Books.tsx
import React, { useMemo, useState } from 'react';
import goodreadsData from '../data/goodreads-books.json';
import './Books.css';

interface GoodreadsBook {
  id: string;
  title: string;
  author: string;
  isbn: string | null;
  averageRating: number | null;
  userRating: number | null;
  numPages: number | null;
  publishedYear: number | null;
  dateRead: string | null;
  dateAdded: string | null;
  coverImageUrl: string | null;
  goodreadsUrl: string;
}

interface GoodreadsData {
  generatedAt: string | null;
  shelf: string;
  count: number;
  books: GoodreadsBook[];
}

const data = goodreadsData as GoodreadsData;

type SortKey = 'title' | 'author' | 'dateRead' | 'userRating';
type SortDirection = 'asc' | 'desc';

const formatDate = (iso: string | null): string => {
  if (!iso) return 'Not logged';
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const Stars: React.FC<{ rating: number | null }> = ({ rating }) => {
  if (!rating) return <span className="books-no-rating">&mdash;</span>;
  return (
    <span className="books-stars" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(Math.max(0, 5 - rating))}
    </span>
  );
};

const Books: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('dateRead');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selected, setSelected] = useState<GoodreadsBook | null>(null);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const rows = data.books.filter((b) => {
      if (!term) return true;
      return `${b.title} ${b.author}`.toLowerCase().includes(term);
    });

    const sorted = [...rows].sort((a, b) => {
      let comparison = 0;
      if (sortKey === 'dateRead') {
        comparison = (a.dateRead ?? '').localeCompare(b.dateRead ?? '');
      } else if (sortKey === 'userRating') {
        comparison = (a.userRating ?? 0) - (b.userRating ?? 0);
      } else {
        comparison = a[sortKey].localeCompare(b[sortKey]);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [searchTerm, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection(key === 'title' || key === 'author' ? 'asc' : 'desc');
    }
  };

  const sortIndicator = (key: SortKey) =>
    sortKey === key ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : '';

  return (
    <div className="page-content books-page">
      <h2>Books I've Read</h2>
      <p className="books-intro">
        Pulled automatically from my{' '}
        <a href="https://www.goodreads.com/user/show/22527950-will" target="_blank" rel="noopener noreferrer">
          Goodreads
        </a>{' '}
        "read" shelf on every site deploy. Click a cover to see it larger.
      </p>
      <blockquote className="books-quote">
        &ldquo;The end of man is knowledge, but there is one thing he can't know. He can't know whether knowledge
        will save him or kill him. He will be killed, all right, but he can't know whether he is killed because of
        the knowledge which he has got or because of the knowledge which he hasn't got and which if he had it,
        would save him.&rdquo;
        <cite> &mdash; Robert Penn Warren, All the King's Men</cite>
      </blockquote>

      {data.books.length === 0 ? (
        <p className="books-empty">
          Nothing here yet &mdash; this list refreshes automatically the next time the site is built.
        </p>
      ) : (
        <>
          <div className="books-controls">
            <input
              type="search"
              className="books-search"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search books"
            />
          </div>

          <p className="books-count">
            Showing {filtered.length} of {data.books.length} books
            {data.generatedAt && <> &middot; last updated {new Date(data.generatedAt).toLocaleDateString('en-US')}</>}
          </p>

          <div className="books-table-wrapper">
            <table className="books-table">
              <thead>
                <tr>
                  <th scope="col" className="books-icon-col">
                    Cover
                  </th>
                  <th scope="col" className="sortable" onClick={() => handleSort('title')}>
                    Title{sortIndicator('title')}
                  </th>
                  <th scope="col" className="sortable" onClick={() => handleSort('author')}>
                    Author{sortIndicator('author')}
                  </th>
                  <th scope="col" className="sortable" onClick={() => handleSort('dateRead')}>
                    Date Read{sortIndicator('dateRead')}
                  </th>
                  <th scope="col" className="sortable" onClick={() => handleSort('userRating')}>
                    My Rating{sortIndicator('userRating')}
                  </th>
                  <th scope="col">Pages</th>
                  <th scope="col">Link</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id || b.title}>
                    <td className="books-icon-col">
                      {b.coverImageUrl ? (
                        <button
                          type="button"
                          className="books-thumb-btn"
                          onClick={() => setSelected(b)}
                          aria-label={`Enlarge cover for ${b.title}`}
                        >
                          <img src={b.coverImageUrl} alt={`${b.title} cover`} />
                        </button>
                      ) : (
                        <span className="books-no-cover">&mdash;</span>
                      )}
                    </td>
                    <td>
                      <strong>{b.title}</strong>
                    </td>
                    <td>{b.author}</td>
                    <td>{formatDate(b.dateRead)}</td>
                    <td>
                      <Stars rating={b.userRating} />
                    </td>
                    <td>{b.numPages ?? '—'}</td>
                    <td>
                      {b.goodreadsUrl ? (
                        <a href={b.goodreadsUrl} target="_blank" rel="noopener noreferrer">
                          Goodreads
                        </a>
                      ) : (
                        <span className="books-no-link">&mdash;</span>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="books-empty-row">
                      No books match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {selected && (
        <div
          className="books-modal-overlay"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} cover`}
        >
          <div className="books-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="books-modal-close" onClick={() => setSelected(null)} aria-label="Close">
              &times;
            </button>
            {selected.coverImageUrl && <img src={selected.coverImageUrl} alt={`${selected.title} cover`} />}
            <div className="books-modal-details">
              <h3>{selected.title}</h3>
              <p>
                <strong>{selected.author}</strong>
                {selected.publishedYear && <> &middot; {selected.publishedYear}</>}
              </p>
              <p>
                Read {formatDate(selected.dateRead)} &middot; <Stars rating={selected.userRating} />
              </p>
              {selected.goodreadsUrl && (
                <a href={selected.goodreadsUrl} target="_blank" rel="noopener noreferrer">
                  View on Goodreads &rarr;
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
