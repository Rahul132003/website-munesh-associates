import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import { jobs, perks, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Open roles at Munesh Associates — architects, structural engineers, site supervisors, quantity surveyors and interns based in Faridabad, working across Delhi NCR.",
};

export default function CareerPage() {
  return (
    <>
      <PageHero
        eyebrow="Join the team"
        title="Build a career on real projects, not renderings"
        lead="We are a compact team, which means junior staff work on live drawing sets and visit sites in their first month — not their third year."
        crumb="Career"
      />

      {/* ---------------------------------------------------------- Perks */}
      <section className="px-7 py-14">
        <div className="mx-auto grid max-w-[1240px] items-start gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <span className="eyebrow">Why work here</span>
            <h2 className="mt-4 max-w-[18ch]">Small team, serious projects</h2>
            <p className="mt-4">
              Our studio in Faridabad runs lean. Architects here see a project from concept
              sketch through to snagging, which is uncommon in larger practices where roles
              get siloed. If you want to understand how a building actually goes together,
              this is a good place to learn it.
            </p>
            <p className="mt-4">
              We hire for judgement over software skills. Drafting can be taught; knowing
              when a detail will not survive a monsoon cannot.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="glass rounded-3xl p-8">
            <h3 className="text-[1.15rem]">What we offer</h3>
            <ul className="mt-5 grid gap-3.5">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5 text-[0.9rem] text-stone-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 shrink-0 text-forest"
                  >
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                  {perk}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- Open roles */}
      <section className="px-7 py-16">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-12">
            <span className="eyebrow">Open positions</span>
            <h2 className="mt-4 max-w-[20ch]">Current vacancies</h2>
          </Reveal>

          <div className="grid gap-5">
            {jobs.map((job, i) => (
              <Reveal key={job.title} delay={(i % 3) * 0.08}>
                <article className="glass glass-hover flex flex-wrap items-center justify-between gap-6 rounded-3xl p-7">
                  <div className="max-w-[60ch]">
                    <div className="mb-2.5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-forest/35 bg-forest/12 px-3 py-1 text-[0.72rem] text-forest-ink">
                        {job.type}
                      </span>
                      <span className="rounded-full border border-stone-0/10 bg-stone-0/5 px-3 py-1 text-[0.72rem] text-stone-2">
                        {job.location}
                      </span>
                      <span className="rounded-full border border-stone-0/10 bg-stone-0/5 px-3 py-1 text-[0.72rem] text-stone-2">
                        {job.experience}
                      </span>
                    </div>
                    <h3 className="text-[1.15rem]">{job.title}</h3>
                    <p className="mt-1.5 text-[0.9rem]">{job.summary}</p>
                  </div>
                  <a href="#apply" className="btn btn-glass shrink-0">
                    Apply now
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 text-center text-[0.88rem] text-stone-3">
            <p>
              Nothing matching your profile? Send an open application to{" "}
              <a href={`mailto:${site.email}`} className="text-forest-ink">
                {site.email}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ Apply form */}
      <section className="px-7 pb-24 pt-8">
        <div className="mx-auto max-w-[860px]">
          <Reveal>
            <ApplyForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
