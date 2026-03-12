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
    <div>
      {photoUrl && <img src={photoUrl} alt={photoAlt ?? ''} />}
      <p>{name}</p>
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
