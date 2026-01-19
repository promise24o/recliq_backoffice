'use client'
import React from 'react';
import { Box, Typography, Stack, Chip, Button, Card, CardContent, Avatar, IconButton, Tooltip, Grid } from '@mui/material';
import { 
  IconAlertTriangle, 
  IconTrendingUp, 
  IconTrendingDown,
  IconRefresh,
  IconEye,
  IconArrowRight,
  IconClock,
  IconUser,
  IconCurrencyNaira,
  IconCreditCard,
  IconBuildingBank
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface AlertItem {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  value: string;
  trend: number;
  timestamp: string;
  action: string;
  provider?: string;
}

const PaymentAlertsPanel: React.FC = () => {
  const alerts: AlertItem[] = [
    {
      id: '1',
      type: 'error',
      title: 'Sudden Spike in Failed Payments',
      description: 'Card payment failure rate increased by 45% in the last hour',
      value: '+45%',
      trend: 45,
      timestamp: '30 min ago',
      action: 'Investigate',
      provider: 'Flutterwave'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Duplicate Payment Attempts',
      description: 'User Aisha Bello attempted 3 identical payments within 2 minutes',
      value: '3x',
      trend: 3,
      timestamp: '1h ago',
      action: 'Review',
      provider: 'Paystack'
    },
    {
      id: '3',
      type: 'error',
      title: 'Provider Downtime Detected',
      description: 'Bank transfer provider experiencing connectivity issues',
      value: 'Offline',
      trend: 0,
      timestamp: '2h ago',
      action: 'Monitor',
      provider: 'Zenith Bank'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Unusual Payment Pattern',
      description: 'Multiple high-value payments from new user accounts',
      value: '₦50K+',
      trend: 25,
      timestamp: '3h ago',
      action: 'Verify',
      provider: 'Flutterwave'
    },
    {
      id: '5',
      type: 'info',
      title: 'Payment Processing Delay',
      description: 'USSD payments taking longer than usual to confirm',
      value: '+5 min',
      trend: 5,
      timestamp: '4h ago',
      action: 'Monitor',
      provider: 'GTBank USSD'
    },
    {
      id: '6',
      type: 'error',
      title: 'Revenue Leakage Detected',
      description: 'Mismatch between provider settlement and system records',
      value: '-₦125K',
      trend: -125000,
      timestamp: '6h ago',
      action: 'Reconcile',
      provider: 'All Providers'
    }
  ];

  const getAlertColor = (type: AlertItem['type']) => {
    if (type === 'error') return 'error';
    if (type === 'warning') return 'warning';
    return 'info';
  };

  const getAlertIcon = (type: AlertItem['type']) => {
    if (type === 'error') return <IconAlertTriangle size={16} />;
    if (type === 'warning') return <IconTrendingUp size={16} />;
    return <IconRefresh size={16} />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'error.main';
    if (trend < 0) return 'warning.main';
    return 'text.secondary';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <IconTrendingUp size={14} />;
    if (trend < 0) return <IconTrendingDown size={14} />;
    return <IconRefresh size={14} />;
  };

  const getProviderIcon = (provider: string) => {
    if (provider.includes('Flutterwave') || provider.includes('Paystack')) return <IconCreditCard size={14} />;
    if (provider.includes('Bank')) return <IconBuildingBank size={14} />;
    return <IconCurrencyNaira size={14} />;
  };

  return (
    <DashboardCard title="Payment Alerts & Anomalies">
      <Grid container spacing={2}>
        {alerts.map((alert) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={alert.id}>
            <Card
              variant="outlined"
              sx={{
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                borderLeft: `3px solid`,
                borderLeftColor: `${getAlertColor(alert.type)}.main`,
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
                          bgcolor: `${getAlertColor(alert.type)}.light`,
                          color: `${getAlertColor(alert.type)}.main`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {getAlertIcon(alert.type)}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="subtitle2" fontWeight={700} noWrap>
                          {alert.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {alert.type === 'error' ? 'Critical' : alert.type === 'warning' ? 'Warning' : 'Info'}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
                      <Chip
                        size="small"
                        label={alert.value}
                        color={getAlertColor(alert.type) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </Stack>

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4 }}>
                    {alert.description}
                  </Typography>

                  {/* Provider and Timestamp */}
                  <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ flex: 1, alignItems: 'center' }}>
                    {alert.provider && (
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexShrink: 0, minWidth: 0 }}>
                        {getProviderIcon(alert.provider)}
                        <Typography variant="caption" noWrap>{alert.provider}</Typography>
                      </Stack>
                    )}
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexShrink: 0, minWidth: 0 }}>
                      <IconClock size={14} />
                      <Typography variant="caption">{alert.timestamp}</Typography>
                    </Stack>
                  </Stack>

                  {/* Footer */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flex: 1, width: '100%', mt: 'auto' }}>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexShrink: 0, minWidth: 0 }}>
                      {alert.trend !== 0 && (
                        <>
                          {getTrendIcon(alert.trend)}
                          <Typography
                            variant="caption"
                            fontWeight={600}
                            color={getTrendColor(alert.trend)}
                          >
                            {alert.trend > 0 ? '+' : ''}{alert.trend > 1000 ? `₦${Math.abs(alert.trend).toLocaleString()}` : `${alert.trend}%`}
                          </Typography>
                        </>
                      )}
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0, minWidth: 0 }}>
                      <Tooltip title="View details">
                        <IconButton size="small">
                          <IconEye size={16} />
                        </IconButton>
                      </Tooltip>
                      {alert.action && (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Typography
                            variant="caption"
                            color="primary.main"
                            fontWeight={600}
                          >
                            {alert.action}
                          </Typography>
                          <IconArrowRight size={14} />
                        </Stack>
                      )}
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
          Alert Summary
        </Typography>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Active Alerts</Typography>
            <Typography variant="caption" fontWeight={600}>{alerts.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Critical Issues</Typography>
            <Typography variant="caption" fontWeight={600} color="error.main">
              {alerts.filter(a => a.type === 'error').length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Providers Affected</Typography>
            <Typography variant="caption" fontWeight={600}>
              {[...new Set(alerts.map(a => a.provider))].length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Last Updated</Typography>
            <Typography variant="caption" fontWeight={600}>2 min ago</Typography>
          </Box>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default PaymentAlertsPanel;
