"use client";

/* eslint-disable @next/next/no-img-element -- static export with unoptimized images */
import { motion } from "framer-motion";

export function PhotoOrbit() {
  return (
    <motion.div
      className="photoWrap"
      initial={{ scale: 0.92 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.15 }}
    >
      <div className="orbit" aria-hidden="true">
        <img className="o1" src="/icons/flutter.svg" alt="" width={38} height={38} />
        <img className="o2" src="/icons/dart.svg" alt="" width={38} height={38} />
        <img className="o3" src="/icons/firebase.svg" alt="" width={38} height={38} />
      </div>
      <div className="ring" aria-hidden="true" />
      <img className="photo" src="/images/avatar.png" alt="Rijwol Shakya" width={330} height={330} fetchPriority="high" />
      <div className="badge bg1">
        <b>365+</b>commits shipped
      </div>
      <div className="badge bg2">
        <b>3+ yrs</b>professional
      </div>
      <div className="badge bg3">
        <b>4</b>payment gateways
      </div>
    </motion.div>
  );
}
