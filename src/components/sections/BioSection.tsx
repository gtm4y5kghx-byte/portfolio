import type { PortableTextBlock } from '@portabletext/react';
import RichText from '@/components/ui/RichText';
import SectionHeader from '@/components/sections/SectionHeader';

interface BioSectionProps {
  title: string;
  content?: PortableTextBlock[];
}

export default function BioSection({ title, content }: BioSectionProps) {
  return (
    <section>
      <SectionHeader text={title} as="h2" />
      <RichText value={content} />
    </section>
  );
}
