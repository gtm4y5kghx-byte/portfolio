// @vitest-environment jsdom
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BioSection from '../BioSection';

const contentText = faker.lorem.paragraph();

const defaultProps = {
  title: faker.person.jobTitle(),
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

describe('BioSection', () => {
  it('renders the title as a heading', () => {
    render(<BioSection {...defaultProps} />);
    expect(
      screen.getByRole('heading', { name: defaultProps.title }),
    ).toBeInTheDocument();
  });

  it('renders the content', () => {
    render(<BioSection {...defaultProps} />);
    expect(screen.getByText(contentText)).toBeInTheDocument();
  });

  it('renders without content when not provided', () => {
    const { content, ...rest } = defaultProps;
    render(<BioSection {...rest} />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryByText(contentText)).not.toBeInTheDocument();
  });
});
