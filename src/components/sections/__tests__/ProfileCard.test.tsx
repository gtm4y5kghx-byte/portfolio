// @vitest-environment jsdom
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProfileCard from '../ProfileCard';

const mockBio = [
  {
    _type: 'block',
    _key: '1',
    children: [{ _type: 'span', _key: '2', text: 'Bio text here' }],
  },
];

const defaultProps = {
  name: faker.person.fullName(),
  bio: mockBio,
  photoUrl: faker.image.avatar(),
  photoAlt: faker.person.fullName(),
  socialLinks: [
    { platform: 'github' as const, url: faker.internet.url() },
    { platform: 'linkedin' as const, url: faker.internet.url() },
  ],
};

describe('ProfileCard', () => {
  it('renders the name', () => {
    render(<ProfileCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
  });

  it('renders bio when provided', () => {
    render(<ProfileCard {...defaultProps} />);
    expect(screen.getByText('Bio text here')).toBeInTheDocument();
  });

  it('does not render bio when not provided', () => {
    const { bio, ...rest } = defaultProps;
    render(<ProfileCard {...rest} />);
    expect(screen.queryByText('Bio text here')).not.toBeInTheDocument();
  });

  it('renders the photo with alt text', () => {
    render(<ProfileCard {...defaultProps} />);
    const img = screen.getByRole('img', { name: defaultProps.photoAlt });
    expect(img).toHaveAttribute('src', defaultProps.photoUrl);
  });

  it('does not render a photo when photoUrl is not provided', () => {
    const { photoUrl, photoAlt, ...rest } = defaultProps;
    render(<ProfileCard {...rest} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders social links with accessible names', () => {
    render(<ProfileCard {...defaultProps} />);
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      defaultProps.socialLinks[0].url,
    );
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      defaultProps.socialLinks[1].url,
    );
  });

  it('does not render social links when not provided', () => {
    const { socialLinks, ...rest } = defaultProps;
    render(<ProfileCard {...rest} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
