"use client";

/* eslint-disable @next/next/no-img-element -- static export with unoptimized images */
import { useEffect, useRef, useState, type RefObject } from "react";
import { usePointerVars } from "@/hooks/usePointerVars";
import { showcaseIndex } from "@/lib/motion";
import type { Project } from "../types";
import { ProjectIcon } from "./ProjectIcon";

/** Sticky phone whose screen follows the dialog's vertical scroll; vertical thumbnail rail jumps directly. */
export function PhoneShowcase({ project, scrollRoot }: { project: Project; scrollRoot: RefObject<HTMLElement | null> }) {
  const shots = project.screenshots;
  const [index, setIndex] = useState(0);
  const manualUntil = useRef(0);
  const zone = usePointerVars<HTMLDivElement>();

  useEffect(() => {
    const root = scrollRoot.current;
    if (!root || shots.length === 0) return;
    const onScroll = () => {
      if (Date.now() < manualUntil.current) return;
      const max = root.scrollHeight - root.clientHeight;
      setIndex(showcaseIndex(max > 0 ? root.scrollTop / max : 0, shots.length));
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => root.removeEventListener("scroll", onScroll);
  }, [scrollRoot, shots.length]);

  if (shots.length === 0) {
    const github = project.stores.some((s) => s.kind === "github");
    return (
      <div className="showcase">
        <div className="glass noshots" style={{ gridColumn: "1 / -1" }}>
          <ProjectIcon project={project} size={64} />
          <p>{github ? "Source code on GitHub" : `${project.statusNote ?? "Internal release"}: no public store listing`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="showcase" ref={zone}>
      <div className="sc-phone" aria-hidden="true">
        <div className="sc-notch" />
        {shots.map((src, i) => (
          <img key={src} className={i === index ? "sc-img on" : "sc-img"} src={src} alt="" width={212} height={440} decoding="async" />
        ))}
        <div className="sc-glare" />
      </div>
      <div className="sc-rail">
        {shots.map((src, i) => (
          <button
            key={src}
            type="button"
            className="sc-th"
            aria-label={`Show screenshot ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => {
              manualUntil.current = Date.now() + 1500;
              setIndex(i);
            }}
          >
            <img src={src} alt={`${project.title} screenshot ${i + 1}`} width={56} height={118} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
      <div className="sc-count" aria-live="polite">
        <b>{index + 1}</b> / {shots.length}
        <span>Scroll to explore</span>
      </div>
    </div>
  );
}
