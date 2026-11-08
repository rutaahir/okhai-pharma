import type { Variants, Transition } from 'motion/react';

// Premium Botanical Easing Curves
export const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const SMOOTH_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const transitionPreset = (duration = 0.75, delay = 0): Transition => ({
  duration,
  delay,
  ease: LUXURY_EASE,
});

/* =========================================================================
   PRESET A — Elegant Fade Up
   For section headings, paragraphs, descriptions, and feature content.
   Initial y: ~28px, Opacity 0 -> 1, Duration: 700-800ms
========================================================================= */
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    y: 0,
    transition: transitionPreset(custom?.duration ?? 0.75, custom?.delay ?? 0),
  }),
};

/* =========================================================================
   PRESET B — Horizontal Editorial Reveal
   For two-column layouts, editorial images beside text.
========================================================================= */
export const fadeInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -36,
  },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    x: 0,
    transition: transitionPreset(custom?.duration ?? 0.8, custom?.delay ?? 0),
  }),
};

export const fadeInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 36,
  },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    x: 0,
    transition: transitionPreset(custom?.duration ?? 0.8, custom?.delay ?? 0),
  }),
};

/* =========================================================================
   PRESET C — Staggered Card Entrance
   For product cards, feature cards, leadership portraits, and statistics.
========================================================================= */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom?: { staggerChildren?: number; delayChildren?: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom?.staggerChildren ?? 0.12,
      delayChildren: custom?.delayChildren ?? 0.05,
    },
  }),
};

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: LUXURY_EASE,
    },
  },
};

/* =========================================================================
   PRESET D — Image Reveal
   For facility photos, lab microscopy, and product packaging visuals.
========================================================================= */
export const imageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.04,
  },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom?.duration ?? 0.9,
      delay: custom?.delay ?? 0,
      ease: LUXURY_EASE,
    },
  }),
};

/* =========================================================================
   PRESET E — Text Reveal (Heading / Line Reveal)
========================================================================= */
export const textLineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '100%',
  },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    y: '0%',
    transition: {
      duration: custom?.duration ?? 0.8,
      delay: custom?.delay ?? 0,
      ease: LUXURY_EASE,
    },
  }),
};

/* =========================================================================
   PRESET F — Scale and Fade
   For circular product images, gauges, badges, and orbital components.
========================================================================= */
export const scaleRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    scale: 1,
    transition: transitionPreset(custom?.duration ?? 0.75, custom?.delay ?? 0),
  }),
};
