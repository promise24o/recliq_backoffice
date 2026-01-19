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
  IconBuildingBank,
  IconDeviceMobile,
  IconUser,
  IconShield,
  IconFileText,
  IconCalendar
} from '@tabler/icons-react';

interface WithdrawalData {
  id: string;
  date: string;
  user: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
    kycStatus: 'verified' | 'pending' | 'unverified';
  };
  amount: number;
  method: 'bank' | 'mobile_money';
  bankInfo: {
    bankName: string;
    accountNumber: string;
    verified: boolean;
  };
  status: 'requested' | 'processing' | 'paid' | 'failed' | 'held';
  requestedAt: string;
}

interface WithdrawalDetailDrawerProps {
  withdrawal: WithdrawalData | null;
  open: boolean;
  onClose: () => void;
}

const WithdrawalDetailDrawer: React.FC<WithdrawalDetailDrawerProps> = ({
  withdrawal,
  open,
  onClose
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'requested': return 'warning';
      case 'processing': return 'info';
      case 'failed': return 'error';
      case 'held': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <IconCheck size={16} />;
      case 'requested': return <IconClock size={16} />;
      case 'processing': return <IconClock size={16} />;
      case 'failed': return <IconFailed size={16} />;
      case 'held': return <IconAlertTriangle size={16} />;
      default: return <div style={{ width: 16 }} />;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'bank': return <IconBuildingBank size={20} />;
      case 'mobile_money': return <IconDeviceMobile size={20} />;
      default: return null;
    }
  };

  const getKycColor = (status: string) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'unverified': return 'error';
      default: return 'default';
    }
  };

  const getKycIcon = (status: string) => {
    switch (status) {
      case 'verified': return <IconCheck size={16} />;
      case 'pending': return <IconClock size={16} />;
      case 'unverified': return <IconX size={16} />;
      default: return <div style={{ width: 16 }} />;
    }
  };

  const getTimelineColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'requested': return 'warning';
      case 'processing': return 'info';
      case 'failed': return 'error';
      case 'held': return 'error';
      default: return 'grey';
    }
  };

  const maskAccountNumber = (accountNumber: string) => {
    if (accountNumber.length <= 4) return accountNumber;
    return accountNumber.slice(0, 2) + '*'.repeat(accountNumber.length - 4) + accountNumber.slice(-2);
  };

  if (!open || !withdrawal) return null;

  // Mock timeline data based on status
  const getTimelineEvents = () => {
    const baseEvents = [
      {
        title: 'Withdrawal Requested',
        time: withdrawal.requestedAt,
        status: 'success',
        description: `User requested ₦${withdrawal.amount.toLocaleString()} withdrawal`
      }
    ];

    if (withdrawal.status === 'requested') {
      return baseEvents;
    }

    if (withdrawal.status === 'processing') {
      return [
        ...baseEvents,
        {
          title: 'Request Approved',
          time: '2 hours ago',
          status: 'success',
          description: 'Withdrawal approved by finance team'
        },
        {
          title: 'Processing',
          time: '1 hour ago',
          status: 'info',
          description: 'Payment being processed to user account'
        }
      ];
    }

    if (withdrawal.status === 'paid') {
      return [
        ...baseEvents,
        {
          title: 'Request Approved',
          time: '3 hours ago',
          status: 'success',
          description: 'Withdrawal approved by finance team'
        },
        {
          title: 'Processing',
          time: '2 hours ago',
          status: 'success',
          description: 'Payment being processed to user account'
        },
        {
          title: 'Payment Completed',
          time: '1 hour ago',
          status: 'success',
          description: 'Funds successfully transferred to user'
        }
      ];
    }

    if (withdrawal.status === 'failed') {
      return [
        ...baseEvents,
        {
          title: 'Request Approved',
          time: '2 hours ago',
          status: 'success',
          description: 'Withdrawal approved by finance team'
        },
        {
          title: 'Processing Failed',
          time: '1 hour ago',
          status: 'error',
          description: 'Payment failed due to insufficient funds'
        }
      ];
    }

    if (withdrawal.status === 'held') {
      return [
        ...baseEvents,
        {
          title: 'Request Held',
          time: '1 hour ago',
          status: 'warning',
          description: 'Withdrawal held for KYC verification'
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
              Withdrawal Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Request ID: WD-{withdrawal.id}
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
                icon={getStatusIcon(withdrawal.status)}
                label={withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                color={getStatusColor(withdrawal.status) as any}
                variant="outlined"
              />
            </Stack>
          </Box>

          <Divider />

          {/* User Information */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              User Information
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
                {withdrawal.user.avatar}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" fontWeight={600}>
                    {withdrawal.user.name}
                  </Typography>
                  <Chip
                    size="small"
                    icon={getKycIcon(withdrawal.user.kycStatus)}
                    label={withdrawal.user.kycStatus.charAt(0).toUpperCase() + withdrawal.user.kycStatus.slice(1)}
                    color={getKycColor(withdrawal.user.kycStatus) as any}
                    variant="outlined"
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {withdrawal.user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {withdrawal.user.phone}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* Wallet Summary */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Wallet Summary
            </Typography>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Available Balance
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      ₦{(withdrawal.amount * 2).toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Amount Requested
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="primary.main">
                      ₦{withdrawal.amount.toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Processing Fee
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                      ₦{Math.floor(withdrawal.amount * 0.01).toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Remaining Balance
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      ₦{(withdrawal.amount - Math.floor(withdrawal.amount * 0.01)).toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Bank / Method Details */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Withdrawal Method Details
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                {getMethodIcon(withdrawal.method)}
                <Typography variant="body2" fontWeight={600}>
                  {withdrawal.method === 'bank' ? 'Bank Transfer' : 'Mobile Money'}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  {withdrawal.method === 'bank' ? 'Bank Name' : 'Provider'}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {withdrawal.bankInfo.bankName}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  {withdrawal.method === 'bank' ? 'Account Number' : 'Mobile Number'}
                </Typography>
                <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                  {maskAccountNumber(withdrawal.bankInfo.accountNumber)}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                {withdrawal.bankInfo.verified ? (
                  <>
                    <IconShield size={16} color="green" />
                    <Typography variant="body2" color="success.main" fontWeight={600}>
                      Verified Account
                    </Typography>
                  </>
                ) : (
                  <>
                    <IconAlertTriangle size={16} color="orange" />
                    <Typography variant="body2" color="warning.main" fontWeight={600}>
                      Account Not Verified
                    </Typography>
                  </>
                )}
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
                  Send to User
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconPrinter size={16} />}
                  size="small"
                >
                  Print
                </Button>
              </Stack>
              
              {withdrawal.status === 'failed' && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<IconRefresh size={16} />}
                    size="small"
                    color="warning"
                  >
                    Retry Withdrawal
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IconAlertTriangle size={16} />}
                    size="small"
                    color="error"
                  >
                    Contact User
                  </Button>
                </Stack>
              )}
              
              {withdrawal.status === 'held' && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<IconCheck size={16} />}
                    size="small"
                    color="success"
                  >
                    Release Hold
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IconAlertTriangle size={16} />}
                    size="small"
                    color="error"
                  >
                    Reject Request
                  </Button>
                </Stack>
              )}
              
              <Button
                variant="text"
                startIcon={<IconEye size={16} />}
                size="small"
                sx={{ justifyContent: 'flex-start' }}
              >
                View Full Audit Log
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

export default WithdrawalDetailDrawer;
