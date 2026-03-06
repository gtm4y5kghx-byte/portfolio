// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card from '../Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Hello</Card>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders as a div by default', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content').tagName).toBe('DIV');
  });

  it('renders as an anchor when as="a" is provided', () => {
    render(
      <Card as="a" href="https://example.com">
        Link Card
      </Card>,
    );
    const link = screen.getByRole('link', { name: 'Link Card' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('applies additional className when provided', () => {
    render(<Card className="custom-class">Content</Card>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });
});
