import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import HeroFoliage from "@/components/HeroFoliage";
import ServiceIcon from "@/components/ServiceIcon";
import Counter from "@/components/motion/Counter";
import GlowCard from "@/components/motion/GlowCard";
import Marquee from "@/components/motion/Marquee";
import ParallaxImage from "@/components/motion/ParallaxImage";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  capabilityStrip,
  clients,
  formatDate,
  hero,
  posts,
  processSteps,
  services,
  site,
  stats,
  testimonials,
  values,
  workTiles,
} from "@/lib/site";

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* Staggered indents for the hand-lettered note, one per word */
const scriptIndent = ["", "pl-[1.3em]", "pl-[0.8em]", "pl-[1.7em]"];

function StatCard() {
  return (
    <div className="inline-flex items-center gap-4 rounded-xl border border-white/70 bg-white/75 px-5 py-3.5 shadow-[0_10px_30px_rgba(20,18,14,0.16)] backdrop-blur-md">
      <p className="font-display text-[2.2rem] font-normal leading-none tracking-tight text-stone-0">
        <Counter to={450} suffix="+" />
      </p>
      <span className="h-11 w-px bg-stone-0/15" />
      <p className="text-[0.74rem] leading-[1.45] text-stone-1">
        Projects delivered
        <br />
        across Delhi NCR
        <br />
        since 2003
      </p>
    </div>
  );
}

export default function HomePage() {
  const latest = posts.slice(0, 3);

  return (
    <>
      {/* ============================================================ Hero */}
      <section className="relative overflow-hidden pt-28 lg:pt-[5.2rem]">
        <div className="relative lg:h-[clamp(34rem,35vw,44rem)]">
          {/* Looping footage. The panel is 62% wide and 35vw tall — close to
              the 1.77 ratio of the source clip — so at common desktop widths
              the whole house shows uncropped, roofline included. Video only
              on lg+; mobile keeps the static photograph below for bandwidth. */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block">
            <div className="feather-left relative size-full">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={hero.image}
                aria-label={hero.imageAlt}
                className="absolute inset-0 size-full object-cover object-right"
              >
                <source src={hero.video} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Warm sunset light carried across the seam into the cream */}
          <div
            className="pointer-events-none absolute inset-y-0 left-[28%] hidden w-[24%] bg-[radial-gradient(closest-side,rgba(255,206,140,0.3),transparent)] lg:block"
            aria-hidden
          />

          <HeroFoliage />

          {/* Script note in the sky, top right */}
          <Reveal
            delay={1.1}
            className="pointer-events-none absolute right-[4.5%] top-10 z-10 hidden xl:block"
          >
            <p className="script -rotate-8 text-[1.95rem] leading-[1.2]">
              {hero.script.split(" ").map((word, i) => (
                <span key={word} className={`block ${scriptIndent[i] ?? ""}`}>
                  {word}
                </span>
              ))}
            </p>
            <span className="ml-[3.2rem] mt-3 block h-px w-10 -rotate-8 bg-forest-deep/60" />
          </Reveal>

          {/* Projects-delivered card, lower right of the photograph */}
          <Reveal delay={1} className="absolute bottom-6 right-[3%] z-10 hidden lg:block">
            <StatCard />
          </Reveal>

          <div className="relative z-10 mx-auto h-full max-w-[1400px] px-7">
            <div className="flex h-full items-center">
              <div className="lg:max-w-[40%]">
                <Reveal>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-stone-2">
                    {hero.categories.map((c, i) => (
                      <span key={c} className="flex items-center gap-3">
                        {c}
                        {i < hero.categories.length - 1 && (
                          <span className="text-stone-3/60">/</span>
                        )}
                      </span>
                    ))}
                  </p>
                  <span className="mt-6 block h-px w-10 bg-stone-1/60" />
                </Reveal>

                <h1 className="mt-7 text-[clamp(2.5rem,3.7vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
                  <span className="block">
                    <WordReveal text={hero.line1} delay={0.2} />
                  </span>
                  <span className="block">
                    <WordReveal
                      text={hero.line2}
                      delay={0.45}
                      accent={hero.line2.split(" ")}
                    />
                  </span>
                </h1>

                <Reveal delay={0.85}>
                  <p className="mt-6 max-w-[40ch] text-[1.02rem] leading-relaxed text-stone-2">
                    {hero.body}
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-7">
                    <Link href="/projects" className="btn btn-forest group">
                      Explore Our Projects
                      <Arrow className="transition-transform duration-400 group-hover:translate-x-1" />
                    </Link>

                    <Link
                      href="/about"
                      className="group flex items-center gap-3.5 text-[0.92rem] font-medium text-stone-1 transition-colors hover:text-forest-ink"
                    >
                      <span className="flex size-11 items-center justify-center rounded-full border border-stone-1/50 transition-colors duration-400 group-hover:border-forest-deep group-hover:bg-forest-deep group-hover:text-forest-pale">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5.5v13l11-6.5z" />
                        </svg>
                      </span>
                      Watch Our Story
                    </Link>
                  </div>
                </Reveal>

                {/* Mobile / tablet photograph */}
                <Reveal delay={0.3} className="mb-12 mt-12 lg:hidden">
                  <div className="relative aspect-[1670/942] overflow-hidden rounded-3xl">
                    <Image
                      src={hero.image}
                      alt={hero.imageAlt}
                      fill
                      quality={90}
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-5">
                    <StatCard />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================ Capability strip */}
      <section className="relative z-10 border-b border-stone-0/8 bg-[#f4f2eb]">
        <div className="mx-auto max-w-[1400px] px-7">
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {capabilityStrip.map((item, i) => (
              <StaggerItem key={item.title}>
                <Link
                  href="/services"
                  className={`group relative flex h-full items-center gap-4 py-7 lg:justify-center lg:px-3 ${
                    i > 0
                      ? "lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:h-14 lg:before:w-px lg:before:-translate-y-1/2 lg:before:bg-stone-0/12"
                      : ""
                  }`}
                >
                  <ServiceIcon
                    name={item.icon}
                    className="size-14 shrink-0 bg-white/85 shadow-[0_3px_12px_rgba(45,44,30,0.08)] ring-1 ring-stone-0/5 group-hover:bg-forest-deep group-hover:text-forest-pale"
                    size={24}
                  />
                  <span className="min-w-0">
                    <span className="block text-[0.95rem] font-medium leading-tight text-stone-0">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[0.76rem] leading-snug text-stone-3">
                      {item.tagline}
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================================== Featured projects */}
      <section className="relative overflow-hidden px-7 py-24">
        {/* Botanical line art, lower left */}
        <svg
          className="pointer-events-none absolute -left-10 bottom-4 hidden w-64 text-forest/25 lg:block"
          viewBox="0 0 200 260"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          aria-hidden
        >
          <path d="M96 258C96 190 80 120 44 66" />
          <path d="M92 214c-26 4-44-10-52-34 26-6 44 8 52 34Z" />
          <path d="M84 176c-24 2-40-12-46-34 24-4 40 10 46 34Z" />
          <path d="M74 138c-22 0-36-14-40-34 22-2 36 12 40 34Z" />
          <path d="M92 214c22-8 32-26 30-50-22 6-32 24-30 50Z" />
          <path d="M82 170c20-8 29-25 26-47-20 7-29 24-26 47Z" />
          <path d="M70 128c18-9 25-25 21-45-18 8-25 25-21 45Z" />
          <path d="M60 92c14-8 19-22 15-39-15 8-19 23-15 39Z" />
        </svg>

        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,30%)_1fr] lg:items-center lg:gap-16">
            <Reveal>
              <span className="eyebrow">Featured Projects</span>
              <h2 className="mt-5 text-[clamp(1.9rem,3.2vw,2.6rem)]">Our Work Speaks</h2>
              <p className="mt-4 max-w-[38ch] text-[0.97rem] text-stone-2">
                A portfolio of thoughtfully designed spaces that blend aesthetics,
                functionality and sustainability.
              </p>
              <Link
                href="/projects"
                className="group mt-8 inline-flex items-center gap-2.5 text-[0.9rem] font-semibold text-forest-ink"
              >
                View All Projects
                <Arrow className="transition-transform duration-400 group-hover:translate-x-1" />
              </Link>
            </Reveal>

            <Stagger className="grid gap-5 sm:grid-cols-3">
              {workTiles.map((tile) => (
                <StaggerItem key={tile.label}>
                  <Link
                    href={tile.href}
                    className="group relative block aspect-4/5 overflow-hidden rounded-2xl sm:aspect-4/3 lg:aspect-3/4"
                  >
                    <Image
                      src={tile.image}
                      alt={tile.alt}
                      fill
                      quality={90}
                      sizes="(max-width: 640px) 100vw, 30vw"
                      className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-scrim/85 via-scrim/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5">
                      <span className="font-display text-[1.05rem] font-semibold text-white">
                        {tile.label}
                      </span>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full text-white/90 transition-all duration-400 group-hover:bg-white/20 group-hover:text-white">
                        <Arrow className="transition-transform duration-400 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ========================================================== Stats */}
      <section className="px-7 pb-8">
        <div className="mx-auto max-w-[1400px]">
          <Stagger className="glass grid grid-cols-2 gap-8 rounded-3xl p-9 lg:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <p className="font-display text-[2.3rem] font-semibold text-stone-0">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1.5 text-[0.75rem] uppercase tracking-[0.14em] text-stone-2">
                  {stat.label}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ======================================================= Services */}
      <section className="px-7 py-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">What we do</span>
              <h2 className="mt-5 max-w-[20ch]">Three disciplines, one accountable team</h2>
            </div>
            <p className="max-w-[44ch] text-stone-2">
              Design, engineering and execution stay under one roof — so nobody can point
              at somebody else when a drawing and a site disagree.
            </p>
          </Reveal>

          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.slug} className="h-full">
                <GlowCard className="h-full rounded-3xl p-8">
                  <ServiceIcon name={service.icon} />
                  <h3>{service.title}</h3>
                  <p className="mt-2.5 text-[0.92rem]">{service.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.capabilities.slice(0, 3).map((cap) => (
                      <li key={cap} className="chip rounded-full px-3 py-1.5 text-[0.71rem]">
                        {cap}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services"
                    className="mt-7 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-forest-ink"
                  >
                    Explore service
                    <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ==================================================== Why us */}
      <section className="px-7 py-24">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <ParallaxImage
              src="/images/site/faqs-image.jpg"
              alt="Premium interior fit-out delivered by Munesh Associates"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="relative aspect-4/3 rounded-3xl shadow-[0_20px_56px_rgba(45,44,30,0.14)]"
              distance={40}
            />
            <div className="glass glass-strong absolute -bottom-7 left-6 right-6 rounded-2xl p-5">
              <p className="font-display text-[1.05rem] text-stone-0">{site.promise}</p>
              <p className="mt-1 text-[0.82rem] text-stone-2">
                The commitment we have kept since 2003.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-10 lg:mt-0">
            <span className="eyebrow">Why Munesh Associates</span>
            <h2 className="mt-5 max-w-[18ch]">Twenty years of buildings that still look new</h2>
            <p className="mt-5">
              We started in Faridabad in 2003 with independent houses. Four hundred and
              fifty projects later, the practice covers everything from affordable housing
              schemes to multispeciality hospitals — and the working method has not
              changed: honest costing, real engineering, and a site report every week.
            </p>

            <Stagger className="mt-9 grid gap-4 sm:grid-cols-2">
              {values.map((value) => (
                <StaggerItem key={value.title} className="h-full">
                  <GlowCard className="h-full rounded-2xl p-5" lift={-4}>
                    <h3 className="text-[1rem]">{value.title}</h3>
                    <p className="mt-1.5 text-[0.85rem]">{value.body}</p>
                  </GlowCard>
                </StaggerItem>
              ))}
            </Stagger>

            <Link href="/about" className="btn btn-glass mt-9">
              More about the practice
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ======================================================== Process */}
      <section className="relative px-7 py-24">
        <div
          className="sketch-layer pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,transparent,black,transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px]">
          <Reveal className="mb-14 text-center">
            <span className="eyebrow eyebrow-center">How we work</span>
            <h2 className="mx-auto mt-5 max-w-[22ch]">From first site visit to final handover</h2>
          </Reveal>

          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <StaggerItem key={step.step} className="h-full">
                <GlowCard className="h-full rounded-3xl p-7">
                  <span className="font-display text-[2.1rem] font-semibold text-forest/55">
                    {step.step}
                  </span>
                  <h3 className="mt-2 text-[1.05rem]">{step.title}</h3>
                  <p className="mt-2 text-[0.88rem]">{step.body}</p>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ======================================================== Clients */}
      <section id="clients" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-[1400px] px-7">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow eyebrow-center">Trusted by</span>
            <h2 className="mx-auto mt-5 max-w-[24ch] text-[1.9rem]">
              Developers, hotels, schools and brands who build with us
            </h2>
          </Reveal>
        </div>

        <Reveal>
          <Marquee items={clients} />
        </Reveal>
      </section>

      {/* =================================================== Testimonials */}
      <section className="px-7 py-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-14">
            <span className="eyebrow">Client voices</span>
            <h2 className="mt-5 max-w-[20ch]">What our clients say</h2>
          </Reveal>

          <Stagger className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name} className="h-full">
                <GlowCard className="h-full rounded-3xl p-8">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mb-5 text-forest/45"
                  >
                    <path d="M7 7h4v4c0 3-1.8 5.4-4.5 6l-.5-1.6C7.6 14.8 8.6 13.6 8.8 12H7zm8 0h4v4c0 3-1.8 5.4-4.5 6l-.5-1.6c1.6-.6 2.6-1.8 2.8-3.4H15z" />
                  </svg>
                  <blockquote className="text-[0.98rem] italic leading-relaxed text-stone-1">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3.5">
                    <span className="flex size-12 items-center justify-center rounded-full bg-forest-pale font-display text-[1.05rem] font-semibold text-forest-deep">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-[0.92rem] font-semibold text-stone-0">
                        {t.name}
                      </span>
                      <span className="block text-[0.78rem] text-stone-3">{t.role}</span>
                    </span>
                  </figcaption>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* =========================================================== Blog */}
      <section className="px-7 py-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">From the journal</span>
              <h2 className="mt-5 max-w-[20ch]">Notes on building in Delhi NCR</h2>
            </div>
            <Link href="/blog" className="btn btn-glass">
              Read the blog
            </Link>
          </Reveal>

          <Stagger className="grid gap-6 md:grid-cols-3">
            {latest.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <GlowCard className="h-full rounded-3xl p-6">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative mb-5 aspect-16/10 overflow-hidden rounded-2xl">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        quality={90}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    </div>
                    <div className="mb-3 flex gap-3.5 text-[0.75rem] text-stone-3">
                      <span className="font-semibold text-forest-ink">{post.category}</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <h3 className="text-[1.08rem]">{post.title}</h3>
                    <p className="mt-2 text-[0.88rem]">{post.excerpt}</p>
                  </Link>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
