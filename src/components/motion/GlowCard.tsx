"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Lift distance on hover. */
  lift?: number;
};

/** Glass panel with a forest glow that tracks the pointer across its surface. */
export default function GlowCard({ children, className = "", lift = -6 }: Props) {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const glow = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, rgba(107,122,82,0.14), rgba(107,122,82,0.05) 42%, transparent 72%)`;

  const track = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const reset = () => {
    mx.set(-200);
    my.set(-200);
  };

  return (
    <motion.div
      onMouseMove={track}
      onMouseLeave={reset}
      whileHover={{ y: lift }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`glass glass-hover group relative overflow-hidden ${className}`}
    >
      <motion.span
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
