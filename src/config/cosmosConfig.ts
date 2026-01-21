import { CosmosClient } from '@azure/cosmos';

const endpoint = import.meta.env.VITE_COSMOS_ENDPOINT || '';
const key = import.meta.env.VITE_COSMOS_KEY || '';

export const cosmosClient = new CosmosClient({ endpoint, key });

export const databaseId = 'XigusaGrowthOS';

export const containers = {
  content: 'ContentMachine',
  technical: 'TechnicalTracker',
  outreach: 'OutreachPipeline',
  metrics: 'GrowthMetrics',
  momentum: 'MomentumLog',
};

export interface ContentItem {
  id: string;
  title: string;
  status: 'Idea' | 'Drafting' | 'Editing' | 'Ready' | 'Published' | 'Promoted';
  publishDate?: string;
  keywords: string[];
  targetLandingPage?: string;
  performanceScore?: number;
  internalLinks?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TechnicalItem {
  id: string;
  name: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  componentType: 'Landing Page' | 'Lead Capture' | 'Schema' | 'Infrastructure';
  codeFile?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OutreachItem {
  id: string;
  contactName: string;
  outlet: string;
  email?: string;
  pitchAngle?: string;
  status: 'Planned' | 'Contacted' | 'Follow-up' | 'Success' | 'Rejected';
  backlinkAcquired: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MetricsItem {
  id: string;
  weekStart: string;
  organicVisits: number;
  leads: number;
  conversionRate: number;
  notes?: string;
  insights?: string;
  blockers?: string;
  createdAt: string;
}

export interface MomentumItem {
  id: string;
  date: string;
  win?: string;
  blocker?: string;
  energyLevel: number;
  focusLevel: number;
  insight?: string;
  createdAt: string;
}
