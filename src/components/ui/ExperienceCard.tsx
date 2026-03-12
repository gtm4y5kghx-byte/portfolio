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
        <>
          <h3>{company}</h3>
          {role && <p>{role}</p>}
        </>
      }
      footer={
        <time>
          {startDate} - {endDate}
        </time>
      }
    >
      <RichText value={description} />
    </Card>
  );
}
