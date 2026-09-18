// client/src/components/Navbar.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming App.css contains your nav styling

const Navbar: React.FC = () => {
  const [booksMenuOpen, setBooksMenuOpen] = useState(false);
  const booksItemRef = useRef<HTMLLIElement>(null);

  // Close the Books dropdown on outside click/tap, so it behaves the same
  // on touch devices as it does with a mouse.
  useEffect(() => {
    if (!booksMenuOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (booksItemRef.current && !booksItemRef.current.contains(e.target as Node)) {
        setBooksMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [booksMenuOpen]);

  return (
    // Use a <nav> element for semantic meaning
    // aria-label provides a descriptive name for the navigation region for screen readers
    <nav className="main-nav" aria-label="Main website navigation">
      {/* Use an unordered list for a group of navigation links */}
      <ul className="nav-list">
        <li className="nav-item">
          {/* Link component for internal routing */}
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item nav-item-dropdown" ref={booksItemRef}>
          <span className="nav-dropdown-trigger">
            <Link to="/books" className="nav-link">Books</Link>
            <button
              type="button"
              className="nav-dropdown-toggle"
              onClick={() => setBooksMenuOpen((open) => !open)}
              aria-expanded={booksMenuOpen}
              aria-label="Toggle Books submenu"
            >
              &#9662;
            </button>
          </span>
          {booksMenuOpen && (
            <ul className="nav-dropdown-menu">
              <li>
                <Link
                  to="/books/quotes"
                  className="nav-link"
                  onClick={() => setBooksMenuOpen(false)}
                >
                  Quotes &amp; Interpretations
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <Link to="/credentials" className="nav-link">Credentials</Link>
        </li>
        <li className="nav-item">
          <Link to="/architecture" className="nav-link">Site Architecture</Link>
        </li>
        <li className="nav-item">
          <Link to="/travel" className="nav-link">Travel</Link>
        </li>
        <li className="nav-item">
          {/* Regular <a> tag for external links, with target="_blank" for new tab
              rel="noopener noreferrer" is important for security when using target="_blank" */}
          <a
            href="/william-spichiger-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            aria-label="View Resume (opens in new tab)" // More descriptive for screen readers
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
