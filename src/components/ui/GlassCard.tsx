import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function GlassCard({ className, hover = false, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl",
        hover && "transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
