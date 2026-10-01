import type { CSSProperties } from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LiveClock } from "./LiveClock";
import { CommitBars } from "./CommitBars";

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="aurora-section">
      <div aria-hidden="true" className="blob" style={{ width: 360, height: 360, "--c": "var(--cyan)", right: -120, top: 40, opacity: 0.18 } as CSSProperties} />
      <SectionHeader
        id="about-heading"
        eyebrow="About me"
        title="Building apps that"
        highlight="people rely on"
        lead="A quick look at who I am, what I'm doing now, and the numbers behind it."
      />
      <div className="bento">
        <Reveal className="tall2">
          <GlowCard className="h-full">
            <small>Who I am</small>
            <h3>Flutter developer from Kathmandu 🇳🇵</h3>
            <p>
              I&apos;m a Flutter developer with <b>3+ years of professional experience</b> building cross-platform mobile apps for Android
              and iOS. At <b>Dish Media Network</b> I build and maintain <b>myDishHome</b>, the self-service app with <b>1M+ downloads</b>{" "}
              that DishHome subscribers across Nepal use to pay bills, track technicians and manage their services.
            </p>
            <p>
              My engineering philosophy centres on <b>Clean Architecture</b>: a strict split between domain, data and presentation layers keeps
              codebases maintainable as they grow. I use <b>GetX</b> or <b>Riverpod</b> as the reactive layer, depending on the project.
            </p>
            <p>
              Beyond mobile, I&apos;m growing my skills in <b>React, Next.js and Node.js</b> through projects like Finance Tracker (Flutter +
              Supabase) and Rent-N-Read (React + Node.js). I&apos;m currently pursuing an <b>MSc in Data Science</b> to bring ML-driven
              features to mobile.
            </p>
          </GlowCard>
        </Reveal>
        <Reveal delay={80}>
          <GlowCard className="stat h-full">
            <small>Commits to myDishHome</small>
            <CountUp to={365} suffix="+" className="num grad" />
            <small>my own, merges excluded</small>
          </GlowCard>
        </Reveal>
        <Reveal delay={160}>
          <GlowCard className="stat h-full">
            <small>Experience</small>
            <CountUp to={3} suffix="+" className="num" />
            <small>years, plus an internship</small>
          </GlowCard>
        </Reveal>
        <Reveal delay={160}>
          <GlowCard className="h-full">
            <small>
              <span className="live" aria-hidden="true" />
              Currently
            </small>
            <h3>Mobile App Developer</h3>
            <p>Dish Media Network · myDishHome</p>
          </GlowCard>
        </Reveal>
        <Reveal delay={240}>
          <GlowCard className="h-full">
            <small>Local time · Kathmandu</small>
            <LiveClock />
            <small>UTC+5:45 · overlaps EU mornings</small>
          </GlowCard>
        </Reveal>
        <Reveal delay={240}>
          <GlowCard className="h-full">
            <small>myDishHome commit breakdown</small>
            <CommitBars />
          </GlowCard>
        </Reveal>
        <Reveal delay={320}>
          <GlowCard className="stat h-full">
            <small>Apps shipped</small>
            <CountUp to={6} suffix="+" className="num" />
            <small>Flutter, React Native &amp; web</small>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}
