// Pending Referrals System Types

export type PendingReason = 'awaiting_first_action' | 'awaiting_verification' | 'awaiting_reward_approval' | 'flagged_for_review' | 'dispute_open' | 'fraud_checks' | 'weight_confirmation_pending';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type ActivationProgress = 'none' | 'signup_completed' | 'action_created' | 'verification_pending' | 'verification_completed' | 'reward_eligible';
export type InterventionAction = 'send_reminder' | 'offer_incentive' | 'extend_window' | 'flag_review' | 'mark_expired' | 'manual_approve';
export type PendingStatus = 'active' | 'intervened' | 'expired' | 'converted' | 'flagged';

export interface PendingReferral {
  id: string;
  originalReferralId: string;
  referrerId: string;
  referrerName: string;
  referrerType: 'user' | 'agent' | 'business';
  referrerEmail: string;
  referrerPhone: string;
  referrerCity: string;
  referrerZone: string;
  referralCode: string;
  invitedUserId?: string;
  invitedUserName?: string;
  invitedUserEmail?: string;
  invitedUserPhone?: string;
  invitedUserCity?: string;
  invitedUserZone?: string;
  
  // Pending specific fields
  pendingReason: PendingReason;
  pendingSince: string;
  daysPending: number;
  lastActivity: string;
  activationProgress: ActivationProgress;
  riskLevel: RiskLevel;
  pendingStatus: PendingStatus;
  
  // Progress tracking
  signupCompletedAt?: string;
  firstActionCreatedAt?: string;
  firstActionId?: string;
  firstActionType?: 'pickup' | 'dropoff';
  firstActionWeight?: number;
  verificationStatus?: 'pending' | 'in_progress' | 'completed' | 'failed';
  verificationCompletedAt?: string;
  disputeOpenAt?: string;
  disputeResolvedAt?: string;
  fraudCheckStartedAt?: string;
  fraudCheckCompletedAt?: string;
  
  // Intervention tracking
  interventions: PendingIntervention[];
  lastInterventionAt?: string;
  interventionSuccess?: boolean;
  
  // Risk signals
  riskSignals: RiskSignal[];
  duplicateDeviceDetected: boolean;
  rapidReferralChain: boolean;
  unusualBehaviorPatterns: boolean;
  
  // Conversion tracking
  convertedAt?: string;
  expiredAt?: string;
  conversionPath?: string[];
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  notes?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface PendingIntervention {
  id: string;
  action: InterventionAction;
  performedBy: string;
  performedAt: string;
  details: string;
  outcome?: 'success' | 'failed' | 'pending';
  result?: string;
  metadata?: Record<string, any>;
}

export interface RiskSignal {
  type: 'duplicate_device' | 'rapid_chain' | 'unusual_pattern' | 'location_anomaly' | 'timing_anomaly';
  severity: 'low' | 'medium' | 'high';
  detectedAt: string;
  description: string;
  evidence: string[];
  status: 'active' | 'resolved' | 'monitoring';
}

export interface PendingReferralSummary {
  totalPendingReferrals: number;
  awaitingFirstAction: number;
  awaitingVerification: number;
  awaitingRewardApproval: number;
  flaggedForReview: number;
  stuckOver7Days: number;
  avgDaysPending: number;
  highRiskCount: number;
  interventionSuccessRate: number;
  conversionRate: number;
}

export interface PendingReasonDistribution {
  reason: PendingReason;
  count: number;
  percentage: number;
  avgDaysPending: number;
  conversionRate: number;
  description: string;
}

export interface TimeInPendingHistogram {
  daysRange: string;
  count: number;
  percentage: number;
  riskLevel: RiskLevel;
  conversionRate: number;
}

export interface ConversionRecoveryInsight {
  category: 'conversion' | 'recovery' | 'intervention' | 'risk';
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  change: number; // percentage change
  description: string;
  recommendation: string;
  severity: 'low' | 'medium' | 'high';
}

export interface PendingReferralAnalytics {
  totalPending: number;
  avgDaysPending: number;
  conversionRate: number;
  interventionSuccessRate: number;
  riskDistribution: Record<RiskLevel, number>;
  pendingReasonDistribution: PendingReasonDistribution[];
  timeInPendingHistogram: TimeInPendingHistogram[];
  conversionRecoveryInsights: ConversionRecoveryInsight[];
  monthlyTrends: Array<{
    month: string;
    pending: number;
    converted: number;
    expired: number;
    intervened: number;
  }>;
  performanceByCity: Array<{
    city: string;
    pending: number;
    conversionRate: number;
    avgDaysPending: number;
    interventionSuccessRate: number;
  }>;
  performanceByReferrerType: Array<{
    type: 'user' | 'agent' | 'business';
    pending: number;
    conversionRate: number;
    avgDaysPending: number;
    interventionSuccessRate: number;
  }>;
}

export interface PendingReferralFilters {
  pendingReason: PendingReason | '';
  riskLevel: RiskLevel | '';
  city: string;
  zone: string;
  referrerType: 'user' | 'agent' | 'business' | '';
  dateRange: {
    start: string;
    end: string;
  };
  daysPendingMin?: number;
  daysPendingMax?: number;
  hasInterventions: boolean;
  search: string;
}

export interface PendingReferralDetail {
  referral: PendingReferral;
  referrerProfile: UserProfile;
  invitedUserProfile?: UserProfile;
  activationEvidence: ActivationEvidence;
  riskAnalysis: RiskAnalysis;
  interventionHistory: PendingIntervention[];
  conversionPath?: ConversionPathStep[];
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
  riskScore: number;
}

export interface ActivationEvidence {
  signupCompleted: boolean;
  signupCompletedAt?: string;
  firstActionCreated: boolean;
  firstActionCreatedAt?: string;
  firstActionId?: string;
  firstActionType?: 'pickup' | 'dropoff';
  firstActionWeight?: number;
  verificationStatus: 'pending' | 'in_progress' | 'completed' | 'failed';
  verificationCompletedAt?: string;
  disputeStatus: 'none' | 'open' | 'resolved';
  disputeOpenedAt?: string;
  disputeResolvedAt?: string;
  fraudCheckStatus: 'none' | 'in_progress' | 'completed' | 'flagged';
  fraudCheckStartedAt?: string;
  fraudCheckCompletedAt?: string;
}

export interface RiskAnalysis {
  overallRiskLevel: RiskLevel;
  riskScore: number;
  riskFactors: RiskSignal[];
  duplicateDeviceDetected: boolean;
  rapidReferralChain: boolean;
  unusualBehaviorPatterns: boolean;
  recommendedAction: string;
  riskMitigation: string[];
}

export interface ConversionPathStep {
  step: string;
  completedAt: string;
  duration: number; // minutes from previous step
  outcome: 'success' | 'failed' | 'pending';
  notes?: string;
}

// Helper types
export interface CreatePendingReferralRequest {
  originalReferralId: string;
  pendingReason: PendingReason;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface UpdatePendingReferralRequest extends Partial<CreatePendingReferralRequest> {
  id: string;
}

export interface PendingReferralActionRequest {
  referralId: string;
  action: InterventionAction;
  reason: string;
  metadata?: Record<string, any>;
}

export interface PendingReferralExportRequest {
  filters: PendingReferralFilters;
  format: 'csv' | 'excel' | 'json';
  includeDetails: boolean;
}

// Enums and constants
export const PENDING_REASON_LABELS = {
  awaiting_first_action: 'Awaiting First Action',
  awaiting_verification: 'Awaiting Verification',
  awaiting_reward_approval: 'Awaiting Reward Approval',
  flagged_for_review: 'Flagged for Review',
  dispute_open: 'Dispute Open',
  fraud_checks: 'Fraud Checks',
  weight_confirmation_pending: 'Weight Confirmation Pending'
} as const;

export const RISK_LEVEL_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical'
} as const;

export const ACTIVATION_PROGRESS_LABELS = {
  none: 'None',
  signup_completed: 'Signup Completed',
  action_created: 'Action Created',
  verification_pending: 'Verification Pending',
  verification_completed: 'Verification Completed',
  reward_eligible: 'Reward Eligible'
} as const;

export const INTERVENTION_ACTION_LABELS = {
  send_reminder: 'Send Reminder',
  offer_incentive: 'Offer Incentive',
  extend_window: 'Extend Window',
  flag_review: 'Flag for Review',
  mark_expired: 'Mark as Expired',
  manual_approve: 'Manual Approve'
} as const;

export const PENDING_STATUS_LABELS = {
  active: 'Active',
  intervened: 'Intervened',
  expired: 'Expired',
  converted: 'Converted',
  flagged: 'Flagged'
} as const;
