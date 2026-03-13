import type { PortableTextValue } from '@/components/ui/RichText';
import Card from '@/components/ui/Card';
import RichText from '@/components/ui/RichText';

interface ExperienceCardProps {
  company: string;
  role?: string;
  description?: PortableTextValue;
  startDate: string;
  endDate: string;
}

export default function ExperienceCard({
  company,
  role,
  description,
  startDate,
  endDate,
}: ExperienceCardProps) {
  return (
    <Card className="flex flex-col gap-2 py-6">
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-bold">{company}</h3>
        <time className="text-sm text-white/60">
          {startDate} - {endDate}
        </time>
      </div>
      {role && <p className="text-primary text-sm font-semibold">{role}</p>}
      {description && <RichText value={description} />}
    </Card>
  );
}
