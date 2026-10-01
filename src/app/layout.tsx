import type { Metadata } from "next";
import { Fraunces, Inter, La_Belle_Aurore } from "next/font/google";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import MobileContactBar from "@/components/MobileContactBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/motion/MotionProvider";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { businessJsonLd } from "@/lib/seo";
import { hero, site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const script = La_Belle_Aurore({
  variable: "--font-script-hand",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Architects & Builders in Faridabad, Delhi NCR`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "architects in Faridabad",
    "construction company Delhi NCR",
    "residential construction",
    "commercial construction",
    "industrial construction",
    "turnkey contractors Haryana",
  ],
  openGraph: {
    type: "website",
    siteName: site.legalName,
    title: `${site.legalName} — ${site.tagline}`,
    description: site.description,
    locale: "en_IN",
    images: [{ url: "/images/site/hero-villa.jpg", alt: hero.imageAlt }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Font variables must sit on <html>: Tailwind emits the theme tokens that
    // reference them on :root, where a variable defined on <body> is undefined.
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${script.variable}`}
    >
      <body className="antialiased">
        <MotionProvider>
          <div className="bg-scene" aria-hidden="true" />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileContactBar />
        </MotionProvider>
        <JsonLd data={businessJsonLd} />
        <Analytics />
      </body>
    </html>
  );
}
