import React, { useState, useEffect } from 'react';
import logos from '../assets/logos';
import rulesImg from "../assets/images/Rules.jpeg";

export const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Target date: October 25th 2025
  const targetDate = new Date('2025-10-25T00:00:00');
  
  // Calculate countdown
  const calculateCountdown = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return { days, hours, minutes, seconds };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };
  
  // Generate random positions for filled squares (as percentages)
  const generateRandomSquares = () => {
    const squares = [];
    const numSquares = 15; // Increased for more dynamic effect

    for (let i = 0; i < numSquares; i++) {
      squares.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2, // Animation delay
        duration: 3 + Math.random() * 4, // Animation duration
      });
    }
    return squares;
  };

  const [randomSquares] = useState(generateRandomSquares());

  // Mount animation trigger
  useEffect(() => {
    setMounted(true);
    // Initial countdown calculation
    setCountdown(calculateCountdown());
  }, []);

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Format countdown display
  const formatCountdown = () => {
    const { days, hours, minutes, seconds } = countdown;
    
    if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
      const paddedDays = days.toString().padStart(2, '0');
      const paddedHours = hours.toString().padStart(2, '0');
      const paddedMinutes = minutes.toString().padStart(2, '0');
      const paddedSeconds = seconds.toString().padStart(2, '0');
      
      return `${paddedDays} ${paddedDays == 1 ? "Day" : "Days"} : ` +
       `${paddedHours} ${paddedHours == 1 ? "Hour" : "Hours"} : ` +
       `${paddedMinutes} ${paddedMinutes == 1 ? "Minute" : "Minutes"} : ` +
       `${paddedSeconds} ${paddedSeconds == 1 ? "Second" : "Seconds"}`;


    } else {
      return "Event Started!";
    }
  };

  return (
      <section className="bg-white min-h-screen lg:min-h-[80vh] flex items-center py-16 lg:py-20 relative overflow-hidden" id='home'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className={`order-2 lg:order-1 max-w-2xl mx-auto lg:mx-0 transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Countdown with pulse animation */}
              <div className={`inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-8 text-sm sm:text-base font-medium transition-all duration-700 delay-300 relative overflow-hidden ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                {/* Animated background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" 
                     style={{
                       animation: 'shimmer 3s infinite',
                     }}></div>
                
                <span className="mr-2 font-medium relative z-10">Counting:</span>
                <span className="font-semibold relative z-10 tabular-nums">
                  {formatCountdown()}
                </span>
              </div>

              {/* Title with staggered character animation */}
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-tight tracking-tight mb-8 transition-all duration-1000 delay-500 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <span className="inline-block hover:text-blue-600 transition-colors duration-300 cursor-default">
                  {"IEEEXtreme 19.0".split("").map((char, index) => (
                    <span
                      key={index}
                      className={`inline-block transition-all duration-500 hover:-translate-y-1 hover:text-blue-600 ${
                        mounted ? 'animate-fadeInUp' : 'opacity-0'
                      }`}
                      style={{
                        animationDelay: `${0.7 + index * 0.05}s`,
                        animationFillMode: 'both'
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              </h1>

              {/* Description with typewriter effect simulation */}
              <div className={`transition-all duration-1000 delay-1000 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 relative">
                  <span className="inline-block">
                    IEEEXtreme is a global challenge in which teams of IEEE Student
                    members – advised and proctored by an IEEE member, and often
                    supported by an IEEE Student Branch – compete in a 24-hour time
                    span against each other to solve a set of programming problems.
                  <span className="inline-block w-0.5 h-4 bg-blue-600 ml-1 animate-bounce"></span>
                  </span>
                </p>

                {/* Register Now Button */}
                <div className={`flex justify-center lg:justify-center transition-all duration-1000 delay-1200 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <button
                    onClick={() => window.open("https://xtreme.vtools.ieee.org/", "_blank")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/25 group relative overflow-hidden"
                  >
                    {/* Button shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <span className="relative z-10 flex items-center gap-2">
                      Register Now
                      {/* Arrow animation */}
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className={`order-1 lg:order-2 flex justify-center items-center relative transition-all duration-1000 delay-200 ${
              mounted ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-8 rotate-3'
            }`}>
              {/* Logo with hover effects */}
              <div className="relative z-20 max-w-xs sm:max-w-sm lg:max-w-lg xl:max-w-xl group">
                <div className="relative">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110"></div>
                  
                  <img
                    src={logos.ieeextremelogo}
                    alt="IEEEXtreme Programming Competition 18.0 - IEEE Sri Lanka Section"
                    className="w-full h-auto filter drop-shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] relative z-10"
                  />
                  
                  {/* Rotating border effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-transparent to-blue-500 opacity-0 group-hover:opacity-30 group-hover:animate-spin transition-opacity duration-500"
                       style={{ animationDuration: '3s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Grid Background with animated squares */}
        <div
          className="absolute top-0 bottom-0 right-0 left-1/2"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ccc 1px, transparent 1px),
              linear-gradient(to bottom, #ccc 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 100%)",
          }}
        >
          {/* Random filled squares with staggered animations */}
          {randomSquares.map((square) => (
            <div
              key={square.id}
              className={`absolute bg-blue-800 transition-all duration-1000 hover:bg-blue-600 hover:scale-110 cursor-pointer ${
                mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
              style={{
                left: `${square.left}%`,
                top: `${square.top}%`,
                width: "30px",
                height: "30px",
                animationDelay: `${square.delay}s`,
                animation: mounted ? `floatSquare ${square.duration}s infinite ease-in-out` : 'none',
              }}
            />
          ))}
          
          {/* Additional animated elements */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/5 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce delay-500"></div>
        </div>

        {/* CSS keyframes in style tag */}
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes floatSquare {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.8;
            }
            50% { 
              transform: translateY(-10px) rotate(5deg); 
              opacity: 1;
            }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}</style>
      </section>
  );
};