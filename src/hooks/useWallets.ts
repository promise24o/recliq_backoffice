import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient, { API_ENDPOINTS } from '@/lib/api-client';

// Types based on API documentation
export enum KYCStatus {
  NOT_STARTED = 'not_started',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export enum WalletStatus {
  NORMAL = 'normal',
  LOCKED = 'locked',
  COMPLIANCE_HOLD = 'compliance_hold',
  NEGATIVE_BALANCE = 'negative_balance',
  HIGH_RISK = 'high_risk'
}

export enum TransactionStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
  FAILED = 'failed'
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: string;
  reference: string;
  status: TransactionStatus;
}

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'dormant' | 'churned' | 'suspended';
  type: 'individual' | 'enterprise' | 'agent';
  role: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
    address: string;
    city: string;
    state: string;
    country: string;
  };
  isVerified: boolean;
  profilePhoto?: string;
  totalRecycles: number;
  lastActivity: string;
  created: string;
}

export interface Wallet {
  id: string;
  userId: string;
  name: string;
  phone: string;
  city: string;
  kycStatus: KYCStatus;
  availableBalance: number;
  pendingEscrow: number;
  onHold: number;
  lifetimeEarned: number;
  lifetimeWithdrawn: number;
  walletStatus: WalletStatus;
  lastUpdated: string;
  transactions: WalletTransaction[];
  userDetails?: UserDetails;
}

export interface WalletSummary {
  totalUserBalances: number;
  totalInEscrow: number;
  totalOnHold: number;
  availableForWithdrawal: number;
  lifetimeRewardsIssued: number;
  walletsWithIssues: number;
}

export interface WalletsQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: WalletStatus;
  kycStatus?: KYCStatus;
  city?: string;
}

export interface WalletsResponse {
  data: Wallet[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface WalletSearchQuery {
  q: string;
  limit?: number;
}

// API Hooks
export const useWallets = (query: WalletsQuery = {}) => {
  return useQuery<WalletsResponse>({
    queryKey: ['wallets', query],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (query.page) params.append('page', query.page.toString());
      if (query.limit) params.append('limit', query.limit.toString());
      if (query.search) params.append('search', query.search);
      if (query.status) params.append('status', query.status);
      if (query.kycStatus) params.append('kycStatus', query.kycStatus);
      if (query.city) params.append('city', query.city);
      
      const response = await apiClient.get(`/admin/wallets?${params.toString()}`);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useWalletSummary = () => {
  return useQuery<WalletSummary>({
    queryKey: ['walletSummary'],
    queryFn: async () => {
      const response = await apiClient.get('/admin/wallets/summary');
      return response.data.summary;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useWallet = (userId: string) => {
  return useQuery<Wallet>({
    queryKey: ['wallet', userId],
    queryFn: async () => {
      const response = await apiClient.get(`/admin/wallets/${userId}`);
      return response.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    enabled: !!userId,
  });
};

export const useWalletSearch = (query: WalletSearchQuery) => {
  return useQuery<Wallet[]>({
    queryKey: ['walletSearch', query],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('search', query.q);
      if (query.limit) params.append('limit', query.limit.toString());
      
      const response = await apiClient.get(`/admin/wallets?${params.toString()}`);
      return response.data.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!query.q && query.q.length >= 2,
  });
};

export const useWalletExport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (query: {
      format?: 'csv' | 'pdf';
      status?: WalletStatus;
      kycStatus?: KYCStatus;
      city?: string;
    }) => {
      const params = new URLSearchParams();
      if (query.format) params.append('format', query.format);
      if (query.status) params.append('status', query.status);
      if (query.kycStatus) params.append('kycStatus', query.kycStatus);
      if (query.city) params.append('city', query.city);
      
      const response = await apiClient.get(`/admin/wallets/export?${params.toString()}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate wallet queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
    },
  });
};
