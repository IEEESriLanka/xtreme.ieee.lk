import React, { useState, useEffect } from "react";
import socialIcons from "../assets/socials";
import logos from "../assets/logos";

export const TopHeader = ({ onLogoClick }) => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll detection for logo effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hidden lg:block bg-gradient-to-r from-blue-50/50 via-white/90 to-blue-50/50 backdrop-blur-sm shadow-lg shadow-gray-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 md:py-6">
          <div className="flex items-center space-x-3 md:space-x-4">
            {[
              {
                icon: socialIcons.globe,
                alt: "Website",
                href: "https://ieee.lk",
                delay: 0,
                color: "from-blue-500 to-cyan-400",
              },
              {
                icon: socialIcons.facebook,
                alt: "Facebook",
                href: "https://www.facebook.com/share/1G1k19kH6C/",
                delay: 100,
                color: "from-blue-600 to-indigo-500",
              },
              {
                icon: socialIcons.linkedin,
                alt: "LinkedIn",
                href: "https://www.linkedin.com/company/ieeesrilanka",
                delay: 200,
                color: "from-blue-700 to-blue-500",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                className={`w-8 h-8 md:w-10 md:h-10 p-1.5 md:p-2 hover:opacity-90 hover:-translate-y-1 hover:scale-110 transition-all duration-300 group relative ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${social.delay}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20 rounded-full scale-0 group-hover:scale-150 transition-all duration-300 blur-sm`}
                ></div>

                <img
                  src={social.icon}
                  alt={social.alt}
                  className="w-full h-full object-contain relative z-10 filter group-hover:brightness-110 group-hover:contrast-110"
                />

                {/* Pulse ring effect */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400 scale-0 group-hover:scale-125 group-hover:opacity-0 opacity-60 transition-all duration-700"></div>

                {/* Secondary ring */}
                <div className="absolute inset-0 rounded-full border border-blue-300 scale-100 group-hover:scale-150 group-hover:opacity-0 opacity-30 transition-all duration-500 delay-100"></div>
              </a>
            ))}
          </div>

          <div
            className={`flex-1 flex justify-center transition-all duration-1000 ${
              mounted
                ? "opacity-100 translate-y-0 rotate-0"
                : "opacity-0 translate-y-4 rotate-3"
            }`}
          >
            <div className="relative group">
              {/* Constant ambient glow - always visible */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/15 via-cyan-400/15 to-blue-600/15 rounded-full blur-xl animate-pulse"></div>
              <div
                className="absolute -inset-6 bg-blue-400/8 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* Constant floating shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gradient rounded-full"></div>

              {/* Enhanced scroll-based glow */}
              <div
                className={`absolute -inset-8 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-600/20 rounded-full blur-2xl transition-opacity duration-500 ${
                  scrolled ? "opacity-100 animate-pulse" : "opacity-40"
                }`}
              ></div>

              {/* Main logo with optimized size - make it clickable */}
              <button
                onClick={onLogoClick}
                className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
              >
                <img
                  src={logos.ieeextremelogo}
                  alt="IEEEXtreme Programming Competition"
                  className={`h-16 md:h-20 lg:h-26 w-auto filter transition-all duration-500 hover:scale-110 hover:drop-shadow-2xl relative z-10 brightness-105 contrast-105 animate-float cursor-pointer`}
                />
              </button>

              {/* Constant rotating accent rings */}
              <div
                className="absolute inset-0 rounded-full border border-blue-200/60 animate-spin opacity-40"
                style={{ animationDuration: "12s" }}
              ></div>
              <div
                className="absolute inset-2 rounded-full border border-cyan-300/40 animate-spin opacity-30"
                style={{
                  animationDuration: "8s",
                  animationDirection: "reverse",
                }}
              ></div>
              <div
                className="absolute inset-4 rounded-full border border-blue-400/30 animate-spin opacity-20"
                style={{ animationDuration: "15s" }}
              ></div>

              {/* Hover enhancement */}
              <div className="absolute -inset-2 rounded-full border-2 border-blue-400/0 group-hover:border-blue-400/40 transition-all duration-500 group-hover:animate-pulse"></div>

              {/* Constant sparkle effects */}
              <div
                className="absolute top-2 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-60 animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-50 animate-ping"
                style={{ animationDelay: "1.2s" }}
              ></div>
              <div
                className="absolute top-6 left-2 w-1 h-1 bg-blue-300 rounded-full opacity-70 animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
          </div>
          
          {/* Invisible spacer div to match left side width for perfect centering */}
          <div className="hidden lg:flex items-center space-x-3 md:space-x-4 opacity-0 pointer-events-none">
            {/* Match the exact structure of the left side social icons */}
            <div className="w-8 h-8 md:w-10 md:h-10 p-1.5 md:p-2"></div>
            <div className="w-8 h-8 md:w-10 md:h-10 p-1.5 md:p-2"></div>
            <div className="w-8 h-8 md:w-10 md:h-10 p-1.5 md:p-2"></div>
          </div>
          
          {/* COMMENTED OUT - Subscribe button (kept for potential future use)
          <div
            className={`hidden lg:block transition-all duration-1000 delay-300 ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <button className="relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/50 group overflow-hidden border border-blue-500/30">
             
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-cyan-400/30 rounded-xl blur-sm animate-pulse"></div>

              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient"></div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-gradient"></div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <span className="relative z-10 inline-flex items-center justify-center gap-2 w-full">
                Subscribe
                <div className="relative">
                  <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-cyan-200 rounded-full animate-ping opacity-40"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-white/60 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </span>

              <div className="absolute inset-0 rounded-xl border-2 border-blue-400/20 animate-pulse"></div>

              <div className="absolute inset-0 rounded-xl border-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-500"></div>

              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
            </button>
          </div>
          */}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </div>
  );
};