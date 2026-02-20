// Audit Logs System Types

export type ActorType = 'admin' | 'system';
export type ActionType =
  | 'create'
  | 'update'
  | 'delete'
  | 'approve'
  | 'reject'
  | 'override'
  | 'payout'
  | 'reversal'
  | 'adjustment'
  | 'resolve'
  | 'escalate'
  | 'enforce'
  | 'permission_change'
  | 'login'
  | 'export';

export type EntityType =
  | 'pickup'
  | 'payout'
  | 'contract'
  | 'user'
  | 'agent'
  | 'enterprise'
  | 'dispute'
  | 'fraud_flag'
  | 'pricing'
  | 'role'
  | 'system_config'
  | 'report';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type EventSource = 'web' | 'api' | 'system_job' | 'mobile' | 'cli';

export interface AuditLog {
  id: string;
  timestamp: string;

  // Actor
  actor: AuditActor;

  // Action
  actionType: ActionType;
  actionLabel: string;

  // Entity
  entityType: EntityType;
  entityId: string;
  entityLabel: string;

  // Change
  changeSummary: string;
  changeDetails: ChangeDetail[];

  // Source
  source: EventSource;
  ipAddress: string;
  device: string;
  sessionId: string;

  // Risk
  riskLevel: RiskLevel;

  // Context
  reason?: string;
  linkedEntities: LinkedEntity[];

  // Metadata
  durationMs?: number;
  success: boolean;
  errorMessage?: string;
}

export interface AuditActor {
  id: string;
  name: string;
  type: ActorType;
  role: string;
  email?: string;
}

export interface ChangeDetail {
  field: string;
  before: string;
  after: string;
}

export interface LinkedEntity {
  type: EntityType;
  id: string;
  label: string;
}

// Summary types
export interface AuditLogSummary {
  totalLoggedActions: number;
  adminActions: number;
  systemActions: number;
  financialActions: number;
  highRiskActions: number;
  lastLoggedEvent: string;
  todayActions: number;
  weekActions: number;
}

// Chart / Insight types
export interface HighRiskTrendData {
  date: string;
  high: number;
  critical: number;
}

export interface AdminActivityData {
  adminName: string;
  actionCount: number;
  highRiskCount: number;
  lastActive: string;
}

export interface OffHoursActivity {
  hour: number;
  count: number;
  isOffHours: boolean;
}

export interface OverridePattern {
  adminName: string;
  overrideCount: number;
  entityTypes: string[];
  lastOverride: string;
}

// Filter types
export interface AuditLogFilters {
  actorType: ActorType | '';
  actionType: ActionType | '';
  entityType: EntityType | '';
  riskLevel: RiskLevel | '';
  dateRange: {
    start: string;
    end: string;
  };
  search: string;
}
