import { useQuery } from '@tanstack/react-query';
import apiClient, { API_ENDPOINTS } from '@/lib/api-client';

export interface ZoneSummary {
  citiesCovered: number;
  activeZones: number;
  agentsAssigned: number;
  lowCoverageZones: number;
  avgPickupsPerZone: number;
  avgSlaPerformancePercent: number;
  totalZones: number;
  inactiveZones: number;
  pendingZones: number;
  archivedZones: number;
  totalAgents: number;
  avgAgentsPerZone: number;
  highCoverageZones: number;
  mediumCoverageZones: number;
  criticalCoverageZones: number;
  totalDailyPickups: number;
  totalDailyDropoffs: number;
  avgZoneUtilization: number;
  zonesWithEnterpriseClients: number;
  zonesMeetingSla: number;
  zonesMissingSla: number;
}

export const useZoneSummary = () => {
  return useQuery<ZoneSummary>({
    queryKey: ['zoneSummary'],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.ZONES.LIST}/summary`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Refresh every 10 minutes
  });
};
