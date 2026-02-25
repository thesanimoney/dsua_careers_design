import { Link } from 'react-router-dom';
import type { Job } from '../types/job';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <article className="group rounded-3xl border border-dsua-100 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent-500 md:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="rounded-full bg-dsua-50 px-3 py-1 text-dsua-700">{job.department}</span>
        <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700">{job.workMode}</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">{job.employment}</span>
      </div>

      <h3 className="font-heading text-xl font-bold text-dsua-900">{job.title}</h3>
      <p className="mt-1 text-sm text-dsua-600">
        {job.location} • {job.level}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{job.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.stack.map((tech) => (
          <span key={tech} className="rounded-lg border border-dsua-100 px-2 py-1 text-xs font-medium text-dsua-600">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Link
          to={`/vacancy/${job.slug}`}
          className="rounded-full bg-dsua-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-600"
        >
          View Vacancy
        </Link>
      </div>
      <p className="mt-3 text-xs text-slate-400">Published {job.postedDaysAgo} days ago</p>
    </article>
  );
}
