"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Client } from "@/lib/site";

/** Seamless client-logo ribbon — the track holds two copies and shifts by exactly half. */
export default function Marquee({ items, speed = 48 }: { items: Client[]; speed?: number }) {
  const track = [...items, ...items];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex w-max gap-4 py-2"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {track.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            // The second copy exists only to make the loop seamless
            aria-hidden={i >= items.length}
            className="glass group flex h-28 w-[13.5rem] shrink-0 items-center justify-center rounded-2xl px-7"
          >
            <div className="relative h-16 w-full">
              <Image
                src={client.logo}
                alt={i < items.length ? `${client.name} logo` : ""}
                fill
                sizes="170px"
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
