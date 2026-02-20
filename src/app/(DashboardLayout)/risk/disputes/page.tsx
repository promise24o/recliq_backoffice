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
  Shield,
} from 'lucide-react';
import RiskDisputeSummaryCards from './components/RiskDisputeSummaryCards';
import RiskSeverityTrendCharts from './components/RiskSeverityTrendCharts';
import RiskDisputesTable from './components/RiskDisputesTable';
import RiskDisputeDetailDrawer from './components/RiskDisputeDetailDrawer';
import SystemicRiskInsightsPanel from './components/SystemicRiskInsightsPanel';
import type { RiskDispute } from './types';
import {
  mockRiskDisputes,
  mockRiskDisputeSummary,
  mockSeverityTrendData,
  mockExposureTrendData,
  mockCategoryDistribution,
  mockSystemicRiskMetrics,
  mockRepeatRiskEntities,
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
    title: 'Disputes',
  },
];

const RiskDisputesPage: React.FC = () => {
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
  const [selectedDispute, setSelectedDispute] = useState<RiskDispute | null>(null);
  const [disputeDrawerOpen, setDisputeDrawerOpen] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotification({
        open: true,
        message: 'Risk disputes data refreshed',
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
      message: 'Exporting risk disputes data for audit...',
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

  const handleViewDispute = (disputeId: string) => {
    const dispute = mockRiskDisputes.find(d => d.id === disputeId);
    if (dispute) {
      setSelectedDispute(dispute);
      setDisputeDrawerOpen(true);
    }
  };

  const handleNotificationClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <PageContainer title="Risk Disputes" description="High-impact disputes requiring compliance oversight">
      <Breadcrumb title="Risk Disputes" subtitle="High-impact disputes requiring compliance oversight" />

      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Risk Disputes
            </Typography>
            <Typography variant="body1" color="text.secondary">
              High-impact disputes requiring compliance oversight
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
        <RiskDisputeSummaryCards
          summary={mockRiskDisputeSummary}
          onCardClick={handleCardClick}
          selectedMetric={selectedMetric}
        />
      </Box>

      {/* Severity & Trend Analysis */}
      <Box sx={{ mb: 3 }}>
        <RiskSeverityTrendCharts
          severityData={mockSeverityTrendData}
          exposureData={mockExposureTrendData}
          categoryData={mockCategoryDistribution}
        />
      </Box>

      {/* Risk Disputes Table */}
      <Box sx={{ mb: 3 }}>
        <RiskDisputesTable
          disputes={mockRiskDisputes}
          onViewDispute={handleViewDispute}
        />
      </Box>

      {/* Systemic Risk Insights */}
      <Box sx={{ mb: 3 }}>
        <SystemicRiskInsightsPanel
          metrics={mockSystemicRiskMetrics}
          repeatRiskEntities={mockRepeatRiskEntities}
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

      {/* Risk Dispute Detail Drawer */}
      <RiskDisputeDetailDrawer
        open={disputeDrawerOpen}
        onClose={() => {
          setDisputeDrawerOpen(false);
          setSelectedDispute(null);
        }}
        dispute={selectedDispute}
      />
    </PageContainer>
  );
};

export default RiskDisputesPage;
