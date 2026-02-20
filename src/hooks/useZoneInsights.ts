import { useQuery } from '@tanstack/react-query';
import apiClient, { API_ENDPOINTS } from '@/lib/api-client';

export interface ZoneInsight {
  zoneId: string;
  zoneName: string;
  city: string;
  severity: 'critical' | 'warning' | 'info';
  metric: string;
  value: number;
  recommendation: string;
}

export const useZoneInsights = () => {
  return useQuery<ZoneInsight[]>({
    queryKey: ['zoneInsights'],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.ZONES.LIST}/insights`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 15 * 60 * 1000, // Refresh every 15 minutes
  });
};
