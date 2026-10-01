import { site } from "@/lib/site";

type Mail = {
  subject: string;
  /** Rows shown as a table in the email; empty values are skipped. */
  fields: [label: string, value: string][];
  /** Address the team's "Reply" goes to — the person who filled the form. */
  replyTo?: string;
  attachments?: File[];
};

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** True once RESEND_API_KEY is set — until then form submissions are only logged. */
export const emailConfigured = () => Boolean(process.env.RESEND_API_KEY);

/**
 * Sends a form submission to the team inbox through Resend's HTTP API.
 *
 * Env:
 *   RESEND_API_KEY   — required, from resend.com → API Keys
 *   LEADS_EMAIL_TO   — inbox(es), comma-separated; defaults to site.email
 *   LEADS_EMAIL_FROM — verified sender; defaults to Resend's test sender, which
 *                      can only deliver to the email the Resend account was made with
 */
export async function sendMail({ subject, fields, replyTo, attachments = [] }: Mail) {
  const to = (process.env.LEADS_EMAIL_TO ?? site.email).split(",").map((s) => s.trim());
  const from = process.env.LEADS_EMAIL_FROM ?? `${site.name} Website <onboarding@resend.dev>`;
  const rows = fields.filter(([, v]) => v);

  const html = `<table cellpadding="8" style="border-collapse:collapse;font:14px sans-serif">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#666;vertical-align:top;white-space:nowrap">${escape(k)}</td><td style="white-space:pre-wrap">${escape(v)}</td></tr>`,
    )
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const files = await Promise.all(
    attachments.map(async (f) => ({
      filename: f.name,
      content: Buffer.from(await f.arrayBuffer()).toString("base64"),
    })),
  );

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      text,
      ...(replyTo && { reply_to: replyTo }),
      ...(files.length && { attachments: files }),
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}
