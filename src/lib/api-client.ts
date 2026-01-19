import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// API configuration
const API_URL = process.env.NODE_ENV === 'development' ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001') : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001');

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common error scenarios
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            // Prevent infinite redirect loop
            if (!window.location.pathname.includes('/auth/login')) {
              window.location.href = '/auth/login';
            }
          }
          break;
          
        case 403:
          // Forbidden - insufficient permissions
          break;
          
        case 404:
          // Not found
          break;
          
        case 500:
          // Server error
          break;
          
        default:
          break;
      }
    } else if (error.request) {
      // Network error
    } else {
      // Other error
    }
    
    return Promise.reject(error);
  }
);

// API endpoints configuration
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  
  // Users
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
  
  // Agents
  AGENTS: {
    LIST: '/agents',
    CREATE: '/agents',
    GET: (id: string) => `/agents/${id}`,
    UPDATE: (id: string) => `/agents/${id}`,
    VERIFY: (id: string) => `/agents/${id}/verify`,
  },
  
  // Transactions
  TRANSACTIONS: {
    LIST: '/transactions',
    CREATE: '/transactions',
    GET: (id: string) => `/transactions/${id}`,
    UPDATE: (id: string) => `/transactions/${id}`,
  },
  
  // Wallets
  WALLETS: {
    LIST: '/wallets',
    GET: (userId: string) => `/wallets/${userId}`,
    BALANCE: (userId: string) => `/wallets/${userId}/balance`,
    WITHDRAW: '/wallets/withdraw',
  },
  
  // Rewards
  REWARDS: {
    LIST: '/rewards',
    CREATE: '/rewards',
    UPDATE: (id: string) => `/rewards/${id}`,
    CLAIM: '/rewards/claim',
  },
  
  // Analytics
  ANALYTICS: {
    OVERVIEW: '/analytics/overview',
    ENVIRONMENTAL: '/analytics/environmental',
    FINANCIAL: '/analytics/financial',
    OPERATIONS: '/analytics/operations',
  },
  
  // System
  SYSTEM: {
    SETTINGS: '/system/settings',
    HEALTH: '/system/health',
    AUDIT_LOG: '/system/audit-log',
  },
};

export default apiClient;
