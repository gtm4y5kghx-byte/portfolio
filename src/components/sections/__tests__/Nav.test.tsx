// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Nav, { NAV_ITEMS } from '../Nav';

describe('Nav', () => {
  it('renders a nav element with an accessible label', () => {
    render(<Nav />);
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'Main navigation',
    );
  });

  it.each(NAV_ITEMS)(
    'renders a link to $href with accessible name "$label"',
    ({ label, href }) => {
      render(<Nav />);
      const link = screen.getByRole('link', { name: label });
      expect(link).toHaveAttribute('href', href);
    },
  );

  it('renders exactly 5 navigation links', () => {
    render(<Nav />);
    expect(screen.getAllByRole('link')).toHaveLength(5);
  });
});
