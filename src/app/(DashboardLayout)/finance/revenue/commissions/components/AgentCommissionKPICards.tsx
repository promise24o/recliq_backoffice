'use client'
import React from 'react';
import { Grid, Card, CardContent, Typography, Stack, Box, Avatar, Chip } from '@mui/material';
import { 
  IconBriefcase, 
  IconUser, 
  IconPackage, 
  IconTrendingUp,
  IconArrowUpLeft,
  IconArrowDownRight
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend: number;
  color: string;
  onClick?: () => void;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, subtitle, icon, trend, color, onClick }) => {
  const getTrendIcon = () => {
    if (trend > 0) return <IconArrowUpLeft size={16} color="#13DEB9" />;
    if (trend < 0) return <IconArrowDownRight size={16} color="#FF6B6B" />;
    return null;
  };

  const getTrendColor = () => {
    if (trend > 0) return 'success.main';
    if (trend < 0) return 'error.main';
    return 'text.secondary';
  };

  return (
    <Card 
      variant="outlined"
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack spacing={2} sx={{ flex: 1 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: color + '.light',
                color: color + '.main',
              }}
            >
              {icon}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" fontWeight={700}>
                {value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
            </Box>
          </Stack>
          
          <Stack direction="row" spacing={1} alignItems="center">
            {getTrendIcon() && (
              <Avatar sx={{ bgcolor: 'grey.100', width: 24, height: 24 }}>
                {getTrendIcon()}
              </Avatar>
            )}
            <Typography variant="caption" color={getTrendColor()}>
              {trend > 0 ? '+' : ''}{trend}% vs last period
            </Typography>
          </Stack>
          
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

const AgentCommissionKPICards: React.FC = () => {
  const kpiData = [
    {
      title: 'Total Commission Earned',
      value: '₦18,450,000',
      subtitle: 'Platform earnings from agents',
      icon: <IconBriefcase size={24} />,
      trend: 7,
      color: 'primary'
    },
    {
      title: 'Active Commissioned Agents',
      value: '214',
      subtitle: 'Agents earning commission',
      icon: <IconUser size={24} />,
      trend: 12,
      color: 'success'
    },
    {
      title: 'Commissioned Pickups',
      value: '3,892',
      subtitle: 'Total pickups with commission',
      icon: <IconPackage size={24} />,
      trend: 5,
      color: 'info'
    },
    {
      title: 'Avg Commission per Pickup',
      value: '₦475',
      subtitle: 'Average earnings per pickup',
      icon: <IconTrendingUp size={24} />,
      trend: -2,
      color: 'warning'
    },
    {
      title: 'Commission Rate (Avg)',
      value: '12%',
      subtitle: 'Average commission percentage',
      icon: <IconBriefcase size={24} />,
      trend: 0,
      color: 'secondary'
    }
  ];

  return (
    <DashboardCard title="Commission Overview">
      <Grid container spacing={3}>
        {kpiData.map((kpi, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={index}>
            <KPICard {...kpi} />
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
};

export default AgentCommissionKPICards;
