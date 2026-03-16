// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Alert from '../Alert';

describe('Alert', () => {
  it('renders nothing when messages is empty', () => {
    const { container } = render(<Alert variant="error" messages={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders an alert role', () => {
    render(<Alert variant="error" messages={['Name is required']} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders a single message inline', () => {
    render(<Alert variant="error" messages={['Name is required']} />);
    expect(screen.getByText(/There was 1 error/)).toBeInTheDocument();
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('joins two messages with "and"', () => {
    render(
      <Alert
        variant="error"
        messages={['Name is required', 'Email is required']}
      />,
    );
    expect(
      screen.getByText(/Name is required and Email is required/),
    ).toBeInTheDocument();
  });

  it('joins three messages with commas and "and"', () => {
    render(
      <Alert
        variant="error"
        messages={[
          'Name is required',
          'Email is required',
          'Message is required',
        ]}
      />,
    );
    expect(
      screen.getByText(
        /Name is required, Email is required, and Message is required/,
      ),
    ).toBeInTheDocument();
  });

  it('renders a default title based on message count', () => {
    render(
      <Alert
        variant="error"
        messages={['Name is required', 'Email is required']}
      />,
    );
    expect(screen.getByText(/There were 2 errors/)).toBeInTheDocument();
  });

  it('renders a custom title when provided', () => {
    render(
      <Alert variant="error" title="Oops" messages={['Name is required']} />,
    );
    expect(screen.getByText(/Oops/)).toBeInTheDocument();
  });
});
