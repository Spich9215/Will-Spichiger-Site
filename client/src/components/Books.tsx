// client/src/components/Books.tsx
import React from 'react';
// No need to import App.css here, it's imported in App.tsx and applies globally

const Books: React.FC = () => {
  return (
    <div className="page-content">
      <h2>Books I've Read 📚</h2>
      <p>
        This page will eventually call the Goodreads API to display a list of books I've read,
        perhaps with some personal commentary on each.
      </p>
      <ul>
        <li>Book Title 1</li>
        <li>Book Title 2</li>
        <li>Book Title 3</li>
      </ul>
      {/* Placeholder for Goodreads API integration */}
    </div>
  );
};

export default Books;