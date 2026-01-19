'use client'
import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Stack, 
  Chip, 
  Box,
  IconButton,
  Tooltip,
  LinearProgress,
  Divider
} from '@mui/material';
import { 
  IconAlertTriangle, 
  IconTrendingUp, 
  IconTrendingDown,
  IconRefresh, 
  IconEye,
  IconArrowRight,
  IconMapPin,
  IconClock,
  IconBuilding,
  IconWallet
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface B2BAlertItem {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  value: string;
  trend: number;
  location?: string;
  category?: string;
  timestamp: string;
  client?: string;
  action?: string;
}

const B2BAlertsPanel: React.FC = () => {
  const alerts: B2BAlertItem[] = [
    {
      id: '1',
      type: 'error',
      title: 'Critical Payment Overdue',
      description: 'Abuja Logistics Hub payment 25 days overdue, requires immediate escalation',
      value: '₦1.5M',
      trend: 25,
      location: 'Abuja',
      category: 'Collections',
      timestamp: '2h ago',
      client: 'Abuja Logistics Hub',
      action: 'Escalate'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Revenue Drop Detected',
      description: 'Lagos Industries revenue down 15% from previous period',
      value: '-15%',
      trend: -15,
      location: 'Lagos',
      category: 'Revenue',
      timestamp: '4h ago',
      client: 'Lagos Industries',
      action: 'Investigate'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Contract Expiry Soon',
      description: 'Port Harcourt Manufacturing contract expires in 30 days',
      value: '30 days',
      trend: 0,
      location: 'Port Harcourt',
      category: 'Contracts',
      timestamp: '1d ago',
      client: 'Port Harcourt Manufacturing',
      action: 'Renew'
    },
    {
      id: '4',
      type: 'info',
      title: 'New Payment Method Added',
      description: 'Kano Food Processing enabled automated payments',
      value: 'Active',
      trend: 0,
      location: 'Kano',
      category: 'Payments',
      timestamp: '2d ago',
      client: 'Kano Food Processing',
      action: 'Review'
    },
    {
      id: '5',
      type: 'warning',
      title: 'Collection Volume Down',
      description: 'Ibadan Textiles waste collection volume decreased by 20%',
      value: '-20%',
      trend: -20,
      location: 'Ibadan',
      category: 'Operations',
      timestamp: '3d ago',
      client: 'Ibadan Textiles Ltd',
      action: 'Analyze'
    }
  ];

  const getAlertColor = (type: B2BAlertItem['type']) => {
    if (type === 'error') return 'error';
    if (type === 'warning') return 'warning';
    return 'info';
  };

  const getAlertIcon = (type: B2BAlertItem['type']) => {
    if (type === 'error') return <IconAlertTriangle size={18} />;
    if (type === 'warning') return <IconTrendingUp size={18} />;
    return <IconRefresh size={18} />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'error.main';
    if (trend < 0) return 'warning.main';
    return 'text.secondary';
  };

  return (
    <DashboardCard title="B2B Alerts & Flags">
      <Grid container spacing={3}>
        {alerts.map((alert) => (
          <Grid size={{ xs: 12, sm: 6, md: 6 }} key={alert.id}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                borderLeft: `4px solid`,
                borderLeftColor: `${getAlertColor(alert.type)}.main`,
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Stack spacing={2}>
                  {/* Header */}
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
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
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {alert.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {alert.category}
                      </Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={alert.value}
                      color={getAlertColor(alert.type) as any}
                      variant="outlined"
                    />
                  </Stack>

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary">
                    {alert.description}
                  </Typography>

                  {/* Meta */}
                  <Stack direction="row" spacing={3} flexWrap="wrap">
                    {alert.client && (
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <IconBuilding size={14} />
                        <Typography variant="caption" noWrap>{alert.client}</Typography>
                      </Stack>
                    )}
                    {alert.location && (
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <IconMapPin size={14} />
                        <Typography variant="caption">{alert.location}</Typography>
                      </Stack>
                    )}
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <IconClock size={14} />
                      <Typography variant="caption">{alert.timestamp}</Typography>
                    </Stack>
                  </Stack>

                  <Divider />

                  {/* Footer */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      {alert.trend !== 0 && (
                        <>
                          {alert.trend > 0 ? <IconTrendingUp size={16} /> : <IconTrendingDown size={16} />}
                          <Typography variant="caption" fontWeight={600} color={getTrendColor(alert.trend)}>
                            {alert.trend > 0 ? '+' : ''}{alert.trend}%
                          </Typography>
                        </>
                      )}
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Tooltip title="View details">
                        <IconButton size="small">
                          <IconEye size={16} />
                        </IconButton>
                      </Tooltip>
                      {alert.action && (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Typography variant="caption" color="primary.main" fontWeight={600}>
                            {alert.action}
                          </Typography>
                          <IconArrowRight size={14} />
                        </Stack>
                      )}
                    </Stack>
                  </Stack>

                  {/* Progress Bar */}
                  {alert.trend !== 0 && (
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(Math.abs(alert.trend), 100)}
                      sx={{
                        height: 5,
                        borderRadius: 2,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getTrendColor(alert.trend),
                        },
                      }}
                    />
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Summary */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Alert Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 4 }}>
            <Typography variant="caption">Active Alerts</Typography>
            <Typography variant="caption" fontWeight={600}>{alerts.length}</Typography>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography variant="caption">Critical Issues</Typography>
            <Typography variant="caption" fontWeight={600} color="error.main">
              {alerts.filter(a => a.type === 'error').length}
            </Typography>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography variant="caption">Last Updated</Typography>
            <Typography variant="caption" fontWeight={600}>2 min ago</Typography>
          </Grid>
        </Grid>
      </Box>
    </DashboardCard>
  );
};

export default B2BAlertsPanel;