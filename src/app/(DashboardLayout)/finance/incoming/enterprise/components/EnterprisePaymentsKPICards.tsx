'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Chip } from '@mui/material';
import { 
  IconBuildingFactory, 
  IconFileText, 
  IconCheck, 
  IconClock, 
  IconAlertTriangle,
  IconCalendar,
  IconTrendingUp, 
  IconTrendingDown 
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend: number;
  color: 'success' | 'warning' | 'error' | 'info' | 'primary';
  onClick?: () => void;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, subtitle, icon, trend, color, onClick }) => {
  const getColor = (colorType: string) => {
    switch (colorType) {
      case 'success': return 'success.main';
      case 'warning': return 'warning.main';
      case 'error': return 'error.main';
      case 'info': return 'info.main';
      case 'primary': return 'primary.main';
      default: return 'primary.main';
    }
  };

  const getBgColor = (colorType: string) => {
    switch (colorType) {
      case 'success': return 'success.light';
      case 'warning': return 'warning.light';
      case 'error': return 'error.light';
      case 'info': return 'info.light';
      case 'primary': return 'primary.light';
      default: return 'primary.light';
    }
  };

  return (
    <Card
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.25s ease',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: 3,
          borderColor: getColor(color),
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: getBgColor(color),
                color: getColor(color),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </Box>
            {trend !== 0 && (
              <Chip
                size="small"
                label={`${trend > 0 ? '+' : ''}${trend}%`}
                color={trend > 0 ? 'success' : 'error'}
                variant="outlined"
                icon={trend > 0 ? <IconTrendingUp size={14} /> : <IconTrendingDown size={14} />}
              />
            )}
          </Stack>
          
          <Box>
            <Typography variant="h4" fontWeight={700} color={getColor(color)}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
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

const EnterprisePaymentsKPICards: React.FC = () => {
  const kpiData = [
    {
      title: 'Total Enterprise Payments',
      value: '₦185,420,000',
      subtitle: 'From corporate clients',
      icon: <IconBuildingFactory size={24} />,
      trend: 15,
      color: 'success' as const,
    },
    {
      title: 'Invoices Issued',
      value: '412',
      subtitle: 'Enterprise invoices',
      icon: <IconFileText size={24} />,
      trend: 8,
      color: 'info' as const,
    },
    {
      title: 'Payments Received',
      value: '₦156,300,000',
      subtitle: 'Collected amount',
      icon: <IconCheck size={24} />,
      trend: 12,
      color: 'success' as const,
    },
    {
      title: 'Outstanding Amount',
      value: '₦29,120,000',
      subtitle: 'Unpaid invoices',
      icon: <IconClock size={24} />,
      trend: -5,
      color: 'warning' as const,
    },
    {
      title: 'Overdue Invoices',
      value: '18',
      subtitle: 'Past due date',
      icon: <IconAlertTriangle size={24} />,
      trend: -12,
      color: 'error' as const,
    },
    {
      title: 'Avg Payment Cycle',
      value: '14 days',
      subtitle: 'From invoice to payment',
      icon: <IconCalendar size={24} />,
      trend: -3,
      color: 'primary' as const,
    },
  ];

  return (
    <DashboardCard title="Enterprise Payment Summary">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(6, 1fr)' }, gap: 2 }}>
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            subtitle={kpi.subtitle}
            icon={kpi.icon}
            trend={kpi.trend}
            color={kpi.color}
            onClick={() => {
              // Filter logic would be implemented here
              console.log(`Filter by ${kpi.title}`);
            }}
          />
        ))}
      </Box>
    </DashboardCard>
  );
};

export default EnterprisePaymentsKPICards;
