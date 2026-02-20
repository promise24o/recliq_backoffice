import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

// Types based on Finance API documentation
export interface FinancialMetrics {
  totalEarnings: number;
  currentBalance: number;
  escrowAmount: number;
  onHoldAmount: number;
  availableForWithdrawal: number;
  totalWithdrawn: number;
  netProfit: number;
  accountCreatedDate: string;
  firstTransactionDate: string;
  daysActive: number;
  averageDailyEarnings: number;
}

export interface RewardBreakdown {
  recyclingRewards: number;
  referralBonuses: number;
  otherRewards: number;
  recyclingTransactions: number;
  referralCount: number;
  averageRewardPerTransaction: number;
}

export interface WithdrawalSummary {
  totalWithdrawn: number;
  withdrawalCount: number;
  averageWithdrawalAmount: number;
  lastWithdrawalDate: string;
  lastWithdrawalAmount: number;
}

export interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal' | 'referral' | 'refund' | 'penalty' | 'bonus';
  amount: number;
  category: 'reward' | 'withdrawal' | 'referral_bonus' | 'escrow_release' | 'penalty';
  source: string;
  description: string;
  reference: string;
  status: 'successful' | 'pending' | 'failed';
  runningBalance: number;
  relatedEntityId?: string;
  timestamp: string;
  processedAt: string;
  notes?: string;
}

export interface UserLedger {
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  kycStatus: string;
  userDetails: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    type: string;
    role: string;
    location?: {
      type: string;
      coordinates: number[];
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
  };
  accountNumber: string;
  accountName: string;
  financialMetrics: FinancialMetrics;
  rewardBreakdown: RewardBreakdown;
  withdrawalSummary: WithdrawalSummary;
  transactions: Transaction[];
  totalTransactions: number;
  generatedAt: string;
}

export interface FinancialSummary {
  userId: string;
  userName: string;
  currentBalance: number;
  totalEarnings: number;
  totalWithdrawn: number;
  availableForWithdrawal: number;
  lastTransactionDate: string;
  transactionCount: number;
  kycStatus: string;
  accountStatus: string;
}

export interface LedgerQuery {
  includeFullHistory?: boolean;
  transactionLimit?: number;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'date' | 'amount' | 'type';
  sortOrder?: 'asc' | 'desc';
}

// API Hooks
export const useUserLedger = (userId: string, query: LedgerQuery = {}) => {
  return useQuery<UserLedger>({
    queryKey: ['userLedger', userId, query],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (query.includeFullHistory !== undefined) params.append('includeFullHistory', query.includeFullHistory.toString());
      if (query.transactionLimit) params.append('transactionLimit', query.transactionLimit.toString());
      if (query.category) params.append('category', query.category);
      if (query.dateFrom) params.append('dateFrom', query.dateFrom);
      if (query.dateTo) params.append('dateTo', query.dateTo);
      if (query.sortBy) params.append('sortBy', query.sortBy);
      if (query.sortOrder) params.append('sortOrder', query.sortOrder);
      
      const response = await apiClient.get(`/finance/users/${userId}/ledger?${params.toString()}`);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: !!userId,
  });
};

export const useFinancialSummary = (userId: string) => {
  return useQuery<FinancialSummary>({
    queryKey: ['financialSummary', userId],
    queryFn: async () => {
      const response = await apiClient.get(`/finance/users/${userId}/ledger/summary`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!userId,
  });
};
