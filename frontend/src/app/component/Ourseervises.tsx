"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CalendarCheck, Brush, CalendarDays, MapPin } from 'lucide-react';

const Ourservices = () => {
  const [activeService, setActiveService] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const lastScrollTime = useRef(0);

  // Services data with corrected hotel images
  const services = [
    {
      id: 0,
      title: "Room Booking",
      icon: <CalendarCheck className="w-6 h-6" />,
      description: "Streamlined room booking experience with real-time availability, instant confirmation, and personalized room selection.",
      mainImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&h=400&fit=crop&q=80",
      features: [
        "Real-time room availability and reservation",
        "Secure online payment integration",
        "Flexible check-in and check-out options",
        "Booking history and guest preferences tracking"
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=300&h=200&fit=crop&q=80",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop&q=80"
      ]
    },
    {
      id: 1,
      title: "Housekeeping Services",
      icon: <Brush className="w-6 h-6" />,
      description: "Maintain the highest standards of cleanliness and comfort with professional housekeeping and room maintenance.",
      mainImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop&q=80",
      features: [
        "Daily room cleaning and linen replacement",
        "Scheduled deep cleaning services",
        "Guest laundry and dry-cleaning coordination",
        "Maintenance request handling and tracking"
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=200&fit=crop&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop&q=80",
        "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=300&h=200&fit=crop&q=80",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=200&fit=crop&q=80"
      ]
    },
    {
      id: 2,
      title: "Event & Banquet Management",
      icon: <CalendarDays className="w-6 h-6" />,
      description: "Host unforgettable events with our complete event and banquet management services tailored to your vision.",
      mainImage: "https://images.unsplash.com/photo-1519167758481-83f29b1fe9ce?w=600&h=400&fit=crop&q=80",
      features: [
        "Venue booking and setup coordination",
        "Menu planning and catering services",
        "Audio-visual equipment and tech support",
        "Guest list and RSVP management"
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=300&h=200&fit=crop&q=80",
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=200&fit=crop&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop&q=80",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=200&fit=crop&q=80"
      ]
    },
    {
      id: 3,
      title: "Concierge & Guest Services",
      icon: <MapPin className="w-6 h-6" />,
      description: "Deliver exceptional guest experiences with personalized concierge support, travel arrangements, and local recommendations.",
      mainImage: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop&q=80",
      features: [
        "Local tour and activity booking",
        "Transportation and airport shuttle coordination",
        "Restaurant reservations and special requests",
        "Multilingual guest support services"
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&h=200&fit=crop&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=300&h=200&fit=crop&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300&h=200&fit=crop&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&q=80"
      ]
    }
  ];

  const [showSideNav, setShowSideNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInSection = rect.top <= 100 && rect.bottom >= 100;
      
      setShowSideNav(isInSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInSection = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (isInSection) {
        // Only prevent default if we're not at the boundaries
        const isAtFirstService = activeService === 0;
        const isAtLastService = activeService === services.length - 1;
        
        // Allow scrolling up to previous section when at first service
        if (isAtFirstService && e.deltaY < 0) {
          return; // Let the main page handle this scroll
        }
        
        // Allow scrolling down to next section when at last service  
        if (isAtLastService && e.deltaY > 0) {
          return; // Let the main page handle this scroll
        }

        // Handle internal service navigation
        e.preventDefault();
        
        const now = Date.now();
        if (now - lastScrollTime.current < 100) return; // Throttle scroll events
        lastScrollTime.current = now;

        const delta = e.deltaY;
        
        if (delta > 0) {
          // Scroll down - next service
          setActiveService(prev => 
            prev < services.length - 1 ? prev + 1 : prev
          );
        } else {
          // Scroll up - previous service
          setActiveService(prev => 
            prev > 0 ? prev - 1 : prev
          );
        }

        setIsScrolling(true);
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      }
    };

    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [services.length, activeService]);

  const currentService = services[activeService];

  const handleServiceClick = (index) => {
    setActiveService(index);
  };

  return (
    <section 
      ref={sectionRef}
      id="services"
      data-section="services"
      data-services-container
      className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col"
    >
      <div className="max-w-7xl mx-auto flex-1 flex flex-col px-4 py-8">
        {/* Main Content - Properly centered with consistent spacing */}
        <div className="flex-1 flex flex-col justify-center space-y-8">
          
          {/* Top Section - Service Header and Main Image */}
          <div 
            key={currentService.id}
            className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-700 transform ${
              isScrolling ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
            }`}
          >
            {/* Left Content - Main Image */}
            <div className="order-2 lg:order-1">
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group">
                <img 
                  src={currentService.mainImage}
                  alt={currentService.title}
                  className="w-full h-64 md:h-80 object-cover transition-all duration-700 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Right Content - Service Details */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 flex-shrink-0">
                  {currentService.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {currentService.title}
                </h3>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-lg animate-fadeIn">
                {currentService.description}
              </p>
            </div>
          </div>
          
          {/* Bottom Section - Features and Gallery properly aligned */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Left Side - Features List */}
            <div className="space-y-4">
              <h4 className="text-lg md:text-xl font-bold text-gray-800">
                What We Offer
              </h4>

              <div className="space-y-3">
                {currentService.features.map((feature, index) => (
                  <div 
                    key={`${currentService.id}-feature-${index}`}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    style={{ animationDelay: `${index * 10}ms` }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 font-medium text-sm leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Image Gallery */}
            <div>
              <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                Gallery
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {currentService.galleryImages.map((image, index) => (
                  <div 
                    key={`${currentService.id}-gallery-${index}`}
                    className="bg-white rounded-xl shadow-lg overflow-hidden group"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <img 
                      src={image}
                      alt={`${currentService.title} ${index + 1}`}
                      className="w-full h-24 md:h-32 object-cover hover:scale-105 transition-all duration-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Side Navigation - Only show when in services section */}
      {showSideNav && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-10">
          <div className="flex flex-col space-y-3">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => handleServiceClick(index)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeService === index 
                    ? 'bg-teal-500 text-white shadow-lg scale-110' 
                    : 'bg-white text-teal-500 shadow-md hover:bg-teal-50'
                }`}
                title={service.title}
              >
                {service.icon}
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Ourservices;