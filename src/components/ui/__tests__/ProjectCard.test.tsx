// @vitest-environment jsdom
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectCard from '../ProjectCard';

const defaultProps = {
  title: faker.commerce.productName(),
  subtitle: faker.commerce.productDescription(),
  url: faker.internet.url(),
  thumbnailUrl: faker.image.url(),
  thumbnailAlt: faker.lorem.sentence(),
};

describe('ProjectCard', () => {
  it('renders the title', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
  });

  it('does not render a subtitle when not provided', () => {
    const { subtitle, ...rest } = defaultProps;
    render(<ProjectCard {...rest} />);
    expect(screen.queryByText(defaultProps.subtitle)).not.toBeInTheDocument();
  });

  it('renders as a link to the project url', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', defaultProps.url);
  });

  it('renders the thumbnail with alt text', () => {
    render(<ProjectCard {...defaultProps} />);
    const img = screen.getByRole('img', { name: defaultProps.thumbnailAlt });
    expect(img).toHaveAttribute('src', defaultProps.thumbnailUrl);
  });

  it('does not render an image when thumbnailUrl is not provided', () => {
    const { thumbnailUrl, thumbnailAlt, ...rest } = defaultProps;
    render(<ProjectCard {...rest} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
