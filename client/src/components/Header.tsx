// client/src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="header-content">
        <h1 className="site-title">Will Spichiger's Corner</h1>
        <div className="contact-info">
          <span>📧 [Your Email]</span>
          <span>📞 [Your Phone Number]</span>
        </div>
      </div>
      {/* You can add more navigation links here if needed, or keep them in App.tsx */}
    </header>
  );
};

export default Header;