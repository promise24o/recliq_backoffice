'use client'
import React from 'react';
import { Box, Typography, Stack, Chip, Button, Card, CardContent, Avatar, IconButton, Tooltip, Grid, LinearProgress } from '@mui/material';
import { 
  IconAlertTriangle, 
  IconClock,
  IconRefresh,
  IconEye,
  IconArrowRight,
  IconUser,
  IconBuilding,
  IconCurrencyNaira,
  IconCreditCard,
  IconBuildingBank,
  IconDeviceMobile,
  IconWallet
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface StuckFailedPayment {
  id: string;
  paymentId: string;
  source: 'user' | 'enterprise';
  payer: {
    name: string;
    avatar: string;
  };
  amount: number;
  method: 'card' | 'transfer' | 'ussd' | 'wallet';
  status: 'stuck' | 'failed';
  duration: string;
  retryCount: number;
  failureReason: string;
  action: string;
  provider: string;
}

const StuckFailedPayments: React.FC = () => {
  const payments: StuckFailedPayment[] = [
    {
      id: '1',
      paymentId: 'PAY-2024-0147',
      source: 'user',
      payer: {
        name: 'Tunde Adekunle',
        avatar: 'TA'
      },
      amount: 7500,
      method: 'card',
      status: 'stuck',
      duration: '45 mins',
      retryCount: 2,
      failureReason: 'Gateway timeout',
      action: 'Retry',
      provider: 'Flutterwave'
    },
    {
      id: '2',
      paymentId: 'PAY-2024-0148',
      source: 'enterprise',
      payer: {
        name: 'Shoprite Nigeria',
        avatar: 'SRN'
      },
      amount: 3200000,
      method: 'transfer',
      status: 'failed',
      duration: '2 hours',
      retryCount: 3,
      failureReason: 'Insufficient funds',
      action: 'Contact Client',
      provider: 'Zenith Bank'
    },
    {
      id: '3',
      paymentId: 'PAY-2024-0149',
      source: 'user',
      payer: {
        name: 'Fatima Ibrahim',
        avatar: 'FI'
      },
      amount: 5000,
      method: 'ussd',
      status: 'stuck',
      duration: '1 hour',
      retryCount: 1,
      failureReason: 'USSD session timeout',
      action: 'Retry',
      provider: 'GTBank USSD'
    },
    {
      id: '4',
      paymentId: 'PAY-2024-0150',
      source: 'enterprise',
      payer: {
        name: 'Dangote Group',
        avatar: 'DNG'
      },
      amount: 8500000,
      method: 'transfer',
      status: 'failed',
      duration: '30 mins',
      retryCount: 1,
      failureReason: 'Account blocked',
      action: 'Escalate',
      provider: 'Paystack'
    },
    {
      id: '5',
      paymentId: 'PAY-2024-0151',
      source: 'user',
      payer: {
        name: 'Chukwu Okafor',
        avatar: 'CO'
      },
      amount: 3000,
      method: 'wallet',
      status: 'stuck',
      duration: '2 hours',
      retryCount: 3,
      failureReason: 'Wallet service unavailable',
      action: 'Monitor',
      provider: 'Flutterwave'
    },
    {
      id: '6',
      paymentId: 'PAY-2024-0152',
      source: 'enterprise',
      payer: {
        name: 'Unilever Nigeria',
        avatar: 'UNL'
      },
      amount: 4500000,
      method: 'card',
      status: 'failed',
      duration: '15 mins',
      retryCount: 2,
      failureReason: 'Card declined',
      action: 'Retry',
      provider: 'Paystack'
    }
  ];

  const getStatusColor = (status: string) => {
    if (status === 'stuck') return 'warning';
    if (status === 'failed') return 'error';
    return 'default';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'stuck') return <IconClock size={16} />;
    if (status === 'failed') return <IconAlertTriangle size={16} />;
    return null;
  };

  const getSourceIcon = (source: string) => {
    return source === 'user' ? <IconUser size={14} /> : <IconBuilding size={14} />;
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <IconCreditCard size={14} />;
      case 'transfer': return <IconBuildingBank size={14} />;
      case 'ussd': return <IconDeviceMobile size={14} />;
      case 'wallet': return <IconWallet size={14} />;
      default: return null;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Retry': return 'warning';
      case 'Contact Client': return 'info';
      case 'Escalate': return 'error';
      case 'Monitor': return 'default';
      default: return 'primary';
    }
  };

  const getDurationColor = (duration: string) => {
    const minutes = parseInt(duration);
    if (minutes >= 120) return 'error';
    if (minutes >= 60) return 'warning';
    if (minutes >= 30) return 'info';
    return 'success';
  };

  return (
    <DashboardCard title="Stuck & Failed Payments">
      <Grid container spacing={2}>
        {payments.map((payment) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={payment.id}>
            <Card
              variant="outlined"
              sx={{
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                borderLeft: `3px solid`,
                borderLeftColor: `${getStatusColor(payment.status)}.main`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardContent sx={{ py: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Stack spacing={1.5} sx={{ flex: 1 }}>
                  {/* Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '8px',
                          bgcolor: `${getStatusColor(payment.status)}.light`,
                          color: `${getStatusColor(payment.status)}.main`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {getStatusIcon(payment.status)}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="subtitle2" fontWeight={700} noWrap>
                          {payment.paymentId}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
                      <Chip
                        size="small"
                        label={payment.duration}
                        color={getDurationColor(payment.duration) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </Stack>

                  {/* Payer and Amount */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          bgcolor: 'primary.light',
                          color: 'primary.main',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        {payment.payer.avatar}
                      </Avatar>
                      <Stack spacing={0.5}>
                        <Typography variant="body2" fontWeight={600}>
                          {payment.payer.name}
                        </Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          {getSourceIcon(payment.source)}
                          <Typography variant="caption" color="text.secondary">
                            {payment.source}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Typography variant="body2" fontWeight={700} color="error.main">
                      ₦{payment.amount.toLocaleString()}
                    </Typography>
                  </Stack>

                  {/* Method and Failure Reason */}
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getMethodIcon(payment.method)}
                      <Typography variant="caption" color="text.secondary">
                        {payment.method}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        • {payment.provider}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {payment.failureReason}
                    </Typography>
                  </Stack>

                  {/* Retry Count and Progress */}
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" color="text.secondary">
                        Retry Progress
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        {payment.retryCount}/3
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={(payment.retryCount / 3) * 100}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: payment.retryCount >= 3 ? 'error.main' : 'warning.main',
                        },
                      }}
                    />
                  </Stack>

                  {/* Footer */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {payment.retryCount >= 3 && (
                        <Tooltip title="Max retries reached">
                          <IconAlertTriangle size={14} color="orange" />
                        </Tooltip>
                      )}
                      {payment.status === 'stuck' && (
                        <Tooltip title="Payment stuck">
                          <IconClock size={14} color="blue" />
                        </Tooltip>
                      )}
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Tooltip title="View details">
                        <IconButton size="small">
                          <IconEye size={16} />
                        </IconButton>
                      </Tooltip>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography
                          variant="caption"
                          color={getActionColor(payment.action) + '.main' as any}
                          fontWeight={600}
                        >
                          {payment.action}
                        </Typography>
                        <IconArrowRight size={14} />
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Summary */}
      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, mt: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Stuck & Failed Payments Summary
        </Typography>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Total Issues</Typography>
            <Typography variant="caption" fontWeight={600}>{payments.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Stuck Payments</Typography>
            <Typography variant="caption" fontWeight={600} color="warning.main">
              {payments.filter(p => p.status === 'stuck').length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Failed Payments</Typography>
            <Typography variant="caption" fontWeight={600} color="error.main">
              {payments.filter(p => p.status === 'failed').length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Max Retries Reached</Typography>
            <Typography variant="caption" fontWeight={600} color="error.main">
              {payments.filter(p => p.retryCount >= 3).length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Total Amount Affected</Typography>
            <Typography variant="caption" fontWeight={600} color="error.main">
              ₦{payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default StuckFailedPayments;
