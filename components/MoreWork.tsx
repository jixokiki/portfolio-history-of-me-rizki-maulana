"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/lib/i18n";
import { ScrollHeading } from "./ui/ScrollHeading";

export default function MoreWork() {
  const { t } = useContent();
  const { moreWork, ui } = t;

  return (
    <section id="more-work" className="bg-pattern-dark py-24 text-cream">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">{ui.moreWork.eyebrow}</p>
        <ScrollHeading as="h2" variant="blur" color="#C9A24B" className="font-display mt-3 text-4xl text-gold-light md:text-5xl">
          {ui.moreWork.heading}
        </ScrollHeading>

        <div className="mt-12 divide-y divide-gold/15">
          {moreWork.map((p, i) => {
            const Wrapper = p.link ? "a" : "div";
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.04 }}
              >
                <Wrapper
                  {...(p.link ? { href: p.link, target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <span className="w-8 shrink-0 font-serif text-sm italic text-gold-deep/60">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg text-cream-light transition group-hover:text-gold-light">{p.title}</h3>
                      {p.link && (
                        <ArrowUpRight size={15} className="text-gold-deep opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-cream/70">{p.description}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-1 text-xs uppercase tracking-wider text-gold-deep sm:items-end">
                    <span>{p.tag}</span>
                    <span className="text-cream/40">{p.period}</span>
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}