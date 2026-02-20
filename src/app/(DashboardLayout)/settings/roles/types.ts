// Roles & Permissions System Types

export enum AdminSubRole {
  OPS_ADMIN = 'OPS_ADMIN',
  FINANCE_ADMIN = 'FINANCE_ADMIN',
  STRATEGY_ADMIN = 'STRATEGY_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export type RoleStatus = 'active' | 'disabled';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type PermissionLevel = 'full' | 'view' | 'none';
export type PermissionAction = 'view' | 'create' | 'edit' | 'approve' | 'override';

export interface RoleDefinition {
  id: string;
  role: AdminSubRole;
  name: string;
  description: string;
  purpose: string;
  focusAreas: string[];
  keyCapabilities: string[];
  explicitRestrictions: string[];
  assignedAdmins: AssignedAdmin[];
  permissionScope: PermissionScope;
  riskLevel: RiskLevel;
  status: RoleStatus;
  createdAt: string;
  updatedAt: string;
  lastChangedBy: string;
}

export interface AssignedAdmin {
  id: string;
  name: string;
  email: string;
  photo?: string;
  assignedAt?: string;
  assignedBy?: string;
  status?: 'active' | 'suspended';
}

export interface PermissionScope {
  modules: ModulePermission[];
  dataVisibility: DataVisibility;
  approvalRules: ApprovalRule[];
}

export interface ModulePermission {
  module: string;
  label: string;
  moduleLabel?: string;
  permissions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    approve: boolean;
    override?: boolean;
  };
}

export interface DataVisibility {
  cityZoneScope: 'all' | 'assigned' | 'none';
  financialDataExposure: 'full' | 'summary' | 'none';
  piiAccessLevel: 'full' | 'masked' | 'none';
}

export interface ApprovalRule {
  action: string;
  requiresDualApproval: boolean;
  escalationPath: string;
}

// Permission Matrix (high-level view)
export interface PermissionMatrixEntry {
  module: string;
  moduleLabel: string;
  opsAdmin: PermissionLevel;
  financeAdmin: PermissionLevel;
  strategyAdmin: PermissionLevel;
  superAdmin: PermissionLevel;
}

// Summary types
export interface RolesSummary {
  totalRoles: number;
  adminsAssigned: number;
  highPrivilegeRoles: number;
  approvalRequiredActions: number;
  permissionConflicts: number;
  lastRoleChange: string;
}

// Change history
export interface RoleChangeEvent {
  id: string;
  timestamp: string;
  actor: string;
  actorId: string;
  actorRole: AdminSubRole;
  action: 'role_assigned' | 'role_revoked' | 'role_disabled' | 'role_enabled' | 'permission_updated' | 'admin_suspended' | 'admin_activated';
  targetRole: AdminSubRole;
  targetAdmin?: string;
  targetAdminId?: string;
  description: string;
  reason?: string;
  linkedAuditLogId?: string;
}

// Conflict / Risk types
export interface PermissionConflict {
  id: string;
  type: 'segregation_violation' | 'excess_privilege' | 'conflicting_scope';
  severity: 'warning' | 'critical';
  description: string;
  affectedRoles: AdminSubRole[];
  recommendation: string;
}
