// @vitest-environment jsdom
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RichText from '../RichText';

const plainText = faker.lorem.sentence();
const boldText = faker.lorem.word();
const linkText = faker.lorem.word();
const linkUrl = faker.internet.url();

describe('RichText', () => {
  it('renders plain text content', () => {
    render(
      <RichText
        value={[
          {
            _type: 'block',
            _key: 'b1',
            style: 'normal',
            children: [
              { _type: 'span', _key: 's1', text: plainText, marks: [] },
            ],
            markDefs: [],
          },
        ]}
      />,
    );
    expect(screen.getByText(plainText)).toBeInTheDocument();
  });

  it('renders bold text', () => {
    render(
      <RichText
        value={[
          {
            _type: 'block',
            _key: 'b1',
            style: 'normal',
            children: [
              { _type: 'span', _key: 's1', text: boldText, marks: ['strong'] },
            ],
            markDefs: [],
          },
        ]}
      />,
    );
    expect(screen.getByText(boldText).tagName).toBe('STRONG');
  });

  it('renders a hyperlink', () => {
    render(
      <RichText
        value={[
          {
            _type: 'block',
            _key: 'b1',
            style: 'normal',
            children: [
              { _type: 'span', _key: 's1', text: linkText, marks: ['link1'] },
            ],
            markDefs: [{ _type: 'link', _key: 'link1', href: linkUrl }],
          },
        ]}
      />,
    );
    expect(screen.getByRole('link', { name: linkText })).toHaveAttribute(
      'href',
      linkUrl,
    );
  });

  it('renders nothing when value is not provided', () => {
    const { container } = render(<RichText />);
    expect(container).toBeEmptyDOMElement();
  });
});
