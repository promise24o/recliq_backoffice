// Badge System Types

export type BadgeCategory = 'consistency' | 'impact' | 'trust' | 'growth' | 'special';
export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type BadgeStatus = 'active' | 'retired';
export type EligibilityType = 'user' | 'agent' | 'business' | 'all';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  eligibility: EligibilityType[];
  rarity: BadgeRarity;
  status: BadgeStatus;
  unlockConditions: UnlockCondition[];
  perks: BadgePerk[];
  visibility: BadgeVisibility;
  createdAt: string;
  createdBy: string;
  lastModified: string;
  modifiedBy: string;
  auditTrail: BadgeAuditEntry[];
  stats: BadgeStats;
}

export interface UnlockCondition {
  id: string;
  type: 'pickups_completed' | 'kg_recycled' | 'streak_days' | 'referral_count' | 'quality_score' | 'dispute_free_days' | 'custom';
  operator: 'equals' | 'greater_than' | 'less_than' | 'greater_than_or_equal';
  value: number;
  timeFrame?: 'daily' | 'weekly' | 'monthly' | 'all_time';
  description: string;
}

export interface BadgePerk {
  id: string;
  type: 'points_multiplier' | 'priority_matching' | 'reduced_fees' | 'exclusive_access' | 'profile_highlight';
  value: number | string;
  description: string;
  isActive: boolean;
}

export interface BadgeVisibility {
  userFacingCopy: string;
  profilePlacement: 'top' | 'middle' | 'bottom';
  shareable: boolean;
  showProgress: boolean;
}

export interface BadgeStats {
  totalEarned: number;
  activeEarners: number;
  earnRate: number; // per day
  averageTimeToEarn: number; // days
  retentionImpact: number; // percentage
  lastUpdated: string;
}

export interface BadgeSystemOverview {
  activeBadges: number;
  totalUsersWithBadges: number;
  topEarnedBadge: {
    name: string;
    count: number;
  };
  rareBadges: number;
  retiredBadges: number;
  badgesWithPerks: number;
  adoptionRate: number;
}

export interface BadgeProgression {
  id: string;
  name: string;
  path: BadgeProgressionStep[];
  requirements: string;
  description: string;
}

export interface BadgeProgressionStep {
  badgeId: string;
  badgeName: string;
  step: number;
  unlocksAt: number;
  isCurrent: boolean;
  isCompleted: boolean;
}

export interface BadgeEarningsInsight {
  badgeId: string;
  badgeName: string;
  earnRate: number;
  retentionCorrelation: number;
  holderBehavior: {
    avgPickupsPerMonth: number;
    avgKgPerPickup: number;
    churnRate: number;
  };
  nonHolderBehavior: {
    avgPickupsPerMonth: number;
    avgKgPerPickup: number;
    churnRate: number;
  };
  impactScore: number;
}

export interface AntiAbuseControl {
  id: string;
  name: string;
  type: 'verification_threshold' | 'dispute_free_requirement' | 'fraud_exclusion' | 'cool_down_period';
  isActive: boolean;
  description: string;
  configuration: Record<string, any>;
}

export interface BadgeFilters {
  category: BadgeCategory | '';
  eligibility: EligibilityType | '';
  status: BadgeStatus | '';
  rarity: BadgeRarity | '';
  search: string;
}

export interface BadgeAuditEntry {
  id: string;
  timestamp: string;
  action: 'created' | 'modified' | 'activated' | 'paused' | 'retired' | 'conditions_changed';
  performedBy: string;
  details: string;
  previousState?: Partial<Badge>;
  newState?: Partial<Badge>;
}

export interface BadgeEarningFlow {
  id: string;
  userId: string;
  badgeId: string;
  progress: number;
  maxProgress: number;
  startedAt: string;
  estimatedCompletion: string;
  isCompleted: boolean;
  completedAt?: string;
}

// Helper types
export interface CreateBadgeRequest {
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  eligibility: EligibilityType[];
  rarity: BadgeRarity;
  unlockConditions: Omit<UnlockCondition, 'id'>[];
  perks: Omit<BadgePerk, 'id'>[];
  visibility: BadgeVisibility;
}

export interface UpdateBadgeRequest extends Partial<CreateBadgeRequest> {
  id: string;
}

export interface BadgeAnalytics {
  totalBadges: number;
  activeBadges: number;
  totalEarners: number;
  averageBadgesPerUser: number;
  topCategories: Array<{
    category: BadgeCategory;
    count: number;
  }>;
  rarityDistribution: Record<BadgeRarity, number>;
  earningTrends: Array<{
    date: string;
    badgesEarned: number;
  }>;
  retentionImpact: Array<{
    badgeId: string;
    badgeName: string;
    retentionRate: number;
  }>;
}
