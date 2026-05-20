"use client";

import { motion } from "framer-motion";
import { Mail, Download, ArrowDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SOCIAL_LINKS, SITE_METADATA } from "@/lib/constants";

const KEYWORDS = ["Flutter", "React Native", "Clean Architecture", "GetX", "Riverpod"];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 18, delay },
  },
});

const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 20, delay: 0.15 },
  },
};

export function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6 lg:px-8"
      aria-label="Hero section"
    >
      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[130px] dark:bg-primary/10" />
        <div className="absolute bottom-1/4 right-0 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[110px] dark:bg-accent/10" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Text column ── */}
          <div className="order-2 lg:order-1">
            {/* Status badge */}
            <motion.div
              variants={reduced ? {} : fadeUp(0)}
              initial="hidden"
              animate="visible"
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={reduced ? {} : fadeUp(0.08)}
              initial="hidden"
              animate="visible"
              className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl"
            >
              <span className="text-foreground">Rijwol </span>
              <span className="gradient-text">Shakya</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              variants={reduced ? {} : fadeUp(0.16)}
              initial="hidden"
              animate="visible"
              className="mt-3 text-xl font-semibold text-muted sm:text-2xl"
            >
              Flutter & Mobile Developer
            </motion.p>

            {/* Description */}
            <motion.p
              variants={reduced ? {} : fadeUp(0.24)}
              initial="hidden"
              animate="visible"
              className="mt-5 max-w-lg text-base text-muted leading-relaxed"
            >
              {"Building production-grade cross-platform mobile apps with "}
              <strong className="text-foreground">2+ years</strong>
              {" of professional experience. Specialized in Flutter, Clean Architecture, and pixel-perfect Figma-to-production delivery."}
            </motion.p>

            {/* Tech badges */}
            <motion.div
              variants={reduced ? {} : fadeUp(0.3)}
              initial="hidden"
              animate="visible"
              className="mt-5 flex flex-wrap gap-2"
              role="list"
              aria-label="Core technologies"
            >
              {KEYWORDS.map((kw) => (
                <Badge key={kw} variant="primary" role="listitem">
                  {kw}
                </Badge>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={reduced ? {} : fadeUp(0.38)}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button
                size="lg"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                aria-label="Navigate to contact section"
              >
                <Mail size={18} />
                Get in Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Projects
              </Button>
              <a
                href="/Rijwol_Shakya_CV.pdf"
                download
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-transparent px-6 text-base font-medium text-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:scale-[1.02]"
                aria-label="Download CV"
              >
                <Download size={16} />
                CV
              </a>
            </motion.div>

            {/* Social + Location */}
            <motion.div
              variants={reduced ? {} : fadeUp(0.44)}
              initial="hidden"
              animate="visible"
              className="mt-7 flex items-center gap-3"
            >
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted hover:border-primary hover:text-primary transition-all hover:scale-[1.08] min-w-[48px] min-h-[48px]"
                aria-label="GitHub profile"
              >
                <GithubIcon width={18} height={18} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted hover:border-primary hover:text-primary transition-all hover:scale-[1.08] min-w-[48px] min-h-[48px]"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon width={18} height={18} />
              </a>
              <span className="text-sm text-muted">{SITE_METADATA.location}</span>
            </motion.div>
          </div>

          {/* ── Photo column ── */}
          <motion.div
            variants={reduced ? {} : fadeLeft}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-4 rounded-full bg-linear-to-br from-primary/40 to-accent/40 blur-2xl"
                aria-hidden
              />
              {/* Decorative ring */}
              <div
                className="absolute -inset-1.5 rounded-full border-2 border-dashed border-primary/30 animate-spin"
                style={{ animationDuration: "20s" }}
                aria-hidden
              />
              {/* Photo */}
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-surface shadow-2xl sm:h-80 sm:w-80">
                <Image
                  src="/images/avatar.png"
                  alt="Rijwol Shakya — Flutter & Mobile Developer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 256px, 320px"
                />
              </div>
              {/* Flutter badge floating */}
              <motion.div
                className="absolute -bottom-3 -left-3 glass rounded-2xl px-4 py-2.5 shadow-lg"
                animate={reduced ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-xs font-semibold text-primary">Flutter</p>
                <p className="text-lg font-bold text-foreground">1,065+</p>
                <p className="text-xs text-muted">commits</p>
              </motion.div>
              {/* Experience badge floating */}
              <motion.div
                className="absolute -top-3 -right-3 glass rounded-2xl px-4 py-2.5 shadow-lg"
                animate={reduced ? {} : { y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <p className="text-lg font-bold text-foreground">2+</p>
                <p className="text-xs text-muted">years exp.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex flex-col items-center gap-2 text-xs text-muted hover:text-primary transition-colors min-h-[48px]"
            aria-label="Scroll to About section"
            animate={reduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>Scroll down</span>
            <ArrowDown size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
