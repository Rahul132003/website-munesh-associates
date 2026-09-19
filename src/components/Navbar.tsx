"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";

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
          <nav className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative block px-3.5 py-2 text-[0.92rem] transition-colors duration-300 ${
                      isActive(link.href)
                        ? "font-semibold text-forest-ink"
                        : "text-stone-1 hover:text-forest-ink"
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-forest-ink"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
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
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block border-b border-stone-0/10 py-3.5 text-base ${
                        isActive(link.href) ? "font-semibold text-forest-ink" : "text-stone-1"
                      }`}
                    >
                      {link.label}
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
