import { useQuery } from '@tanstack/react-query';
import apiClient, { API_ENDPOINTS } from '@/lib/api-client';

// Types
interface OverviewStats {
  totalUsers: number;
  activeAgents: number;
  totalTransactions: number;
  revenue: number;
  growthRate: number;
  period: string;
}

interface EnvironmentalImpact {
  co2Saved: number;
  wasteRecycled: number;
  treesEquivalent: number;
  waterSaved: number;
  energySaved: number;
  trend: {
    monthly: Array<{
      month: string;
      co2: number;
      waste: number;
    }>;
  };
}

interface FinancialMetrics {
  totalRevenue: number;
  totalWithdrawals: number;
  pendingTransactions: number;
  averageTransactionValue: number;
  revenueByMonth: Array<{
    month: string;
    revenue: number;
    transactions: number;
  }>;
}

interface OperationsMetrics {
  pickupRequests: number;
  completedPickups: number;
  averageCompletionTime: number;
  agentPerformance: Array<{
    agentId: string;
    agentName: string;
    completedPickups: number;
    rating: number;
  }>;
}

interface DateRange {
  startDate: string;
  endDate: string;
}

// Hook for fetching overview statistics
export function useOverviewStats(dateRange?: DateRange) {
  const params = dateRange ? `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}` : '';
  
  return useQuery({
    queryKey: ['analytics', 'overview', dateRange],
    queryFn: async () => {
      const response = await apiClient.get<OverviewStats>(
        `${API_ENDPOINTS.ANALYTICS.OVERVIEW}${params}`
      );
      return response.data;
    },
    staleTime: 60 * 1000, // 1 minute for real-time data
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}

// Hook for fetching environmental impact data
export function useEnvironmentalImpact(dateRange?: DateRange) {
  const params = dateRange ? `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}` : '';
  
  return useQuery({
    queryKey: ['analytics', 'environmental', dateRange],
    queryFn: async () => {
      const response = await apiClient.get<EnvironmentalImpact>(
        `${API_ENDPOINTS.ANALYTICS.ENVIRONMENTAL}${params}`
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for fetching financial metrics
export function useFinancialMetrics(dateRange?: DateRange) {
  const params = dateRange ? `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}` : '';
  
  return useQuery({
    queryKey: ['analytics', 'financial', dateRange],
    queryFn: async () => {
      const response = await apiClient.get<FinancialMetrics>(
        `${API_ENDPOINTS.ANALYTICS.FINANCIAL}${params}`
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Hook for fetching operations metrics
export function useOperationsMetrics(dateRange?: DateRange) {
  const params = dateRange ? `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}` : '';
  
  return useQuery({
    queryKey: ['analytics', 'operations', dateRange],
    queryFn: async () => {
      const response = await apiClient.get<OperationsMetrics>(
        `${API_ENDPOINTS.ANALYTICS.OPERATIONS}${params}`
      );
      return response.data;
    },
    staleTime: 60 * 1000, // 1 minute for real-time operations data
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  });
}

// Hook for fetching dashboard summary (combines multiple endpoints)
export function useDashboardSummary(dateRange?: DateRange) {
  const overview = useOverviewStats(dateRange);
  const environmental = useEnvironmentalImpact(dateRange);
  const financial = useFinancialMetrics(dateRange);
  const operations = useOperationsMetrics(dateRange);

  return {
    isLoading: overview.isLoading || environmental.isLoading || 
              financial.isLoading || operations.isLoading,
    isError: overview.isError || environmental.isError || 
             financial.isError || operations.isError,
    data: {
      overview: overview.data,
      environmental: environmental.data,
      financial: financial.data,
      operations: operations.data,
    },
    refetch: () => {
      overview.refetch();
      environmental.refetch();
      financial.refetch();
      operations.refetch();
    },
  };
}
