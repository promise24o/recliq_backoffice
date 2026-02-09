// Referrals System Types

export type ReferralStatus = 'pending' | 'signed_up' | 'activated' | 'rewarded' | 'flagged' | 'revoked';
export type ReferrerType = 'user' | 'agent' | 'business';
export type ActionType = 'pickup' | 'dropoff' | 'both';
export type RewardType = 'points' | 'bonus' | 'cash' | 'perk';
export type AbuseFlag = 'shared_device' | 'rapid_self_referral' | 'pattern_anomaly' | 'location_anomaly' | 'duplicate_signup';

export interface Referral {
  id: string;
  referrerId: string;
  referrerName: string;
  referrerType: ReferrerType;
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
  status: ReferralStatus;
  inviteSentAt: string;
  signedUpAt?: string;
  activatedAt?: string;
  rewardedAt?: string;
  revokedAt?: string;
  firstActionType?: ActionType;
  firstActionId?: string;
  firstActionWeight?: number;
  rewardIssued?: number;
  rewardType?: RewardType;
  abuseFlags?: AbuseFlag[];
  auditTrail: ReferralAuditEntry[];
  conversionMetrics?: ReferralConversionMetrics;
}

export interface ReferralConversionMetrics {
  timeToSignup: number; // hours
  timeToActivation: number; // hours
  activationRate: number; // percentage
  retentionRate: number; // percentage after 30 days
  avgFirstActionWeight: number; // kg
  totalActionsCompleted: number;
  totalWeightProcessed: number; // kg
}

export interface ReferralAuditEntry {
  id: string;
  timestamp: string;
  action: 'invite_sent' | 'signup_completed' | 'first_action_completed' | 'reward_issued' | 'reward_revoked' | 'abuse_flagged' | 'status_changed';
  performedBy: string;
  details: string;
  metadata?: Record<string, any>;
}

export interface ReferralSummary {
  invitesSent: number;
  signupsCompleted: number;
  activatedReferrals: number;
  rewardsIssued: number;
  conversionRate: number;
  flaggedReferrals: number;
  totalRewardValue: number;
  avgTimeToActivation: number;
  avgFirstActionWeight: number;
  retentionRate: number;
}

export interface ReferralFunnel {
  step: string;
  count: number;
  percentage: number;
  dropOffReason?: string;
}

export interface ReferralPerformance {
  referrerId: string;
  referrerName: string;
  referrerType: ReferrerType;
  totalInvites: number;
  successfulReferrals: number;
  conversionRate: number;
  totalRewards: number;
  avgTimeToActivation: number;
  abuseFlags: number;
  qualityScore: number;
  city: string;
  zone: string;
}

export interface ReferralQualityInsight {
  category: 'engagement' | 'retention' | 'quality' | 'abuse' | 'efficiency';
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  change: number; // percentage change
  description: string;
  recommendation: string;
  severity: 'low' | 'medium' | 'high';
}

export interface ReferralFraudPattern {
  id: string;
  patternType: AbuseFlag;
  description: string;
  affectedReferrals: number;
  severity: 'low' | 'medium' | 'high';
  detectedAt: string;
  status: 'active' | 'resolved' | 'monitoring';
  recommendedAction: string;
  affectedCities: string[];
  affectedReferrers: string[];
}

export interface ReferralAnalytics {
  totalReferrals: number;
  activeReferrals: number;
  conversionRate: number;
  avgTimeToActivation: number;
  totalRewardValue: number;
  abuseRate: number;
  retentionRate: number;
  qualityScore: number;
  performanceByCity: Array<{
    city: string;
    referrals: number;
    conversionRate: number;
    avgTimeToActivation: number;
    abuseRate: number;
  }>;
  performanceByReferrerType: Array<{
    type: ReferrerType;
    referrals: number;
    conversionRate: number;
    avgTimeToActivation: number;
    qualityScore: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    invites: number;
    signups: number;
    activations: number;
    rewards: number;
  }>;
}

export interface ReferralFilters {
  status: ReferralStatus | '';
  referrerType: ReferrerType | '';
  city: string;
  zone: string;
  dateRange: {
    start: string;
    end: string;
  };
  hasAbuseFlags: boolean;
  search: string;
}

export interface ReferralDetail {
  referral: Referral;
  referrerProfile: UserProfile;
  invitedUserProfile?: UserProfile;
  activationEvidence: ActivationEvidence;
  rewardHistory: RewardHistory[];
  abuseSignals: AbuseSignal[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: ReferrerType;
  city: string;
  zone: string;
  joinDate: string;
  totalActions: number;
  totalWeight: number;
  averageWeight: number;
  qualityScore: number;
  isActive: boolean;
  lastActivity: string;
}

export interface ActivationEvidence {
  firstActionId: string;
  firstActionType: ActionType;
  firstActionDate: string;
  firstActionWeight: number;
  transactionId: string;
  location: string;
  verificationStatus: 'verified' | 'pending' | 'failed';
  supportingDocuments?: string[];
}

export interface RewardHistory {
  id: string;
  type: RewardType;
  amount: number;
  issuedAt: string;
  transactionId: string;
  status: 'issued' | 'pending' | 'revoked';
  reason: string;
  metadata?: Record<string, any>;
}

export interface AbuseSignal {
  type: AbuseFlag;
  detectedAt: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  evidence: string[];
  status: 'flagged' | 'investigating' | 'resolved' | 'dismissed';
  resolvedAt?: string;
  resolution?: string;
}

// Helper types
export interface CreateReferralRequest {
  referrerId: string;
  referralCode: string;
  invitedUserEmail: string;
  invitedUserPhone: string;
  rewardType: RewardType;
  rewardAmount: number;
}

export interface UpdateReferralRequest extends Partial<CreateReferralRequest> {
  id: string;
}

export interface ReferralActionRequest {
  referralId: string;
  action: 'approve_reward' | 'revoke_reward' | 'flag_abuse' | 'blacklist_source' | 'clear_flag';
  reason: string;
  metadata?: Record<string, any>;
}

export interface ReferralExportRequest {
  filters: ReferralFilters;
  format: 'csv' | 'excel' | 'json';
  includeDetails: boolean;
}

// Enums and constants
export const REFERRAL_STATUS_LABELS = {
  pending: 'Pending',
  signed_up: 'Signed Up',
  activated: 'Activated',
  rewarded: 'Rewarded',
  flagged: 'Flagged',
  revoked: 'Revoked'
} as const;

export const REFERRER_TYPE_LABELS = {
  user: 'User',
  agent: 'Agent',
  business: 'Business'
} as const;

export const ABUSE_FLAG_LABELS = {
  shared_device: 'Shared Device',
  rapid_self_referral: 'Rapid Self-Referral',
  pattern_anomaly: 'Pattern Anomaly',
  location_anomaly: 'Location Anomaly',
  duplicate_signup: 'Duplicate Signup'
} as const;

export const REWARD_TYPE_LABELS = {
  points: 'Points',
  bonus: 'Bonus',
  cash: 'Cash',
  perk: 'Perk'
} as const;

export const ACTION_TYPE_LABELS = {
  pickup: 'Pickup',
  dropoff: 'Dropoff',
  both: 'Both'
} as const;
