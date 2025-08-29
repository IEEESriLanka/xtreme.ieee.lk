import React, { useState, useEffect } from "react";

const Footer = ({ onNavClick }) => {
  // For subtle animated squares in background, generate random positions once
  const generateRandomSquares = () => {
    const squares = [];
    const numSquares = 10; // fewer squares for footer

    for (let i = 0; i < numSquares; i++) {
      squares.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 3,
      });
    }
    return squares;
  };

  const [randomSquares] = useState(generateRandomSquares());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Navigation items matching the StickyNavigation
  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Rules", id: "rules" },
    { label: "Guide", id: "guide" },
    { label: "Contact", id: "ContactPage" },
  ];

  const handleNavItemClick = (e, sectionId) => {
    e.preventDefault();
    if (onNavClick) {
      onNavClick(sectionId);
    }
  };

  return (
    <footer className="relative bg-gray-50 border-t border-gray-200 text-gray-600 font-sans select-none overflow-hidden">
      {/* Animated grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
  linear-gradient(to right, rgba(221, 221, 221, 0.1) 1px, transparent 1px),
  linear-gradient(to bottom, rgba(221, 221, 221, 0.1) 1px, transparent 1px)
`,
          backgroundSize: "25px 25px",
          maskImage: "linear-gradient(to top, transparent 10%, black 60%)",
          WebkitMaskImage:
            "linear-gradient(to top, transparent 10%, black 60%)",
          zIndex: 0,
        }}
      >
        {randomSquares.map((square) => (
          <div
            key={square.id}
            className={`absolute bg-blue-300 rounded-sm transition-all duration-1000 ${
              mounted ? "opacity-70 scale-100" : "opacity-0 scale-0"
            }`}
            style={{
              left: `${square.left}%`,
              top: `${square.top}%`,
              width: "18px",
              height: "18px",
              animationDelay: `${square.delay}s`,
              animation: mounted
                ? `floatSquare ${square.duration}s ease-in-out infinite`
                : "none",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8 sm:py-12 z-10">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-2 sm:gap-0 sm:space-x-10 mb-4 sm:mb-6 text-xs sm:text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={(e) => handleNavItemClick(e, item.id)}
              className="hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1 text-center whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center items-center space-x-6 mb-4 sm:mb-6 text-gray-500">
          {/* SVG icons same as your original */}
          <a
            href="https://ieee.lk/"
            className="hover:text-gray-700 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/share/1G1k19kH6C/"
            className="hover:text-gray-700 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-5 sm:w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-3v-3h3v-2.3c0-3 1.7-4.7 4.3-4.7 1.2 0 2.5.2 2.5.2v3h-1.5c-1.5 0-2 1-2 2v2.3h3.5l-.6 3h-2.9v7A10 10 0 0 0 22 12" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/ieeesrilanka"
            className="hover:text-gray-700 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-5 sm:w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM2 9h4v11H2zM9 9h3.5v1.5h.1a3.9 3.9 0 0 1 3.5-1.9c3.7 0 4.4 2.4 4.4 5.4V20H16v-6.3c0-1.5-.5-2.5-1.8-2.5s-2 1.3-2 2.5V20H9z" />
            </svg>
          </a>
        </div>

        {/* Description */}
        <p className="max-w-md mx-auto text-center text-sm leading-relaxed mb-4 sm:mb-6 px-4 sm:px-0">
          IEEEXtreme 19.0 is the global 24-hour programming competition
          organized by IEEE, scheduled for 25 October 2025.
        </p>

        {/* Copyright */}
        <p className="text-xs text-center text-gray-400 mb-2 px-2">
          © IEEEXtreme 19.0 (Sri Lanka Section)
        </p>

        {/* Credits */}
        <p className="text-xs text-center text-gray-400 px-2 leading-relaxed">
          Developed by Heshan Gimhana &amp; Shahen Weerakoon <br className="sm:inline"/>
          <span className="sm:hidden"> </span>Designed by Abishek Jayathilake 
        </p>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes floatSquare {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;