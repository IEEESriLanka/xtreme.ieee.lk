import React, { useState, useEffect, useRef } from "react";
import events from "../constants/Events";

const Events = ({ onEventSelect }) => {
  const [visibleSections, setVisibleSections] = useState({
    header: false,
    events: false,
  });
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);

  const headerRef = useRef(null);
  const eventsRef = useRef(null);

  // Intersection Observer for scroll animations
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
    if (eventsRef.current) observer.observe(eventsRef.current);

    return () => observer.disconnect();
  }, []);



  const filters = [
    { id: "all", label: "All Events", count: events.length },
    {
      id: "workshop",
      label: "Workshops",
      count: events.filter((e) => e.type === "workshop").length,
    },
    {
      id: "update",
      label: "Updates",
      count: events.filter((e) => e.type === "update").length,
    },
    {
      id: "post",
      label: "Posts",
      count: events.filter((e) => e.type === "post").length,
    },
    // {
    //   id: "sb-event",
    //   label: "SB Events",
    //   count: events.filter((e) => e.type === "sb-event").length,
    // }, // ✅ New category
  ];

  const filteredEvents =
    activeFilter === "all"
      ? events
      : events.filter((event) => event.type === activeFilter);

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
      case "completed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "workshop":
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        );
      case "update":
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
              d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5V7a12 12 0 0124 0v10z"
            />
          </svg>
        );
      case "post":
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
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        );
      default:
        return null;
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
      id="events"
      className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          data-section="header"
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl sm:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              visibleSections.header
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="relative">
              Latest Events & Updates
              {/* Animated underline */}
              <div
                className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 delay-500 ${
                  visibleSections.header ? "w-32" : "w-0"
                }`}
              ></div>
              {/* Floating binary digits */}
              <div
                className={`absolute -top-4 -right-8 text-blue-300 font-mono text-sm transition-all duration-1000 delay-700 ${
                  visibleSections.header
                    ? "opacity-60 animate-pulse"
                    : "opacity-0"
                }`}
              >
                01010
              </div>
              <div
                className={`absolute -bottom-4 -left-6 text-cyan-300 font-mono text-xs transition-all duration-1000 delay-900 ${
                  visibleSections.header
                    ? "opacity-40 animate-bounce"
                    : "opacity-0"
                }`}
              >
                110
              </div>
            </span>
          </h2>
          <p
            className={`text-xl text-gray-600 max-w-4xl mx-auto mb-8 transition-all duration-1000 delay-300 ${
              visibleSections.header
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Stay updated with our latest{" "}
            <span className="text-blue-600 font-semibold">workshops</span>,
            <span className="text-blue-600 font-semibold"> announcements</span>,
            and
            <span className="text-blue-600 font-semibold">
              {" "}
              success stories
            </span>{" "}
            from the IEEEXtreme community.
          </p>

          {/* Filter Tabs */}
          <div
            className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-1000 delay-500 ${
              visibleSections.header
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group ${
                  activeFilter === filter.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-200"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Button shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <span className="relative z-10 flex items-center gap-2">
                  {filter.label}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      activeFilter === filter.id
                        ? "bg-white/20"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {filter.count}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div
          ref={eventsRef}
          data-section="events"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group overflow-hidden hover:-translate-y-2 cursor-pointer ${
                visibleSections.events
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
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
                    </svg>
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
                        {event.maxCapacity ? `/ ${event.maxCapacity}` : "views"}
                      </div>
                    )}
                    {event.views && (
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        {event.views} views
                      </div>
                    )}
                    {event.users && (
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
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                          />
                        </svg>
                        {event.users} users
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
                    <span className="relative z-10">
                      {event.type === "workshop"
                        ? "View Details"
                        : event.type === "post"
                        ? "Read More"
                        : "Learn More"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Events;
