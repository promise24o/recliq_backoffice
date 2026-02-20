import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient, { API_ENDPOINTS } from '@/lib/api-client';

export interface KYCLimits {
  dailyWithdrawal: number;
  maxWalletBalance: number;
}

export interface KYCUserDetails {
  name: string;
  email: string;
  phone: string;
}

export interface KYCRecord {
  userId: string;
  userDetails?: KYCUserDetails;
  userType: 'INDIVIDUAL' | 'ENTERPRISE' | 'AGENT';
  currentTier: 'SPROUT' | 'BLOOM' | 'THRIVE';
  status: 'PENDING' | 'IN_PROGRESS' | 'VERIFIED' | 'REJECTED';
  emailVerified: boolean;
  bvnVerified: boolean;
  documentsUploaded: boolean;
  selfieUploaded: boolean;
  businessDocumentsUploaded: boolean;
  businessDetailsSubmitted: boolean;
  missingRequirements?: string[];
  limits: KYCLimits;
  createdAt: string;
  updatedAt: string;
  rejectionReason?: string;
}

export interface KYCDocument {
  documentType: string;
  documentUrl: string;
  uploadedAt: string;
}

export interface KYCBusinessLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export interface KYCBusinessDetails {
  businessName: string;
  businessAddress: string;
  businessLocation?: KYCBusinessLocation;
  natureOfBusiness: string;
  businessDescription: string;
  businessEmail: string;
  businessPhone: string;
  registrationNumber: string;
  taxIdentificationNumber: string;
}

export interface KYCBVNData {
  bvn?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
}

export interface KYCSelfie {
  selfieUrl?: string;
  uploadedAt?: string;
  verified: boolean;
}

export interface KYCDetailedRecord extends KYCRecord {
  documents: KYCDocument[];
  businessDocuments: KYCDocument[];
  businessDetails?: KYCBusinessDetails;
  bvnData?: KYCBVNData;
  selfie?: KYCSelfie;
}

export interface KYCQuery {
  page?: number;
  limit?: number;
  status?: KYCRecord['status'];
  userType?: KYCRecord['userType'];
}

export interface KYCResponse {
  data: KYCRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface KYCStats {
  total: number;
  sprout: number;
  bloom: number;
  thrive: number;
  pending: number;
  individual: number;
  enterprise: number;
  agent: number;
}

export interface KYCApproveResponse {
  success: boolean;
  message: string;
  userId: string;
  previousTier: string;
  newTier: string;
  status: string;
}

export interface KYCRejectPayload {
  rejectionReason: string;
}

export interface KYCRejectResponse {
  success: boolean;
  message: string;
  userId: string;
  previousTier: string;
  status: string;
  rejectionReason: string;
}

export interface KYCSearchQuery {
  q: string;
  limit?: number;
}

export const useKYCSearch = (query: KYCSearchQuery) => {
  return useQuery<KYCRecord[]>({
    queryKey: ['kycSearch', query],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('search', query.q);
      if (query.limit) params.append('limit', query.limit.toString());
      
      const response = await apiClient.get(`${API_ENDPOINTS.KYC.ADMIN_ALL}?${params.toString()}`);
      return response.data.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!query.q && query.q.length >= 2,
  });
};

export const useKYCRecords = (query: KYCQuery = {}) => {
  return useQuery<KYCResponse>({
    queryKey: ['kycRecords', query],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (query.page) params.append('page', query.page.toString());
      if (query.limit) params.append('limit', query.limit.toString());
      if (query.status) params.append('status', query.status);
      if (query.userType) params.append('userType', query.userType);
      
      const response = await apiClient.get(`${API_ENDPOINTS.KYC.ADMIN_ALL}?${params.toString()}`);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useKYCRecord = (userId: string) => {
  return useQuery<KYCDetailedRecord>({
    queryKey: ['kycRecord', userId],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.KYC.ADMIN_GET(userId));
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: !!userId,
  });
};

export const usePendingKYCRecords = () => {
  return useQuery<KYCRecord[]>({
    queryKey: ['pendingKYCRecords'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.KYC.ADMIN_PENDING);
      return response.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useKYCStats = () => {
  return useQuery<KYCStats>({
    queryKey: ['kycStats'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.KYC.ADMIN_STATS);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useKYCApprove = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await apiClient.put(API_ENDPOINTS.KYC.ADMIN_APPROVE(userId));
      return response.data;
    },
    onSuccess: () => {
      // Invalidate KYC queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['kycRecords'] });
      queryClient.invalidateQueries({ queryKey: ['pendingKYCRecords'] });
      queryClient.invalidateQueries({ queryKey: ['kycStats'] });
    },
  });
};

export const useKYCReject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, payload }: { userId: string; payload: KYCRejectPayload }) => {
      const response = await apiClient.put(API_ENDPOINTS.KYC.ADMIN_REJECT(userId), payload);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate KYC queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['kycRecords'] });
      queryClient.invalidateQueries({ queryKey: ['pendingKYCRecords'] });
      queryClient.invalidateQueries({ queryKey: ['kycStats'] });
    },
  });
};
