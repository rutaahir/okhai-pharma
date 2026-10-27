import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeInUpVariants } from './variants';

interface TextRevealProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  duration?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  as: Component = 'h2',
  className = '',
  delay = 0,
  duration = 0.8
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const MotionComponent = motion[Component];

  return (
    <div className="overflow-hidden">
      <MotionComponent
        variants={fadeInUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
        custom={{ delay, duration }}
        className={className}
      >
        {children}
      </MotionComponent>
    </div>
  );
};

interface SectionHeadingRevealProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  action?: React.ReactNode;
}

export const SectionHeadingReveal: React.FC<SectionHeadingRevealProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  action
}) => {
  const isCentered = align === 'center';

  return (
    <div className={`mb-10 sm:mb-14 ${isCentered ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center gap-2.5 mb-3 ${isCentered ? 'justify-center' : ''}`}
        >
          {typeof eyebrow === 'string' ? (
            <span className="text-xs uppercase tracking-widest font-mono text-[#5B9A3C] font-semibold">
              {eyebrow}
            </span>
          ) : (
            eyebrow
          )}
        </motion.div>
      )}

      <div className={`flex flex-col ${!isCentered && action ? 'md:flex-row md:items-end md:justify-between' : ''} gap-4`}>
        <div className="flex-1">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#1E3D2A] leading-tight ${titleClassName}`}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className={`mt-3 text-xs sm:text-sm text-[#1E3D2A]/75 leading-relaxed max-w-2xl ${isCentered ? 'mx-auto' : ''} ${subtitleClassName}`}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {action && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
          >
            {action}
          </motion.div>
        )}
      </div>
    </div>
  );
};
