import { type ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
} & ({ as?: 'div' } | { as: 'a'; href: string });

export default function Card(props: CardProps) {
  const { children, header, footer, className, as: Tag = 'div' } = props;

  return (
    <Tag
      className={className}
      {...(Tag === 'a'
        ? { href: (props as { href: string }).href, target: '_blank' }
        : {})}
    >
      {header && <header>{header}</header>}
      {children}
      {footer && <footer>{footer}</footer>}
    </Tag>
  );
}
