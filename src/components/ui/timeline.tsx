// Adapted from Hyperiux Vault: https://vault.hyperiux.com
"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/* Inline stand-in for @gsap/react's useGSAP. One gsap.context lives for the
   component's lifetime, the callback is re-added when dependencies change,
   and the context is reverted only on unmount. A callback may return its own
   cleanup, which runs before the next re-add and on unmount. */
function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null };
  },
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    ctxRef.current = gsap.context(() => {}, scope?.current ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export type TimelineItem = {
  year: string;
  title: string;
  body: string;
};

type SplitTextInstance = InstanceType<typeof SplitText>;

export type TimelineProps = {
  items: TimelineItem[];
  eyebrow?: string;
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageSrc: string;
  imageAlt: string;
  /** Reveal animation duration, in seconds. */
  duration?: number;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_BREAKPOINT = 600;

function subscribeToReducedMotion(callback: () => void) {
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/* Evenly spaced [start, end] scroll windows (as % of the section) at which
   each milestone draws its stem and reveals its copy. */
function revealWindows(count: number, mobile: boolean) {
  const [first, last, span] = mobile ? [20, 64, 10] : [6, 62, 20];
  const step = count > 1 ? (last - first) / (count - 1) : 0;
  return Array.from({ length: count }, (_, i) => {
    const start = first + step * i;
    return [start, start + span] as const;
  });
}

export default function Timeline({
  items,
  eyebrow = "Milestones",
  title = "How the practice grew",
  periodLabel,
  textColor = "var(--color-stone-0)",
  mutedTextColor = "var(--color-stone-2)",
  activeColor = "var(--color-forest)",
  backgroundColor = "transparent",
  imageSrc,
  imageAlt,
  duration = 1.2,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const normalizedDuration = Math.max(0.2, duration);

  // Milestones alternate above and below the line, in chronological order.
  const entries = items.map((item, i) => ({ ...item, key: `m${i}`, top: i % 2 === 0 }));
  const topEntries = entries.filter((e) => e.top);
  const bottomEntries = entries.filter((e) => !e.top);

  const sectionStyle: CSSProperties = { color: textColor, backgroundColor };
  const activeStyle: CSSProperties = { backgroundColor: activeColor };
  const mutedTextStyle: CSSProperties = { color: mutedTextColor };
  const headingStyle: CSSProperties = { color: textColor };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const slidePercent = isMobile ? -66 : -55;
      const lineWidth = isMobile ? "72%" : "98%";
      const lineStart = isMobile ? "top 30%" : "top 25%";
      const slideEnd = isMobile ? "82% 50%" : "92% bottom";
      const lineEnd = isMobile ? "80% 50%" : "92% bottom";

      gsap
        .timeline({
          scrollTrigger: { trigger: section, start: "top top", end: slideEnd, scrub: true },
          defaults: { ease: "none" },
        })
        .fromTo(wholeSliderRef.current, { xPercent: 0 }, { xPercent: slidePercent });

      if (reducedMotion) {
        gsap.set(".journey-line", { width: lineWidth });
        return;
      }

      gsap.to(".journey-line", {
        width: lineWidth,
        ease: "none",
        scrollTrigger: { trigger: section, start: lineStart, end: lineEnd, scrub: true },
      });
    },
    { dependencies: [reducedMotion], scope: sectionRef },
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (reducedMotion) {
        entries.forEach(({ key }) => {
          gsap.set(`.jl-${key}`, { scaleY: 1 });
          gsap.set(`.jd-${key}`, { scale: 1 });
          gsap.set([`.title-${key}`, `.description-${key}`], {
            opacity: 1,
            clearProps: "transform",
          });
        });
        return;
      }

      const titleSplits: SplitTextInstance[] = [];
      const descriptionSplits: SplitTextInstance[] = [];

      const windows = revealWindows(entries.length, window.innerWidth < MOBILE_BREAKPOINT);

      entries.forEach(({ key, top }, index) => {
        gsap.set(`.jl-${key}`, { scaleY: 0, transformOrigin: top ? "bottom" : "top" });
        gsap.set(`.jd-${key}`, { scale: 0 });
        gsap.set([`.title-${key}`, `.description-${key}`], { opacity: 1 });

        const titleSplit = new SplitText(`.title-${key}`, {
          type: "words, lines",
          mask: "lines",
        });
        const descriptionSplit = new SplitText(`.description-${key}`, {
          type: "words, lines",
          mask: "lines",
        });
        titleSplits.push(titleSplit);
        descriptionSplits.push(descriptionSplit);

        const [startPos, endPos] = windows[index];

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: `${startPos}% 30%`,
              end: `${endPos}% 50%`,
              scrub: true,
            },
          })
          .to(`.jl-${key}`, { scaleY: 1, duration: normalizedDuration * 0.4 })
          .to(`.jd-${key}`, { scale: 1, duration: normalizedDuration * 0.4 }, "<")
          .fromTo(
            titleSplit.lines,
            { yPercent: 110 },
            {
              yPercent: 0,
              delay: -0.8 * normalizedDuration,
              duration: normalizedDuration,
              stagger: 0.02,
              ease: "power2.out",
            },
          )
          .fromTo(
            descriptionSplit.lines,
            { yPercent: 110 },
            { yPercent: 0, duration: normalizedDuration, stagger: 0.02, ease: "power2.out" },
            "<",
          );
      });

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize);

      return () => {
        titleSplits.forEach((split) => split.revert());
        descriptionSplits.forEach((split) => split.revert());
        window.removeEventListener("resize", handleResize);
      };
    },
    { dependencies: [normalizedDuration, reducedMotion, items], scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label={title}
      className="relative h-[200vw] w-full max-[600px]:h-[400vh]"
      style={sectionStyle}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden pt-[10%] max-[600px]:top-[5%]">
        <div
          ref={wholeSliderRef}
          className="flex h-[30vw] w-[200vw] items-center gap-[5vw] px-[5vw] max-[600px]:h-[80vh] max-[600px]:w-[620vw] max-[600px]:px-[7vw]"
        >
          <div className="relative h-full w-[30vw] shrink-0 overflow-hidden rounded-[1.5vw] border border-stone-0/10 max-[600px]:h-[65vw] max-[600px]:w-[85vw] max-[600px]:rounded-[5vw]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              quality={90}
              draggable={false}
              sizes="(max-width: 600px) 85vw, 30vw"
              className="object-cover object-top"
            />
          </div>

          <div className="relative h-full w-full">
            {/* The horizontal rail, drawn left to right as the page scrolls */}
            <div className="absolute left-0 top-[49%] flex h-fit w-full items-center">
              <div
                className="size-[.8vw] rounded-full max-[600px]:size-[2vw]"
                style={activeStyle}
              />
              <div className="journey-line h-px w-0 rounded-full" style={activeStyle} />
              <div
                className="size-[.8vw] rounded-full max-[600px]:size-[2vw]"
                style={activeStyle}
              />
            </div>

            <div className="flex h-1/2 w-full items-center justify-start gap-[.5vw]">
              <div className="h-full w-[20%] shrink-0 pt-[2vw] max-[600px]:h-fit max-[600px]:pt-[5vw]">
                <span className="eyebrow max-[600px]:text-[2.6vw]">{eyebrow}</span>
                <h2
                  className="mt-[1vw] w-[90%] text-[3vw] leading-[0.98] max-[600px]:mt-[3vw] max-[600px]:text-[8.5vw]"
                  style={headingStyle}
                >
                  {title}
                </h2>
              </div>

              <div className="flex h-full w-full gap-x-[15vw] max-[600px]:gap-x-[40vw]">
                {topEntries.map((item) => (
                  <div
                    key={item.key}
                    className="relative h-full w-[30vw] shrink-0 px-[3vw] max-[600px]:flex max-[600px]:w-[70vw] max-[600px]:flex-col max-[600px]:px-[7vw]"
                  >
                    <div className="absolute inset-y-0 left-0 h-full w-full">
                      <div
                        className={`jd-${item.key} relative aspect-square size-[1vw] -translate-x-1/2 rounded-full max-[600px]:size-[2.5vw]`}
                        style={activeStyle}
                      />
                      <div
                        className={`jl-${item.key} h-[94%] w-px origin-bottom rounded-full`}
                        style={activeStyle}
                      />
                    </div>

                    <div className="-mt-[1vw] space-y-[0.8vw] max-[600px]:-mt-[2vw] max-[600px]:space-y-[2vw]">
                      <p className="text-[0.95vw] font-semibold tracking-[0.12em] text-forest-ink max-[600px]:text-[3.4vw]">
                        {item.year}
                      </p>
                      <h3
                        className={`title-${item.key} text-[1.9vw] leading-[1.05] max-[600px]:text-[6vw]`}
                        style={headingStyle}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`description-${item.key} w-[92%] text-[1.05vw] leading-[1.4] max-[600px]:text-[3.9vw]`}
                        style={mutedTextStyle}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex h-1/2 w-full items-center justify-start">
              <div className="h-full w-[34%] shrink-0 pt-[2vw] max-[600px]:w-[30%] max-[600px]:pt-[5vw]">
                {periodLabel && (
                  <p
                    className="font-display text-[1.65vw] italic leading-none max-[600px]:text-[4.2vw]"
                    style={mutedTextStyle}
                  >
                    {periodLabel}
                  </p>
                )}
              </div>

              <div className="ml-[7vw] flex h-full w-full gap-x-[20vw] max-[600px]:ml-[7vw] max-[600px]:gap-x-[40vw]">
                {bottomEntries.map((item) => (
                  <div
                    key={item.key}
                    className="relative h-full w-[25vw] shrink-0 px-[3vw] max-[600px]:w-[70vw] max-[600px]:px-[7vw]"
                  >
                    <div className="absolute -bottom-[1%] left-0 h-full w-full">
                      <div
                        className={`jl-${item.key} h-[94%] w-px origin-top rounded-full max-[600px]:h-full`}
                        style={activeStyle}
                      />
                      <div
                        className={`jd-${item.key} relative aspect-square size-[1vw] -translate-x-1/2 rounded-full max-[600px]:size-[2.5vw]`}
                        style={activeStyle}
                      />
                    </div>

                    <div className="flex h-full w-full flex-col justify-end space-y-[0.8vw] max-[600px]:space-y-[2vw]">
                      <p className="text-[0.95vw] font-semibold tracking-[0.12em] text-forest-ink max-[600px]:text-[3.4vw]">
                        {item.year}
                      </p>
                      <h3
                        className={`title-${item.key} text-[1.9vw] leading-[1.05] max-[600px]:text-[6vw]`}
                        style={headingStyle}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`description-${item.key} w-[92%] text-[1.05vw] leading-[1.4] max-[600px]:text-[3.9vw]`}
                        style={mutedTextStyle}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
