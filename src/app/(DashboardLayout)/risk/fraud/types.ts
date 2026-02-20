// Fraud Flags System Types

export type FraudSeverity = 'medium' | 'high' | 'critical';
export type FraudStatus = 'open' | 'investigating' | 'confirmed' | 'cleared';
export type FraudType =
  | 'weight_fraud'
  | 'payout_abuse'
  | 'identity_farming'
  | 'location_spoofing'
  | 'collusion'
  | 'system_abuse';

export type EntityType = 'user' | 'agent' | 'enterprise';
export type FlagSource = 'system' | 'ops_escalated' | 'audit_triggered';
export type EnforcementAction =
  | 'clear_flag'
  | 'restrict_account'
  | 'reverse_payouts'
  | 'suspend_privileges'
  | 'escalate_legal'
  | 'add_watchlist';

export interface FraudFlag {
  id: string;
  entity: FlaggedEntity;
  fraudType: FraudType;
  severity: FraudSeverity;
  status: FraudStatus;
  title: string;
  description: string;

  // Risk scoring
  riskScore: number;
  riskScoreBreakdown: RiskScoreBreakdown;

  // Financial
  financialExposure: number;
  fundsFrozen: number;
  affectedTransactions: number;
  currency: string;

  // Location
  city: string;
  zone: string;
  state: string;

  // Source
  flagSource: FlagSource;
  flaggedBy: string;
  flaggedAt: string;

  // Signals
  signals: FraudSignal[];

  // Evidence
  evidence: FraudEvidence[];

  // Timeline
  timeline: FraudTimelineEvent[];

  // Linked
  linkedAccountIds: string[];
  linkedFlagIds: string[];

  // Device / IP
  deviceHistory: DeviceRecord[];

  // Enforcement
  enforcementActions: EnforcementRecord[];

  // Metadata
  createdAt: string;
  updatedAt: string;
  daysOpen: number;
  assignedTo: string;
  reviewedBy?: string;
}

export interface FlaggedEntity {
  id: string;
  name: string;
  type: EntityType;
  phone?: string;
  email?: string;
  registeredAt: string;
  priorFlags: number;
  accountStatus: 'active' | 'restricted' | 'suspended' | 'terminated';
}

export interface RiskScoreBreakdown {
  behaviorScore: number;
  financialScore: number;
  velocityScore: number;
  networkScore: number;
  historyScore: number;
}

export interface FraudSignal {
  id: string;
  type: string;
  description: string;
  confidence: number;
  detectedAt: string;
  metadata?: Record<string, string>;
}

export interface FraudEvidence {
  id: string;
  type: 'transaction_log' | 'weight_log' | 'gps_data' | 'device_fingerprint' | 'photo' | 'communication' | 'system_log';
  description: string;
  url?: string;
  collectedBy: string;
  collectedAt: string;
  verified: boolean;
}

export interface FraudTimelineEvent {
  id: string;
  action: string;
  description: string;
  performedBy: string;
  performedAt: string;
}

export interface DeviceRecord {
  id: string;
  deviceId: string;
  deviceType: string;
  ipAddress: string;
  location: string;
  lastSeen: string;
  flagged: boolean;
}

export interface EnforcementRecord {
  id: string;
  action: EnforcementAction;
  description: string;
  performedBy: string;
  performedAt: string;
  reversible: boolean;
}

// Summary types
export interface FraudSummary {
  activeFraudFlags: number;
  highSeverityFlags: number;
  financialExposure: number;
  underInvestigation: number;
  clearedFlags: number;
  accountsRestricted: number;
  totalFlags: number;
  avgResolutionDays: number;
  detectionAccuracy: number;
}

// Chart data types
export interface FraudTrendData {
  month: string;
  medium: number;
  high: number;
  critical: number;
}

export interface FraudTypeDistribution {
  type: FraudType;
  count: number;
  percentage: number;
  exposure: number;
}

export interface SeverityDistribution {
  severity: FraudSeverity;
  count: number;
  percentage: number;
}

// Systemic fraud types
export interface FraudControlMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  threshold: number;
  status: 'normal' | 'warning' | 'critical';
}

export interface RepeatOffender {
  id: string;
  name: string;
  type: EntityType;
  flagCount: number;
  totalExposure: number;
  riskScore: number;
  lastFlagDate: string;
  accountStatus: 'active' | 'restricted' | 'suspended' | 'terminated';
}

// Filter types
export interface FraudFlagFilters {
  severity: FraudSeverity | '';
  fraudType: FraudType | '';
  entityType: EntityType | '';
  status: FraudStatus | '';
  dateRange: {
    start: string;
    end: string;
  };
  search: string;
}
