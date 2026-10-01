import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Kind = "github" | "linkedin" | "email";

const LINK = "flex h-12 w-12 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground";

export function SocialLinks({
  className,
  include = ["github", "linkedin", "email"],
}: {
  className?: string;
  include?: Kind[];
}) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {include.includes("github") && (
        <li>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={LINK}>
            <GithubIcon width={18} height={18} />
          </a>
        </li>
      )}
      {include.includes("linkedin") && (
        <li>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={LINK}>
            <LinkedinIcon width={18} height={18} />
          </a>
        </li>
      )}
      {include.includes("email") && (
        <li>
          <a href={SOCIAL_LINKS.email} aria-label="Email me" className={LINK}>
            <Mail size={18} aria-hidden />
          </a>
        </li>
      )}
    </ul>
  );
}
