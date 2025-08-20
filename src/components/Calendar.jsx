import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Users, ExternalLink } from 'lucide-react';

const Calendar = ({ events = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Helper functions
  const getMonthData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { year, month, daysInMonth, startingDayOfWeek };
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getEventsForDate = (day) => {
    const { year, month } = getMonthData(currentDate);
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      post: 'bg-blue-500',
      workshop: 'bg-green-500',
      seminar: 'bg-purple-500',
      competition: 'bg-red-500',
      meeting: 'bg-yellow-500',
      conference: 'bg-indigo-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const getStatusColor = (status) => {
    const colors = {
      upcoming: 'text-blue-600 bg-blue-100',
      ongoing: 'text-green-600 bg-green-100',
      completed: 'text-gray-600 bg-gray-100',
      cancelled: 'text-red-600 bg-red-100'
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  const { year, month, daysInMonth, startingDayOfWeek } = getMonthData(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create calendar grid
  const calendarDays = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CalendarIcon className="w-6 h-6" />
          Event Calendar
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-xl font-semibold text-gray-700 min-w-48 text-center">
            {formatDate(currentDate)}
          </h3>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="p-3 text-center font-medium text-gray-600 text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1 bg-gray-50 p-2 rounded-lg">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={index} className="p-2 h-20"></div>;
              }

              const dayEvents = getEventsForDate(day);
              const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

              return (
                <div
                  key={day}
                  className={`p-2 h-20 bg-white rounded border hover:shadow-md transition-shadow cursor-pointer ${
                    isToday ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => {
                    if (dayEvents.length > 0) {
                      setSelectedEvent(dayEvents[0]);
                    }
                  }}
                >
                  <div className="text-sm font-medium text-gray-700 mb-1">{day}</div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event, eventIndex) => (
                      <div
                        key={event.id}
                        className={`w-full h-2 rounded text-xs ${getEventTypeColor(event.type)} opacity-80`}
                        title={event.title}
                      ></div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Event Types</h4>
            <div className="flex flex-wrap gap-4">
              {['post', 'workshop', 'seminar', 'competition', 'meeting', 'conference'].map(type => (
                <div key={type} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${getEventTypeColor(type)}`}></div>
                  <span className="text-sm text-gray-600 capitalize">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Details Panel */}
        <div className="lg:col-span-1">
          {selectedEvent ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded ${getEventTypeColor(selectedEvent.type)}`}></div>
                  <span className="text-xs font-medium text-gray-500 uppercase">{selectedEvent.type}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedEvent.status)}`}>
                    {selectedEvent.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{selectedEvent.title}</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                </div>
                
                {selectedEvent.time && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{selectedEvent.time}</span>
                  </div>
                )}

                {selectedEvent.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}

                {selectedEvent.registrations && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{selectedEvent.registrations} registered</span>
                    {selectedEvent.maxCapacity && <span>/ {selectedEvent.maxCapacity}</span>}
                  </div>
                )}
              </div>

              {selectedEvent.description && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{selectedEvent.description}</p>
                </div>
              )}

              {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedEvent.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.hashtags && selectedEvent.hashtags.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Hashtags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedEvent.hashtags.map((tag, index) => (
                      <span key={index} className="text-xs text-blue-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.timeline && selectedEvent.timeline.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Timeline</h4>
                  <div className="space-y-2">
                    {selectedEvent.timeline.map((item, index) => (
                      <div key={index} className="border-l-2 border-blue-300 pl-3">
                        <div className="text-xs font-medium text-gray-600">{item.time}</div>
                        <div className="text-sm font-medium text-gray-800">{item.title}</div>
                        <div className="text-xs text-gray-600">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.buttonlink && (
                <div className="mt-4">
                  <a
                    href={selectedEvent.buttonlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    {selectedEvent.buttontext || 'Learn More'}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
              <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Click on a day with events to see details</p>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Events List */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events
            .filter(event => new Date(event.date) >= new Date().setHours(0, 0, 0, 0))
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 6)
            .map(event => (
              <div
                key={event.id}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded ${getEventTypeColor(event.type)}`}></div>
                  <span className="text-xs font-medium text-gray-500 uppercase">{event.type}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                <h5 className="font-medium text-gray-800 mb-2 line-clamp-2">{event.title}</h5>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CalendarIcon className="w-3 h-3" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                  {event.time && (
                    <>
                      <Clock className="w-3 h-3 ml-2" />
                      <span>{event.time}</span>
                    </>
                  )}
                </div>
                {event.registrations && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Users className="w-3 h-3" />
                    <span>{event.registrations} registered</span>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;