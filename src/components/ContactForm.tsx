"use client";

import { useActionState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { appendAttribution } from "@/lib/attribution";
import { type LeadState, submitLead } from "@/lib/leads";
import { projectCategories, site, whatsappLink } from "@/lib/site";

const initial: LeadState = { status: "idle" };

export default function ContactForm() {
  const [state, dispatch, pending] = useActionState(submitLead, initial);
  const sent = state.status === "success";

  useEffect(() => {
    if (state.status === "success") trackEvent("generate_lead", { form: "contact" });
  }, [state]);

  return (
    <form
      action={(formData) => {
        appendAttribution(formData);
        dispatch(formData);
      }}
      className="glass rounded-3xl p-8 sm:p-10"
    >
      <h2 className="text-[1.6rem]">Request a free consultation</h2>
      <p className="mt-2 text-[0.9rem]">
        Leave your name and number — we call back within one working day.
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
          <input required type="text" name="name" autoComplete="name" placeholder="Your name" className="field" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.8rem] font-medium text-stone-2">Phone</span>
          <input
            required
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 00000 00000"
            className="field"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.8rem] font-medium text-stone-2">
            Email <span className="font-normal text-stone-3">(optional)</span>
          </span>
          <input type="email" name="email" autoComplete="email" placeholder="you@example.com" className="field" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.8rem] font-medium text-stone-2">Project type</span>
          <select name="type" defaultValue="" className="field">
            <option value="" disabled>
              Select a category
            </option>
            {projectCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-[0.8rem] font-medium text-stone-2">Site location</span>
          <input type="text" name="location" placeholder="Sector, city" className="field" />
        </label>

        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-[0.8rem] font-medium text-stone-2">
            Tell us about the project <span className="font-normal text-stone-3">(optional)</span>
          </span>
          <textarea
            name="message"
            rows={5}
            placeholder="Plot size, built-up area, approximate budget and timeline"
            className="field resize-y"
          />
        </label>
      </div>

      <button type="submit" disabled={pending || sent} className="btn btn-forest mt-7 w-full sm:w-auto">
        {sent ? "Thank you — we will be in touch" : pending ? "Sending…" : "Request Free Consultation"}
      </button>

      <div aria-live="polite">
        {sent && (
          <p className="mt-4 text-[0.82rem] text-forest-ink">
            Your enquiry has reached our team. For anything urgent, call{" "}
            <a href={`tel:${site.phones[0].replace(/\s/g, "")}`} className="font-semibold underline">
              {site.phones[0]}
            </a>
            .
          </p>
        )}
        {state.status === "error" && (
          <p className="mt-4 text-[0.82rem] text-red-700">
            {state.message}{" "}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              Open WhatsApp
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
