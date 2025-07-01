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

  // Handle navbar navigation - scroll to section
  const handleNavigation = (sectionName) => {
    setActiveSection(sectionName);
    
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
  };

  // Handle scroll detection to update active section
  useEffect(() => {
    const handleScroll = () => {
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