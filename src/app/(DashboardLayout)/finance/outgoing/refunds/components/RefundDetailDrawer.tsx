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
  Avatar,
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
  IconMail,
  IconPrinter,
  IconEye,
  IconCurrencyNaira,
  IconArrowBackUp,
  IconRefresh as IconReversal,
  IconUser,
  IconBuilding,
  IconPackage,
  IconFileText,
  IconCalendar,
  IconAlertTriangle,
  IconNotes
} from '@tabler/icons-react';

interface RefundData {
  id: string;
  date: string;
  referenceId: string;
  originalTransaction: {
    id: string;
    type: 'user_payment' | 'enterprise_payment';
    user?: {
      name: string;
      email: string;
    };
    enterprise?: {
      name: string;
      email: string;
    };
    pickupId?: string;
    invoiceId?: string;
  };
  amount: number;
  type: 'refund' | 'reversal';
  reason: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  providerReference: string;
  initiatedAt: string;
  completedAt?: string;
}

interface RefundDetailDrawerProps {
  refund: RefundData | null;
  open: boolean;
  onClose: () => void;
}

const RefundDetailDrawer: React.FC<RefundDetailDrawerProps> = ({
  refund,
  open,
  onClose
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <IconCheck size={16} />;
      case 'pending': return <IconClock size={16} />;
      case 'processing': return <IconClock size={16} />;
      case 'failed': return <IconFailed size={16} />;
      default: return <div style={{ width: 16 }} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'refund': return 'error';
      case 'reversal': return 'warning';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'refund': return <IconArrowBackUp size={20} />;
      case 'reversal': return <IconReversal size={20} />;
      default: return null;
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'user_payment': return <IconUser size={20} />;
      case 'enterprise_payment': return <IconBuilding size={20} />;
      default: return null;
    }
  };

  const getSourceColor = (type: string) => {
    switch (type) {
      case 'user_payment': return 'primary';
      case 'enterprise_payment': return 'success';
      default: return 'default';
    }
  };

  const getTimelineColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'failed': return 'error';
      default: return 'grey';
    }
  };

  if (!open || !refund) return null;

  // Mock timeline data based on status
  const getTimelineEvents = () => {
    const baseEvents = [
      {
        title: 'Refund Initiated',
        time: refund.initiatedAt,
        status: 'success',
        description: `${refund.type.charAt(0).toUpperCase() + refund.type.slice(1)} of ₦${refund.amount.toLocaleString()} initiated`
      }
    ];

    if (refund.status === 'pending') {
      return baseEvents;
    }

    if (refund.status === 'processing') {
      return [
        ...baseEvents,
        {
          title: 'Refund Approved',
          time: '2 hours ago',
          status: 'success',
          description: 'Refund approved by finance team'
        },
        {
          title: 'Processing',
          time: '1 hour ago',
          status: 'info',
          description: 'Refund being processed to original payment method'
        }
      ];
    }

    if (refund.status === 'completed') {
      return [
        ...baseEvents,
        {
          title: 'Refund Approved',
          time: '3 hours ago',
          status: 'success',
          description: 'Refund approved by finance team'
        },
        {
          title: 'Processing',
          time: '2 hours ago',
          status: 'success',
          description: 'Refund being processed to original payment method'
        },
        {
          title: 'Refund Completed',
          time: refund.completedAt,
          status: 'success',
          description: 'Funds successfully returned to original payer'
        }
      ];
    }

    if (refund.status === 'failed') {
      return [
        ...baseEvents,
        {
          title: 'Refund Failed',
          time: '1 hour ago',
          status: 'error',
          description: 'Refund failed due to provider error'
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
              Refund Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Reference ID: {refund.referenceId}
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
                icon={getStatusIcon(refund.status)}
                label={refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
                color={getStatusColor(refund.status) as any}
                variant="outlined"
              />
            </Stack>
          </Box>

          <Divider />

          {/* Refund Info */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Refund Information
            </Typography>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Amount
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="error.main">
                      ₦{refund.amount.toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Type
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getTypeIcon(refund.type)}
                      <Chip
                        size="small"
                        label={refund.type.charAt(0).toUpperCase() + refund.type.slice(1)}
                        color={getTypeColor(refund.type) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Provider Reference
                    </Typography>
                    <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                      {refund.providerReference}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Initiated At
                    </Typography>
                    <Typography variant="body2" fontFamily="monospace">
                      {refund.initiatedAt}
                    </Typography>
                  </Stack>
                </Grid>
                {refund.completedAt && (
                  <Grid size={{ xs: 12 }}>
                    <Stack spacing={1}>
                      <Typography variant="caption" color="text.secondary">
                        Completed At
                      </Typography>
                      <Typography variant="body2" fontFamily="monospace">
                        {refund.completedAt}
                      </Typography>
                    </Stack>
                  </Grid>
                )}
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Original Transaction */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Original Transaction
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Transaction ID
                </Typography>
                <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                  {refund.originalTransaction.id}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                {getSourceIcon(refund.originalTransaction.type)}
                <Chip
                  size="small"
                  label={refund.originalTransaction.type.replace('_', ' ')}
                  color={getSourceColor(refund.originalTransaction.type) as any}
                  variant="outlined"
                />
              </Stack>
              {refund.originalTransaction.user && (
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    User Information
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}
                    >
                      {refund.originalTransaction.user.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {refund.originalTransaction.user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {refund.originalTransaction.user.email}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              )}
              {refund.originalTransaction.enterprise && (
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    Enterprise Information
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: 'success.light',
                        color: 'success.main',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}
                    >
                      {refund.originalTransaction.enterprise.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {refund.originalTransaction.enterprise.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {refund.originalTransaction.enterprise.email}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              )}
              {refund.originalTransaction.pickupId && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconPackage size={16} />
                  <Typography variant="body2" color="text.secondary">
                    Pickup: {refund.originalTransaction.pickupId}
                  </Typography>
                </Stack>
              )}
              {refund.originalTransaction.invoiceId && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconFileText size={16} />
                  <Typography variant="body2" color="text.secondary">
                    Invoice: {refund.originalTransaction.invoiceId}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Reason & Evidence */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Reason & Evidence
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Reason Code
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {refund.reason}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Internal Notes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Refund processed due to {refund.reason.toLowerCase()}. Original transaction was voided and funds returned to the original payment method.
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Attachments
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  No attachments available
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Status Timeline */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Status Timeline
            </Typography>
            <Timeline>
              {timelineEvents.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color={getTimelineColor(event.status) as any}>
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

          {/* Actions */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Actions
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<IconDownload size={16} />}
                  size="small"
                >
                  Download Receipt
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconMail size={16} />}
                  size="small"
                >
                  Send to Customer
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconPrinter size={16} />}
                  size="small"
                >
                  Print
                </Button>
              </Stack>
              
              {refund.status === 'failed' && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<IconRefresh size={16} />}
                    size="small"
                    color="warning"
                  >
                    Retry Refund
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
              
              {refund.status === 'pending' && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<IconCheck size={16} />}
                    size="small"
                    color="success"
                  >
                    Approve Refund
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IconX size={16} />}
                    size="small"
                    color="error"
                  >
                    Reject Refund
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

export default RefundDetailDrawer;
