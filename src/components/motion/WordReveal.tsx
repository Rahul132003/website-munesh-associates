"use client";

import { motion } from "motion/react";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** Words rendered in the italic olive display style, matched case-insensitively. */
  accent?: string[];
};

export default function WordReveal({ text, className = "", delay = 0, accent = [] }: Props) {
  const words = text.split(" ");
  const accentSet = new Set(accent.map((w) => w.toLowerCase()));

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.075, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${
              accentSet.has(word.replace(/[^a-zA-Z]/g, "").toLowerCase()) ? "display-accent" : ""
            }`}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
