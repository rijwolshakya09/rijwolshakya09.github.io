"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase, GitCommit, Code2, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const EDUCATION = [
  {
    degree: "MSc. Data Science & Computational Intelligence",
    institution: "Softwarica College of IT and E-Commerce",
    period: "Sep 2025 – Present",
    current: true,
  },
  {
    degree: "BSc. Hons Computing",
    institution: "Softwarica College of IT and E-Commerce",
    period: "Mar 2020 – Mar 2023",
    current: false,
  },
];

const STATS = [
  {
    label: "Years Experience",
    value: "2+",
    sub: "Professional",
    icon: Briefcase,
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    label: "Production Commits",
    value: "1K+",
    sub: "myDishHome alone",
    icon: GitCommit,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    label: "Apps Shipped",
    value: "6+",
    sub: "Android & iOS",
    icon: Code2,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    label: "Payment Gateways",
    value: "4",
    sub: "Integrated",
    icon: Award,
    gradient: "from-pink-500 to-rose-500",
  },
];

export function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="About Me"
          title="Crafting Mobile Experiences"
          description="Flutter developer passionate about building performant, maintainable cross-platform apps that users love."
        />

        {/* Stats infographic row */}
        <motion.div
          className="mb-14 grid grid-cols-2 gap-4 lg:grid-cols-4"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {STATS.map(({ label, value, sub, icon: Icon, gradient }, i) => (
            <motion.div
              key={label}
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: reduced ? 0 : i * 0.08 }}
              whileHover={reduced ? {} : { scale: 1.03, y: -3 }}
            >
              <GlassCard className="p-5 h-full text-center">
                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${gradient}`}>
                  <Icon size={22} className="text-white" aria-hidden />
                </div>
                <p className="text-3xl font-bold gradient-text">{value}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{label}</p>
                <p className="mt-0.5 text-xs text-muted">{sub}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio + Education two-column */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 80, damping: 20 }}
          >
            <h3 className="mb-5 text-lg font-semibold text-foreground">Who I Am</h3>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                {"I'm a Flutter developer with over "}
                <strong className="text-foreground">2 years of professional experience</strong>
                {" building cross-platform mobile applications for Android and iOS. Currently at "}
                <strong className="text-foreground">Dish Media Network Ltd.</strong>
                {", I lead mobile development for the myDishHome app serving thousands of DishHome subscribers across Nepal."}
              </p>
              <p>
                {"My engineering philosophy centers on "}
                <strong className="text-foreground">Clean Architecture</strong>
                {" — strict separation of domain, data, and presentation layers ensures codebases stay maintainable as they scale. I apply this with GetX or Riverpod as the reactive layer depending on project requirements."}
              </p>
              <p>
                {"Beyond mobile, I have growing expertise in "}
                <strong className="text-foreground">React, Next.js, and Node.js</strong>
                {" — demonstrated through full-stack projects like the Finance Tracker (Supabase + Flutter) and Rent-N-Read (React + Node.js). I'm currently pursuing an "}
                <strong className="text-foreground">MSc. in Data Science</strong>
                {" to expand into ML-driven mobile features."}
              </p>
            </div>

            {/* Commit activity infographic */}
            <GlassCard className="mt-8 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
                myDishHome Commit Breakdown
              </p>
              <div className="space-y-3">
                {[
                  { label: "feat:", count: 128, color: "bg-primary", pct: 60 },
                  { label: "fix:", count: 65, color: "bg-accent", pct: 30 },
                  { label: "refactor:", count: 23, color: "bg-emerald-500", pct: 10 },
                ].map(({ label, count, color, pct }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="w-16 text-xs font-mono text-muted">{label}</span>
                    <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      />
                    </div>
                    <span className="w-10 text-right text-xs font-semibold text-foreground">{count}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted">Out of 1,065 total commits across 29 branches</p>
            </GlassCard>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 80, damping: 20, delay: 0.1 }}
          >
            <h3 className="mb-6 text-lg font-semibold text-foreground flex items-center gap-2">
              <GraduationCap size={20} className="text-primary" aria-hidden />
              Education
            </h3>
            <div className="relative space-y-6 pl-6">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-linear-to-b from-primary via-accent to-transparent" aria-hidden />

              {EDUCATION.map((edu) => (
                <motion.div
                  key={edu.degree}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={reduced ? false : { opacity: 0, x: 16 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
                  className="relative"
                >
                  <div
                    className="absolute -left-6.25 top-5 h-3 w-3 rounded-full border-2 border-primary bg-background"
                    aria-hidden
                  />
                  <GlassCard className="p-5">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h4 className="font-semibold text-foreground text-sm leading-snug">
                        {edu.degree}
                      </h4>
                      {edu.current && (
                        <span className="shrink-0 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted">{edu.institution}</p>
                    <p className="mt-1 text-xs text-muted">{edu.period}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Location card */}
            <GlassCard className="mt-6 p-5 flex items-center gap-3">
              <MapPin size={20} className="text-primary shrink-0" aria-hidden />
              <div>
                <p className="text-sm font-medium text-foreground">Based in Kathmandu, Nepal</p>
                <p className="text-xs text-muted">Open to remote & on-site roles</p>
              </div>
            </GlassCard>

            {/* Payment gateway logos infographic */}
            <GlassCard className="mt-4 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
                Payment Gateways Integrated
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "eSewa", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
                  { name: "Khalti", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
                  { name: "FonePay", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
                  { name: "GetPay", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
                ].map(({ name, color }) => (
                  <div
                    key={name}
                    className={`rounded-xl border px-3 py-2.5 text-center text-xs font-semibold ${color}`}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
