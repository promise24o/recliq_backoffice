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
import AuditLogSummaryCards from './components/AuditLogSummaryCards';
import AuditLogsTable from './components/AuditLogsTable';
import AuditLogDetailDrawer from './components/AuditLogDetailDrawer';
import HighRiskAnomalyInsightsPanel from './components/HighRiskAnomalyInsightsPanel';
import type { AuditLog } from './types';
import {
  mockAuditLogs,
  mockAuditLogSummary,
  mockHighRiskTrendData,
  mockAdminActivityData,
  mockOffHoursActivity,
  mockOverridePatterns,
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
    title: 'Audit Logs',
  },
];

const AuditLogsPage: React.FC = () => {
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
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [logDrawerOpen, setLogDrawerOpen] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotification({
        open: true,
        message: 'Audit logs refreshed',
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
      message: 'Exporting audit logs for compliance...',
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

  const handleViewLog = (logId: string) => {
    const log = mockAuditLogs.find(l => l.id === logId);
    if (log) {
      setSelectedLog(log);
      setLogDrawerOpen(true);
    }
  };

  const handleNotificationClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <PageContainer title="Audit Logs" description="Immutable system activity and decision records">
      <Breadcrumb title="Audit Logs" subtitle="Immutable system activity and decision records" />

      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="600" mb={1}>
              Audit Logs
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Immutable system activity and decision records
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              startIcon={<Download size={16} />}
              onClick={handleExport}
            >
              Export (Legal)
            </Button>

            <IconButton onClick={handleRefresh} disabled={loading}>
              <RefreshCw size={20} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ mb: 3 }}>
        <AuditLogSummaryCards
          summary={mockAuditLogSummary}
          onCardClick={handleCardClick}
          selectedMetric={selectedMetric}
        />
      </Box>

      {/* Audit Logs Table */}
      <Box sx={{ mb: 3 }}>
        <AuditLogsTable
          logs={mockAuditLogs}
          onViewLog={handleViewLog}
        />
      </Box>

      {/* High-Risk & Anomaly Insights */}
      <Box sx={{ mb: 3 }}>
        <HighRiskAnomalyInsightsPanel
          highRiskTrend={mockHighRiskTrendData}
          adminActivity={mockAdminActivityData}
          offHoursActivity={mockOffHoursActivity}
          overridePatterns={mockOverridePatterns}
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

      {/* Audit Log Detail Drawer */}
      <AuditLogDetailDrawer
        open={logDrawerOpen}
        onClose={() => {
          setLogDrawerOpen(false);
          setSelectedLog(null);
        }}
        log={selectedLog}
      />
    </PageContainer>
  );
};

export default AuditLogsPage;
