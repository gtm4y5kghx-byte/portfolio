import RichText, { type PortableTextValue } from './RichText';
import { SOCIAL_ICONS } from '@/lib/icons';
import ScrollReveal from '@/components/animations/SrollReveal';

interface Repository {
  name: string;
  url: string;
}

interface ProjectDetailProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  content?: PortableTextValue;
  url?: string;
  repositories?: Repository[];
}

export default function ProjectDetail({
  title,
  subtitle,
  imageUrl,
  content,
  url,
  repositories,
}: ProjectDetailProps) {
  return (
    <article className="flex flex-col gap-8">
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="aspect-video w-full object-cover"
        />
      )}

      <ScrollReveal trigger="load" stagger={0.1} direction="up">
        <div className="flex flex-col gap-4 px-8">
          <div>
            <h1 className="text-accent text-4xl font-bold">{title}</h1>
            {subtitle && (
              <p className="text-fg-muted mt-1 text-lg">{subtitle}</p>
            )}
          </div>

          {(url || repositories?.length) && (
            <div className="flex flex-wrap gap-3">
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary duration-default hover:bg-surface inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                  Visit Site
                </a>
              )}
              {repositories?.map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="duration-default inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path d={SOCIAL_ICONS.github.path} />
                  </svg>
                  {repo.name}
                </a>
              ))}
            </div>
          )}

          <RichText value={content} />
        </div>
      </ScrollReveal>
    </article>
  );
}
