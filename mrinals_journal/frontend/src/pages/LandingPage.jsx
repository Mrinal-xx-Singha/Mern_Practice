import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#fdf6e3" }}
    >
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-6 md:px-12 py-5"
        style={{ borderBottom: "1px solid #e8dcc8" }}
      >
        <span
          className="font-serif text-[1.6rem] font-bold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          Writely
        </span>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Sign In
          </Link>
          <Link to="/register" className="btn-accent text-sm">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center px-6 md:px-12 lg:px-20">
        <div
          className="w-full mx-auto py-16 md:py-24"
          style={{ maxWidth: "var(--max-width-page)" }}
        >
          <h1
            className="font-serif font-bold leading-[1.1] tracking-tight mb-8 animate-fade-in"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              color: "var(--color-text)",
              letterSpacing: "-0.04em",
            }}
          >
            Stay curious.
          </h1>
          <p
            className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed animate-fade-in"
            style={{
              color: "var(--color-text-secondary)",
              animationDelay: "0.1s",
            }}
          >
            Discover stories, thinking, and expertise from writers on any topic
            that matters to you.
          </p>
          <Link
            to="/register"
            className="animate-fade-in inline-block px-8 py-3 rounded-full text-lg font-medium transition-colors"
            style={{
              backgroundColor: "var(--color-text)",
              color: "#fdf6e3",
              animationDelay: "0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#333")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "var(--color-text)")
            }
          >
            Start reading
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-6 text-xs"
        style={{
          color: "var(--color-text-muted)",
          borderTop: "1px solid #e8dcc8",
        }}
      >
        Built with ❤️ by Mrinal
      </footer>
    </div>
  );
};

export default LandingPage;
