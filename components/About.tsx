"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useContent } from "@/lib/i18n";
import { ScrollHeading } from "./ui/ScrollHeading";

export default function About() {
  const { t } = useContent();
  const { profile, brandStrip, hero } = t;
  const loopedBrands = [...brandStrip, ...brandStrip];

  const [isDesktop, setIsDesktop] = useState(false);
  const [introDrawn, setIntroDrawn] = useState(false);
  const breatheControls = useAnimation();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleHeadingInView = () => {
    if (!isDesktop) return;
    breatheControls.start({
      scale: [1, 1.035, 1, 1.035, 1],
      transition: { duration: 2.4, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] },
    });
  };

  return (
    <section
      id="about"
      className="bg-pattern-dark relative z-10 -mt-40 rounded-t-[2.5rem] py-24 text-cream shadow-[0_-50px_100px_-30px_rgba(0,0,0,0.65)] md:-mt-16 md:rounded-t-[3.5rem]"
    >
      {isDesktop ? (
        // Layout desktop: heading di tengah atas, paragraf stacked di bawahnya — bukan side-by-side.
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 px-6 text-center">
          {/* <div className="relative z-10 mt-16 overflow-hidden border-y border-gold/25 bg-ink-deep py-3">
            <div className="marquee-track">
              {loopedBrands.map((b, i) => (
                <span key={i} className="font-display mx-6 shrink-0 text-sm tracking-[0.25em] text-gold-pale/70 md:text-base">
                  {b} <span className="text-gold-deep/60">·</span>
                </span>
              ))}
            </div>
          </div> */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            onViewportEnter={handleHeadingInView}
          >
            <motion.div animate={breatheControls} onAnimationComplete={() => setIntroDrawn(true)}>
              <ScrollHeading as="h2" variant="shadow" color="#E6C36A" className="font-display text-4xl leading-none text-gold-light md:text-5xl">
                INTRO
              </ScrollHeading>
              <ScrollHeading as="h2" variant="shadow" color="#E6C36A" className="font-display text-4xl leading-none text-gold-light md:text-5xl">
                DUCTION
              </ScrollHeading>
              <p className="mt-6 text-sm uppercase tracking-widest text-gold-pale/70">{profile.location}</p>
            </motion.div>
          </motion.div>

          <div className="space-y-5 text-base leading-relaxed text-cream/85">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={introDrawn ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6 }}
            >
              <p>{profile.intro}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={introDrawn ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <p>{profile.summary}</p>
            </motion.div>
          </div>
        </div>
      ) : (
        // Layout mobile: tidak diubah, tetap grid single-column original.
        <div className="mx-auto grid max-w-6xl gap-12 px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <ScrollHeading as="h2" variant="shadow" color="#E6C36A" className="font-display text-4xl leading-none text-gold-light md:text-5xl">
              INTRO
            </ScrollHeading>
            <ScrollHeading as="h2" variant="shadow" color="#E6C36A" className="font-display text-4xl leading-none text-gold-light md:text-5xl">
              DUCTION
            </ScrollHeading>
            <p className="mt-6 text-sm uppercase tracking-widest text-gold-pale/70">{profile.location}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5 text-sm leading-relaxed text-cream/85"
          >
            <p>{profile.intro}</p>
            <p>{profile.summary}</p>
          </motion.div>
        </div>
      )}

      {/* <div className="relative z-10 mt-16 overflow-hidden border-y border-gold/25 bg-ink-deep py-3">
        <div className="marquee-track">
          {loopedBrands.map((b, i) => (
            <span key={i} className="font-display mx-6 shrink-0 text-sm tracking-[0.25em] text-gold-pale/70 md:text-base">
              {b} <span className="text-gold-deep/60">·</span>
            </span>
          ))}
        </div>
      </div> */}
    </section>
  );
}
// "use client";

// import { motion } from "framer-motion";
// import { useContent } from "@/lib/i18n";
// import { ScrollHeading } from "./ui/ScrollHeading";

// export default function About() {
//   const { t } = useContent();
//   // const { profile } = t;
//   const { profile, brandStrip, hero } = t;
//   const loopedBrands = [...brandStrip, ...brandStrip];

//   return (
//     <section
//       id="about"
//       className="bg-pattern-dark relative z-10 -mt-40 rounded-t-[2.5rem] py-24 text-cream shadow-[0_-50px_100px_-30px_rgba(0,0,0,0.65)] md:-mt-16 md:rounded-t-[3.5rem]"
//     >
//       <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.4fr]">
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true, margin: "-80px" }}
//           transition={{ duration: 0.6 }}
//         >
//           <ScrollHeading as="h2" variant="shadow" color="#E6C36A" className="font-display text-4xl leading-none text-gold-light md:text-5xl">
//             INTRO
//           </ScrollHeading>
//           <ScrollHeading as="h2" variant="shadow" color="#E6C36A" className="font-display text-4xl leading-none text-gold-light md:text-5xl">
//             DUCTION
//           </ScrollHeading>
//           <p className="mt-6 text-sm uppercase tracking-widest text-gold-pale/70">{profile.location}</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true, margin: "-80px" }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="space-y-5 text-sm leading-relaxed text-cream/85 md:text-base"
//         >
//           <p>{profile.intro}</p>
//           <p>{profile.summary}</p>
//         </motion.div>
        
//       </div>
//       <div className="relative z-10 mt-16 overflow-hidden border-y border-gold/25 bg-ink-deep py-3">
//         <div className="marquee-track">
//           {loopedBrands.map((b, i) => (
//             <span key={i} className="font-display mx-6 shrink-0 text-sm tracking-[0.25em] text-gold-pale/70 md:text-base">
//               {b} <span className="text-gold-deep/60">·</span>
//             </span>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }