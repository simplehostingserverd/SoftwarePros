'use client';

import { useEffect, useRef } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
}

export function useScrollAnimation({
  threshold = 0.1,
  rootMargin = '0px',
  animationClass = 'animate-on-scroll',
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Add the animation class initially
    element.classList.add(animationClass);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, animationClass]);

  return ref;
}
