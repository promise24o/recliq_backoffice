// Environmental Impact Dashboard Types

export type WasteType = 'paper' | 'plastic' | 'metal' | 'glass' | 'organic' | 'e_waste' | 'hazardous' | 'textile' | 'wood' | 'industrial' | 'mixed';
export type ActivityType = 'pickup' | 'drop_off' | 'enterprise' | 'community';
export type ImpactMetric = 'waste_recycled' | 'co2_avoided' | 'trees_saved' | 'landfill_diversion' | 'sdg_contributions';
export type TimeRange = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
export type VerificationStatus = 'verified' | 'pending' | 'flagged' | 'rejected';

export interface EnvironmentalImpact {
  id: string;
  date: string;
  city: string;
  zone: string;
  wasteType: WasteType;
  activityType: ActivityType;
  weightKg: number;
  co2AvoidedKg: number; // CO₂ emissions avoided in kg
  treesSaved: number;
  landfillDivertedKg: number;
  verificationStatus: VerificationStatus;
  verificationSource: string;
  sdgContributions: SDGContribution[];
  clientInfo?: {
    clientId?: string;
    clientName?: string;
    clientType?: 'consumer' | 'enterprise' | 'community';
  };
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  metadata: {
    recordedAt: string;
    recordedBy: string;
    verifiedAt?: string;
    verifiedBy?: string;
    notes?: string[];
  };
}

export interface SDGContribution {
  sdgNumber: number;
  sdgTitle: string;
  sdgDescription: string;
  impactWeight: number; // How much this activity contributes to the SDG
  targetMet: boolean;
  progressPercentage?: number;
}

export interface ImpactSummary {
  totalWasteRecycled: number;
  totalCO2Avoided: number; // in kg
  totalTreesSaved: number;
  landfillDiversionRate: number; // percentage
  sdgContributions: {
    totalContributions: number;
    sdgs: SDGContribution[];
  };
  activeImpactCities: number;
  avgImpactPerPickup: number;
  monthlyGrowthRate: number;
  verificationRate: number;
}

export interface ImpactOverTime {
  period: string;
  wasteRecycled: number;
  co2Avoided: number;
  treesSaved: number;
  landfillDiversionRate: number;
  pickups: number;
  dropoffs: number;
  enterpriseActivity: number;
  communityActivity: number;
}

export interface WasteTypeBreakdown {
  wasteType: WasteType;
  totalWeight: number;
  percentage: number;
  co2Avoided: number;
  treesSaved: number;
  pickups: number;
  dropoffs: number;
  enterpriseWeight: number;
  consumerWeight: number;
  communityWeight: number;
  growthRate: number;
}

export interface ActivityTypeBreakdown {
  activityType: ActivityType;
  totalWeight: number;
  percentage: number;
  co2Avoided: number;
  treesSaved: number;
  pickups: number;
  dropoffs: number;
  avgWeightPerActivity: number;
}

export interface CityImpact {
  city: string;
  zone: string;
  totalWasteRecycled: number;
  co2Avoided: number;
  treesSaved: number;
  landfillDiversionRate: number;
  activeUsers: number;
  pickups: number;
  dropoffs: number;
  enterpriseActivity: number;
  communityActivity: number;
  impactDensity: number; // impact per capita
  monthlyTrend: 'increasing' | 'stable' | 'decreasing';
  topWasteTypes: WasteType[];
  sdgContributions: SDGContribution[];
}

export interface ZoneImpact {
  zone: string;
  city: string;
  totalWasteRecycled: number;
  co2Avoided: number;
  treesSaved: number;
  landfillDiversionRate: number;
  pickups: number;
  dropoffs: number;
  impactDensity: number;
  monthlyTrend: 'increasing' | 'stable' | 'decreasing';
}

export interface ImpactFilters {
  dateRange: TimeRange;
  customDateRange: {
    start: string;
    end: string;
  };
  city: string;
  zone: string;
  wasteType: WasteType | '';
  activityType: ActivityType | '';
  verificationStatus: VerificationStatus | '';
  metricType: ImpactMetric | '';
  search: string;
}

export interface ESGReport {
  reportId: string;
  generatedAt: string;
  period: {
    start: string;
    end: string;
  };
  summary: ImpactSummary;
  methodology: {
    co2ConversionRates: CO2ConversionRates;
    treeEquivalencyRate: number;
    landfillDiversionBaseline: number;
    verificationProcess: string;
  };
  sdgAlignment: {
    totalContributions: number;
    sdgs: SDGContribution[];
    alignmentScore: number;
    reportableMetrics: ESGMetric[];
  };
  cityBreakdown: CityImpact[];
  wasteTypeBreakdown: WasteTypeBreakdown[];
  activityBreakdown: ActivityTypeBreakdown[];
  auditTrail: ImpactAuditEntry[];
}

export interface CO2ConversionRates {
  wasteType: WasteType;
  co2PerKg: number;
  source: string;
  lastUpdated: string;
  methodology: string;
}

export interface ESGMetric {
  metricId: string;
  metricName: string;
  category: 'environmental' | 'social' | 'governance';
  value: number;
  unit: string;
  target?: number;
  achievement: number;
  reportable: boolean;
  calculation: string;
  verification: string;
}

export interface ImpactAuditEntry {
  entryId: string;
  timestamp: string;
  action: 'created' | 'verified' | 'flagged' | 'rejected' | 'corrected';
  performedBy: string;
  details: string;
  previousValue?: number;
  newValue?: number;
  reason: string;
}

export interface ImpactExportRequest {
  filters: ImpactFilters;
  format: 'pdf' | 'excel' | 'csv';
  includeVerification: boolean;
  includeMethodology: boolean;
  includeSDGAlignment: boolean;
  dateRange: {
    start: string;
    end: string;
  };
}

// Helper types
export interface CreateImpactRequest {
  date: string;
  city: string;
  zone: string;
  wasteType: WasteType;
  activityType: ActivityType;
  weightKg: number;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  clientInfo?: {
    clientId?: string;
    clientName?: string;
    clientType?: 'consumer' | 'enterprise' | 'community';
  };
  verificationSource: string;
  notes?: string[];
}

export interface UpdateImpactRequest extends Partial<CreateImpactRequest> {
  impactId: string;
  reason: string;
  requiresVerification: boolean;
}

export interface VerifyImpactRequest {
  impactId: string;
  verificationStatus: VerificationStatus;
  verifiedBy: string;
  notes?: string;
  evidence?: string[];
}

// Enums and constants
export const WASTE_TYPE_LABELS = {
  paper: 'Paper',
  plastic: 'Plastic',
  metal: 'Metal',
  glass: 'Glass',
  organic: 'Organic',
  e_waste: 'E-Waste',
  hazardous: 'Hazardous',
  textile: 'Textile',
  wood: 'Wood',
  industrial: 'Industrial',
  mixed: 'Mixed'
} as const;

export const ACTIVITY_TYPE_LABELS = {
  pickup: 'Pickup',
  drop_off: 'Drop-off',
  enterprise: 'Enterprise',
  community: 'Community'
} as const;

export const IMPACT_METRIC_LABELS = {
  waste_recycled: 'Waste Recycled',
  co2_avoided: 'CO₂ Avoided',
  trees_saved: 'Trees Saved',
  landfill_diversion: 'Landfill Diversion',
  sdg_contributions: 'SDG Contributions'
} as const;

export const TIME_RANGE_LABELS = {
  today: 'Today',
  week: 'This Week',
  month: 'This Month',
  quarter: 'This Quarter',
  year: 'This Year',
  custom: 'Custom Range'
} as const;

export const VERIFICATION_STATUS_LABELS = {
  verified: 'Verified',
  pending: 'Pending',
  flagged: 'Flagged',
  rejected: 'Rejected'
} as const;

// SDG definitions
export const SDG_DEFINITIONS = {
  6: {
    title: 'Clean Water and Sanitation',
    description: 'Ensure availability and sustainable management of water and sanitation for all',
    target: 'Universal and equitable access to safe and affordable drinking water'
  },
  7: {
    title: 'Affordable and Clean Energy',
    description: 'Ensure access to affordable, reliable, sustainable and modern energy',
    target: 'Universal access to affordable, reliable and sustainable energy'
  },
  11: {
    title: 'Sustainable Cities and Communities',
    description: 'Make cities inclusive, safe, resilient and sustainable',
    target: 'Inclusive, safe, resilient and sustainable human settlements'
  },
  12: {
    title: 'Responsible Consumption and Production',
    description: 'Ensure sustainable consumption and production patterns',
    target: 'Sustainable management and efficient use of natural resources'
  },
  13: {
    title: 'Climate Action',
    description: 'Take urgent action to combat climate change and its impacts',
    target: 'Strengthen resilience and adaptive capacity to climate-related hazards'
  },
  15: {
    title: 'Life on Land',
    description: 'Protect, restore and promote sustainable use of terrestrial ecosystems',
    target: 'Sustainably manage forests, combat desertification, and halt land degradation'
  }
} as const;

// Helper functions
export const getWasteTypeColor = (type: WasteType): string => {
  switch (type) {
    case 'paper': return '#3b82f6';
    case 'plastic': return '#f59e0b';
    case 'metal': return '#6b7280';
    case 'glass': return '#06b6d4';
    case 'organic': return '#10b981';
    case 'e_waste': return '#8b5cf6';
    case 'hazardous': return '#ef4444';
    case 'textile': return '#ec4899';
    case 'wood': return '#92400e';
    case 'industrial': return '#7c3aed';
    case 'mixed': return '#64748b';
    default: return '#6b7280';
  }
};

export const getActivityTypeColor = (type: ActivityType): string => {
  switch (type) {
    case 'pickup': return '#3b82f6';
    case 'drop_off': return '#10b981';
    case 'enterprise': return '#f59e0b';
    case 'community': return '#8b5cf6';
    default: return '#6b7280';
  }
};

export const getVerificationStatusColor = (status: VerificationStatus): string => {
  switch (status) {
    case 'verified': return '#10b981';
    case 'pending': return '#f59e0b';
    case 'flagged': return '#ef4444';
    case 'rejected': return '#dc2626';
    default: return '#6b7280';
  }
};

export const formatWeight = (kg: number): string => {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)} tons`;
  }
  return `${kg.toLocaleString()} kg`;
};

export const formatCO2 = (kg: number): string => {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(2)} tons`;
  }
  return `${kg.toLocaleString()} kg`;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const getTrendIcon = (trend: 'increasing' | 'stable' | 'decreasing'): string => {
  switch (trend) {
    case 'increasing': return '📈';
    case 'stable': return '➡️';
    case 'decreasing': return '📉';
    default: return '➡️';
  }
};

export const getTrendColor = (trend: 'increasing' | 'stable' | 'decreasing'): string => {
  switch (trend) {
    case 'increasing': return '#10b981';
    case 'stable': return '#3b82f6';
    case 'decreasing': return '#ef4444';
    default: return '#6b7280';
  }
};

export const calculateImpactMetrics = (impacts: EnvironmentalImpact[]) => {
  const totalWaste = impacts.reduce((sum, impact) => sum + impact.weightKg, 0);
  const totalCO2 = impacts.reduce((sum, impact) => sum + impact.co2AvoidedKg, 0);
  const totalTrees = impacts.reduce((sum, impact) => sum + impact.treesSaved, 0);
  const totalLandfillDiverted = impacts.reduce((sum, impact) => sum + impact.landfillDivertedKg, 0);
  
  const baselineWaste = totalWaste * 0.3; // Assume 30% would go to landfill
  const diversionRate = baselineWaste > 0 ? ((totalLandfillDiverted / baselineWaste) * 100) : 0;
  
  return {
    totalWasteRecycled: totalWaste,
    totalCO2Avoided: totalCO2,
    totalTreesSaved: totalTrees,
    landfillDiversionRate: diversionRate
  };
};

export const getSDGAlignment = (impacts: EnvironmentalImpact[]): SDGContribution[] => {
  const sdgMap = new Map<number, SDGContribution>();
  
  impacts.forEach(impact => {
    impact.sdgContributions.forEach(sdg => {
      const existing = sdgMap.get(sdg.sdgNumber);
      if (existing) {
        existing.impactWeight += sdg.impactWeight;
        existing.targetMet = existing.targetMet || sdg.targetMet;
      } else {
        sdgMap.set(sdg.sdgNumber, { ...sdg });
      }
    });
  });
  
  return Array.from(sdgMap.values());
};
