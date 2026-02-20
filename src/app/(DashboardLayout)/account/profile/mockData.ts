import type {
  AdminProfile,
  AdminRole,
  RolePermissions,
  SecuritySettings,
  ActiveSession,
  AccountActivity,
  NotificationPreference,
} from './types';

// ============================================================
// Role Helpers
// ============================================================

export const getRoleColor = (role: AdminRole): string => {
  const colors: Record<AdminRole, string> = {
    SUPER_ADMIN: '#8B5CF6',
    OPS_ADMIN: '#3B82F6',
    FINANCE_ADMIN: '#10B981',
    STRATEGY_ADMIN: '#F59E0B',
  };
  return colors[role] || '#6B7280';
};

export const getRoleLabel = (role: AdminRole): string => {
  const labels: Record<AdminRole, string> = {
    SUPER_ADMIN: 'Super Admin',
    OPS_ADMIN: 'Ops Admin',
    FINANCE_ADMIN: 'Finance Admin',
    STRATEGY_ADMIN: 'Strategy Admin',
  };
  return labels[role] || role;
};

export const getRoleDescription = (role: AdminRole): string => {
  const descriptions: Record<AdminRole, string> = {
    SUPER_ADMIN: 'Full system access. Can manage all modules, users, settings, and configurations. Highest authority level.',
    OPS_ADMIN: 'Operational oversight. Manages users, agents, pickups, and day-to-day recycling operations.',
    FINANCE_ADMIN: 'Financial management. Handles wallet float, outgoing payments, pricing, and financial reporting.',
    STRATEGY_ADMIN: 'Strategic analytics. Access to performance insights, environmental impact data, and growth metrics.',
  };
  return descriptions[role] || '';
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: '#10B981',
    restricted: '#F59E0B',
    suspended: '#EF4444',
  };
  return colors[status] || '#6B7280';
};

export const getActivityColor = (action: string): string => {
  const colors: Record<string, string> = {
    login: '#10B981',
    logout: '#6B7280',
    password_change: '#F59E0B',
    profile_update: '#3B82F6',
    two_factor_enabled: '#10B981',
    two_factor_disabled: '#EF4444',
    session_terminated: '#F59E0B',
    sensitive_action: '#8B5CF6',
    failed_login: '#EF4444',
  };
  return colors[action] || '#6B7280';
};

export const getActivityLabel = (action: string): string => {
  const labels: Record<string, string> = {
    login: 'Login',
    logout: 'Logout',
    password_change: 'Password Changed',
    profile_update: 'Profile Updated',
    session_terminated: 'Session Terminated',
    sensitive_action: 'Sensitive Action',
    failed_login: 'Failed Login',
  };
  return labels[action] || action;
};

// ============================================================
// Mock Admin Profile
// ============================================================

export const mockAdminProfile: AdminProfile = {
  id: 'ADM-001',
  firstName: 'Adaeze',
  lastName: 'Nwosu',
  email: 'adaeze.nwosu@recliq.ng',
  phone: '+234 801 234 5678',
  avatar: '/images/profile/user-1.jpg',
  role: 'SUPER_ADMIN',
  accountStatus: 'active',
  department: 'Platform Operations',
  joinedAt: '2023-01-15T00:00:00Z',
  lastLogin: '2024-01-15T09:32:00Z',
};

// ============================================================
// Role Permissions
// ============================================================

export const mockRolePermissions: Record<AdminRole, RolePermissions> = {
  SUPER_ADMIN: {
    role: 'SUPER_ADMIN',
    description: 'Full system access with all administrative privileges. Can manage all modules, users, settings, and configurations.',
    accessibleModules: [
      'Dashboard',
      'Users (Recyclers)',
      'Agents',
      'Pickups & Recycling',
      'Finance',
      'Wallet Float',
      'Outgoing Payments',
      'Performance & Insights',
      'Enterprise Clients',
      'Environmental Impact',
      'Compliance & Audit',
      'System Settings',
      'Roles & Permissions',
      'Pricing Rules',
      'Zones',
    ],
    restrictedModules: [],
    approvalAuthority: [
      'User suspensions',
      'Agent deactivations',
      'Payment approvals',
      'Pricing rule changes',
      'Zone boundary changes',
      'Role assignments',
      'System configuration changes',
    ],
  },
  OPS_ADMIN: {
    role: 'OPS_ADMIN',
    description: 'Operational management access. Manages users, agents, pickups, and day-to-day recycling operations.',
    accessibleModules: [
      'Dashboard',
      'Users (Recyclers)',
      'Agents',
      'Pickups & Recycling',
    ],
    restrictedModules: [
      'Finance',
      'Wallet Float',
      'Outgoing Payments',
      'System Settings',
      'Roles & Permissions',
      'Pricing Rules',
      'Zones',
    ],
    approvalAuthority: [
      'Pickup reassignments',
      'Agent schedule changes',
    ],
  },
  FINANCE_ADMIN: {
    role: 'FINANCE_ADMIN',
    description: 'Financial management access. Handles wallet float, outgoing payments, pricing, and financial reporting.',
    accessibleModules: [
      'Finance',
      'Wallet Float',
      'Outgoing Payments',
    ],
    restrictedModules: [
      'Users (Recyclers)',
      'Agents',
      'Pickups & Recycling',
      'System Settings',
      'Roles & Permissions',
      'Zones',
    ],
    approvalAuthority: [
      'Payment approvals up to ₦500,000',
      'Float top-up requests',
    ],
  },
  STRATEGY_ADMIN: {
    role: 'STRATEGY_ADMIN',
    description: 'Strategic analytics access. Views performance insights, environmental impact data, and growth metrics.',
    accessibleModules: [
      'Performance & Insights',
      'Environmental Impact',
      'Enterprise Clients (view only)',
    ],
    restrictedModules: [
      'Users (Recyclers)',
      'Agents',
      'Pickups & Recycling',
      'Finance',
      'Wallet Float',
      'Outgoing Payments',
      'System Settings',
      'Roles & Permissions',
      'Pricing Rules',
      'Zones',
    ],
    approvalAuthority: [],
  },
};

// ============================================================
// Security Settings
// ============================================================

export const mockSecuritySettings: SecuritySettings = {
  passwordLastChanged: '2024-01-02T14:00:00Z',
  passwordStrength: 'strong',
  enforceStrongPassword: true,
  sessionTimeout: 30,
  activeSessions: 2,
  lastSecurityAudit: '2024-01-15T10:00:00Z',
};


// ============================================================
// Account Activity
// ============================================================

export const mockAccountActivity: AccountActivity[] = [
  {
    id: 'ACT-001',
    timestamp: '2024-01-15T09:32:00Z',
    action: 'login',
    description: 'Logged in from Chrome on MacBook Pro',
    ipAddress: '105.112.45.123',
    device: 'MacBook Pro 16"',
    success: true,
  },
  {
    id: 'ACT-002',
    timestamp: '2024-01-15T08:15:00Z',
    action: 'login',
    description: 'Logged in from Safari on iPhone 15 Pro',
    ipAddress: '105.112.45.189',
    device: 'iPhone 15 Pro',
    success: true,
  },
  {
    id: 'ACT-003',
    timestamp: '2024-01-14T16:45:00Z',
    action: 'sensitive_action',
    description: 'Approved zone boundary change for Lekki (ZN-001)',
    ipAddress: '41.58.12.77',
    device: 'Windows Desktop',
    success: true,
  },
  {
    id: 'ACT-004',
    timestamp: '2024-01-14T14:20:00Z',
    action: 'sensitive_action',
    description: 'Created new pricing rule: Plastic - Lagos Premium',
    ipAddress: '41.58.12.77',
    device: 'Windows Desktop',
    success: true,
  },
  {
    id: 'ACT-005',
    timestamp: '2024-01-13T11:00:00Z',
    action: 'profile_update',
    description: 'Updated phone number',
    ipAddress: '105.112.45.123',
    device: 'MacBook Pro 16"',
    success: true,
  },
  {
    id: 'ACT-006',
    timestamp: '2024-01-10T09:00:00Z',
    action: 'password_change',
    description: 'Password changed successfully',
    ipAddress: '105.112.45.123',
    device: 'MacBook Pro 16"',
    success: true,
  },
  {
    id: 'ACT-007',
    timestamp: '2024-01-08T22:15:00Z',
    action: 'failed_login',
    description: 'Failed login attempt — incorrect password',
    ipAddress: '197.210.55.44',
    device: 'Unknown device',
    success: false,
  },
  {
    id: 'ACT-008',
    timestamp: '2024-01-05T10:30:00Z',
    action: 'two_factor_enabled',
    description: 'Enabled two-factor authentication via Authenticator app',
    ipAddress: '105.112.45.123',
    device: 'MacBook Pro 16"',
    success: true,
  },
  {
    id: 'ACT-009',
    timestamp: '2024-01-03T15:00:00Z',
    action: 'session_terminated',
    description: 'Terminated session on Windows Desktop (Abuja)',
    ipAddress: '105.112.45.123',
    device: 'MacBook Pro 16"',
    success: true,
  },
  {
    id: 'ACT-010',
    timestamp: '2024-01-02T14:00:00Z',
    action: 'sensitive_action',
    description: 'Activated agent Emeka Okafor (AGT-042)',
    ipAddress: '105.112.45.123',
    device: 'MacBook Pro 16"',
    success: true,
  },
];

// ============================================================
// Notification Preferences
// ============================================================

export const mockNotificationPreferences: NotificationPreference[] = [
  {
    id: 'NP-001',
    category: 'Security',
    label: 'Login Alerts',
    description: 'Notify on new login from unrecognized device',
    email: true,
    inApp: true,
    forced: true,
  },
  {
    id: 'NP-002',
    category: 'Security',
    label: 'Password Changes',
    description: 'Notify when password is changed',
    email: true,
    inApp: true,
    forced: true,
  },
  {
    id: 'NP-003',
    category: 'Security',
    label: 'Failed Login Attempts',
    description: 'Alert on multiple failed login attempts',
    email: true,
    inApp: true,
    forced: true,
  },
  {
    id: 'NP-004',
    category: 'Operations',
    label: 'Pickup Escalations',
    description: 'Notify on SLA breaches or pickup failures',
    email: true,
    inApp: true,
    forced: false,
  },
  {
    id: 'NP-005',
    category: 'Operations',
    label: 'Agent Status Changes',
    description: 'Notify when agents go offline or are deactivated',
    email: false,
    inApp: true,
    forced: false,
  },
  {
    id: 'NP-006',
    category: 'Finance',
    label: 'Payment Approvals',
    description: 'Notify on pending payment approvals',
    email: true,
    inApp: true,
    forced: false,
  },
  {
    id: 'NP-007',
    category: 'Finance',
    label: 'Float Alerts',
    description: 'Notify when wallet float drops below threshold',
    email: true,
    inApp: true,
    forced: false,
  },
  {
    id: 'NP-008',
    category: 'System',
    label: 'System Updates',
    description: 'Notify on platform updates and maintenance',
    email: false,
    inApp: true,
    forced: false,
  },
];
