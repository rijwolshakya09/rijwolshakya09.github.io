import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CaseStudy } from "./CaseStudy";
import { ProjectCard } from "./ProjectCard";
import { projectsByTier } from "../data/projects.data";

export function ProjectsSection() {
  const [caseStudy] = projectsByTier("case-study");
  return (
    <section id="work" aria-labelledby="work-heading" className="py-20 md:py-28">
      <Container>
        <SectionTitle
          id="work-heading"
          title="Selected work"
          intro="Production apps I've built, starting with the one I work on every day."
        />
        {caseStudy && <CaseStudy project={caseStudy} />}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {projectsByTier("featured").map((p) => (
            <ProjectCard key={p.id} project={p} size="featured" />
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectsByTier("compact").map((p) => (
            <ProjectCard key={p.id} project={p} size="compact" />
          ))}
        </div>
      </Container>
    </section>
  );
}
