import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Map from './components/Map';

function App() {
  return (
    <>
    <div>
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
          </ul>

          <ul>
            <li>Used AWS Route 53 to purchase the domain</li>
            <li>Built a Github Actions Workflow to deploy changes to AWS S3 Storage - required storing</li>
            <li>Used AWS Systems Manager to securely store my Google Maps API Key</li>
            <li>Used AWS S3 to host my static website</li>
            <li>Used Vite and React to build the website</li>
            <li>Used Google Maps API to render GPX files from my cycling trip</li>
            <li>Used Komoot to plan and record my cycling trip</li>
            <li>Extracted GPX Files from Komoot Cycling Application and rendered on Google Map on Site to show trip progress (Missing some data due to Komoot not being used and phone battery dieing mid ride)
Got a Google Maps API key that is securely stored in AWS Systems Manager so that I do not publish credentials to public Github Repository
Put a Swiss Flag as my Favicon because my surname is of Swiss origin I am of half Swiss and half Irish descent
More to list here as progress is made</li>
            <li>Used Figma to design the logo</li>
            <li>Used GIMP to edit images</li>
            <li>Used ChatGPT to help with coding and ideas</li>
            <li>Used Github Copilot to help with coding</li>
            <li>Used this template from Vite to start my project</li>
            <li>Used Google to search for solutions to problems</li>
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

        To Do
        I may migrate my Static site to Node.js web application so I will build a branch
        Render my Education credentials
        Call the Goodreads API to build a page with the books I have read. Perhaps add personal commentary
        GoPro Videos from Cycling Trip - view metadata and analyze cost of supplementing trip
        Migrate from S3 to Elastic Beanstalk for more robust web application
        Figure out why my site is not showing up as HTTPS Secure
      </p>
      
      </div>

      <h3>Vite + React</h3>
      <p className="read-the-docs">
        Select Vite or React logos to learn more
      </p>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Map />
    </>
  )
}

export default App
