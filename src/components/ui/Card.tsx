import { type ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
} & ({ as?: 'div' } | { as: 'a'; href: string });

export default function Card(props: CardProps) {
  const { children, className, as: Tag = 'div' } = props;

  return (
    <Tag
      className={className}
      {...(Tag === 'a' ? { href: (props as { href: string }).href } : {})}
    >
      {children}
    </Tag>
  );
}
