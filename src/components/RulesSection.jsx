import React, { useEffect, useRef, useState } from "react";
import rulesImg from "../assets/images/Rules-female.png";

export default function RulesSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Fade-in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="rules"
      className="bg-[#68A7FF1A] py-16 px-4 sm:px-8 lg:px-32 relative overflow-hidden"
    >
      {/* Decorative background dots */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div
        className={`flex flex-col lg:flex-row items-start justify-between gap-16 max-w-6xl mx-auto relative z-10 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Left side - Image */}
        <div className="w-full lg:w-1/2">
          <div className="w-full aspect-[4/3] bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-200 group relative">
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

            {/* Glow border on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-transparent to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

            <img
              src={rulesImg}
              alt="IEEEXtreme Rules"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 relative z-20"
            />

            {/* Floating blue dot animations */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-300 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-bounce"></div>
          </div>
        </div>

        {/* Right side - Rules */}
        <div className="w-full lg:w-1/2 lg:pl-8">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-gray-800 mb-8 leading-tight relative ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } transition-all duration-1000`}
          >
            <span className="relative">
              Competition Rules
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-1000 delay-500 ${
                  visible ? "w-full" : "w-0"
                }`}
              ></div>
            </span>
          </h2>

          <div className="flex flex-col gap-6 mt-8 text-xl font-medium mb-8">
            <p className="text-gray-600 text-base leading-relaxed hover:text-gray-700 transition-colors duration-300">
              Each team must have a{" "}
              <span className="text-blue-600 font-medium">proctor</span> to
              supervise during the 24-hour programming challenge.
            </p>

            <p className="text-gray-600 text-base leading-relaxed hover:text-gray-700 transition-colors duration-300">
              Team members must solve and complete the problems without any{" "}
              <span className="text-blue-600 font-medium">
                external assistance
              </span>
            </p>
          </div>

          {/* View Details Button */}
          <div className={`flex justify-center lg:justify-start transition-all duration-1000 delay-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <button
              onClick={() => window.open("https://ieeextreme.org/rules/", "_blank")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/25 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span className="relative z-10 flex items-center gap-2">
                More Details
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}