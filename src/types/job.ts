export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  level: string;
  employment: 'Full-time' | 'Part-time' | 'Contract';
  workMode: 'Remote' | 'Hybrid' | 'Office';
  salary: string;
  postedDaysAgo: number;
  summary: string;
  stack: string[];
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  process: string[];
}
