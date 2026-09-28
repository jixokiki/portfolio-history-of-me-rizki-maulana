"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import GlyphLogo from "./GlyphLogo";
import { useContent } from "@/lib/i18n";
import CrowdCanvas from "./ui/CrowdCanvas";
import LocationBadge from "./ui/LocationBadge";
import PhotoRing from "./ui/PhotoRing";
import CvNoticePopup from "./ui/CvNoticePopup";

// react-three-fiber touches WebGL/canvas APIs that don't exist during SSR,
// and it's a heavy chunk (three.js) we'd rather not block the first paint on —
// so the rotating ring loads client-side only, after the rest of the hero.
const RotatingRing3D = dynamic(() => import("./ui/RotatingRing"), { ssr: false });

export default function Hero() {
  const { t } = useContent();
  const { profile, brandStrip, hero } = t;
  const loopedBrands = [...brandStrip, ...brandStrip];

  return (
    <section
      id="top"
      className="bg-pattern-cream relative overflow-hidden pt-24 pb-12 md:pt-28 md:pb-0"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-1 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-deep sm:flex-row sm:justify-between sm:gap-3 sm:text-left sm:text-xs sm:tracking-[0.3em]"
        >
          <span>{hero.eyebrowLeft}</span>
          {/* <GlyphLogo className="h-8 w-14" /> */}
          <span>{hero.eyebrowRight}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display mt-4 whitespace-nowrap text-center text-[12vw] leading-[0.85] text-ink-deep sm:mt-6 sm:text-[10vw] md:text-[8rem]"
        >
          PORT<span className="gold-text">FOL</span>IO
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-8 grid max-w-4xl items-center gap-6 text-center text-ink-deep/90 sm:mt-10 sm:grid-cols-[auto_1fr] sm:gap-10 sm:text-left"
        >
          {/* <img
            src={profile.photo}
            alt={profile.name}
            className="mx-auto h-36 w-36 rounded-full border-4 border-gold/40 object-cover object-top shadow-[0_20px_40px_-20px_rgba(13,8,3,0.5)] sm:h-40 sm:w-40"
          /> */}
          <PhotoRing
            src={profile.photo}
            alt={profile.name}
            className="mx-auto h-60 w-60 sm:h-64 sm:w-64"
          />
          <div className="grid gap-4 md:grid-cols-2 md:gap-10">
            <p className="font-serif text-base italic leading-relaxed text-ink-deep/80 sm:text-lg">
              {hero.tagline}
            </p>
            <div>
              <p className="font-display text-xl text-ink-deep sm:text-2xl">{profile.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-deep/80">
                {hero.agencyNoteBefore}
                <a
                  href={profile.agency.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-gold decoration-2 underline-offset-2"
                >
                  {profile.agency.name}
                </a>
                {hero.agencyNoteAfter}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10 sm:gap-3"
        >
          {profile.roles.map((r) => (
            <span
              key={r}
              className="rounded-full border border-gold/50 bg-cream-light px-3 py-1 text-[11px] font-semibold text-gold-deep sm:px-4 sm:py-1.5 sm:text-xs"
            >
              {r}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 flex justify-center sm:mt-5"
        >
          <LocationBadge />
        </motion.div>
      </div>

      {/* <div className="relative z-10 mt-16 overflow-hidden border-y border-gold/25 bg-ink-deep py-3">
        <div className="marquee-track">
          {loopedBrands.map((b, i) => (
            <span key={i} className="font-display mx-6 shrink-0 text-sm tracking-[0.25em] text-gold-pale/70 md:text-base">
              {b} <span className="text-gold-deep/60">·</span>
            </span>
          ))}
        </div>
      </div> */}
      <CvNoticePopup />
    </section>
  );
}