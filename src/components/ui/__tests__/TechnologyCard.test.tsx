// @vitest-environment jsdom
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TechnologyCard from '../TechnologyCard';

const defaultProps = {
  name: faker.lorem.word(),
  iconUrl: faker.image.url(),
  iconAlt: faker.lorem.sentence(),
};

describe('TechnologyCard', () => {
  it('renders the technology name', () => {
    render(<TechnologyCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
  });

  it('renders the icon with alt text', () => {
    render(<TechnologyCard {...defaultProps} />);
    const img = screen.getByRole('img', { name: defaultProps.iconAlt });
    expect(img).toHaveAttribute('src', defaultProps.iconUrl);
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
