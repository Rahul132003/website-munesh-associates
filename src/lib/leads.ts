"use server";

import { site } from "@/lib/site";

export type LeadState = { status: "idle" | "success" | "error"; message?: string };

const FIELDS = [
  "name",
  "phone",
  "email",
  "type",
  "location",
  "message",
  // Attribution, filled in by the browser (see lib/attribution.ts)
  "landing_page",
  "page",
  "referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

const FALLBACK = `Sorry, your enquiry could not be sent. Please call ${site.phones[0]} or message us on WhatsApp.`;

/**
 * Delivers a contact-form enquiry as JSON to LEAD_WEBHOOK_URL — any endpoint that
 * accepts a JSON POST works: Formspree, Zapier, Make, a Google Apps Script that
 * appends to a Sheet, or a CRM's inbound webhook.
 */
export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Honeypot: hidden from people, so only bots fill it. Pretend success.
  if (formData.get("company_website")) return { status: "success" };

  const lead = Object.fromEntries(
    FIELDS.map((f) => [f, String(formData.get(f) ?? "").trim().slice(0, 2000)]),
  ) as Record<(typeof FIELDS)[number], string>;

  if (!lead.name) return { status: "error", message: "Please add your name." };
  if (lead.phone.replace(/\D/g, "").length < 10) {
    return { status: "error", message: "Please enter a valid phone number so we can call you back." };
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    // Logged in full so the enquiry can still be recovered from the server logs.
    console.error("LEAD_WEBHOOK_URL is not set — enquiry not delivered:", lead);
    return { status: "error", message: FALLBACK };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...lead, submitted_at: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("Lead webhook failed — enquiry not delivered:", err, lead);
    return { status: "error", message: FALLBACK };
  }

  return { status: "success" };
}
