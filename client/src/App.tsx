import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Map from './components/Map';
import StaticNoteDisplay from './components/StaticNoteDisplay';


const myContent = `
This personal website is very much so a work in progress. It probably does not belong on a resume.

Steps Taken Thus Far
Used AWS Route 53 to purchase the domain
Built a Github Actions Workflow to deploy changes to AWS S3 Storage - required storing
Extracted GPX Files from Komoot Cycling Application and rendered on Google Map on Site to show trip progress (Missing some data due to Komoot not being used and phone battery dieing mid ride)
Got a Google Maps API key that is securely stored in AWS Systems Manager so that I do not publish credentials to public Github Repository
Put a Swiss Flag as my Favicon because my surname is of Swiss origin I am of half Swiss and half Irish descent
More to list here as progress is made
To Do
I may migrate my Static site to Node.js web application so I will build a branch
Render my Education credentials
Call the Goodreads API to build a page with the books I have read. Perhaps add personal commentary
GoPro Videos from Cycling Trip - view metadata and analyze cost of supplementing trip
Migrate from S3 to Elastic Beanstalk for more robust web application
Figure out why my site is not showing up as HTTPS Secure
`;

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
          <div style={{ width: '100vw', height: '100vh' }}>

      <p>
          I am building this website for the sake of learning, creating, and sharing ideas. 
          <ul>
            <li>To practice React and Vite</li>
            <li>To learn how to use Google Maps API</li>
            <li>To learn AWS tools</li>
            <li>To record personal achievements, adventures</li>

            <li>To have some autonomy away from the censorship of large technology companies.</li>
            <li>To have a place to share my thoughts and ideas and retain some ownership of my place on the web</li>
            <li>This is built on AWS Infrastructure and leveraging open source code as no man is an island</li>
            <li></li>    
          </ul>
      </p>

      <p>
        Okay 8/13
        - Need to migrate the react version to my deployment
        - How many branches do I have?
        - I want no scroll left to right 
        - will changing branches in vs code change the code i am viewing?
        - I want to add a footer with my name and contact information
        - I want to add a header with my name and contact information
      </p>

      <StaticNoteDisplay noteContent={myContent}/>
      <Map />
      
      </div>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more or document
      </p>
    </>
  )
}

export default App
