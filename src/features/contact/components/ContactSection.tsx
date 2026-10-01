import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buttonStyles } from "@/components/ui/Button";
import { LinkedinIcon } from "@/components/ui/SocialIcons";
import { ContactForm } from "./ContactForm";
import { CV_PATH, SITE_METADATA, SOCIAL_LINKS } from "@/lib/constants";

const ROW = "flex min-h-12 items-center gap-3 text-foreground hover:text-primary";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20 md:py-28">
      <Container>
        <SectionTitle
          id="contact-heading"
          title="Get in touch"
          intro="Hiring for a Flutter role, or need an app built? Pick the path that fits."
        />
        <div className="grid items-start gap-6 md:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl border border-line bg-surface p-6 md:p-8">
            <h3 className="font-display text-2xl font-extrabold">Hiring?</h3>
            <p className="mt-2 text-muted">
              I&apos;m open to remote Flutter and mobile roles, working from Kathmandu (UTC+5:45).
            </p>
            <ul className="mt-5">
              <li>
                <a href={`mailto:${SITE_METADATA.email}`} className={ROW}>
                  <Mail size={18} aria-hidden /> {SITE_METADATA.email}
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={ROW}>
                  <LinkedinIcon width={18} height={18} /> LinkedIn
                </a>
              </li>
              <li>
                <a href={`tel:${SITE_METADATA.phone}`} className={ROW}>
                  <Phone size={18} aria-hidden /> {SITE_METADATA.phone}
                </a>
              </li>
            </ul>
            <a href={CV_PATH} download className={buttonStyles({ variant: "outline", className: "mt-6" })}>
              Download CV
            </a>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6 md:p-8">
            <h3 className="font-display text-2xl font-extrabold">Need an app built?</h3>
            <p className="mb-6 mt-2 text-muted">Tell me what you have in mind and I&apos;ll reply within two days.</p>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
