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
  Shield,
  Ban,
  CheckCircle
} from 'lucide-react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import FraudRiskSummaryCards from './components/FraudRiskSummaryCards';
import type { 
  FraudCase, 
  FraudRiskSummary, 
  FraudCheckAnalytics, 
  FraudCaseFilters,
  FraudSignalType,
  RiskLevel,
  FraudCaseStatus,
  InvestigationPriority
} from './types';
import { 
  mockFraudCases, 
  mockFraudRiskSummary, 
  mockFraudCheckAnalytics 
} from './mockData';

const FraudChecksPage: React.FC = () => {
  // State management
  const [fraudCases, setFraudCases] = useState<FraudCase[]>(mockFraudCases);
  const [summary, setSummary] = useState<FraudRiskSummary>(mockFraudRiskSummary);
  const [analytics, setAnalytics] = useState<FraudCheckAnalytics>(mockFraudCheckAnalytics);
  const [filters, setFilters] = useState<FraudCaseFilters>({
    riskLevel: '',
    signalType: '',
    status: '',
    priority: '',
    city: '',
    zone: '',
    referrerType: '',
    dateRange: {
      start: '',
      end: ''
    },
    minRiskScore: undefined,
    maxRiskScore: undefined,
    hasEnforcementActions: false,
    hasAppeals: false,
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
    ...fraudCases.map(c => c.referrerCity),
    ...fraudCases.map(c => c.invitedUserCity).filter(Boolean)
  ]));
  const zones = Array.from(new Set([
    ...fraudCases.map(c => c.referrerZone),
    ...fraudCases.map(c => c.invitedUserZone).filter(Boolean)
  ]));

  // Filter fraud cases
  const filteredCases = fraudCases.filter(case_ => {
    if (filters.riskLevel && case_.riskScore < (filters.riskLevel === 'low' ? 25 : filters.riskLevel === 'medium' ? 50 : filters.riskLevel === 'high' ? 75 : 90)) return false;
    if (filters.riskLevel && case_.riskScore >= (filters.riskLevel === 'low' ? 25 : filters.riskLevel === 'medium' ? 50 : filters.riskLevel === 'high' ? 75 : 90)) return false;
    if (filters.signalType && !case_.primarySignals.some(s => s.type === filters.signalType)) return false;
    if (filters.status && case_.status !== filters.status) return false;
    if (filters.priority && case_.priority !== filters.priority) return false;
    if (filters.city && case_.referrerCity !== filters.city && case_.invitedUserCity !== filters.city) return false;
    if (filters.zone && case_.referrerZone !== filters.zone && case_.invitedUserZone !== filters.zone) return false;
    if (filters.referrerType && case_.referrerType !== filters.referrerType) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        case_.referrerName.toLowerCase().includes(searchLower) ||
        case_.invitedUserName?.toLowerCase().includes(searchLower) ||
        case_.referralCode?.toLowerCase().includes(searchLower) ||
        case_.id.toLowerCase().includes(searchLower)
      );
    }
    if (filters.minRiskScore && case_.riskScore < filters.minRiskScore) return false;
    if (filters.maxRiskScore && case_.riskScore > filters.maxRiskScore) return false;
    if (filters.hasEnforcementActions && case_.enforcementActions.length === 0) return false;
    if (filters.hasAppeals && case_.appeals.length === 0) return false;
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
        message: 'Fraud checks data refreshed',
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
      message: 'Exporting fraud cases data...',
      severity: 'info'
    });
    // Implement export logic
  };

  const handleExportAudit = () => {
    setNotification({
      open: true,
      message: 'Exporting audit trail...',
      severity: 'info'
    });
    // Implement audit export logic
  };

  const handleFilterChange = (key: keyof FraudCaseFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      riskLevel: '',
      signalType: '',
      status: '',
      priority: '',
      city: '',
      zone: '',
      referrerType: '',
      dateRange: {
        start: '',
        end: ''
      },
      minRiskScore: undefined,
      maxRiskScore: undefined,
      hasEnforcementActions: false,
      hasAppeals: false,
      search: ''
    });
    setSelectedMetric(null);
  };

  const handleCardClick = (metricType: string) => {
    setSelectedMetric(metricType);
    
    // Apply filter based on card clicked
    switch (metricType) {
      case 'flagged_referrals':
        // No specific filter needed for total
        break;
      case 'high_risk_cases':
        handleFilterChange('riskLevel', 'high');
        break;
      case 'confirmed_fraud':
        handleFilterChange('status', 'confirmed_fraud');
        break;
      case 'cleared_cases':
        handleFilterChange('status', 'cleared');
        break;
      case 'avg_review_time':
        // Sort by review time (would need sorting logic)
        break;
      case 'rewards_protected':
        handleFilterChange('hasEnforcementActions', true);
        break;
      default:
        break;
    }
  };

  const handleViewCase = (caseId: string) => {
    setNotification({
      open: true,
      message: `Viewing fraud case ${caseId} details`,
      severity: 'info'
    });
    // Implement view logic
  };

  const handleEnforcementAction = (caseId: string, action: string) => {
    setNotification({
      open: true,
      message: `Applying enforcement action: ${action} to case ${caseId}`,
      severity: 'warning'
    });
    // Implement enforcement logic
  };

  return (
    <PageContainer title="Fraud Checks" description="Referral abuse detection & enforcement">
      <Breadcrumb title="Fraud Checks" subtitle="Referral abuse detection & enforcement" />
      
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Fraud Checks
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Referral abuse detection & enforcement
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              startIcon={<Plus />}
              onClick={() => setNotification({
                open: true,
                message: 'Manual fraud case creation feature coming soon',
                severity: 'info'
              })}
            >
              Create Case
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
              placeholder="Search cases..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: <Search size={16} style={{ marginRight: 8 }} />
              }}
            />
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
              <InputLabel>Fraud Signal</InputLabel>
              <Select
                value={filters.signalType}
                label="Fraud Signal"
                onChange={(e) => handleFilterChange('signalType', e.target.value)}
              >
                <MenuItem value="">All Signals</MenuItem>
                <MenuItem value="same_device_ip">Same Device/IP</MenuItem>
                <MenuItem value="geo_mismatch">Geo Mismatch</MenuItem>
                <MenuItem value="rapid_referral_chain">Rapid Referral Chain</MenuItem>
                <MenuItem value="repeated_patterns">Repeated Patterns</MenuItem>
                <MenuItem value="weight_anomaly">Weight Anomaly</MenuItem>
                <MenuItem value="circular_referral">Circular Referral</MenuItem>
                <MenuItem value="recycled_rewards">Recycled Rewards</MenuItem>
                <MenuItem value="timing_anomaly">Timing Anomaly</MenuItem>
                <MenuItem value="location_spoofing">Location Spoofing</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="under_review">Under Review</MenuItem>
                <MenuItem value="cleared">Cleared</MenuItem>
                <MenuItem value="confirmed_fraud">Confirmed Fraud</MenuItem>
                <MenuItem value="escalated">Escalated</MenuItem>
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
                  checked={filters.hasEnforcementActions}
                  onChange={(e) => handleFilterChange('hasEnforcementActions', e.target.checked)}
                />
              }
              label="Actions"
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
            onClick={handleExportAudit}
            startIcon={<Shield />}
          >
            Export Audit
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

      {/* Fraud Risk Summary Cards */}
      <FraudRiskSummaryCards 
        summary={summary} 
        onCardClick={handleCardClick}
      />

      {/* Results Summary */}
      <Alert severity={summary.highRiskCases > 0 ? 'warning' : 'success'} sx={{ mt: 3 }}>
        <Typography variant="body2" fontWeight="600" mb={1}>
          Fraud Detection Summary
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body2">
            • Showing {filteredCases.length} of {fraudCases.length} fraud cases
          </Typography>
          <Typography variant="body2">
            • {summary.highRiskCases} high-risk cases require immediate attention
          </Typography>
          <Typography variant="body2">
            • ₦{summary.rewardsProtected.toLocaleString()} in rewards protected from fraud
          </Typography>
          <Typography variant="body2">
            • {summary.fraudRate.toFixed(1)}% fraud rate indicates {summary.fraudRate <= 2 ? 'healthy' : summary.fraudRate <= 5 ? 'moderate' : 'high'} risk level
          </Typography>
          <Typography variant="body2">
            • {summary.detectionAccuracy.toFixed(1)}% detection accuracy shows {summary.detectionAccuracy >= 85 ? 'excellent' : summary.detectionAccuracy >= 75 ? 'good' : 'needs improvement'} system performance
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

export default FraudChecksPage;
