"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Star, Award, Palette, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const Ourservices = () => {
  const [activeService, setActiveService] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const lastScrollTime = useRef(0);

  // Dummy data for 4 services
  const services = [
    {
      id: 0,
      title: "Interior Design",
      icon: <Palette className="w-6 h-6" />,
      description: "Transform your space with our expert interior design services. We create beautiful, functional environments that reflect your personal style and enhance your daily living experience.",
      mainImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      features: [
        "Custom space planning and layout design",
        "Color consultation and material selection", 
        "Furniture selection and procurement",
        "Lighting design and installation coordination"
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=300&h=200&fit=crop"
      ]
    },
    {
      id: 1,
      title: "Architecture Design",
      icon: <Star className="w-6 h-6" />,
      description: "Innovative architectural solutions that blend functionality with aesthetic appeal. From residential homes to commercial buildings, we design structures that inspire and endure.",
      mainImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop",
      features: [
        "Conceptual design and 3D visualization",
        "Structural engineering consultation",
        "Building permits and code compliance",
        "Construction administration and oversight"
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=300&h=200&fit=crop"
      ]
    },
    {
      id: 2,
      title: "Project Management",
      icon: <Award className="w-6 h-6" />,
      description: "Comprehensive project management services ensuring your vision becomes reality on time and within budget. We coordinate every aspect from conception to completion.",
      mainImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
      features: [
        "Timeline development and milestone tracking",
        "Budget management and cost control",
        "Vendor coordination and quality assurance",
        "Risk management and problem resolution"
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1600566753051-e7d0ce2d2b8d?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=300&h=200&fit=crop"
      ]
    },
    {
      id: 3,
      title: "Consultation Services",
      icon: <Zap className="w-6 h-6" />,
      description: "Expert consultation to guide your design decisions and optimize your space. Get professional insights and recommendations tailored to your specific needs and budget.",
      mainImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&h=400&fit=crop",
      features: [
        "Space assessment and optimization strategies",
        "Design concept development and refinement",
        "Material and finish recommendations",
        "Budget planning and phased implementation"
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=300&h=200&fit=crop"
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
    const handleWheel = (e : any) => {
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
      clearTimeout(scrollTimeoutRef.current );
    };
  }, [services.length, activeService]);

  const currentService = services[activeService];

  const handleServiceClick = (index : any) => {
    setActiveService(index);
  };

  const handlePrevious = () => {
    setActiveService((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleNext = () => {
    setActiveService((prev) => (prev + 1) % services.length);
  };

  return (
    <section 
      ref={sectionRef}
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
            <div className="order-2 lg:order-1" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
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
              <div className="flex items-center gap-4" data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 flex-shrink-0">
                  {currentService.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {currentService.title}
                </h3>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-lg animate-fadeIn" data-aos="fade-up" data-aos-duration="900" data-aos-delay="300">
                {currentService.description}
              </p>
            </div>
          </div>
          
          {/* Bottom Section - Features and Gallery properly aligned */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Left Side - Features List */}
            <div className="space-y-4" data-aos="fade-right" data-aos-duration="800" data-aos-delay="400">
              <h4 className="text-lg md:text-xl font-bold text-gray-800" data-aos="slide-down" data-aos-duration="600" data-aos-delay="500">
                What We Offer
              </h4>

              <div className="space-y-3">
                {currentService.features.map((feature, index) => (
                  <div 
                    key={`${currentService.id}-feature-${index}`}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    data-aos="zoom-in-right"
                    data-aos-duration="700"
                    data-aos-delay={600 + (index * 150)}
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
            <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="500">
              <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-4" data-aos="slide-down" data-aos-duration="600" data-aos-delay="600">
                Gallery
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {currentService.galleryImages.map((image, index) => (
                  <div 
                    key={`${currentService.id}-gallery-${index}`}
                    className="bg-white rounded-xl shadow-lg overflow-hidden group"
                    data-aos="flip-left"
                    data-aos-duration="800"
                    data-aos-delay={700 + (index * 100)}
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
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-10" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="1200">
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
                data-aos="zoom-in"
                data-aos-duration="600"
                data-aos-delay={1300 + (index * 100)}
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