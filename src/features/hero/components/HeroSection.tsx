"use client";

import { motion, type Variants } from "framer-motion";
import { AuroraBackground } from "@/components/common/AuroraBackground";
import { SocialButtons } from "@/components/ui/SocialButtons";
import { Marquee } from "@/components/ui/Marquee";
import { TECH_NAMES } from "@/components/ui/TechLogo";
import { buttonStyles } from "@/components/ui/Button";
import { CV_PATH } from "@/lib/constants";
import { PhotoOrbit } from "./PhotoOrbit";
import { TypingRoles } from "./TypingRoles";

const MARQUEE = Object.entries(TECH_NAMES).map(([icon, name]) => ({ icon, name }));

// Transform-only entrance: hero text is never hidden in server HTML (it is the LCP element).
const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item: Variants = {
  hidden: { y: 24 },
  show: { y: 0, transition: { type: "spring", stiffness: 140, damping: 20 } },
};

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="aurora-section hero isolate">
      <AuroraBackground />
      <div className="hgrid">
        <motion.div variants={list} initial="hidden" animate="show">
          <motion.span variants={item} className="pill">
            <span className="ping" aria-hidden="true" />
            Open to remote Flutter roles
          </motion.span>
          <motion.h1 variants={item} id="hero-heading">
            Hi, I&apos;m Rijwol{" "}
            <br />
            <span className="grad">Shakya</span>
          </motion.h1>
          <motion.div variants={item}>
            <TypingRoles />
          </motion.div>
          <motion.p variants={item} className="hero-intro">
            I build production Flutter apps for Android and iOS: payments, live tracking and rich push, used by subscribers across Nepal.
          </motion.p>
          <motion.div variants={item} className="ctas">
            <a href="#work" className={buttonStyles({ variant: "gradient" })}>
              View my work →
            </a>
            <a href={CV_PATH} download className={buttonStyles({ variant: "glass" })}>
              Download CV ↓
            </a>
          </motion.div>
          <motion.div variants={item}>
            <SocialButtons />
          </motion.div>
        </motion.div>
        <PhotoOrbit />
      </div>
      <Marquee items={MARQUEE} />
    </section>
  );
}
