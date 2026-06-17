"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { RibbonMark } from "@/components/shared/ribbon-mark";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Full-bleed editorial background — venue / decor, no humans. */
const HERO_IMG =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2400&q=85";

/**
 * Hero plein écran — direction artistique "maison de luxe / conciergerie".
 * Image événementielle en fond complet, voile prune profond pour la lisibilité,
 * léger Ken Burns + parallax au scroll, entrée du contenu en cascade au lancement.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Background drifts slower than the page → parallax depth.
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
  };

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-lystra-dark"
    >
      {/* ---- Full-bleed background (overscan for parallax + Ken Burns) ---- */}
      <motion.div
        className="absolute inset-[-15%]"
        style={reduce ? undefined : { y: parallaxY }}
        initial={reduce ? false : { scale: 1.06 }}
        animate={reduce ? undefined : { scale: [1.06, 1.14, 1.06] }}
        transition={{ duration: 26, ease: "easeInOut", repeat: Infinity }}
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

      {/* ---- Legibility overlays ---- */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-lystra-dark/90 via-lystra-dark/60 to-lystra-dark/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-lystra-ink/75 via-transparent to-lystra-ink/35" />
      {/* blend into the ivory page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-lystra-ivory via-lystra-ivory/40 to-transparent" />

      {/* faint signature watermark */}
      <RibbonMark
        withDots={false}
        className="pointer-events-none absolute -right-12 top-12 hidden h-[28rem] w-[28rem] text-lystra-champagne/[0.09] lg:block"
      />

      {/* ---- Content ---- */}
      <motion.div
        data-reveal=""
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 pt-28 sm:px-6 lg:px-8 lg:pb-36 lg:pt-32"
      >
        <div className="max-w-2xl">
          <motion.span
            data-reveal=""
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-lystra-cream/25 bg-white/10 px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-lystra-cream/90 backdrop-blur-sm"
          >
            <RibbonMark withDots={false} className="h-3.5 w-3.5 text-lystra-champagne" />
            Conciergerie &amp; marketplace premium
          </motion.span>

          <motion.h1
            data-reveal=""
            variants={item}
            className="display mt-6 text-balance text-4xl leading-[1.05] text-lystra-cream sm:text-5xl lg:text-[3.8rem]"
          >
            Trouvez les meilleurs talents pour vos{" "}
            <span className="italic text-lystra-champagne">moments d&apos;exception.</span>
          </motion.h1>

          <motion.p
            data-reveal=""
            variants={item}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-lystra-cream/80 sm:text-lg"
          >
            Beauté, image, décoration, lieux, gastronomie et talents événementiels
            sélectionnés — réunis sur une seule plateforme.
          </motion.p>

          <motion.div data-reveal="" variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="champagne" size="lg" className="gap-2">
              <Link href="/prestataires">
                Explorer les prestataires <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 border-lystra-cream/40 bg-white/5 text-lystra-cream backdrop-blur-sm hover:border-lystra-cream/70 hover:bg-white/10"
            >
              <Link href="/conciergerie">
                <RibbonMark withDots={false} withSparkle className="h-4 w-4 text-lystra-champagne" />
                Confier ma recherche
              </Link>
            </Button>
          </motion.div>

          <motion.div
            data-reveal=""
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-lystra-cream/85"
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
        </div>
      </motion.div>
    </section>
  );
}
