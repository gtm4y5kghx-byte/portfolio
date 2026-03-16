'use client';

import { useActionState } from 'react';
import { submitContact } from '@/app/actions/contact';

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, null);

  if (state?.success) {
    return (
      <p className="text-success text-lg font-semibold">
        Thanks! I&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
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
            className="bg-surface text-fg focus:ring-primary duration-default rounded-lg border-0 shadow-inner transition-shadow focus:ring-2"
          />
          {state?.errors?.name && (
            <p className="text-error text-sm">{state.errors.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-fg-muted text-md font-bold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="bg-surface text-fg focus:ring-primary duration-default rounded-lg border-0 shadow-inner transition-shadow focus:ring-2"
          />
          {state?.errors?.email && (
            <p className="text-error text-sm">{state.errors.email}</p>
          )}
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
          className="bg-surface text-fg focus:ring-primary duration-default rounded-lg border-0 shadow-inner transition-shadow focus:ring-2"
        />
        {state?.errors?.message && (
          <p className="text-error text-sm">{state.errors.message}</p>
        )}
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
