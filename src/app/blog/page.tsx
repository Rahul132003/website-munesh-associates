import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import { formatDate, posts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical notes on building in Delhi NCR — construction costs, vaastu and structural design, pre-engineered buildings, green norms and contractor selection.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes on building in Delhi NCR"
        lead="Costing, compliance, materials and site management — written for clients who would rather understand their project than be surprised by it."
        crumb="Blog"
      />

      {/* ------------------------------------------------------- Featured */}
      <section className="px-7 pb-8">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="glass glass-hover grid gap-8 rounded-3xl p-6 lg:grid-cols-2 lg:p-8"
            >
              <div className="relative aspect-16/10 overflow-hidden rounded-2xl">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  quality={90}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-3 flex flex-wrap gap-3.5 text-[0.78rem] text-stone-3">
                  <span className="rounded-full border border-forest/35 bg-forest/12 px-3 py-1 text-forest-ink">
                    {featured.category}
                  </span>
                  <span className="self-center">{formatDate(featured.date)}</span>
                  <span className="self-center">{featured.readTime}</span>
                </div>
                <h2 className="max-w-[24ch] text-[clamp(1.5rem,2.6vw,2rem)]">{featured.title}</h2>
                <p className="mt-4 max-w-[52ch]">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.88rem] font-semibold text-forest-ink">
                  Read article
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- Article grid */}
      <section className="px-7 py-14">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.09}>
                <Link href={`/blog/${post.slug}`} className="glass glass-hover block h-full rounded-3xl p-6">
                  <div className="relative mb-5 aspect-16/10 overflow-hidden rounded-2xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      quality={90}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mb-3 flex flex-wrap gap-3 text-[0.76rem] text-stone-3">
                    <span className="text-forest-ink">{post.category}</span>
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-[1.08rem]">{post.title}</h3>
                  <p className="mt-2 text-[0.88rem]">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a question we have not written about?"
        body="Ask us directly. If it is a question one client has, it is usually a question twenty others have too."
      />
    </>
  );
}
