import { Referral, ReferralSummary, ReferralFunnel, ReferralPerformance, ReferralQualityInsight, ReferralFraudPattern, ReferralAnalytics, ReferralStatus, ReferrerType, ActionType, RewardType, AbuseFlag, UserProfile, ActivationEvidence, RewardHistory, AbuseSignal } from './types';

// Mock Referrals Data
export const mockReferrals: Referral[] = [
  {
    id: 'REF001',
    referrerId: 'USER001',
    referrerName: 'Adebayo Johnson',
    referrerType: 'user' as ReferrerType,
    referrerEmail: 'adebayo.johnson@email.com',
    referrerPhone: '+2348012345678',
    referrerCity: 'Lagos',
    referrerZone: 'Ikoyi',
    referralCode: 'ADEBAYO2024',
    invitedUserId: 'USER101',
    invitedUserName: 'Funke Adeyemi',
    invitedUserEmail: 'funke.adeyemi@email.com',
    invitedUserPhone: '+2348023456789',
    invitedUserCity: 'Lagos',
    invitedUserZone: 'Victoria Island',
    status: 'activated' as ReferralStatus,
    inviteSentAt: '2024-01-01T10:00:00Z',
    signedUpAt: '2024-01-02T14:30:00Z',
    activatedAt: '2024-01-03T09:15:00Z',
    rewardedAt: '2024-01-03T09:30:00Z',
    firstActionType: 'pickup' as ActionType,
    firstActionId: 'PICKUP001',
    firstActionWeight: 12.5,
    rewardIssued: 500,
    rewardType: 'points' as RewardType,
    abuseFlags: [],
    auditTrail: [
      {
        id: 'AUDIT001',
        timestamp: '2024-01-01T10:00:00Z',
        action: 'invite_sent',
        performedBy: 'SYSTEM',
        details: 'Referral invitation sent via SMS and email'
      },
      {
        id: 'AUDIT002',
        timestamp: '2024-01-02T14:30:00Z',
        action: 'signup_completed',
        performedBy: 'SYSTEM',
        details: 'User completed registration with referral code'
      },
      {
        id: 'AUDIT003',
        timestamp: '2024-01-03T09:15:00Z',
        action: 'first_action_completed',
        performedBy: 'SYSTEM',
        details: 'First pickup completed - 12.5kg recycled'
      },
      {
        id: 'AUDIT004',
        timestamp: '2024-01-03T09:30:00Z',
        action: 'reward_issued',
        performedBy: 'SYSTEM',
        details: '500 points reward issued to referrer'
      }
    ],
    conversionMetrics: {
      timeToSignup: 28.5,
      timeToActivation: 47.25,
      activationRate: 100,
      retentionRate: 85,
      avgFirstActionWeight: 12.5,
      totalActionsCompleted: 3,
      totalWeightProcessed: 37.5
    }
  },
  {
    id: 'REF002',
    referrerId: 'AGENT001',
    referrerName: 'Chukwuemeka Okafor',
    referrerType: 'agent' as ReferrerType,
    referrerEmail: 'chukwuemeka@recycleagent.com',
    referrerPhone: '+2348034567890',
    referrerCity: 'Abuja',
    referrerZone: 'Wuse',
    referralCode: 'CHUKWU2024',
    invitedUserId: 'USER102',
    invitedUserName: 'Mariam Ibrahim',
    invitedUserEmail: 'mariam.ibrahim@email.com',
    invitedUserPhone: '+2348045678901',
    invitedUserCity: 'Abuja',
    invitedUserZone: 'Maitama',
    status: 'rewarded' as ReferralStatus,
    inviteSentAt: '2024-01-05T11:00:00Z',
    signedUpAt: '2024-01-06T16:45:00Z',
    activatedAt: '2024-01-08T10:20:00Z',
    rewardedAt: '2024-01-08T10:35:00Z',
    firstActionType: 'dropoff' as ActionType,
    firstActionId: 'DROPOFF001',
    firstActionWeight: 18.7,
    rewardIssued: 1000,
    rewardType: 'points' as RewardType,
    abuseFlags: [],
    auditTrail: [
      {
        id: 'AUDIT005',
        timestamp: '2024-01-05T11:00:00Z',
        action: 'invite_sent',
        performedBy: 'SYSTEM',
        details: 'Agent referral invitation sent'
      },
      {
        id: 'AUDIT006',
        timestamp: '2024-01-06T16:45:00Z',
        action: 'signup_completed',
        performedBy: 'SYSTEM',
        details: 'User completed registration'
      },
      {
        id: 'AUDIT007',
        timestamp: '2024-01-08T10:20:00Z',
        action: 'first_action_completed',
        performedBy: 'SYSTEM',
        details: 'First drop-off completed - 18.7kg recycled'
      },
      {
        id: 'AUDIT008',
        timestamp: '2024-01-08T10:35:00Z',
        action: 'reward_issued',
        performedBy: 'SYSTEM',
        details: '1000 points reward issued to agent'
      }
    ],
    conversionMetrics: {
      timeToSignup: 29.75,
      timeToActivation: 71.33,
      activationRate: 100,
      retentionRate: 92,
      avgFirstActionWeight: 18.7,
      totalActionsCompleted: 5,
      totalWeightProcessed: 93.5
    }
  },
  {
    id: 'REF003',
    referrerId: 'BUSINESS001',
    referrerName: 'EcoTech Solutions Ltd',
    referrerType: 'business' as ReferrerType,
    referrerEmail: 'referrals@ecotech.ng',
    referrerPhone: '+2348056789012',
    referrerCity: 'Port Harcourt',
    referrerZone: 'GRA',
    referralCode: 'ECOTECH2024',
    invitedUserId: 'USER103',
    invitedUserName: 'David Okoro',
    invitedUserEmail: 'david.okoro@email.com',
    invitedUserPhone: '+2348067890123',
    invitedUserCity: 'Port Harcourt',
    invitedUserZone: 'Rumuokwusi',
    status: 'signed_up' as ReferralStatus,
    inviteSentAt: '2024-01-10T09:00:00Z',
    signedUpAt: '2024-01-11T13:20:00Z',
    firstActionType: undefined,
    firstActionId: undefined,
    firstActionWeight: undefined,
    rewardIssued: undefined,
    rewardType: undefined,
    abuseFlags: [],
    auditTrail: [
      {
        id: 'AUDIT009',
        timestamp: '2024-01-10T09:00:00Z',
        action: 'invite_sent',
        performedBy: 'SYSTEM',
        details: 'Business referral invitation sent'
      },
      {
        id: 'AUDIT010',
        timestamp: '2024-01-11T13:20:00Z',
        action: 'signup_completed',
        performedBy: 'SYSTEM',
        details: 'User completed registration'
      }
    ],
    conversionMetrics: undefined
  },
  {
    id: 'REF004',
    referrerId: 'USER002',
    referrerName: 'Fatima Bello',
    referrerType: 'user' as ReferrerType,
    referrerEmail: 'fatima.bello@email.com',
    referrerPhone: '+2348078901234',
    referrerCity: 'Lagos',
    referrerZone: 'Surulere',
    referralCode: 'FATIMA2024',
    invitedUserId: 'USER104',
    invitedUserName: 'Samuel Adekunle',
    invitedUserEmail: 'samuel.adekunle@email.com',
    invitedUserPhone: '+2348089012345',
    invitedUserCity: 'Lagos',
    invitedUserZone: 'Yaba',
    status: 'flagged' as ReferralStatus,
    inviteSentAt: '2024-01-15T14:00:00Z',
    signedUpAt: '2024-01-15T14:30:00Z',
    activatedAt: '2024-01-15T15:45:00Z',
    rewardedAt: undefined,
    firstActionType: 'pickup' as ActionType,
    firstActionId: 'PICKUP002',
    firstActionWeight: 3.2,
    rewardIssued: undefined,
    rewardType: undefined,
    abuseFlags: ['shared_device' as AbuseFlag, 'pattern_anomaly' as AbuseFlag],
    auditTrail: [
      {
        id: 'AUDIT011',
        timestamp: '2024-01-15T14:00:00Z',
        action: 'invite_sent',
        performedBy: 'SYSTEM',
        details: 'Referral invitation sent'
      },
      {
        id: 'AUDIT012',
        timestamp: '2024-01-15T14:30:00Z',
        action: 'signup_completed',
        performedBy: 'SYSTEM',
        details: 'User completed registration'
      },
      {
        id: 'AUDIT013',
        timestamp: '2024-01-15T15:45:00Z',
        action: 'first_action_completed',
        performedBy: 'SYSTEM',
        details: 'First pickup completed - 3.2kg recycled'
      },
      {
        id: 'AUDIT014',
        timestamp: '2024-01-15T16:00:00Z',
        action: 'abuse_flagged',
        performedBy: 'SYSTEM',
        details: 'Referral flagged for shared device and pattern anomaly'
      }
    ],
    conversionMetrics: {
      timeToSignup: 0.5,
      timeToActivation: 1.75,
      activationRate: 100,
      retentionRate: 0,
      avgFirstActionWeight: 3.2,
      totalActionsCompleted: 1,
      totalWeightProcessed: 3.2
    }
  },
  {
    id: 'REF005',
    referrerId: 'USER003',
    referrerName: 'Grace Okeke',
    referrerType: 'user' as ReferrerType,
    referrerEmail: 'grace.okeke@email.com',
    referrerPhone: '+2348090123456',
    referrerCity: 'Lagos',
    referrerZone: 'Lekki',
    referralCode: 'GRACE2024',
    invitedUserId: 'USER105',
    invitedUserName: 'Michael Uche',
    invitedUserEmail: 'michael.uche@email.com',
    invitedUserPhone: '+2348101234567',
    invitedUserCity: 'Lagos',
    invitedUserZone: 'Ikoyi',
    status: 'pending' as ReferralStatus,
    inviteSentAt: '2024-01-20T10:00:00Z',
    signedUpAt: undefined,
    activatedAt: undefined,
    rewardedAt: undefined,
    firstActionType: undefined,
    firstActionId: undefined,
    firstActionWeight: undefined,
    rewardIssued: undefined,
    rewardType: undefined,
    abuseFlags: [],
    auditTrail: [
      {
        id: 'AUDIT015',
        timestamp: '2024-01-20T10:00:00Z',
        action: 'invite_sent',
        performedBy: 'SYSTEM',
        details: 'Referral invitation sent'
      }
    ],
    conversionMetrics: undefined
  }
];

// Mock Referral Summary
export const mockReferralSummary: ReferralSummary = {
  invitesSent: 1247,
  signupsCompleted: 892,
  activatedReferrals: 456,
  rewardsIssued: 423,
  conversionRate: 36.6,
  flaggedReferrals: 23,
  totalRewardValue: 345000,
  avgTimeToActivation: 48.5,
  avgFirstActionWeight: 15.7,
  retentionRate: 78.3
};

// Mock Referral Funnel
export const mockReferralFunnel: ReferralFunnel[] = [
  {
    step: 'Invites Sent',
    count: 1247,
    percentage: 100
  },
  {
    step: 'Signups Completed',
    count: 892,
    percentage: 71.5,
    dropOffReason: 'No signup completion'
  },
  {
    step: 'First Action',
    count: 456,
    percentage: 36.6,
    dropOffReason: 'No activity after signup'
  },
  {
    step: 'Rewards Issued',
    count: 423,
    percentage: 33.9,
    dropOffReason: 'Reward processing delay'
  }
];

// Mock Referral Performance
export const mockReferralPerformance: ReferralPerformance[] = [
  {
    referrerId: 'USER001',
    referrerName: 'Adebayo Johnson',
    referrerType: 'user',
    totalInvites: 15,
    successfulReferrals: 12,
    conversionRate: 80.0,
    totalRewards: 6000,
    avgTimeToActivation: 42.3,
    abuseFlags: 0,
    qualityScore: 9.2,
    city: 'Lagos',
    zone: 'Ikoyi'
  },
  {
    referrerId: 'AGENT001',
    referrerName: 'Chukwuemeka Okafor',
    referrerType: 'agent',
    totalInvites: 25,
    successfulReferrals: 18,
    conversionRate: 72.0,
    totalRewards: 18000,
    avgTimeToActivation: 65.7,
    abuseFlags: 0,
    qualityScore: 8.8,
    city: 'Abuja',
    zone: 'Wuse'
  },
  {
    referrerId: 'BUSINESS001',
    referrerName: 'EcoTech Solutions Ltd',
    referrerType: 'business',
    totalInvites: 50,
    successfulReferrals: 22,
    conversionRate: 44.0,
    totalRewards: 22000,
    avgTimeToActivation: 89.2,
    abuseFlags: 2,
    qualityScore: 7.5,
    city: 'Port Harcourt',
    zone: 'GRA'
  }
];

// Mock Referral Quality Insights
export const mockReferralQualityInsights: ReferralQualityInsight[] = [
  {
    category: 'engagement',
    metric: 'Avg Time to Activation',
    value: 48.5,
    trend: 'down',
    change: -12.3,
    description: 'Average time from invite to first action',
    recommendation: 'Improve onboarding flow to reduce activation time',
    severity: 'medium'
  },
  {
    category: 'retention',
    metric: '30-Day Retention Rate',
    value: 78.3,
    trend: 'up',
    change: 5.7,
    description: 'Percentage of activated users still active after 30 days',
    recommendation: 'Maintain current retention strategies',
    severity: 'low'
  },
  {
    category: 'quality',
    metric: 'Avg First Action Weight',
    value: 15.7,
    trend: 'stable',
    change: 0.2,
    description: 'Average weight of first recycling action',
    recommendation: 'Focus on higher-value referral sources',
    severity: 'low'
  },
  {
    category: 'abuse',
    metric: 'Abuse Flag Rate',
    value: 1.8,
    trend: 'up',
    change: 0.5,
    description: 'Percentage of referrals flagged for potential abuse',
    recommendation: 'Strengthen verification for suspicious patterns',
    severity: 'high'
  },
  {
    category: 'efficiency',
    metric: 'Reward Cost per Activation',
    value: 758.3,
    trend: 'up',
    change: 8.2,
    description: 'Average reward cost per successful activation',
    recommendation: 'Optimize reward structure for better ROI',
    severity: 'medium'
  }
];

// Mock Referral Fraud Patterns
export const mockReferralFraudPatterns: ReferralFraudPattern[] = [
  {
    id: 'FRAUD001',
    patternType: 'shared_device',
    description: 'Multiple referrals from same device/IP address',
    affectedReferrals: 12,
    severity: 'medium',
    detectedAt: '2024-01-15T10:00:00Z',
    status: 'active',
    recommendedAction: 'Implement device verification for suspicious patterns',
    affectedCities: ['Lagos', 'Abuja'],
    affectedReferrers: ['USER002', 'USER003']
  },
  {
    id: 'FRAUD002',
    patternType: 'rapid_self_referral',
    description: 'Users referring themselves with multiple accounts',
    affectedReferrals: 8,
    severity: 'high',
    detectedAt: '2024-01-18T14:30:00Z',
    status: 'monitoring',
    recommendedAction: 'Implement identity verification for new accounts',
    affectedCities: ['Lagos'],
    affectedReferrers: ['USER004', 'USER005']
  }
];

// Mock Referral Analytics
export const mockReferralAnalytics: ReferralAnalytics = {
  totalReferrals: 1247,
  activeReferrals: 456,
  conversionRate: 36.6,
  avgTimeToActivation: 48.5,
  totalRewardValue: 345000,
  abuseRate: 1.8,
  retentionRate: 78.3,
  qualityScore: 8.4,
  performanceByCity: [
    {
      city: 'Lagos',
      referrals: 623,
      conversionRate: 38.2,
      avgTimeToActivation: 42.1,
      abuseRate: 2.1
    },
    {
      city: 'Abuja',
      referrals: 312,
      conversionRate: 35.7,
      avgTimeToActivation: 51.3,
      abuseRate: 1.5
    },
    {
      city: 'Port Harcourt',
      referrals: 187,
      conversionRate: 33.7,
      avgTimeToActivation: 58.9,
      abuseRate: 1.8
    },
    {
      city: 'Kano',
      referrals: 125,
      conversionRate: 40.1,
      avgTimeToActivation: 45.2,
      abuseRate: 1.2
    }
  ],
  performanceByReferrerType: [
    {
      type: 'user',
      referrals: 678,
      conversionRate: 37.8,
      avgTimeToActivation: 44.7,
      qualityScore: 8.2
    },
    {
      type: 'agent',
      referrals: 423,
      conversionRate: 35.2,
      avgTimeToActivation: 52.1,
      qualityScore: 8.6
    },
    {
      type: 'business',
      referrals: 146,
      conversionRate: 34.9,
      avgTimeToActivation: 61.3,
      qualityScore: 8.1
    }
  ],
  monthlyTrends: [
    {
      month: '2024-01',
      invites: 1247,
      signups: 892,
      activations: 456,
      rewards: 423
    },
    {
      month: '2023-12',
      invites: 1156,
      signups: 823,
      activations: 398,
      rewards: 387
    },
    {
      month: '2023-11',
      invites: 1098,
      signups: 789,
      activations: 367,
      rewards: 354
    }
  ]
};

// Helper functions
export const getReferralStatusColor = (status: ReferralStatus): string => {
  switch (status) {
    case 'pending': return '#6b7280';
    case 'signed_up': return '#3b82f6';
    case 'activated': return '#10b981';
    case 'rewarded': return '#059669';
    case 'flagged': return '#ef4444';
    case 'revoked': return '#f59e0b';
    default: return '#6b7280';
  }
};

export const getReferrerTypeColor = (type: ReferrerType): string => {
  switch (type) {
    case 'user': return '#3b82f6';
    case 'agent': return '#8b5cf6';
    case 'business': return '#f59e0b';
    default: return '#6b7280';
  }
};

export const getAbuseFlagColor = (flag: AbuseFlag): string => {
  switch (flag) {
    case 'shared_device': return '#f59e0b';
    case 'rapid_self_referral': return '#ef4444';
    case 'pattern_anomaly': return '#f97316';
    case 'location_anomaly': return '#a855f7';
    case 'duplicate_signup': return '#06b6d4';
    default: return '#6b7280';
  }
};

export const formatDuration = (hours: number): string => {
  if (hours < 1) return 'Less than 1 hour';
  if (hours < 24) return `${hours.toFixed(1)} hours`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''}`;
};

export const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString()}`;
};

export const getQualityScoreColor = (score: number): string => {
  if (score >= 9) return '#10b981';
  if (score >= 7) return '#3b82f6';
  if (score >= 5) return '#f59e0b';
  return '#ef4444';
};

export const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up': return '📈';
    case 'down': return '📉';
    case 'stable': return '➡️';
    default: return '➡️';
  }
};
