import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/motion/Reveal";
import { formatDate, posts } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="px-7 pb-16 pt-40">
        <div className="mx-auto max-w-[820px]">
          <Reveal>
            <nav className="mb-6 flex gap-2 text-[0.82rem] text-stone-3">
              <Link href="/" className="transition-colors hover:text-forest-ink">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="transition-colors hover:text-forest-ink">
                Blog
              </Link>
            </nav>

            <div className="mb-5 flex flex-wrap gap-3 text-[0.78rem] text-stone-3">
              <span className="rounded-full border border-forest/35 bg-forest/12 px-3 py-1 text-forest-ink">
                {post.category}
              </span>
              <span className="self-center">{formatDate(post.date)}</span>
              <span className="self-center">{post.readTime}</span>
              <span className="self-center">By {post.author}</span>
            </div>

            <h1 className="text-[clamp(1.9rem,4vw,3rem)] font-medium">{post.title}</h1>
            <p className="mt-5 text-[1.05rem] text-stone-2">{post.excerpt}</p>
          </Reveal>

          <Reveal delay={0.1} className="relative mt-10 aspect-16/9 overflow-hidden rounded-3xl border border-stone-0/10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              quality={90}
              priority
              sizes="(max-width: 860px) 100vw, 820px"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={0.14} className="glass mt-10 rounded-3xl p-8 sm:p-10">
            <div className="flex flex-col gap-5">
              {post.body.map((para, i) => (
                <p key={i} className="text-[1rem] leading-[1.75] text-stone-1">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-10 border-t border-stone-0/10 pt-7">
              <p className="text-[0.9rem] text-stone-2">
                Planning a project and want this applied to your own site? Our team gives an
                honest assessment before you commit to anything.
              </p>
              <Link href="/contact" className="btn btn-forest mt-5">
                Talk to our team
              </Link>
            </div>
          </Reveal>
        </div>
      </article>

      {/* --------------------------------------------------------- Related */}
      <section className="px-7 py-16">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-10">
            <span className="eyebrow">Keep reading</span>
            <h2 className="mt-4 text-[1.7rem]">More from the journal</h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.09}>
                <Link href={`/blog/${p.slug}`} className="glass glass-hover block h-full rounded-3xl p-6">
                  <div className="relative mb-5 aspect-16/10 overflow-hidden rounded-2xl">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      quality={90}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mb-3 flex gap-3 text-[0.76rem] text-stone-3">
                    <span className="text-forest-ink">{p.category}</span>
                    <span>{formatDate(p.date)}</span>
                  </div>
                  <h3 className="text-[1.05rem]">{p.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
