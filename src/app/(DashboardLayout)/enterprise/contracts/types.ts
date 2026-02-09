// Contracts & Pricing System Types

export type ContractStatus = 'draft' | 'active' | 'expired' | 'terminated' | 'renewal_pending' | 'suspended';
export type ContractType = 'pay_per_pickup' | 'monthly_retainer' | 'volume_based' | 'hybrid' | 'custom';
export type PricingModel = 'per_kg' | 'per_pickup' | 'monthly' | 'tiered' | 'custom';
export type SLATier = 'standard' | 'priority' | 'premium' | 'enterprise';
export type WasteCategory = 'paper' | 'plastic' | 'metal' | 'glass' | 'organic' | 'e_waste' | 'hazardous' | 'textile' | 'wood' | 'industrial' | 'other';
export type RenewalWindow = '30_days' | '60_days' | '90_days' | 'custom';

export interface EnterpriseContract {
  id: string;
  contractNumber: string;
  clientId: string;
  clientName: string;
  contractType: ContractType;
  status: ContractStatus;
  
  // Contract details
  effectiveDate: string;
  expiryDate: string;
  renewalWindow: RenewalWindow;
  autoRenewal: boolean;
  noticePeriod: number; // days
  
  // Contract ownership
  contractOwner: string;
  salesRep: string;
  financeApprover: string;
  opsApprover: string;
  
  // Pricing configuration
  pricingModel: PricingConfiguration;
  
  // SLA configuration
  slaConfiguration: SLAConfiguration;
  
  // Scope and coverage
  coverage: ContractCoverage;
  
  // Financial terms
  billingTerms: BillingTerms;
  
  // Contract metadata
  createdAt: string;
  updatedAt: string;
  version: string;
  parentContractId?: string;
  amendments: ContractAmendment[];
  attachments: ContractAttachment[];
  
  // Performance tracking
  totalPickups: number;
  totalRevenue: number;
  averageMargin: number;
  slaBreaches: number;
  penaltiesTriggered: number;
  
  // Risk and compliance
  riskLevel: 'low' | 'medium' | 'high';
  complianceFlags: string[];
  auditTrail: ContractAuditEntry[];
}

export interface PricingConfiguration {
  model: PricingModel;
  currency: string;
  baseRates: WasteTypePricing[];
  volumeTiers: VolumeTier[];
  pickupFrequencyPricing: PickupFrequencyPricing[];
  minimumCharges: MinimumCharge[];
  discounts: ContractDiscount[];
  specialClauses: SpecialPricingClause[];
  priceAdjustments: PriceAdjustment[];
}

export interface WasteTypePricing {
  wasteCategory: WasteCategory;
  baseRate: number; // per kg
  effectiveDate: string;
  expiryDate?: string;
  specialConditions?: string[];
}

export interface VolumeTier {
  tierId: string;
  minVolume: number; // kg per month
  maxVolume?: number; // kg per month
  discountPercentage: number;
  effectiveDate: string;
  expiryDate?: string;
  applicableWasteTypes?: WasteCategory[];
}

export interface PickupFrequencyPricing {
  frequency: 'daily' | 'weekly' | 'bi_weekly' | 'monthly' | 'on_demand';
  surcharge: number; // percentage or fixed amount
  surchargeType: 'percentage' | 'fixed';
  effectiveDate: string;
  expiryDate?: string;
}

export interface MinimumCharge {
  chargeType: 'monthly' | 'weekly' | 'per_pickup';
  amount: number;
  conditions: string[];
  effectiveDate: string;
  expiryDate?: string;
}

export interface ContractDiscount {
  discountId: string;
  type: 'percentage' | 'fixed' | 'volume';
  value: number;
  conditions: string[];
  effectiveDate: string;
  expiryDate?: string;
  approvedBy: string;
  reason: string;
}

export interface SpecialPricingClause {
  clauseId: string;
  description: string;
  pricingImpact: number; // monetary value
  riskLevel: 'low' | 'medium' | 'high';
  effectiveDate: string;
  expiryDate?: string;
  requiresApproval: boolean;
  approvedBy?: string;
}

export interface PriceAdjustment {
  adjustmentId: string;
  type: 'inflation' | 'market' | 'negotiated' | 'penalty';
  percentage: number;
  effectiveDate: string;
  reason: string;
  approvedBy: string;
  appliesTo: 'all_rates' | 'specific_waste_types' | 'volume_tiers';
  affectedItems?: string[];
}

export interface SLAConfiguration {
  tier: SLATier;
  responseTime: number; // minutes
  pickupWindow: {
    start: string;
    end: string;
  };
  completionRate: number; // percentage
  penaltyRules: SLAPenaltyRule[];
  serviceCredits: ServiceCreditRule[];
  escalationRules: EscalationRule[];
  reportingRequirements: ReportingRequirement[];
}

export interface SLAPenaltyRule {
  ruleId: string;
  trigger: 'late_pickup' | 'missed_pickup' | 'incomplete_service' | 'quality_issue';
  penaltyType: 'percentage' | 'fixed' | 'service_credit';
  penaltyValue: number;
  calculationMethod: string;
  maxPenalty?: number;
  effectiveDate: string;
  expiryDate?: string;
}

export interface ServiceCreditRule {
  ruleId: string;
  trigger: string;
  creditType: 'percentage' | 'fixed';
  creditValue: number;
  conditions: string[];
  effectiveDate: string;
  expiryDate?: string;
}

export interface EscalationRule {
  ruleId: string;
  triggerCondition: string;
  escalationLevel: number;
  notificationTime: number; // minutes
  recipients: string[];
  actions: string[];
  effectiveDate: string;
  expiryDate?: string;
}

export interface ReportingRequirement {
  requirementId: string;
  reportType: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  content: string[];
  deliveryMethod: 'email' | 'portal' | 'api';
  recipients: string[];
  effectiveDate: string;
  expiryDate?: string;
}

export interface ContractCoverage {
  cities: string[];
  zones: string[];
  locations: string[];
  wasteTypes: WasteCategory[];
  excludedWasteTypes: WasteCategory[];
  specialRequirements: string[];
  agentEligibility: AgentEligibilityRule[];
  geographicRestrictions: GeographicRestriction[];
}

export interface AgentEligibilityRule {
  ruleId: string;
  agentType: 'internal' | 'partner' | 'all';
  conditions: string[];
  restrictions: string[];
  effectiveDate: string;
  expiryDate?: string;
}

export interface GeographicRestriction {
  restrictionId: string;
  type: 'exclusion' | 'inclusion' | 'priority';
  areas: string[];
  conditions: string[];
  effectiveDate: string;
  expiryDate?: string;
}

export interface BillingTerms {
  billingCycle: 'weekly' | 'monthly' | 'quarterly';
  paymentTerms: number; // days
  lateFeePercentage: number;
  currency: string;
  invoiceFormat: 'detailed' | 'summary' | 'custom';
  taxConfiguration: TaxConfiguration;
  paymentMethods: PaymentMethod[];
}

export interface TaxConfiguration {
  taxType: 'vat' | 'gst' | 'sales_tax' | 'custom';
  taxRate: number;
  taxInclusive: boolean;
  exemptions: string[];
  effectiveDate: string;
  expiryDate?: string;
}

export interface PaymentMethod {
  method: 'bank_transfer' | 'card' | 'check' | 'mobile_money' | 'other';
  details: string;
  isActive: boolean;
  effectiveDate: string;
  expiryDate?: string;
}

export interface ContractAmendment {
  amendmentId: string;
  type: 'pricing' | 'sla' | 'coverage' | 'terms' | 'other';
  description: string;
  effectiveDate: string;
  approvedBy: string;
  impact: string;
  documents: string[];
}

export interface ContractAttachment {
  attachmentId: string;
  title: string;
  type: 'contract' | 'sla' | 'pricing' | 'addendum' | 'other';
  fileUrl: string;
  uploadedAt: string;
  uploadedBy: string;
  version: string;
  isConfidential: boolean;
}

export interface ContractAuditEntry {
  entryId: string;
  timestamp: string;
  userId: string;
  action: 'created' | 'updated' | 'approved' | 'terminated' | 'renewed' | 'suspended';
  details: string;
  fieldsChanged?: string[];
  previousValues?: Record<string, any>;
  newValues?: Record<string, any>;
  ipAddress: string;
}

export interface ContractsPricingSummary {
  activeContracts: number;
  expiringSoon: number;
  avgContractValue: number;
  customPricingRules: number;
  slaPenaltyClauses: number;
  revenueCovered: number;
  totalContracts: number;
  draftContracts: number;
  expiredContracts: number;
  renewalPending: number;
  totalContractValue: number;
  avgMargin: number;
  highRiskContracts: number;
}

export interface PricingEnforcementInsights {
  contractVariance: ContractVariance[];
  discountUtilization: DiscountUtilization[];
  marginByContract: MarginAnalysis[];
  slaPenaltiesTriggered: SLAPenaltyAnalysis[];
  pricingAccuracy: PricingAccuracyMetrics;
  revenueLeakage: RevenueLeakageAnalysis[];
}

export interface ContractVariance {
  contractId: string;
  contractName: string;
  expectedRevenue: number;
  actualRevenue: number;
  variance: number;
  variancePercentage: number;
  varianceReasons: string[];
  period: string;
}

export interface DiscountUtilization {
  discountId: string;
  discountType: string;
  utilizationRate: number;
  totalDiscountAmount: number;
  affectedContracts: number;
  period: string;
}

export interface MarginAnalysis {
  contractId: string;
  contractName: string;
  grossMargin: number;
  netMargin: number;
  marginTrend: 'improving' | 'declining' | 'stable';
  factors: string[];
  period: string;
}

export interface SLAPenaltyAnalysis {
  contractId: string;
  contractName: string;
  penaltiesTriggered: number;
  totalPenaltyAmount: number;
  averagePenaltyAmount: number;
  commonTriggers: string[];
  period: string;
}

export interface PricingAccuracyMetrics {
  overallAccuracy: number;
  pricingErrors: PricingError[];
  correctionRate: number;
  errorCategories: ErrorCategory[];
  period: string;
}

export interface PricingError {
  errorId: string;
  contractId: string;
  errorType: 'rate_mismatch' | 'calculation_error' | 'missing_discount' | 'wrong_sla';
  severity: 'low' | 'medium' | 'high';
  description: string;
  financialImpact: number;
  detectedAt: string;
  resolvedAt?: string;
  resolution?: string;
}

export interface ErrorCategory {
  category: string;
  count: number;
  totalImpact: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface RevenueLeakageAnalysis {
  leakageId: string;
  source: 'under_billing' | 'missing_penalties' | 'incorrect_pricing' | 'unapproved_discounts';
  estimatedAmount: number;
  affectedContracts: number;
  detectionDate: string;
  status: 'identified' | 'investigating' | 'resolved';
}

export interface ContractFilters {
  status: ContractStatus | '';
  clientId: string;
  contractType: ContractType | '';
  renewalWindow: RenewalWindow | '';
  riskLevel: string;
  dateRange: {
    start: string;
    end: string;
  };
  minContractValue?: number;
  maxContractValue?: number;
  hasCustomPricing: boolean;
  hasSLAPenalties: boolean;
  search: string;
}

export interface ContractDetail {
  contract: EnterpriseContract;
  pricingHistory: PricingHistory[];
  slaHistory: SLAHistory[];
  performanceMetrics: ContractPerformanceMetrics;
  changeHistory: ContractChangeHistory[];
  relatedDocuments: ContractDocument[];
  financialSummary: ContractFinancialSummary;
}

export interface PricingHistory {
  historyId: string;
  effectiveDate: string;
  changeType: 'rate_change' | 'discount_added' | 'discount_removed' | 'tier_adjustment';
  description: string;
  previousRates: WasteTypePricing[];
  newRates: WasteTypePricing[];
  approvedBy: string;
  reason: string;
}

export interface SLAHistory {
  historyId: string;
  effectiveDate: string;
  changeType: 'sla_improved' | 'sla_relaxed' | 'penalty_added' | 'penalty_removed';
  description: string;
  previousSLA: SLAConfiguration;
  newSLA: SLAConfiguration;
  approvedBy: string;
  reason: string;
}

export interface ContractPerformanceMetrics {
  period: string;
  totalPickups: number;
  onTimePickupRate: number;
  completionRate: number;
  averageResponseTime: number;
  totalRevenue: number;
  actualMargin: number;
  slaBreaches: number;
  penaltiesPaid: number;
  clientSatisfactionScore?: number;
}

export interface ContractChangeHistory {
  changeId: string;
  timestamp: string;
  changedBy: string;
  changeType: string;
  field: string;
  oldValue: any;
  newValue: any;
  reason: string;
  approved: boolean;
  approvedBy?: string;
}

export interface ContractDocument {
  documentId: string;
  title: string;
  type: string;
  version: string;
  uploadDate: string;
  uploadedBy: string;
  fileUrl: string;
  fileSize: number;
  isCurrent: boolean;
  replacesDocumentId?: string;
}

export interface ContractFinancialSummary {
  totalContractValue: number;
  currentPeriodRevenue: number;
  yearToDateRevenue: number;
  averageMonthlyRevenue: number;
  projectedAnnualRevenue: number;
  totalDiscountsGiven: number;
  totalPenaltiesPaid: number;
  netRevenue: number;
  grossMargin: number;
  netMargin: number;
  revenueTrend: 'increasing' | 'decreasing' | 'stable';
}

// Helper types
export interface CreateContractRequest {
  clientId: string;
  contractType: ContractType;
  effectiveDate: string;
  expiryDate: string;
  pricingModel: PricingConfiguration;
  slaConfiguration: SLAConfiguration;
  coverage: ContractCoverage;
  billingTerms: BillingTerms;
  autoRenewal: boolean;
  noticePeriod: number;
}

export interface UpdateContractRequest extends Partial<CreateContractRequest> {
  contractId: string;
  version: string;
  changeReason: string;
  requiresApproval: boolean;
}

export interface ContractExportRequest {
  filters: ContractFilters;
  format: 'csv' | 'excel' | 'pdf';
  includePricing: boolean;
  includeSLA: boolean;
  includeFinancials: boolean;
  includeHistory: boolean;
}

// Enums and constants
export const CONTRACT_STATUS_LABELS = {
  draft: 'Draft',
  active: 'Active',
  expired: 'Expired',
  terminated: 'Terminated',
  renewal_pending: 'Renewal Pending',
  suspended: 'Suspended'
} as const;

export const CONTRACT_TYPE_LABELS = {
  pay_per_pickup: 'Pay Per Pickup',
  monthly_retainer: 'Monthly Retainer',
  volume_based: 'Volume Based',
  hybrid: 'Hybrid',
  custom: 'Custom'
} as const;

export const PRICING_MODEL_LABELS = {
  per_kg: 'Per KG',
  per_pickup: 'Per Pickup',
  monthly: 'Monthly',
  tiered: 'Tiered',
  custom: 'Custom'
} as const;

export const SLA_TIER_LABELS = {
  standard: 'Standard',
  priority: 'Priority',
  premium: 'Premium',
  enterprise: 'Enterprise'
} as const;

export const WASTE_CATEGORY_LABELS = {
  paper: 'Paper',
  plastic: 'Plastic',
  metal: 'Metal',
  glass: 'Glass',
  organic: 'Organic',
  e_waste: 'E-Waste',
  hazardous: 'Hazardous',
  textile: 'Textile',
  wood: 'Wood',
  industrial: 'Industrial',
  other: 'Other'
} as const;

export const RENEWAL_WINDOW_LABELS = {
  '30_days': '30 Days',
  '60_days': '60 Days',
  '90_days': '90 Days',
  custom: 'Custom'
} as const;
