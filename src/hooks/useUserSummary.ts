import { useQuery } from '@tanstack/react-query';
import apiClient, { API_ENDPOINTS } from '@/lib/api-client';

export interface UserSummary {
  totalUsers: number;
  activeUsers: number;
  dormantUsers: number;
  churnedUsers: number;
  suspendedUsers: number;
}

export const useUserSummary = () => {
  return useQuery<UserSummary>({
    queryKey: ['userSummary'],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.USERS.SUMMARY}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Auto-refresh every 10 minutes
  });
};
