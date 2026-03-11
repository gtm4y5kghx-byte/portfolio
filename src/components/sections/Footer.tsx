import type { PortableTextBlock } from '@portabletext/react';
import RichText from '@/components/ui/RichText';

interface FooterProps {
  content: PortableTextBlock[];
}

export default function Footer({ content }: FooterProps) {
  return (
    <footer>
      <p>© {new Date().getFullYear()}</p>
      <RichText value={content} />
    </footer>
  );
}
