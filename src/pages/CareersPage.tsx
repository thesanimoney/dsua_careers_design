import { useMemo, useState } from 'react';
import { JobCard } from '../components/JobCard';
import { departments, employmentTypes, jobs, locations } from '../data/jobs';
import type { Job } from '../types/job';

function matches(job: Job, query: string, department: string, location: string, employmentType: string) {
  const normalizedQuery = query.toLowerCase().trim();
  const inQuery =
    normalizedQuery.length === 0 ||
    [job.title, job.department, job.location, job.summary, job.stack.join(' ')].join(' ').toLowerCase().includes(normalizedQuery);

  const inDepartment = department === 'All' || job.department === department;
  const inLocation = location === 'All' || job.location === location;
  const inEmployment = employmentType === 'All' || job.employment === employmentType;

  return inQuery && inDepartment && inLocation && inEmployment;
}

const sortOptions = [
  { key: 'newest', label: 'Newest first' },
  { key: 'oldest', label: 'Oldest first' },
  { key: 'salary', label: 'Highest salary range' }
] as const;

type SortKey = (typeof sortOptions)[number]['key'];

function getSalaryTop(salary: string) {
  const matches = salary.match(/\$([\d,]+)/g);
  if (!matches?.length) return 0;
  const last = matches[matches.length - 1]?.replace('$', '').replace(',', '');
  return Number(last);
}

export function CareersPage() {
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('All');
  const [location, setLocation] = useState('All');
  const [employmentType, setEmploymentType] = useState('All');
  const [sortBy, setSortBy] = useState<SortKey>('newest');

  const filteredJobs = useMemo(() => {
    const filtered = jobs.filter((job) => matches(job, query, department, location, employmentType));

    return filtered.sort((a, b) => {
      if (sortBy === 'newest') return a.postedDaysAgo - b.postedDaysAgo;
      if (sortBy === 'oldest') return b.postedDaysAgo - a.postedDaysAgo;
      return getSalaryTop(b.salary) - getSalaryTop(a.salary);
    });
  }, [query, department, location, employmentType, sortBy]);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-6 md:px-8 md:pt-10">
      <section className="relative overflow-hidden rounded-3xl border border-dsua-100 bg-gradient-to-br from-dsua-50 via-white to-cyan-50 px-5 py-8 md:px-10 md:py-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-500/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-dsua-500/10 blur-2xl" />

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">Careers at DS UA</p>
        <h1 className="mt-3 max-w-2xl font-heading text-3xl font-bold leading-tight text-dsua-900 md:text-5xl">
          Build AI products that matter, with teams that care about quality.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-dsua-700 md:text-base">
          Explore high-impact roles in Data Science, Engineering, and Delivery. We designed this experience for faster discovery:
          clear filters, stronger vacancy structure, and smoother apply flow.
        </p>

        <div className="mt-8 grid gap-3 text-sm font-semibold text-dsua-800 md:flex md:items-center md:gap-6">
          <p>
            <span className="text-2xl font-bold text-dsua-900">{jobs.length}</span> open roles
          </p>
          <p>
            <span className="text-2xl font-bold text-dsua-900">{new Set(jobs.map((job) => job.location)).size}</span> locations
          </p>
          <p>
            <span className="text-2xl font-bold text-dsua-900">{new Set(jobs.map((job) => job.department)).size}</span> teams
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-3xl border border-dsua-100 bg-white p-5 shadow-card lg:sticky lg:top-24">
          <h2 className="font-heading text-lg font-bold text-dsua-900">Find your fit</h2>
          <p className="mt-1 text-sm text-dsua-600">Refine roles by team, location, or work format.</p>

          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="search" className="text-xs font-semibold uppercase tracking-wide text-dsua-500">
                Search
              </label>
              <input
                id="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Role, skill, keyword..."
                className="mt-2 w-full rounded-xl border border-dsua-200 px-3 py-2 text-sm outline-none transition focus:border-accent-500"
              />
            </div>

            <FilterSelect label="Department" value={department} options={departments} onChange={setDepartment} />
            <FilterSelect label="Location" value={location} options={locations} onChange={setLocation} />
            <FilterSelect label="Employment" value={employmentType} options={employmentTypes} onChange={setEmploymentType} />
          </div>

          <button
            type="button"
            onClick={() => {
              setQuery('');
              setDepartment('All');
              setLocation('All');
              setEmploymentType('All');
              setSortBy('newest');
            }}
            className="mt-6 w-full rounded-full border border-dsua-200 px-4 py-2 text-sm font-semibold text-dsua-700 transition hover:border-accent-500 hover:text-accent-600"
          >
            Clear filters
          </button>
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-dsua-700">
              {filteredJobs.length} vacancies found
            </p>
            <div className="flex items-center gap-2 text-sm">
              <label htmlFor="sort-by" className="font-semibold text-dsua-600">
                Sort:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortKey)}
                className="rounded-lg border border-dsua-200 px-2 py-1.5 text-sm outline-none transition focus:border-accent-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="rounded-3xl border border-dsua-100 bg-white p-8 text-center shadow-card">
              <h3 className="font-heading text-xl font-bold text-dsua-900">No matches right now</h3>
              <p className="mt-2 text-sm text-dsua-600">
                Try fewer filters or explore all openings.
              </p>
            </div>
          ) : (
            <div className="grid animate-fade-up gap-4 md:grid-cols-2">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-dsua-500">{label}</label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-dsua-200 px-3 py-2 text-sm outline-none transition focus:border-accent-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
