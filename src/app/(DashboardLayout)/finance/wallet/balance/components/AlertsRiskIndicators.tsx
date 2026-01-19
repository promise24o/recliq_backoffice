'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, Chip, Alert, AlertTitle, LinearProgress } from '@mui/material';
import { 
  IconAlertTriangle,
  IconTrendingUp,
  IconCurrencyNaira,
  IconClock,
  IconRefresh,
  IconCheck,
  IconX,
  IconInfoCircle
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface AlertItem {
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  description: string;
  value?: string;
  threshold?: string;
  trend?: 'up' | 'down' | 'stable';
}

interface RiskIndicator {
  label: string;
  value: number;
  threshold: number;
  status: 'safe' | 'warning' | 'critical';
  description: string;
}

const AlertsRiskIndicators: React.FC = () => {
  const alerts: AlertItem[] = [
    {
      type: 'warning',
      title: 'Low Available Balance',
      description: 'Available balance is approaching minimum threshold for daily operations',
      value: '₦82.3M',
      threshold: '₦100M minimum',
      trend: 'down'
    },
    {
      type: 'error',
      title: 'Provider Sync Failure',
      description: 'Manual Settlements provider has not synced in over 3 hours',
      value: '3 hours ago',
      threshold: 'Sync every 30 mins',
      trend: 'stable'
    },
    {
      type: 'warning',
      title: 'High Reserve Ratio',
      description: 'Reserved funds represent 24.8% of total balance',
      value: '24.8%',
      threshold: 'Below 20% recommended',
      trend: 'up'
    },
    {
      type: 'info',
      title: 'Unusual Float Growth',
      description: 'Platform balance increased by 12% in the last 24 hours',
      value: '+12%',
      threshold: 'Normal: 5-8%',
      trend: 'up'
    }
  ];

  const riskIndicators: RiskIndicator[] = [
    {
      label: 'Available Ratio',
      value: 64.1,
      threshold: 50,
      status: 'safe',
      description: 'Percentage of funds available for immediate payouts'
    },
    {
      label: 'Reserve Ratio',
      value: 24.8,
      threshold: 30,
      status: 'warning',
      description: 'Percentage of funds reserved for pending transactions'
    },
    {
      label: 'Risk Exposure',
      value: 11.1,
      threshold: 15,
      status: 'safe',
      description: 'Percentage of restricted funds (disputes, holds)'
    },
    {
      label: 'Provider Variance',
      value: 2.3,
      threshold: 5,
      status: 'safe',
      description: 'Total variance between internal ledger and providers'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <IconX size={16} />;
      case 'warning': return <IconAlertTriangle size={16} />;
      case 'info': return <IconInfoCircle size={16} />;
      case 'success': return <IconCheck size={16} />;
      default: return <IconAlertTriangle size={16} />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <IconTrendingUp size={14} color="orange" />;
      case 'down': return <IconTrendingUp size={14} color="red" style={{ transform: 'rotate(180deg)' }} />;
      case 'stable': return <IconClock size={14} color="gray" />;
      default: return null;
    }
  };

  const getRiskColor = (status: string) => {
    switch (status) {
      case 'safe': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const getProgressColor = (value: number, threshold: number) => {
    if (value <= threshold * 0.7) return 'success';
    if (value <= threshold * 0.9) return 'warning';
    return 'error';
  };

  return (
    <DashboardCard title="Alerts & Risk Indicators">
      <Box sx={{ width: '100%' }}>
        {/* Alerts Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Active Alerts
          </Typography>
          <Stack spacing={2}>
            {alerts.map((alert, index) => (
              <Alert 
                key={index}
                severity={alert.type}
                variant="outlined"
                icon={getAlertIcon(alert.type)}
                sx={{ 
                  '& .MuiAlert-message': { width: '100%' }
                }}
              >
                <AlertTitle sx={{ fontWeight: 600 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <span>{alert.title}</span>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {alert.trend && getTrendIcon(alert.trend)}
                      <Typography variant="caption" fontWeight={600}>
                        {alert.value}
                      </Typography>
                    </Stack>
                  </Stack>
                </AlertTitle>
                <Typography variant="body2">
                  {alert.description}
                </Typography>
                {alert.threshold && (
                  <Typography variant="caption" color="text.secondary">
                    Threshold: {alert.threshold}
                  </Typography>
                )}
              </Alert>
            ))}
          </Stack>
        </Box>

        {/* Risk Indicators Section */}
        <Box>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Risk Indicators
          </Typography>
          <Stack spacing={2}>
            {riskIndicators.map((indicator, index) => (
              <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body1" fontWeight={600}>
                        {indicator.label}
                      </Typography>
                      <Chip
                        size="small"
                        label={indicator.status.toUpperCase()}
                        color={getRiskColor(indicator.status) as any}
                        variant="outlined"
                      />
                    </Stack>
                    
                    <Box>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="h6" fontWeight={700} color={getRiskColor(indicator.status) + '.main' as any}>
                          {indicator.value}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Threshold: {indicator.threshold}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min((indicator.value / indicator.threshold) * 100, 100)}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getRiskColor(indicator.status) + '.main' as any,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary">
                      {indicator.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Quick Summary */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Risk Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Overall Risk Level</Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                MODERATE
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Active Alerts</Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {alerts.filter(a => a.type === 'error').length} Critical, {alerts.filter(a => a.type === 'warning').length} Warning
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Liquidity Status</Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                STABLE
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Last Risk Assessment</Typography>
              <Typography variant="caption" fontWeight={600}>
                {new Date().toLocaleString()}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default AlertsRiskIndicators;
