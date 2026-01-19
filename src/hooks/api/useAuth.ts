import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient, { API_ENDPOINTS } from '@/lib/api-client';
import { useRouter } from 'next/navigation';

// Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  token: string;
  refreshToken: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

// Hook for login mutation
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Store tokens
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      
      // Set user data in cache
      queryClient.setQueryData(['auth', 'user'], data.user);
      
      // Redirect to dashboard
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
}

// Hook for logout mutation
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    },
    onSuccess: () => {
      // Clear tokens
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      
      // Clear all cache
      queryClient.clear();
      
      // Redirect to login
      router.push('/auth/login');
    },
  });
}

// Hook for getting current user
export function useCurrentUser() {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const response = await apiClient.get<{ user: User }>(API_ENDPOINTS.AUTH.ME);
      return response.data.user;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry auth errors
  });
}

// Hook for checking if user is authenticated
export function useIsAuthenticated() {
  const { data: user, isLoading, error } = useCurrentUser();
  
  return {
    isAuthenticated: !!user && !error,
    isLoading,
    user,
  };
}

// Hook for refreshing token
export function useRefreshToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REFRESH,
        { refreshToken }
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Update tokens
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      
      // Update user data in cache
      queryClient.setQueryData(['auth', 'user'], data.user);
    },
  });
}
