import type { PortableTextValue } from '@/components/ui/RichText';
import RichText from '@/components/ui/RichText';
import SectionHeader from '@/components/sections/SectionHeader';

interface BioSectionProps {
  title: string;
  content?: PortableTextValue;
}

export default function BioSection({ title, content }: BioSectionProps) {
  return (
    <section className="gap-content flex flex-col">
      <SectionHeader
        as="h2"
        text={title}
        className="text-8xl leading-none font-bold tracking-tight uppercase"
      />
      <RichText value={content} />
    </section>
  );
}
