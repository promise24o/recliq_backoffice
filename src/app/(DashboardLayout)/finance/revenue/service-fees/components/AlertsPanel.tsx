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
  Divider,
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
  IconRecycle,
  IconWallet,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface AlertItem {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  description: string;
  value: string;
  trend: number;
  location?: string;
  category?: string;
  timestamp: string;
  sla?: string;
  action?: string;
}

const AlertsPanel: React.FC = () => {
  const alerts: AlertItem[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Unusual Fee Spike',
      description: 'Convenience fees increased sharply beyond normal variance',
      value: '₦450K',
      trend: 25,
      location: 'Port Harcourt',
      category: 'Finance',
      timestamp: '2h ago',
      sla: '4h',
      action: 'Investigate',
    },
    {
      id: '2',
      type: 'error',
      title: 'High Penalty Frequency',
      description: 'Agent penalties exceeded acceptable platform threshold',
      value: '7.2%',
      trend: 15,
      location: 'Obio/Akpor',
      category: 'Agents',
      timestamp: '1h ago',
      sla: 'Immediate',
      action: 'Review',
    },
    {
      id: '3',
      type: 'info',
      title: 'Failed Settlements',
      description: 'Some wallet payouts failed during processing',
      value: '3',
      trend: 0,
      location: 'System',
      category: 'Wallet',
      timestamp: 'Today',
      sla: '2h',
      action: 'Retry',
    },
    {
      id: '4',
      type: 'warning',
      title: 'Low Recycling Volume',
      description: 'Drop in pickups and waste volume collected',
      value: '-12%',
      trend: -12,
      location: 'Uyo',
      category: 'Operations',
      timestamp: 'Today',
      sla: '8h',
      action: 'Analyze',
    },
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
    if (trend < 0) return 'success.main';
    return 'text.secondary';
  };

  return (
    <DashboardCard title="Alerts & Flags">
      <Grid container spacing={3}>
        {alerts.map((alert) => (
          <Grid size={{ xs: 12, md: 6 }} key={alert.id}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  {/* Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '10px',
                          bgcolor: `${getAlertColor(alert.type)}.light`,
                          color: `${getAlertColor(alert.type)}.main`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {getAlertIcon(alert.type)}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700}>
                          {alert.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {alert.category}
                        </Typography>
                      </Box>
                    </Stack>

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
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <IconMapPin size={14} />
                      <Typography variant="caption">{alert.location}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <IconClock size={14} />
                      <Typography variant="caption">{alert.timestamp}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <IconRecycle size={14} />
                      <Typography variant="caption">SLA: {alert.sla}</Typography>
                    </Stack>
                  </Stack>

                  <Divider />

                  {/* Trend */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      {alert.trend >= 0 ? (
                        <IconTrendingUp size={14} />
                      ) : (
                        <IconTrendingDown size={14} />
                      )}
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        color={getTrendColor(alert.trend)}
                      >
                        {alert.trend > 0 ? '+' : ''}
                        {alert.trend}% vs previous period
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
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

                  <LinearProgress
                    variant="determinate"
                    value={Math.min(Math.abs(alert.trend), 100)}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getTrendColor(alert.trend),
                      },
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
};

export default AlertsPanel;
