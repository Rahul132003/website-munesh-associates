"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import GlowCard from "@/components/motion/GlowCard";
import Reveal from "@/components/motion/Reveal";
import type { Client } from "@/lib/site";

const categories = [
  "All Clients",
  "Developers & Real Estate",
  "Hotels & Hospitality",
  "Education & Healthcare",
  "Corporate & Industrial",
] as const;

type Category = (typeof categories)[number];

type Props = {
  clients: Client[];
};

export default function ClientRoster({ clients }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All Clients");
  const [activeClient, setActiveClient] = useState<Client | null>(null);

  const filteredClients =
    selectedCategory === "All Clients"
      ? clients
      : clients.filter((c) => c.category === selectedCategory);

  return (
    <section className="px-7 py-16">
      <div className="mx-auto max-w-[1240px]">
        {/* Section Heading */}
        <Reveal className="mb-10 text-center">
          <span className="eyebrow eyebrow-center">Our Roster</span>
          <h2 className="mx-auto mt-4 max-w-[24ch] text-[clamp(1.8rem,3vw,2.5rem)]">
            Developers, Brands & Institutions Building with Munesh
          </h2>
          <p className="mx-auto mt-3 max-w-[55ch] text-[0.92rem] text-stone-2">
            Click any client card to inspect our partnership overview, completed project scope, and delivered sites.
          </p>
        </Reveal>

        {/* Category Filter Pills (Glass style) */}
        <Reveal className="mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((cat) => {
              const count =
                cat === "All Clients"
                  ? clients.length
                  : clients.filter((c) => c.category === cat).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.83rem] font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-forest-deep text-white shadow-md shadow-forest-deep/20"
                      : "bg-white/70 text-stone-1 hover:bg-white border border-stone-0/10 hover:border-forest/30 backdrop-blur-md"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[0.68rem] font-semibold transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-forest-pale text-forest-ink group-hover:bg-forest/20"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Client Tiles Grid */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredClients.map((client, i) => (
              <motion.div
                key={client.name}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
              >
                <div onClick={() => setActiveClient(client)} className="h-full cursor-pointer">
                  <GlowCard className="group flex h-full flex-col justify-between rounded-3xl p-6 transition-all duration-300 border border-stone-0/10 hover:border-forest/40">
                    <div>
                      {/* Top Row: Category tag & years */}
                      <div className="mb-4 flex items-center justify-between">
                        <span className="inline-block rounded-full bg-forest-pale/80 px-2.5 py-1 text-[0.68rem] font-semibold tracking-wider text-forest-ink uppercase border border-forest/15">
                          {client.category.split(" & ")[0]}
                        </span>
                        {client.years && (
                          <span className="text-[0.72rem] font-medium text-stone-3">
                            {client.years}
                          </span>
                        )}
                      </div>

                      {/* Logo Container */}
                      <div className="relative mb-5 flex h-24 w-full items-center justify-center rounded-2xl bg-white/60 p-4 backdrop-blur-xs transition-all duration-300 group-hover:bg-white group-hover:shadow-xs">
                        <div className="relative h-16 w-full">
                          <Image
                            src={client.logo}
                            alt={`${client.name} logo`}
                            fill
                            sizes="(min-width: 1280px) 240px, (min-width: 768px) 300px, 90vw"
                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>

                      {/* Client Name & Info */}
                      <h3 className="text-[1.08rem] font-semibold text-stone-0 group-hover:text-forest-ink transition-colors">
                        {client.name}
                      </h3>
                      <p className="mt-1 text-[0.8rem] text-stone-3">
                        {client.location || "Delhi NCR"}
                      </p>
                      {client.description && (
                        <p className="mt-2.5 line-clamp-2 text-[0.82rem] leading-relaxed text-stone-2">
                          {client.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom CTA Indicator */}
                    <div className="mt-6 flex items-center justify-between border-t border-stone-0/05 pt-3.5 text-[0.78rem] font-semibold text-forest-ink group-hover:translate-x-0.5 transition-transform">
                      <span>View Partnership</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </GlowCard>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Glass Modal for Client Details */}
      <AnimatePresence>
        {activeClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveClient(null)}
              className="absolute inset-0 bg-stone-0/60 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong relative z-10 w-full max-w-xl overflow-hidden rounded-3xl p-7 shadow-2xl border border-white/60"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveClient(null)}
                className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full bg-stone-1/10 text-stone-1 hover:bg-forest-deep hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="flex items-center gap-4 border-b border-stone-0/10 pb-5">
                <div className="relative flex h-16 w-28 shrink-0 items-center justify-center rounded-xl bg-white p-2.5 shadow-sm border border-stone-0/08">
                  <Image
                    src={activeClient.logo}
                    alt={`${activeClient.name} logo`}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <span className="inline-block rounded-full bg-forest-pale px-2.5 py-0.5 text-[0.68rem] font-semibold text-forest-ink tracking-wider uppercase">
                    {activeClient.category}
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-stone-0">{activeClient.name}</h3>
                  <p className="text-[0.82rem] text-stone-3">{activeClient.location}</p>
                </div>
              </div>

              <div className="py-5 space-y-4">
                {activeClient.description && (
                  <div>
                    <h4 className="text-[0.75rem] font-bold uppercase tracking-wider text-stone-3">About the Client</h4>
                    <p className="mt-1 text-[0.9rem] leading-relaxed text-stone-1">{activeClient.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-2xl bg-white/80 p-3.5 border border-stone-0/06">
                    <span className="block text-[0.72rem] font-semibold uppercase text-stone-3">Partnership</span>
                    <span className="mt-0.5 block text-base font-bold text-forest-ink">{activeClient.years || "Active"}</span>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-3.5 border border-stone-0/06">
                    <span className="block text-[0.72rem] font-semibold uppercase text-stone-3">Delivered Scope</span>
                    <span className="mt-0.5 block text-[0.88rem] font-bold text-stone-0">{activeClient.projectsDelivered || "Turnkey Construction"}</span>
                  </div>
                </div>

                {activeClient.keyProjects && activeClient.keyProjects.length > 0 && (
                  <div className="pt-2">
                    <h4 className="text-[0.75rem] font-bold uppercase tracking-wider text-stone-3">Key Executed Projects</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {activeClient.keyProjects.map((proj) => (
                        <span
                          key={proj}
                          className="inline-flex items-center gap-1.5 rounded-full bg-forest-pale/90 px-3 py-1 text-[0.78rem] font-medium text-forest-ink border border-forest/20"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-forest">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                          </svg>
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-stone-0/10 pt-4">
                <span className="text-[0.8rem] text-stone-3">Building across Delhi NCR since 2003</span>
                <Link
                  href="/contact"
                  className="btn btn-forest text-[0.82rem] py-2.5 px-4"
                  onClick={() => setActiveClient(null)}
                >
                  Request Similar Proposal
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
