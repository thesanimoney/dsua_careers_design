import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-7xl place-items-center px-4 py-16 md:px-8">
      <div className="rounded-3xl border border-dsua-100 bg-white p-10 text-center shadow-card">
        <h1 className="font-heading text-3xl font-bold text-dsua-900">Page not found</h1>
        <p className="mt-2 text-sm text-dsua-600">The page you requested does not exist.</p>
        <Link
          to="/careers"
          className="mt-6 inline-flex rounded-full bg-dsua-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
        >
          Open careers
        </Link>
      </div>
    </main>
  );
}
