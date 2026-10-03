import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import ProjectGallery from "@/components/ProjectGallery";
import Reveal from "@/components/motion/Reveal";
import { projectCategories, projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Munesh Associates across commercial, hospital, education, group housing, hotels, villas, interiors, town planning and affordable housing.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects across nine building types"
        lead="Commercial towers, hospitals, school campuses, housing, hotels, villas, interiors, township layouts and affordable housing — delivered across Delhi NCR."
        crumb="Projects"
      />

      <section className="px-7 pb-10">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="glass mb-14 grid grid-cols-2 gap-5 rounded-3xl p-8 sm:grid-cols-3">
            {projectCategories.map((cat) => (
              <div key={cat} className="text-[0.88rem] text-stone-2">
                <span className="mr-2 text-forest">/</span>
                {cat}
              </div>
            ))}
          </Reveal>

          <ProjectGallery projects={projects} />
        </div>
      </section>

      <CtaBand
        title="Your project could be next"
        body="Tell us the plot size, the building type and roughly when you want to start. We will come back with a realistic programme and cost range."
      />
    </>
  );
}
