// Account Profile Types

export type AdminRole = 'OPS_ADMIN' | 'FINANCE_ADMIN' | 'STRATEGY_ADMIN' | 'SUPER_ADMIN';
export type AccountStatus = 'active' | 'restricted' | 'suspended';
export type SessionStatus = 'active' | 'expired';
export type ActivityAction =
  | 'login'
  | 'logout'
  | 'password_change'
  | 'profile_update'
  | 'session_terminated'
  | 'sensitive_action'
  | 'failed_login';

export interface AdminProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  role: AdminRole;
  accountStatus: AccountStatus;
  joinedAt: string;
  lastLogin: string;
}

export interface RolePermissions {
  role: AdminRole;
  description: string;
  accessibleModules: string[];
  restrictedModules: string[];
  approvalAuthority: string[];
}

export interface SecuritySettings {
  passwordLastChanged: string;
  passwordStrength: 'weak' | 'moderate' | 'strong';
  enforceStrongPassword: boolean;
  sessionTimeout: number;
  activeSessions: number;
  lastSecurityAudit: string;
}


export interface AccountActivity {
  id: string;
  timestamp: string;
  action: ActivityAction;
  description: string;
  ipAddress: string;
  device: string;
  success: boolean;
}

export interface NotificationPreference {
  id: string;
  type: string;
  category: string;
  label: string;
  description: string;
  email: boolean;
  inApp: boolean;
  forced: boolean;
}
