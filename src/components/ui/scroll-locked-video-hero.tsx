"use client";

// Adapted from "The City Opens" scroll-scrub video hero by guglielmogiannattasio.exe
// (https://www.guglielmogiannattasio.it).

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────
// Locked scroll-scrub video hero.
// While the hero is in control the page cannot move — body is pinned with
// position:fixed (the technique modal libraries use; overflow:hidden alone
// isn't reliable across browsers). Wheel, touch and keyboard input drive
// video.currentTime forward and backward. Once the video reaches the end and
// the visitor keeps pushing forward, the page unlocks and scrolls normally —
// and re-locks if they scroll back up to the very top.
// ─────────────────────────────────────────────────────────────

export interface ScrollVideoHeroProps {
  videoSrc: string;
  /** Lighter encode for phones (≤768px wide); falls back to `videoSrc`. */
  mobileVideoSrc?: string;
  poster?: string;
  /** Small label above the title, e.g. the practice's disciplines. */
  eyebrow?: string;
  /** Headline shown over the first frames; the second line renders in italic. */
  title: [string, string];
  /** Payoff line revealed as the video finishes. */
  tagline?: string;
  /** Rendered under the tagline (e.g. call-to-action buttons). */
  actions?: ReactNode;
  scrollHint?: string;
  /** Total input distance (px) needed to scrub the full video. */
  scrubDistance?: number;
  /** Source frame rate; seeks snap to whole frames. */
  fps?: number;
}

const KEY_STEP = 160;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function ScrollVideoHero({
  videoSrc,
  mobileVideoSrc,
  poster,
  eyebrow,
  title,
  tagline,
  actions,
  scrollHint = "Scroll",
  scrubDistance = 2600,
  fps = 30,
}: ScrollVideoHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(reduced);

    let duration = 0;
    let rafId = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let hasStartedScrolling = false;
    let isSeeking = false;
    let pendingTime: number | null = null;
    let locked = false;
    let lockedScrollY = 0;
    let touchStartY = 0;

    const onLoadedData = () => {
      duration = video.duration || 0;
      setReady(true);
      // Reduced motion: no scrubbing, just a settled frame near the end.
      if (reduced) video.currentTime = duration * 0.92;
    };
    video.addEventListener("loadeddata", onLoadedData);

    // Download the whole clip once and play it from memory: seeking a blob
    // never waits on a network range request, which is what makes scrubbing
    // stutter. Falls back to streaming the URL if the fetch fails.
    let blobUrl: string | null = null;
    let cancelled = false;
    const attach = (src: string) => {
      if (cancelled) return;
      video.src = src;
      video.load();
      // iOS Safari won't decode frames until playback starts. We only ever
      // seek, so kick it off with a silent play-then-pause.
      const p = video.play();
      if (p && typeof p.then === "function") p.then(() => video.pause()).catch(() => {});
      else video.pause();
    };
    const src =
      mobileVideoSrc && window.matchMedia("(max-width: 768px)").matches
        ? mobileVideoSrc
        : videoSrc;
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        blobUrl = URL.createObjectURL(blob);
        attach(blobUrl);
      })
      .catch(() => attach(src));

    const onSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        isSeeking = true;
        video.currentTime = t;
      }
    };
    video.addEventListener("seeked", onSeeked);

    let lastFrame = -1;
    function seekTo(t: number) {
      // Snap to whole frames; asking for the frame already on screen is wasted decode work.
      const frameIndex = Math.round(t * fps);
      if (frameIndex === lastFrame) return;
      lastFrame = frameIndex;
      t = Math.min(frameIndex / fps, Math.max(0, duration - 0.001));
      if (isSeeking) {
        pendingTime = t;
        return;
      }
      isSeeking = true;
      video!.currentTime = t;
    }

    function engageLock() {
      if (locked) return;
      locked = true;
      lockedScrollY = window.scrollY;
      const b = document.body.style;
      b.position = "fixed";
      b.top = `-${lockedScrollY}px`;
      b.left = "0";
      b.right = "0";
      b.width = "100%";
      b.overscrollBehavior = "none";
    }

    function releaseLock() {
      if (!locked) return;
      locked = false;
      const b = document.body.style;
      b.position = "";
      b.top = "";
      b.left = "";
      b.right = "";
      b.width = "";
      b.overscrollBehavior = "";
      window.scrollTo(0, lockedScrollY);
    }

    // The hero is only "at the top" when the page hasn't scrolled past its start.
    const atHeroTop = () => window.scrollY <= section.offsetTop + 2;

    /**
     * Route one input step. Returns true when the hero consumed it (the caller
     * then blocks native scrolling), false when the page should scroll.
     */
    function handleDelta(deltaY: number): boolean {
      if (!locked) {
        // Scrolling back up into the hero from below re-locks it.
        if (deltaY < 0 && atHeroTop()) engageLock();
        else return false;
      }
      // Finished and still pushing forward: hand control back to the page.
      if (deltaY > 0 && targetProgress >= 1) {
        releaseLock();
        return false;
      }
      targetProgress = clamp(targetProgress + deltaY / scrubDistance, 0, 1);
      if (targetProgress > 0.001) hasStartedScrolling = true;
      return true;
    }

    const onWheel = (e: WheelEvent) => {
      if (handleDelta(e.deltaY)) e.preventDefault();
    };
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchStartY;
      const deltaY = (touchStartY - y) * 1.6;
      touchStartY = y;
      if (handleDelta(deltaY) && e.cancelable) e.preventDefault();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      let delta = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) delta = KEY_STEP;
      else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) delta = -KEY_STEP;
      if (delta && handleDelta(delta)) e.preventDefault();
    };

    // Jump straight to the end and release the page.
    skipRef.current = () => {
      targetProgress = 1;
      currentProgress = 1;
      hasStartedScrolling = true;
      releaseLock();
      window.scrollTo({ top: section.offsetTop + section.offsetHeight, behavior: "smooth" });
    };

    let lastTime = performance.now();
    function frame(now: number) {
      // Frame-rate independent easing: the same feel on 60 Hz and 120 Hz screens.
      const dt = Math.min(64, now - lastTime);
      lastTime = now;
      const ease = 1 - Math.pow(1 - 0.1, dt / 16.67);
      currentProgress += (targetProgress - currentProgress) * ease;
      if (Math.abs(targetProgress - currentProgress) < 0.0005) currentProgress = targetProgress;

      if (duration > 0) seekTo(currentProgress * duration);

      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${1 + currentProgress * 0.03})`;
      }
      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.35, 0, 1);
        titleRef.current.style.opacity = String(t);
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`;
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1";
      }
      if (taglineRef.current) {
        const t = clamp((currentProgress - 0.82) / 0.18, 0, 1);
        taglineRef.current.style.opacity = String(t);
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`;
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`;
        // Buttons only take clicks once they are actually visible.
        taglineRef.current.style.pointerEvents = t > 0.6 ? "auto" : "none";
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`;
      }

      rafId = requestAnimationFrame(frame);
    }

    if (!reduced) {
      // Only take over if the visitor is actually at the hero (not restored mid-page).
      if (atHeroTop()) engageLock();
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("keydown", onKeyDown);
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(rafId);
      releaseLock();
    };
  }, [scrubDistance, videoSrc, mobileVideoSrc, fps]);

  const overlay: CSSProperties = { pointerEvents: "none" };

  return (
    <section
      ref={sectionRef}
      aria-label={`${title[0]} ${title[1]}`}
      className="relative h-dvh w-full overflow-hidden bg-scrim"
    >
      <video
        ref={videoRef}
        poster={poster}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 size-full origin-center object-cover transition-opacity duration-700 will-change-transform"
        // With a poster the first frame shows immediately while the clip downloads.
        style={{ opacity: ready || poster ? 1 : 0, pointerEvents: "none" }}
      />

      {/* Shade top and bottom so the cream type and navbar always read */}
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,14,0.55),rgba(20,18,14,0.1)_32%,rgba(20,18,14,0.2)_68%,rgba(20,18,14,0.65))]"
        style={overlay}
      />

      {/* Opening title — dissolves as the video starts */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-[6%] pt-16 text-center will-change-[transform,filter,opacity]"
        style={{ ...overlay, opacity: reduceMotion ? 0 : 1 }}
      >
        {eyebrow && (
          <p className="mb-6 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-[#fffdf8]/80">
            {eyebrow}
          </p>
        )}
        <h1 className="text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#fffdf8] [text-shadow:0_4px_30px_rgba(0,0,0,0.45)]">
          <span className="block">{title[0]}</span>
          <span className="block italic font-normal text-[#e9edd9]">{title[1]}</span>
        </h1>
      </div>

      {/* Payoff — focuses in as the video completes */}
      {(tagline || actions) && (
        <div
          ref={taglineRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-[8%] pt-16 text-center"
          style={{ opacity: reduceMotion ? 1 : 0, pointerEvents: reduceMotion ? "auto" : "none" }}
        >
          {tagline && (
            <p className="font-display text-[clamp(1.6rem,3.6vw,3rem)] font-medium leading-[1.15] tracking-[-0.01em] text-[#fffdf8] [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]">
              {tagline}
            </p>
          )}
          {actions}
        </div>
      )}

      {/* Scroll hint, hidden after the first input */}
      {!reduceMotion && (
        <div
          ref={hintRef}
          className="absolute bottom-[clamp(20px,6vh,48px)] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#fffdf8]/75 transition-opacity duration-400"
          style={overlay}
        >
          <span>{scrollHint}</span>
          <svg width="14" height="18" viewBox="0 0 14 18" className="animate-bounce">
            <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {!reduceMotion && (
        <button
          type="button"
          onClick={() => skipRef.current()}
          className="absolute bottom-[clamp(14px,2.5vw,24px)] right-[clamp(14px,2.5vw,28px)] z-10 rounded-full border border-[#fffdf8]/30 bg-[#fffdf8]/10 px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[#fffdf8]/85 backdrop-blur-md transition-colors hover:bg-[#fffdf8]/20 hover:text-[#fffdf8]"
        >
          Skip intro
        </button>
      )}

      {/* Thin progress line — fills as the video advances */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#fffdf8]/12">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left bg-[linear-gradient(90deg,#8a9a6a,#e9edd9)]"
          style={{ transform: reduceMotion ? "scaleX(1)" : "scaleX(0)" }}
        />
      </div>
    </section>
  );
}
