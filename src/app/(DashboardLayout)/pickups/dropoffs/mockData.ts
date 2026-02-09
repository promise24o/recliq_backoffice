import { DropoffRecord, DropoffLocation, DropoffSummary, DropoffTrend, DropoffFraudInsight } from './types';

// Mock Drop-off Records
export const mockDropoffRecords: DropoffRecord[] = [
  {
    id: 'DROP001',
    userId: 'USR001',
    userName: 'John Smith',
    userPhone: '+2348012345678',
    agentId: 'AGT001',
    agentName: 'Samuel Kamau',
    agentPhone: '+2348011111111',
    dropoffLocationId: 'LOC001',
    dropoffLocationName: 'Ikoyi Recycling Hub',
    city: 'Lagos',
    zone: 'Ikoyi',
    coordinates: { lat: 6.4524, lng: 3.4158 },
    wasteType: 'plastic',
    estimatedWeight: 5.0,
    finalWeight: 5.2,
    verificationMethod: 'qr_code',
    completionDate: '2024-01-15T14:30:00Z',
    arrivalTime: '2024-01-15T14:25:00Z',
    completionTime: '2024-01-15T14:30:00Z',
    duration: 5,
    pricing: {
      pricePerKg: 50,
      grossValue: 260,
      userPayout: 234,
      agentEarnings: 20.8,
      platformFee: 5.2,
      currency: 'NGN'
    },
    walletTransactionId: 'WAL001',
    agentTransactionId: 'AGT001',
    verificationSignals: {
      checkInConfirmed: true,
      photoEvidence: true,
      weightVerified: true,
      locationMatch: true
    },
    impactMetrics: {
      kgRecycled: 5.2,
      co2Saved: 11.7,
      environmentalCredits: 2.6
    },
    status: 'completed',
    disputeCount: 0
  },
  {
    id: 'DROP002',
    userId: 'USR002',
    userName: 'Mary Johnson',
    userPhone: '+2348023456789',
    agentId: 'AGT002',
    agentName: 'Grace Okafor',
    agentPhone: '+2348022222222',
    dropoffLocationId: 'LOC002',
    dropoffLocationName: 'Victoria Island Collection Point',
    city: 'Lagos',
    zone: 'Victoria Island',
    coordinates: { lat: 6.4281, lng: 3.4219 },
    wasteType: 'paper',
    estimatedWeight: 3.5,
    finalWeight: 3.8,
    verificationMethod: 'geo_location',
    completionDate: '2024-01-15T16:45:00Z',
    arrivalTime: '2024-01-15T16:40:00Z',
    completionTime: '2024-01-15T16:45:00Z',
    duration: 5,
    pricing: {
      pricePerKg: 35,
      grossValue: 133,
      userPayout: 119.7,
      agentEarnings: 10.64,
      platformFee: 2.66,
      currency: 'NGN'
    },
    walletTransactionId: 'WAL002',
    agentTransactionId: 'AGT002',
    verificationSignals: {
      checkInConfirmed: true,
      photoEvidence: false,
      weightVerified: true,
      locationMatch: true
    },
    impactMetrics: {
      kgRecycled: 3.8,
      co2Saved: 6.46,
      environmentalCredits: 1.9
    },
    status: 'completed',
    disputeCount: 0
  },
  {
    id: 'DROP003',
    userId: 'USR003',
    userName: 'David Kimani',
    userPhone: '+2348034567890',
    agentId: 'AGT003',
    agentName: 'Ahmed Bello',
    agentPhone: '+2348033333333',
    dropoffLocationId: 'LOC003',
    dropoffLocationName: 'Maitama Eco Center',
    city: 'Abuja',
    zone: 'Maitama',
    coordinates: { lat: 9.0765, lng: 7.3986 },
    wasteType: 'metal',
    estimatedWeight: 8.0,
    finalWeight: 8.5,
    verificationMethod: 'photo',
    completionDate: '2024-01-15T10:15:00Z',
    arrivalTime: '2024-01-15T10:05:00Z',
    completionTime: '2024-01-15T10:15:00Z',
    duration: 10,
    pricing: {
      pricePerKg: 80,
      grossValue: 680,
      userPayout: 612,
      agentEarnings: 54.4,
      platformFee: 13.6,
      currency: 'NGN'
    },
    walletTransactionId: 'WAL003',
    agentTransactionId: 'AGT003',
    verificationSignals: {
      checkInConfirmed: true,
      photoEvidence: true,
      weightVerified: true,
      locationMatch: true
    },
    impactMetrics: {
      kgRecycled: 8.5,
      co2Saved: 17.85,
      environmentalCredits: 4.25
    },
    status: 'completed',
    disputeCount: 0
  },
  {
    id: 'DROP004',
    userId: 'USR004',
    userName: 'Grace Wanjiru',
    userPhone: '+2348045678901',
    agentId: 'AGT004',
    agentName: 'Fatima Ibrahim',
    agentPhone: '+2348044444444',
    dropoffLocationId: 'LOC004',
    dropoffLocationName: 'GRA Drop-off Station',
    city: 'Port Harcourt',
    zone: 'GRA',
    coordinates: { lat: 4.8156, lng: 7.0498 },
    wasteType: 'e_waste',
    estimatedWeight: 2.0,
    finalWeight: 2.1,
    verificationMethod: 'manual',
    completionDate: '2024-01-15T13:20:00Z',
    arrivalTime: '2024-01-15T13:10:00Z',
    completionTime: '2024-01-15T13:20:00Z',
    duration: 10,
    pricing: {
      pricePerKg: 60,
      grossValue: 126,
      userPayout: 113.4,
      agentEarnings: 10.08,
      platformFee: 2.52,
      currency: 'NGN'
    },
    walletTransactionId: 'WAL004',
    agentTransactionId: 'AGT004',
    verificationSignals: {
      checkInConfirmed: true,
      photoEvidence: false,
      weightVerified: true,
      locationMatch: true
    },
    impactMetrics: {
      kgRecycled: 2.1,
      co2Saved: 12.6,
      environmentalCredits: 1.05
    },
    status: 'disputed',
    disputeCount: 1,
    notes: 'User disputes weight measurement'
  },
  {
    id: 'DROP005',
    userId: 'USR005',
    userName: 'James Muriithi',
    userPhone: '+2348056789012',
    agentId: 'AGT005',
    agentName: 'Chidi Okoro',
    agentPhone: '+2348055555555',
    dropoffLocationId: 'LOC005',
    dropoffLocationName: 'Sabon Gari Collection Point',
    city: 'Kano',
    zone: 'Sabon Gari',
    coordinates: { lat: 11.9604, lng: 8.5219 },
    wasteType: 'mixed',
    estimatedWeight: 6.5,
    finalWeight: 6.7,
    verificationMethod: 'qr_code',
    completionDate: '2024-01-15T11:30:00Z',
    arrivalTime: '2024-01-15T11:22:00Z',
    completionTime: '2024-01-15T11:30:00Z',
    duration: 8,
    pricing: {
      pricePerKg: 70,
      grossValue: 469,
      userPayout: 422.1,
      agentEarnings: 37.52,
      platformFee: 9.38,
      currency: 'NGN'
    },
    walletTransactionId: 'WAL005',
    agentTransactionId: 'AGT005',
    verificationSignals: {
      checkInConfirmed: true,
      photoEvidence: true,
      weightVerified: true,
      locationMatch: true
    },
    impactMetrics: {
      kgRecycled: 6.7,
      co2Saved: 13.4,
      environmentalCredits: 3.35
    },
    status: 'completed',
    disputeCount: 0
  }
];

// Mock Drop-off Locations
export const mockDropoffLocations: DropoffLocation[] = [
  {
    id: 'LOC001',
    name: 'Ikoyi Recycling Hub',
    address: '123 Awolowo Road, Ikoyi',
    city: 'Lagos',
    zone: 'Ikoyi',
    coordinates: { lat: 6.4524, lng: 3.4158 },
    agentId: 'AGT001',
    agentName: 'Samuel Kamau',
    isActive: true,
    operatingHours: { open: '08:00', close: '18:00' },
    totalDropoffs: 145,
    totalWeight: 786.5,
    averageRating: 4.8
  },
  {
    id: 'LOC002',
    name: 'Victoria Island Collection Point',
    address: '456 Ahmadu Bello Way, Victoria Island',
    city: 'Lagos',
    zone: 'Victoria Island',
    coordinates: { lat: 6.4281, lng: 3.4219 },
    agentId: 'AGT002',
    agentName: 'Grace Okafor',
    isActive: true,
    operatingHours: { open: '07:00', close: '19:00' },
    totalDropoffs: 234,
    totalWeight: 1234.8,
    averageRating: 4.6
  },
  {
    id: 'LOC003',
    name: 'Maitama Eco Center',
    address: '789 Mambilla Street, Maitama',
    city: 'Abuja',
    zone: 'Maitama',
    coordinates: { lat: 9.0765, lng: 7.3986 },
    agentId: 'AGT003',
    agentName: 'Ahmed Bello',
    isActive: true,
    operatingHours: { open: '08:00', close: '17:00' },
    totalDropoffs: 89,
    totalWeight: 567.2,
    averageRating: 4.9
  },
  {
    id: 'LOC004',
    name: 'GRA Drop-off Station',
    address: '321 Aba Road, GRA',
    city: 'Port Harcourt',
    zone: 'GRA',
    coordinates: { lat: 4.8156, lng: 7.0498 },
    agentId: 'AGT004',
    agentName: 'Fatima Ibrahim',
    isActive: true,
    operatingHours: { open: '09:00', close: '16:00' },
    totalDropoffs: 67,
    totalWeight: 234.5,
    averageRating: 4.4
  },
  {
    id: 'LOC005',
    name: 'Sabon Gari Collection Point',
    address: '654 Market Road, Sabon Gari',
    city: 'Kano',
    zone: 'Sabon Gari',
    coordinates: { lat: 11.9604, lng: 8.5219 },
    agentId: 'AGT005',
    agentName: 'Chidi Okoro',
    isActive: true,
    operatingHours: { open: '08:00', close: '18:00' },
    totalDropoffs: 123,
    totalWeight: 890.3,
    averageRating: 4.7
  }
];

// Mock Summary Data
export const mockDropoffSummary: DropoffSummary = {
  completedDropoffs: 658,
  totalWeightReceived: 3713.3,
  totalUserPayouts: 284567.50,
  activeDropoffAgents: 12,
  avgDropoffDuration: 7.2,
  dropoffIssues: 8
};

// Mock Trend Data
export const mockDropoffTrends: DropoffTrend[] = [
  { date: '2024-01-09', dropoffs: 82, pickups: 156, weight: 412.5, userPayouts: 28765.50 },
  { date: '2024-01-10', dropoffs: 94, pickups: 142, weight: 467.8, userPayouts: 32134.20 },
  { date: '2024-01-11', dropoffs: 78, pickups: 168, weight: 389.2, userPayouts: 26984.40 },
  { date: '2024-01-12', dropoffs: 103, pickups: 134, weight: 523.6, userPayouts: 37123.80 },
  { date: '2024-01-13', dropoffs: 89, pickups: 149, weight: 445.1, userPayouts: 31245.70 },
  { date: '2024-01-14', dropoffs: 96, pickups: 139, weight: 498.3, userPayouts: 35678.90 },
  { date: '2024-01-15', dropoffs: 116, pickups: 128, weight: 576.8, userPayouts: 42634.40 }
];

// Mock Fraud Insights
export const mockFraudInsights: DropoffFraudInsight[] = [
  {
    type: 'repeat_users',
    title: 'High Frequency Drop-offs',
    description: 'Users with more than 5 drop-offs per week',
    count: 12,
    severity: 'medium',
    affectedRecords: ['DROP001', 'DROP003', 'DROP005']
  },
  {
    type: 'weight_variance',
    title: 'Weight Discrepancies',
    description: 'Final weight varies >20% from estimate',
    count: 8,
    severity: 'high',
    affectedRecords: ['DROP002', 'DROP004']
  },
  {
    type: 'suspicious_frequency',
    title: 'Unusual Timing Patterns',
    description: 'Drop-offs outside operating hours',
    count: 3,
    severity: 'high',
    affectedRecords: ['DROP004']
  },
  {
    type: 'agent_anomaly',
    title: 'Agent Performance Issues',
    description: 'Agents with high dispute rates',
    count: 2,
    severity: 'medium',
    affectedRecords: ['DROP004']
  }
];
