import type {
  FraudFlag,
  FraudSummary,
  FraudTrendData,
  FraudTypeDistribution,
  SeverityDistribution,
  FraudControlMetric,
  RepeatOffender,
  FraudSeverity,
  FraudStatus,
  FraudType,
  EntityType,
  FlagSource,
} from './types';

// ============================================================
// Color & Label Helpers
// ============================================================

export const getSeverityColor = (severity: FraudSeverity): string => {
  const colors: Record<FraudSeverity, string> = {
    medium: '#F59E0B',
    high: '#EF4444',
    critical: '#7C3AED'
  };
  return colors[severity] || '#6B7280';
};

export const getStatusColor = (status: FraudStatus): string => {
  const colors: Record<FraudStatus, string> = {
    open: '#EF4444',
    investigating: '#F59E0B',
    confirmed: '#7C3AED',
    cleared: '#10B981'
  };
  return colors[status] || '#6B7280';
};

export const getFraudTypeColor = (type: FraudType): string => {
  const colors: Record<FraudType, string> = {
    weight_fraud: '#EF4444',
    payout_abuse: '#F59E0B',
    identity_farming: '#8B5CF6',
    location_spoofing: '#3B82F6',
    collusion: '#EC4899',
    system_abuse: '#6B7280'
  };
  return colors[type] || '#6B7280';
};

export const getEntityTypeColor = (type: EntityType): string => {
  const colors: Record<EntityType, string> = {
    user: '#3B82F6',
    agent: '#F59E0B',
    enterprise: '#8B5CF6'
  };
  return colors[type] || '#6B7280';
};

export const getFlagSourceColor = (source: FlagSource): string => {
  const colors: Record<FlagSource, string> = {
    system: '#3B82F6',
    ops_escalated: '#F59E0B',
    audit_triggered: '#8B5CF6'
  };
  return colors[source] || '#6B7280';
};

export const getSeverityLabel = (severity: FraudSeverity): string => {
  const labels: Record<FraudSeverity, string> = {
    medium: 'Medium',
    high: 'High',
    critical: 'Critical'
  };
  return labels[severity] || severity;
};

export const getStatusLabel = (status: FraudStatus): string => {
  const labels: Record<FraudStatus, string> = {
    open: 'Open',
    investigating: 'Investigating',
    confirmed: 'Confirmed',
    cleared: 'Cleared'
  };
  return labels[status] || status;
};

export const getFraudTypeLabel = (type: FraudType): string => {
  const labels: Record<FraudType, string> = {
    weight_fraud: 'Weight Fraud',
    payout_abuse: 'Payout Abuse',
    identity_farming: 'Identity Farming',
    location_spoofing: 'Location Spoofing',
    collusion: 'Collusion',
    system_abuse: 'System Abuse'
  };
  return labels[type] || type;
};

export const getEntityTypeLabel = (type: EntityType): string => {
  const labels: Record<EntityType, string> = {
    user: 'User',
    agent: 'Agent',
    enterprise: 'Enterprise'
  };
  return labels[type] || type;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// ============================================================
// Mock Fraud Flags (Nigerian Data)
// ============================================================

export const mockFraudFlags: FraudFlag[] = [
  {
    id: 'FRD-001',
    entity: {
      id: 'AGT-112',
      name: 'Chukwuemeka Obi',
      type: 'agent',
      phone: '+234 803 456 7890',
      email: 'c.obi@recliq.ng',
      registeredAt: '2023-03-15T00:00:00Z',
      priorFlags: 3,
      accountStatus: 'restricted'
    },
    fraudType: 'weight_fraud',
    severity: 'critical',
    status: 'investigating',
    title: 'Systematic weight inflation across 47 transactions',
    description: 'Agent consistently reports 30-40% higher weights than verified scale readings at Alaba International Market hub. Pattern spans 6 weeks with increasing frequency.',
    riskScore: 94,
    riskScoreBreakdown: {
      behaviorScore: 95,
      financialScore: 92,
      velocityScore: 88,
      networkScore: 72,
      historyScore: 85
    },
    financialExposure: 2800000,
    fundsFrozen: 1200000,
    affectedTransactions: 47,
    currency: 'NGN',
    city: 'Lagos',
    zone: 'Ojo',
    state: 'Lagos',
    flagSource: 'system',
    flaggedBy: 'Anomaly Detection Engine',
    flaggedAt: '2024-01-15T09:30:00Z',
    signals: [
      { id: 'SIG-001', type: 'weight_anomaly', description: 'Weight reported 35% above verified average', confidence: 96, detectedAt: '2024-01-15T09:30:00Z' },
      { id: 'SIG-002', type: 'pattern_match', description: 'Consistent inflation pattern over 6 weeks', confidence: 92, detectedAt: '2024-01-15T09:30:00Z' },
      { id: 'SIG-003', type: 'velocity_spike', description: 'Transaction frequency 2x above peer average', confidence: 78, detectedAt: '2024-01-14T14:00:00Z' }
    ],
    evidence: [
      { id: 'EV-001', type: 'weight_log', description: 'Scale discrepancy report - 47 transactions', collectedBy: 'System', collectedAt: '2024-01-15T09:30:00Z', verified: true },
      { id: 'EV-002', type: 'photo', description: 'CCTV footage of weight station manipulation', collectedBy: 'Ops Team', collectedAt: '2024-01-16T11:00:00Z', verified: true },
      { id: 'EV-003', type: 'transaction_log', description: 'Full transaction history with timestamps', collectedBy: 'System', collectedAt: '2024-01-15T09:30:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-001', action: 'Flag created', description: 'System detected weight anomaly pattern', performedBy: 'System', performedAt: '2024-01-15T09:30:00Z' },
      { id: 'TL-002', action: 'Investigation opened', description: 'Compliance team assigned', performedBy: 'Adaeze Nwosu', performedAt: '2024-01-16T09:00:00Z' },
      { id: 'TL-003', action: 'Funds frozen', description: '₦1.2M frozen pending investigation', performedBy: 'Finance Team', performedAt: '2024-01-16T10:00:00Z' },
      { id: 'TL-004', action: 'Account restricted', description: 'Agent pickup privileges suspended', performedBy: 'Adaeze Nwosu', performedAt: '2024-01-16T11:00:00Z' }
    ],
    linkedAccountIds: [],
    linkedFlagIds: ['FRD-008'],
    deviceHistory: [
      { id: 'DEV-001', deviceId: 'SM-A145F-NG-7821', deviceType: 'Samsung Galaxy A14', ipAddress: '105.112.45.67', location: 'Lagos, Ojo', lastSeen: '2024-01-15T18:00:00Z', flagged: false },
      { id: 'DEV-002', deviceId: 'TECNO-SP7-3421', deviceType: 'Tecno Spark 7', ipAddress: '105.112.45.67', location: 'Lagos, Ojo', lastSeen: '2024-01-10T12:00:00Z', flagged: true }
    ],
    enforcementActions: [
      { id: 'ENF-001', action: 'restrict_account', description: 'Pickup privileges suspended', performedBy: 'Adaeze Nwosu', performedAt: '2024-01-16T11:00:00Z', reversible: true }
    ],
    createdAt: '2024-01-15T09:30:00Z',
    updatedAt: '2024-01-18T16:00:00Z',
    daysOpen: 12,
    assignedTo: 'Adaeze Nwosu'
  },
  {
    id: 'FRD-002',
    entity: {
      id: 'USR-667',
      name: 'Biodun Afolabi',
      type: 'user',
      phone: '+234 705 678 9012',
      email: 'biodun.a@gmail.com',
      registeredAt: '2023-06-20T00:00:00Z',
      priorFlags: 2,
      accountStatus: 'active'
    },
    fraudType: 'payout_abuse',
    severity: 'high',
    status: 'open',
    title: 'Duplicate payout claims via dual-channel submission',
    description: 'User submitting identical collection claims through both mobile app and agent channel. 23 duplicate claims identified over 4 weeks.',
    riskScore: 82,
    riskScoreBreakdown: {
      behaviorScore: 88,
      financialScore: 85,
      velocityScore: 75,
      networkScore: 68,
      historyScore: 72
    },
    financialExposure: 1450000,
    fundsFrozen: 0,
    affectedTransactions: 23,
    currency: 'NGN',
    city: 'Lagos',
    zone: 'Ikeja',
    state: 'Lagos',
    flagSource: 'ops_escalated',
    flaggedBy: 'Ngozi Eze - Finance Team',
    flaggedAt: '2024-01-18T11:00:00Z',
    signals: [
      { id: 'SIG-004', type: 'duplicate_claim', description: '23 duplicate payout requests matched', confidence: 98, detectedAt: '2024-01-18T10:00:00Z' },
      { id: 'SIG-005', type: 'multi_channel', description: 'Same collections submitted via app and agent', confidence: 95, detectedAt: '2024-01-18T10:00:00Z' }
    ],
    evidence: [
      { id: 'EV-004', type: 'transaction_log', description: 'Duplicate transaction IDs matched', collectedBy: 'Finance Team', collectedAt: '2024-01-18T11:00:00Z', verified: true },
      { id: 'EV-005', type: 'system_log', description: 'App and agent submission timestamps', collectedBy: 'System', collectedAt: '2024-01-18T11:30:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-005', action: 'Flag created', description: 'Finance team detected duplicate payouts', performedBy: 'Ngozi Eze', performedAt: '2024-01-18T11:00:00Z' },
      { id: 'TL-006', action: 'Escalated to Fraud', description: 'Pattern indicates intentional abuse', performedBy: 'Ngozi Eze', performedAt: '2024-01-18T14:00:00Z' }
    ],
    linkedAccountIds: ['AGT-089'],
    linkedFlagIds: [],
    deviceHistory: [
      { id: 'DEV-003', deviceId: 'IPHONE-14-NG-5543', deviceType: 'iPhone 14', ipAddress: '197.210.78.34', location: 'Lagos, Ikeja', lastSeen: '2024-01-18T16:00:00Z', flagged: false }
    ],
    enforcementActions: [],
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
    daysOpen: 5,
    assignedTo: 'Emeka Okafor'
  },
  {
    id: 'FRD-003',
    entity: {
      id: 'AGT-201',
      name: 'Emeka Nnamdi',
      type: 'agent',
      phone: '+234 813 456 7890',
      email: 'e.nnamdi@recliq.ng',
      registeredAt: '2023-08-10T00:00:00Z',
      priorFlags: 1,
      accountStatus: 'suspended'
    },
    fraudType: 'location_spoofing',
    severity: 'critical',
    status: 'confirmed',
    title: 'GPS spoofing ring - 5 agents filing ghost pickups in Port Harcourt',
    description: 'Network of 5 agents filing pickup reports for non-existent collections. GPS data shows agents were not at reported locations. Coordinated activity pattern detected.',
    riskScore: 97,
    riskScoreBreakdown: {
      behaviorScore: 98,
      financialScore: 95,
      velocityScore: 92,
      networkScore: 96,
      historyScore: 65
    },
    financialExposure: 4500000,
    fundsFrozen: 4500000,
    affectedTransactions: 134,
    currency: 'NGN',
    city: 'Port Harcourt',
    zone: 'Diobu',
    state: 'Rivers',
    flagSource: 'system',
    flaggedBy: 'GPS Anomaly Detection Engine',
    flaggedAt: '2024-01-23T06:00:00Z',
    signals: [
      { id: 'SIG-006', type: 'gps_mismatch', description: 'Agent location 15km from reported pickup', confidence: 99, detectedAt: '2024-01-23T06:00:00Z' },
      { id: 'SIG-007', type: 'network_pattern', description: '5 agents with correlated activity patterns', confidence: 94, detectedAt: '2024-01-23T06:00:00Z' },
      { id: 'SIG-008', type: 'ghost_pickup', description: 'No user confirmation for 89% of pickups', confidence: 97, detectedAt: '2024-01-23T06:30:00Z' },
      { id: 'SIG-009', type: 'device_anomaly', description: 'Mock location app detected on 3 devices', confidence: 100, detectedAt: '2024-01-23T07:00:00Z' }
    ],
    evidence: [
      { id: 'EV-006', type: 'gps_data', description: 'GPS location mismatch report for all 5 agents', collectedBy: 'System', collectedAt: '2024-01-23T06:00:00Z', verified: true },
      { id: 'EV-007', type: 'device_fingerprint', description: 'Mock location app signatures detected', collectedBy: 'System', collectedAt: '2024-01-23T07:00:00Z', verified: true },
      { id: 'EV-008', type: 'transaction_log', description: '134 fraudulent transaction records', collectedBy: 'System', collectedAt: '2024-01-23T06:00:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-007', action: 'Flag created', description: 'GPS anomaly detected for 5 agents', performedBy: 'System', performedAt: '2024-01-23T06:00:00Z' },
      { id: 'TL-008', action: 'All agents suspended', description: 'Immediate suspension pending investigation', performedBy: 'Adaeze Nwosu', performedAt: '2024-01-23T08:00:00Z' },
      { id: 'TL-009', action: 'Funds frozen', description: '₦4.5M frozen across all linked accounts', performedBy: 'Finance Team', performedAt: '2024-01-23T09:00:00Z' },
      { id: 'TL-010', action: 'Fraud confirmed', description: 'Investigation confirmed organized fraud ring', performedBy: 'Adaeze Nwosu', performedAt: '2024-01-25T14:00:00Z' },
      { id: 'TL-011', action: 'Legal referral', description: 'Case referred to legal for criminal prosecution', performedBy: 'Adaeze Nwosu', performedAt: '2024-01-25T16:00:00Z' }
    ],
    linkedAccountIds: ['AGT-202', 'AGT-203', 'AGT-204', 'AGT-205'],
    linkedFlagIds: [],
    deviceHistory: [
      { id: 'DEV-004', deviceId: 'INFINIX-HOT12-8834', deviceType: 'Infinix Hot 12', ipAddress: '41.203.67.89', location: 'Port Harcourt, Diobu', lastSeen: '2024-01-23T05:00:00Z', flagged: true },
      { id: 'DEV-005', deviceId: 'REDMI-NOTE11-2291', deviceType: 'Xiaomi Redmi Note 11', ipAddress: '41.203.67.91', location: 'Port Harcourt, Diobu', lastSeen: '2024-01-23T05:30:00Z', flagged: true }
    ],
    enforcementActions: [
      { id: 'ENF-002', action: 'suspend_privileges', description: 'All 5 agents suspended', performedBy: 'Adaeze Nwosu', performedAt: '2024-01-23T08:00:00Z', reversible: false },
      { id: 'ENF-003', action: 'reverse_payouts', description: '₦4.5M payout reversal initiated', performedBy: 'Finance Team', performedAt: '2024-01-23T09:00:00Z', reversible: false },
      { id: 'ENF-004', action: 'escalate_legal', description: 'Criminal referral filed', performedBy: 'Adaeze Nwosu', performedAt: '2024-01-25T16:00:00Z', reversible: false }
    ],
    createdAt: '2024-01-23T06:00:00Z',
    updatedAt: '2024-01-25T16:00:00Z',
    daysOpen: 0,
    assignedTo: 'Adaeze Nwosu',
    reviewedBy: 'Dr. Funke Adeyinka'
  },
  {
    id: 'FRD-004',
    entity: {
      id: 'USR-334',
      name: 'Aisha Mohammed',
      type: 'user',
      phone: '+234 806 123 4567',
      email: 'aisha.m@hotmail.com',
      registeredAt: '2023-11-01T00:00:00Z',
      priorFlags: 0,
      accountStatus: 'active'
    },
    fraudType: 'identity_farming',
    severity: 'high',
    status: 'investigating',
    title: 'Multiple accounts linked to single device in Kano',
    description: '7 user accounts registered from the same device within 48 hours. All accounts making small collections and requesting immediate payouts. Classic identity farming pattern.',
    riskScore: 78,
    riskScoreBreakdown: {
      behaviorScore: 72,
      financialScore: 65,
      velocityScore: 95,
      networkScore: 88,
      historyScore: 40
    },
    financialExposure: 620000,
    fundsFrozen: 320000,
    affectedTransactions: 42,
    currency: 'NGN',
    city: 'Kano',
    zone: 'Fagge',
    state: 'Kano',
    flagSource: 'system',
    flaggedBy: 'Identity Verification Engine',
    flaggedAt: '2024-01-20T14:00:00Z',
    signals: [
      { id: 'SIG-010', type: 'device_reuse', description: '7 accounts from single device fingerprint', confidence: 99, detectedAt: '2024-01-20T14:00:00Z' },
      { id: 'SIG-011', type: 'velocity_spike', description: '7 registrations in 48 hours', confidence: 95, detectedAt: '2024-01-20T14:00:00Z' },
      { id: 'SIG-012', type: 'payout_pattern', description: 'Immediate payout requests on all accounts', confidence: 88, detectedAt: '2024-01-20T15:00:00Z' }
    ],
    evidence: [
      { id: 'EV-009', type: 'device_fingerprint', description: 'Single device ID across 7 accounts', collectedBy: 'System', collectedAt: '2024-01-20T14:00:00Z', verified: true },
      { id: 'EV-010', type: 'system_log', description: 'Registration timestamps and IP logs', collectedBy: 'System', collectedAt: '2024-01-20T14:30:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-012', action: 'Flag created', description: 'Device reuse pattern detected', performedBy: 'System', performedAt: '2024-01-20T14:00:00Z' },
      { id: 'TL-013', action: 'Investigation opened', description: 'Assigned to compliance team', performedBy: 'Emeka Okafor', performedAt: '2024-01-21T09:00:00Z' },
      { id: 'TL-014', action: 'Partial freeze', description: '₦320K frozen across linked accounts', performedBy: 'Finance Team', performedAt: '2024-01-21T10:00:00Z' }
    ],
    linkedAccountIds: ['USR-335', 'USR-336', 'USR-337', 'USR-338', 'USR-339', 'USR-340'],
    linkedFlagIds: [],
    deviceHistory: [
      { id: 'DEV-006', deviceId: 'TECNO-CAMON19-6612', deviceType: 'Tecno Camon 19', ipAddress: '154.113.22.45', location: 'Kano, Fagge', lastSeen: '2024-01-20T18:00:00Z', flagged: true }
    ],
    enforcementActions: [],
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-01-22T09:00:00Z',
    daysOpen: 7,
    assignedTo: 'Emeka Okafor'
  },
  {
    id: 'FRD-005',
    entity: {
      id: 'AGT-089',
      name: 'Kehinde Adeyemi',
      type: 'agent',
      phone: '+234 816 789 0123',
      email: 'k.adeyemi@recliq.ng',
      registeredAt: '2023-04-22T00:00:00Z',
      priorFlags: 1,
      accountStatus: 'restricted'
    },
    fraudType: 'collusion',
    severity: 'high',
    status: 'investigating',
    title: 'Agent-user collusion on inflated pickup volumes',
    description: 'Agent and user coordinating to inflate pickup volumes. Agent confirms false weights, user receives inflated payouts. Shared IP addresses detected.',
    riskScore: 85,
    riskScoreBreakdown: {
      behaviorScore: 82,
      financialScore: 88,
      velocityScore: 70,
      networkScore: 95,
      historyScore: 60
    },
    financialExposure: 1800000,
    fundsFrozen: 900000,
    affectedTransactions: 31,
    currency: 'NGN',
    city: 'Lagos',
    zone: 'Ikeja',
    state: 'Lagos',
    flagSource: 'audit_triggered',
    flaggedBy: 'Quarterly Audit - Q4 2023',
    flaggedAt: '2024-01-10T08:00:00Z',
    signals: [
      { id: 'SIG-013', type: 'network_link', description: 'Shared IP between agent and user accounts', confidence: 92, detectedAt: '2024-01-10T08:00:00Z' },
      { id: 'SIG-014', type: 'weight_anomaly', description: 'Agent-verified weights 45% above zone average', confidence: 89, detectedAt: '2024-01-10T08:30:00Z' },
      { id: 'SIG-015', type: 'exclusive_pairing', description: 'Agent handles 78% of this user\'s pickups', confidence: 94, detectedAt: '2024-01-10T09:00:00Z' }
    ],
    evidence: [
      { id: 'EV-011', type: 'system_log', description: 'Shared IP address logs', collectedBy: 'System', collectedAt: '2024-01-10T08:00:00Z', verified: true },
      { id: 'EV-012', type: 'transaction_log', description: 'Agent-user transaction pairing analysis', collectedBy: 'Audit Team', collectedAt: '2024-01-10T10:00:00Z', verified: true },
      { id: 'EV-013', type: 'communication', description: 'WhatsApp coordination messages', collectedBy: 'Compliance Team', collectedAt: '2024-01-12T14:00:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-015', action: 'Flag created', description: 'Audit identified collusion pattern', performedBy: 'Audit Team', performedAt: '2024-01-10T08:00:00Z' },
      { id: 'TL-016', action: 'Agent restricted', description: 'Pickup privileges limited', performedBy: 'Emeka Okafor', performedAt: '2024-01-11T09:00:00Z' },
      { id: 'TL-017', action: 'Funds frozen', description: '₦900K frozen', performedBy: 'Finance Team', performedAt: '2024-01-11T10:00:00Z' }
    ],
    linkedAccountIds: ['USR-667'],
    linkedFlagIds: ['FRD-002'],
    deviceHistory: [
      { id: 'DEV-007', deviceId: 'SM-A235F-NG-4412', deviceType: 'Samsung Galaxy A23', ipAddress: '197.210.78.34', location: 'Lagos, Ikeja', lastSeen: '2024-01-18T14:00:00Z', flagged: true }
    ],
    enforcementActions: [
      { id: 'ENF-005', action: 'restrict_account', description: 'Agent pickup privileges limited', performedBy: 'Emeka Okafor', performedAt: '2024-01-11T09:00:00Z', reversible: true }
    ],
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-19T16:00:00Z',
    daysOpen: 17,
    assignedTo: 'Emeka Okafor'
  },
  {
    id: 'FRD-006',
    entity: {
      id: 'USR-901',
      name: 'Oluwaseun Bakare',
      type: 'user',
      phone: '+234 703 234 5678',
      email: 'seun.bakare@yahoo.com',
      registeredAt: '2023-09-15T00:00:00Z',
      priorFlags: 0,
      accountStatus: 'active'
    },
    fraudType: 'system_abuse',
    severity: 'medium',
    status: 'open',
    title: 'Referral code abuse via automated sign-ups in Ibadan',
    description: 'User generating referral bonuses through automated account creation. 15 referral accounts show no genuine activity after initial bonus claim.',
    riskScore: 58,
    riskScoreBreakdown: {
      behaviorScore: 65,
      financialScore: 45,
      velocityScore: 82,
      networkScore: 55,
      historyScore: 30
    },
    financialExposure: 225000,
    fundsFrozen: 0,
    affectedTransactions: 15,
    currency: 'NGN',
    city: 'Ibadan',
    zone: 'Bodija',
    state: 'Oyo',
    flagSource: 'system',
    flaggedBy: 'Referral Abuse Detection',
    flaggedAt: '2024-01-22T10:00:00Z',
    signals: [
      { id: 'SIG-016', type: 'referral_abuse', description: '15 referral accounts with no post-bonus activity', confidence: 88, detectedAt: '2024-01-22T10:00:00Z' },
      { id: 'SIG-017', type: 'velocity_spike', description: '15 referrals in 72 hours', confidence: 85, detectedAt: '2024-01-22T10:00:00Z' }
    ],
    evidence: [
      { id: 'EV-014', type: 'system_log', description: 'Referral chain analysis', collectedBy: 'System', collectedAt: '2024-01-22T10:00:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-018', action: 'Flag created', description: 'Referral abuse pattern detected', performedBy: 'System', performedAt: '2024-01-22T10:00:00Z' }
    ],
    linkedAccountIds: [],
    linkedFlagIds: [],
    deviceHistory: [
      { id: 'DEV-008', deviceId: 'OPPO-A57-NG-7789', deviceType: 'Oppo A57', ipAddress: '102.89.34.56', location: 'Ibadan, Bodija', lastSeen: '2024-01-22T12:00:00Z', flagged: false }
    ],
    enforcementActions: [],
    createdAt: '2024-01-22T10:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z',
    daysOpen: 3,
    assignedTo: 'Bola Akinwale'
  },
  {
    id: 'FRD-007',
    entity: {
      id: 'AGT-178',
      name: 'Segun Adebayo',
      type: 'agent',
      phone: '+234 708 345 6789',
      email: 's.adebayo@recliq.ng',
      registeredAt: '2023-05-18T00:00:00Z',
      priorFlags: 0,
      accountStatus: 'active'
    },
    fraudType: 'weight_fraud',
    severity: 'medium',
    status: 'cleared',
    title: 'Weight discrepancy at Apapa industrial zone - equipment fault',
    description: 'Initial flag for weight discrepancies at Apapa hub. Investigation revealed faulty calibration on hub scale, not agent misconduct.',
    riskScore: 35,
    riskScoreBreakdown: {
      behaviorScore: 30,
      financialScore: 40,
      velocityScore: 25,
      networkScore: 20,
      historyScore: 10
    },
    financialExposure: 340000,
    fundsFrozen: 0,
    affectedTransactions: 18,
    currency: 'NGN',
    city: 'Lagos',
    zone: 'Apapa',
    state: 'Lagos',
    flagSource: 'system',
    flaggedBy: 'Weight Anomaly Detection',
    flaggedAt: '2024-01-08T09:00:00Z',
    signals: [
      { id: 'SIG-018', type: 'weight_anomaly', description: 'Weight readings 20% above expected', confidence: 72, detectedAt: '2024-01-08T09:00:00Z' }
    ],
    evidence: [
      { id: 'EV-015', type: 'weight_log', description: 'Scale calibration report', collectedBy: 'Ops Team', collectedAt: '2024-01-09T10:00:00Z', verified: true },
      { id: 'EV-016', type: 'photo', description: 'Faulty scale documentation', collectedBy: 'Ops Team', collectedAt: '2024-01-09T11:00:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-019', action: 'Flag created', description: 'Weight anomaly detected', performedBy: 'System', performedAt: '2024-01-08T09:00:00Z' },
      { id: 'TL-020', action: 'Investigation opened', description: 'Ops team dispatched to hub', performedBy: 'Bola Akinwale', performedAt: '2024-01-09T08:00:00Z' },
      { id: 'TL-021', action: 'Root cause found', description: 'Faulty scale calibration confirmed', performedBy: 'Ops Team', performedAt: '2024-01-09T14:00:00Z' },
      { id: 'TL-022', action: 'Flag cleared', description: 'Equipment fault, not fraud', performedBy: 'Emeka Okafor', performedAt: '2024-01-10T09:00:00Z' }
    ],
    linkedAccountIds: [],
    linkedFlagIds: [],
    deviceHistory: [
      { id: 'DEV-009', deviceId: 'SM-A135F-NG-1123', deviceType: 'Samsung Galaxy A13', ipAddress: '105.112.89.12', location: 'Lagos, Apapa', lastSeen: '2024-01-08T17:00:00Z', flagged: false }
    ],
    enforcementActions: [
      { id: 'ENF-006', action: 'clear_flag', description: 'Flag cleared - equipment fault confirmed', performedBy: 'Emeka Okafor', performedAt: '2024-01-10T09:00:00Z', reversible: false }
    ],
    createdAt: '2024-01-08T09:00:00Z',
    updatedAt: '2024-01-10T09:00:00Z',
    daysOpen: 0,
    assignedTo: 'Emeka Okafor',
    reviewedBy: 'Adaeze Nwosu'
  },
  {
    id: 'FRD-008',
    entity: {
      id: 'ENT-067',
      name: 'GreenCycle Waste Solutions Ltd',
      type: 'enterprise',
      phone: '+234 812 456 7890',
      email: 'ops@greencyclewaste.ng',
      registeredAt: '2023-02-01T00:00:00Z',
      priorFlags: 1,
      accountStatus: 'active'
    },
    fraudType: 'payout_abuse',
    severity: 'medium',
    status: 'investigating',
    title: 'Enterprise inflating collection volumes for rebate claims',
    description: 'Enterprise client submitting inflated monthly collection reports to qualify for higher volume rebate tier. Discrepancy between reported and verified volumes is 22%.',
    riskScore: 64,
    riskScoreBreakdown: {
      behaviorScore: 68,
      financialScore: 72,
      velocityScore: 45,
      networkScore: 50,
      historyScore: 55
    },
    financialExposure: 980000,
    fundsFrozen: 0,
    affectedTransactions: 8,
    currency: 'NGN',
    city: 'Abuja',
    zone: 'Garki',
    state: 'FCT',
    flagSource: 'audit_triggered',
    flaggedBy: 'Monthly Reconciliation Audit',
    flaggedAt: '2024-01-19T10:00:00Z',
    signals: [
      { id: 'SIG-019', type: 'volume_inflation', description: 'Reported volumes 22% above verified', confidence: 86, detectedAt: '2024-01-19T10:00:00Z' },
      { id: 'SIG-020', type: 'rebate_threshold', description: 'Volumes conveniently above rebate tier cutoff', confidence: 78, detectedAt: '2024-01-19T10:30:00Z' }
    ],
    evidence: [
      { id: 'EV-017', type: 'transaction_log', description: 'Monthly volume report vs verified weights', collectedBy: 'Finance Team', collectedAt: '2024-01-19T10:00:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-023', action: 'Flag created', description: 'Volume discrepancy detected in reconciliation', performedBy: 'Audit Team', performedAt: '2024-01-19T10:00:00Z' },
      { id: 'TL-024', action: 'Investigation opened', description: 'Enterprise account review initiated', performedBy: 'Emeka Okafor', performedAt: '2024-01-20T09:00:00Z' }
    ],
    linkedAccountIds: [],
    linkedFlagIds: ['FRD-001'],
    deviceHistory: [],
    enforcementActions: [],
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-22T14:00:00Z',
    daysOpen: 8,
    assignedTo: 'Emeka Okafor'
  }
];

// ============================================================
// Summary Data
// ============================================================

export const mockFraudSummary: FraudSummary = {
  activeFraudFlags: 5,
  highSeverityFlags: 4,
  financialExposure: 12715000,
  underInvestigation: 4,
  clearedFlags: 1,
  accountsRestricted: 3,
  totalFlags: 8,
  avgResolutionDays: 4.8,
  detectionAccuracy: 87.5
};

// ============================================================
// Chart Data
// ============================================================

export const mockFraudTrendData: FraudTrendData[] = [
  { month: 'Aug 2023', medium: 2, high: 1, critical: 0 },
  { month: 'Sep 2023', medium: 3, high: 2, critical: 1 },
  { month: 'Oct 2023', medium: 4, high: 1, critical: 0 },
  { month: 'Nov 2023', medium: 2, high: 3, critical: 1 },
  { month: 'Dec 2023', medium: 5, high: 2, critical: 2 },
  { month: 'Jan 2024', medium: 3, high: 3, critical: 2 }
];

export const mockFraudTypeDistribution: FraudTypeDistribution[] = [
  { type: 'weight_fraud', count: 14, percentage: 25, exposure: 5200000 },
  { type: 'payout_abuse', count: 12, percentage: 21, exposure: 3800000 },
  { type: 'identity_farming', count: 8, percentage: 14, exposure: 1500000 },
  { type: 'location_spoofing', count: 9, percentage: 16, exposure: 6200000 },
  { type: 'collusion', count: 7, percentage: 13, exposure: 4100000 },
  { type: 'system_abuse', count: 6, percentage: 11, exposure: 900000 }
];

export const mockSeverityDistribution: SeverityDistribution[] = [
  { severity: 'medium', count: 22, percentage: 39 },
  { severity: 'high', count: 24, percentage: 43 },
  { severity: 'critical', count: 10, percentage: 18 }
];

// ============================================================
// Systemic Fraud Data
// ============================================================

export const mockFraudControlMetrics: FraudControlMetric[] = [
  { id: 'fcm-1', label: 'Fraud Rate per 1,000 Txns', value: 3.8, unit: '', trend: 'up', trendValue: 15, threshold: 5.0, status: 'warning' },
  { id: 'fcm-2', label: 'Repeat Offenders', value: 9, unit: 'entities', trend: 'up', trendValue: 28, threshold: 5, status: 'critical' },
  { id: 'fcm-3', label: 'Detection Accuracy', value: 87.5, unit: '%', trend: 'up', trendValue: 3, threshold: 85, status: 'normal' },
  { id: 'fcm-4', label: 'Time to Resolution', value: 4.8, unit: 'days', trend: 'down', trendValue: -12, threshold: 7, status: 'normal' },
  { id: 'fcm-5', label: 'False Positive Rate', value: 12.5, unit: '%', trend: 'down', trendValue: -8, threshold: 15, status: 'normal' },
  { id: 'fcm-6', label: 'Recovery Rate', value: 58, unit: '%', trend: 'up', trendValue: 7, threshold: 75, status: 'warning' }
];

export const mockRepeatOffenders: RepeatOffender[] = [
  { id: 'AGT-112', name: 'Chukwuemeka Obi', type: 'agent', flagCount: 4, totalExposure: 3800000, riskScore: 94, lastFlagDate: '2024-01-15', accountStatus: 'restricted' },
  { id: 'AGT-201', name: 'Emeka Nnamdi', type: 'agent', flagCount: 3, totalExposure: 5200000, riskScore: 97, lastFlagDate: '2024-01-23', accountStatus: 'suspended' },
  { id: 'USR-667', name: 'Biodun Afolabi', type: 'user', flagCount: 3, totalExposure: 2100000, riskScore: 82, lastFlagDate: '2024-01-18', accountStatus: 'active' },
  { id: 'AGT-089', name: 'Kehinde Adeyemi', type: 'agent', flagCount: 2, totalExposure: 1800000, riskScore: 85, lastFlagDate: '2024-01-10', accountStatus: 'restricted' },
  { id: 'ENT-067', name: 'GreenCycle Waste Solutions', type: 'enterprise', flagCount: 2, totalExposure: 1200000, riskScore: 64, lastFlagDate: '2024-01-19', accountStatus: 'active' }
];
