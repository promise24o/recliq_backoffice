'use client'
import React from 'react';
import { Box, Typography, Stack, Chip, Card, CardContent, Avatar, LinearProgress, Grid } from '@mui/material';
import { 
  IconCheck, 
  IconAlertTriangle,
  IconClock,
  IconServer,
  IconActivity,
  IconTrendingUp,
  IconTrendingDown
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface ProviderHealth {
  id: string;
  name: string;
  logo: string;
  uptime: number;
  errorRate: number;
  lastOutage: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTime: number;
  successRate: number;
  volume: number;
}

const ProviderHealthIndicators: React.FC = () => {
  const providers: ProviderHealth[] = [
    {
      id: '1',
      name: 'Flutterwave',
      logo: 'FW',
      uptime: 99.8,
      errorRate: 0.2,
      lastOutage: '2 days ago',
      status: 'healthy',
      responseTime: 245,
      successRate: 99.8,
      volume: 2847
    },
    {
      id: '2',
      name: 'Paystack',
      logo: 'PS',
      uptime: 98.5,
      errorRate: 1.5,
      lastOutage: '6 hours ago',
      status: 'degraded',
      responseTime: 312,
      successRate: 98.5,
      volume: 1956
    },
    {
      id: '3',
      name: 'GTBank USSD',
      logo: 'GT',
      uptime: 99.2,
      errorRate: 0.8,
      lastOutage: '1 day ago',
      status: 'healthy',
      responseTime: 456,
      successRate: 99.2,
      volume: 823
    },
    {
      id: '4',
      name: 'Zenith Bank',
      logo: 'ZN',
      uptime: 97.8,
      errorRate: 2.2,
      lastOutage: '3 hours ago',
      status: 'degraded',
      responseTime: 523,
      successRate: 97.8,
      volume: 612
    },
    {
      id: '5',
      name: 'Access Bank',
      logo: 'AB',
      uptime: 99.9,
      errorRate: 0.1,
      lastOutage: '1 week ago',
      status: 'healthy',
      responseTime: 198,
      successRate: 99.9,
      volume: 445
    },
    {
      id: '6',
      name: 'First Bank',
      logo: 'FB',
      uptime: 96.5,
      errorRate: 3.5,
      lastOutage: '30 mins ago',
      status: 'down',
      responseTime: 892,
      successRate: 96.5,
      volume: 289
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'success';
      case 'degraded': return 'warning';
      case 'down': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <IconCheck size={16} />;
      case 'degraded': return <IconAlertTriangle size={16} />;
      case 'down': return <IconClock size={16} />;
      default: return null;
    }
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99.5) return 'success.main';
    if (uptime >= 98.0) return 'warning.main';
    return 'error.main';
  };

  const getResponseTimeColor = (time: number) => {
    if (time <= 300) return 'success.main';
    if (time <= 500) return 'warning.main';
    return 'error.main';
  };

  const getErrorRateColor = (rate: number) => {
    if (rate <= 1.0) return 'success.main';
    if (rate <= 2.0) return 'warning.main';
    return 'error.main';
  };

  return (
    <DashboardCard title="Provider Health Indicators">
      <Grid container spacing={2}>
        {providers.map((provider) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={provider.id}>
            <Card
              variant="outlined"
              sx={{
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                borderLeft: `3px solid`,
                borderLeftColor: `${getStatusColor(provider.status)}.main`,
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
                <Stack spacing={2} sx={{ flex: 1 }}>
                  {/* Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: 'primary.light',
                          color: 'primary.main',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          flexShrink: 0,
                        }}
                      >
                        {provider.logo}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {provider.name}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {getStatusIcon(provider.status)}
                          <Chip
                            size="small"
                            label={provider.status}
                            color={getStatusColor(provider.status) as any}
                            variant="outlined"
                          />
                        </Stack>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
                      <IconServer size={16} color="text.secondary" />
                    </Stack>
                  </Stack>

                  {/* Metrics */}
                  <Stack spacing={1.5}>
                    {/* Uptime */}
                    <Box>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <IconActivity size={14} />
                          <Typography variant="caption" color="text.secondary">
                            Uptime
                          </Typography>
                        </Stack>
                        <Typography variant="caption" fontWeight={600} color={getUptimeColor(provider.uptime)}>
                          {provider.uptime}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={provider.uptime}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getUptimeColor(provider.uptime),
                          },
                        }}
                      />
                    </Box>

                    {/* Error Rate */}
                    <Box>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Error Rate
                        </Typography>
                        <Typography variant="caption" fontWeight={600} color={getErrorRateColor(provider.errorRate)}>
                          {provider.errorRate}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={provider.errorRate}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getErrorRateColor(provider.errorRate),
                          },
                        }}
                      />
                    </Box>

                    {/* Response Time */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" color="text.secondary">
                        Response Time
                      </Typography>
                      <Typography variant="caption" fontWeight={600} color={getResponseTimeColor(provider.responseTime)}>
                        {provider.responseTime}ms
                      </Typography>
                    </Stack>

                    {/* Success Rate */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" color="text.secondary">
                        Success Rate
                      </Typography>
                      <Typography variant="caption" fontWeight={600} color={getUptimeColor(provider.successRate)}>
                        {provider.successRate}%
                      </Typography>
                    </Stack>

                    {/* Volume */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" color="text.secondary">
                        Volume (24h)
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        {provider.volume}
                      </Typography>
                    </Stack>

                    {/* Last Outage */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" color="text.secondary">
                        Last Outage
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        {provider.lastOutage}
                      </Typography>
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
          Provider Health Summary
        </Typography>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Total Providers</Typography>
            <Typography variant="caption" fontWeight={600}>{providers.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Healthy</Typography>
            <Typography variant="caption" fontWeight={600} color="success.main">
              {providers.filter(p => p.status === 'healthy').length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Degraded</Typography>
            <Typography variant="caption" fontWeight={600} color="warning.main">
              {providers.filter(p => p.status === 'degraded').length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Down</Typography>
            <Typography variant="caption" fontWeight={600} color="error.main">
              {providers.filter(p => p.status === 'down').length}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Average Uptime</Typography>
            <Typography variant="caption" fontWeight={600}>
              {(providers.reduce((sum, p) => sum + p.uptime, 0) / providers.length).toFixed(1)}%
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">Total Volume (24h)</Typography>
            <Typography variant="caption" fontWeight={600}>
              {providers.reduce((sum, p) => sum + p.volume, 0).toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default ProviderHealthIndicators;
