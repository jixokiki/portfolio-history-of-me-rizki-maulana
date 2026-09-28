"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/i18n";
import { ScrollHeading } from "./ui/ScrollHeading";

export default function Experience() {
  const { t } = useContent();
  const { experience, ui } = t;

  return (
    <section
      id="experience"
      className="bg-pattern-dark relative z-10 py-24 text-cream rounded-b-[2.5rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.65)] md:rounded-b-[3.5rem]"
    >
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">{ui.experience.eyebrow}</p>
        <ScrollHeading as="h2" variant="shadow" color="#C9A24B" className="font-display mt-3 text-4xl text-gold-light md:text-5xl">
          {ui.experience.heading}
        </ScrollHeading>

        <div className="mt-14 divide-y divide-gold/15">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.org + exp.period}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="grid gap-4 py-8 md:grid-cols-[3.5rem_1fr_9rem]"
            >
              <span className="font-serif text-2xl italic text-gold-deep/60">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-xl text-cream-light">{exp.org}</h3>
                <p className="text-sm italic text-cream/60">{exp.role}</p>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-cream/80">
                  {exp.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-deep" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-deep md:text-right">{exp.period}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}