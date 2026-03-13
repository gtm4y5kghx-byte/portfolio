// @vitest-environment jsdom
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ContactForm from '../ContactForm';

describe('ContactForm', () => {
  it('renders a name input', () => {
    render(<ContactForm />);
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
  });

  it('renders an email input', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('renders a message textarea', () => {
    render(<ContactForm />);
    expect(
      screen.getByRole('textbox', { name: /message/i }),
    ).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('allows the user to type in the name field', async () => {
    const user = userEvent.setup();
    const name = faker.person.fullName();
    render(<ContactForm />);
    const input = screen.getByRole('textbox', { name: /name/i });
    await user.type(input, name);
    expect(input).toHaveValue(name);
  });

  it('allows the user to type in the email field', async () => {
    const user = userEvent.setup();
    const email = faker.internet.email();
    render(<ContactForm />);
    const input = screen.getByLabelText(/email/i);
    await user.type(input, email);
    expect(input).toHaveValue(email);
  });

  it('allows the user to type in the message field', async () => {
    const user = userEvent.setup();
    const message = faker.lorem.paragraph();
    render(<ContactForm />);
    const textarea = screen.getByRole('textbox', { name: /message/i });
    await user.type(textarea, message);
    expect(textarea).toHaveValue(message);
  });

  it('calls the action with form data on submit', async () => {
    const user = userEvent.setup();
    const action = vi.fn();
    render(<ContactForm action={action} />);
    await user.click(screen.getByRole('button', { name: /send/i }));
    expect(action).toHaveBeenCalledOnce();
  });
});
