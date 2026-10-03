"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";

/**
 * Phone-only bar pinned to the bottom of the screen. The navbar's quote button
 * is hidden below `sm`, so without this a mobile visitor has no one-tap way to
 * get in touch. It slides in once the visitor scrolls, which also keeps it clear
 * of the home page's scroll-locked hero.
 */
export default function MobileContactBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-90 border-t border-stone-0/10 bg-base-0/95 px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-6px_24px_rgba(45,44,30,0.08)] backdrop-blur-xl transition-transform duration-500 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-3 gap-2 text-[0.8rem] font-semibold">
        <a
          href={`tel:${site.phones[0].replace(/\s/g, "")}`}
          tabIndex={visible ? 0 : -1}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-0/12 bg-white/80 py-3 text-stone-0"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
          </svg>
          Call
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-0/12 bg-white/80 py-3 text-stone-0"
        >
          WhatsApp
        </a>
        <Link
          href="/contact"
          tabIndex={visible ? 0 : -1}
          className="btn btn-forest justify-center rounded-xl px-2 py-3 text-[0.8rem]"
        >
          Free Quote
        </Link>
      </div>
    </div>
  );
}
