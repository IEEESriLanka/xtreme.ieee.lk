import React, { useState, useEffect } from "react";
import socialIcons from "../assets/socials";
import logos from "../assets/logos";

export const Navbar = ({ onNavClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Navigation items
  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Events", href: "#events", id: "events" },
    { label: "Committee", href: "#committee", id: "committee" },
    { label: "Rules", href: "#rules", id: "rules" },
    { label: "Guide", href: "#guide", id: "guide" },
    { label: "Contact", href: "#ContactPage", id: "ContactPage" },
  ];

  // Mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const observerOptions = {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

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
    
    setActiveSection(targetId);
    
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
    <header>
      {/* Top Header with enhanced IEEE branding - This will scroll normally */}
      <div className="bg-gradient-to-r from-blue-50/50 via-white/90 to-blue-50/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 md:py-6">
            {/* Social Media Icons with IEEE-themed enhancements */}
            <div className="flex items-center space-x-3 md:space-x-4">
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
                  className={`w-8 h-8 md:w-10 md:h-10 p-1.5 md:p-2 hover:opacity-90 hover:-translate-y-1 hover:scale-110 transition-all duration-300 group relative ${
                    mounted
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: `${social.delay}ms` }}
                >
                  {/* Enhanced hover glow with IEEE colors */}
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

            {/* Enhanced Logo with constant effects and increased size */}
            <div
              className={`flex-1 flex justify-center transition-all duration-1000 ${
                mounted
                  ? "opacity-100 translate-y-0 rotate-0"
                  : "opacity-0 translate-y-4 rotate-3"
              }`}
            >
              <div className="relative group">
                {/* Constant ambient glow - always visible */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/15 via-cyan-400/15 to-blue-600/15 rounded-full blur-xl animate-pulse"></div>
                <div
                  className="absolute -inset-6 bg-blue-400/8 rounded-full blur-2xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>

                {/* Constant floating shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gradient rounded-full"></div>

                {/* Enhanced scroll-based glow */}
                <div className={`absolute -inset-8 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-600/20 rounded-full blur-2xl transition-opacity duration-500 ${
                  scrolled ? 'opacity-100 animate-pulse' : 'opacity-40'
                }`}></div>
                
                {/* Main logo with optimized size - make it clickable */}
                <button 
                  onClick={(e) => handleNavItemClick(e, 'home')}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
                >
                  <img
                    src={logos.ieeextremelogo}
                    alt="IEEEXtreme Programming Competition"
                    className={`h-16 md:h-20 lg:h-26 w-auto filter transition-all duration-500 hover:scale-110 hover:drop-shadow-2xl relative z-10 brightness-105 contrast-105 animate-float cursor-pointer`}
                  />
                </button>
                
                {/* Constant rotating accent rings */}
                <div
                  className="absolute inset-0 rounded-full border border-blue-200/60 animate-spin opacity-40"
                  style={{ animationDuration: "12s" }}
                ></div>
                <div
                  className="absolute inset-2 rounded-full border border-cyan-300/40 animate-spin opacity-30"
                  style={{
                    animationDuration: "8s",
                    animationDirection: "reverse",
                  }}
                ></div>
                <div
                  className="absolute inset-4 rounded-full border border-blue-400/30 animate-spin opacity-20"
                  style={{ animationDuration: "15s" }}
                ></div>

                {/* Hover enhancement */}
                <div className="absolute -inset-2 rounded-full border-2 border-blue-400/0 group-hover:border-blue-400/40 transition-all duration-500 group-hover:animate-pulse"></div>

                {/* Constant sparkle effects */}
                <div
                  className="absolute top-2 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-60 animate-ping"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-50 animate-ping"
                  style={{ animationDelay: "1.2s" }}
                ></div>
                <div
                  className="absolute top-6 left-2 w-1 h-1 bg-blue-300 rounded-full opacity-70 animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </div>

            {/* Enhanced Subscribe Button with proper centering and effects */}
            {/* <div
              className={`hidden lg:block transition-all duration-1000 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              <button className="relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/50 group overflow-hidden border border-blue-500/30">
          
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-cyan-400/30 rounded-xl blur-sm animate-pulse"></div>

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient"></div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-gradient"></div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                
                <span className="relative z-10 inline-flex items-center justify-center gap-2 w-full">
                  Subscribe
                 
                  <div className="relative">
                    <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-2 h-2 bg-cyan-200 rounded-full animate-ping opacity-40"></div>
                    <div className="absolute inset-0 w-2 h-2 bg-white/60 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </span>

                <div className="absolute inset-0 rounded-xl border-2 border-blue-400/20 animate-pulse"></div>

                <div className="absolute inset-0 rounded-xl border-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-500"></div>

                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
              </button>
            </div> */}

            {/* Enhanced Mobile Menu Toggle */}
            <div
              className={`lg:hidden ml-4 transition-all duration-1000 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
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
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Menu - This will be sticky */}
      <nav
        className={`sticky top-0 z-50 bg-gradient-to-r from-white/95 via-blue-50/50 to-white/95 backdrop-blur-md border-t transition-all duration-300 ${
          scrolled 
            ? "border-blue-200/60 shadow-xl shadow-blue-500/15 bg-white/98 backdrop-blur-xl" 
            : "border-gray-200/60 shadow-lg shadow-gray-900/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Menu with enhanced visibility and IEEE theme */}
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

          {/* Enhanced Mobile Menu with better visibility */}
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
      </nav>

      {/* Enhanced CSS for IEEE-themed animations */}
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
            transform: translateY(-8px);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.6),
              0 0 30px rgba(34, 211, 238, 0.3);
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

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </header>
  );
};