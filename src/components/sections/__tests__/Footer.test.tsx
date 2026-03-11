// @vitest-environment jsdom
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from '../Footer';

const contentText = faker.person.fullName();

const defaultProps = {
  content: [
    {
      _type: 'block' as const,
      _key: 'b1',
      style: 'normal' as const,
      children: [
        { _type: 'span' as const, _key: 's1', text: contentText, marks: [] },
      ],
      markDefs: [],
    },
  ],
};

describe('Footer', () => {
  it('renders the content', () => {
    render(<Footer {...defaultProps} />);
    expect(screen.getByText(contentText)).toBeInTheDocument();
  });

  it('renders the current year', () => {
    render(<Footer {...defaultProps} />);
    expect(
      screen.getByText(new RegExp(String(new Date().getFullYear()))),
    ).toBeInTheDocument();
  });

  it('renders the copyright symbol', () => {
    render(<Footer {...defaultProps} />);
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });
});
