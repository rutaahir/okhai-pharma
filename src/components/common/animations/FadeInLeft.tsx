import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeInLeftVariants } from './variants';

interface FadeInLeftProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
}

export const FadeInLeft: React.FC<FadeInLeftProps> = ({
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
      variants={fadeInLeftVariants}
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
