import type {
  RoleDefinition,
  RolesSummary,
  PermissionMatrixEntry,
  RoleChangeEvent,
  PermissionConflict,
  AdminSubRole,
  RoleStatus,
  RiskLevel,
  PermissionLevel,
} from './types';
import { AdminSubRole as Role } from './types';

// ============================================================
// Color & Label Helpers
// ============================================================

export const getRoleColor = (role: AdminSubRole): string => {
  const colors: Record<string, string> = {
    OPS_ADMIN: '#3B82F6',
    FINANCE_ADMIN: '#F59E0B',
    STRATEGY_ADMIN: '#8B5CF6',
    SUPER_ADMIN: '#EF4444',
  };
  return colors[role] || '#6B7280';
};

export const getRoleLabel = (role: AdminSubRole): string => {
  const labels: Record<string, string> = {
    OPS_ADMIN: 'Ops Admin',
    FINANCE_ADMIN: 'Finance Admin',
    STRATEGY_ADMIN: 'Strategy Admin',
    SUPER_ADMIN: 'Super Admin',
  };
  return labels[role] || role;
};

export const getRiskLevelColor = (level: RiskLevel): string => {
  const colors: Record<RiskLevel, string> = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444',
    critical: '#7C3AED',
  };
  return colors[level] || '#6B7280';
};

export const getRiskLevelLabel = (level: RiskLevel): string => {
  const labels: Record<RiskLevel, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
  };
  return labels[level] || level;
};

export const getPermissionLevelColor = (level: PermissionLevel): string => {
  const colors: Record<PermissionLevel, string> = {
    full: '#10B981',
    view: '#3B82F6',
    none: '#EF4444',
  };
  return colors[level] || '#6B7280';
};

export const getPermissionLevelIcon = (level: PermissionLevel): string => {
  const icons: Record<PermissionLevel, string> = {
    full: '✅',
    view: '👀',
    none: '❌',
  };
  return icons[level] || '—';
};

export const getStatusColor = (status: RoleStatus): string => {
  return status === 'active' ? '#10B981' : '#EF4444';
};

export const getChangeActionColor = (action: string): string => {
  const colors: Record<string, string> = {
    role_assigned: '#10B981',
    role_revoked: '#EF4444',
    role_disabled: '#F59E0B',
    role_enabled: '#10B981',
    permission_updated: '#3B82F6',
    admin_suspended: '#EF4444',
  };
  return colors[action] || '#6B7280';
};

export const getChangeActionLabel = (action: string): string => {
  const labels: Record<string, string> = {
    role_assigned: 'Role Assigned',
    role_revoked: 'Role Revoked',
    role_disabled: 'Role Disabled',
    role_enabled: 'Role Enabled',
    permission_updated: 'Permission Updated',
    admin_suspended: 'Admin Suspended',
  };
  return labels[action] || action;
};

// ============================================================
// Permission Matrix
// ============================================================

export const permissionMatrix: PermissionMatrixEntry[] = [
  { module: 'pickups', moduleLabel: 'Pickups & Recycling', opsAdmin: 'full', financeAdmin: 'view', strategyAdmin: 'view', superAdmin: 'full' },
  { module: 'agents', moduleLabel: 'Agents', opsAdmin: 'full', financeAdmin: 'view', strategyAdmin: 'view', superAdmin: 'full' },
  { module: 'availability', moduleLabel: 'Availability Status', opsAdmin: 'full', financeAdmin: 'none', strategyAdmin: 'view', superAdmin: 'full' },
  { module: 'disputes_ops', moduleLabel: 'Disputes (Ops)', opsAdmin: 'full', financeAdmin: 'view', strategyAdmin: 'none', superAdmin: 'full' },
  { module: 'risk_disputes', moduleLabel: 'Risk Disputes', opsAdmin: 'none', financeAdmin: 'view', strategyAdmin: 'none', superAdmin: 'full' },
  { module: 'fraud_flags', moduleLabel: 'Fraud Flags', opsAdmin: 'none', financeAdmin: 'view', strategyAdmin: 'none', superAdmin: 'full' },
  { module: 'payouts_wallets', moduleLabel: 'Payouts & Wallets', opsAdmin: 'none', financeAdmin: 'full', strategyAdmin: 'view', superAdmin: 'full' },
  { module: 'invoices', moduleLabel: 'Invoices', opsAdmin: 'none', financeAdmin: 'full', strategyAdmin: 'view', superAdmin: 'full' },
  { module: 'contracts_pricing', moduleLabel: 'Contracts & Pricing', opsAdmin: 'view', financeAdmin: 'view', strategyAdmin: 'view', superAdmin: 'full' },
  { module: 'rewards_referrals', moduleLabel: 'Rewards & Referrals', opsAdmin: 'view', financeAdmin: 'view', strategyAdmin: 'view', superAdmin: 'full' },
  { module: 'environmental', moduleLabel: 'Environmental Impact', opsAdmin: 'view', financeAdmin: 'view', strategyAdmin: 'view', superAdmin: 'full' },
  { module: 'audit_logs', moduleLabel: 'Audit Logs', opsAdmin: 'none', financeAdmin: 'view', strategyAdmin: 'none', superAdmin: 'full' },
  { module: 'system_settings', moduleLabel: 'System Settings', opsAdmin: 'none', financeAdmin: 'none', strategyAdmin: 'none', superAdmin: 'full' },
];

// ============================================================
// Mock Role Definitions
// ============================================================

export const mockRoleDefinitions: RoleDefinition[] = [
  {
    id: 'ROLE-001',
    role: Role.OPS_ADMIN,
    name: 'Ops Admin',
    description: 'Manages daily operations including pickups, agents, and enterprise scheduling.',
    purpose: 'Run daily operations safely',
    focusAreas: ['Pickups & drop-offs', 'Agents & availability', 'Enterprise scheduling', 'Dispute handling (non-risk)', 'Operational dashboards'],
    keyCapabilities: ['View & manage pickups', 'Assign agents', 'Resolve standard disputes', 'Manage enterprise collections', 'View (not edit) pricing & contracts'],
    explicitRestrictions: ['Cannot touch payouts', 'Cannot modify rewards rules', 'Cannot access fraud or audit logs', 'Cannot change system settings'],
    assignedAdmins: [
      { id: 'ADM-002', name: 'Tunde Bakare', email: 'tunde.bakare@recliq.ng', assignedAt: '2023-06-15T09:00:00Z', assignedBy: 'Adaeze Nwosu', status: 'active' },
      { id: 'ADM-007', name: 'Chioma Adekunle', email: 'chioma.adekunle@recliq.ng', assignedAt: '2023-09-01T09:00:00Z', assignedBy: 'Adaeze Nwosu', status: 'active' },
      { id: 'ADM-009', name: 'Yusuf Ibrahim', email: 'yusuf.ibrahim@recliq.ng', assignedAt: '2024-01-10T09:00:00Z', assignedBy: 'Adaeze Nwosu', status: 'active' },
    ],
    permissionScope: {
      modules: [
        { module: 'Pickups & Recycling', moduleLabel: 'Pickups & Recycling', permissions: { view: true, create: true, edit: true, approve: false, override: false } },
        { module: 'Agents', moduleLabel: 'Agents', permissions: { view: true, create: true, edit: true, approve: true, override: false } },
        { module: 'Availability Status', moduleLabel: 'Availability Status', permissions: { view: true, create: false, edit: true, approve: false, override: false } },
        { module: 'Disputes (Ops)', moduleLabel: 'Disputes (Ops)', permissions: { view: true, create: true, edit: true, approve: true, override: false } },
        { module: 'Enterprise', moduleLabel: 'Enterprise', permissions: { view: true, create: false, edit: true, approve: false, override: false } },
        { module: 'Contracts & Pricing', moduleLabel: 'Contracts & Pricing', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
        { module: 'Rewards & Referrals', moduleLabel: 'Rewards & Referrals', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
        { module: 'Environmental Impact', moduleLabel: 'Environmental Impact', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
      ],
      dataVisibility: { cityZoneScope: 'assigned', financialDataExposure: 'summary', piiAccessLevel: 'masked' },
      approvalRules: [
        { action: 'Agent assignment', requiresDualApproval: false, escalationPath: 'Super Admin' },
        { action: 'Dispute resolution', requiresDualApproval: false, escalationPath: 'Super Admin' },
      ],
    },
    riskLevel: 'medium',
    status: 'active',
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    lastChangedBy: 'Adaeze Nwosu',
  },
  {
    id: 'ROLE-002',
    role: Role.FINANCE_ADMIN,
    name: 'Finance Admin',
    description: 'Protects money and accounting integrity. Manages payouts, wallets, invoices, and financial reports.',
    purpose: 'Protect money & accounting integrity',
    focusAreas: ['Payouts', 'Wallets', 'Invoices', 'Financial reports', 'Revenue reconciliation'],
    keyCapabilities: ['Approve payouts', 'View all financial flows', 'Export finance data', 'View contracts & pricing', 'View dispute financial impact'],
    explicitRestrictions: ['Cannot assign agents', 'Cannot resolve disputes', 'Cannot edit rewards logic', 'Cannot access fraud enforcement', 'Cannot change system settings'],
    assignedAdmins: [
      { id: 'ADM-004', name: 'Ngozi Eze', email: 'ngozi.eze@recliq.ng', assignedAt: '2023-04-01T09:00:00Z', assignedBy: 'Adaeze Nwosu', status: 'active' },
      { id: 'ADM-008', name: 'Folake Adeniyi', email: 'folake.adeniyi@recliq.ng', assignedAt: '2023-11-15T09:00:00Z', assignedBy: 'Adaeze Nwosu', status: 'active' },
    ],
    permissionScope: {
      modules: [
        { module: 'Payouts & Wallets', moduleLabel: 'Payouts & Wallets', permissions: { view: true, create: true, edit: true, approve: true, override: false } },
        { module: 'Invoices', moduleLabel: 'Invoices', permissions: { view: true, create: true, edit: true, approve: true, override: false } },
        { module: 'Financial Reports', moduleLabel: 'Financial Reports', permissions: { view: true, create: true, edit: false, approve: false, override: false } },
        { module: 'Contracts & Pricing', moduleLabel: 'Contracts & Pricing', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
        { module: 'Risk Disputes', moduleLabel: 'Risk Disputes', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
        { module: 'Fraud Flags', moduleLabel: 'Fraud Flags', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
        { module: 'Audit Logs', moduleLabel: 'Audit Logs', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
        { module: 'Rewards & Referrals', moduleLabel: 'Rewards & Referrals', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
      ],
      dataVisibility: { cityZoneScope: 'all', financialDataExposure: 'full', piiAccessLevel: 'masked' },
      approvalRules: [
        { action: 'Payout batch approval', requiresDualApproval: true, escalationPath: 'Super Admin' },
        { action: 'Wallet adjustment', requiresDualApproval: true, escalationPath: 'Super Admin' },
        { action: 'Invoice generation', requiresDualApproval: false, escalationPath: 'Finance Lead' },
      ],
    },
    riskLevel: 'high',
    status: 'active',
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-01-20T14:00:00Z',
    lastChangedBy: 'Adaeze Nwosu',
  },
  {
    id: 'ROLE-003',
    role: Role.STRATEGY_ADMIN,
    name: 'Strategy Admin',
    description: 'Read-only analytical role for observing, analyzing, and informing decisions across all modules.',
    purpose: 'Observe, analyze, decide',
    focusAreas: ['Dashboards', 'Trends', 'Performance analytics', 'Environmental impact', 'Growth metrics'],
    keyCapabilities: ['Read-only access to Operations', 'Read-only access to Finance', 'Read-only access to Rewards', 'Read-only access to Referrals', 'Read-only access to Impact', 'Export reports'],
    explicitRestrictions: ['No write actions anywhere', 'No approvals', 'No financial actions', 'No dispute resolution', 'No system settings'],
    assignedAdmins: [
      { id: 'ADM-006', name: 'Olumide Fashola', email: 'olumide.fashola@recliq.ng', assignedAt: '2023-05-01T09:00:00Z', assignedBy: 'Adaeze Nwosu', status: 'active' },
    ],
    permissionScope: {
      modules: [
        { module: 'Pickups & Recycling', moduleLabel: 'Pickups & Recycling', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
        { module: 'Agents', moduleLabel: 'Agents', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
        { module: 'Availability Status', moduleLabel: 'Availability Status', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
        { module: 'Payouts & Wallets', moduleLabel: 'Payouts & Wallets', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
        { module: 'Invoices', moduleLabel: 'Invoices', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
        { module: 'Contracts & Pricing', moduleLabel: 'Contracts & Pricing', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
        { module: 'Rewards & Referrals', moduleLabel: 'Rewards & Referrals', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
        { module: 'Environmental Impact', moduleLabel: 'Environmental Impact', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
      ],
      dataVisibility: { cityZoneScope: 'all', financialDataExposure: 'summary', piiAccessLevel: 'none' },
      approvalRules: [],
    },
    riskLevel: 'low',
    status: 'active',
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2023-12-01T09:00:00Z',
    lastChangedBy: 'Adaeze Nwosu',
  },
  {
    id: 'ROLE-004',
    role: Role.SUPER_ADMIN,
    name: 'Super Admin',
    description: 'Full platform governance and control. Unrestricted access to all modules, settings, and enforcement actions.',
    purpose: 'Platform governance & control',
    focusAreas: ['Everything — Ops, Finance, Risk, Fraud, Audit, Settings, Roles'],
    keyCapabilities: ['Full access to all modules', 'Override powers (audited)', 'Final dispute authority', 'Fraud enforcement', 'Contract & pricing control', 'Role & permission management'],
    explicitRestrictions: ['None — but everything is audited'],
    assignedAdmins: [
      { id: 'ADM-001', name: 'Adaeze Nwosu', email: 'adaeze.nwosu@recliq.ng', assignedAt: '2023-01-01T00:00:00Z', assignedBy: 'System', status: 'active' },
      { id: 'ADM-003', name: 'Emeka Okafor', email: 'emeka.okafor@recliq.ng', assignedAt: '2023-03-15T09:00:00Z', assignedBy: 'Adaeze Nwosu', status: 'active' },
    ],
    permissionScope: {
      modules: [
        { module: 'Pickups & Recycling', moduleLabel: 'Pickups & Recycling', permissions: { view: true, create: true, edit: true, approve: true, override: true } },
        { module: 'Agents', moduleLabel: 'Agents', permissions: { view: true, create: true, edit: true, approve: true, override: true } },
        { module: 'Availability Status', moduleLabel: 'Availability Status', permissions: { view: true, create: true, edit: true, approve: true, override: true } },
        { module: 'Disputes (Ops)', moduleLabel: 'Disputes (Ops)', permissions: { view: true, create: true, edit: true, approve: true, override: true } },
        { module: 'Risk Disputes', moduleLabel: 'Risk Disputes', permissions: { view: true, create: true, edit: true, approve: true, override: true } },
        { module: 'Fraud Flags', moduleLabel: 'Fraud Flags', permissions: { view: true, create: true, edit: true, approve: true, override: true } },
        { module: 'Payouts & Wallets', moduleLabel: 'Payouts & Wallets', permissions: { view: true, create: true, edit: true, approve: true, override: true } },
        { module: 'Invoices', moduleLabel: 'Invoices', permissions: { view: true, create: true, edit: true, approve: true, override: true } },
        { module: 'Contracts & Pricing', moduleLabel: 'Contracts & Pricing', permissions: { view: true, create: true, edit: true, approve: true, override: true } },
        { module: 'Rewards & Referrals', moduleLabel: 'Rewards & Referrals', permissions: { view: true, create: true, edit: true, approve: true, override: true } },
        { module: 'Environmental Impact', moduleLabel: 'Environmental Impact', permissions: { view: true, create: true, edit: true, approve: true, override: true } },
        { module: 'Audit Logs', moduleLabel: 'Audit Logs', permissions: { view: true, create: false, edit: false, approve: false, override: false } },
        { module: 'System Settings', moduleLabel: 'System Settings', permissions: { view: true, create: true, edit: true, approve: true, override: true } },
      ],
      dataVisibility: { cityZoneScope: 'all', financialDataExposure: 'full', piiAccessLevel: 'full' },
      approvalRules: [
        { action: 'Emergency override', requiresDualApproval: false, escalationPath: 'Self (audited)' },
        { action: 'Role assignment', requiresDualApproval: false, escalationPath: 'Self (audited)' },
        { action: 'Fraud enforcement', requiresDualApproval: false, escalationPath: 'Self (audited)' },
      ],
    },
    riskLevel: 'critical',
    status: 'active',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-25T14:00:00Z',
    lastChangedBy: 'System',
  },
];

// ============================================================
// Summary Data
// ============================================================

export const mockRolesSummary: RolesSummary = {
  totalRoles: 4,
  adminsAssigned: 8,
  highPrivilegeRoles: 2,
  approvalRequiredActions: 5,
  permissionConflicts: 2,
  lastRoleChange: '2024-01-25T14:00:00Z',
};

// ============================================================
// Change History
// ============================================================

export const mockRoleChangeHistory: RoleChangeEvent[] = [
  {
    id: 'RCH-001',
    timestamp: '2024-01-25T14:00:00Z',
    actor: 'Adaeze Nwosu',
    actorRole: Role.SUPER_ADMIN,
    action: 'role_assigned',
    targetRole: Role.OPS_ADMIN,
    targetAdmin: 'Yusuf Ibrahim',
    description: 'Assigned Ops Admin role to Yusuf Ibrahim for Abuja zone operations',
    reason: 'New hire onboarding - Abuja expansion',
    linkedAuditLogId: 'AUD-20240125-007',
  },
  {
    id: 'RCH-002',
    timestamp: '2024-01-20T14:00:00Z',
    actor: 'Adaeze Nwosu',
    actorRole: Role.SUPER_ADMIN,
    action: 'permission_updated',
    targetRole: Role.OPS_ADMIN,
    description: 'Removed payout override permission from Ops Admin role',
    reason: 'Compliance audit finding: separation of duties enforcement',
    linkedAuditLogId: 'AUD-20240125-010',
  },
  {
    id: 'RCH-003',
    timestamp: '2024-01-15T10:00:00Z',
    actor: 'Adaeze Nwosu',
    actorRole: Role.SUPER_ADMIN,
    action: 'admin_suspended',
    targetRole: Role.OPS_ADMIN,
    targetAdmin: 'Bayo Ogunleye',
    description: 'Suspended Ops Admin access for Bayo Ogunleye pending investigation',
    reason: 'Unauthorized dispute resolution outside assigned zone',
  },
  {
    id: 'RCH-004',
    timestamp: '2024-01-10T09:00:00Z',
    actor: 'Adaeze Nwosu',
    actorRole: Role.SUPER_ADMIN,
    action: 'role_assigned',
    targetRole: Role.FINANCE_ADMIN,
    targetAdmin: 'Folake Adeniyi',
    description: 'Assigned Finance Admin role to Folake Adeniyi',
    reason: 'Finance team expansion',
  },
  {
    id: 'RCH-005',
    timestamp: '2023-12-20T16:00:00Z',
    actor: 'Emeka Okafor',
    actorRole: Role.SUPER_ADMIN,
    action: 'role_enabled',
    targetRole: Role.STRATEGY_ADMIN,
    description: 'Re-enabled Strategy Admin role after Q4 review',
    reason: 'Board requested strategy analytics access for Q1 planning',
  },
  {
    id: 'RCH-006',
    timestamp: '2023-12-01T09:00:00Z',
    actor: 'Adaeze Nwosu',
    actorRole: Role.SUPER_ADMIN,
    action: 'role_disabled',
    targetRole: Role.STRATEGY_ADMIN,
    description: 'Temporarily disabled Strategy Admin role during security review',
    reason: 'Quarterly security audit - all non-essential roles paused',
  },
];

// ============================================================
// Permission Conflicts
// ============================================================

export const mockPermissionConflicts: PermissionConflict[] = [
  {
    id: 'PC-001',
    type: 'segregation_violation',
    severity: 'warning',
    description: 'Finance Admin can view dispute financial impact while Ops Admin resolves disputes. No dual-approval enforced for dispute-linked payouts.',
    affectedRoles: [Role.OPS_ADMIN, Role.FINANCE_ADMIN],
    recommendation: 'Enforce dual-approval for any payout linked to a resolved dispute.',
  },
  {
    id: 'PC-002',
    type: 'excess_privilege',
    severity: 'critical',
    description: 'Super Admin has unrestricted override capability with no secondary approval requirement.',
    affectedRoles: [Role.SUPER_ADMIN],
    recommendation: 'Implement time-limited override tokens with mandatory reason logging.',
  },
];
