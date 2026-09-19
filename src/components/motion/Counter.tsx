"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  // `reduced` only shapes the effect, never the rendered output, so server
  // and client markup stay identical during hydration.
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: reduced ? 0 : 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      <span className="text-forest">{suffix}</span>
    </span>
  );
}
