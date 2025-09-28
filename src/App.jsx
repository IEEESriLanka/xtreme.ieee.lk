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
import Lenis from "lenis";
import SBEvents from "./components/SbEvents";
import Diaries from "./components/Diaries";

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [forceRefresh, setForceRefresh] = useState(0);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const style = document.createElement("style");
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      /* Ensure body can scroll normally as fallback */
      body {
        overflow-x: hidden;
        overflow-y: auto;
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
      
      /* Ensure compatibility across browsers */
      * {
        box-sizing: border-box;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      lenis.destroy();
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
    setActiveSection(sectionId); // Update active section

    // Force refresh for proper navigation
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
          <About />
          <Events onEventSelect={handleEventSelect} />
          <SBEvents onEventSelect={handleEventSelect} /> {/* ✅ Student Branch Events */}
          {/* <Calendar events={events} /> */}
          {/* <Diaries/> */}
          <Committee />
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
