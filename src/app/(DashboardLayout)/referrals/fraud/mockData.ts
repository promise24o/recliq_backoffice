import { FraudCase, FraudRiskSummary, FraudSignalDistribution, RiskScoreDistribution, FraudPreventionInsight, FraudCheckAnalytics, FraudSignalType, RiskLevel, FraudCaseStatus, InvestigationPriority, EnforcementAction } from './types';

// Mock Fraud Cases Data
export const mockFraudCases: FraudCase[] = [
  {
    id: 'FRAUD001',
    referralId: 'REF001',
    referrerId: 'USER001',
    referrerName: 'Adebayo Johnson',
    referrerType: 'user',
    referrerEmail: 'adebayo.johnson@email.com',
    referrerPhone: '+2348012345678',
    referrerCity: 'Lagos',
    referrerZone: 'Ikoyi',
    invitedUserId: 'USER101',
    invitedUserName: 'Funke Adeyemi',
    invitedUserEmail: 'funke.adeyemi@email.com',
    invitedUserPhone: '+2348023456789',
    invitedUserCity: 'Lagos',
    invitedUserZone: 'Victoria Island',
    riskScore: 85,
    primarySignals: [
      {
        id: 'SIG001',
        type: 'same_device_ip' as FraudSignalType,
        severity: 'high',
        confidence: 92,
        detectedAt: '2024-01-15T10:30:00Z',
        description: 'Same device and IP used for multiple referrals',
        evidence: ['Device ID: DEV123456', 'IP Address: 192.168.1.100', '3 referrals from same device'],
        riskContribution: 35,
        status: 'active'
      },
      {
        id: 'SIG002',
        type: 'rapid_referral_chain' as FraudSignalType,
        severity: 'medium',
        confidence: 78,
        detectedAt: '2024-01-15T11:15:00Z',
        description: 'Multiple referrals created within short time period',
        evidence: ['3 referrals in 2 hours', 'Similar email patterns', 'Sequential signup times'],
        riskContribution: 25,
        status: 'active'
      }
    ],
    status: 'under_review' as FraudCaseStatus,
    priority: 'high' as InvestigationPriority,
    daysOpen: 5,
    createdAt: '2024-01-15T10:30:00Z',
    lastActivityAt: '2024-01-20T14:20:00Z',
    deviceHistory: [
      {
        deviceId: 'DEV123456',
        deviceType: 'Android',
        firstSeen: '2024-01-10T09:00:00Z',
        lastSeen: '2024-01-20T14:20:00Z',
        usageCount: 15,
        associatedUsers: ['USER001', 'USER101', 'USER102'],
        associatedReferrals: ['REF001', 'REF002', 'REF003'],
        riskLevel: 'high' as RiskLevel,
        flagged: true,
        flagReason: 'Multiple users and referrals from same device'
      }
    ],
    ipHistory: [
      {
        ipAddress: '192.168.1.100',
        firstSeen: '2024-01-10T09:00:00Z',
        lastSeen: '2024-01-20T14:20:00Z',
        usageCount: 18,
        associatedUsers: ['USER001', 'USER101', 'USER102'],
        associatedReferrals: ['REF001', 'REF002', 'REF003'],
        isVPN: false,
        isProxy: false,
        geolocation: {
          country: 'Nigeria',
          city: 'Lagos',
          coordinates: { lat: 6.5244, lng: 3.3792 }
        },
        riskLevel: 'high' as RiskLevel,
        flagged: true,
        flagReason: 'Multiple users from same IP'
      }
    ],
    locationPatterns: [
      {
        id: 'LOC001',
        timestamp: '2024-01-15T10:30:00Z',
        location: 'Victoria Island, Lagos',
        coordinates: { lat: 6.5244, lng: 3.3792 },
        action: 'signup',
        userId: 'USER101',
        isSuspicious: true,
        reason: 'Same location as referrer'
      }
    ],
    referralChain: [
      {
        userId: 'USER001',
        userName: 'Adebayo Johnson',
        referralCode: 'ADEBAYO2024',
        referredAt: '2024-01-10T09:00:00Z',
        referredBy: 'SYSTEM',
        depth: 0,
        suspiciousConnections: 2,
        totalReferrals: 3,
        completedReferrals: 1,
        riskScore: 85
      },
      {
        userId: 'USER101',
        userName: 'Funke Adeyemi',
        referralCode: 'FUNKE2024',
        referredAt: '2024-01-15T10:30:00Z',
        referredBy: 'USER001',
        depth: 1,
        suspiciousConnections: 1,
        totalReferrals: 1,
        completedReferrals: 0,
        riskScore: 65
      }
    ],
    actionEvidence: [],
    rewardHistory: [
      {
        rewardId: 'REW001',
        type: 'points',
        amount: 500,
        issuedAt: '2024-01-15T15:00:00Z',
        status: 'blocked',
        blockedAt: '2024-01-15T16:00:00Z',
        referralId: 'REF001'
      }
    ],
    rewardsAtRisk: 500,
    affectedReferrals: ['REF001', 'REF002', 'REF003'],
    financialExposure: 1500,
    potentialAbuseScale: 'small_ring',
    investigationNotes: [
      {
        id: 'NOTE001',
        timestamp: '2024-01-15T10:45:00Z',
        author: 'SYSTEM',
        role: 'Auto-Detection',
        note: 'Case auto-flagged due to high-risk signals',
        type: 'observation',
        attachments: [],
        visibility: 'internal'
      }
    ],
    enforcementActions: [
      {
        id: 'ACT001',
        action: 'block_rewards' as EnforcementAction,
        performedAt: '2024-01-15T16:00:00Z',
        performedBy: 'SYSTEM',
        role: 'Auto-Enforcement',
        reason: 'High fraud risk detected',
        details: 'Rewards blocked pending investigation',
        affectedUsers: ['USER001', 'USER101'],
        affectedReferrals: ['REF001', 'REF002', 'REF003'],
        financialImpact: 1500,
        reversed: false
      }
    ],
    appeals: [],
    detectionVersion: 'v2.1.0',
    autoFlagged: true,
    manualFlag: false,
    complianceReviewed: false
  },
  {
    id: 'FRAUD002',
    referralId: 'REF004',
    referrerId: 'AGENT001',
    referrerName: 'Chukwuemeka Okafor',
    referrerType: 'agent',
    referrerEmail: 'chukwuemeka@recycleagent.com',
    referrerPhone: '+2348034567890',
    referrerCity: 'Abuja',
    referrerZone: 'Wuse',
    invitedUserId: 'USER102',
    invitedUserName: 'Mariam Ibrahim',
    invitedUserEmail: 'mariam.ibrahim@email.com',
    invitedUserPhone: '+2348045678901',
    invitedUserCity: 'Kano', // Geo mismatch
    invitedUserZone: 'Kano Municipal',
    riskScore: 72,
    primarySignals: [
      {
        id: 'SIG003',
        type: 'geo_mismatch' as FraudSignalType,
        severity: 'medium',
        confidence: 85,
        detectedAt: '2024-01-18T14:20:00Z',
        description: 'Referrer and invited user locations are inconsistent',
        evidence: ['Referrer in Abuja', 'Invited user in Kano', 'No travel history'],
        riskContribution: 30,
        status: 'active'
      },
      {
        id: 'SIG004',
        type: 'weight_anomaly' as FraudSignalType,
        severity: 'medium',
        confidence: 68,
        detectedAt: '2024-01-18T16:45:00Z',
        description: 'Unusual weight patterns in referral actions',
        evidence: ['Consistent 15.0 kg weights', 'Low variance', 'Possible weight manipulation'],
        riskContribution: 20,
        status: 'active'
      }
    ],
    status: 'open' as FraudCaseStatus,
    priority: 'medium' as InvestigationPriority,
    daysOpen: 2,
    createdAt: '2024-01-18T14:20:00Z',
    lastActivityAt: '2024-01-20T09:30:00Z',
    deviceHistory: [],
    ipHistory: [],
    locationPatterns: [
      {
        id: 'LOC002',
        timestamp: '2024-01-18T14:20:00Z',
        location: 'Kano Municipal, Kano',
        coordinates: { lat: 11.9604, lng: 8.5217 },
        action: 'signup',
        userId: 'USER102',
        isSuspicious: true,
        reason: 'Location mismatch with referrer'
      }
    ],
    referralChain: [
      {
        userId: 'AGENT001',
        userName: 'Chukwuemeka Okafor',
        referralCode: 'CHUKWU2024',
        referredAt: '2024-01-12T08:00:00Z',
        referredBy: 'SYSTEM',
        depth: 0,
        suspiciousConnections: 1,
        totalReferrals: 4,
        completedReferrals: 3,
        riskScore: 72
      }
    ],
    actionEvidence: [
      {
        actionId: 'ACTION001',
        type: 'pickup',
        timestamp: '2024-01-18T16:45:00Z',
        location: 'Kano Municipal, Kano',
        weight: 15.0,
        wasteType: 'Plastic',
        verificationStatus: 'verified',
        suspicious: true,
        suspiciousReasons: ['Exact weight multiple times', 'No variance']
      }
    ],
    rewardHistory: [
      {
        rewardId: 'REW002',
        type: 'cash',
        amount: 1000,
        issuedAt: '2024-01-18T17:30:00Z',
        status: 'issued',
        referralId: 'REF004'
      }
    ],
    rewardsAtRisk: 1000,
    affectedReferrals: ['REF004'],
    financialExposure: 1000,
    potentialAbuseScale: 'individual',
    investigationNotes: [],
    enforcementActions: [],
    appeals: [],
    detectionVersion: 'v2.1.0',
    autoFlagged: true,
    manualFlag: false,
    complianceReviewed: false
  },
  {
    id: 'FRAUD003',
    referralId: 'REF005',
    referrerId: 'BUSINESS001',
    referrerName: 'EcoTech Solutions Ltd',
    referrerType: 'business',
    referrerEmail: 'referrals@ecotech.ng',
    referrerPhone: '+2348056789012',
    referrerCity: 'Port Harcourt',
    referrerZone: 'GRA',
    invitedUserId: 'USER103',
    invitedUserName: 'David Okoro',
    invitedUserEmail: 'david.okoro@email.com',
    invitedUserPhone: '+2348067890123',
    invitedUserCity: 'Port Harcourt',
    invitedUserZone: 'Rumuokwusi',
    riskScore: 45,
    primarySignals: [
      {
        id: 'SIG005',
        type: 'circular_referral' as FraudSignalType,
        severity: 'low',
        confidence: 60,
        detectedAt: '2024-01-20T08:15:00Z',
        description: 'Possible circular referral pattern detected',
        evidence: ['Cross-referral patterns', 'Mutual referral codes'],
        riskContribution: 15,
        status: 'active'
      }
    ],
    status: 'cleared' as FraudCaseStatus,
    priority: 'low' as InvestigationPriority,
    daysOpen: 3,
    createdAt: '2024-01-17T11:00:00Z',
    lastActivityAt: '2024-01-20T08:15:00Z',
    resolvedAt: '2024-01-20T10:30:00Z',
    reviewedBy: 'COMPLIANCE_OFFICER',
    deviceHistory: [],
    ipHistory: [],
    locationPatterns: [],
    referralChain: [],
    actionEvidence: [],
    rewardHistory: [],
    rewardsAtRisk: 0,
    affectedReferrals: ['REF005'],
    financialExposure: 0,
    potentialAbuseScale: 'individual',
    investigationNotes: [
      {
        id: 'NOTE002',
        timestamp: '2024-01-20T10:30:00Z',
        author: 'COMPLIANCE_OFFICER',
        role: 'Compliance',
        note: 'Case cleared - business referral pattern is legitimate',
        type: 'conclusion',
        attachments: [],
        visibility: 'compliance'
      }
    ],
    enforcementActions: [
      {
        id: 'ACT002',
        action: 'clear_case' as EnforcementAction,
        performedAt: '2024-01-20T10:30:00Z',
        performedBy: 'COMPLIANCE_OFFICER',
        role: 'Compliance',
        reason: 'False positive - legitimate business referral',
        details: 'Business referral program verified as legitimate',
        affectedUsers: ['USER103'],
        affectedReferrals: ['REF005'],
        financialImpact: 0,
        reversed: false
      }
    ],
    appeals: [],
    detectionVersion: 'v2.1.0',
    autoFlagged: true,
    manualFlag: false,
    complianceReviewed: true
  }
];

// Mock Fraud Risk Summary
export const mockFraudRiskSummary: FraudRiskSummary = {
  flaggedReferrals: 3,
  highRiskCases: 1,
  confirmedFraud: 0,
  clearedCases: 1,
  avgReviewTime: 3.3,
  rewardsProtected: 1500,
  totalFinancialExposure: 2500,
  fraudRate: 2.1,
  detectionAccuracy: 85.0,
  falsePositiveRate: 15.0,
  openCases: 2,
  escalatedCases: 0
};

// Mock Fraud Signal Distribution
export const mockFraudSignalDistribution: FraudSignalDistribution[] = [
  {
    signalType: 'same_device_ip' as FraudSignalType,
    count: 1,
    percentage: 33.3,
    avgRiskScore: 85,
    accuracy: 90.0,
    falsePositives: 1,
    description: 'Same device or IP used for multiple referrals',
    trend: 'stable'
  },
  {
    signalType: 'geo_mismatch' as FraudSignalType,
    count: 1,
    percentage: 33.3,
    avgRiskScore: 72,
    accuracy: 75.0,
    falsePositives: 2,
    description: 'Location inconsistencies between referrer and invited user',
    trend: 'increasing'
  },
  {
    signalType: 'rapid_referral_chain' as FraudSignalType,
    count: 1,
    percentage: 33.3,
    avgRiskScore: 85,
    accuracy: 80.0,
    falsePositives: 1,
    description: 'Multiple referrals created in short time period',
    trend: 'stable'
  },
  {
    signalType: 'circular_referral' as FraudSignalType,
    count: 1,
    percentage: 33.3,
    avgRiskScore: 45,
    accuracy: 60.0,
    falsePositives: 3,
    description: 'Cross-referral patterns between users',
    trend: 'decreasing'
  }
];

// Mock Risk Score Distribution
export const mockRiskScoreDistribution: RiskScoreDistribution[] = [
  {
    scoreRange: '0-25',
    count: 1,
    percentage: 33.3,
    fraudConfirmed: 0,
    falsePositives: 1,
    accuracy: 100.0
  },
  {
    scoreRange: '26-50',
    count: 0,
    percentage: 0.0,
    fraudConfirmed: 0,
    falsePositives: 0,
    accuracy: 0.0
  },
  {
    scoreRange: '51-75',
    count: 1,
    percentage: 33.3,
    fraudConfirmed: 0,
    falsePositives: 1,
    accuracy: 100.0
  },
  {
    scoreRange: '76-100',
    count: 1,
    percentage: 33.3,
    fraudConfirmed: 0,
    falsePositives: 0,
    accuracy: 0.0
  }
];

// Mock Fraud Prevention Insights
export const mockFraudPreventionInsights: FraudPreventionInsight[] = [
  {
    category: 'detection',
    metric: 'Detection Accuracy',
    value: 85.0,
    trend: 'up',
    change: 5.2,
    description: 'Percentage of fraud cases correctly identified',
    recommendation: 'Maintain current detection thresholds',
    severity: 'low',
    impact: 'high'
  },
  {
    category: 'prevention',
    metric: 'False Positive Rate',
    value: 15.0,
    trend: 'down',
    change: -8.7,
    description: 'Percentage of legitimate referrals flagged as fraud',
    recommendation: 'Continue fine-tuning detection algorithms',
    severity: 'medium',
    impact: 'medium'
  },
  {
    category: 'enforcement',
    metric: 'Avg Review Time',
    value: 3.3,
    trend: 'down',
    change: -12.5,
    description: 'Average days to resolve fraud cases',
    recommendation: 'Optimize investigation workflow',
    severity: 'low',
    impact: 'medium'
  },
  {
    category: 'systemic',
    metric: 'Fraud Rate',
    value: 2.1,
    trend: 'stable',
    change: 0.0,
    description: 'Percentage of total referrals that are fraudulent',
    recommendation: 'Monitor for emerging fraud patterns',
    severity: 'medium',
    impact: 'high'
  }
];

// Mock Fraud Check Analytics
export const mockFraudCheckAnalytics: FraudCheckAnalytics = {
  totalCases: 3,
  openCases: 2,
  confirmedFraud: 0,
  clearedCases: 1,
  avgReviewTime: 3.3,
  totalFinancialExposure: 2500,
  rewardsProtected: 1500,
  fraudRate: 2.1,
  detectionAccuracy: 85.0,
  falsePositiveRate: 15.0,
  riskSummary: mockFraudRiskSummary,
  signalDistribution: mockFraudSignalDistribution,
  riskScoreDistribution: mockRiskScoreDistribution,
  preventionInsights: mockFraudPreventionInsights,
  monthlyTrends: [
    {
      month: '2024-01',
      cases: 3,
      confirmed: 0,
      cleared: 1,
      exposure: 2500,
      protected: 1500
    },
    {
      month: '2023-12',
      cases: 5,
      confirmed: 1,
      cleared: 2,
      exposure: 4200,
      protected: 2800
    },
    {
      month: '2023-11',
      cases: 4,
      confirmed: 0,
      cleared: 3,
      exposure: 1800,
      protected: 900
    }
  ],
  cityRiskProfiles: [
    {
      city: 'Lagos',
      cases: 1,
      fraudRate: 2.5,
      avgRiskScore: 85,
      commonSignals: ['same_device_ip', 'rapid_referral_chain']
    },
    {
      city: 'Abuja',
      cases: 1,
      fraudRate: 1.8,
      avgRiskScore: 72,
      commonSignals: ['geo_mismatch', 'weight_anomaly']
    },
    {
      city: 'Port Harcourt',
      cases: 1,
      fraudRate: 2.0,
      avgRiskScore: 45,
      commonSignals: ['circular_referral']
    }
  ],
  referrerTypeRisk: [
    {
      type: 'user',
      cases: 1,
      fraudRate: 2.8,
      avgRiskScore: 85,
      commonSignals: ['same_device_ip', 'rapid_referral_chain']
    },
    {
      type: 'agent',
      cases: 1,
      fraudRate: 3.2,
      avgRiskScore: 72,
      commonSignals: ['geo_mismatch', 'weight_anomaly']
    },
    {
      type: 'business',
      cases: 1,
      fraudRate: 1.5,
      avgRiskScore: 45,
      commonSignals: ['circular_referral']
    }
  ]
};

// Helper functions
export const getFraudSignalTypeColor = (type: FraudSignalType): string => {
  switch (type) {
    case 'same_device_ip': return '#ef4444';
    case 'geo_mismatch': return '#f59e0b';
    case 'rapid_referral_chain': return '#f97316';
    case 'repeated_patterns': return '#8b5cf6';
    case 'weight_anomaly': return '#06b6d4';
    case 'circular_referral': return '#10b981';
    case 'recycled_rewards': return '#dc2626';
    case 'timing_anomaly': return '#f59e0b';
    case 'location_spoofing': return '#ef4444';
    default: return '#6b7280';
  }
};

export const getRiskLevelColor = (level: RiskLevel): string => {
  switch (level) {
    case 'low': return '#10b981';
    case 'medium': return '#f59e0b';
    case 'high': return '#f97316';
    case 'critical': return '#ef4444';
    default: return '#6b7280';
  }
};

export const getFraudCaseStatusColor = (status: FraudCaseStatus): string => {
  switch (status) {
    case 'open': return '#3b82f6';
    case 'under_review': return '#f59e0b';
    case 'cleared': return '#10b981';
    case 'confirmed_fraud': return '#ef4444';
    case 'escalated': return '#dc2626';
    default: return '#6b7280';
  }
};

export const getEnforcementActionColor = (action: EnforcementAction): string => {
  switch (action) {
    case 'clear_case': return '#10b981';
    case 'block_rewards': return '#f59e0b';
    case 'reverse_rewards': return '#ef4444';
    case 'suspend_privileges': return '#dc2626';
    case 'flag_account': return '#f97316';
    case 'escalate_compliance': return '#8b5cf6';
    default: return '#6b7280';
  }
};

export const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString()}`;
};

export const getRiskScoreColor = (score: number): string => {
  if (score >= 80) return '#ef4444';
  if (score >= 60) return '#f97316';
  if (score >= 40) return '#f59e0b';
  return '#10b981';
};

export const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up': return '📈';
    case 'down': return '📉';
    case 'stable': return '➡️';
    default: return '➡️';
  }
};

export const getPriorityColor = (priority: InvestigationPriority): string => {
  switch (priority) {
    case 'urgent': return '#dc2626';
    case 'high': return '#ef4444';
    case 'medium': return '#f59e0b';
    case 'low': return '#10b981';
    default: return '#6b7280';
  }
};
