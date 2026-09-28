"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Variant } from "./scroll-variant";

/**
 * ScrollHeading — five interchangeable "reveal on scroll" styles for section
 * titles. Ported from the Jual Emas Indonesia remake (components/ui/scroll-heading.tsx),
 * swapping the standalone `motion/react` package for the `framer-motion` already
 * used across this portfolio so no extra dependency is needed.
 */
export function ScrollHeading({
  children,
  variant = "blur",
  as: Tag = "h2",
  className,
  style,
  color = "#C9A24B",
}: {
  children: string;
  variant?: Variant;
  as?: "h1" | "h2" | "h3";
  className?: string;
  style?: CSSProperties;
  color?: string;
}) {
  const viewport = { once: true, amount: 0.5 } as const;

  if (variant === "roll") {
    const words = children.split(" ");
    let globalIndex = 0;

    return (
      <Tag className={className} style={{ ...style, perspective: 800 }}>
        {words.map((word, wi) => (
          <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((l, li) => {
              const i = globalIndex++;
              return (
                <motion.span
                  key={li}
                  style={{ display: "inline-block", transformOrigin: "50% 100%" }}
                  initial={{ rotateX: 90, opacity: 0 }}
                  whileInView={{ rotateX: 0, opacity: 1 }}
                  viewport={viewport}
                  transition={{ duration: 0.5, delay: i * 0.02, ease: "easeOut" }}
                >
                  {l}
                </motion.span>
              );
            })}
            {wi < words.length - 1 ? "\u00A0" : null}
          </span>
        ))}
      </Tag>
    );
  }

  if (variant === "shadow") {
    return (
      <Tag className={className} style={{ ...style, position: "relative", display: "inline-block" }}>
        <motion.span
          aria-hidden
          style={{ position: "absolute", left: 0, top: 0, color: "transparent", WebkitTextStroke: `1px ${color}55`, zIndex: 0 }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          whileInView={{ x: 6, y: 6, opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {children}
        </motion.span>
        <motion.span
          style={{ position: "relative", zIndex: 1 }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.span>
      </Tag>
    );
  }

  if (variant === "underline") {
    return (
      <Tag className={className} style={{ ...style, position: "relative", display: "inline-block" }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.span>
        <motion.svg
          width="100%"
          height="10"
          viewBox="0 0 300 10"
          preserveAspectRatio="none"
          style={{ position: "absolute", left: 0, bottom: -6, width: "100%" }}
        >
          <motion.path
            d="M0,5 Q75,0 150,5 Q225,10 300,5"
            stroke={color}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
          />
        </motion.svg>
      </Tag>
    );
  }

  if (variant === "blur") {
    return (
      <Tag className={className} style={style}>
        {children.split(" ").map((w, i) => (
          <motion.span
            key={i}
            style={{ display: "inline-block", marginRight: "0.3em" }}
            initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            {w}
          </motion.span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} style={{ ...style, overflow: "hidden", display: "inline-block" }}>
      <motion.span
        style={{ display: "inline-block" }}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={viewport}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
