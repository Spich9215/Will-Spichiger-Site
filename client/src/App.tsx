// client/src/App.tsx
//import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import your page components
import Home from './components/Home';
import Books from './components/Books';
import Notes from './components/Notes';
import Travel from './components/Travel';

// Import your layout components
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar'; // Import the new Navbar component

function App() {
  return (
    <BrowserRouter>
      {/* All content must be wrapped in a single element */}
      <div id="root-container"> {/* You might want to style this container in App.css */}
        <Header />
        {/* Render the Navbar component */}
        <Navbar />

        <main className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/travel" element={<Travel />} />
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