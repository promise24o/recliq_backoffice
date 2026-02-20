'use client';

import React, { useState } from 'react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  RefreshCw,
  Download,
} from 'lucide-react';
import FraudSummaryCards from './components/FraudSummaryCards';
import FraudSignalAnalysisCharts from './components/FraudSignalAnalysisCharts';
import FraudFlagsTable from './components/FraudFlagsTable';
import FraudCaseDetailDrawer from './components/FraudCaseDetailDrawer';
import SystemicFraudInsightsPanel from './components/SystemicFraudInsightsPanel';
import type { FraudFlag } from './types';
import {
  mockFraudFlags,
  mockFraudSummary,
  mockFraudTrendData,
  mockFraudTypeDistribution,
  mockSeverityDistribution,
  mockFraudControlMetrics,
  mockRepeatOffenders,
} from './mockData';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/risk',
    title: 'Risk & Compliance',
  },
  {
    title: 'Fraud Flags',
  },
];

const FraudFlagsPage: React.FC = () => {
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
  const [selectedFlag, setSelectedFlag] = useState<FraudFlag | null>(null);
  const [flagDrawerOpen, setFlagDrawerOpen] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotification({
        open: true,
        message: 'Fraud flags data refreshed',
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

  const handleExport = () => {
    setNotification({
      open: true,
      message: 'Exporting fraud flags data for audit...',
      severity: 'info'
    });
  };

  const handleCardClick = (metricType: string) => {
    setSelectedMetric(prev => prev === metricType ? null : metricType);
    setNotification({
      open: true,
      message: `Filtering by: ${metricType.replace(/_/g, ' ')}`,
      severity: 'info'
    });
  };

  const handleViewFlag = (flagId: string) => {
    const flag = mockFraudFlags.find(f => f.id === flagId);
    if (flag) {
      setSelectedFlag(flag);
      setFlagDrawerOpen(true);
    }
  };

  const handleNotificationClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <PageContainer title="Fraud Flags" description="Platform-wide fraud detection & enforcement">
      <Breadcrumb title="Fraud Flags" subtitle="Platform-wide fraud detection & enforcement" />

      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Fraud Flags
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Platform-wide fraud detection & enforcement
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              startIcon={<Download size={16} />}
              onClick={handleExport}
            >
              Export (Audit)
            </Button>

            <IconButton onClick={handleRefresh} disabled={loading}>
              <RefreshCw size={20} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ mb: 3 }}>
        <FraudSummaryCards
          summary={mockFraudSummary}
          onCardClick={handleCardClick}
          selectedMetric={selectedMetric}
        />
      </Box>

      {/* Signal & Severity Analysis */}
      <Box sx={{ mb: 3 }}>
        <FraudSignalAnalysisCharts
          trendData={mockFraudTrendData}
          typeDistribution={mockFraudTypeDistribution}
          severityDistribution={mockSeverityDistribution}
        />
      </Box>

      {/* Fraud Flags Table */}
      <Box sx={{ mb: 3 }}>
        <FraudFlagsTable
          flags={mockFraudFlags}
          onViewFlag={handleViewFlag}
        />
      </Box>

      {/* Systemic Fraud Insights */}
      <Box sx={{ mb: 3 }}>
        <SystemicFraudInsightsPanel
          metrics={mockFraudControlMetrics}
          repeatOffenders={mockRepeatOffenders}
        />
      </Box>

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {/* Fraud Case Detail Drawer */}
      <FraudCaseDetailDrawer
        open={flagDrawerOpen}
        onClose={() => {
          setFlagDrawerOpen(false);
          setSelectedFlag(null);
        }}
        flag={selectedFlag}
      />
    </PageContainer>
  );
};

export default FraudFlagsPage;
