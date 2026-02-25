import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <button
        type="button"
        aria-label="Close modal backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 w-full max-w-xl rounded-3xl border border-dsua-100 bg-white p-6 shadow-card md:p-7"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="font-heading text-2xl font-bold text-dsua-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-dsua-200 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-dsua-600 transition hover:border-accent-500 hover:text-accent-600"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
