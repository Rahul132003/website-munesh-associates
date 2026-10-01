import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Counter from "@/components/motion/Counter";
import ParallaxImage from "@/components/motion/ParallaxImage";
import Reveal from "@/components/motion/Reveal";
import { type CarouselCard, ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import Timeline from "@/components/ui/timeline";
import { milestones, site, stats, studioPhotos, team, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Munesh Associates Private Limited has practised architecture and turnkey construction across Delhi NCR since 2003 — 450+ projects in residential, commercial and industrial work.",
};

const studioCaptions = [
  "Where every project is planned",
  "Design reviews around the table",
  "The studio interior",
  "The whole team, together",
];

// Team portraits alternate with studio photos around the carousel ring.
const teamCarouselCards: CarouselCard[] = team.flatMap((member, i) => [
  { src: member.src, alt: `${member.name}, ${member.role}`, name: member.name, role: member.role },
  { ...studioPhotos[i], name: "Our Faridabad studio", role: studioCaptions[i] },
]);

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

      {/* --------------------------------------------------------- Our team */}
      <section className="overflow-x-clip px-7">
        <ThreeDPhotoCarousel cards={teamCarouselCards} variant="arc">
          <div className="mx-auto max-w-[1240px] text-center">
            <span className="eyebrow eyebrow-center">Our team</span>
            <h2 className="mx-auto mt-3 max-w-[22ch]">The people behind every drawing</h2>
            <p className="mx-auto mt-3 max-w-[52ch] text-[0.95rem] max-sm:hidden">
              The principals who design and build your project, and the Faridabad studio
              where every drawing is reviewed before it leaves the office.
            </p>
          </div>
        </ThreeDPhotoCarousel>
      </section>

      {/* -------------------------------------------------------- Timeline */}
      <Timeline
        items={milestones}
        eyebrow="Milestones"
        title="How the practice grew"
        periodLabel={`${milestones[0].year} — Today`}
        imageSrc="/images/site/founder-portrait.png"
        imageAlt="Ar. Rahul Singh, Founder Principal Architect & Planner"
        duration={1.4}
      />

      <CtaBand
        title="Work with a team that stays accountable"
        body="Whether it is a single villa or a 300-unit housing block, the same principals review the drawings and the same supervisors run the site."
      />
    </>
  );
}
