'use client';

import { useState, useActionState } from 'react';
import { submitContact } from '@/app/actions/contact';
import Alert from '@/components/ui/Alert';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [state, formAction, isPending] = useActionState(
    async (prev: Awaited<ReturnType<typeof submitContact>> | null, formData: FormData) => {
      const result = await submitContact(prev, formData);
      if (result.success) {
        setName('');
        setEmail('');
        setMessage('');
      }
      return result;
    },
    null,
  );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state?.success && (
        <Alert
          variant="success"
          messages={["Thanks! I'll be in touch."]}
        />
      )}
      {state && !state.success && (
        <Alert
          variant="error"
          messages={Object.values(state.errors).filter(Boolean) as string[]}
        />
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-fg-muted text-md font-bold">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-surface text-fg focus:ring-primary duration-default rounded-lg border-0 shadow-inner transition-shadow focus:ring-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-fg-muted text-md font-bold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-surface text-fg focus:ring-primary duration-default rounded-lg border-0 shadow-inner transition-shadow focus:ring-2"
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-fg-muted text-md font-bold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-surface text-fg focus:ring-primary duration-default rounded-lg border-0 shadow-inner transition-shadow focus:ring-2"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="border-primary text-primary hover:bg-primary duration-default w-full cursor-pointer rounded-lg border bg-transparent py-3 font-semibold transition-colors hover:text-white disabled:opacity-50"
      >
        {isPending ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
