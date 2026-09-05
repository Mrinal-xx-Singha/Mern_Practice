import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { demoLogin } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { PenTool, Globe, Briefcase } from "lucide-react";

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
      <main className="flex-1 flex items-center px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div
          className="w-full mx-auto py-16 md:py-24 relative z-10"
          style={{ maxWidth: "var(--max-width-page)" }}
        >
          <h1
            className="font-serif font-bold leading-[1.1] tracking-tight mb-6 animate-fade-in"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              color: "var(--color-text)",
              letterSpacing: "-0.02em",
            }}
          >
            Share stories. <br/>
            <span style={{ color: "var(--color-accent)" }}>Find remote work.</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed animate-fade-in"
            style={{
              color: "var(--color-text-secondary)",
              animationDelay: "0.1s",
            }}
          >
            A community platform built for developers and creators. Read expert articles, publish your thoughts, and instantly apply to the latest remote opportunities.
          </p>
          <div
            className="flex flex-wrap gap-4 items-center animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Link
              to="/register"
              className="inline-block px-8 py-3 rounded-full text-lg font-medium transition-transform shadow-md hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "var(--color-btn-invert-bg)",
                color: "var(--color-btn-invert-text)",
              }}
            >
              Get Started
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
              className="px-6 py-3 rounded-full text-lg font-medium transition-all border shadow-sm cursor-pointer flex items-center gap-2 hover:bg-[var(--color-bg-subtle)] active:scale-95"
              style={{
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
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
                    toast.success("Welcome to the Employer Dashboard!");
                    navigate("/employer/dashboard");
                  })
                  .catch(() => toast.error("Demo login failed."));
              }}
              className="px-6 py-3 rounded-full text-lg font-medium transition-all border shadow-sm cursor-pointer flex items-center gap-2 hover:bg-[var(--color-bg-subtle)] active:scale-95"
              style={{
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
              }}
            >
              <span>🏢 Demo as Recruiter</span>
            </button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-6 md:px-12 lg:px-20 py-20 bg-[var(--color-bg-subtle)] border-t border-[var(--color-border-landing)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-4" style={{ color: "var(--color-text)" }}>Everything you need in one platform</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>Writely merges the power of a developer blog with an automated remote job board.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl border bg-[var(--color-bg)] transition-transform hover:-translate-y-1 shadow-sm" style={{ borderColor: "var(--color-border)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: "var(--color-bg-subtle)", color: "var(--color-accent)" }}>
                <PenTool size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--color-text)" }}>Developer Community</h3>
              <p style={{ color: "var(--color-text-secondary)" }}>Publish articles, share your expertise, and build your audience with our distraction-free reading experience.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl border bg-[var(--color-bg)] transition-transform hover:-translate-y-1 shadow-sm" style={{ borderColor: "var(--color-border)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: "var(--color-bg-subtle)", color: "var(--color-accent)" }}>
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--color-text)" }}>Automated Web Scraper</h3>
              <p style={{ color: "var(--color-text-secondary)" }}>Our background Node.js scraper automatically syncs the latest remote developer jobs from across the web.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl border bg-[var(--color-bg)] transition-transform hover:-translate-y-1 shadow-sm" style={{ borderColor: "var(--color-border)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: "var(--color-bg-subtle)", color: "var(--color-accent)" }}>
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--color-text)" }}>Employer Dashboard</h3>
              <p style={{ color: "var(--color-text-secondary)" }}>Strict Role-Based Access Control allows verified recruiters to post jobs and securely download applicant resumes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center py-8 text-sm"
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
