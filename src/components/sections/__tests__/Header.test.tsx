// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SectionHeader from '../SectionHeader';

describe('SectionHeader', () => {
  it('renders the full text as a heading', () => {
    render(<SectionHeader text="Recent Projects" />);
    expect(
      screen.getByRole('heading', { name: 'Recent Projects' }),
    ).toBeInTheDocument();
  });

  it('wraps words after the first in a span', () => {
    render(<SectionHeader text="Recent Projects" />);
    const heading = screen.getByRole('heading');
    const span = heading.querySelector('span');
    expect(span).toHaveTextContent('Projects');
  });

  it('defaults to an h1 element', () => {
    render(<SectionHeader text="Recent Projects" />);
    expect(screen.getByRole('heading').tagName).toBe('H1');
  });

  it('renders the specified heading level', () => {
    render(<SectionHeader text="Recent Projects" as="h2" />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders single-word text without a span', () => {
    render(<SectionHeader text="Projects" />);
    const heading = screen.getByRole('heading');
    expect(heading.querySelector('span')).toBeNull();
    expect(heading).toHaveTextContent('Projects');
  });
});
