// Pricing Rules System Types

export type PricingScope = 'global' | 'city' | 'zone';
export type WasteType = 'plastic' | 'metal' | 'paper' | 'glass' | 'e_waste' | 'organic' | 'textile';
export type PickupMode = 'pickup' | 'dropoff' | 'both';
export type RuleStatus = 'active' | 'scheduled' | 'paused' | 'retired';
export type RulePriority = 'base' | 'override' | 'promotional';

export interface PricingRule {
  id: string;
  name: string;
  description: string;
  scope: PricingScope;
  city?: string;
  zone?: string;
  wasteType: WasteType;
  pickupMode: PickupMode;

  // Pricing logic
  userPricePerKg: number;
  agentPayoutPerKg: number;
  fixedFee: number;
  platformMarginPercent: number;
  currency: string;

  // Safeguards
  safeguards: PricingSafeguards;

  // Timing
  effectiveStart: string;
  effectiveEnd?: string;
  priority: RulePriority;

  // Visibility
  userFacingLabel: string;
  agentFacingLabel: string;

  // Metadata
  status: RuleStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastChangedBy: string;
}

export interface PricingSafeguards {
  minPricePerKg: number;
  maxPricePerKg: number;
  minPayoutPerKg: number;
  maxPayoutPerKg: number;
  dailyPayoutCap: number;
  abuseThrottleLimit: number;
}

// Differentials
export interface PickupDifferential {
  id: string;
  wasteType: WasteType;
  dropoffDiscountPercent: number;
  pickupPremiumPercent: number;
  distanceModifierPerKm: number;
  effectiveDate: string;
  status: RuleStatus;
}

// Location adjustments
export interface LocationAdjustment {
  id: string;
  city: string;
  zone?: string;
  multiplier: number;
  reason: string;
  type: 'city_multiplier' | 'low_coverage_incentive' | 'peak_hour';
  effectiveDate: string;
  status: RuleStatus;
}

// Summary
export interface PricingSummary {
  activeRules: number;
  avgPricePerKg: number;
  avgAgentPayoutPerKg: number;
  estimatedMarginPercent: number;
  overrideRulesActive: number;
  lastPriceChange: string;
}

// Impact preview
export interface ImpactPreview {
  metric: string;
  current: number;
  proposed: number;
  change: number;
  changePercent: number;
  unit: string;
}

// Change history
export interface PricingChangeEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: 'created' | 'updated' | 'activated' | 'paused' | 'retired' | 'scheduled';
  ruleId: string;
  ruleName: string;
  description: string;
  changes?: { field: string; before: string; after: string }[];
}
