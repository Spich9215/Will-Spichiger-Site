// client/src/components/Home.tsx
import React from 'react';
// No need to import App.css here, it's imported in App.tsx and applies globally

const Home: React.FC = () => {
  return (
    <div className="page-content"> {/* Use a consistent class for page content */}
      <p>
        This site is a work in progress.  
        <br></br> 
        I expect it to be a modicum of self expression akin to early internet sites as well as an exhibition of technical projects.
        There are existing platforms and tools in existence that I could use, however, I am electing to build this custom site for learning.
        <br></br>

        <br></br>
        <br></br>
      </p>
    </div>
  );
};

export default Home;