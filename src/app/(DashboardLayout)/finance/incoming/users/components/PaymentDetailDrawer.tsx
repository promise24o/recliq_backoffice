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
  IconX,
  IconUser,
  IconCalendar,
  IconFileText,
  IconCurrencyNaira,
  IconCreditCard,
  IconBuildingBank,
  IconDeviceMobile,
  IconWallet,
  IconCheck,
  IconClock,
  IconX as IconFailed,
  IconRefresh,
  IconDownload,
  IconMail,
  IconPrinter,
  IconEye,
  IconAlertTriangle
} from '@tabler/icons-react';

interface PaymentData {
  id: string;
  date: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  paymentId: string;
  method: 'card' | 'transfer' | 'ussd' | 'wallet';
  amount: number;
  purpose: string;
  status: 'successful' | 'pending' | 'failed';
  providerRef: string;
  linkedTransaction: string;
}

interface PaymentDetailDrawerProps {
  payment: PaymentData | null;
  open: boolean;
  onClose: () => void;
}

const PaymentDetailDrawer: React.FC<PaymentDetailDrawerProps> = ({
  payment,
  open,
  onClose
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'successful': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'successful': return <IconCheck size={16} />;
      case 'pending': return <IconClock size={16} />;
      case 'failed': return <IconFailed size={16} />;
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

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'card': return 'primary';
      case 'transfer': return 'success';
      case 'ussd': return 'warning';
      case 'wallet': return 'info';
      default: return 'default';
    }
  };

  if (!payment) return null;

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
              Payment Details
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
                {new Date(payment.date).toLocaleDateString()}
              </Typography>
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
                {payment.user.avatar}
              </Avatar>
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  {payment.user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {payment.user.email}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* Payment Information */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Payment Information
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                {getMethodIcon(payment.method)}
                <Typography variant="body2" fontWeight={600}>
                  {payment.method.charAt(0).toUpperCase() + payment.method.slice(1)} Payment
                </Typography>
                <Chip
                  size="small"
                  label={payment.method}
                  color={getMethodColor(payment.method) as any}
                  variant="outlined"
                />
              </Stack>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Amount Paid
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      ₦{payment.amount.toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Payment Purpose
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {payment.purpose}
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
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Linked Transaction */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Linked Transaction
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconFileText size={16} />
                <Typography variant="body2" color="text.secondary">
                  Transaction ID
                </Typography>
                <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                  {payment.linkedTransaction}
                </Typography>
              </Stack>
              
              <Stack direction="row" spacing={2} alignItems="center">
                <IconCalendar size={16} />
                <Typography variant="body2" color="text.secondary">
                  Payment Date
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {new Date(payment.date).toLocaleString()}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Settlement Status */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Settlement Status
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconCheck size={16} color="green" />
                <Typography variant="body2" color="text.secondary">
                  Settlement Status
                </Typography>
                <Chip
                  size="small"
                  label="Settled"
                  color="success"
                  variant="outlined"
                />
              </Stack>
              
              <Stack direction="row" spacing={2} alignItems="center">
                <IconCalendar size={16} />
                <Typography variant="body2" color="text.secondary">
                  Settlement Date
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {new Date(payment.date).toLocaleDateString()}
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
                    Mark as Resolved
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

export default PaymentDetailDrawer;
