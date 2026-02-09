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
  DatePicker,
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
  TrendingUp,
  Calendar,
  MapPin,
  Target
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

// Import components
import ReferralSummaryCards from './components/ReferralSummaryCards';
import ReferralFunnelConversionAnalysis from './components/ReferralFunnelConversionAnalysis';
import ReferralPerformanceTable from './components/ReferralPerformanceTable';
import ReferralDetailDrawer from './components/ReferralDetailDrawer';
import ReferralQualityFraudInsights from './components/ReferralQualityFraudInsights';

// Import data and types
import { 
  mockReferrals, 
  mockReferralSummary, 
  mockReferralFunnel, 
  mockReferralPerformance, 
  mockReferralQualityInsights, 
  mockReferralAnalytics 
} from './mockData';
import { Referral, ReferralStatus, ReferrerType } from './types';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';

export default function ReferralOverviewPage() {
  // State management
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals);
  const [referralSummary, setReferralSummary] = useState(mockReferralSummary);
  const [referralFunnel, setReferralFunnel] = useState(mockReferralFunnel);
  const [referralPerformance, setReferralPerformance] = useState(mockReferralPerformance);
  const [qualityInsights, setQualityInsights] = useState(mockReferralQualityInsights);
  const [analytics, setAnalytics] = useState(mockReferralAnalytics);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    referrerType: '',
    city: '',
    zone: '',
    dateRange: {
      start: '',
      end: ''
    },
    hasAbuseFlags: false,
    search: ''
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
  const handleReferralClick = (referral: Referral) => {
    setSelectedReferral(referral);
    setDrawerOpen(true);
  };

  const handleCardClick = (metricType: string) => {
    setNotification({
      open: true,
      message: `Viewing details for: ${metricType}`,
      severity: 'info'
    });
  };

  const handleExport = (referralsToExport: Referral[]) => {
    setNotification({
      open: true,
      message: `Exporting ${referralsToExport.length} referrals...`,
      severity: 'success'
    });
  };

  const handleApproveReward = (referral: Referral) => {
    setReferrals(prev => prev.map(r => 
      r.id === referral.id ? { 
        ...r, 
        status: 'rewarded' as ReferralStatus,
        rewardedAt: new Date().toISOString(),
        auditTrail: [
          ...r.auditTrail,
          {
            id: `AUDIT${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'reward_issued' as any,
            performedBy: 'CURRENT_USER',
            details: 'Reward approved and issued'
          }
        ]
      } : r
    ));
    setNotification({
      open: true,
      message: `Reward approved for: ${referral.invitedUserName || referral.invitedUserEmail}`,
      severity: 'success'
    });
  };

  const handleRevokeReward = (referral: Referral) => {
    setReferrals(prev => prev.map(r => 
      r.id === referral.id ? { 
        ...r, 
        status: 'revoked' as ReferralStatus,
        revokedAt: new Date().toISOString(),
        auditTrail: [
          ...r.auditTrail,
          {
            id: `AUDIT${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'reward_revoked' as any,
            performedBy: 'CURRENT_USER',
            details: 'Reward revoked due to policy violation'
          }
        ]
      } : r
    ));
    setNotification({
      open: true,
      message: `Reward revoked for: ${referral.invitedUserName || referral.invitedUserEmail}`,
      severity: 'warning'
    });
  };

  const handleFlagAbuse = (referral: Referral) => {
    setReferrals(prev => prev.map(r => 
      r.id === referral.id ? { 
        ...r, 
        status: 'flagged' as ReferralStatus,
        auditTrail: [
          ...r.auditTrail,
          {
            id: `AUDIT${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'abuse_flagged' as any,
            performedBy: 'CURRENT_USER',
            details: 'Referral flagged for potential abuse'
          }
        ]
      } : r
    ));
    setNotification({
      open: true,
      message: `Referral flagged: ${referral.invitedUserName || referral.invitedUserEmail}`,
      severity: 'warning'
    });
  };

  const handleClearFlag = (referral: Referral) => {
    setReferrals(prev => prev.map(r => 
      r.id === referral.id ? { 
        ...r, 
        status: 'activated' as ReferralStatus,
        abuseFlags: [],
        auditTrail: [
          ...r.auditTrail,
          {
            id: `AUDIT${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'status_changed' as any,
            performedBy: 'CURRENT_USER',
            details: 'Abuse flag cleared after review'
          }
        ]
      } : r
    ));
    setNotification({
      open: true,
      message: `Abuse flag cleared for: ${referral.invitedUserName || referral.invitedUserEmail}`,
      severity: 'success'
    });
  };

  const handleSaveReferral = (updatedReferral: Referral) => {
    setReferrals(prev => prev.map(r => 
      r.id === updatedReferral.id ? { 
        ...updatedReferral,
        lastModified: new Date().toISOString(),
        auditTrail: [
          ...updatedReferral.auditTrail,
          {
            id: `AUDIT${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: 'status_changed' as any,
            performedBy: 'CURRENT_USER',
            details: 'Referral details updated'
          }
        ]
      } : r
    ));
    setNotification({
      open: true,
      message: `Referral updated: ${updatedReferral.invitedUserName || updatedReferral.invitedUserEmail}`,
      severity: 'success'
    });
  };

  const handleRefresh = () => {
    setNotification({
      open: true,
      message: 'Referral data refreshed successfully',
      severity: 'success'
    });
  };

  // Filter referrals based on search and filters
  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = searchTerm === '' || 
      referral.referrerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referrerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (referral.invitedUserName && referral.invitedUserName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (referral.invitedUserEmail && referral.invitedUserEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      referral.referralCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === '' || referral.status === filters.status;
    const matchesReferrerType = filters.referrerType === '' || referral.referrerType === filters.referrerType;
    const matchesCity = filters.city === '' || referral.referrerCity === filters.city || (referral.invitedUserCity && referral.invitedUserCity === filters.city);
    const matchesZone = filters.zone === '' || referral.referrerZone === filters.zone || (referral.invitedUserZone && referral.invitedUserZone === filters.zone);
    const matchesAbuseFlags = !filters.hasAbuseFlags || (referral.abuseFlags && referral.abuseFlags.length > 0);

    return matchesSearch && matchesStatus && matchesReferrerType && matchesCity && matchesZone && matchesAbuseFlags;
  });

  // Get unique values for filters
  const statuses = Array.from(new Set(referrals.map(r => r.status)));
  const referrerTypes = Array.from(new Set(referrals.map(r => r.referrerType)));
  const cities = Array.from(new Set([...referrals.map(r => r.referrerCity), ...referrals.map(r => r.invitedUserCity).filter(Boolean)]));
  const zones = Array.from(new Set([...referrals.map(r => r.referrerZone), ...referrals.map(r => r.invitedUserZone).filter(Boolean)]));

  return (
    <PageContainer title="Referral Overview" description="Referral performance, conversion & quality">
      <Breadcrumb title="Referral Overview" subtitle="Referral performance, conversion & quality" />
      
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Referral Overview
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track referral effectiveness, detect low-quality or fraudulent referrals, and optimize referral incentives
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
            
            <IconButton onClick={handleRefresh}>
              <RefreshCw size={20} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Filters and Controls */}
      <Box sx={{ mb: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <TextField
              placeholder="Search referrals..."
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
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as ReferralStatus | '' }))}
                label="Status"
              >
                <MenuItem value="">All Status</MenuItem>
                {statuses.map(status => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Referrer Type</InputLabel>
              <Select
                value={filters.referrerType}
                onChange={(e) => setFilters(prev => ({ ...prev, referrerType: e.target.value as ReferrerType | '' }))}
                label="Referrer Type"
              >
                <MenuItem value="">All Types</MenuItem>
                {referrerTypes.map(type => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
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
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Zone</InputLabel>
              <Select
                value={filters.zone}
                onChange={(e) => setFilters(prev => ({ ...prev, zone: e.target.value }))}
                label="Zone"
              >
                <MenuItem value="">All Zones</MenuItem>
                {zones.map(zone => (
                  <MenuItem key={zone} value={zone}>
                    {zone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={filters.hasAbuseFlags}
                  onChange={(e) => setFilters(prev => ({ ...prev, hasAbuseFlags: e.target.checked }))}
                />
              }
              label="Has Abuse Flags"
            />

            <Box sx={{ flex: 1 }} />

            <IconButton onClick={() => handleExport(filteredReferrals)}>
              <Download size={20} />
            </IconButton>
          </Stack>
        </Paper>
      </Box>

      {/* Referral Summary Cards */}
      <ReferralSummaryCards
        summary={referralSummary}
        onCardClick={handleCardClick}
      />

      {/* Main Content Grid */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Left Column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* Referral Funnel & Conversion Analysis */}
            <ReferralFunnelConversionAnalysis
              funnel={referralFunnel}
              analytics={analytics}
              onExportAnalytics={() => setNotification({
                open: true,
                message: 'Analytics exported successfully',
                severity: 'success'
              })}
              onGenerateReport={() => setNotification({
                open: true,
                message: 'Generating referral performance report...',
                severity: 'info'
              })}
            />

            {/* Referral Performance Table */}
            <ReferralPerformanceTable
              referrals={filteredReferrals}
              onReferralClick={handleReferralClick}
              onExport={handleExport}
              onApproveReward={handleApproveReward}
              onRevokeReward={handleRevokeReward}
              onFlagAbuse={handleFlagAbuse}
              onClearFlag={handleClearFlag}
            />
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* Referral Quality & Fraud Insights */}
            <ReferralQualityFraudInsights
              insights={qualityInsights}
              onExportInsights={() => setNotification({
                open: true,
                message: 'Quality insights exported',
                severity: 'success'
              })}
              onGenerateReport={() => setNotification({
                open: true,
                message: 'Generating quality analysis report...',
                severity: 'info'
              })}
            />
          </Stack>
        </Grid>
      </Grid>

      {/* Referral Detail Drawer */}
      <ReferralDetailDrawer
        referral={selectedReferral}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveReferral}
        onApproveReward={handleApproveReward}
        onRevokeReward={handleRevokeReward}
        onFlagAbuse={handleFlagAbuse}
        onClearFlag={handleClearFlag}
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
