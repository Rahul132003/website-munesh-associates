"use client";

import { useState } from "react";
import { projectCategories } from "@/lib/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="glass rounded-3xl p-8 sm:p-10"
    >
      <h2 className="text-[1.6rem]">Request a consultation</h2>
      <p className="mt-2 text-[0.9rem]">
        Share a few details and we will respond within one working day.
      </p>

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
          <span className="text-[0.8rem] font-medium text-stone-2">Tell us about the project</span>
          <textarea
            required
            name="message"
            rows={5}
            placeholder="Plot size, built-up area, approximate budget and timeline"
            className="field resize-y"
          />
        </label>
      </div>

      <button type="submit" disabled={sent} className="btn btn-forest mt-7 w-full sm:w-auto">
        {sent ? "Thank you — we will be in touch" : "Send Enquiry"}
      </button>

      {sent && (
        <p className="mt-4 text-[0.82rem] text-forest-ink">
          Your enquiry has been recorded. For anything urgent, call us directly.
        </p>
      )}
    </form>
  );
}
