"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Loads GA4 when NEXT_PUBLIC_GA_ID is set, records campaign attribution, and
 * reports clicks on phone, WhatsApp and email links — for this business those
 * are leads just as much as a form submission.
 */
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      const href = link?.getAttribute("href");
      if (!href) return;
      const params = { page: window.location.pathname };
      if (href.startsWith("tel:")) trackEvent("click_call", params);
      else if (href.includes("wa.me/")) trackEvent("click_whatsapp", params);
      else if (href.startsWith("mailto:")) trackEvent("click_email", params);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <Script id="ga4-init">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
