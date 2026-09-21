"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

const spotlights = [
  {
    client: "Omaxe Group",
    badge: "RESIDENTIAL",
    subtitle: "9 Years of High-Rise & Commercial",
    description:
      "From sanction drawings to structural handover, Munesh Associates has partnered with Omaxe across multi-stage corporate towers in NCR with zero programme slippage.",
    stats: [
      { val: "8 Blocks", label: "TOWERS" },
      { val: "850+", label: "UNITS" },
      { val: "100%", label: "ON TIME DELIVERY" },
    ],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
    href: "/projects",
  },
  {
    client: "Adore Group",
    badge: "HEALTHCARE & HOSPITALITY",
    subtitle: "7+ Years of Specialized Infrastructure Engineering",
    description:
      "Constructing 180-bed healthcare campuses and multi-unit residential communities equipped with advanced MEP systems and modern operating theatre suites.",
    stats: [
      { val: "180 Beds", label: "CAPACITY" },
      { val: "5 Months", label: "EARLY DELIVERY" },
      { val: "Zero Claims", label: "DEFECT LIABILITY" },
    ],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
    href: "/projects",
  },
  {
    client: "Golden Tulip Hotels",
    badge: "HOSPITALITY",
    subtitle: "8+ Years of Upscale, Interiors & Resort Development",
    description:
      "Crafting luxury hotel suites, grand banquets, landscaped wings and resort facilities with international hospitality standards and 100+ keys delivered.",
    stats: [
      { val: "2,500", label: "CAPACITY" },
      { val: "Boutique & 5*", label: "FINISHES" },
      { val: "2 Phases", label: "DELIVERED" },
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    href: "/projects",
  },
];

export default function ClientSpotlight() {
  const [scrollPos, setScrollPos] = useState(0);

  const handleNext = () => {
    setScrollPos((prev) => (prev + 1) % spotlights.length);
  };

  const handlePrev = () => {
    setScrollPos((prev) => (prev - 1 + spotlights.length) % spotlights.length);
  };

  return (
    <section className="px-7 py-16">
      <div className="mx-auto max-w-[1240px]">
        {/* Header Row: Title on left, Carousel Arrows on right */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <div>
              <div className="flex items-center gap-3 text-[0.72rem] font-bold tracking-[0.2em] uppercase text-forest-ink">
                <span>LANDMARK PARTNERSHIPS</span>
                <span className="h-[1px] w-12 bg-stone-300 inline-block" />
              </div>
              <h2 className="mt-3 font-display text-[clamp(2.1rem,3.4vw,2.8rem)] font-semibold text-stone-0">
                Featured Client Case Studies
              </h2>
              <p className="mt-2.5 max-w-[58ch] text-[0.93rem] text-stone-2">
                How we help major developers, healthcare groups, and luxury brands execute complex, multi-stage developments across North India.
              </p>
            </div>
          </Reveal>

          {/* Navigation Arrows (< and >) */}
          <Reveal delay={0.15}>
            <div className="flex items-center gap-2.5 self-start sm:self-end">
              <button
                onClick={handlePrev}
                className="flex size-10 items-center justify-center rounded-full border border-stone-300 bg-white/80 text-stone-700 hover:bg-stone-100 hover:border-stone-400 transition-colors"
                aria-label="Previous slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="flex size-10 items-center justify-center rounded-full border border-stone-300 bg-white/80 text-stone-700 hover:bg-stone-100 hover:border-stone-400 transition-colors"
                aria-label="Next slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </Reveal>
        </div>

        {/* 3 Case Study Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {spotlights.map((spot, i) => (
            <Reveal key={spot.client} delay={i * 0.1}>
              <div className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-stone-200/80">
                {/* Visual Image Header */}
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                    <Image
                      src={spot.image}
                      alt={`${spot.client} project`}
                      fill
                      sizes="(min-width: 1024px) 400px, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Category Pill Tag (Dark Olive Green) */}
                    <div className="absolute left-4 top-4">
                      <span className="inline-block rounded-full bg-forest-deep px-3 py-1 text-[0.66rem] font-bold tracking-wider text-white uppercase shadow-sm">
                        {spot.badge}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Title + Circular Arrow */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-stone-0 group-hover:text-forest-ink transition-colors">
                        {spot.client}
                      </h3>
                      <Link
                        href={spot.href}
                        className="flex size-8 items-center justify-center rounded-full bg-stone-100/90 text-stone-700 group-hover:bg-forest-deep group-hover:text-white transition-colors"
                        aria-label={`View ${spot.client}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                    <p className="mt-1 text-[0.82rem] font-semibold text-stone-500">
                      {spot.subtitle}
                    </p>

                    <p className="mt-3 text-[0.86rem] leading-relaxed text-stone-600 line-clamp-3">
                      {spot.description}
                    </p>
                  </div>
                </div>

                {/* Bottom 3-Column Stats Footer with Dividers */}
                <div className="border-t border-stone-200/70 p-5 bg-stone-50/40">
                  <div className="grid grid-cols-3 divide-x divide-stone-200/80 text-center">
                    {spot.stats.map((st) => (
                      <div key={st.label} className="px-1">
                        <span className="block text-[0.92rem] font-bold text-stone-900 truncate">
                          {st.val}
                        </span>
                        <span className="block mt-0.5 text-[0.64rem] font-bold tracking-wider text-stone-400 uppercase truncate">
                          {st.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
