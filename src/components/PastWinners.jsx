import React, { useState, useEffect } from 'react';
import char from '../assets/images/character.png'
import RemainingRanks from './RemainingRanks';

const PastWinners = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const winners = [
    {
      place: 1,
      year: "2024",
      university: "University of Peradeniya",
      teamName: "Insomniacs",
      members: ["Arjun Silva", "Priya Perera", "Kasun Fernando"],
      image: char, 
      score: "2847 points",
      badge: "1",
      color: "from-yellow-400 to-yellow-600",
      ringColor: "border-yellow-400",
      glowColor: "shadow-yellow-500/25",
      bgGradient: "from-yellow-50 to-amber-50"
    },
    {
      place: 2,
      year: "2024",
      university: "University of Colombo",
      teamName: "hehe",
      members: ["Nimali Wickramasinghe", "Sahan Rajapaksa", "Dilini Gunasekara"],
      image: char, 
      score: "2654 points",
      badge: "2",
      color: "from-gray-400 to-gray-600",
      ringColor: "border-gray-400",
      glowColor: "shadow-gray-500/25",
      bgGradient: "from-gray-50 to-slate-50"
    },
    {
      place: 3,
      year: "2024",
      university: "University of Moratuwa",
      teamName: "NotSoCode",
      members: ["Tharindu Rathnayake", "Kavitha Dissanayake"],
      image: char, 
      score: "2489 points",
      badge: "3",
      color: "from-amber-600 to-orange-600",
      ringColor: "border-amber-500",
      glowColor: "shadow-amber-500/25",
      bgGradient: "from-orange-50 to-amber-50"
    }
  ];

  const getPlaceText = (place) => {
    const suffix = place === 1 ? 'st' : place === 2 ? 'nd' : 'rd';
    return `${place}${suffix} Place`;
  };

  return (
    <section id='pastwinners' className="relative py-20 bg-gradient-to-br from-white via-blue-50 to-cyan-50 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-floating-particles opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Top decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-float">
              <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
              </svg>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent animate-gradient-text">
              Past Winners
            </h2>
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ animationDelay: '0.5s' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-typewriter">
            Celebrating the champions of IEEEXtreme Programming Competition - where brilliance meets innovation
          </p>
          
          {/* Decorative underline */}
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Winners Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {winners.map((winner, index) => (
            <div
              key={winner.place}
              className={`relative group transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${winner.place === 1 ? 'md:order-2' : winner.place === 2 ? 'md:order-1' : 'md:order-3'}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setHoveredCard(winner.place)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Winner Card */}
              <div className={`bg-gradient-to-br ${winner.bgGradient} backdrop-blur-md rounded-2xl shadow-2xl border-2 ${winner.ringColor} p-6 transform ${winner.place === 1 ? 'group-hover:scale-110 group-hover:-translate-y-6 group-hover:rotate-1 group-hover:shadow-3xl' : 'group-hover:scale-105 group-hover:-translate-y-2'} transition-all duration-700 hover:${winner.glowColor} hover:shadow-2xl relative overflow-hidden h-full min-h-[600px] flex flex-col`}>
                {/* Card glow effect */}
                <div className={`absolute inset-0 ${winner.place === 1 ? 'bg-gradient-to-r from-yellow-500/10 via-yellow-400/15 to-yellow-500/10 opacity-0 group-hover:opacity-100' : 'bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100'} transition-opacity duration-500`}></div>
                
                {/* Special first place effects */}
                {winner.place === 1 && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
                    <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-0 group-hover:opacity-60"></div>
                    <div className="absolute bottom-6 left-6 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-0 group-hover:opacity-40"></div>
                  </>
                )}
                
                {/* Floating elements */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>

                {/* Rank Badge - Integrated into card */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`bg-gradient-to-r ${winner.color} rounded-full shadow-2xl p-4 border-4 border-white ${winner.place === 1 ? 'group-hover:scale-125 group-hover:rotate-12' : 'group-hover:scale-110'} transition-all duration-700 relative overflow-hidden`}>
                    {/* Badge shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="text-center z-10 relative">
                      <div className="text-3xl font-bold text-white mb-1 animate-bounce-subtle">{winner.badge}</div>
                      <div className="text-white font-bold text-sm">{getPlaceText(winner.place)}</div>
                    </div>
                    
                    {/* Corner decorations */}
                    <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
                    <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>

                {/* Content wrapper with flex-grow to ensure consistent spacing */}
                <div className="flex flex-col flex-grow pt-8">
                  {/* Team Image */}
                  <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg group/image">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                      <img 
                        src={winner.image} 
                        alt={`${winner.teamName} - ${winner.university}`}
                        className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback placeholder */}
                      <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-200 to-cyan-200 items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-spin-slow">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <p className="text-blue-600 font-semibold">Team Photo</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Image overlay with score */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600/90 to-cyan-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-bold shadow-lg animate-pulse-glow">
                      {winner.score}
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Team Info - flexed to fill remaining space */}
                  <div className="flex-grow flex flex-col space-y-4 relative z-10">
                    {/* University */}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-2 group-hover:bg-white transition-colors duration-500 shadow-md">
                        <svg className="w-4 h-4 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-blue-700 font-semibold text-sm">{winner.university}</span>
                      </div>
                      <div className="text-xs text-gray-500 font-medium">{winner.year}</div>
                    </div>

                    {/* Team Name */}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-500">
                        {winner.teamName}
                      </h3>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full animate-pulse"></div>
                    </div>

                    {/* Team Members - Updated styling */}
                    <div className="flex-grow flex flex-col">
                      <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wide text-center mb-4 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 text-blue-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Team Members
                      </h4>
                      <div className="flex-grow flex flex-col justify-center space-y-3">
                        {winner.members.map((member, memberIndex) => (
                          <div 
                            key={memberIndex}
                            className={`relative text-center animate-slide-in-right group/member`}
                            style={{ animationDelay: `${memberIndex * 0.15}s` }}
                          >
                            {/* Member name with enhanced styling */}
                            <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-105 group-hover/member:from-blue-100 group-hover/member:to-cyan-100 relative overflow-hidden min-w-[250px]">
                              {/* Background shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full group-hover/member:translate-x-full transition-transform duration-700"></div>
                              
                              {/* Name */}
                              <span className="text-gray-800 font-semibold text-sm group-hover/member:text-blue-700 transition-colors duration-300 relative z-10">
                                {member}
                              </span>
                            </div>
                          </div>
                        ))}
                        {/* Add empty space if fewer than 3 members to maintain consistent height */}
                        {Array.from({ length: Math.max(0, 3 - winner.members.length) }).map((_, emptyIndex) => (
                          <div key={`empty-${emptyIndex}`} className="h-10"></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card hover effects */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient rounded-t-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient rounded-b-2xl" style={{ animationDelay: '0.5s' }}></div>
                </div>

                {/* Floating achievement badge */}
                {hoveredCard === winner.place && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-2xl shadow-2xl animate-glow-pulse border-2 border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold">Champion</div>
                          <div className="text-xs opacity-90">{winner.year}</div>
                        </div>
                      </div>
                      {/* Floating particles around the badge */}
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <RemainingRanks />
      </div>

      {/* Enhanced CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
          }
          50% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(34, 211, 238, 0.3);
          }
        }
        
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(10px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }
        
        @keyframes typewriter {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes floating-particles {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.1;
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-40px) translateX(-10px) rotate(180deg);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-20px) translateX(15px) rotate(270deg);
            opacity: 0.4;
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(34, 211, 238, 0.2);
            transform: translateX(-50%) translateY(0) scale(1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(34, 211, 238, 0.4);
            transform: translateX(-50%) translateY(-2px) scale(1.05);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 4s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.4s ease-out forwards;
        }
        
        .animate-typewriter {
          animation: typewriter 1s ease-out forwards;
        }
        
        .animate-floating-particles {
          animation: floating-particles ease-in-out infinite;
        }
        
        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default PastWinners;