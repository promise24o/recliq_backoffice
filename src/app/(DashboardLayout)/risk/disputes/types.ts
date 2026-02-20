// Risk Disputes System Types

export type DisputeSeverity = 'medium' | 'high' | 'critical';
export type DisputeStatus = 'open' | 'investigating' | 'resolved' | 'referred';
export type DisputeCategory = 
  | 'weight_manipulation' 
  | 'payout_abuse' 
  | 'agent_misconduct' 
  | 'enterprise_sla' 
  | 'system_error'
  | 'fraud'
  | 'compliance_breach';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type EscalationSource = 'ops' | 'auto_flagged' | 'compliance' | 'finance' | 'external';

export interface RiskDispute {
  id: string;
  disputeId: string;
  category: DisputeCategory;
  severity: DisputeSeverity;
  status: DisputeStatus;
  title: string;
  description: string;
  
  // Financial
  financialExposure: number;
  currency: string;
  fundsAtRisk: number;
  recoveredAmount: number;
  
  // Parties
  parties: DisputeParty[];
  
  // Location
  city: string;
  zone: string;
  state: string;
  
  // Escalation
  escalationSource: EscalationSource;
  escalatedBy: string;
  escalatedAt: string;
  
  // Risk Assessment
  riskAssessment: RiskAssessment;
  
  // Evidence
  evidence: Evidence[];
  
  // Timeline
  timeline: TimelineEvent[];
  
  // Linked disputes
  linkedDisputeIds: string[];
  
  // Pattern detection
  isRepeatOffender: boolean;
  priorDisputeCount: number;
  patternFlags: string[];
  
  // Audit
  isAuditTagged: boolean;
  auditNotes: string[];
  
  // Resolution
  resolution?: DisputeResolution;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  daysOpen: number;
  assignedTo: string;
  reviewedBy?: string;
}

export interface DisputeParty {
  id: string;
  name: string;
  role: 'complainant' | 'respondent' | 'agent' | 'enterprise' | 'platform';
  type: 'individual' | 'enterprise' | 'agent' | 'system';
  phone?: string;
  email?: string;
  priorDisputes: number;
}

export interface RiskAssessment {
  legalRisk: RiskLevel;
  financialRisk: RiskLevel;
  reputationalRisk: RiskLevel;
  systemicRisk: RiskLevel;
  overallRisk: RiskLevel;
  assessmentNotes: string;
  assessedBy: string;
  assessedAt: string;
}

export interface Evidence {
  id: string;
  type: 'transaction_data' | 'weight_log' | 'photo' | 'video' | 'document' | 'system_log' | 'communication';
  description: string;
  url?: string;
  uploadedBy: string;
  uploadedAt: string;
  verified: boolean;
}

export interface TimelineEvent {
  id: string;
  action: string;
  description: string;
  performedBy: string;
  performedAt: string;
  metadata?: Record<string, string>;
}

export interface DisputeResolution {
  outcome: 'upheld' | 'overridden' | 'reversed' | 'escalated_legal' | 'closed_no_action';
  decision: string;
  financialAction?: {
    type: 'refund' | 'reversal' | 'penalty' | 'none';
    amount: number;
    currency: string;
  };
  accountAction?: {
    type: 'none' | 'warning' | 'suspension' | 'termination';
    target: string;
    duration?: string;
  };
  resolvedBy: string;
  resolvedAt: string;
  findings: string;
  preventiveMeasures: string[];
}

// Summary types
export interface RiskDisputeSummary {
  highRiskDisputes: number;
  financialExposure: number;
  repeatOffenders: number;
  underInvestigation: number;
  auditTaggedCases: number;
  resolvedCleared: number;
  totalDisputes: number;
  avgResolutionDays: number;
  monthlyTrend: {
    disputes: number;
    change: number;
  };
}

// Chart data types
export interface SeverityTrendData {
  month: string;
  medium: number;
  high: number;
  critical: number;
}

export interface ExposureTrendData {
  month: string;
  exposure: number;
  recovered: number;
}

export interface CategoryDistribution {
  category: DisputeCategory;
  count: number;
  percentage: number;
  exposure: number;
}

// Systemic risk types
export interface SystemicRiskMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  threshold: number;
  status: 'normal' | 'warning' | 'critical';
}

export interface RepeatRiskEntity {
  id: string;
  name: string;
  type: 'agent' | 'user' | 'enterprise';
  disputeCount: number;
  totalExposure: number;
  lastDisputeDate: string;
  riskScore: number;
}

// Filter types
export interface RiskDisputeFilters {
  severity: DisputeSeverity | '';
  category: DisputeCategory | '';
  status: DisputeStatus | '';
  financialExposure: 'all' | 'under_100k' | '100k_500k' | '500k_1m' | 'over_1m';
  dateRange: {
    start: string;
    end: string;
  };
  search: string;
  isRepeatOffender: boolean;
  isAuditTagged: boolean;
}
