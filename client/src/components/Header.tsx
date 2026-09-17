// client/src/components/Header.tsx
import React from 'react';
import Navbar from './Navbar';

const Header: React.FC = () => {
  return (
    <header className="header-container">
      {/* The site title now lives on the Home page only (see Home.tsx).
          This fixed header just holds the nav bar so it stays pinned
          to the top of the viewport on every page while scrolling. */}
      <Navbar />
    </header>
  );
};

export default Header;
