import { ScheduledCollection, CollectionsSummary, SLARiskInsights, CollectionStatus, CollectionType, WasteType, SLARisk, ViewMode, DateRange } from './types';

// Mock Scheduled Collections Data
export const mockScheduledCollections: ScheduledCollection[] = [
  {
    id: 'COLL001',
    collectionId: 'SC-2024-001',
    clientId: 'ENT001',
    clientName: 'TechHub Nigeria Ltd',
    contractId: 'CONTRACT001',
    contractNumber: 'EC-2024-001',
    collectionType: 'recurring' as CollectionType,
    status: 'assigned' as CollectionStatus,
    scheduledDate: '2024-01-27',
    scheduledTime: '09:00',
    estimatedDuration: 45,
    slaWindow: {
      start: '08:00',
      end: '12:00'
    },
    recurrencePattern: {
      type: 'weekly',
      frequency: 1,
      daysOfWeek: [1, 3, 5], // Monday, Wednesday, Friday
      endDate: '2024-12-31',
      exceptions: []
    },
    location: {
      locationId: 'LOC001',
      name: 'TechHub Headquarters',
      address: {
        street: '42 Adeola Odeku Street',
        city: 'Lagos',
        zone: 'Ikoyi',
        state: 'Lagos',
        coordinates: { lat: 6.4281, lng: 3.4219 }
      },
      accessInstructions: 'Use service entrance at rear of building',
      parkingInfo: 'Loading bay available for 30 minutes',
      buildingRestrictions: ['No parking before 8:00 AM', 'Security clearance required'],
      preferredTime: '09:00 - 11:00'
    },
    city: 'Lagos',
    zone: 'Ikoyi',
    wasteCategories: [
      {
        type: 'paper' as WasteType,
        estimatedWeight: 45,
        specialHandling: ['Confidential documents'],
        containerRequirements: ['Secure bins', 'Sealed containers']
      },
      {
        type: 'e_waste' as WasteType,
        estimatedWeight: 15,
        specialHandling: ['Data destruction required'],
        containerRequirements: ['Anti-static containers']
      },
      {
        type: 'plastic' as WasteType,
        estimatedWeight: 25,
        specialHandling: [],
        containerRequirements: ['Standard bins']
      }
    ],
    estimatedVolume: 85,
    specialRequirements: ['Confidential document handling', 'Data destruction certification'],
    assignedAgent: {
      agentId: 'AGENT001',
      agentName: 'James Okonkwo',
      agentType: 'internal',
      contact: {
        phone: '+2348021234567',
        email: 'james.okonkwo@recliq.com'
      },
      capacity: {
        maxWeight: 500,
        maxVolume: 10,
        availableTime: ['08:00-17:00']
      },
      currentLoad: 320,
      performance: {
        onTimeRate: 96.5,
        completionRate: 98.2,
        averageRating: 4.7
      },
      vehicleInfo: {
        type: 'Van',
        plate: 'RECLIQ-001',
        capacity: 500
      }
    },
    backupAgent: {
      agentId: 'AGENT002',
      agentName: 'Amina Yusuf',
      agentType: 'internal',
      contact: {
        phone: '+2348037654321',
        email: 'amina.yusuf@recliq.com'
      },
      capacity: {
        maxWeight: 400,
        maxVolume: 8,
        availableTime: ['08:00-16:00']
      },
      currentLoad: 280,
      performance: {
        onTimeRate: 94.2,
        completionRate: 97.1,
        averageRating: 4.5
      },
      vehicleInfo: {
        type: 'Van',
        plate: 'RECLIQ-002',
        capacity: 400
      }
    },
    slaRisk: 'low' as SLARisk,
    riskFactors: [],
    priority: 'medium',
    accessInstructions: 'Contact security desk 15 minutes before arrival',
    contactPerson: {
      name: 'Sarah Johnson',
      title: 'Office Manager',
      phone: '+2348098765432',
      email: 'sarah.j@techhub.ng',
      isPrimary: true
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-26T10:30:00Z',
    createdBy: 'OPS_MGR001',
    lastModifiedBy: 'OPS_MGR001',
    rescheduleCount: 0,
    notes: ['Regular weekly pickup', 'Client prefers morning slots']
  },
  {
    id: 'COLL002',
    collectionId: 'SC-2024-002',
    clientId: 'ENT002',
    clientName: 'Lagos Manufacturing Complex',
    contractId: 'CONTRACT002',
    contractNumber: 'EC-2024-002',
    collectionType: 'recurring' as CollectionType,
    status: 'at_risk' as CollectionStatus,
    scheduledDate: '2024-01-27',
    scheduledTime: '07:00',
    estimatedDuration: 90,
    slaWindow: {
      start: '06:00',
      end: '09:00'
    },
    recurrencePattern: {
      type: 'daily',
      frequency: 1,
      endDate: '2024-06-30',
      exceptions: ['2024-01-01', '2024-01-25']
    },
    location: {
      locationId: 'LOC002',
      name: 'Manufacturing Plant - Apapa',
      address: {
        street: '15 Industrial Avenue',
        city: 'Lagos',
        zone: 'Apapa',
        state: 'Lagos',
        coordinates: { lat: 6.4473, lng: 3.3792 }
      },
      accessInstructions: 'Enter through Gate 3, follow signs to Recycling Area',
      parkingInfo: 'Dedicated loading zone for 60 minutes',
      buildingRestrictions: ['Hard hat required', 'Safety vest mandatory'],
      preferredTime: '06:00 - 08:00'
    },
    city: 'Lagos',
    zone: 'Apapa',
    wasteCategories: [
      {
        type: 'metal' as WasteType,
        estimatedWeight: 250,
        specialHandling: ['Heavy equipment required'],
        containerRequirements: ['Industrial bins', 'Crane access']
      },
      {
        type: 'industrial' as WasteType,
        estimatedWeight: 180,
        specialHandling: ['Hazardous material handling'],
        containerRequirements: ['Sealed containers', 'Spill kit available']
      },
      {
        type: 'plastic' as WasteType,
        estimatedWeight: 120,
        specialHandling: ['Industrial plastic waste'],
        containerRequirements: ['Large capacity bins']
      }
    ],
    estimatedVolume: 550,
    specialRequirements: ['Hazardous waste handling certification', 'Early morning access', 'Heavy equipment'],
    assignedAgent: {
      agentId: 'AGENT003',
      agentName: 'Chukwuemeka Okafor',
      agentType: 'partner',
      contact: {
        phone: '+2348045678901',
        email: 'chukwuemeka@partnerlogistics.com'
      },
      capacity: {
        maxWeight: 800,
        maxVolume: 15,
        availableTime: ['05:00-14:00']
      },
      currentLoad: 680,
      performance: {
        onTimeRate: 89.5,
        completionRate: 92.3,
        averageRating: 4.2
      },
      vehicleInfo: {
        type: 'Truck',
        plate: 'PARTNER-001',
        capacity: 800
      }
    },
    slaRisk: 'high' as SLARisk,
    riskFactors: [
      {
        factorId: 'RISK001',
        type: 'capacity_mismatch',
        severity: 'high',
        description: 'Agent current load exceeds optimal capacity',
        impact: 'Potential delay in collection completion',
        mitigation: 'Assign backup agent or split collection',
        detectedAt: '2024-01-26T14:00:00Z'
      },
      {
        factorId: 'RISK002',
        type: 'schedule_conflict',
        severity: 'medium',
        description: 'Collection time conflicts with peak factory operations',
        impact: 'Access delays possible',
        mitigation: 'Coordinate with factory manager for access',
        detectedAt: '2024-01-26T16:00:00Z'
      }
    ],
    priority: 'high',
    accessInstructions: 'Must arrive before 6:30 AM to avoid production line interference',
    contactPerson: {
      name: 'Michael Bello',
      title: 'Plant Manager',
      phone: '+2348054321098',
      email: 'm.bello@lagosmfg.ng',
      isPrimary: true
    },
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-26T16:30:00Z',
    createdBy: 'OPS_MGR002',
    lastModifiedBy: 'OPS_MGR002',
    rescheduleCount: 1,
    notes: ['High volume industrial client', 'Requires specialized equipment', 'SLA critical for production']
  },
  {
    id: 'COLL003',
    collectionId: 'SC-2024-003',
    clientId: 'ENT003',
    clientName: 'EcoTech Solutions',
    contractId: 'CONTRACT003',
    contractNumber: 'EC-2024-003',
    collectionType: 'one_off' as CollectionType,
    status: 'scheduled' as CollectionStatus,
    scheduledDate: '2024-01-28',
    scheduledTime: '14:00',
    estimatedDuration: 30,
    slaWindow: {
      start: '12:00',
      end: '17:00'
    },
    location: {
      locationId: 'LOC003',
      name: 'EcoTech Office - Maitama',
      address: {
        street: '7 Alex Ekwueme Way',
        city: 'Abuja',
        zone: 'Maitama',
        state: 'FCT',
        coordinates: { lat: 9.0765, lng: 7.3986 }
      },
      accessInstructions: 'Front entrance, reception will direct to storage area',
      parkingInfo: 'Visitor parking available',
      buildingRestrictions: ['Office hours only (8AM-6PM)'],
      preferredTime: '13:00 - 16:00'
    },
    city: 'Abuja',
    zone: 'Maitama',
    wasteCategories: [
      {
        type: 'paper' as WasteType,
        estimatedWeight: 35,
        specialHandling: ['Office documents'],
        containerRequirements: ['Standard bins']
      },
      {
        type: 'e_waste' as WasteType,
        estimatedWeight: 20,
        specialHandling: ['Electronic equipment'],
        containerRequirements: ['Anti-static containers']
      },
      {
        type: 'plastic' as WasteType,
        estimatedWeight: 15,
        specialHandling: [],
        containerRequirements: ['Standard bins']
      }
    ],
    estimatedVolume: 70,
    specialRequirements: ['Office environment cleanup', 'Data security for e-waste'],
    slaRisk: 'low' as SLARisk,
    riskFactors: [],
    priority: 'medium',
    accessInstructions: 'Contact reception 30 minutes before arrival',
    contactPerson: {
      name: 'Fatima Ibrahim',
      title: 'Office Administrator',
      phone: '+2348076543210',
      email: 'fatima.i@ecotech.ng',
      isPrimary: true
    },
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    createdBy: 'OPS_MGR003',
    lastModifiedBy: 'OPS_MGR003',
    rescheduleCount: 0,
    notes: ['One-off collection for office relocation', 'Special attention to e-waste data security']
  },
  {
    id: 'COLL004',
    collectionId: 'SC-2024-004',
    clientId: 'ENT001',
    clientName: 'TechHub Nigeria Ltd',
    contractId: 'CONTRACT001',
    contractNumber: 'EC-2024-001',
    collectionType: 'recurring' as CollectionType,
    status: 'rescheduled' as CollectionStatus,
    scheduledDate: '2024-01-29',
    scheduledTime: '10:00',
    estimatedDuration: 45,
    slaWindow: {
      start: '08:00',
      end: '12:00'
    },
    recurrencePattern: {
      type: 'weekly',
      frequency: 1,
      daysOfWeek: [2, 4], // Tuesday, Thursday
      endDate: '2024-12-31',
      exceptions: []
    },
    location: {
      locationId: 'LOC001',
      name: 'TechHub Headquarters',
      address: {
        street: '42 Adeola Odeku Street',
        city: 'Lagos',
        zone: 'Ikoyi',
        state: 'Lagos',
        coordinates: { lat: 6.4281, lng: 3.4219 }
      },
      accessInstructions: 'Use service entrance at rear of building',
      parkingInfo: 'Loading bay available for 30 minutes',
      buildingRestrictions: ['No parking before 8:00 AM', 'Security clearance required'],
      preferredTime: '09:00 - 11:00'
    },
    city: 'Lagos',
    zone: 'Ikoyi',
    wasteCategories: [
      {
        type: 'paper' as WasteType,
        estimatedWeight: 40,
        specialHandling: ['Office documents'],
        containerRequirements: ['Standard bins']
      },
      {
        type: 'plastic' as WasteType,
        estimatedWeight: 20,
        specialHandling: [],
        containerRequirements: ['Standard bins']
      },
      {
        type: 'organic' as WasteType,
        estimatedWeight: 15,
        specialHandling: ['Food waste'],
        containerRequirements: ['Sealed containers']
      }
    ],
    estimatedVolume: 75,
    specialRequirements: ['Regular office waste'],
    slaRisk: 'low' as SLARisk,
    riskFactors: [],
    priority: 'medium',
    accessInstructions: 'Contact security desk 15 minutes before arrival',
    contactPerson: {
      name: 'Sarah Johnson',
      title: 'Office Manager',
      phone: '+2348098765432',
      email: 'sarah.j@techhub.ng',
      isPrimary: true
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-26T09:15:00Z',
    createdBy: 'OPS_MGR001',
    lastModifiedBy: 'OPS_MGR001',
    rescheduleCount: 2,
    notes: ['Rescheduled from 09:00 to 10:00 due to client meeting', 'Regular bi-weekly collection']
  },
  {
    id: 'COLL005',
    collectionId: 'SC-2024-005',
    clientId: 'ENT002',
    clientName: 'Lagos Manufacturing Complex',
    contractId: 'CONTRACT002',
    contractNumber: 'EC-2024-002',
    collectionType: 'one_off' as CollectionType,
    status: 'scheduled' as CollectionStatus,
    scheduledDate: '2024-01-30',
    scheduledTime: '08:00',
    estimatedDuration: 120,
    slaWindow: {
      start: '06:00',
      end: '12:00'
    },
    location: {
      locationId: 'LOC002',
      name: 'Manufacturing Plant - Apapa',
      address: {
        street: '15 Industrial Avenue',
        city: 'Lagos',
        zone: 'Apapa',
        state: 'Lagos',
        coordinates: { lat: 6.4473, lng: 3.3792 }
      },
      accessInstructions: 'Enter through Gate 3, follow signs to Recycling Area',
      parkingInfo: 'Dedicated loading zone for 60 minutes',
      buildingRestrictions: ['Hard hat required', 'Safety vest mandatory'],
      preferredTime: '06:00 - 08:00'
    },
    city: 'Lagos',
    zone: 'Apapa',
    wasteCategories: [
      {
        type: 'hazardous' as WasteType,
        estimatedWeight: 100,
        specialHandling: ['Hazardous material certification required'],
        containerRequirements: ['UN-approved containers', 'Spill containment']
      },
      {
        type: 'metal' as WasteType,
        estimatedWeight: 300,
        specialHandling: ['Heavy equipment'],
        containerRequirements: ['Industrial bins', 'Crane access']
      }
    ],
    estimatedVolume: 400,
    specialRequirements: ['Hazardous waste specialist required', 'Environmental clearance needed'],
    assignedAgent: {
      agentId: 'AGENT004',
      agentName: 'David Adeyemi',
      agentType: 'internal',
      contact: {
        phone: '+2348065432109',
        email: 'david.adeyemi@recliq.com'
      },
      capacity: {
        maxWeight: 600,
        maxVolume: 12,
        availableTime: ['06:00-15:00']
      },
      currentLoad: 450,
      performance: {
        onTimeRate: 97.8,
        completionRate: 99.1,
        averageRating: 4.8
      },
      vehicleInfo: {
        type: 'Specialized Truck',
        plate: 'RECLIQ-003',
        capacity: 600
      }
    },
    slaRisk: 'medium' as SLARisk,
    riskFactors: [
      {
        factorId: 'RISK003',
        type: 'sla_breach',
        severity: 'medium',
        description: 'Hazardous waste requires additional processing time',
        impact: 'May exceed standard collection window',
        mitigation: 'Schedule additional buffer time',
        detectedAt: '2024-01-26T11:00:00Z'
      }
    ],
    priority: 'urgent',
    accessInstructions: 'Environmental officer must be present during collection',
    contactPerson: {
      name: 'Michael Bello',
      title: 'Plant Manager',
      phone: '+2348054321098',
      email: 'm.bello@lagosmfg.ng',
      isPrimary: true
    },
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-26T11:30:00Z',
    createdBy: 'OPS_MGR002',
    lastModifiedBy: 'OPS_MGR002',
    rescheduleCount: 0,
    notes: ['Special hazardous waste collection', 'Requires environmental compliance officer', 'High priority client']
  }
];

// Mock Collections Summary
export const mockCollectionsSummary: CollectionsSummary = {
  upcomingCollections: 5,
  activeEnterpriseClients: 3,
  agentsAssigned: 3,
  atRiskCollections: 2,
  recurringSchedules: 3,
  avgLeadTime: 48, // hours
  totalEstimatedVolume: 1180, // kg
  highPriorityCollections: 1,
  unassignedCollections: 2
};

// Mock SLA Risk Insights
export const mockSLARiskInsights: SLARiskInsights = {
  riskForecast: [
    {
      date: '2024-01-27',
      riskLevel: 'high' as SLARisk,
      collectionsAtRisk: 2,
      primaryRiskFactors: ['Agent capacity overload', 'Schedule conflicts'],
      recommendedActions: ['Assign backup agents', 'Reschedule low-priority collections']
    },
    {
      date: '2024-01-28',
      riskLevel: 'medium' as SLARisk,
      collectionsAtRisk: 1,
      primaryRiskFactors: ['Weather conditions'],
      recommendedActions: ['Monitor weather updates', 'Prepare contingency plans']
    },
    {
      date: '2024-01-29',
      riskLevel: 'low' as SLARisk,
      collectionsAtRisk: 0,
      primaryRiskFactors: [],
      recommendedActions: ['Maintain current schedule']
    },
    {
      date: '2024-01-30',
      riskLevel: 'critical' as SLARisk,
      collectionsAtRisk: 1,
      primaryRiskFactors: ['Hazardous waste complexity', 'Environmental compliance'],
      recommendedActions: ['Assign specialized team', 'Ensure environmental officer present']
    }
  ],
  agentCapacityUtilization: [
    {
      agentId: 'AGENT001',
      agentName: 'James Okonkwo',
      utilizationRate: 64.0,
      assignedCollections: 2,
      availableCapacity: 180,
      overbookedCollections: 0,
      performanceScore: 96.5
    },
    {
      agentId: 'AGENT003',
      agentName: 'Chukwuemeka Okafor',
      utilizationRate: 85.0,
      assignedCollections: 2,
      availableCapacity: 120,
      overbookedCollections: 1,
      performanceScore: 89.5
    },
    {
      agentId: 'AGENT004',
      agentName: 'David Adeyemi',
      utilizationRate: 75.0,
      assignedCollections: 1,
      availableCapacity: 150,
      overbookedCollections: 0,
      performanceScore: 97.8
    }
  ],
  recurringReliability: [
    {
      clientId: 'ENT001',
      clientName: 'TechHub Nigeria Ltd',
      scheduleType: 'Weekly (Mon/Wed/Fri)',
      totalOccurrences: 45,
      completedOnTime: 43,
      delayedOccurrences: 2,
      missedOccurrences: 0,
      reliabilityScore: 95.6,
      averageDelay: 15
    },
    {
      clientId: 'ENT002',
      clientName: 'Lagos Manufacturing Complex',
      scheduleType: 'Daily',
      totalOccurrences: 30,
      completedOnTime: 25,
      delayedOccurrences: 4,
      missedOccurrences: 1,
      reliabilityScore: 83.3,
      averageDelay: 45
    }
  ],
  missedRescheduledTrend: [
    {
      period: '2024-W03',
      missedCollections: 1,
      rescheduledCollections: 3,
      totalCollections: 25,
      missedRate: 4.0,
      rescheduledRate: 12.0,
      primaryReasons: ['Agent availability', 'Client request', 'Weather']
    },
    {
      period: '2024-W04',
      missedCollections: 0,
      rescheduledCollections: 2,
      totalCollections: 28,
      missedRate: 0.0,
      rescheduledRate: 7.1,
      primaryReasons: ['Client request', 'Schedule optimization']
    }
  ]
};

// Helper functions
export const getCollectionStatusColor = (status: CollectionStatus): string => {
  switch (status) {
    case 'scheduled': return '#3b82f6';
    case 'assigned': return '#10b981';
    case 'rescheduled': return '#f59e0b';
    case 'at_risk': return '#f97316';
    case 'cancelled': return '#ef4444';
    default: return '#6b7280';
  }
};

export const getCollectionTypeColor = (type: CollectionType): string => {
  switch (type) {
    case 'recurring': return '#10b981';
    case 'one_off': return '#3b82f6';
    default: return '#6b7280';
  }
};

export const getWasteTypeColor = (type: WasteType): string => {
  switch (type) {
    case 'paper': return '#3b82f6';
    case 'plastic': return '#f59e0b';
    case 'metal': return '#6b7280';
    case 'glass': return '#06b6d4';
    case 'organic': return '#10b981';
    case 'e_waste': return '#8b5cf6';
    case 'hazardous': return '#ef4444';
    case 'textile': return '#ec4899';
    case 'wood': return '#92400e';
    case 'industrial': return '#7c3aed';
    default: return '#6b7280';
  }
};

export const getSLARiskColor = (risk: SLARisk): string => {
  switch (risk) {
    case 'low': return '#10b981';
    case 'medium': return '#f59e0b';
    case 'high': return '#f97316';
    case 'critical': return '#ef4444';
    default: return '#6b7280';
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'low': return '#6b7280';
    case 'medium': return '#3b82f6';
    case 'high': return '#f59e0b';
    case 'urgent': return '#ef4444';
    default: return '#6b7280';
  }
};

export const formatWeight = (kg: number): string => {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)} tons`;
  }
  return `${kg.toLocaleString()} kg`;
};

export const formatDuration = (minutes: number): string => {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
  return `${minutes}m`;
};

export const getDaysUntilCollection = (scheduledDate: string): number => {
  const scheduled = new Date(scheduledDate);
  const today = new Date();
  const diffTime = scheduled.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isCollectionToday = (scheduledDate: string): boolean => {
  const scheduled = new Date(scheduledDate);
  const today = new Date();
  return scheduled.toDateString() === today.toDateString();
};

export const isCollectionOverdue = (scheduledDate: string, scheduledTime: string): boolean => {
  const scheduled = new Date(`${scheduledDate}T${scheduledTime}`);
  const now = new Date();
  return scheduled < now;
};
