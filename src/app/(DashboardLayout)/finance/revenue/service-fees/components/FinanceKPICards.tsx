import React from 'react';
import { Grid, Typography, Box, Card, CardContent, Stack, Chip } from '@mui/material';
import { 
  IconReceipt, 
  IconPackage, 
  IconScale, 
  IconAlertTriangle,
  IconTrendingUp,
  IconTrendingDown
} from '@tabler/icons-react';
import DashboardCard from '../../../../../components/shared/DashboardCard';

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  trend: number;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'error';
}

const KPICard: React.FC<KPICardProps> = ({ title, value, subtitle, trend, icon, color }) => {
  const isPositive = trend >= 0;
  
  return (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 8,
        },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: `${color}.light`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: `${color}.main`,
              }}
            >
              {icon}
            </Box>
            
            <Stack direction="row" spacing={0.5} alignItems="center">
              {isPositive ? (
                <IconTrendingUp size={16} color="success" />
              ) : (
                <IconTrendingDown size={16} color="error" />
              )}
              <Typography
                variant="caption"
                fontWeight={600}
                color={isPositive ? 'success.main' : 'error.main'}
              >
                {isPositive ? '+' : ''}{trend}%
              </Typography>
            </Stack>
          </Box>
          
          <Box>
            <Typography variant="h4" fontWeight={700} color={`${color}.main`}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

const FinanceKPICards: React.FC = () => {
  const kpiData = [
    {
      title: 'Total Fees Collected',
      value: '₦12,480,000',
      subtitle: '+8% vs last period',
      trend: 8,
      icon: <IconReceipt size={24} />,
      color: 'primary' as const,
    },
    {
      title: 'Total Transactions',
      value: '4,892',
      subtitle: 'completed pickups',
      trend: 12,
      icon: <IconPackage size={24} />,
      color: 'success' as const,
    },
    {
      title: 'Avg Fee per Transaction',
      value: '₦255',
      subtitle: 'per transaction',
      trend: -3,
      icon: <IconScale size={24} />,
      color: 'warning' as const,
    },
    {
      title: 'Fees per KG',
      value: '₦18',
      subtitle: 'average per kg',
      trend: 5,
      icon: <IconPackage size={24} />,
      color: 'success' as const,
    },
    {
      title: 'Adjustments / Penalties',
      value: '₦145,000',
      subtitle: 'total adjustments',
      trend: 15,
      icon: <IconAlertTriangle size={24} />,
      color: 'error' as const,
    },
  ];

  return (
    <Grid container spacing={3}>
      {kpiData.map((kpi, index) => (
        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }} key={index}>
          <KPICard {...kpi} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FinanceKPICards;
