"use client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient, { API_ENDPOINTS } from '@/lib/api-client';

export interface CreateCityPayload {
  name: string;
  state: string;
  lat: number;
  lng: number;
  timezone?: string;
  isActive?: boolean;
}

export interface UpdateCityPayload {
  name?: string;
  state?: string;
  lat?: number;
  lng: number;
  timezone?: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
  center: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
  timezone: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Fetch all cities
export const useCities = () => {
  return useQuery<City[]>({
    queryKey: ['cities'],
    queryFn: async () => {
      try {
        const response = await apiClient.get(API_ENDPOINTS.ZONES.CITIES);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch cities:', error);
        return [];
      }
    },
  });
};

// Fetch single city
export const useCity = (id: string) => {
  return useQuery<City>({
    queryKey: ['cities', id],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.ZONES.CITIES}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Create a new city
export const useCreateCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cityData: CreateCityPayload) => {
      const response = await apiClient.post(API_ENDPOINTS.ZONES.CITIES, cityData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });
};

// Update a city
export const useUpdateCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCityPayload }) => {
      const response = await apiClient.patch(`${API_ENDPOINTS.ZONES.CITIES}/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });
};

// Delete a city
export const useDeleteCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`${API_ENDPOINTS.ZONES.CITIES}/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });
};

// Enable a city (and associated zones)
export const useEnableCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.patch(`${API_ENDPOINTS.ZONES.CITIES}/${id}/enable`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      queryClient.invalidateQueries({ queryKey: ['zones'] });
    },
  });
};

// Disable a city (and associated zones)
export const useDisableCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.patch(`${API_ENDPOINTS.ZONES.CITIES}/${id}/disable`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      queryClient.invalidateQueries({ queryKey: ['zones'] });
    },
  });
};

// Zone Management Hooks
export interface CreateZonePayload {
  name: string;
  city: string;
  state: string;
  description?: string;
  polygon: { lat: number; lng: number }[];
  centerLat: number;
  centerLng: number;
  areaKm2: number;
  coverageLevel: 'low' | 'medium' | 'high';
  totalAgents: number;
  pricingRuleId: string;
  pricingRuleName: string;
  slaTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  demandIntensity: 'low' | 'medium' | 'high';
  pickupAvailability: { day: string; startTime: string; endTime: string }[];
  dropoffEligible: boolean;
  enterpriseClients?: string[];
}

export interface UpdateZonePayload {
  name?: string;
  description?: string;
  polygon?: { lat: number; lng: number }[];
  centerLat?: number;
  centerLng?: number;
  areaKm2?: number;
  coverageLevel?: 'low' | 'medium' | 'high';
  totalAgents?: number;
  pricingRuleId?: string;
  pricingRuleName?: string;
  slaTier?: 'bronze' | 'silver' | 'gold' | 'platinum';
  demandIntensity?: 'low' | 'medium' | 'high';
  pickupAvailability?: { day: string; startTime: string; endTime: string }[];
  dropoffEligible?: boolean;
  enterpriseClients?: string[];
}

export interface SplitZonePayload {
  zoneId: string;
  zone1: CreateZonePayload;
  zone2: CreateZonePayload;
  agentDistribution: { zone1Agents: number; zone2Agents: number };
  reason: string;
}

export interface MergeZonesPayload {
  zoneIds: string[];
  mergedZone: CreateZonePayload;
  reason: string;
  contractHandling: 'keep_highest_tier' | 'average_all';
}

// Fetch all zones
export const useZones = () => {
  return useQuery({
    queryKey: ['zones'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.ZONES.LIST);
      return response.data;
    },
  });
};

// Fetch zones by city
export const useZonesByCity = (city: string) => {
  return useQuery({
    queryKey: ['zones', city],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.ZONES.LIST}/city/${city}`);
      return response.data;
    },
    enabled: !!city,
  });
};

// Fetch single zone
export const useZone = (id: string) => {
  return useQuery({
    queryKey: ['zones', id],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.ZONES.GET(id)}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Create a new zone
export const useCreateZone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (zoneData: CreateZonePayload) => {
      const response = await apiClient.post(API_ENDPOINTS.ZONES.CREATE, zoneData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] });
    },
  });
};

// Update a zone
export const useUpdateZone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateZonePayload }) => {
      const response = await apiClient.patch(API_ENDPOINTS.ZONES.UPDATE(id), data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] });
    },
  });
};

// Delete a zone
export const useDeleteZone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(API_ENDPOINTS.ZONES.DELETE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] });
    },
  });
};

// Activate a zone
export const useActivateZone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.patch(`${API_ENDPOINTS.ZONES.GET(id)}/activate`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] });
    },
  });
};

// Deactivate a zone
export const useDeactivateZone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.patch(`${API_ENDPOINTS.ZONES.GET(id)}/deactivate`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] });
    },
  });
};

// Split a zone
export const useSplitZone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (splitData: SplitZonePayload) => {
      const response = await apiClient.post(`${API_ENDPOINTS.ZONES.LIST}/split`, splitData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] });
    },
  });
};

// Merge zones
export const useMergeZones = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mergeData: MergeZonesPayload) => {
      const response = await apiClient.post(`${API_ENDPOINTS.ZONES.LIST}/merge`, mergeData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] });
    },
  });
};
