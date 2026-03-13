interface SectionHeaderProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  id?: string;
}

export default function SectionHeader({
  text,
  as: Tag = 'h1',
  className = 'text-8xl leading-none font-bold tracking-tight uppercase',
  id,
}: SectionHeaderProps) {
  const spaceIndex = text.indexOf(' ');

  if (spaceIndex === -1) {
    return (
      <Tag className={className} id={id}>
        {text}
      </Tag>
    );
  }

  const firstWord = text.slice(0, spaceIndex);
  const rest = text.slice(spaceIndex + 1);

  return (
    <Tag className={className} id={id}>
      {firstWord} <span className="text-accent block">{rest}</span>
    </Tag>
  );
}
