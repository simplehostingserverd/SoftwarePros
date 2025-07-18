'use client';

import { motion } from 'framer-motion';
import type { ComponentProps, ReactNode } from 'react';

// Create a client-side only motion wrapper to prevent SSG issues
interface MotionWrapperProps {
  children: ReactNode;
  initial?: ComponentProps<typeof motion.div>['initial'];
  animate?: ComponentProps<typeof motion.div>['animate'];
  transition?: ComponentProps<typeof motion.div>['transition'];
  whileInView?: ComponentProps<typeof motion.div>['whileInView'];
  viewport?: ComponentProps<typeof motion.div>['viewport'];
  className?: string;
  style?: React.CSSProperties;
}

export default function MotionWrapper({
  children,
  initial,
  animate,
  transition,
  whileInView,
  viewport,
  className,
  style,
}: MotionWrapperProps) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      whileInView={whileInView}
      viewport={viewport}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
