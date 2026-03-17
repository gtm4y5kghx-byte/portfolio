'use client';

import type { ReactNode, RefObject } from 'react';

interface ProjectOverlayProps {
  children: ReactNode;
  overlayRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

export default function ProjectOverlay({
  children,
  overlayRef,
  panelRef,
  onClose,
}: ProjectOverlayProps) {
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex justify-end"
      style={{ visibility: 'hidden' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="bg-canvas relative h-full w-full overflow-y-auto md:max-w-3xl"
      >
        {/* Header with close button */}
        <div className="sticky top-0 z-10 flex justify-end p-4">
          <button
            onClick={onClose}
            aria-label="Close project"
            className="duration-default hover:bg-white/10 cursor-pointer rounded-full p-2 text-white transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="pb-8">{children}</div>
      </div>
    </div>
  );
}
