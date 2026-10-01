import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ as: Tag = "div", className, children }: { as?: ElementType; className?: string; children: ReactNode }) {
  return <Tag className={cn("glass", className)}>{children}</Tag>;
}
