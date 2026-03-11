interface SocialLink {
  platform: 'github' | 'linkedin';
  url: string;
}

interface ProfileCardProps {
  name: string;
  subtitle?: string;
  photoUrl?: string;
  photoAlt?: string;
  socialLinks?: SocialLink[];
}

export default function ProfileCard({
  name,
  subtitle,
  photoUrl,
  photoAlt,
  socialLinks,
}: ProfileCardProps) {
  return (
    <div>
      {photoUrl && <img src={photoUrl} alt={photoAlt ?? ''} />}
      <p>{name}</p>
      {subtitle && <p>{subtitle}</p>}
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
