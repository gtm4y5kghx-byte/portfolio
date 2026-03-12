interface SectionHeaderProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

export default function SectionHeader({
  text,
  as: Tag = 'h1',
  className,
}: SectionHeaderProps) {
  const spaceIndex = text.indexOf(' ');

  if (spaceIndex === -1) {
    return <Tag className={className}>{text}</Tag>;
  }

  const firstWord = text.slice(0, spaceIndex);
  const rest = text.slice(spaceIndex + 1);

  return (
    <Tag className={className}>
      {firstWord} <span className="text-fg-subtle block">{rest}</span>
    </Tag>
  );
}
