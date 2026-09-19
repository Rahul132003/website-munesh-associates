"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { categoryIcons, projectCategories, type Project } from "@/lib/site";

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-2.5">
        {["All", ...projectCategories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-[0.82rem] font-medium transition-colors duration-300 ${
              filter === cat ? "text-[#fffdf8]" : "text-stone-2 hover:text-stone-0"
            }`}
          >
            {filter === cat ? (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 -z-10 rounded-full bg-linear-to-br from-forest-ink to-forest-deep shadow-[0_6px_16px_rgba(92,71,38,0.28)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : (
              <span className="absolute inset-0 -z-10 rounded-full border border-stone-0/10 bg-white/60" />
            )}

            {categoryIcons[cat] && (
              <Image
                src={categoryIcons[cat]}
                alt=""
                width={16}
                height={16}
                className={`size-4 object-contain transition-all duration-300 ${
                  filter === cat
                    ? "opacity-90 brightness-0 invert"
                    : "opacity-70 grayscale sepia"
                }`}
              />
            )}
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="glass glass-hover group overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-t-3xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  quality={90}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-forest-ink backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-[1.12rem]">{project.title}</h3>
                <p className="mt-1.5 text-[0.86rem] text-stone-2">{project.scope}</p>
                <p className="mt-4 flex items-center gap-2 text-[0.76rem] text-stone-3">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="text-forest"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {project.location} · {project.year}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-stone-3">No projects listed in this category yet.</p>
      )}
    </>
  );
}
