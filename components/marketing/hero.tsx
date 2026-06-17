"use client";

import * as React from "react";
import Image from "next/image";
import { Star, ShieldCheck } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { RibbonMark } from "@/components/shared/ribbon-mark";
import { HeroSearch } from "@/components/marketing/hero-search";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Full-bleed editorial background — venue / decor, no humans. */
const HERO_IMG =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2400&q=85";

/**
 * Hero façon Airbnb × Malt : image premium en plein cadre, voile léger pour la
 * lisibilité, titre + barre de recherche prominente centrée, signaux de
 * confiance. Léger parallax + Ken Burns au scroll, entrée en cascade au lancement.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[82vh] items-center overflow-hidden"
    >
      {/* ---- Full-bleed background (overscan for parallax + Ken Burns) ---- */}
      <motion.div
        className="absolute inset-[-12%]"
        style={reduce ? undefined : { y: parallaxY }}
        initial={reduce ? false : { scale: 1.04 }}
        animate={reduce ? undefined : { scale: [1.04, 1.1, 1.04] }}
        transition={{ duration: 28, ease: "easeInOut", repeat: Infinity }}
      >
        <Image
          src={HERO_IMG}
          alt="Table de réception dressée dans un lieu d'exception"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* ---- Balanced overlay — keeps the photo bright, text legible ---- */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lystra-ink/50 via-lystra-ink/40 to-lystra-ink/60" />
      {/* blend into the ivory page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-lystra-ivory to-transparent" />

      {/* faint signature watermark */}
      <RibbonMark
        withDots={false}
        className="pointer-events-none absolute -right-12 top-16 hidden h-[26rem] w-[26rem] text-lystra-cream/[0.08] lg:block"
      />

      {/* ---- Content — centered, search-forward ---- */}
      <motion.div
        data-reveal=""
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-4xl px-4 py-24 text-center sm:px-6 lg:py-28"
      >
        <motion.span
          data-reveal=""
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-lystra-cream/30 bg-white/10 px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-lystra-cream/90 backdrop-blur-sm"
        >
          <RibbonMark withDots={false} className="h-3.5 w-3.5 text-lystra-champagne" />
          Conciergerie &amp; marketplace premium
        </motion.span>

        <motion.h1
          data-reveal=""
          variants={item}
          className="display mx-auto mt-6 max-w-3xl text-balance text-4xl leading-[1.05] text-lystra-cream sm:text-5xl lg:text-[3.7rem]"
        >
          Trouvez les meilleurs talents pour vos{" "}
          <span className="italic text-lystra-champagne">moments d&apos;exception.</span>
        </motion.h1>

        <motion.p
          data-reveal=""
          variants={item}
          className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-lystra-cream/85 sm:text-lg"
        >
          Beauté, image, décoration, lieux, gastronomie et talents événementiels
          sélectionnés — réunis sur une seule plateforme.
        </motion.p>

        {/* Prominent search bar (left-aligned fields inside) */}
        <motion.div data-reveal="" variants={item} className="mx-auto mt-9 max-w-3xl text-left">
          <HeroSearch />
        </motion.div>

        <motion.div
          data-reveal=""
          variants={item}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-lystra-cream/90"
        >
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-lystra-champagne text-lystra-champagne" />
            <strong className="font-medium text-lystra-cream">4,8/5</strong> en moyenne
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-lystra-champagne" />
            <strong className="font-medium text-lystra-cream">1 200+</strong> talents vérifiés
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
