// client/src/components/Header.tsx
import React from 'react';
//import { Link } from 'react-router-dom'; // Use Link for internal navigation

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="header-content">
        <h3 className="site-title">Will Spichiger's Personal Site</h3>
      </div>
      {/* You can add more navigation links here if needed, or keep them in App.tsx */}
    </header>
  );
};

export default Header;