import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient, { API_ENDPOINTS } from '@/lib/api-client';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
  totalRecycled: number;
  walletBalance: number;
}

interface CreateUserData {
  email: string;
  name: string;
  role: string;
  password: string;
}

interface UpdateUserData {
  name?: string;
  role?: string;
  status?: 'active' | 'inactive' | 'suspended';
}

interface UsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
}

// Hook for fetching users list
export function useUsers(params: UsersQueryParams = {}) {
  const queryString = new URLSearchParams(
    Object.entries(params).filter(([_, value]) => value !== undefined)
  ).toString();

  return useQuery({
    queryKey: ['users', params],
    queryFn: async () => {
      const response = await apiClient.get<UsersResponse>(
        `${API_ENDPOINTS.USERS.LIST}${queryString ? `?${queryString}` : ''}`
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Hook for fetching single user
export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const response = await apiClient.get<{ user: User }>(API_ENDPOINTS.USERS.GET(id));
      return response.data.user;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for creating user
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateUserData) => {
      const response = await apiClient.post<{ user: User }>(
        API_ENDPOINTS.USERS.CREATE,
        userData
      );
      return response.data.user;
    },
    onSuccess: () => {
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// Hook for updating user
export function useUpdateUser(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: UpdateUserData) => {
      const response = await apiClient.patch<{ user: User }>(
        API_ENDPOINTS.USERS.UPDATE(id),
        userData
      );
      return response.data.user;
    },
    onSuccess: () => {
      // Invalidate both single user and users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', id] });
    },
  });
}

// Hook for deleting user
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
      return id;
    },
    onSuccess: () => {
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// Hook for bulk user operations
export function useBulkUpdateUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userIds, updates }: { userIds: string[]; updates: UpdateUserData }) => {
      const response = await apiClient.post<{ updated: number }>(
        `${API_ENDPOINTS.USERS.LIST}/bulk-update`,
        { userIds, updates }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
