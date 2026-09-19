import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import { processSteps, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential, commercial and industrial construction services across Delhi NCR — architectural design, structural engineering, statutory approvals and turnkey execution.",
};

const additional = [
  {
    title: "Architectural Design",
    body: "Concept development, 3D visualisation and complete good-for-construction drawing sets.",
  },
  {
    title: "Structural Engineering",
    body: "RCC and steel design, soil investigation coordination and structural audits of existing buildings.",
  },
  {
    title: "Statutory Approvals",
    body: "Sanction drawings and liaison with MCF, HSVP, DTCP, GMDA and Noida authority as applicable.",
  },
  {
    title: "Interior Design & Fit-out",
    body: "Residential and corporate interiors, joinery detailing, material selection and vendor management.",
  },
  {
    title: "Project Management",
    body: "Programme control, costing, quality audits and weekly progress reporting on client-run contracts.",
  },
  {
    title: "Town Planning",
    body: "Township layouts, plotting schemes, services planning and open-space design for large land parcels.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Design, engineering and construction under one roof"
        lead="From a single villa to a 112-acre township layout — we take responsibility for the drawing, the structure and the building that comes out of both."
        crumb="Services"
      />

      {/* -------------------------------------------------- Core services */}
      {services.map((service, i) => (
        <section key={service.slug} className="px-7 py-14">
          <div
            className={`mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-2 ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal className="relative aspect-4/3 overflow-hidden rounded-3xl border border-stone-0/10">
              <Image
                src={service.image}
                alt={service.title}
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>

            <Reveal delay={0.12}>
              <ServiceIcon name={service.icon} />
              <h2 className="max-w-[18ch] text-[clamp(1.7rem,2.8vw,2.3rem)]">{service.title}</h2>
              <p className="mt-4">{service.detail}</p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {service.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2.5 text-[0.9rem] text-stone-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-1 shrink-0 text-forest"
                    >
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                    {cap}
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="btn btn-glass mt-8">
                Discuss a {service.title.split(" ")[0].toLowerCase()} project
              </Link>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ---------------------------------------------- Supporting services */}
      <section className="px-7 py-20">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow eyebrow-center">Also available</span>
            <h2 className="mx-auto mt-4 max-w-[24ch]">
              Specialist services you can appoint independently
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch]">
              Not every client needs a turnkey contract. These services can be engaged on
              their own, alongside your existing contractor or project team.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {additional.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.09}>
                <div className="glass glass-hover h-full rounded-3xl p-7">
                  <h3 className="text-[1.05rem]">{item.title}</h3>
                  <p className="mt-2 text-[0.88rem]">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Process */}
      <section className="px-7 py-20">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow eyebrow-center">Our process</span>
            <h2 className="mx-auto mt-4 max-w-[22ch]">Four stages, no surprises in between</h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.09}>
                <div className="glass glass-hover h-full rounded-3xl p-7">
                  <span className="font-display text-[2rem] font-semibold text-forest/45">
                    {step.step}
                  </span>
                  <h3 className="mt-2 text-[1.05rem]">{step.title}</h3>
                  <p className="mt-2 text-[0.88rem]">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which service you need?"
        body="Send us the plot details and what you have in mind. We will tell you honestly whether you need a full turnkey contract or just a drawing set."
      />
    </>
  );
}
