import { Challenge, ChallengeOverview, ChallengeProgress, ChallengePerformanceInsight, ChallengeLifecycle, ChallengeCategory, ChallengeStatus, ChallengeScope, ChallengeUserType, ChallengeRewardType, ChallengeWinnerLogic } from './types';

// Mock Challenges Data
export const mockChallenges: Challenge[] = [
  {
    id: 'CHALLENGE001',
    name: 'Lagos Recycling Sprint',
    description: 'Complete 50 pickups in Lagos this month to earn bonus points and exclusive perks',
    category: 'volume' as ChallengeCategory,
    status: 'active' as ChallengeStatus,
    scope: 'city' as ChallengeScope,
    targetUserType: 'all' as ChallengeUserType,
    targetLocations: ['Lagos'],
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-01-31T23:59:59Z',
    createdAt: '2023-12-15T00:00:00Z',
    createdBy: 'SYSTEM',
    lastModified: '2024-01-15T00:00:00Z',
    modifiedBy: 'ADMIN',
    auditTrail: [
      {
        id: 'AUDIT001',
        timestamp: '2023-12-15T00:00:00Z',
        action: 'created',
        performedBy: 'SYSTEM',
        details: 'Challenge created as part of Q1 volume push initiative'
      },
      {
        id: 'AUDIT002',
        timestamp: '2024-01-01T00:00:00Z',
        action: 'activated',
        performedBy: 'ADMIN',
        details: 'Challenge activated on schedule'
      }
    ],
    objective: {
      id: 'OBJ001',
      type: 'pickups_completed',
      operator: 'greater_than_or_equal',
      value: 50,
      timeFrame: 'challenge_duration',
      description: 'Complete at least 50 recycling pickups during the challenge period'
    },
    progressCalculation: {
      type: 'absolute',
      milestones: [
        { threshold: 10, reward: 100, description: '10 pickups completed - 100 bonus points' },
        { threshold: 25, reward: 250, description: '25 pickups completed - 250 bonus points' },
        { threshold: 50, reward: 500, description: '50 pickups completed - 500 bonus points' }
      ],
      partialProgressAllowed: true,
      progressVisibility: 'public'
    },
    reward: {
      type: 'points' as ChallengeRewardType,
      pointsAwarded: 1000,
      rewardCap: 'total',
      rewardCapValue: 1000
    },
    winnerLogic: 'all' as ChallengeWinnerLogic,
    safeguards: {
      participationCaps: {
        maxParticipants: 5000,
        maxPerUser: 50
      },
      dailyLimits: {
        maxProgressPerDay: 5,
        maxRewardPerDay: 100
      },
      antiGaming: {
        verifiedActionRequired: true,
        disputeFreeEligibility: true,
        fraudExclusion: true,
        coolDownBetweenChallenges: 24
      },
      conflictHandling: {
        preventConflictingChallenges: true,
        priorityLevel: 1
      }
    },
    visibility: {
      inAppCopy: {
        title: 'Lagos Recycling Sprint',
        description: 'Complete 50 pickups this month and earn up to 1000 bonus points!',
        progressLabel: 'Pickups Completed',
        completionMessage: 'Congratulations! You completed the Lagos Recycling Sprint!'
      },
      progressDisplay: {
        showProgressBar: true,
        showCountdown: true,
        showLeaderboard: true
      },
      eligibilityCriteria: 'Open to all verified users in Lagos with dispute-free record'
    },
    metrics: {
      totalParticipants: 3450,
      activeParticipants: 2890,
      completionRate: 67.3,
      averageProgress: 33.6,
      totalRewardsIssued: 2340000,
      rewardExposure: 2340000,
      participantDistribution: {
        users: 2100,
        agents: 1200,
        businesses: 150
      },
      locationPerformance: [
        {
          location: 'Lagos',
          participants: 3450,
          completionRate: 67.3,
          averageProgress: 33.6
        }
      ],
      lastUpdated: '2024-01-26T00:00:00Z'
    }
  },
  {
    id: 'CHALLENGE002',
    name: 'E-Waste Champion Challenge',
    description: 'Recycle 100kg of electronic waste to unlock special badge and priority service',
    category: 'quality' as ChallengeCategory,
    status: 'active' as ChallengeStatus,
    scope: 'global' as ChallengeScope,
    targetUserType: 'all' as ChallengeUserType,
    targetLocations: ['All Cities'],
    startDate: '2024-01-10T00:00:00Z',
    endDate: '2024-02-10T23:59:59Z',
    createdAt: '2024-01-05T00:00:00Z',
    createdBy: 'ADMIN',
    lastModified: '2024-01-15T00:00:00Z',
    modifiedBy: 'ADMIN',
    auditTrail: [
      {
        id: 'AUDIT003',
        timestamp: '2024-01-05T00:00:00Z',
        action: 'created',
        performedBy: 'ADMIN',
        details: 'E-waste focused quality challenge created'
      }
    ],
    objective: {
      id: 'OBJ002',
      type: 'waste_type_specific',
      operator: 'greater_than_or_equal',
      value: 100,
      timeFrame: 'challenge_duration',
      description: 'Recycle at least 100kg of electronic waste',
      wasteType: 'electronic'
    },
    progressCalculation: {
      type: 'absolute',
      milestones: [
        { threshold: 10, reward: 'E-Waste Helper Badge', description: '25kg recycled - E-Waste Helper Badge' },
        { threshold: 50, reward: 'E-Waste Expert Badge', description: '50kg recycled - E-Waste Expert Badge' },
        { threshold: 100, reward: 'E-Waste Champion Badge', description: '100kg recycled - E-Waste Champion Badge' }
      ],
      partialProgressAllowed: true,
      progressVisibility: 'public'
    },
    reward: {
      type: 'badge' as ChallengeRewardType,
      badgeUnlock: 'BADGE_EWASTE_CHAMPION',
      rewardCap: 'total',
      rewardCapValue: 1
    },
    winnerLogic: 'all' as ChallengeWinnerLogic,
    safeguards: {
      participationCaps: {
        maxParticipants: 10000,
        maxPerUser: 1
      },
      dailyLimits: {
        maxProgressPerDay: 10,
        maxRewardPerDay: 1
      },
      antiGaming: {
        verifiedActionRequired: true,
        disputeFreeEligibility: true,
        fraudExclusion: true,
        coolDownBetweenChallenges: 48
      },
      conflictHandling: {
        preventConflictingChallenges: false,
        priorityLevel: 2
      }
    },
    visibility: {
      inAppCopy: {
        title: 'E-Waste Champion Challenge',
        description: 'Recycle 100kg of e-waste and become an E-Waste Champion!',
        progressLabel: 'E-Waste Recycled',
        completionMessage: 'Amazing! You are now an E-Waste Champion!'
      },
      progressDisplay: {
        showProgressBar: true,
        showCountdown: true,
        showLeaderboard: false
      },
      eligibilityCriteria: 'Open to all users with verified accounts. E-waste must be properly sorted and documented.'
    },
    metrics: {
      totalParticipants: 890,
      activeParticipants: 456,
      completionRate: 45.2,
      averageProgress: 45.2,
      totalRewardsIssued: 456,
      rewardExposure: 45600,
      participantDistribution: {
        users: 780,
        agents: 90,
        businesses: 20
      },
      locationPerformance: [
        {
          location: 'Lagos',
          participants: 320,
          completionRate: 48.1,
          averageProgress: 48.1
        },
        {
          location: 'Abuja',
          participants: 280,
          completionRate: 42.9,
          averageProgress: 42.9
        },
        {
          location: 'Port Harcourt',
          participants: 190,
          completionRate: 44.7,
          averageProgress: 44.7
        }
      ],
      lastUpdated: '2024-01-26T00:00:00Z'
    }
  },
  {
    id: 'CHALLENGE003',
    name: 'Daily Streak Master',
    description: 'Maintain a 7-day pickup streak to earn 2x points multiplier for a week',
    category: 'consistency' as ChallengeCategory,
    status: 'upcoming' as ChallengeStatus,
    scope: 'global' as ChallengeScope,
    targetUserType: 'user' as ChallengeUserType,
    targetLocations: ['All Cities'],
    startDate: '2024-02-01T00:00:00Z',
    endDate: '2024-02-28T23:59:59Z',
    createdAt: '2024-01-20T00:00:00Z',
    createdBy: 'ADMIN',
    lastModified: '2024-01-20T00:00:00Z',
    modifiedBy: 'ADMIN',
    auditTrail: [
      {
        id: 'AUDIT004',
        timestamp: '2024-01-20T00:00:00Z',
        action: 'created',
        performedBy: 'ADMIN',
        details: 'Consistency challenge created to improve user retention'
      }
    ],
    objective: {
      id: 'OBJ003',
      type: 'daily_streak',
      operator: 'greater_than_or_equal',
      value: 7,
      timeFrame: 'challenge_duration',
      description: 'Maintain a 7-day consecutive pickup streak'
    },
    progressCalculation: {
      type: 'milestone',
      milestones: [
        { threshold: 3, reward: 1.2, description: '3-day streak - 20% points boost for 3 days' },
        { threshold: 7, reward: 2.0, description: '7-day streak - 100% points boost for 7 days' },
        { threshold: 14, reward: 2.5, description: '14-day streak - 150% points boost for 7 days' }
      ],
      partialProgressAllowed: false,
      progressVisibility: 'private'
    },
    reward: {
      type: 'perks' as ChallengeRewardType,
      perks: [
        {
          id: 'PERK001',
          type: 'points_multiplier',
          value: 2.0,
          description: '2x points multiplier',
          duration: 7
        }
      ],
      rewardCap: 'weekly',
      rewardCapValue: 7
    },
    winnerLogic: 'all' as ChallengeWinnerLogic,
    safeguards: {
      participationCaps: {
        maxParticipants: 15000,
        maxPerUser: 1
      },
      dailyLimits: {
        maxProgressPerDay: 1,
        maxRewardPerDay: 1
      },
      antiGaming: {
        verifiedActionRequired: true,
        disputeFreeEligibility: true,
        fraudExclusion: true,
        coolDownBetweenChallenges: 72
      },
      conflictHandling: {
        preventConflictingChallenges: true,
        priorityLevel: 3
      }
    },
    visibility: {
      inAppCopy: {
        title: 'Daily Streak Master',
        description: 'Keep the streak going! 7 days of pickups = 2x points for a week!',
        progressLabel: 'Current Streak',
        completionMessage: 'Incredible! You\'re a Daily Streak Master!'
      },
      progressDisplay: {
        showProgressBar: true,
        showCountdown: true,
        showLeaderboard: false
      },
      eligibilityCriteria: 'Open to individual users only. Must have verified account and dispute-free record.'
    },
    metrics: {
      totalParticipants: 0,
      activeParticipants: 0,
      completionRate: 0,
      averageProgress: 0,
      totalRewardsIssued: 0,
      rewardExposure: 0,
      participantDistribution: {
        users: 0,
        agents: 0,
        businesses: 0
      },
      locationPerformance: [],
      lastUpdated: '2024-01-26T00:00:00Z'
    }
  },
  {
    id: 'CHALLENGE004',
    name: 'Peak Hour Power Hour',
    description: 'Complete pickups between 6-8 PM for bonus points - limited to 100 participants',
    category: 'growth' as ChallengeCategory,
    status: 'completed' as ChallengeStatus,
    scope: 'zone' as ChallengeScope,
    targetUserType: 'all' as ChallengeUserType,
    targetLocations: ['Ikoyi', 'Victoria Island', 'Lekki Phase 1'],
    startDate: '2023-12-01T00:00:00Z',
    endDate: '2023-12-31T23:59:59Z',
    createdAt: '2023-11-20T00:00:00Z',
    createdBy: 'ADMIN',
    lastModified: '2023-12-31T23:59:59Z',
    modifiedBy: 'SYSTEM',
    auditTrail: [
      {
        id: 'AUDIT005',
        timestamp: '2023-11-20T00:00:00Z',
        action: 'created',
        performedBy: 'ADMIN',
        details: 'Peak hour challenge created to balance pickup distribution'
      },
      {
        id: 'AUDIT006',
        timestamp: '2023-12-01T00:00:00Z',
        action: 'activated',
        performedBy: 'ADMIN',
        details: 'Challenge activated for peak hour optimization'
      },
      {
        id: 'AUDIT007',
        timestamp: '2023-12-31T23:59:59Z',
        action: 'completed' as any,
        performedBy: 'SYSTEM',
        details: 'Challenge completed successfully'
      }
    ],
    objective: {
      id: 'OBJ004',
      type: 'peak_hour_participation',
      operator: 'greater_than_or_equal',
      value: 10,
      timeFrame: 'daily',
      description: 'Complete at least 10 pickups between 6-8 PM during the challenge period'
    },
    progressCalculation: {
      type: 'absolute',
      milestones: [
        { threshold: 50, reward: 50, description: '50 peak hour pickups - 50 bonus points' },
        { threshold: 100, reward: 150, description: '100 peak hour pickups - 150 bonus points' }
      ],
      partialProgressAllowed: true,
      progressVisibility: 'admin_only'
    },
    reward: {
      type: 'mixed' as ChallengeRewardType,
      pointsAwarded: 500,
      rewardCap: 'total',
      rewardCapValue: 500
    },
    winnerLogic: 'top_performers' as ChallengeWinnerLogic,
    safeguards: {
      participationCaps: {
        maxParticipants: 100,
        maxPerUser: 30
      },
      dailyLimits: {
        maxProgressPerDay: 5,
        maxRewardPerDay: 25
      },
      antiGaming: {
        verifiedActionRequired: true,
        disputeFreeEligibility: true,
        fraudExclusion: true,
        coolDownBetweenChallenges: 12
      },
      conflictHandling: {
        preventConflictingChallenges: false,
        priorityLevel: 4
      }
    },
    visibility: {
      inAppCopy: {
        title: 'Peak Hour Power Hour',
        description: 'Extra points for evening pickups! Limited spots available.',
        progressLabel: 'Peak Hour Pickups',
        completionMessage: 'Great job! You mastered the peak hour challenge!'
      },
      progressDisplay: {
        showProgressBar: false,
        showCountdown: true,
        showLeaderboard: true
      },
      eligibilityCriteria: 'Limited to 100 participants in Ikoyi, Victoria Island, and Lekki Phase 1 zones. First come, first served.'
    },
    metrics: {
      totalParticipants: 100,
      activeParticipants: 87,
      completionRate: 73.0,
      averageProgress: 73.0,
      totalRewardsIssued: 53500,
      rewardExposure: 53500,
      participantDistribution: {
        users: 60,
        agents: 25,
        businesses: 15
      },
      locationPerformance: [
        {
          location: 'Ikoyi',
          participants: 45,
          completionRate: 77.8,
          averageProgress: 77.8
        },
        {
          location: 'Victoria Island',
          participants: 35,
          completionRate: 71.4,
          averageProgress: 71.4
        },
        {
          location: 'Lekki Phase 1',
          participants: 20,
          completionRate: 65.0,
          averageProgress: 65.0
        }
      ],
      lastUpdated: '2023-12-31T23:59:59Z'
    }
  },
  {
    id: 'CHALLENGE005',
    name: 'Business Recycling Excellence',
    description: 'Business accounts with highest quality scores and consistent pickups earn premium benefits',
    category: 'quality' as ChallengeCategory,
    status: 'active' as ChallengeStatus,
    scope: 'global' as ChallengeScope,
    targetUserType: 'business' as ChallengeUserType,
    targetLocations: ['All Cities'],
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-03-15T23:59:59Z',
    createdAt: '2024-01-10T00:00:00Z',
    createdBy: 'ADMIN',
    lastModified: '2024-01-15T00:00:00Z',
    modifiedBy: 'ADMIN',
    auditTrail: [
      {
        id: 'AUDIT008',
        timestamp: '2024-01-10T00:00:00Z',
        action: 'created',
        performedBy: 'ADMIN',
        details: 'Business-focused quality challenge created'
      }
    ],
    objective: {
      id: 'OBJ005',
      type: 'quality_score' as any,
      operator: 'greater_than_or_equal',
      value: 4.5,
      timeFrame: 'challenge_duration',
      description: 'Maintain average quality score of 4.5+ throughout the challenge'
    },
    progressCalculation: {
      type: 'percentage',
      milestones: [
        { threshold: 80, reward: 'Premium Support', description: '80% quality maintained - Premium Support for 1 month' },
        { threshold: 90, reward: 'Priority Matching', description: '90% quality maintained - Priority agent matching for 1 month' },
        { threshold: 95, reward: 'Reduced Fees', description: '95% quality maintained - 15% fee reduction for 1 month' }
      ],
      partialProgressAllowed: true,
      progressVisibility: 'private'
    },
    reward: {
      type: 'perks' as ChallengeRewardType,
      perks: [
        {
          id: 'PERK002',
          type: 'priority_matching',
          value: 'high',
          description: 'Priority agent matching',
          duration: 30
        },
        {
          id: 'PERK003',
          type: 'reduced_fees',
          value: 0.15,
          description: '15% fee reduction',
          duration: 30
        }
      ],
      rewardCap: 'total',
      rewardCapValue: 2
    },
    winnerLogic: 'top_performers' as ChallengeWinnerLogic,
    safeguards: {
      participationCaps: {
        maxParticipants: 500,
        maxPerUser: 1
      },
      dailyLimits: {
        maxProgressPerDay: 1,
        maxRewardPerDay: 1
      },
      antiGaming: {
        verifiedActionRequired: true,
        disputeFreeEligibility: true,
        fraudExclusion: true,
        coolDownBetweenChallenges: 168
      },
      conflictHandling: {
        preventConflictingChallenges: false,
        priorityLevel: 2
      }
    },
    visibility: {
      inAppCopy: {
        title: 'Business Recycling Excellence',
        description: 'Excellence gets rewarded. Maintain high quality scores for premium benefits!',
        progressLabel: 'Quality Score',
        completionMessage: 'Outstanding! Your business is now recognized for excellence!'
      },
      progressDisplay: {
        showProgressBar: true,
        showCountdown: true,
        showLeaderboard: false
      },
      eligibilityCriteria: 'Open to verified business accounts only. Minimum 3 months account history required.'
    },
    metrics: {
      totalParticipants: 156,
      activeParticipants: 134,
      completionRate: 82.1,
      averageProgress: 87.3,
      totalRewardsIssued: 268,
      rewardExposure: 134000,
      participantDistribution: {
        users: 0,
        agents: 0,
        businesses: 156
      },
      locationPerformance: [
        {
          location: 'Lagos',
          participants: 89,
          completionRate: 84.3,
          averageProgress: 88.7
        },
        {
          location: 'Abuja',
          participants: 45,
          completionRate: 77.8,
          averageProgress: 84.4
        },
        {
          location: 'Port Harcourt',
          participants: 22,
          completionRate: 81.8,
          averageProgress: 88.6
        }
      ],
      lastUpdated: '2024-01-26T00:00:00Z'
    }
  }
];

// Mock Challenge Overview
export const mockChallengeOverview: ChallengeOverview = {
  activeChallenges: 3,
  upcomingChallenges: 1,
  completedChallenges: 1,
  totalParticipants: 4496,
  averageCompletionRate: 66.9,
  rewardExposure: 2635400
};

// Mock Challenge Progress Data
export const mockChallengeProgress: ChallengeProgress[] = [
  {
    id: 'PROG001',
    userId: 'USER001',
    challengeId: 'CHALLENGE001',
    currentProgress: 42,
    maxProgress: 50,
    percentageComplete: 84,
    milestonesCompleted: [10, 25],
    startedAt: '2024-01-01T00:00:00Z',
    lastActivityAt: '2024-01-25T14:30:00Z',
    isCompleted: false
  },
  {
    id: 'PROG002',
    userId: 'USER002',
    challengeId: 'CHALLENGE001',
    currentProgress: 50,
    maxProgress: 50,
    percentageComplete: 100,
    milestonesCompleted: [10, 25, 50],
    startedAt: '2024-01-01T00:00:00Z',
    lastActivityAt: '2024-01-20T10:15:00Z',
    isCompleted: true,
    completedAt: '2024-01-20T10:15:00Z'
  },
  {
    id: 'PROG003',
    userId: 'USER003',
    challengeId: 'CHALLENGE002',
    currentProgress: 67,
    maxProgress: 100,
    percentageComplete: 67,
    milestonesCompleted: [25],
    startedAt: '2024-01-10T00:00:00Z',
    lastActivityAt: '2024-01-26T09:45:00Z',
    isCompleted: false
  }
];

// Mock Challenge Performance Insights
export const mockChallengePerformanceInsights: ChallengePerformanceInsight[] = [
  {
    challengeId: 'CHALLENGE001',
    challengeName: 'Lagos Recycling Sprint',
    effectiveness: {
      targetAchievement: 89.2,
      participationVsBaseline: 45.3,
      postChallengeRetention: 78.5
    },
    costAnalysis: {
      rewardCost: 2340000,
      operationalCost: 450000,
      roi: 3.2
    },
    behavioralImpact: {
      pickupFrequencyChange: 23.4,
      qualityScoreChange: 5.2,
      zoneCoverageChange: 12.7
    },
    recommendations: [
      'Increase participant cap to 7500 based on high demand',
      'Consider extending to other cities with similar performance',
      'Add milestone rewards to maintain engagement'
    ]
  },
  {
    challengeId: 'CHALLENGE004',
    challengeName: 'Peak Hour Power Hour',
    effectiveness: {
      targetAchievement: 73.0,
      participationVsBaseline: 18.5,
      postChallengeRetention: 45.2
    },
    costAnalysis: {
      rewardCost: 53500,
      operationalCost: 120000,
      roi: 0.8
    },
    behavioralImpact: {
      pickupFrequencyChange: 8.5,
      qualityScoreChange: 2.1,
      zoneCoverageChange: 15.3
    },
    recommendations: [
      'Increase participant cap to 150',
      'Expand to additional peak hours',
      'Consider making this a recurring monthly challenge'
    ]
  }
];

// Mock Challenge Lifecycle Data
export const mockChallengeLifecycle: ChallengeLifecycle[] = [
  {
    id: 'LIFECYCLE001',
    challengeId: 'CHALLENGE001',
    phase: 'during',
    metrics: {
      baseline: {
        avgPickupsPerDay: 2.3,
        avgQualityScore: 4.2,
        participantCount: 2375
      },
      during: {
        avgPickupsPerDay: 3.1,
        avgQualityScore: 4.4,
        participantCount: 3450
      },
      postChallenge: {
        avgPickupsPerDay: 2.7,
        avgQualityScore: 4.3,
        participantCount: 2890
      },
      decay: {
        daysAfterChallenge: 30,
        retentionRate: 78.5,
        behaviorPersistence: 65.2
      }
    },
    insights: {
      wasEffective: true,
      keyDrivers: ['Clear objectives', 'Attractive rewards', 'Good communication'],
      unintendedConsequences: ['Slight quality dip post-challenge'],
      shouldRepeat: true,
      recommendedChanges: ['Add post-challenge retention program']
    }
  }
];

// Helper functions
export const getChallengeCategoryColor = (category: ChallengeCategory): string => {
  switch (category) {
    case 'volume': return '#3b82f6';
    case 'consistency': return '#10b981';
    case 'quality': return '#8b5cf6';
    case 'growth': return '#f59e0b';
    default: return '#6b7280';
  }
};

export const getChallengeStatusColor = (status: ChallengeStatus): string => {
  switch (status) {
    case 'active': return '#10b981';
    case 'upcoming': return '#f59e0b';
    case 'completed': return '#6b7280';
    case 'paused': return '#ef4444';
    default: return '#6b7280';
  }
};

export const getChallengeScopeColor = (scope: ChallengeScope): string => {
  switch (scope) {
    case 'global': return '#8b5cf6';
    case 'city': return '#3b82f6';
    case 'zone': return '#10b981';
    default: return '#6b7280';
  }
};

export const formatDuration = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  
  if (days === 1) return '1 day';
  if (days < 30) return `${days} days`;
  if (days < 365) return `${Math.floor(days / 30)} months`;
  return `${Math.floor(days / 365)} years`;
};

export const getTimeRemaining = (endDate: string): string => {
  const end = new Date(endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  
  if (diff <= 0) return 'Ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};
