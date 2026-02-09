import { 
  PointsRule, 
  PointsEconomySummary, 
  StreakMultiplier, 
  AbusePreventionConfig, 
  ImpactSimulation,
  TriggerAction,
  UserType,
  PickupMode,
  WasteType
} from './types';

// Mock Points Rules
export const mockPointsRules: PointsRule[] = [
  {
    id: 'RULE001',
    name: 'Standard Pickup Reward',
    description: 'Base points earned for completing a pickup transaction',
    status: 'active',
    triggerAction: 'completed_pickup',
    eligibleUserTypes: ['individual', 'business'],
    applicablePickupModes: ['agent_to_user', 'user_to_agent'],
    applicableWasteTypes: ['all'],
    pointsLogic: {
      basePoints: 10,
      weightBasedScaling: {
        pointsPerKg: 2,
        minWeight: 1,
        maxWeight: 50
      },
      multipliers: [
        {
          type: 'streak',
          value: 1.2,
          conditions: ['3_day_streak'],
          maxStacking: 2
        },
        {
          type: 'peak_hour',
          value: 1.1,
          conditions: ['morning_peak', 'evening_peak']
        }
      ],
      conditionalBonuses: [
        {
          condition: 'first_pickup_of_day',
          bonusPoints: 5,
          description: 'Bonus for first pickup each day'
        },
        {
          condition: 'high_quality_separation',
          bonusPoints: 3,
          description: 'Bonus for properly sorted waste'
        }
      ]
    },
    safeguards: {
      dailyCap: 100,
      weeklyCap: 500,
      perUserLimit: 50,
      perKgLimit: 5,
      dropoffFrequencyCap: 10,
      referralFraudThrottle: 3,
      antiGamingConstraints: [
        'No duplicate pickups within 2 hours',
        'Max 5 pickups per day per location',
        'Weight variance detection enabled'
      ]
    },
    visibility: {
      userFacingCopy: 'Earn points for every pickup!',
      inAppExplanation: 'Complete pickups to earn base points plus bonuses for streaks and quality.',
      badgeIcon: 'pickup_reward',
      colorTheme: '#10b981',
      showInHistory: true,
      showInLeaderboard: true
    },
    scope: {
      type: 'global'
    },
    lastModified: '2024-01-15T10:30:00Z',
    modifiedBy: 'OPS001',
    createdAt: '2024-01-10T09:00:00Z',
    createdBy: 'ADMIN001',
    auditTrail: [
      {
        timestamp: '2024-01-10T09:00:00Z',
        action: 'created',
        performedBy: 'ADMIN001',
        details: 'Rule created with base 10 points'
      },
      {
        timestamp: '2024-01-15T10:30:00Z',
        action: 'modified',
        performedBy: 'OPS001',
        details: 'Updated daily cap from 80 to 100 points',
        previousValue: 80,
        newValue: 100
      }
    ]
  },
  {
    id: 'RULE002',
    name: 'Drop-off Premium',
    description: 'Enhanced points for user-initiated drop-offs',
    status: 'active',
    triggerAction: 'completed_dropoff',
    eligibleUserTypes: ['individual', 'business'],
    applicablePickupModes: ['user_to_agent'],
    applicableWasteTypes: ['plastic', 'paper', 'metal'],
    pointsLogic: {
      basePoints: 15,
      weightBasedScaling: {
        pointsPerKg: 3,
        minWeight: 2,
        maxWeight: 100
      },
      multipliers: [
        {
          type: 'waste_quality',
          value: 1.3,
          conditions: ['premium_separation', 'clean_materials']
        },
        {
          type: 'campaign',
          value: 1.5,
          conditions: ['recycling_drive_2024']
        }
      ],
      conditionalBonuses: [
        {
          condition: 'bulk_dropoff',
          bonusPoints: 10,
          description: 'Bonus for drop-offs over 20kg'
        },
        {
          condition: 'scheduled_dropoff',
          bonusPoints: 5,
          description: 'Bonus for pre-scheduled drop-offs'
        }
      ]
    },
    safeguards: {
      dailyCap: 150,
      weeklyCap: 750,
      perUserLimit: 75,
      perKgLimit: 6,
      dropoffFrequencyCap: 5,
      referralFraudThrottle: 2,
      antiGamingConstraints: [
        'Material verification required',
        'Location tracking enabled',
        'Photo documentation mandatory'
      ]
    },
    visibility: {
      userFacingCopy: 'Drop off waste for premium rewards!',
      inAppExplanation: 'Bring your sorted waste to drop-off points and earn enhanced points.',
      badgeIcon: 'dropoff_premium',
      colorTheme: '#3b82f6',
      showInHistory: true,
      showInLeaderboard: true
    },
    scope: {
      type: 'city',
      locations: ['Lagos', 'Abuja']
    },
    lastModified: '2024-01-14T14:20:00Z',
    modifiedBy: 'OPS002',
    createdAt: '2024-01-12T11:00:00Z',
    createdBy: 'ADMIN001',
    auditTrail: [
      {
        timestamp: '2024-01-12T11:00:00Z',
        action: 'created',
        performedBy: 'ADMIN001',
        details: 'Drop-off premium rule created'
      },
      {
        timestamp: '2024-01-14T14:20:00Z',
        action: 'modified',
        performedBy: 'OPS002',
        details: 'Added Lagos and Abuja city restrictions'
      }
    ]
  },
  {
    id: 'RULE003',
    name: 'Daily Streak Bonus',
    description: 'Multiplier rewards for consistent daily recycling',
    status: 'active',
    triggerAction: 'daily_streak',
    eligibleUserTypes: ['individual', 'business'],
    applicablePickupModes: ['agent_to_user', 'user_to_agent'],
    applicableWasteTypes: ['all'],
    pointsLogic: {
      basePoints: 0,
      multipliers: [
        {
          type: 'streak',
          value: 1.2,
          conditions: ['3_day_streak'],
          maxStacking: 1
        },
        {
          type: 'streak',
          value: 1.5,
          conditions: ['7_day_streak'],
          maxStacking: 1
        },
        {
          type: 'streak',
          value: 2.0,
          conditions: ['30_day_streak'],
          maxStacking: 1
        }
      ],
      conditionalBonuses: [
        {
          condition: 'perfect_week',
          bonusPoints: 20,
          description: 'Bonus for 7 consecutive days'
        },
        {
          condition: 'milestone_streak',
          bonusPoints: 50,
          description: 'Bonus for 30, 60, 90 day milestones'
        }
      ]
    },
    safeguards: {
      dailyCap: 0,
      weeklyCap: 0,
      perUserLimit: 100,
      perKgLimit: 0,
      dropoffFrequencyCap: 0,
      referralFraudThrottle: 0,
      antiGamingConstraints: [
        '48-hour grace period for streaks',
        'Manual review for extended streaks',
        'Location consistency checks'
      ]
    },
    visibility: {
      userFacingCopy: 'Keep the streak alive!',
      inAppExplanation: 'Maintain daily recycling habits to earn multiplier bonuses.',
      badgeIcon: 'streak_fire',
      colorTheme: '#ef4444',
      showInHistory: true,
      showInLeaderboard: true
    },
    scope: {
      type: 'global'
    },
    lastModified: '2024-01-13T16:45:00Z',
    modifiedBy: 'OPS001',
    createdAt: '2024-01-08T13:00:00Z',
    createdBy: 'ADMIN001',
    auditTrail: [
      {
        timestamp: '2024-01-08T13:00:00Z',
        action: 'created',
        performedBy: 'ADMIN001',
        details: 'Daily streak bonus rule created'
      },
      {
        timestamp: '2024-01-13T16:45:00Z',
        action: 'modified',
        performedBy: 'OPS001',
        details: 'Updated 30-day multiplier from 1.8 to 2.0'
      }
    ]
  },
  {
    id: 'RULE004',
    name: 'Referral Program',
    description: 'Points for successful user referrals',
    status: 'active',
    triggerAction: 'referral_completion',
    eligibleUserTypes: ['individual'],
    applicablePickupModes: ['agent_to_user', 'user_to_agent'],
    applicableWasteTypes: ['all'],
    pointsLogic: {
      basePoints: 50,
      multipliers: [
        {
          type: 'referral',
          value: 1.5,
          conditions: ['business_referral'],
          maxStacking: 1
        }
      ],
      conditionalBonuses: [
        {
          condition: 'referee_first_pickup',
          bonusPoints: 25,
          description: 'Bonus when referred user completes first pickup'
        },
        {
          condition: 'referee_streak_7_days',
          bonusPoints: 30,
          description: 'Bonus when referred user maintains 7-day streak'
        }
      ]
    },
    safeguards: {
      dailyCap: 200,
      weeklyCap: 500,
      perUserLimit: 10,
      perKgLimit: 0,
      dropoffFrequencyCap: 0,
      referralFraudThrottle: 5,
      antiGamingConstraints: [
        'Phone verification required',
        'IP address tracking',
        'Account age verification',
        'Manual review for high volume'
      ]
    },
    visibility: {
      userFacingCopy: 'Invite friends, earn rewards!',
      inAppExplanation: 'Refer new users and earn points when they start recycling.',
      badgeIcon: 'referral_gift',
      colorTheme: '#8b5cf6',
      showInHistory: true,
      showInLeaderboard: false
    },
    scope: {
      type: 'campaign',
      campaignId: 'REF2024Q1',
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-03-31T23:59:59Z'
    },
    lastModified: '2024-01-11T09:15:00Z',
    modifiedBy: 'MARKETING001',
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'ADMIN001',
    auditTrail: [
      {
        timestamp: '2024-01-01T00:00:00Z',
        action: 'created',
        performedBy: 'ADMIN001',
        details: 'Q1 2024 referral campaign created'
      },
      {
        timestamp: '2024-01-11T09:15:00Z',
        action: 'modified',
        performedBy: 'MARKETING001',
        details: 'Updated referral fraud throttle from 3 to 5'
      }
    ]
  },
  {
    id: 'RULE005',
    name: 'Peak Hour Boost',
    description: 'Extra points during high-demand periods',
    status: 'paused',
    triggerAction: 'peak_hour_recycling',
    eligibleUserTypes: ['individual', 'business', 'agent'],
    applicablePickupModes: ['agent_to_user', 'user_to_agent'],
    applicableWasteTypes: ['all'],
    pointsLogic: {
      basePoints: 5,
      multipliers: [
        {
          type: 'peak_hour',
          value: 1.3,
          conditions: ['morning_peak_7_9', 'evening_peak_5_7']
        }
      ],
      conditionalBonuses: [
        {
          condition: 'weekend_peak',
          bonusPoints: 3,
          description: 'Additional bonus during weekend peak hours'
        }
      ]
    },
    safeguards: {
      dailyCap: 30,
      weeklyCap: 150,
      perUserLimit: 15,
      perKgLimit: 2,
      dropoffFrequencyCap: 0,
      referralFraudThrottle: 0,
      antiGamingConstraints: [
        'Time-based validation',
        'Location-based restrictions',
        'Frequency limits per peak period'
      ]
    },
    visibility: {
      userFacingCopy: 'Recycle during peak hours for bonus points!',
      inAppExplanation: 'Earn extra points during busy morning and evening hours.',
      badgeIcon: 'peak_boost',
      colorTheme: '#f59e0b',
      showInHistory: true,
      showInLeaderboard: false
    },
    scope: {
      type: 'city',
      locations: ['Lagos', 'Port Harcourt']
    },
    lastModified: '2024-01-16T11:30:00Z',
    modifiedBy: 'OPS001',
    createdAt: '2024-01-05T14:00:00Z',
    createdBy: 'ADMIN001',
    auditTrail: [
      {
        timestamp: '2024-01-05T14:00:00Z',
        action: 'created',
        performedBy: 'ADMIN001',
        details: 'Peak hour boost rule created'
      },
      {
        timestamp: '2024-01-16T11:30:00Z',
        action: 'paused',
        performedBy: 'OPS001',
        details: 'Temporarily paused for system optimization'
      }
    ]
  }
];

// Mock Economy Summary
export const mockPointsEconomySummary: PointsEconomySummary = {
  activeRules: 4,
  avgPointsPerPickup: 18.5,
  streakMultipliersActive: 3,
  abuseGuardsEnabled: 12,
  campaignOverrides: 2,
  projectedMonthlyIssuance: 2850000
};

// Mock Streak Multipliers
export const mockStreakMultipliers: StreakMultiplier[] = [
  {
    id: 'STREAK001',
    type: 'daily',
    threshold: 3,
    multiplier: 1.2,
    decayRule: 'Reset after 48 hours of inactivity',
    resetCondition: 'No activity for 48 hours',
    status: 'active'
  },
  {
    id: 'STREAK002',
    type: 'daily',
    threshold: 7,
    multiplier: 1.5,
    decayRule: 'Reset after 48 hours of inactivity',
    resetCondition: 'No activity for 48 hours',
    status: 'active'
  },
  {
    id: 'STREAK003',
    type: 'daily',
    threshold: 30,
    multiplier: 2.0,
    decayRule: 'Reset after 48 hours of inactivity',
    resetCondition: 'No activity for 48 hours',
    status: 'active'
  },
  {
    id: 'STREAK004',
    type: 'weekly',
    threshold: 4,
    multiplier: 1.3,
    decayRule: 'Reset after missed week',
    resetCondition: 'No activity for 7 days',
    status: 'active'
  }
];

// Mock Abuse Prevention Config
export const mockAbusePreventionConfig: AbusePreventionConfig = {
  maxPointsPerDay: 200,
  maxPointsPerKg: 6,
  dropoffFrequencyCap: 10,
  referralFraudThrottle: 5,
  antiGamingConstraints: [
    'Duplicate pickup detection',
    'Location frequency limits',
    'Weight variance analysis',
    'Time-based restrictions',
    'IP address monitoring',
    'Account verification requirements'
  ],
  alertThresholds: {
    suspiciousActivity: 15,
    unusualPatterns: 25,
    potentialAbuse: 50
  }
};

// Mock Impact Simulation
export const mockImpactSimulation: ImpactSimulation = {
  estimatedMonthlyIssuance: 2850000,
  pickupFrequencyChange: 12.5,
  dropoffVsPickupShift: 8.3,
  costImpactIfRedeemed: 1425000,
  userEngagementChange: 18.7,
  riskFactors: [
    'High pickup frequency may strain agent capacity',
    'Drop-off shift could affect agent earnings',
    'Points inflation risk if redemption rates increase'
  ],
  recommendations: [
    'Monitor agent capacity and adjust pickup rules',
    'Consider agent compensation for drop-off shifts',
    'Implement gradual redemption rate increases'
  ]
};
