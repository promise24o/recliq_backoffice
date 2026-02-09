import { Dispute, DisputeSummary, DisputeTrend, DisputeInsight } from './types';

// Mock Disputes
export const mockDisputes: Dispute[] = [
  {
    id: 'DSP001',
    relatedId: 'REQ001',
    relatedType: 'pickup',
    disputeType: 'weight_disagreement',
    status: 'open',
    raisedBy: 'user',
    priority: 'high',
    city: 'Lagos',
    zone: 'Ikoyi',
    coordinates: { lat: 6.4524, lng: 3.4158 },
    agentId: 'AGT001',
    agentName: 'Samuel Kamau',
    agentPhone: '+2348011111111',
    userId: 'USR001',
    userName: 'John Smith',
    userPhone: '+2348012345678',
    pickupMode: 'agent_to_user',
    matchType: 'scheduled',
    openDuration: 24,
    createdAt: '2024-01-14T10:30:00Z',
    updatedAt: '2024-01-14T10:30:00Z',
    evidence: {
      weightLogs: ['WGT001'],
      photos: ['/photos/dispute1a.jpg', '/photos/dispute1b.jpg'],
      videos: ['/videos/dispute1.mp4'],
      chatLogs: [
        {
          timestamp: '2024-01-14T10:25:00Z',
          sender: 'user',
          message: 'The agent weighed my waste at 4.5kg but I estimated 6kg. This seems wrong.'
        },
        {
          timestamp: '2024-01-14T10:28:00Z',
          sender: 'agent',
          message: 'I used the calibrated scale. The waste was mostly plastic bottles, lighter than expected.'
        }
      ],
      timeline: [
        {
          timestamp: '2024-01-14T10:00:00Z',
          event: 'Pickup Started',
          details: 'Agent arrived at location'
        },
        {
          timestamp: '2024-01-14T10:15:00Z',
          event: 'Weight Measured',
          details: 'Agent recorded 4.5kg'
        },
        {
          timestamp: '2024-01-14T10:30:00Z',
          event: 'Dispute Raised',
          details: 'User challenged weight measurement'
        }
      ],
      locationVerified: true
    },
    financialContext: {
      originalPayout: 45.00,
      fundsOnHold: 45.00,
      potentialAdjustment: 15.00,
      currency: 'NGN'
    }
  },
  {
    id: 'DSP002',
    relatedId: 'DROP001',
    relatedType: 'dropoff',
    disputeType: 'payout_mismatch',
    status: 'under_review',
    raisedBy: 'agent',
    priority: 'medium',
    city: 'Lagos',
    zone: 'Victoria Island',
    coordinates: { lat: 6.4281, lng: 3.4219 },
    agentId: 'AGT002',
    agentName: 'Grace Okafor',
    agentPhone: '+2348022222222',
    userId: 'USR002',
    userName: 'Mary Johnson',
    userPhone: '+2348023456789',
    pickupMode: 'user_to_agent',
    matchType: 'immediate',
    openDuration: 48,
    createdAt: '2024-01-13T14:30:00Z',
    updatedAt: '2024-01-13T16:00:00Z',
    evidence: {
      photos: ['/photos/dispute2a.jpg'],
      videos: [],
      chatLogs: [
        {
          timestamp: '2024-01-13T14:35:00Z',
          sender: 'agent',
          message: 'The system shows I earned ₦120 but the user said they paid ₦150. Please check.'
        },
        {
          timestamp: '2024-01-13T15:00:00Z',
          sender: 'system',
          message: 'Payment verification initiated. Transaction ID: TXN123456'
        }
      ],
      timeline: [
        {
          timestamp: '2024-01-13T14:20:00Z',
          event: 'Drop-off Completed',
          details: 'User dropped off 3.2kg paper waste'
        },
        {
          timestamp: '2024-01-13T14:25:00Z',
          event: 'Payment Processed',
          details: '₦120 credited to agent wallet'
        },
        {
          timestamp: '2024-01-13T14:30:00Z',
          event: 'Dispute Raised',
          details: 'Agent reported payout mismatch'
        }
      ],
      locationVerified: true
    },
    financialContext: {
      originalPayout: 120.00,
      fundsOnHold: 30.00,
      potentialAdjustment: 30.00,
      currency: 'NGN'
    }
  },
  {
    id: 'DSP003',
    relatedId: 'REQ002',
    relatedType: 'pickup',
    disputeType: 'agent_no_show',
    status: 'resolved',
    raisedBy: 'user',
    priority: 'critical',
    city: 'Abuja',
    zone: 'Maitama',
    coordinates: { lat: 9.0765, lng: 7.3986 },
    agentId: 'AGT003',
    agentName: 'Ahmed Bello',
    agentPhone: '+2348033333333',
    userId: 'USR003',
    userName: 'David Kimani',
    userPhone: '+2348034567890',
    pickupMode: 'agent_to_user',
    matchType: 'scheduled',
    openDuration: 72,
    createdAt: '2024-01-12T09:00:00Z',
    updatedAt: '2024-01-12T15:30:00Z',
    resolvedAt: '2024-01-12T15:30:00Z',
    evidence: {
      photos: ['/photos/dispute3a.jpg'],
      videos: ['/videos/dispute3.mp4'],
      chatLogs: [
        {
          timestamp: '2024-01-12T09:05:00Z',
          sender: 'user',
          message: 'Agent was supposed to arrive at 9:00 AM but hasn\'t shown up.'
        },
        {
          timestamp: '2024-01-12T09:15:00Z',
          sender: 'agent',
          message: 'Vehicle broke down. ETA 30 minutes.'
        },
        {
          timestamp: '2024-01-12T10:00:00Z',
          sender: 'user',
          message: 'Still no agent. This is unacceptable.'
        }
      ],
      timeline: [
        {
          timestamp: '2024-01-12T09:00:00Z',
          event: 'Scheduled Pickup Time',
          details: 'Agent failed to arrive'
        },
        {
          timestamp: '2024-01-12T09:15:00Z',
          event: 'Agent Alerted',
          details: 'Agent reported vehicle issues'
        },
        {
          timestamp: '2024-01-12T10:30:00Z',
          event: 'Dispute Raised',
          details: 'User reported no-show'
        },
        {
          timestamp: '2024-01-12T15:30:00Z',
          event: 'Dispute Resolved',
          details: 'User compensated for inconvenience'
        }
      ],
      locationVerified: true
    },
    financialContext: {
      originalPayout: 0.00,
      fundsOnHold: 0.00,
      potentialAdjustment: 50.00,
      currency: 'NGN'
    },
    resolution: {
      action: 'approve_user',
      resolvedBy: 'OPS001',
      resolvedAt: '2024-01-12T15:30:00Z',
      finalPayout: 50.00,
      notes: 'Agent no-show confirmed. User compensated for inconvenience.',
      auditTrail: [
        {
          timestamp: '2024-01-12T10:30:00Z',
          action: 'dispute_opened',
          performedBy: 'system',
          details: 'User reported agent no-show'
        },
        {
          timestamp: '2024-01-12T15:30:00Z',
          action: 'dispute_resolved',
          performedBy: 'OPS001',
          details: 'User claim approved, ₦50 compensation awarded'
        }
      ]
    }
  },
  {
    id: 'DSP004',
    relatedId: 'DROP002',
    relatedType: 'dropoff',
    disputeType: 'suspicious_behavior',
    status: 'escalated',
    raisedBy: 'system',
    priority: 'critical',
    city: 'Port Harcourt',
    zone: 'GRA',
    coordinates: { lat: 4.8156, lng: 7.0498 },
    agentId: 'AGT004',
    agentName: 'Fatima Ibrahim',
    agentPhone: '+2348044444444',
    userId: 'USR004',
    userName: 'Grace Wanjiru',
    userPhone: '+2348045678901',
    pickupMode: 'user_to_agent',
    matchType: 'express',
    openDuration: 12,
    createdAt: '2024-01-15T13:20:00Z',
    updatedAt: '2024-01-15T14:00:00Z',
    evidence: {
      photos: ['/photos/dispute4a.jpg', '/photos/dispute4b.jpg'],
      videos: ['/videos/dispute4.mp4'],
      chatLogs: [
        {
          timestamp: '2024-01-15T13:25:00Z',
          sender: 'system',
          message: 'Alert: Unusual weight variance detected (40% above estimate)'
        },
        {
          timestamp: '2024-01-15T13:30:00Z',
          sender: 'agent',
          message: 'User brought much more waste than estimated. Scale calibrated properly.'
        }
      ],
      timeline: [
        {
          timestamp: '2024-01-15T13:20:00Z',
          event: 'Drop-off Started',
          details: 'User arrived with waste'
        },
        {
          timestamp: '2024-01-15T13:25:00Z',
          event: 'System Alert',
          details: 'High variance triggered fraud detection'
        },
        {
          timestamp: '2024-01-15T14:00:00Z',
          event: 'Dispute Escalated',
          details: 'Case sent to compliance team'
        }
      ],
      locationVerified: true
    },
    financialContext: {
      originalPayout: 140.00,
      fundsOnHold: 140.00,
      potentialAdjustment: 56.00,
      currency: 'NGN'
    },
    auditNotes: ['High variance pattern detected', 'Agent has 3 similar cases this month', 'Compliance review required']
  },
  {
    id: 'DSP005',
    relatedId: 'REQ003',
    relatedType: 'pickup',
    disputeType: 'missing_damaged',
    status: 'resolved',
    raisedBy: 'agent',
    priority: 'low',
    city: 'Kano',
    zone: 'Sabon Gari',
    coordinates: { lat: 11.9604, lng: 8.5219 },
    agentId: 'AGT005',
    agentName: 'Chidi Okoro',
    agentPhone: '+2348055555555',
    userId: 'USR005',
    userName: 'James Muriithi',
    userPhone: '+2348056789012',
    pickupMode: 'agent_to_user',
    matchType: 'scheduled',
    openDuration: 6,
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T17:00:00Z',
    resolvedAt: '2024-01-15T17:00:00Z',
    evidence: {
      photos: ['/photos/dispute5a.jpg'],
      videos: [],
      chatLogs: [
        {
          timestamp: '2024-01-15T11:05:00Z',
          sender: 'agent',
          message: 'User said they had 5kg of plastic but only had 2kg when I arrived.'
        },
        {
          timestamp: '2024-01-15T11:10:00Z',
          sender: 'user',
          message: 'Sorry, I misestimated. The 2kg is correct.'
        }
      ],
      timeline: [
        {
          timestamp: '2024-01-15T11:00:00Z',
          event: 'Pickup Started',
          details: 'Agent arrived at location'
        },
        {
          timestamp: '2024-01-15T11:05:00Z',
          event: 'Dispute Raised',
          details: 'Agent reported missing waste'
        },
        {
          timestamp: '2024-01-15T17:00:00Z',
          event: 'Dispute Resolved',
          details: 'User confirmed misestimation'
        }
      ],
      locationVerified: true
    },
    financialContext: {
      originalPayout: 20.00,
      fundsOnHold: 0.00,
      potentialAdjustment: 0.00,
      currency: 'NGN'
    },
    resolution: {
      action: 'dismiss',
      resolvedBy: 'OPS002',
      resolvedAt: '2024-01-15T17:00:00Z',
      finalPayout: 20.00,
      notes: 'User admitted to misestimation. Original payout stands.',
      auditTrail: [
        {
          timestamp: '2024-01-15T11:05:00Z',
          action: 'dispute_opened',
          performedBy: 'agent',
          details: 'Agent reported missing waste'
        },
        {
          timestamp: '2024-01-15T17:00:00Z',
          action: 'dispute_resolved',
          performedBy: 'OPS002',
          details: 'Dispute dismissed, user confirmed error'
        }
      ]
    }
  }
];

// Mock Summary Data
export const mockDisputeSummary: DisputeSummary = {
  openDisputes: 23,
  underReview: 15,
  resolved: 156,
  escalated: 4,
  weightRelated: 67,
  payoutRelated: 34,
  avgResolutionTime: 18.5
};

// Mock Trend Data
export const mockDisputeTrends: DisputeTrend[] = [
  { date: '2024-01-10', total: 12, resolved: 8, escalated: 1, avgResolutionTime: 16.2 },
  { date: '2024-01-11', total: 15, resolved: 10, escalated: 2, avgResolutionTime: 18.7 },
  { date: '2024-01-12', total: 18, resolved: 12, escalated: 1, avgResolutionTime: 20.1 },
  { date: '2024-01-13', total: 14, resolved: 11, escalated: 0, avgResolutionTime: 15.8 },
  { date: '2024-01-14', total: 20, resolved: 14, escalated: 3, avgResolutionTime: 22.3 },
  { date: '2024-01-15', total: 16, resolved: 13, escalated: 1, avgResolutionTime: 17.9 }
];

// Mock Insights Data
export const mockDisputeInsights: DisputeInsight[] = [
  {
    type: 'repeat_users',
    title: 'Repeat Dispute Users',
    description: 'Users with 3+ disputes in the last 30 days',
    value: 8,
    trend: 'up',
    affectedEntities: ['John Smith', 'Mary Johnson', 'David Kimani'],
    recommendations: [
      'Review user onboarding process',
      'Implement dispute limit warnings',
      'Consider user education program'
    ]
  },
  {
    type: 'repeat_agents',
    title: 'Repeat Dispute Agents',
    description: 'Agents with 5+ disputes in the last 30 days',
    value: 3,
    trend: 'stable',
    affectedEntities: ['Samuel Kamau', 'Grace Okafor'],
    recommendations: [
      'Schedule agent retraining',
      'Review agent performance metrics',
      'Implement agent quality scoring'
    ]
  },
  {
    type: 'disputes_per_100',
    title: 'Disputes per 100 Pickups',
    description: 'Dispute rate normalized by transaction volume',
    value: 4.2,
    trend: 'down',
    affectedEntities: ['Lagos', 'Abuja'],
    recommendations: [
      'Maintain current dispute resolution process',
      'Share best practices across cities',
      'Monitor for trend changes'
    ]
  },
  {
    type: 'weight_correlation',
    title: 'Weight Dispute Correlation',
    description: 'Correlation between weight variance and dispute rate',
    value: 0.73,
    trend: 'up',
    affectedEntities: ['Victoria Island', 'GRA'],
    recommendations: [
      'Improve weight estimation UI',
      'Provide better user guidance',
      'Consider location-based estimation factors'
    ]
  }
];
