// client/src/components/Header.tsx
import React, { useLayoutEffect, useRef } from 'react';
import Navbar from './Navbar';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);

  // Keeps --header-height in sync with the header's actual rendered height,
  // so page content always sits exactly below it (never too far, never
  // tucked underneath) whether the nav is one row on desktop or wraps to
  // two/three rows on a narrow phone screen.
  useLayoutEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty('--header-height', `${headerEl.offsetHeight}px`);
    };

    syncHeaderHeight();
    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(headerEl);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="header-container" ref={headerRef}>
      {/* The site title now lives on the Home page only (see Home.tsx).
          This fixed header just holds the nav bar so it stays pinned
          to the top of the viewport on every page while scrolling. */}
      <Navbar />
    </header>
  );
};

export default Header;
