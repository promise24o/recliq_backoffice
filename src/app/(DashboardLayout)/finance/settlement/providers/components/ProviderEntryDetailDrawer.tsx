'use client'
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Stack,
  Chip,
  Divider,
  IconButton,
  Grid
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
  IconDownload,
  IconBuildingBank,
  IconCreditCard,
  IconTruck,
  IconNotes,
  IconCalendar,
  IconCurrencyNaira,
  IconReceipt,
  IconAlertTriangle
} from '@tabler/icons-react';

export interface ProviderEntryData {
  id: string;
  provider: 'paystack' | 'flutterwave' | 'bank' | 'manual';
  batchId: string;
  txnId: string;
  grossAmount: number;
  fee: number;
  netAmount: number;
  status: 'settled' | 'pending' | 'failed';
  settlementDate: string;
  providerReference: string;
  transactionDate: string;
  matchedLedgerTxn?: string;
}

interface ProviderEntryDetailDrawerProps {
  entry: ProviderEntryData | null;
  open: boolean;
  onClose: () => void;
}

const ProviderEntryDetailDrawer: React.FC<ProviderEntryDetailDrawerProps> = ({
  entry,
  open,
  onClose
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'settled': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'settled': return <IconCheck size={16} />;
      case 'pending': return <IconClock size={16} />;
      case 'failed': return <IconFailed size={16} />;
      default: return <div style={{ width: 16 }} />;
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'paystack': return <IconBuildingBank size={20} />;
      case 'flutterwave': return <IconCreditCard size={20} />;
      case 'bank': return <IconTruck size={20} />;
      case 'manual': return <IconNotes size={20} />;
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

  if (!open || !entry) return null;

  // Mock timeline events
  const getTimelineEvents = () => {
    const baseEvents = [
      {
        title: 'Transaction Initiated',
        time: entry.transactionDate,
        status: 'info',
        description: `Transaction ${entry.txnId} initiated via ${entry.provider}`
      }
    ];

    if (entry.status === 'settled') {
      return [
        ...baseEvents,
        {
          title: 'Authorization Confirmed',
          time: entry.transactionDate,
          status: 'success',
          description: 'Payment authorization confirmed by provider'
        },
        {
          title: 'Settlement Processed',
          time: entry.settlementDate,
          status: 'success',
          description: `₦${entry.netAmount.toLocaleString()} settled to Recliq account`
        },
        {
          title: 'Ledger Match Found',
          time: entry.settlementDate,
          status: 'success',
          description: `Matched with internal ledger transaction ${entry.matchedLedgerTxn}`
        }
      ];
    }

    if (entry.status === 'pending') {
      return [
        ...baseEvents,
        {
          title: 'Authorization Confirmed',
          time: entry.transactionDate,
          status: 'success',
          description: 'Payment authorization confirmed by provider'
        },
        {
          title: 'Awaiting Settlement',
          time: new Date().toISOString(),
          status: 'warning',
          description: `Expected settlement: ${entry.settlementDate}`
        }
      ];
    }

    if (entry.status === 'failed') {
      return [
        ...baseEvents,
        {
          title: 'Authorization Failed',
          time: entry.transactionDate,
          status: 'error',
          description: 'Payment authorization failed'
        },
        {
          title: 'Settlement Failed',
          time: entry.settlementDate,
          status: 'error',
          description: 'Provider settlement process failed'
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
              Provider Entry Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Raw provider settlement data
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
              Settlement Status
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                icon={getStatusIcon(entry.status)}
                label={entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                color={getStatusColor(entry.status) as any}
                variant="outlined"
              />
              {!entry.matchedLedgerTxn && (
                <Chip
                  icon={<IconAlertTriangle size={16} />}
                  label="Unmatched"
                  color="error"
                  variant="outlined"
                />
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Provider Metadata */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Provider Metadata
            </Typography>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Provider
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getProviderIcon(entry.provider)}
                      <Typography variant="body2" fontWeight={600}>
                        {entry.provider.charAt(0).toUpperCase() + entry.provider.slice(1)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Batch ID
                    </Typography>
                    <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                      {entry.batchId}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Transaction ID
                    </Typography>
                    <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                      {entry.txnId}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Provider Reference
                    </Typography>
                    <Typography variant="body2" fontFamily="monospace">
                      {entry.providerReference}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Financial Breakdown */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Financial Breakdown
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Gross Amount
                </Typography>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                  ₦{entry.grossAmount.toLocaleString()}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Provider Fee
                </Typography>
                <Typography variant="h6" fontWeight={600} color="warning.main">
                  -₦{entry.fee.toLocaleString()}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Net Amount
                </Typography>
                <Typography variant="h6" fontWeight={700} color="success.main">
                  ₦{entry.netAmount.toLocaleString()}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Fee Rate
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {entry.grossAmount > 0 ? ((entry.fee / entry.grossAmount) * 100).toFixed(2) : '0.00'}%
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Timeline */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Settlement Timeline
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

          {/* Linked Internal Records */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Linked Internal Records
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Match Status
                </Typography>
                {entry.matchedLedgerTxn ? (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconCheck size={16} color="green" />
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      Matched with Ledger Transaction
                    </Typography>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconAlertTriangle size={16} color="orange" />
                    <Typography variant="body2" fontWeight={600} color="warning.main">
                      No Ledger Match Found
                    </Typography>
                  </Stack>
                )}
              </Stack>
              {entry.matchedLedgerTxn && (
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    Ledger Transaction ID
                  </Typography>
                  <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                    {entry.matchedLedgerTxn}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Read-Only Notice */}
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              ⚠️ This is read-only provider data. Any discrepancies should be investigated through the reconciliation process.
            </Typography>
          </Box>

          {/* Export Actions */}
          <Stack direction="row" spacing={2}>
            <IconButton
              size="small"
              title="Download Entry Report"
            >
              <IconDownload size={16} />
            </IconButton>
            <IconButton
              size="small"
              title="Print Entry Details"
            >
              <IconReceipt size={16} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default ProviderEntryDetailDrawer;
