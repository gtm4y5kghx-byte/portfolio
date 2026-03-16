// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import Hero from '../Hero';

const defaultProps = {
  name: faker.person.fullName(),
  bio: [
    {
      _type: 'block' as const,
      _key: 'k1',
      children: [{ _type: 'span' as const, _key: 's1', text: 'Hello world' }],
    },
  ],
  email: faker.internet.email(),
  socialLinks: [
    { platform: 'github' as const, url: 'https://github.com/test' },
    { platform: 'linkedin' as const, url: 'https://linkedin.com/in/test' },
  ],
};

describe('Hero', () => {
  it('renders the name as an h1', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      defaultProps.name,
    );
  });

  it('renders bio', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders social links with correct aria labels', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByLabelText('GitHub')).toHaveAttribute(
      'href',
      'https://github.com/test',
    );
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute(
      'href',
      'https://linkedin.com/in/test',
    );
  });

  it('opens social links in a new tab', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('target', '_blank');
  });

  it('renders email link as mailto', () => {
    render(<Hero {...defaultProps} />);
    const link = screen.getByLabelText('Email');
    expect(link).toHaveAttribute('href', `mailto:${defaultProps.email}`);
    expect(link).not.toHaveAttribute('target');
  });
});
