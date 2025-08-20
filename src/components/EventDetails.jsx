import React, { useState, useEffect, useRef } from 'react';

const EventDetails = ({ event = {}, onBack }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);

  const currentEvent = event;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

const getStatusColor = (status = 'upcoming') => {
  switch(status) {
    case 'upcoming': return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-300';
    case 'active': return 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-blue-400';
    case 'ongoing': return 'bg-gradient-to-r from-orange-400 to-red-400 text-white border-orange-400';
    case 'published': return 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-500';
    default: return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300';
  }
};

  const getTypeIcon = (type) => {
    switch(type) {
      case 'workshop':
        return (
          <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'hackathon':
        return (
          <svg className="w-8 h-8 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'post':
        return (
          <svg className="w-8 h-8 animate-bounce-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calendar functions
  const formatDateForCalendar = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return null; // empty values

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null; // invalid date

  const [time, period] = timeStr.split(' ');
  if (!time || !period) return null;

  const [hours, minutes] = time.split(':');
  if (isNaN(hours) || isNaN(minutes)) return null;

  let hour24 = parseInt(hours, 10);
  if (period.toUpperCase() === 'PM' && hour24 !== 12) hour24 += 12;
  if (period.toUpperCase() === 'AM' && hour24 === 12) hour24 = 0;

  date.setHours(hour24, parseInt(minutes, 10));
  if (isNaN(date.getTime())) return null; // final check

  return date;
};


  const formatDateTimeForCalendar = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

const generateCalendarUrls = () => {
  const startDate = formatDateForCalendar(event.date, event.time);
  if (!startDate) {
    // Invalid date/time → return empty links
    return { google: '', yahoo: '', outlook: '' };
  }

  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // +2 hrs
  const startDateTime = formatDateTimeForCalendar(startDate);
  const endDateTime = formatDateTimeForCalendar(endDate);

  const eventDetails = {
    title: encodeURIComponent(event.title),
    description: encodeURIComponent(event.description || ''),
    location: encodeURIComponent(event.location || ''),
    start: startDateTime,
    end: endDateTime,
  };

  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventDetails.title}&dates=${eventDetails.start}/${eventDetails.end}&details=${eventDetails.description}&location=${eventDetails.location}`,
    yahoo: `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${eventDetails.title}&st=${eventDetails.start}&et=${eventDetails.end}&desc=${eventDetails.description}&in_loc=${eventDetails.location}`,
    outlook: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${eventDetails.title}&startdt=${eventDetails.start}&enddt=${eventDetails.end}&body=${eventDetails.description}&location=${eventDetails.location}`,
  };
};


  const calendarUrls = generateCalendarUrls();

  const downloadICS = () => {
    const startDate = formatDateForCalendar(event.date, event.time);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    
    const formatICSDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${event.title || ''}
DESCRIPTION:${event.description || ''}
LOCATION:${event.location || ''}
URL:${event.buttonlink || ''}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title || 'event'}.ics`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '⚡' },
    ...(event.timeline && event.timeline.length > 0 ? [{ id: 'timeline', label: 'Timeline', icon: '⏱️' }] : [])
  ];

  const getEventContent = (tabId) => {
    switch(tabId) {
      case 'overview':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center text-white text-sm font-bold animate-pulse-glow">!</span>
                Overview
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-6 whitespace-pre-line animate-typewriter">
                {event.description}
              </p>
              
              {/* Event Action Button */}
              {event.buttontext && event.buttonlink && (
                <div className="mb-6">
                  <a 
                    href={event.buttonlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3 px-8 rounded-xl font-bold text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl shadow-lg animate-glow-pulse group"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <span className="flex items-center gap-2">
                      {event.buttontext}
                      <svg className={`w-5 h-5 transition-transform duration-300 ${isHovering ? 'translate-x-2' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </a>
                </div>
              )}

              {/* Event Hashtags */}
              {event.hashtags && event.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {event.hashtags.map((hashtag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:from-blue-200 hover:to-cyan-200 transition-all duration-300 hover:scale-105 animate-float-delayed cursor-pointer"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      #{hashtag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      
      case 'timeline':
        return event.timeline && event.timeline.length > 0 ? (
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center text-white text-sm font-bold animate-spin-slow">⏰</span>
              Event Timeline
            </h3>
            
            <div className="space-y-4">
              {event.timeline.map((item, index) => (
                <div 
                  key={index} 
                  className={`border-l-4 ${index % 2 === 0 ? 'border-blue-500' : 'border-cyan-400'} pl-6 pb-4 bg-gradient-to-r ${index % 2 === 0 ? 'from-blue-50 to-white' : 'from-cyan-50 to-white'} rounded-r-lg shadow-md hover:shadow-xl transition-all duration-500 hover:translate-x-2 animate-slide-in-right`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className={`${index % 2 === 0 ? 'bg-blue-600' : 'bg-cyan-500'} text-white px-4 py-2 rounded-full text-sm font-bold shadow-md animate-bounce-subtle hover:animate-pulse`}>
                      {item.time}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                  </div>
                  <p className="text-gray-600 ml-20">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-floating-particles opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Interactive cursor glow */}
      <div 
        className="fixed w-96 h-96 bg-gradient-radial from-blue-500/10 to-transparent rounded-full pointer-events-none z-10 transition-all duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Back Navigation */}
      <div className="bg-white/95 backdrop-blur-md border-b border-blue-200/60 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-500 group hover:scale-105"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Back to Events</span>
            </button>
            
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(currentEvent.status)} shadow-md animate-pulse-glow`}>
                {(currentEvent.status || 'upcoming').charAt(0).toUpperCase() + (currentEvent.status || 'upcoming').slice(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Title Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8" ref={heroRef}>
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-xl animate-float hover:animate-spin-slow transition-all duration-500">
              {getTypeIcon(event.type)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {(currentEvent.tags || []).map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full text-sm font-medium shadow-lg animate-slide-in-down hover:scale-110 transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent animate-gradient-text">
                {currentEvent.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Event Image and Meta Info Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Event Image - Made larger */}
              {event.image && (
                <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white group animate-scale-in">
                  <div className="aspect-square w-full">
                    <img 
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500"></div>
                    
                    {/* IEEEXtreme overlay branding */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-blue-600/90 to-cyan-500/90 backdrop-blur-sm px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg animate-pulse-glow">
                        IEEEXtreme
                      </div>
                    </div>

                    {/* Animated corner decorations */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-cyan-500/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
              )}
              
              {/* Event Meta Info - Fixed layout */}
              <div className="lg:col-span-1 bg-gradient-to-r from-white/95 via-blue-50/80 to-white/95 backdrop-blur-md rounded-2xl shadow-xl border-2 border-blue-200/50 p-8 animate-slide-in-left hover:shadow-2xl transition-all duration-500">
                <div className="space-y-8">
                  <div className="group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg group-hover:animate-bounce transition-all duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-1">Event Date</h4>
                        <p className="text-gray-900 font-semibold text-base leading-tight">
  {(() => {
    const d = new Date(event.date);
    return isNaN(d.getTime()) ? event.date : formatDate(event.date);
  })()}
</p>
                        
                        </div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg group-hover:animate-spin transition-all duration-500">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-cyan-700 uppercase tracking-wide mb-1">Start Time</h4>
                        <p className="text-gray-900 font-semibold text-base">{event.time}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg group-hover:animate-pulse transition-all duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-1">Location</h4>
                        <p className="text-gray-900 font-semibold text-base leading-tight">{event.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Content Area */}
            <div className="lg:col-span-3">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-blue-200">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold text-sm transition-all duration-500 relative overflow-hidden group ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg transform -translate-y-1 animate-glow-pulse'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:scale-105'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Animated background for inactive tabs */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <span className="text-lg relative z-10">{tab.icon}</span>
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-blue-100 p-8 animate-fade-in hover:shadow-2xl transition-all duration-500">
                {getEventContent(activeTab)}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Add to Calendar Card */}
                {
                  calendarUrls.google && 
                
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-blue-100 p-6 animate-slide-in-right hover:shadow-2xl transition-all duration-500 group">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:animate-spin-slow transition-all duration-500">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Add to Calendar</h3>
                    <p className="text-gray-600 text-sm">
                      Never miss this event! Add it to your preferred calendar app.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <a 
                      href={calendarUrls.google}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-500 hover:scale-105 shadow-lg flex items-center justify-center gap-2 group animate-pulse-glow"
                    >
                      <svg className="w-4 h-4 group-hover:animate-spin" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google Calendar
                    </a>
                    
                    <a 
                      href={calendarUrls.outlook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-500 hover:scale-105 shadow-lg flex items-center justify-center gap-2 group animate-glow-pulse"
                      style={{ animationDelay: '0.2s' }}
                    >
                      <svg className="w-4 h-4 group-hover:animate-bounce" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.87t.1-.87q.1-.41.33-.74.22-.33.58-.52.36-.2.87-.2t.85.2q.35.21.57.55.22.33.33.75.1.42.1.87zM21.5 22.5h-19v-21h19v21zm-18-20v19h17v-19h-17z"/>
                        <path d="M2.5 1.5h19v21h-19v-21zm18 20v-19h-17v19h17z"/>
                      </svg>
                      Outlook
                    </a>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <a 
                        href={calendarUrls.yahoo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-500 hover:scale-105 shadow-lg flex items-center justify-center gap-1 group animate-pulse"
                        style={{ animationDelay: '0.4s' }}
                      >
                        <span className="group-hover:animate-bounce">Yahoo</span>
                      </a>
                      
                      <button 
                        onClick={downloadICS}
                        className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-500 hover:scale-105 shadow-lg flex items-center justify-center gap-1 group animate-pulse"
                        style={{ animationDelay: '0.6s' }}
                      >
                        <span className="group-hover:animate-bounce">Apple</span>
                      </button>
                    </div>
                  </div>
                </div>
                }
                {/* Quick Info */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-blue-100 p-6 animate-slide-in-right group hover:shadow-2xl transition-all duration-500" style={{ animationDelay: '0.2s' }}>
                  <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                    <span className="animate-pulse">📊</span>
                    Event Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm group/item hover:scale-105 transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg group-hover/item:animate-spin">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Format</div>
                        <div className="text-gray-600">
                          {event.location?.includes('Virtual') ? 'Online' : 'Hybrid Event'}
                        </div>
                      </div>
                    </div>
                    {event.registration &&
                    <div className="flex items-center gap-3 text-sm group/item hover:scale-105 transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg group-hover/item:animate-bounce">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      
                        <div>
                        <div className="font-semibold text-gray-900">Registration</div>
                        <div className="text-gray-600">Free for IEEE Members</div>
                      </div>
                    </div>}
                  </div>
                </div>
                
                {/* Support */}
                {/* <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 p-6 shadow-lg animate-slide-in-right group hover:shadow-2xl hover:scale-105 transition-all duration-500" style={{ animationDelay: '0.4s' }}>
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-blue-600 animate-bounce">💬</span>
                    Need Support?
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Questions about the competition? Technical issues? Our IEEE team is ready to help!
                  </p>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-2 border-transparent py-3 px-4 rounded-xl text-sm font-bold transition-all duration-500 hover:scale-105 shadow-lg animate-glow-pulse group/button">
                    <span className="flex items-center justify-center gap-2">
                      Contact IEEE Support
                      <svg className="w-4 h-4 group-hover/button:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS for IEEE-themed animations */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(34, 211, 238, 0.3);
            transform: scale(1.02);
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
          }
          50% { 
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6), 0 0 30px rgba(34, 211, 238, 0.4);
          }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
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
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }
        
        .animate-slide-in-down {
          animation: slide-in-down 0.5s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-typewriter {
          animation: typewriter 2s steps(40, end) forwards;
        }
        
        .animate-floating-particles {
          animation: floating-particles ease-in-out infinite;
        }
        
        /* Gradient radial utility */
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        /* Custom hover effects */
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        /* Interactive elements */
        .interactive-glow {
          position: relative;
          overflow: hidden;
        }
        
        .interactive-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .interactive-glow:hover::before {
          left: 100%;
        }
        
        /* Scrolling animations */
        @media (prefers-reduced-motion: no-preference) {
          .scroll-animate {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
          }
          
          .scroll-animate.in-view {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default EventDetails;