import { EnterpriseClient, EnterpriseClientSummary, EnterprisePerformance, ClientStatus, Industry, ContractType, SLAStatus, PickupFrequency } from './types';

// Mock Enterprise Clients Data
export const mockEnterpriseClients: EnterpriseClient[] = [
  {
    id: 'ENT001',
    companyName: 'TechHub Nigeria Ltd',
    industry: 'office' as Industry,
    clientStatus: 'active' as ClientStatus,
    contractType: 'monthly_retainer' as ContractType,
    pickupFrequency: 'weekly' as PickupFrequency,
    primaryContact: {
      name: 'Sarah Johnson',
      title: 'Facilities Manager',
      email: 'sarah.johnson@techhub.ng',
      phone: '+2348012345678',
      department: 'Facilities',
      isPrimary: true
    },
    billingContact: {
      name: 'Michael Chen',
      title: 'Finance Director',
      email: 'michael.chen@techhub.ng',
      phone: '+2348023456789',
      department: 'Finance',
      isPrimary: false
    },
    operationsContact: {
      name: 'David Okoro',
      title: 'Operations Lead',
      email: 'david.okoro@techhub.ng',
      phone: '+2348034567890',
      department: 'Operations',
      isPrimary: false
    },
    headquarters: {
      street: 'Plot 123, Tech Park Avenue',
      city: 'Lagos',
      zone: 'Ikoyi',
      state: 'Lagos',
      coordinates: { lat: 6.5244, lng: 3.3792 },
      postalCode: '101234'
    },
    locations: [
      {
        id: 'LOC001',
        name: 'TechHub HQ - Ikoyi',
        address: {
          street: 'Plot 123, Tech Park Avenue',
          city: 'Lagos',
          zone: 'Ikoyi',
          state: 'Lagos',
          coordinates: { lat: 6.5244, lng: 3.3792 },
          postalCode: '101234'
        },
        isActive: true,
        pickupInstructions: 'Use loading bay at rear of building',
        accessRequirements: ['Security clearance required', 'Parking permit needed'],
        operatingHours: {
          monday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
          tuesday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
          wednesday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
          thursday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
          friday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
          saturday: { isOpen: false },
          sunday: { isOpen: false }
        },
        contactPerson: {
          name: 'David Okoro',
          title: 'Operations Lead',
          email: 'david.okoro@techhub.ng',
          phone: '+2348034567890',
          department: 'Operations',
          isPrimary: false
        },
        specialRequirements: ['Separate e-waste collection', 'Confidential document handling']
      }
    ],
    totalLocations: 1,
    activeLocations: 1,
    contractStart: '2023-01-15T00:00:00Z',
    contractEnd: '2025-01-14T23:59:59Z',
    pricingModel: {
      type: 'monthly_retainer' as ContractType,
      baseRate: 50,
      minimumFee: 50000,
      volumeDiscounts: [
        { minVolume: 500, discountPercentage: 10, effectiveFrom: '2023-01-15T00:00:00Z' },
        { minVolume: 1000, discountPercentage: 15, effectiveFrom: '2023-01-15T00:00:00Z' }
      ],
      wasteTypePremiums: [
        { wasteType: 'E-Waste', premiumRate: 75, effectiveFrom: '2023-01-15T00:00:00Z' },
        { wasteType: 'Confidential', premiumRate: 100, effectiveFrom: '2023-01-15T00:00:00Z' }
      ],
      serviceFees: [
        { feeType: 'reporting', amount: 5000, frequency: 'monthly', description: 'ESG reporting service' }
      ],
      currency: 'NGN',
      billingCycle: 'monthly'
    },
    slaRequirements: {
      pickupWindow: { start: '09:00', end: '17:00' },
      responseTime: 120,
      completionRate: 95,
      reportingFrequency: 'monthly'
    },
    totalPickups: 156,
    scheduledPickups: 4,
    completedPickups: 152,
    missedPickups: 2,
    rescheduledPickups: 2,
    lastPickupDate: '2024-01-20T10:30:00Z',
    nextPickupDate: '2024-01-27T10:00:00Z',
    totalWeightCollected: 2340.5,
    monthlyVolume: 195.0,
    averagePickupWeight: 15.4,
    wasteCategories: [
      { category: 'Paper', weight: 936.2, percentage: 40.0, revenue: 46810 },
      { category: 'E-Waste', weight: 585.1, percentage: 25.0, revenue: 43882 },
      { category: 'Plastic', weight: 468.1, percentage: 20.0, revenue: 23405 },
      { category: 'Organic', weight: 351.1, percentage: 15.0, revenue: 17555 }
    ],
    totalRevenue: 131152,
    monthlyRevenue: 10929,
    outstandingBalance: 0,
    averageRevenuePerPickup: 862,
    lifetimeValue: 131152,
    slaStatus: 'compliant' as SLAStatus,
    slaComplianceRate: 96.8,
    averagePickupTime: 45,
    slaBreaches: [
      {
        id: 'SLA001',
        type: 'pickup_delay',
        severity: 'minor',
        description: 'Pickup delayed by 30 minutes due to traffic',
        occurredAt: '2024-01-08T10:30:00Z',
        resolvedAt: '2024-01-08T11:00:00Z',
        impact: 'Minor operational delay',
        compensation: {
          type: 'service_credit',
          amount: 1000,
          description: 'Service credit for delay',
          issuedAt: '2024-01-09T09:00:00Z'
        }
      }
    ],
    co2Saved: 5851.25,
    treesEquivalent: 234,
    waterSaved: 11702.5,
    energySaved: 9362,
    sdgAlignment: [
      {
        goalNumber: 11,
        goalTitle: 'Sustainable Cities and Communities',
        contribution: 'Waste reduction and recycling',
        kpi: 'Waste diverted from landfill',
        currentValue: 2340.5,
        targetValue: 3000
      },
      {
        goalNumber: 12,
        goalTitle: 'Responsible Consumption and Production',
        contribution: 'Sustainable waste management',
        kpi: 'Recycling rate',
        currentValue: 85,
        targetValue: 90
      }
    ],
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    onboardedBy: 'SALES_REP001',
    accountManager: 'ACCOUNT_MGR001',
    notes: 'High-value enterprise client with strong ESG focus',
    tags: ['tech', 'esg-focused', 'long-term']
  },
  {
    id: 'ENT002',
    companyName: 'Lagos Manufacturing Complex',
    industry: 'manufacturing' as Industry,
    clientStatus: 'active' as ClientStatus,
    contractType: 'volume_based' as ContractType,
    pickupFrequency: 'daily' as PickupFrequency,
    primaryContact: {
      name: 'Ahmed Yusuf',
      title: 'Plant Manager',
      email: 'ahmed.yusuf@lagosmfg.ng',
      phone: '+2348045678901',
      department: 'Operations',
      isPrimary: true
    },
    billingContact: {
      name: 'Fatima Bello',
      title: 'CFO',
      email: 'fatima.bello@lagosmfg.ng',
      phone: '+2348056789012',
      department: 'Finance',
      isPrimary: false
    },
    operationsContact: {
      name: 'Chukwuemeka Okafor',
      title: 'Logistics Coordinator',
      email: 'chukwuemeka.okafor@lagosmfg.ng',
      phone: '+2348067890123',
      department: 'Logistics',
      isPrimary: false
    },
    headquarters: {
      street: 'Industrial Area, Plot 456',
      city: 'Lagos',
      zone: 'Apapa',
      state: 'Lagos',
      coordinates: { lat: 6.4479, lng: 3.3793 },
      postalCode: '102276'
    },
    locations: [
      {
        id: 'LOC002',
        name: 'Main Plant - Apapa',
        address: {
          street: 'Industrial Area, Plot 456',
          city: 'Lagos',
          zone: 'Apapa',
          state: 'Lagos',
          coordinates: { lat: 6.4479, lng: 3.3793 },
          postalCode: '102276'
        },
        isActive: true,
        pickupInstructions: 'Use designated waste collection area',
        accessRequirements: ['Safety equipment required', 'Vehicle access permit'],
        operatingHours: {
          monday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
          tuesday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
          wednesday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
          thursday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
          friday: { isOpen: true, openTime: '06:00', closeTime: '22:00' },
          saturday: { isOpen: true, openTime: '07:00', closeTime: '18:00' },
          sunday: { isOpen: false }
        },
        contactPerson: {
          name: 'Chukwuemeka Okafor',
          title: 'Logistics Coordinator',
          email: 'chukwuemeka.okafor@lagosmfg.ng',
          phone: '+2348067890123',
          department: 'Logistics',
          isPrimary: false
        },
        specialRequirements: ['Hazardous waste handling', 'Industrial waste segregation']
      }
    ],
    totalLocations: 1,
    activeLocations: 1,
    contractStart: '2023-03-01T00:00:00Z',
    pricingModel: {
      type: 'volume_based' as ContractType,
      baseRate: 35,
      volumeDiscounts: [
        { minVolume: 1000, discountPercentage: 20, effectiveFrom: '2023-03-01T00:00:00Z' },
        { minVolume: 2000, discountPercentage: 25, effectiveFrom: '2023-03-01T00:00:00Z' }
      ],
      wasteTypePremiums: [
        { wasteType: 'Hazardous', premiumRate: 150, effectiveFrom: '2023-03-01T00:00:00Z' },
        { wasteType: 'Industrial', premiumRate: 45, effectiveFrom: '2023-03-01T00:00:00Z' }
      ],
      serviceFees: [
        { feeType: 'processing', amount: 10000, frequency: 'monthly', description: 'Special processing fees' }
      ],
      currency: 'NGN',
      billingCycle: 'monthly'
    },
    slaRequirements: {
      pickupWindow: { start: '07:00', end: '09:00' },
      responseTime: 60,
      completionRate: 98,
      reportingFrequency: 'daily'
    },
    totalPickups: 325,
    scheduledPickups: 31,
    completedPickups: 310,
    missedPickups: 8,
    rescheduledPickups: 7,
    lastPickupDate: '2024-01-20T07:30:00Z',
    nextPickupDate: '2024-01-21T07:00:00Z',
    totalWeightCollected: 8125.0,
    monthlyVolume: 675.0,
    averagePickupWeight: 25.0,
    wasteCategories: [
      { category: 'Metal', weight: 3250.0, percentage: 40.0, revenue: 146250 },
      { category: 'Plastic', weight: 1625.0, percentage: 20.0, revenue: 56875 },
      { category: 'Industrial', weight: 1218.8, percentage: 15.0, revenue: 54846 },
      { category: 'Hazardous', weight: 812.5, percentage: 10.0, revenue: 121875 },
      { category: 'Organic', weight: 812.5, percentage: 10.0, revenue: 28438 },
      { category: 'Paper', weight: 406.2, percentage: 5.0, revenue: 16248 }
    ],
    totalRevenue: 424532,
    monthlyRevenue: 35378,
    outstandingBalance: 50000,
    averageRevenuePerPickup: 1306,
    lifetimeValue: 424532,
    slaStatus: 'at_risk' as SLAStatus,
    slaComplianceRate: 95.4,
    averagePickupTime: 35,
    slaBreaches: [
      {
        id: 'SLA002',
        type: 'missed_pickup',
        severity: 'major',
        description: 'Pickup missed due to vehicle breakdown',
        occurredAt: '2024-01-15T07:00:00Z',
        resolvedAt: '2024-01-15T12:00:00Z',
        impact: 'Production delay, waste accumulation',
        compensation: {
          type: 'credit',
          amount: 5000,
          description: 'Credit for missed pickup',
          issuedAt: '2024-01-16T09:00:00Z'
        }
      }
    ],
    co2Saved: 20312.5,
    treesEquivalent: 812,
    waterSaved: 40625,
    energySaved: 32500,
    sdgAlignment: [
      {
        goalNumber: 9,
        goalTitle: 'Industry, Innovation and Infrastructure',
        contribution: 'Sustainable industrial practices',
        kpi: 'Waste recycling rate',
        currentValue: 85,
        targetValue: 95
      },
      {
        goalNumber: 12,
        goalTitle: 'Responsible Consumption and Production',
        contribution: 'Industrial waste management',
        kpi: 'Hazardous waste properly handled',
        currentValue: 95,
        targetValue: 98
      }
    ],
    createdAt: '2023-03-01T09:00:00Z',
    updatedAt: '2024-01-20T16:45:00Z',
    onboardedBy: 'SALES_REP002',
    accountManager: 'ACCOUNT_MGR002',
    notes: 'High-volume manufacturing client with complex waste requirements',
    tags: ['manufacturing', 'high-volume', 'hazardous']
  },
  {
    id: 'ENT003',
    companyName: 'EcoTech Solutions',
    industry: 'office' as Industry,
    clientStatus: 'trial' as ClientStatus,
    contractType: 'pay_per_pickup' as ContractType,
    pickupFrequency: 'bi_weekly' as PickupFrequency,
    primaryContact: {
      name: 'Grace Okeke',
      title: 'Office Manager',
      email: 'grace.okeke@ecotech.ng',
      phone: '+2348078901234',
      department: 'Administration',
      isPrimary: true
    },
    billingContact: {
      name: 'Samuel Adekunle',
      title: 'CEO',
      email: 'samuel.adekunle@ecotech.ng',
      phone: '+2348089012345',
      department: 'Executive',
      isPrimary: false
    },
    operationsContact: {
      name: 'Grace Okeke',
      title: 'Office Manager',
      email: 'grace.okeke@ecotech.ng',
      phone: '+2348078901234',
      department: 'Administration',
      isPrimary: false
    },
    headquarters: {
      street: 'Suite 45, Tech Hub Building',
      city: 'Abuja',
      zone: 'Maitama',
      state: 'FCT',
      coordinates: { lat: 9.0580, lng: 7.4895 },
      postalCode: '900288'
    },
    locations: [
      {
        id: 'LOC003',
        name: 'EcoTech HQ - Maitama',
        address: {
          street: 'Suite 45, Tech Hub Building',
          city: 'Abuja',
          zone: 'Maitama',
          state: 'FCT',
          coordinates: { lat: 9.0580, lng: 7.4895 },
          postalCode: '900288'
        },
        isActive: true,
        pickupInstructions: 'Front desk collection available',
        accessRequirements: ['Appointment preferred'],
        operatingHours: {
          monday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
          tuesday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
          wednesday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
          thursday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
          friday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
          saturday: { isOpen: false },
          sunday: { isOpen: false }
        },
        contactPerson: {
          name: 'Grace Okeke',
          title: 'Office Manager',
          email: 'grace.okeke@ecotech.ng',
          phone: '+2348078901234',
          department: 'Administration',
          isPrimary: false
        }
      }
    ],
    totalLocations: 1,
    activeLocations: 1,
    contractStart: '2024-01-01T00:00:00Z',
    contractEnd: '2024-03-31T23:59:59Z',
    pricingModel: {
      type: 'pay_per_pickup' as ContractType,
      baseRate: 45,
      volumeDiscounts: [],
      wasteTypePremiums: [
        { wasteType: 'E-Waste', premiumRate: 60, effectiveFrom: '2024-01-01T00:00:00Z' }
      ],
      serviceFees: [],
      currency: 'NGN',
      billingCycle: 'monthly'
    },
    slaRequirements: {
      pickupWindow: { start: '10:00', end: '16:00' },
      responseTime: 180,
      completionRate: 90,
      reportingFrequency: 'weekly'
    },
    totalPickups: 8,
    scheduledPickups: 2,
    completedPickups: 6,
    missedPickups: 1,
    rescheduledPickups: 1,
    lastPickupDate: '2024-01-18T14:30:00Z',
    nextPickupDate: '2024-01-25T14:00:00Z',
    totalWeightCollected: 120.0,
    monthlyVolume: 60.0,
    averagePickupWeight: 15.0,
    wasteCategories: [
      { category: 'Paper', weight: 48.0, percentage: 40.0, revenue: 2160 },
      { category: 'E-Waste', weight: 36.0, percentage: 30.0, revenue: 2160 },
      { category: 'Plastic', weight: 24.0, percentage: 20.0, revenue: 1080 },
      { category: 'Organic', weight: 12.0, percentage: 10.0, revenue: 540 }
    ],
    totalRevenue: 5940,
    monthlyRevenue: 2970,
    outstandingBalance: 0,
    averageRevenuePerPickup: 742,
    lifetimeValue: 5940,
    slaStatus: 'compliant' as SLAStatus,
    slaComplianceRate: 75.0,
    averagePickupTime: 75,
    slaBreaches: [],
    co2Saved: 300,
    treesEquivalent: 12,
    waterSaved: 600,
    energySaved: 480,
    sdgAlignment: [
      {
        goalNumber: 11,
        goalTitle: 'Sustainable Cities and Communities',
        contribution: 'Office waste management',
        kpi: 'Recycling rate',
        currentValue: 75,
        targetValue: 85
      }
    ],
    createdAt: '2024-01-01T11:00:00Z',
    updatedAt: '2024-01-20T12:15:00Z',
    onboardedBy: 'SALES_REP003',
    accountManager: 'ACCOUNT_MGR003',
    notes: 'Trial client - potential for expansion',
    tags: ['trial', 'tech', 'office']
  }
];

// Mock Enterprise Client Summary
export const mockEnterpriseClientSummary: EnterpriseClientSummary = {
  totalClients: 3,
  activeClients: 2,
  scheduledPickups: 37,
  totalWeightCollected: 10585.5,
  enterpriseRevenue: 561624,
  slaIssues: 2,
  avgMonthlyVolume: 310.0,
  avgRevenuePerClient: 187208,
  slaComplianceRate: 89.1,
  clientRetentionRate: 95.0,
  newClientsThisMonth: 1,
  atRiskClients: 1
};

// Mock Enterprise Performance
export const mockEnterprisePerformance: EnterprisePerformance = {
  topClientsByVolume: [
    {
      client: mockEnterpriseClients[1], // Lagos Manufacturing Complex
      volume: 8125.0,
      revenue: 424532,
      rank: 1
    },
    {
      client: mockEnterpriseClients[0], // TechHub Nigeria Ltd
      volume: 2340.5,
      revenue: 131152,
      rank: 2
    },
    {
      client: mockEnterpriseClients[2], // EcoTech Solutions
      volume: 120.0,
      revenue: 5940,
      rank: 3
    }
  ],
  topClientsByRevenue: [
    {
      client: mockEnterpriseClients[1], // Lagos Manufacturing Complex
      revenue: 424532,
      volume: 8125.0,
      rank: 1
    },
    {
      client: mockEnterpriseClients[0], // TechHub Nigeria Ltd
      revenue: 131152,
      volume: 2340.5,
      rank: 2
    },
    {
      client: mockEnterpriseClients[2], // EcoTech Solutions
      revenue: 5940,
      volume: 120.0,
      rank: 3
    }
  ],
  industryBreakdown: [
    {
      industry: 'manufacturing' as Industry,
      clientCount: 1,
      totalVolume: 8125.0,
      totalRevenue: 424532,
      avgRevenuePerClient: 424532
    },
    {
      industry: 'office' as Industry,
      clientCount: 2,
      totalVolume: 2460.5,
      totalRevenue: 137092,
      avgRevenuePerClient: 68546
    }
  ],
  cityBreakdown: [
    {
      city: 'Lagos',
      clientCount: 2,
      totalVolume: 10465.5,
      totalRevenue: 555684,
      avgRevenuePerClient: 277842
    },
    {
      city: 'Abuja',
      clientCount: 1,
      totalVolume: 120.0,
      totalRevenue: 5940,
      avgRevenuePerClient: 5940
    }
  ],
  contractTypeBreakdown: [
    {
      contractType: 'monthly_retainer' as ContractType,
      clientCount: 1,
      totalVolume: 2340.5,
      totalRevenue: 131152,
      avgRevenuePerClient: 131152
    },
    {
      contractType: 'volume_based' as ContractType,
      clientCount: 1,
      totalVolume: 8125.0,
      totalRevenue: 424532,
      avgRevenuePerClient: 424532
    },
    {
      contractType: 'pay_per_pickup' as ContractType,
      clientCount: 1,
      totalVolume: 120.0,
      totalRevenue: 5940,
      avgRevenuePerClient: 5940
    }
  ],
  monthlyTrends: [
    {
      month: '2024-01',
      newClients: 1,
      totalVolume: 930.0,
      totalRevenue: 49277,
      slaCompliance: 89.1
    },
    {
      month: '2023-12',
      newClients: 0,
      totalVolume: 870.0,
      totalRevenue: 46347,
      slaCompliance: 92.3
    },
    {
      month: '2023-11',
      newClients: 0,
      totalVolume: 820.0,
      totalRevenue: 43478,
      slaCompliance: 87.5
    }
  ]
};

// Helper functions
export const getClientStatusColor = (status: ClientStatus): string => {
  switch (status) {
    case 'active': return '#10b981';
    case 'inactive': return '#6b7280';
    case 'suspended': return '#ef4444';
    case 'trial': return '#3b82f6';
    case 'onboarding': return '#f59e0b';
    default: return '#6b7280';
  }
};

export const getIndustryColor = (industry: Industry): string => {
  switch (industry) {
    case 'office': return '#3b82f6';
    case 'factory': return '#8b5cf6';
    case 'estate': return '#10b981';
    case 'school': return '#f59e0b';
    case 'hotel': return '#f97316';
    case 'retail': return '#ec4899';
    case 'manufacturing': return '#ef4444';
    case 'healthcare': return '#06b6d4';
    case 'government': return '#64748b';
    case 'other': return '#6b7280';
    default: return '#6b7280';
  }
};

export const getContractTypeColor = (type: ContractType): string => {
  switch (type) {
    case 'pay_per_pickup': return '#3b82f6';
    case 'monthly_retainer': return '#10b981';
    case 'volume_based': return '#f59e0b';
    case 'hybrid': return '#8b5cf6';
    case 'custom': return '#ec4899';
    default: return '#6b7280';
  }
};

export const getSLAStatusColor = (status: SLAStatus): string => {
  switch (status) {
    case 'compliant': return '#10b981';
    case 'at_risk': return '#f59e0b';
    case 'breached': return '#ef4444';
    case 'not_applicable': return '#6b7280';
    default: return '#6b7280';
  }
};

export const getPickupFrequencyColor = (frequency: PickupFrequency): string => {
  switch (frequency) {
    case 'daily': return '#10b981';
    case 'weekly': return '#3b82f6';
    case 'bi_weekly': return '#f59e0b';
    case 'monthly': return '#f97316';
    case 'on_demand': return '#8b5cf6';
    case 'custom': return '#ec4899';
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
