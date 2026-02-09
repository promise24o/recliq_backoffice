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
  Paper
} from '@mui/material';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  AlertTriangle,
  User,
  MapPin,
  Clock
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

// Import components
import DisputeSummaryCards from './components/DisputeSummaryCards';
import DisputeTrendRiskAnalysis from './components/DisputeTrendRiskAnalysis';
import DisputesTable from './components/DisputesTable';
import DisputeDetailDrawer from './components/DisputeDetailDrawer';
import ResolutionQualitySystemicInsights from './components/ResolutionQualitySystemicInsights';

// Import data and types
import { 
  mockDisputes, 
  mockDisputeSummary, 
  mockDisputeTrends, 
  mockDisputeInsights 
} from './mockData';
import { Dispute, DisputeInsight, DisputeFilters } from './types';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';

export default function DisputesPage() {
  // State management
  const [disputes, setDisputes] = useState<Dispute[]>(mockDisputes);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<DisputeFilters>({
    status: '',
    disputeType: '',
    city: '',
    zone: '',
    pickupMode: '',
    matchType: '',
    raisedBy: '',
    dateRange: { start: '', end: '' }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info'
  });

  // Event handlers
  const handleDisputeClick = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setDrawerOpen(true);
  };

  const handleCardClick = (filterType: string) => {
    setNotification({
      open: true,
      message: `Filtering by: ${filterType}`,
      severity: 'info'
    });
  };

  const handleExport = (disputesToExport: Dispute[]) => {
    setNotification({
      open: true,
      message: `Exporting ${disputesToExport.length} disputes...`,
      severity: 'success'
    });
  };

  const handleApproveAgentClaim = (dispute: Dispute) => {
    setDisputes(prev => prev.map(d => 
      d.id === dispute.id ? { 
        ...d, 
        status: 'resolved' as const,
        resolvedAt: new Date().toISOString(),
        resolution: {
          action: 'approve_agent' as const,
          resolvedBy: 'OPS001',
          resolvedAt: new Date().toISOString(),
          finalPayout: dispute.financialContext.originalPayout,
          notes: 'Agent claim approved after investigation',
          auditTrail: [
            ...(d.resolution?.auditTrail || []),
            {
              timestamp: new Date().toISOString(),
              action: 'dispute_resolved',
              performedBy: 'OPS001',
              details: 'Agent claim approved'
            }
          ]
        }
      } : d
    ));
    setNotification({
      open: true,
      message: `Agent claim approved for dispute ${dispute.id}`,
      severity: 'success'
    });
  };

  const handleApproveUserClaim = (dispute: Dispute) => {
    setDisputes(prev => prev.map(d => 
      d.id === dispute.id ? { 
        ...d, 
        status: 'resolved' as const,
        resolvedAt: new Date().toISOString(),
        resolution: {
          action: 'approve_user' as const,
          resolvedBy: 'OPS001',
          resolvedAt: new Date().toISOString(),
          finalPayout: dispute.financialContext.originalPayout + dispute.financialContext.potentialAdjustment,
          notes: 'User claim approved after investigation',
          auditTrail: [
            ...(d.resolution?.auditTrail || []),
            {
              timestamp: new Date().toISOString(),
              action: 'dispute_resolved',
              performedBy: 'OPS001',
              details: 'User claim approved'
            }
          ]
        }
      } : d
    ));
    setNotification({
      open: true,
      message: `User claim approved for dispute ${dispute.id}`,
      severity: 'success'
    });
  };

  const handleSplitResolution = (dispute: Dispute, userAmount: number, agentAmount: number) => {
    setDisputes(prev => prev.map(d => 
      d.id === dispute.id ? { 
        ...d, 
        status: 'resolved' as const,
        resolvedAt: new Date().toISOString(),
        resolution: {
          action: 'split' as const,
          resolvedBy: 'OPS001',
          resolvedAt: new Date().toISOString(),
          finalPayout: userAmount + agentAmount,
          notes: `Split resolution: User ₦${userAmount}, Agent ₦${agentAmount}`,
          auditTrail: [
            ...(d.resolution?.auditTrail || []),
            {
              timestamp: new Date().toISOString(),
              action: 'dispute_resolved',
              performedBy: 'OPS001',
              details: 'Split resolution applied'
            }
          ]
        }
      } : d
    ));
    setNotification({
      open: true,
      message: `Split resolution applied for dispute ${dispute.id}`,
      severity: 'success'
    });
  };

  const handleAdjustPayout = (dispute: Dispute, newAmount: number, reason: string) => {
    setDisputes(prev => prev.map(d => 
      d.id === dispute.id ? { 
        ...d, 
        status: 'resolved' as const,
        resolvedAt: new Date().toISOString(),
        resolution: {
          action: 'adjust_payout' as const,
          resolvedBy: 'OPS001',
          resolvedAt: new Date().toISOString(),
          finalPayout: newAmount,
          notes: `Payout adjusted: ${reason}`,
          auditTrail: [
            ...(d.resolution?.auditTrail || []),
            {
              timestamp: new Date().toISOString(),
              action: 'dispute_resolved',
              performedBy: 'OPS001',
              details: `Payout adjusted to ₦${newAmount}`
            }
          ]
        }
      } : d
    ));
    setNotification({
      open: true,
      message: `Payout adjusted for dispute ${dispute.id}`,
      severity: 'info'
    });
  };

  const handleDismissDispute = (dispute: Dispute) => {
    setDisputes(prev => prev.map(d => 
      d.id === dispute.id ? { 
        ...d, 
        status: 'resolved' as const,
        resolvedAt: new Date().toISOString(),
        resolution: {
          action: 'dismiss' as const,
          resolvedBy: 'OPS001',
          resolvedAt: new Date().toISOString(),
          finalPayout: dispute.financialContext.originalPayout,
          notes: 'Dispute dismissed - claim not substantiated',
          auditTrail: [
            ...(d.resolution?.auditTrail || []),
            {
              timestamp: new Date().toISOString(),
              action: 'dispute_resolved',
              performedBy: 'OPS001',
              details: 'Dispute dismissed'
            }
          ]
        }
      } : d
    ));
    setNotification({
      open: true,
      message: `Dispute ${dispute.id} dismissed`,
      severity: 'warning'
    });
  };

  const handleEscalateToCompliance = (dispute: Dispute) => {
    setDisputes(prev => prev.map(d => 
      d.id === dispute.id ? { 
        ...d, 
        status: 'escalated' as const,
        updatedAt: new Date().toISOString()
      } : d
    ));
    setNotification({
      open: true,
      message: `Dispute ${dispute.id} escalated to compliance`,
      severity: 'warning'
    });
  };

  const handleInsightClick = (insight: DisputeInsight) => {
    setNotification({
      open: true,
      message: `Investigating: ${insight.title}`,
      severity: 'info'
    });
  };

  const handleRefresh = () => {
    setNotification({
      open: true,
      message: 'Dispute data refreshed successfully',
      severity: 'success'
    });
  };

  // Filter disputes based on search and filters
  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = searchTerm === '' || 
      dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.relatedId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === '' || dispute.status === filters.status;
    const matchesDisputeType = filters.disputeType === '' || dispute.disputeType === filters.disputeType;
    const matchesCity = filters.city === '' || dispute.city === filters.city;
    const matchesZone = filters.zone === '' || dispute.zone === filters.zone;
    const matchesPickupMode = filters.pickupMode === '' || dispute.pickupMode === filters.pickupMode;
    const matchesMatchType = filters.matchType === '' || dispute.matchType === filters.matchType;
    const matchesRaisedBy = filters.raisedBy === '' || dispute.raisedBy === filters.raisedBy;

    return matchesSearch && matchesStatus && matchesDisputeType && matchesCity && matchesZone && 
           matchesPickupMode && matchesMatchType && matchesRaisedBy;
  });

  // Get unique values for filters
  const cities = Array.from(new Set(disputes.map(d => d.city)));
  const zones = Array.from(new Set(disputes.map(d => d.zone)));
  const disputeTypes = Array.from(new Set(disputes.map(d => d.disputeType)));

  return (
    <PageContainer title="Disputes" description="Active and resolved pickup & drop-off conflicts">
      <Breadcrumb title="Disputes" subtitle="Active and resolved pickup & drop-off conflicts" />
      
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="600" mb={1}>
          Disputes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Active and resolved pickup & drop-off conflicts
        </Typography>
      </Box>

      {/* Filters and Controls */}
      <Box sx={{ mb: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <TextField
              placeholder="Search disputes..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search size={20} color="#6b7280" style={{ marginRight: 8 }} />
              }}
              sx={{ minWidth: 300 }}
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                label="Status"
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="under_review">Under Review</MenuItem>
                <MenuItem value="resolved">Resolved</MenuItem>
                <MenuItem value="escalated">Escalated</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Dispute Type</InputLabel>
              <Select
                value={filters.disputeType}
                onChange={(e) => setFilters(prev => ({ ...prev, disputeType: e.target.value }))}
                label="Dispute Type"
              >
                <MenuItem value="">All Types</MenuItem>
                {disputeTypes.map(type => (
                  <MenuItem key={type} value={type}>
                    {type.replace('_', ' ').toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>City</InputLabel>
              <Select
                value={filters.city}
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                label="City"
              >
                <MenuItem value="">All Cities</MenuItem>
                {cities.map(city => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Raised By</InputLabel>
              <Select
                value={filters.raisedBy}
                onChange={(e) => setFilters(prev => ({ ...prev, raisedBy: e.target.value }))}
                label="Raised By"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="agent">Agent</MenuItem>
                <MenuItem value="system">System</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ flex: 1 }} />

            <IconButton onClick={handleRefresh}>
              <RefreshCw size={20} />
            </IconButton>

            <Button
              variant="outlined"
              startIcon={<Download size={16} />}
              onClick={() => handleExport(filteredDisputes)}
            >
              Export CSV
            </Button>
          </Stack>
        </Paper>
      </Box>

      {/* Summary Cards */}
      <DisputeSummaryCards
        summary={mockDisputeSummary}
        onCardClick={handleCardClick}
      />

      {/* Main Content Grid */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Left Column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* Dispute Trend & Risk Analysis */}
            <DisputeTrendRiskAnalysis
              trends={mockDisputeTrends}
            />

            {/* Disputes Table */}
            <DisputesTable
              disputes={filteredDisputes}
              onRowClick={handleDisputeClick}
              onExport={handleExport}
            />
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* Resolution Quality & Systemic Insights */}
            <ResolutionQualitySystemicInsights
              insights={mockDisputeInsights}
              avgResolutionTime={mockDisputeSummary.avgResolutionTime}
              onInsightClick={handleInsightClick}
            />
          </Stack>
        </Grid>
      </Grid>

      {/* Detail Drawer */}
      <DisputeDetailDrawer
        dispute={selectedDispute}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onApproveAgentClaim={handleApproveAgentClaim}
        onApproveUserClaim={handleApproveUserClaim}
        onSplitResolution={handleSplitResolution}
        onAdjustPayout={handleAdjustPayout}
        onDismissDispute={handleDismissDispute}
        onEscalateToCompliance={handleEscalateToCompliance}
      />

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
    </PageContainer>
  );
}
