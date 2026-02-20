// Account Activity Types

export type ActivityAction =
  | 'login'
  | 'logout'
  | 'password_change'
  | 'two_factor_change'
  | 'profile_update'
  | 'approval'
  | 'rejection'
  | 'override'
  | 'escalation'
  | 'sensitive_view'
  | 'setting_change'
  | 'session_terminated'
  | 'failed_login'
  | 'user_action'
  | 'agent_action'
  | 'finance_action'
  | 'zone_action'
  | 'pricing_action';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type ActivitySource = 'web' | 'api' | 'mobile' | 'system';
export type ActivityOutcome = 'success' | 'failed' | 'pending';

export interface ActivityEvent {
  id: string;
  timestamp: string;
  action: ActivityAction;
  actionLabel: string;
  description: string;
  entityType: string;
  entityId: string;
  entityName: string;
  outcome: ActivityOutcome;
  riskLevel: RiskLevel;
  source: ActivitySource;
  ipAddress: string;
  device: string;
  location: string;
  beforeState?: string;
  afterState?: string;
  reason?: string;
  auditRef?: string;
}

export interface ActivitySummary {
  recentLogins: number;
  actionsPerformed: number;
  sensitiveActions: number;
  distinctLocations: number;
  lastActivityTime: string;
}

export interface SecuritySignal {
  id: string;
  type: 'unusual_time' | 'new_device' | 'failed_login' | 'location_anomaly';
  severity: 'warning' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  acknowledged: boolean;
}
