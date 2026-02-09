// Fraud Checks System Types

export type FraudSignalType = 'same_device_ip' | 'geo_mismatch' | 'rapid_referral_chain' | 'repeated_patterns' | 'weight_anomaly' | 'circular_referral' | 'recycled_rewards' | 'timing_anomaly' | 'location_spoofing';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type FraudCaseStatus = 'open' | 'under_review' | 'cleared' | 'confirmed_fraud' | 'escalated';
export type EnforcementAction = 'clear_case' | 'block_rewards' | 'reverse_rewards' | 'suspend_privileges' | 'flag_account' | 'escalate_compliance';
export type InvestigationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface FraudCase {
  id: string;
  referralId: string;
  referrerId: string;
  referrerName: string;
  referrerType: 'user' | 'agent' | 'business';
  referrerEmail: string;
  referrerPhone: string;
  referrerCity: string;
  referrerZone: string;
  invitedUserId?: string;
  invitedUserName?: string;
  invitedUserEmail?: string;
  invitedUserPhone?: string;
  invitedUserCity?: string;
  invitedUserZone?: string;
  
  // Fraud detection specific fields
  riskScore: number; // 0-100
  primarySignals: FraudSignal[];
  status: FraudCaseStatus;
  priority: InvestigationPriority;
  daysOpen: number;
  createdAt: string;
  lastActivityAt: string;
  resolvedAt?: string;
  reviewedBy?: string;
  
  // Evidence collection
  deviceHistory: DeviceHistory[];
  ipHistory: IPHistory[];
  locationPatterns: LocationPattern[];
  referralChain: ReferralChainNode[];
  actionEvidence: ActionEvidence[];
  rewardHistory: RewardHistory[];
  
  // Impact assessment
  rewardsAtRisk: number;
  affectedReferrals: string[];
  financialExposure: number;
  potentialAbuseScale: 'individual' | 'small_ring' | 'organized_ring' | 'systemic';
  
  // Investigation tracking
  investigationNotes: InvestigationNote[];
  enforcementActions: EnforcementActionRecord[];
  appeals: FraudAppeal[];
  
  // System metadata
  detectionVersion: string;
  autoFlagged: boolean;
  manualFlag: boolean;
  escalatedFrom?: string;
  complianceReviewed: boolean;
}

export interface FraudSignal {
  id: string;
  type: FraudSignalType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number; // 0-100
  detectedAt: string;
  description: string;
  evidence: string[];
  riskContribution: number; // contribution to overall risk score
  status: 'active' | 'investigated' | 'resolved' | 'false_positive';
  resolvedAt?: string;
  resolution?: string;
}

export interface DeviceHistory {
  deviceId: string;
  deviceType: string;
  firstSeen: string;
  lastSeen: string;
  usageCount: number;
  associatedUsers: string[];
  associatedReferrals: string[];
  riskLevel: RiskLevel;
  flagged: boolean;
  flagReason?: string;
}

export interface IPHistory {
  ipAddress: string;
  firstSeen: string;
  lastSeen: string;
  usageCount: number;
  associatedUsers: string[];
  associatedReferrals: string[];
  isVPN: boolean;
  isProxy: boolean;
  geolocation: {
    country: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  riskLevel: RiskLevel;
  flagged: boolean;
  flagReason?: string;
}

export interface LocationPattern {
  id: string;
  timestamp: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  action: 'pickup' | 'dropoff' | 'signup' | 'login';
  userId: string;
  isSuspicious: boolean;
  reason?: string;
  distanceFromPrevious?: number; // meters
  timeFromPrevious?: number; // minutes
}

export interface ReferralChainNode {
  userId: string;
  userName: string;
  referralCode: string;
  referredAt: string;
  referredBy: string;
  depth: number; // 0 = original referrer
  suspiciousConnections: number;
  totalReferrals: number;
  completedReferrals: number;
  riskScore: number;
}

export interface ActionEvidence {
  actionId: string;
  type: 'pickup' | 'dropoff';
  timestamp: string;
  location: string;
  weight: number;
  wasteType: string;
  verificationStatus: 'pending' | 'verified' | 'flagged' | 'rejected';
  verificationNotes?: string;
  suspicious: boolean;
  suspiciousReasons: string[];
}

export interface RewardHistory {
  rewardId: string;
  type: 'points' | 'bonus' | 'cash' | 'perk';
  amount: number;
  issuedAt: string;
  status: 'issued' | 'pending' | 'blocked' | 'reversed';
  blockedAt?: string;
  reversedAt?: string;
  reversalReason?: string;
  referralId: string;
}

export interface InvestigationNote {
  id: string;
  timestamp: string;
  author: string;
  role: string;
  note: string;
  type: 'observation' | 'evidence' | 'conclusion' | 'recommendation';
  attachments: string[];
  visibility: 'internal' | 'compliance' | 'legal';
}

export interface EnforcementActionRecord {
  id: string;
  action: EnforcementAction;
  performedAt: string;
  performedBy: string;
  role: string;
  reason: string;
  details: string;
  affectedUsers: string[];
  affectedReferrals: string[];
  financialImpact: number;
  approvedBy?: string;
  approvalAt?: string;
  reversed: boolean;
  reversedAt?: string;
  reversalReason?: string;
}

export interface FraudAppeal {
  id: string;
  submittedAt: string;
  submittedBy: string;
  reason: string;
  evidence: string[];
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  decision: string;
  outcome: 'case_reopened' | 'decision_upheld' | 'compensation_issued';
}

export interface FraudRiskSummary {
  flaggedReferrals: number;
  highRiskCases: number;
  confirmedFraud: number;
  clearedCases: number;
  avgReviewTime: number;
  rewardsProtected: number;
  totalFinancialExposure: number;
  fraudRate: number;
  detectionAccuracy: number;
  falsePositiveRate: number;
  openCases: number;
  escalatedCases: number;
}

export interface FraudSignalDistribution {
  signalType: FraudSignalType;
  count: number;
  percentage: number;
  avgRiskScore: number;
  accuracy: number; // true positive rate
  falsePositives: number;
  description: string;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface RiskScoreDistribution {
  scoreRange: string;
  count: number;
  percentage: number;
  fraudConfirmed: number;
  falsePositives: number;
  accuracy: number;
}

export interface FraudPreventionInsight {
  category: 'detection' | 'prevention' | 'enforcement' | 'systemic';
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  change: number; // percentage change
  description: string;
  recommendation: string;
  severity: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
}

export interface FraudCheckAnalytics {
  totalCases: number;
  openCases: number;
  confirmedFraud: number;
  clearedCases: number;
  avgReviewTime: number;
  totalFinancialExposure: number;
  rewardsProtected: number;
  fraudRate: number;
  detectionAccuracy: number;
  falsePositiveRate: number;
  riskSummary: FraudRiskSummary;
  signalDistribution: FraudSignalDistribution[];
  riskScoreDistribution: RiskScoreDistribution[];
  preventionInsights: FraudPreventionInsight[];
  monthlyTrends: Array<{
    month: string;
    cases: number;
    confirmed: number;
    cleared: number;
    exposure: number;
    protected: number;
  }>;
  cityRiskProfiles: Array<{
    city: string;
    cases: number;
    fraudRate: number;
    avgRiskScore: number;
    commonSignals: FraudSignalType[];
  }>;
  referrerTypeRisk: Array<{
    type: 'user' | 'agent' | 'business';
    cases: number;
    fraudRate: number;
    avgRiskScore: number;
    commonSignals: FraudSignalType[];
  }>;
}

export interface FraudCaseFilters {
  riskLevel: RiskLevel | '';
  signalType: FraudSignalType | '';
  status: FraudCaseStatus | '';
  priority: InvestigationPriority | '';
  city: string;
  zone: string;
  referrerType: 'user' | 'agent' | 'business' | '';
  dateRange: {
    start: string;
    end: string;
  };
  minRiskScore?: number;
  maxRiskScore?: number;
  hasEnforcementActions: boolean;
  hasAppeals: boolean;
  search: string;
}

export interface FraudCaseDetail {
  case: FraudCase;
  referrerProfile: UserProfile;
  invitedUserProfile?: UserProfile;
  fullReferralChain: ReferralChainNode[];
  deviceAnalysis: DeviceAnalysis;
  ipAnalysis: IPAnalysis;
  locationAnalysis: LocationAnalysis;
  networkAnalysis: NetworkAnalysis;
  financialImpact: FinancialImpactAnalysis;
  recommendedActions: EnforcementAction[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'user' | 'agent' | 'business';
  city: string;
  zone: string;
  joinDate: string;
  totalActions: number;
  totalWeight: number;
  averageWeight: number;
  qualityScore: number;
  isActive: boolean;
  lastActivity: string;
  totalEarnings: number;
  totalReferralsGiven: number;
  totalReferralsCompleted: number;
  fraudFlags: number;
  riskScore: number;
  accountStatus: 'active' | 'suspended' | 'flagged' | 'banned';
}

export interface DeviceAnalysis {
  uniqueDevices: number;
  sharedDevices: number;
  highRiskDevices: number;
  devicePatterns: Array<{
    deviceId: string;
    riskLevel: RiskLevel;
    usagePattern: string;
    associatedUsers: number;
    associatedReferrals: number;
  }>;
  recommendations: string[];
}

export interface IPAnalysis {
  uniqueIPs: number;
  sharedIPs: number;
  vpnUsage: number;
  proxyUsage: number;
  geoAnomalies: number;
  ipPatterns: Array<{
    ipAddress: string;
    riskLevel: RiskLevel;
    usagePattern: string;
    associatedUsers: number;
    associatedReferrals: number;
  }>;
  recommendations: string[];
}

export interface LocationAnalysis {
  uniqueLocations: number;
  suspiciousLocations: number;
  geoMismatches: number;
  impossibleTravel: number;
  locationPatterns: Array<{
    location: string;
    riskLevel: RiskLevel;
    visitCount: number;
    associatedActions: number;
  }>;
  recommendations: string[];
}

export interface NetworkAnalysis {
  networkSize: number;
  suspiciousConnections: number;
  circularReferrals: number;
  rapidReferralChains: number;
  networkClusters: Array<{
    clusterId: string;
    size: number;
    riskLevel: RiskLevel;
    commonSignals: FraudSignalType[];
    centralUsers: string[];
  }>;
  recommendations: string[];
}

export interface FinancialImpactAnalysis {
  totalRewardsIssued: number;
  rewardsAtRisk: number;
  rewardsBlocked: number;
  rewardsReversed: number;
  potentialExposure: number;
  actualLoss: number;
  preventedLoss: number;
  roi: number; // return on investment for fraud prevention
}

// Helper types
export interface CreateFraudCaseRequest {
  referralId: string;
  signals: Omit<FraudSignal, 'id' | 'detectedAt'>[];
  priority: InvestigationPriority;
  notes?: string;
}

export interface UpdateFraudCaseRequest extends Partial<CreateFraudCaseRequest> {
  id: string;
}

export interface FraudCaseActionRequest {
  caseId: string;
  action: EnforcementAction;
  reason: string;
  details: string;
  affectedUsers: string[];
  affectedReferrals: string[];
  requiresApproval: boolean;
  metadata?: Record<string, any>;
}

export interface FraudCaseExportRequest {
  filters: FraudCaseFilters;
  format: 'csv' | 'excel' | 'json' | 'audit';
  includeEvidence: boolean;
  includeEnforcementActions: boolean;
  includeAppeals: boolean;
}

// Enums and constants
export const FRAUD_SIGNAL_TYPE_LABELS = {
  same_device_ip: 'Same Device/IP',
  geo_mismatch: 'Geo Mismatch',
  rapid_referral_chain: 'Rapid Referral Chain',
  repeated_patterns: 'Repeated Patterns',
  weight_anomaly: 'Weight Anomaly',
  circular_referral: 'Circular Referral',
  recycled_rewards: 'Recycled Rewards',
  timing_anomaly: 'Timing Anomaly',
  location_spoofing: 'Location Spoofing'
} as const;

export const RISK_LEVEL_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical'
} as const;

export const FRAUD_CASE_STATUS_LABELS = {
  open: 'Open',
  under_review: 'Under Review',
  cleared: 'Cleared',
  confirmed_fraud: 'Confirmed Fraud',
  escalated: 'Escalated'
} as const;

export const ENFORCEMENT_ACTION_LABELS = {
  clear_case: 'Clear Case',
  block_rewards: 'Block Rewards',
  reverse_rewards: 'Reverse Rewards',
  suspend_privileges: 'Suspend Privileges',
  flag_account: 'Flag Account',
  escalate_compliance: 'Escalate to Compliance'
} as const;

export const INVESTIGATION_PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent'
} as const;
