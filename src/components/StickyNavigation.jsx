import React, { useState, useEffect } from "react";
import socialIcons from "../assets/socials";
import logos from "../assets/logos";

export const StickyNavigation = ({ onNavClick, onLogoClick, activeSection, setActiveSection, forceRefresh }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Navigation items
  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Events", href: "#events", id: "events" },
    // { label: "Past Winners", href: "#pastwinners", id: "pastwinners" },
    { label: "Team", href: "#committee", id: "committee" },
    { label: "Rules", href: "#rules", id: "rules" },
    { label: "Guide", href: "#guide", id: "guide" },
    { label: "Contact", href: "#ContactPage", id: "ContactPage" },
  ];

  // Force refresh effect - triggers when forceRefresh prop changes
  useEffect(() => {
    if (forceRefresh && setActiveSection) {
      // Wait a bit for DOM to be ready, then force a section check
      const timer = setTimeout(() => {
        let maxVisibleArea = 0;
        let mostVisibleSection = null;
        
        navItems.forEach((item) => {
          const element = document.getElementById(item.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Calculate visible area of the section
            const top = Math.max(0, rect.top);
            const bottom = Math.min(viewportHeight, rect.bottom);
            const visibleHeight = Math.max(0, bottom - top);
            
            if (visibleHeight > maxVisibleArea && visibleHeight > 50) {
              maxVisibleArea = visibleHeight;
              mostVisibleSection = item.id;
            }
          }
        });
        
        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
        } else {
          // Default to home if nothing is clearly visible
          setActiveSection('home');
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [forceRefresh, setActiveSection]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Clear any existing observer
    let observer;
    let isActive = true;
    
    // Function to find which section is currently most visible
    const findActiveSection = () => {
      if (!isActive) return;
      
      let maxVisibleArea = 0;
      let mostVisibleSection = null;
      
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Calculate visible area of the section
          const top = Math.max(0, rect.top);
          const bottom = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = Math.max(0, bottom - top);
          
          if (visibleHeight > maxVisibleArea && visibleHeight > 50) { // Minimum 50px visible
            maxVisibleArea = visibleHeight;
            mostVisibleSection = item.id;
          }
        }
      });
      
      // If we found a section and it's different from current, update it
      if (mostVisibleSection && setActiveSection) {
        setActiveSection(mostVisibleSection);
      }
    };
    
    // Initial check after a short delay
    const initialCheck = setTimeout(() => {
      findActiveSection();
    }, 200);
    
    // Small delay to ensure DOM is ready
    const setupObserver = () => {
      if (!isActive) return;
      
      const observerOptions = {
        rootMargin: "-10% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
      };

      observer = new IntersectionObserver((entries) => {
        if (!isActive) return;
        
        // Find the entry with the highest intersection ratio that's actually intersecting
        let bestEntry = null;
        let bestRatio = 0;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestEntry = entry;
          }
        });
        
        if (bestEntry && setActiveSection) {
          setActiveSection(bestEntry.target.id);
        } else {
          // Fallback: manually check which section is most visible
          findActiveSection();
        }
      }, observerOptions);

      // Check for sections with a small delay to ensure they exist
      const observeSections = () => {
        if (!isActive) return;
        
        let foundSections = 0;
        navItems.forEach((item) => {
          const element = document.getElementById(item.id);
          if (element) {
            observer.observe(element);
            foundSections++;
          }
        });
        
        // If no sections found, try again after a short delay
        if (foundSections === 0 && isActive) {
          setTimeout(observeSections, 100);
        } else if (foundSections > 0) {
          // Once we have sections, do an immediate check
          setTimeout(findActiveSection, 50);
        }
      };
      
      observeSections();
    };

    // Setup observer with a delay
    const timeoutId = setTimeout(setupObserver, 100);

    // Also listen to scroll events as backup
    const handleScroll = () => {
      if (!isActive) return;
      findActiveSection();
    };
    
    // Throttled scroll listener
    let scrollTimeout;
    const throttledScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 100);
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      isActive = false;
      clearTimeout(initialCheck);
      clearTimeout(timeoutId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', throttledScroll);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [setActiveSection, mounted]); // Add mounted to dependencies to re-setup when component mounts

  const smoothScrollTo = (targetId, offset = 80) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNavItemClick = (e, targetId) => {
    e.preventDefault();
    
    if (setActiveSection) {
      setActiveSection(targetId);
    }
    
    if (onNavClick) {
      onNavClick();
    }
    setIsMobileMenuOpen(false);
    
    setTimeout(() => {
      smoothScrollTo(targetId);
    }, 100);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/98 backdrop-blur-xl shadow-xl shadow-blue-500/15 border-b border-blue-100/30"
          : "bg-gradient-to-r from-white/95 via-blue-50/50 to-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-lg shadow-gray-900/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Header with Logo, Social Icons, and Menu Toggle */}
        <div className="lg:hidden flex items-center justify-between py-4">
          {/* Social Media Icons - Mobile */}
          <div className="flex items-center space-x-2">
            {[
              {
                icon: socialIcons.globe,
                alt: "Website",
                href: "https://ieee.lk",
                delay: 0,
                color: "from-blue-500 to-cyan-400",
              },
              {
                icon: socialIcons.facebook,
                alt: "Facebook",
                href: "https://www.facebook.com/IEEESriLanka",
                delay: 100,
                color: "from-blue-600 to-indigo-500",
              },
              {
                icon: socialIcons.linkedin,
                alt: "LinkedIn",
                href: "https://www.linkedin.com/company/ieeesrilanka",
                delay: 200,
                color: "from-blue-700 to-blue-500",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`w-7 h-7 p-1 hover:opacity-90 hover:-translate-y-1 hover:scale-110 transition-all duration-300 group relative ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${social.delay}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20 rounded-full scale-0 group-hover:scale-150 transition-all duration-300 blur-sm`}
                ></div>

                <img
                  src={social.icon}
                  alt={social.alt}
                  className="w-full h-full object-contain relative z-10 filter group-hover:brightness-110 group-hover:contrast-110"
                />

                {/* Pulse ring effect */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400 scale-0 group-hover:scale-125 group-hover:opacity-0 opacity-60 transition-all duration-700"></div>

                {/* Secondary ring */}
                <div className="absolute inset-0 rounded-full border border-blue-300 scale-100 group-hover:scale-150 group-hover:opacity-0 opacity-30 transition-all duration-500 delay-100"></div>
              </a>
            ))}
          </div>

          {/* Logo - Mobile */}
          <div
            className={`flex-1 flex justify-center px-4 transition-all duration-1000 ${
              mounted
                ? "opacity-100 translate-y-0 rotate-0"
                : "opacity-0 translate-y-4 rotate-3"
            }`}
          >
            <div className="relative group">
              {/* Constant ambient glow - always visible */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/15 via-cyan-400/15 to-blue-600/15 rounded-full blur-lg animate-pulse"></div>
              <div
                className="absolute -inset-3 bg-blue-400/8 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* Constant floating shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gradient rounded-full"></div>

              {/* Enhanced scroll-based glow */}
              <div className={`absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-600/20 rounded-full blur-xl transition-opacity duration-500 ${
                scrolled ? 'opacity-100 animate-pulse' : 'opacity-40'
              }`}></div>
              
              {/* Main logo - Mobile size */}
              <button 
                onClick={onLogoClick}
                className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
              >
                <img
                  src={logos.ieeextremelogo}
                  alt="IEEEXtreme Programming Competition"
                  className={`h-12 w-auto filter transition-all duration-500 hover:scale-110 hover:drop-shadow-2xl relative z-10 brightness-105 contrast-105 animate-float cursor-pointer`}
                />
              </button>
              
              {/* Constant rotating accent rings - smaller for mobile */}
              <div
                className="absolute inset-0 rounded-full border border-blue-200/60 animate-spin opacity-40"
                style={{ animationDuration: "12s" }}
              ></div>
              <div
                className="absolute inset-1 rounded-full border border-cyan-300/40 animate-spin opacity-30"
                style={{
                  animationDuration: "8s",
                  animationDirection: "reverse",
                }}
              ></div>

              {/* Hover enhancement */}
              <div className="absolute -inset-1 rounded-full border-2 border-blue-400/0 group-hover:border-blue-400/40 transition-all duration-500 group-hover:animate-pulse"></div>

              {/* Constant sparkle effects - smaller for mobile */}
              <div
                className="absolute top-1 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-60 animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute bottom-2 left-3 w-1 h-1 bg-cyan-400 rounded-full opacity-50 animate-ping"
                style={{ animationDelay: "1.2s" }}
              ></div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="flex flex-col space-y-1 p-2 hover:bg-blue-50 rounded-lg transition-all duration-300 group border border-transparent hover:border-blue-200"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "rotate-45 translate-y-1.5 bg-blue-600"
                  : "bg-gray-700 group-hover:bg-blue-600"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "opacity-0"
                  : "bg-gray-700 group-hover:bg-blue-600"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "-rotate-45 -translate-y-1.5 bg-blue-600"
                  : "bg-gray-700 group-hover:bg-blue-600"
              }`}
            ></span>
          </button>
        </div>

        <ul className="hidden lg:flex justify-center space-x-0">
          {navItems.map((item, index) => (
            <li key={item.id} className="relative">
              <a
                href={item.href}
                onClick={(e) => handleNavItemClick(e, item.id)}
                className={`block px-8 py-5 font-semibold text-lg transition-all duration-300 relative group ${
                  activeSection === item.id
                    ? "text-blue-700 font-bold"
                    : "text-gray-800 hover:text-blue-700 hover:font-bold"
                }`}
              >
                {item.label}

                {/* Active indicator with gradient */}
                <span
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? "w-4/5 opacity-100"
                      : "w-0 opacity-0"
                  }`}
                ></span>

                {/* Hover effect with enhanced visibility */}
                <span
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? "w-0"
                      : "w-0 group-hover:w-3/5"
                  }`}
                ></span>

                {/* Background hover with better contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-lg -m-1 shadow-sm"></div>

                {/* Enhanced floating particles */}
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-ping transition-all duration-500"></div>
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700 delay-200"></div>

                {/* Side glow effects */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:h-1/2 transition-all duration-500"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-60 group-hover:h-1/2 transition-all duration-500 delay-100"></div>
              </a>
            </li>
          ))}
        </ul>

        <div
          className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="py-2">
            {navItems.map((item, index) => (
              <li
                key={item.id}
                className={`border-b border-blue-100/50 transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavItemClick(e, item.id)}
                  className={`block px-4 py-4 font-semibold text-center transition-all duration-300 relative group ${
                    activeSection === item.id
                      ? "text-blue-700 bg-gradient-to-r from-blue-50 to-cyan-50 font-bold border-l-4 border-blue-500"
                      : "text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-50 hover:text-blue-700 hover:font-bold"
                  }`}
                >
                  {item.label}

                  {/* Mobile active indicator */}
                  <div
                    className={`absolute left-1/2 bottom-1 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-300 ${
                      activeSection === item.id
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-0"
                    }`}
                  ></div>

                  {/* Enhanced ripple effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 scale-0 group-active:scale-100 transition-transform duration-300 rounded"></div>

                  {/* Side accent */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-400 transition-all duration-300 ${
                      activeSection === item.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-50"
                    }`}
                  ></div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </nav>
  );
};