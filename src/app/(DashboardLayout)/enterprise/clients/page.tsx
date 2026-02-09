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
  Users,
  Calendar,
  TrendingUp,
  Building,
  CheckCircle,
  AlertTriangle,
  DollarSign
} from 'lucide-react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import DashboardCard from '@/app/components/shared/DashboardCard';
import EnterpriseSummaryCards from './components/EnterpriseSummaryCards';
import EnterpriseClientsTable from './components/EnterpriseClientsTable';
import EnterpriseClientDetailDrawer from './components/EnterpriseClientDetailDrawer';
import AddEnterpriseClientDrawer from './components/AddEnterpriseClientDrawer';
import type { 
  EnterpriseClient, 
  EnterpriseClientSummary, 
  EnterprisePerformance, 
  EnterpriseClientFilters,
  ClientStatus,
  Industry,
  ContractType,
  SLAStatus,
  PickupFrequency
} from './types';
import { 
  mockEnterpriseClients, 
  mockEnterpriseClientSummary, 
  mockEnterprisePerformance 
} from './mockData';

const EnterpriseClientsPage: React.FC = () => {
  // State management
  const [enterpriseClients, setEnterpriseClients] = useState<EnterpriseClient[]>(mockEnterpriseClients);
  const [summary, setSummary] = useState<EnterpriseClientSummary>(mockEnterpriseClientSummary);
  const [performance, setPerformance] = useState<EnterprisePerformance>(mockEnterprisePerformance);
  const [filters, setFilters] = useState<EnterpriseClientFilters>({
    clientStatus: '',
    industry: '',
    contractType: '',
    city: '',
    zone: '',
    pickupFrequency: '',
    slaStatus: '',
    dateRange: {
      start: '',
      end: ''
    },
    minMonthlyVolume: undefined,
    maxMonthlyVolume: undefined,
    minMonthlyRevenue: undefined,
    maxMonthlyRevenue: undefined,
    hasSLAIssues: false,
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
  const [addClientDrawerOpen, setAddClientDrawerOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<EnterpriseClient | null>(null);
  const [clientDrawerOpen, setClientDrawerOpen] = useState(false);

  // Extract unique values for filters
  const cities = Array.from(new Set([
    ...enterpriseClients.map(c => c.headquarters.city),
    ...enterpriseClients.flatMap(c => c.locations.map(l => l.address.city))
  ]));
  const zones = Array.from(new Set([
    ...enterpriseClients.map(c => c.headquarters.zone),
    ...enterpriseClients.flatMap(c => c.locations.map(l => l.address.zone))
  ]));

  // Filter enterprise clients
  const filteredClients = enterpriseClients.filter(client => {
    if (filters.clientStatus && client.clientStatus !== filters.clientStatus) return false;
    if (filters.industry && client.industry !== filters.industry) return false;
    if (filters.contractType && client.contractType !== filters.contractType) return false;
    if (filters.city && client.headquarters.city !== filters.city && !client.locations.some(l => l.address.city === filters.city)) return false;
    if (filters.zone && client.headquarters.zone !== filters.zone && !client.locations.some(l => l.address.zone === filters.zone)) return false;
    if (filters.pickupFrequency && client.pickupFrequency !== filters.pickupFrequency) return false;
    if (filters.slaStatus && client.slaStatus !== filters.slaStatus) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        client.companyName.toLowerCase().includes(searchLower) ||
        client.primaryContact.name.toLowerCase().includes(searchLower) ||
        client.primaryContact.email.toLowerCase().includes(searchLower) ||
        client.id.toLowerCase().includes(searchLower)
      );
    }
    if (filters.minMonthlyVolume && client.monthlyVolume < filters.minMonthlyVolume) return false;
    if (filters.maxMonthlyVolume && client.monthlyVolume > filters.maxMonthlyVolume) return false;
    if (filters.minMonthlyRevenue && client.monthlyRevenue < filters.minMonthlyRevenue) return false;
    if (filters.maxMonthlyRevenue && client.monthlyRevenue > filters.maxMonthlyRevenue) return false;
    if (filters.hasSLAIssues && client.slaBreaches.length === 0) return false;
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
        message: 'Enterprise clients data refreshed',
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
      message: 'Exporting enterprise clients data...',
      severity: 'info'
    });
    // Implement export logic
  };

  const handleFilterChange = (key: keyof EnterpriseClientFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      clientStatus: '',
      industry: '',
      contractType: '',
      city: '',
      zone: '',
      pickupFrequency: '',
      slaStatus: '',
      dateRange: {
        start: '',
        end: ''
      },
      minMonthlyVolume: undefined,
      maxMonthlyVolume: undefined,
      minMonthlyRevenue: undefined,
      maxMonthlyRevenue: undefined,
      hasSLAIssues: false,
      search: ''
    });
    setSelectedMetric(null);
  };

  const handleCardClick = (metricType: string) => {
    setSelectedMetric(metricType);
    
    // Apply filter based on card clicked
    switch (metricType) {
      case 'total_clients':
        // No specific filter needed for total
        break;
      case 'active_clients':
        handleFilterChange('clientStatus', 'active');
        break;
      case 'scheduled_pickups':
        // Filter by clients with scheduled pickups
        break;
      case 'total_weight':
        handleFilterChange('minMonthlyVolume', 100);
        break;
      case 'enterprise_revenue':
        handleFilterChange('minMonthlyRevenue', 10000);
        break;
      case 'sla_issues':
        handleFilterChange('hasSLAIssues', true);
        break;
      default:
        break;
    }
  };

  const handleViewClient = (clientId: string) => {
    const client = enterpriseClients.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
      setClientDrawerOpen(true);
    }
  };

  const handleEditClient = (clientId: string) => {
    setNotification({
      open: true,
      message: `Opening client editor for ${clientId}`,
      severity: 'info'
    });
    // Implement edit logic
  };

  const handleSchedulePickup = (clientId: string) => {
    setNotification({
      open: true,
      message: `Opening pickup scheduler for client ${clientId}`,
      severity: 'info'
    });
    // Implement scheduling logic
  };

  const handleEditContract = (clientId: string) => {
    setNotification({
      open: true,
      message: `Opening contract editor for client ${clientId}`,
      severity: 'info'
    });
    // Implement contract editing logic
  };

  const handleAddClientSuccess = (newClient: EnterpriseClient) => {
    setEnterpriseClients(prev => [...prev, newClient]);
    setNotification({
      open: true,
      message: `Enterprise client "${newClient.companyName}" created successfully`,
      severity: 'success'
    });
  };

  return (
    <PageContainer title="Enterprise Clients" description="Managed business accounts and recycling activity">
      <Breadcrumb title="Enterprise Clients" subtitle="Managed business accounts and recycling activity" />
      
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Enterprise Clients
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Managed business accounts and recycling activity
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              startIcon={<Plus />}
              onClick={() => setAddClientDrawerOpen(true)}
            >
              Add Client
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
              placeholder="Search clients..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: <Search size={16} style={{ marginRight: 8 }} />
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Client Status</InputLabel>
              <Select
                value={filters.clientStatus}
                label="Client Status"
                onChange={(e) => handleFilterChange('clientStatus', e.target.value)}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
                <MenuItem value="trial">Trial</MenuItem>
                <MenuItem value="onboarding">Onboarding</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Industry</InputLabel>
              <Select
                value={filters.industry}
                label="Industry"
                onChange={(e) => handleFilterChange('industry', e.target.value)}
              >
                <MenuItem value="">All Industries</MenuItem>
                <MenuItem value="office">Office</MenuItem>
                <MenuItem value="factory">Factory</MenuItem>
                <MenuItem value="estate">Estate</MenuItem>
                <MenuItem value="school">School</MenuItem>
                <MenuItem value="hotel">Hotel</MenuItem>
                <MenuItem value="retail">Retail</MenuItem>
                <MenuItem value="manufacturing">Manufacturing</MenuItem>
                <MenuItem value="healthcare">Healthcare</MenuItem>
                <MenuItem value="government">Government</MenuItem>
                <MenuItem value="other">Other</MenuItem>
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
              <InputLabel>City</InputLabel>
              <Select
                value={filters.city}
                label="City"
                onChange={(e) => handleFilterChange('city', e.target.value)}
              >
                <MenuItem value="">All Cities</MenuItem>
                {cities.map(city => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={filters.hasSLAIssues}
                  onChange={(e) => handleFilterChange('hasSLAIssues', e.target.checked)}
                />
              }
              label="SLA Issues"
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
            Export CSV
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

      {/* Enterprise Summary Cards */}
      <EnterpriseSummaryCards 
        summary={summary} 
        onCardClick={handleCardClick}
      />

      {/* Enterprise Clients Table */}
      <DashboardCard title="Enterprise Clients">
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              🏢 Enterprise portfolio management • Performance tracking • Client relationships
            </Typography>
          </Box>
          
          <EnterpriseClientsTable
            clients={filteredClients}
            onViewClient={handleViewClient}
            onEditClient={handleEditClient}
            onSchedulePickup={handleSchedulePickup}
          />
        </CardContent>
      </DashboardCard>

      {/* Results Summary */}
      <Alert severity={summary.slaIssues > 0 ? 'warning' : 'success'} sx={{ mt: 3 }}>
        <Typography variant="body2" fontWeight="600" mb={1}>
          Enterprise Portfolio Summary
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">
            • Showing {filteredClients.length} of {enterpriseClients.length} enterprise clients
          </Typography>
          <Typography variant="body2">
            • {summary.activeClients} active clients generating ₦{(summary.enterpriseRevenue / 1000000).toFixed(1)}M revenue
          </Typography>
          <Typography variant="body2">
            • {(summary.totalWeightCollected / 1000).toFixed(1)} tons recycled through enterprise partnerships
          </Typography>
          <Typography variant="body2">
            • {summary.slaIssues} SLA issues require attention
          </Typography>
          <Typography variant="body2">
            • {summary.clientRetentionRate.toFixed(1)}% retention rate indicates {summary.clientRetentionRate >= 95 ? 'excellent' : summary.clientRetentionRate >= 85 ? 'good' : 'needs improvement'} client satisfaction
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

      {/* Add Enterprise Client Drawer */}
      <AddEnterpriseClientDrawer
        open={addClientDrawerOpen}
        onClose={() => setAddClientDrawerOpen(false)}
        onSuccess={handleAddClientSuccess}
      />

      {/* Enterprise Client Detail Drawer */}
      <EnterpriseClientDetailDrawer
        open={clientDrawerOpen}
        onClose={() => setClientDrawerOpen(false)}
        client={selectedClient}
      />
    </PageContainer>
  );
};

export default EnterpriseClientsPage;
