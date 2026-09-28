"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SinkHero({
  children,
  sinkPx = 420,
  minScale = 0.9,
}: {
  children: React.ReactNode;
  sinkPx?: number;
  minScale?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

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
    if (!reduced) {
      gsap.set(stage, { transformOrigin: "50% 0%" });
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: `+=${sinkPx}`,
          scrub: 0.5,
        },
      }).fromTo(
        stage,
        { scale: 1, borderRadius: 0, filter: "brightness(1) saturate(1)" },
        { scale: minScale, borderRadius: 40, filter: "brightness(0.55) saturate(0.85)", ease: "none" },
      );
    }

    return () => {
      ro.disconnect();
      tl?.scrollTrigger?.kill();
      tl?.kill();
    };
  }, [sinkPx, minScale]);

  return (
    <div ref={wrapRef} className="relative bg-ink-black">
      <div className="sticky top-0">
        <div ref={stageRef} className="w-full overflow-hidden shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] will-change-transform">
          {children}
        </div>
      </div>
    </div>
  );
}