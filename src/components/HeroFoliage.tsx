"use client";

import Image from "next/image";
import { motion } from "motion/react";

/* Out-of-focus foliage cut from the approved homepage mockup (see
   public/images/site/hero-leaves.png). The mockup's headline and buttons are
   masked away, leaving only the leaves and their shadows on the wall.

   Multiply blending lets the crop's near-white wall take on the hero's own
   cream, so only the leaves and shadows darken it and no seam shows. It sits
   on the transformed wrapper because a transform isolates its children, which
   would otherwise have nothing behind them to blend with. */
export default function HeroFoliage() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -left-2 bottom-0 top-0 hidden aspect-[310/512] mix-blend-multiply lg:block"
      style={{ transformOrigin: "0% 100%" }}
      animate={{ rotate: [0, 0.6, 0, -0.4, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src="/images/site/hero-leaves.png"
        alt=""
        fill
        quality={90}
        sizes="430px"
        className="object-cover object-left-bottom"
      />
    </motion.div>
  );
}
