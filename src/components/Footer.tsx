"use client";

import Image from "next/image";
import Link from "next/link";
import { navLinks, services, site } from "@/lib/site";

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.2c3.2 0 3.6 0 4.8.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.2 1.8-.4 2.2a3.9 3.9 0 0 1-.9 1.4c-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.8-.2-2.2-.4a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0 5.3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9m5.8-.6a1.05 1.05 0 1 0-2.1 0 1.05 1.05 0 0 0 2.1 0M12 9.7a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4",
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${site.whatsapp}`,
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 2a10 10 0 0 0-8.66 15L2 22l5.13-1.34A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.08-1.11l-.29-.17-3.03.79.81-2.96-.19-.31A8 8 0 1 1 12 20z",
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-16 border-t border-stone-0/10 pb-12 pt-16">
      <div className="mx-auto w-full max-w-[1400px] px-7">
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* Brand Info */}
          <div>
            <Link href="/" className="mb-5 flex items-center gap-3.5 group">
              <Image
                src="/images/site/logo2.png"
                alt={site.name}
                width={50}
                height={50}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <span className="block font-display text-[1.2rem] font-semibold tracking-tight text-stone-0 group-hover:text-forest-ink transition-colors">
                  {site.name}
                </span>
                <span className="block text-[0.62rem] font-medium uppercase tracking-[0.24em] text-stone-3">
                  Architects &amp; Builders
                </span>
              </div>
            </Link>

            <p className="max-w-[38ch] text-[0.88rem] leading-relaxed text-stone-2">
              {site.description}
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="flex size-9.5 items-center justify-center rounded-xl border border-stone-0/10 bg-white/60 text-stone-1 transition-all duration-300 hover:border-forest/40 hover:bg-forest-pale hover:text-forest-deep shadow-xs"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <span className="eyebrow mb-5">Navigate</span>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.88rem] text-stone-2 transition-colors duration-200 hover:text-forest-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <span className="eyebrow mb-5">Services</span>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-[0.88rem] text-stone-2 transition-colors duration-200 hover:text-forest-ink"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/projects?category=Interiors"
                  className="text-[0.88rem] text-stone-2 transition-colors duration-200 hover:text-forest-ink"
                >
                  Interiors &amp; Fit-out
                </Link>
              </li>
              <li>
                <Link
                  href="/projects?category=Town+Planning"
                  className="text-[0.88rem] text-stone-2 transition-colors duration-200 hover:text-forest-ink"
                >
                  Town Planning
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Info */}
          <div>
            <span className="eyebrow mb-5">Studio</span>
            <address className="flex flex-col gap-3.5 text-[0.88rem] not-italic text-stone-2">
              <span className="leading-snug">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.line3}
              </span>
              <div>
                <span className="block text-[0.72rem] uppercase tracking-wider text-stone-3 font-medium mb-0.5">
                  Email
                </span>
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-stone-1 transition-colors hover:text-forest-ink"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <span className="block text-[0.72rem] uppercase tracking-wider text-stone-3 font-medium mb-0.5">
                  Phone
                </span>
                <div className="flex flex-col gap-0.5 font-medium text-stone-1">
                  {site.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="transition-colors hover:text-forest-ink"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom copyright and back-to-top bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-stone-0/10 pt-8 text-[0.82rem] text-stone-3">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="font-script text-[1rem] text-forest-ink font-normal">
              {site.promise}
            </span>
            <button
              onClick={scrollToTop}
              type="button"
              aria-label="Back to top"
              className="flex items-center gap-2 rounded-full border border-stone-0/12 bg-white/70 px-4 py-1.5 text-[0.78rem] font-medium text-stone-1 transition-all duration-300 hover:border-forest/45 hover:bg-forest-pale hover:text-forest-deep shadow-xs cursor-pointer"
            >
              <span>Back to top</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}


