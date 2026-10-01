import { Container } from "@/components/ui/Container";
import { SocialLinks } from "./SocialLinks";
import { SITE_METADATA } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {SITE_METADATA.name}. Built with Next.js, hosted on GitHub Pages.
        </p>
        <SocialLinks />
      </Container>
    </footer>
  );
}
