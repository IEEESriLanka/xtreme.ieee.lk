import React, { useState, useEffect, useRef } from "react";
import diaries from "../constants/Diaries";
// Mock data for demonstration - representing 20 ambassadors

const Diaries = ({ onDiarySelect }) => {
  const [visibleSections, setVisibleSections] = useState({
    header: false,
    diaries: false,
  });
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const headerRef = useRef(null);
  const diariesRef = useRef(null);
  
  // Configuration
  const DIARIES_PER_BATCH = 6; 
  const ROTATION_INTERVAL = 4000; 
  const TOTAL_BATCHES = Math.ceil(diaries.length / DIARIES_PER_BATCH);
  
  // Get current batch of diaries
  const getCurrentDiaries = () => {
    const startIndex = currentBatch * DIARIES_PER_BATCH;
    return diaries.slice(startIndex, startIndex + DIARIES_PER_BATCH);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-section");
          setVisibleSections((prev) => ({ ...prev, [sectionId]: true }));
        }
      });
    }, observerOptions);

    if (headerRef.current) observer.observe(headerRef.current);
    if (diariesRef.current) observer.observe(diariesRef.current);

    return () => observer.disconnect();
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (isPaused || expandedCard) return;

    const interval = setInterval(() => {
      setCurrentBatch((prev) => (prev + 1) % TOTAL_BATCHES);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, expandedCard, TOTAL_BATCHES]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleCardClick = (diary) => {
    if (expandedCard === diary.id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(diary.id);
    }
    
    if (onDiarySelect) {
      onDiarySelect(diary);
    }
  };

  return (
    <section
      id="diaries"
      className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden min-h-screen"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-20 w-40 h-40 border border-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-32 w-28 h-28 bg-blue-50 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-40 left-1/3 w-24 h-24 border-2 border-blue-200 rounded-full opacity-25"></div>
        <div className="absolute bottom-32 right-1/4 w-20 h-20 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-40 animate-ping"></div>
        <div className="absolute top-1/2 left-10 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-blue-200/20 rounded-full blur-sm animate-float"></div>
        <div className="absolute top-1/4 right-10 w-16 h-16 bg-blue-200/30 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={headerRef}
          data-section="header"
          className="text-center mb-20"
        >
          <h2
            className={`text-5xl sm:text-6xl font-bold text-gray-900 mb-8 transition-all duration-1000 ${
              visibleSections.header
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="relative">
              Xtreme Diaries
              <div
                className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 delay-500 ${
                  visibleSections.header ? "w-40" : "w-0"
                }`}
              ></div>
              <div
                className={`absolute -top-8 -left-10 text-blue-300 text-8xl transition-all duration-1000 delay-700 ${
                  visibleSections.header
                    ? "opacity-80 animate-pulse"
                    : "opacity-0"
                }`}
              >
                "
              </div>
              <div
                className={`absolute -top-6 -right-8 text-blue-300 text-6xl transition-all duration-1000 delay-900 ${
                  visibleSections.header
                    ? "opacity-60 animate-bounce"
                    : "opacity-0"
                }`}
              >
                "
              </div>
            </span>
          </h2>
          <p
            className={`text-xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed transition-all duration-1000 delay-300 ${
              visibleSections.header
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Discover inspiring stories from our {diaries.length} ambassadors. Click on any card to explore their{" "}
            <span className="text-blue-600 font-semibold bg-blue-100/50 px-2 py-1 rounded-md">IEEEXtreme journey</span> and
            memorable experiences that shaped their technical excellence.
          </p>

          {/* Rotation Indicator */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Showing {currentBatch * DIARIES_PER_BATCH + 1}-{Math.min((currentBatch + 1) * DIARIES_PER_BATCH, diaries.length)} of {diaries.length}
              </span>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: TOTAL_BATCHES }, (_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentBatch ? 'bg-blue-600 scale-125' : 'bg-blue-200 hover:bg-blue-400'
                  }`}
                  onClick={() => {
                    setCurrentBatch(i);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 3000); // Resume after 3 seconds
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center gap-1"
              >
                {isPaused ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Play
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                    Pause
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Diaries Grid */}
        <div
          ref={diariesRef}
          data-section="diaries"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {getCurrentDiaries().map((diary, index) => (
            <div
              key={diary.id}
              className={`relative transition-all duration-700 ${
                expandedCard === diary.id 
                  ? "col-span-full max-w-6xl mx-auto" 
                  : "hover:-translate-y-3 hover:scale-105 cursor-pointer"
              } ${
                visibleSections.diaries
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => !expandedCard && setHoveredCard(diary.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container */}
              <div 
                className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 backdrop-blur-sm border border-white/20 ${
                  expandedCard === diary.id 
                    ? "h-[500px] flex bg-white/95" 
                    : "h-[480px] group cursor-pointer hover:shadow-3xl"
                }`}
                style={{ aspectRatio: expandedCard === diary.id ? 'auto' : '4/5' }}
                onClick={() => handleCardClick(diary)}
              >
                {/* Main Image */}
                <div className={`relative transition-all duration-700 ${
                  expandedCard === diary.id ? "w-1/2" : "w-full"
                }`}>
                  <div className="w-full h-full relative overflow-hidden">
                    <img
                      src={diary.image}
                      alt={diary.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      style={{ aspectRatio: '4/5' }}
                    />
                  </div>
                  
                  {/* Overlay with basic info - only show when not expanded */}
                  {expandedCard !== diary.id && (
                    <>
                      {/* Enhanced dark overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                      
                      {/* Basic Info Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                        
                        <div className="absolute top-6 right-6 bg-blue-600/80 backdrop-blur-md rounded-xl px-4 py-3 border border-white/30 shadow-lg">
                          <span className="text-2xl font-bold">{diary.id}</span>
                        </div>
                        
                        {/* IEEE Xtreme Branding with better contrast */}
                        <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                          <div className="text-sm font-bold text-white">XTREME</div>
                          <div className="text-xs text-white/80">DIARIES</div>
                        </div>

                        {/* Ambassador Info with better spacing and contrast */}
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                          <h3 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">{diary.name}</h3>
                          <p className="text-xl font-medium mb-2 text-blue-200">{diary.role}</p>
                          <p className="text-base mb-4 text-white/90">{diary.campus}</p>
                          
                          {/* Enhanced click indicator */}
                          <div className="flex items-center gap-3 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                            <span className="font-medium">Click to read story</span>
                            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced floating elements */}
                      <div className="absolute top-20 left-1/2 w-3 h-3 bg-white/40 rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-ping transition-all duration-500"></div>
                      <div className="absolute top-24 left-1/2 transform translate-x-6 w-2 h-2 bg-blue-300/60 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-bounce transition-all duration-700"></div>
                    </>
                  )}
                </div>

                {/* Expanded Content Panel */}
                {expandedCard === diary.id && (
                  <div className="w-1/2 p-10 flex flex-col justify-center relative bg-gradient-to-br from-blue-50/80 to-gray-50/80 backdrop-blur-sm">
                    {/* Close Button */}
                    <button 
                      className="absolute top-6 right-6 w-10 h-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCard(null);
                      }}
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* IEEE Xtreme Header */}
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-blue-200">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        IEEE
                      </div>
                      <div>
                        <div className="font-bold text-lg text-blue-800">IEEEXtreme</div>
                        <div className="text-sm text-blue-600">Programming Competition</div>
                      </div>
                      <div className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-full text-xl font-bold shadow-lg">
                        {diary.number}
                      </div>
                    </div>

                    {/* Ambassador Details */}
                    <div className="mb-8">
                      <h3 className="text-4xl font-bold text-gray-900 mb-3">{diary.name}</h3>
                      <p className="text-2xl text-blue-600 font-semibold mb-3">{diary.role}</p>
                      <p className="text-xl text-gray-700 mb-6">{diary.campus}</p>
                      
                      {/* Enhanced Quote */}
                      <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 shadow-lg">
                        <div className="text-blue-300 text-8xl font-serif leading-none mb-2 opacity-20 absolute top-2 left-4">"</div>
                        <blockquote className="text-lg text-gray-800 leading-relaxed italic pl-8 pt-4 relative z-10">
                          {diary.quote}
                        </blockquote>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-auto pt-8 border-t-2 border-blue-200">
                      <div className="text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-base font-semibold border border-blue-200 shadow-sm">
                          {diary.section}
                        </span>
                      </div>
                    </div>

                    {/* Enhanced Decorative Elements */}
                    <div className="absolute top-1/4 right-12 w-40 h-40 bg-blue-100/30 rounded-full opacity-20 animate-float"></div>
                    <div className="absolute bottom-1/4 right-16 w-24 h-24 bg-blue-200/30 rounded-full opacity-20 animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-20">
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Want to see all {diaries.length} ambassador stories?</p>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => {
                  setCurrentBatch((prev) => prev === 0 ? TOTAL_BATCHES - 1 : prev - 1);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 3000);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              <button
                onClick={() => {
                  setCurrentBatch((prev) => (prev + 1) % TOTAL_BATCHES);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 3000);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors duration-200 flex items-center gap-2"
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Enhanced CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
};

export default Diaries;