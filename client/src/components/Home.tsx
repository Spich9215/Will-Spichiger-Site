// client/src/components/Home.tsx
import React from 'react';
// No need to import App.css here, it's imported in App.tsx and applies globally

const Home: React.FC = () => {
  return (
    <div className="page-content"> {/* Use a consistent class for page content */}
      <h2>Welcome to my site</h2>
      <p>
        I'm building this website for the sake of learning, creating, and sharing ideas.
        I intend on documenting how I am building this site and the technologies that I leverage - React and Vite, learn new AWS tools, and document thoughts, notes, ideas.
        <br></br>
        <br></br>
        I am hoping that I can showcase some technology projects and find a fulfilling employment opportunity.
      </p>
      
    </div>
  );
};

export default Home;