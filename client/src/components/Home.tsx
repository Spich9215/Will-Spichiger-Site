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
      <p>
        Personally, I am a skeptic of social media and the intentions underlying the act of broadcasting personal information. 
        Though I have little to hide the abundance of data that FAANG has access to about me gives me pause for concern.
        Mostly I figure they simply want to profit off of my data and attention, however, I believe that FAANG holds the power to influence me psychologically and consequently manipulate my emotions/behavior/actions.
        I think this personal site will enable me to be the slightest bit be less subjected to corporate control and retain a smither of ownership over my digital life albeit at the cost of the network. 
        <br></br>
        One benefit of creating this is that I have not had to check any terms and conditions or privacy policies, nor do I have to worry about being tracked by cookies or be subjected to ads.
        <br></br>
        I can guarantee that you will not be subjected to ads (save my seeking employment). 
        <br></br>
        <br></br>
        I may get like 5 viewers for the rest of my lifetime and they may all be me. 
        <br></br>
        This site is built on AWS Infrastructure (Amazon), developed in VS Code on a machine running Windows, leverages open-source code... so "no man is an island." 
        Clearly, just the privilege of being able to make something like this demonstrates that I stand on the shoulders of giants (not corporate ones so much as intellectual ones albeit w/some overlap)).
      </p>
      {/* You can add more content here, like a brief intro to yourself */}
    </div>
  );
};

export default Home;