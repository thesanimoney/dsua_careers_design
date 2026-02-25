import type { Job } from '../types/job';

export const jobs: Job[] = [
  {
    id: '87575',
    slug: 'middle-qc-engineer-87575',
    title: 'Middle QC Engineer',
    department: 'Quality Assurance',
    location: 'Kyiv, Ukraine',
    level: 'Middle',
    employment: 'Full-time',
    workMode: 'Hybrid',
    salary: '$2,300 - $3,100 / month',
    postedDaysAgo: 2,
    summary:
      'Own test strategy and quality gates for a data platform product used by enterprise clients in EU and US.',
    stack: ['Playwright', 'TypeScript', 'API Testing', 'CI/CD'],
    responsibilities: [
      'Build and maintain test suites for UI and API layers.',
      'Collaborate with product and engineering teams during grooming and planning.',
      'Set up quality checks in CI and monitor release health.',
      'Drive defect triage and improve overall test coverage.'
    ],
    requirements: [
      '3+ years in manual and automation QA roles.',
      'Practical experience with JavaScript or TypeScript test frameworks.',
      'Strong understanding of API testing practices.',
      'Comfort with Agile delivery and cross-functional collaboration.'
    ],
    niceToHave: ['Performance testing experience.', 'Hands-on AWS basics.'],
    benefits: [
      'Flexible schedule and hybrid format.',
      'Internal English and leadership programs.',
      'Medical insurance with mental health support.',
      'Paid certifications and conference budget.'
    ],
    process: ['Intro call', 'Tech interview', 'Final interview', 'Offer']
  },
  {
    id: 'dsua-212',
    slug: 'devops-engineer-2',
    title: 'DevOps Engineer',
    department: 'Platform Engineering',
    location: 'Lviv, Ukraine',
    level: 'Middle/Senior',
    employment: 'Full-time',
    workMode: 'Remote',
    salary: '$3,500 - $5,200 / month',
    postedDaysAgo: 1,
    summary:
      'Scale DS UA cloud infrastructure, improve deployment speed, and enforce reliability standards across client projects.',
    stack: ['AWS', 'Terraform', 'Kubernetes', 'GitHub Actions'],
    responsibilities: [
      'Manage cloud infrastructure using Infrastructure as Code.',
      'Optimize CI/CD pipelines and release automation.',
      'Implement monitoring, alerting, and incident response practices.',
      'Support engineering teams with security and performance improvements.'
    ],
    requirements: [
      '3+ years in DevOps/SRE roles.',
      'Production experience with AWS and Kubernetes.',
      'Strong IaC background with Terraform.',
      'Experience building and maintaining CI/CD workflows.'
    ],
    niceToHave: ['FinOps knowledge.', 'Multi-region deployment experience.'],
    benefits: [
      'Remote-first policy with coworking support.',
      'Annual performance review and compensation updates.',
      'Extra paid days off for study and volunteering.',
      'Equipment budget for your home office.'
    ],
    process: ['Recruiter intro', 'DevOps challenge', 'Leadership interview', 'Offer']
  },
  {
    id: 'dsua-301',
    slug: 'senior-data-scientist',
    title: 'Senior Data Scientist',
    department: 'Data Science',
    location: 'Warsaw, Poland',
    level: 'Senior',
    employment: 'Full-time',
    workMode: 'Remote',
    salary: '$4,800 - $6,800 / month',
    postedDaysAgo: 4,
    summary:
      'Lead ML initiatives from discovery to production and mentor data scientists across client-facing teams.',
    stack: ['Python', 'MLOps', 'NLP', 'LLMs'],
    responsibilities: [
      'Design and validate ML models aligned with business KPIs.',
      'Partner with Data Engineers to productionize models.',
      'Own experiment tracking and model evaluation standards.',
      'Mentor mid-level specialists and support technical hiring.'
    ],
    requirements: [
      '5+ years building applied ML systems.',
      'Strong statistics and experimentation background.',
      'Hands-on experience with MLOps and model monitoring.',
      'Ability to explain technical tradeoffs to non-technical audiences.'
    ],
    niceToHave: ['Experience with recommender systems.', 'Public speaking at tech events.'],
    benefits: [
      'Transparent growth tracks for IC and management paths.',
      'Dedicated learning budget with personal development plans.',
      'Multi-country team retreats twice per year.',
      'Premium health insurance package.'
    ],
    process: ['Talent call', 'ML case study', 'Client interview', 'Offer']
  },
  {
    id: 'dsua-195',
    slug: 'frontend-engineer-react',
    title: 'Frontend Engineer (React)',
    department: 'Engineering',
    location: 'Bucharest, Romania',
    level: 'Middle',
    employment: 'Full-time',
    workMode: 'Hybrid',
    salary: '$2,900 - $4,000 / month',
    postedDaysAgo: 5,
    summary:
      'Create modern data-intensive interfaces for analytics products used by global business teams.',
    stack: ['React', 'TypeScript', 'Tailwind', 'GraphQL'],
    responsibilities: [
      'Deliver product features from discovery through release.',
      'Improve frontend architecture and reusable UI components.',
      'Collaborate with designers to keep UX quality high.',
      'Write tests and own frontend release quality.'
    ],
    requirements: [
      '3+ years with React in production.',
      'Good TypeScript and state management fundamentals.',
      'Experience with REST or GraphQL APIs.',
      'Ability to balance delivery speed with code quality.'
    ],
    niceToHave: ['Data visualization experience.', 'Storybook ownership.'],
    benefits: [
      'Flexible hybrid format with modern office hubs.',
      'Quarterly wellness package.',
      'Regular design and frontend guild sessions.',
      'Paid English speaking club.'
    ],
    process: ['Screening', 'Frontend interview', 'Team fit call', 'Offer']
  },
  {
    id: 'dsua-411',
    slug: 'project-manager-data-products',
    title: 'Project Manager (Data Products)',
    department: 'Delivery',
    location: 'Remote, Europe',
    level: 'Middle/Senior',
    employment: 'Full-time',
    workMode: 'Remote',
    salary: '$3,200 - $4,600 / month',
    postedDaysAgo: 3,
    summary:
      'Drive cross-functional delivery for AI and analytics initiatives with distributed teams and enterprise stakeholders.',
    stack: ['Agile', 'Jira', 'Risk Management', 'Stakeholder Comms'],
    responsibilities: [
      'Own project timelines, scope, and budget alignment.',
      'Coordinate engineering, product, and client stakeholders.',
      'Track project risks and build mitigation plans.',
      'Lead sprint ceremonies and release planning.'
    ],
    requirements: [
      '4+ years of software delivery management experience.',
      'Strong written and spoken English communication.',
      'Confidence in managing enterprise stakeholders.',
      'Practical understanding of data/AI project lifecycles.'
    ],
    niceToHave: ['PMP or Scrum certification.', 'Prior consulting background.'],
    benefits: [
      'Performance-based bonus model.',
      'Personal mentor for growth in leadership tracks.',
      'Remote onboarding with dedicated buddy program.',
      'Training budget for PM certifications.'
    ],
    process: ['Recruiter call', 'Case interview', 'Final manager interview', 'Offer']
  }
];

export const departments = ['All', ...new Set(jobs.map((job) => job.department))];
export const locations = ['All', ...new Set(jobs.map((job) => job.location))];
export const employmentTypes = ['All', ...new Set(jobs.map((job) => job.employment))];
