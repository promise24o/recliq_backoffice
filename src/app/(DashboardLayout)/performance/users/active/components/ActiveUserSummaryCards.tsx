'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Chip } from '@mui/material';
import { 
  IconUsers,
  IconTrendingUp,
  IconRefresh,
  IconAlertTriangle,
  IconActivity
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface ActiveUserCardProps {
  title: string;
  amount?: number;
  value?: string;
  percentage?: number;
  description: string;
  icon: React.ReactNode;
  color: 'success' | 'warning' | 'error' | 'info';
  trend?: number;
  onClick?: () => void;
}

const ActiveUserCard: React.FC<ActiveUserCardProps> = ({ title, amount, value, percentage, description, icon, color, trend, onClick }) => {
  const getColor = (colorType: string) => {
    switch (colorType) {
      case 'success': return 'success.main';
      case 'warning': return 'warning.main';
      case 'error': return 'error.main';
      case 'info': return 'info.main';
      default: return 'primary.main';
    }
  };

  const getBgColor = (colorType: string) => {
    switch (colorType) {
      case 'success': return 'success.light';
      case 'warning': return 'warning.light';
      case 'error': return 'error.light';
      case 'info': return 'info.light';
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
            {trend !== undefined && (
              <Chip
                size="small"
                label={`${trend > 0 ? '+' : ''}${trend}%`}
                color={trend > 0 ? 'success' : 'error'}
                variant="outlined"
              />
            )}
          </Stack>
          
          <Box>
            {amount !== undefined && (
              <Typography variant="h4" fontWeight={700} color={getColor(color)}>
                {amount.toLocaleString()}
              </Typography>
            )}
            {value !== undefined && (
              <Typography variant="h4" fontWeight={700} color={getColor(color)}>
                {value}
              </Typography>
            )}
            {percentage !== undefined && (
              <Typography variant="h4" fontWeight={700} color={getColor(color)}>
                {percentage}%
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

const ActiveUserSummaryCards: React.FC = () => {
  const activeUserCards = [
    {
      title: 'Active Users',
      amount: 3842,
      description: 'Users with meaningful activity in selected period',
      icon: <IconUsers size={24} />,
      trend: 12.5,
      color: 'success' as const,
    },
    {
      title: 'Activity Growth',
      percentage: 12,
      description: 'Growth compared to previous period',
      icon: <IconTrendingUp size={24} />,
      trend: 3.2,
      color: 'success' as const,
    },
    {
      title: 'Repeat Users',
      amount: 2106,
      description: 'Users with multiple activities in period',
      icon: <IconRefresh size={24} />,
      trend: 8.7,
      color: 'info' as const,
    },
    {
      title: 'Inactive Users',
      amount: 418,
      description: 'Previously active users with no recent activity',
      icon: <IconAlertTriangle size={24} />,
      trend: -5.3,
      color: 'warning' as const,
    },
    {
      title: 'Avg Actions per User',
      value: '3.4',
      description: 'Average meaningful actions per active user',
      icon: <IconActivity size={24} />,
      trend: 1.8,
      color: 'success' as const,
    }
  ];

  const handleCardClick = (title: string) => {
    // Filter logic would be implemented here
    console.log(`Filter by ${title}`);
  };

  return (
    <DashboardCard title="Active User Summary">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(5, 1fr)' }, gap: 2 }}>
        {activeUserCards.map((card, index) => (
          <ActiveUserCard
            key={index}
            title={card.title}
            amount={card.amount}
            value={card.value}
            percentage={card.percentage}
            description={card.description}
            icon={card.icon}
            trend={card.trend}
            color={card.color}
            onClick={() => handleCardClick(card.title)}
          />
        ))}
      </Box>
    </DashboardCard>
  );
};

export default ActiveUserSummaryCards;
