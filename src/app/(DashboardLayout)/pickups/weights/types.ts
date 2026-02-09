export interface WeightLog {
  id: string;
  relatedId: string; // Pickup or Drop-off ID
  relatedType: 'pickup' | 'dropoff';
  userId: string;
  userName: string;
  userPhone: string;
  agentId: string;
  agentName: string;
  agentPhone: string;
  city: string;
  zone: string;
  coordinates: { lat: number; lng: number };
  wasteType: 'plastic' | 'paper' | 'metal' | 'e_waste' | 'mixed' | 'glass';
  estimatedWeight: number;
  measuredWeight: number;
  finalWeight: number;
  variance: number; // percentage
  verificationMethod: 'agent_scale' | 'user_confirmation' | 'photo_assisted' | 'smart_scale';
  timestamp: string;
  measurementTimeline: {
    estimatedAt: string;
    measuredAt: string;
    confirmedAt: string;
    lockedAt: string;
  };
  evidence: {
    scalePhotos: string[];
    wastePhotos: string[];
    locationVerified: boolean;
    deviceMetadata: {
      deviceType: string;
      calibrationDate: string;
      lastMaintenance: string;
    };
  };
  financialImpact: {
    payoutDifference: number;
    agentEarningsImpact: number;
    platformMarginAdjustment: number;
    currency: 'NGN';
  };
  status: 'verified' | 'disputed' | 'adjusted' | 'flagged';
  disputeCount: number;
  auditNotes?: string[];
  manualAdjustments?: {
    originalWeight: number;
    adjustedWeight: number;
    reason: string;
    adjustedBy: string;
    adjustedAt: string;
  }[];
}

export interface WeightAccuracySummary {
  totalWeighins: number;
  avgWeightVariance: number;
  highVarianceLogs: number;
  agentsWithRepeatedVariance: number;
  disputedWeights: number;
  totalWeightVerified: number;
}

export interface WeightVarianceData {
  agentId: string;
  agentName: string;
  variance: number;
  count: number;
  wasteType: string;
  city: string;
}

export interface WeightAnomaly {
  type: 'repeated_variance' | 'suspicious_rounding' | 'peak_hour_variance' | 'dropoff_vs_pickup';
  title: string;
  description: string;
  count: number;
  severity: 'low' | 'medium' | 'high';
  affectedLogs: string[];
  recommendations: string[];
}

export interface WeightFilters {
  dateRange: { start: string; end: string };
  city: string;
  zone: string;
  pickupMode: 'pickup' | 'dropoff' | 'all';
  wasteType: string;
  agent: string;
  varianceThreshold: number;
}
