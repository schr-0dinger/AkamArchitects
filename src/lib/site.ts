// Structural site config - routes and IA. Editorial content (name, contact info,
// social links, etc.) lives in src/content/settings/site.md, not here.
import { absoluteUrl, withBase } from "./urls";

export const siteUrl = absoluteUrl("/").replace(/\/$/, "");
export const siteLocale = "en_IN";

export const navLinks = [
  { label: "About", href: withBase("/about") },
  { label: "Projects", href: withBase("/projects") },
  { label: "Gallery", href: withBase("/gallery") },
  { label: "Expertise", href: withBase("/expertise") },
  { label: "Contact", href: withBase("/contact") },
] as const;

export const footerLinks = [
  { label: "Projects", href: withBase("/projects") },
  { label: "Gallery", href: withBase("/gallery") },
  { label: "Expertise", href: withBase("/expertise") },
  { label: "About", href: withBase("/about") },
  { label: "Testimonials", href: withBase("/testimonials") },
  { label: "Contact", href: withBase("/contact") },
  { label: "Privacy Policy", href: withBase("/privacy-policy") },
] as const;

export const projectCategories = [
  "Residential",
  "Commercial",
  "Interior",
  "Hospitality",
  "Institutional",
] as const;
