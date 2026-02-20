import type {
  Zone,
  ZoneSummary,
  ZoneChangeEvent,
  ZoneExpansionInsight,
  ZoneStatus,
  SLATier,
  CoverageLevel,
  DemandIntensity,
  LatLng,
} from './types';

// ============================================================
// Color & Label Helpers
// ============================================================

export const getStatusColor = (status: ZoneStatus): string => {
  const colors: Record<ZoneStatus, string> = {
    active: '#10B981',
    inactive: '#6B7280',
    pending: '#F59E0B',
  };
  return colors[status] || '#6B7280';
};

export const getStatusLabel = (status: ZoneStatus): string => {
  const labels: Record<ZoneStatus, string> = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
  };
  return labels[status] || status;
};

export const getSLAColor = (tier: SLATier): string => {
  const colors: Record<SLATier, string> = {
    platinum: '#8B5CF6',
    gold: '#F59E0B',
    silver: '#6B7280',
    bronze: '#D97706',
  };
  return colors[tier] || '#6B7280';
};

export const getSLALabel = (tier: SLATier): string => {
  const labels: Record<SLATier, string> = {
    platinum: 'Platinum',
    gold: 'Gold',
    silver: 'Silver',
    bronze: 'Bronze',
  };
  return labels[tier] || tier;
};

export const getCoverageColor = (level: CoverageLevel): string => {
  const colors: Record<CoverageLevel, string> = {
    high: '#10B981',
    medium: '#F59E0B',
    low: '#EF4444',
    critical: '#DC2626',
  };
  return colors[level] || '#6B7280';
};

export const getCoverageLabel = (level: CoverageLevel): string => {
  const labels: Record<CoverageLevel, string> = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    critical: 'Critical',
  };
  return labels[level] || level;
};

export const getDemandColor = (intensity: DemandIntensity): string => {
  const colors: Record<DemandIntensity, string> = {
    high: '#3B82F6',
    medium: '#F59E0B',
    low: '#6B7280',
  };
  return colors[intensity] || '#6B7280';
};

export const getDemandLabel = (intensity: DemandIntensity): string => {
  const labels: Record<DemandIntensity, string> = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };
  return labels[intensity] || intensity;
};

export const getZoneMapColor = (zone: Zone): string => {
  if (zone.status === 'inactive') return '#9CA3AF';
  if (zone.coverageLevel === 'critical') return '#DC2626';
  if (zone.coverageLevel === 'low') return '#EF4444';
  if (zone.demandIntensity === 'high') return '#3B82F6';
  if (zone.coverageLevel === 'high') return '#10B981';
  return '#F59E0B';
};

// ============================================================
// Nigerian Cities & Centers
// ============================================================

export const nigerianCityCenters: Record<string, LatLng> = {
  Lagos: { lat: 6.5244, lng: 3.3792 },
  Abuja: { lat: 9.0579, lng: 7.4951 },
  'Port Harcourt': { lat: 4.8156, lng: 7.0498 },
  Kano: { lat: 12.0022, lng: 8.5920 },
  Ibadan: { lat: 7.3775, lng: 3.9470 },
  Enugu: { lat: 6.4584, lng: 7.5464 },
};

export const nigerianCities = Object.keys(nigerianCityCenters);

// ============================================================
// Mock Zones (Nigerian Data)
// ============================================================

const weekdayWindows = [
  { day: 'Monday', startTime: '07:00', endTime: '18:00' },
  { day: 'Tuesday', startTime: '07:00', endTime: '18:00' },
  { day: 'Wednesday', startTime: '07:00', endTime: '18:00' },
  { day: 'Thursday', startTime: '07:00', endTime: '18:00' },
  { day: 'Friday', startTime: '07:00', endTime: '18:00' },
];

const fullWeekWindows = [
  ...weekdayWindows,
  { day: 'Saturday', startTime: '08:00', endTime: '16:00' },
];

export const mockZones: Zone[] = [
  {
    id: 'ZN-001',
    name: 'Lekki',
    city: 'Lagos',
    state: 'Lagos',
    description: 'Lekki Phase 1 & 2, VGC, Ajah corridor. High-demand residential and commercial zone.',
    boundary: {
      polygon: [
        { lat: 6.4400, lng: 3.4700 },
        { lat: 6.4500, lng: 3.5200 },
        { lat: 6.4300, lng: 3.5600 },
        { lat: 6.4100, lng: 3.5400 },
        { lat: 6.4200, lng: 3.4800 },
      ],
      center: { lat: 6.4350, lng: 3.5150 },
      areaKm2: 42.5,
    },
    status: 'active',
    coverageLevel: 'high',
    activeAgents: 34,
    totalAgents: 40,
    pricingRuleId: 'PRC-005',
    pricingRuleName: 'Plastic - Lagos Premium',
    slaTier: 'platinum',
    pickupAvailability: fullWeekWindows,
    dropoffEligible: true,
    avgPickupsPerDay: 85,
    avgDropoffsPerDay: 42,
    demandIntensity: 'high',
    coverageGapPercent: 5,
    enterpriseClients: ['Dangote Industries', 'GTBank HQ'],
    contractOverrides: 2,
    performance: { avgPickupTimeMins: 22, completionRatePercent: 96, agentIdlePercent: 8, slaCompliancePercent: 97, utilizationPercent: 88 },
    version: 4,
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    createdBy: 'Adaeze Nwosu',
    lastChangedBy: 'Adaeze Nwosu',
  },
  {
    id: 'ZN-002',
    name: 'Victoria Island',
    city: 'Lagos',
    state: 'Lagos',
    description: 'VI, Eko Atlantic, Oniru. Premium commercial district with enterprise clients.',
    boundary: {
      polygon: [
        { lat: 6.4280, lng: 3.4100 },
        { lat: 6.4350, lng: 3.4400 },
        { lat: 6.4250, lng: 3.4600 },
        { lat: 6.4150, lng: 3.4500 },
        { lat: 6.4180, lng: 3.4200 },
      ],
      center: { lat: 6.4250, lng: 3.4350 },
      areaKm2: 18.3,
    },
    status: 'active',
    coverageLevel: 'high',
    activeAgents: 22,
    totalAgents: 25,
    pricingRuleId: 'PRC-005',
    pricingRuleName: 'Plastic - Lagos Premium',
    slaTier: 'platinum',
    pickupAvailability: fullWeekWindows,
    dropoffEligible: true,
    avgPickupsPerDay: 62,
    avgDropoffsPerDay: 28,
    demandIntensity: 'high',
    coverageGapPercent: 3,
    enterpriseClients: ['Access Bank', 'Sterling Bank', 'Nestlé Nigeria'],
    contractOverrides: 3,
    performance: { avgPickupTimeMins: 18, completionRatePercent: 98, agentIdlePercent: 5, slaCompliancePercent: 99, utilizationPercent: 92 },
    version: 3,
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
    createdBy: 'Adaeze Nwosu',
    lastChangedBy: 'Adaeze Nwosu',
  },
  {
    id: 'ZN-003',
    name: 'Ikeja',
    city: 'Lagos',
    state: 'Lagos',
    description: 'Ikeja GRA, Allen Avenue, Alausa. Government and commercial hub.',
    boundary: {
      polygon: [
        { lat: 6.5900, lng: 3.3400 },
        { lat: 6.6000, lng: 3.3700 },
        { lat: 6.5850, lng: 3.3900 },
        { lat: 6.5750, lng: 3.3700 },
        { lat: 6.5800, lng: 3.3500 },
      ],
      center: { lat: 6.5870, lng: 3.3650 },
      areaKm2: 28.7,
    },
    status: 'active',
    coverageLevel: 'medium',
    activeAgents: 18,
    totalAgents: 24,
    pricingRuleId: 'PRC-005',
    pricingRuleName: 'Plastic - Lagos Premium',
    slaTier: 'gold',
    pickupAvailability: weekdayWindows,
    dropoffEligible: true,
    avgPickupsPerDay: 45,
    avgDropoffsPerDay: 20,
    demandIntensity: 'medium',
    coverageGapPercent: 18,
    enterpriseClients: ['Lagos State Government'],
    contractOverrides: 1,
    performance: { avgPickupTimeMins: 28, completionRatePercent: 91, agentIdlePercent: 14, slaCompliancePercent: 89, utilizationPercent: 72 },
    version: 2,
    createdAt: '2023-04-01T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
    createdBy: 'Adaeze Nwosu',
    lastChangedBy: 'Emeka Okafor',
  },
  {
    id: 'ZN-004',
    name: 'Epe',
    city: 'Lagos',
    state: 'Lagos',
    description: 'Epe and surrounding areas. Low coverage, expansion candidate.',
    boundary: {
      polygon: [
        { lat: 6.5800, lng: 3.9700 },
        { lat: 6.5950, lng: 4.0100 },
        { lat: 6.5700, lng: 4.0300 },
        { lat: 6.5550, lng: 4.0000 },
        { lat: 6.5650, lng: 3.9800 },
      ],
      center: { lat: 6.5730, lng: 3.9980 },
      areaKm2: 55.2,
    },
    status: 'active',
    coverageLevel: 'low',
    activeAgents: 4,
    totalAgents: 6,
    pricingRuleId: 'PRC-001',
    pricingRuleName: 'Plastic - National Base Rate',
    slaTier: 'bronze',
    pickupAvailability: weekdayWindows,
    dropoffEligible: false,
    avgPickupsPerDay: 8,
    avgDropoffsPerDay: 2,
    demandIntensity: 'low',
    coverageGapPercent: 62,
    enterpriseClients: [],
    contractOverrides: 0,
    performance: { avgPickupTimeMins: 55, completionRatePercent: 72, agentIdlePercent: 35, slaCompliancePercent: 65, utilizationPercent: 38 },
    version: 1,
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z',
    createdBy: 'Emeka Okafor',
    lastChangedBy: 'Emeka Okafor',
  },
  {
    id: 'ZN-005',
    name: 'Wuse',
    city: 'Abuja',
    state: 'FCT',
    description: 'Wuse I & II, Wuse Market area. Core Abuja commercial zone.',
    boundary: {
      polygon: [
        { lat: 9.0600, lng: 7.4700 },
        { lat: 9.0700, lng: 7.4950 },
        { lat: 9.0580, lng: 7.5100 },
        { lat: 9.0480, lng: 7.4900 },
        { lat: 9.0520, lng: 7.4750 },
      ],
      center: { lat: 9.0580, lng: 7.4880 },
      areaKm2: 22.1,
    },
    status: 'active',
    coverageLevel: 'high',
    activeAgents: 16,
    totalAgents: 18,
    pricingRuleId: 'PRC-006',
    pricingRuleName: 'Plastic - Abuja Premium',
    slaTier: 'gold',
    pickupAvailability: fullWeekWindows,
    dropoffEligible: true,
    avgPickupsPerDay: 38,
    avgDropoffsPerDay: 15,
    demandIntensity: 'high',
    coverageGapPercent: 8,
    enterpriseClients: ['NNPC', 'CBN'],
    contractOverrides: 1,
    performance: { avgPickupTimeMins: 25, completionRatePercent: 94, agentIdlePercent: 10, slaCompliancePercent: 93, utilizationPercent: 82 },
    version: 3,
    createdAt: '2023-05-01T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
    createdBy: 'Adaeze Nwosu',
    lastChangedBy: 'Adaeze Nwosu',
  },
  {
    id: 'ZN-006',
    name: 'Kubwa',
    city: 'Abuja',
    state: 'FCT',
    description: 'Kubwa satellite town. Underserved, agent recruitment incentive active.',
    boundary: {
      polygon: [
        { lat: 9.1100, lng: 7.3200 },
        { lat: 9.1250, lng: 7.3500 },
        { lat: 9.1150, lng: 7.3700 },
        { lat: 9.1000, lng: 7.3600 },
        { lat: 9.1050, lng: 7.3300 },
      ],
      center: { lat: 9.1110, lng: 7.3460 },
      areaKm2: 35.8,
    },
    status: 'active',
    coverageLevel: 'low',
    activeAgents: 5,
    totalAgents: 8,
    pricingRuleId: 'PRC-006',
    pricingRuleName: 'Plastic - Abuja Premium',
    slaTier: 'silver',
    pickupAvailability: weekdayWindows,
    dropoffEligible: false,
    avgPickupsPerDay: 12,
    avgDropoffsPerDay: 4,
    demandIntensity: 'medium',
    coverageGapPercent: 48,
    enterpriseClients: [],
    contractOverrides: 0,
    performance: { avgPickupTimeMins: 42, completionRatePercent: 78, agentIdlePercent: 28, slaCompliancePercent: 74, utilizationPercent: 48 },
    version: 2,
    createdAt: '2023-07-01T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z',
    createdBy: 'Emeka Okafor',
    lastChangedBy: 'Adaeze Nwosu',
  },
  {
    id: 'ZN-007',
    name: 'GRA Phase 2',
    city: 'Port Harcourt',
    state: 'Rivers',
    description: 'GRA Phase 2, Trans Amadi. Oil & gas enterprise corridor.',
    boundary: {
      polygon: [
        { lat: 4.8200, lng: 7.0300 },
        { lat: 4.8300, lng: 7.0550 },
        { lat: 4.8180, lng: 7.0700 },
        { lat: 4.8080, lng: 7.0550 },
        { lat: 4.8120, lng: 7.0400 },
      ],
      center: { lat: 4.8180, lng: 7.0500 },
      areaKm2: 19.6,
    },
    status: 'active',
    coverageLevel: 'medium',
    activeAgents: 10,
    totalAgents: 14,
    pricingRuleId: 'PRC-001',
    pricingRuleName: 'Plastic - National Base Rate',
    slaTier: 'gold',
    pickupAvailability: weekdayWindows,
    dropoffEligible: true,
    avgPickupsPerDay: 28,
    avgDropoffsPerDay: 10,
    demandIntensity: 'medium',
    coverageGapPercent: 22,
    enterpriseClients: ['Shell Nigeria', 'Total Energies'],
    contractOverrides: 2,
    performance: { avgPickupTimeMins: 30, completionRatePercent: 88, agentIdlePercent: 16, slaCompliancePercent: 86, utilizationPercent: 68 },
    version: 2,
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    createdBy: 'Adaeze Nwosu',
    lastChangedBy: 'Emeka Okafor',
  },
  {
    id: 'ZN-008',
    name: 'Sabon Gari',
    city: 'Kano',
    state: 'Kano',
    description: 'Sabon Gari commercial area. Pilot zone for northern expansion.',
    boundary: {
      polygon: [
        { lat: 12.0000, lng: 8.5200 },
        { lat: 12.0100, lng: 8.5500 },
        { lat: 11.9980, lng: 8.5650 },
        { lat: 11.9880, lng: 8.5450 },
        { lat: 11.9920, lng: 8.5300 },
      ],
      center: { lat: 11.9980, lng: 8.5420 },
      areaKm2: 24.3,
    },
    status: 'active',
    coverageLevel: 'low',
    activeAgents: 6,
    totalAgents: 10,
    pricingRuleId: 'PRC-001',
    pricingRuleName: 'Plastic - National Base Rate',
    slaTier: 'silver',
    pickupAvailability: weekdayWindows,
    dropoffEligible: true,
    avgPickupsPerDay: 15,
    avgDropoffsPerDay: 8,
    demandIntensity: 'low',
    coverageGapPercent: 40,
    enterpriseClients: [],
    contractOverrides: 0,
    performance: { avgPickupTimeMins: 38, completionRatePercent: 82, agentIdlePercent: 22, slaCompliancePercent: 78, utilizationPercent: 55 },
    version: 1,
    createdAt: '2023-10-01T00:00:00Z',
    updatedAt: '2023-12-15T00:00:00Z',
    createdBy: 'Emeka Okafor',
    lastChangedBy: 'Emeka Okafor',
  },
  {
    id: 'ZN-009',
    name: 'Surulere',
    city: 'Lagos',
    state: 'Lagos',
    description: 'Surulere, Aguda, Iponri. Dense residential zone.',
    boundary: {
      polygon: [
        { lat: 6.5000, lng: 3.3400 },
        { lat: 6.5100, lng: 3.3650 },
        { lat: 6.5000, lng: 3.3800 },
        { lat: 6.4900, lng: 3.3650 },
        { lat: 6.4950, lng: 3.3450 },
      ],
      center: { lat: 6.5000, lng: 3.3600 },
      areaKm2: 15.8,
    },
    status: 'active',
    coverageLevel: 'medium',
    activeAgents: 12,
    totalAgents: 16,
    pricingRuleId: 'PRC-005',
    pricingRuleName: 'Plastic - Lagos Premium',
    slaTier: 'silver',
    pickupAvailability: weekdayWindows,
    dropoffEligible: true,
    avgPickupsPerDay: 32,
    avgDropoffsPerDay: 14,
    demandIntensity: 'medium',
    coverageGapPercent: 20,
    enterpriseClients: [],
    contractOverrides: 0,
    performance: { avgPickupTimeMins: 32, completionRatePercent: 87, agentIdlePercent: 18, slaCompliancePercent: 84, utilizationPercent: 65 },
    version: 2,
    createdAt: '2023-05-01T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
    createdBy: 'Adaeze Nwosu',
    lastChangedBy: 'Emeka Okafor',
  },
  {
    id: 'ZN-010',
    name: 'Bodija',
    city: 'Ibadan',
    state: 'Oyo',
    description: 'Bodija, UI area. University and residential zone. Inactive pending agent recruitment.',
    boundary: {
      polygon: [
        { lat: 7.4100, lng: 3.9000 },
        { lat: 7.4200, lng: 3.9250 },
        { lat: 7.4100, lng: 3.9400 },
        { lat: 7.4000, lng: 3.9250 },
        { lat: 7.4050, lng: 3.9050 },
      ],
      center: { lat: 7.4100, lng: 3.9190 },
      areaKm2: 20.1,
    },
    status: 'inactive',
    coverageLevel: 'critical',
    activeAgents: 0,
    totalAgents: 2,
    pricingRuleId: 'PRC-001',
    pricingRuleName: 'Plastic - National Base Rate',
    slaTier: 'bronze',
    pickupAvailability: [],
    dropoffEligible: false,
    avgPickupsPerDay: 0,
    avgDropoffsPerDay: 0,
    demandIntensity: 'low',
    coverageGapPercent: 95,
    enterpriseClients: [],
    contractOverrides: 0,
    performance: { avgPickupTimeMins: 0, completionRatePercent: 0, agentIdlePercent: 0, slaCompliancePercent: 0, utilizationPercent: 0 },
    version: 1,
    createdAt: '2023-11-01T00:00:00Z',
    updatedAt: '2023-11-01T00:00:00Z',
    createdBy: 'Emeka Okafor',
    lastChangedBy: 'Emeka Okafor',
  },
];

// ============================================================
// Summary
// ============================================================

export const mockZoneSummary: ZoneSummary = {
  citiesCovered: 5,
  activeZones: 9,
  agentsAssigned: 127,
  lowCoverageZones: 4,
  avgPickupsPerZone: 36,
  avgSlaPerformancePercent: 85,
};

// ============================================================
// Change History
// ============================================================

export const mockZoneChangeHistory: ZoneChangeEvent[] = [
  {
    id: 'ZCH-001',
    timestamp: '2024-01-15T10:00:00Z',
    actor: 'Adaeze Nwosu',
    action: 'boundary_changed',
    zoneId: 'ZN-001',
    zoneName: 'Lekki',
    description: 'Extended Lekki zone boundary to include Ajah corridor',
    changes: [{ field: 'areaKm2', before: '38.2', after: '42.5' }],
  },
  {
    id: 'ZCH-002',
    timestamp: '2024-01-12T14:00:00Z',
    actor: 'Adaeze Nwosu',
    action: 'updated',
    zoneId: 'ZN-005',
    zoneName: 'Wuse',
    description: 'Upgraded Wuse SLA tier from Silver to Gold',
    changes: [{ field: 'slaTier', before: 'Silver', after: 'Gold' }],
  },
  {
    id: 'ZCH-003',
    timestamp: '2024-01-08T09:00:00Z',
    actor: 'Adaeze Nwosu',
    action: 'activated',
    zoneId: 'ZN-006',
    zoneName: 'Kubwa',
    description: 'Activated Kubwa zone with low-coverage incentive',
  },
  {
    id: 'ZCH-004',
    timestamp: '2023-12-15T11:00:00Z',
    actor: 'Emeka Okafor',
    action: 'created',
    zoneId: 'ZN-008',
    zoneName: 'Sabon Gari',
    description: 'Created Sabon Gari pilot zone for Kano expansion',
  },
  {
    id: 'ZCH-005',
    timestamp: '2023-11-01T08:00:00Z',
    actor: 'Emeka Okafor',
    action: 'created',
    zoneId: 'ZN-010',
    zoneName: 'Bodija',
    description: 'Created Bodija zone (inactive, pending agent recruitment)',
  },
];

// ============================================================
// Expansion Insights
// ============================================================

export const mockExpansionInsights: ZoneExpansionInsight[] = [
  {
    zoneId: 'ZN-001',
    zoneName: 'Lekki',
    city: 'Lagos',
    metric: 'Utilization',
    value: 88,
    recommendation: 'Consider splitting into Lekki Phase 1 and Ajah sub-zones to reduce agent load',
    severity: 'warning',
  },
  {
    zoneId: 'ZN-004',
    zoneName: 'Epe',
    city: 'Lagos',
    metric: 'Coverage Gap',
    value: 62,
    recommendation: 'Recruit 4+ agents to reach minimum viable coverage. Consider incentive pricing.',
    severity: 'critical',
  },
  {
    zoneId: 'ZN-006',
    zoneName: 'Kubwa',
    city: 'Abuja',
    metric: 'Coverage Gap',
    value: 48,
    recommendation: 'Agent recruitment incentive active. Monitor for 30 days before boundary adjustment.',
    severity: 'warning',
  },
  {
    zoneId: 'ZN-010',
    zoneName: 'Bodija',
    city: 'Ibadan',
    metric: 'Status',
    value: 0,
    recommendation: 'Zone inactive. Need minimum 5 agents before activation. Partner with University of Ibadan.',
    severity: 'critical',
  },
  {
    zoneId: 'ZN-002',
    zoneName: 'Victoria Island',
    city: 'Lagos',
    metric: 'Utilization',
    value: 92,
    recommendation: 'High utilization. Expansion-ready. Consider extending to Ikoyi.',
    severity: 'info',
  },
  {
    zoneId: 'ZN-008',
    zoneName: 'Sabon Gari',
    city: 'Kano',
    metric: 'Coverage Gap',
    value: 40,
    recommendation: 'Pilot zone performing below target. Review pricing and agent incentives.',
    severity: 'warning',
  },
];
