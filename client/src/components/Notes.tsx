// client/src/components/Notes.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const siteNotesContent = `
## How I Built This Site 🛠️

This section details the technologies and tools used in the creation and deployment of this website.

### Technologies & Tools Used:
* **Vite & React**: The core frontend framework for building the user interface.
* **AWS Route 53**: Used to purchase and manage the domain.
* **AWS S3**: Hosts the static website files.
* **GitHub Actions Workflow**: Automates the deployment of changes to AWS S3 storage.
* **AWS Systems Manager**: Securely stores sensitive credentials like the Google Maps API Key, preventing them from being exposed in public GitHub repositories.
* **Google Maps API**: Renders GPX files from cycling trips.
---
### Features I Want to Add:
* **Node.js Web Application Migration**: I may migrate this static site to a Node.js web application in a new branch.
* **Education Credentials**: Render my educational credentials on a dedicated page.
* **Goodreads API Integration**: Call the Goodreads API to build a page with a list of books I've read, potentially adding personal commentary.
* **GoPro Videos from Cycling Trip**: Integrate GoPro videos from my cycling trips, view metadata, and analyze the cost of supplementing the trip.
* **Migrate from S3 to Elastic Beanstalk**: Transition from S3 to Elastic Beanstalk for a more robust web application hosting solution.
* **HTTPS Security**: Figure out why my site is not showing up as HTTPS Secure.
`;

const Notes: React.FC = () => {
  return (
    <div className="page-content prose"> {/* Added 'prose' class for markdown styling */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {siteNotesContent}
      </ReactMarkdown>
    </div>
  );
};

export default Notes;