"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/i18n";
import { ScrollHeading } from "./ui/ScrollHeading";

export default function Education() {
  const { t } = useContent();
  const { education, ui } = t;

  return (
    <section id="education" className="bg-pattern-cream py-20">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">{ui.education.eyebrow}</p>
        <ScrollHeading as="h2" variant="mask" className="font-display mt-3 text-3xl text-ink-deep md:text-4xl">
          {ui.education.heading}
        </ScrollHeading>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {education.map((e, i) => (
            <motion.div
              key={e.school}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="hairline pt-5"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-deep">{e.period}</p>
              <h3 className="font-display mt-1 text-lg text-ink-deep">{e.school}</h3>
              <p className="mt-2 text-sm text-ink-deep/75">{e.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}