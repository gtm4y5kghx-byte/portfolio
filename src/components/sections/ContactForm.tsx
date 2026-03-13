'use client';

import { useState } from 'react';

interface ContactFormProps {
  action?: () => void | Promise<void>;
}

export default function ContactForm({ action }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    action?.();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Name + Email */}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-fg-muted text-sm">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-surface text-fg focus:ring-primary duration-default rounded-lg border-0 shadow-inner transition-shadow focus:ring-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-fg-muted text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-surface text-fg focus:ring-primary duration-default rounded-lg border-0 shadow-inner transition-shadow focus:ring-2"
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-fg-muted text-sm">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="bg-surface text-fg focus:ring-primary duration-default rounded-lg border-0 shadow-inner transition-shadow focus:ring-2"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="border-primary text-primary hover:bg-primary duration-default w-full cursor-pointer rounded-lg border bg-transparent py-3 font-semibold transition-colors hover:text-white"
      >
        Send
      </button>
    </form>
  );
}
