import { EnterpriseInvoice, InvoiceSummary, BillingTrend, AgingBucket, BillingAccuracyInsights, InvoiceStatus, InvoiceType, Currency, PaymentStatus } from './types';

// Mock Enterprise Invoices Data
export const mockInvoices: EnterpriseInvoice[] = [
  {
    id: 'INV001',
    invoiceNumber: 'INV-2024-001',
    clientId: 'ENT001',
    clientName: 'TechHub Nigeria Ltd',
    contractId: 'CONTRACT001',
    contractNumber: 'EC-2024-001',
    invoiceType: 'weekly_billing' as InvoiceType,
    status: 'paid' as InvoiceStatus,
    billingPeriod: {
      startDate: '2024-01-15',
      endDate: '2024-01-21'
    },
    invoiceDate: '2024-01-22',
    dueDate: '2024-01-29',
    issuedDate: '2024-01-22',
    paidDate: '2024-01-27',
    currency: 'NGN' as Currency,
    subtotal: 85000,
    taxAmount: 12750,
    discountAmount: 0,
    totalAmount: 97750,
    paidAmount: 97750,
    outstandingAmount: 0,
    lineItems: [
      {
        lineItemId: 'LINE001',
        collectionId: 'COLL001',
        collectionDate: '2024-01-15',
        wasteType: 'paper',
        weight: 45,
        unitPrice: 150,
        lineTotal: 6750,
        description: 'Paper waste collection - TechHub Headquarters',
        contractRateId: 'RATE001',
        specialConditions: ['Confidential documents']
      },
      {
        lineItemId: 'LINE002',
        collectionId: 'COLL002',
        collectionDate: '2024-01-17',
        wasteType: 'e_waste',
        weight: 15,
        unitPrice: 250,
        lineTotal: 3750,
        description: 'E-waste collection - TechHub Headquarters',
        contractRateId: 'RATE002',
        specialConditions: ['Data destruction required']
      },
      {
        lineItemId: 'LINE003',
        collectionId: 'COLL003',
        collectionDate: '2024-01-19',
        wasteType: 'plastic',
        weight: 25,
        unitPrice: 120,
        lineTotal: 3000,
        description: 'Plastic waste collection - TechHub Headquarters',
        contractRateId: 'RATE003'
      },
      {
        lineItemId: 'LINE004',
        collectionId: 'COLL004',
        collectionDate: '2024-01-21',
        wasteType: 'mixed',
        weight: 60,
        unitPrice: 110,
        lineTotal: 6600,
        description: 'Mixed waste collection - TechHub Headquarters',
        contractRateId: 'RATE004'
      }
    ],
    payments: [
      {
        paymentId: 'PAY001',
        paymentDate: '2024-01-27',
        amount: 97750,
        paymentMethod: {
          methodId: 'METHOD001',
          type: 'bank_transfer',
          provider: 'Zenith Bank',
          accountNumber: '****1234',
          accountName: 'TechHub Nigeria Ltd',
          bankName: 'Zenith Bank'
        },
        transactionReference: 'ZB202401270001',
        status: 'completed' as PaymentStatus,
        processedBy: 'FINANCE001',
        bankReference: 'TXN20240127001',
        notes: 'Full payment received',
        createdAt: '2024-01-27T10:30:00Z'
      }
    ],
    createdAt: '2024-01-22T09:00:00Z',
    updatedAt: '2024-01-27T10:30:00Z',
    createdBy: 'OPS_MGR001',
    lastModifiedBy: 'FINANCE001',
    notes: ['Weekly billing cycle', 'All collections completed successfully'],
    attachments: [
      {
        attachmentId: 'ATT001',
        fileName: 'collection_reports_week_3.pdf',
        fileType: 'application/pdf',
        fileSize: 2048576,
        url: '/files/attachments/collection_reports_week_3.pdf',
        uploadedAt: '2024-01-22T09:15:00Z',
        uploadedBy: 'OPS_MGR001',
        description: 'Weekly collection reports'
      }
    ],
    auditTrail: [
      {
        entryId: 'AUDIT001',
        timestamp: '2024-01-22T09:00:00Z',
        action: 'created',
        performedBy: 'OPS_MGR001',
        details: 'Invoice created from weekly billing cycle'
      },
      {
        entryId: 'AUDIT002',
        timestamp: '2024-01-22T09:30:00Z',
        action: 'issued',
        performedBy: 'OPS_MGR001',
        details: 'Invoice issued to client via email'
      },
      {
        entryId: 'AUDIT003',
        timestamp: '2024-01-27T10:30:00Z',
        action: 'payment_received',
        performedBy: 'FINANCE001',
        details: 'Full payment received via bank transfer'
      }
    ]
  },
  {
    id: 'INV002',
    invoiceNumber: 'INV-2024-002',
    clientId: 'ENT002',
    clientName: 'Lagos Manufacturing Complex',
    contractId: 'CONTRACT002',
    contractNumber: 'EC-2024-002',
    invoiceType: 'monthly_billing' as InvoiceType,
    status: 'overdue' as InvoiceStatus,
    billingPeriod: {
      startDate: '2024-01-01',
      endDate: '2024-01-31'
    },
    invoiceDate: '2024-02-01',
    dueDate: '2024-02-15',
    issuedDate: '2024-02-01',
    currency: 'NGN' as Currency,
    subtotal: 450000,
    taxAmount: 67500,
    discountAmount: 5000,
    totalAmount: 512500,
    paidAmount: 250000,
    outstandingAmount: 262500,
    lineItems: [
      {
        lineItemId: 'LINE005',
        collectionId: 'COLL005',
        collectionDate: '2024-01-02',
        wasteType: 'metal',
        weight: 250,
        unitPrice: 180,
        lineTotal: 45000,
        description: 'Metal waste collection - Manufacturing Plant',
        contractRateId: 'RATE005',
        specialConditions: ['Heavy equipment required']
      },
      {
        lineItemId: 'LINE006',
        collectionId: 'COLL006',
        collectionDate: '2024-01-05',
        wasteType: 'industrial',
        weight: 180,
        unitPrice: 220,
        lineTotal: 39600,
        description: 'Industrial waste collection - Manufacturing Plant',
        contractRateId: 'RATE006',
        specialConditions: ['Hazardous material handling']
      },
      {
        lineItemId: 'LINE007',
        collectionId: 'COLL007',
        collectionDate: '2024-01-08',
        wasteType: 'plastic',
        weight: 120,
        unitPrice: 140,
        lineTotal: 16800,
        description: 'Plastic waste collection - Manufacturing Plant',
        contractRateId: 'RATE007'
      },
      {
        lineItemId: 'LINE008',
        collectionId: 'COLL008',
        collectionDate: '2024-01-12',
        wasteType: 'hazardous',
        weight: 100,
        unitPrice: 300,
        lineTotal: 30000,
        description: 'Hazardous waste collection - Manufacturing Plant',
        contractRateId: 'RATE008',
        specialConditions: ['Environmental compliance required']
      },
      {
        lineItemId: 'LINE009',
        collectionId: 'COLL009',
        collectionDate: '2024-01-15',
        wasteType: 'metal',
        weight: 280,
        unitPrice: 180,
        lineTotal: 50400,
        description: 'Metal waste collection - Manufacturing Plant',
        contractRateId: 'RATE005'
      },
      {
        lineItemId: 'LINE010',
        collectionId: 'COLL010',
        collectionDate: '2024-01-18',
        wasteType: 'industrial',
        weight: 150,
        unitPrice: 220,
        lineTotal: 33000,
        description: 'Industrial waste collection - Manufacturing Plant',
        contractRateId: 'RATE006'
      },
      {
        lineItemId: 'LINE011',
        collectionId: 'COLL011',
        collectionDate: '2024-01-22',
        wasteType: 'plastic',
        weight: 95,
        unitPrice: 140,
        lineTotal: 13300,
        description: 'Plastic waste collection - Manufacturing Plant',
        contractRateId: 'RATE007'
      },
      {
        lineItemId: 'LINE012',
        collectionId: 'COLL012',
        collectionDate: '2024-01-25',
        wasteType: 'mixed',
        weight: 200,
        unitPrice: 160,
        lineTotal: 32000,
        description: 'Mixed waste collection - Manufacturing Plant',
        contractRateId: 'RATE009'
      },
      {
        lineItemId: 'LINE013',
        collectionId: 'COLL013',
        collectionDate: '2024-01-28',
        wasteType: 'metal',
        weight: 220,
        unitPrice: 180,
        lineTotal: 39600,
        description: 'Metal waste collection - Manufacturing Plant',
        contractRateId: 'RATE005'
      },
      {
        lineItemId: 'LINE014',
        collectionId: 'COLL014',
        collectionDate: '2024-01-31',
        wasteType: 'industrial',
        weight: 170,
        unitPrice: 220,
        lineTotal: 37400,
        description: 'Industrial waste collection - Manufacturing Plant',
        contractRateId: 'RATE006'
      }
    ],
    payments: [
      {
        paymentId: 'PAY002',
        paymentDate: '2024-02-10',
        amount: 250000,
        paymentMethod: {
          methodId: 'METHOD002',
          type: 'bank_transfer',
          provider: 'Access Bank',
          accountNumber: '****5678',
          accountName: 'Lagos Manufacturing Complex',
          bankName: 'Access Bank'
        },
        transactionReference: 'AB202402100001',
        status: 'completed' as PaymentStatus,
        processedBy: 'FINANCE001',
        bankReference: 'TXN20240210001',
        notes: 'Partial payment - 50% of invoice amount',
        createdAt: '2024-02-10T14:20:00Z'
      }
    ],
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-02-10T14:20:00Z',
    createdBy: 'OPS_MGR002',
    lastModifiedBy: 'FINANCE001',
    notes: ['Monthly billing cycle', 'High volume industrial client', 'Partial payment received'],
    attachments: [
      {
        attachmentId: 'ATT002',
        fileName: 'monthly_collection_report_jan.pdf',
        fileType: 'application/pdf',
        fileSize: 3072000,
        url: '/files/attachments/monthly_collection_report_jan.pdf',
        uploadedAt: '2024-02-01T08:15:00Z',
        uploadedBy: 'OPS_MGR002',
        description: 'Monthly collection reports and compliance certificates'
      }
    ],
    auditTrail: [
      {
        entryId: 'AUDIT004',
        timestamp: '2024-02-01T08:00:00Z',
        action: 'created',
        performedBy: 'OPS_MGR002',
        details: 'Monthly invoice created for January collections'
      },
      {
        entryId: 'AUDIT005',
        timestamp: '2024-02-01T08:30:00Z',
        action: 'issued',
        performedBy: 'OPS_MGR002',
        details: 'Invoice issued to client with 15-day payment terms'
      },
      {
        entryId: 'AUDIT006',
        timestamp: '2024-02-10T14:20:00Z',
        action: 'payment_received',
        performedBy: 'FINANCE001',
        details: 'Partial payment received - ₦250,000'
      }
    ]
  },
  {
    id: 'INV003',
    invoiceNumber: 'INV-2024-003',
    clientId: 'ENT003',
    clientName: 'EcoTech Solutions',
    contractId: 'CONTRACT003',
    contractNumber: 'EC-2024-003',
    invoiceType: 'single_collection' as InvoiceType,
    status: 'issued' as InvoiceStatus,
    billingPeriod: {
      startDate: '2024-01-28',
      endDate: '2024-01-28'
    },
    invoiceDate: '2024-01-29',
    dueDate: '2024-02-12',
    issuedDate: '2024-01-29',
    currency: 'NGN' as Currency,
    subtotal: 12000,
    taxAmount: 1800,
    discountAmount: 0,
    totalAmount: 13800,
    paidAmount: 0,
    outstandingAmount: 13800,
    lineItems: [
      {
        lineItemId: 'LINE015',
        collectionId: 'COLL015',
        collectionDate: '2024-01-28',
        wasteType: 'paper',
        weight: 35,
        unitPrice: 140,
        lineTotal: 4900,
        description: 'Paper waste collection - EcoTech Office',
        contractRateId: 'RATE010'
      },
      {
        lineItemId: 'LINE016',
        collectionId: 'COLL016',
        collectionDate: '2024-01-28',
        wasteType: 'e_waste',
        weight: 20,
        unitPrice: 280,
        lineTotal: 5600,
        description: 'E-waste collection - EcoTech Office',
        contractRateId: 'RATE011',
        specialConditions: ['Data security required']
      },
      {
        lineItemId: 'LINE017',
        collectionId: 'COLL017',
        collectionDate: '2024-01-28',
        wasteType: 'plastic',
        weight: 15,
        unitPrice: 100,
        lineTotal: 1500,
        description: 'Plastic waste collection - EcoTech Office',
        contractRateId: 'RATE012'
      }
    ],
    payments: [],
    createdAt: '2024-01-29T10:00:00Z',
    updatedAt: '2024-01-29T10:00:00Z',
    createdBy: 'OPS_MGR003',
    lastModifiedBy: 'OPS_MGR003',
    notes: ['One-off collection for office relocation', 'E-waste data security handled'],
    attachments: [],
    auditTrail: [
      {
        entryId: 'AUDIT007',
        timestamp: '2024-01-29T10:00:00Z',
        action: 'created',
        performedBy: 'OPS_MGR003',
        details: 'Invoice created for one-off collection'
      },
      {
        entryId: 'AUDIT008',
        timestamp: '2024-01-29T10:30:00Z',
        action: 'issued',
        performedBy: 'OPS_MGR003',
        details: 'Invoice issued to client with 14-day payment terms'
      }
    ]
  },
  {
    id: 'INV004',
    invoiceNumber: 'INV-2024-004',
    clientId: 'ENT001',
    clientName: 'TechHub Nigeria Ltd',
    contractId: 'CONTRACT001',
    contractNumber: 'EC-2024-001',
    invoiceType: 'weekly_billing' as InvoiceType,
    status: 'draft' as InvoiceStatus,
    billingPeriod: {
      startDate: '2024-01-22',
      endDate: '2024-01-28'
    },
    invoiceDate: '2024-01-29',
    dueDate: '2024-02-05',
    currency: 'NGN' as Currency,
    subtotal: 68000,
    taxAmount: 10200,
    discountAmount: 0,
    totalAmount: 78200,
    paidAmount: 0,
    outstandingAmount: 78200,
    lineItems: [
      {
        lineItemId: 'LINE018',
        collectionId: 'COLL018',
        collectionDate: '2024-01-23',
        wasteType: 'paper',
        weight: 40,
        unitPrice: 150,
        lineTotal: 6000,
        description: 'Paper waste collection - TechHub Headquarters',
        contractRateId: 'RATE001'
      },
      {
        lineItemId: 'LINE019',
        collectionId: 'COLL019',
        collectionDate: '2024-01-25',
        wasteType: 'plastic',
        weight: 20,
        unitPrice: 120,
        lineTotal: 2400,
        description: 'Plastic waste collection - TechHub Headquarters',
        contractRateId: 'RATE003'
      },
      {
        lineItemId: 'LINE020',
        collectionId: 'COLL020',
        collectionDate: '2024-01-27',
        wasteType: 'organic',
        weight: 15,
        unitPrice: 80,
        lineTotal: 1200,
        description: 'Organic waste collection - TechHub Headquarters',
        contractRateId: 'RATE013'
      }
    ],
    payments: [],
    createdAt: '2024-01-29T11:00:00Z',
    updatedAt: '2024-01-29T11:00:00Z',
    createdBy: 'OPS_MGR001',
    lastModifiedBy: 'OPS_MGR001',
    notes: ['Weekly billing cycle - draft', 'Pending review before issuance'],
    attachments: [],
    auditTrail: [
      {
        entryId: 'AUDIT009',
        timestamp: '2024-01-29T11:00:00Z',
        action: 'created',
        performedBy: 'OPS_MGR001',
        details: 'Draft invoice created for weekly billing cycle'
      }
    ]
  },
  {
    id: 'INV005',
    invoiceNumber: 'INV-2024-005',
    clientId: 'ENT002',
    clientName: 'Lagos Manufacturing Complex',
    contractId: 'CONTRACT002',
    contractNumber: 'EC-2024-002',
    invoiceType: 'single_collection' as InvoiceType,
    status: 'partially_paid' as InvoiceStatus,
    billingPeriod: {
      startDate: '2024-01-30',
      endDate: '2024-01-30'
    },
    invoiceDate: '2024-01-31',
    dueDate: '2024-02-14',
    issuedDate: '2024-01-31',
    currency: 'NGN' as Currency,
    subtotal: 75000,
    taxAmount: 11250,
    discountAmount: 0,
    totalAmount: 86250,
    paidAmount: 40000,
    outstandingAmount: 46250,
    lineItems: [
      {
        lineItemId: 'LINE021',
        collectionId: 'COLL021',
        collectionDate: '2024-01-30',
        wasteType: 'hazardous',
        weight: 100,
        unitPrice: 350,
        lineTotal: 35000,
        description: 'Hazardous waste collection - Specialized disposal',
        contractRateId: 'RATE014',
        specialConditions: ['Environmental compliance officer required']
      },
      {
        lineItemId: 'LINE022',
        collectionId: 'COLL022',
        collectionDate: '2024-01-30',
        wasteType: 'metal',
        weight: 150,
        unitPrice: 200,
        lineTotal: 30000,
        description: 'Metal waste collection - Heavy equipment',
        contractRateId: 'RATE015',
        specialConditions: ['Crane access required']
      },
      {
        lineItemId: 'LINE023',
        collectionId: 'COLL023',
        collectionDate: '2024-01-30',
        wasteType: 'industrial',
        weight: 50,
        unitPrice: 200,
        lineTotal: 10000,
        description: 'Industrial waste collection - Standard processing',
        contractRateId: 'RATE016'
      }
    ],
    payments: [
      {
        paymentId: 'PAY003',
        paymentDate: '2024-02-05',
        amount: 40000,
        paymentMethod: {
          methodId: 'METHOD003',
          type: 'bank_transfer',
          provider: 'Access Bank',
          accountNumber: '****5678',
          accountName: 'Lagos Manufacturing Complex',
          bankName: 'Access Bank'
        },
        transactionReference: 'AB202402050001',
        status: 'completed' as PaymentStatus,
        processedBy: 'FINANCE001',
        bankReference: 'TXN20240205001',
        notes: 'Partial payment for hazardous waste collection',
        createdAt: '2024-02-05T16:45:00Z'
      }
    ],
    createdAt: '2024-01-31T09:00:00Z',
    updatedAt: '2024-02-05T16:45:00Z',
    createdBy: 'OPS_MGR002',
    lastModifiedBy: 'FINANCE001',
    notes: ['Special hazardous waste collection', 'Partial payment received'],
    attachments: [
      {
        attachmentId: 'ATT003',
        fileName: 'hazardous_waste_compliance.pdf',
        fileType: 'application/pdf',
        fileSize: 1536000,
        url: '/files/attachments/hazardous_waste_compliance.pdf',
        uploadedAt: '2024-01-31T09:15:00Z',
        uploadedBy: 'OPS_MGR002',
        description: 'Environmental compliance certificate for hazardous waste disposal'
      }
    ],
    auditTrail: [
      {
        entryId: 'AUDIT010',
        timestamp: '2024-01-31T09:00:00Z',
        action: 'created',
        performedBy: 'OPS_MGR002',
        details: 'Invoice created for hazardous waste collection'
      },
      {
        entryId: 'AUDIT011',
        timestamp: '2024-01-31T09:30:00Z',
        action: 'issued',
        performedBy: 'OPS_MGR002',
        details: 'Invoice issued with compliance documentation'
      },
      {
        entryId: 'AUDIT012',
        timestamp: '2024-02-05T16:45:00Z',
        action: 'payment_received',
        performedBy: 'FINANCE001',
        details: 'Partial payment received - ₦40,000'
      }
    ],
    dispute: {
      disputeId: 'DISP001',
      openedDate: '2024-02-06',
      reason: 'Pricing discrepancy',
      description: 'Client disputes pricing for hazardous waste handling charges',
      status: 'open',
      attachments: [],
      communications: [
        {
          communicationId: 'COMM001',
          timestamp: '2024-02-06T10:00:00Z',
          sender: 'client',
          message: 'The hazardous waste handling charges seem higher than agreed in contract. Please review and provide breakdown.',
          attachments: []
        },
        {
          communicationId: 'COMM002',
          timestamp: '2024-02-06T14:30:00Z',
          sender: 'finance',
          message: 'We have reviewed the pricing. The charges reflect the specialized handling and environmental compliance requirements. Detailed breakdown attached.',
          attachments: []
        }
      ]
    }
  }
];

// Mock Invoice Summary
export const mockInvoiceSummary: InvoiceSummary = {
  totalInvoices: 5,
  totalBilledAmount: 788500,
  paidInvoices: 1,
  paidAmount: 97750,
  outstandingAmount: 451800,
  overdueInvoices: 1,
  overdueAmount: 262500,
  avgDaysToPay: 5,
  draftInvoices: 1,
  disputedInvoices: 1,
  partiallyPaidInvoices: 1
};

// Mock Billing Trends
export const mockBillingTrends: BillingTrend[] = [
  {
    period: '2024-W01',
    invoicesIssued: 2,
    invoicesPaid: 1,
    amountBilled: 125000,
    amountPaid: 45000,
    outstandingAmount: 80000,
    avgInvoiceValue: 62500,
    paymentRate: 36.0
  },
  {
    period: '2024-W02',
    invoicesIssued: 3,
    invoicesPaid: 2,
    amountBilled: 285000,
    amountPaid: 180000,
    outstandingAmount: 105000,
    avgInvoiceValue: 95000,
    paymentRate: 63.2
  },
  {
    period: '2024-W03',
    invoicesIssued: 4,
    invoicesPaid: 2,
    amountBilled: 420000,
    amountPaid: 250000,
    outstandingAmount: 170000,
    avgInvoiceValue: 105000,
    paymentRate: 59.5
  },
  {
    period: '2024-W04',
    invoicesIssued: 5,
    invoicesPaid: 3,
    amountBilled: 588500,
    amountPaid: 277750,
    outstandingAmount: 310750,
    avgInvoiceValue: 117700,
    paymentRate: 47.2
  }
];

// Mock Aging Buckets
export const mockAgingBuckets: AgingBucket[] = [
  {
    bucket: 'Current',
    daysRange: '0 days',
    invoiceCount: 2,
    amount: 13800,
    percentage: 3.1
  },
  {
    bucket: '0-30 days',
    daysRange: '1-30 days',
    invoiceCount: 1,
    amount: 46250,
    percentage: 10.2
  },
  {
    bucket: '31-60 days',
    daysRange: '31-60 days',
    invoiceCount: 1,
    amount: 262500,
    percentage: 58.1
  },
  {
    bucket: '60+ days',
    daysRange: '60+ days',
    invoiceCount: 0,
    amount: 0,
    percentage: 0.0
  }
];

// Mock Billing Accuracy Insights
export const mockBillingAccuracyInsights: BillingAccuracyInsights = {
  contractPriceVariance: [
    {
      contractId: 'CONTRACT002',
      contractNumber: 'EC-2024-002',
      clientId: 'ENT002',
      clientName: 'Lagos Manufacturing Complex',
      expectedRate: 200,
      actualRate: 220,
      variance: 20,
      variancePercentage: 10.0,
      affectedInvoices: 3,
      totalVarianceAmount: 15000
    }
  ],
  disputedInvoices: [
    {
      invoiceId: 'INV005',
      invoiceNumber: 'INV-2024-005',
      clientId: 'ENT002',
      clientName: 'Lagos Manufacturing Complex',
      disputeReason: 'Pricing discrepancy',
      disputeAmount: 86250,
      disputeDate: '2024-02-06',
      resolutionStatus: 'open'
    }
  ],
  frequentLatePayers: [
    {
      clientId: 'ENT002',
      clientName: 'Lagos Manufacturing Complex',
      totalInvoices: 3,
      latePayments: 2,
      latePaymentRate: 66.7,
      avgDaysLate: 18,
      maxDaysLate: 25,
      totalLateAmount: 262500,
      lastPaymentDate: '2024-02-10'
    }
  ],
  revenueByClient: [
    {
      clientId: 'ENT002',
      clientName: 'Lagos Manufacturing Complex',
      totalRevenue: 598750,
      invoiceCount: 3,
      avgInvoiceValue: 199583,
      paymentRate: 48.3,
      lastInvoiceDate: '2024-01-31',
      growthRate: 15.2
    },
    {
      clientId: 'ENT001',
      clientName: 'TechHub Nigeria Ltd',
      totalRevenue: 175950,
      invoiceCount: 2,
      avgInvoiceValue: 87975,
      paymentRate: 55.6,
      lastInvoiceDate: '2024-01-29',
      growthRate: 8.7
    },
    {
      clientId: 'ENT003',
      clientName: 'EcoTech Solutions',
      totalRevenue: 13800,
      invoiceCount: 1,
      avgInvoiceValue: 13800,
      paymentRate: 0.0,
      lastInvoiceDate: '2024-01-29',
      growthRate: 0.0
    }
  ],
  revenueByCity: [
    {
      city: 'Lagos',
      totalRevenue: 788500,
      invoiceCount: 5,
      clientCount: 3,
      avgInvoiceValue: 157700,
      topClients: ['Lagos Manufacturing Complex', 'TechHub Nigeria Ltd', 'EcoTech Solutions']
    }
  ]
};

// Helper functions
export const getInvoiceTypeColor = (type: InvoiceType): string => {
  switch (type) {
    case 'single_collection': return '#3b82f6';
    case 'weekly_billing': return '#10b981';
    case 'monthly_billing': return '#f59e0b';
    case 'custom_period': return '#8b5cf6';
    default: return '#6b7280';
  }
};

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
