"use client";

import { useState, useEffect, useRef } from "react";
import Herosection from "./component/Herosection";
import Navbar from "./component/Navbar";
import Ourservices from "./component/Ourseervises";
import PopulerSection from "./component/populersection";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const homeRef = useRef(null);
  const placesRef = useRef(null);
  const servicesRef = useRef(null);
  const isNavigatingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Handle navbar navigation - scroll to section
  const handleNavigation = (sectionName) => {
    setActiveSection(sectionName);
    isNavigatingRef.current = true;
    
    switch (sectionName) {
      case "home":
        homeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "places":
        placesRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "services":
        servicesRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
    }

    // Reset navigation flag after smooth scroll completes
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  };

  // Navigate to next/previous section
  const navigateToSection = (direction) => {
    if (isNavigatingRef.current) return;

    const sections = ["home", "places", "services"];
    const currentIndex = sections.indexOf(activeSection);
    
    let nextIndex;
    if (direction === "down") {
      nextIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
      nextIndex = Math.max(currentIndex - 1, 0);
    }
    
    if (nextIndex !== currentIndex) {
      handleNavigation(sections[nextIndex]);
    }
  };

  // Handle scroll detection to update active section
  useEffect(() => {
    const handleScroll = () => {
      if (isNavigatingRef.current) return;

      const homeElement = homeRef.current;
      const placesElement = placesRef.current;
      const servicesElement = servicesRef.current;

      if (!homeElement || !placesElement || !servicesElement) return;

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      const homeTop = homeElement.offsetTop;
      const placesTop = placesElement.offsetTop;
      const servicesTop = servicesElement.offsetTop;

      if (scrollPosition >= servicesTop) {
        setActiveSection("services");
      } else if (scrollPosition >= placesTop) {
        setActiveSection("places");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle wheel events for section navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (isNavigatingRef.current) return;

      const homeElement = homeRef.current;
      const placesElement = placesRef.current;
      const servicesElement = servicesRef.current;

      if (!homeElement || !placesElement || !servicesElement) return;

      const scrollPosition = window.scrollY;
      const homeRect = homeElement.getBoundingClientRect();
      const placesRect = placesElement.getBoundingClientRect();
      const servicesRect = servicesElement.getBoundingClientRect();

      // Check if we're at the boundaries of sections
      const isAtTopOfHome = homeRect.top >= -10 && homeRect.top <= 10;
      const isAtTopOfPlaces = placesRect.top >= -10 && placesRect.top <= 10;
      const isAtTopOfServices = servicesRect.top >= -10 && servicesRect.top <= 10;

      // Handle scrolling up from home to places
      if (isAtTopOfHome && e.deltaY < 0 && activeSection === "home") {
        e.preventDefault();
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          navigateToSection("up");
        }, 50);
        return;
      }

      // Handle scrolling up from places to home, or down to services
      if (isAtTopOfPlaces && activeSection === "places") {
        if (e.deltaY < 0) {
          e.preventDefault();
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            navigateToSection("up");
          }, 50);
          return;
        }
      }

      // Handle scrolling up from services section
      if (isAtTopOfServices && e.deltaY < 0 && activeSection === "services") {
        // Check if we're not in the middle of internal services scrolling
        const servicesComponent = servicesElement.querySelector('[data-services-container]');
        if (!servicesComponent) {
          e.preventDefault();
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            navigateToSection("up");
          }, 50);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [activeSection]);

  return (
    <div>
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigation}
      />
      
      {/* Home Section */}
      <div ref={homeRef} id="home">
        <Herosection />
      </div>
      
      {/* Places Section */}
      <div ref={placesRef} id="places">
        <PopulerSection />
      </div>
      
      {/* Services Section */}
      <div ref={servicesRef} id="services">
        <Ourservices />
      </div>
    </div>
  );
}