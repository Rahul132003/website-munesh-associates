import Link from "next/link";
import Reveal from "./motion/Reveal";
import WordReveal from "./motion/WordReveal";

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  crumb: string;
  /** Words rendered in the italic olive display style within the title. */
  accent?: string[];
};

export default function PageHero({ eyebrow, title, lead, crumb, accent = [] }: Props) {
  return (
    <section className="relative px-7 pb-16 pt-40 text-center">
      <div
        className="sketch-layer pointer-events-none absolute inset-x-0 top-0 h-[420px] [mask-image:linear-gradient(180deg,black,transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1240px]">
        <Reveal>
          <span className="eyebrow eyebrow-center">{eyebrow}</span>
        </Reveal>

        <h1 className="mx-auto mt-5 max-w-[19ch] text-[clamp(2.2rem,4.8vw,3.7rem)] font-medium">
          <WordReveal text={title} accent={accent} delay={0.15} />
        </h1>

        <Reveal delay={0.45}>
          <p className="mx-auto mt-6 max-w-[58ch] text-stone-2">{lead}</p>
          <nav className="mt-6 flex justify-center gap-2 text-[0.8rem] text-stone-3">
            <Link href="/" className="transition-colors hover:text-forest-ink">
              Home
            </Link>
            <span>/</span>
            <span className="text-forest-ink">{crumb}</span>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
