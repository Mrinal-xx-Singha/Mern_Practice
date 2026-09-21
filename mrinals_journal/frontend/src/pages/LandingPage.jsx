import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { demoLogin } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { Sparkles, Terminal, Cpu, ArrowRight } from "lucide-react";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Ambient background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* Top bar */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--color-bg)]/80 flex items-center justify-between px-6 md:px-12 py-4 border-b border-[var(--color-border)]"
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]" />
          <span
            className="text-[1.3rem] font-bold tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            Writely
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Sign In
          </Link>
          <Link to="/register" className="btn-accent text-sm">
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 relative z-10 py-16 md:py-24">
        <div
          className="w-full mx-auto text-center"
          style={{ maxWidth: "860px" }}
        >
          {/* Announcement pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-8 border border-indigo-500/30 bg-indigo-500/10 text-[var(--color-accent)] animate-fade-in shadow-sm">
            <Sparkles size={13} />
            <span>Powered by Gemini 2.5 Flash AI & Live Job Scraping</span>
          </div>

          <h1
            className="font-bold leading-[1.08] tracking-tight mb-6 animate-fade-in"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.8rem)",
              color: "var(--color-text)",
              letterSpacing: "-0.03em",
            }}
          >
            Publish with clarity. <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Land your next role.
            </span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
            style={{
              color: "var(--color-text-secondary)",
              animationDelay: "0.1s",
            }}
          >
            The dual-engine developer platform. Write technical stories with rich Markdown syntax highlighting, explore auto-synced remote jobs, and screen applications with AI ATS scoring.
          </p>

          <div
            className="flex flex-wrap gap-4 justify-center items-center animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Link
              to="/register"
              className="btn-accent px-7 py-3 text-base rounded-xl font-semibold shadow-lg shadow-indigo-500/25"
            >
              Get Started Free <ArrowRight size={16} />
            </Link>

            <button
              type="button"
              onClick={() => {
                toast.loading("Logging in as Candidate...", { duration: 1200 });
                dispatch(demoLogin("user"))
                  .unwrap()
                  .then(() => {
                    toast.success("Welcome to Writely!");
                    navigate("/feed");
                  })
                  .catch(() => toast.error("Demo login failed."));
              }}
              className="px-5 py-3 rounded-xl text-sm font-medium transition-all border shadow-sm cursor-pointer flex items-center gap-2 hover:bg-[var(--color-bg-subtle)] active:scale-95"
              style={{
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-bg-card)",
              }}
            >
              <span>⚡ Demo as Candidate</span>
            </button>

            <button
              type="button"
              onClick={() => {
                toast.loading("Logging in as Recruiter...", { duration: 1200 });
                dispatch(demoLogin("employer"))
                  .unwrap()
                  .then(() => {
                    toast.success("Welcome to Employer Dashboard!");
                    navigate("/employer/dashboard");
                  })
                  .catch(() => toast.error("Demo login failed."));
              }}
              className="px-5 py-3 rounded-xl text-sm font-medium transition-all border shadow-sm cursor-pointer flex items-center gap-2 hover:bg-[var(--color-bg-subtle)] active:scale-95"
              style={{
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-bg-card)",
              }}
            >
              <span>🏢 Demo as Recruiter</span>
            </button>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer
        className="text-center py-8 text-xs border-t border-[var(--color-border)]"
        style={{ color: "var(--color-text-muted)" }}
      >
        Built with ❤️ by Mrinal · MERN + Gemini AI Stack
      </footer>
    </div>
  );
}
export default LandingPage;
