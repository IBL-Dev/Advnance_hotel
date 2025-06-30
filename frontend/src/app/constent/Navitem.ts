// constants/navItems.ts

export interface NavItem {
  id: number;
  name: string;
  href: string;
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

export const navItems: NavItem[] = [
  {
    id: 1,
    name: "Home",
    href: "#",
    active: true
  },
  {
    id: 2,
    name: "Rooms & Suites",
    href: "#",
    active: false
  },
  {
    id: 3,
    name: "Amenities",
    href: "#",
    active: false
  },
  {
    id: 4,
    name: "Dining",
    href: "#",
    active: false
  },
  {
    id: 5,
    name: "Events",
    href: "#",
    active: false
  },
  {
    id: 6,
    name: "Contact",
    href: "#",
    active: false
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