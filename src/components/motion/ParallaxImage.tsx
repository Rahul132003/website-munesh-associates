"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  quality?: number;
  /** Pixels of vertical drift across the full scroll range. */
  distance?: number;
};

export default function ParallaxImage({
  src,
  alt,
  priority,
  sizes = "100vw",
  className = "",
  quality = 90,
  distance = 60,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  // The moving layer is taller than its frame by `distance` on each side, so
  // the drift never exposes an edge. Scaling the image instead would upsample
  // it and visibly soften the photograph.
  const overhang = distance + 8;

  // Scroll-linked motion isn't covered by MotionConfig's reducedMotion, so the
  // drift is cancelled in CSS instead — same markup on server and client.
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ top: -overhang, bottom: -overhang, y }}
        className="absolute inset-x-0 motion-reduce:transform-none!"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={quality}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
