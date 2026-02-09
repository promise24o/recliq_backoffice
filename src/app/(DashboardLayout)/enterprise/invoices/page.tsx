'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
  Grid,
  Paper,
  FormControlLabel,
  Switch,
  CardContent
} from '@mui/material';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Settings,
  Receipt,
  CreditCard,
  Send
} from 'lucide-react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import DashboardCard from '@/app/components/shared/DashboardCard';
import InvoiceSummaryCards from './components/InvoiceSummaryCards';
import InvoicesTable from './components/InvoicesTable';
import InvoiceDetailDrawer from './components/InvoiceDetailDrawer';
import CreateInvoiceDrawer from './components/CreateInvoiceDrawer';
import type { 
  EnterpriseInvoice, 
  InvoiceSummary, 
  InvoiceFilters,
  InvoiceStatus,
  InvoiceType,
  Currency
} from './types';
import { 
  mockInvoices, 
  mockInvoiceSummary
} from './mockData';

const InvoicesPage: React.FC = () => {
  // State management
  const [invoices, setInvoices] = useState<EnterpriseInvoice[]>(mockInvoices);
  const [summary, setSummary] = useState<InvoiceSummary>(mockInvoiceSummary);
  const [filters, setFilters] = useState<InvoiceFilters>({
    status: '',
    clientId: '',
    contractId: '',
    billingPeriodStart: '',
    billingPeriodEnd: '',
    currency: '',
    invoiceType: '',
    search: '',
    dateRange: 'this_month',
    customDateRange: {
      start: '',
      end: ''
    }
  });
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<EnterpriseInvoice | null>(null);
  const [invoiceDrawerOpen, setInvoiceDrawerOpen] = useState(false);
  const [createInvoiceDrawerOpen, setCreateInvoiceDrawerOpen] = useState(false);

  // Extract unique values for filters
  const clients = Array.from(new Set(invoices.map(i => i.clientName)));
  const contracts = Array.from(new Set(invoices.map(i => i.contractNumber)));
  const currencies = Array.from(new Set(invoices.map(i => i.currency)));

  // Filter invoices
  const filteredInvoices = invoices.filter(invoice => {
    if (filters.status && invoice.status !== filters.status) return false;
    if (filters.clientId && invoice.clientId !== filters.clientId) return false;
    if (filters.contractId && invoice.contractId !== filters.contractId) return false;
    if (filters.currency && invoice.currency !== filters.currency) return false;
    if (filters.invoiceType && invoice.invoiceType !== filters.invoiceType) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
        invoice.clientName.toLowerCase().includes(searchLower) ||
        invoice.contractNumber.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  // Event handlers
  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotification({
        open: true,
        message: 'Invoice data refreshed',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to refresh data',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = (format: 'csv' | 'pdf') => {
    setNotification({
      open: true,
      message: `Exporting invoices as ${format.toUpperCase()}...`,
      severity: 'info'
    });
    // Implement export logic
  };

  const handleFilterChange = (key: keyof InvoiceFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      clientId: '',
      contractId: '',
      billingPeriodStart: '',
      billingPeriodEnd: '',
      currency: '',
      invoiceType: '',
      search: '',
      dateRange: 'this_month',
      customDateRange: {
        start: '',
        end: ''
      }
    });
    setSelectedMetric(null);
  };

  const handleCardClick = (metricType: string) => {
    setSelectedMetric(metricType);
    
    // Apply filter based on card clicked
    switch (metricType) {
      case 'total_invoices':
        // Filter for all invoices (no filter)
        break;
      case 'paid_invoices':
        handleFilterChange('status', 'paid');
        break;
      case 'overdue_invoices':
        handleFilterChange('status', 'overdue');
        break;
      case 'outstanding_amount':
        handleFilterChange('status', 'issued');
        break;
      case 'total_billed_amount':
        // Filter for issued invoices
        handleFilterChange('status', 'issued');
        break;
      case 'avg_days_to_pay':
        // Filter for paid invoices
        handleFilterChange('status', 'paid');
        break;
      default:
        break;
    }
  };

  const handleViewInvoice = (invoiceId: string) => {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (invoice) {
      setSelectedInvoice(invoice);
      setInvoiceDrawerOpen(true);
    }
  };

  const handleEditInvoice = (invoiceId: string) => {
    setNotification({
      open: true,
      message: `Opening invoice editor for ${invoiceId}`,
      severity: 'info'
    });
    // Implement invoice editing logic
  };

  const handleSendInvoice = (invoiceId: string) => {
    setNotification({
      open: true,
      message: `Sending invoice ${invoiceId} to client...`,
      severity: 'info'
    });
    // Implement invoice sending logic
  };

  const handleRecordPayment = (invoiceId: string) => {
    setNotification({
      open: true,
      message: `Opening payment recording for ${invoiceId}`,
      severity: 'info'
    });
    // Implement payment recording logic
  };

  const handleExportInvoice = (invoiceId: string) => {
    setNotification({
      open: true,
      message: `Exporting invoice ${invoiceId} as PDF...`,
      severity: 'info'
    });
    // Implement invoice export logic
  };

  const handleCreateInvoice = () => {
    setCreateInvoiceDrawerOpen(true);
  };

  const handleCreateInvoiceSuccess = (newInvoice: any) => {
    setInvoices(prev => [newInvoice, ...prev]);
    setNotification({
      open: true,
      message: `Invoice ${newInvoice.invoiceNumber} created successfully`,
      severity: 'success'
    });
  };

  return (
    <PageContainer title="Invoices" description="Enterprise billing & payment tracking">
      <Breadcrumb title="Invoices" subtitle="Enterprise billing & payment tracking" />
      
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Invoices
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enterprise billing & payment tracking
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              startIcon={<Plus />}
              onClick={handleCreateInvoice}
            >
              Create Invoice
            </Button>
            
            <IconButton onClick={handleRefresh} disabled={loading}>
              <RefreshCw size={20} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Filters Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight="600" mb={2}>
          Filters
        </Typography>
        
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="issued">Issued</MenuItem>
                <MenuItem value="partially_paid">Partially Paid</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="overdue">Overdue</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Client</InputLabel>
              <Select
                value={filters.clientId}
                label="Client"
                onChange={(e) => handleFilterChange('clientId', e.target.value)}
              >
                <MenuItem value="">All Clients</MenuItem>
                {invoices.map(invoice => (
                  <MenuItem key={invoice.clientId} value={invoice.clientId}>
                    {invoice.clientName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Contract</InputLabel>
              <Select
                value={filters.contractId}
                label="Contract"
                onChange={(e) => handleFilterChange('contractId', e.target.value)}
              >
                <MenuItem value="">All Contracts</MenuItem>
                {invoices.map(invoice => (
                  <MenuItem key={invoice.contractId} value={invoice.contractId}>
                    {invoice.contractNumber}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Billing Period</InputLabel>
              <Select
                value={filters.dateRange}
                label="Billing Period"
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <MenuItem value="this_week">This Week</MenuItem>
                <MenuItem value="this_month">This Month</MenuItem>
                <MenuItem value="last_month">Last Month</MenuItem>
                <MenuItem value="this_quarter">This Quarter</MenuItem>
                <MenuItem value="this_year">This Year</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Invoice Type</InputLabel>
              <Select
                value={filters.invoiceType}
                label="Invoice Type"
                onChange={(e) => handleFilterChange('invoiceType', e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="single_collection">Single Collection</MenuItem>
                <MenuItem value="weekly_billing">Weekly Billing</MenuItem>
                <MenuItem value="monthly_billing">Monthly Billing</MenuItem>
                <MenuItem value="custom_period">Custom Period</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Currency</InputLabel>
              <Select
                value={filters.currency}
                label="Currency"
                onChange={(e) => handleFilterChange('currency', e.target.value)}
              >
                <MenuItem value="">All Currencies</MenuItem>
                {currencies.map(currency => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search invoices..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: <Search size={16} style={{ marginRight: 8 }} />
              }}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClearFilters}
            startIcon={<Filter />}
          >
            Clear Filters
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => handleExportData('csv')}
            startIcon={<Download />}
          >
            Export (CSV)
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => handleExportData('pdf')}
            startIcon={<Download />}
          >
            Export (PDF)
          </Button>
        </Stack>

        {selectedMetric && (
          <Alert 
            severity="info" 
            sx={{ mt: 2 }}
            action={
              <Button size="small" onClick={() => setSelectedMetric(null)}>
                Clear
              </Button>
            }
          >
            Filtered by: {selectedMetric.replace('_', ' ').toUpperCase()}
          </Alert>
        )}
      </Paper>

      {/* Invoice Summary Cards */}
      <InvoiceSummaryCards 
        summary={summary} 
        onCardClick={handleCardClick}
      />

      {/* Invoices Table */}
      <DashboardCard title="Enterprise Invoices">
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              🧾 Enterprise billing • Payment tracking • Revenue realization
            </Typography>
          </Box>
          
          <InvoicesTable
            invoices={filteredInvoices}
            onViewInvoice={handleViewInvoice}
            onEditInvoice={handleEditInvoice}
            onSendInvoice={handleSendInvoice}
            onRecordPayment={handleRecordPayment}
            onExportInvoice={handleExportInvoice}
          />
        </CardContent>
      </DashboardCard>

      {/* Results Summary */}
      <Alert severity={summary.overdueInvoices > 0 ? 'warning' : summary.disputedInvoices > 0 ? 'info' : 'success'} sx={{ mt: 3 }}>
        <Typography variant="body2" fontWeight="600" mb={1}>
          Billing Operations Summary
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">
            • Showing {filteredInvoices.length} of {invoices.length} invoices
          </Typography>
          <Typography variant="body2">
            • {formatCurrency(summary.totalBilledAmount)} total billed across {summary.totalInvoices} invoices
          </Typography>
          <Typography variant="body2">
            • {formatCurrency(summary.paidAmount)} collected with {summary.avgDaysToPay} days average payment time
          </Typography>
          <Typography variant="body2">
            • {formatCurrency(summary.outstandingAmount)} outstanding across {summary.totalInvoices - summary.paidInvoices} unpaid invoices
          </Typography>
          <Typography variant="body2">
            • {summary.overdueInvoices} overdue invoices requiring immediate follow-up
          </Typography>
          <Typography variant="body2">
            • {summary.disputedInvoices} disputed invoices requiring resolution
          </Typography>
          <Typography variant="body2">
            • {summary.draftInvoices} draft invoices pending review and issuance
          </Typography>
        </Stack>
      </Alert>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification(prev => ({ ...prev, open: false }))}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {/* Invoice Detail Drawer */}
      <InvoiceDetailDrawer
        open={invoiceDrawerOpen}
        onClose={() => setInvoiceDrawerOpen(false)}
        invoice={selectedInvoice}
      />

      {/* Create Invoice Drawer */}
      <CreateInvoiceDrawer
        open={createInvoiceDrawerOpen}
        onClose={() => setCreateInvoiceDrawerOpen(false)}
        onSuccess={handleCreateInvoiceSuccess}
      />
    </PageContainer>
  );
};

const formatCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return formatter.format(amount);
};

export default InvoicesPage;
