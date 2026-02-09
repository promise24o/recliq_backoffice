import { WeightLog, WeightAccuracySummary, WeightVarianceData, WeightAnomaly } from './types';

// Mock Weight Logs
export const mockWeightLogs: WeightLog[] = [
  {
    id: 'WGT001',
    relatedId: 'REQ001',
    relatedType: 'pickup',
    userId: 'USR001',
    userName: 'John Smith',
    userPhone: '+2348012345678',
    agentId: 'AGT001',
    agentName: 'Samuel Kamau',
    agentPhone: '+2348011111111',
    city: 'Lagos',
    zone: 'Ikoyi',
    coordinates: { lat: 6.4524, lng: 3.4158 },
    wasteType: 'plastic',
    estimatedWeight: 5.0,
    measuredWeight: 5.3,
    finalWeight: 5.2,
    variance: 4.0,
    verificationMethod: 'agent_scale',
    timestamp: '2024-01-15T10:30:00Z',
    measurementTimeline: {
      estimatedAt: '2024-01-15T10:15:00Z',
      measuredAt: '2024-01-15T10:28:00Z',
      confirmedAt: '2024-01-15T10:30:00Z',
      lockedAt: '2024-01-15T10:31:00Z'
    },
    evidence: {
      scalePhotos: ['/photos/scale1.jpg', '/photos/scale1b.jpg'],
      wastePhotos: ['/photos/waste1.jpg', '/photos/waste1b.jpg'],
      locationVerified: true,
      deviceMetadata: {
        deviceType: 'Digital Scale Pro 2000',
        calibrationDate: '2024-01-01T00:00:00Z',
        lastMaintenance: '2024-01-10T00:00:00Z'
      }
    },
    financialImpact: {
      payoutDifference: 10.00,
      agentEarningsImpact: 0.80,
      platformMarginAdjustment: 1.20,
      currency: 'NGN'
    },
    status: 'verified',
    disputeCount: 0
  },
  {
    id: 'WGT002',
    relatedId: 'DROP001',
    relatedType: 'dropoff',
    userId: 'USR002',
    userName: 'Mary Johnson',
    userPhone: '+2348023456789',
    agentId: 'AGT002',
    agentName: 'Grace Okafor',
    agentPhone: '+2348022222222',
    city: 'Lagos',
    zone: 'Victoria Island',
    coordinates: { lat: 6.4281, lng: 3.4219 },
    wasteType: 'paper',
    estimatedWeight: 3.5,
    measuredWeight: 4.2,
    finalWeight: 4.1,
    variance: 17.1,
    verificationMethod: 'photo_assisted',
    timestamp: '2024-01-15T14:30:00Z',
    measurementTimeline: {
      estimatedAt: '2024-01-15T14:20:00Z',
      measuredAt: '2024-01-15T14:28:00Z',
      confirmedAt: '2024-01-15T14:30:00Z',
      lockedAt: '2024-01-15T14:31:00Z'
    },
    evidence: {
      scalePhotos: ['/photos/scale2.jpg'],
      wastePhotos: ['/photos/waste2.jpg', '/photos/waste2b.jpg'],
      locationVerified: true,
      deviceMetadata: {
        deviceType: 'Smart Scale X1',
        calibrationDate: '2024-01-05T00:00:00Z',
        lastMaintenance: '2024-01-12T00:00:00Z'
      }
    },
    financialImpact: {
      payoutDifference: 21.00,
      agentEarningsImpact: 1.68,
      platformMarginAdjustment: 2.52,
      currency: 'NGN'
    },
    status: 'verified',
    disputeCount: 0
  },
  {
    id: 'WGT003',
    relatedId: 'REQ002',
    relatedType: 'pickup',
    userId: 'USR003',
    userName: 'David Kimani',
    userPhone: '+2348034567890',
    agentId: 'AGT003',
    agentName: 'Ahmed Bello',
    agentPhone: '+2348033333333',
    city: 'Abuja',
    zone: 'Maitama',
    coordinates: { lat: 9.0765, lng: 7.3986 },
    wasteType: 'metal',
    estimatedWeight: 8.0,
    measuredWeight: 7.2,
    finalWeight: 7.5,
    variance: -6.3,
    verificationMethod: 'user_confirmation',
    timestamp: '2024-01-15T09:15:00Z',
    measurementTimeline: {
      estimatedAt: '2024-01-15T09:00:00Z',
      measuredAt: '2024-01-15T09:10:00Z',
      confirmedAt: '2024-01-15T09:15:00Z',
      lockedAt: '2024-01-15T09:16:00Z'
    },
    evidence: {
      scalePhotos: ['/photos/scale3.jpg'],
      wastePhotos: ['/photos/waste3.jpg'],
      locationVerified: true,
      deviceMetadata: {
        deviceType: 'Digital Scale Pro 2000',
        calibrationDate: '2024-01-01T00:00:00Z',
        lastMaintenance: '2024-01-08T00:00:00Z'
      }
    },
    financialImpact: {
      payoutDifference: -40.00,
      agentEarningsImpact: -3.20,
      platformMarginAdjustment: -4.80,
      currency: 'NGN'
    },
    status: 'disputed',
    disputeCount: 1,
    auditNotes: ['User claims scale was inaccurate']
  },
  {
    id: 'WGT004',
    relatedId: 'DROP002',
    relatedType: 'dropoff',
    userId: 'USR004',
    userName: 'Grace Wanjiru',
    userPhone: '+2348045678901',
    agentId: 'AGT004',
    agentName: 'Fatima Ibrahim',
    agentPhone: '+2348044444444',
    city: 'Port Harcourt',
    zone: 'GRA',
    coordinates: { lat: 4.8156, lng: 7.0498 },
    wasteType: 'e_waste',
    estimatedWeight: 2.0,
    measuredWeight: 2.8,
    finalWeight: 2.8,
    variance: 40.0,
    verificationMethod: 'smart_scale',
    timestamp: '2024-01-15T13:20:00Z',
    measurementTimeline: {
      estimatedAt: '2024-01-15T13:10:00Z',
      measuredAt: '2024-01-15T13:18:00Z',
      confirmedAt: '2024-01-15T13:20:00Z',
      lockedAt: '2024-01-15T13:21:00Z'
    },
    evidence: {
      scalePhotos: ['/photos/scale4.jpg', '/photos/scale4b.jpg'],
      wastePhotos: ['/photos/waste4.jpg'],
      locationVerified: true,
      deviceMetadata: {
        deviceType: 'Smart Scale X1',
        calibrationDate: '2024-01-03T00:00:00Z',
        lastMaintenance: '2024-01-15T00:00:00Z'
      }
    },
    financialImpact: {
      payoutDifference: 48.00,
      agentEarningsImpact: 3.84,
      platformMarginAdjustment: 5.76,
      currency: 'NGN'
    },
    status: 'flagged',
    disputeCount: 0,
    auditNotes: ['High variance detected', 'Under investigation']
  },
  {
    id: 'WGT005',
    relatedId: 'REQ003',
    relatedType: 'pickup',
    userId: 'USR005',
    userName: 'James Muriithi',
    userPhone: '+2348056789012',
    agentId: 'AGT005',
    agentName: 'Chidi Okoro',
    agentPhone: '+2348055555555',
    city: 'Kano',
    zone: 'Sabon Gari',
    coordinates: { lat: 11.9604, lng: 8.5219 },
    wasteType: 'mixed',
    estimatedWeight: 6.5,
    measuredWeight: 6.7,
    finalWeight: 6.7,
    variance: 3.1,
    verificationMethod: 'agent_scale',
    timestamp: '2024-01-15T11:30:00Z',
    measurementTimeline: {
      estimatedAt: '2024-01-15T11:20:00Z',
      measuredAt: '2024-01-15T11:28:00Z',
      confirmedAt: '2024-01-15T11:30:00Z',
      lockedAt: '2024-01-15T11:31:00Z'
    },
    evidence: {
      scalePhotos: ['/photos/scale5.jpg'],
      wastePhotos: ['/photos/waste5.jpg', '/photos/waste5b.jpg'],
      locationVerified: true,
      deviceMetadata: {
        deviceType: 'Digital Scale Pro 2000',
        calibrationDate: '2024-01-01T00:00:00Z',
        lastMaintenance: '2024-01-09T00:00:00Z'
      }
    },
    financialImpact: {
      payoutDifference: 13.40,
      agentEarningsImpact: 1.07,
      platformMarginAdjustment: 1.61,
      currency: 'NGN'
    },
    status: 'verified',
    disputeCount: 0,
    manualAdjustments: [
      {
        originalWeight: 6.8,
        adjustedWeight: 6.7,
        reason: 'Scale calibration adjustment',
        adjustedBy: 'OPS001',
        adjustedAt: '2024-01-15T11:35:00Z'
      }
    ]
  }
];

// Mock Summary Data
export const mockWeightAccuracySummary: WeightAccuracySummary = {
  totalWeighins: 1247,
  avgWeightVariance: 8.3,
  highVarianceLogs: 89,
  agentsWithRepeatedVariance: 12,
  disputedWeights: 23,
  totalWeightVerified: 5678.9
};

// Mock Variance Data
export const mockWeightVarianceData: WeightVarianceData[] = [
  {
    agentId: 'AGT001',
    agentName: 'Samuel Kamau',
    variance: 4.2,
    count: 45,
    wasteType: 'plastic',
    city: 'Lagos'
  },
  {
    agentId: 'AGT002',
    agentName: 'Grace Okafor',
    variance: 15.8,
    count: 67,
    wasteType: 'paper',
    city: 'Lagos'
  },
  {
    agentId: 'AGT003',
    agentName: 'Ahmed Bello',
    variance: -6.3,
    count: 34,
    wasteType: 'metal',
    city: 'Abuja'
  },
  {
    agentId: 'AGT004',
    agentName: 'Fatima Ibrahim',
    variance: 28.4,
    count: 28,
    wasteType: 'e_waste',
    city: 'Port Harcourt'
  },
  {
    agentId: 'AGT005',
    agentName: 'Chidi Okoro',
    variance: 3.1,
    count: 56,
    wasteType: 'mixed',
    city: 'Kano'
  }
];

// Mock Anomaly Data
export const mockWeightAnomalies: WeightAnomaly[] = [
  {
    type: 'repeated_variance',
    title: 'Repeated High Variance Agents',
    description: 'Agents consistently showing variance above 20% threshold',
    count: 8,
    severity: 'high',
    affectedLogs: ['WGT002', 'WGT004'],
    recommendations: [
      'Schedule scale calibration review',
      'Conduct agent retraining',
      'Implement dual verification for high-value items'
    ]
  },
  {
    type: 'suspicious_rounding',
    title: 'Suspicious Weight Rounding',
    description: 'Weights consistently rounded to 0.5kg increments',
    count: 34,
    severity: 'medium',
    affectedLogs: ['WGT001', 'WGT005'],
    recommendations: [
      'Review scale precision settings',
      'Audit agent measurement practices',
      'Consider random spot checks'
    ]
  },
  {
    type: 'peak_hour_variance',
    title: 'Peak Hour Variance Spikes',
    description: 'Higher variance during 12-4pm peak hours',
    count: 67,
    severity: 'medium',
    affectedLogs: ['WGT002', 'WGT004'],
    recommendations: [
      'Increase supervision during peak hours',
      'Implement automated alerts for high variance',
      'Review time-based estimation accuracy'
    ]
  },
  {
    type: 'dropoff_vs_pickup',
    title: 'Drop-off vs Pickup Variance Gap',
    description: 'Drop-offs showing 12% higher variance than pickups',
    count: 156,
    severity: 'low',
    affectedLogs: ['WGT002', 'WGT004'],
    recommendations: [
      'Improve drop-off estimation UI',
      'Provide better user guidance',
      'Consider location-based estimation factors'
    ]
  }
];
