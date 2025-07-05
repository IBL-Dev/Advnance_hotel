"use client"

import React, { useState } from 'react';
import { 
  Users,
  LogOut,
  ChevronRight,
  ChevronDown,
  Hotel
} from 'lucide-react';
import { menuItems } from '../../constent/Sidebar';

const Sidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  return (
    <div className="h-screen">
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, rgba(0, 109, 119, 0.4), rgba(226, 149, 120, 0.4));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, rgba(0, 109, 119, 0.6), rgba(226, 149, 120, 0.6));
        }
      `}</style>
      
      <div className="w-72 h-screen bg-gradient-to-br from-[#006D77] via-[#83C5BE] to-[#E29578] relative overflow-hidden shadow-2xl flex flex-col">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        {/* Header */}
        <div className="p-6 border-b border-white border-opacity-20 flex-shrink-0 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Hotel className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">Grand Care</h1>
              <p className="text-white text-sm opacity-80">Hotel Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar relative z-10">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isExpanded = expandedMenus[item.key];
            
            return (
              <div key={index} className="relative">
                <button 
                  onClick={() => item.hasSubmenu && toggleSubmenu(item.key)}
                  className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-gradient-to-r hover:from-[#005A63] hover:to-[#E29578] hover:bg-opacity-20 rounded-lg transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {item.hasSubmenu && (
                    <div className="transition-transform duration-200">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                      ) : (
                        <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                      )}
                    </div>
                  )}
                </button>
                
                {/* Submenu */}
                {item.hasSubmenu && isExpanded && (
                  <div className="mt-1 ml-4 space-y-1 border-l-2 border-white border-opacity-20 pl-4">
                    {item.submenu.map((subItem, subIndex) => {
                      const SubIcon = subItem.icon;
                      return (
                        <button
                          key={subIndex}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-white text-sm hover:bg-[#005A63] hover:bg-opacity-40 rounded-md transition-all duration-300 hover:shadow-sm hover:translate-x-1"
                        >
                          <SubIcon className="w-4 h-4 opacity-80" />
                          <span className="opacity-90">{subItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-white border-opacity-20 flex-shrink-0 relative z-10">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Hotel Manager</p>
              <p className="text-white text-xs opacity-70">admin@grandcare.com</p>
            </div>
          </div>
          
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-gradient-to-r hover:from-[#E29578] hover:to-[#F4A261] rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 transform group">
            <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;