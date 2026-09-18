// client/src/App.tsx
//import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import your page components
import Home from './components/Home';
import Books from './components/Books';
import Travel from './components/Travel';
import Credentials from './components/Credentials';
import SiteArchitecture from './components/SiteArchitecture';

// Import your layout components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      {/* All content must be wrapped in a single element */}
      <div id="root-container"> {/* You might want to style this container in App.css */}
        <Header />

        {/* .content-area has padding-top: var(--header-height) in App.css to clear
            the fixed nav bar in Header, so it doesn't need an inline offset here. */}
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/credentials" element={<Credentials />} />
            <Route path="/architecture" element={<SiteArchitecture />} />
            {/* Notes & Features content now lives at the top of the Architecture page */}
            <Route path="/notes" element={<Navigate to="/architecture" replace />} />
            {/* You might want a 404 page for unmatched routes */}
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
