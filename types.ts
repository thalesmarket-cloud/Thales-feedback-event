
export type Recommendation = 'Oui' | 'Non' | 'Peut-être';

export interface Feedback {
  id: string;
  timestamp: string;
  // Section A
  name?: string;
  company?: string;
  email?: string;
  // Section B
  globalSatisfaction: number;
  // Section C
  orgRating: number;
  logisticsRating: number;
  timingRating: number;
  // Section D
  relevanceRating: number;
  clarityRating: number;
  interestRating: number;
  // Section E
  mostAppreciated: string;
  improvements: string;
  // Section F
  recommendation: Recommendation;
}

export interface Stats {
  total: number;
  avgSatisfaction: number;
  avgOrg: number; // Moyenne de Section C
  avgContent: number; // Moyenne de Section D
  recommendationDistribution: { name: string; value: number }[];
}
