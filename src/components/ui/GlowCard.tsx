"use client";

import type { ElementType, ReactNode } from "react";
import { usePointerVars } from "@/hooks/usePointerVars";
import { cn } from "@/lib/utils";

/** Glass tile whose border glows where the pointer is. */
export function GlowCard({ as: Tag = "div", className, children }: { as?: ElementType; className?: string; children: ReactNode }) {
  const ref = usePointerVars<HTMLDivElement>();
  return (
    <Tag ref={ref} className={cn("glass tile", className)}>
      {children}
    </Tag>
  );
}
