// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TechnologyCard from '../TechnologyCard';

const defaultProps = {
  name: 'TypeScript',
  iconUrl: 'https://example.com/ts.png',
  iconAlt: 'TypeScript logo',
};

describe('TechnologyCard', () => {
  it('renders the technology name', () => {
    render(<TechnologyCard {...defaultProps} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders the icon with alt text', () => {
    render(<TechnologyCard {...defaultProps} />);
    const img = screen.getByRole('img', { name: 'TypeScript logo' });
    expect(img).toHaveAttribute('src', 'https://example.com/ts.png');
  });

  it('does not render an image when iconUrl is not provided', () => {
    const { iconUrl, iconAlt, ...rest } = defaultProps;
    render(<TechnologyCard {...rest} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders as a div, not a link', () => {
    render(<TechnologyCard {...defaultProps} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
