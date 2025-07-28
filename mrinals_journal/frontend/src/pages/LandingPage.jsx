import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1920&q=80')`,
        backgroundColor: "#1a1a1a",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 md:px-8 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          Mrinal's Journal
        </h1>
        <p className="text-base md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
          Write. Share. Inspire. Join our growing community of thinkers, writers, and dreamers.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 px-6 py-2 rounded-full text-white font-semibold transition duration-200 shadow-md"
            aria-label="Get Started - Login or Register"
          >
            Get Started
          </Link>
          <Link
            to="/feed"
            className="border border-white hover:bg-white hover:text-black focus:ring-4 focus:ring-white/50 px-6 py-2 rounded-full text-white font-semibold transition duration-200"
            aria-label="Explore public blog posts"
          >
            Explore Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
