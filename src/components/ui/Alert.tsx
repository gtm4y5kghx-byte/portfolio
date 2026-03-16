const VARIANT_STYLES = {
  error: {
    container: 'bg-error/15 outline-error/25',
    icon: 'text-error',
  },
  success: {
    container: 'bg-success/15 outline-success/25',
    icon: 'text-success',
  },
};

const VARIANT_ICONS = {
  error:
    'M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z',
  success:
    'M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z',
};

function formatMessages(messages: string[]): string {
  if (messages.length === 1) return messages[0];
  if (messages.length === 2) return `${messages[0]} and ${messages[1]}`;
  return `${messages.slice(0, -1).join(', ')}, and ${messages[messages.length - 1]}`;
}

function defaultTitle(variant: string, count: number): string {
  if (variant === 'success') return 'Success';
  return count === 1 ? 'There was 1 error' : `There were ${count} errors`;
}

interface AlertProps {
  variant: keyof typeof VARIANT_STYLES;
  messages: string[];
  title?: string;
}

export default function Alert({ variant, messages, title }: AlertProps) {
  if (messages.length === 0) return null;

  const styles = VARIANT_STYLES[variant];

  return (
    <div role="alert" className={`rounded-md p-4 outline ${styles.container}`}>
      <div className="flex">
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`size-5 shrink-0 ${styles.icon}`}
        >
          <path
            d={VARIANT_ICONS[variant]}
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        <div className="ml-3">
          <p className="text-sm font-medium">
            {title ?? defaultTitle(variant, messages.length)}:{' '}
            <span className="font-normal text-fg-muted">
              {formatMessages(messages)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
