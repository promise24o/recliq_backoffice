import { EnterpriseContract, ContractsPricingSummary, PricingEnforcementInsights, ContractStatus, ContractType, PricingModel, SLATier, WasteCategory, RenewalWindow } from './types';

// Mock Enterprise Contracts Data
export const mockEnterpriseContracts: EnterpriseContract[] = [
  {
    id: 'CONTRACT001',
    contractNumber: 'EC-2024-001',
    clientId: 'ENT001',
    clientName: 'TechHub Nigeria Ltd',
    contractType: 'monthly_retainer' as ContractType,
    status: 'active' as ContractStatus,
    effectiveDate: '2024-01-01T00:00:00Z',
    expiryDate: '2024-12-31T23:59:59Z',
    renewalWindow: '90_days' as RenewalWindow,
    autoRenewal: true,
    noticePeriod: 60,
    contractOwner: 'CONTRACT_MGR001',
    salesRep: 'SALES_REP001',
    financeApprover: 'FINANCE_MGR001',
    opsApprover: 'OPS_MGR001',
    pricingModel: {
      model: 'monthly' as PricingModel,
      currency: 'NGN',
      baseRates: [
        {
          wasteCategory: 'paper' as WasteCategory,
          baseRate: 50,
          effectiveDate: '2024-01-01T00:00:00Z',
          specialConditions: ['Confidential document handling']
        },
        {
          wasteCategory: 'e_waste' as WasteCategory,
          baseRate: 75,
          effectiveDate: '2024-01-01T00:00:00Z',
          specialConditions: ['Data destruction required']
        },
        {
          wasteCategory: 'plastic' as WasteCategory,
          baseRate: 45,
          effectiveDate: '2024-01-01T00:00:00Z'
        },
        {
          wasteCategory: 'organic' as WasteCategory,
          baseRate: 35,
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ],
      volumeTiers: [
        {
          tierId: 'TIER1',
          minVolume: 0,
          maxVolume: 200,
          discountPercentage: 0,
          effectiveDate: '2024-01-01T00:00:00Z'
        },
        {
          tierId: 'TIER2',
          minVolume: 201,
          maxVolume: 500,
          discountPercentage: 10,
          effectiveDate: '2024-01-01T00:00:00Z'
        },
        {
          tierId: 'TIER3',
          minVolume: 501,
          discountPercentage: 15,
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ],
      pickupFrequencyPricing: [
        {
          frequency: 'weekly',
          surcharge: 0,
          surchargeType: 'percentage',
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ],
      minimumCharges: [
        {
          chargeType: 'monthly',
          amount: 50000,
          conditions: ['Minimum monthly commitment'],
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ],
      discounts: [
        {
          discountId: 'DISCOUNT001',
          type: 'volume',
          value: 10,
          conditions: ['Monthly volume > 200kg'],
          effectiveDate: '2024-01-01T00:00:00Z',
          approvedBy: 'FINANCE_MGR001',
          reason: 'High-volume client discount'
        }
      ],
      specialClauses: [
        {
          clauseId: 'CLAUSE001',
          description: 'E-waste premium pricing for data security',
          pricingImpact: 15000,
          riskLevel: 'medium',
          effectiveDate: '2024-01-01T00:00:00Z',
          requiresApproval: true,
          approvedBy: 'FINANCE_MGR001'
        }
      ],
      priceAdjustments: []
    },
    slaConfiguration: {
      tier: 'premium' as SLATier,
      responseTime: 120,
      pickupWindow: { start: '09:00', end: '17:00' },
      completionRate: 95,
      penaltyRules: [
        {
          ruleId: 'PENALTY001',
          trigger: 'late_pickup',
          penaltyType: 'service_credit',
          penaltyValue: 10,
          calculationMethod: '10% credit for pickups delayed > 30 minutes',
          maxPenalty: 5000,
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ],
      serviceCredits: [
        {
          ruleId: 'CREDIT001',
          trigger: 'System outage > 2 hours',
          creditType: 'fixed',
          creditValue: 2000,
          conditions: ['System-wide outage'],
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ],
      escalationRules: [
        {
          ruleId: 'ESCALATE001',
          triggerCondition: 'Missed pickup > 2 hours',
          escalationLevel: 1,
          notificationTime: 30,
          recipients: ['ops_manager', 'client_contact'],
          actions: ['Notify client', 'Dispatch backup'],
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ],
      reportingRequirements: [
        {
          requirementId: 'REPORT001',
          reportType: 'monthly',
          content: ['Volume summary', 'SLA compliance', 'ESG metrics'],
          deliveryMethod: 'email',
          recipients: ['client_finance', 'client_ops'],
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ]
    },
    coverage: {
      cities: ['Lagos'],
      zones: ['Ikoyi'],
      locations: ['LOC001'],
      wasteTypes: ['paper', 'plastic', 'organic', 'e_waste'],
      excludedWasteTypes: ['hazardous'],
      specialRequirements: ['Confidential document handling', 'Data destruction certification'],
      agentEligibility: [
        {
          ruleId: 'AGENT001',
          agentType: 'internal',
          conditions: ['Background check required'],
          restrictions: ['No subcontractors'],
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ],
      geographicRestrictions: []
    },
    billingTerms: {
      billingCycle: 'monthly',
      paymentTerms: 30,
      lateFeePercentage: 2.5,
      currency: 'NGN',
      invoiceFormat: 'detailed',
      taxConfiguration: {
        taxType: 'vat',
        taxRate: 7.5,
        taxInclusive: false,
        exemptions: ['Educational materials'],
        effectiveDate: '2024-01-01T00:00:00Z'
      },
      paymentMethods: [
        {
          method: 'bank_transfer',
          details: 'TechHub Nigeria Ltd - Account 1234567890',
          isActive: true,
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ]
    },
    createdAt: '2023-12-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    version: '1.2',
    amendments: [
      {
        amendmentId: 'AMD001',
        type: 'pricing',
        description: 'Added e-waste premium pricing',
        effectiveDate: '2024-01-15T00:00:00Z',
        approvedBy: 'FINANCE_MGR001',
        impact: 'Additional ₦15,000 monthly revenue',
        documents: ['DOC001']
      }
    ],
    attachments: [
      {
        attachmentId: 'ATT001',
        title: 'Master Service Agreement',
        type: 'contract',
        fileUrl: '/contracts/EC-2024-001-MSA.pdf',
        uploadedAt: '2023-12-15T10:00:00Z',
        uploadedBy: 'CONTRACT_MGR001',
        version: '1.0',
        isConfidential: true
      }
    ],
    totalPickups: 156,
    totalRevenue: 1311520,
    averageMargin: 28.5,
    slaBreaches: 2,
    penaltiesTriggered: 1,
    riskLevel: 'low',
    complianceFlags: [],
    auditTrail: [
      {
        entryId: 'AUDIT001',
        timestamp: '2024-01-15T10:00:00Z',
        userId: 'CONTRACT_MGR001',
        action: 'updated',
        details: 'Added e-waste premium pricing clause',
        fieldsChanged: ['pricingModel.specialClauses'],
        previousValues: {},
        newValues: { 'specialClauses': ['CLAUSE001'] },
        ipAddress: '192.168.1.100'
      }
    ]
  },
  {
    id: 'CONTRACT002',
    contractNumber: 'EC-2024-002',
    clientId: 'ENT002',
    clientName: 'Lagos Manufacturing Complex',
    contractType: 'volume_based' as ContractType,
    status: 'active' as ContractStatus,
    effectiveDate: '2024-01-01T00:00:00Z',
    expiryDate: '2024-06-30T23:59:59Z',
    renewalWindow: '60_days' as RenewalWindow,
    autoRenewal: false,
    noticePeriod: 90,
    contractOwner: 'CONTRACT_MGR002',
    salesRep: 'SALES_REP002',
    financeApprover: 'FINANCE_MGR002',
    opsApprover: 'OPS_MGR002',
    pricingModel: {
      model: 'tiered' as PricingModel,
      currency: 'NGN',
      baseRates: [
        {
          wasteCategory: 'metal' as WasteCategory,
          baseRate: 45,
          effectiveDate: '2024-01-01T00:00:00Z'
        },
        {
          wasteCategory: 'plastic' as WasteCategory,
          baseRate: 35,
          effectiveDate: '2024-01-01T00:00:00Z'
        },
        {
          wasteCategory: 'industrial' as WasteCategory,
          baseRate: 55,
          effectiveDate: '2024-01-01T00:00:00Z',
          specialConditions: ['Industrial waste processing']
        },
        {
          wasteCategory: 'hazardous' as WasteCategory,
          baseRate: 150,
          effectiveDate: '2024-01-01T00:00:00Z',
          specialConditions: ['Hazardous waste certification required']
        }
      ],
      volumeTiers: [
        {
          tierId: 'TIER1',
          minVolume: 0,
          maxVolume: 1000,
          discountPercentage: 0,
          effectiveDate: '2024-01-01T00:00:00Z'
        },
        {
          tierId: 'TIER2',
          minVolume: 1001,
          maxVolume: 3000,
          discountPercentage: 20,
          effectiveDate: '2024-01-01T00:00:00Z'
        },
        {
          tierId: 'TIER3',
          minVolume: 3001,
          discountPercentage: 25,
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ],
      pickupFrequencyPricing: [
        {
          frequency: 'daily',
          surcharge: 15,
          surchargeType: 'percentage',
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ],
      minimumCharges: [
        {
          chargeType: 'monthly',
          amount: 100000,
          conditions: ['Minimum monthly volume 500kg'],
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ],
      discounts: [
        {
          discountId: 'DISCOUNT002',
          type: 'volume',
          value: 20,
          conditions: ['Monthly volume > 1000kg'],
          effectiveDate: '2024-01-01T00:00:00Z',
          approvedBy: 'FINANCE_MGR002',
          reason: 'High-volume manufacturing discount'
        }
      ],
      specialClauses: [
        {
          clauseId: 'CLAUSE002',
          description: 'Hazardous waste handling premium',
          pricingImpact: 50000,
          riskLevel: 'high',
          effectiveDate: '2024-01-01T00:00:00Z',
          requiresApproval: true,
          approvedBy: 'FINANCE_MGR002'
        }
      ],
      priceAdjustments: []
    },
    slaConfiguration: {
      tier: 'enterprise' as SLATier,
      responseTime: 60,
      pickupWindow: { start: '07:00', end: '09:00' },
      completionRate: 98,
      penaltyRules: [
        {
          ruleId: 'PENALTY002',
          trigger: 'missed_pickup',
          penaltyType: 'fixed',
          penaltyValue: 5000,
          calculationMethod: 'Fixed penalty per missed pickup',
          maxPenalty: 20000,
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ],
      serviceCredits: [],
      escalationRules: [
        {
          ruleId: 'ESCALATE002',
          triggerCondition: 'Production line impact',
          escalationLevel: 2,
          notificationTime: 15,
          recipients: ['ops_director', 'plant_manager'],
          actions: ['Immediate dispatch', 'Backup vehicle'],
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ],
      reportingRequirements: [
        {
          requirementId: 'REPORT002',
          reportType: 'daily',
          content: ['Pickup status', 'Waste categorization', 'Compliance report'],
          deliveryMethod: 'email',
          recipients: ['plant_manager', 'logistics_coordinator'],
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ]
    },
    coverage: {
      cities: ['Lagos'],
      zones: ['Apapa'],
      locations: ['LOC002'],
      wasteTypes: ['metal', 'plastic', 'industrial', 'hazardous'],
      excludedWasteTypes: ['organic'],
      specialRequirements: ['Hazardous waste handling certification', 'Industrial waste segregation'],
      agentEligibility: [
        {
          ruleId: 'AGENT002',
          agentType: 'internal',
          conditions: ['Hazardous material training'],
          restrictions: ['Certified handlers only'],
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ],
      geographicRestrictions: []
    },
    billingTerms: {
      billingCycle: 'monthly',
      paymentTerms: 45,
      lateFeePercentage: 3.0,
      currency: 'NGN',
      invoiceFormat: 'detailed',
      taxConfiguration: {
        taxType: 'vat',
        taxRate: 7.5,
        taxInclusive: false,
        exemptions: [],
        effectiveDate: '2024-01-01T00:00:00Z'
      },
      paymentMethods: [
        {
          method: 'bank_transfer',
          details: 'Lagos Manufacturing Complex - Account 2345678901',
          isActive: true,
          effectiveDate: '2024-01-01T00:00:00Z'
        }
      ]
    },
    createdAt: '2023-12-20T14:00:00Z',
    updatedAt: '2024-01-18T09:15:00Z',
    version: '1.1',
    amendments: [],
    attachments: [
      {
        attachmentId: 'ATT002',
        title: 'Manufacturing Service Agreement',
        type: 'contract',
        fileUrl: '/contracts/EC-2024-002-MSA.pdf',
        uploadedAt: '2023-12-20T14:00:00Z',
        uploadedBy: 'CONTRACT_MGR002',
        version: '1.0',
        isConfidential: true
      }
    ],
    totalPickups: 325,
    totalRevenue: 4245320,
    averageMargin: 32.1,
    slaBreaches: 8,
    penaltiesTriggered: 3,
    riskLevel: 'medium',
    complianceFlags: ['High penalty exposure'],
    auditTrail: [
      {
        entryId: 'AUDIT002',
        timestamp: '2024-01-18T09:15:00Z',
        userId: 'OPS_MGR002',
        action: 'updated',
        details: 'Updated SLA penalty rules',
        fieldsChanged: ['slaConfiguration.penaltyRules'],
        previousValues: {},
        newValues: { 'penaltyRules': ['PENALTY002'] },
        ipAddress: '192.168.1.101'
      }
    ]
  },
  {
    id: 'CONTRACT003',
    contractNumber: 'EC-2024-003',
    clientId: 'ENT003',
    clientName: 'EcoTech Solutions',
    contractType: 'pay_per_pickup' as ContractType,
    status: 'draft' as ContractStatus,
    effectiveDate: '2024-02-01T00:00:00Z',
    expiryDate: '2024-03-31T23:59:59Z',
    renewalWindow: '30_days' as RenewalWindow,
    autoRenewal: false,
    noticePeriod: 30,
    contractOwner: 'CONTRACT_MGR003',
    salesRep: 'SALES_REP003',
    financeApprover: 'FINANCE_MGR003',
    opsApprover: 'OPS_MGR003',
    pricingModel: {
      model: 'per_kg' as PricingModel,
      currency: 'NGN',
      baseRates: [
        {
          wasteCategory: 'paper' as WasteCategory,
          baseRate: 45,
          effectiveDate: '2024-02-01T00:00:00Z'
        },
        {
          wasteCategory: 'e_waste' as WasteCategory,
          baseRate: 60,
          effectiveDate: '2024-02-01T00:00:00Z'
        },
        {
          wasteCategory: 'plastic' as WasteCategory,
          baseRate: 40,
          effectiveDate: '2024-02-01T00:00:00Z'
        },
        {
          wasteCategory: 'organic' as WasteCategory,
          baseRate: 30,
          effectiveDate: '2024-02-01T00:00:00Z'
        }
      ],
      volumeTiers: [],
      pickupFrequencyPricing: [
        {
          frequency: 'bi_weekly',
          surcharge: 10,
          surchargeType: 'percentage',
          effectiveDate: '2024-02-01T00:00:00Z'
        }
      ],
      minimumCharges: [],
      discounts: [],
      specialClauses: [],
      priceAdjustments: []
    },
    slaConfiguration: {
      tier: 'standard' as SLATier,
      responseTime: 180,
      pickupWindow: { start: '10:00', end: '16:00' },
      completionRate: 90,
      penaltyRules: [],
      serviceCredits: [],
      escalationRules: [
        {
          ruleId: 'ESCALATE003',
          triggerCondition: 'Missed pickup > 4 hours',
          escalationLevel: 1,
          notificationTime: 60,
          recipients: ['office_manager'],
          actions: ['Reschedule pickup'],
          effectiveDate: '2024-02-01T00:00:00Z'
        }
      ],
      reportingRequirements: [
        {
          requirementId: 'REPORT003',
          reportType: 'weekly',
          content: ['Pickup summary', 'Weight report'],
          deliveryMethod: 'email',
          recipients: ['office_manager'],
          effectiveDate: '2024-02-01T00:00:00Z'
        }
      ]
    },
    coverage: {
      cities: ['Abuja'],
      zones: ['Maitama'],
      locations: ['LOC003'],
      wasteTypes: ['paper', 'e_waste', 'plastic', 'organic'],
      excludedWasteTypes: ['hazardous', 'industrial'],
      specialRequirements: ['Office hours only'],
      agentEligibility: [
        {
          ruleId: 'AGENT003',
          agentType: 'all',
          conditions: ['Office clearance'],
          restrictions: [],
          effectiveDate: '2024-02-01T00:00:00Z'
        }
      ],
      geographicRestrictions: []
    },
    billingTerms: {
      billingCycle: 'monthly',
      paymentTerms: 30,
      lateFeePercentage: 2.0,
      currency: 'NGN',
      invoiceFormat: 'summary',
      taxConfiguration: {
        taxType: 'vat',
        taxRate: 7.5,
        taxInclusive: false,
        exemptions: [],
        effectiveDate: '2024-02-01T00:00:00Z'
      },
      paymentMethods: [
        {
          method: 'bank_transfer',
          details: 'EcoTech Solutions - Account 3456789012',
          isActive: true,
          effectiveDate: '2024-02-01T00:00:00Z'
        }
      ]
    },
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-01-20T11:00:00Z',
    version: '1.0',
    amendments: [],
    attachments: [],
    totalPickups: 0,
    totalRevenue: 0,
    averageMargin: 0,
    slaBreaches: 0,
    penaltiesTriggered: 0,
    riskLevel: 'low',
    complianceFlags: [],
    auditTrail: [
      {
        entryId: 'AUDIT003',
        timestamp: '2024-01-20T11:00:00Z',
        userId: 'SALES_REP003',
        action: 'created',
        details: 'Created draft contract for EcoTech Solutions',
        fieldsChanged: [],
        previousValues: {},
        newValues: {},
        ipAddress: '192.168.1.102'
      }
    ]
  }
];

// Mock Contracts & Pricing Summary
export const mockContractsPricingSummary: ContractsPricingSummary = {
  activeContracts: 2,
  expiringSoon: 1,
  avgContractValue: 2778420,
  customPricingRules: 2,
  slaPenaltyClauses: 2,
  revenueCovered: 85.5,
  totalContracts: 3,
  draftContracts: 1,
  expiredContracts: 0,
  renewalPending: 0,
  totalContractValue: 8335260,
  avgMargin: 30.3,
  highRiskContracts: 1
};

// Mock Pricing Enforcement Insights
export const mockPricingEnforcementInsights: PricingEnforcementInsights = {
  contractVariance: [
    {
      contractId: 'CONTRACT001',
      contractName: 'TechHub Nigeria Ltd',
      expectedRevenue: 1311520,
      actualRevenue: 1289280,
      variance: -22240,
      variancePercentage: -1.7,
      varianceReasons: ['Service credits applied', 'Volume below minimum'],
      period: '2024-01'
    },
    {
      contractId: 'CONTRACT002',
      contractName: 'Lagos Manufacturing Complex',
      expectedRevenue: 4245320,
      actualRevenue: 4189470,
      variance: -55850,
      variancePercentage: -1.3,
      varianceReasons: ['SLA penalties applied', 'Volume fluctuations'],
      period: '2024-01'
    }
  ],
  discountUtilization: [
    {
      discountId: 'DISCOUNT001',
      discountType: 'volume',
      utilizationRate: 85.0,
      totalDiscountAmount: 131152,
      affectedContracts: 1,
      period: '2024-01'
    },
    {
      discountId: 'DISCOUNT002',
      discountType: 'volume',
      utilizationRate: 92.0,
      totalDiscountAmount: 849064,
      affectedContracts: 1,
      period: '2024-01'
    }
  ],
  marginByContract: [
    {
      contractId: 'CONTRACT001',
      contractName: 'TechHub Nigeria Ltd',
      grossMargin: 28.5,
      netMargin: 26.2,
      marginTrend: 'stable',
      factors: ['E-waste premiums', 'Service credits'],
      period: '2024-01'
    },
    {
      contractId: 'CONTRACT002',
      contractName: 'Lagos Manufacturing Complex',
      grossMargin: 32.1,
      netMargin: 29.8,
      marginTrend: 'declining',
      factors: ['SLA penalties', 'Hazardous waste costs'],
      period: '2024-01'
    }
  ],
  slaPenaltiesTriggered: [
    {
      contractId: 'CONTRACT001',
      contractName: 'TechHub Nigeria Ltd',
      penaltiesTriggered: 1,
      totalPenaltyAmount: 2000,
      averagePenaltyAmount: 2000,
      commonTriggers: ['Late pickup'],
      period: '2024-01'
    },
    {
      contractId: 'CONTRACT002',
      contractName: 'Lagos Manufacturing Complex',
      penaltiesTriggered: 3,
      totalPenaltyAmount: 15000,
      averagePenaltyAmount: 5000,
      commonTriggers: ['Missed pickup', 'Production line impact'],
      period: '2024-01'
    }
  ],
  pricingAccuracy: {
    overallAccuracy: 98.5,
    pricingErrors: [
      {
        errorId: 'ERROR001',
        contractId: 'CONTRACT002',
        errorType: 'rate_mismatch',
        severity: 'medium',
        description: 'Industrial waste rate incorrectly applied',
        financialImpact: 5000,
        detectedAt: '2024-01-15T10:30:00Z',
        resolvedAt: '2024-01-16T14:20:00Z',
        resolution: 'Rate corrected and credit issued'
      }
    ],
    correctionRate: 100.0,
    errorCategories: [
      {
        category: 'rate_mismatch',
        count: 1,
        totalImpact: 5000,
        trend: 'stable'
      }
    ],
    period: '2024-01'
  },
  revenueLeakage: [
    {
      leakageId: 'LEAK001',
      source: 'under_billing',
      estimatedAmount: 5000,
      affectedContracts: 1,
      detectionDate: '2024-01-15T10:30:00Z',
      status: 'resolved'
    }
  ]
};

// Helper functions
export const getContractStatusColor = (status: ContractStatus): string => {
  switch (status) {
    case 'active': return '#10b981';
    case 'draft': return '#6b7280';
    case 'expired': return '#ef4444';
    case 'terminated': return '#dc2626';
    case 'renewal_pending': return '#f59e0b';
    case 'suspended': return '#f97316';
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

export const getPricingModelColor = (model: PricingModel): string => {
  switch (model) {
    case 'per_kg': return '#3b82f6';
    case 'per_pickup': return '#10b981';
    case 'monthly': return '#f59e0b';
    case 'tiered': return '#8b5cf6';
    case 'custom': return '#ec4899';
    default: return '#6b7280';
  }
};

export const getSLATierColor = (tier: SLATier): string => {
  switch (tier) {
    case 'standard': return '#6b7280';
    case 'priority': return '#3b82f6';
    case 'premium': return '#f59e0b';
    case 'enterprise': return '#10b981';
    default: return '#6b7280';
  }
};

export const getRiskLevelColor = (level: string): string => {
  switch (level) {
    case 'low': return '#10b981';
    case 'medium': return '#f59e0b';
    case 'high': return '#ef4444';
    default: return '#6b7280';
  }
};

export const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString()}`;
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const getTrendIcon = (trend: 'up' | 'down' | 'stable' | 'increasing' | 'decreasing'): string => {
  switch (trend) {
    case 'up':
    case 'increasing': return '📈';
    case 'down':
    case 'decreasing': return '📉';
    case 'stable': return '➡️';
    default: return '➡️';
  }
};

export const getDaysUntilExpiry = (expiryDate: string): number => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isExpiringSoon = (expiryDate: string, window: RenewalWindow): boolean => {
  const daysUntil = getDaysUntilExpiry(expiryDate);
  const windowDays = window === '30_days' ? 30 : window === '60_days' ? 60 : 90;
  return daysUntil <= windowDays && daysUntil > 0;
};
