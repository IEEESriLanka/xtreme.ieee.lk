import React, { useState, useEffect, useRef, useMemo } from "react";
import { Code, Zap, Trophy, Users } from "lucide-react";

const About = () => {
  const [visibleSections, setVisibleSections] = useState({
    about: false,
    why: false,
    eligible: false
  });
  
  const aboutRef = useRef(null);
  const whyRef = useRef(null);
  const eligibleRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer for scroll animations - optimized
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const updates = {};
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          updates[sectionId] = true;
        }
      });
      
      if (Object.keys(updates).length > 0) {
        setVisibleSections(prev => ({ ...prev, ...updates }));
      }
    }, observerOptions);

    const refs = [aboutRef.current, whyRef.current, eligibleRef.current].filter(Boolean);
    refs.forEach(ref => observerRef.current.observe(ref));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const benefits = useMemo(() => [
    {
      icon: Code,
      title: "Boost Your Skills",
      description: "Enhance your coding prowess and problem-solving techniques through real-world challenges.",
      highlight: "Master algorithms & data structures",
      delay: 0,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: Zap,
      title: "Fast-Track Learning",
      description: "Experience accelerated growth through intensive 24-hour programming challenges.",
      highlight: "Learn under pressure",
      delay: 200,
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: Trophy,
      title: "Gain Recognition",
      description: "Achieve international visibility and prestige in the global programming community.",
      highlight: "Global leaderboard ranking",
      delay: 400,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Users,
      title: "Network",
      description: "Collaborate with peers and connect with professionals from around the globe.",
      highlight: "Build lasting connections",
      delay: 600,
      gradient: "from-green-500 to-teal-600"
    }
  ], []);

  const stats = useMemo(() => [
    { number: "150+", label: "Countries Participate", delay: 800 },
    { number: "24", label: "Hours of Coding", delay: 1000 },
    { number: "30+", label: "Challenging Problems", delay: 1200 },
    { number: "10K+", label: "Global Participants", delay: 1400 }
  ], []);

  return (
    <section id="about">
      {/* About Section */}

      {/* Why Participate Section - Enhanced */}
      <div 
        ref={whyRef}
        data-section="why"
        className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-20 px-4 sm:px-8 lg:px-32 relative overflow-hidden will-change-transform" 
        id="why"
      >
        {/* Enhanced background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #8b5cf6 1px, transparent 1px)`,
            backgroundSize: '60px 60px, 40px 40px'
          }}></div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-16 h-16 border-2 border-blue-200 rounded-full opacity-20 pointer-events-none" style={{animation: 'float 3s ease-in-out infinite'}}></div>
        <div className="absolute bottom-32 right-16 w-12 h-12 bg-blue-100 rotate-45 opacity-30 pointer-events-none" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 pointer-events-none" style={{animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', animationDelay: '1s'}}></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Enhanced header */}
          <div className={`mb-12 transition-all duration-1000 ${
            visibleSections.why 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl sm:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              <span className="relative">
                WHY PARTICIPATE?
                {/* Pulsing accent */}
                <div className={`absolute -top-3 -right-3 w-4 h-4 bg-blue-500 rounded-full transition-all duration-1000 delay-500 ${
                  visibleSections.why ? 'opacity-60' : 'opacity-0'
                }`} style={{animation: visibleSections.why ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'}}></div>
                {/* Gradient underline */}
                <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full transition-all duration-1000 delay-300 ${
                  visibleSections.why ? 'w-32' : 'w-0'
                }`}></div>
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of programmers worldwide in the ultimate coding marathon. 
              <span className="text-blue-600 font-semibold"> Push your limits, expand your horizons, and code your way to glory!</span>
            </p>
          </div>

          {/* Stats section */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${
            visibleSections.why ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group ${
                  visibleSections.why ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${stat.delay}ms` }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mx-auto mt-3 group-hover:w-12 transition-all duration-300"></div>
              </div>
            ))}
          </div>

          {/* Benefits grid - Enhanced Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group cursor-pointer relative overflow-hidden ${
                    visibleSections.why 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${benefit.delay}ms` }}
                >
                  {/* Card background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  {/* Floating background elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-0 group-hover:opacity-80 transition-all duration-700"></div>
                  
                  {/* Icon container */}
                  <div className="relative z-10 mb-6 flex justify-center">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                      <IconComponent className="w-8 h-8 text-white flex-shrink-0" style={{ display: 'block', margin: 'auto' }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    
                    {/* Highlight tag */}
                    <div className={`inline-block bg-gradient-to-r ${benefit.gradient} text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300`}>
                      {benefit.highlight}
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${benefit.gradient} w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl`}></div>
                  
                  {/* Corner shine effect */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Eligibility Section */}
      <div
        ref={eligibleRef}
        data-section="eligible"
        className="bg-white py-8 px-4 sm:px-8 lg:px-32 relative"
        id="eligible"
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className={`text-4xl sm:text-5xl font-bold text-gray-800 mb-16 leading-tight transition-all duration-1000 ${
            visibleSections.eligible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}>
            <span className="relative">
              Are You Eligible?
              {/* Fixed typo and added accent */}
              <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-transparent transition-all duration-1000 delay-500 ${
                visibleSections.eligible ? 'w-full' : 'w-0'
              }`}></div>
            </span>
          </h2>

          <div className={`space-y-4 mb-8 transition-all duration-1000 delay-200 ${
            visibleSections.eligible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}>
            <p className="text-gray-600 text-lg">
              All participants must be <span className="text-blue-600 font-semibold">IEEE members</span> (Student or Graduate Student members only).
            </p>
            <p className="text-gray-600">
              An <span className="text-blue-600 font-medium">IEEE membership number</span> is required for registration.
            </p>
            <p className="text-gray-700 font-medium">
              Not a member?
            </p>
          </div>

          {/* Buttons Container */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-400 ${
            visibleSections.eligible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-4 scale-95'
          }`}>
            {/* Join Now Button */}
            <button
              onClick={() => window.open("https://www.ieee.org/membership/join", "_blank")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/25 group relative overflow-hidden"
            >
              {/* Button shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span className="relative z-10 flex items-center gap-2">
                Join Now
                {/* Arrow animation */}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button
              onClick={() => window.open("https://www.youtube.com/watch?v=eVQFZ8b68Tg", "_blank")}
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

          {/* Helper text */}
          <div className={`mt-6 transition-all duration-1000 delay-600 ${
            visibleSections.eligible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-gray-500 text-sm">
              Need help joining? Watch our step-by-step tutorial video
            </p>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-10 w-20 h-20 border border-blue-100 rounded-full opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border border-blue-200 rounded-full opacity-20 pointer-events-none"></div>
        <div className="absolute top-20 right-1/4 w-2 h-2 bg-blue-300 rounded-full opacity-40 pointer-events-none" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}></div>
      </div>

      {/* CSS for additional animations */}
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default About;