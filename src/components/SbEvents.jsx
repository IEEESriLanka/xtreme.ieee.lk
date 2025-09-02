import React, { useEffect, useRef, useState } from "react";
import sbEvents from "../constants/sbEvents";


const SBEvents = ({ onEventSelect }) => {
  const [visible, setVisible] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  // Fade-in animation when scrolling into view
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

  // List of 22 branches
const branches = [
    "KDU",
    "SLIIT",
    "USJ",
    "CINEC",
    "UOK",
    "NSBM",
    "NIBM",
    "IIT",
    "OUSL",
    "RUSL",
    "WUSL",
    "SESUL",
    "SLTC",
    "SUSL",
    "UCSC",
    "UOJ",
    "UOM",
    "UOP",
    "UOR",
    "UOV",
    "UOVT",
    "UWU",
  ];

  // Sample events with branch - updated to match Events component structure

  // Filter events by selected branch
  const filteredEvents =
    selectedBranch === "All"
      ? sbEvents
      : sbEvents.filter((event) => event.branch === selectedBranch);

  const handleEventClick = (event) => {
    if (onEventSelect) {
      onEventSelect(event);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "ongoing":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "published":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "sb-event":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }); 
  };

  return (
    <section
      ref={sectionRef}
      id="sb-events"
      className="bg-[#68A7FF1A] py-16 px-4 sm:px-8 lg:px-32 relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
    >
      {/* Background Effects - Matching Events Component */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-32 h-32 border border-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-50 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 border-2 border-cyan-200 rounded-full opacity-25"></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-40 animate-ping"></div>

        {/* Code-like pattern */}
        <div className="absolute inset-0 opacity-3">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(45deg, #3b82f6 1px, transparent 1px),
              linear-gradient(-45deg, #06b6d4 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>

      {/* Enhanced Floating Background Elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-16 w-3 h-3 bg-cyan-400 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-32 right-24 w-1 h-1 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
      <div className="absolute bottom-24 left-24 w-3 h-3 bg-cyan-500 rounded-full opacity-10 animate-ping"></div>
      
      {/* Additional floating elements for enhancement */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 border border-blue-300 rounded-full opacity-15 animate-spin" style={{animationDuration: '8s'}}></div>
      <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-cyan-300 rounded-full opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/5"></div>

      <div
        className={`max-w-6xl mx-auto relative z-10 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Section Title */}
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6 relative text-black">
          <span className="relative">
            Student Branch Events
            {/* Animated underline */}
            <div
              className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 delay-500 ${
                visible ? "w-48" : "w-0"
              }`}
            ></div>
            {/* Floating binary digits */}
            <div
              className={`absolute -top-4 -right-8 text-blue-300 font-mono text-sm transition-all duration-1000 delay-700 ${
                visible ? "opacity-60 animate-pulse" : "opacity-0"
              }`}
            >
              01010
            </div>
            <div
              className={`absolute -bottom-4 -left-6 text-cyan-300 font-mono text-xs transition-all duration-1000 delay-900 ${
                visible ? "opacity-40 animate-bounce" : "opacity-0"
              }`}
            >
              110
            </div>
          </span>
        </h2>

        {/* Branch Filter Pills */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
            <button
              onClick={() => setSelectedBranch("All")}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group ${
                selectedBranch === "All"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-200"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">All Branches</span>
            </button>
            {branches.map((branch, index) => (
              <button
                key={branch}
                onClick={() => setSelectedBranch(branch)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group ${
                  selectedBranch === branch
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-200"
                }`}
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                  animation: visible ? `fadeInUp 0.6s ease-out ${index * 50}ms both` : 'none'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">{branch}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Events or Placeholder */}
        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 mb-6 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10m-7 4h4m-9 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              No upcoming events for{" "}
              {selectedBranch === "All" ? "any branch" : selectedBranch}
            </h3>
            <p className="text-gray-500 mt-2">
              Stay tuned — exciting events will be announced soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group overflow-hidden hover:-translate-y-2 cursor-pointer ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(event.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleEventClick(event)}
              >
                {/* Event Image/Header */}
                <div className="relative h-64 overflow-hidden">
                  {event.image ? (
                    <>
                      {/* Event Image */}
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Subtle overlay for poster-style images */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  ) : (
                    /* Default gradient background when no image */
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400"></div>
                  )}

                  {/* Type Icon - positioned to not interfere with poster content */}
                  <div className="absolute top-3 left-3 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                    {getTypeIcon(event.type)}
                  </div>

                  {/* Status Badge - repositioned for better visibility */}
                  <div
                    className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-semibold border backdrop-blur-md ${getStatusColor(
                      event.status
                    )} shadow-sm`}
                  >
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </div>

                  {/* Animated Pattern Overlay - only show when no image */}
                  {!event.image && (
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `
                          radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                          radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
                        `,
                          backgroundSize: "40px 40px",
                          animation:
                            hoveredCard === event.id
                              ? "float 3s ease-in-out infinite"
                              : "none",
                        }}
                      ></div>
                    </div>
                  )}

                  {/* Date Display - only show when no poster image or for minimal interference */}
                  {!event.image && (
                    <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                      {isNaN(new Date(event.date).getTime()) ? (
                        <div className="text-2xl font-bold">{event.date}</div>
                      ) : (
                        // If it's a valid date, show formatted parts
                        <>
                          <div className="text-2xl font-bold">
                            {formatDate(event.date).split(" ")[1]}
                          </div>
                          <div className="text-sm opacity-90">
                            {formatDate(event.date).split(" ")[0]}{" "}
                            {formatDate(event.date).split(" ")[2]}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Floating particles - subtle for poster images */}
                  <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-white/30 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping transition-all duration-500"></div>
                  <div className="absolute bottom-12 right-8 w-1 h-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-bounce transition-all duration-700"></div>
                </div>

                {/* Event Content */}
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {event.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Date display in content area for poster images */}
                  {event.image && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      {!isNaN(new Date(event.date).getTime())&&
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>}
                      {!isNaN(new Date(event.date).getTime())
                        ? formatDate(event.date)
                        : event.date}
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-1.5 mb-4">
                    {event.time && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        {(() => {
                          // Try parsing as a Date with today's date + time
                          const testDate = new Date(`1970-01-01T${event.time}`);
                          return isNaN(testDate.getTime())
                            ? event.time
                            : testDate.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              });
                        })()}
                      </div>
                    )}
                    {event.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </div>
                  )}
                  </div>

                  {/* Stats and Action */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {event.registrations && (
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          {event.registrations}{" "}
                          {event.maxCapacity ? `/ ${event.maxCapacity}` : "registered"}
                        </div>
                      )}
                    </div>

                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm group/btn relative overflow-hidden"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click when button is clicked
                        handleEventClick(event);
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                      <span className="relative z-10">View Details</span>
                    </button>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar styles */
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }

        .scrollbar-thumb-blue-300::-webkit-scrollbar-thumb {
          background-color: #93c5fd;
          border-radius: 3px;
        }

        .scrollbar-track-gray-100::-webkit-scrollbar-track {
          background-color: #f3f4f6;
          border-radius: 3px;
        }
      `}</style>
    </section>
  );
};

export default SBEvents;