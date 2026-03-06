import Card from '@/components/ui/Card';

interface TechnologyCardProps {
  name: string;
  iconUrl?: string;
  iconAlt?: string;
}

export default function TechnologyCard({
  name,
  iconUrl,
  iconAlt,
}: TechnologyCardProps) {
  return (
    <Card>
      {iconUrl && <img src={iconUrl} alt={iconAlt ?? ''} />}
      <span>{name}</span>
    </Card>
  );
}
