import { AgentAssignment, AssignmentSummary, AssignmentQualityInsights, AssignmentStatus, AgentType, SLARisk } from './types';

// Mock Agent Assignments Data
export const mockAgentAssignments: AgentAssignment[] = [
  {
    id: 'ASSIGN001',
    assignmentId: 'ASG-2024-001',
    collectionId: 'COLL001',
    clientId: 'ENT001',
    clientName: 'TechHub Nigeria Ltd',
    contractId: 'CONTRACT001',
    contractNumber: 'EC-2024-001',
    status: 'confirmed' as AssignmentStatus,
    agentType: 'individual' as AgentType,
    primaryAgent: {
      agentId: 'AGENT001',
      agentName: 'James Okonkwo',
      agentType: 'individual',
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
        enterpriseReliabilityScore: 96.5,
        onTimeRate: 97.2,
        completionRate: 98.5,
        averageRating: 4.8,
        totalEnterpriseJobs: 45,
        successfulEnterpriseJobs: 44
      },
      vehicleInfo: {
        type: 'Van',
        plate: 'RECLIQ-001',
        capacity: 500,
        equipment: ['Hand truck', 'Safety gear', 'Communication device']
      },
      compliance: {
        certifications: ['Hazardous Waste Handling', 'Safety Training', 'Defensive Driving'],
        backgroundCheck: true,
        insuranceValid: true,
        trainingCompleted: true
      },
      availability: {
        status: 'available',
        nextAvailableTime: '08:00'
      }
    },
    backupAgent: {
      agentId: 'AGENT002',
      agentName: 'Amina Yusuf',
      agentType: 'individual',
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
        enterpriseReliabilityScore: 94.2,
        onTimeRate: 95.1,
        completionRate: 96.8,
        averageRating: 4.6,
        totalEnterpriseJobs: 32,
        successfulEnterpriseJobs: 31
      },
      vehicleInfo: {
        type: 'Van',
        plate: 'RECLIQ-002',
        capacity: 400,
        equipment: ['Hand truck', 'Safety gear']
      },
      compliance: {
        certifications: ['Safety Training', 'Defensive Driving'],
        backgroundCheck: true,
        insuranceValid: true,
        trainingCompleted: true
      },
      availability: {
        status: 'available'
      }
    },
    scheduledDate: '2024-01-27',
    scheduledTime: '09:00',
    estimatedDuration: 45,
    slaWindow: {
      start: '08:00',
      end: '12:00'
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
        type: 'paper',
        estimatedWeight: 45,
        specialHandling: ['Confidential documents'],
        equipmentRequired: ['Secure bins', 'Sealed containers']
      },
      {
        type: 'e_waste',
        estimatedWeight: 15,
        specialHandling: ['Data destruction required'],
        equipmentRequired: ['Anti-static containers']
      },
      {
        type: 'plastic',
        estimatedWeight: 25,
        specialHandling: [],
        equipmentRequired: ['Standard bins']
      }
    ],
    estimatedVolume: 85,
    specialRequirements: ['Confidential document handling', 'Data destruction certification'],
    slaRisk: 'low' as SLARisk,
    riskFactors: [],
    assignedAt: '2024-01-26T14:30:00Z',
    confirmedAt: '2024-01-26T16:45:00Z',
    createdAt: '2024-01-26T14:30:00Z',
    reassignedCount: 0,
    lastModifiedBy: 'OPS_MGR001',
    notes: ['Agent confirmed readiness', 'Equipment checked and ready', 'Client notified of assignment'],
    performanceRating: 4.8
  },
  {
    id: 'ASSIGN002',
    assignmentId: 'ASG-2024-002',
    collectionId: 'COLL002',
    clientId: 'ENT002',
    clientName: 'Lagos Manufacturing Complex',
    contractId: 'CONTRACT002',
    contractNumber: 'EC-2024-002',
    status: 'in_progress' as AssignmentStatus,
    agentType: 'fleet' as AgentType,
    fleetInfo: {
      fleetId: 'FLEET001',
      fleetName: 'Industrial Response Team',
      fleetType: 'Heavy Equipment',
      leadAgent: {
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
          enterpriseReliabilityScore: 89.5,
          onTimeRate: 91.2,
          completionRate: 93.5,
          averageRating: 4.3,
          totalEnterpriseJobs: 28,
          successfulEnterpriseJobs: 26
        },
        vehicleInfo: {
          type: 'Truck',
          plate: 'PARTNER-001',
          capacity: 800,
          equipment: ['Crane', 'Heavy lifting gear', 'Safety equipment']
        },
        compliance: {
          certifications: ['Heavy Equipment Operation', 'Hazardous Materials', 'Industrial Safety'],
          backgroundCheck: true,
          insuranceValid: true,
          trainingCompleted: true
        },
        availability: {
          status: 'busy',
          currentAssignment: 'ASG-2024-002'
        }
      },
      supportAgents: [
        {
          agentId: 'AGENT004',
          agentName: 'David Adeyemi',
          agentType: 'individual',
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
            enterpriseReliabilityScore: 92.8,
            onTimeRate: 94.5,
            completionRate: 96.2,
            averageRating: 4.7,
            totalEnterpriseJobs: 18,
            successfulEnterpriseJobs: 17
          },
          vehicleInfo: {
            type: 'Support Truck',
            plate: 'RECLIQ-003',
            capacity: 600,
            equipment: ['Hand tools', 'Safety gear']
          },
          compliance: {
            certifications: ['Safety Training', 'First Aid'],
            backgroundCheck: true,
            insuranceValid: true,
            trainingCompleted: true
          },
          availability: {
            status: 'busy',
            currentAssignment: 'ASG-2024-002'
          }
        }
      ],
      vehicles: [
        {
          vehicleId: 'VEH001',
          type: 'Heavy Truck',
          plate: 'PARTNER-001',
          capacity: 800,
          driver: {
            id: 'DRV001',
            name: 'Michael Bello',
            phone: '+2348054321098'
          },
          equipment: ['Crane', 'Heavy lifting gear', 'Safety equipment'],
          status: 'active'
        },
        {
          vehicleId: 'VEH002',
          type: 'Support Truck',
          plate: 'RECLIQ-003',
          capacity: 600,
          driver: {
            id: 'DRV002',
            name: 'John Ibrahim',
            phone: '+2348076543210'
          },
          equipment: ['Hand tools', 'Safety gear'],
          status: 'active'
        }
      ],
      capacity: {
        maxWeight: 1400,
        maxVolume: 27
      },
      currentLoad: 1130,
      availability: {
        status: 'busy'
      }
    },
    scheduledDate: '2024-01-27',
    scheduledTime: '07:00',
    estimatedDuration: 90,
    slaWindow: {
      start: '06:00',
      end: '09:00'
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
        type: 'metal',
        estimatedWeight: 250,
        specialHandling: ['Heavy equipment required'],
        equipmentRequired: ['Industrial bins', 'Crane access']
      },
      {
        type: 'industrial',
        estimatedWeight: 180,
        specialHandling: ['Hazardous material handling'],
        equipmentRequired: ['Sealed containers', 'Spill kit']
      },
      {
        type: 'plastic',
        estimatedWeight: 120,
        specialHandling: ['Industrial plastic waste'],
        equipmentRequired: ['Large capacity bins']
      }
    ],
    estimatedVolume: 550,
    specialRequirements: ['Hazardous waste handling certification', 'Early morning access', 'Heavy equipment'],
    slaRisk: 'high' as SLARisk,
    riskFactors: [
      {
        factorId: 'RISK001',
        type: 'capacity_mismatch',
        severity: 'high',
        description: 'Fleet current load exceeds optimal capacity',
        impact: 'Potential delay in collection completion',
        mitigation: 'Monitor progress and provide additional support if needed',
        detectedAt: '2024-01-27T06:30:00Z'
      },
      {
        factorId: 'RISK002',
        type: 'schedule_conflict',
        severity: 'medium',
        description: 'Collection time conflicts with peak factory operations',
        impact: 'Access delays possible',
        mitigation: 'Coordinate with factory manager for access',
        detectedAt: '2024-01-27T06:00:00Z'
      }
    ],
    assignedAt: '2024-01-26T15:00:00Z',
    confirmedAt: '2024-01-26T17:30:00Z',
    createdAt: '2024-01-26T15:00:00Z',
    reassignedCount: 1,
    lastModifiedBy: 'OPS_MGR002',
    notes: ['Fleet assignment confirmed', 'Heavy equipment ready', 'Access coordinated with factory'],
    actualDuration: 85,
    actualVolume: 565
  },
  {
    id: 'ASSIGN003',
    assignmentId: 'ASG-2024-003',
    collectionId: 'COLL003',
    clientId: 'ENT003',
    clientName: 'EcoTech Solutions',
    contractId: 'CONTRACT003',
    contractNumber: 'EC-2024-003',
    status: 'unassigned' as AssignmentStatus,
    agentType: 'individual' as AgentType,
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
        type: 'paper',
        estimatedWeight: 35,
        specialHandling: ['Office documents'],
        equipmentRequired: ['Standard bins']
      },
      {
        type: 'e_waste',
        estimatedWeight: 20,
        specialHandling: ['Electronic equipment'],
        equipmentRequired: ['Anti-static containers']
      },
      {
        type: 'plastic',
        estimatedWeight: 15,
        specialHandling: [],
        equipmentRequired: ['Standard bins']
      }
    ],
    estimatedVolume: 70,
    specialRequirements: ['Office environment cleanup', 'Data security for e-waste'],
    slaRisk: 'medium' as SLARisk,
    riskFactors: [
      {
        factorId: 'RISK003',
        type: 'agent_availability',
        severity: 'medium',
        description: 'Limited agent availability in Abuja zone',
        impact: 'May delay assignment confirmation',
        mitigation: 'Consider partner agents or fleet assignment',
        detectedAt: '2024-01-27T09:00:00Z'
      }
    ],
    createdAt: '2024-01-27T09:00:00Z',
    reassignedCount: 0,
    lastModifiedBy: 'OPS_MGR003',
    notes: ['Pending assignment - Abuja zone', 'Requires data security clearance for e-waste']
  },
  {
    id: 'ASSIGN004',
    assignmentId: 'ASG-2024-004',
    collectionId: 'COLL004',
    clientId: 'ENT001',
    clientName: 'TechHub Nigeria Ltd',
    contractId: 'CONTRACT001',
    contractNumber: 'EC-2024-001',
    status: 'assigned' as AssignmentStatus,
    agentType: 'individual' as AgentType,
    primaryAgent: {
      agentId: 'AGENT005',
      agentName: 'Funke Adekunle',
      agentType: 'individual',
      contact: {
        phone: '+2348098765432',
        email: 'funke.adekunle@recliq.com'
      },
      capacity: {
        maxWeight: 450,
        maxVolume: 9,
        availableTime: ['09:00-18:00']
      },
      currentLoad: 380,
      performance: {
        enterpriseReliabilityScore: 91.8,
        onTimeRate: 93.5,
        completionRate: 95.2,
        averageRating: 4.5,
        totalEnterpriseJobs: 22,
        successfulEnterpriseJobs: 21
      },
      vehicleInfo: {
        type: 'Van',
        plate: 'RECLIQ-004',
        capacity: 450,
        equipment: ['Hand truck', 'Safety gear', 'Communication device']
      },
      compliance: {
        certifications: ['Safety Training', 'Defensive Driving'],
        backgroundCheck: true,
        insuranceValid: true,
        trainingCompleted: true
      },
      availability: {
        status: 'available'
      }
    },
    scheduledDate: '2024-01-29',
    scheduledTime: '10:00',
    estimatedDuration: 45,
    slaWindow: {
      start: '08:00',
      end: '12:00'
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
        type: 'paper',
        estimatedWeight: 40,
        specialHandling: ['Office documents'],
        equipmentRequired: ['Standard bins']
      },
      {
        type: 'plastic',
        estimatedWeight: 20,
        specialHandling: [],
        equipmentRequired: ['Standard bins']
      },
      {
        type: 'organic',
        estimatedWeight: 15,
        specialHandling: ['Food waste'],
        equipmentRequired: ['Sealed containers']
      }
    ],
    estimatedVolume: 75,
    specialRequirements: ['Regular office waste'],
    slaRisk: 'low' as SLARisk,
    riskFactors: [],
    assignedAt: '2024-01-27T11:00:00Z',
    createdAt: '2024-01-27T11:00:00Z',
    reassignedCount: 0,
    lastModifiedBy: 'OPS_MGR001',
    notes: ['Agent assigned - awaiting confirmation', 'Standard office collection']
  },
  {
    id: 'ASSIGN005',
    assignmentId: 'ASG-2024-005',
    collectionId: 'COLL005',
    clientId: 'ENT002',
    clientName: 'Lagos Manufacturing Complex',
    contractId: 'CONTRACT002',
    contractNumber: 'EC-2024-002',
    status: 'failed' as AssignmentStatus,
    agentType: 'fleet' as AgentType,
    primaryAgent: {
      agentId: 'AGENT006',
      agentName: 'Samuel Ojo',
      agentType: 'individual',
      contact: {
        phone: '+2348087654321',
        email: 'samuel.ojo@recliq.com'
      },
      capacity: {
        maxWeight: 500,
        maxVolume: 10,
        availableTime: ['07:00-16:00']
      },
      currentLoad: 420,
      performance: {
        enterpriseReliabilityScore: 78.5,
        onTimeRate: 82.1,
        completionRate: 85.3,
        averageRating: 3.9,
        totalEnterpriseJobs: 15,
        successfulEnterpriseJobs: 13
      },
      vehicleInfo: {
        type: 'Truck',
        plate: 'RECLIQ-005',
        capacity: 500,
        equipment: ['Hand truck', 'Safety gear']
      },
      compliance: {
        certifications: ['Safety Training'],
        backgroundCheck: true,
        insuranceValid: true,
        trainingCompleted: false
      },
      availability: {
        status: 'unavailable'
      }
    },
    scheduledDate: '2024-01-26',
    scheduledTime: '08:00',
    estimatedDuration: 60,
    slaWindow: {
      start: '06:00',
      end: '10:00'
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
        type: 'hazardous',
        estimatedWeight: 100,
        specialHandling: ['Hazardous material certification required'],
        equipmentRequired: ['UN-approved containers', 'Spill containment']
      },
      {
        type: 'metal',
        estimatedWeight: 150,
        specialHandling: ['Heavy equipment'],
        equipmentRequired: ['Industrial bins', 'Crane access']
      }
    ],
    estimatedVolume: 250,
    specialRequirements: ['Hazardous waste specialist required', 'Environmental clearance needed'],
    slaRisk: 'critical' as SLARisk,
    riskFactors: [
      {
        factorId: 'RISK004',
        type: 'compliance_issue',
        severity: 'critical',
        description: 'Agent lacks hazardous waste handling certification',
        impact: 'Cannot complete collection safely',
        mitigation: 'Reassign to certified agent or fleet',
        detectedAt: '2024-01-26T07:30:00Z',
        resolvedAt: '2024-01-26T09:15:00Z'
      },
      {
        factorId: 'RISK005',
        type: 'equipment_shortage',
        severity: 'high',
        description: 'Required hazardous waste containers not available',
        impact: 'Collection cannot proceed safely',
        mitigation: 'Procure required equipment or reassign',
        detectedAt: '2024-01-26T07:45:00Z',
        resolvedAt: '2024-01-26T09:30:00Z'
      }
    ],
    assignedAt: '2024-01-25T16:00:00Z',
    completedAt: '2024-01-26T09:30:00Z',
    createdAt: '2024-01-25T16:00:00Z',
    reassignedCount: 2,
    lastModifiedBy: 'OPS_MGR002',
    notes: ['Failed due to compliance issues', 'Agent not certified for hazardous waste', 'Equipment shortage', 'Reassigned to specialized fleet'],
    completionNotes: 'Assignment failed - agent lacked required certifications and equipment. Reassigned to specialized hazardous waste team.',
    performanceRating: 2.1
  }
];

// Mock Assignment Summary
export const mockAssignmentSummary: AssignmentSummary = {
  assignedCollections: 4,
  pendingAssignments: 1,
  confirmedAgents: 2,
  atRiskAssignments: 2,
  reassignments: 3,
  unassignedJobs: 1,
  totalVolume: 1030, // kg
  avgAgentReliability: 89.2,
  completionRate: 80.0,
  slaBreachRate: 20.0
};

// Mock Assignment Quality Insights
export const mockAssignmentQualityInsights: AssignmentQualityInsights = {
  agentReliabilityScores: [
    {
      agentId: 'AGENT001',
      agentName: 'James Okonkwo',
      agentType: 'individual',
      reliabilityScore: 96.5,
      totalAssignments: 45,
      completedAssignments: 44,
      onTimeAssignments: 43,
      averageRating: 4.8,
      specializations: ['Office Waste', 'E-Waste', 'Confidential Documents'],
      lastAssignmentDate: '2024-01-27',
      trend: 'stable'
    },
    {
      agentId: 'AGENT003',
      agentName: 'Chukwuemeka Okafor',
      agentType: 'partner',
      reliabilityScore: 89.5,
      totalAssignments: 28,
      completedAssignments: 26,
      onTimeAssignments: 25,
      averageRating: 4.3,
      specializations: ['Industrial Waste', 'Heavy Equipment', 'Hazardous Materials'],
      lastAssignmentDate: '2024-01-27',
      trend: 'improving'
    },
    {
      agentId: 'AGENT005',
      agentName: 'Funke Adekunle',
      agentType: 'individual',
      reliabilityScore: 91.8,
      totalAssignments: 22,
      completedAssignments: 21,
      onTimeAssignments: 20,
      averageRating: 4.5,
      specializations: ['Office Waste', 'General Collections'],
      lastAssignmentDate: '2024-01-27',
      trend: 'stable'
    },
    {
      agentId: 'AGENT006',
      agentName: 'Samuel Ojo',
      agentType: 'individual',
      reliabilityScore: 78.5,
      totalAssignments: 15,
      completedAssignments: 13,
      onTimeAssignments: 12,
      averageRating: 3.9,
      specializations: ['General Collections'],
      lastAssignmentDate: '2024-01-26',
      trend: 'declining'
    }
  ],
  assignmentCompletionRates: [
    {
      period: '2024-W03',
      totalAssignments: 25,
      completedAssignments: 22,
      failedAssignments: 3,
      completionRate: 88.0,
      avgCompletionTime: 52,
      slaComplianceRate: 84.0
    },
    {
      period: '2024-W04',
      totalAssignments: 30,
      completedAssignments: 24,
      failedAssignments: 6,
      completionRate: 80.0,
      avgCompletionTime: 58,
      slaComplianceRate: 76.7
    }
  ],
  reassignmentFrequency: [
    {
      agentId: 'AGENT006',
      agentName: 'Samuel Ojo',
      totalReassignments: 5,
      reassignmentRate: 33.3,
      commonReasons: ['Compliance issues', 'Equipment shortage', 'Capacity constraints'],
      avgTimeToReassign: 2.5,
      impactOnSLA: 15.2
    },
    {
      agentId: 'AGENT003',
      agentName: 'Chukwuemeka Okafor',
      totalReassignments: 2,
      reassignmentRate: 7.1,
      commonReasons: ['Schedule conflicts', 'Capacity constraints'],
      avgTimeToReassign: 1.2,
      impactOnSLA: 5.8
    }
  ],
  slaBreachCorrelation: [
    {
      factor: 'Compliance Issues',
      breachCount: 8,
      totalAssignments: 12,
      breachRate: 66.7,
      avgDelay: 45,
      preventionActions: ['Pre-assignment compliance checks', 'Required certification tracking']
    },
    {
      factor: 'Equipment Shortage',
      breachCount: 5,
      totalAssignments: 18,
      breachRate: 27.8,
      avgDelay: 32,
      preventionActions: ['Equipment inventory management', 'Pre-assignment equipment checks']
    },
    {
      factor: 'Capacity Constraints',
      breachCount: 3,
      totalAssignments: 25,
      breachRate: 12.0,
      avgDelay: 25,
      preventionActions: ['Load balancing', 'Capacity planning']
    }
  ]
};

// Helper functions
export const getAssignmentStatusColor = (status: AssignmentStatus): string => {
  switch (status) {
    case 'unassigned': return '#ef4444';
    case 'assigned': return '#f59e0b';
    case 'confirmed': return '#3b82f6';
    case 'in_progress': return '#8b5cf6';
    case 'completed': return '#10b981';
    case 'failed': return '#ef4444';
    default: return '#6b7280';
  }
};

export const getAgentTypeColor = (type: AgentType): string => {
  switch (type) {
    case 'individual': return '#3b82f6';
    case 'fleet': return '#10b981';
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

export const getReliabilityColor = (score: number): string => {
  if (score >= 90) return '#10b981';
  if (score >= 80) return '#3b82f6';
  if (score >= 70) return '#f59e0b';
  return '#ef4444';
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

export const getDaysUntilAssignment = (scheduledDate: string): number => {
  const scheduled = new Date(scheduledDate);
  const today = new Date();
  const diffTime = scheduled.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isAssignmentOverdue = (scheduledTime: string, status: AssignmentStatus): boolean => {
  if (status === 'completed' || status === 'failed') return false;
  const scheduled = new Date(scheduledTime);
  const now = new Date();
  return scheduled < now;
};

export const getSLABreachRisk = (scheduledTime: string, slaWindow: { start: string; end: string }): SLARisk => {
  const now = new Date();
  const scheduled = new Date(scheduledTime);
  const [slaHour, slaMinute] = slaWindow.end.split(':').map(Number);
  const slaEndTime = new Date(scheduled);
  slaEndTime.setHours(slaHour, slaMinute);
  
  if (now > slaEndTime) return 'critical';
  
  const timeToSLA = slaEndTime.getTime() - now.getTime();
  const hoursToSLA = timeToSLA / (1000 * 60 * 60);
  
  if (hoursToSLA < 2) return 'high';
  if (hoursToSLA < 6) return 'medium';
  return 'low';
};
