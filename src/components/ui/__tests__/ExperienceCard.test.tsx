// @vitest-environment jsdom
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ExperienceCard from '../ExperienceCard';

const defaultProps = {
  company: faker.company.name(),
  role: faker.person.jobTitle(),
  description: faker.lorem.sentence(),
  startDate: 'Jan 2020',
  endDate: 'Present',
};

describe('ExperienceCard', () => {
  it('renders the company name', () => {
    render(<ExperienceCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.company)).toBeInTheDocument();
  });

  it('renders the role', () => {
    render(<ExperienceCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.role)).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<ExperienceCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('renders the date range', () => {
    render(<ExperienceCard {...defaultProps} />);
    expect(
      screen.getByText(`${defaultProps.startDate} - ${defaultProps.endDate}`),
    ).toBeInTheDocument();
  });

  it('renders as a div, not a link', () => {
    render(<ExperienceCard {...defaultProps} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('does not render a role when not provided', () => {
    const { role, ...rest } = defaultProps;
    render(<ExperienceCard {...rest} />);
    expect(screen.queryByText(defaultProps.role)).not.toBeInTheDocument();
  });
});
