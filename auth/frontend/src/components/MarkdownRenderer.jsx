import React, { useState, useId } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import toast from "react-hot-toast";
import { Copy, CopyCheck } from "lucide-react";
const MarkdownRenderer = ({ content = "" }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-code:before:hidden prose-code:after:hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ inline, className = "", children, ...props }) {
            const match = /language-(\w+)/.exec(className);
            const language = match?.[1] || "";
            const id = useId();

            const handleCopy = () => {
              const text = Array.isArray(children)
                ? children.join("")
                : String(children);
              navigator.clipboard.writeText(text);
              setCopied(true);
              toast.success("✅ Copied to clipboard!");
              setTimeout(() => setCopied(false), 1500);
            };

            if (inline) {
              return (
                <code
                  className="bg-gray-200 dark:bg-gray-700 text-sm px-1.5 py-0.5 rounded font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <figure className="relative group my-6 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shadow-sm">
                {language && (
                  <figcaption className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-md font-mono opacity-80">
                    {language}
                  </figcaption>
                )}
                <pre className="p-4 text-sm overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
                  <code
                    className={`${className} font-mono`}
                    aria-labelledby={id}
                    {...props}
                  >
                    {children}
                  </code>
                </pre>
                <button
                  aria-label="Copy code to clipboard"
                  onClick={handleCopy}
                  className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-md transition-opacity duration-200 ${
                    copied ? "opacity-100" : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {copied ? (
                    <CopyCheck className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </figure>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
