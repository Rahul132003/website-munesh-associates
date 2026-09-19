import type { Metadata } from "next";
import Image from "next/image";
import Counter from "@/components/motion/Counter";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import { clients, testimonials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Developers, hotels, schools and brands who build with Munesh Associates — including Omaxe, Adore Group, Vashisth, Whirlpool and Golden Tulip Hotels.",
};

const commitments = [
  {
    title: "A costed BOQ before work starts",
    body: "You see every line item and rate before the first truck arrives on site. Variations are raised in writing, never absorbed silently into the bill.",
  },
  {
    title: "Weekly progress reporting",
    body: "A dated report with site photographs, completed activities and the coming week's plan — sent whether the news is good or not.",
  },
  {
    title: "A single point of contact",
    body: "One project lead who knows your file, from the first meeting to the last snag. You never have to re-explain your project.",
  },
  {
    title: "Defect liability honoured",
    body: "The twelve-month defect liability period is a commitment we actually service, not a clause that quietly expires.",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        eyebrow="Our clients"
        title="Relationships measured in decades, not contracts"
        lead="A significant share of our work each year comes from developers and families we have already built for. That repeat rate is the number we watch most closely."
        crumb="Client"
      />

      {/* --------------------------------------------------- Client logos */}
      <section className="px-7 py-14">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-10 text-center">
            <span className="eyebrow eyebrow-center">Trusted by</span>
            <h2 className="mx-auto mt-4 max-w-[24ch] text-[1.9rem]">
              Developers, hotels, schools and brands across North India
            </h2>
          </Reveal>

          {/* Flex-wrap rather than grid so the 13th tile centres on its row */}
          <div className="flex flex-wrap justify-center gap-4">
            {clients.map((client, i) => (
              <Reveal
                key={client.name}
                delay={(i % 5) * 0.07}
                className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.67rem)] lg:w-[calc(20%-0.8rem)]"
              >
                <figure className="glass glass-hover group flex h-full flex-col items-center justify-center gap-3 rounded-2xl px-5 pb-4 pt-6">
                  <div className="relative h-20 w-full">
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      fill
                      sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="text-center text-[0.72rem] leading-snug text-stone-3">
                    {client.name}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Repeat metrics */}
      <section className="px-7 py-12">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="glass grid grid-cols-2 gap-6 rounded-3xl p-9 lg:grid-cols-4">
            {[
              { value: 68, suffix: "%", label: "Repeat clients" },
              { value: 450, suffix: "+", label: "Projects delivered" },
              { value: 11, suffix: " yrs", label: "Longest relationship" },
              { value: 98, suffix: "%", label: "On-time handover" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-[2.3rem] font-semibold text-stone-0">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1.5 text-[0.8rem] uppercase tracking-[0.05em] text-stone-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- Testimonials */}
      <section className="px-7 py-20">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-12">
            <span className="eyebrow">In their words</span>
            <h2 className="mt-4 max-w-[20ch]">What our clients say</h2>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <figure className="glass h-full rounded-3xl p-8">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="mb-5 text-forest/40">
                    <path d="M7 7h4v4c0 3-1.8 5.4-4.5 6l-.5-1.6C7.6 14.8 8.6 13.6 8.8 12H7zm8 0h4v4c0 3-1.8 5.4-4.5 6l-.5-1.6c1.6-.6 2.6-1.8 2.8-3.4H15z" />
                  </svg>
                  <blockquote className="text-[0.98rem] italic text-stone-1">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3.5">
                    <span className="flex size-12 items-center justify-center rounded-full border border-forest/35 bg-linear-to-br from-forest/30 to-forest/5 font-display text-[1.05rem] font-semibold text-forest-ink">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-[0.92rem] font-semibold text-stone-0">{t.name}</span>
                      <span className="block text-[0.78rem] text-stone-3">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Commitments */}
      <section className="px-7 py-20">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow eyebrow-center">Our commitment</span>
            <h2 className="mx-auto mt-4 max-w-[24ch]">What every client gets, on every contract</h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {commitments.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.1}>
                <div className="glass glass-hover h-full rounded-3xl p-8">
                  <h3 className="text-[1.08rem]">{c.title}</h3>
                  <p className="mt-2.5 text-[0.9rem]">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Become our next long-term client"
        body="Most of our clients came to us for one project and stayed for several. We would like the chance to earn that with you."
      />
    </>
  );
}
