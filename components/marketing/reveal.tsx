"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/** Signature easing — soft, premium deceleration (matches the Tailwind tokens). */
const EASE = [0.16, 1, 0.3, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

function offset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

/**
 * Reveal — fades / translates a block into view as it enters the viewport.
 * Respects `prefers-reduced-motion` (degrades to a plain opacity fade).
 *
 * The `data-reveal` marker lets a <noscript> stylesheet (see app/layout.tsx)
 * force visibility when JS is unavailable, so content + links are never
 * permanently hidden behind the scroll-gated `initial="hidden"` state.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  distance = 26,
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, ...offset(direction, distance) },
    show: { opacity: 1, x: 0, y: 0, transition: { duration, ease: EASE, delay } },
  };

  return (
    <motion.div
      data-reveal=""
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

/**
 * RevealStagger — parent container that orchestrates a cascade of `RevealItem`
 * children as the group scrolls into view.
 */
export function RevealStagger({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0.04,
  once = true,
  amount = 0.18,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    // Reduced motion: present the whole group at once (no sequential cascade).
    show: {
      transition: reduce
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: stagger, delayChildren },
    },
  };

  return (
    <motion.div
      data-reveal=""
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

/** RevealItem — a single child of `RevealStagger`. Inherits the parent state. */
export function RevealItem({
  children,
  className,
  direction = "up",
  distance = 24,
  duration = 0.6,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, ...offset(direction, distance) },
    show: { opacity: 1, x: 0, y: 0, transition: { duration, ease: EASE } },
  };

  return (
    <motion.div data-reveal="" className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
}
