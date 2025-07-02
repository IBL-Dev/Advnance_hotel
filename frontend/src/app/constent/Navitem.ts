// constants/navItems.ts

export interface NavItem {
  id: number;
  name: string;
  href: string;
  sectionName: string;
  active: boolean;
}

export interface AuthButton {
  text: string;
  type: 'primary' | 'secondary';
}

export interface AuthButtons {
  login: AuthButton;
  signup: AuthButton;
}

export interface BrandInfo {
  name: string;
  tagline: string;
  logo: string;
}

export const createNavItems = (activeSection: string): NavItem[] => [
  {
    id: 1,
    name: "Home",
    href: "#home",
    sectionName: "home",
    active: activeSection === "home"
  },
  {
    id: 2,
    name: "Places",
    href: "#places",
    sectionName: "places", 
    active: activeSection === "places"
  },
  {
    id: 3,
    name: "Services",
    href: "#services",
    sectionName: "services",
    active: activeSection === "services"
  },
  {
    id: 4,
    name: "Dining",
    href: "#dining",
    sectionName: "dining",
    active: activeSection === "dining"
  },
  {
    id: 5,
    name: "Events",
    href: "#events", 
    sectionName: "events",
    active: activeSection === "events"
  },
  {
    id: 6,
    name: "contact",
    href: "#contact",
    sectionName: "contact",
    active: activeSection === "contact"
  }
];

export const authButtons: AuthButtons = {
  login: {
    text: "Login",
    type: "secondary"
  },
  signup: {
    text: "Sign Up",
    type: "primary"
  }
};

export const brandInfo: BrandInfo = {
  name: "LuxeStay",
  tagline: "Premium Hotels",
  logo: "Home" // This refers to the Lucide icon name
};

export const availableSections = ["home", "places", "services", "dining", "events", "contact"] as const;
export type SectionName = typeof availableSections[number];

// Navigation scroll positions
export const scrollPositions: { [key: string]: number } = {
  home: 0,
  places: typeof window !== 'undefined' ? window.innerHeight : 800,
  services: typeof window !== 'undefined' ? window.innerHeight * 2 : 1600,
  dining: typeof window !== 'undefined' ? window.innerHeight * 3 : 2400,
  events: typeof window !== 'undefined' ? window.innerHeight * 4 : 3200,
  contact: typeof window !== 'undefined' ? window.innerHeight * 5 : 4000
};