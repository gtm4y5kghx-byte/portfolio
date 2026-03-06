import Card from '@/components/ui/Card';

interface ExperienceCardProps {
  company: string;
  role?: string;
  description: string;
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
      <p>{description}</p>
    </Card>
  );
}
