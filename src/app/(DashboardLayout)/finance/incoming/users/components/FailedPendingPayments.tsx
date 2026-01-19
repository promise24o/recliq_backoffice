'use client'
import React from 'react';
import { Box, Typography, Stack, Chip, Button, Card, CardContent, Avatar, IconButton, Tooltip, Grid } from '@mui/material';
import { 
  IconAlertTriangle, 
  IconClock,
  IconRefresh,
  IconEye,
  IconArrowRight,
  IconUser,
  IconCurrencyNaira,
  IconX,
  IconCheck
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface FailedPendingPayment {
  id: string;
  type: 'failed' | 'pending';
  paymentId: string;
  user: {
    name: string;
    avatar: string;
  };
  amount: number;
  method: string;
  reason: string;
  retryCount: number;
  timestamp: string;
  action: string;
}

const FailedPendingPayments: React.FC = () => {
  const payments: FailedPendingPayment[] = [
    {
      id: '1',
      type: 'failed',
      paymentId: 'PAY-2024-0145',
      user: {
        name: 'Tunde Adekunle',
        avatar: 'TA'
      },
      amount: 3000,
      method: 'wallet',
      reason: 'Insufficient funds',
      retryCount: 2,
      timestamp: '2h ago',
      action: 'Retry'
    },
    {
      id: '2',
      type: 'pending',
      paymentId: 'PAY-2024-0144',
      user: {
        name: 'Fatima Ibrahim',
        avatar: 'FI'
      },
      amount: 5000,
      method: 'ussd',
      reason: 'Awaiting confirmation',
      retryCount: 0,
      timestamp: '4h ago',
      action: 'Verify'
    },
    {
      id: '3',
      type: 'failed',
      paymentId: 'PAY-2024-0147',
      user: {
        name: 'Samuel Ade',
        avatar: 'SA'
      },
      amount: 7500,
      method: 'card',
      reason: 'Card declined',
      retryCount: 1,
      timestamp: '6h ago',
      action: 'Retry'
    },
    {
      id: '4',
      type: 'pending',
      paymentId: 'PAY-2024-0148',
      user: {
        name: 'Mariam Yusuf',
        avatar: 'MY'
      },
      amount: 12000,
      method: 'transfer',
      reason: 'Bank processing delay',
      retryCount: 0,
      timestamp: '8h ago',
      action: 'Monitor'
    },
    {
      id: '5',
      type: 'failed',
      paymentId: 'PAY-2024-0149',
      user: {
        name: 'Chukwu Okafor',
        avatar: 'CO'
      },
      amount: 4500,
      method: 'ussd',
      reason: 'Timeout',
      retryCount: 3,
      timestamp: '12h ago',
      action: 'Cancel'
    },
    {
      id: '6',
      type: 'pending',
      paymentId: 'PAY-2024-0150',
      user: {
        name: 'Aisha Bello',
        avatar: 'AB'
      },
      amount: 8500,
      method: 'card',
      reason: '3D Secure verification',
      retryCount: 0,
      timestamp: '1h ago',
      action: 'Complete'
    }
  ];

  const getTypeColor = (type: string) => {
    if (type === 'failed') return 'error';
    if (type === 'pending') return 'warning';
    return 'default';
  };

  const getTypeIcon = (type: string) => {
    if (type === 'failed') return <IconX size={16} />;
    if (type === 'pending') return <IconClock size={16} />;
    return null;
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

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Retry': return 'warning';
      case 'Verify': return 'info';
      case 'Monitor': return 'default';
      case 'Cancel': return 'error';
      case 'Complete': return 'success';
      default: return 'primary';
    }
  };

  return (
    <DashboardCard title="Failed & Pending Payments">
      <Grid container spacing={2}>
        {payments.map((payment) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={payment.id}>
            <Card
              variant="outlined"
              sx={{
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                borderLeft: `3px solid`,
                borderLeftColor: `${getTypeColor(payment.type)}.main`,
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
                          bgcolor: `${getTypeColor(payment.type)}.light`,
                          color: `${getTypeColor(payment.type)}.main`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {getTypeIcon(payment.type)}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="subtitle2" fontWeight={700} noWrap>
                          {payment.paymentId}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
                      <Chip
                        size="small"
                        label={payment.type}
                        color={getTypeColor(payment.type) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </Stack>

                  {/* User and Amount */}
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
                        {payment.user.avatar}
                      </Avatar>
                      <Typography variant="body2" fontWeight={600}>
                        {payment.user.name}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={700} color="primary.main">
                      ₦{payment.amount.toLocaleString()}
                    </Typography>
                  </Stack>

                  {/* Method and Reason */}
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="caption" color="text.secondary">
                        Method:
                      </Typography>
                      <Chip
                        size="small"
                        label={payment.method}
                        color={getMethodColor(payment.method) as any}
                        variant="outlined"
                      />
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {payment.reason}
                    </Typography>
                  </Stack>

                  {/* Retry Count and Timestamp */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="caption" color="text.secondary">
                        Retries:
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        {payment.retryCount}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {payment.timestamp}
                    </Typography>
                  </Stack>

                  {/* Footer */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {payment.type === 'failed' && payment.retryCount > 0 && (
                        <Tooltip title="Max retries reached">
                          <IconAlertTriangle size={14} color="orange" />
                        </Tooltip>
                      )}
                      {payment.type === 'pending' && (
                        <IconClock size={14} color="blue" />
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
          Payment Issues Summary
        </Typography>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Total Issues</Typography>
            <Typography variant="caption" fontWeight={600}>{payments.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Failed Payments</Typography>
            <Typography variant="caption" fontWeight={600} color="error.main">
              {payments.filter(p => p.type === 'failed').length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Pending Payments</Typography>
            <Typography variant="caption" fontWeight={600} color="warning.main">
              {payments.filter(p => p.type === 'pending').length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Avg Retry Count</Typography>
            <Typography variant="caption" fontWeight={600}>
              {(payments.reduce((sum, p) => sum + p.retryCount, 0) / payments.length).toFixed(1)}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default FailedPendingPayments;
