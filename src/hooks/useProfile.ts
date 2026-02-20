import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-client';

// Profile hooks
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.ADMINS.PROFILE);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

export const useSecuritySettings = () => {
  return useQuery({
    queryKey: ['security-settings'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.ADMINS.SECURITY);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};


export const useAccountActivity = () => {
  return useQuery({
    queryKey: ['account-activity'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.ADMINS.ACTIVITY);
      return response.data;
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
    retry: 2,
  });
};

export const useNotificationPreferences = () => {
  return useQuery({
    queryKey: ['notification-preferences'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.ADMINS.NOTIFICATIONS);
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

// Update profile mutation
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      profileData, 
      photoFile 
    }: { 
      profileData: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
      };
      photoFile?: File | null;
    }) => {
      const formData = new FormData();
      
      // Add profile data (read-only fields included for validation)
      if (profileData.firstName) formData.append('firstName', profileData.firstName);
      if (profileData.lastName) formData.append('lastName', profileData.lastName);
      if (profileData.email) formData.append('email', profileData.email);
      if (profileData.phone) formData.append('phone', profileData.phone);
      
      // Add photo if provided
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      const response = await apiClient.patch(API_ENDPOINTS.ADMINS.UPDATE_PROFILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

// Change password mutation
export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (passwordData: {
      currentPassword: string;
      newPassword: string;
    }) => {
      const response = await apiClient.patch(API_ENDPOINTS.ADMINS.CHANGE_PASSWORD, passwordData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-settings'] });
    },
  });
};
