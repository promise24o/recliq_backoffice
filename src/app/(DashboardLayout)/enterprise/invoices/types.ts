// Enterprise Invoices System Types

export type InvoiceStatus = 'draft' | 'issued' | 'partially_paid' | 'paid' | 'overdue' | 'cancelled';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
export type InvoiceType = 'single_collection' | 'weekly_billing' | 'monthly_billing' | 'custom_period';
export type Currency = 'NGN' | 'USD' | 'EUR' | 'GBP';
export type WasteType = 'paper' | 'plastic' | 'metal' | 'glass' | 'organic' | 'e_waste' | 'hazardous' | 'textile' | 'wood' | 'industrial' | 'mixed';

export interface EnterpriseInvoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  contractId: string;
  contractNumber: string;
  invoiceType: InvoiceType;
  status: InvoiceStatus;
  
  // Billing period
  billingPeriod: {
    startDate: string;
    endDate: string;
  };
  
  // Dates
  invoiceDate: string;
  dueDate: string;
  issuedDate?: string;
  paidDate?: string;
  cancelledDate?: string;
  
  // Financial details
  currency: Currency;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  
  // Line items
  lineItems: InvoiceLineItem[];
  
  // Payment tracking
  payments: Payment[];
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastModifiedBy: string;
  notes: string[];
  attachments: InvoiceAttachment[];
  
  // Audit trail
  auditTrail: InvoiceAuditEntry[];
  
  // Dispute information
  dispute?: InvoiceDispute;
}

export interface InvoiceLineItem {
  lineItemId: string;
  collectionId?: string;
  collectionDate?: string;
  wasteType: WasteType;
  weight: number; // kg
  unitPrice: number;
  lineTotal: number;
  description: string;
  contractRateId?: string;
  specialConditions?: string[];
}

export interface Payment {
  paymentId: string;
  paymentDate: string;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionReference: string;
  status: PaymentStatus;
  processedBy: string;
  bankReference?: string;
  notes?: string;
  createdAt: string;
}

export interface PaymentMethod {
  methodId: string;
  type: 'bank_transfer' | 'card' | 'mobile_money' | 'check' | 'cash';
  provider: string;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
  mobileNumber?: string;
  cardLast4?: string;
}

export interface InvoiceAttachment {
  attachmentId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  description: string;
}

export interface InvoiceAuditEntry {
  entryId: string;
  timestamp: string;
  action: 'created' | 'issued' | 'sent' | 'payment_received' | 'dispute_opened' | 'dispute_resolved' | 'cancelled' | 'modified';
  performedBy: string;
  details: string;
  previousValues?: Record<string, any>;
  newValues?: Record<string, any>;
}

export interface InvoiceDispute {
  disputeId: string;
  openedDate: string;
  reason: string;
  description: string;
  status: 'open' | 'under_review' | 'resolved' | 'rejected';
  resolution?: string;
  resolvedDate?: string;
  resolvedBy?: string;
  attachments: InvoiceAttachment[];
  communications: DisputeCommunication[];
}

export interface DisputeCommunication {
  communicationId: string;
  timestamp: string;
  sender: string;
  message: string;
  attachments: InvoiceAttachment[];
}

export interface InvoiceFilters {
  status: InvoiceStatus | '';
  clientId: string;
  contractId: string;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  currency: Currency | '';
  invoiceType: InvoiceType | '';
  search: string;
  dateRange: 'this_week' | 'this_month' | 'last_month' | 'this_quarter' | 'this_year' | 'custom';
  customDateRange: {
    start: string;
    end: string;
  };
}

export interface InvoiceSummary {
  totalInvoices: number;
  totalBilledAmount: number;
  paidInvoices: number;
  paidAmount: number;
  outstandingAmount: number;
  overdueInvoices: number;
  overdueAmount: number;
  avgDaysToPay: number;
  draftInvoices: number;
  disputedInvoices: number;
  partiallyPaidInvoices: number;
}

export interface BillingTrend {
  period: string;
  invoicesIssued: number;
  invoicesPaid: number;
  amountBilled: number;
  amountPaid: number;
  outstandingAmount: number;
  avgInvoiceValue: number;
  paymentRate: number; // percentage
}

export interface AgingBucket {
  bucket: string;
  daysRange: string;
  invoiceCount: number;
  amount: number;
  percentage: number;
}

export interface BillingAccuracyInsights {
  contractPriceVariance: ContractPriceVariance[];
  disputedInvoices: DisputedInvoice[];
  frequentLatePayers: FrequentLatePayer[];
  revenueByClient: RevenueByClient[];
  revenueByCity: RevenueByCity[];
}

export interface ContractPriceVariance {
  contractId: string;
  contractNumber: string;
  clientId: string;
  clientName: string;
  expectedRate: number;
  actualRate: number;
  variance: number;
  variancePercentage: number;
  affectedInvoices: number;
  totalVarianceAmount: number;
}

export interface DisputedInvoice {
  invoiceId: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  disputeReason: string;
  disputeAmount: number;
  disputeDate: string;
  resolutionStatus: string;
  resolutionDate?: string;
}

export interface FrequentLatePayer {
  clientId: string;
  clientName: string;
  totalInvoices: number;
  latePayments: number;
  latePaymentRate: number;
  avgDaysLate: number;
  maxDaysLate: number;
  totalLateAmount: number;
  lastPaymentDate: string;
}

export interface RevenueByClient {
  clientId: string;
  clientName: string;
  totalRevenue: number;
  invoiceCount: number;
  avgInvoiceValue: number;
  paymentRate: number;
  lastInvoiceDate: string;
  growthRate: number;
}

export interface RevenueByCity {
  city: string;
  totalRevenue: number;
  invoiceCount: number;
  clientCount: number;
  avgInvoiceValue: number;
  topClients: string[];
}

export interface InvoiceDetail {
  invoice: EnterpriseInvoice;
  client: {
    clientId: string;
    clientName: string;
    billingAddress: Address;
    paymentTerms: string;
    taxId?: string;
  };
  contract: {
    contractId: string;
    contractNumber: string;
    pricingModel: string;
    billingCycle: string;
    paymentTerms: string;
  };
  collections: CollectionReference[];
  billingAccuracy: BillingAccuracy;
  paymentHistory: Payment[];
  disputeHistory: InvoiceDispute[];
}

export interface Address {
  street: string;
  city: string;
  zone: string;
  state: string;
  postalCode?: string;
  country: string;
}

export interface CollectionReference {
  collectionId: string;
  collectionDate: string;
  location: string;
  wasteCategories: string[];
  totalWeight: number;
  billedAmount: number;
  status: string;
}

export interface BillingAccuracy {
  totalVariance: number;
  variancePercentage: number;
  varianceReasons: string[];
  affectedLineItems: number;
  totalLineItems: number;
}

// Helper types
export interface CreateInvoiceRequest {
  clientId: string;
  contractId: string;
  invoiceType: InvoiceType;
  billingPeriod: {
    startDate: string;
    endDate: string;
  };
  collectionIds?: string[];
  dueDate: string;
  currency: Currency;
  notes?: string;
}

export interface UpdateInvoiceRequest extends Partial<CreateInvoiceRequest> {
  invoiceId: string;
  reason: string;
  requiresApproval: boolean;
}

export interface IssueInvoiceRequest {
  invoiceId: string;
  issueDate: string;
  dueDate: string;
  sendToClient: boolean;
  deliveryMethod: 'email' | 'portal' | 'both';
  recipientEmails?: string[];
  notes?: string;
}

export interface RecordPaymentRequest {
  invoiceId: string;
  paymentAmount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  transactionReference: string;
  notes?: string;
  markAsPaid?: boolean;
}

export interface CreateCreditNoteRequest {
  invoiceId: string;
  reason: string;
  amount: number;
  lineItems?: {
    lineItemId: string;
    creditAmount: number;
    reason: string;
  }[];
  issueDate: string;
  applyToInvoice: boolean;
  notes?: string;
}

export interface InvoiceExportRequest {
  filters: InvoiceFilters;
  format: 'csv' | 'excel' | 'pdf';
  includeLineItems: boolean;
  includePaymentHistory: boolean;
  includeAuditTrail: boolean;
  dateRange: {
    start: string;
    end: string;
  };
}

// Enums and constants
export const INVOICE_STATUS_LABELS = {
  draft: 'Draft',
  issued: 'Issued',
  partially_paid: 'Partially Paid',
  paid: 'Paid',
  overdue: 'Overdue',
  cancelled: 'Cancelled'
} as const;

export const PAYMENT_STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  refunded: 'Refunded'
} as const;

export const INVOICE_TYPE_LABELS = {
  single_collection: 'Single Collection',
  weekly_billing: 'Weekly Billing',
  monthly_billing: 'Monthly Billing',
  custom_period: 'Custom Period'
} as const;

export const CURRENCY_LABELS = {
  NGN: 'Nigerian Naira (₦)',
  USD: 'US Dollar ($)',
  EUR: 'Euro (€)',
  GBP: 'British Pound (£)'
} as const;

export const PAYMENT_METHOD_LABELS = {
  bank_transfer: 'Bank Transfer',
  card: 'Credit/Debit Card',
  mobile_money: 'Mobile Money',
  check: 'Check',
  cash: 'Cash'
} as const;

// Helper functions
export const getInvoiceStatusColor = (status: InvoiceStatus): string => {
  switch (status) {
    case 'draft': return '#6b7280';
    case 'issued': return '#3b82f6';
    case 'partially_paid': return '#f59e0b';
    case 'paid': return '#10b981';
    case 'overdue': return '#ef4444';
    case 'cancelled': return '#6b7280';
    default: return '#6b7280';
  }
};

export const getPaymentStatusColor = (status: PaymentStatus): string => {
  switch (status) {
    case 'pending': return '#f59e0b';
    case 'processing': return '#3b82f6';
    case 'completed': return '#10b981';
    case 'failed': return '#ef4444';
    case 'refunded': return '#8b5cf6';
    default: return '#6b7280';
  }
};

export const formatCurrency = (amount: number, currency: Currency = 'NGN'): string => {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return formatter.format(amount);
};

export const getDaysOverdue = (dueDate: string): number => {
  const due = new Date(dueDate);
  const today = new Date();
  const diffTime = today.getTime() - due.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getDaysToPay = (invoiceDate: string, paidDate: string): number => {
  const invoice = new Date(invoiceDate);
  const paid = new Date(paidDate);
  const diffTime = paid.getTime() - invoice.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isInvoiceOverdue = (dueDate: string, status: InvoiceStatus): boolean => {
  if (status === 'paid' || status === 'cancelled') return false;
  return getDaysOverdue(dueDate) > 0;
};

export const getAgingBucket = (daysOverdue: number): string => {
  if (daysOverdue <= 0) return 'Current';
  if (daysOverdue <= 30) return '0-30 days';
  if (daysOverdue <= 60) return '31-60 days';
  return '60+ days';
};
