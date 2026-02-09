import { Badge, BadgeSystemOverview, BadgeProgression, BadgeEarningsInsight, AntiAbuseControl, BadgeCategory, BadgeRarity, BadgeStatus, EligibilityType } from './types';

// Mock Badges Data
export const mockBadges: Badge[] = [
  {
    id: 'BADGE001',
    name: 'Eco Starter',
    description: 'Completed your first recycling pickup',
    icon: '🌱',
    category: 'consistency',
    eligibility: ['user', 'agent'],
    rarity: 'common',
    status: 'active',
    unlockConditions: [
      {
        id: 'UC001',
        type: 'pickups_completed',
        operator: 'greater_than_or_equal',
        value: 1,
        timeFrame: 'all_time',
        description: 'Complete at least 1 recycling pickup'
      }
    ],
    perks: [
      {
        id: 'PERK001',
        type: 'points_multiplier',
        value: 1.1,
        description: '10% points bonus for next 5 pickups',
        isActive: true
      }
    ],
    visibility: {
      userFacingCopy: 'You\'ve taken your first step towards a greener Nigeria!',
      profilePlacement: 'top',
      shareable: true,
      showProgress: true
    },
    createdAt: '2024-01-15T00:00:00Z',
    createdBy: 'SYSTEM',
    lastModified: '2024-01-15T00:00:00Z',
    modifiedBy: 'SYSTEM',
    auditTrail: [
      {
        id: 'AUDIT001',
        timestamp: '2024-01-15T00:00:00Z',
        action: 'created',
        performedBy: 'SYSTEM',
        details: 'Badge created as part of initial system setup'
      }
    ],
    stats: {
      totalEarned: 15420,
      activeEarners: 12890,
      earnRate: 45.2,
      averageTimeToEarn: 1,
      retentionImpact: 12.5,
      lastUpdated: '2024-01-26T00:00:00Z'
    }
  },
  {
    id: 'BADGE002',
    name: 'Lagos Recycler',
    description: 'Completed 50 pickups in Lagos',
    icon: '🏙️',
    category: 'impact',
    eligibility: ['user', 'agent'],
    rarity: 'uncommon',
    status: 'active',
    unlockConditions: [
      {
        id: 'UC002',
        type: 'pickups_completed',
        operator: 'greater_than_or_equal',
        value: 50,
        timeFrame: 'all_time',
        description: 'Complete 50 pickups in Lagos'
      }
    ],
    perks: [
      {
        id: 'PERK002',
        type: 'priority_matching',
        value: 'high',
        description: 'Priority agent matching in Lagos',
        isActive: true
      }
    ],
    visibility: {
      userFacingCopy: 'Making Lagos cleaner, one pickup at a time!',
      profilePlacement: 'middle',
      shareable: true,
      showProgress: true
    },
    createdAt: '2024-01-15T00:00:00Z',
    createdBy: 'ADMIN',
    lastModified: '2024-01-20T00:00:00Z',
    modifiedBy: 'ADMIN',
    auditTrail: [
      {
        id: 'AUDIT002',
        timestamp: '2024-01-15T00:00:00Z',
        action: 'created',
        performedBy: 'ADMIN',
        details: 'Badge created for Lagos-specific recognition'
      },
      {
        id: 'AUDIT003',
        timestamp: '2024-01-20T00:00:00Z',
        action: 'modified',
        performedBy: 'ADMIN',
        details: 'Updated priority matching perk description'
      }
    ],
    stats: {
      totalEarned: 3420,
      activeEarners: 2890,
      earnRate: 8.7,
      averageTimeToEarn: 45,
      retentionImpact: 18.3,
      lastUpdated: '2024-01-26T00:00:00Z'
    }
  },
  {
    id: 'BADGE003',
    name: 'Waste Warrior',
    description: 'Recycled over 1000kg of waste',
    icon: '⚔️',
    category: 'impact',
    eligibility: ['user', 'agent'],
    rarity: 'rare',
    status: 'active',
    unlockConditions: [
      {
        id: 'UC003',
        type: 'kg_recycled',
        operator: 'greater_than_or_equal',
        value: 1000,
        timeFrame: 'all_time',
        description: 'Recycle at least 1000kg of waste'
      }
    ],
    perks: [
      {
        id: 'PERK003',
        type: 'points_multiplier',
        value: 1.25,
        description: '25% points bonus on all pickups',
        isActive: true
      },
      {
        id: 'PERK004',
        type: 'profile_highlight',
        value: 'gold',
        description: 'Gold profile highlight',
        isActive: true
      }
    ],
    visibility: {
      userFacingCopy: 'A true champion of environmental conservation!',
      profilePlacement: 'top',
      shareable: true,
      showProgress: true
    },
    createdAt: '2024-01-15T00:00:00Z',
    createdBy: 'ADMIN',
    lastModified: '2024-01-15T00:00:00Z',
    modifiedBy: 'ADMIN',
    auditTrail: [
      {
        id: 'AUDIT004',
        timestamp: '2024-01-15T00:00:00Z',
        action: 'created',
        performedBy: 'ADMIN',
        details: 'High-impact badge for waste recycling champions'
      }
    ],
    stats: {
      totalEarned: 890,
      activeEarners: 756,
      earnRate: 2.1,
      averageTimeToEarn: 120,
      retentionImpact: 28.7,
      lastUpdated: '2024-01-26T00:00:00Z'
    }
  },
  {
    id: 'BADGE004',
    name: 'Trust Agent',
    description: 'Maintained 100% dispute-free record for 90 days',
    icon: '🛡️',
    category: 'trust',
    eligibility: ['agent'],
    rarity: 'epic',
    status: 'active',
    unlockConditions: [
      {
        id: 'UC004',
        type: 'dispute_free_days',
        operator: 'greater_than_or_equal',
        value: 90,
        timeFrame: 'all_time',
        description: 'Maintain dispute-free record for 90 consecutive days'
      },
      {
        id: 'UC005',
        type: 'quality_score',
        operator: 'greater_than_or_equal',
        value: 4.5,
        timeFrame: 'all_time',
        description: 'Maintain average quality score of 4.5+'
      }
    ],
    perks: [
      {
        id: 'PERK005',
        type: 'priority_matching',
        value: 'highest',
        description: 'Highest priority in agent matching',
        isActive: true
      },
      {
        id: 'PERK006',
        type: 'reduced_fees',
        value: 0.15,
        description: '15% reduction in service fees',
        isActive: true
      }
    ],
    visibility: {
      userFacingCopy: 'A trusted partner in the recycling ecosystem',
      profilePlacement: 'top',
      shareable: true,
      showProgress: true
    },
    createdAt: '2024-01-15T00:00:00Z',
    createdBy: 'ADMIN',
    lastModified: '2024-01-15T00:00:00Z',
    modifiedBy: 'ADMIN',
    auditTrail: [
      {
        id: 'AUDIT005',
        timestamp: '2024-01-15T00:00:00Z',
        action: 'created',
        performedBy: 'ADMIN',
        details: 'Elite badge for trusted agents'
      }
    ],
    stats: {
      totalEarned: 156,
      activeEarners: 142,
      earnRate: 0.4,
      averageTimeToEarn: 180,
      retentionImpact: 45.2,
      lastUpdated: '2024-01-26T00:00:00Z'
    }
  },
  {
    id: 'BADGE005',
    name: 'Green Champion',
    description: 'Refer 10+ active users who complete 5+ pickups each',
    icon: '🏆',
    category: 'growth',
    eligibility: ['user'],
    rarity: 'legendary',
    status: 'active',
    unlockConditions: [
      {
        id: 'UC006',
        type: 'referral_count',
        operator: 'greater_than_or_equal',
        value: 10,
        timeFrame: 'all_time',
        description: 'Refer at least 10 users'
      },
      {
        id: 'UC007',
        type: 'custom',
        operator: 'greater_than_or_equal',
        value: 5,
        timeFrame: 'all_time',
        description: 'Each referred user must complete 5+ pickups'
      }
    ],
    perks: [
      {
        id: 'PERK007',
        type: 'points_multiplier',
        value: 1.5,
        description: '50% points bonus on all activities',
        isActive: true
      },
      {
        id: 'PERK008',
        type: 'exclusive_access',
        value: 'beta_features',
        description: 'Early access to new features',
        isActive: true
      },
      {
        id: 'PERK009',
        type: 'profile_highlight',
        value: 'platinum',
        description: 'Platinum profile highlight with special badge',
        isActive: true
      }
    ],
    visibility: {
      userFacingCopy: 'Leading the green revolution in Nigeria!',
      profilePlacement: 'top',
      shareable: true,
      showProgress: true
    },
    createdAt: '2024-01-15T00:00:00Z',
    createdBy: 'ADMIN',
    lastModified: '2024-01-15T00:00:00Z',
    modifiedBy: 'ADMIN',
    auditTrail: [
      {
        id: 'AUDIT006',
        timestamp: '2024-01-15T00:00:00Z',
        action: 'created',
        performedBy: 'ADMIN',
        details: 'Legendary badge for community growth leaders'
      }
    ],
    stats: {
      totalEarned: 23,
      activeEarners: 21,
      earnRate: 0.06,
      averageTimeToEarn: 365,
      retentionImpact: 67.8,
      lastUpdated: '2024-01-26T00:00:00Z'
    }
  },
  {
    id: 'BADGE006',
    name: 'Early Bird',
    description: 'Completed 25 pickups before 9 AM',
    icon: '🌅',
    category: 'consistency',
    eligibility: ['user'],
    rarity: 'uncommon',
    status: 'retired',
    unlockConditions: [
      {
        id: 'UC008',
        type: 'custom',
        operator: 'greater_than_or_equal',
        value: 25,
        timeFrame: 'all_time',
        description: 'Complete 25 pickups before 9 AM'
      }
    ],
    perks: [
      {
        id: 'PERK010',
        type: 'points_multiplier',
        value: 1.15,
        description: '15% bonus on early morning pickups',
        isActive: false
      }
    ],
    visibility: {
      userFacingCopy: 'Early riser making a difference!',
      profilePlacement: 'middle',
      shareable: true,
      showProgress: false
    },
    createdAt: '2024-01-15T00:00:00Z',
    createdBy: 'ADMIN',
    lastModified: '2024-01-10T00:00:00Z',
    modifiedBy: 'ADMIN',
    auditTrail: [
      {
        id: 'AUDIT007',
        timestamp: '2024-01-15T00:00:00Z',
        action: 'created',
        performedBy: 'ADMIN',
        details: 'Badge for early morning recyclers'
      },
      {
        id: 'AUDIT008',
        timestamp: '2024-01-10T00:00:00Z',
        action: 'retired',
        performedBy: 'ADMIN',
        details: 'Badge retired due to low engagement'
      }
    ],
    stats: {
      totalEarned: 567,
      activeEarners: 234,
      earnRate: 0,
      averageTimeToEarn: 60,
      retentionImpact: 8.9,
      lastUpdated: '2024-01-26T00:00:00Z'
    }
  }
];

// Mock Badge System Overview
export const mockBadgeSystemOverview: BadgeSystemOverview = {
  activeBadges: 5,
  totalUsersWithBadges: 28450,
  topEarnedBadge: {
    name: 'Eco Starter',
    count: 15420
  },
  rareBadges: 2,
  retiredBadges: 1,
  badgesWithPerks: 4,
  adoptionRate: 67.3
};

// Mock Badge Progressions
export const mockBadgeProgressions: BadgeProgression[] = [
  {
    id: 'PROG001',
    name: 'Eco Warrior Path',
    path: [
      {
        badgeId: 'BADGE001',
        badgeName: 'Eco Starter',
        step: 1,
        unlocksAt: 1,
        isCurrent: false,
        isCompleted: true
      },
      {
        badgeId: 'BADGE002',
        badgeName: 'Lagos Recycler',
        step: 2,
        unlocksAt: 50,
        isCurrent: true,
        isCompleted: false
      },
      {
        badgeId: 'BADGE003',
        badgeName: 'Waste Warrior',
        step: 3,
        unlocksAt: 1000,
        isCurrent: false,
        isCompleted: false
      }
    ],
    requirements: 'Complete pickups and recycle waste to advance',
    description: 'Progress from beginner to expert recycler'
  },
  {
    id: 'PROG002',
    name: 'Trust Builder Path',
    path: [
      {
        badgeId: 'BADGE001',
        badgeName: 'Eco Starter',
        step: 1,
        unlocksAt: 1,
        isCurrent: false,
        isCompleted: true
      },
      {
        badgeId: 'BADGE004',
        badgeName: 'Trust Agent',
        step: 2,
        unlocksAt: 90,
        isCurrent: false,
        isCompleted: false
      }
    ],
    requirements: 'Maintain quality and dispute-free record',
    description: 'Build trust through consistent quality service'
  }
];

// Mock Badge Earnings Insights
export const mockBadgeEarningsInsights: BadgeEarningsInsight[] = [
  {
    badgeId: 'BADGE001',
    badgeName: 'Eco Starter',
    earnRate: 45.2,
    retentionCorrelation: 12.5,
    holderBehavior: {
      avgPickupsPerMonth: 8.7,
      avgKgPerPickup: 12.3,
      churnRate: 5.2
    },
    nonHolderBehavior: {
      avgPickupsPerMonth: 3.1,
      avgKgPerPickup: 8.9,
      churnRate: 18.7
    },
    impactScore: 8.5
  },
  {
    badgeId: 'BADGE003',
    badgeName: 'Waste Warrior',
    earnRate: 2.1,
    retentionCorrelation: 28.7,
    holderBehavior: {
      avgPickupsPerMonth: 15.2,
      avgKgPerPickup: 18.7,
      churnRate: 2.1
    },
    nonHolderBehavior: {
      avgPickupsPerMonth: 4.3,
      avgKgPerPickup: 10.2,
      churnRate: 15.8
    },
    impactScore: 9.2
  },
  {
    badgeId: 'BADGE005',
    badgeName: 'Green Champion',
    earnRate: 0.06,
    retentionCorrelation: 67.8,
    holderBehavior: {
      avgPickupsPerMonth: 22.5,
      avgKgPerPickup: 25.1,
      churnRate: 0.8
    },
    nonHolderBehavior: {
      avgPickupsPerMonth: 5.1,
      avgKgPerPickup: 11.3,
      churnRate: 16.2
    },
    impactScore: 9.8
  }
];

// Mock Anti-Abuse Controls
export const mockAntiAbuseControls: AntiAbuseControl[] = [
  {
    id: 'CONTROL001',
    name: 'Minimum Verification Threshold',
    type: 'verification_threshold',
    isActive: true,
    description: 'Users must be verified before earning badges',
    configuration: {
      minAccountAge: 7,
      minPickups: 1,
      requiredDocuments: ['id', 'address']
    }
  },
  {
    id: 'CONTROL002',
    name: 'Dispute-Free Requirement',
    type: 'dispute_free_requirement',
    isActive: true,
    description: 'Trust badges require dispute-free record',
    configuration: {
      minDisputeFreeDays: 30,
      maxDisputeCount: 0
    }
  },
  {
    id: 'CONTROL003',
    name: 'Fraud Exclusion Rules',
    type: 'fraud_exclusion',
    isActive: true,
    description: 'Users with fraud history cannot earn badges',
    configuration: {
      fraudScoreThreshold: 0.7,
      exclusionPeriod: 365
    }
  },
  {
    id: 'CONTROL004',
    name: 'Cool-Down Periods',
    type: 'cool_down_period',
    isActive: true,
    description: 'Prevent badge farming through time restrictions',
    configuration: {
      minTimeBetweenBadges: 24,
      maxBadgesPerDay: 3,
      maxBadgesPerWeek: 10
    }
  }
];

// Helper functions
export const getBadgeRarityColor = (rarity: BadgeRarity): string => {
  switch (rarity) {
    case 'common': return '#6b7280';
    case 'uncommon': return '#10b981';
    case 'rare': return '#3b82f6';
    case 'epic': return '#8b5cf6';
    case 'legendary': return '#f59e0b';
    default: return '#6b7280';
  }
};

export const getBadgeCategoryColor = (category: BadgeCategory): string => {
  switch (category) {
    case 'consistency': return '#10b981';
    case 'impact': return '#3b82f6';
    case 'trust': return '#8b5cf6';
    case 'growth': return '#f59e0b';
    case 'special': return '#ef4444';
    default: return '#6b7280';
  }
};

export const getBadgeStatusColor = (status: BadgeStatus): string => {
  switch (status) {
    case 'active': return '#10b981';
    case 'retired': return '#6b7280';
    default: return '#6b7280';
  }
};
