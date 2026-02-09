export interface DropoffRecord {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  agentId: string;
  agentName: string;
  agentPhone: string;
  dropoffLocationId: string;
  dropoffLocationName: string;
  city: string;
  zone: string;
  coordinates: { lat: number; lng: number };
  wasteType: 'plastic' | 'paper' | 'metal' | 'e_waste' | 'mixed' | 'glass';
  estimatedWeight: number;
  finalWeight: number;
  verificationMethod: 'qr_code' | 'geo_location' | 'photo' | 'manual';
  completionDate: string;
  arrivalTime: string;
  completionTime: string;
  duration: number; // in minutes
  pricing: {
    pricePerKg: number;
    grossValue: number;
    userPayout: number;
    agentEarnings: number;
    platformFee: number;
    currency: 'NGN';
  };
  walletTransactionId: string;
  agentTransactionId: string;
  verificationSignals: {
    checkInConfirmed: boolean;
    photoEvidence: boolean;
    weightVerified: boolean;
    locationMatch: boolean;
  };
  impactMetrics: {
    kgRecycled: number;
    co2Saved: number;
    environmentalCredits: number;
  };
  status: 'completed' | 'disputed' | 'flagged';
  disputeCount: number;
  notes?: string;
  auditNotes?: string[];
}

export interface DropoffLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  zone: string;
  coordinates: { lat: number; lng: number };
  agentId: string;
  agentName: string;
  isActive: boolean;
  operatingHours: {
    open: string;
    close: string;
  };
  totalDropoffs: number;
  totalWeight: number;
  averageRating: number;
}

export interface DropoffSummary {
  completedDropoffs: number;
  totalWeightReceived: number;
  totalUserPayouts: number;
  activeDropoffAgents: number;
  avgDropoffDuration: number;
  dropoffIssues: number;
}

export interface DropoffTrend {
  date: string;
  dropoffs: number;
  pickups: number;
  weight: number;
  userPayouts: number;
}

export interface DropoffFraudInsight {
  type: 'repeat_users' | 'weight_variance' | 'suspicious_frequency' | 'agent_anomaly';
  title: string;
  description: string;
  count: number;
  severity: 'low' | 'medium' | 'high';
  affectedRecords: string[];
}

export interface DropoffFilters {
  dateRange: { start: string; end: string };
  city: string;
  zone: string;
  dropoffLocation: string;
  agent: string;
  wasteType: string;
}
