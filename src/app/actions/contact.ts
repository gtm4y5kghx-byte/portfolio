'use server';

type ContactErrors = { name?: string; email?: string; message?: string };

type ContactResult =
  | { success: true }
  | { success: false; errors: ContactErrors };

function validate(
  name: string,
  email: string,
  message: string,
): ContactErrors | null {
  const errors: ContactErrors = {};

  if (!name?.trim()) errors.name = 'Name is required';
  if (!email?.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Invalid email';
  if (!message?.trim()) errors.message = 'Message is required';

  return Object.keys(errors).length > 0 ? errors : null;
}

export async function submitContact(
  _prevState: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  const errors = validate(name, email, message);
  if (errors) return { success: false, errors };

  console.log('Contact form submission:', { name, email, message });

  return { success: true };
}
