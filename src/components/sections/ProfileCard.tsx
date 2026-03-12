import type { PortableTextValue } from '@/components/ui/RichText';
import RichText from '@/components/ui/RichText';

interface SocialLink {
  platform: 'github' | 'linkedin';
  url: string;
}

interface ProfileCardProps {
  name: string;
  bio?: PortableTextValue;
  photoUrl?: string;
  photoAlt?: string;
  socialLinks?: SocialLink[];
}

export default function ProfileCard({
  name,
  bio,
  photoUrl,
  photoAlt,
  socialLinks,
}: ProfileCardProps) {
  return (
    <div className="rounded-lg bg-white px-6 py-8 text-black">
      {photoUrl && <img src={photoUrl} alt={photoAlt ?? ''} />}
      <h1>{name}</h1>
      {bio && <RichText value={bio} />}
      {socialLinks && socialLinks.length > 0 && (
        <ul>
          {socialLinks.map(({ platform, url }) => (
            <li key={platform}>
              <a href={url} aria-label={platform}>
                <span aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
