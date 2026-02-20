import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient, { API_ENDPOINTS } from '@/lib/api-client';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'dormant' | 'churned' | 'suspended';
  type: 'individual' | 'enterprise' | 'agent';
  city: string;
  zone: string;
  created: string;
  lastActivity: string;
  totalRecycles: number;
  walletBalance: number;
  pendingEscrow: number;
  disputesRaised: number;
  cancellations: number;
  avgResponseTime: number;
  profilePhoto?: string;
  isVerified: boolean;
  location?: {
    type: 'Point';
    coordinates: [number, number];
    address: string;
    city: string;
    state: string;
    country: string;
  };
}

export interface UsersQuery {
  page?: number;
  limit?: number;
  status?: User['status'];
  type?: User['type'];
  city?: string;
  zone?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export const useUsers = (query: UsersQuery = {}) => {
  return useQuery<UsersResponse>({
    queryKey: ['users', query],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
      
      const response = await apiClient.get(`${API_ENDPOINTS.USERS.LIST}?${params.toString()}`);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export interface UserSearchQuery {
  q: string;
  limit?: number;
}

export const useUserSearch = (query: UserSearchQuery) => {
  return useQuery<User[]>({
    queryKey: ['userSearch', query],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('q', query.q);
      if (query.limit) params.append('limit', query.limit.toString());
      
      const response = await apiClient.get(`${API_ENDPOINTS.USERS.SEARCH}?${params.toString()}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!query.q && query.q.length >= 2,
  });
};

export interface UserActionPayload {
  action: 'suspend' | 'reactivate' | 'flag';
  reason?: string;
  notes?: string;
}

export const useUserAction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, action }: { userId: string; action: UserActionPayload }) => {
      const response = await apiClient.post(`${API_ENDPOINTS.USERS.ACTION(userId)}`, action);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['userSummary'] });
    },
  });
};
