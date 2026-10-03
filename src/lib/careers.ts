"use server";

import type { LeadState } from "@/lib/leads";
import { emailConfigured, sendMail } from "@/lib/mailer";
import { site } from "@/lib/site";

const FIELDS = ["name", "phone", "email", "role", "experience", "portfolio", "note"] as const;

/** Kept under Vercel's 4.5 MB request cap; next.config.ts raises the Server Action body limit to match. */
const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const RESUME_TYPES = /\.(pdf|docx?)$/i;

const FALLBACK = `Sorry, your application could not be sent. Please email it to ${site.email}.`;

/** Career-page job application, emailed to the team with the resume attached. */
export async function submitApplication(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Honeypot: hidden from people, so only bots fill it. Pretend success.
  if (formData.get("company_website")) return { status: "success" };

  const app = Object.fromEntries(
    FIELDS.map((f) => [f, String(formData.get(f) ?? "").trim().slice(0, 2000)]),
  ) as Record<(typeof FIELDS)[number], string>;

  if (!app.name) return { status: "error", message: "Please add your name." };
  if (app.phone.replace(/\D/g, "").length < 10) {
    return { status: "error", message: "Please enter a valid phone number." };
  }
  if (!/^\S+@\S+\.\S+$/.test(app.email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const file = formData.get("resume");
  const resume = file instanceof File && file.size > 0 ? file : null;
  if (!resume) return { status: "error", message: "Please attach your resume." };
  if (!RESUME_TYPES.test(resume.name)) {
    return { status: "error", message: "Resume must be a PDF or Word document." };
  }
  if (resume.size > MAX_RESUME_BYTES) {
    return { status: "error", message: "Resume must be under 4 MB." };
  }

  const summary = { ...app, resume: `${resume.name} (${Math.round(resume.size / 1024)} KB)` };

  if (!emailConfigured()) {
    // Logged so the applicant can still be contacted; the file itself is lost.
    console.error("RESEND_API_KEY is not set — application not delivered:", summary);
    return { status: "error", message: FALLBACK };
  }

  try {
    await sendMail({
      subject: `Job application: ${app.name} — ${app.role || "Open application"}`,
      replyTo: app.email,
      attachments: [resume],
      fields: [
        ["Name", app.name],
        ["Phone", app.phone],
        ["Email", app.email],
        ["Applying for", app.role],
        ["Experience", app.experience],
        ["Portfolio", app.portfolio],
        ["Why this role", app.note],
        ["Resume", summary.resume],
      ],
    });
  } catch (err) {
    console.error("Application email failed — not delivered:", err, summary);
    return { status: "error", message: FALLBACK };
  }

  return { status: "success" };
}
