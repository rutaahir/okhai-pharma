import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { imageRevealVariants } from './variants';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  aspectRatio?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  aspectRatio,
  delay = 0,
  duration = 0.9,
  threshold = 0.15
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-hidden relative ${className}`} style={{ aspectRatio }}>
        <img src={src} alt={alt} className={`w-full h-full object-cover ${imageClassName}`} />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden relative ${className}`} style={{ aspectRatio }}>
      <motion.img
        src={src}
        alt={alt}
        variants={imageRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: threshold, margin: '0px 0px -40px 0px' }}
        custom={{ delay, duration }}
        className={`w-full h-full object-cover ${imageClassName}`}
      />
    </div>
  );
};
