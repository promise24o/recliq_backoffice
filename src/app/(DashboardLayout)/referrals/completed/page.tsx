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
  CheckCircle,
  DollarSign,
  Award
} from 'lucide-react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import DashboardCard from '@/app/components/shared/DashboardCard';
import CompletionSummaryCards from './components/CompletionSummaryCards';
import type { 
  CompletedReferral, 
  CompletionSummary, 
  ReferralCompletionAnalytics, 
  CompletedReferralFilters,
  ReferrerType,
  FirstActionType,
  RewardType,
  RewardStatus
} from './types';
import { 
  mockCompletedReferrals, 
  mockCompletionSummary, 
  mockReferralCompletionAnalytics 
} from './mockData';

const CompletedReferralsPage: React.FC = () => {
  // State management
  const [completedReferrals, setCompletedReferrals] = useState<CompletedReferral[]>(mockCompletedReferrals);
  const [summary, setSummary] = useState<CompletionSummary>(mockCompletionSummary);
  const [analytics, setAnalytics] = useState<ReferralCompletionAnalytics>(mockReferralCompletionAnalytics);
  const [filters, setFilters] = useState<CompletedReferralFilters>({
    dateRange: {
      start: '',
      end: ''
    },
    city: '',
    zone: '',
    referrerType: '',
    firstActionType: '',
    rewardType: '',
    rewardStatus: '',
    minTimeToCompletion: undefined,
    maxTimeToCompletion: undefined,
    minRewardAmount: undefined,
    maxRewardAmount: undefined,
    hasAnomalies: false,
    flaggedForReview: false,
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
    ...completedReferrals.map(r => r.referrerCity),
    ...completedReferrals.map(r => r.invitedUserCity)
  ]));
  const zones = Array.from(new Set([
    ...completedReferrals.map(r => r.referrerZone),
    ...completedReferrals.map(r => r.invitedUserZone)
  ]));

  // Filter completed referrals
  const filteredReferrals = completedReferrals.filter(referral => {
    if (filters.city && referral.referrerCity !== filters.city && referral.invitedUserCity !== filters.city) return false;
    if (filters.zone && referral.referrerZone !== filters.zone && referral.invitedUserZone !== filters.zone) return false;
    if (filters.referrerType && referral.referrerType !== filters.referrerType) return false;
    if (filters.firstActionType && referral.firstActionType !== filters.firstActionType) return false;
    if (filters.rewardType && referral.rewardType !== filters.rewardType) return false;
    if (filters.rewardStatus && referral.rewardStatus !== filters.rewardStatus) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        referral.referrerName.toLowerCase().includes(searchLower) ||
        referral.invitedUserName.toLowerCase().includes(searchLower) ||
        referral.referralCode.toLowerCase().includes(searchLower) ||
        referral.id.toLowerCase().includes(searchLower)
      );
    }
    if (filters.minTimeToCompletion && referral.timeToCompletion < filters.minTimeToCompletion) return false;
    if (filters.maxTimeToCompletion && referral.timeToCompletion > filters.maxTimeToCompletion) return false;
    if (filters.minRewardAmount && referral.rewardAmount < filters.minRewardAmount) return false;
    if (filters.maxRewardAmount && referral.rewardAmount > filters.maxRewardAmount) return false;
    if (filters.hasAnomalies && referral.anomalies.length === 0) return false;
    if (filters.flaggedForReview && !referral.flaggedForReview) return false;
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
        message: 'Completed referrals data refreshed',
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
      message: 'Exporting completed referrals data...',
      severity: 'info'
    });
    // Implement export logic
  };

  const handleExportFinance = () => {
    setNotification({
      open: true,
      message: 'Exporting finance data...',
      severity: 'info'
    });
    // Implement finance export logic
  };

  const handleFilterChange = (key: keyof CompletedReferralFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      dateRange: {
        start: '',
        end: ''
      },
      city: '',
      zone: '',
      referrerType: '',
      firstActionType: '',
      rewardType: '',
      rewardStatus: '',
      minTimeToCompletion: undefined,
      maxTimeToCompletion: undefined,
      minRewardAmount: undefined,
      maxRewardAmount: undefined,
      hasAnomalies: false,
      flaggedForReview: false,
      search: ''
    });
    setSelectedMetric(null);
  };

  const handleCardClick = (metricType: string) => {
    setSelectedMetric(metricType);
    
    // Apply filter based on card clicked
    switch (metricType) {
      case 'total_completed':
        // No specific filter needed for total
        break;
      case 'first_actions':
        // Filter by referrals with first actions (all should have)
        break;
      case 'total_weight':
        // Sort by weight (would need sorting logic)
        break;
      case 'total_rewards':
        handleFilterChange('rewardStatus', 'issued');
        break;
      case 'top_referrers':
        // Filter by top performers (would need complex logic)
        break;
      case 'avg_time':
        handleFilterChange('maxTimeToCompletion', 5);
        break;
      default:
        break;
    }
  };

  const handleViewReferral = (referralId: string) => {
    setNotification({
      open: true,
      message: `Viewing completed referral ${referralId} details`,
      severity: 'info'
    });
    // Implement view logic
  };

  const handleExportReceipt = (referralId: string) => {
    setNotification({
      open: true,
      message: `Exporting receipt for referral ${referralId}`,
      severity: 'info'
    });
    // Implement receipt export logic
  };

  return (
    <PageContainer title="Completed Referrals" description="Referrals that resulted in verified recycling activity">
      <Breadcrumb title="Completed Referrals" subtitle="Referrals that resulted in verified recycling activity" />
      
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Completed Referrals
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Referrals that resulted in verified recycling activity and earned rewards
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

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Action Type</InputLabel>
              <Select
                value={filters.firstActionType}
                label="Action Type"
                onChange={(e) => handleFilterChange('firstActionType', e.target.value)}
              >
                <MenuItem value="">All Actions</MenuItem>
                <MenuItem value="pickup">Pickup</MenuItem>
                <MenuItem value="dropoff">Dropoff</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Reward Type</InputLabel>
              <Select
                value={filters.rewardType}
                label="Reward Type"
                onChange={(e) => handleFilterChange('rewardType', e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="points">Points</MenuItem>
                <MenuItem value="bonus">Bonus</MenuItem>
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="perk">Perk</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={filters.hasAnomalies}
                  onChange={(e) => handleFilterChange('hasAnomalies', e.target.checked)}
                />
              }
              label="Anomalies"
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

          <Button
            variant="outlined"
            onClick={handleExportFinance}
            startIcon={<DollarSign />}
          >
            Export Finance
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

      {/* Completion Summary Cards */}
      <CompletionSummaryCards 
        summary={summary} 
        onCardClick={handleCardClick}
      />

      {/* Results Summary */}
      <Alert severity="success" sx={{ mt: 3 }}>
        <Typography variant="body2" fontWeight="600" mb={1}>
          Success Summary
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">
            • Showing {filteredReferrals.length} of {completedReferrals.length} completed referrals
          </Typography>
          <Typography variant="body2">
            • {summary.totalWeightRecycled.toFixed(1)} kg recycled through referred users
          </Typography>
          <Typography variant="body2">
            • ₦{summary.totalRevenueGenerated.toLocaleString()} revenue generated from referrals
          </Typography>
          <Typography variant="body2">
            • {summary.overallROI.toFixed(0)}% ROI indicates {summary.overallROI >= 150 ? 'excellent' : summary.overallROI >= 100 ? 'good' : 'needs improvement'} program performance
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

export default CompletedReferralsPage;
