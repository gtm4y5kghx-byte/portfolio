import { useRef, useState, useCallback, useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function useCarousel(
  containerRef: RefObject<HTMLDivElement | null>,
  slidesRef: RefObject<HTMLDivElement[]>,
  count: number,
) {
  const isAnimating = useRef(false);
  const isPaused = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = useCallback(
    (nextIndex: number) => {
      if (isAnimating.current || nextIndex === activeIndex) return;
      isAnimating.current = true;

      const currentSlide = slidesRef.current[activeIndex];
      const nextSlide = slidesRef.current[nextIndex];
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
          setActiveIndex(nextIndex);
        },
      });

      // Current slide out — exits left
      tl.to(currentSlide.querySelector('[data-quote]'), {
        opacity: 0,
        x: -30,
        duration: 0.3,
      });

      tl.to(
        currentSlide.querySelector('[data-author]'),
        { opacity: 0, x: -20, duration: 0.2 },
        '<0.1',
      );

      tl.set(currentSlide, { autoAlpha: 0 });

      // Next slide in — enters from right
      tl.set(nextSlide, { autoAlpha: 1 });

      tl.fromTo(
        nextSlide.querySelector('[data-quote]'),
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4 },
      );

      tl.fromTo(
        nextSlide.querySelector('[data-author]'),
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.3 },
        '<0.15',
      );

    },
    [activeIndex, slidesRef],
  );

  useGSAP(
    () => {
      slidesRef.current.forEach((slide, i) => {
        gsap.set(slide, { autoAlpha: i === activeIndex ? 1 : 0 });
      });
    },
    { scope: containerRef, dependencies: [activeIndex] },
  );

  // Auto-advance every 5s
  useEffect(() => {
    if (count <= 1) return;

    const timer = setInterval(() => {
      if (!isPaused.current) {
        goToSlide((activeIndex + 1) % count);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIndex, count, goToSlide, slidesRef]);

  const pause = useCallback(() => { isPaused.current = true; }, []);
  const resume = useCallback(() => { isPaused.current = false; }, []);

  return { activeIndex, goToSlide, pause, resume };
}
