import type {
  RiskDispute,
  RiskDisputeSummary,
  SeverityTrendData,
  ExposureTrendData,
  CategoryDistribution,
  SystemicRiskMetric,
  RepeatRiskEntity,
  DisputeSeverity,
  DisputeStatus,
  DisputeCategory,
  EscalationSource,
  RiskLevel
} from './types';

// ============================================================
// Color & Label Helpers
// ============================================================

export const getSeverityColor = (severity: DisputeSeverity): string => {
  const colors: Record<DisputeSeverity, string> = {
    medium: '#F59E0B',
    high: '#EF4444',
    critical: '#7C3AED'
  };
  return colors[severity] || '#6B7280';
};

export const getStatusColor = (status: DisputeStatus): string => {
  const colors: Record<DisputeStatus, string> = {
    open: '#EF4444',
    investigating: '#F59E0B',
    resolved: '#10B981',
    referred: '#8B5CF6'
  };
  return colors[status] || '#6B7280';
};

export const getCategoryColor = (category: DisputeCategory): string => {
  const colors: Record<DisputeCategory, string> = {
    weight_manipulation: '#EF4444',
    payout_abuse: '#F59E0B',
    agent_misconduct: '#8B5CF6',
    enterprise_sla: '#3B82F6',
    system_error: '#6B7280',
    fraud: '#DC2626',
    compliance_breach: '#EC4899'
  };
  return colors[category] || '#6B7280';
};

export const getRiskLevelColor = (level: RiskLevel): string => {
  const colors: Record<RiskLevel, string> = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444',
    critical: '#7C3AED'
  };
  return colors[level] || '#6B7280';
};

export const getEscalationSourceColor = (source: EscalationSource): string => {
  const colors: Record<EscalationSource, string> = {
    ops: '#3B82F6',
    auto_flagged: '#EF4444',
    compliance: '#8B5CF6',
    finance: '#F59E0B',
    external: '#6B7280'
  };
  return colors[source] || '#6B7280';
};

export const getCategoryLabel = (category: DisputeCategory): string => {
  const labels: Record<DisputeCategory, string> = {
    weight_manipulation: 'Weight Manipulation',
    payout_abuse: 'Payout Abuse',
    agent_misconduct: 'Agent Misconduct',
    enterprise_sla: 'Enterprise SLA',
    system_error: 'System Error',
    fraud: 'Fraud',
    compliance_breach: 'Compliance Breach'
  };
  return labels[category] || category;
};

export const getSeverityLabel = (severity: DisputeSeverity): string => {
  const labels: Record<DisputeSeverity, string> = {
    medium: 'Medium',
    high: 'High',
    critical: 'Critical'
  };
  return labels[severity] || severity;
};

export const getStatusLabel = (status: DisputeStatus): string => {
  const labels: Record<DisputeStatus, string> = {
    open: 'Open',
    investigating: 'Investigating',
    resolved: 'Resolved',
    referred: 'Referred'
  };
  return labels[status] || status;
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
// Mock Risk Disputes (Nigerian Data)
// ============================================================

export const mockRiskDisputes: RiskDispute[] = [
  {
    id: 'RSK-001',
    disputeId: 'DSP-2024-0847',
    category: 'weight_manipulation',
    severity: 'critical',
    status: 'investigating',
    title: 'Systematic weight inflation at Alaba International Market hub',
    description: 'Pattern of weight discrepancies detected across 47 transactions at the Alaba hub. Agent consistently reports 30-40% higher weights than verified scale readings. Total exposure exceeds ₦2.8M in overpayments.',
    financialExposure: 2800000,
    currency: 'NGN',
    fundsAtRisk: 2100000,
    recoveredAmount: 350000,
    parties: [
      { id: 'AGT-112', name: 'Chukwuemeka Obi', role: 'respondent', type: 'agent', phone: '+234 803 456 7890', email: 'c.obi@recliq.ng', priorDisputes: 3 },
      { id: 'USR-445', name: 'Alaba Market Traders Association', role: 'complainant', type: 'enterprise', phone: '+234 812 345 6789', email: 'info@alabatraders.ng', priorDisputes: 0 }
    ],
    city: 'Lagos',
    zone: 'Ojo',
    state: 'Lagos',
    escalationSource: 'auto_flagged',
    escalatedBy: 'System - Anomaly Detection',
    escalatedAt: '2024-01-15T09:30:00Z',
    riskAssessment: {
      legalRisk: 'high',
      financialRisk: 'critical',
      reputationalRisk: 'high',
      systemicRisk: 'medium',
      overallRisk: 'critical',
      assessmentNotes: 'Pattern indicates deliberate manipulation. Agent has prior warnings. Financial exposure is material.',
      assessedBy: 'Adaeze Nwosu',
      assessedAt: '2024-01-16T14:00:00Z'
    },
    evidence: [
      { id: 'EV-001', type: 'weight_log', description: 'Scale discrepancy report - 47 transactions', uploadedBy: 'System', uploadedAt: '2024-01-15T09:30:00Z', verified: true },
      { id: 'EV-002', type: 'photo', description: 'CCTV footage of weight station', uploadedBy: 'Ops Team', uploadedAt: '2024-01-16T11:00:00Z', verified: true },
      { id: 'EV-003', type: 'transaction_data', description: 'Transaction logs with timestamps', uploadedBy: 'System', uploadedAt: '2024-01-15T09:30:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-001', action: 'Auto-flagged', description: 'System detected weight anomaly pattern', performedBy: 'System', performedAt: '2024-01-15T09:30:00Z' },
      { id: 'TL-002', action: 'Escalated to Risk', description: 'Ops escalated due to financial materiality', performedBy: 'Tunde Bakare', performedAt: '2024-01-15T14:00:00Z' },
      { id: 'TL-003', action: 'Investigation started', description: 'Compliance team assigned', performedBy: 'Adaeze Nwosu', performedAt: '2024-01-16T09:00:00Z' },
      { id: 'TL-004', action: 'Evidence collected', description: 'CCTV and transaction logs secured', performedBy: 'Adaeze Nwosu', performedAt: '2024-01-16T14:00:00Z' }
    ],
    linkedDisputeIds: ['DSP-2024-0712', 'DSP-2024-0698'],
    isRepeatOffender: true,
    priorDisputeCount: 3,
    patternFlags: ['weight_inflation', 'repeat_agent', 'high_value'],
    isAuditTagged: true,
    auditNotes: ['Tagged for Q1 2024 compliance audit', 'Potential agent fraud ring investigation'],
    createdAt: '2024-01-15T09:30:00Z',
    updatedAt: '2024-01-18T16:00:00Z',
    daysOpen: 12,
    assignedTo: 'Adaeze Nwosu'
  },
  {
    id: 'RSK-002',
    disputeId: 'DSP-2024-0891',
    category: 'payout_abuse',
    severity: 'high',
    status: 'open',
    title: 'Duplicate payout claims from Ikeja recycling centre',
    description: 'Multiple payout requests for the same collection batches detected. User submitted claims through both mobile app and agent channel for identical pickups.',
    financialExposure: 1450000,
    currency: 'NGN',
    fundsAtRisk: 1450000,
    recoveredAmount: 0,
    parties: [
      { id: 'USR-667', name: 'Biodun Afolabi', role: 'respondent', type: 'individual', phone: '+234 705 678 9012', email: 'biodun.a@gmail.com', priorDisputes: 2 },
      { id: 'AGT-089', name: 'Kehinde Adeyemi', role: 'respondent', type: 'agent', phone: '+234 816 789 0123', email: 'k.adeyemi@recliq.ng', priorDisputes: 1 }
    ],
    city: 'Lagos',
    zone: 'Ikeja',
    state: 'Lagos',
    escalationSource: 'finance',
    escalatedBy: 'Ngozi Eze - Finance Team',
    escalatedAt: '2024-01-18T11:00:00Z',
    riskAssessment: {
      legalRisk: 'medium',
      financialRisk: 'high',
      reputationalRisk: 'medium',
      systemicRisk: 'high',
      overallRisk: 'high',
      assessmentNotes: 'Duplicate payout scheme. May indicate collusion between user and agent. System gap identified.',
      assessedBy: 'Emeka Okafor',
      assessedAt: '2024-01-19T10:00:00Z'
    },
    evidence: [
      { id: 'EV-004', type: 'transaction_data', description: 'Duplicate transaction IDs matched', uploadedBy: 'Finance Team', uploadedAt: '2024-01-18T11:00:00Z', verified: true },
      { id: 'EV-005', type: 'system_log', description: 'App submission logs', uploadedBy: 'System', uploadedAt: '2024-01-18T11:30:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-005', action: 'Flagged by Finance', description: 'Duplicate payouts detected in reconciliation', performedBy: 'Ngozi Eze', performedAt: '2024-01-18T11:00:00Z' },
      { id: 'TL-006', action: 'Escalated to Risk', description: 'Financial materiality threshold exceeded', performedBy: 'Ngozi Eze', performedAt: '2024-01-18T14:00:00Z' }
    ],
    linkedDisputeIds: [],
    isRepeatOffender: true,
    priorDisputeCount: 2,
    patternFlags: ['duplicate_claims', 'agent_collusion_suspected'],
    isAuditTagged: true,
    auditNotes: ['Flagged for payout process review'],
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
    daysOpen: 5,
    assignedTo: 'Emeka Okafor'
  },
  {
    id: 'RSK-003',
    disputeId: 'DSP-2024-0923',
    category: 'agent_misconduct',
    severity: 'high',
    status: 'investigating',
    title: 'Agent diverting recyclables to unauthorized buyer in Abuja',
    description: 'Field audit revealed agent collecting materials from Recliq-assigned pickups but selling to third-party buyers in Wuse Market. Estimated 3 months of diverted materials.',
    financialExposure: 3200000,
    currency: 'NGN',
    fundsAtRisk: 2400000,
    recoveredAmount: 0,
    parties: [
      { id: 'AGT-156', name: 'Ibrahim Musa', role: 'respondent', type: 'agent', phone: '+234 809 012 3456', email: 'i.musa@recliq.ng', priorDisputes: 0 },
      { id: 'ENT-034', name: 'Transcorp Hilton Abuja', role: 'complainant', type: 'enterprise', phone: '+234 901 234 5678', email: 'facilities@transcorphilton.com', priorDisputes: 0 }
    ],
    city: 'Abuja',
    zone: 'Wuse',
    state: 'FCT',
    escalationSource: 'ops',
    escalatedBy: 'Fatima Abdullahi - Ops Manager',
    escalatedAt: '2024-01-20T08:00:00Z',
    riskAssessment: {
      legalRisk: 'high',
      financialRisk: 'high',
      reputationalRisk: 'critical',
      systemicRisk: 'medium',
      overallRisk: 'high',
      assessmentNotes: 'Enterprise client relationship at risk. Agent violated terms of service. Potential criminal liability.',
      assessedBy: 'Adaeze Nwosu',
      assessedAt: '2024-01-20T14:00:00Z'
    },
    evidence: [
      { id: 'EV-006', type: 'photo', description: 'Field audit photos of diverted materials', uploadedBy: 'Fatima Abdullahi', uploadedAt: '2024-01-20T08:00:00Z', verified: true },
      { id: 'EV-007', type: 'document', description: 'Third-party buyer receipts', uploadedBy: 'Compliance Team', uploadedAt: '2024-01-21T10:00:00Z', verified: false },
      { id: 'EV-008', type: 'communication', description: 'WhatsApp messages between agent and buyer', uploadedBy: 'Compliance Team', uploadedAt: '2024-01-21T11:00:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-007', action: 'Field audit conducted', description: 'Routine audit revealed discrepancies', performedBy: 'Fatima Abdullahi', performedAt: '2024-01-19T15:00:00Z' },
      { id: 'TL-008', action: 'Escalated to Risk', description: 'Enterprise client impact and agent misconduct', performedBy: 'Fatima Abdullahi', performedAt: '2024-01-20T08:00:00Z' },
      { id: 'TL-009', action: 'Agent suspended', description: 'Pending investigation completion', performedBy: 'Adaeze Nwosu', performedAt: '2024-01-20T10:00:00Z' }
    ],
    linkedDisputeIds: [],
    isRepeatOffender: false,
    priorDisputeCount: 0,
    patternFlags: ['material_diversion', 'enterprise_impact'],
    isAuditTagged: true,
    auditNotes: ['Enterprise SLA breach investigation', 'Potential criminal referral'],
    createdAt: '2024-01-20T08:00:00Z',
    updatedAt: '2024-01-22T09:00:00Z',
    daysOpen: 7,
    assignedTo: 'Adaeze Nwosu'
  },
  {
    id: 'RSK-004',
    disputeId: 'DSP-2024-0956',
    category: 'enterprise_sla',
    severity: 'medium',
    status: 'open',
    title: 'Repeated SLA breaches at Dangote Cement Ikoyi office',
    description: 'Enterprise client reports 8 missed pickups in January. SLA compliance dropped to 62% against 95% target. Client threatening contract termination.',
    financialExposure: 850000,
    currency: 'NGN',
    fundsAtRisk: 850000,
    recoveredAmount: 0,
    parties: [
      { id: 'ENT-012', name: 'Dangote Cement Plc', role: 'complainant', type: 'enterprise', phone: '+234 802 345 6789', email: 'facilities@dangotecement.com', priorDisputes: 1 },
      { id: 'OPS-007', name: 'Lagos Island Ops Team', role: 'respondent', type: 'system', priorDisputes: 0 }
    ],
    city: 'Lagos',
    zone: 'Ikoyi',
    state: 'Lagos',
    escalationSource: 'ops',
    escalatedBy: 'Olumide Fashola - Enterprise Manager',
    escalatedAt: '2024-01-22T09:00:00Z',
    riskAssessment: {
      legalRisk: 'medium',
      financialRisk: 'medium',
      reputationalRisk: 'high',
      systemicRisk: 'medium',
      overallRisk: 'medium',
      assessmentNotes: 'High-value enterprise client. Contract value ₦18M/year. Reputational risk if Dangote exits.',
      assessedBy: 'Emeka Okafor',
      assessedAt: '2024-01-22T14:00:00Z'
    },
    evidence: [
      { id: 'EV-009', type: 'system_log', description: 'Pickup schedule vs completion logs', uploadedBy: 'System', uploadedAt: '2024-01-22T09:00:00Z', verified: true },
      { id: 'EV-010', type: 'communication', description: 'Client complaint emails', uploadedBy: 'Enterprise Team', uploadedAt: '2024-01-22T10:00:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-010', action: 'Client complaint received', description: '8 missed pickups reported', performedBy: 'Olumide Fashola', performedAt: '2024-01-22T09:00:00Z' },
      { id: 'TL-011', action: 'Escalated to Risk', description: 'Contract termination threat', performedBy: 'Olumide Fashola', performedAt: '2024-01-22T09:30:00Z' }
    ],
    linkedDisputeIds: ['DSP-2023-1245'],
    isRepeatOffender: false,
    priorDisputeCount: 1,
    patternFlags: ['sla_breach_pattern', 'high_value_client'],
    isAuditTagged: false,
    auditNotes: [],
    createdAt: '2024-01-22T09:00:00Z',
    updatedAt: '2024-01-22T14:00:00Z',
    daysOpen: 3,
    assignedTo: 'Emeka Okafor'
  },
  {
    id: 'RSK-005',
    disputeId: 'DSP-2024-0978',
    category: 'fraud',
    severity: 'critical',
    status: 'investigating',
    title: 'Ghost pickup ring detected in Port Harcourt',
    description: 'Investigation reveals a network of 5 agents filing pickup reports for non-existent collections. GPS data shows agents were not at reported locations. Estimated ₦4.5M in fraudulent payouts over 2 months.',
    financialExposure: 4500000,
    currency: 'NGN',
    fundsAtRisk: 4500000,
    recoveredAmount: 800000,
    parties: [
      { id: 'AGT-201', name: 'Emeka Nnamdi', role: 'respondent', type: 'agent', phone: '+234 813 456 7890', email: 'e.nnamdi@recliq.ng', priorDisputes: 1 },
      { id: 'AGT-202', name: 'Chidera Okoro', role: 'respondent', type: 'agent', phone: '+234 706 567 8901', email: 'c.okoro@recliq.ng', priorDisputes: 2 },
      { id: 'AGT-203', name: 'Obinna Eze', role: 'respondent', type: 'agent', phone: '+234 814 678 9012', email: 'o.eze@recliq.ng', priorDisputes: 0 },
      { id: 'AGT-204', name: 'Uchenna Igwe', role: 'respondent', type: 'agent', phone: '+234 905 789 0123', email: 'u.igwe@recliq.ng', priorDisputes: 1 },
      { id: 'AGT-205', name: 'Nkechi Okafor', role: 'respondent', type: 'agent', phone: '+234 807 890 1234', email: 'n.okafor@recliq.ng', priorDisputes: 0 }
    ],
    city: 'Port Harcourt',
    zone: 'Diobu',
    state: 'Rivers',
    escalationSource: 'auto_flagged',
    escalatedBy: 'System - GPS Anomaly Detection',
    escalatedAt: '2024-01-23T06:00:00Z',
    riskAssessment: {
      legalRisk: 'critical',
      financialRisk: 'critical',
      reputationalRisk: 'high',
      systemicRisk: 'critical',
      overallRisk: 'critical',
      assessmentNotes: 'Organized fraud ring. Criminal referral recommended. Systemic control failure in PH region.',
      assessedBy: 'Adaeze Nwosu',
      assessedAt: '2024-01-23T10:00:00Z'
    },
    evidence: [
      { id: 'EV-011', type: 'system_log', description: 'GPS location mismatch report', uploadedBy: 'System', uploadedAt: '2024-01-23T06:00:00Z', verified: true },
      { id: 'EV-012', type: 'transaction_data', description: 'Fraudulent transaction records', uploadedBy: 'System', uploadedAt: '2024-01-23T06:00:00Z', verified: true },
      { id: 'EV-013', type: 'document', description: 'Agent network analysis report', uploadedBy: 'Compliance Team', uploadedAt: '2024-01-24T09:00:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-012', action: 'Auto-flagged', description: 'GPS anomaly detected for 5 agents', performedBy: 'System', performedAt: '2024-01-23T06:00:00Z' },
      { id: 'TL-013', action: 'All agents suspended', description: 'Immediate suspension pending investigation', performedBy: 'Adaeze Nwosu', performedAt: '2024-01-23T08:00:00Z' },
      { id: 'TL-014', action: 'Criminal referral initiated', description: 'Legal team notified', performedBy: 'Adaeze Nwosu', performedAt: '2024-01-24T09:00:00Z' }
    ],
    linkedDisputeIds: [],
    isRepeatOffender: true,
    priorDisputeCount: 4,
    patternFlags: ['ghost_pickups', 'organized_fraud', 'gps_spoofing', 'multi_agent'],
    isAuditTagged: true,
    auditNotes: ['Criminal referral in progress', 'Systemic control review required for PH region'],
    createdAt: '2024-01-23T06:00:00Z',
    updatedAt: '2024-01-25T16:00:00Z',
    daysOpen: 8,
    assignedTo: 'Adaeze Nwosu'
  },
  {
    id: 'RSK-006',
    disputeId: 'DSP-2024-1001',
    category: 'system_error',
    severity: 'medium',
    status: 'resolved',
    title: 'Pricing engine miscalculation for e-waste category',
    description: 'System applied incorrect rate for e-waste pickups in Kano region for 2 weeks. 156 transactions affected with average overpayment of ₦3,200 per transaction.',
    financialExposure: 499200,
    currency: 'NGN',
    fundsAtRisk: 0,
    recoveredAmount: 499200,
    parties: [
      { id: 'SYS-001', name: 'Pricing Engine v2.4', role: 'respondent', type: 'system', priorDisputes: 0 }
    ],
    city: 'Kano',
    zone: 'Nassarawa',
    state: 'Kano',
    escalationSource: 'finance',
    escalatedBy: 'Amina Yusuf - Finance Analyst',
    escalatedAt: '2024-01-10T10:00:00Z',
    riskAssessment: {
      legalRisk: 'low',
      financialRisk: 'medium',
      reputationalRisk: 'low',
      systemicRisk: 'high',
      overallRisk: 'medium',
      assessmentNotes: 'System bug. No malicious intent. High systemic risk due to pricing engine dependency.',
      assessedBy: 'Emeka Okafor',
      assessedAt: '2024-01-10T14:00:00Z'
    },
    evidence: [
      { id: 'EV-014', type: 'system_log', description: 'Pricing engine error logs', uploadedBy: 'Engineering', uploadedAt: '2024-01-10T10:00:00Z', verified: true },
      { id: 'EV-015', type: 'transaction_data', description: 'Affected transaction list', uploadedBy: 'Finance Team', uploadedAt: '2024-01-10T11:00:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-015', action: 'Anomaly detected', description: 'Finance reconciliation flagged discrepancy', performedBy: 'Amina Yusuf', performedAt: '2024-01-10T10:00:00Z' },
      { id: 'TL-016', action: 'Bug identified', description: 'Engineering confirmed pricing engine bug', performedBy: 'Engineering Team', performedAt: '2024-01-10T16:00:00Z' },
      { id: 'TL-017', action: 'Fix deployed', description: 'Hotfix applied to pricing engine', performedBy: 'Engineering Team', performedAt: '2024-01-11T09:00:00Z' },
      { id: 'TL-018', action: 'Recovery completed', description: 'All overpayments recovered via wallet adjustments', performedBy: 'Finance Team', performedAt: '2024-01-15T14:00:00Z' }
    ],
    linkedDisputeIds: [],
    isRepeatOffender: false,
    priorDisputeCount: 0,
    patternFlags: ['system_bug', 'pricing_error'],
    isAuditTagged: true,
    auditNotes: ['System control review completed', 'Pricing engine test coverage improved'],
    resolution: {
      outcome: 'closed_no_action',
      decision: 'System error identified and fixed. All overpayments recovered.',
      financialAction: { type: 'reversal', amount: 499200, currency: 'NGN' },
      accountAction: { type: 'none', target: 'N/A' },
      resolvedBy: 'Emeka Okafor',
      resolvedAt: '2024-01-15T16:00:00Z',
      findings: 'Pricing engine v2.4 had a rate lookup bug for e-waste category in Kano zone. Root cause: missing rate table entry after zone restructuring.',
      preventiveMeasures: ['Added automated rate validation tests', 'Implemented pricing change approval workflow', 'Added real-time anomaly alerts for pricing deviations']
    },
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T16:00:00Z',
    daysOpen: 0,
    assignedTo: 'Emeka Okafor',
    reviewedBy: 'Adaeze Nwosu'
  },
  {
    id: 'RSK-007',
    disputeId: 'DSP-2024-1034',
    category: 'compliance_breach',
    severity: 'high',
    status: 'referred',
    title: 'Hazardous waste mishandling at Apapa industrial zone',
    description: 'Enterprise client reported that hazardous materials were mixed with regular recyclables during collection. NESREA compliance requirements potentially violated.',
    financialExposure: 5000000,
    currency: 'NGN',
    fundsAtRisk: 5000000,
    recoveredAmount: 0,
    parties: [
      { id: 'ENT-045', name: 'Nigerian Breweries Plc', role: 'complainant', type: 'enterprise', phone: '+234 801 234 5678', email: 'ehs@nigerianbreweries.com', priorDisputes: 0 },
      { id: 'AGT-178', name: 'Segun Adebayo', role: 'respondent', type: 'agent', phone: '+234 708 345 6789', email: 's.adebayo@recliq.ng', priorDisputes: 0 }
    ],
    city: 'Lagos',
    zone: 'Apapa',
    state: 'Lagos',
    escalationSource: 'compliance',
    escalatedBy: 'Dr. Funke Adeyinka - Compliance Officer',
    escalatedAt: '2024-01-24T08:00:00Z',
    riskAssessment: {
      legalRisk: 'critical',
      financialRisk: 'high',
      reputationalRisk: 'critical',
      systemicRisk: 'medium',
      overallRisk: 'critical',
      assessmentNotes: 'NESREA regulatory exposure. Potential fines up to ₦5M. Enterprise client relationship at critical risk.',
      assessedBy: 'Adaeze Nwosu',
      assessedAt: '2024-01-24T12:00:00Z'
    },
    evidence: [
      { id: 'EV-016', type: 'photo', description: 'Photos of mixed hazardous materials', uploadedBy: 'Nigerian Breweries EHS Team', uploadedAt: '2024-01-24T08:00:00Z', verified: true },
      { id: 'EV-017', type: 'document', description: 'NESREA compliance requirements', uploadedBy: 'Compliance Team', uploadedAt: '2024-01-24T10:00:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-019', action: 'Incident reported', description: 'Enterprise client reported hazardous waste mixing', performedBy: 'Nigerian Breweries EHS', performedAt: '2024-01-24T07:00:00Z' },
      { id: 'TL-020', action: 'Escalated to Risk', description: 'Regulatory compliance breach', performedBy: 'Dr. Funke Adeyinka', performedAt: '2024-01-24T08:00:00Z' },
      { id: 'TL-021', action: 'Referred to Legal', description: 'NESREA notification required', performedBy: 'Adaeze Nwosu', performedAt: '2024-01-24T14:00:00Z' }
    ],
    linkedDisputeIds: [],
    isRepeatOffender: false,
    priorDisputeCount: 0,
    patternFlags: ['regulatory_breach', 'hazardous_waste', 'enterprise_impact'],
    isAuditTagged: true,
    auditNotes: ['NESREA notification filed', 'Legal counsel engaged', 'Enterprise remediation plan required'],
    createdAt: '2024-01-24T08:00:00Z',
    updatedAt: '2024-01-25T16:00:00Z',
    daysOpen: 4,
    assignedTo: 'Adaeze Nwosu',
    reviewedBy: 'Dr. Funke Adeyinka'
  },
  {
    id: 'RSK-008',
    disputeId: 'DSP-2024-1067',
    category: 'payout_abuse',
    severity: 'medium',
    status: 'resolved',
    title: 'Inflated collection volume claims in Ibadan',
    description: 'User consistently claimed higher volumes than verified. Photo evidence shows smaller quantities than reported. 12 transactions affected.',
    financialExposure: 180000,
    currency: 'NGN',
    fundsAtRisk: 0,
    recoveredAmount: 180000,
    parties: [
      { id: 'USR-889', name: 'Adewale Ogundimu', role: 'respondent', type: 'individual', phone: '+234 803 567 8901', email: 'adewale.o@yahoo.com', priorDisputes: 1 }
    ],
    city: 'Ibadan',
    zone: 'Bodija',
    state: 'Oyo',
    escalationSource: 'ops',
    escalatedBy: 'Bola Akinwale - Ops Supervisor',
    escalatedAt: '2024-01-12T10:00:00Z',
    riskAssessment: {
      legalRisk: 'low',
      financialRisk: 'medium',
      reputationalRisk: 'low',
      systemicRisk: 'low',
      overallRisk: 'medium',
      assessmentNotes: 'Individual user abuse. Low systemic risk. Wallet recovery sufficient.',
      assessedBy: 'Emeka Okafor',
      assessedAt: '2024-01-12T14:00:00Z'
    },
    evidence: [
      { id: 'EV-018', type: 'photo', description: 'Collection photos vs claimed volumes', uploadedBy: 'Ops Team', uploadedAt: '2024-01-12T10:00:00Z', verified: true },
      { id: 'EV-019', type: 'transaction_data', description: 'Transaction history with volume claims', uploadedBy: 'System', uploadedAt: '2024-01-12T10:30:00Z', verified: true }
    ],
    timeline: [
      { id: 'TL-022', action: 'Flagged by Ops', description: 'Volume discrepancy noticed during verification', performedBy: 'Bola Akinwale', performedAt: '2024-01-12T10:00:00Z' },
      { id: 'TL-023', action: 'User warned', description: 'First formal warning issued', performedBy: 'Emeka Okafor', performedAt: '2024-01-13T09:00:00Z' },
      { id: 'TL-024', action: 'Funds recovered', description: 'Wallet adjustment completed', performedBy: 'Finance Team', performedAt: '2024-01-14T14:00:00Z' }
    ],
    linkedDisputeIds: [],
    isRepeatOffender: true,
    priorDisputeCount: 1,
    patternFlags: ['volume_inflation'],
    isAuditTagged: false,
    auditNotes: [],
    resolution: {
      outcome: 'upheld',
      decision: 'User found to have inflated collection volumes. Funds recovered via wallet adjustment.',
      financialAction: { type: 'reversal', amount: 180000, currency: 'NGN' },
      accountAction: { type: 'warning', target: 'USR-889', duration: 'Permanent record' },
      resolvedBy: 'Emeka Okafor',
      resolvedAt: '2024-01-14T16:00:00Z',
      findings: 'User submitted photos showing smaller quantities than claimed. Pattern of 20-30% inflation across 12 transactions.',
      preventiveMeasures: ['Added photo-to-weight AI validation', 'Implemented volume cap alerts']
    },
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-14T16:00:00Z',
    daysOpen: 0,
    assignedTo: 'Emeka Okafor',
    reviewedBy: 'Adaeze Nwosu'
  }
];

// ============================================================
// Summary Data
// ============================================================

export const mockRiskDisputeSummary: RiskDisputeSummary = {
  highRiskDisputes: 4,
  financialExposure: 18479200,
  repeatOffenders: 4,
  underInvestigation: 3,
  auditTaggedCases: 6,
  resolvedCleared: 2,
  totalDisputes: 8,
  avgResolutionDays: 5.2,
  monthlyTrend: {
    disputes: 8,
    change: 23.5
  }
};

// ============================================================
// Chart Data
// ============================================================

export const mockSeverityTrendData: SeverityTrendData[] = [
  { month: 'Aug 2023', medium: 3, high: 2, critical: 0 },
  { month: 'Sep 2023', medium: 4, high: 1, critical: 1 },
  { month: 'Oct 2023', medium: 2, high: 3, critical: 1 },
  { month: 'Nov 2023', medium: 5, high: 2, critical: 0 },
  { month: 'Dec 2023', medium: 3, high: 4, critical: 2 },
  { month: 'Jan 2024', medium: 3, high: 3, critical: 2 }
];

export const mockExposureTrendData: ExposureTrendData[] = [
  { month: 'Aug 2023', exposure: 4200000, recovered: 3100000 },
  { month: 'Sep 2023', exposure: 6800000, recovered: 4500000 },
  { month: 'Oct 2023', exposure: 5100000, recovered: 3800000 },
  { month: 'Nov 2023', exposure: 7500000, recovered: 5200000 },
  { month: 'Dec 2023', exposure: 12300000, recovered: 6800000 },
  { month: 'Jan 2024', exposure: 18479200, recovered: 1829200 }
];

export const mockCategoryDistribution: CategoryDistribution[] = [
  { category: 'weight_manipulation', count: 12, percentage: 22, exposure: 5600000 },
  { category: 'payout_abuse', count: 15, percentage: 28, exposure: 4200000 },
  { category: 'agent_misconduct', count: 8, percentage: 15, exposure: 6800000 },
  { category: 'enterprise_sla', count: 6, percentage: 11, exposure: 2100000 },
  { category: 'system_error', count: 4, percentage: 7, exposure: 1200000 },
  { category: 'fraud', count: 5, percentage: 9, exposure: 8500000 },
  { category: 'compliance_breach', count: 4, percentage: 8, exposure: 7200000 }
];

// ============================================================
// Systemic Risk Data
// ============================================================

export const mockSystemicRiskMetrics: SystemicRiskMetric[] = [
  { id: 'srm-1', label: 'Disputes per 1,000 Transactions', value: 4.2, unit: '', trend: 'up', trendValue: 12, threshold: 5.0, status: 'warning' },
  { id: 'srm-2', label: 'Repeat-Risk Agents', value: 7, unit: 'agents', trend: 'up', trendValue: 40, threshold: 5, status: 'critical' },
  { id: 'srm-3', label: 'Controls Effectiveness', value: 78, unit: '%', trend: 'down', trendValue: -5, threshold: 85, status: 'warning' },
  { id: 'srm-4', label: 'SLA Breach Correlation', value: 34, unit: '%', trend: 'up', trendValue: 8, threshold: 20, status: 'critical' },
  { id: 'srm-5', label: 'Avg Resolution Time', value: 5.2, unit: 'days', trend: 'down', trendValue: -15, threshold: 7, status: 'normal' },
  { id: 'srm-6', label: 'Recovery Rate', value: 64, unit: '%', trend: 'up', trendValue: 5, threshold: 80, status: 'warning' }
];

export const mockRepeatRiskEntities: RepeatRiskEntity[] = [
  { id: 'AGT-112', name: 'Chukwuemeka Obi', type: 'agent', disputeCount: 4, totalExposure: 3200000, lastDisputeDate: '2024-01-15', riskScore: 92 },
  { id: 'AGT-202', name: 'Chidera Okoro', type: 'agent', disputeCount: 3, totalExposure: 1800000, lastDisputeDate: '2024-01-23', riskScore: 87 },
  { id: 'USR-667', name: 'Biodun Afolabi', type: 'user', disputeCount: 3, totalExposure: 2100000, lastDisputeDate: '2024-01-18', riskScore: 78 },
  { id: 'AGT-204', name: 'Uchenna Igwe', type: 'agent', disputeCount: 2, totalExposure: 900000, lastDisputeDate: '2024-01-23', riskScore: 71 },
  { id: 'USR-889', name: 'Adewale Ogundimu', type: 'user', disputeCount: 2, totalExposure: 350000, lastDisputeDate: '2024-01-12', riskScore: 55 }
];
