// Scheduled Collections System Types

export type CollectionStatus = 'scheduled' | 'assigned' | 'rescheduled' | 'at_risk' | 'cancelled';
export type CollectionType = 'recurring' | 'one_off';
export type WasteType = 'paper' | 'plastic' | 'metal' | 'glass' | 'organic' | 'e_waste' | 'hazardous' | 'textile' | 'wood' | 'industrial';
export type SLARisk = 'low' | 'medium' | 'high' | 'critical';
export type ViewMode = 'calendar' | 'timeline' | 'list';
export type DateRange = 'today' | 'week' | 'month' | 'custom';

export interface ScheduledCollection {
  id: string;
  collectionId: string;
  clientId: string;
  clientName: string;
  contractId: string;
  contractNumber: string;
  collectionType: CollectionType;
  status: CollectionStatus;
  
  // Schedule details
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number; // minutes
  slaWindow: {
    start: string;
    end: string;
  };
  recurrencePattern?: RecurrencePattern;
  
  // Location details
  location: CollectionLocation;
  city: string;
  zone: string;
  
  // Waste details
  wasteCategories: WasteCategory[];
  estimatedVolume: number; // kg
  specialRequirements: string[];
  
  // Assignment details
  assignedAgent?: AgentAssignment;
  backupAgent?: AgentAssignment;
  fleetAssignment?: FleetAssignment;
  
  // Risk assessment
  slaRisk: SLARisk;
  riskFactors: RiskFactor[];
  
  // Execution details
  priority: 'low' | 'medium' | 'high' | 'urgent';
  accessInstructions: string;
  contactPerson: ContactPerson;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastModifiedBy: string;
  rescheduleCount: number;
  notes: string[];
}

export interface RecurrencePattern {
  type: 'daily' | 'weekly' | 'bi_weekly' | 'monthly' | 'custom';
  frequency: number; // every X days/weeks
  daysOfWeek?: number[]; // 0-6 (Sunday-Saturday)
  endDate?: string;
  occurrences?: number;
  exceptions: string[]; // dates to skip
}

export interface CollectionLocation {
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
  type: WasteType;
  estimatedWeight: number; // kg
  specialHandling: string[];
  containerRequirements: string[];
}

export interface AgentAssignment {
  agentId: string;
  agentName: string;
  agentType: 'internal' | 'partner';
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
    onTimeRate: number;
    completionRate: number;
    averageRating: number;
  };
  vehicleInfo: {
    type: string;
    plate: string;
    capacity: number; // kg
  };
}

export interface FleetAssignment {
  fleetId: string;
  fleetName: string;
  vehicleType: string;
  capacity: number; // kg
  driver: {
    id: string;
    name: string;
    phone: string;
  };
  availability: {
    startTime: string;
    endTime: string;
    status: 'available' | 'busy' | 'maintenance';
  };
}

export interface RiskFactor {
  factorId: string;
  type: 'agent_availability' | 'capacity_mismatch' | 'schedule_conflict' | 'sla_breach' | 'weather' | 'access_issue';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: string;
  mitigation: string;
  detectedAt: string;
  resolvedAt?: string;
}

export interface ContactPerson {
  name: string;
  title: string;
  phone: string;
  email: string;
  isPrimary: boolean;
}

export interface CollectionFilters {
  dateRange: DateRange;
  customDateRange: {
    start: string;
    end: string;
  };
  city: string;
  zone: string;
  clientId: string;
  collectionType: CollectionType | '';
  slaRisk: SLARisk | '';
  assignedAgent: string;
  wasteType: WasteType | '';
  status: CollectionStatus | '';
  search: string;
}

export interface CollectionsSummary {
  upcomingCollections: number;
  activeEnterpriseClients: number;
  agentsAssigned: number;
  atRiskCollections: number;
  recurringSchedules: number;
  avgLeadTime: number; // hours
  totalEstimatedVolume: number; // kg
  highPriorityCollections: number;
  unassignedCollections: number;
}

export interface SLARiskInsights {
  riskForecast: RiskForecast[];
  agentCapacityUtilization: AgentCapacityUtilization[];
  recurringReliability: RecurringReliability[];
  missedRescheduledTrend: MissedRescheduledTrend[];
}

export interface RiskForecast {
  date: string;
  riskLevel: SLARisk;
  collectionsAtRisk: number;
  primaryRiskFactors: string[];
  recommendedActions: string[];
}

export interface AgentCapacityUtilization {
  agentId: string;
  agentName: string;
  utilizationRate: number; // percentage
  assignedCollections: number;
  availableCapacity: number; // kg
  overbookedCollections: number;
  performanceScore: number;
}

export interface RecurringReliability {
  clientId: string;
  clientName: string;
  scheduleType: string;
  totalOccurrences: number;
  completedOnTime: number;
  delayedOccurrences: number;
  missedOccurrences: number;
  reliabilityScore: number; // percentage
  averageDelay: number; // minutes
}

export interface MissedRescheduledTrend {
  period: string;
  missedCollections: number;
  rescheduledCollections: number;
  totalCollections: number;
  missedRate: number; // percentage
  rescheduledRate: number; // percentage
  primaryReasons: string[];
}

export interface CollectionDetail {
  collection: ScheduledCollection;
  assignmentHistory: AssignmentHistory[];
  rescheduleHistory: RescheduleHistory[];
  riskAssessment: RiskAssessment;
  executionPlan: ExecutionPlan;
  communicationLog: CommunicationLog[];
}

export interface AssignmentHistory {
  assignmentId: string;
  timestamp: string;
  assignedTo: string;
  assignedBy: string;
  reason: string;
  previousAssignment?: string;
  type: 'agent' | 'fleet' | 'backup';
}

export interface RescheduleHistory {
  rescheduleId: string;
  timestamp: string;
  originalDate: string;
  originalTime: string;
  newDate: string;
  newTime: string;
  reason: string;
  requestedBy: string;
  approvedBy: string;
  impactAssessment: string;
}

export interface RiskAssessment {
  assessmentId: string;
  timestamp: string;
  overallRisk: SLARisk;
  riskFactors: RiskFactor[];
  mitigationPlan: string;
  reviewRequired: boolean;
  reviewedBy?: string;
}

export interface ExecutionPlan {
  planId: string;
  created: string;
  steps: ExecutionStep[];
  estimatedDuration: number;
  requiredEquipment: string[];
  backupPlan: string;
}

export interface ExecutionStep {
  stepId: string;
  sequence: number;
  description: string;
  estimatedTime: number; // minutes
  dependencies: string[];
  assignedTo?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
}

export interface CommunicationLog {
  logId: string;
  timestamp: string;
  type: 'notification' | 'alert' | 'confirmation' | 'reminder';
  channel: 'email' | 'sms' | 'app' | 'phone';
  recipient: string;
  subject: string;
  message: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  sentBy: string;
}

// Helper types
export interface CreateCollectionRequest {
  clientId: string;
  locationId: string;
  scheduledDate: string;
  scheduledTime: string;
  wasteCategories: WasteCategory[];
  estimatedVolume: number;
  collectionType: CollectionType;
  recurrencePattern?: RecurrencePattern;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  accessInstructions: string;
  contactPerson: ContactPerson;
}

export interface UpdateCollectionRequest extends Partial<CreateCollectionRequest> {
  collectionId: string;
  reason: string;
  requiresApproval: boolean;
}

export interface AssignCollectionRequest {
  collectionId: string;
  agentId: string;
  fleetId?: string;
  backupAgentId?: string;
  reason: string;
  notifyClient: boolean;
}

export interface RescheduleCollectionRequest {
  collectionId: string;
  newDate: string;
  newTime: string;
  reason: string;
  notifyClient: boolean;
  requiresApproval: boolean;
}

export interface CollectionExportRequest {
  filters: CollectionFilters;
  format: 'csv' | 'excel' | 'pdf';
  includeAssignments: boolean;
  includeRiskAssessment: boolean;
  includeHistory: boolean;
}

// Enums and constants
export const COLLECTION_STATUS_LABELS = {
  scheduled: 'Scheduled',
  assigned: 'Assigned',
  rescheduled: 'Rescheduled',
  at_risk: 'At Risk',
  cancelled: 'Cancelled'
} as const;

export const COLLECTION_TYPE_LABELS = {
  recurring: 'Recurring',
  one_off: 'One-off'
} as const;

export const WASTE_TYPE_LABELS = {
  paper: 'Paper',
  plastic: 'Plastic',
  metal: 'Metal',
  glass: 'Glass',
  organic: 'Organic',
  e_waste: 'E-Waste',
  hazardous: 'Hazardous',
  textile: 'Textile',
  wood: 'Wood',
  industrial: 'Industrial'
} as const;

export const SLA_RISK_LABELS = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
  critical: 'Critical'
} as const;

export const VIEW_MODE_LABELS = {
  calendar: 'Calendar',
  timeline: 'Timeline',
  list: 'List'
} as const;

export const DATE_RANGE_LABELS = {
  today: 'Today',
  week: 'This Week',
  month: 'This Month',
  custom: 'Custom Range'
} as const;
