"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "@/components/motion/Reveal";

const faqs = [
  {
    q: "How do you handle variations and BOQ costing before starting work?",
    a: "Every project begins with a line-item Bill of Quantities (BOQ) detailing precise material rates, specs, and quantities. If client-requested modifications occur during construction, variations are issued in writing with prior approval before any material or labor is committed.",
  },
  {
    q: "How frequently do clients receive site progress reports?",
    a: "All clients receive weekly progress reports containing high-resolution site photographs, activity completion tracking against the master programme schedule, and planned activities for the upcoming week. For corporate accounts, we also offer live site camera access.",
  },
  {
    q: "Can Munesh Associates handle statutory approvals across Delhi, Haryana, and UP?",
    a: "Yes. Having practiced in Delhi NCR for over 20 years, our in-house liaison team handles sanction drawings, fire safety compliance, environmental clearances, and completion certificates across DDA, HUDA, Noida Authority, and Greater Noida Authority.",
  },
  {
    q: "What warranty or defect liability is provided post-handover?",
    a: "We provide an explicit 12-month Defect Liability Period (DLP) backed in writing. Our dedicated post-handover team conducts quarterly health checks on plumbing, waterproofing, electrical grids, and structural elements.",
  },
  {
    q: "Do you support phased handovers for revenue-generating commercial projects?",
    a: "Absolutely. For commercial towers, retail complexes, and hospitals, we phase structural execution so key revenue-generating floors, retail podiums, or diagnostic wings can receive occupancy certificates and open early while upper floors finish.",
  },
];

export default function ClientFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="px-7 py-20 relative">
      <div className="mx-auto max-w-[940px]">
        <Reveal className="mb-12 text-center">
          <span className="eyebrow eyebrow-center">Client Guidance</span>
          <h2 className="mx-auto mt-4 max-w-[22ch] text-[clamp(1.8rem,3vw,2.5rem)]">
            Frequently Asked Client Questions
          </h2>
          <p className="mx-auto mt-3 max-w-[50ch] text-[0.92rem] text-stone-2">
            Clear answers about our contracts, site reporting, BOQ guarantees, and post-handover support.
          </p>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <Reveal key={faq.q} delay={i * 0.08}>
                <div
                  className={`glass overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-forest/40 bg-white/90 shadow-md"
                      : "border-stone-0/10 hover:border-forest/25 bg-white/60"
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between p-6 text-left transition-colors"
                  >
                    <span className="text-[1.05rem] font-semibold text-stone-0 pr-4">
                      {faq.q}
                    </span>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                        isOpen
                          ? "bg-forest-deep text-white rotate-180"
                          : "bg-forest-pale text-forest-ink"
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="border-t border-stone-0/08 px-6 pb-6 pt-3 text-[0.92rem] leading-relaxed text-stone-2">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
