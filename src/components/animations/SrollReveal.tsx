'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const DIRECTIONS = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -40 },
  right: { x: 40 },
  none: {},
} as const;

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: keyof typeof DIRECTIONS;
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: 'scroll' | 'load';
  start?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  stagger,
  trigger = 'scroll',
  start = 'top 85%',
  once = true,
}: ScrollRevealProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      // Respect reduced motion
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(container.current, { clearProps: 'all' });
        container.current.classList.remove('scroll-reveal-hidden');
        return;
      }

      // Determine animation targets
      // If stagger is set, animate grandchildren (e.g., cards inside a grid div)
      // Otherwise, animate the container itself
      const targets = stagger
        ? container.current.children[0]?.children
        : container.current;

      if (stagger && (!targets || (targets as HTMLCollection).length === 0)) {
        // No children to stagger — just reveal the container
        gsap.set(container.current, { autoAlpha: 1 });
        return;
      }

      const fromVars: gsap.TweenVars = {
        autoAlpha: 0,
        ...DIRECTIONS[direction],
        duration,
        delay,
        ease: 'power2.out',
        ...(stagger ? { stagger } : {}),
      };

      // Add ScrollTrigger config for scroll-triggered animations
      if (trigger === 'scroll') {
        fromVars.scrollTrigger = {
          trigger: container.current,
          start,
          toggleActions: once
            ? 'play none none none'
            : 'play none none reverse',
        };
      }

      gsap.from(targets, fromVars);
    },
    { scope: container },
  );

  return (
    <div ref={container} className={`scroll-reveal-hidden ${className ?? ''}`}>
      {children}
    </div>
  );
}
