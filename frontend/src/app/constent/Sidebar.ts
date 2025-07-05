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
  Coffee,
  LucideIcon
} from 'lucide-react';

export interface SubMenuItem {
  icon: LucideIcon;
  label: string;
}

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  hasSubmenu: boolean;
  key: string;
  submenu?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
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