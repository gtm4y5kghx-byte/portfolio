import { PortableText, type PortableTextBlock } from '@portabletext/react';

interface SocialLink {
  platform: 'github' | 'linkedin';
  url: string;
}

interface ProfileCardProps {
  name: string;
  bio?: PortableTextBlock[];
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
      <h2>{name}</h2>
      {bio && <PortableText value={bio} />}
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
