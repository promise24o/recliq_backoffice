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
  IconBuilding,
  IconCurrencyNaira,
  IconCreditCard,
  IconBuildingBank,
  IconCalendar
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
  client?: string;
  provider?: string;
}

const EnterpriseAlertsPanel: React.FC = () => {
  const alerts: AlertItem[] = [
    {
      id: '1',
      type: 'error',
      title: 'Late Payment Pattern Detected',
      description: 'Dangote Group consistently paying 15+ days after due date',
      value: '+15 days',
      trend: 15,
      timestamp: '2h ago',
      action: 'Review Contract',
      client: 'Dangote Group'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Partial Payment Increase',
      description: '30% increase in partial payments this month',
      value: '+30%',
      trend: 30,
      timestamp: '4h ago',
      action: 'Investigate',
      provider: 'All Clients'
    },
    {
      id: '3',
      type: 'error',
      title: 'Contract Limit Approaching',
      description: 'Lagos State Government contract 90% utilized',
      value: '90%',
      trend: 90,
      timestamp: '6h ago',
      action: 'Renew Contract',
      client: 'Lagos State Government'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Revenue Leakage Alert',
      description: 'Unbilled pickups detected for Shoprite Nigeria',
      value: '₦850K',
      trend: 850000,
      timestamp: '8h ago',
      action: 'Generate Invoice',
      client: 'Shoprite Nigeria'
    },
    {
      id: '5',
      type: 'info',
      title: 'Payment Processing Delay',
      description: 'Bank transfers taking 48+ hours to confirm',
      value: '+48h',
      trend: 48,
      timestamp: '12h ago',
      action: 'Monitor',
      provider: 'All Banks'
    },
    {
      id: '6',
      type: 'error',
      title: 'Client Payment Drop',
      description: 'Unilever Nigeria payments down 45% this quarter',
      value: '-45%',
      trend: -45,
      timestamp: '1d ago',
      action: 'Contact Client',
      client: 'Unilever Nigeria'
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

  const getClientIcon = (client: string) => {
    return <IconBuilding size={14} />;
  };

  return (
    <DashboardCard title="Enterprise Alerts & Anomalies">
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

                  {/* Client and Timestamp */}
                  <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ flex: 1, alignItems: 'center' }}>
                    {alert.client && (
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexShrink: 0, minWidth: 0 }}>
                        {getClientIcon(alert.client)}
                        <Typography variant="caption" noWrap>{alert.client}</Typography>
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
                            {alert.trend > 0 ? '+' : ''}{Math.abs(alert.trend) > 1000 ? `₦${Math.abs(alert.trend).toLocaleString()}` : `${alert.trend}%`}
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
            <Typography variant="caption">Clients Affected</Typography>
            <Typography variant="caption" fontWeight={600}>
              {[...new Set(alerts.map(a => a.client))].length}
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

export default EnterpriseAlertsPanel;
