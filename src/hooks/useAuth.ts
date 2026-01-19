"use client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient, { API_ENDPOINTS } from '@/lib/api-client';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  photo?: string;
  [key: string]: any;
}

interface LoginResponse {
  message: string;
  identifier: string;
  expires_in: number;
}

interface VerifyOtpResponse {
  status: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ identifier, password }: { identifier: string; password: string }) => {
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        identifier,
        password,
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Store email for OTP flow
      sessionStorage.setItem('userEmail', variables.identifier);
    },
  });
};

// Verify OTP mutation
export const useVerifyOtp = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ identifier, otp }: { identifier: string; otp: string }) => {
      const response = await apiClient.post<VerifyOtpResponse>('/auth/verify-otp', {
        identifier,
        otp,
      });
      return response.data;
    },
    onSuccess: async (data) => {
      // Store tokens
      localStorage.setItem('authToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      
      // Get complete user details after successful verification
      try {
        const userResponse = await apiClient.get('/auth/me', {
          headers: {
            'Authorization': `Bearer ${data.accessToken}`
          }
        });
        
        // Store complete user data
        localStorage.setItem('user', JSON.stringify(userResponse.data));
        
        // Update query cache
        queryClient.setQueryData(['user'], userResponse.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Fallback to basic user data if /auth/me fails
        localStorage.setItem('user', JSON.stringify(data.user));
        queryClient.setQueryData(['user'], data.user);
      }
      
      // Clear sessionStorage
      sessionStorage.removeItem('userEmail');
    },
  });
};

// Resend OTP mutation
export const useResendOtp = () => {
  return useMutation({
    mutationFn: async (identifier: string) => {
      const response = await apiClient.post('/auth/resend-otp', {
        identifier,
      });
      return response.data;
    },
  });
};

// Get current user query with server-side validation
export const useUser = () => {
  return useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        // Check if token exists before making API call
        const token = localStorage.getItem('authToken');
        if (!token) {
          return null;
        }
        
        // Get fresh user data from server (not localStorage)
        const response = await apiClient.get('/auth/me');
        
        // Store validated user data from server
        localStorage.setItem('user', JSON.stringify(response.data));
        
        return response.data;
      } catch (error) {
        console.error('Server validation error:', error);
        // On validation error, clear user data
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

// Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      // Clear all auth data
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      sessionStorage.removeItem('userEmail');
      
      // Clear query cache
      queryClient.setQueryData(['user'], null);
      queryClient.clear();
      
      return { success: true };
    },
  });
};

// Check if user is authenticated
export const useIsAuthenticated = () => {
  const { data: user, isLoading, error } = useUser();
  return {
    isAuthenticated: !!user,
    isLoading,
    user,
    error,
  };
};

// Helper functions
export const getUserDisplayName = (user: User | null): string => {
  if (!user) return 'User';
  
  if (user.name) {
    return user.name;
  }
  
  if (user.email) {
    return user.email.split('@')[0];
  }
  
  return 'User';
};

export const getUserInitials = (user: User | null): string => {
  if (!user) return 'U';
  
  if (user.name) {
    const nameParts = user.name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    }
    return user.name[0].toUpperCase();
  }
  
  if (user.email) {
    return user.email[0].toUpperCase();
  }
  
  return 'U';
};

export const getUserPhoto = (user: User | null): string => {
  if (!user) return '/images/profile/user-1.jpg';
  
  if (user.photo) {
    return user.photo;
  }
  
  return '/images/profile/user-1.jpg';
};
