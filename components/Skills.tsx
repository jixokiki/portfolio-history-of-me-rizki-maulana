"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/i18n";
import { ScrollHeading } from "./ui/ScrollHeading";

export default function Skills() {
  const { t } = useContent();
  const { skills, graphicHighlights, ui } = t;

  return (
    <section id="skills" className="bg-pattern-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">{ui.skills.eyebrow}</p>
        <ScrollHeading as="h2" variant="underline" className="font-display mt-3 text-4xl text-ink-deep md:text-5xl">
          {ui.skills.heading}
        </ScrollHeading>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="hairline pt-5"
            >
              <h3 className="font-display text-sm text-ink-deep">{s.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-deep/70">{s.items.join(" · ")}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-lg border border-gold/25 bg-ink-deep p-8 text-cream md:p-10"
        >
          <h3 className="font-display text-xl text-gold-light">{ui.skills.graphicHeading}</h3>
          <ul className="mt-4 grid gap-2 text-sm text-cream/85 sm:grid-cols-2">
            {graphicHighlights.map((g) => (
              <li key={g} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-light" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}