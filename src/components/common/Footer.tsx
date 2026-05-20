import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { SOCIAL_LINKS, SITE_METADATA } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="border-t border-border bg-surface py-10"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {SITE_METADATA.name}. Built with Next.js & Tailwind CSS.
          </p>
          <nav aria-label="Social links" className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted hover:border-primary hover:text-primary transition-all duration-200 hover:scale-[1.08] min-w-[48px] min-h-[48px]"
            >
              <GithubIcon width={16} height={16} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted hover:border-primary hover:text-primary transition-all duration-200 hover:scale-[1.08] min-w-[48px] min-h-[48px]"
            >
              <LinkedinIcon width={16} height={16} />
            </a>
            <a
              href={SOCIAL_LINKS.email}
              aria-label="Send email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted hover:border-primary hover:text-primary transition-all duration-200 hover:scale-[1.08] min-w-[48px] min-h-[48px]"
            >
              <Mail size={16} />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
