import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/sanity/services';
import { urlFor } from '@/lib/sanity/image';
import ProjectDetail from '@/components/ui/ProjectDetail';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 py-8 md:max-w-3xl">
      <ProjectDetail
        title={project.title}
        subtitle={project.subtitle}
        imageUrl={
          project.projectImage
            ? urlFor(project.projectImage).width(1200).format('webp').quality(80).url()
            : undefined
        }
        content={project.content}
        url={project.url}
        githubUrl={project.githubUrl}
      />
    </div>
  );
}
