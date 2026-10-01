"use client";

import { type ReactNode, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  type MotionValue,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/* Read through useSyncExternalStore so the server and the first client render
   agree (false), avoiding a hydration mismatch on small screens. */
function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export type CarouselCard = {
  src: string;
  alt: string;
  /** Caption shown while this card faces the viewer. */
  name: string;
  role: string;
};

const ease = [0.32, 0.72, 0, 1] as const;
const transitionOverlay = { duration: 0.5, ease };

function Face({
  card,
  angle,
  cardWidth,
  radius,
  rotation,
  onOpen,
  wasDragged,
}: {
  card: CarouselCard;
  angle: number;
  cardWidth: number;
  radius: number;
  rotation: MotionValue<number>;
  onOpen: (card: CarouselCard) => void;
  wasDragged: () => boolean;
}) {
  // Cards dim as they turn away from the viewer, so the front one reads first.
  const opacity = useTransform(rotation, (r) => {
    const facing = Math.cos(((angle + r) * Math.PI) / 180);
    return 0.35 + 0.65 * Math.max(0, facing) ** 1.5;
  });

  return (
    <motion.div
      role="button"
      tabIndex={-1}
      aria-label={`${card.name} — enlarge photo`}
      className="absolute left-1/2 top-1/2 cursor-pointer"
      style={{
        width: cardWidth,
        height: cardWidth * 1.25,
        marginLeft: -cardWidth / 2,
        marginTop: -(cardWidth * 1.25) / 2,
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        opacity,
      }}
      onClick={() => {
        if (!wasDragged()) onOpen(card);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- shared layoutId needs a plain img */}
      <motion.img
        src={card.src}
        alt={card.alt}
        draggable={false}
        layoutId={`img-${card.src}`}
        className="pointer-events-none h-full w-full rounded-2xl border border-stone-0/10 object-cover object-top shadow-[0_14px_34px_rgba(45,44,30,0.16)]"
      />
    </motion.div>
  );
}

/* One card on the arc. `theta` is the card's angle from the top of the wheel:
   0 sits upright at the top, and cards fan down and outwards either side. */
function ArcFace({
  card,
  angle,
  step,
  cardWidth,
  radius,
  rotation,
  onOpen,
  wasDragged,
}: {
  card: CarouselCard;
  angle: number;
  step: number;
  cardWidth: number;
  radius: number;
  rotation: MotionValue<number>;
  onOpen: (card: CarouselCard) => void;
  wasDragged: () => boolean;
}) {
  const theta = useTransform(rotation, (r) => angle + r);
  const away = useTransform(theta, (t) => Math.min(Math.abs(t) / step, 4));
  const x = useTransform(theta, (t) => radius * Math.sin((t * Math.PI) / 180));
  const y = useTransform(theta, (t) => radius * (1 - Math.cos((t * Math.PI) / 180)));
  const scale = useTransform(away, (a) => 1 - 0.09 * a);
  const opacity = useTransform(away, (a) => (a > 3.2 ? 0 : 1 - 0.2 * a));
  const zIndex = useTransform(away, (a) => 100 - Math.round(a * 10));

  return (
    <motion.div
      role="button"
      tabIndex={-1}
      aria-label={`${card.name} — enlarge photo`}
      className="absolute left-1/2 top-[44%] cursor-pointer"
      style={{
        width: cardWidth,
        height: cardWidth * 1.25,
        marginLeft: -cardWidth / 2,
        marginTop: -(cardWidth * 1.25) / 2,
        x,
        y,
        rotate: theta,
        scale,
        opacity,
        zIndex,
      }}
      onClick={() => {
        if (!wasDragged()) onOpen(card);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- shared layoutId needs a plain img */}
      <motion.img
        src={card.src}
        alt={card.alt}
        draggable={false}
        layoutId={`img-${card.src}`}
        className="pointer-events-none h-full w-full rounded-2xl border border-stone-0/10 object-cover object-top shadow-[0_18px_40px_rgba(45,44,30,0.2)]"
      />
    </motion.div>
  );
}

/**
 * A 3D photo ring pinned in place while its section scrolls past: each step of
 * scroll turns one card to the front. Visitors can also drag the ring or jump
 * with the dots. `children` renders as the pinned heading above the ring.
 *
 * `variant="ring"` spins the photos on a 3D cylinder; `variant="arc"` fans them
 * along the top of a large wheel, like a hand of cards.
 */
export function ThreeDPhotoCarousel({
  cards,
  variant = "ring",
  children,
}: {
  cards: CarouselCard[];
  variant?: "ring" | "arc";
  children?: ReactNode;
}) {
  const isArc = variant === "arc";
  const [active, setActive] = useState<CarouselCard | null>(null);
  const [frontIndex, setFrontIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isSmall = useMediaQuery("(max-width: 640px)");
  const isShort = useMediaQuery("(max-height: 820px)");
  const reducedMotion = useReducedMotion();

  // Ring geometry: one slot per card with a small gap, so neighbours sit close
  // without overlapping.
  const faceCount = cards.length;
  const ringCardWidth = isSmall ? 210 : isShort ? 280 : 330;
  const cardWidth = isArc ? Math.round(ringCardWidth * 0.85) : ringCardWidth;
  // Arc: neighbouring cards 18° apart on a wheel sized so they sit just clear of each other.
  const step = isArc ? 18 : 360 / faceCount;
  const radius = isArc
    ? (cardWidth * 1.05) / ((step * Math.PI) / 180)
    : (cardWidth * 1.25 * faceCount) / (2 * Math.PI);
  const lastAngle = step * (faceCount - 1);
  const perspective = isSmall ? 1300 : 2200;

  // Scroll through the pinned track turns the ring from the first card to the last.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  const progress = reducedMotion ? scrollYProgress : smoothProgress;
  const dragRotation = useMotionValue(0);
  const rotation = useTransform(
    [progress, dragRotation] as MotionValue<number>[],
    ([p, d]: number[]) => -p * lastAngle + d,
  );

  useMotionValueEvent(rotation, "change", (r) => {
    const nearest = Math.round(-r / step);
    // The ring wraps around; the arc has a first and last card.
    const i = isArc
      ? Math.min(faceCount - 1, Math.max(0, nearest))
      : ((nearest % faceCount) + faceCount) % faceCount;
    setFrontIndex(i);
  });

  // A drag ends with a click on the card under the pointer; ignore that one.
  const dragged = useRef(false);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  // Scroll the page to the point in the track where card `i` faces front.
  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    dragRotation.set(0);
    const top = track.getBoundingClientRect().top + window.scrollY;
    const travel = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (travel * i) / (faceCount - 1), behavior: "smooth" });
  };

  const front = cards[frontIndex];

  return (
    <div ref={trackRef} className="relative" style={{ height: `${faceCount * 45 + 60}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden pt-20 max-sm:pt-16">
        {children}

        <motion.div
          className="relative w-full flex-1 cursor-grab select-none active:cursor-grabbing max-h-[680px] min-h-[380px] max-sm:max-h-[420px]"
          style={{ perspective, touchAction: "pan-y" }}
          onPanStart={() => {
            dragged.current = true;
          }}
          onPan={(_, info) => {
            // Dragging one card-width moves one card.
            if (!active) dragRotation.set(dragRotation.get() + (info.delta.x * step) / cardWidth);
          }}
          onPanEnd={() => {
            // Settle on the nearest card rather than stopping between two.
            const total = rotation.get();
            let snapped = Math.round(total / step) * step;
            if (isArc) snapped = Math.min(0, Math.max(-lastAngle, snapped));
            animate(dragRotation, dragRotation.get() + (snapped - total), {
              type: "spring",
              stiffness: 160,
              damping: 26,
            });
            setTimeout(() => {
              dragged.current = false;
            }, 0);
          }}
        >
          {isArc ? (
            cards.map((card, i) => (
              <ArcFace
                key={card.src}
                card={card}
                angle={i * step}
                step={step}
                cardWidth={cardWidth}
                radius={radius}
                rotation={rotation}
                onOpen={setActive}
                wasDragged={() => dragged.current}
              />
            ))
          ) : (
            <motion.div
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d", z: -radius, rotateY: rotation }}
            >
              {cards.map((card, i) => (
                <Face
                  key={card.src}
                  card={card}
                  angle={i * step}
                  cardWidth={cardWidth}
                  radius={radius}
                  rotation={rotation}
                  onOpen={setActive}
                  wasDragged={() => dragged.current}
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Flat caption for whichever card faces the viewer */}
        <div className="mt-4 h-[3.6rem] text-center" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={front.src}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <p className="font-display text-[1.2rem] font-semibold text-stone-0">{front.name}</p>
              <p className="mt-1 text-[0.85rem] text-stone-2">{front.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mb-8 mt-4 flex items-center gap-2.5">
          {cards.map((card, i) => (
            <button
              key={card.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${card.name}`}
              aria-current={i === frontIndex}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === frontIndex ? "w-6 bg-forest-deep" : "w-2 bg-stone-0/20 hover:bg-forest"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.name}
            className="fixed inset-0 z-50 flex cursor-zoom-out flex-col items-center justify-center gap-5 bg-scrim/75 p-5 backdrop-blur-md md:p-16"
            transition={transitionOverlay}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- shared layoutId needs a plain img */}
            <motion.img
              layoutId={`img-${active.src}`}
              src={active.src}
              alt={active.alt}
              className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <p className="font-display text-[1.4rem] font-semibold text-[#fffdf8]">
                {active.name}
              </p>
              <p className="mt-1 text-[0.9rem] text-[#fffdf8]/75">{active.role}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
