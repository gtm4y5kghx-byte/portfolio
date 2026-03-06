// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectCard from '../ProjectCard';

const defaultProps = {
  title: 'NajmAI',
  subtitle: 'SaaS Framer Template',
  url: 'https://example.com',
  thumbnailUrl: 'https://example.com/image.jpg',
  thumbnailAlt: 'NajmAI screenshot',
};

describe('ProjectCard', () => {
  it('renders the title', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByText('NajmAI')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByText('SaaS Framer Template')).toBeInTheDocument();
  });

  it('does not render a subtitle when not provided', () => {
    const { subtitle, ...rest } = defaultProps;
    render(<ProjectCard {...rest} />);
    expect(screen.queryByText('SaaS Framer Template')).not.toBeInTheDocument();
  });

  it('renders as a link to the project url', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

  it('renders the thumbnail with alt text', () => {
    render(<ProjectCard {...defaultProps} />);
    const img = screen.getByRole('img', { name: 'NajmAI screenshot' });
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('does not render an image when thumbnailUrl is not provided', () => {
    const { thumbnailUrl, thumbnailAlt, ...rest } = defaultProps;
    render(<ProjectCard {...rest} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
