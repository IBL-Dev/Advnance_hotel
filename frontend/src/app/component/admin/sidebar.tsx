"use client"

import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Calendar, 
  UserCheck, 
  Settings, 
  MessageCircle, 
  CreditCard, 
  DollarSign, 
  HelpCircle, 
  BookOpen,
  LogOut,
  ChevronRight,
  ChevronDown,
  Hotel,
  Bed,
  ClipboardList,
  Utensils,
  Car,
  Shield,
  BarChart3,
  FileText,
  Wrench,
  MapPin,
  Phone,
  Clock,
  UserPlus,
  Receipt,
  TrendingUp,
  AlertCircle,
  Gift,
  Wifi,
  Coffee
} from 'lucide-react';

const Sidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const menuItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      hasSubmenu: false,
      key: 'dashboard'
    },
    { 
      icon: Bed, 
      label: 'Room Management', 
      hasSubmenu: true,
      key: 'rooms',
      submenu: [
        { icon: MapPin, label: 'Room Status' },
        { icon: ClipboardList, label: 'Room Types' },
        { icon: Wrench, label: 'Maintenance' },
        { icon: Coffee, label: 'Amenities' }
      ]
    },
    { 
      icon: Calendar, 
      label: 'Reservations', 
      hasSubmenu: true,
      key: 'reservations',
      submenu: [
        { icon: UserPlus, label: 'New Booking' },
        { icon: Clock, label: 'Check-in/Out' },
        { icon: AlertCircle, label: 'Cancellations' },
        { icon: Gift, label: 'Group Bookings' }
      ]
    },
    { 
      icon: Users, 
      label: 'Guest Management', 
      hasSubmenu: true,
      key: 'guests',
      submenu: [
        { icon: UserCheck, label: 'Guest Registry' },
        { icon: Phone, label: 'Guest Services' },
        { icon: MessageCircle, label: 'Guest Feedback' },
        { icon: TrendingUp, label: 'Loyalty Program' }
      ]
    },
    { 
      icon: UserCheck, 
      label: 'Staff Management', 
      hasSubmenu: true,
      key: 'staff',
      submenu: [
        { icon: Users, label: 'Employee List' },
        { icon: Calendar, label: 'Staff Schedule' },
        { icon: DollarSign, label: 'Payroll' },
        { icon: ClipboardList, label: 'Performance' }
      ]
    },
    { 
      icon: CreditCard, 
      label: 'Billing & Payments', 
      hasSubmenu: true,
      key: 'billing',
      submenu: [
        { icon: Receipt, label: 'Invoices' },
        { icon: CreditCard, label: 'Payment Methods' },
        { icon: DollarSign, label: 'Pricing Management' },
        { icon: BarChart3, label: 'Revenue Reports' }
      ]
    },
    { 
      icon: Utensils, 
      label: 'Restaurant & Bar', 
      hasSubmenu: true,
      key: 'restaurant',
      submenu: [
        { icon: ClipboardList, label: 'Menu Management' },
        { icon: Calendar, label: 'Table Reservations' },
        { icon: Receipt, label: 'Orders & Billing' },
        { icon: Users, label: 'Kitchen Staff' }
      ]
    },
    { 
      icon: Car, 
      label: 'Additional Services', 
      hasSubmenu: true,
      key: 'services',
      submenu: [
        { icon: Car, label: 'Transportation' },
        { icon: Wifi, label: 'Laundry Service' },
        { icon: Gift, label: 'Spa & Wellness' },
        { icon: Phone, label: 'Concierge' }
      ]
    },
    { 
      icon: BarChart3, 
      label: 'Reports & Analytics', 
      hasSubmenu: true,
      key: 'reports',
      submenu: [
        { icon: TrendingUp, label: 'Occupancy Reports' },
        { icon: DollarSign, label: 'Financial Reports' },
        { icon: Users, label: 'Guest Analytics' },
        { icon: BarChart3, label: 'Performance Metrics' }
      ]
    },
    { 
      icon: Shield, 
      label: 'Security & Safety', 
      hasSubmenu: true,
      key: 'security',
      submenu: [
        { icon: Shield, label: 'Access Control' },
        { icon: AlertCircle, label: 'Incident Reports' },
        { icon: Users, label: 'Security Staff' },
        { icon: FileText, label: 'Safety Protocols' }
      ]
    },
    { 
      icon: Settings, 
      label: 'System Settings', 
      hasSubmenu: true,
      key: 'settings',
      submenu: [
        { icon: Users, label: 'User Management' },
        { icon: Shield, label: 'Permissions' },
        { icon: Wrench, label: 'System Config' },
        { icon: FileText, label: 'Backup & Restore' }
      ]
    },
    { 
      icon: HelpCircle, 
      label: 'Support & Help', 
      hasSubmenu: true,
      key: 'support',
      submenu: [
        { icon: BookOpen, label: 'User Guide' },
        { icon: Phone, label: 'Technical Support' },
        { icon: MessageCircle, label: 'Contact Admin' },
        { icon: AlertCircle, label: 'System Status' }
      ]
    }
  ];

  return (
    <div className="w-72 h-screen bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden shadow-2xl">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-8 translate-x-8"></div>
      <div className="absolute bottom-32 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-x-4"></div>
      <div className="absolute top-1/2 left-0 w-16 h-16 bg-white bg-opacity-5 rounded-full -translate-x-8"></div>
      
      {/* Header */}
      <div className="p-6 border-b border-white border-opacity-20">
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
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isExpanded = expandedMenus[item.key];
          
          return (
            <div key={index} className="relative">
              <button 
                onClick={() => item.hasSubmenu && toggleSubmenu(item.key)}
                className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-white hover:bg-opacity-15 rounded-lg transition-all duration-200 group"
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
                        className="w-full flex items-center space-x-3 px-3 py-2 text-white text-sm hover:bg-white hover:bg-opacity-10 rounded-md transition-all duration-200"
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
      <div className="p-4 border-t border-white border-opacity-20">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">Hotel Manager</p>
            <p className="text-white text-xs opacity-70">admin@grandcare.com</p>
          </div>
        </div>
        
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;