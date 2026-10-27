import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { staggerContainerVariants, staggerItemVariants } from './variants';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  threshold?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerChildren = 0.12,
  delayChildren = 0.05,
  threshold = 0.12
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: '0px 0px -40px 0px' }}
      custom={{ staggerChildren, delayChildren }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
};
