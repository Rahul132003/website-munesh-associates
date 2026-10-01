import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { posts } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.9 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/client"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/blog"), lastModified: posts[0]?.date, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/career"), changeFrequency: "monthly", priority: 0.4 },
  ];

  return [
    ...pages,
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
