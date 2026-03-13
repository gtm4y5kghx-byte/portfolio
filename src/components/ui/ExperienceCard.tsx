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
    <Card
      header={
        <div className="flex flex-col gap-2">
          <h2>{company}</h2>
          {role && (
            <p>
              <strong>{role}</strong>
            </p>
          )}
        </div>
      }
      footer={
        <time>
          {startDate} - {endDate}
        </time>
      }
    >
      <div className="mt-4 mb-2">
        <RichText value={description} />
      </div>
    </Card>
  );
}
