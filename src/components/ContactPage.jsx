import React, { useState, useEffect, useRef } from "react";

// Social links with enhanced data
const socialLinks = [
  {
    href: "https://www.facebook.com/IEEEXtreme",
    icon: "facebook",
    label: "Facebook",
    color: "from-blue-600 to-blue-800",
    hoverColor: "hover:from-blue-500 hover:to-blue-700",
    description: "Follow us for updates",
  },
  {
    href: "https://www.instagram.com/ieeesrilanka",
    icon: "instagram",
    label: "Instagram",
    color: "from-pink-500 to-purple-600",
    hoverColor: "hover:from-pink-400 hover:to-purple-500",
    description: "See our latest photos",
  },
  {
    href: "https://wa.me/",
    icon: "whatsapp",
    label: "WhatsApp",
    color: "from-green-500 to-green-700",
    hoverColor: "hover:from-green-400 hover:to-green-600",
    description: "Chat with us directly",
  },
  {
    href: "https://www.linkedin.com/company/ieeesrilanka",
    icon: "linkedin",
    label: "LinkedIn",
    color: "from-blue-500 to-blue-700",
    hoverColor: "hover:from-blue-400 hover:to-blue-600",
    description: "Professional network",
  },
];

// Icon components
const SocialIcon = ({ type, className = "" }) => {
  const iconProps = {
    className: `${className} drop-shadow-md`,
    fill: "currentColor",
    viewBox: "0 0 24 24",
  };

  switch (type) {
    case "facebook":
      return (
        <svg {...iconProps}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...iconProps}>
          <path d="M12.017 0C8.396 0 7.826.011 6.624.064 2.248.227.228 2.242.064 6.639.011 7.845 0 8.417 0 12.017s.011 4.172.064 5.378c.163 4.394 2.178 6.405 6.56 6.575 1.206.053 1.778.064 5.378.064s4.172-.011 5.378-.064c4.394-.163 6.405-2.175 6.575-6.565.053-1.212.064-1.784.064-5.384s-.011-4.172-.064-5.378C23.792 2.249 21.777.228 17.378.064 16.172.011 15.6 0 12.017 0zm0 2.165c3.557 0 3.97.014 5.373.066 3.302.15 4.566 1.414 4.717 4.716.052 1.404.066 1.816.066 5.373s-.014 3.97-.066 5.373c-.15 3.302-1.414 4.566-4.717 4.717-1.403.052-1.816.066-5.373.066s-3.97-.014-5.373-.066c-3.302-.15-4.566-1.414-4.717-4.717C2.179 15.987 2.165 15.575 2.165 12.017s.014-3.97.066-5.373c.15-3.302 1.414-4.566 4.717-4.717C8.047 2.179 8.459 2.165 12.017 2.165zm0 3.501a6.351 6.351 0 1 0 0 12.702 6.351 6.351 0 0 0 0-12.702zm0 10.469a4.118 4.118 0 1 1 0-8.236 4.118 4.118 0 0 1 0 8.236zm8.101-10.85a1.484 1.484 0 1 1-2.968 0 1.484 1.484 0 0 1 2.968 0z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...iconProps}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.064 3.488" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...iconProps}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    default:
      return null;
  }
};

const ContactPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const contactRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, observerOptions);

    if (contactRef.current) observer.observe(contactRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="ContactPage"
      ref={contactRef}
      className="flex justify-center items-center min-h-[350px] px-4 sm:px-6 py-16 bg-white relative overflow-hidden"
    >
      {/* Enhanced background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float blur-xl"></div>
        <div className="absolute bottom-16 right-16 w-24 h-24 bg-indigo-100 rounded-full opacity-30 animate-float-delayed blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-25 animate-pulse blur-md"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-purple-100 rounded-full opacity-20 animate-twinkle blur-lg"></div>

        {/* Animated particles */}
        <div className="absolute top-20 left-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute bottom-32 left-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-50 animate-bounce delay-1000"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-300 rounded-full opacity-70 animate-pulse delay-500"></div>
      </div>

      <div
        className={`
          relative
          bg-gradient-to-br from-[#021024] via-[#012e66] to-[#001b4d]
          rounded-3xl
          p-6 sm:p-10 md:p-14
          w-full max-w-3xl
          text-center
          shadow-2xl
          overflow-hidden
          transform-gpu
          transition-all duration-1000
          ${
            isVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-8"
          }
        `}
      >
        {/* Enhanced decorative effects */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:45px_45px] z-0 animate-drift"></div>

        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 opacity-0 animate-pulse blur-sm"></div>

        {/* Floating orbs */}
        <div className="absolute top-8 right-8 w-6 h-6 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 rounded-full animate-float blur-sm"></div>
        <div className="absolute bottom-12 left-12 w-4 h-4 bg-gradient-to-r from-purple-400/40 to-blue-400/40 rounded-full animate-float-delayed blur-sm"></div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"></div>

        {/* Enhanced heading */}
        <h2
          className={`text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 relative z-10 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="relative">
            Stay Connected With Us
            {/* Animated underline */}
            <div
              className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full transition-all duration-1000 delay-800 ${
                isVisible ? "w-24 sm:w-32" : "w-0"
              }`}
            ></div>
            {/* Pulsing accent */}
            <div
              className={`absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full transition-all duration-1000 delay-1000 ${
                isVisible ? "opacity-60 animate-pulse" : "opacity-0"
              }`}
            ></div>
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className={`text-blue-200 text-sm mb-8 sm:mb-10 relative z-10 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Join our community and never miss an update
        </p>

        {/* Enhanced social links */}
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 justify-items-center relative z-10">
          {socialLinks.map(
            ({ href, icon, label, color, hoverColor, description }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${label}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                group
                flex items-center justify-center sm:justify-start gap-0 sm:gap-4 
                px-4 sm:px-6 py-3 sm:py-4
                rounded-full bg-white/10 hover:bg-white/20
                backdrop-blur-lg
                text-white font-medium shadow-lg
                transition-all duration-500 hover:scale-105 hover:-translate-y-1
                border border-white/10 hover:border-white/30
                relative overflow-hidden
                transform-gpu
                w-16 h-16 sm:w-auto sm:h-auto
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
              `}
                style={{
                  transitionDelay: `${600 + index * 100}ms`,
                  boxShadow:
                    hoveredIndex === index
                      ? "0 20px 40px -12px rgba(59, 130, 246, 0.4)"
                      : undefined,
                }}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full`}
                ></div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full"></div>

                {/* Enhanced icon container with multiple attention effects */}
                <div className="relative">
                  {/* Multiple glow rings */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-40 group-hover:animate-ping rounded-full scale-150`}
                  ></div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 animate-pulse rounded-full scale-125`}
                  ></div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-30 rounded-full scale-110 animate-pulse delay-300`}
                  ></div>

                  {/* Orbiting particles around icon */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-orbit transform -translate-x-1/2"></div>
                    <div className="absolute bottom-0 right-1/2 w-1 h-1 bg-blue-200 rounded-full animate-orbit-reverse transform translate-x-1/2"></div>
                    <div className="absolute left-0 top-1/2 w-1 h-1 bg-indigo-200 rounded-full animate-orbit-diagonal transform -translate-y-1/2"></div>
                  </div>

                  {/* Main icon container with enhanced effects */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center relative z-10 group-hover:scale-125 transition-all duration-500 transform group-hover:rotate-12 group-hover:-translate-y-1">
                    {/* Icon background with gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-80 rounded-full transition-all duration-300 blur-sm`}
                    ></div>

                    {/* Shimmer effect on icon */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700 rounded-full"></div>

                    <SocialIcon
                      type={icon}
                      className="w-5 h-5 sm:w-7 sm:h-7 relative z-10 group-hover:drop-shadow-2xl transition-all duration-300 group-hover:brightness-125 group-hover:contrast-125"
                    />

                    {/* Pulsing border */}
                    <div className="absolute inset-0 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                  </div>

                  {/* Floating sparkles */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-bounce transition-all duration-500 delay-200"></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping transition-all duration-500 delay-400"></div>
                  <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-100"></div>
                </div>

                {/* Enhanced text content - hidden on mobile */}
                <div className="hidden sm:flex flex-col items-start relative z-10">
                  <span className="text-base font-semibold group-hover:text-blue-100 transition-colors duration-300">
                    {label}
                  </span>
                  <span className="text-xs text-blue-200 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    {description}
                  </span>
                </div>

                {/* Floating particles on hover */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-ping transition-all duration-500"></div>
                <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-blue-300 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700"></div>
              </a>
            )
          )}
        </div>

        {/* Enhanced bottom effects */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-24 bg-gradient-to-t from-blue-400/20 via-indigo-400/10 to-transparent rounded-b-3xl z-0"></div>

        {/* Corner accent lights */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-indigo-400/30 to-transparent rounded-full blur-md animate-pulse delay-1000"></div>
      </div>

      {/* CSS for custom animations with enhanced icon effects */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-8px) rotate(-1deg);
          }
          66% {
            transform: translateY(-12px) rotate(1deg);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }

        @keyframes drift {
          0% {
            transform: translateX(0) translateY(0);
          }
          33% {
            transform: translateX(10px) translateY(-5px);
          }
          66% {
            transform: translateX(-5px) translateY(-10px);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(20px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(20px) rotate(-360deg);
          }
        }

        @keyframes orbit-reverse {
          0% {
            transform: rotate(360deg) translateX(18px) rotate(-360deg);
          }
          100% {
            transform: rotate(0deg) translateX(18px) rotate(0deg);
          }
        }

        @keyframes orbit-diagonal {
          0% {
            transform: rotate(0deg) translateX(16px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(16px) rotate(-360deg);
          }
        }

        @keyframes icon-glow {
          0%,
          100% {
            box-shadow: 0 0 5px currentColor;
          }
          50% {
            box-shadow: 0 0 20px currentColor, 0 0 30px currentColor;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-drift {
          animation: drift 20s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        .animate-orbit {
          animation: orbit 3s linear infinite;
        }
        .animate-orbit-reverse {
          animation: orbit-reverse 4s linear infinite;
        }
        .animate-orbit-diagonal {
          animation: orbit-diagonal 5s linear infinite;
        }
        .animate-icon-glow {
          animation: icon-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactPage;