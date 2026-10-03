"use client";

import Link from "next/link";
import { CinematicFooter, Magnetic } from "@/components/ui/motion-footer";
import { navLinks, services, site, siteCredit, whatsappLink } from "@/lib/site";

const socials = [
  {
    label: "Facebook",
    href: site.social.facebook,
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Instagram",
    href: site.social.instagram,
    path: "M12 2.2c3.2 0 3.6 0 4.8.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.2 1.8-.4 2.2a3.9 3.9 0 0 1-.9 1.4c-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.8-.2-2.2-.4a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0 5.3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9m5.8-.6a1.05 1.05 0 1 0-2.1 0 1.05 1.05 0 0 0 2.1 0M12 9.7a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6",
  },
  {
    label: "Google Maps",
    href: site.social.googleMaps,
    path: "M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
  },
  {
    label: "WhatsApp",
    href: whatsappLink(),
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 2a10 10 0 0 0-8.66 15L2 22l5.13-1.34A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.08-1.11l-.29-.17-3.03.79.81-2.96-.19-.31A8 8 0 1 1 12 20z",
  },
];

const marquee = [
  ...services.map((s) => s.title),
  "Interiors & Fit-out",
  "Town Planning",
  "Delhi NCR since 2003",
];

const isExternal = (href: string) => href.startsWith("http");

export default function Footer() {
  const primaryPhone = site.phones[0];

  return (
    <CinematicFooter
      marquee={marquee}
      giantText="MUNESH"
      heading={
        <>
          <span className="block">Let&apos;s build</span>
          <span className="block font-normal italic">what&apos;s next.</span>
        </>
      }
      primary={
        <>
          <Magnetic>
            <Link
              href="/contact"
              className="footer-solid-pill flex items-center gap-3 rounded-full px-9 py-4.5 text-[0.95rem] font-semibold"
            >
              Get a Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Magnetic>
          <Magnetic>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-glass-pill group flex items-center gap-3 rounded-full px-9 py-4.5 text-[0.95rem] font-semibold"
            >
              <svg className="size-5 text-[#f3f1e8]/60 transition-colors group-hover:text-[#a9d18e]" viewBox="0 0 24 24" fill="currentColor">
                <path d={socials[3].path} />
              </svg>
              WhatsApp Us
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={`tel:${primaryPhone.replace(/\s/g, "")}`}
              className="footer-glass-pill group flex items-center gap-3 rounded-full px-9 py-4.5 text-[0.95rem] font-semibold"
            >
              <svg className="size-5 text-[#f3f1e8]/60 transition-colors group-hover:text-[#f3f1e8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {primaryPhone}
            </a>
          </Magnetic>
        </>
      }
      secondary={
        <nav aria-label="Footer" className="contents">
          {navLinks.map((link) => (
            <Magnetic key={link.href}>
              <Link
                href={link.href}
                className="footer-glass-pill block rounded-full px-5 py-2.5 text-[0.8rem] font-medium text-[#f3f1e8]/65"
              >
                {link.label}
              </Link>
            </Magnetic>
          ))}
        </nav>
      }
      details={
        <div className="mx-auto grid max-w-4xl gap-6 border-t border-[#f3f1e8]/10 pt-7 text-center text-[0.82rem] text-[#f3f1e8]/60 sm:grid-cols-3 sm:text-left">
          <address className="not-italic leading-relaxed">
            <span className="mb-1.5 block text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#c9d4ae]/80">
              Studio
            </span>
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.line3}
          </address>

          <div className="leading-relaxed">
            <span className="mb-1.5 block text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#c9d4ae]/80">
              Reach us
            </span>
            <a href={`mailto:${site.email}`} className="block transition-colors hover:text-[#f3f1e8]">
              {site.email}
            </a>
            <span className="block">
              {site.phones.slice(1).map((p, i) => (
                <span key={p}>
                  {i > 0 && " · "}
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="transition-colors hover:text-[#f3f1e8]">
                    {p}
                  </a>
                </span>
              ))}
            </span>
          </div>

          <div>
            <span className="mb-2 block text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#c9d4ae]/80">
              Follow
            </span>
            <div className="flex justify-center gap-2.5 sm:justify-start">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={isExternal(s.href) ? "_blank" : undefined}
                  rel={isExternal(s.href) ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="footer-glass-pill flex size-9.5 items-center justify-center rounded-xl text-[#f3f1e8]/70"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
            <span className="mt-2.5 block text-[0.74rem] text-[#f3f1e8]/45">{site.hours}</span>
          </div>
        </div>
      }
      copyright={
        <>
          © {new Date().getFullYear()} {site.legalName}.{" "}
          <span className="whitespace-nowrap lg:block">All rights reserved.</span>
        </>
      }
      badge={
        siteCredit.name && (
          <a
            href={siteCredit.url || undefined}
            target="_blank"
            rel="noopener"
            className="footer-glass-pill group flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 sm:gap-2.5 sm:px-5"
          >
            <span className="animate-footer-pulse size-2 rounded-full bg-[#a9b98a] shadow-[0_0_10px_#a9b98a]" />
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#f3f1e8]/60 sm:text-[0.68rem] sm:tracking-[0.18em]">
              Designed &amp; developed by
            </span>
            <span className="text-[0.76rem] font-bold tracking-[0.02em] text-[#e9edd9] transition-colors group-hover:text-white sm:text-[0.8rem]">
              {siteCredit.name}
            </span>
          </a>
        )
      }
    />
  );
}
