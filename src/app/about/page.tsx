import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Counter from "@/components/motion/Counter";
import ParallaxImage from "@/components/motion/ParallaxImage";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { milestones, site, stats, studioPhotos, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Munesh Associates Private Limited has practised architecture and turnkey construction across Delhi NCR since 2003 — 450+ projects in residential, commercial and industrial work.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our practice"
        title="Twenty years of building across Delhi NCR"
        lead="Munesh Associates Private Limited is an architecture, structural design and turnkey construction firm based in Faridabad, working across Delhi, Gurugram, Noida and Greater Noida."
        crumb="About Us"
      />

      {/* ------------------------------------------------------- The story */}
      <section className="px-7 py-16">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <ParallaxImage
              src="/images/site/about-img-2.jpg"
              alt="Residential interior completed by Munesh Associates"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="relative aspect-4/3 rounded-3xl border border-stone-0/10"
              distance={40}
            />
          </Reveal>

          <Reveal delay={0.12}>
            <span className="eyebrow">Who we are</span>
            <h2 className="mt-4 max-w-[20ch]">A design practice that also builds</h2>
            <p className="mt-4">
              Most firms in NCR either draw or build. We do both, and that is deliberate.
              When the team that produced the drawing is the team standing on site, the
              gap between what was designed and what gets constructed closes.
            </p>
            <p className="mt-4">
              The practice began in Faridabad in 2003 with independent houses on small
              plots. It now delivers group housing towers, multispeciality hospitals,
              school campuses, factories and township layouts — while keeping the same
              working habits that made the early residential work reliable.
            </p>
            <p className="mt-4">
              We are not the cheapest contractor on most tender lists. We are usually the
              one still answering the phone three years after handover.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- Numbers */}
      <section className="px-7 py-12">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="glass grid grid-cols-2 gap-6 rounded-3xl p-9 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-[2.4rem] font-semibold text-stone-0">
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

      {/* ------------------------------------------------ Mission & vision */}
      <section className="px-7 py-20">
        <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-2">
          <Reveal className="glass rounded-3xl p-9">
            <span className="eyebrow">Our mission</span>
            <h3 className="mt-4 text-[1.5rem]">{site.tagline}</h3>
            <p className="mt-3">
              To turn a client&apos;s brief into a building that works on the day it opens
              and thirty years later — through disciplined design, honest costing and
              supervision that does not relax once the contract is signed.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="glass rounded-3xl p-9">
            <span className="eyebrow">Our vision</span>
            <h3 className="mt-4 text-[1.5rem]">{site.promise}</h3>
            <p className="mt-3">
              To be the practice that developers, institutions and families in Delhi NCR
              return to for their next project — because the last one was delivered
              exactly as promised.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Values */}
      <section className="px-7 py-20">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow eyebrow-center">What we hold to</span>
            <h2 className="mx-auto mt-4 max-w-[22ch]">Four principles that decide how we work</h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.09}>
                <div className="glass glass-hover h-full rounded-3xl p-7">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-forest/35 bg-linear-to-br from-forest/22 to-forest/6 font-display text-[0.95rem] font-semibold text-forest-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.05rem]">{value.title}</h3>
                  <p className="mt-2 text-[0.88rem]">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Studio photos */}
      <section className="px-7 py-20">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow eyebrow-center">Inside the practice</span>
            <h2 className="mx-auto mt-4 max-w-[22ch]">Our studio in Faridabad</h2>
            <p className="mx-auto mt-4 max-w-[52ch]">
              Every drawing that leaves this office has been reviewed across this table.
            </p>
          </Reveal>

          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {studioPhotos.map((photo) => (
              <StaggerItem key={photo.src}>
                <figure className="group relative aspect-3/4 overflow-hidden rounded-2xl border border-stone-0/10">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    quality={90}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
                  />
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* -------------------------------------------------------- Timeline */}
      <section className="px-7 py-20">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-12">
            <span className="eyebrow">Milestones</span>
            <h2 className="mt-4 max-w-[20ch]">How the practice grew</h2>
          </Reveal>

          <div className="relative pl-10">
            <span className="absolute bottom-2 left-2.5 top-2 w-px bg-linear-to-b from-forest/45 to-transparent" />
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.08} className="relative pb-10 last:pb-0">
                <span className="absolute -left-10 top-1 size-4.5 rounded-full border-2 border-forest bg-base-0" />
                <span className="text-[0.85rem] font-semibold text-forest-ink">{m.year}</span>
                <h3 className="mt-1.5 text-[1.15rem]">{m.title}</h3>
                <p className="mt-1.5 max-w-[62ch] text-[0.92rem]">{m.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Work with a team that stays accountable"
        body="Whether it is a single villa or a 300-unit housing block, the same principals review the drawings and the same supervisors run the site."
      />
    </>
  );
}
