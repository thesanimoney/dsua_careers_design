import { Link, NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-dsua-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/careers" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-dsua-900 text-sm font-bold text-white">
            DS
          </div>
          <div>
            <p className="font-heading text-lg font-bold text-dsua-900">DATA SCIENCE UA</p>
            <p className="-mt-1 text-xs font-semibold uppercase tracking-wide text-dsua-500">Careers</p>
          </div>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-semibold text-dsua-700">
          <NavLink
            to="/careers"
            className={({ isActive }) =>
              `transition-colors hover:text-accent-600 ${isActive ? 'text-accent-600' : ''}`
            }
          >
            Vacancies
          </NavLink>
          <NavLink
            to="/referral-program"
            className={({ isActive }) =>
              `rounded-full border px-4 py-2 transition hover:border-accent-500 hover:text-accent-600 ${
                isActive ? 'border-accent-400 text-accent-600' : 'border-dsua-200 text-dsua-700'
              }`
            }
          >
            Referral Program
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
