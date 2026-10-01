import { site } from "@/lib/site";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/** Local-business entity for Google's knowledge panel and map results. */
export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": absoluteUrl("/#business"),
  name: site.legalName,
  alternateName: site.name,
  description: site.description,
  url: site.url,
  logo: absoluteUrl("/images/site/logo2.png"),
  image: absoluteUrl("/images/site/hero-villa.jpg"),
  telephone: site.phones[0].replace(/\s/g, ""),
  email: site.email,
  foundingDate: "2003",
  sameAs: [site.social.facebook, site.social.instagram],
  hasMap: site.social.googleMaps,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, Sector 81`,
    addressLocality: "Faridabad",
    addressRegion: "Haryana",
    postalCode: "121004",
    addressCountry: "IN",
  },
  areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:30",
    closes: "18:30",
  },
};
