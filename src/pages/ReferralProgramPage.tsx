import { useMemo, useState } from 'react';
import { ReferralModal } from '../components/ReferralModal';

type RuleTab = 'submit' | 'requirements' | 'bonus' | 'exceptions';

const tabs: Array<{ key: RuleTab; label: string }> = [
  { key: 'submit', label: 'How can I submit a referral?' },
  { key: 'requirements', label: 'Requirements for the referral' },
  { key: 'bonus', label: 'How can I receive the bonus?' },
  { key: 'exceptions', label: 'You will not receive the bonus if:' }
];

const submitSteps = [
  'Fill in the necessary details and attach a CV or add a LinkedIn profile link.',
  'Your candidate is contacted within 2 business days.',
  'Get updates on your referral status.',
  'Your candidate joins Data Science UA or one of our recruitment partners.',
  'After successful probation, you receive your reward.'
];

export function ReferralProgramPage() {
  const [activeTab, setActiveTab] = useState<RuleTab>('submit');
  const [isReferralOpen, setIsReferralOpen] = useState(false);

  const tabContent = useMemo(() => {
    if (activeTab === 'submit') {
      return (
        <>
          <p className="text-lg font-semibold text-dsua-900">Simply fill in the form and include:</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <CheckItem text="The name of the vacancy you want to refer the person." />
            <CheckItem text="The candidate's name and surname." />
            <CheckItem text="The CV of the candidate or a LinkedIn profile link." />
          </div>

          <div className="mt-10">
            <h3 className="text-center font-heading text-2xl font-bold text-dsua-900 md:text-4xl">
              Your steps for referring a person
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-5">
              {submitSteps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-dsua-100 bg-white p-4 shadow-card">
                  <div className="mb-3 inline-grid h-9 w-9 place-items-center rounded-full border-2 border-accent-500 font-heading text-lg font-bold text-accent-600">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }

    if (activeTab === 'requirements') {
      return (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <CheckItem text="Referrals can be provided for any open vacancy." />
            <CheckItem text="One person can provide an unlimited number of referrals." />
            <CheckItem text="A referral is accepted if the candidate was not contacted in the previous 2 months and was not referred by someone else." />
            <CheckItem text="The referred candidate should be open to new opportunities and interested in cooperation with Data Science UA." />
          </div>

          <h3 className="mt-8 text-xl font-bold text-dsua-900">Who can refer a candidate?</h3>
          <div className="mt-4">
            <CheckItem text="Anyone can provide a referral, regardless of prior cooperation with Data Science UA. Candidates cannot refer themselves." />
          </div>
        </>
      );
    }

    if (activeTab === 'bonus') {
      return (
        <>
          <p className="text-lg font-semibold text-dsua-900">
            If your referral meets all job requirements and is hired, you will receive a special bonus.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <CheckItem text="The bonus is paid after the candidate successfully passes the 3-month probation period and manager review." />
            <CheckItem text="The amount of the bonus depends on candidate skills, seniority level, and the vacancy filled." />
          </div>
        </>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-2">
        <CheckItem text="The candidate has already applied for this position or their information was sent to a recruiter in the past 2 months." />
        <CheckItem text="The candidate is already being reviewed for this position by Data Science UA recruiting team." />
        <CheckItem text="The referral includes fake, outdated, or inaccurate data." />
        <CheckItem text="The candidate was already referred by someone else." />
      </div>
    );
  }, [activeTab]);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-6 md:px-8 md:pt-10">
      <section className="rounded-3xl border border-dsua-100 bg-gradient-to-br from-dsua-50 via-white to-cyan-50 px-6 py-8 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">Referral Program</p>
            <h1 className="mt-2 font-heading text-4xl font-bold text-dsua-900 md:text-6xl">Program Rules</h1>
          </div>
          <button
            type="button"
            onClick={() => setIsReferralOpen(true)}
            className="rounded-full bg-dsua-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
          >
            Submit Referral
          </button>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[330px_1fr]">
        <aside className="h-fit rounded-3xl border border-dsua-100 bg-white p-4 shadow-card lg:sticky lg:top-24">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`w-full rounded-xl border px-4 py-4 text-left text-lg font-bold transition ${
                  activeTab === tab.key
                    ? 'border-accent-200 bg-cyan-50 text-accent-600'
                    : 'border-transparent text-slate-800 hover:border-dsua-100 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <article className="rounded-3xl border border-dsua-100 bg-white p-5 shadow-card md:p-8">{tabContent}</article>
      </section>

      <ReferralModal open={isReferralOpen} onClose={() => setIsReferralOpen(false)} />
    </main>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-dsua-100 bg-dsua-50 p-4">
      <span className="mt-1 inline-grid h-8 w-8 place-items-center rounded-lg border-2 border-accent-500 text-lg font-bold text-accent-600">
        ✓
      </span>
      <p className="text-sm leading-relaxed text-slate-700 md:text-base">{text}</p>
    </div>
  );
}
