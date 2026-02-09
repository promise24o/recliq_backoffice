import { CompletedReferral, CompletionSummary, ReferralCompletionTrend, ReferralQualityAnalysis, TopReferrer, CityPerformance, ReferrerTypePerformance, ReferralCompletionAnalytics, ReferrerType, FirstActionType, RewardType, RewardStatus, AnomalyType } from './types';

// Mock Completed Referrals Data
export const mockCompletedReferrals: CompletedReferral[] = [
  {
    id: 'COMPLETED001',
    originalReferralId: 'REF001',
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
    firstActionId: 'PICKUP001',
    firstActionType: 'pickup' as FirstActionType,
    firstActionWeight: 15.2,
    firstActionWasteType: 'Plastic',
    firstActionLocation: 'Victoria Island, Lagos',
    firstActionTimestamp: '2024-01-10T09:30:00Z',
    verificationCompletedAt: '2024-01-10T14:20:00Z',
    completionDate: '2024-01-10T14:20:00Z',
    timeToCompletion: 5,
    rewardIssued: true,
    rewardType: 'points' as RewardType,
    rewardAmount: 500,
    rewardStatus: 'issued' as RewardStatus,
    rewardIssuedAt: '2024-01-10T15:00:00Z',
    walletTransactionId: 'TXN001',
    weightVariance: 5.2,
    behaviorConsistency: 92,
    disputeFree: true,
    fraudChecksPassed: true,
    retention30Days: true,
    retention60Days: true,
    anomalies: [],
    flaggedForReview: false,
    referralCost: 500,
    revenueGenerated: 1520,
    roi: 204,
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-10T15:00:00Z',
    completedAt: '2024-01-10T14:20:00Z'
  },
  {
    id: 'COMPLETED002',
    originalReferralId: 'REF002',
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
    firstActionId: 'DROPOFF001',
    firstActionType: 'dropoff' as FirstActionType,
    firstActionWeight: 22.8,
    firstActionWasteType: 'Paper',
    firstActionLocation: 'Maitama, Abuja',
    firstActionTimestamp: '2024-01-12T11:15:00Z',
    verificationCompletedAt: '2024-01-12T16:45:00Z',
    completionDate: '2024-01-12T16:45:00Z',
    timeToCompletion: 3,
    rewardIssued: true,
    rewardType: 'cash' as RewardType,
    rewardAmount: 1000,
    rewardStatus: 'issued' as RewardStatus,
    rewardIssuedAt: '2024-01-12T17:30:00Z',
    walletTransactionId: 'TXN002',
    weightVariance: 2.1,
    behaviorConsistency: 88,
    disputeFree: true,
    fraudChecksPassed: true,
    retention30Days: true,
    retention60Days: false,
    anomalies: [],
    flaggedForReview: false,
    referralCost: 1000,
    revenueGenerated: 2280,
    roi: 128,
    createdAt: '2024-01-09T08:00:00Z',
    updatedAt: '2024-01-12T17:30:00Z',
    completedAt: '2024-01-12T16:45:00Z'
  },
  {
    id: 'COMPLETED003',
    originalReferralId: 'REF003',
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
    firstActionId: 'PICKUP002',
    firstActionType: 'pickup' as FirstActionType,
    firstActionWeight: 18.5,
    firstActionWasteType: 'Metal',
    firstActionLocation: 'Rumuokwusi, Port Harcourt',
    firstActionTimestamp: '2024-01-14T13:45:00Z',
    verificationCompletedAt: '2024-01-14T18:30:00Z',
    completionDate: '2024-01-14T18:30:00Z',
    timeToCompletion: 7,
    rewardIssued: true,
    rewardType: 'bonus' as RewardType,
    rewardAmount: 750,
    rewardStatus: 'issued' as RewardStatus,
    rewardIssuedAt: '2024-01-14T19:00:00Z',
    walletTransactionId: 'TXN003',
    weightVariance: 8.7,
    behaviorConsistency: 76,
    disputeFree: true,
    fraudChecksPassed: true,
    retention30Days: false,
    retention60Days: false,
    anomalies: [
      {
        id: 'ANOM001',
        type: 'weight_variance' as AnomalyType,
        severity: 'medium',
        detectedAt: '2024-01-14T18:30:00Z',
        description: 'Weight variance above acceptable threshold',
        value: 18.5,
        expectedValue: 17.0,
        resolved: false
      }
    ],
    flaggedForReview: true,
    reviewReason: 'Weight variance requires investigation',
    referralCost: 750,
    revenueGenerated: 1850,
    roi: 147,
    createdAt: '2024-01-07T09:00:00Z',
    updatedAt: '2024-01-14T19:00:00Z',
    completedAt: '2024-01-14T18:30:00Z',
    notes: 'Weight variance of 8.7% detected during verification'
  },
  {
    id: 'COMPLETED004',
    originalReferralId: 'REF004',
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
    firstActionId: 'DROPOFF002',
    firstActionType: 'dropoff' as FirstActionType,
    firstActionWeight: 12.3,
    firstActionWasteType: 'Glass',
    firstActionLocation: 'Yaba, Lagos',
    firstActionTimestamp: '2024-01-16T10:20:00Z',
    verificationCompletedAt: '2024-01-16T15:10:00Z',
    completionDate: '2024-01-16T15:10:00Z',
    timeToCompletion: 4,
    rewardIssued: true,
    rewardType: 'perk' as RewardType,
    rewardAmount: 300,
    rewardStatus: 'issued' as RewardStatus,
    rewardIssuedAt: '2024-01-16T16:00:00Z',
    walletTransactionId: 'TXN004',
    weightVariance: 1.8,
    behaviorConsistency: 95,
    disputeFree: true,
    fraudChecksPassed: true,
    retention30Days: true,
    retention60Days: true,
    anomalies: [],
    flaggedForReview: false,
    referralCost: 300,
    revenueGenerated: 1230,
    roi: 310,
    createdAt: '2024-01-12T11:00:00Z',
    updatedAt: '2024-01-16T16:00:00Z',
    completedAt: '2024-01-16T15:10:00Z'
  },
  {
    id: 'COMPLETED005',
    originalReferralId: 'REF005',
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
    firstActionId: 'PICKUP003',
    firstActionType: 'pickup' as FirstActionType,
    firstActionWeight: 25.6,
    firstActionWasteType: 'E-Waste',
    firstActionLocation: 'Ikoyi, Lagos',
    firstActionTimestamp: '2024-01-18T14:30:00Z',
    verificationCompletedAt: '2024-01-18T19:15:00Z',
    completionDate: '2024-01-18T19:15:00Z',
    timeToCompletion: 2,
    rewardIssued: true,
    rewardType: 'points' as RewardType,
    rewardAmount: 800,
    rewardStatus: 'issued' as RewardStatus,
    rewardIssuedAt: '2024-01-18T20:00:00Z',
    walletTransactionId: 'TXN005',
    weightVariance: 3.2,
    behaviorConsistency: 89,
    disputeFree: true,
    fraudChecksPassed: true,
    retention30Days: true,
    retention60Days: false,
    anomalies: [],
    flaggedForReview: false,
    referralCost: 800,
    revenueGenerated: 2560,
    roi: 220,
    createdAt: '2024-01-16T09:00:00Z',
    updatedAt: '2024-01-18T20:00:00Z',
    completedAt: '2024-01-18T19:15:00Z'
  }
];

// Mock Completion Summary
export const mockCompletionSummary: CompletionSummary = {
  totalCompletedReferrals: 5,
  firstActionsCompleted: 5,
  totalWeightRecycled: 94.4,
  totalRewardsIssued: 3350,
  topReferrersCount: 3,
  avgTimeToCompletion: 4.2,
  avgRewardPerReferral: 670,
  totalReferralCost: 3350,
  totalRevenueGenerated: 9440,
  overallROI: 182,
  completionRate: 83.3,
  retention30DayRate: 80.0,
  retention60DayRate: 60.0
};

// Mock Referral Completion Trends
export const mockReferralCompletionTrends: ReferralCompletionTrend[] = [
  {
    date: '2024-01-10',
    completed: 1,
    pickups: 1,
    dropoffs: 0,
    avgTimeToCompletion: 5.0,
    avgRewardAmount: 500,
    totalWeight: 15.2
  },
  {
    date: '2024-01-12',
    completed: 1,
    pickups: 0,
    dropoffs: 1,
    avgTimeToCompletion: 3.0,
    avgRewardAmount: 1000,
    totalWeight: 22.8
  },
  {
    date: '2024-01-14',
    completed: 1,
    pickups: 1,
    dropoffs: 0,
    avgTimeToCompletion: 7.0,
    avgRewardAmount: 750,
    totalWeight: 18.5
  },
  {
    date: '2024-01-16',
    completed: 1,
    pickups: 0,
    dropoffs: 1,
    avgTimeToCompletion: 4.0,
    avgRewardAmount: 300,
    totalWeight: 12.3
  },
  {
    date: '2024-01-18',
    completed: 1,
    pickups: 1,
    dropoffs: 0,
    avgTimeToCompletion: 2.0,
    avgRewardAmount: 800,
    totalWeight: 25.6
  }
];

// Mock Referral Quality Analysis
export const mockReferralQualityAnalysis: ReferralQualityAnalysis[] = [
  {
    category: 'completion',
    metric: 'Completion Rate',
    value: 83.3,
    trend: 'up',
    change: 12.5,
    description: 'Percentage of referrals that complete activation',
    recommendation: 'Maintain current activation incentives',
    severity: 'low'
  },
  {
    category: 'retention',
    metric: '30-Day Retention',
    value: 80.0,
    trend: 'stable',
    change: 0.0,
    description: 'Users active 30 days after referral completion',
    recommendation: 'Focus on post-completion engagement',
    severity: 'medium'
  },
  {
    category: 'quality',
    metric: 'Avg Behavior Consistency',
    value: 88.0,
    trend: 'up',
    change: 5.2,
    description: 'Average behavior consistency score for completed referrals',
    recommendation: 'Continue quality monitoring',
    severity: 'low'
  },
  {
    category: 'financial',
    metric: 'ROI',
    value: 182.0,
    trend: 'up',
    change: 28.7,
    description: 'Return on investment for referral program',
    recommendation: 'Consider expanding referral incentives',
    severity: 'low'
  }
];

// Mock Top Referrers
export const mockTopReferrers: TopReferrer[] = [
  {
    id: 'USER003',
    name: 'Grace Okeke',
    type: 'user' as ReferrerType,
    city: 'Lagos',
    totalReferrals: 3,
    completedReferrals: 2,
    completionRate: 66.7,
    totalWeightRecycled: 40.8,
    totalRewardsIssued: 1600,
    avgTimeToCompletion: 3.5,
    qualityScore: 89,
    revenueGenerated: 4080,
    roi: 155,
    retention30DayRate: 100.0,
    retention60DayRate: 50.0
  },
  {
    id: 'USER001',
    name: 'Adebayo Johnson',
    type: 'user' as ReferrerType,
    city: 'Lagos',
    totalReferrals: 2,
    completedReferrals: 2,
    completionRate: 100.0,
    totalWeightRecycled: 30.4,
    totalRewardsIssued: 1000,
    avgTimeToCompletion: 5.0,
    qualityScore: 92,
    revenueGenerated: 3040,
    roi: 204,
    retention30DayRate: 100.0,
    retention60DayRate: 100.0
  },
  {
    id: 'AGENT001',
    name: 'Chukwuemeka Okafor',
    type: 'agent' as ReferrerType,
    city: 'Abuja',
    totalReferrals: 4,
    completedReferrals: 3,
    completionRate: 75.0,
    totalWeightRecycled: 68.4,
    totalRewardsIssued: 3000,
    avgTimeToCompletion: 3.2,
    qualityScore: 88,
    revenueGenerated: 6840,
    roi: 128,
    retention30DayRate: 66.7,
    retention60DayRate: 33.3
  }
];

// Mock City Performance
export const mockCityPerformance: CityPerformance[] = [
  {
    city: 'Lagos',
    totalReferrals: 8,
    completedReferrals: 6,
    completionRate: 75.0,
    totalWeightRecycled: 73.6,
    totalRewardsIssued: 2100,
    avgTimeToCompletion: 4.0,
    avgRewardPerReferral: 525,
    topReferrers: 2,
    revenueGenerated: 7360
  },
  {
    city: 'Abuja',
    totalReferrals: 4,
    completedReferrals: 3,
    completionRate: 75.0,
    totalWeightRecycled: 22.8,
    totalRewardsIssued: 1000,
    avgTimeToCompletion: 3.0,
    avgRewardPerReferral: 1000,
    topReferrers: 1,
    revenueGenerated: 2280
  },
  {
    city: 'Port Harcourt',
    totalReferrals: 2,
    completedReferrals: 1,
    completionRate: 50.0,
    totalWeightRecycled: 18.5,
    totalRewardsIssued: 750,
    avgTimeToCompletion: 7.0,
    avgRewardPerReferral: 750,
    topReferrers: 1,
    revenueGenerated: 1850
  }
];

// Mock Referrer Type Performance
export const mockReferrerTypePerformance: ReferrerTypePerformance[] = [
  {
    type: 'user' as ReferrerType,
    totalReferrals: 7,
    completedReferrals: 6,
    completionRate: 85.7,
    totalWeightRecycled: 53.6,
    totalRewardsIssued: 2100,
    avgTimeToCompletion: 4.2,
    avgRewardPerReferral: 525,
    revenueGenerated: 5360,
    roi: 155,
    qualityScore: 92
  },
  {
    type: 'agent' as ReferrerType,
    totalReferrals: 4,
    completedReferrals: 3,
    completionRate: 75.0,
    totalWeightRecycled: 22.8,
    totalRewardsIssued: 1000,
    avgTimeToCompletion: 3.0,
    avgRewardPerReferral: 1000,
    revenueGenerated: 2280,
    roi: 128,
    qualityScore: 88
  },
  {
    type: 'business' as ReferrerType,
    totalReferrals: 1,
    completedReferrals: 1,
    completionRate: 100.0,
    totalWeightRecycled: 18.5,
    totalRewardsIssued: 750,
    avgTimeToCompletion: 7.0,
    avgRewardPerReferral: 750,
    revenueGenerated: 1850,
    roi: 147,
    qualityScore: 76
  }
];

// Mock Referral Completion Analytics
export const mockReferralCompletionAnalytics: ReferralCompletionAnalytics = {
  totalCompleted: 5,
  totalWeightRecycled: 94.4,
  totalRewardsIssued: 3350,
  avgTimeToCompletion: 4.2,
  completionRate: 83.3,
  retention30DayRate: 80.0,
  retention60DayRate: 60.0,
  overallROI: 182,
  trends: mockReferralCompletionTrends,
  qualityAnalysis: mockReferralQualityAnalysis,
  topReferrers: mockTopReferrers,
  cityPerformance: mockCityPerformance,
  referrerTypePerformance: mockReferrerTypePerformance,
  monthlyTrends: [
    {
      month: '2024-01',
      completed: 5,
      weight: 94.4,
      rewards: 3350,
      revenue: 9440,
      roi: 182
    },
    {
      month: '2023-12',
      completed: 8,
      weight: 156.2,
      rewards: 5200,
      revenue: 15620,
      roi: 200
    },
    {
      month: '2023-11',
      completed: 6,
      weight: 112.8,
      rewards: 3900,
      revenue: 11280,
      roi: 189
    }
  ],
  wasteCategoryBreakdown: [
    {
      category: 'Plastic',
      count: 2,
      weight: 33.7,
      avgReward: 650
    },
    {
      category: 'Paper',
      count: 1,
      weight: 22.8,
      avgReward: 1000
    },
    {
      category: 'Metal',
      count: 1,
      weight: 18.5,
      avgReward: 750
    },
    {
      category: 'Glass',
      count: 1,
      weight: 12.3,
      avgReward: 300
    },
    {
      category: 'E-Waste',
      count: 1,
      weight: 25.6,
      avgReward: 800
    }
  ]
};

// Helper functions
export const getReferrerTypeColor = (type: ReferrerType): string => {
  switch (type) {
    case 'user': return '#3b82f6';
    case 'agent': return '#10b981';
    case 'business': return '#8b5cf6';
    default: return '#6b7280';
  }
};

export const getFirstActionTypeColor = (type: FirstActionType): string => {
  switch (type) {
    case 'pickup': return '#10b981';
    case 'dropoff': return '#f59e0b';
    default: return '#6b7280';
  }
};

export const getRewardTypeColor = (type: RewardType): string => {
  switch (type) {
    case 'points': return '#3b82f6';
    case 'bonus': return '#10b981';
    case 'cash': return '#059669';
    case 'perk': return '#8b5cf6';
    default: return '#6b7280';
  }
};

export const getRewardStatusColor = (status: RewardStatus): string => {
  switch (status) {
    case 'issued': return '#10b981';
    case 'pending': return '#f59e0b';
    case 'failed': return '#ef4444';
    case 'cancelled': return '#6b7280';
    default: return '#6b7280';
  }
};

export const getAnomalySeverityColor = (severity: 'low' | 'medium' | 'high'): string => {
  switch (severity) {
    case 'low': return '#f59e0b';
    case 'medium': return '#f97316';
    case 'high': return '#ef4444';
    default: return '#6b7280';
  }
};

export const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString()}`;
};

export const formatWeight = (weight: number): string => {
  return `${weight.toFixed(1)} kg`;
};

export const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up': return '📈';
    case 'down': return '📉';
    case 'stable': return '➡️';
    default: return '➡️';
  }
};

export const getQualityScoreColor = (score: number): string => {
  if (score >= 90) return '#10b981';
  if (score >= 80) return '#3b82f6';
  if (score >= 70) return '#f59e0b';
  return '#ef4444';
};

export const getROIColor = (roi: number): string => {
  if (roi >= 200) return '#10b981';
  if (roi >= 150) return '#3b82f6';
  if (roi >= 100) return '#f59e0b';
  return '#ef4444';
};
