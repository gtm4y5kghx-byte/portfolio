'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function useProjectOverlay() {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Slide in on mount
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      overlayRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.3, ease: 'power2.out' },
    );
    tl.fromTo(
      panelRef.current,
      { x: '100%' },
      { x: '0%', duration: 0.4, ease: 'power2.out' },
      '<',
    );
  });

  function close() {
    const tl = gsap.timeline({
      onComplete: () => router.back(),
    });
    tl.to(panelRef.current, {
      x: '100%',
      duration: 0.3,
      ease: 'power2.in',
    });
    tl.to(
      overlayRef.current,
      { autoAlpha: 0, duration: 0.2, ease: 'power2.in' },
      '<0.1',
    );
  }

  return { overlayRef, panelRef, close };
}
