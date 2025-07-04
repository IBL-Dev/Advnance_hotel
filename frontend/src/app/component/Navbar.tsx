"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Menu, X } from 'lucide-react';
import { 
  createNavItems, 
  authButtons, 
  brandInfo, 
  scrollPositions,
  type NavItem,
  type SectionName 
} from '../constent/Navitem';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<SectionName>("home");

  // Get navigation items with current active section
  const navItems: NavItem[] = createNavItems(activeSection);

  // Handle navigation clicks
  const handleNavClick = (sectionName: string): void => {
    // Try to find elements with data attributes first
    let element: Element | null = null;
    
    // Check for data-section attribute first
    element = document.querySelector(`[data-section="${sectionName}"]`);
    
    // If not found and it's services, check for data-services-container
    if (!element && sectionName === 'services') {
      element = document.querySelector(`[data-services-container]`);
    }
    
    // If still not found, try by ID
    if (!element) {
      element = document.getElementById(sectionName);
    }

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback to calculated positions
      const scrollTo = scrollPositions[sectionName] || 0;
      window.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
      });
    }

    setActiveSection(sectionName as SectionName);
    setIsMenuOpen(false);
  };

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Determine active section based on scroll position
      if (scrollPosition < windowHeight * 0.5) {
        setActiveSection("home");
      } else if (scrollPosition < windowHeight * 1.5) {
        setActiveSection("places");
      } else if (scrollPosition < windowHeight * 2.5) {
        setActiveSection("services");
      } else if (scrollPosition < windowHeight * 3.5) {
        setActiveSection("dining");
      } else if (scrollPosition < windowHeight * 4.5) {
        setActiveSection("events");
      } else {
        setActiveSection("contact");
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Updated auth click handler with navigation
  const handleAuthClick = (authType: 'login' | 'signup'): void => {
    if (authType === 'login') {
      router.push('/pages/Login');
    } else if (authType === 'signup') {
      router.push('/pages/Signup');
    }
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <nav className="bg-white border-gray-100 fixed top-0 z-50 py-3 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-12">
          {/* Hotel Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2.5 rounded-xl shadow-lg">
              <Home className="h-7 w-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800">{brandInfo.name}</h1>
              <p className="text-xs text-gray-500 -mt-1">{brandInfo.tagline}</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item: NavItem) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.sectionName)}
                  className={`${
                    item.active
                      ? "text-teal-600 bg-teal-50 hover:bg-teal-100"
                      : "text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                  } px-4 py-2.5 rounded-lg text-sm font-${
                    item.active ? "semibold" : "medium"
                  } transition-all duration-200 cursor-pointer border-none bg-transparent`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => handleAuthClick('login')}
                className="text-gray-700 hover:text-teal-600 px-4 py-2 text-sm font-medium transition-colors duration-200"
                type="button"
              >
                {authButtons.login.text}
              </button>
              <button 
                onClick={() => handleAuthClick('signup')}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                type="button"
              >
                {authButtons.signup.text}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="bg-gray-50 inline-flex items-center justify-center p-2.5 rounded-xl text-gray-600 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 transition-all duration-200"
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
            {navItems.map((item: NavItem) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.sectionName)}
                className={`${
                  item.active
                    ? "text-teal-600 bg-teal-50"
                    : "text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                } block px-4 py-3 rounded-lg text-base font-${
                  item.active ? "semibold" : "medium"
                } transition-colors duration-200 cursor-pointer w-full text-left border-none bg-transparent`}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200 mt-4">
              <div className="flex flex-col space-y-3 px-2">
                <button 
                  onClick={() => handleAuthClick('login')}
                  className="text-gray-700 hover:text-teal-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-left"
                  type="button"
                >
                  {authButtons.login.text}
                </button>
                <button 
                  onClick={() => handleAuthClick('signup')}
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-md transition-all duration-200 w-full"
                  type="button"
                >
                  {authButtons.signup.text}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;