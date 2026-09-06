import { Heart, Search, Shield, LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

export interface FooterLinkItem {
  href: string;
  label: string;
}

export const NAV_LINKS: readonly NavItem[] = [
  { href: "/", label: "Pemain", icon: Search, exact: true },
  { href: "/teams", label: "Klub", icon: Shield },
  { href: "/favorites", label: "Favorit", icon: Heart },
] as const;

export const FOOTER_NAV_LINKS: readonly FooterLinkItem[] = [
  { href: "/", label: "Pencarian Pemain" },
  { href: "/teams", label: "Pencarian Klub" },
  { href: "/favorites", label: "Favorit" },
] as const;
