import React, { useState, useEffect, useRef } from 'react';
import headshots from '../assets/headshots';
import sriLanka from '../assets/images/sri-lanka.png'

const Committee = () => {
  const [visibleSections, setVisibleSections] = useState({
    header: false,
    leads: false,
    ambassadors: false
  });
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const headerRef = useRef(null);
  const leadsRef = useRef(null);
  const ambassadorsRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '50px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          setVisibleSections(prev => ({ ...prev, [sectionId]: true }));
        }
      });
    }, observerOptions);

    if (headerRef.current) observer.observe(headerRef.current);
    if (leadsRef.current) observer.observe(leadsRef.current);
    if (ambassadorsRef.current) observer.observe(ambassadorsRef.current);

    return () => observer.disconnect();
  }, []);

  const eventLeads = [
    {
      id: 1,
      name: "Kavindu Ranasinghe",
      title: "Section Lead",
      image: headshots.Kavindu_Lead, 
      linkedin: "https://www.linkedin.com/in/kavindu-ranasinghe",
      email: "kavinduranasinghe@ieee.org"
    },
    {
      id: 2,
      name: "Ashwinie Jayamanna",
      title: "Section Co-Lead",
      image: headshots.Ashwinie_Co_Lead, 
      linkedin: "https://www.linkedin.com/in/ashwinie-jayamanna",
      email: "ashwiniejayamanna@ieee.org"
    }
  ];

  const ambassadors = [
    {
      id: 1,
      name: "P. Kaveesha Sewmini",
      university: "SUSL",
      image: headshots.Kaveehsa_SUSL,
      linkedin: "https://www.linkedin.com/in/kaveesha-sewmini-6862142b7"
    },
    {
      id: 2,
      name: "Yashen Fernando",
      university: "UOV",
      image: headshots.Yashen_UOV,
      linkedin: "https://www.linkedin.com/in/yashenfernando"
    },
    {
      id: 3,
      name: "Hashan Maduwantha",
      university: "WUSL",
      image: headshots.Hashan_WUSL,
      linkedin: "https://www.linkedin.com/in/hashan-maduwantha"
    },
    {
      id: 4,
      name: "Thenuja Dulwana",
      university: "NIBM",
      image: headshots.Thenuja_NIBM,
      linkedin: "https://www.linkedin.com/in/thenujadulwana"
    },
    {
      id: 5,
      name: "Nirushan Kumar",
      university: "OUSL",
      image: headshots.Nirushan_OUSL,
      linkedin: "https://www.linkedin.com/in/nirushan-kumar-9784ba293"
    },
    {
      id: 6,
      name: "Ganindu Deshapriya",
      university: "USJ",
      image: headshots.Ganindu_USJ,
      linkedin: "https://www.linkedin.com/in/ganindu-deshapriya-362415237"
    },
    {
      id: 7,
      name: "Kavindu Mihiran",
      university: "RUSL",
      image: headshots.Kavindu_RUSL,
      linkedin: "https://www.linkedin.com/in/gmkavindu"
    },
    {
      id: 8,
      name: "Ravindi Ayodhya",
      university: "SLTC",
      image: headshots.Ravindhi_SLTC,
      linkedin: "https://www.linkedin.com/in/ravindi-ayodhya-1a3a51320"
    },
    {
      id: 9,
      name: "Shahen Weerakoon",
      university: "CINEC",
      image: headshots.Shahen_CINEC,
      linkedin: "https://www.linkedin.com/in/shahen-weerakoon-656a4a236"
    },
    {
      id: 10,
      name: "Dasunika Yapabandara",
      university: "NSBM",
      image: headshots.Dasunika_NSBM,
      linkedin: "https://www.linkedin.com/in/dasunika-yapabandara"
    },
    {
      id: 11,
      name: "Abishek Jayathilake",
      university: "UOR",
      image: headshots.Abishek_UOR,
      linkedin: "https://www.linkedin.com/in/abishek-jayathilake-037406286"
    },
    {
      id: 12,
      name: "Geesad Bandara",
      university: "IIT",
      image: headshots.Geesad_IIT,
      linkedin: "https://www.linkedin.com/in/geesadbandara"
    },
    {
      id: 13,
      name: "Malith Anuradha",
      university: "UOP",
      image: headshots.Malith_UOP,
      linkedin: "https://www.linkedin.com/in/malith-anuradha-26bb79224"
    },
    {
      id: 14,
      name: "M. R. Zaina",
      university: "UOK",
      image: headshots.Zaiena_UOK,
      linkedin: "https://www.linkedin.com/in/zaina-r"
    },
    {
      id: 15,
      name: "Hiruna Malavipathirana",
      university: "UOM",
      image: headshots.Hiruna_UOM,
      linkedin: "https://www.linkedin.com/in/hiruna-malavipathirana-b0904916a"
    },
    {
      id: 16,
      name: "Bhasura Jayaweera",
      university: "UCSC",
      image: headshots.Bhasura_UCSC,
      linkedin: "https://www.linkedin.com/in/bhasura-jayaweera-a37904309"
    },
    {
      id: 17,
      name: "Mahasen B. Dasanayake",
      university: "UOJ",
      image: headshots.Mahasen_UOJ,
      linkedin: "https://www.linkedin.com/in/mahasen-dasanayake-402846241"
    },
    {
      id: 18,
      name: "Themiya Nanayakkara",
      university: "KDU",
      image: headshots.Themiya_KDU,
      linkedin: "https://www.linkedin.com/in/themiya-nanayakkara-7b1759290"
    },
    {
      id: 19,
      name: "Heshan Gimhana",
      university: "SLIIT",
      image: headshots.Heshan_SLIIT,
      linkedin: "https://www.linkedin.com/in/heshan-gimhana"
    }
  ];



  return (
    <section id="committee" className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 border border-blue-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-50 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 border-2 border-blue-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-30 animate-ping"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #3b82f6 1px, transparent 1px),
              linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          data-section="header"
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold text-gray-900 mb-4 transition-all duration-600 ${
            visibleSections.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="relative">
              Meet Our Team
              {/* Animated underline */}
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-600 delay-500 ${
                visibleSections.header ? 'w-24' : 'w-0'
              }`}></div>
              
              {/* Floating accent */}
              <div className={`absolute -top-3 -right-3 w-3 h-3 bg-blue-400 rounded-full transition-all duration-600 delay-700 ${
                visibleSections.header ? 'opacity-60 animate-pulse' : 'opacity-0'
              }`}></div>
            </span>
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-600 delay-300 ${
            visibleSections.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            Dedicated leaders and ambassadors from top universities in Sri Lanka, 
            working together to make <span className="text-blue-600 font-semibold">IEEEXtreme</span> an exceptional experience for all participants.
          </p>
        </div>

        {/* Event Leads Section */}
        <div 
          ref={leadsRef}
          data-section="leads"
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className={`text-3xl font-bold text-gray-900 mb-4 transition-all duration-600 ${
              visibleSections.leads ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Section Leadership
            </h3>
            <div className={`w-24 h-1 bg-blue-600 mx-auto rounded-full transition-all duration-600 delay-300 ${
              visibleSections.leads ? 'scale-x-100' : 'scale-x-0'
            }`}></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {eventLeads.map((lead, index) => (
              <div 
                key={lead.id} 
                className={`bg-white rounded-2xl shadow-xl p-10 text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 relative overflow-hidden ${
                  visibleSections.leads ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
                onMouseEnter={() => setHoveredCard(`lead-${lead.id}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating particles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-300 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping transition-all duration-500"></div>
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-bounce transition-all duration-700"></div>
                
                <div className="mb-8 relative z-10">
                  <div className="relative inline-block">
                    <img
                      src={lead.image}
                      alt={lead.name}
                      className="w-48 h-48 mx-auto rounded-full object-cover border-6 border-blue-100 shadow-lg group-hover:border-blue-200 group-hover:shadow-xl transition-all duration-500 group-hover:scale-105"
                    />
                    
                    {/* Profile ring animation */}
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-0 group-hover:opacity-30 group-hover:animate-spin transition-opacity duration-500" style={{ animationDuration: '4s' }}></div>
                    
                    {/* Status indicator */}
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg animate-pulse"></div>
                  </div>
                </div>
                
                <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 relative z-10">{lead.name}</h4>
                <p className="text-lg font-semibold text-blue-600 mb-2 relative z-10">{lead.title}</p>
                <p className="text-gray-600 mb-6 relative z-10">{lead.university}</p>
                
                <div className="flex justify-center space-x-6 relative z-10">
                  <a 
                    href={`mailto:${lead.email}`}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                    Email
                  </a>
                  <a 
                    href={lead.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#0077B5] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#005582] transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ambassadors Section */}
        <div 
          ref={ambassadorsRef}
          data-section="ambassadors"
        >
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <h3 className={`text-4xl font-bold text-gray-900 transition-all duration-600 ${
                visibleSections.ambassadors ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Our Ambassadors
              </h3>
              
              {/* Enhanced Sri Lankan Flag Image */}
              <div className="relative ml-4">
                <img 
                  src={sriLanka} 
                  alt="Sri Lankan Flag" 
                  className={`w-16 aspect-video object-contain rounded-md shadow-xl border-2 border-white transition-all duration-600 delay-600 ${
                    visibleSections.ambassadors ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}
                />
                
                {/* Enhanced Flag glow effect */}
                <div className={`absolute -inset-2 bg-gradient-to-r from-red-400/40 via-yellow-400/40 to-green-400/40 rounded-lg blur-md transition-all duration-600 delay-700 ${
                  visibleSections.ambassadors ? 'opacity-100 animate-pulse' : 'opacity-0'
                }`}></div>
                
                {/* Additional shadow for depth */}
                <div className={`absolute inset-0 bg-gradient-to-br from-red-500/20 to-green-500/20 rounded-md shadow-2xl transition-all duration-600 delay-750 ${
                  visibleSections.ambassadors ? 'opacity-100' : 'opacity-0'
                }`}></div>
                
                {/* Enhanced Sparkle effects */}
                <div className={`absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full transition-all duration-600 delay-800 ${
                  visibleSections.ambassadors ? 'opacity-90 animate-ping' : 'opacity-0'
                }`}></div>
                <div className={`absolute -bottom-2 -left-2 w-2.5 h-2.5 bg-yellow-300 rounded-full transition-all duration-600 delay-900 ${
                  visibleSections.ambassadors ? 'opacity-80 animate-bounce' : 'opacity-0'
                }`}></div>
                <div className={`absolute -top-1 left-1/2 w-2 h-2 bg-red-300 rounded-full transition-all duration-600 delay-600 ${
                  visibleSections.ambassadors ? 'opacity-70 animate-pulse' : 'opacity-0'
                }`}></div>
                <div className={`absolute bottom-0 -right-1 w-1.5 h-1.5 bg-green-300 rounded-full transition-all duration-600 delay-1100 ${
                  visibleSections.ambassadors ? 'opacity-60 animate-ping' : 'opacity-0'
                }`}></div>
              </div>
            </div>
            
            <p className={`text-xl text-gray-600 max-w-4xl mx-auto mb-8 transition-all duration-600 delay-200 ${
              visibleSections.ambassadors ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              Our dedicated ambassadors represent <span className="text-blue-600 font-semibold">IEEEXtreme</span> across top universities in Sri Lanka, 
              serving as the vital link between participants and the competition organizers.
            </p>
            <div className={`w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full transition-all duration-600 delay-400 ${
              visibleSections.ambassadors ? 'scale-x-100' : 'scale-x-0'
            }`}></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ambassadors.map((ambassador, index) => (
              <div 
                key={ambassador.id} 
                className={`bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 group relative overflow-hidden ${
                  visibleSections.ambassadors ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(`ambassador-${ambassador.id}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* University badge */}
                <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {ambassador.university}
                </div>
                
                <div className="mb-6 relative z-10">
                  <div className="relative inline-block">
                    <img
                      src={ambassador.image}
                      alt={ambassador.name}
                      className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-200 shadow-lg group-hover:border-blue-300 group-hover:shadow-xl transition-all duration-500 group-hover:scale-110"
                    />
                    
                    {/* Profile glow */}
                    <div className="absolute inset-0 rounded-full bg-blue-400/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
                    
                    {/* Floating particles */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-bounce transition-all duration-500"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-300 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping transition-all duration-700"></div>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{ambassador.name}</h4>
                  <p className="text-sm text-blue-600 font-semibold mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{ambassador.university} Representative</p>
                  
                  <a 
                    href={ambassador.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0077B5] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#005582] transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm group/btn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path>
                    </svg>
                    Connect
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-600"></div>
                  </a>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for additional animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Committee;