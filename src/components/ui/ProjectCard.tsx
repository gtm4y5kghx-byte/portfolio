import Card from '@/components/ui/Card';

interface ProjectCardProps {
  title: string;
  subtitle?: string;
  url: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
}

export default function ProjectCard({
  title,
  subtitle,
  url,
  thumbnailUrl,
  thumbnailAlt,
}: ProjectCardProps) {
  return (
    <Card
      as="a"
      href={url}
      className="group relative overflow-hidden rounded-lg"
    >
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={thumbnailAlt ?? ''}
          className="duration-default aspect-video w-full object-cover transition-transform group-hover:scale-105"
        />
      )}
      <div className="bg-canvas/70 absolute inset-x-0 bottom-0 px-4 py-3">
        <h3>{title}</h3>
        {subtitle && <p className="text-fg-muted">{subtitle}</p>}
      </div>
    </Card>
  );
}
