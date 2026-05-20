"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
        {label}
      </span>
      <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-muted text-base md:text-lg leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
