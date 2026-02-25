import { useState, type DragEvent, type ReactNode } from 'react';
import { Modal } from './Modal';

interface ReferralModalProps {
  open: boolean;
  onClose: () => void;
}

export function ReferralModal({ open, onClose }: ReferralModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [candidateProfileLink, setCandidateProfileLink] = useState('');
  const [candidateCvFile, setCandidateCvFile] = useState<File | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleClose = () => {
    setSubmitted(false);
    setCandidateProfileLink('');
    setCandidateCvFile(null);
    setIsDraggingFile(false);
    setSubmitError('');
    onClose();
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDraggingFile(false);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    setCandidateCvFile(file);
    setSubmitError('');
  };

  return (
    <Modal open={open} title="Referral Program" onClose={handleClose}>
      {submitted ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Referral sent. Thank you for helping us grow the DS UA team.
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!candidateCvFile && candidateProfileLink.trim().length === 0) {
              setSubmitError('Add a CV file or provide candidate LinkedIn/CV link.');
              return;
            }
            setSubmitError('');
            setSubmitted(true);
          }}
        >
          <p className="text-sm leading-relaxed text-dsua-700">
            Refer a specialist and our talent team will review the profile quickly.
          </p>
          <Field label="Your name">
            <input
              required
              placeholder="Your full name"
              className="w-full rounded-xl border border-dsua-200 px-3 py-2 text-sm outline-none transition focus:border-accent-500"
            />
          </Field>
          <Field label="Your email">
            <input
              required
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-dsua-200 px-3 py-2 text-sm outline-none transition focus:border-accent-500"
            />
          </Field>
          <Field label="Candidate name">
            <input
              required
              placeholder="Candidate full name"
              className="w-full rounded-xl border border-dsua-200 px-3 py-2 text-sm outline-none transition focus:border-accent-500"
            />
          </Field>
          <Field label="Candidate email">
            <input
              required
              type="email"
              placeholder="candidate@example.com"
              className="w-full rounded-xl border border-dsua-200 px-3 py-2 text-sm outline-none transition focus:border-accent-500"
            />
          </Field>
          <Field label="Candidate LinkedIn or CV link (optional)">
            <input
              value={candidateProfileLink}
              onChange={(event) => setCandidateProfileLink(event.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-dsua-200 px-3 py-2 text-sm outline-none transition focus:border-accent-500"
            />
          </Field>
          <Field label="Candidate CV file">
            <label
              onDragEnter={() => setIsDraggingFile(true)}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDraggingFile(true);
              }}
              onDragLeave={() => setIsDraggingFile(false)}
              onDrop={handleDrop}
              className={`block cursor-pointer rounded-xl border-2 border-dashed p-4 text-center transition ${
                isDraggingFile ? 'border-accent-500 bg-cyan-50' : 'border-dsua-200 bg-dsua-50'
              }`}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setCandidateCvFile(file);
                  setSubmitError('');
                }}
              />
              <p className="text-sm font-semibold text-dsua-800">Drop candidate CV here or click to upload</p>
              <p className="mt-1 text-xs text-dsua-600">Accepted: PDF, DOC, DOCX</p>
              {candidateCvFile && (
                <p className="mt-2 text-xs font-semibold text-accent-600">
                  Selected: {candidateCvFile.name}
                </p>
              )}
            </label>
          </Field>
          {submitError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
              {submitError}
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-full bg-dsua-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Submit Referral
          </button>
        </form>
      )}
    </Modal>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-dsua-500">{label}</span>
      {children}
    </label>
  );
}
