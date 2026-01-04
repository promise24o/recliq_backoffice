import { useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  adminSubRole: string;
  [key: string]: any;
}

export const useRoleValidation = () => {
  return useMutation<User, Error, void>({
    mutationFn: async () => {
      const response = await apiClient.get<User>('/auth/me');
      return response.data;
    },
    onError: (error) => {
      console.error('Role validation error:', error);
    }
  });
};
