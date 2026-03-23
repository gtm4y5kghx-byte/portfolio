import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/sanity/services';
import { urlFor } from '@/lib/sanity/image';
import ProjectOverlayWrapper from './ProjectOverlayWrapper';
import ProjectDetail from '@/components/ui/ProjectDetail';

interface ProjectOverlayPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectOverlayPage({
  params,
}: ProjectOverlayPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <ProjectOverlayWrapper>
      <ProjectDetail
        title={project.title}
        subtitle={project.subtitle}
        imageUrl={
          project.projectImage
            ? urlFor(project.projectImage)
                .width(1200)
                .format('webp')
                .quality(80)
                .url()
            : undefined
        }
        content={project.content}
        url={project.url}
        repositories={project.repositories}
      />
    </ProjectOverlayWrapper>
  );
}
