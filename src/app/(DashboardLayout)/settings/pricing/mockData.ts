import type {
  PricingRule,
  PricingSummary,
  PickupDifferential,
  LocationAdjustment,
  PricingChangeEvent,
  ImpactPreview,
  WasteType,
  PickupMode,
  PricingScope,
  RuleStatus,
  RulePriority,
} from './types';

// ============================================================
// Color & Label Helpers
// ============================================================

export const getWasteTypeColor = (type: WasteType): string => {
  const colors: Record<WasteType, string> = {
    plastic: '#3B82F6',
    metal: '#6B7280',
    paper: '#F59E0B',
    glass: '#10B981',
    e_waste: '#EF4444',
    organic: '#22C55E',
    textile: '#8B5CF6',
  };
  return colors[type] || '#6B7280';
};

export const getWasteTypeLabel = (type: WasteType): string => {
  const labels: Record<WasteType, string> = {
    plastic: 'Plastic',
    metal: 'Metal',
    paper: 'Paper',
    glass: 'Glass',
    e_waste: 'E-Waste',
    organic: 'Organic',
    textile: 'Textile',
  };
  return labels[type] || type;
};

export const getPickupModeColor = (mode: PickupMode): string => {
  const colors: Record<PickupMode, string> = {
    pickup: '#3B82F6',
    dropoff: '#10B981',
    both: '#8B5CF6',
  };
  return colors[mode] || '#6B7280';
};

export const getPickupModeLabel = (mode: PickupMode): string => {
  const labels: Record<PickupMode, string> = {
    pickup: 'Pickup',
    dropoff: 'Drop-off',
    both: 'Both',
  };
  return labels[mode] || mode;
};

export const getScopeColor = (scope: PricingScope): string => {
  const colors: Record<PricingScope, string> = {
    global: '#8B5CF6',
    city: '#3B82F6',
    zone: '#F59E0B',
  };
  return colors[scope] || '#6B7280';
};

export const getScopeLabel = (scope: PricingScope): string => {
  const labels: Record<PricingScope, string> = {
    global: 'Global',
    city: 'City',
    zone: 'Zone',
  };
  return labels[scope] || scope;
};

export const getStatusColor = (status: RuleStatus): string => {
  const colors: Record<RuleStatus, string> = {
    active: '#10B981',
    scheduled: '#3B82F6',
    paused: '#F59E0B',
    retired: '#6B7280',
  };
  return colors[status] || '#6B7280';
};

export const getStatusLabel = (status: RuleStatus): string => {
  const labels: Record<RuleStatus, string> = {
    active: 'Active',
    scheduled: 'Scheduled',
    paused: 'Paused',
    retired: 'Retired',
  };
  return labels[status] || status;
};

export const getPriorityColor = (priority: RulePriority): string => {
  const colors: Record<RulePriority, string> = {
    base: '#6B7280',
    override: '#F59E0B',
    promotional: '#8B5CF6',
  };
  return colors[priority] || '#6B7280';
};

export const getPriorityLabel = (priority: RulePriority): string => {
  const labels: Record<RulePriority, string> = {
    base: 'Base',
    override: 'Override',
    promotional: 'Promotional',
  };
  return labels[priority] || priority;
};

export const getChangeActionColor = (action: string): string => {
  const colors: Record<string, string> = {
    created: '#10B981',
    updated: '#3B82F6',
    activated: '#10B981',
    paused: '#F59E0B',
    retired: '#6B7280',
    scheduled: '#8B5CF6',
  };
  return colors[action] || '#6B7280';
};

export const getChangeActionLabel = (action: string): string => {
  const labels: Record<string, string> = {
    created: 'Created',
    updated: 'Updated',
    activated: 'Activated',
    paused: 'Paused',
    retired: 'Retired',
    scheduled: 'Scheduled',
  };
  return labels[action] || action;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatRate = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG')}`;
};

// ============================================================
// Mock Pricing Rules (Nigerian Data)
// ============================================================

export const mockPricingRules: PricingRule[] = [
  {
    id: 'PRC-001',
    name: 'Plastic - National Base Rate',
    description: 'Base pricing for plastic waste collection across all Nigerian cities',
    scope: 'global',
    wasteType: 'plastic',
    pickupMode: 'both',
    userPricePerKg: 130,
    agentPayoutPerKg: 85,
    fixedFee: 0,
    platformMarginPercent: 34.6,
    currency: 'NGN',
    safeguards: { minPricePerKg: 80, maxPricePerKg: 200, minPayoutPerKg: 50, maxPayoutPerKg: 150, dailyPayoutCap: 500000, abuseThrottleLimit: 50 },
    effectiveStart: '2024-01-01T00:00:00Z',
    priority: 'base',
    userFacingLabel: '₦130/kg for plastic',
    agentFacingLabel: '₦85/kg payout',
    status: 'active',
    version: 3,
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'Adaeze Nwosu',
    lastChangedBy: 'Adaeze Nwosu',
  },
  {
    id: 'PRC-002',
    name: 'Metal - National Base Rate',
    description: 'Base pricing for metal waste collection across all Nigerian cities',
    scope: 'global',
    wasteType: 'metal',
    pickupMode: 'both',
    userPricePerKg: 90,
    agentPayoutPerKg: 60,
    fixedFee: 0,
    platformMarginPercent: 33.3,
    currency: 'NGN',
    safeguards: { minPricePerKg: 50, maxPricePerKg: 150, minPayoutPerKg: 30, maxPayoutPerKg: 120, dailyPayoutCap: 400000, abuseThrottleLimit: 40 },
    effectiveStart: '2024-01-01T00:00:00Z',
    priority: 'base',
    userFacingLabel: '₦90/kg for metal',
    agentFacingLabel: '₦60/kg payout',
    status: 'active',
    version: 2,
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'Adaeze Nwosu',
    lastChangedBy: 'Adaeze Nwosu',
  },
  {
    id: 'PRC-003',
    name: 'Paper - National Base Rate',
    description: 'Base pricing for paper waste collection',
    scope: 'global',
    wasteType: 'paper',
    pickupMode: 'both',
    userPricePerKg: 50,
    agentPayoutPerKg: 30,
    fixedFee: 0,
    platformMarginPercent: 40.0,
    currency: 'NGN',
    safeguards: { minPricePerKg: 25, maxPricePerKg: 80, minPayoutPerKg: 15, maxPayoutPerKg: 60, dailyPayoutCap: 200000, abuseThrottleLimit: 60 },
    effectiveStart: '2024-01-01T00:00:00Z',
    priority: 'base',
    userFacingLabel: '₦50/kg for paper',
    agentFacingLabel: '₦30/kg payout',
    status: 'active',
    version: 2,
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'Adaeze Nwosu',
    lastChangedBy: 'Emeka Okafor',
  },
  {
    id: 'PRC-004',
    name: 'E-Waste - National Base Rate',
    description: 'Base pricing for electronic waste. Higher rate due to hazardous handling requirements.',
    scope: 'global',
    wasteType: 'e_waste',
    pickupMode: 'pickup',
    userPricePerKg: 250,
    agentPayoutPerKg: 180,
    fixedFee: 500,
    platformMarginPercent: 26.0,
    currency: 'NGN',
    safeguards: { minPricePerKg: 150, maxPricePerKg: 400, minPayoutPerKg: 100, maxPayoutPerKg: 300, dailyPayoutCap: 800000, abuseThrottleLimit: 20 },
    effectiveStart: '2024-01-01T00:00:00Z',
    priority: 'base',
    userFacingLabel: '₦250/kg for e-waste',
    agentFacingLabel: '₦180/kg + ₦500 handling fee',
    status: 'active',
    version: 1,
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'Adaeze Nwosu',
    lastChangedBy: 'Adaeze Nwosu',
  },
  {
    id: 'PRC-005',
    name: 'Plastic - Lagos Premium',
    description: 'Lagos city override for plastic. Higher rate due to demand and operational costs.',
    scope: 'city',
    city: 'Lagos',
    wasteType: 'plastic',
    pickupMode: 'both',
    userPricePerKg: 150,
    agentPayoutPerKg: 100,
    fixedFee: 0,
    platformMarginPercent: 33.3,
    currency: 'NGN',
    safeguards: { minPricePerKg: 100, maxPricePerKg: 250, minPayoutPerKg: 60, maxPayoutPerKg: 180, dailyPayoutCap: 600000, abuseThrottleLimit: 50 },
    effectiveStart: '2024-01-01T00:00:00Z',
    priority: 'override',
    userFacingLabel: '₦150/kg for plastic in Lagos',
    agentFacingLabel: '₦100/kg payout (Lagos)',
    status: 'active',
    version: 2,
    createdAt: '2023-08-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'Adaeze Nwosu',
    lastChangedBy: 'Adaeze Nwosu',
  },
  {
    id: 'PRC-006',
    name: 'Plastic - Abuja Premium',
    description: 'Abuja city override for plastic. Adjusted for FCT operational costs.',
    scope: 'city',
    city: 'Abuja',
    wasteType: 'plastic',
    pickupMode: 'both',
    userPricePerKg: 140,
    agentPayoutPerKg: 95,
    fixedFee: 0,
    platformMarginPercent: 32.1,
    currency: 'NGN',
    safeguards: { minPricePerKg: 90, maxPricePerKg: 220, minPayoutPerKg: 55, maxPayoutPerKg: 160, dailyPayoutCap: 500000, abuseThrottleLimit: 45 },
    effectiveStart: '2024-01-15T00:00:00Z',
    priority: 'override',
    userFacingLabel: '₦140/kg for plastic in Abuja',
    agentFacingLabel: '₦95/kg payout (Abuja)',
    status: 'active',
    version: 1,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    createdBy: 'Adaeze Nwosu',
    lastChangedBy: 'Adaeze Nwosu',
  },
  {
    id: 'PRC-007',
    name: 'Glass - National Base Rate',
    description: 'Base pricing for glass waste collection',
    scope: 'global',
    wasteType: 'glass',
    pickupMode: 'dropoff',
    userPricePerKg: 40,
    agentPayoutPerKg: 25,
    fixedFee: 0,
    platformMarginPercent: 37.5,
    currency: 'NGN',
    safeguards: { minPricePerKg: 20, maxPricePerKg: 70, minPayoutPerKg: 10, maxPayoutPerKg: 50, dailyPayoutCap: 150000, abuseThrottleLimit: 30 },
    effectiveStart: '2024-01-01T00:00:00Z',
    priority: 'base',
    userFacingLabel: '₦40/kg for glass (drop-off only)',
    agentFacingLabel: '₦25/kg payout',
    status: 'active',
    version: 1,
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'Emeka Okafor',
    lastChangedBy: 'Emeka Okafor',
  },
  {
    id: 'PRC-008',
    name: 'Plastic - Q2 2024 Increase',
    description: 'Scheduled Q2 plastic rate increase to match market prices',
    scope: 'global',
    wasteType: 'plastic',
    pickupMode: 'both',
    userPricePerKg: 145,
    agentPayoutPerKg: 95,
    fixedFee: 0,
    platformMarginPercent: 34.5,
    currency: 'NGN',
    safeguards: { minPricePerKg: 90, maxPricePerKg: 220, minPayoutPerKg: 55, maxPayoutPerKg: 160, dailyPayoutCap: 550000, abuseThrottleLimit: 50 },
    effectiveStart: '2024-04-01T00:00:00Z',
    effectiveEnd: undefined,
    priority: 'base',
    userFacingLabel: '₦145/kg for plastic',
    agentFacingLabel: '₦95/kg payout',
    status: 'scheduled',
    version: 1,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    createdBy: 'Adaeze Nwosu',
    lastChangedBy: 'Adaeze Nwosu',
  },
  {
    id: 'PRC-009',
    name: 'Textile - National Base Rate',
    description: 'Base pricing for textile waste collection. Pilot program.',
    scope: 'global',
    wasteType: 'textile',
    pickupMode: 'dropoff',
    userPricePerKg: 35,
    agentPayoutPerKg: 20,
    fixedFee: 0,
    platformMarginPercent: 42.9,
    currency: 'NGN',
    safeguards: { minPricePerKg: 15, maxPricePerKg: 60, minPayoutPerKg: 10, maxPayoutPerKg: 45, dailyPayoutCap: 100000, abuseThrottleLimit: 25 },
    effectiveStart: '2024-02-01T00:00:00Z',
    priority: 'base',
    userFacingLabel: '₦35/kg for textile (drop-off only)',
    agentFacingLabel: '₦20/kg payout',
    status: 'scheduled',
    version: 1,
    createdAt: '2024-01-22T00:00:00Z',
    updatedAt: '2024-01-22T00:00:00Z',
    createdBy: 'Adaeze Nwosu',
    lastChangedBy: 'Adaeze Nwosu',
  },
  {
    id: 'PRC-010',
    name: 'Metal - Kano Discount',
    description: 'Retired Kano metal discount. Replaced by national base rate.',
    scope: 'city',
    city: 'Kano',
    wasteType: 'metal',
    pickupMode: 'both',
    userPricePerKg: 70,
    agentPayoutPerKg: 45,
    fixedFee: 0,
    platformMarginPercent: 35.7,
    currency: 'NGN',
    safeguards: { minPricePerKg: 40, maxPricePerKg: 120, minPayoutPerKg: 25, maxPayoutPerKg: 90, dailyPayoutCap: 300000, abuseThrottleLimit: 35 },
    effectiveStart: '2023-06-01T00:00:00Z',
    effectiveEnd: '2023-12-31T23:59:59Z',
    priority: 'override',
    userFacingLabel: '₦70/kg for metal in Kano',
    agentFacingLabel: '₦45/kg payout (Kano)',
    status: 'retired',
    version: 1,
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2023-12-31T00:00:00Z',
    createdBy: 'Emeka Okafor',
    lastChangedBy: 'Adaeze Nwosu',
  },
];

// ============================================================
// Summary
// ============================================================

export const mockPricingSummary: PricingSummary = {
  activeRules: 7,
  avgPricePerKg: 107,
  avgAgentPayoutPerKg: 72,
  estimatedMarginPercent: 33.8,
  overrideRulesActive: 2,
  lastPriceChange: '2024-01-22T00:00:00Z',
};

// ============================================================
// Differentials
// ============================================================

export const mockPickupDifferentials: PickupDifferential[] = [
  { id: 'DIFF-001', wasteType: 'plastic', dropoffDiscountPercent: 0, pickupPremiumPercent: 15, distanceModifierPerKm: 5, effectiveDate: '2024-01-01', status: 'active' },
  { id: 'DIFF-002', wasteType: 'metal', dropoffDiscountPercent: 0, pickupPremiumPercent: 12, distanceModifierPerKm: 4, effectiveDate: '2024-01-01', status: 'active' },
  { id: 'DIFF-003', wasteType: 'paper', dropoffDiscountPercent: 0, pickupPremiumPercent: 10, distanceModifierPerKm: 3, effectiveDate: '2024-01-01', status: 'active' },
  { id: 'DIFF-004', wasteType: 'e_waste', dropoffDiscountPercent: 0, pickupPremiumPercent: 20, distanceModifierPerKm: 8, effectiveDate: '2024-01-01', status: 'active' },
  { id: 'DIFF-005', wasteType: 'glass', dropoffDiscountPercent: 5, pickupPremiumPercent: 0, distanceModifierPerKm: 0, effectiveDate: '2024-01-01', status: 'active' },
  { id: 'DIFF-006', wasteType: 'textile', dropoffDiscountPercent: 5, pickupPremiumPercent: 0, distanceModifierPerKm: 0, effectiveDate: '2024-02-01', status: 'scheduled' },
];

// ============================================================
// Location Adjustments
// ============================================================

export const mockLocationAdjustments: LocationAdjustment[] = [
  { id: 'LOC-001', city: 'Lagos', multiplier: 1.15, reason: 'High demand, high operational cost', type: 'city_multiplier', effectiveDate: '2024-01-01', status: 'active' },
  { id: 'LOC-002', city: 'Abuja', multiplier: 1.08, reason: 'FCT premium operational cost', type: 'city_multiplier', effectiveDate: '2024-01-01', status: 'active' },
  { id: 'LOC-003', city: 'Port Harcourt', multiplier: 1.05, reason: 'Oil region logistics premium', type: 'city_multiplier', effectiveDate: '2024-01-01', status: 'active' },
  { id: 'LOC-004', city: 'Kano', multiplier: 0.95, reason: 'Lower operational cost', type: 'city_multiplier', effectiveDate: '2024-01-01', status: 'active' },
  { id: 'LOC-005', city: 'Ibadan', multiplier: 1.00, reason: 'Standard rate', type: 'city_multiplier', effectiveDate: '2024-01-01', status: 'active' },
  { id: 'LOC-006', city: 'Lagos', zone: 'Epe', multiplier: 1.25, reason: 'Low agent coverage, incentive to attract supply', type: 'low_coverage_incentive', effectiveDate: '2024-01-15', status: 'active' },
  { id: 'LOC-007', city: 'Abuja', zone: 'Kubwa', multiplier: 1.20, reason: 'Underserved zone, agent recruitment incentive', type: 'low_coverage_incentive', effectiveDate: '2024-01-15', status: 'active' },
  { id: 'LOC-008', city: 'Lagos', multiplier: 1.10, reason: 'Weekend peak demand surcharge', type: 'peak_hour', effectiveDate: '2024-01-01', status: 'active' },
];

// ============================================================
// Change History
// ============================================================

export const mockPricingChangeHistory: PricingChangeEvent[] = [
  {
    id: 'PCH-001',
    timestamp: '2024-01-22T10:00:00Z',
    actor: 'Adaeze Nwosu',
    action: 'created',
    ruleId: 'PRC-009',
    ruleName: 'Textile - National Base Rate',
    description: 'Created new textile waste pricing rule for pilot program',
  },
  {
    id: 'PCH-002',
    timestamp: '2024-01-20T14:00:00Z',
    actor: 'Adaeze Nwosu',
    action: 'scheduled',
    ruleId: 'PRC-008',
    ruleName: 'Plastic - Q2 2024 Increase',
    description: 'Scheduled Q2 plastic rate increase effective April 1',
    changes: [
      { field: 'userPricePerKg', before: '₦130', after: '₦145' },
      { field: 'agentPayoutPerKg', before: '₦85', after: '₦95' },
    ],
  },
  {
    id: 'PCH-003',
    timestamp: '2024-01-15T09:00:00Z',
    actor: 'Adaeze Nwosu',
    action: 'activated',
    ruleId: 'PRC-006',
    ruleName: 'Plastic - Abuja Premium',
    description: 'Activated Abuja plastic premium pricing',
  },
  {
    id: 'PCH-004',
    timestamp: '2024-01-01T00:00:00Z',
    actor: 'Adaeze Nwosu',
    action: 'updated',
    ruleId: 'PRC-001',
    ruleName: 'Plastic - National Base Rate',
    description: 'Q1 2024 pricing update: plastic rate increased 8%',
    changes: [
      { field: 'userPricePerKg', before: '₦120', after: '₦130' },
      { field: 'agentPayoutPerKg', before: '₦80', after: '₦85' },
    ],
  },
  {
    id: 'PCH-005',
    timestamp: '2023-12-31T23:59:00Z',
    actor: 'Adaeze Nwosu',
    action: 'retired',
    ruleId: 'PRC-010',
    ruleName: 'Metal - Kano Discount',
    description: 'Retired Kano metal discount. Replaced by national base rate.',
  },
];

// ============================================================
// Impact Preview (sample)
// ============================================================

export const mockImpactPreview: ImpactPreview[] = [
  { metric: 'Avg User Earnings / kg', current: 130, proposed: 145, change: 15, changePercent: 11.5, unit: '₦' },
  { metric: 'Avg Agent Payout / kg', current: 85, proposed: 95, change: 10, changePercent: 11.8, unit: '₦' },
  { metric: 'Platform Margin', current: 34.6, proposed: 34.5, change: -0.1, changePercent: -0.3, unit: '%' },
  { metric: 'Est. Monthly User Payouts', current: 45000000, proposed: 50250000, change: 5250000, changePercent: 11.7, unit: '₦' },
  { metric: 'Est. Monthly Agent Payouts', current: 29500000, proposed: 32900000, change: 3400000, changePercent: 11.5, unit: '₦' },
];
