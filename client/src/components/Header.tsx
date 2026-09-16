// client/src/components/Header.tsx
import React from 'react';
import Navbar from './Navbar';
//import { Link } from 'react-router-dom'; // Use Link for internal navigation

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="header-content">
        <h3 className="site-title">   Will Spichiger's Personal Site</h3>
      </div>
      {/* You can add more navigation links here if needed, or keep them in App.tsx */}
      {/* The Navbar component is now part of the Header */}
      <Navbar />
    </header>
  );
};

export default Header;