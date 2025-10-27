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
import Lenis from "lenis";
import SBEvents from "./components/SbEvents";

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

   

    // Cleanup function
    return () => {
      lenis.destroy();
     
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
