// Completed Referrals System Types

export type ReferrerType = 'user' | 'agent' | 'business';
export type FirstActionType = 'pickup' | 'dropoff';
export type RewardType = 'points' | 'bonus' | 'cash' | 'perk';
export type RewardStatus = 'issued' | 'pending' | 'failed' | 'cancelled';
export type CompletionStatus = 'completed' | 'verified' | 'rewarded' | 'finalized';
export type AnomalyType = 'weight_variance' | 'timing_anomaly' | 'location_anomaly' | 'behavior_inconsistency' | 'duplicate_activity';

export interface CompletedReferral {
  id: string;
  originalReferralId: string;
  referrerId: string;
  referrerName: string;
  referrerType: ReferrerType;
  referrerEmail: string;
  referrerPhone: string;
  referrerCity: string;
  referrerZone: string;
  referralCode: string;
  invitedUserId: string;
  invitedUserName: string;
  invitedUserEmail: string;
  invitedUserPhone: string;
  invitedUserCity: string;
  invitedUserZone: string;
  
  // Completion specific fields
  firstActionId: string;
  firstActionType: FirstActionType;
  firstActionWeight: number;
  firstActionWasteType: string;
  firstActionLocation: string;
  firstActionTimestamp: string;
  verificationCompletedAt: string;
  completionDate: string;
  timeToCompletion: number; // days from invite to first action
  
  // Reward information
  rewardIssued: boolean;
  rewardType: RewardType;
  rewardAmount: number;
  rewardStatus: RewardStatus;
  rewardIssuedAt: string;
  walletTransactionId?: string;
  
  // Quality metrics
  weightVariance: number; // percentage from expected
  behaviorConsistency: number; // 0-100 score
  disputeFree: boolean;
  fraudChecksPassed: boolean;
  retention30Days: boolean;
  retention60Days: boolean;
  
  // Anomaly tracking
  anomalies: Anomaly[];
  flaggedForReview: boolean;
  reviewReason?: string;
  
  // Financial tracking
  referralCost: number;
  revenueGenerated: number;
  roi: number; // return on investment percentage
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  notes?: string;
}

export interface Anomaly {
  id: string;
  type: AnomalyType;
  severity: 'low' | 'medium' | 'high';
  detectedAt: string;
  description: string;
  value?: number;
  expectedValue?: number;
  resolved: boolean;
  resolvedAt?: string;
}

export interface CompletionSummary {
  totalCompletedReferrals: number;
  firstActionsCompleted: number;
  totalWeightRecycled: number;
  totalRewardsIssued: number;
  topReferrersCount: number;
  avgTimeToCompletion: number;
  avgRewardPerReferral: number;
  totalReferralCost: number;
  totalRevenueGenerated: number;
  overallROI: number;
  completionRate: number;
  retention30DayRate: number;
  retention60DayRate: number;
}

export interface ReferralCompletionTrend {
  date: string;
  completed: number;
  pickups: number;
  dropoffs: number;
  avgTimeToCompletion: number;
  avgRewardAmount: number;
  totalWeight: number;
}

export interface ReferralQualityAnalysis {
  category: 'completion' | 'retention' | 'quality' | 'financial';
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  change: number; // percentage change
  description: string;
  recommendation: string;
  severity: 'low' | 'medium' | 'high';
}

export interface TopReferrer {
  id: string;
  name: string;
  type: ReferrerType;
  city: string;
  totalReferrals: number;
  completedReferrals: number;
  completionRate: number;
  totalWeightRecycled: number;
  totalRewardsIssued: number;
  avgTimeToCompletion: number;
  qualityScore: number;
  revenueGenerated: number;
  roi: number;
  retention30DayRate: number;
  retention60DayRate: number;
}

export interface CityPerformance {
  city: string;
  totalReferrals: number;
  completedReferrals: number;
  completionRate: number;
  totalWeightRecycled: number;
  totalRewardsIssued: number;
  avgTimeToCompletion: number;
  avgRewardPerReferral: number;
  topReferrers: number;
  revenueGenerated: number;
}

export interface ReferrerTypePerformance {
  type: ReferrerType;
  totalReferrals: number;
  completedReferrals: number;
  completionRate: number;
  totalWeightRecycled: number;
  totalRewardsIssued: number;
  avgTimeToCompletion: number;
  avgRewardPerReferral: number;
  revenueGenerated: number;
  roi: number;
  qualityScore: number;
}

export interface ReferralCompletionAnalytics {
  totalCompleted: number;
  totalWeightRecycled: number;
  totalRewardsIssued: number;
  avgTimeToCompletion: number;
  completionRate: number;
  retention30DayRate: number;
  retention60DayRate: number;
  overallROI: number;
  trends: ReferralCompletionTrend[];
  qualityAnalysis: ReferralQualityAnalysis[];
  topReferrers: TopReferrer[];
  cityPerformance: CityPerformance[];
  referrerTypePerformance: ReferrerTypePerformance[];
  monthlyTrends: Array<{
    month: string;
    completed: number;
    weight: number;
    rewards: number;
    revenue: number;
    roi: number;
  }>;
  wasteCategoryBreakdown: Array<{
    category: string;
    count: number;
    weight: number;
    avgReward: number;
  }>;
}

export interface CompletedReferralFilters {
  dateRange: {
    start: string;
    end: string;
  };
  city: string;
  zone: string;
  referrerType: ReferrerType | '';
  firstActionType: FirstActionType | '';
  rewardType: RewardType | '';
  rewardStatus: RewardStatus | '';
  minTimeToCompletion?: number;
  maxTimeToCompletion?: number;
  minRewardAmount?: number;
  maxRewardAmount?: number;
  hasAnomalies: boolean;
  flaggedForReview: boolean;
  search: string;
}

export interface CompletedReferralDetail {
  referral: CompletedReferral;
  referrerProfile: UserProfile;
  invitedUserProfile: UserProfile;
  firstActionDetails: FirstActionDetails;
  rewardBreakdown: RewardBreakdown;
  qualitySignals: QualitySignals;
  auditTrail: AuditEntry[];
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
  totalEarnings: number;
  totalReferralsGiven: number;
  totalReferralsCompleted: number;
}

export interface FirstActionDetails {
  actionId: string;
  type: FirstActionType;
  wasteType: string;
  weight: number;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timestamp: string;
  verificationStatus: 'pending' | 'in_progress' | 'completed' | 'failed';
  verificationCompletedAt: string;
  verifiedBy: string;
  photos: string[];
  notes?: string;
}

export interface RewardBreakdown {
  rewardType: RewardType;
  baseAmount: number;
  bonusAmount: number;
  totalAmount: number;
  issuedAt: string;
  status: RewardStatus;
  walletTransactionId?: string;
  transactionHash?: string;
  expirationDate?: string;
  usedAmount?: number;
  remainingAmount?: number;
}

export interface QualitySignals {
  weightVariance: {
    actual: number;
    expected: number;
    variance: number;
    acceptable: boolean;
  };
  behaviorConsistency: {
    score: number;
    factors: string[];
    riskLevel: 'low' | 'medium' | 'high';
  };
  disputeStatus: {
    hasDisputes: boolean;
    resolvedDisputes: number;
    openDisputes: number;
  };
  fraudChecks: {
    allPassed: boolean;
    checksPerformed: string[];
    riskScore: number;
  };
  retention: {
    activeAfter30Days: boolean;
    activeAfter60Days: boolean;
    totalActions: number;
    lastActionDate: string;
  };
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  details: string;
  metadata?: Record<string, any>;
}

// Helper types
export interface CreateCompletedReferralRequest {
  originalReferralId: string;
  firstActionId: string;
  firstActionType: FirstActionType;
  firstActionWeight: number;
  firstActionWasteType: string;
  firstActionLocation: string;
  firstActionTimestamp: string;
  rewardType: RewardType;
  rewardAmount: number;
}

export interface UpdateCompletedReferralRequest extends Partial<CreateCompletedReferralRequest> {
  id: string;
}

export interface CompletedReferralActionRequest {
  referralId: string;
  action: 'flag_anomaly' | 'resolve_anomaly' | 'add_note' | 'export_receipt';
  reason: string;
  metadata?: Record<string, any>;
}

export interface CompletedReferralExportRequest {
  filters: CompletedReferralFilters;
  format: 'csv' | 'excel' | 'json' | 'finance';
  includeDetails: boolean;
  includeAuditTrail: boolean;
}

// Enums and constants
export const REFERRER_TYPE_LABELS = {
  user: 'User',
  agent: 'Agent',
  business: 'Business'
} as const;

export const FIRST_ACTION_TYPE_LABELS = {
  pickup: 'Pickup',
  dropoff: 'Dropoff'
} as const;

export const REWARD_TYPE_LABELS = {
  points: 'Points',
  bonus: 'Bonus',
  cash: 'Cash',
  perk: 'Perk'
} as const;

export const REWARD_STATUS_LABELS = {
  issued: 'Issued',
  pending: 'Pending',
  failed: 'Failed',
  cancelled: 'Cancelled'
} as const;

export const COMPLETION_STATUS_LABELS = {
  completed: 'Completed',
  verified: 'Verified',
  rewarded: 'Rewarded',
  finalized: 'Finalized'
} as const;

export const ANOMALY_TYPE_LABELS = {
  weight_variance: 'Weight Variance',
  timing_anomaly: 'Timing Anomaly',
  location_anomaly: 'Location Anomaly',
  behavior_inconsistency: 'Behavior Inconsistency',
  duplicate_activity: 'Duplicate Activity'
} as const;
