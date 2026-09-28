"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StickyReveal({
  children,
  sinkPx = 300,
  minScale = 1,
  dimTo = 1,
  clip = false,
  bgClassName = "",
  shadowColor = "#000000",
}: {
  children: React.ReactNode;
  sinkPx?: number;
  minScale?: number;
  dimTo?: number;
  clip?: boolean;
  bgClassName?: string;
  shadowColor?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const shadow = shadowRef.current;
    if (!wrap || !stage || !shadow) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const syncHeight = () => {
      const contentHeight = stage.getBoundingClientRect().height;
      wrap.style.height = `${contentHeight + sinkPx}px`;
      ScrollTrigger.refresh();
    };
    syncHeight();

    const ro = new ResizeObserver(syncHeight);
    ro.observe(stage);

    let tl: gsap.core.Timeline | null = null;
    if (!reduced && (minScale !== 1 || dimTo !== 1)) {
      gsap.set(stage, { transformOrigin: "50% 0%" });
      gsap.set(shadow, { opacity: 0 });

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: `+=${sinkPx}`,
          scrub: 0.5,
        },
      })
        .fromTo(
          stage,
          { scale: 1, filter: "brightness(1)" },
          { scale: minScale, filter: `brightness(${dimTo})`, ease: "none" },
          0,
        )
        // bayangan ini yang ngisi area sinkPx yang kosong tadi — ikut nggelap
        // bareng Hero, jadi nyambung ke section berikutnya tanpa strip warna
        .fromTo(shadow, { opacity: 0 }, { opacity: 1 - dimTo, ease: "none" }, 0);
    }

    return () => {
      ro.disconnect();
      tl?.scrollTrigger?.kill();
      tl?.kill();
    };
  }, [sinkPx, minScale, dimTo]);

  return (
    <div ref={wrapRef} className={`relative ${bgClassName}`}>
      <div className="sticky top-0">
        <div ref={stageRef} className={`w-full will-change-transform ${clip ? "overflow-hidden" : ""}`}>
          {children}
        </div>
      </div>
      <div
        ref={shadowRef}
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: sinkPx, background: shadowColor }}
      />
    </div>
  );
}