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
    <Card as="a" href={url}>
      {thumbnailUrl && <img src={thumbnailUrl} alt={thumbnailAlt ?? ''} />}
      <h3>{title}</h3>
      {subtitle && <p>{subtitle}</p>}
    </Card>
  );
}
