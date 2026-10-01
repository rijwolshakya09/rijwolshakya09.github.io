import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Chip } from "@/components/ui/Chip";
import { SKILLS_DATA } from "../data/skills.data";

export function SkillsSection() {
  return (
    <section id="toolkit" aria-labelledby="toolkit-heading" className="py-20 md:py-28">
      <Container>
        <SectionTitle id="toolkit-heading" title="Toolkit" />
        <dl className="divide-y divide-line border-y border-line">
          {SKILLS_DATA.map((g) => (
            <div key={g.category} className="grid gap-3 py-6 md:grid-cols-[14rem_1fr] md:gap-10">
              <dt className="font-semibold">{g.category}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li key={s}>
                      <Chip>{s}</Chip>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
