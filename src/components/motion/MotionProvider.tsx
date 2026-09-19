"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/* Reduced motion is honoured here, once, rather than by components branching
   on useReducedMotion() while rendering. That hook reads the media query
   synchronously on the client, so any render-time branch produces markup the
   server never sent and breaks hydration for reduced-motion visitors. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
