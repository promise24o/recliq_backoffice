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
  IconCurrencyNaira,
  IconBuildingBank,
  IconCreditCard,
  IconTruck,
  IconNotes as IconManual,
  IconCalendar,
  IconFlag,
  IconAdjustments
} from '@tabler/icons-react';

export interface TransactionData {
  id: string;
  txnId: string;
  source: 'paystack' | 'flutterwave' | 'bank' | 'manual';
  ledgerAmount: number;
  providerAmount: number;
  fee: number;
  variance: number;
  status: 'matched' | 'missing_provider' | 'missing_ledger' | 'amount_mismatch' | 'pending_settlement';
  internalReference: string;
  providerReference: string;
  initiatedAt: string;
  settledAt?: string;
}

interface TransactionReconciliationDrawerProps {
  transaction: TransactionData | null;
  open: boolean;
  onClose: () => void;
}

const TransactionReconciliationDrawer: React.FC<TransactionReconciliationDrawerProps> = ({
  transaction,
  open,
  onClose
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'matched': return 'success';
      case 'missing_provider': return 'warning';
      case 'missing_ledger': return 'error';
      case 'amount_mismatch': return 'error';
      case 'pending_settlement': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'matched': return <IconCheck size={16} />;
      case 'missing_provider': return <IconAlertTriangle size={16} />;
      case 'missing_ledger': return <IconFailed size={16} />;
      case 'amount_mismatch': return <IconFailed size={16} />;
      case 'pending_settlement': return <IconClock size={16} />;
      default: return <div style={{ width: 16 }} />;
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'paystack': return <IconBuildingBank size={20} />;
      case 'flutterwave': return <IconCreditCard size={20} />;
      case 'bank': return <IconTruck size={20} />;
      case 'manual': return <IconManual size={20} />;
      default: return <IconBuildingBank size={20} />;
    }
  };

  const getTimelineDotColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'grey';
    }
  };

  if (!open || !transaction) return null;

  // Mock timeline events
  const getTimelineEvents = () => {
    const baseEvents = [
      {
        title: 'Transaction Initiated',
        time: transaction.initiatedAt,
        status: 'info',
        description: `Transaction ${transaction.txnId} initiated via ${transaction.source}`
      }
    ];

    if (transaction.status === 'matched') {
      return [
        ...baseEvents,
        {
          title: 'Authorization Confirmed',
          time: transaction.initiatedAt,
          status: 'success',
          description: 'Payment authorization confirmed'
        },
        {
          title: 'Settlement Completed',
          time: transaction.settledAt || transaction.initiatedAt,
          status: 'success',
          description: `₦${transaction.providerAmount.toLocaleString()} settled successfully`
        },
        {
          title: 'Reconciliation Matched',
          time: transaction.settledAt || transaction.initiatedAt,
          status: 'success',
          description: 'Ledger and provider amounts matched perfectly'
        }
      ];
    }

    if (transaction.status === 'missing_provider') {
      return [
        ...baseEvents,
        {
          title: 'Authorization Confirmed',
          time: transaction.initiatedAt,
          status: 'success',
          description: 'Payment authorization confirmed'
        },
        {
          title: 'Provider Sync Issue',
          time: transaction.initiatedAt,
          status: 'error',
          description: 'Transaction not found in provider records'
        },
        {
          title: 'Reconciliation Failed',
          time: new Date().toISOString(),
          status: 'error',
          description: 'Ledger record exists but provider record missing'
        }
      ];
    }

    if (transaction.status === 'missing_ledger') {
      return [
        ...baseEvents,
        {
          title: 'Provider Settlement',
          time: transaction.settledAt || transaction.initiatedAt,
          status: 'success',
          description: `₦${transaction.providerAmount.toLocaleString()} settled by provider`
        },
        {
          title: 'Ledger Sync Issue',
          time: new Date().toISOString(),
          status: 'error',
          description: 'Provider record exists but ledger record missing'
        },
        {
          title: 'Reconciliation Failed',
          time: new Date().toISOString(),
          status: 'error',
          description: 'Provider record exists but ledger record missing'
        }
      ];
    }

    if (transaction.status === 'amount_mismatch') {
      return [
        ...baseEvents,
        {
          title: 'Authorization Confirmed',
          time: transaction.initiatedAt,
          status: 'success',
          description: 'Payment authorization confirmed'
        },
        {
          title: 'Settlement Completed',
          time: transaction.settledAt || transaction.initiatedAt,
          status: 'warning',
          description: `₦${transaction.providerAmount.toLocaleString()} settled (amount mismatch)`
        },
        {
          title: 'Reconciliation Failed',
          time: new Date().toISOString(),
          status: 'error',
          description: `Ledger (₦${transaction.ledgerAmount.toLocaleString()}) ≠ Provider (₦${transaction.providerAmount.toLocaleString()})`
        }
      ];
    }

    if (transaction.status === 'pending_settlement') {
      return [
        ...baseEvents,
        {
          title: 'Authorization Confirmed',
          time: transaction.initiatedAt,
          status: 'success',
          description: 'Payment authorization confirmed'
        },
        {
          title: 'Awaiting Settlement',
          time: new Date().toISOString(),
          status: 'info',
          description: 'Transaction awaiting provider settlement'
        }
      ];
    }

    return baseEvents;
  };

  const timelineEvents = getTimelineEvents();

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
              Transaction Reconciliation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {transaction.txnId}
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
              Reconciliation Status
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                icon={getStatusIcon(transaction.status)}
                label={transaction.status.replace('_', ' ').charAt(0).toUpperCase() + transaction.status.replace('_', ' ').slice(1)}
                color={getStatusColor(transaction.status) as any}
                variant="outlined"
              />
              {transaction.variance !== 0 && (
                <Chip
                  icon={<IconAlertTriangle size={16} />}
                  label={`Variance: ₦${Math.abs(transaction.variance).toLocaleString()}`}
                  color="warning"
                  variant="outlined"
                />
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Transaction Details */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Transaction Details
            </Typography>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Transaction ID
                    </Typography>
                    <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                      {transaction.txnId}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Source
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getSourceIcon(transaction.source)}
                      <Typography variant="body2" fontWeight={600}>
                        {transaction.source.charAt(0).toUpperCase() + transaction.source.slice(1)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Initiated At
                    </Typography>
                    <Typography variant="body2" fontFamily="monospace">
                      {transaction.initiatedAt}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Settled At
                    </Typography>
                    <Typography variant="body2" fontFamily="monospace">
                      {transaction.settledAt || 'Pending'}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Amount Comparison */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Amount Comparison
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Ledger Amount
                </Typography>
                <Typography variant="h6" fontWeight={600} color="primary.main">
                  ₦{transaction.ledgerAmount.toLocaleString()}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Provider Amount
                </Typography>
                <Typography variant="h6" fontWeight={600} color="success.main">
                  ₦{transaction.providerAmount.toLocaleString()}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Fee Charged
                </Typography>
                <Typography variant="h6" fontWeight={600} color="warning.main">
                  -₦{transaction.fee.toLocaleString()}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Variance
                </Typography>
                <Typography 
                  variant="h6" 
                  fontWeight={700}
                  color={transaction.variance === 0 ? 'success.main' : 'error.main'}
                >
                  {transaction.variance === 0 ? '₦0' : `${transaction.variance > 0 ? '+' : ''}₦${Math.abs(transaction.variance).toLocaleString()}`}
                </Typography>
              </Stack>
              {transaction.variance !== 0 && (
                <Box sx={{ p: 2, bgcolor: 'error.light', borderRadius: 2 }}>
                  <Typography variant="body2" color="error.dark">
                    {transaction.variance > 0 
                      ? `Provider reports ₦${transaction.variance.toLocaleString()} more than ledger`
                      : `Provider reports ₦${Math.abs(transaction.variance).toLocaleString()} less than ledger`
                    }
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* References */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              References
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Internal Reference
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {transaction.internalReference || 'Not available'}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Provider Reference
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {transaction.providerReference || 'Not available'}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Timeline */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Transaction Timeline
            </Typography>
            <Timeline>
              {timelineEvents.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color={getTimelineDotColor(event.status) as any}>
                      {event.status === 'success' && <IconCheck size={16} />}
                      {event.status === 'error' && <IconFailed size={16} />}
                      {event.status === 'warning' && <IconAlertTriangle size={16} />}
                      {event.status === 'info' && <IconClock size={16} />}
                    </TimelineDot>
                    {index < timelineEvents.length - 1 && <TimelineConnector />}
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

          {/* Resolution Actions */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Resolution Actions
            </Typography>
            <Stack spacing={2}>
              {transaction.status === 'matched' && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<IconCheck size={16} />}
                    size="small"
                    disabled
                  >
                    Already Resolved
                  </Button>
                </Stack>
              )}
              
              {transaction.status !== 'matched' && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<IconCheck size={16} />}
                    size="small"
                  >
                    Mark as Resolved
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IconAdjustments size={16} />}
                    size="small"
                  >
                    Create Adjustment
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IconFlag size={16} />}
                    size="small"
                    color="warning"
                  >
                    Flag for Investigation
                  </Button>
                </Stack>
              )}
              
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<IconDownload size={16} />}
                  size="small"
                >
                  Download Report
                </Button>
              </Stack>
              
              <Button
                variant="text"
                startIcon={<IconNotes size={16} />}
                size="small"
                sx={{ justifyContent: 'flex-start' }}
              >
                Add Internal Note
              </Button>
              
              <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                ⚠️ All actions are logged and irreversible without audit
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default TransactionReconciliationDrawer;
