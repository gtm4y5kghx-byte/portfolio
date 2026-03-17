import type { PortableTextValue } from '@/components/ui/RichText';
import RichText from '@/components/ui/RichText';
import { SOCIAL_ICONS, EMAIL_ICON, type Platform } from '@/lib/icons';
import SectionHeader from './SectionHeader';

interface HeroProps {
  name: string;
  bio: PortableTextValue;
  email: string;
  socialLinks: Array<{ platform: Platform; url: string }>;
}

export default function Hero({ name, bio, email, socialLinks }: HeroProps) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader text={name} id="projects-heading" />
      <div className="max-w-2xl">
        <RichText value={bio} />
      </div>
      <SocialLinks socialLinks={socialLinks} email={email} />
    </section>
  );
}

interface SocialLinksProps {
  socialLinks: Array<{ platform: Platform; url: string }>;
  email: string;
}

export function SocialLinks({ socialLinks, email }: SocialLinksProps) {
  return (
    <ul className="flex gap-3">
      {socialLinks.map(({ platform, url }) => {
        const icon = SOCIAL_ICONS[platform];
        return (
          <li key={platform}>
            <a
              href={url}
              aria-label={icon.label}
              target="_blank"
              className="bg-primary duration-default hover:bg-surface inline-block rounded-full p-2 text-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d={icon.path} />
              </svg>
            </a>
          </li>
        );
      })}
      <li>
        <a
          href={`mailto:${email}`}
          aria-label={EMAIL_ICON.label}
          className="bg-primary duration-default hover:bg-surface inline-block rounded-full p-2 text-white transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path d={EMAIL_ICON.path} />
          </svg>
        </a>
      </li>
    </ul>
  );
}
