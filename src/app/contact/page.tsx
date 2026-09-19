import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Munesh Associates Private Limited — Sector 81, Faridabad, Haryana. Call +91 99999 49286 or email muneshassociates@gmail.com to discuss your project.",
};

const faqs = [
  {
    q: "Do you take on projects outside Faridabad?",
    a: "Yes. We work across Delhi NCR — Delhi, Gurugram, Noida, Greater Noida, Ballabgarh and Palwal. Sites beyond NCR are considered case by case depending on scale.",
  },
  {
    q: "Is the first consultation chargeable?",
    a: "No. The initial meeting, site visit within NCR and preliminary cost discussion are free. Fees begin once we start design work.",
  },
  {
    q: "Can you work with drawings we already have?",
    a: "Certainly. We regularly execute construction on drawings prepared by another architect, and we can also review an existing set structurally before you build on it.",
  },
  {
    q: "How long does a typical residential project take?",
    a: "A standard independent house of 3,000–5,000 sq. ft. takes roughly 12–16 months from sanction to handover, depending on finishing specification and approvals.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Tell us about your project"
        lead="Call, message or send the form below. We respond to every enquiry within one working day, and the first consultation costs nothing."
        crumb="Contact"
      />

      {/* -------------------------------------------------- Form + details */}
      <section className="px-7 pb-16">
        <div className="mx-auto grid max-w-[1240px] items-start gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.1} className="glass rounded-3xl p-8">
              <h3 className="text-[1.15rem]">Office</h3>
              <address className="mt-4 text-[0.92rem] not-italic leading-relaxed text-stone-2">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.line3}
              </address>
              <p className="mt-5 text-[0.85rem] text-stone-3">{site.hours}</p>
            </Reveal>

            <Reveal delay={0.16} className="glass rounded-3xl p-8">
              <h3 className="text-[1.15rem]">Call us</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {site.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="text-[0.95rem] text-stone-1 transition-colors hover:text-forest-ink"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>

              <h3 className="mt-7 text-[1.15rem]">Email</h3>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 block text-[0.95rem] text-stone-1 transition-colors hover:text-forest-ink"
              >
                {site.email}
              </a>

              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-forest mt-7 w-full"
              >
                Message on WhatsApp
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Map */}
      <section className="px-7 py-10">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="glass overflow-hidden rounded-3xl p-2">
            <iframe
              title="Munesh Associates office location"
              src="https://www.google.com/maps?q=Sector%2081%20Faridabad%20Haryana%20121004&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full rounded-[1.4rem] border-0 grayscale-[0.4]"
            />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ FAQs */}
      <section className="px-7 py-20">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow eyebrow-center">Before you call</span>
            <h2 className="mx-auto mt-4 max-w-[22ch]">Questions we are asked most often</h2>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-2">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={(i % 2) * 0.09}>
                <details className="glass group rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-[1.02rem] font-semibold text-stone-0">
                    {faq.q}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="shrink-0 text-forest transition-transform duration-300 group-open:rotate-45"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </summary>
                  <p className="mt-3.5 text-[0.9rem]">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
