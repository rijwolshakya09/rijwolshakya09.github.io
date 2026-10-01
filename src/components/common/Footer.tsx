import { SocialButtons } from "@/components/ui/SocialButtons";
import { SITE_METADATA } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="ft">
      <span>
        © {new Date().getFullYear()} {SITE_METADATA.name}
      </span>
      <SocialButtons size="sm" />
      <span>Designed &amp; built with Next.js</span>
    </footer>
  );
}
