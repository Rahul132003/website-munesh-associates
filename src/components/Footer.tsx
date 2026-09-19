import Image from "next/image";
import Link from "next/link";
import { navLinks, services, site } from "@/lib/site";

const socials = [
  { label: "Facebook", href: "#", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
  { label: "Instagram", href: "#", path: "M12 2.2c3.2 0 3.6 0 4.8.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.2 1.8-.4 2.2a3.9 3.9 0 0 1-.9 1.4c-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.8-.2-2.2-.4a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0 5.3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9m5.8-.6a1.05 1.05 0 1 0-2.1 0 1.05 1.05 0 0 0 2.1 0M12 9.7a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6" },
  { label: "LinkedIn", href: "#", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" },
];

export default function Footer() {
  return (
    <footer className="mt-10 pb-8 pt-16">
      <div className="mx-auto w-full max-w-[1240px] px-7">
        <div className="grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="mb-5 flex items-center gap-3">
              <Image
                src="/images/site/logo2.png"
                alt=""
                width={52}
                height={52}
                className="object-contain"
              />
              <span className="font-display text-[1.05rem] font-semibold text-stone-0">
                {site.name}
              </span>
            </Link>
            <p className="max-w-[38ch] text-[0.88rem] text-stone-2">
              {site.description}
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-9.5 items-center justify-center rounded-[10px] border border-stone-0/10 bg-stone-0/5 text-stone-1 transition-colors duration-200 hover:border-forest/35 hover:text-forest-ink"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-[0.82rem] font-semibold uppercase tracking-[0.07em] text-stone-0">
              Navigate
            </h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[0.88rem] text-stone-2 transition-colors hover:text-forest-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[0.82rem] font-semibold uppercase tracking-[0.07em] text-stone-0">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href="/services" className="text-[0.88rem] text-stone-2 transition-colors hover:text-forest-ink">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/projects" className="text-[0.88rem] text-stone-2 transition-colors hover:text-forest-ink">
                  Interiors &amp; Fit-out
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-[0.88rem] text-stone-2 transition-colors hover:text-forest-ink">
                  Town Planning
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[0.82rem] font-semibold uppercase tracking-[0.07em] text-stone-0">
              Get in touch
            </h4>
            <address className="flex flex-col gap-3 text-[0.88rem] not-italic text-stone-2">
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.line3}
              </span>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-forest-ink">
                {site.email}
              </a>
              <span className="flex flex-col gap-1">
                {site.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="transition-colors hover:text-forest-ink">
                    {p}
                  </a>
                ))}
              </span>
            </address>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-0/10 pt-6 text-[0.8rem] text-stone-3">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>{site.promise}</p>
        </div>
      </div>
    </footer>
  );
}
