// client/src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <span>Email: wspichiger@gmail.com</span>
      <br></br>
      <span>Cell: 973-477-0893</span>
      <p>&copy; {new Date().getFullYear()} Will Spichiger. All rights reserved.</p>
    </footer>
  );
};

export default Footer;