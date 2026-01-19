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
  IconAlertTriangle,
  IconCurrencyNaira,
  IconCreditCard,
  IconBuildingBank,
  IconDeviceMobile,
  IconWallet,
  IconUser,
  IconBuilding,
  IconPackage,
  IconFileText
} from '@tabler/icons-react';

interface PaymentData {
  id: string;
  date: string;
  paymentId: string;
  source: 'user' | 'enterprise';
  payer: {
    name: string;
    avatar: string;
    email: string;
  };
  amount: number;
  method: 'card' | 'transfer' | 'ussd' | 'wallet';
  status: 'successful' | 'pending' | 'failed' | 'reversed' | 'timeout';
  provider: string;
  providerRef: string;
  attemptCount: number;
  linkedEntity: {
    type: 'pickup' | 'invoice';
    id: string;
  };
}

interface PaymentStatusDetailDrawerProps {
  payment: PaymentData | null;
  open: boolean;
  onClose: () => void;
}

const PaymentStatusDetailDrawer: React.FC<PaymentStatusDetailDrawerProps> = ({
  payment,
  open,
  onClose
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'successful': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      case 'reversed': return 'info';
      case 'timeout': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'successful': return <IconCheck size={16} />;
      case 'pending': return <IconClock size={16} />;
      case 'failed': return <IconFailed size={16} />;
      case 'reversed': return <IconRefresh size={16} />;
      case 'timeout': return <IconAlertTriangle size={16} />;
      default: return null;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <IconCreditCard size={20} />;
      case 'transfer': return <IconBuildingBank size={20} />;
      case 'ussd': return <IconDeviceMobile size={20} />;
      case 'wallet': return <IconWallet size={20} />;
      default: return null;
    }
  };

  const getSourceIcon = (source: string) => {
    return source === 'user' ? <IconUser size={20} /> : <IconBuilding size={20} />;
  };

  const getTimelineColor = (status: string) => {
    switch (status) {
      case 'successful': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      case 'reversed': return 'info';
      case 'timeout': return 'error';
      default: return 'grey';
    }
  };

  if (!payment) return null;

  // Mock timeline data based on payment status
  const timelineEvents = [
    {
      title: 'Payment Initiated',
      time: new Date(payment.date).toLocaleTimeString(),
      status: 'success',
      description: 'Payment request sent to provider'
    },
    {
      title: 'Authorization',
      time: new Date(payment.date).toLocaleTimeString(),
      status: payment.status === 'failed' ? 'error' : 'success',
      description: payment.status === 'failed' ? 'Authorization failed' : 'Payment authorized'
    },
    {
      title: 'Settlement',
      time: payment.status === 'successful' ? new Date(payment.date).toLocaleTimeString() : 'Pending',
      status: payment.status === 'successful' ? 'success' : 'pending',
      description: payment.status === 'successful' ? 'Payment settled successfully' : 'Awaiting settlement'
    }
  ];

  if (payment.status === 'reversed') {
    timelineEvents.push({
      title: 'Reversal',
      time: new Date(payment.date).toLocaleTimeString(),
      status: 'info',
      description: 'Payment reversed due to chargeback'
    });
  }

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
              Payment Status Details
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="monospace">
              {payment.paymentId}
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
          {/* Payment Status */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Payment Status
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                icon={getStatusIcon(payment.status)}
                label={payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                color={getStatusColor(payment.status) as any}
                variant="outlined"
              />
              <Typography variant="body2" color="text.secondary">
                Attempt {payment.attemptCount} of 3
              </Typography>
            </Stack>
          </Box>

          <Divider />

          {/* Payment Summary */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Payment Summary
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                {getMethodIcon(payment.method)}
                <Typography variant="body2" fontWeight={600}>
                  {payment.method.charAt(0).toUpperCase() + payment.method.slice(1)} Payment via {payment.provider}
                </Typography>
              </Stack>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Amount
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      ₦{payment.amount.toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Provider Reference
                    </Typography>
                    <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                      {payment.providerRef}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Payment ID
                    </Typography>
                    <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                      {payment.paymentId}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Date
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {new Date(payment.date).toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Payer Information */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Payer Information
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'primary.main',
                  fontSize: '1rem',
                  fontWeight: 600
                }}
              >
                {payment.payer.avatar}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" fontWeight={600}>
                    {payment.payer.name}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {getSourceIcon(payment.source)}
                    <Chip
                      size="small"
                      label={payment.source}
                      color={payment.source === 'user' ? 'primary' : 'success' as any}
                      variant="outlined"
                    />
                  </Stack>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {payment.payer.email}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* Linked Entity */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Linked Entity
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                {payment.linkedEntity.type === 'pickup' ? (
                  <IconPackage size={16} />
                ) : (
                  <IconFileText size={16} />
                )}
                <Typography variant="body2" color="text.secondary">
                  {payment.linkedEntity.type === 'pickup' ? 'Pickup ID' : 'Invoice ID'}
                </Typography>
                <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                  {payment.linkedEntity.id}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Payment Timeline */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Payment Timeline
            </Typography>
            <Timeline>
              {timelineEvents.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color={getTimelineColor(event.status) as any}>
                      {event.status === 'success' && <IconCheck size={16} />}
                      {event.status === 'error' && <IconFailed size={16} />}
                      {event.status === 'pending' && <IconClock size={16} />}
                      {event.status === 'info' && <IconRefresh size={16} />}
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

          {/* Provider Logs */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Provider Logs
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  Gateway Response Code
                </Typography>
                <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                  {payment.status === 'successful' ? '200' : payment.status === 'failed' ? '402' : '202'}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  Error Message
                </Typography>
                <Typography variant="body2" fontWeight={600} color={payment.status === 'successful' ? 'success.main' : 'error.main'}>
                  {payment.status === 'successful' ? 'Success' : payment.status === 'failed' ? 'Insufficient funds' : 'Processing timeout'}
                </Typography>
              </Stack>
            </Stack>
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
                  Send to Payer
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconPrinter size={16} />}
                  size="small"
                >
                  Print
                </Button>
              </Stack>
              
              {payment.status === 'failed' && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<IconRefresh size={16} />}
                    size="small"
                    color="warning"
                  >
                    Retry Payment
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IconAlertTriangle size={16} />}
                    size="small"
                    color="error"
                  >
                    Escalate to Provider
                  </Button>
                </Stack>
              )}
              
              {payment.status === 'pending' && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<IconRefresh size={16} />}
                    size="small"
                    color="info"
                  >
                    Check Status
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IconAlertTriangle size={16} />}
                    size="small"
                    color="warning"
                  >
                    Mark as Failed
                  </Button>
                </Stack>
              )}
              
              <Button
                variant="text"
                startIcon={<IconEye size={16} />}
                size="small"
                sx={{ justifyContent: 'flex-start' }}
              >
                View Provider Log
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

export default PaymentStatusDetailDrawer;
