// Authentication hooks
export { useLogin, useLogout, useCurrentUser, useIsAuthenticated, useRefreshToken } from './useAuth';

// User management hooks
export { 
  useUsers, 
  useUser, 
  useCreateUser, 
  useUpdateUser, 
  useDeleteUser, 
  useBulkUpdateUsers 
} from './useUsers';

// Analytics hooks
export { 
  useOverviewStats, 
  useEnvironmentalImpact, 
  useFinancialMetrics, 
  useOperationsMetrics, 
  useDashboardSummary 
} from './useAnalytics';

// Re-export API client and endpoints for direct use if needed
export { default as apiClient, API_ENDPOINTS } from '@/lib/api-client';

// Re-export types
export type * from '@/types/api';
