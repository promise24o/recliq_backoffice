import type { ActivityEvent, SecuritySignal } from '@/hooks/useActivityLogs';

// Action colors and labels
export const getActionColor = (action: ActivityEvent['action']): string => {
  const colors: Record<ActivityEvent['action'], string> = {
    login: '#10B981',
    logout: '#6B7280',
    password_change: '#F59E0B',
    two_factor_change: '#8B5CF6',
    profile_update: '#3B82F6',
    approval: '#10B981',
    rejection: '#EF4444',
    override: '#F59E0B',
    escalation: '#DC2626',
    sensitive_view: '#8B5CF6',
    setting_change: '#6B7280',
    session_terminated: '#EF4444',
    failed_login: '#EF4444',
    user_action: '#3B82F6',
    agent_action: '#8B5CF6',
    finance_action: '#F59E0B',
    zone_action: '#10B981',
    pricing_action: '#F59E0B',
  };
  return colors[action] || '#6B7280';
};

export const getActionLabel = (action: ActivityEvent['action']): string => {
  const labels: Record<ActivityEvent['action'], string> = {
    login: 'Login',
    logout: 'Logout',
    password_change: 'Password Change',
    two_factor_change: '2FA Change',
    profile_update: 'Profile Update',
    approval: 'Approval',
    rejection: 'Rejection',
    override: 'Override',
    escalation: 'Escalation',
    sensitive_view: 'Sensitive View',
    setting_change: 'Setting Change',
    session_terminated: 'Session Terminated',
    failed_login: 'Failed Login',
    user_action: 'User Action',
    agent_action: 'Agent Action',
    finance_action: 'Finance Action',
    zone_action: 'Zone Action',
    pricing_action: 'Pricing Action',
  };
  return labels[action] || action;
};

// Risk level colors and labels
export const getRiskColor = (riskLevel: ActivityEvent['riskLevel']): string => {
  const colors: Record<ActivityEvent['riskLevel'], string> = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444',
    critical: '#DC2626',
  };
  return colors[riskLevel] || '#6B7280';
};

export const getRiskLabel = (riskLevel: ActivityEvent['riskLevel']): string => {
  const labels: Record<ActivityEvent['riskLevel'], string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
  };
  return labels[riskLevel] || riskLevel;
};

// Outcome colors and labels
export const getOutcomeColor = (outcome: ActivityEvent['outcome']): string => {
  const colors: Record<ActivityEvent['outcome'], string> = {
    success: '#10B981',
    failed: '#EF4444',
    pending: '#F59E0B',
  };
  return colors[outcome] || '#6B7280';
};

export const getOutcomeLabel = (outcome: ActivityEvent['outcome']): string => {
  const labels: Record<ActivityEvent['outcome'], string> = {
    success: 'Success',
    failed: 'Failed',
    pending: 'Pending',
  };
  return labels[outcome] || outcome;
};

// Source colors and labels
export const getSourceColor = (source: ActivityEvent['source']): string => {
  const colors: Record<ActivityEvent['source'], string> = {
    web: '#3B82F6',
    api: '#8B5CF6',
    mobile: '#10B981',
    system: '#6B7280',
  };
  return colors[source] || '#6B7280';
};

export const getSourceLabel = (source: ActivityEvent['source']): string => {
  const labels: Record<ActivityEvent['source'], string> = {
    web: 'Web',
    api: 'API',
    mobile: 'Mobile',
    system: 'System',
  };
  return labels[source] || source;
};

// Security signal utilities
export const getSecuritySignalTypeColor = (type: SecuritySignal['type']): string => {
  const colors: Record<SecuritySignal['type'], string> = {
    unusual_time: '#F59E0B',
    new_device: '#8B5CF6',
    failed_login: '#EF4444',
    location_anomaly: '#DC2626',
  };
  return colors[type] || '#6B7280';
};

export const getSecuritySignalTypeLabel = (type: SecuritySignal['type']): string => {
  const labels: Record<SecuritySignal['type'], string> = {
    unusual_time: 'Unusual Time',
    new_device: 'New Device',
    failed_login: 'Failed Login',
    location_anomaly: 'Location Anomaly',
  };
  return labels[type] || type;
};

export const getSecuritySignalSeverityColor = (severity: SecuritySignal['severity']): string => {
  const colors: Record<SecuritySignal['severity'], string> = {
    warning: '#F59E0B',
    critical: '#DC2626',
  };
  return colors[severity] || '#6B7280';
};

// Format utilities
export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const formatRelativeTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return formatTimestamp(timestamp);
};

// Filter utilities
export const filterActivityEvents = (
  events: ActivityEvent[],
  filters: {
    action?: ActivityEvent['action'];
    riskLevel?: ActivityEvent['riskLevel'];
    source?: ActivityEvent['source'];
    outcome?: ActivityEvent['outcome'];
    dateFrom?: string;
    dateTo?: string;
  }
): ActivityEvent[] => {
  return events.filter(event => {
    if (filters.action && event.action !== filters.action) return false;
    if (filters.riskLevel && event.riskLevel !== filters.riskLevel) return false;
    if (filters.source && event.source !== filters.source) return false;
    if (filters.outcome && event.outcome !== filters.outcome) return false;
    if (filters.dateFrom && new Date(event.timestamp) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(event.timestamp) > new Date(filters.dateTo)) return false;
    return true;
  });
};
