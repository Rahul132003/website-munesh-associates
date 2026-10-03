"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const canHoverQuery = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/* Magnetic hover: the wrapped element leans toward the cursor and springs back
   on leave. Skipped on touch screens and for reduced-motion visitors. */
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(canHoverQuery).matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * 0.35,
        y: y * 0.35,
        rotationX: -y * 0.12,
        rotationY: x * 0.12,
        scale: 1.05,
        ease: "power2.out",
        duration: 0.4,
      });
    };
    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        ease: "elastic.out(1, 0.3)",
        duration: 1.2,
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
}

type CinematicFooterProps = {
  /** Phrases looping in the diagonal ribbon. */
  marquee: string[];
  /** Giant outlined word behind everything. */
  giantText: string;
  heading: ReactNode;
  /** Main call-to-action pills. */
  primary: ReactNode;
  /** Smaller pills under the primary row (e.g. page links). */
  secondary?: ReactNode;
  /** Contact / address row. */
  details?: ReactNode;
  /** Left and centre items of the bottom bar. */
  copyright: ReactNode;
  badge?: ReactNode;
};

function MarqueeRun({ items }: { items: string[] }) {
  return (
    <div className="flex items-center gap-12 px-6" aria-hidden="true">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-12">
          <span>{item}</span>
          <span className={i % 2 ? "text-[#c9a45c]/70" : "text-[#a9b98a]/70"}>✦</span>
        </span>
      ))}
    </div>
  );
}

/**
 * "Curtain reveal" footer: the footer is fixed to the viewport underneath the
 * page and a clip-path wrapper in normal flow, sized to the footer's own height,
 * uncovers it as you scroll to the end. When the footer is taller than the
 * screen (or on phones) it is an ordinary in-flow footer so nothing gets cut off.
 */
export function CinematicFooter({
  marquee,
  giantText,
  heading,
  primary,
  secondary,
  details,
  copyright,
  badge,
}: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Size the curtain to the footer's content instead of a fixed 100vh, which left
  // a large empty band on tall or zoomed-out screens and clipped the bottom bar.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const footer = footerRef.current;
    if (!wrapper || !footer) return;

    let lastHeight = -1;
    const fit = () => {
      const h = footer.offsetHeight;
      const curtain = window.innerWidth >= 768 && h <= window.innerHeight;
      wrapper.classList.toggle("is-curtain", curtain);
      wrapper.style.height = curtain ? `${h}px` : "";
      if (h !== lastHeight) {
        lastHeight = h;
        ScrollTrigger.refresh();
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(footer);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Giant word rises and grows into place behind the content.
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: { trigger: wrapper, start: "top bottom", end: "bottom bottom", scrub: 1 },
        },
      );

      // Heading, then the pills, lift in once as the curtain opens. Played rather
      // than scrubbed, so the call-to-action buttons always end fully visible.
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: wrapper, start: "top 85%", once: true },
        },
      );
    }, wrapper);

    // Page heights settle after images and the video hero load.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="cinematic-curtain relative w-full">
      <footer ref={footerRef} className="cinematic-footer relative flex w-full flex-col overflow-hidden">
        {/* Ambient light and grid */}
        <div className="footer-aurora animate-footer-breathe pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] rounded-[50%] blur-[80px]" />
        <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

        {/* Giant outlined word */}
        <div
          ref={giantTextRef}
          aria-hidden="true"
          className="footer-giant-bg-text pointer-events-none absolute -bottom-[4vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap font-display"
        >
          {giantText}
        </div>

        {/* 1. Diagonal ribbon */}
        <div className="relative z-10 mt-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-[#f3f1e8]/10 bg-[#1b1f14]/70 py-4 shadow-2xl backdrop-blur-md">
          <p className="sr-only">{marquee.join(", ")}</p>
          <div className="animate-footer-scroll-marquee flex w-max text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#f3f1e8]/60 md:text-[0.8rem]">
            <MarqueeRun items={marquee} />
            <MarqueeRun items={marquee} />
          </div>
        </div>

        {/* 2. Centre content */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-14 pt-20 md:pb-16 md:pt-24">
          <h2
            ref={headingRef}
            className="footer-text-glow mb-10 text-center font-display text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
          >
            {heading}
          </h2>

          <div ref={linksRef} className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-wrap justify-center gap-4 [perspective:800px]">{primary}</div>
            {secondary && (
              <div className="flex w-full flex-wrap justify-center gap-2.5 md:gap-3 [perspective:800px]">
                {secondary}
              </div>
            )}
            {details && <div className="mt-6 w-full">{details}</div>}
          </div>
        </div>

        {/* 3. Bottom bar */}
        <div className="relative z-20 flex w-full flex-col items-center gap-5 px-6 pb-28 sm:pb-8 lg:grid lg:grid-cols-[1fr_auto_1fr] md:px-12">
          <div className="order-2 text-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#f3f1e8]/50 lg:order-1 lg:justify-self-start lg:text-left">
            {copyright}
          </div>
          {badge && <div className="order-1 lg:order-2">{badge}</div>}
          <Magnetic className="order-3 lg:justify-self-end">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="footer-glass-pill group flex size-12 cursor-pointer items-center justify-center rounded-full text-[#f3f1e8]/70 hover:text-[#f3f1e8]"
            >
              <svg className="size-5 transition-transform duration-300 group-hover:-translate-y-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </Magnetic>
        </div>
      </footer>
    </div>
  );
}
