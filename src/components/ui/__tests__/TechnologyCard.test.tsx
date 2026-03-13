// @vitest-environment jsdom
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TechnologyCard from '../TechnologyCard';

const defaultProps = {
  name: faker.lorem.word(),
};

describe('TechnologyCard', () => {
  it('renders the technology name', () => {
    render(<TechnologyCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
  });

  it('renders as a div, not a link', () => {
    render(<TechnologyCard {...defaultProps} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
