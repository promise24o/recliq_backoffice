// Challenges System Types

export type ChallengeCategory = 'volume' | 'consistency' | 'quality' | 'growth';
export type ChallengeStatus = 'upcoming' | 'active' | 'completed' | 'paused';
export type ChallengeScope = 'global' | 'city' | 'zone';
export type ChallengeUserType = 'user' | 'agent' | 'business' | 'all';
export type ChallengeRewardType = 'points' | 'badge' | 'perks' | 'mixed';
export type ChallengeWinnerLogic = 'all' | 'top_performers' | 'lottery';

export interface Challenge {
  id: string;
  name: string;
  description: string;
  category: ChallengeCategory;
  status: ChallengeStatus;
  scope: ChallengeScope;
  targetUserType: ChallengeUserType;
  targetLocations: string[]; // city/zone names
  startDate: string;
  endDate: string;
  createdAt: string;
  createdBy: string;
  lastModified: string;
  modifiedBy: string;
  auditTrail: ChallengeAuditEntry[];
  
  // Objective Logic
  objective: ChallengeObjective;
  progressCalculation: ProgressCalculation;
  
  // Reward Configuration
  reward: ChallengeReward;
  winnerLogic: ChallengeWinnerLogic;
  
  // Safeguards
  safeguards: ChallengeSafeguards;
  
  // Visibility
  visibility: ChallengeVisibility;
  
  // Performance Metrics
  metrics: ChallengeMetrics;
}

export interface ChallengeObjective {
  id: string;
  type: 'pickups_completed' | 'dropoffs_completed' | 'kg_recycled' | 'daily_streak' | 'peak_hour_participation' | 'waste_type_specific' | 'quality_score';
  operator: 'equals' | 'greater_than' | 'greater_than_or_equal' | 'less_than';
  value: number;
  timeFrame?: 'daily' | 'weekly' | 'challenge_duration';
  description: string;
  wasteType?: string; // for waste_type_specific objectives
}

export interface ProgressCalculation {
  type: 'absolute' | 'percentage' | 'milestone';
  milestones?: {
    threshold: number;
    reward: number | string;
    description: string;
  }[];
  partialProgressAllowed: boolean;
  progressVisibility: 'public' | 'private' | 'admin_only';
}

export interface ChallengeReward {
  type: ChallengeRewardType;
  pointsAwarded?: number;
  badgeUnlock?: string;
  perks?: ChallengePerk[];
  maxTotalReward?: number;
  rewardCap?: 'daily' | 'weekly' | 'total';
  rewardCapValue?: number;
}

export interface ChallengePerk {
  id: string;
  type: 'points_multiplier' | 'priority_matching' | 'reduced_fees' | 'exclusive_access';
  value: number | string;
  description: string;
  duration?: number; // in days
}

export interface ChallengeSafeguards {
  participationCaps: {
    maxParticipants?: number;
    maxPerUser?: number;
  };
  dailyLimits: {
    maxProgressPerDay?: number;
    maxRewardPerDay?: number;
  };
  antiGaming: {
    verifiedActionRequired: boolean;
    disputeFreeEligibility: boolean;
    fraudExclusion: boolean;
    coolDownBetweenChallenges: number; // hours
  };
  conflictHandling: {
    preventConflictingChallenges: boolean;
    priorityLevel: number;
  };
}

export interface ChallengeVisibility {
  inAppCopy: {
    title: string;
    description: string;
    progressLabel: string;
    completionMessage: string;
  };
  progressDisplay: {
    showProgressBar: boolean;
    showCountdown: boolean;
    showLeaderboard: boolean;
  };
  eligibilityCriteria: string;
}

export interface ChallengeMetrics {
  totalParticipants: number;
  activeParticipants: number;
  completionRate: number;
  averageProgress: number;
  totalRewardsIssued: number;
  rewardExposure: number; // in points or monetary value
  participantDistribution: {
    users: number;
    agents: number;
    businesses: number;
  };
  locationPerformance: Array<{
    location: string;
    participants: number;
    completionRate: number;
    averageProgress: number;
  }>;
  lastUpdated: string;
}

export interface ChallengeOverview {
  activeChallenges: number;
  upcomingChallenges: number;
  completedChallenges: number;
  totalParticipants: number;
  averageCompletionRate: number;
  rewardExposure: number;
}

export interface ChallengeProgress {
  id: string;
  userId: string;
  challengeId: string;
  currentProgress: number;
  maxProgress: number;
  percentageComplete: number;
  milestonesCompleted: number[];
  startedAt: string;
  lastActivityAt: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface ChallengePerformanceInsight {
  challengeId: string;
  challengeName: string;
  effectiveness: {
    targetAchievement: number; // percentage of target achieved
    participationVsBaseline: number; // percentage change from baseline
    postChallengeRetention: number; // retention after challenge ends
  };
  costAnalysis: {
    rewardCost: number;
    operationalCost: number;
    roi: number;
  };
  behavioralImpact: {
    pickupFrequencyChange: number;
    qualityScoreChange: number;
    zoneCoverageChange: number;
  };
  recommendations: string[];
}

export interface ChallengeLifecycle {
  id: string;
  challengeId: string;
  phase: 'baseline' | 'during' | 'post_challenge' | 'decay';
  metrics: {
    baseline: {
      avgPickupsPerDay: number;
      avgQualityScore: number;
      participantCount: number;
    };
    during: {
      avgPickupsPerDay: number;
      avgQualityScore: number;
      participantCount: number;
    };
    postChallenge: {
      avgPickupsPerDay: number;
      avgQualityScore: number;
      participantCount: number;
    };
    decay: {
      daysAfterChallenge: number;
      retentionRate: number;
      behaviorPersistence: number;
    };
  };
  insights: {
    wasEffective: boolean;
    keyDrivers: string[];
    unintendedConsequences: string[];
    shouldRepeat: boolean;
    recommendedChanges: string[];
  };
}

export interface ChallengeAuditEntry {
  id: string;
  timestamp: string;
  action: 'created' | 'modified' | 'activated' | 'paused' | 'ended' | 'extended' | 'objectives_changed' | 'rewards_changed' | 'completed';
  performedBy: string;
  details: string;
  previousState?: Partial<Challenge>;
  newState?: Partial<Challenge>;
}

export interface ChallengeFilters {
  status: ChallengeStatus | '';
  category: ChallengeCategory | '';
  scope: ChallengeScope | '';
  userType: ChallengeUserType | '';
  location: string;
  search: string;
}

// Helper types
export interface CreateChallengeRequest {
  name: string;
  description: string;
  category: ChallengeCategory;
  scope: ChallengeScope;
  targetUserType: ChallengeUserType;
  targetLocations: string[];
  startDate: string;
  endDate: string;
  objective: Omit<ChallengeObjective, 'id'>;
  progressCalculation: ProgressCalculation;
  reward: ChallengeReward;
  winnerLogic: ChallengeWinnerLogic;
  safeguards: ChallengeSafeguards;
  visibility: ChallengeVisibility;
}

export interface UpdateChallengeRequest extends Partial<CreateChallengeRequest> {
  id: string;
}

export interface ChallengeAnalytics {
  totalChallenges: number;
  activeChallenges: number;
  totalParticipants: number;
  averageCompletionRate: number;
  totalRewardExposure: number;
  categoryDistribution: Record<ChallengeCategory, number>;
  statusDistribution: Record<ChallengeStatus, number>;
  performanceTrends: Array<{
    date: string;
    participants: number;
    completions: number;
    rewards: number;
  }>;
  topPerformingChallenges: Array<{
    id: string;
    name: string;
    completionRate: number;
    participantCount: number;
  }>;
}
