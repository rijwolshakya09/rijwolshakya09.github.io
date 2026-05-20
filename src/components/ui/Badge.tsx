import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "accent" | "muted";
}

const TAG_COLORS: Record<string, string> = {
  Flutter: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "React Native": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  React: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  "Node.js": "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  JavaScript: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  TypeScript: "bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-600/20",
  Firebase: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  Supabase: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const tagColor =
    typeof children === "string" ? TAG_COLORS[children] : undefined;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        tagColor ??
          {
            default: "border-border bg-surface-muted text-muted",
            primary: "border-primary/20 bg-primary/10 text-primary",
            accent: "border-accent/20 bg-accent/10 text-accent",
            muted: "border-border bg-surface-muted text-muted",
          }[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
