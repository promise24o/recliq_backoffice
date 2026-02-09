// Agent Assignments System Types

export type AssignmentStatus = 'unassigned' | 'assigned' | 'confirmed' | 'in_progress' | 'completed' | 'failed';
export type AgentType = 'individual' | 'fleet';
export type SLARisk = 'low' | 'medium' | 'high' | 'critical';
export type AssignmentView = 'timeline' | 'kanban' | 'table';

export interface AgentAssignment {
  id: string;
  assignmentId: string;
  collectionId: string;
  clientId: string;
  clientName: string;
  contractId: string;
  contractNumber: string;
  
  // Assignment details
  status: AssignmentStatus;
  agentType: AgentType;
  primaryAgent?: AgentInfo;
  backupAgent?: AgentInfo;
  fleetInfo?: FleetInfo;
  
  // Schedule details
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number; // minutes
  slaWindow: {
    start: string;
    end: string;
  };
  
  // Collection details
  location: AssignmentLocation;
  city: string;
  zone: string;
  wasteCategories: WasteCategory[];
  estimatedVolume: number; // kg
  specialRequirements: string[];
  
  // Risk assessment
  slaRisk: SLARisk;
  riskFactors: AssignmentRiskFactor[];
  
  // Assignment metadata
  assignedAt?: string;
  confirmedAt?: string;
  completedAt?: string;
  createdAt: string;
  reassignedCount: number;
  lastModifiedBy: string;
  notes: string[];
  
  // Performance tracking
  actualDuration?: number;
  actualVolume?: number;
  performanceRating?: number;
  completionNotes?: string;
}

export interface AgentInfo {
  agentId: string;
  agentName: string;
  agentType: 'individual' | 'partner';
  contact: {
    phone: string;
    email: string;
  };
  capacity: {
    maxWeight: number; // kg
    maxVolume: number; // m³
    availableTime: string[];
  };
  currentLoad: number; // kg
  performance: {
    enterpriseReliabilityScore: number;
    onTimeRate: number;
    completionRate: number;
    averageRating: number;
    totalEnterpriseJobs: number;
    successfulEnterpriseJobs: number;
  };
  vehicleInfo: {
    type: string;
    plate: string;
    capacity: number; // kg
    equipment: string[];
  };
  compliance: {
    certifications: string[];
    backgroundCheck: boolean;
    insuranceValid: boolean;
    trainingCompleted: boolean;
  };
  availability: {
    status: 'available' | 'busy' | 'off_duty' | 'unavailable';
    nextAvailableTime?: string;
    currentAssignment?: string;
  };
}

export interface FleetInfo {
  fleetId: string;
  fleetName: string;
  fleetType: string;
  leadAgent: AgentInfo;
  supportAgents: AgentInfo[];
  vehicles: FleetVehicle[];
  capacity: {
    maxWeight: number; // kg
    maxVolume: number; // m³
  };
  currentLoad: number; // kg
  availability: {
    status: 'available' | 'busy' | 'maintenance' | 'unavailable';
    nextAvailableTime?: string;
  };
}

export interface FleetVehicle {
  vehicleId: string;
  type: string;
  plate: string;
  capacity: number; // kg
  driver: {
    id: string;
    name: string;
    phone: string;
  };
  equipment: string[];
  status: 'active' | 'maintenance' | 'inactive';
}

export interface AssignmentLocation {
  locationId: string;
  name: string;
  address: {
    street: string;
    city: string;
    zone: string;
    state: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  accessInstructions: string;
  parkingInfo: string;
  buildingRestrictions: string[];
  preferredTime: string;
}

export interface WasteCategory {
  type: string;
  estimatedWeight: number; // kg
  specialHandling: string[];
  equipmentRequired: string[];
}

export interface AssignmentRiskFactor {
  factorId: string;
  type: 'agent_availability' | 'capacity_mismatch' | 'schedule_conflict' | 'sla_breach' | 'compliance_issue' | 'equipment_shortage';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: string;
  mitigation: string;
  detectedAt: string;
  resolvedAt?: string;
}

export interface AssignmentFilters {
  status: AssignmentStatus | '';
  agentType: AgentType | '';
  city: string;
  zone: string;
  agentId: string;
  clientId: string;
  slaRisk: SLARisk | '';
  dateRange: 'today' | 'week' | 'month' | 'custom';
  customDateRange: {
    start: string;
    end: string;
  };
  search: string;
}

export interface AssignmentSummary {
  assignedCollections: number;
  pendingAssignments: number;
  confirmedAgents: number;
  atRiskAssignments: number;
  reassignments: number;
  unassignedJobs: number;
  totalVolume: number; // kg
  avgAgentReliability: number;
  completionRate: number;
  slaBreachRate: number;
}

export interface AssignmentQualityInsights {
  agentReliabilityScores: AgentReliabilityScore[];
  assignmentCompletionRates: AssignmentCompletionRate[];
  reassignmentFrequency: ReassignmentFrequency[];
  slaBreachCorrelation: SLABreachCorrelation[];
}

export interface AgentReliabilityScore {
  agentId: string;
  agentName: string;
  agentType: string;
  reliabilityScore: number;
  totalAssignments: number;
  completedAssignments: number;
  onTimeAssignments: number;
  averageRating: number;
  specializations: string[];
  lastAssignmentDate: string;
  trend: 'improving' | 'stable' | 'declining';
}

export interface AssignmentCompletionRate {
  period: string;
  totalAssignments: number;
  completedAssignments: number;
  failedAssignments: number;
  completionRate: number;
  avgCompletionTime: number; // minutes
  slaComplianceRate: number;
}

export interface ReassignmentFrequency {
  agentId: string;
  agentName: string;
  totalReassignments: number;
  reassignmentRate: number;
  commonReasons: string[];
  avgTimeToReassign: number; // hours
  impactOnSLA: number; // percentage
}

export interface SLABreachCorrelation {
  factor: string;
  breachCount: number;
  totalAssignments: number;
  breachRate: number;
  avgDelay: number; // minutes
  preventionActions: string[];
}

export interface AssignmentDetail {
  assignment: AgentAssignment;
  collection: {
    collectionId: string;
    contractReference: string;
    clientRequirements: string[];
    specialInstructions: string[];
  };
  agent: {
    primaryAgent?: AgentInfo;
    backupAgent?: AgentInfo;
    fleetInfo?: FleetInfo;
    readinessCheck: ReadinessCheck;
  };
  riskAssessment: {
    overallRisk: SLARisk;
    riskFactors: AssignmentRiskFactor[];
    mitigationPlan: string;
    escalationPlan: string;
  };
  assignmentHistory: AssignmentHistory[];
  communications: AssignmentCommunication[];
}

export interface ReadinessCheck {
  checkId: string;
  timestamp: string;
  agentAvailability: boolean;
  capacityCheck: boolean;
  equipmentCheck: boolean;
  complianceCheck: boolean;
  overallReadiness: 'ready' | 'caution' | 'not_ready';
  issues: string[];
  checkedBy: string;
}

export interface AssignmentHistory {
  historyId: string;
  timestamp: string;
  action: 'created' | 'assigned' | 'reassigned' | 'confirmed' | 'cancelled' | 'completed' | 'failed';
  performedBy: string;
  details: string;
  previousValue?: string;
  newValue?: string;
  reason: string;
}

export interface AssignmentCommunication {
  communicationId: string;
  timestamp: string;
  type: 'notification' | 'confirmation' | 'alert' | 'escalation';
  channel: 'app' | 'sms' | 'email' | 'phone';
  recipient: string;
  subject: string;
  message: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  sentBy: string;
}

// Helper types
export interface CreateAssignmentRequest {
  collectionId: string;
  agentId?: string;
  fleetId?: string;
  agentType: AgentType;
  backupAgentId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  specialInstructions?: string;
  requiresConfirmation: boolean;
}

export interface UpdateAssignmentRequest extends Partial<CreateAssignmentRequest> {
  assignmentId: string;
  reason: string;
  requiresApproval: boolean;
}

export interface ReassignRequest {
  assignmentId: string;
  newAgentId?: string;
  newFleetId?: string;
  reason: string;
  notifyPreviousAgent: boolean;
  notifyNewAgent: boolean;
  requiresApproval: boolean;
}

export interface ConfirmAssignmentRequest {
  assignmentId: string;
  agentId: string;
  confirmationNotes?: string;
  estimatedArrivalTime?: string;
  equipmentReady: boolean;
  complianceReady: boolean;
}

export interface AssignmentExportRequest {
  filters: AssignmentFilters;
  format: 'csv' | 'excel' | 'pdf';
  includePerformanceData: boolean;
  includeRiskAssessment: boolean;
  includeHistory: boolean;
  dateRange: {
    start: string;
    end: string;
  };
}

// Enums and constants
export const ASSIGNMENT_STATUS_LABELS = {
  unassigned: 'Unassigned',
  assigned: 'Assigned',
  confirmed: 'Confirmed',
  in_progress: 'In Progress',
  completed: 'Completed',
  failed: 'Failed'
} as const;

export const AGENT_TYPE_LABELS = {
  individual: 'Individual',
  fleet: 'Fleet'
} as const;

export const SLA_RISK_LABELS = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
  critical: 'Critical'
} as const;

export const ASSIGNMENT_VIEW_LABELS = {
  timeline: 'Timeline',
  kanban: 'Kanban',
  table: 'Table'
} as const;

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
