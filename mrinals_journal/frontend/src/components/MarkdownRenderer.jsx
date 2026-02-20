import React, { useState, useId } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import toast from "react-hot-toast";
import { Copy, Check } from "lucide-react";

const MarkdownRenderer = ({ content = "" }) => {
  const [copiedId, setCopiedId] = useState(null);

  return (
    <div className="prose prose-lg max-w-none prose-code:before:hidden prose-code:after:hidden">
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
              setCopiedId(id);
              toast.success("Copied!");
              setTimeout(() => setCopiedId(null), 2000);
            };

            if (inline) {
              return (
                <code
                  className="text-sm px-1.5 py-0.5 rounded font-mono"
                  style={{
                    backgroundColor: "var(--color-bg-subtle)",
                    color: "var(--color-text)",
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <figure
                className="relative group my-6 rounded-lg overflow-hidden"
                style={{
                  backgroundColor: "var(--color-bg-subtle)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {language && (
                  <figcaption
                    className="text-xs px-3 py-1.5 font-mono"
                    style={{
                      color: "var(--color-text-muted)",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    {language}
                  </figcaption>
                )}
                <pre className="p-4 text-sm overflow-x-auto">
                  <code
                    className={`${className} font-mono`}
                    aria-labelledby={id}
                    {...props}
                  >
                    {children}
                  </code>
                </pre>
                <button
                  aria-label="Copy code"
                  onClick={handleCopy}
                  className="absolute top-2 right-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {copiedId === id ? (
                    <Check
                      className="w-3.5 h-3.5"
                      style={{ color: "var(--color-accent)" }}
                    />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
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
