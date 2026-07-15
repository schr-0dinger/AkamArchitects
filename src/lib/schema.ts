import { siteUrl } from "./site";
import type { SiteSettings } from "./settings";

export function organizationSchema(settings: SiteSettings) {
  const socialLinks = [
    settings.socialFacebook,
    settings.socialInstagram,
    settings.socialLinkedin,
  ].filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: settings.name,
    url: siteUrl,
    logo: settings.logoFull.src,
    sameAs: socialLinks,
    foundingDate: String(settings.founded),
  };
}

export function localBusinessSchema(settings: SiteSettings) {
  const primaryAddress = settings.addresses[0];

  return {
    "@context": "https://schema.org",
    "@type": "Architect",
    "@id": `${siteUrl}/#localbusiness`,
    name: settings.name,
    image: settings.logoFull.src,
    url: siteUrl,
    telephone: settings.phones.map((phone) => phone.number),
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: [primaryAddress.line1, primaryAddress.line2].filter(Boolean).join(", "),
      addressLocality: primaryAddress.city,
      addressRegion: primaryAddress.state,
      postalCode: primaryAddress.postalCode,
      addressCountry: "IN",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
