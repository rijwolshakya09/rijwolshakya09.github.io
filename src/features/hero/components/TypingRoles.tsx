"use client";

import { useEffect, useState } from "react";
import { typewriterStep, type TypeState } from "@/lib/motion";

export const HERO_ROLES = ["Flutter Developer", "Mobile Engineer", "Clean Architecture fan", "UI craftsman"] as const;

export function TypingRoles({ words = HERO_ROLES }: { words?: readonly string[] }) {
  const [state, setState] = useState<TypeState>({ word: 0, chars: words[0].length, deleting: false });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { next, delayMs } = typewriterStep(state, words);
    const id = window.setTimeout(() => setState(next), delayMs);
    return () => window.clearTimeout(id);
  }, [state, words]);

  return (
    <>
      <div className="type" aria-hidden="true">
        <span>{words[state.word].slice(0, state.chars)}</span>
        <span className="caret" />
      </div>
      <span className="sr-only">Flutter developer</span>
    </>
  );
}
