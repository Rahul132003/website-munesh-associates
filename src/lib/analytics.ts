type Gtag = (...args: unknown[]) => void;

/** Send a GA4 event. A no-op when analytics isn't configured. */
export function trackEvent(name: string, params?: Record<string, string | number>) {
  (window as Window & { gtag?: Gtag }).gtag?.("event", name, params);
}
