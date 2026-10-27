import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeInUpVariants } from './variants';

interface FadeInUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  distance?: number;
}

export const FadeInUp: React.FC<FadeInUpProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.75,
  threshold = 0.15,
  distance = 28
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const customVariants = distance !== 28 ? {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  } : fadeInUpVariants;

  return (
    <motion.div
      variants={customVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: '0px 0px -40px 0px' }}
      custom={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
