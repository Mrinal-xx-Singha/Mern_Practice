import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { demoLogin } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{ backgroundColor: "var(--color-bg-landing)" }}
    >
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-6 md:px-12 py-5"
        style={{ borderBottom: "1px solid var(--color-border-landing)" }}
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
            className="text-sm font-medium hover:opacity-80 transition-opacity"
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
          <div
            className="flex flex-wrap gap-4 items-center animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Link
              to="/register"
              className="inline-block px-8 py-3 rounded-full text-lg font-medium transition-opacity shadow-sm hover:opacity-90"
              style={{
                backgroundColor: "var(--color-btn-invert-bg)",
                color: "var(--color-btn-invert-text)",
              }}
            >
              Start reading
            </Link>
            <button
              type="button"
              onClick={() => {
                toast.loading("Launching instant demo...", { duration: 1200 });
                dispatch(demoLogin("user"))
                  .unwrap()
                  .then(() => {
                    toast.success("Welcome to the Writely interactive demo!");
                    navigate("/feed");
                  })
                  .catch(() => toast.error("Demo login failed."));
              }}
              className="px-6 py-3 rounded-full text-lg font-medium transition-all border shadow-xs cursor-pointer flex items-center gap-2 hover:opacity-85"
              style={{
                color: "var(--color-text)",
                backgroundColor: "var(--color-bg-subtle)",
                borderColor: "var(--color-border)",
              }}
            >
              <span>⚡ Explore Instant Demo</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-6 text-xs"
        style={{
          color: "var(--color-text-muted)",
          borderTop: "1px solid var(--color-border-landing)",
        }}
      >
        Built with ❤️ by Mrinal
      </footer>
    </div>
  );
};

export default LandingPage;
