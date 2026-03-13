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
      className="group relative overflow-hidden rounded-lg shadow-lg"
    >
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={thumbnailAlt ?? ''}
          className="duration-default aspect-video w-full object-cover transition-transform group-hover:scale-105"
        />
      )}
      <div className="bg-canvas/70 hover-target duration-default group-hover:bg-primary absolute inset-x-0 bottom-0 px-4 transition-colors">
        {/* Background sweep */}
        <div className="bg-primary duration-default absolute inset-0 -translate-x-full transition-transform group-hover:translate-x-0" />
        {/* Content */}
        <div className="relative z-10 flex items-center justify-between px-4 py-3">
          <div>
            <h3>{title}</h3>
            {subtitle && <p className="text-white">{subtitle}</p>}
          </div>
          {/* Arrow icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
            className="duration-default h-5 w-5 translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </div>
      </div>
    </Card>
  );
}
