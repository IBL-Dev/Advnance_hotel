"use client";

import React, { useState } from 'react';
import { Home, Menu, X } from 'lucide-react';
import { navItems, authButtons, brandInfo,NavItem } from '../constent/Navitem';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (item: NavItem): void => {
    // Handle navigation logic here
    console.log(`Navigating to ${item.name}`);
  };

  const handleAuthClick = (authType: 'login' | 'signup'): void => {
    // Handle authentication logic here
    console.log(`${authType} clicked`);
  };

  return (
    <nav className="bg-white border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item)}
                  className={`${
                    item.active
                      ? "text-teal-600 bg-teal-50 hover:bg-teal-100"
                      : "text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                  } px-4 py-2.5 rounded-lg text-sm font-${
                    item.active ? "semibold" : "medium"
                  } transition-all duration-200 cursor-pointer`}
                >
                  {item.name}
                </a>
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
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item)}
                className={`${
                  item.active
                    ? "text-teal-600 bg-teal-50"
                    : "text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                } block px-4 py-3 rounded-lg text-base font-${
                  item.active ? "semibold" : "medium"
                } transition-colors duration-200 cursor-pointer`}
              >
                {item.name}
              </a>
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