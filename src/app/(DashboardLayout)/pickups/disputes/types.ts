export interface Dispute {
  id: string;
  relatedId: string; // Pickup or Drop-off ID
  relatedType: 'pickup' | 'dropoff';
  disputeType: 'weight_disagreement' | 'missing_damaged' | 'payout_mismatch' | 'agent_no_show' | 'dropoff_rejection' | 'suspicious_behavior';
  status: 'open' | 'under_review' | 'resolved' | 'escalated';
  raisedBy: 'user' | 'agent' | 'system';
  priority: 'low' | 'medium' | 'high' | 'critical';
  city: string;
  zone: string;
  coordinates: { lat: number; lng: number };
  agentId: string;
  agentName: string;
  agentPhone: string;
  userId: string;
  userName: string;
  userPhone: string;
  pickupMode: 'agent_to_user' | 'user_to_agent';
  matchType: 'scheduled' | 'immediate' | 'express';
  openDuration: number; // hours since opened
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  evidence: {
    weightLogs?: string[];
    photos: string[];
    videos: string[];
    chatLogs: Array<{
      timestamp: string;
      sender: 'user' | 'agent' | 'system';
      message: string;
    }>;
    timeline: Array<{
      timestamp: string;
      event: string;
      details: string;
    }>;
    locationVerified: boolean;
  };
  financialContext: {
    originalPayout: number;
    fundsOnHold: number;
    potentialAdjustment: number;
    currency: 'NGN';
  };
  resolution?: {
    action: 'approve_agent' | 'approve_user' | 'split' | 'adjust_payout' | 'dismiss' | 'escalate';
    resolvedBy: string;
    resolvedAt: string;
    finalPayout: number;
    notes: string;
    auditTrail: Array<{
      timestamp: string;
      action: string;
      performedBy: string;
      details: string;
    }>;
  };
  auditNotes?: string[];
}

export interface DisputeSummary {
  openDisputes: number;
  underReview: number;
  resolved: number;
  escalated: number;
  weightRelated: number;
  payoutRelated: number;
  avgResolutionTime: number; // hours
}

export interface DisputeTrend {
  date: string;
  total: number;
  resolved: number;
  escalated: number;
  avgResolutionTime: number;
}

export interface DisputeInsight {
  type: 'repeat_users' | 'repeat_agents' | 'disputes_per_100' | 'weight_correlation';
  title: string;
  description: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  affectedEntities: string[];
  recommendations: string[];
}

export interface DisputeFilters {
  status: string;
  disputeType: string;
  city: string;
  zone: string;
  pickupMode: string;
  matchType: string;
  raisedBy: string;
  dateRange: { start: string; end: string };
}
