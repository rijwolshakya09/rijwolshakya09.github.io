"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tv } from "lucide-react";

export function AlertsScreen({ onAnnounce }: { onAnnounce: (message: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full flex-col">
      <p className="text-center font-display text-5xl font-extrabold tabular-nums">9:41</p>
      <p className="text-center text-xs text-muted">Thursday, 1 October</p>

      <motion.button
        layout
        type="button"
        aria-expanded={open}
        onClick={() => {
          setOpen(!open);
          onAnnounce(open ? "Notification collapsed" : "Notification expanded");
        }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="mt-6 w-full rounded-2xl bg-background p-3 text-left"
      >
        <motion.div layout="position" className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary">
            <Tv size={16} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-muted">Your provider · now</span>
            <span className="block text-sm font-semibold">Your new channel pack is live</span>
            <span className="block text-xs text-muted">{open ? "Tap to collapse" : "Tap to see what's included"}</span>
          </span>
          {!open && <span aria-hidden className="h-10 w-10 shrink-0 rounded-lg bg-primary/25" />}
        </motion.div>
        {open && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 grid aspect-video place-items-center rounded-xl bg-primary/20"
            aria-label="Notification image: channel pack preview"
            role="img"
          >
            <span className="grid h-3/5 w-3/4 grid-cols-3 gap-1.5" aria-hidden>
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i} className="rounded-md bg-primary/40" />
              ))}
            </span>
          </motion.div>
        )}
      </motion.button>
      <p className="mt-auto text-center text-xs text-muted">Rich push with an image attachment</p>
    </div>
  );
}
