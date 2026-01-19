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
  IconMapPin,
  IconClock,
  IconUser,
  IconCurrencyNaira
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface AlertItem {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  value: string;
  trend: number;
  location?: string;
  agent?: string;
  timestamp: string;
  action: string;
}

const CommissionAlertsPanel: React.FC = () => {
  const alerts: AlertItem[] = [
    {
      id: '1',
      type: 'error',
      title: 'Unusually High Commission',
      description: 'Agent Ahmed Bello earned 45% commission on pickup PU-2024-0142',
      value: '+45%',
      trend: 45,
      agent: 'Ahmed Bello',
      location: 'Lagos Mainland',
      timestamp: '2h ago',
      action: 'Review'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Zero Commission Pickup',
      description: 'B2B pickup PU-2024-0145 processed with 0% commission rate',
      value: '0%',
      trend: 0,
      agent: 'Chukwu Okafor',
      location: 'Abuja',
      timestamp: '4h ago',
      action: 'Investigate'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Agent Below Expected Margin',
      description: 'Fatima Ibrahim commission rate 8% below expected 12%',
      value: '-4%',
      trend: -4,
      agent: 'Fatima Ibrahim',
      location: 'Lagos Island',
      timestamp: '6h ago',
      action: 'Adjust'
    },
    {
      id: '4',
      type: 'info',
      title: 'New Commission Rule Applied',
      description: 'Premium material rate (15%) applied to e-waste pickup',
      value: '+3%',
      trend: 3,
      agent: 'Amina Yusuf',
      location: 'Port Harcourt',
      timestamp: '8h ago',
      action: 'View'
    },
    {
      id: '5',
      type: 'error',
      title: 'Commission Calculation Error',
      description: 'Duplicate commission detected for pickup PU-2024-0148',
      value: 'Duplicate',
      trend: 0,
      agent: 'Tunde Adekunle',
      location: 'Lagos Mainland',
      timestamp: '12h ago',
      action: 'Fix'
    },
    {
      id: '6',
      type: 'warning',
      title: 'Commission Rate Anomaly',
      description: 'Agent commission rate fluctuating unusually',
      value: '±2%',
      trend: 2,
      agent: 'Samuel Ade',
      location: 'Lagos Island',
      timestamp: '1h ago',
      action: 'Monitor'
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

  return (
    <DashboardCard title="Commission Alerts & Anomalies">
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

                  {/* Meta Information */}
                  <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ flex: 1, alignItems: 'center' }}>
                    {alert.agent && (
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexShrink: 0, minWidth: 0 }}>
                        <IconUser size={14} />
                        <Typography variant="caption" noWrap>{alert.agent}</Typography>
                      </Stack>
                    )}
                    {alert.location && (
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexShrink: 0, minWidth: 0 }}>
                        <IconMapPin size={14} />
                        <Typography variant="caption">{alert.location}</Typography>
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
                            {alert.trend > 0 ? '+' : ''}{alert.trend}%
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
            <Typography variant="caption">Last Updated</Typography>
            <Typography variant="caption" fontWeight={600}>2 min ago</Typography>
          </Box>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default CommissionAlertsPanel;
