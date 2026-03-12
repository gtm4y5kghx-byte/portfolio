import { PortableText, type PortableTextBlock } from '@portabletext/react';

export type PortableTextValue = Array<{
  _type: string;
  _key: string;
  [key: string]: unknown;
}>;

interface RichTextProps {
  value?: PortableTextValue;
}

export default function RichText({ value }: RichTextProps) {
  if (!value) return null;
  return <PortableText value={value as unknown as PortableTextBlock[]} />;
}
