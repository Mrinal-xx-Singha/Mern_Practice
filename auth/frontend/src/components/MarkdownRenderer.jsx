import React, { useState, useId } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import toast from "react-hot-toast";

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
              const text = Array.isArray(children) ? children.join("") : String(children);
              navigator.clipboard.writeText(text);
              setCopied(true);
              toast.success("✅ Copied to clipboard!");
              setTimeout(() => setCopied(false), 2000);
            };

            if (inline) {
              return (
                <code
                  className="bg-gray-100 dark:bg-gray-700 text-sm px-1.5 py-0.5 rounded font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <figure className="relative group my-6 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                {language && (
                  <figcaption className="absolute top-0 left-0 bg-gray-900 text-white text-xs px-2 py-1 rounded-br-md font-mono">
                    {language}
                  </figcaption>
                )}
                <pre className="bg-gray-800 text-white p-4 text-sm overflow-x-auto">
                  <code className={className} aria-labelledby={id} {...props}>
                    {children}
                  </code>
                </pre>
                <button
                  aria-label="Copy code to clipboard"
                  onClick={handleCopy}
                  className="absolute top-2 right-2 text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition opacity-0 group-hover:opacity-100"
                >
                  {copied ? "Copied!" : "Copy"}
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
