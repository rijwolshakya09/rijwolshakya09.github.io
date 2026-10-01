import type { CSSProperties } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GithubGlyph, LinkedinGlyph } from "@/components/ui/SocialButtons";
import { SITE_METADATA, SOCIAL_LINKS } from "@/lib/constants";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="aurora-section">
      <div aria-hidden="true" className="blob" style={{ width: 480, height: 480, "--c": "var(--indigo)", left: "30%", bottom: -200, opacity: 0.3 } as CSSProperties} />
      <SectionHeader
        id="contact-heading"
        eyebrow="Contact"
        title="Let's build"
        highlight="something great"
        lead="Hiring for a Flutter role or need an app built? My inbox is open."
        center
      />
      <div className="cgrid">
        <div>
          <Reveal>
            <a href={`mailto:${SITE_METADATA.email}`} className="glass info">
              <i aria-hidden="true">
                <Mail size={18} />
              </i>
              <div>
                <small>Email</small>
                {SITE_METADATA.email}
              </div>
            </a>
          </Reveal>
          <Reveal delay={80}>
            <a href={`tel:${SITE_METADATA.phone}`} className="glass info">
              <i aria-hidden="true">
                <Phone size={18} />
              </i>
              <div>
                <small>Phone</small>
                {SITE_METADATA.phone}
              </div>
            </a>
          </Reveal>
          <Reveal delay={160}>
            <div className="glass info">
              <i aria-hidden="true">
                <MapPin size={18} />
              </i>
              <div>
                <small>Location</small>
                Kathmandu, Nepal · remote worldwide
              </div>
            </div>
          </Reveal>
          <div className="info-row">
            <Reveal delay={240}>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="glass info soc-card gh">
                <i aria-hidden="true">
                  <GithubGlyph />
                </i>
                <div>
                  <small>GitHub</small>
                  @rijwolshakya09
                </div>
              </a>
            </Reveal>
            <Reveal delay={320}>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="glass info soc-card li">
                <i aria-hidden="true">
                  <LinkedinGlyph />
                </i>
                <div>
                  <small>LinkedIn</small>
                  Rijwol Shakya
                </div>
              </a>
            </Reveal>
          </div>
        </div>
        <Reveal delay={80}>
          <div className="glass form">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
