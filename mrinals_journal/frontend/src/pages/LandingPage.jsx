import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { demoLogin } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { ArrowRight, Briefcase, User, BookOpen, Clock, Sparkles, CheckCircle2 } from "lucide-react";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Subtle Technical Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        style={{
          backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Navigation */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--color-bg)]/85 flex items-center justify-between px-6 md:px-12 py-3.5 border-b border-[var(--color-border)]"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
          <span
            className="text-[1.25rem] font-bold tracking-tight font-sans"
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

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center px-6 md:px-12 lg:px-20 relative z-10 pt-16 md:pt-20 pb-20">
        <div className="w-full mx-auto text-center" style={{ maxWidth: "860px" }}>
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono mb-8 border border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>v2.0 · Technical Publishing & Remote Job Board</span>
          </div>

          {/* Heading */}
          <h1
            className="font-bold leading-[1.08] tracking-tight mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "var(--color-text)",
              letterSpacing: "-0.03em",
            }}
          >
            Publish engineering stories. <br />
            <span className="font-serif italic font-normal text-[var(--color-text-secondary)]">
              Land your next role.
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            The dual-engine developer platform. Write deep-dive engineering articles with full Markdown syntax highlighting, browse real-time synced remote jobs, and screen applications with AI match scoring.
          </p>

          {/* CTA Group */}
          <div className="flex flex-wrap gap-3.5 justify-center items-center mb-16">
            <Link
              to="/register"
              className="btn-accent px-6 py-3 text-sm rounded-xl font-semibold shadow-md inline-flex items-center gap-2"
            >
              Get Started Free <ArrowRight size={15} />
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
              className="px-5 py-3 rounded-xl text-sm font-medium transition-all border shadow-sm cursor-pointer inline-flex items-center gap-2 hover:bg-[var(--color-bg-subtle)] active:scale-95"
              style={{
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-bg-card)",
              }}
            >
              <User size={15} className="text-[var(--color-accent)]" />
              <span>Demo as Candidate</span>
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
              className="px-5 py-3 rounded-xl text-sm font-medium transition-all border shadow-sm cursor-pointer inline-flex items-center gap-2 hover:bg-[var(--color-bg-subtle)] active:scale-95"
              style={{
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-bg-card)",
              }}
            >
              <Briefcase size={15} className="text-[var(--color-accent)]" />
              <span>Demo as Recruiter</span>
            </button>
          </div>
        </div>

        {/* Live Product Preview Grid (Proof of Craft) */}
        <div
          className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
          style={{ maxWidth: "980px" }}
        >
          {/* Card 1: Technical Publishing Preview */}
          <div
            className="p-6 rounded-2xl border transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border)",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]">
                  Technical Story
                </span>
                <span className="text-xs inline-flex items-center gap-1.5 text-[var(--color-text-muted)]">
                  <Clock size={13} /> 5 min read
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2 tracking-tight" style={{ color: "var(--color-text)" }}>
                Architecting Resilient Distributed Systems with Event Sourcing
              </h3>
              <p className="text-sm line-clamp-2 mb-4 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                How we transitioned our monolithic event bus to an append-only log model with optimistic concurrency control and zero data loss...
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] text-xs">
              <span className="text-[var(--color-text-muted)] font-mono">#systemdesign #nodejs</span>
              <span className="font-medium text-[var(--color-accent)] inline-flex items-center gap-1">
                Read article <ArrowRight size={12} />
              </span>
            </div>
          </div>

          {/* Card 2: AI Job Board Preview */}
          <div
            className="p-6 rounded-2xl border transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border)",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 font-semibold inline-flex items-center gap-1">
                  <CheckCircle2 size={12} /> 94% AI Fit Score
                </span>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">
                  Synced 2h ago
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1 tracking-tight" style={{ color: "var(--color-text)" }}>
                Senior Full-Stack Engineer
              </h3>
              <p className="text-sm font-medium mb-3" style={{ color: "var(--color-text-secondary)" }}>
                Linear · Remote (Worldwide) · $160k - $210k
              </p>
              <p className="text-xs rounded-lg p-2.5 border border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] leading-relaxed">
                <span className="font-semibold text-[var(--color-text)]">Gemini ATS Analysis:</span> Strong alignment with React 19, TypeScript, and microservice backend architecture requirements.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] text-xs">
              <span className="text-[var(--color-text-muted)] font-mono">PDF Resume Evaluated</span>
              <span className="font-medium text-[var(--color-accent)] inline-flex items-center gap-1">
                View role <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Clean Footer */}
      <footer
        className="text-center py-8 text-xs border-t border-[var(--color-border)] flex items-center justify-center gap-4"
        style={{ color: "var(--color-text-muted)" }}
      >
        <span>Writely © 2026</span>
        <span>·</span>
        <span>Built by Mrinal</span>
        <span>·</span>
        <span className="font-mono">React 19 + Express 5 MVC</span>
      </footer>
    </div>
  );
};

export default LandingPage;
