import type { PortableTextValue } from '@/components/ui/RichText';
import RichText from '@/components/ui/RichText';

interface FooterProps {
  content: PortableTextValue;
}

export default function Footer({ content }: FooterProps) {
  return (
    <footer className="text-fg-muted flex items-center justify-between border-t border-white/10 py-6 text-sm">
      <p>© {new Date().getFullYear()}</p>
      <RichText value={content} />
    </footer>
  );
}
