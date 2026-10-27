import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import {
  fadeInUpVariants,
  fadeInLeftVariants,
  fadeInRightVariants,
  scaleRevealVariants,
  imageRevealVariants,
  LUXURY_EASE
} from './animations/variants';

export * from './animations';

export interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade-up' | 'scale' | 'fade-in' | 'slide-left' | 'slide-right' | 'blur-in';
  delay?: number; // milliseconds
  duration?: number; // seconds
  threshold?: number;
  distance?: number;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  duration = 0.75,
  threshold = 0.12,
  distance = 28
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const delayInSeconds = delay / 1000;

  const getVariants = (): Variants => {
    switch (variant) {
      case 'scale':
        return scaleRevealVariants;
      case 'slide-left':
        return fadeInLeftVariants;
      case 'slide-right':
        return fadeInRightVariants;
      case 'fade-in':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration, delay: delayInSeconds, ease: LUXURY_EASE }
          }
        };
      case 'blur-in':
        return {
          hidden: { opacity: 0, filter: 'blur(8px)', y: 16 },
          visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: { duration, delay: delayInSeconds, ease: LUXURY_EASE }
          }
        };
      case 'fade-up':
      default:
        return distance !== 28
          ? {
              hidden: { opacity: 0, y: distance },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration, delay: delayInSeconds, ease: LUXURY_EASE }
              }
            }
          : fadeInUpVariants;
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: '0px 0px -40px 0px' }}
      custom={{ delay: delayInSeconds, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
