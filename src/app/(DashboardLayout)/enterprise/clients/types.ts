// Enterprise Clients System Types

export type ClientStatus = 'active' | 'inactive' | 'suspended' | 'trial' | 'onboarding';
export type Industry = 'office' | 'factory' | 'estate' | 'school' | 'hotel' | 'retail' | 'manufacturing' | 'healthcare' | 'government' | 'other';
export type ContractType = 'pay_per_pickup' | 'monthly_retainer' | 'volume_based' | 'hybrid' | 'custom';
export type SLAStatus = 'compliant' | 'at_risk' | 'breached' | 'not_applicable';
export type PickupFrequency = 'daily' | 'weekly' | 'bi_weekly' | 'monthly' | 'on_demand' | 'custom';

export interface EnterpriseClient {
  id: string;
  companyName: string;
  industry: Industry;
  clientStatus: ClientStatus;
  contractType: ContractType;
  pickupFrequency: PickupFrequency;
  
  // Contact information
  primaryContact: ContactPerson;
  billingContact: ContactPerson;
  operationsContact: ContactPerson;
  
  // Location information
  headquarters: Address;
  locations: ClientLocation[];
  totalLocations: number;
  activeLocations: number;
  
  // Contract details
  contractStart: string;
  contractEnd?: string;
  pricingModel: PricingModel;
  slaRequirements: SLARequirements;
  
  // Activity metrics
  totalPickups: number;
  scheduledPickups: number;
  completedPickups: number;
  missedPickups: number;
  rescheduledPickups: number;
  lastPickupDate?: string;
  nextPickupDate?: string;
  
  // Volume metrics
  totalWeightCollected: number;
  monthlyVolume: number;
  averagePickupWeight: number;
  wasteCategories: WasteCategoryBreakdown[];
  
  // Financial metrics
  totalRevenue: number;
  monthlyRevenue: number;
  outstandingBalance: number;
  averageRevenuePerPickup: number;
  lifetimeValue: number;
  
  // SLA metrics
  slaStatus: SLAStatus;
  slaComplianceRate: number;
  averagePickupTime: number; // minutes from scheduled to actual
  slaBreaches: SLABreach[];
  
  // ESG metrics
  co2Saved: number;
  treesEquivalent: number;
  waterSaved: number;
  energySaved: number;
  sdgAlignment: SDGAlignment[];
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  onboardedBy: string;
  accountManager: string;
  notes?: string;
  tags: string[];
}

export interface ContactPerson {
  name: string;
  title: string;
  email: string;
  phone: string;
  department: string;
  isPrimary: boolean;
}

export interface Address {
  street: string;
  city: string;
  zone: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  postalCode?: string;
}

export interface ClientLocation {
  id: string;
  name: string;
  address: Address;
  isActive: boolean;
  pickupInstructions?: string;
  accessRequirements?: string[];
  operatingHours: OperatingHours;
  contactPerson?: ContactPerson;
  specialRequirements?: string[];
}

export interface OperatingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface PricingModel {
  type: ContractType;
  baseRate: number; // per kg or per pickup
  minimumFee?: number;
  volumeDiscounts: VolumeDiscount[];
  wasteTypePremiums: WasteTypePremium[];
  serviceFees: ServiceFee[];
  currency: string;
  billingCycle: 'weekly' | 'monthly' | 'quarterly';
}

export interface VolumeDiscount {
  minVolume: number; // kg per month
  discountPercentage: number;
  effectiveFrom: string;
}

export interface WasteTypePremium {
  wasteType: string;
  premiumRate: number;
  effectiveFrom: string;
}

export interface ServiceFee {
  feeType: 'pickup' | 'processing' | 'reporting' | 'consulting';
  amount: number;
  frequency: 'per_pickup' | 'monthly' | 'quarterly';
  description: string;
}

export interface SLARequirements {
  pickupWindow: {
    start: string; // HH:MM
    end: string; // HH:MM
  };
  responseTime: number; // minutes
  completionRate: number; // percentage
  reportingFrequency: 'daily' | 'weekly' | 'monthly';
  customRequirements?: string[];
}

export interface SLABreach {
  id: string;
  type: 'pickup_delay' | 'missed_pickup' | 'service_quality' | 'reporting_delay' | 'custom';
  severity: 'minor' | 'major' | 'critical';
  description: string;
  occurredAt: string;
  resolvedAt?: string;
  impact: string;
  compensation?: Compensation;
  preventedRecurrence?: string;
}

export interface Compensation {
  type: 'credit' | 'service_credit' | 'refund' | 'discount';
  amount: number;
  description: string;
  issuedAt: string;
}

export interface WasteCategoryBreakdown {
  category: string;
  weight: number;
  percentage: number;
  revenue: number;
}

export interface SDGAlignment {
  goalNumber: number;
  goalTitle: string;
  contribution: string;
  kpi: string;
  currentValue: number;
  targetValue: number;
}

export interface EnterpriseClientSummary {
  totalClients: number;
  activeClients: number;
  scheduledPickups: number;
  totalWeightCollected: number;
  enterpriseRevenue: number;
  slaIssues: number;
  avgMonthlyVolume: number;
  avgRevenuePerClient: number;
  slaComplianceRate: number;
  clientRetentionRate: number;
  newClientsThisMonth: number;
  atRiskClients: number;
}

export interface EnterprisePerformance {
  topClientsByVolume: Array<{
    client: EnterpriseClient;
    volume: number;
    revenue: number;
    rank: number;
  }>;
  topClientsByRevenue: Array<{
    client: EnterpriseClient;
    revenue: number;
    volume: number;
    rank: number;
  }>;
  industryBreakdown: Array<{
    industry: Industry;
    clientCount: number;
    totalVolume: number;
    totalRevenue: number;
    avgRevenuePerClient: number;
  }>;
  cityBreakdown: Array<{
    city: string;
    clientCount: number;
    totalVolume: number;
    totalRevenue: number;
    avgRevenuePerClient: number;
  }>;
  contractTypeBreakdown: Array<{
    contractType: ContractType;
    clientCount: number;
    totalVolume: number;
    totalRevenue: number;
    avgRevenuePerClient: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    newClients: number;
    totalVolume: number;
    totalRevenue: number;
    slaCompliance: number;
  }>;
}

export interface EnterpriseClientFilters {
  clientStatus: ClientStatus | '';
  industry: Industry | '';
  contractType: ContractType | '';
  city: string;
  zone: string;
  pickupFrequency: PickupFrequency | '';
  slaStatus: SLAStatus | '';
  dateRange: {
    start: string;
    end: string;
  };
  minMonthlyVolume?: number;
  maxMonthlyVolume?: number;
  minMonthlyRevenue?: number;
  maxMonthlyRevenue?: number;
  hasSLAIssues: boolean;
  search: string;
}

export interface EnterpriseClientDetail {
  client: EnterpriseClient;
  pickupHistory: PickupRecord[];
  upcomingPickups: ScheduledPickup[];
  invoices: Invoice[];
  slaHistory: SLABreach[];
  esgReports: ESGReport[];
  communications: Communication[];
  documents: Document[];
}

export interface PickupRecord {
  id: string;
  clientId: string;
  locationId: string;
  scheduledTime: string;
  actualTime?: string;
  status: 'scheduled' | 'completed' | 'missed' | 'rescheduled' | 'cancelled';
  weight: number;
  wasteCategories: WasteCategoryBreakdown[];
  collectorName: string;
  vehicleId: string;
  notes?: string;
  photos: string[];
  issues?: string[];
  revenue: number;
}

export interface ScheduledPickup {
  id: string;
  clientId: string;
  locationId: string;
  scheduledTime: string;
  estimatedWeight: number;
  priority: 'normal' | 'high' | 'urgent';
  specialInstructions?: string;
  assignedCollector?: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
}

export interface Invoice {
  id: string;
  clientId: string;
  invoiceNumber: string;
  period: {
    start: string;
    end: string;
  };
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'issued' | 'paid' | 'overdue' | 'cancelled';
  amount: number;
  currency: string;
  lineItems: InvoiceLineItem[];
  taxes: Tax[];
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  paymentMethod?: string;
  paymentDate?: string;
  notes?: string;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  wasteType?: string;
}

export interface Tax {
  type: string;
  rate: number;
  amount: number;
}

export interface ESGReport {
  id: string;
  clientId: string;
  reportType: 'monthly' | 'quarterly' | 'annual' | 'custom';
  period: {
    start: string;
    end: string;
  };
  generatedAt: string;
  metrics: {
    totalWeight: number;
    co2Saved: number;
    treesEquivalent: number;
    waterSaved: number;
    energySaved: number;
    wasteDiverted: number;
  };
  sdgContributions: SDGAlignment[];
  certifications: string[];
  recommendations: string[];
  status: 'draft' | 'review' | 'approved' | 'published';
  pdfUrl?: string;
}

export interface Communication {
  id: string;
  type: 'email' | 'phone' | 'meeting' | 'note';
  direction: 'inbound' | 'outbound';
  subject: string;
  content: string;
  participants: string[];
  timestamp: string;
  author: string;
  category: 'sales' | 'operations' | 'billing' | 'support' | 'general';
  attachments: string[];
  followUpRequired: boolean;
  followUpDate?: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'contract' | 'sla' | 'invoice' | 'report' | 'certificate' | 'other';
  uploadDate: string;
  uploadedBy: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  expiryDate?: string;
  isConfidential: boolean;
  tags: string[];
}

// Helper types
export interface CreateEnterpriseClientRequest {
  companyName: string;
  industry: Industry;
  contractType: ContractType;
  pickupFrequency: PickupFrequency;
  primaryContact: Omit<ContactPerson, 'isPrimary'>;
  headquarters: Address;
  pricingModel: PricingModel;
  slaRequirements: SLARequirements;
  notes?: string;
}

export interface UpdateEnterpriseClientRequest extends Partial<CreateEnterpriseClientRequest> {
  id: string;
}

export interface SchedulePickupRequest {
  clientId: string;
  locationId: string;
  scheduledTime: string;
  estimatedWeight: number;
  priority: 'normal' | 'high' | 'urgent';
  specialInstructions?: string;
}

export interface EnterpriseClientExportRequest {
  filters: EnterpriseClientFilters;
  format: 'csv' | 'excel' | 'json';
  includeDetails: boolean;
  includeFinancials: boolean;
  includeESG: boolean;
}

// Enums and constants
export const CLIENT_STATUS_LABELS = {
  active: 'Active',
  inactive: 'Inactive',
  suspended: 'Suspended',
  trial: 'Trial',
  onboarding: 'Onboarding'
} as const;

export const INDUSTRY_LABELS = {
  office: 'Office',
  factory: 'Factory',
  estate: 'Estate',
  school: 'School',
  hotel: 'Hotel',
  retail: 'Retail',
  manufacturing: 'Manufacturing',
  healthcare: 'Healthcare',
  government: 'Government',
  other: 'Other'
} as const;

export const CONTRACT_TYPE_LABELS = {
  pay_per_pickup: 'Pay Per Pickup',
  monthly_retainer: 'Monthly Retainer',
  volume_based: 'Volume Based',
  hybrid: 'Hybrid',
  custom: 'Custom'
} as const;

export const SLA_STATUS_LABELS = {
  compliant: 'Compliant',
  at_risk: 'At Risk',
  breached: 'Breached',
  not_applicable: 'Not Applicable'
} as const;

export const PICKUP_FREQUENCY_LABELS = {
  daily: 'Daily',
  weekly: 'Weekly',
  bi_weekly: 'Bi-Weekly',
  monthly: 'Monthly',
  on_demand: 'On Demand',
  custom: 'Custom'
} as const;
