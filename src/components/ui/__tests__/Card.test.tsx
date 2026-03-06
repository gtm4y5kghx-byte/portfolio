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

  it('renders header slot in a header element', () => {
    render(<Card header={<h3>Title</h3>}>Body</Card>);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders footer slot in a footer element', () => {
    render(<Card footer={<span>Footer</span>}>Body</Card>);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('does not render header or footer when not provided', () => {
    render(<Card>Body</Card>);
    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  });
});
