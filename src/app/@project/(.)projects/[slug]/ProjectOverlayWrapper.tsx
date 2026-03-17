'use client';

import type { ReactNode } from 'react';
import { useProjectOverlay } from '@/hooks/useProjectOverlay';
import ProjectOverlay from '@/components/ui/ProjectOverlay';

interface ProjectOverlayWrapperProps {
  children: ReactNode;
}

export default function ProjectOverlayWrapper({
  children,
}: ProjectOverlayWrapperProps) {
  const { overlayRef, panelRef, close } = useProjectOverlay();

  return (
    <ProjectOverlay overlayRef={overlayRef} panelRef={panelRef} onClose={close}>
      {children}
    </ProjectOverlay>
  );
}
