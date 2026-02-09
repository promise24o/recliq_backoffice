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
  Eye,
  Settings,
  FileText,
  Clock,
  DollarSign,
  Building,
  CheckCircle,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import DashboardCard from '@/app/components/shared/DashboardCard';
import ContractsPricingSummaryCards from './components/ContractsPricingSummaryCards';
import ContractsTable from './components/ContractsTable';
import ContractDetailDrawer from './components/ContractDetailDrawer';
import type { 
  EnterpriseContract, 
  ContractsPricingSummary, 
  PricingEnforcementInsights, 
  ContractFilters,
  ContractStatus,
  ContractType,
  RenewalWindow
} from './types';
import { 
  mockEnterpriseContracts, 
  mockContractsPricingSummary, 
  mockPricingEnforcementInsights 
} from './mockData';

const ContractsPricingPage: React.FC = () => {
  // State management
  const [contracts, setContracts] = useState<EnterpriseContract[]>(mockEnterpriseContracts);
  const [summary, setSummary] = useState<ContractsPricingSummary>(mockContractsPricingSummary);
  const [insights, setInsights] = useState<PricingEnforcementInsights>(mockPricingEnforcementInsights);
  const [filters, setFilters] = useState<ContractFilters>({
    status: '',
    clientId: '',
    contractType: '',
    renewalWindow: '',
    riskLevel: '',
    dateRange: {
      start: '',
      end: ''
    },
    minContractValue: undefined,
    maxContractValue: undefined,
    hasCustomPricing: false,
    hasSLAPenalties: false,
    search: ''
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
  const [selectedContract, setSelectedContract] = useState<EnterpriseContract | null>(null);
  const [contractDrawerOpen, setContractDrawerOpen] = useState(false);

  // Extract unique values for filters
  const clients = Array.from(new Set(contracts.map(c => c.clientName)));
  const contractTypes = Array.from(new Set(contracts.map(c => c.contractType)));

  // Filter contracts
  const filteredContracts = contracts.filter(contract => {
    if (filters.status && contract.status !== filters.status) return false;
    if (filters.clientId && contract.clientId !== filters.clientId) return false;
    if (filters.contractType && contract.contractType !== filters.contractType) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        contract.contractNumber.toLowerCase().includes(searchLower) ||
        contract.clientName.toLowerCase().includes(searchLower) ||
        contract.id.toLowerCase().includes(searchLower)
      );
    }
    if (filters.minContractValue && contract.totalRevenue < filters.minContractValue) return false;
    if (filters.maxContractValue && contract.totalRevenue > filters.maxContractValue) return false;
    if (filters.hasCustomPricing && contract.pricingModel.specialClauses.length === 0) return false;
    if (filters.hasSLAPenalties && contract.slaConfiguration.penaltyRules.length === 0) return false;
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
        message: 'Contracts & pricing data refreshed',
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

  const handleExportData = () => {
    setNotification({
      open: true,
      message: 'Exporting contracts data for finance...',
      severity: 'info'
    });
    // Implement export logic
  };

  const handleFilterChange = (key: keyof ContractFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      clientId: '',
      contractType: '',
      renewalWindow: '',
      riskLevel: '',
      dateRange: {
        start: '',
        end: ''
      },
      minContractValue: undefined,
      maxContractValue: undefined,
      hasCustomPricing: false,
      hasSLAPenalties: false,
      search: ''
    });
    setSelectedMetric(null);
  };

  const handleCardClick = (metricType: string) => {
    setSelectedMetric(metricType);
    
    // Apply filter based on card clicked
    switch (metricType) {
      case 'active_contracts':
        handleFilterChange('status', 'active');
        break;
      case 'expiring_soon':
        handleFilterChange('renewalWindow', '90_days');
        break;
      case 'avg_contract_value':
        handleFilterChange('minContractValue', 1000000);
        break;
      case 'custom_pricing_rules':
        handleFilterChange('hasCustomPricing', true);
        break;
      case 'sla_penalty_clauses':
        handleFilterChange('hasSLAPenalties', true);
        break;
      case 'revenue_covered':
        // Filter by contracts with revenue
        handleFilterChange('minContractValue', 1);
        break;
      default:
        break;
    }
  };

  const handleViewContract = (contractId: string) => {
    const contract = contracts.find(c => c.id === contractId);
    if (contract) {
      setSelectedContract(contract);
      setContractDrawerOpen(true);
    }
  };

  const handleEditContract = (contractId: string) => {
    setNotification({
      open: true,
      message: `Opening contract editor for ${contractId}`,
      severity: 'info'
    });
    // Implement contract editing logic
  };

  const handleCreateContract = () => {
    setNotification({
      open: true,
      message: 'Create contract feature coming soon',
      severity: 'info'
    });
    // Implement contract creation logic
  };

  return (
    <PageContainer title="Contracts & Pricing" description="Enterprise agreements, pricing models & SLAs">
      <Breadcrumb title="Contracts & Pricing" subtitle="Enterprise agreements, pricing models & SLAs" />
      
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Contracts & Pricing
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enterprise agreements, pricing models & SLAs
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              startIcon={<Plus />}
              onClick={handleCreateContract}
            >
              Create Contract
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
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search contracts..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: <Search size={16} style={{ marginRight: 8 }} />
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Contract Status</InputLabel>
              <Select
                value={filters.status}
                label="Contract Status"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="expired">Expired</MenuItem>
                <MenuItem value="terminated">Terminated</MenuItem>
                <MenuItem value="renewal_pending">Renewal Pending</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
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
                {contracts.map(contract => (
                  <MenuItem key={contract.clientId} value={contract.clientId}>
                    {contract.clientName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Contract Type</InputLabel>
              <Select
                value={filters.contractType}
                label="Contract Type"
                onChange={(e) => handleFilterChange('contractType', e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="pay_per_pickup">Pay Per Pickup</MenuItem>
                <MenuItem value="monthly_retainer">Monthly Retainer</MenuItem>
                <MenuItem value="volume_based">Volume Based</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
                <MenuItem value="custom">Custom</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Renewal Window</InputLabel>
              <Select
                value={filters.renewalWindow}
                label="Renewal Window"
                onChange={(e) => handleFilterChange('renewalWindow', e.target.value)}
              >
                <MenuItem value="">All Windows</MenuItem>
                <MenuItem value="30_days">30 Days</MenuItem>
                <MenuItem value="60_days">60 Days</MenuItem>
                <MenuItem value="90_days">90 Days</MenuItem>
                <MenuItem value="custom">Custom</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={filters.hasCustomPricing}
                  onChange={(e) => handleFilterChange('hasCustomPricing', e.target.checked)}
                />
              }
              label="Custom"
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
            onClick={handleExportData}
            startIcon={<Download />}
          >
            Export (Finance)
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

      {/* Contracts & Pricing Summary Cards */}
      <ContractsPricingSummaryCards 
        summary={summary} 
        onCardClick={handleCardClick}
      />

      {/* Contracts Table */}
      <DashboardCard title="Enterprise Contracts">
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              📄 Contract management • Status tracking • Performance monitoring
            </Typography>
          </Box>
          
          <ContractsTable
            contracts={filteredContracts}
            onViewContract={handleViewContract}
            onEditContract={handleEditContract}
          />
        </CardContent>
      </DashboardCard>

      {/* Results Summary */}
      <Alert severity={summary.highRiskContracts > 0 ? 'warning' : 'success'} sx={{ mt: 3 }}>
        <Typography variant="body2" fontWeight="600" mb={1}>
          Contract Portfolio Summary
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">
            • Showing {filteredContracts.length} of {contracts.length} contracts
          </Typography>
          <Typography variant="body2">
            • {summary.activeContracts} active contracts covering {summary.revenueCovered.toFixed(1)}% of enterprise revenue
          </Typography>
          <Typography variant="body2">
            • ₦{(summary.totalContractValue / 1000000).toFixed(1)}M total contract value with {summary.avgMargin.toFixed(1)}% average margin
          </Typography>
          <Typography variant="body2">
            • {summary.expiringSoon} contracts expiring soon require renewal attention
          </Typography>
          <Typography variant="body2">
            • {summary.customPricingRules} custom pricing rules and {summary.slaPenaltyClauses} SLA penalty clauses require monitoring
          </Typography>
          <Typography variant="body2">
            • {summary.highRiskContracts} high-risk contracts identified for review
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

      {/* Contract Detail Drawer */}
      <ContractDetailDrawer
        open={contractDrawerOpen}
        onClose={() => setContractDrawerOpen(false)}
        contract={selectedContract}
      />
    </PageContainer>
  );
};

export default ContractsPricingPage;
