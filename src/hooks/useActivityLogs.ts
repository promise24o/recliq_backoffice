import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient, { API_ENDPOINTS } from '@/lib/api-client';

export interface ActivityEvent {
  id: string;
  userId: string;
  timestamp: string;
  action: 'login' | 'logout' | 'password_change' | 'two_factor_change' | 'profile_update' | 'approval' | 'rejection' | 'override' | 'escalation' | 'sensitive_view' | 'setting_change' | 'session_terminated' | 'failed_login' | 'user_action' | 'agent_action' | 'finance_action' | 'zone_action' | 'pricing_action';
  actionLabel: string;
  description: string;
  entityType: string;
  entityId: string;
  entityName: string;
  outcome: 'success' | 'failed' | 'pending';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  source: 'web' | 'api' | 'mobile' | 'system';
  ipAddress: string;
  device: string;
  location: string;
  beforeState?: string;
  afterState?: string;
  reason?: string;
  auditRef?: string;
}

export interface ActivityLogsQuery {
  userId?: string;
  action?: ActivityEvent['action'];
  riskLevel?: ActivityEvent['riskLevel'];
  source?: ActivityEvent['source'];
  outcome?: ActivityEvent['outcome'];
  entityType?: string;
  entityId?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface ActivityLogsResponse {
  events: ActivityEvent[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
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
  userId: string;
  type: 'unusual_time' | 'new_device' | 'failed_login' | 'location_anomaly';
  severity: 'warning' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  acknowledged: boolean;
  acknowledgedAt?: string;
  metadata?: Record<string, any>;
}

export interface SecuritySignalsQuery {
  userId?: string;
  type?: SecuritySignal['type'];
  severity?: SecuritySignal['severity'];
  acknowledged?: boolean;
  dateFrom?: string;
  dateTo?: string;
  includeAcknowledged?: boolean;
}

// Activity Logs Hook
export const useActivityLogs = (query: ActivityLogsQuery = {}) => {
  return useQuery<ActivityLogsResponse>({
    queryKey: ['activityLogs', query],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
      
      const response = await apiClient.get(`${API_ENDPOINTS.ACTIVITY.LOGS}?${params.toString()}`);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Activity Summary Hook
export const useActivitySummary = () => {
  return useQuery<ActivitySummary>({
    queryKey: ['activitySummary'],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.ACTIVITY.SUMMARY}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Security Signals Hook
export const useSecuritySignals = (query: SecuritySignalsQuery = {}) => {
  return useQuery<SecuritySignal[]>({
    queryKey: ['securitySignals', query],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
      
      const response = await apiClient.get(`${API_ENDPOINTS.ACTIVITY.SECURITY_SIGNALS}?${params.toString()}`);
      return response.data;
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};

// Acknowledge Security Signal Mutation
export const useAcknowledgeSecuritySignal = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (signalId: string) => {
      const response = await apiClient.post(`${API_ENDPOINTS.ACTIVITY.ACKNOWLEDGE_SIGNAL(signalId)}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['securitySignals'] });
    },
  });
};
