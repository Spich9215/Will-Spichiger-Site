// client/src/components/Books.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// No need to import App.css here, it's imported in App.tsx and applies globally

const bookNotesContent = `
### Book Quotes

“The end of man is knowledge, but there is one thing he can't know. He can't know whether knowledge will save him or kill him. He will be killed, all right, but he can't know whether he is killed because of the knowledge which he has got or because of the knowledge which he hasn't got and which if he had it, would save him.”  - Robert Penn Warren, All the King's Men

`

const Books: React.FC = () => {
  return (
    <div className="page-content prose"> {/* Added 'prose' class for markdown styling */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {bookNotesContent}
      </ReactMarkdown>
    </div>
  );
};

export default Books;