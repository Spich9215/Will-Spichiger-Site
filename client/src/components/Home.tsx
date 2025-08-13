// client/src/components/Home.tsx
import React from 'react';
// No need to import App.css here, it's imported in App.tsx and applies globally

const Home: React.FC = () => {
  return (
    <div className="page-content"> {/* Use a consistent class for page content */}
      <h2>Welcome to my site</h2>
      <p>
        I'm building this website for the sake of learning, creating, and sharing ideas.
        It's a journey to practice React and Vite, learn new AWS tools, and document my personal achievements and adventures.
        This site is also a place for me to share my thoughts and ideas, retaining ownership of my presence on the web, free from the censorship of large technology companies.
      </p>
      <p>
        This site is built on AWS Infrastructure and leverages open-source code, because as they say, "no man is an island."
      </p>
      {/* You can add more content here, like a brief intro to yourself */}
    </div>
  );
};

export default Home;