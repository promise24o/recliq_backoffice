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
  IconBuilding,
  IconCalendar,
  IconFileText,
  IconCurrencyNaira,
  IconCheck,
  IconClock,
  IconAlertTriangle,
  IconRefresh,
  IconDownload,
  IconMail,
  IconPrinter,
  IconEye,
  IconTruck,
  IconPackage,
  IconPhone,
  IconMail as IconEmail
} from '@tabler/icons-react';

interface PaymentData {
  id: string;
  date: string;
  client: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
  };
  invoiceId: string;
  contract: string;
  contractType: 'one-time' | 'scheduled' | 'recycling' | 'disposal';
  amount: number;
  paid: number;
  status: 'paid' | 'partial' | 'pending' | 'overdue';
  dueDate: string;
  location: string;
  providerRef: string;
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
      case 'paid': return 'success';
      case 'partial': return 'warning';
      case 'pending': return 'info';
      case 'overdue': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <IconCheck size={16} />;
      case 'partial': return <IconClock size={16} />;
      case 'pending': return <IconClock size={16} />;
      case 'overdue': return <IconAlertTriangle size={16} />;
      default: return <IconAlertTriangle size={16} />;
    }
  };

  const getContractTypeIcon = (type: string) => {
    switch (type) {
      case 'scheduled': return <IconCalendar size={20} />;
      case 'recycling': return <IconPackage size={20} />;
      case 'one-time': return <IconTruck size={20} />;
      case 'disposal': return <IconFileText size={20} />;
      default: return null;
    }
  };

  const getContractTypeColor = (type: string) => {
    switch (type) {
      case 'scheduled': return 'primary';
      case 'recycling': return 'success';
      case 'one-time': return 'warning';
      case 'disposal': return 'info';
      default: return 'default';
    }
  };

  if (!payment) return null;

  const outstanding = payment.amount - payment.paid;
  const paymentProgress = (payment.paid / payment.amount) * 100;

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
              {payment.invoiceId}
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
                Due: {new Date(payment.dueDate).toLocaleDateString()}
              </Typography>
            </Stack>
          </Box>

          <Divider />

          {/* Client Information */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Client Information
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
                {payment.client.avatar}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" fontWeight={600}>
                  {payment.client.name}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconPhone size={14} color="text.secondary" />
                  <Typography variant="body2" color="text.secondary">
                    {payment.client.phone}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconEmail size={14} color="text.secondary" />
                  <Typography variant="body2" color="text.secondary">
                    {payment.client.email}
                  </Typography>
                </Stack>
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
                {getContractTypeIcon(payment.contractType)}
                <Typography variant="body2" fontWeight={600}>
                  {payment.contract}
                </Typography>
                <Chip
                  size="small"
                  label={payment.contractType}
                  color={getContractTypeColor(payment.contractType) as any}
                  variant="outlined"
                />
              </Stack>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Invoice Amount
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      ₦{payment.amount.toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Amount Paid
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="success.main">
                      ₦{payment.paid.toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Outstanding
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color={outstanding > 0 ? 'warning.main' : 'success.main'}>
                      ₦{outstanding.toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Payment Progress
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {paymentProgress.toFixed(1)}%
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>

              {/* Payment Progress Bar */}
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Payment Progress
                  </Typography>
                  <Typography variant="caption" fontWeight={600}>
                    {paymentProgress.toFixed(1)}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={paymentProgress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: paymentProgress === 100 ? 'success.main' : 'warning.main',
                    },
                  }}
                />
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* Work Summary */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Work Summary
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconFileText size={16} />
                <Typography variant="body2" color="text.secondary">
                  Invoice ID
                </Typography>
                <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                  {payment.invoiceId}
                </Typography>
              </Stack>
              
              <Stack direction="row" spacing={2} alignItems="center">
                <IconCalendar size={16} />
                <Typography variant="body2" color="text.secondary">
                  Billing Period
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {new Date(payment.date).toLocaleDateString()}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <IconPackage size={16} />
                <Typography variant="body2" color="text.secondary">
                  Pickups Completed
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  12 pickups
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <IconTruck size={16} />
                <Typography variant="body2" color="text.secondary">
                  Total Weight
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  2,450 kg
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Payment History */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Payment History
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconCheck size={16} color="green" />
                <Typography variant="body2" color="text.secondary">
                  Last Payment
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {new Date(payment.date).toLocaleDateString()}
                </Typography>
              </Stack>
              
              <Stack direction="row" spacing={2} alignItems="center">
                <IconCurrencyNaira size={16} />
                <Typography variant="body2" color="text.secondary">
                  Payment Method
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  Bank Transfer
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <IconFileText size={16} />
                <Typography variant="body2" color="text.secondary">
                  Provider Reference
                </Typography>
                <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                  {payment.providerRef}
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
                  Download Invoice
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconMail size={16} />}
                  size="small"
                >
                  Send to Client
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconPrinter size={16} />}
                  size="small"
                >
                  Print
                </Button>
              </Stack>
              
              {payment.status === 'overdue' && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<IconMail size={16} />}
                    size="small"
                    color="warning"
                  >
                    Send Reminder
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IconRefresh size={16} />}
                    size="small"
                    color="info"
                  >
                    Mark as Paid
                  </Button>
                </Stack>
              )}
              
              <Button
                variant="text"
                startIcon={<IconEye size={16} />}
                size="small"
                sx={{ justifyContent: 'flex-start' }}
              >
                View Contract
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
