import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeInRightVariants } from './variants';

interface FadeInRightProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
}

export const FadeInRight: React.FC<FadeInRightProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  threshold = 0.15
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={fadeInRightVariants}
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
