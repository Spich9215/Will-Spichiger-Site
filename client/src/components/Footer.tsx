// client/src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <p>&copy; {new Date().getFullYear()} Will Spichiger. All rights reserved.</p>
      <p>Glen Rock, New Jersey, USA</p>
    </footer>
  );
};

export default Footer;