// client/src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming App.css contains your nav styling

const Navbar: React.FC = () => {
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
        <li className="nav-item">
          <Link to="/books" className="nav-link">Books</Link>
        </li>
        <li className="nav-item">
          <Link to="/notes" className="nav-link">Notes & Features</Link>
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
            aria-label="View Resume/CV (opens in new tab)" // More descriptive for screen readers
          >
            Resume/CV
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;