'use client'
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Stack,
  Chip,
  Divider,
  Button,
  IconButton,
  Grid,
  LinearProgress
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import {
  IconX,
  IconCheck,
  IconClock,
  IconX as IconFailed,
  IconRefresh,
  IconDownload,
  IconAlertTriangle,
  IconNotes,
  IconFlag,
  IconBuildingBank,
  IconWallet,
  IconUsers,
  IconBriefcase,
  IconCurrencyNaira,
  IconCalendar
} from '@tabler/icons-react';

export interface BalanceData {
  id: string;
  source: string;
  provider: string;
  balance: number;
  status: 'reconciled' | 'pending' | 'error';
  lastUpdated: string;
  variance: number;
  internalLedgerBalance: number;
  providerReportedBalance: number;
  pendingTransactions: number;
  walletType?: string;
  purpose?: string;
}

interface BalanceDetailDrawerProps {
  balance: BalanceData | null;
  open: boolean;
  onClose: () => void;
}

const BalanceDetailDrawer: React.FC<BalanceDetailDrawerProps> = ({
  balance,
  open,
  onClose
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reconciled': return 'success';
      case 'pending': return 'warning';
      case 'error': return 'error';
      default: return 'grey';
    }
  };

  const getTimelineDotColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'grey';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reconciled': return <IconCheck size={16} />;
      case 'pending': return <IconClock size={16} />;
      case 'error': return <IconFailed size={16} />;
      default: return <div style={{ width: 16 }} />;
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'User Wallets': return <IconUsers size={20} />;
      case 'Agent Wallets': return <IconBriefcase size={20} />;
      case 'Enterprise Escrow': return <IconBuildingBank size={20} />;
      case 'Subscription Balances': return <IconWallet size={20} />;
      default: return <IconWallet size={20} />;
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance === 0) return 'success';
    if (variance > 0) return 'warning';
    return 'error';
  };

  const getVarianceDescription = (variance: number) => {
    if (variance === 0) return 'Balances are reconciled';
    if (variance > 0) return `Provider reports ₦${Math.abs(variance).toLocaleString()} more than internal ledger`;
    return `Provider reports ₦${Math.abs(variance).toLocaleString()} less than internal ledger`;
  };

  if (!open || !balance) return null;

  // Mock reconciliation timeline
  const getReconciliationEvents = () => {
    const baseEvents = [
      {
        title: 'Balance Initialized',
        time: '2024-01-15 09:00:00',
        status: 'success',
        description: 'Initial balance recorded'
      }
    ];

    if (balance.status === 'reconciled') {
      return [
        ...baseEvents,
        {
          title: 'Provider Sync',
          time: '2024-01-15 14:00:00',
          status: 'success',
          description: 'Successfully synced with provider'
        },
        {
          title: 'Reconciliation Complete',
          time: balance.lastUpdated,
          status: 'success',
          description: 'Internal ledger matches provider balance'
        }
      ];
    }

    if (balance.status === 'pending') {
      return [
        ...baseEvents,
        {
          title: 'Provider Sync',
          time: '2024-01-15 14:00:00',
          status: 'success',
          description: 'Successfully synced with provider'
        },
        {
          title: 'Variance Detected',
          time: balance.lastUpdated,
          status: 'warning',
          description: getVarianceDescription(balance.variance)
        }
      ];
    }

    if (balance.status === 'error') {
      return [
        ...baseEvents,
        {
          title: 'Provider Sync Failed',
          time: '2024-01-15 14:00:00',
          status: 'error',
          description: 'Unable to sync with provider'
        },
        {
          title: 'Reconciliation Failed',
          time: balance.lastUpdated,
          status: 'error',
          description: getVarianceDescription(balance.variance)
        }
      ];
    }

    return baseEvents;
  };

  const reconciliationEvents = getReconciliationEvents();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 500, md: 600 },
          p: 0,
        }
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: 'grey.50'
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Balance Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {balance.source} - {balance.provider}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <IconX size={20} />
          </IconButton>
        </Stack>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
        <Stack spacing={3}>
          {/* Status */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Status
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                icon={getStatusIcon(balance.status)}
                label={balance.status.charAt(0).toUpperCase() + balance.status.slice(1)}
                color={getStatusColor(balance.status) as any}
                variant="outlined"
              />
              {balance.variance !== 0 && (
                <Chip
                  icon={<IconAlertTriangle size={16} />}
                  label="Requires Attention"
                  color="warning"
                  variant="outlined"
                />
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Balance Information */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Balance Information
            </Typography>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Current Balance
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="primary.main">
                      ₦{balance.balance.toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Last Updated
                    </Typography>
                    <Typography variant="body2" fontFamily="monospace">
                      {balance.lastUpdated}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Pending Transactions
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {balance.pendingTransactions}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Variance
                    </Typography>
                    <Typography 
                      variant="body2" 
                      fontWeight={600}
                      color={getVarianceColor(balance.variance) + '.main' as any}
                    >
                      {balance.variance === 0 ? '₦0' : `${balance.variance > 0 ? '+' : ''}₦${Math.abs(balance.variance).toLocaleString()}`}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Balance Comparison */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Balance Comparison
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Internal Ledger Balance
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  ₦{balance.internalLedgerBalance.toLocaleString()}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Provider Reported Balance
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  ₦{balance.providerReportedBalance.toLocaleString()}
                </Typography>
              </Stack>
              {balance.variance !== 0 && (
                <Box sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
                  <Typography variant="body2" color="warning.dark">
                    {getVarianceDescription(balance.variance)}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Source Information */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Source Information
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                {getSourceIcon(balance.source)}
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {balance.source}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {balance.walletType && `Type: ${balance.walletType}`}
                    {balance.walletType && balance.purpose && ' • '}
                    {balance.purpose && `Purpose: ${balance.purpose}`}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconBuildingBank size={16} />
                <Typography variant="body2" color="text.secondary">
                  Provider: {balance.provider}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Reconciliation Timeline */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Reconciliation Timeline
            </Typography>
            <Timeline>
              {reconciliationEvents.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color={getTimelineDotColor(event.status) as any}>
                      {event.status === 'success' && <IconCheck size={16} />}
                      {event.status === 'error' && <IconFailed size={16} />}
                      {event.status === 'warning' && <IconAlertTriangle size={16} />}
                    </TimelineDot>
                    {index < reconciliationEvents.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="body2" fontWeight={600}>
                      {event.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {event.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>

          <Divider />

          {/* Actions */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Actions
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<IconRefresh size={16} />}
                  size="small"
                  disabled={balance.status === 'reconciled'}
                >
                  Trigger Reconciliation
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconDownload size={16} />}
                  size="small"
                >
                  Download Report
                </Button>
              </Stack>
              
              {balance.variance !== 0 && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<IconFlag size={16} />}
                    size="small"
                    color="warning"
                  >
                    Flag Discrepancy
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IconAlertTriangle size={16} />}
                    size="small"
                    color="error"
                  >
                    Contact Support
                  </Button>
                </Stack>
              )}
              
              <Button
                variant="text"
                startIcon={<IconNotes size={16} />}
                size="small"
                sx={{ justifyContent: 'flex-start' }}
              >
                Add Internal Note
              </Button>
              
              <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                ⚠️ Read-only (except Finance Admin)
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default BalanceDetailDrawer;
