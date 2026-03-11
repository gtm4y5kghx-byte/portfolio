import { PortableText, type PortableTextBlock } from '@portabletext/react';

interface RichTextProps {
  value?: PortableTextBlock[];
}

export default function RichText({ value }: RichTextProps) {
  if (!value) return null;
  return <PortableText value={value} />;
}
