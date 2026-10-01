"use client";

import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { StoreBadge } from "@/components/ui/StoreBadge";
import type { Project } from "../types";
import { PhoneShowcase } from "./PhoneShowcase";
import { ProjectIcon } from "./ProjectIcon";

export function CaseStudyModal({
  project,
  onClose,
  returnFocusTo,
}: {
  project: Project;
  onClose: () => void;
  returnFocusTo: HTMLElement | null;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      returnFocusTo?.focus();
    };
  }, [returnFocusTo]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key !== "Tab" || !boxRef.current) return;
    const items = boxRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const onBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const titleId = `cs-title-${project.id}`;

  return createPortal(
    <motion.div
      className="modal"
      onMouseDown={onBackdrop}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        ref={boxRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="glass mbox"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <button ref={closeRef} type="button" className="x" onClick={onClose} aria-label="Close case study">
          <X size={18} aria-hidden />
        </button>
        <div className="mgrid">
          <div>
            <div className="phead">
              <ProjectIcon project={project} size={64} />
              <div>
                <h3 id={titleId} className="font-display text-2xl font-extrabold">
                  {project.title}
                </h3>
                <small>{project.subtitle}</small>
              </div>
            </div>
            {project.stores.length > 0 && (
              <div className="stores" style={{ marginTop: 4 }}>
                {project.stores.map((s) => (
                  <StoreBadge key={s.kind} link={s} appName={project.title} />
                ))}
              </div>
            )}

            <h4>Overview</h4>
            <p>{project.overview}</p>

            <h4>App information</h4>
            <div className="info-grid">
              {project.info.map((i) => (
                <div key={i.label}>
                  <small>{i.label}</small>
                  {i.value}
                </div>
              ))}
            </div>

            <h4>Key features</h4>
            <ul className="hl two-col">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <h4>Architecture</h4>
            <div className="arch">
              {project.architecture.map((a) => (
                <span key={a.label}>
                  <b>{a.label}</b>
                  {a.description}
                </span>
              ))}
            </div>

            <h4>Key metrics</h4>
            <div className="metrics" style={{ margin: "6px 0" }}>
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <b style={{ fontSize: m.value.length > 5 ? 16 : 24 }}>{m.value}</b>
                  {m.label}
                </div>
              ))}
            </div>

            <h4>What I did</h4>
            <ul className="hl">
              {project.contributions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>

            <h4>Tech stack</h4>
            <div>
              {project.techStack.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <PhoneShowcase project={project} scrollRoot={boxRef} />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
