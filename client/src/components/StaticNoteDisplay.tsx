
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown (tables, task lists, etc.)

/**
 * StaticNoteDisplay Component
 *
 * A functional component (FC) that displays pre-defined notes
 * using Markdown formatting. The notes are passed as a string prop.
 *
 * @param {object} props - The component props.
 * @param {string} props.noteContent - The Markdown string content to display.
 * @param {string} [props.title="Relearning React"] - The title for the notes section.
 */

interface StaticNoteDisplayProps {
  noteContent: string; // Assuming noteContent will be a string (e.g., Markdown text)
  title?: string;     // title is optional (indicated by the ?) and will be a string
}

function StaticNoteDisplay({ noteContent, title = "Relearning React" }: StaticNoteDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6 md:p-8 border-2 border-gray-300"> {/* Added border-2 and border-gray-300 */}
        {/* Title for the notes - now left-aligned */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left rounded-md bg-blue-100 p-3"> {/* Changed text-center to text-left */}
          {title}
        </h1>

        {/* Container for the Markdown content - text is left-aligned by default with prose */}
        <div className="prose max-w-none text-gray-700 leading-relaxed text-left"> {/* Explicitly added text-left for clarity */}
          {/*
            ReactMarkdown component renders Markdown text into HTML.
            remarkGfm is used to enable GitHub Flavored Markdown features like tables and task lists.
          */}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {noteContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default StaticNoteDisplay;
