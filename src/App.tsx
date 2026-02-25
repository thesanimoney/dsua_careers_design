import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { CareersPage } from './pages/CareersPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ReferralProgramPage } from './pages/ReferralProgramPage';
import { VacancyPage } from './pages/VacancyPage';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/careers" replace />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/referral-program" element={<ReferralProgramPage />} />
        <Route path="/vacancy/:slug" element={<VacancyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <footer className="border-t border-dsua-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-dsua-600 md:px-8">
          <p>© {new Date().getFullYear()} Data Science UA</p>
          <p>Redesigned careers experience • DS UA branding + SoftServe-style UX patterns</p>
        </div>
      </footer>
    </div>
  );
}
