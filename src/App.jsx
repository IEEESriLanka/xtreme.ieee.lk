import { useState, useEffect } from "react";
import { HeroSection } from "./components/HeroSection";
import RulesSection from "./components/RulesSection";
import About from "./components/About";
import Committee from "./components/Commitee";
import ContactPage from "./components/ContactPage";
import GuideSection from "./components/GuideSection";
import Footer from "./components/Footer";
import Events from "./components/Events";
import EventDetails from "./components/EventDetails";
import { TopHeader } from "./components/TopHeader";
import { StickyNavigation } from "./components/StickyNavigation";
import PastWinners from "./components/PastWinners";
import Calendar from "./components/Calendar";
import registration from "./assets/Events/Registration";

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [forceRefresh, setForceRefresh] = useState(0);

  // Add smooth momentum scrolling like mobile
  useEffect(() => {
    let isScrolling = false;
    let scrollVelocity = 0;
    let animationId = null;

    const smoothScroll = (e) => {
      e.preventDefault();
      
      const delta = e.deltaY;
      const scrollAmount = delta * 0.2; 
      
      scrollVelocity += scrollAmount;
      
      if (!isScrolling) {
        isScrolling = true;
        
        const scroll = () => {
          if (Math.abs(scrollVelocity) > 0.1) {
            window.scrollBy(0, scrollVelocity);
            scrollVelocity *= 0.85; // Friction/deceleration factor
            animationId = requestAnimationFrame(scroll);
          } else {
            isScrolling = false;
            scrollVelocity = 0;
          }
        };
        
        scroll();
      }
    };

    // Add wheel event listener with passive: false to allow preventDefault
    document.addEventListener('wheel', smoothScroll, { passive: false });

    // Add smooth scrolling styles and custom blue gradient scrollbar
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      /* Custom Blue Gradient Scrollbar */
      ::-webkit-scrollbar {
        width: 12px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, #3b82f6, #1d4ed8, #0ea5e9);
        border-radius: 10px;
        border: 2px solid #f1f5f9;
        transition: all 0.3s ease;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(45deg, #2563eb, #1e40af, #0284c7);
        border: 2px solid #e2e8f0;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
      }
      
      ::-webkit-scrollbar-thumb:active {
        background: linear-gradient(45deg, #1d4ed8, #1e3a8a, #0369a1);
      }
      
      /* Firefox scrollbar */
      html {
        scrollbar-width: thin;
        scrollbar-color: #3b82f6 #f1f5f9;
      }
      
      /* Custom scrollbar for horizontal scroll if needed */
      ::-webkit-scrollbar:horizontal {
        height: 12px;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      document.removeEventListener('wheel', smoothScroll);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleBackToMain = () => {
    setSelectedEvent(null);

    setForceRefresh((prev) => prev + 1);

    setTimeout(() => {
      const eventsElement = document.getElementById("events");
      if (eventsElement) {
        eventsElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); 
  };

  const handleLogoClick = () => {
    // Scroll to home or handle logo click
    const homeElement = document.getElementById("home");
    if (homeElement) {
      homeElement.scrollIntoView({ behavior: "smooth" });
    }
    setSelectedEvent(null); 
    setActiveSection("home");
  };

  const handleNavClick = () => {
    setSelectedEvent(null); 

    setForceRefresh((prev) => prev + 1);
  };

  const handleFooterNavClick = (sectionId) => {
    setSelectedEvent(null); 
    setActiveSection(sectionId); 

    setForceRefresh((prev) => prev + 1);

    // Scroll to the section
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const targetPosition =
          element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const events = [
  {
    id: 1,
    type: 'post',
    title: ' IEEEXtreme 19.0 is here!',
    description: 
  `🌐 The Ultimate 24-Hour Global Coding Challenge

    📅 Date: 25 October 2025
    🕛 Starts at: 00:00 UTC (GMT+5:30)

    ⚡ Are you ready to code without limits?

    Team up. Compete. Conquer. From anywhere in the world.

    ✅ Open to all IEEE student members
    👨‍💻 Solve real-world challenges
    🏆 Compete globally and win exciting prizes

    🎯 Registrations are NOW OPEN!

    📢 Don't miss your chance to be part of history.

    `,
    buttontext:'Register Now',
    buttonlink:'https://xtreme.vtools.ieee.org/',
    date: '2025-10-25',
    time: '00:00 UTC',
    location: 'Virtual Global Event',
    status: 'upcoming',
    image: registration.image1,
    registrations: 156,
    hashtags:['IEEEXtreme19 ','CodeTheXtreme ','GlobalHackathon','IEEEStudents' ,'RegisterNow' ,'24HourCodingChallenge'],
    maxCapacity: '',
    tags: ['Problem Solving', 'Competitive Programming', 'Global'],
    timeline: [
      {
        time: '00:00 UTC',
        title: 'Competition Starts',
        desc: 'Teams begin working on programming challenges worldwide'
      },
      {
        time: '06:00 UTC',
        title: 'First Checkpoint',
        desc: 'Leaderboard updates and progress assessment'
      },
      {
        time: '12:00 UTC',
        title: 'Midpoint Review',
        desc: 'Halfway through the competition - time for strategy adjustments'
      },
      {
        time: '18:00 UTC',
        title: 'Final Sprint',
        desc: 'Last 6 hours - teams push for final solutions'
      },
      {
        time: '23:59 UTC',
        title: 'Competition Ends',
        desc: 'Submission deadline and final leaderboard calculations'
      }
    ]
  },
];

  return (
    <>
      <TopHeader onLogoClick={handleLogoClick} />
      <StickyNavigation
        onNavClick={handleNavClick}
        onLogoClick={handleLogoClick}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        forceRefresh={forceRefresh}
      />
      {selectedEvent ? (
        <EventDetails event={selectedEvent} onBack={handleBackToMain} />
      ) : (
        <>
          <HeroSection />
          <About/>
          <Events onEventSelect={handleEventSelect} />
          {/* <Calendar events={events} /> */}
          {/*<PastWinners/>*/}
          <Committee/>
          <RulesSection />
          <GuideSection />
          <ContactPage />
          <Footer onNavClick={handleFooterNavClick} />

        </>
      )}
    </>
  );
}

export default App;