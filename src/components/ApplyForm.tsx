"use client";

import { useState } from "react";
import { jobs } from "@/lib/site";

export default function ApplyForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      id="apply"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="glass rounded-3xl p-8 sm:p-10"
    >
      <h2 className="text-[1.6rem]">Apply to join us</h2>
      <p className="mt-2 text-[0.9rem]">
        Send us your details and portfolio link. We review every application.
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
          <span className="text-[0.8rem] font-medium text-stone-2">Portfolio / CV link</span>
          <input type="url" name="portfolio" placeholder="https://" className="field" />
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

      <button type="submit" disabled={sent} className="btn btn-forest mt-7 w-full sm:w-auto">
        {sent ? "Application received" : "Submit Application"}
      </button>

      {sent && (
        <p className="mt-4 text-[0.82rem] text-forest-ink">
          Thank you. Shortlisted candidates are contacted within two weeks.
        </p>
      )}
    </form>
  );
}
