import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { AboutSection } from "@/features/about/components/AboutSection";
import { ExperienceSection } from "@/features/experience/components/ExperienceSection";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { SkillsSection } from "@/features/skills/components/SkillsSection";
import { ContactSection } from "@/features/contact/components/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
