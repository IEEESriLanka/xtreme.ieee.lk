import React, { useState, useEffect, useRef } from "react";
import guideImg from "../assets/images/character.png"; // your image path

const GuideSection = () => {
  const [visible, setVisible] = useState(false);
  const guideRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.25,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      });
    }, observerOptions);

    if (guideRef.current) observer.observe(guideRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="guide"
      ref={guideRef}
      className="bg-white rounded-3xl max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-16 relative overflow-hidden"
      style={{ minHeight: "400px" }}
    >
      {/* Background dots */}
      <div className="absolute top-6 left-6 w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-12 right-12 w-3 h-3 bg-cyan-400 rounded-full opacity-20 animate-bounce"></div>

      <div
        className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 transition-all duration-1000 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Left side text (50% on desktop, full width on mobile) */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 relative inline-block">
            Guide to IEEEXtreme
            <div className="absolute -bottom-1 left-0 w-full h-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 opacity-80"></div>
            <div className="absolute -top-3 -right-3 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
            Participating in IEEEXtreme is a valuable experience that offers a
            unique blend of learning, collaboration, and competition. Whether
            you're aiming to enhance your coding abilities, gain international
            exposure, or simply enjoy the thrill of competition, IEEEXtreme 19.0
            is the event for you!
          </p>

          <button
              onClick={() => window.open("https://www.youtube.com/", "_blank")}
              className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/15 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-2">
                
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch Tutorial
              </span>
            </button>
        </div>

        {/* Right side image (50% on desktop, full width on mobile) */}
        <div className="w-full lg:w-1/2 rounded-xl overflow-hidden transition-transform duration-500 ease-out hover:scale-105 relative max-w-md lg:max-w-none mx-auto">
          <img
            src={guideImg}
            alt="Guide Illustration"
            className="w-full object-cover"
            draggable={false}
          />
          {/* Floating dot */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full opacity-50 animate-ping"></div>
        </div>
      </div>
    </section>
  );
};

export default GuideSection;