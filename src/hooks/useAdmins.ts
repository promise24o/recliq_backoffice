"use client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient, { API_ENDPOINTS } from '@/lib/api-client';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  adminSubRole: 'OPS_ADMIN' | 'FINANCE_ADMIN' | 'STRATEGY_ADMIN' | 'SUPER_ADMIN';
  status: 'active' | 'suspended';
  photo?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface RolesSummary {
  totalRoles: number;
  adminsAssigned: number;
  highPrivilegeRoles: number;
  approvalRequiredActions: number;
  permissionConflicts: number;
  lastRoleChange: string;
}

export interface CreateAdminPayload {
  name: string;
  email: string;
  password: string;
  role: 'admin';
  adminSubRole: 'OPS_ADMIN' | 'FINANCE_ADMIN' | 'STRATEGY_ADMIN' | 'SUPER_ADMIN';
}

export interface UpdateAdminPayload {
  name?: string;
  email?: string;
  adminSubRole?: 'OPS_ADMIN' | 'FINANCE_ADMIN' | 'STRATEGY_ADMIN' | 'SUPER_ADMIN';
}

// Fetch all admin users
export const useAdmins = () => {
  return useQuery<AdminUser[]>({
    queryKey: ['admins'],
    queryFn: async () => {
      try {
        const response = await apiClient.get(API_ENDPOINTS.ADMINS.LIST);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch admins:', error);
        return [];
      }
    },
    staleTime: 2 * 60 * 1000,
    retry: false,
  });
};

// Fetch roles summary
export const useRolesSummary = () => {
  return useQuery<RolesSummary>({
    queryKey: ['roles-summary'],
    queryFn: async () => {
      try {
        const response = await apiClient.get(API_ENDPOINTS.ADMINS.ROLES_SUMMARY);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch roles summary:', error);
        return {
          totalRoles: 0,
          adminsAssigned: 0,
          highPrivilegeRoles: 0,
          approvalRequiredActions: 0,
          permissionConflicts: 0,
          lastRoleChange: new Date().toISOString(),
        };
      }
    },
    staleTime: 2 * 60 * 1000,
    retry: false,
  });
};

// Fetch role definitions
export const useRoleDefinitions = () => {
  return useQuery({
    queryKey: ['role-definitions'],
    queryFn: async () => {
      try {
        const response = await apiClient.get(API_ENDPOINTS.ADMINS.ROLES_DEFINITIONS);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch role definitions:', error);
        return [];
      }
    },
    staleTime: 2 * 60 * 1000,
    retry: false,
  });
};

// Fetch permissions analysis
export const usePermissionsAnalysis = () => {
  return useQuery({
    queryKey: ['permissions-analysis'],
    queryFn: async () => {
      try {
        const response = await apiClient.get(API_ENDPOINTS.ADMINS.PERMISSIONS_ANALYSIS);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch permissions analysis:', error);
        return {
          conflicts: [],
          permissionMatrix: [],
        };
      }
    },
    staleTime: 2 * 60 * 1000,
    retry: false,
  });
};

// Fetch role change history
export const useRoleChangeHistory = () => {
  return useQuery({
    queryKey: ['role-change-history'],
    queryFn: async () => {
      try {
        const response = await apiClient.get(API_ENDPOINTS.ADMINS.ROLES_CHANGE_HISTORY);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch role change history:', error);
        return [];
      }
    },
    staleTime: 2 * 60 * 1000,
    retry: false,
  });
};

// Create a new admin user
export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateAdminPayload) => {
      const response = await apiClient.post(API_ENDPOINTS.ADMINS.CREATE, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      queryClient.invalidateQueries({ queryKey: ['roles-summary'] });
      queryClient.invalidateQueries({ queryKey: ['permissions-analysis'] });
      queryClient.invalidateQueries({ queryKey: ['role-change-history'] });
    },
  });
};

// Update an admin user
export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateAdminPayload }) => {
      const response = await apiClient.patch(API_ENDPOINTS.ADMINS.UPDATE(id), payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });  
    },
  });
};

// Suspend an admin user
export const useSuspendAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post(API_ENDPOINTS.ADMINS.SUSPEND(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });
};

// Activate an admin user
export const useActivateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post(API_ENDPOINTS.ADMINS.ACTIVATE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      queryClient.invalidateQueries({ queryKey: ['roles-summary'] });
      queryClient.invalidateQueries({ queryKey: ['permissions-analysis'] });
      queryClient.invalidateQueries({ queryKey: ['role-change-history'] });
    },
  });
};

// Revoke admin access
export const useRevokeAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post(API_ENDPOINTS.ADMINS.REVOKE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      queryClient.invalidateQueries({ queryKey: ['roles-summary'] });
      queryClient.invalidateQueries({ queryKey: ['permissions-analysis'] });
      queryClient.invalidateQueries({ queryKey: ['role-change-history'] });
      queryClient.invalidateQueries({ queryKey: ['role-definitions'] });
    },
  });
};

// Assign role to admin
export const useAssignRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ adminId, roleId }: { adminId: string; roleId: string }) => {
      const response = await apiClient.post(API_ENDPOINTS.ADMINS.ASSIGN, { adminId, roleId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      queryClient.invalidateQueries({ queryKey: ['roles-summary'] });
      queryClient.invalidateQueries({ queryKey: ['permissions-analysis'] });
      queryClient.invalidateQueries({ queryKey: ['role-change-history'] });
      queryClient.invalidateQueries({ queryKey: ['role-definitions'] });
    },
  });
};
