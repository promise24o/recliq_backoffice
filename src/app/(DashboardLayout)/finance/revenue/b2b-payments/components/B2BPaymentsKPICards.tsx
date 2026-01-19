'use client'
import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Stack, 
  Box,
  LinearProgress
} from '@mui/material';
import { 
  IconBuilding, 
  IconFileText, 
  IconCheck, 
  IconClock, 
  IconAlertTriangle, 
  IconTrendingUp
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend: number;
  color: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, subtitle, icon, trend, color }) => {
  const getTrendColor = (trendValue: number) => {
    if (trendValue > 0) return 'success.main';
    if (trendValue < 0) return 'error.main';
    return 'text.secondary';
  };

  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* Icon and Title */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: `${color}.light`,
                color: `${color}.main`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </Box>
            <Stack direction="row" spacing={0.5} alignItems="center">
              {trend > 0 && <IconTrendingUp size={16} color="green" />}
              <Typography 
                variant="caption" 
                color={getTrendColor(trend)}
                fontWeight={600}
              >
                {trend > 0 ? '+' : ''}{trend}%
              </Typography>
            </Stack>
          </Stack>

          {/* Value */}
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>

          {/* Title and Subtitle */}
          <Box>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>

          {/* Progress Bar */}
          <LinearProgress
            variant="determinate"
            value={Math.min(Math.abs(trend), 100)}
            sx={{
              height: 4,
              borderRadius: 2,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                bgcolor: getTrendColor(trend),
              },
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

const B2BPaymentsKPICards: React.FC = () => {
  const kpiData = [
    {
      title: 'Total Enterprise Revenue',
      value: '₦128,450,000',
      subtitle: 'Current period earnings',
      icon: <IconBuilding size={24} />,
      trend: 12,
      color: 'primary'
    },
    {
      title: 'Invoices Issued',
      value: '312',
      subtitle: 'This month',
      icon: <IconFileText size={24} />,
      trend: 8,
      color: 'info'
    },
    {
      title: 'Invoices Paid',
      value: '278',
      subtitle: 'Successfully collected',
      icon: <IconCheck size={24} />,
      trend: 15,
      color: 'success'
    },
    {
      title: 'Outstanding Payments',
      value: '₦18,900,000',
      subtitle: 'Pending collection',
      icon: <IconClock size={24} />,
      trend: -5,
      color: 'warning'
    },
    {
      title: 'Overdue Invoices',
      value: '14',
      subtitle: 'Require attention',
      icon: <IconAlertTriangle size={24} />,
      trend: -20,
      color: 'error'
    },
    {
      title: 'Avg Payment Cycle',
      value: '12 days',
      subtitle: 'From invoice to payment',
      icon: <IconTrendingUp size={24} />,
      trend: -8,
      color: 'secondary'
    }
  ];

  return (
    <Grid container spacing={3}>
      {kpiData.map((kpi, index) => (
        <Grid size={{ xs: 12, sm: 4, md: 4 }} key={index}>
          <KPICard {...kpi} />
        </Grid>
      ))}
    </Grid>
  );
};

export default B2BPaymentsKPICards;
