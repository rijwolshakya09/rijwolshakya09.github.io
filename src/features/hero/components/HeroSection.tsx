"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { SocialLinks } from "@/components/common/SocialLinks";
import { PhoneDemo } from "./PhoneDemo/PhoneDemo";
import { AVAILABILITY, CV_PATH } from "@/lib/constants";

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="pb-20 pt-10 md:pb-28 md:pt-16">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-live" aria-hidden />
            {AVAILABILITY}
          </p>
          {/* Transform only — no opacity, so the LCP headline paints immediately */}
          <motion.h1
            id="hero-heading"
            initial={{ y: 18 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
            className="mt-5 max-w-[14ch] font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.025em] sm:text-6xl lg:text-7xl"
          >
            I build the mobile apps people pay their bills with.
          </motion.h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
            Flutter developer in Kathmandu with 3+ years shipping production Android and iOS apps. Today I build a
            self-service app that subscribers across Nepal use to pay bills and track technician visits.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className={buttonStyles({ size: "lg" })}>
              See my work
            </a>
            <a href={CV_PATH} download className={buttonStyles({ variant: "outline", size: "lg" })}>
              Download CV
            </a>
            <SocialLinks include={["github", "linkedin"]} className="ml-1" />
          </div>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.25 }}
        >
          <PhoneDemo />
        </motion.div>
      </Container>
    </section>
  );
}
