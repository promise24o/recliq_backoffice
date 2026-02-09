export interface PointsRule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'scheduled' | 'retired';
  triggerAction: TriggerAction;
  eligibleUserTypes: UserType[];
  applicablePickupModes: PickupMode[];
  applicableWasteTypes: WasteType[];
  pointsLogic: PointsLogic;
  safeguards: Safeguards;
  visibility: Visibility;
  scope: RuleScope;
  lastModified: string;
  modifiedBy: string;
  createdAt: string;
  createdBy: string;
  auditTrail: AuditEntry[];
}

export type TriggerAction = 
  | 'completed_pickup'
  | 'completed_dropoff'
  | 'kg_recycled'
  | 'daily_streak'
  | 'weekly_streak'
  | 'referral_completion'
  | 'high_quality_waste'
  | 'peak_hour_recycling'
  | 'first_pickup'
  | 'milestone_achievement'
  | 'campaign_participation';

export type UserType = 'individual' | 'business' | 'agent';
export type PickupMode = 'agent_to_user' | 'user_to_agent';
export type WasteType = 'plastic' | 'paper' | 'metal' | 'glass' | 'organic' | 'mixed' | 'all';

export interface PointsLogic {
  basePoints: number;
  weightBasedScaling?: {
    pointsPerKg: number;
    minWeight: number;
    maxWeight: number;
  };
  multipliers: Multiplier[];
  conditionalBonuses: ConditionalBonus[];
}

export interface Multiplier {
  type: 'streak' | 'peak_hour' | 'waste_quality' | 'campaign' | 'referral';
  value: number;
  conditions: string[];
  maxStacking?: number;
}

export interface ConditionalBonus {
  condition: string;
  bonusPoints: number;
  description: string;
}

export interface Safeguards {
  dailyCap: number;
  weeklyCap: number;
  perUserLimit: number;
  perKgLimit: number;
  dropoffFrequencyCap: number;
  referralFraudThrottle: number;
  antiGamingConstraints: string[];
}

export interface Visibility {
  userFacingCopy: string;
  inAppExplanation: string;
  badgeIcon?: string;
  colorTheme?: string;
  showInHistory: boolean;
  showInLeaderboard: boolean;
}

export interface RuleScope {
  type: 'global' | 'city' | 'zone' | 'campaign';
  locations?: string[]; // cities or zones
  campaignId?: string;
  startDate?: string;
  endDate?: string;
}

export interface AuditEntry {
  timestamp: string;
  action: 'created' | 'modified' | 'activated' | 'paused' | 'retired' | 'scheduled';
  performedBy: string;
  details: string;
  previousValue?: any;
  newValue?: any;
}

export interface PointsEconomySummary {
  activeRules: number;
  avgPointsPerPickup: number;
  streakMultipliersActive: number;
  abuseGuardsEnabled: number;
  campaignOverrides: number;
  projectedMonthlyIssuance: number;
}

export interface StreakMultiplier {
  id: string;
  type: 'daily' | 'weekly';
  threshold: number;
  multiplier: number;
  decayRule: string;
  resetCondition: string;
  status: 'active' | 'paused';
}

export interface AbusePreventionConfig {
  maxPointsPerDay: number;
  maxPointsPerKg: number;
  dropoffFrequencyCap: number;
  referralFraudThrottle: number;
  antiGamingConstraints: string[];
  alertThresholds: {
    suspiciousActivity: number;
    unusualPatterns: number;
    potentialAbuse: number;
  };
}

export interface ImpactSimulation {
  estimatedMonthlyIssuance: number;
  pickupFrequencyChange: number;
  dropoffVsPickupShift: number;
  costImpactIfRedeemed: number;
  userEngagementChange: number;
  riskFactors: string[];
  recommendations: string[];
}

export interface PointsRuleFilters {
  status: string;
  triggerAction: string;
  userType: string;
  scope: string;
  city: string;
  dateRange: { start: string; end: string };
}
