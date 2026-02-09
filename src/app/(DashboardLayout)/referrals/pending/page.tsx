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
  Switch
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
  AlertTriangle,
  Clock
} from 'lucide-react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import PendingSummaryCards from './components/PendingSummaryCards';
import PendingReasonsDistribution from './components/PendingReasonsDistribution';
import type { 
  PendingReferral, 
  PendingReferralSummary, 
  PendingReferralAnalytics, 
  PendingReferralFilters,
  PendingReason,
  RiskLevel
} from './types';
import { 
  mockPendingReferrals, 
  mockPendingReferralSummary, 
  mockPendingReferralAnalytics 
} from './mockData';

const PendingReferralsPage: React.FC = () => {
  // State management
  const [pendingReferrals, setPendingReferrals] = useState<PendingReferral[]>(mockPendingReferrals);
  const [summary, setSummary] = useState<PendingReferralSummary>(mockPendingReferralSummary);
  const [analytics, setAnalytics] = useState<PendingReferralAnalytics>(mockPendingReferralAnalytics);
  const [filters, setFilters] = useState<PendingReferralFilters>({
    pendingReason: '',
    riskLevel: '',
    city: '',
    zone: '',
    referrerType: '',
    dateRange: {
      start: '',
      end: ''
    },
    daysPendingMin: undefined,
    daysPendingMax: undefined,
    hasInterventions: false,
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

  // Extract unique values for filters
  const cities = Array.from(new Set([
    ...pendingReferrals.map(r => r.referrerCity),
    ...pendingReferrals.map(r => r.invitedUserCity).filter(Boolean)
  ]));
  const zones = Array.from(new Set([
    ...pendingReferrals.map(r => r.referrerZone),
    ...pendingReferrals.map(r => r.invitedUserZone).filter(Boolean)
  ]));

  // Filter pending referrals
  const filteredReferrals = pendingReferrals.filter(referral => {
    if (filters.pendingReason && referral.pendingReason !== filters.pendingReason) return false;
    if (filters.riskLevel && referral.riskLevel !== filters.riskLevel) return false;
    if (filters.city && referral.referrerCity !== filters.city && referral.invitedUserCity !== filters.city) return false;
    if (filters.zone && referral.referrerZone !== filters.zone && referral.invitedUserZone !== filters.zone) return false;
    if (filters.referrerType && referral.referrerType !== filters.referrerType) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        referral.referrerName.toLowerCase().includes(searchLower) ||
        referral.invitedUserName?.toLowerCase().includes(searchLower) ||
        referral.referralCode.toLowerCase().includes(searchLower) ||
        referral.id.toLowerCase().includes(searchLower)
      );
    }
    if (filters.daysPendingMin && referral.daysPending < filters.daysPendingMin) return false;
    if (filters.daysPendingMax && referral.daysPending > filters.daysPendingMax) return false;
    if (filters.hasInterventions && referral.interventions.length === 0) return false;
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
        message: 'Pending referrals data refreshed',
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
      message: 'Exporting pending referrals data...',
      severity: 'info'
    });
    // Implement export logic
  };

  const handleExportAnalytics = () => {
    setNotification({
      open: true,
      message: 'Exporting analytics data...',
      severity: 'info'
    });
    // Implement analytics export
  };

  const handleGenerateReport = () => {
    setNotification({
      open: true,
      message: 'Generating comprehensive report...',
      severity: 'info'
    });
    // Implement report generation
  };

  const handleFilterChange = (key: keyof PendingReferralFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      pendingReason: '',
      riskLevel: '',
      city: '',
      zone: '',
      referrerType: '',
      dateRange: {
        start: '',
        end: ''
      },
      daysPendingMin: undefined,
      daysPendingMax: undefined,
      hasInterventions: false,
      search: ''
    });
    setSelectedMetric(null);
  };

  const handleCardClick = (metricType: string) => {
    setSelectedMetric(metricType);
    
    // Apply filter based on card clicked
    switch (metricType) {
      case 'awaiting_first_action':
        handleFilterChange('pendingReason', 'awaiting_first_action');
        break;
      case 'awaiting_verification':
        handleFilterChange('pendingReason', 'awaiting_verification');
        break;
      case 'awaiting_reward_approval':
        handleFilterChange('pendingReason', 'awaiting_reward_approval');
        break;
      case 'flagged_for_review':
        handleFilterChange('pendingReason', 'flagged_for_review');
        break;
      case 'stuck_over_7_days':
        handleFilterChange('daysPendingMin', 8);
        break;
      default:
        break;
    }
  };

  const handleViewReferral = (referralId: string) => {
    setNotification({
      open: true,
      message: `Viewing referral ${referralId} details`,
      severity: 'info'
    });
    // Implement view logic
  };

  const handleIntervention = (referralId: string, action: string) => {
    setNotification({
      open: true,
      message: `Applying intervention: ${action} to referral ${referralId}`,
      severity: 'info'
    });
    // Implement intervention logic
  };

  return (
    <PageContainer title="Pending Referrals" description="Referrals awaiting activation or reward eligibility">
      <Breadcrumb title="Pending Referrals" subtitle="Referrals awaiting activation or reward eligibility" />
      
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Pending Referrals
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Referrals awaiting activation or reward eligibility
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              startIcon={<Plus />}
              onClick={() => setNotification({
                open: true,
                message: 'Create referral campaign feature coming soon',
                severity: 'info'
              })}
            >
              Create Campaign
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
              placeholder="Search referrals..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: <Search size={16} style={{ marginRight: 8 }} />
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Pending Reason</InputLabel>
              <Select
                value={filters.pendingReason}
                label="Pending Reason"
                onChange={(e) => handleFilterChange('pendingReason', e.target.value)}
              >
                <MenuItem value="">All Reasons</MenuItem>
                <MenuItem value="awaiting_first_action">Awaiting First Action</MenuItem>
                <MenuItem value="awaiting_verification">Awaiting Verification</MenuItem>
                <MenuItem value="awaiting_reward_approval">Awaiting Reward Approval</MenuItem>
                <MenuItem value="flagged_for_review">Flagged for Review</MenuItem>
                <MenuItem value="dispute_open">Dispute Open</MenuItem>
                <MenuItem value="fraud_checks">Fraud Checks</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Risk Level</InputLabel>
              <Select
                value={filters.riskLevel}
                label="Risk Level"
                onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
              >
                <MenuItem value="">All Levels</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
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

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Referrer Type</InputLabel>
              <Select
                value={filters.referrerType}
                label="Referrer Type"
                onChange={(e) => handleFilterChange('referrerType', e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="agent">Agent</MenuItem>
                <MenuItem value="business">Business</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={filters.hasInterventions}
                  onChange={(e) => handleFilterChange('hasInterventions', e.target.checked)}
                />
              }
              label="Interventions"
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
            Export Data
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

      {/* Pending Summary Cards */}
      <PendingSummaryCards 
        summary={summary} 
        onCardClick={handleCardClick}
      />

      {/* Pending Reasons Distribution */}
      <PendingReasonsDistribution
        reasonDistribution={analytics.pendingReasonDistribution}
        timeHistogram={analytics.timeInPendingHistogram}
        onExportAnalytics={handleExportAnalytics}
        onGenerateReport={handleGenerateReport}
      />

      {/* Results Summary */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2" fontWeight="600" mb={1}>
          Results Summary
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">
            • Showing {filteredReferrals.length} of {pendingReferrals.length} pending referrals
          </Typography>
          <Typography variant="body2">
            • {filteredReferrals.filter(r => r.riskLevel === 'high' || r.riskLevel === 'critical').length} high-risk referrals require immediate attention
          </Typography>
          <Typography variant="body2">
            • {filteredReferrals.filter(r => r.daysPending > 7).length} referrals stuck over 7 days
          </Typography>
          <Typography variant="body2">
            • {filteredReferrals.filter(r => r.interventions.length > 0).length} referrals with intervention history
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
    </PageContainer>
  );
};

export default PendingReferralsPage;
