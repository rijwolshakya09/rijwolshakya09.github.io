import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { ExperienceSection } from "@/features/experience/components/ExperienceSection";
import { SkillsSection } from "@/features/skills/components/SkillsSection";
import { ContactSection } from "@/features/contact/components/ContactSection";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-3 focus:text-on-primary"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
