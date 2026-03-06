interface SectionHeaderProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function SectionHeader({
  text,
  as: Tag = 'h1',
}: SectionHeaderProps) {
  const spaceIndex = text.indexOf(' ');

  if (spaceIndex === -1) {
    return <Tag>{text}</Tag>;
  }

  const firstWord = text.slice(0, spaceIndex);
  const rest = text.slice(spaceIndex + 1);

  return (
    <Tag>
      {firstWord} <span>{rest}</span>
    </Tag>
  );
}
