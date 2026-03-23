// @vitest-environment jsdom
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectCard from '../ProjectCard';

const defaultProps = {
  title: faker.commerce.productName(),
  slug: faker.helpers.slugify(faker.commerce.productName()).toLowerCase(),
  subtitle: faker.commerce.productDescription(),
  displayMode: 'image' as const,
  imageUrl: faker.image.url(),
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

  it('renders as a link to the project detail page', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/projects/${defaultProps.slug}`,
    );
  });

  it('renders the image when imageUrl is provided', () => {
    const { container } = render(<ProjectCard {...defaultProps} />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', defaultProps.imageUrl);
  });

  it('renders gradient background when displayMode is textOnly', () => {
    const { imageUrl, ...rest } = defaultProps;
    const { container } = render(
      <ProjectCard {...rest} displayMode="textOnly" />,
    );
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.querySelector('.bg-linear-to-br')).toBeInTheDocument();
  });
});
