import type { Metadata } from "next";
import ClientHero from "@/components/ClientHero";
import ClientSpotlight from "@/components/ClientSpotlight";
import ClientRoster from "@/components/ClientRoster";
import ClientFaq from "@/components/ClientFaq";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/motion/Reveal";
import GlowCard from "@/components/motion/GlowCard";
import { clients, testimonials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clients & Partners",
  description:
    "Developers, hotels, schools and brands who build with Munesh Associates — including Omaxe, Adore Group, Vashisth, Whirlpool and Golden Tulip Hotels.",
};

const commitments = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "A costed BOQ before work starts",
    body: "You see every line item, specification, and rate before the first excavation truck arrives on site. Variations are raised in writing with prior approval, never absorbed silently.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
    title: "Weekly progress reporting with photos",
    body: "A dated report with high-resolution site photographs, completed milestone activities, and the coming week's plan — delivered reliably whether the news is good or challenging.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "A single point of contact lead",
    body: "One dedicated project manager who knows your file intimate details, from initial site survey to final snag list. You never have to re-explain your requirements.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "12-Month defect liability honored",
    body: "Our twelve-month defect liability period is a written commitment we actively service with routine site checkups, not a clause that quietly expires.",
  },
];

export default function ClientPage() {
  return (
    <>
      {/* --------------------------------------------------- Hero Section */}
      <ClientHero />

      {/* -------------------------------------------------- Landmark Case Studies */}
      <ClientSpotlight />

      {/* -------------------------------------------------- Interactive Client Roster */}
      <ClientRoster clients={clients} />

      {/* -------------------------------------------------- Verified Testimonials */}
      <section className="px-7 py-20 bg-stone-50/60 border-y border-stone-200/60">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-14 text-center">
            <span className="eyebrow eyebrow-center">Client Voice</span>
            <h2 className="mx-auto mt-4 max-w-[20ch] text-[clamp(1.9rem,3.2vw,2.6rem)]">
              What Our Clients Say
            </h2>
            <p className="mx-auto mt-3 max-w-[50ch] text-[0.92rem] text-stone-2">
              Unfiltered feedback from project directors, medical directors, and developers across NCR.
            </p>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <GlowCard className="h-full rounded-3xl p-8 border border-stone-200/80 bg-white flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex gap-1 text-amber-500">
                        {[...Array(5)].map((_, idx) => (
                          <svg key={idx} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                          </svg>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-forest-pale px-2.5 py-0.5 text-[0.68rem] font-semibold text-forest-ink">
                        ✓ Verified Client
                      </span>
                    </div>

                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="mb-4 text-forest/35">
                      <path d="M7 7h4v4c0 3-1.8 5.4-4.5 6l-.5-1.6C7.6 14.8 8.6 13.6 8.8 12H7zm8 0h4v4c0 3-1.8 5.4-4.5 6l-.5-1.6c1.6-.6 2.6-1.8 2.8-3.4H15z" />
                    </svg>
                    <blockquote className="text-[0.96rem] italic leading-relaxed text-stone-1">
                      “{t.quote}”
                    </blockquote>
                  </div>

                  <figcaption className="mt-8 flex items-center gap-3.5 border-t border-stone-200/80 pt-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-forest/35 bg-gradient-to-br from-forest/30 to-forest/5 font-display text-[1.1rem] font-bold text-forest-ink">
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <span className="block text-[0.94rem] font-semibold text-stone-0">{t.name}</span>
                      <span className="block text-[0.78rem] text-stone-3">{t.role}</span>
                    </div>
                  </figcaption>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Client Principles / Commitments */}
      <section className="px-7 py-20">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-14 text-center">
            <span className="eyebrow eyebrow-center">Our Principles</span>
            <h2 className="mx-auto mt-4 max-w-[24ch] text-[clamp(1.9rem,3.2vw,2.6rem)]">
              What Every Client Receives, on Every Contract
            </h2>
            <p className="mx-auto mt-3 max-w-[55ch] text-[0.92rem] text-stone-2">
              Four non-negotiable operational commitments that protect your investment, timeline, and quality expectations.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {commitments.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.1}>
                <GlowCard className="h-full rounded-3xl p-8 border border-stone-200/80 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="icon-badge size-12 shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-0">{c.title}</h3>
                      <p className="mt-2.5 text-[0.9rem] leading-relaxed text-stone-2">{c.body}</p>
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- FAQ Accordion */}
      <ClientFaq />

      {/* --------------------------------------------------- CTA Band */}
      <CtaBand
        title="Become our next long-term client"
        body="Most of our clients came to us for one project and stayed for several. We would welcome the opportunity to earn your trust on your next development."
      />
    </>
  );
}
