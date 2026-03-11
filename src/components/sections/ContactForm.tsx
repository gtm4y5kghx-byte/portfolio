'use client';

import { useState } from 'react';

export const BUDGET_OPTIONS = [
  { label: 'Select a budget', value: '' },
  { label: 'Under $5k', value: 'under-5k' },
  { label: '$5k – $10k', value: '5k-10k' },
  { label: '$10k – $25k', value: '10k-25k' },
  { label: '$25k+', value: '25k-plus' },
  { label: 'Not sure', value: 'not-sure' },
] as const;

interface ContactFormProps {
  action?: () => void | Promise<void>;
}

export default function ContactForm({ action }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    action?.();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="budget">Budget</label>
      <select
        id="budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      >
        {BUDGET_OPTIONS.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit">Send</button>
    </form>
  );
}
