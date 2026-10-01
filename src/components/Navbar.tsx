"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { type CSSProperties, useEffect, useState } from "react";
import {
  Briefcase,
  Building2,
  Handshake,
  HardHat,
  House,
  Newspaper,
  Phone,
  Users,
} from "lucide-react";
import GradientMenu, { type GradientMenuItem } from "@/components/ui/gradient-menu";
import { navLinks, site } from "@/lib/site";

/* Icon and gradient for each page, in earthy pairs drawn from the site palette. */
const menuStyle: Record<string, Omit<GradientMenuItem, "href" | "title">> = {
  "/": { icon: <House />, gradientFrom: "#8a9a6a", gradientTo: "#3a4526" },
  "/about": { icon: <Users />, gradientFrom: "#c9a45c", gradientTo: "#8f6a2a" },
  "/services": { icon: <HardHat />, gradientFrom: "#d08a62", gradientTo: "#9a4f35" },
  "/projects": { icon: <Building2 />, gradientFrom: "#7fa595", gradientTo: "#3f6b5f" },
  "/career": { icon: <Briefcase />, gradientFrom: "#c08a8a", gradientTo: "#874a52" },
  "/client": { icon: <Handshake />, gradientFrom: "#7d93b0", gradientTo: "#3f5673" },
  "/blog": { icon: <Newspaper />, gradientFrom: "#a8b25a", gradientTo: "#5d6b2a" },
  "/contact": { icon: <Phone />, gradientFrom: "#b4927a", gradientTo: "#6b4f3a" },
};

const menuItems: GradientMenuItem[] = navLinks.map((link) => ({
  href: link.href,
  title: link.label,
  ...menuStyle[link.href],
}));

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-100 bg-base-0/95 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "border-b border-stone-0/10 shadow-[0_2px_20px_rgba(45,44,30,0.06)]"
            : "border-b border-stone-0/5"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-7 py-3.5">
          {/* ------------------------------------------------ Logo lockup */}
          <Link href="/" className="flex shrink-0 items-center gap-4">
            <motion.span
              initial={false}
              animate={{ width: scrolled ? 44 : 54, height: scrolled ? 44 : 54 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative block"
            >
              <Image
                src="/images/site/logo2.png"
                alt=""
                fill
                sizes="54px"
                className="object-contain"
                priority
              />
            </motion.span>

            <span className="hidden h-11 w-px bg-stone-0/15 sm:block" />

            <span className="hidden sm:block">
              <span className="block font-display text-[1.35rem] font-semibold leading-none tracking-tight text-stone-0">
                {site.name}
              </span>
              <span className="mt-1.5 block text-[0.64rem] font-medium uppercase tracking-[0.26em] text-stone-3">
                Architects &amp; Builders
              </span>
            </span>
          </Link>

          {/* ---------------------------------------------------- Nav links */}
          <nav className="hidden xl:block" aria-label="Main">
            <GradientMenu items={menuItems} isActive={isActive} />
          </nav>

          {/* --------------------------------------------------------- CTA */}
          <div className="flex shrink-0 items-center gap-2.5">
            <Link
              href="/contact"
              className="btn btn-forest group hidden px-6 py-3 text-[0.88rem] sm:inline-flex"
            >
              Get a Quote
              <ArrowRight className="transition-transform duration-400 group-hover:translate-x-1" />
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex size-11 items-center justify-center rounded-xl border border-stone-0/12 bg-white/70 text-stone-0 transition-colors hover:border-forest/45 xl:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------ Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-101 flex justify-end bg-scrim/35 backdrop-blur-sm xl:hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-[min(340px,86%)] bg-base-0 px-7 pb-7 pt-24 shadow-2xl"
            >
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="absolute right-6 top-7 flex size-11 items-center justify-center rounded-xl border border-stone-0/12 bg-white/70 text-stone-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <nav className="flex flex-col">
                {menuItems.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      style={{ "--gradient-from": link.gradientFrom, "--gradient-to": link.gradientTo } as CSSProperties}
                      className={`flex items-center gap-3.5 border-b border-stone-0/10 py-3 text-base ${
                        isActive(link.href) ? "font-semibold text-forest-ink" : "text-stone-1"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex size-9 items-center justify-center rounded-full [&_svg]:size-[17px] ${
                          isActive(link.href)
                            ? "bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] text-white"
                            : "border border-stone-0/8 bg-white text-stone-2 shadow-[0_3px_10px_rgba(45,44,30,0.08)]"
                        }`}
                      >
                        {link.icon}
                      </span>
                      {link.title}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn btn-forest mt-8 w-full"
              >
                Get a Quote
                <ArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
