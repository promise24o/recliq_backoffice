import type {
  AuditLog,
  AuditLogSummary,
  HighRiskTrendData,
  AdminActivityData,
  OffHoursActivity,
  OverridePattern,
  ActorType,
  ActionType,
  EntityType,
  RiskLevel,
  EventSource,
} from './types';

// ============================================================
// Color & Label Helpers
// ============================================================

export const getActorTypeColor = (type: ActorType): string => {
  const colors: Record<ActorType, string> = {
    admin: '#3B82F6',
    system: '#8B5CF6'
  };
  return colors[type] || '#6B7280';
};

export const getActionTypeColor = (type: ActionType): string => {
  const colors: Record<ActionType, string> = {
    create: '#10B981',
    update: '#3B82F6',
    delete: '#EF4444',
    approve: '#10B981',
    reject: '#EF4444',
    override: '#DC2626',
    payout: '#F59E0B',
    reversal: '#EF4444',
    adjustment: '#F59E0B',
    resolve: '#10B981',
    escalate: '#8B5CF6',
    enforce: '#DC2626',
    permission_change: '#EC4899',
    login: '#6B7280',
    export: '#6B7280'
  };
  return colors[type] || '#6B7280';
};

export const getEntityTypeColor = (type: EntityType): string => {
  const colors: Record<EntityType, string> = {
    pickup: '#10B981',
    payout: '#F59E0B',
    contract: '#3B82F6',
    user: '#6366F1',
    agent: '#EC4899',
    enterprise: '#8B5CF6',
    dispute: '#EF4444',
    fraud_flag: '#DC2626',
    pricing: '#F59E0B',
    role: '#EC4899',
    system_config: '#6B7280',
    report: '#3B82F6'
  };
  return colors[type] || '#6B7280';
};

export const getRiskLevelColor = (level: RiskLevel): string => {
  const colors: Record<RiskLevel, string> = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444',
    critical: '#7C3AED'
  };
  return colors[level] || '#6B7280';
};

export const getActionTypeLabel = (type: ActionType): string => {
  const labels: Record<ActionType, string> = {
    create: 'Create',
    update: 'Update',
    delete: 'Delete',
    approve: 'Approve',
    reject: 'Reject',
    override: 'Override',
    payout: 'Payout',
    reversal: 'Reversal',
    adjustment: 'Adjustment',
    resolve: 'Resolve',
    escalate: 'Escalate',
    enforce: 'Enforce',
    permission_change: 'Permission Change',
    login: 'Login',
    export: 'Export'
  };
  return labels[type] || type;
};

export const getEntityTypeLabel = (type: EntityType): string => {
  const labels: Record<EntityType, string> = {
    pickup: 'Pickup',
    payout: 'Payout',
    contract: 'Contract',
    user: 'User',
    agent: 'Agent',
    enterprise: 'Enterprise',
    dispute: 'Dispute',
    fraud_flag: 'Fraud Flag',
    pricing: 'Pricing',
    role: 'Role',
    system_config: 'System Config',
    report: 'Report'
  };
  return labels[type] || type;
};

export const getRiskLevelLabel = (level: RiskLevel): string => {
  const labels: Record<RiskLevel, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical'
  };
  return labels[level] || level;
};

export const getSourceLabel = (source: EventSource): string => {
  const labels: Record<EventSource, string> = {
    web: 'Web Dashboard',
    api: 'API',
    system_job: 'System Job',
    mobile: 'Mobile App',
    cli: 'CLI'
  };
  return labels[source] || source;
};

export const formatTimestamp = (ts: string): string => {
  return new Date(ts).toLocaleString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short'
  });
};

// ============================================================
// Mock Audit Logs (Nigerian Data)
// ============================================================

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'AUD-20240125-001',
    timestamp: '2024-01-25T14:32:18.456Z',
    actor: { id: 'ADM-001', name: 'Adaeze Nwosu', type: 'admin', role: 'Compliance Lead', email: 'adaeze.nwosu@recliq.ng' },
    actionType: 'enforce',
    actionLabel: 'Suspended agent account',
    entityType: 'agent',
    entityId: 'AGT-201',
    entityLabel: 'Emeka Nnamdi',
    changeSummary: 'Agent account suspended due to confirmed GPS spoofing fraud ring',
    changeDetails: [
      { field: 'accountStatus', before: 'active', after: 'suspended' },
      { field: 'pickupPrivileges', before: 'enabled', after: 'disabled' },
      { field: 'payoutAccess', before: 'enabled', after: 'frozen' }
    ],
    source: 'web',
    ipAddress: '105.112.45.67',
    device: 'Chrome 120 / macOS',
    sessionId: 'sess_8f7a2b3c',
    riskLevel: 'critical',
    reason: 'Confirmed fraud - GPS spoofing ring (FRD-003). 5 agents involved, ₦4.5M exposure.',
    linkedEntities: [
      { type: 'fraud_flag', id: 'FRD-003', label: 'GPS spoofing ring - Port Harcourt' },
      { type: 'dispute', id: 'RSK-005', label: 'Ghost pickup ring detected' }
    ],
    durationMs: 245,
    success: true
  },
  {
    id: 'AUD-20240125-002',
    timestamp: '2024-01-25T14:28:05.123Z',
    actor: { id: 'SYS-001', name: 'Payout Engine', type: 'system', role: 'System' },
    actionType: 'reversal',
    actionLabel: 'Reversed fraudulent payouts',
    entityType: 'payout',
    entityId: 'PAY-BATCH-20240123',
    entityLabel: 'Batch payout reversal - PH agents',
    changeSummary: '₦4,500,000 reversed across 5 agent accounts linked to fraud ring',
    changeDetails: [
      { field: 'totalReversed', before: '₦0', after: '₦4,500,000' },
      { field: 'affectedAccounts', before: '0', after: '5' },
      { field: 'batchStatus', before: 'completed', after: 'reversed' }
    ],
    source: 'system_job',
    ipAddress: '10.0.1.50',
    device: 'Payout Service v3.2',
    sessionId: 'job_payout_rev_001',
    riskLevel: 'critical',
    linkedEntities: [
      { type: 'fraud_flag', id: 'FRD-003', label: 'GPS spoofing ring' },
      { type: 'agent', id: 'AGT-201', label: 'Emeka Nnamdi' },
      { type: 'agent', id: 'AGT-202', label: 'Chidera Okoro' }
    ],
    durationMs: 1823,
    success: true
  },
  {
    id: 'AUD-20240125-003',
    timestamp: '2024-01-25T13:15:42.789Z',
    actor: { id: 'ADM-003', name: 'Emeka Okafor', type: 'admin', role: 'Risk Analyst', email: 'emeka.okafor@recliq.ng' },
    actionType: 'resolve',
    actionLabel: 'Resolved risk dispute',
    entityType: 'dispute',
    entityId: 'RSK-006',
    entityLabel: 'Pricing engine miscalculation - Kano',
    changeSummary: 'Dispute resolved as system error. ₦499,200 recovered via wallet adjustments.',
    changeDetails: [
      { field: 'status', before: 'investigating', after: 'resolved' },
      { field: 'outcome', before: 'pending', after: 'closed_no_action' },
      { field: 'recoveredAmount', before: '₦0', after: '₦499,200' }
    ],
    source: 'web',
    ipAddress: '197.210.78.34',
    device: 'Firefox 121 / Windows',
    sessionId: 'sess_4d5e6f7g',
    riskLevel: 'medium',
    reason: 'System error confirmed. Pricing engine v2.4 bug fixed. All overpayments recovered.',
    linkedEntities: [
      { type: 'payout', id: 'PAY-KAN-20240110', label: 'Kano e-waste overpayments' }
    ],
    durationMs: 312,
    success: true
  },
  {
    id: 'AUD-20240125-004',
    timestamp: '2024-01-25T11:45:00.000Z',
    actor: { id: 'ADM-005', name: 'Olumide Fashola', type: 'admin', role: 'Enterprise Manager', email: 'olumide.fashola@recliq.ng' },
    actionType: 'update',
    actionLabel: 'Updated enterprise contract',
    entityType: 'contract',
    entityId: 'CTR-DAN-2024',
    entityLabel: 'Dangote Cement Plc - Service Agreement',
    changeSummary: 'Extended contract term and adjusted SLA targets following dispute resolution',
    changeDetails: [
      { field: 'contractEnd', before: '2024-06-30', after: '2025-06-30' },
      { field: 'slaComplianceTarget', before: '95%', after: '92%' },
      { field: 'monthlyRate', before: '₦1,500,000', after: '₦1,650,000' },
      { field: 'penaltyClause', before: '₦50,000 per breach', after: '₦75,000 per breach' }
    ],
    source: 'web',
    ipAddress: '105.112.89.12',
    device: 'Chrome 120 / Windows',
    sessionId: 'sess_1a2b3c4d',
    riskLevel: 'high',
    reason: 'Contract renegotiation following SLA breach dispute (RSK-004). Client retention priority.',
    linkedEntities: [
      { type: 'enterprise', id: 'ENT-012', label: 'Dangote Cement Plc' },
      { type: 'dispute', id: 'RSK-004', label: 'SLA breaches at Dangote Ikoyi' }
    ],
    durationMs: 189,
    success: true
  },
  {
    id: 'AUD-20240125-005',
    timestamp: '2024-01-25T10:30:22.567Z',
    actor: { id: 'ADM-001', name: 'Adaeze Nwosu', type: 'admin', role: 'Compliance Lead', email: 'adaeze.nwosu@recliq.ng' },
    actionType: 'escalate',
    actionLabel: 'Escalated to legal counsel',
    entityType: 'dispute',
    entityId: 'RSK-007',
    entityLabel: 'Hazardous waste mishandling - Apapa',
    changeSummary: 'NESREA compliance breach referred to legal team for regulatory notification',
    changeDetails: [
      { field: 'status', before: 'investigating', after: 'referred' },
      { field: 'legalReferral', before: 'none', after: 'active' },
      { field: 'nesreaNotification', before: 'pending', after: 'filed' }
    ],
    source: 'web',
    ipAddress: '105.112.45.67',
    device: 'Chrome 120 / macOS',
    sessionId: 'sess_8f7a2b3c',
    riskLevel: 'critical',
    reason: 'NESREA regulatory exposure. Nigerian Breweries Plc enterprise relationship at critical risk.',
    linkedEntities: [
      { type: 'enterprise', id: 'ENT-045', label: 'Nigerian Breweries Plc' },
      { type: 'agent', id: 'AGT-178', label: 'Segun Adebayo' }
    ],
    durationMs: 156,
    success: true
  },
  {
    id: 'AUD-20240125-006',
    timestamp: '2024-01-25T09:00:00.000Z',
    actor: { id: 'SYS-002', name: 'Anomaly Detection Engine', type: 'system', role: 'System' },
    actionType: 'create',
    actionLabel: 'Created fraud flag',
    entityType: 'fraud_flag',
    entityId: 'FRD-004',
    entityLabel: 'Identity farming - Kano',
    changeSummary: 'Auto-flagged: 7 accounts from single device in Kano. Identity farming pattern detected.',
    changeDetails: [
      { field: 'flagStatus', before: 'N/A', after: 'open' },
      { field: 'severity', before: 'N/A', after: 'high' },
      { field: 'riskScore', before: 'N/A', after: '78' }
    ],
    source: 'system_job',
    ipAddress: '10.0.1.30',
    device: 'Anomaly Detection v2.1',
    sessionId: 'job_anomaly_scan_daily',
    riskLevel: 'high',
    linkedEntities: [
      { type: 'user', id: 'USR-334', label: 'Aisha Mohammed' }
    ],
    durationMs: 4521,
    success: true
  },
  {
    id: 'AUD-20240125-007',
    timestamp: '2024-01-25T08:45:11.234Z',
    actor: { id: 'ADM-002', name: 'Tunde Bakare', type: 'admin', role: 'Ops Manager', email: 'tunde.bakare@recliq.ng' },
    actionType: 'approve',
    actionLabel: 'Approved new agent onboarding',
    entityType: 'agent',
    entityId: 'AGT-312',
    entityLabel: 'Yusuf Abdullahi',
    changeSummary: 'New agent approved for Abuja Garki zone after background verification',
    changeDetails: [
      { field: 'onboardingStatus', before: 'pending_approval', after: 'approved' },
      { field: 'zone', before: 'unassigned', after: 'Abuja - Garki' },
      { field: 'backgroundCheck', before: 'pending', after: 'cleared' }
    ],
    source: 'web',
    ipAddress: '154.113.22.45',
    device: 'Safari 17 / macOS',
    sessionId: 'sess_7h8i9j0k',
    riskLevel: 'low',
    linkedEntities: [],
    durationMs: 98,
    success: true
  },
  {
    id: 'AUD-20240125-008',
    timestamp: '2024-01-25T08:15:33.890Z',
    actor: { id: 'ADM-004', name: 'Ngozi Eze', type: 'admin', role: 'Finance Lead', email: 'ngozi.eze@recliq.ng' },
    actionType: 'payout',
    actionLabel: 'Processed weekly agent payouts',
    entityType: 'payout',
    entityId: 'PAY-BATCH-20240125-W',
    entityLabel: 'Weekly agent payout batch - Lagos',
    changeSummary: '₦12,450,000 disbursed to 87 agents across Lagos zones',
    changeDetails: [
      { field: 'batchTotal', before: '₦0', after: '₦12,450,000' },
      { field: 'agentCount', before: '0', after: '87' },
      { field: 'batchStatus', before: 'pending', after: 'processed' }
    ],
    source: 'web',
    ipAddress: '197.210.78.34',
    device: 'Chrome 120 / Windows',
    sessionId: 'sess_2l3m4n5o',
    riskLevel: 'high',
    reason: 'Weekly payout cycle. All amounts verified against collection records.',
    linkedEntities: [],
    durationMs: 8934,
    success: true
  },
  {
    id: 'AUD-20240125-009',
    timestamp: '2024-01-25T07:30:00.000Z',
    actor: { id: 'SYS-003', name: 'Pricing Engine', type: 'system', role: 'System' },
    actionType: 'update',
    actionLabel: 'Updated zone pricing rates',
    entityType: 'pricing',
    entityId: 'PRC-LAG-2024-Q1',
    entityLabel: 'Lagos Q1 2024 pricing update',
    changeSummary: 'Quarterly pricing adjustment for Lagos zones. Plastic rate increased 8%.',
    changeDetails: [
      { field: 'plasticRate', before: '₦120/kg', after: '₦130/kg' },
      { field: 'metalRate', before: '₦85/kg', after: '₦90/kg' },
      { field: 'effectiveDate', before: 'N/A', after: '2024-02-01' }
    ],
    source: 'system_job',
    ipAddress: '10.0.1.40',
    device: 'Pricing Engine v2.5',
    sessionId: 'job_pricing_quarterly',
    riskLevel: 'medium',
    linkedEntities: [],
    durationMs: 2341,
    success: true
  },
  {
    id: 'AUD-20240125-010',
    timestamp: '2024-01-25T06:00:00.000Z',
    actor: { id: 'ADM-001', name: 'Adaeze Nwosu', type: 'admin', role: 'Compliance Lead', email: 'adaeze.nwosu@recliq.ng' },
    actionType: 'permission_change',
    actionLabel: 'Updated admin role permissions',
    entityType: 'role',
    entityId: 'ROLE-OPS-ADMIN',
    entityLabel: 'Ops Admin role',
    changeSummary: 'Removed payout override permission from Ops Admin role. Separation of duties enforcement.',
    changeDetails: [
      { field: 'permissions.payout_override', before: 'granted', after: 'revoked' },
      { field: 'permissions.payout_view', before: 'granted', after: 'granted' },
      { field: 'lastModifiedBy', before: 'ADM-006', after: 'ADM-001' }
    ],
    source: 'web',
    ipAddress: '105.112.45.67',
    device: 'Chrome 120 / macOS',
    sessionId: 'sess_5p6q7r8s',
    riskLevel: 'critical',
    reason: 'Compliance audit finding: Ops Admin should not have payout override capability.',
    linkedEntities: [],
    durationMs: 134,
    success: true
  },
  {
    id: 'AUD-20240124-011',
    timestamp: '2024-01-24T22:45:18.000Z',
    actor: { id: 'ADM-003', name: 'Emeka Okafor', type: 'admin', role: 'Risk Analyst', email: 'emeka.okafor@recliq.ng' },
    actionType: 'override',
    actionLabel: 'Overrode auto-freeze on user account',
    entityType: 'user',
    entityId: 'USR-445',
    entityLabel: 'Alaba Market Traders Association',
    changeSummary: 'Override: Unfroze user account pending dispute investigation. Business continuity exception.',
    changeDetails: [
      { field: 'accountFreeze', before: 'frozen', after: 'active' },
      { field: 'overrideReason', before: 'N/A', after: 'Business continuity - enterprise client' },
      { field: 'overrideExpiry', before: 'N/A', after: '2024-02-07' }
    ],
    source: 'web',
    ipAddress: '197.210.78.34',
    device: 'Firefox 121 / Windows',
    sessionId: 'sess_9t0u1v2w',
    riskLevel: 'high',
    reason: 'Enterprise client account frozen by auto-system. Override approved by Compliance Lead.',
    linkedEntities: [
      { type: 'dispute', id: 'RSK-001', label: 'Weight inflation at Alaba Market' }
    ],
    durationMs: 201,
    success: true
  },
  {
    id: 'AUD-20240124-012',
    timestamp: '2024-01-24T16:30:00.000Z',
    actor: { id: 'ADM-004', name: 'Ngozi Eze', type: 'admin', role: 'Finance Lead', email: 'ngozi.eze@recliq.ng' },
    actionType: 'adjustment',
    actionLabel: 'Manual wallet adjustment',
    entityType: 'payout',
    entityId: 'WAL-USR-889',
    entityLabel: 'Adewale Ogundimu wallet',
    changeSummary: '₦180,000 debited from user wallet. Recovery for inflated collection volume claims.',
    changeDetails: [
      { field: 'walletBalance', before: '₦245,000', after: '₦65,000' },
      { field: 'adjustmentType', before: 'N/A', after: 'fraud_recovery' },
      { field: 'adjustmentAmount', before: 'N/A', after: '-₦180,000' }
    ],
    source: 'web',
    ipAddress: '197.210.78.34',
    device: 'Chrome 120 / Windows',
    sessionId: 'sess_3x4y5z6a',
    riskLevel: 'high',
    reason: 'Fraud recovery per RSK-008 resolution. User found to have inflated volumes by 20-30%.',
    linkedEntities: [
      { type: 'dispute', id: 'RSK-008', label: 'Inflated volumes - Ibadan' },
      { type: 'user', id: 'USR-889', label: 'Adewale Ogundimu' }
    ],
    durationMs: 178,
    success: true
  },
  {
    id: 'AUD-20240124-013',
    timestamp: '2024-01-24T14:00:00.000Z',
    actor: { id: 'ADM-002', name: 'Tunde Bakare', type: 'admin', role: 'Ops Manager', email: 'tunde.bakare@recliq.ng' },
    actionType: 'export',
    actionLabel: 'Exported enterprise performance report',
    entityType: 'report',
    entityId: 'RPT-ENT-Q4-2023',
    entityLabel: 'Q4 2023 Enterprise Performance Report',
    changeSummary: 'Exported full enterprise performance data for board presentation',
    changeDetails: [
      { field: 'format', before: 'N/A', after: 'PDF' },
      { field: 'recordCount', before: 'N/A', after: '2,450' },
      { field: 'dateRange', before: 'N/A', after: 'Oct-Dec 2023' }
    ],
    source: 'web',
    ipAddress: '154.113.22.45',
    device: 'Safari 17 / macOS',
    sessionId: 'sess_7b8c9d0e',
    riskLevel: 'low',
    linkedEntities: [],
    durationMs: 3456,
    success: true
  },
  {
    id: 'AUD-20240124-014',
    timestamp: '2024-01-24T10:15:00.000Z',
    actor: { id: 'ADM-001', name: 'Adaeze Nwosu', type: 'admin', role: 'Compliance Lead', email: 'adaeze.nwosu@recliq.ng' },
    actionType: 'login',
    actionLabel: 'Admin login',
    entityType: 'system_config',
    entityId: 'AUTH-ADM-001',
    entityLabel: 'Admin authentication',
    changeSummary: 'Successful login from new device',
    changeDetails: [
      { field: 'loginStatus', before: 'N/A', after: 'success' },
      { field: 'mfaVerified', before: 'N/A', after: 'true' },
      { field: 'newDevice', before: 'N/A', after: 'true' }
    ],
    source: 'web',
    ipAddress: '105.112.45.67',
    device: 'Chrome 120 / macOS',
    sessionId: 'sess_8f7a2b3c',
    riskLevel: 'medium',
    linkedEntities: [],
    durationMs: 1245,
    success: true
  },
  {
    id: 'AUD-20240124-015',
    timestamp: '2024-01-24T03:15:00.000Z',
    actor: { id: 'SYS-004', name: 'Backup Service', type: 'system', role: 'System' },
    actionType: 'export',
    actionLabel: 'Nightly database backup',
    entityType: 'system_config',
    entityId: 'BKP-20240124',
    entityLabel: 'Daily backup - production',
    changeSummary: 'Nightly full database backup completed successfully',
    changeDetails: [
      { field: 'backupSize', before: 'N/A', after: '24.7 GB' },
      { field: 'duration', before: 'N/A', after: '47 minutes' },
      { field: 'destination', before: 'N/A', after: 'AWS S3 - ng-west-1' }
    ],
    source: 'system_job',
    ipAddress: '10.0.1.10',
    device: 'Backup Service v1.8',
    sessionId: 'job_backup_nightly',
    riskLevel: 'low',
    linkedEntities: [],
    durationMs: 2820000,
    success: true
  }
];

// ============================================================
// Summary Data
// ============================================================

export const mockAuditLogSummary: AuditLogSummary = {
  totalLoggedActions: 15847,
  adminActions: 9234,
  systemActions: 6613,
  financialActions: 3421,
  highRiskActions: 847,
  lastLoggedEvent: '2024-01-25T14:32:18.456Z',
  todayActions: 142,
  weekActions: 1023
};

// ============================================================
// Insight Data
// ============================================================

export const mockHighRiskTrendData: HighRiskTrendData[] = [
  { date: 'Jan 19', high: 8, critical: 2 },
  { date: 'Jan 20', high: 12, critical: 4 },
  { date: 'Jan 21', high: 6, critical: 1 },
  { date: 'Jan 22', high: 15, critical: 5 },
  { date: 'Jan 23', high: 18, critical: 7 },
  { date: 'Jan 24', high: 11, critical: 3 },
  { date: 'Jan 25', high: 9, critical: 4 }
];

export const mockAdminActivityData: AdminActivityData[] = [
  { adminName: 'Adaeze Nwosu', actionCount: 47, highRiskCount: 12, lastActive: '2024-01-25T14:32:18Z' },
  { adminName: 'Emeka Okafor', actionCount: 38, highRiskCount: 8, lastActive: '2024-01-25T13:15:42Z' },
  { adminName: 'Ngozi Eze', actionCount: 31, highRiskCount: 6, lastActive: '2024-01-25T08:15:33Z' },
  { adminName: 'Tunde Bakare', actionCount: 25, highRiskCount: 3, lastActive: '2024-01-25T08:45:11Z' },
  { adminName: 'Olumide Fashola', actionCount: 18, highRiskCount: 4, lastActive: '2024-01-25T11:45:00Z' }
];

export const mockOffHoursActivity: OffHoursActivity[] = [
  { hour: 0, count: 2, isOffHours: true },
  { hour: 1, count: 1, isOffHours: true },
  { hour: 2, count: 0, isOffHours: true },
  { hour: 3, count: 3, isOffHours: true },
  { hour: 4, count: 1, isOffHours: true },
  { hour: 5, count: 0, isOffHours: true },
  { hour: 6, count: 4, isOffHours: false },
  { hour: 7, count: 12, isOffHours: false },
  { hour: 8, count: 28, isOffHours: false },
  { hour: 9, count: 35, isOffHours: false },
  { hour: 10, count: 42, isOffHours: false },
  { hour: 11, count: 38, isOffHours: false },
  { hour: 12, count: 22, isOffHours: false },
  { hour: 13, count: 31, isOffHours: false },
  { hour: 14, count: 44, isOffHours: false },
  { hour: 15, count: 36, isOffHours: false },
  { hour: 16, count: 29, isOffHours: false },
  { hour: 17, count: 18, isOffHours: false },
  { hour: 18, count: 8, isOffHours: false },
  { hour: 19, count: 5, isOffHours: true },
  { hour: 20, count: 3, isOffHours: true },
  { hour: 21, count: 4, isOffHours: true },
  { hour: 22, count: 6, isOffHours: true },
  { hour: 23, count: 2, isOffHours: true }
];

export const mockOverridePatterns: OverridePattern[] = [
  { adminName: 'Emeka Okafor', overrideCount: 5, entityTypes: ['user', 'payout', 'dispute'], lastOverride: '2024-01-24T22:45:18Z' },
  { adminName: 'Adaeze Nwosu', overrideCount: 3, entityTypes: ['agent', 'fraud_flag'], lastOverride: '2024-01-23T16:00:00Z' },
  { adminName: 'Olumide Fashola', overrideCount: 2, entityTypes: ['contract', 'enterprise'], lastOverride: '2024-01-22T14:30:00Z' }
];
