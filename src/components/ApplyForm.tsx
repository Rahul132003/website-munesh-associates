"use client";

import { useActionState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { submitApplication } from "@/lib/careers";
import type { LeadState } from "@/lib/leads";
import { jobs, site } from "@/lib/site";

const initial: LeadState = { status: "idle" };

// Mirrors the server-side limit in lib/careers.ts; checked here so a big file fails before uploading
const MAX_RESUME_BYTES = 4 * 1024 * 1024;

export default function ApplyForm() {
  const [state, dispatch, pending] = useActionState(submitApplication, initial);
  const sent = state.status === "success";

  useEffect(() => {
    if (state.status === "success") trackEvent("submit_application", { form: "career" });
  }, [state]);

  return (
    <form id="apply" action={dispatch} className="glass rounded-3xl p-8 sm:p-10">
      <h2 className="text-[1.6rem]">Apply to join us</h2>
      <p className="mt-2 text-[0.9rem]">
        Send us your details and resume. We review every application.
      </p>

      {/* Honeypot: off-screen and skipped by keyboard and screen readers; only bots fill it */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-[0.8rem] font-medium text-stone-2">Full name</span>
          <input required type="text" name="name" placeholder="Your name" className="field" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.8rem] font-medium text-stone-2">Phone</span>
          <input required type="tel" name="phone" placeholder="+91 00000 00000" className="field" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.8rem] font-medium text-stone-2">Email</span>
          <input required type="email" name="email" placeholder="you@example.com" className="field" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.8rem] font-medium text-stone-2">Applying for</span>
          <select name="role" defaultValue="" className="field">
            <option value="" disabled>
              Select a role
            </option>
            {jobs.map((job) => (
              <option key={job.title} value={job.title}>
                {job.title}
              </option>
            ))}
            <option value="Open application">Open application</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.8rem] font-medium text-stone-2">Years of experience</span>
          <input type="text" name="experience" placeholder="e.g. 4 years" className="field" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.8rem] font-medium text-stone-2">
            Portfolio link <span className="font-normal text-stone-3">(optional)</span>
          </span>
          <input type="url" name="portfolio" placeholder="https://" className="field" />
        </label>

        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-[0.8rem] font-medium text-stone-2">
            Resume <span className="font-normal text-stone-3">(PDF or Word, max 4 MB)</span>
          </span>
          <input
            required
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              e.currentTarget.setCustomValidity(
                file && file.size > MAX_RESUME_BYTES ? "Resume must be under 4 MB." : "",
              );
            }}
            className="field cursor-pointer file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-forest/12 file:px-4 file:py-1.5 file:text-[0.8rem] file:text-forest-ink"
          />
        </label>

        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-[0.8rem] font-medium text-stone-2">Why this role?</span>
          <textarea
            name="note"
            rows={4}
            placeholder="A short note about the work you want to do"
            className="field resize-y"
          />
        </label>
      </div>

      <button type="submit" disabled={pending || sent} className="btn btn-forest mt-7 w-full sm:w-auto">
        {sent ? "Application received" : pending ? "Sending…" : "Submit Application"}
      </button>

      <div aria-live="polite">
        {sent && (
          <p className="mt-4 text-[0.82rem] text-forest-ink">
            Thank you. Shortlisted candidates are contacted within two weeks.
          </p>
        )}
        {state.status === "error" && (
          <p className="mt-4 text-[0.82rem] text-red-700">
            {state.message}{" "}
            <a href={`mailto:${site.email}`} className="font-semibold underline">
              Email us
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
