import Link from "next/link";
import { site } from "@/lib/site";
import Reveal from "./motion/Reveal";

export default function CtaBand({
  title = "Let's build something that lasts",
  body = "Tell us about your plot, your programme and your budget. We will come back with a buildable approach and an honest cost range — no obligation.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="px-7 py-24">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="glass rounded-3xl px-8 py-14 text-center sm:px-14">
          <h2>{title}</h2>
          <p className="mx-auto mt-4 max-w-[54ch]">{body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link href="/contact" className="btn btn-forest">
              Start a Conversation
            </Link>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass"
            >
              WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
