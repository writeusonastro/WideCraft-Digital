export type AppTheme = 'dark-midnight' | 'cyber-emerald' | 'light-executive';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: 'layout' | 'trending-up' | 'share-2' | 'smartphone' | 'search' | 'shopping-bag';
  colorTheme: 'indigo' | 'cyan' | 'purple' | 'emerald' | 'amber' | 'rose';
  features: string[];
  deliverables: string[];
  typicalTimeline: string;
  idealFor: string;
}

export interface InquiryFormData {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  clientService: string;
  projectBudget?: string;
  clientMessage: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
