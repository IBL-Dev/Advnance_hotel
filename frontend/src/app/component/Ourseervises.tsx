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

  useEffect(() => {
    const handleWheel = (e) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInSection = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (isInSection) {
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
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [services.length]);

  const currentService = services[activeService];

  const handleServiceClick = (index) => {
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
      className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col"
    >
      <div className="max-w-7xl mx-auto flex-1 flex flex-col px-4">
        {/* Header */}
        <div className="text-center py-8">
          <h2 className="text-4xl md:text-5xl font-bold text-teal-500 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Discover our comprehensive range of design and consultation services
          </p>
        </div>

        {/* Main Content - Fixed Height */}
        <div className="flex-1 flex flex-col justify-center">
          <div 
            key={currentService.id}
            className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 transform ${
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
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                  {currentService.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {currentService.title}
                </h3>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-lg animate-fadeIn">
                {currentService.description}
              </p>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={activeService === 0}
                  className={`p-3 rounded-full transition-colors shadow-lg ${
                    activeService === 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-teal-500 text-white hover:bg-teal-600'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeService === services.length - 1}
                  className={`p-3 rounded-full transition-colors shadow-lg ${
                    activeService === services.length - 1 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-teal-500 text-white hover:bg-teal-600'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section - Features and Gallery */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-12">
            {/* Left Side - Features List */}
            <div className="space-y-6">
              <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                What We Offer
              </h4>

              <div className="space-y-3">
                {currentService.features.map((feature, index) => (
                  <div 
                    key={`${currentService.id}-feature-${index}`}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 font-medium text-sm">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Image Gallery */}
            <div className="grid grid-cols-2 gap-4">
              {currentService.galleryImages.map((image, index) => (
                <div 
                  key={`${currentService.id}-gallery-${index}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <img 
                    src={image}
                    alt={`${currentService.title} ${index + 1}`}
                    className="w-full h-32 md:h-40 object-cover hover:scale-110 transition-all duration-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="py-6">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-4 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => handleServiceClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeService === index ? 'bg-teal-500 w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Service Counter */}
          <div className="text-center text-gray-500 text-sm">
            {activeService + 1} of {services.length}
          </div>
        </div>
      </div>

      {/* Side Navigation */}
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

      {/* Scroll Hint */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-600 shadow-lg">
          Scroll to navigate • {activeService + 1}/{services.length}
        </div>
      </div>

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