'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { ReactNode } from 'react';

interface AnimatedDivProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animation?: 'fade' | 'slide-left' | 'slide-right';
  delay?: number;
}

export default function AnimatedDiv({
  children,
  className = '',
  style,
  animation = 'fade',
  delay = 0,
}: AnimatedDivProps) {
  const animationClass =
    animation === 'fade'
      ? 'animate-on-scroll'
      : animation === 'slide-left'
        ? 'animate-on-scroll-left'
        : 'animate-on-scroll-right';

  const ref = useScrollAnimation({ animationClass });

  const combinedStyle = {
    ...style,
    animationDelay: delay ? `${delay}ms` : undefined,
  };

  return (
    <div ref={ref} className={className} style={combinedStyle}>
      {children}
    </div>
  );
}
