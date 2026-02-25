import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { JobCard } from '../components/JobCard';
import { SubmitApplicationModal } from '../components/SubmitApplicationModal';
import { jobs } from '../data/jobs';

export function VacancyPage() {
  const { slug } = useParams();
  const job = jobs.find((item) => item.slug === slug);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [shareNotice, setShareNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const shareNoticeTimeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (shareNoticeTimeout.current) {
        window.clearTimeout(shareNoticeTimeout.current);
      }
    };
  }, []);

  if (!job) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="rounded-3xl border border-dsua-100 bg-white p-10 text-center shadow-card">
          <h1 className="font-heading text-3xl font-bold text-dsua-900">Vacancy not found</h1>
          <p className="mt-3 text-sm text-dsua-600">The role may have been closed or moved.</p>
          <Link
            to="/careers"
            className="mt-6 inline-flex rounded-full bg-dsua-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Back to all vacancies
          </Link>
        </div>
      </main>
    );
  }

  const relatedJobs = jobs.filter((item) => item.slug !== job.slug && item.department === job.department).slice(0, 2);

  const showShareNotice = (notice: { type: 'success' | 'error'; message: string }) => {
    setShareNotice(notice);
    if (shareNoticeTimeout.current) {
      window.clearTimeout(shareNoticeTimeout.current);
    }
    shareNoticeTimeout.current = window.setTimeout(() => setShareNotice(null), 2200);
  };

  const handleShareVacancy = async () => {
    const shareUrl = window.location.href;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement('textarea');
        input.value = shareUrl;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.focus();
        input.select();
        const copied = document.execCommand('copy');
        document.body.removeChild(input);

        if (!copied) {
          throw new Error('Fallback copy failed');
        }
      }

      showShareNotice({ type: 'success', message: 'Vacancy link copied to clipboard.' });
    } catch {
      showShareNotice({ type: 'error', message: 'Copy failed. Please copy the URL from your browser bar.' });
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-6 md:px-8 md:pt-10">
      <div className="rounded-3xl border border-dsua-100 bg-gradient-to-r from-dsua-50 via-white to-cyan-50 px-6 py-8 md:px-10">
        <Link to="/careers" className="text-sm font-semibold text-accent-600 hover:text-accent-500">
          ← Back to vacancies
        </Link>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">{job.department}</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-dsua-900 md:text-5xl">{job.title}</h1>
        <p className="mt-3 text-sm text-dsua-700 md:text-base">
          {job.location} • {job.workMode} • {job.employment}
        </p>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <article className="space-y-6">
          <Section title="Role Overview">
            <p className="text-sm leading-relaxed text-slate-700 md:text-base">{job.summary}</p>
          </Section>

          <Section title="Responsibilities">
            <BulletList items={job.responsibilities} />
          </Section>

          <Section title="Requirements">
            <BulletList items={job.requirements} />
          </Section>

          <Section title="Nice to Have">
            <BulletList items={job.niceToHave} />
          </Section>

          <Section title="Benefits">
            <BulletList items={job.benefits} />
          </Section>

          <Section title="Hiring Process">
            <ol className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
              {job.process.map((step, index) => (
                <li key={step} className="rounded-xl border border-dsua-100 bg-dsua-50 px-3 py-2 font-medium">
                  {index + 1}. {step}
                </li>
              ))}
            </ol>
          </Section>
        </article>

        <aside className="h-fit rounded-3xl border border-dsua-100 bg-white p-5 shadow-card lg:sticky lg:top-24">
          <h2 className="font-heading text-xl font-bold text-dsua-900">Apply for this role</h2>
          <p className="mt-2 text-sm text-dsua-600">
            Fast-track your profile and get feedback quickly from our hiring team.
          </p>

          <dl className="mt-5 space-y-3 text-sm">
            <InfoItem label="Compensation" value={job.salary} />
            <InfoItem label="Level" value={job.level} />
            <InfoItem label="Location" value={job.location} />
            <InfoItem label="Work model" value={job.workMode} />
          </dl>

          <button
            type="button"
            onClick={() => setIsApplicationOpen(true)}
            className="mt-6 w-full rounded-full bg-dsua-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Submit Application
          </button>
          <button
            type="button"
            onClick={handleShareVacancy}
            className="mt-3 w-full rounded-full border border-dsua-200 px-4 py-3 text-sm font-semibold text-dsua-700 transition hover:border-accent-500 hover:text-accent-600"
          >
            Share Vacancy
          </button>
        </aside>
      </section>

      {relatedJobs.length > 0 && (
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-dsua-900">Similar openings</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedJobs.map((related) => (
              <JobCard key={related.id} job={related} />
            ))}
          </div>
        </section>
      )}
      <SubmitApplicationModal
        open={isApplicationOpen}
        jobTitle={job.title}
        onClose={() => setIsApplicationOpen(false)}
      />
      {shareNotice && (
        <div className="pointer-events-none fixed bottom-5 right-5 z-50">
          <div
            role="status"
            aria-live="polite"
            className={`rounded-xl border px-4 py-2 text-sm font-semibold shadow-card ${
              shareNotice.type === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-rose-200 bg-rose-50 text-rose-700'
            }`}
          >
            {shareNotice.message}
          </div>
        </div>
      )}
    </main>
  );
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="rounded-3xl border border-dsua-100 bg-white p-5 shadow-card md:p-6">
      <h2 className="font-heading text-xl font-bold text-dsua-900">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-slate-700 md:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="rounded-xl border border-dsua-100 bg-dsua-50 px-3 py-2">
      <dt className="text-xs font-semibold uppercase tracking-wide text-dsua-500">{label}</dt>
      <dd className="mt-1 font-semibold text-dsua-800">{value}</dd>
    </div>
  );
}
