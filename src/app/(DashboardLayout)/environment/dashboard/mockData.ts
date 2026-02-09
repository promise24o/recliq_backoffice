import { 
  EnvironmentalImpact, 
  SDGContribution, 
  ImpactSummary, 
  ImpactOverTime, 
  WasteTypeBreakdown, 
  ActivityTypeBreakdown, 
  CityImpact, 
  ZoneImpact, 
  ImpactFilters, 
  ESGReport,
  CO2ConversionRates,
  ESGMetric,
  ImpactAuditEntry,
  WasteType,
  ActivityType,
  VerificationStatus,
  ImpactMetricType,
  SDGGoal
} from './types';

// CO2 Conversion Rates (kg CO2e per kg of waste)
export const CO2_CONVERSION_RATES: CO2ConversionRates = {
  plastic: 2.5,
  metal: 1.8,
  paper: 0.9,
  glass: 0.3,
  organic: 0.4,
  ewaste: 3.2,
  textile: 1.2,
  mixed: 1.5
};

// Tree equivalent calculation (kg CO2e absorbed per tree per year)
export const TREE_CO2_ABSORPTION = 21.77; // kg CO2e per tree per year

// Mock Environmental Impact Data
export const mockEnvironmentalImpacts: EnvironmentalImpact[] = [
  {
    id: 'impact_001',
    date: '2024-01-15',
    city: 'Lagos',
    zone: 'Ikoyi',
    wasteType: 'plastic',
    activityType: 'pickup',
    weightKg: 245.5,
    co2AvoidedKg: 613.75,
    treesEquivalent: 28.2,
    verificationStatus: 'verified',
    verificationSource: 'agent_scale_001',
    enterpriseId: 'enterprise_001',
    agentId: 'agent_001',
    sdgContributions: [
      { goal: 'SDG_12', contributionKg: 245.5, description: 'Responsible consumption and production' },
      { goal: 'SDG_13', contributionKg: 613.75, description: 'Climate action' }
    ],
    createdAt: '2024-01-15T10:30:00Z',
    verifiedAt: '2024-01-15T11:15:00Z'
  },
  {
    id: 'impact_002',
    date: '2024-01-16',
    city: 'Lagos',
    zone: 'Victoria Island',
    wasteType: 'metal',
    activityType: 'dropoff',
    weightKg: 189.2,
    co2AvoidedKg: 340.56,
    treesEquivalent: 15.6,
    verificationStatus: 'verified',
    verificationSource: 'facility_scale_002',
    enterpriseId: 'enterprise_002',
    agentId: 'agent_002',
    sdgContributions: [
      { goal: 'SDG_9', contributionKg: 189.2, description: 'Industry, innovation and infrastructure' },
      { goal: 'SDG_11', contributionKg: 340.56, description: 'Sustainable cities and communities' }
    ],
    createdAt: '2024-01-16T09:45:00Z',
    verifiedAt: '2024-01-16T10:30:00Z'
  },
  {
    id: 'impact_003',
    date: '2024-01-17',
    city: 'Abuja',
    zone: 'Maitama',
    wasteType: 'paper',
    activityType: 'pickup',
    weightKg: 156.8,
    co2AvoidedKg: 141.12,
    treesEquivalent: 6.5,
    verificationStatus: 'verified',
    verificationSource: 'agent_scale_003',
    enterpriseId: 'enterprise_003',
    agentId: 'agent_003',
    sdgContributions: [
      { goal: 'SDG_12', contributionKg: 156.8, description: 'Responsible consumption and production' },
      { goal: 'SDG_15', contributionKg: 141.12, description: 'Life on land' }
    ],
    createdAt: '2024-01-17T14:20:00Z',
    verifiedAt: '2024-01-17T15:00:00Z'
  },
  {
    id: 'impact_004',
    date: '2024-01-18',
    city: 'Port Harcourt',
    zone: 'GRA',
    wasteType: 'ewaste',
    activityType: 'pickup',
    weightKg: 89.3,
    co2AvoidedKg: 285.76,
    treesEquivalent: 13.1,
    verificationStatus: 'verified',
    verificationSource: 'facility_scale_004',
    enterpriseId: 'enterprise_004',
    agentId: 'agent_004',
    sdgContributions: [
      { goal: 'SDG_3', contributionKg: 89.3, description: 'Good health and well-being' },
      { goal: 'SDG_12', contributionKg: 285.76, description: 'Responsible consumption and production' }
    ],
    createdAt: '2024-01-18T11:10:00Z',
    verifiedAt: '2024-01-18T11:45:00Z'
  },
  {
    id: 'impact_005',
    date: '2024-01-19',
    city: 'Kano',
    zone: 'Nassarawa',
    wasteType: 'organic',
    activityType: 'dropoff',
    weightKg: 312.7,
    co2AvoidedKg: 125.08,
    treesEquivalent: 5.7,
    verificationStatus: 'verified',
    verificationSource: 'agent_scale_005',
    enterpriseId: 'enterprise_005',
    agentId: 'agent_005',
    sdgContributions: [
      { goal: 'SDG_2', contributionKg: 312.7, description: 'Zero hunger' },
      { goal: 'SDG_13', contributionKg: 125.08, description: 'Climate action' }
    ],
    createdAt: '2024-01-19T08:30:00Z',
    verifiedAt: '2024-01-19T09:15:00Z'
  },
  {
    id: 'impact_006',
    date: '2024-01-20',
    city: 'Lagos',
    zone: 'Lekki',
    wasteType: 'glass',
    activityType: 'pickup',
    weightKg: 198.4,
    co2AvoidedKg: 59.52,
    treesEquivalent: 2.7,
    verificationStatus: 'verified',
    verificationSource: 'facility_scale_006',
    enterpriseId: 'enterprise_006',
    agentId: 'agent_006',
    sdgContributions: [
      { goal: 'SDG_11', contributionKg: 198.4, description: 'Sustainable cities and communities' },
      { goal: 'SDG_12', contributionKg: 59.52, description: 'Responsible consumption and production' }
    ],
    createdAt: '2024-01-20T13:45:00Z',
    verifiedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'impact_007',
    date: '2024-01-21',
    city: 'Ibadan',
    zone: 'Bodija',
    wasteType: 'textile',
    activityType: 'dropoff',
    weightKg: 167.9,
    co2AvoidedKg: 201.48,
    treesEquivalent: 9.3,
    verificationStatus: 'verified',
    verificationSource: 'agent_scale_007',
    enterpriseId: 'enterprise_007',
    agentId: 'agent_007',
    sdgContributions: [
      { goal: 'SDG_12', contributionKg: 167.9, description: 'Responsible consumption and production' },
      { goal: 'SDG_8', contributionKg: 201.48, description: 'Decent work and economic growth' }
    ],
    createdAt: '2024-01-21T10:15:00Z',
    verifiedAt: '2024-01-21T11:00:00Z'
  },
  {
    id: 'impact_008',
    date: '2024-01-22',
    city: 'Lagos',
    zone: 'Surulere',
    wasteType: 'mixed',
    activityType: 'pickup',
    weightKg: 278.6,
    co2AvoidedKg: 417.9,
    treesEquivalent: 19.2,
    verificationStatus: 'verified',
    verificationSource: 'facility_scale_008',
    enterpriseId: 'enterprise_008',
    agentId: 'agent_008',
    sdgContributions: [
      { goal: 'SDG_12', contributionKg: 278.6, description: 'Responsible consumption and production' },
      { goal: 'SDG_13', contributionKg: 417.9, description: 'Climate action' }
    ],
    createdAt: '2024-01-22T15:30:00Z',
    verifiedAt: '2024-01-22T16:15:00Z'
  }
];

// Mock Impact Summary
export const mockImpactSummary: ImpactSummary = {
  totalWasteRecycled: 1738.4,
  totalCO2Avoided: 2195.17,
  totalTreesSaved: 100.3,
  landfillDiversionRate: 87.5,
  sdgContributions: {
    totalContributions: 16,
    sdgs: [
      {
        sdgNumber: 11,
        sdgTitle: 'Sustainable Cities and Communities',
        sdgDescription: 'Make cities inclusive, safe, resilient and sustainable',
        impactWeight: 1738.4,
        targetMet: false,
        progressPercentage: 65.2
      },
      {
        sdgNumber: 12,
        sdgTitle: 'Responsible Consumption and Production',
        sdgDescription: 'Ensure sustainable consumption and production patterns',
        impactWeight: 1738.4,
        targetMet: false,
        progressPercentage: 58.7
      },
      {
        sdgNumber: 13,
        sdgTitle: 'Climate Action',
        sdgDescription: 'Take urgent action to combat climate change and its impacts',
        impactWeight: 2195.17,
        targetMet: false,
        progressPercentage: 72.1
      }
    ]
  },
  monthlyGrowthRate: 23.5
};

// Mock Impact Over Time Data
export const mockImpactOverTime: ImpactOverTime[] = [
  {
    date: '2024-01-15',
    totalWasteKg: 245.5,
    totalCO2Kg: 613.75,
    totalTrees: 28.2,
    activityCount: 1,
    averageImpactPerActivity: 245.5
  },
  {
    date: '2024-01-16',
    totalWasteKg: 434.7,
    totalCO2Kg: 954.31,
    totalTrees: 43.8,
    activityCount: 2,
    averageImpactPerActivity: 217.35
  },
  {
    date: '2024-01-17',
    totalWasteKg: 591.5,
    totalCO2Kg: 1095.43,
    totalTrees: 50.3,
    activityCount: 3,
    averageImpactPerActivity: 197.17
  },
  {
    date: '2024-01-18',
    totalWasteKg: 680.8,
    totalCO2Kg: 1381.19,
    totalTrees: 63.4,
    activityCount: 4,
    averageImpactPerActivity: 170.2
  },
  {
    date: '2024-01-19',
    totalWasteKg: 993.5,
    totalCO2Kg: 1506.27,
    totalTrees: 69.1,
    activityCount: 5,
    averageImpactPerActivity: 198.7
  },
  {
    date: '2024-01-20',
    totalWasteKg: 1191.9,
    totalCO2Kg: 1565.79,
    totalTrees: 71.8,
    activityCount: 6,
    averageImpactPerActivity: 198.65
  },
  {
    date: '2024-01-21',
    totalWasteKg: 1359.8,
    totalCO2Kg: 1767.27,
    totalTrees: 81.1,
    activityCount: 7,
    averageImpactPerActivity: 194.26
  },
  {
    date: '2024-01-22',
    totalWasteKg: 1638.4,
    totalCO2Kg: 2185.17,
    totalTrees: 100.3,
    activityCount: 8,
    averageImpactPerActivity: 204.8
  }
];

// Mock Waste Type Breakdown
export const mockWasteTypeBreakdown: WasteTypeBreakdown[] = [
  {
    wasteType: 'plastic',
    totalWeightKg: 245.5,
    percentage: 14.1,
    co2AvoidedKg: 613.75,
    treesEquivalent: 28.2,
    activityCount: 1,
    growthRate: 15.3
  },
  {
    wasteType: 'metal',
    totalWeightKg: 189.2,
    percentage: 10.9,
    co2AvoidedKg: 340.56,
    treesEquivalent: 15.6,
    activityCount: 1,
    growthRate: 8.7
  },
  {
    wasteType: 'paper',
    totalWeightKg: 156.8,
    percentage: 9.0,
    co2AvoidedKg: 141.12,
    treesEquivalent: 6.5,
    activityCount: 1,
    growthRate: -5.2
  },
  {
    wasteType: 'ewaste',
    totalWeightKg: 89.3,
    percentage: 5.1,
    co2AvoidedKg: 285.76,
    treesEquivalent: 13.1,
    activityCount: 1,
    growthRate: 32.1
  },
  {
    wasteType: 'organic',
    totalWeightKg: 312.7,
    percentage: 18.0,
    co2AvoidedKg: 125.08,
    treesEquivalent: 5.7,
    activityCount: 1,
    growthRate: 45.6
  },
  {
    wasteType: 'glass',
    totalWeightKg: 198.4,
    percentage: 11.4,
    co2AvoidedKg: 59.52,
    treesEquivalent: 2.7,
    activityCount: 1,
    growthRate: 12.3
  },
  {
    wasteType: 'textile',
    totalWeightKg: 167.9,
    percentage: 9.7,
    co2AvoidedKg: 201.48,
    treesEquivalent: 9.3,
    activityCount: 1,
    growthRate: 28.9
  },
  {
    wasteType: 'mixed',
    totalWeightKg: 278.6,
    percentage: 16.0,
    co2AvoidedKg: 417.9,
    treesEquivalent: 19.2,
    activityCount: 1,
    growthRate: 18.4
  }
];

// Mock Activity Type Breakdown
export const mockActivityTypeBreakdown: ActivityTypeBreakdown[] = [
  {
    activityType: 'pickup',
    totalWeightKg: 1124.5,
    percentage: 64.7,
    co2AvoidedKg: 1723.41,
    treesEquivalent: 79.2,
    activityCount: 5,
    averageWeightPerActivity: 224.9,
    growthRate: 19.8
  },
  {
    activityType: 'dropoff',
    totalWeightKg: 613.9,
    percentage: 35.3,
    co2AvoidedKg: 471.76,
    treesEquivalent: 21.1,
    activityCount: 3,
    averageWeightPerActivity: 204.6,
    growthRate: 31.2
  }
];

// Mock City Impact Data
export const mockCityImpacts: CityImpact[] = [
  {
    city: 'Lagos',
    totalWeightKg: 921.5,
    percentage: 53.0,
    co2AvoidedKg: 1491.13,
    treesEquivalent: 68.5,
    activityCount: 4,
    zones: [
      { zone: 'Ikoyi', weightKg: 245.5, percentage: 26.6 },
      { zone: 'Victoria Island', weightKg: 189.2, percentage: 20.5 },
      { zone: 'Lekki', weightKg: 198.4, percentage: 21.5 },
      { zone: 'Surulere', weightKg: 278.6, percentage: 30.2 }
    ],
    growthRate: 22.1,
    rank: 1
  },
  {
    city: 'Abuja',
    totalWeightKg: 156.8,
    percentage: 9.0,
    co2AvoidedKg: 141.12,
    treesEquivalent: 6.5,
    activityCount: 1,
    zones: [
      { zone: 'Maitama', weightKg: 156.8, percentage: 100.0 }
    ],
    growthRate: 15.3,
    rank: 3
  },
  {
    city: 'Port Harcourt',
    totalWeightKg: 89.3,
    percentage: 5.1,
    co2AvoidedKg: 285.76,
    treesEquivalent: 13.1,
    activityCount: 1,
    zones: [
      { zone: 'GRA', weightKg: 89.3, percentage: 100.0 }
    ],
    growthRate: 8.7,
    rank: 5
  },
  {
    city: 'Kano',
    totalWeightKg: 312.7,
    percentage: 18.0,
    co2AvoidedKg: 125.08,
    treesEquivalent: 5.7,
    activityCount: 1,
    zones: [
      { zone: 'Nassarawa', weightKg: 312.7, percentage: 100.0 }
    ],
    growthRate: 45.6,
    rank: 2
  },
  {
    city: 'Ibadan',
    totalWeightKg: 167.9,
    percentage: 9.7,
    co2AvoidedKg: 201.48,
    treesEquivalent: 9.3,
    activityCount: 1,
    zones: [
      { zone: 'Bodija', weightKg: 167.9, percentage: 100.0 }
    ],
    growthRate: 28.9,
    rank: 4
  }
];

// Mock Zone Impact Data
export const mockZoneImpacts: ZoneImpact[] = [
  {
    city: 'Lagos',
    zone: 'Ikoyi',
    totalWeightKg: 245.5,
    percentage: 14.1,
    co2AvoidedKg: 613.75,
    treesEquivalent: 28.2,
    activityCount: 1,
    growthRate: 15.3,
    rank: 1
  },
  {
    city: 'Lagos',
    zone: 'Victoria Island',
    totalWeightKg: 189.2,
    percentage: 10.9,
    co2AvoidedKg: 340.56,
    treesEquivalent: 15.6,
    activityCount: 1,
    growthRate: 8.7,
    rank: 3
  },
  {
    city: 'Lagos',
    zone: 'Lekki',
    totalWeightKg: 198.4,
    percentage: 11.4,
    co2AvoidedKg: 59.52,
    treesEquivalent: 2.7,
    activityCount: 1,
    growthRate: 12.3,
    rank: 2
  },
  {
    city: 'Lagos',
    zone: 'Surulere',
    totalWeightKg: 278.6,
    percentage: 16.0,
    co2AvoidedKg: 417.9,
    treesEquivalent: 19.2,
    activityCount: 1,
    growthRate: 18.4,
    rank: 1
  },
  {
    city: 'Abuja',
    zone: 'Maitama',
    totalWeightKg: 156.8,
    percentage: 9.0,
    co2AvoidedKg: 141.12,
    treesEquivalent: 6.5,
    activityCount: 1,
    growthRate: 15.3,
    rank: 4
  },
  {
    city: 'Port Harcourt',
    zone: 'GRA',
    totalWeightKg: 89.3,
    percentage: 5.1,
    co2AvoidedKg: 285.76,
    treesEquivalent: 13.1,
    activityCount: 1,
    growthRate: 8.7,
    rank: 7
  },
  {
    city: 'Kano',
    zone: 'Nassarawa',
    totalWeightKg: 312.7,
    percentage: 18.0,
    co2AvoidedKg: 125.08,
    treesEquivalent: 5.7,
    activityCount: 1,
    growthRate: 45.6,
    rank: 1
  },
  {
    city: 'Ibadan',
    zone: 'Bodija',
    totalWeightKg: 167.9,
    percentage: 9.7,
    co2AvoidedKg: 201.48,
    treesEquivalent: 9.3,
    activityCount: 1,
    growthRate: 28.9,
    rank: 5
  }
];

// Mock ESG Report
export const mockESGReport: ESGReport = {
  id: 'esg_report_001',
  reportPeriod: {
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  },
  generatedAt: '2024-02-01T10:00:00Z',
  metrics: [
    {
      category: 'environmental',
      metricName: 'total_waste_diverted',
      value: 1738.4,
      unit: 'kg',
      description: 'Total waste diverted from landfill',
      verificationStatus: 'verified',
      dataSource: 'verified_weights',
      sdgAlignment: ['SDG_12', 'SDG_13']
    },
    {
      category: 'environmental',
      metricName: 'co2_emissions_avoided',
      value: 2195.17,
      unit: 'kg',
      description: 'CO2 emissions avoided through recycling',
      verificationStatus: 'verified',
      dataSource: 'co2_conversion_calculations',
      sdgAlignment: ['SDG_13']
    },
    {
      category: 'environmental',
      metricName: 'trees_equivalent',
      value: 100.3,
      unit: 'trees',
      description: 'Equivalent number of trees planted',
      verificationStatus: 'calculated',
      dataSource: 'tree_equivalence_calculations',
      sdgAlignment: ['SDG_15']
    },
    {
      category: 'social',
      metricName: 'enterprise_partners',
      value: 8,
      unit: 'count',
      description: 'Number of enterprise partners engaged',
      verificationStatus: 'verified',
      dataSource: 'partner_database',
      sdgAlignment: ['SDG_17']
    },
    {
      category: 'governance',
      metricName: 'verification_rate',
      value: 100.0,
      unit: '%',
      description: 'Percentage of verified impact data',
      verificationStatus: 'verified',
      dataSource: 'internal_audit',
      sdgAlignment: ['SDG_16']
    }
  ],
  sdgContributions: [
    {
      goal: 'SDG_12',
      totalContribution: 849.0,
      unit: 'kg',
      description: 'Responsible consumption and production',
      targetAchievement: 84.9,
      initiatives: ['plastic_recycling', 'paper_recycling', 'glass_recycling', 'textile_recycling', 'mixed_recycling']
    },
    {
      goal: 'SDG_13',
      totalContribution: 1156.83,
      unit: 'kg',
      description: 'Climate action',
      targetAchievement: 115.7,
      initiatives: ['co2_reduction', 'landfill_diversion']
    },
    {
      goal: 'SDG_11',
      totalContribution: 487.92,
      unit: 'kg',
      description: 'Sustainable cities and communities',
      targetAchievement: 48.8,
      initiatives: ['urban_recycling', 'community_engagement']
    },
    {
      goal: 'SDG_15',
      totalContribution: 141.12,
      unit: 'kg',
      description: 'Life on land',
      targetAchievement: 14.1,
      initiatives: ['paper_recycling', 'tree_equivalence']
    },
    {
      goal: 'SDG_9',
      totalContribution: 189.2,
      unit: 'kg',
      description: 'Industry, innovation and infrastructure',
      targetAchievement: 18.9,
      initiatives: ['metal_recycling', 'ewaste_recycling']
    },
    {
      goal: 'SDG_8',
      totalContribution: 201.48,
      unit: 'kg',
      description: 'Decent work and economic growth',
      targetAchievement: 20.1,
      initiatives: ['textile_recycling', 'job_creation']
    },
    {
      goal: 'SDG_3',
      totalContribution: 89.3,
      unit: 'kg',
      description: 'Good health and well-being',
      targetAchievement: 8.9,
      initiatives: ['ewaste_recycling', 'health_protection']
    },
    {
      goal: 'SDG_2',
      totalContribution: 312.7,
      unit: 'kg',
      description: 'Zero hunger',
      targetAchievement: 31.3,
      initiatives: ['organic_recycling', 'food_waste_reduction']
    }
  ],
  complianceFrameworks: ['GRI', 'SASB', 'TCFD'],
  auditTrail: [
    {
      timestamp: '2024-02-01T10:00:00Z',
      action: 'report_generated',
      userId: 'system',
      details: 'ESG report generated for Q1 2024'
    },
    {
      timestamp: '2024-02-01T10:05:00Z',
      action: 'data_verified',
      userId: 'auditor_001',
      details: 'All impact data verified against source records'
    }
  ]
};

// Mock Impact Audit Entries
export const mockImpactAuditEntries: ImpactAuditEntry[] = [
  {
    id: 'audit_001',
    impactId: 'impact_001',
    timestamp: '2024-01-15T11:15:00Z',
    action: 'verified',
    userId: 'verifier_001',
    previousValue: null,
    newValue: {
      weightKg: 245.5,
      co2AvoidedKg: 613.75,
      verificationStatus: 'verified'
    },
    reason: 'Initial verification of pickup weight',
    ipAddress: '192.168.1.100',
    userAgent: 'Recliq Agent App v1.2.3'
  },
  {
    id: 'audit_002',
    impactId: 'impact_002',
    timestamp: '2024-01-16T10:30:00Z',
    action: 'verified',
    userId: 'verifier_002',
    previousValue: null,
    newValue: {
      weightKg: 189.2,
      co2AvoidedKg: 340.56,
      verificationStatus: 'verified'
    },
    reason: 'Drop-off weight verified at facility',
    ipAddress: '192.168.1.101',
    userAgent: 'Recliq Facility System v2.1.0'
  },
  {
    id: 'audit_003',
    impactId: 'impact_003',
    timestamp: '2024-01-17T15:00:00Z',
    action: 'verified',
    userId: 'verifier_003',
    previousValue: null,
    newValue: {
      weightKg: 156.8,
      co2AvoidedKg: 141.12,
      verificationStatus: 'verified'
    },
    reason: 'Paper recycling weight confirmed',
    ipAddress: '192.168.1.102',
    userAgent: 'Recliq Agent App v1.2.3'
  }
];

// Helper Functions
export const getWasteTypeColor = (wasteType: WasteType): string => {
  const colors = {
    plastic: '#3B82F6',
    metal: '#EF4444',
    paper: '#F59E0B',
    glass: '#10B981',
    organic: '#84CC16',
    ewaste: '#8B5CF6',
    textile: '#EC4899',
    mixed: '#6B7280'
  };
  return colors[wasteType] || '#6B7280';
};

export const getActivityTypeColor = (activityType: ActivityType): string => {
  const colors = {
    pickup: '#3B82F6',
    dropoff: '#10B981'
  };
  return colors[activityType] || '#6B7280';
};

export const getVerificationStatusColor = (status: VerificationStatus): string => {
  const colors = {
    verified: '#10B981',
    pending: '#F59E0B',
    rejected: '#EF4444',
    flagged: '#8B5CF6'
  };
  return colors[status] || '#6B7280';
};

export const getSDGGoalColor = (goal: SDGGoal): string => {
  const colors = {
    SDG_1: '#E5243B',
    SDG_2: '#DDA63A',
    SDG_3: '#4C9F38',
    SDG_4: '#C5192D',
    SDG_5: '#FF3A21',
    SDG_6: '#26BDE2',
    SDG_7: '#FCC30B',
    SDG_8: '#A21942',
    SDG_9: '#FD6925',
    SDG_10: '#DD1367',
    SDG_11: '#FD9D24',
    SDG_12: '#BF8B2E',
    SDG_13: '#3F7E44',
    SDG_14: '#0A97D9',
    SDG_15: '#56C02B',
    SDG_16: '#00689D',
    SDG_17: '#19486A'
  };
  return colors[goal] || '#6B7280';
};

export const formatWeight = (kg: number): string => {
  if (typeof kg !== 'number' || isNaN(kg)) {
    return '0.0 kg';
  }
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)} tons`;
  }
  return `${kg.toFixed(1)} kg`;
};

export const formatCO2 = (kg: number): string => {
  if (typeof kg !== 'number' || isNaN(kg)) {
    return '0.0 kg CO₂';
  }
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(2)} tons CO₂`;
  }
  return `${kg.toFixed(1)} kg CO₂`;
};

export const formatTrees = (trees: number): string => {
  if (typeof trees !== 'number' || isNaN(trees)) {
    return '0.0 trees';
  }
  return `${trees.toFixed(1)} trees`;
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const calculateTreesEquivalent = (co2Kg: number): number => {
  return co2Kg / TREE_CO2_ABSORPTION;
};

export const calculateCO2Avoided = (weightKg: number, wasteType: WasteType): number => {
  return weightKg * CO2_CONVERSION_RATES[wasteType];
};

// Default filters
export const defaultImpactFilters: ImpactFilters = {
  dateRange: {
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  },
  cities: [],
  zones: [],
  wasteTypes: [],
  activityTypes: [],
  verificationStatus: [],
  impactMetric: 'totalWaste'
};

// Export all data
export const mockImpactData = {
  environmentalImpacts: mockEnvironmentalImpacts,
  summary: mockImpactSummary,
  impactOverTime: mockImpactOverTime,
  wasteTypeBreakdown: mockWasteTypeBreakdown,
  activityTypeBreakdown: mockActivityTypeBreakdown,
  cityImpacts: mockCityImpacts,
  zoneImpacts: mockZoneImpacts,
  esgReport: mockESGReport,
  auditEntries: mockImpactAuditEntries,
  filters: defaultImpactFilters
};
