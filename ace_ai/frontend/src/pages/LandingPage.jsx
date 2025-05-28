import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("Login");

  const handleCTA = () => {
    navigate("/get-started");
  };

  return (
    <>
      <div className="relative w-full min-h-screen bg-[#FFFCEF] overflow-hidden">
        {/* Background Blur Element */}
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0 z-0" />

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-3xl font-bold text-black uppercase">
              Ace AI
            </div>
            <button
              className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-6 py-4 rounded-full border border-transparent hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
              onClick={() => setOpenAuthModel(true)}
            >
              Login / Sign Up
            </button>
          </header>

          {/* Hero Section */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-300 w-max">
                <LuSparkles /> AI Powered
              </div>
              <h1 className="text-5xl font-extrabold text-black leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324,_#FC0760_100%)]">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
              <p className="text-gray-700 text-base leading-relaxed max-w-md">
                Get role-specific questions, expand answers when you need them,
                dive deep into concepts, and organize everything your way. From
                preparation to mastery — your ultimate interview toolkit is
                here.
              </p>
              <button
                onClick={handleCTA}
                className="bg-black text-white font-semibold px-6 py-3 rounded-full hover:bg-[#FC0760] transition-colors duration-300 cursor-pointer"
              >
                Get Started
              </button>
            </div>

            {/* Optional Right Image or Illustration Area */}
            <div className="w-full md:w-1/2">
              {/* You can place an SVG/Illustration/Image here */}
              <img
                src="/hero-illustration.svg"
                alt="Interview illustration"
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
