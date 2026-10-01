// First-touch marketing attribution for the current browser session, so an
// enquiry sent from /contact still knows which ad or search brought the visitor in.

const KEY = "ma_attribution";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];

/** Record the landing page, referrer and campaign tags once per session. */
export function captureAttribution() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const search = new URLSearchParams(window.location.search);
    const data: Record<string, string> = {
      landing_page: window.location.pathname + window.location.search,
      referrer: document.referrer,
    };
    for (const p of PARAMS) {
      const v = search.get(p);
      if (v) data[p] = v;
    }
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Storage blocked (private mode etc.) — attribution is best-effort.
  }
}

/** Copy stored attribution, plus the page the form sits on, into a form submission. */
export function appendAttribution(formData: FormData) {
  formData.set("page", window.location.pathname);
  try {
    const data = JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Record<string, string>;
    for (const [k, v] of Object.entries(data)) formData.set(k, v);
  } catch {
    // Nothing stored; the lead still goes through.
  }
}
