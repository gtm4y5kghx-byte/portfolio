'use client';

import { useRef } from 'react';
import { useCarousel } from '@/hooks/useCarousel';
import ReferenceSlide from './ReferenceSlide';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface ReferenceCarouselProps {
  testimonials: Testimonial[];
}

export default function ReferenceCarousel({
  testimonials,
}: ReferenceCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const { activeIndex, goToSlide, pause, resume } = useCarousel(
    containerRef,
    slidesRef,
    testimonials.length,
  );

  return (
    <div ref={containerRef} className="relative" onMouseEnter={pause} onMouseLeave={resume}>
      {/* Slides — stacked */}
      <div className="grid overflow-hidden" style={{ gridTemplate: '1fr / 1fr' }}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) slidesRef.current[i] = el;
            }}
            style={{ gridArea: '1 / 1' }}
          >
            <ReferenceSlide
              quote={t.quote}
              author={t.author}
              role={t.role}
              company={t.company}
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Go to reference ${i + 1}`}
            className={`h-2 w-2 cursor-pointer rounded-full transition-colors ${
              i === activeIndex ? 'bg-primary' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
