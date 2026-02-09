import { PendingReferral, PendingReferralSummary, PendingReasonDistribution, TimeInPendingHistogram, ConversionRecoveryInsight, PendingReferralAnalytics, PendingReason, RiskLevel, ActivationProgress, InterventionAction, PendingStatus } from './types';

// Mock Pending Referrals Data
export const mockPendingReferrals: PendingReferral[] = [
  {
    id: 'PENDING001',
    originalReferralId: 'REF001',
    referrerId: 'USER001',
    referrerName: 'Adebayo Johnson',
    referrerType: 'user',
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
    pendingReason: 'awaiting_first_action' as PendingReason,
    pendingSince: '2024-01-05T10:00:00Z',
    daysPending: 3,
    lastActivity: '2024-01-05T14:30:00Z',
    activationProgress: 'signup_completed' as ActivationProgress,
    riskLevel: 'low' as RiskLevel,
    pendingStatus: 'active' as PendingStatus,
    signupCompletedAt: '2024-01-05T14:30:00Z',
    interventions: [],
    riskSignals: [],
    duplicateDeviceDetected: false,
    rapidReferralChain: false,
    unusualBehaviorPatterns: false,
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T14:30:00Z',
    priority: 'medium'
  },
  {
    id: 'PENDING002',
    originalReferralId: 'REF002',
    referrerId: 'AGENT001',
    referrerName: 'Chukwuemeka Okafor',
    referrerType: 'agent',
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
    pendingReason: 'awaiting_verification' as PendingReason,
    pendingSince: '2024-01-07T11:00:00Z',
    daysPending: 1,
    lastActivity: '2024-01-08T09:20:00Z',
    activationProgress: 'verification_pending' as ActivationProgress,
    riskLevel: 'medium' as RiskLevel,
    pendingStatus: 'active' as PendingStatus,
    signupCompletedAt: '2024-01-07T16:45:00Z',
    firstActionCreatedAt: '2024-01-08T09:20:00Z',
    firstActionId: 'PICKUP001',
    firstActionType: 'pickup',
    firstActionWeight: 18.7,
    verificationStatus: 'pending',
    interventions: [
      {
        id: 'INT001',
        action: 'send_reminder' as InterventionAction,
        performedBy: 'SYSTEM',
        performedAt: '2024-01-08T08:00:00Z',
        details: 'Automated reminder sent to complete verification',
        outcome: 'pending'
      }
    ],
    riskSignals: [],
    duplicateDeviceDetected: false,
    rapidReferralChain: false,
    unusualBehaviorPatterns: false,
    createdAt: '2024-01-07T11:00:00Z',
    updatedAt: '2024-01-08T09:20:00Z',
    priority: 'high'
  },
  {
    id: 'PENDING003',
    originalReferralId: 'REF003',
    referrerId: 'BUSINESS001',
    referrerName: 'EcoTech Solutions Ltd',
    referrerType: 'business',
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
    pendingReason: 'flagged_for_review' as PendingReason,
    pendingSince: '2024-01-10T09:00:00Z',
    daysPending: 5,
    lastActivity: '2024-01-10T13:20:00Z',
    activationProgress: 'signup_completed' as ActivationProgress,
    riskLevel: 'high' as RiskLevel,
    pendingStatus: 'flagged' as PendingStatus,
    signupCompletedAt: '2024-01-11T13:20:00Z',
    interventions: [
      {
        id: 'INT002',
        action: 'flag_review' as InterventionAction,
        performedBy: 'SYSTEM',
        performedAt: '2024-01-10T14:00:00Z',
        details: 'Auto-flagged due to suspicious activity patterns',
        outcome: 'pending'
      }
    ],
    riskSignals: [
      {
        type: 'duplicate_device',
        severity: 'high',
        detectedAt: '2024-01-10T14:00:00Z',
        description: 'Same device used for multiple referrals',
        evidence: ['Device ID: DEV123456', 'IP Address: 192.168.1.100'],
        status: 'active'
      }
    ],
    duplicateDeviceDetected: true,
    rapidReferralChain: false,
    unusualBehaviorPatterns: true,
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-10T14:00:00Z',
    priority: 'high',
    notes: 'Suspicious activity detected - requires manual review'
  },
  {
    id: 'PENDING004',
    originalReferralId: 'REF004',
    referrerId: 'USER002',
    referrerName: 'Fatima Bello',
    referrerType: 'user',
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
    pendingReason: 'dispute_open' as PendingReason,
    pendingSince: '2024-01-12T14:00:00Z',
    daysPending: 8,
    lastActivity: '2024-01-15T16:45:00Z',
    activationProgress: 'verification_completed' as ActivationProgress,
    riskLevel: 'medium' as RiskLevel,
    pendingStatus: 'active' as PendingStatus,
    signupCompletedAt: '2024-01-12T14:30:00Z',
    firstActionCreatedAt: '2024-01-14T10:15:00Z',
    firstActionId: 'PICKUP002',
    firstActionType: 'pickup',
    firstActionWeight: 3.2,
    verificationStatus: 'completed',
    verificationCompletedAt: '2024-01-15T09:30:00Z',
    disputeOpenAt: '2024-01-15T16:45:00Z',
    interventions: [
      {
        id: 'INT003',
        action: 'extend_window' as InterventionAction,
        performedBy: 'OPS_ADMIN',
        performedAt: '2024-01-15T17:00:00Z',
        details: 'Activation window extended due to dispute',
        outcome: 'success'
      }
    ],
    riskSignals: [],
    duplicateDeviceDetected: false,
    rapidReferralChain: false,
    unusualBehaviorPatterns: false,
    createdAt: '2024-01-12T14:00:00Z',
    updatedAt: '2024-01-15T17:00:00Z',
    priority: 'medium',
    notes: 'Dispute opened regarding pickup weight verification'
  },
  {
    id: 'PENDING005',
    originalReferralId: 'REF005',
    referrerId: 'USER003',
    referrerName: 'Grace Okeke',
    referrerType: 'user',
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
    pendingReason: 'awaiting_reward_approval' as PendingReason,
    pendingSince: '2024-01-18T10:00:00Z',
    daysPending: 2,
    lastActivity: '2024-01-20T11:30:00Z',
    activationProgress: 'reward_eligible' as ActivationProgress,
    riskLevel: 'low' as RiskLevel,
    pendingStatus: 'active' as PendingStatus,
    signupCompletedAt: '2024-01-18T15:20:00Z',
    firstActionCreatedAt: '2024-01-19T08:45:00Z',
    firstActionId: 'DROPOFF001',
    firstActionType: 'dropoff',
    firstActionWeight: 12.8,
    verificationStatus: 'completed',
    verificationCompletedAt: '2024-01-20T09:15:00Z',
    interventions: [],
    riskSignals: [],
    duplicateDeviceDetected: false,
    rapidReferralChain: false,
    unusualBehaviorPatterns: false,
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-20T11:30:00Z',
    priority: 'low'
  },
  {
    id: 'PENDING006',
    originalReferralId: 'REF006',
    referrerId: 'USER004',
    referrerName: 'Ahmed Yusuf',
    referrerType: 'user',
    referrerEmail: 'ahmed.yusuf@email.com',
    referrerPhone: '+2348112345678',
    referrerCity: 'Kano',
    referrerZone: 'Sabon Gari',
    referralCode: 'AHMED2024',
    invitedUserId: 'USER106',
    invitedUserName: 'Aisha Mohammed',
    invitedUserEmail: 'aisha.mohammed@email.com',
    invitedUserPhone: '+2348123456789',
    invitedUserCity: 'Kano',
    invitedUserZone: 'Kano Municipal',
    pendingReason: 'fraud_checks' as PendingReason,
    pendingSince: '2024-01-15T09:00:00Z',
    daysPending: 10,
    lastActivity: '2024-01-20T08:00:00Z',
    activationProgress: 'signup_completed' as ActivationProgress,
    riskLevel: 'critical' as RiskLevel,
    pendingStatus: 'flagged' as PendingStatus,
    signupCompletedAt: '2024-01-15T14:30:00Z',
    fraudCheckStartedAt: '2024-01-20T08:00:00Z',
    interventions: [
      {
        id: 'INT004',
        action: 'flag_review' as InterventionAction,
        performedBy: 'SYSTEM',
        performedAt: '2024-01-20T08:00:00Z',
        details: 'Fraud check initiated due to rapid referral pattern',
        outcome: 'pending'
      }
    ],
    riskSignals: [
      {
        type: 'rapid_chain',
        severity: 'high',
        detectedAt: '2024-01-20T08:00:00Z',
        description: 'Multiple referrals from same referrer in short time',
        evidence: ['3 referrals in 24 hours', 'Similar email patterns'],
        status: 'active'
      },
      {
        type: 'timing_anomaly',
        severity: 'medium',
        detectedAt: '2024-01-20T08:00:00Z',
        description: 'Unusual signup timing pattern',
        evidence: ['Signups at 2:30 AM', 'Consistent 30-minute intervals'],
        status: 'active'
      }
    ],
    duplicateDeviceDetected: false,
    rapidReferralChain: true,
    unusualBehaviorPatterns: true,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-20T08:00:00Z',
    priority: 'high',
    notes: 'Critical fraud risk - manual review required'
  }
];

// Mock Pending Referral Summary
export const mockPendingReferralSummary: PendingReferralSummary = {
  totalPendingReferrals: 6,
  awaitingFirstAction: 1,
  awaitingVerification: 1,
  awaitingRewardApproval: 1,
  flaggedForReview: 2,
  stuckOver7Days: 2,
  avgDaysPending: 4.8,
  highRiskCount: 2,
  interventionSuccessRate: 75.0,
  conversionRate: 33.3
};

// Mock Pending Reason Distribution
export const mockPendingReasonDistribution: PendingReasonDistribution[] = [
  {
    reason: 'awaiting_first_action' as PendingReason,
    count: 1,
    percentage: 16.7,
    avgDaysPending: 3.0,
    conversionRate: 100.0,
    description: 'Users who signed up but haven\'t completed any action yet'
  },
  {
    reason: 'awaiting_verification' as PendingReason,
    count: 1,
    percentage: 16.7,
    avgDaysPending: 1.0,
    conversionRate: 0.0,
    description: 'Actions completed but verification is pending'
  },
  {
    reason: 'awaiting_reward_approval' as PendingReason,
    count: 1,
    percentage: 16.7,
    avgDaysPending: 2.0,
    conversionRate: 100.0,
    description: 'Activation criteria met, reward approval pending'
  },
  {
    reason: 'flagged_for_review' as PendingReason,
    count: 2,
    percentage: 33.3,
    avgDaysPending: 6.5,
    conversionRate: 0.0,
    description: 'Flagged for manual review due to risk signals'
  },
  {
    reason: 'dispute_open' as PendingReason,
    count: 1,
    percentage: 16.7,
    avgDaysPending: 8.0,
    conversionRate: 0.0,
    description: 'Dispute opened, resolution pending'
  },
  {
    reason: 'fraud_checks' as PendingReason,
    count: 0,
    percentage: 0.0,
    avgDaysPending: 0.0,
    conversionRate: 0.0,
    description: 'Fraud verification in progress'
  }
];

// Mock Time in Pending Histogram
export const mockTimeInPendingHistogram: TimeInPendingHistogram[] = [
  {
    daysRange: '0-1 days',
    count: 1,
    percentage: 16.7,
    riskLevel: 'low' as RiskLevel,
    conversionRate: 0.0
  },
  {
    daysRange: '2-3 days',
    count: 1,
    percentage: 16.7,
    riskLevel: 'low' as RiskLevel,
    conversionRate: 100.0
  },
  {
    daysRange: '4-7 days',
    count: 2,
    percentage: 33.3,
    riskLevel: 'medium' as RiskLevel,
    conversionRate: 50.0
  },
  {
    daysRange: '8-14 days',
    count: 2,
    percentage: 33.3,
    riskLevel: 'high' as RiskLevel,
    conversionRate: 0.0
  },
  {
    daysRange: '15+ days',
    count: 0,
    percentage: 0.0,
    riskLevel: 'critical' as RiskLevel,
    conversionRate: 0.0
  }
];

// Mock Conversion & Recovery Insights
export const mockConversionRecoveryInsights: ConversionRecoveryInsight[] = [
  {
    category: 'conversion',
    metric: 'Pending → Activated Rate',
    value: 33.3,
    trend: 'up',
    change: 5.2,
    description: 'Percentage of pending referrals that convert to active',
    recommendation: 'Focus on first-action completion nudges',
    severity: 'medium'
  },
  {
    category: 'recovery',
    metric: 'Avg Days to Activation',
    value: 4.8,
    trend: 'down',
    change: -12.5,
    description: 'Average time from pending to activation',
    recommendation: 'Improve verification process to reduce delays',
    severity: 'low'
  },
  {
    category: 'intervention',
    metric: 'Intervention Success Rate',
    value: 75.0,
    trend: 'stable',
    change: 0.0,
    description: 'Success rate of intervention actions',
    recommendation: 'Maintain current intervention strategies',
    severity: 'low'
  },
  {
    category: 'risk',
    metric: 'High-Risk Pending Rate',
    value: 33.3,
    trend: 'up',
    change: 8.7,
    description: 'Percentage of pending referrals with high risk level',
    recommendation: 'Strengthen fraud detection for high-risk patterns',
    severity: 'high'
  }
];

// Mock Pending Referral Analytics
export const mockPendingReferralAnalytics: PendingReferralAnalytics = {
  totalPending: 6,
  avgDaysPending: 4.8,
  conversionRate: 33.3,
  interventionSuccessRate: 75.0,
  riskDistribution: {
    low: 2,
    medium: 2,
    high: 1,
    critical: 1
  },
  pendingReasonDistribution: mockPendingReasonDistribution,
  timeInPendingHistogram: mockTimeInPendingHistogram,
  conversionRecoveryInsights: mockConversionRecoveryInsights,
  monthlyTrends: [
    {
      month: '2024-01',
      pending: 6,
      converted: 2,
      expired: 0,
      intervened: 4
    },
    {
      month: '2023-12',
      pending: 8,
      converted: 3,
      expired: 1,
      intervened: 4
    },
    {
      month: '2023-11',
      pending: 10,
      converted: 4,
      expired: 2,
      intervened: 4
    }
  ],
  performanceByCity: [
    {
      city: 'Lagos',
      pending: 4,
      conversionRate: 25.0,
      avgDaysPending: 5.2,
      interventionSuccessRate: 75.0
    },
    {
      city: 'Abuja',
      pending: 1,
      conversionRate: 0.0,
      avgDaysPending: 1.0,
      interventionSuccessRate: 100.0
    },
    {
      city: 'Port Harcourt',
      pending: 1,
      conversionRate: 0.0,
      avgDaysPending: 5.0,
      interventionSuccessRate: 100.0
    }
  ],
  performanceByReferrerType: [
    {
      type: 'user',
      pending: 4,
      conversionRate: 25.0,
      avgDaysPending: 5.8,
      interventionSuccessRate: 75.0
    },
    {
      type: 'agent',
      pending: 1,
      conversionRate: 0.0,
      avgDaysPending: 1.0,
      interventionSuccessRate: 100.0
    },
    {
      type: 'business',
      pending: 1,
      conversionRate: 0.0,
      avgDaysPending: 5.0,
      interventionSuccessRate: 100.0
    }
  ]
};

// Helper functions
export const getPendingReasonColor = (reason: PendingReason): string => {
  switch (reason) {
    case 'awaiting_first_action': return '#3b82f6';
    case 'awaiting_verification': return '#f59e0b';
    case 'awaiting_reward_approval': return '#10b981';
    case 'flagged_for_review': return '#ef4444';
    case 'dispute_open': return '#f97316';
    case 'fraud_checks': return '#dc2626';
    case 'weight_confirmation_pending': return '#8b5cf6';
    default: return '#6b7280';
  }
};

export const getRiskLevelColor = (level: RiskLevel): string => {
  switch (level) {
    case 'low': return '#10b981';
    case 'medium': return '#f59e0b';
    case 'high': return '#ef4444';
    case 'critical': return '#dc2626';
    default: return '#6b7280';
  }
};

export const getActivationProgressColor = (progress: ActivationProgress): string => {
  switch (progress) {
    case 'none': return '#6b7280';
    case 'signup_completed': return '#3b82f6';
    case 'action_created': return '#8b5cf6';
    case 'verification_pending': return '#f59e0b';
    case 'verification_completed': return '#10b981';
    case 'reward_eligible': return '#059669';
    default: return '#6b7280';
  }
};

export const formatDuration = (days: number): string => {
  if (days < 1) return 'Less than 1 day';
  if (days === 1) return '1 day';
  return `${days} days`;
};

export const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up': return '📈';
    case 'down': return '📉';
    case 'stable': return '➡️';
    default: return '➡️';
  }
};

export const getPriorityColor = (priority: 'low' | 'medium' | 'high'): string => {
  switch (priority) {
    case 'low': return '#10b981';
    case 'medium': return '#f59e0b';
    case 'high': return '#ef4444';
    default: return '#6b7280';
  }
};
