import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";

export default function ClientHero() {
  return (
    <section className="relative px-7 pt-32 pb-12 overflow-hidden">
      {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90"
      alt="Modern architectural project by Munesh Associates"
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
    />
  </div>

  {/* Premium image overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#f5f2e9]/[0.97] via-[#f5f2e9]/[0.82] to-[#f5f2e9]/[0.18]" />

  {/* Bottom fade */}
  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f5f2e9] to-transparent" />
      <div className="mx-auto max-w-[1240px]">
        {/* Main Grid: Left content, Right architectural image */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Text Content */}
          <div className="relative lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3 text-[0.72rem] font-bold tracking-[0.2em] uppercase text-forest-ink">
                <span>OUR CLIENTS & PARTNERS</span>
                <span className="h-[1px] w-12 bg-stone-300 inline-block" />
              </div>
            </Reveal>

            {/* Title with floating script annotation */}
            <div className="relative mt-4">
              <Reveal delay={0.1}>
                <h1 className="font-display text-[clamp(2.4rem,4.6vw,3.9rem)] font-semibold leading-[1.1] text-stone-0 tracking-tight">
                  Relationships measured <br className="hidden sm:block" />
                  in decades, not contracts
                </h1>
              </Reveal>

            
            </div>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-[52ch] text-[1.02rem] leading-relaxed text-stone-2">
                Over 68% of our annual project portfolio originates from developers, institutions, and families who have previously built with us. That repeat rate is the benchmark we value above all.
              </p>
            </Reveal>
          </div>

        </div>

        {/* Floating Stats Bar overlapping section */}
        <Reveal delay={0.3} className="mt-10 lg:mt-14">
          <div className="glass-strong relative z-20 rounded-2xl lg:rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-stone-900/5 border border-white/80">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-stone-200/80">
              {/* Stat 1 */}
              <div className="flex items-center gap-4 px-2 lg:px-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-forest-pale text-forest-ink">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m11 17 2 2a1 1 0 0 0 1.4 0l7-7" />
                    <path d="m18 10 1.5-1.5a1 1 0 0 0 0-1.4l-3.1-3.1a1 1 0 0 0-1.4 0L13.5 5.5" />
                    <path d="m20.5 4.5-16 16a2 2 0 0 1-2.8 0v0a2 2 0 0 1 0-2.8l16-16" />
                  </svg>
                </div>
                <div>
                  <div className="font-display text-2xl lg:text-3xl font-bold text-stone-0">
                    <Counter to={68} suffix="%" />
                  </div>
                  <div className="mt-0.5 text-[0.68rem] font-bold tracking-wider text-stone-3 uppercase">
                    Repeat Client Rate
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-4 px-2 lg:px-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-forest-pale text-forest-ink">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                    <line x1="9" y1="6" x2="9" y2="6.01" />
                    <line x1="15" y1="6" x2="15" y2="6.01" />
                    <line x1="9" y1="10" x2="9" y2="10.01" />
                    <line x1="15" y1="10" x2="15" y2="10.01" />
                    <line x1="9" y1="14" x2="9" y2="14.01" />
                    <line x1="15" y1="14" x2="15" y2="14.01" />
                    <path d="M10 22v-4h4v4" />
                  </svg>
                </div>
                <div>
                  <div className="font-display text-2xl lg:text-3xl font-bold text-stone-0">
                    <Counter to={450} suffix="+" />
                  </div>
                  <div className="mt-0.5 text-[0.68rem] font-bold tracking-wider text-stone-3 uppercase">
                    Projects Delivered
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-4 px-2 lg:px-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-forest-pale text-forest-ink">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <div className="font-display text-2xl lg:text-3xl font-bold text-stone-0">
                    <Counter to={11} suffix=" yrs" />
                  </div>
                  <div className="mt-0.5 text-[0.68rem] font-bold tracking-wider text-stone-3 uppercase">
                    Longest Relationship
                  </div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-center gap-4 px-2 lg:px-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-forest-pale text-forest-ink">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div className="font-display text-2xl lg:text-3xl font-bold text-stone-0">
                    <Counter to={98} suffix="%" />
                  </div>
                  <div className="mt-0.5 text-[0.68rem] font-bold tracking-wider text-stone-3 uppercase">
                    On-Time Handover
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
