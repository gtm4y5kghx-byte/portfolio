// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import Hero from '../Hero';

const defaultProps = {
  name: faker.person.fullName(),
};

describe('Hero', () => {
  it('renders the name as an h1', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      defaultProps.name,
    );
  });

  it('renders bio when provided', () => {
    const bio = [
      {
        _type: 'block',
        _key: 'k1',
        children: [{ _type: 'span', _key: 's1', text: 'Hello world' }],
      },
    ];
    render(<Hero {...defaultProps} bio={bio} />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('does not render bio when not provided', () => {
    const { container } = render(<Hero {...defaultProps} />);
    expect(container.querySelector('.max-w-2xl')).not.toBeInTheDocument();
  });

  it('renders social links with correct aria labels', () => {
    const socialLinks = [
      { platform: 'github' as const, url: 'https://github.com/test' },
      { platform: 'linkedin' as const, url: 'https://linkedin.com/in/test' },
    ];
    render(<Hero {...defaultProps} socialLinks={socialLinks} />);
    expect(screen.getByLabelText('GitHub')).toHaveAttribute(
      'href',
      'https://github.com/test',
    );
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute(
      'href',
      'https://linkedin.com/in/test',
    );
  });

  it('does not render social links when not provided', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('opens social links in a new tab', () => {
    const socialLinks = [
      { platform: 'github' as const, url: 'https://github.com/test' },
    ];
    render(<Hero {...defaultProps} socialLinks={socialLinks} />);
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('target', '_blank');
  });
});
