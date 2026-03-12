import type { PortableTextValue } from '@/components/ui/RichText';
import RichText from '@/components/ui/RichText';

interface FooterProps {
  content: PortableTextValue;
}

export default function Footer({ content }: FooterProps) {
  return (
    <footer>
      <p>© {new Date().getFullYear()}</p>
      <RichText value={content} />
    </footer>
  );
}
