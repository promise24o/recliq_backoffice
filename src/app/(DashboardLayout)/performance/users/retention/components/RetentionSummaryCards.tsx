'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Chip } from '@mui/material';
import { 
  IconRefresh,
  IconTrendingDown,
  IconUsers,
  IconActivity,
  IconAlertTriangle,
  IconRecycle
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface RetentionCardProps {
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

const RetentionCard: React.FC<RetentionCardProps> = ({ title, amount, value, percentage, description, icon, color, trend, onClick }) => {
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

const RetentionSummaryCards: React.FC = () => {
  const retentionCards = [
    {
      title: 'Retention Rate (30-day)',
      percentage: 62,
      description: 'Users still active after 30 days',
      icon: <IconRefresh size={24} />,
      trend: 5.3,
      color: 'success' as const,
    },
    {
      title: 'Churn Rate',
      percentage: 38,
      description: 'Users who stopped recycling',
      icon: <IconTrendingDown size={24} />,
      trend: -5.3,
      color: 'error' as const,
    },
    {
      title: 'New Users (Period)',
      amount: 1240,
      description: 'New users in selected period',
      icon: <IconUsers size={24} />,
      trend: 12.7,
      color: 'info' as const,
    },
    {
      title: 'Returning Users',
      amount: 768,
      description: 'Users who came back for more recycling',
      icon: <IconActivity size={24} />,
      trend: 8.9,
      color: 'success' as const,
    },
    {
      title: 'Early Churn (After 1st Recycle)',
      percentage: 22,
      description: 'Users who left after first recycle',
      icon: <IconAlertTriangle size={24} />,
      trend: -3.2,
      color: 'warning' as const,
    },
    {
      title: 'Avg Lifetime Recycles',
      value: '4.6',
      description: 'Average recycles per user over lifetime',
      icon: <IconRecycle size={24} />,
      trend: 7.1,
      color: 'info' as const,
    }
  ];

  const handleCardClick = (title: string) => {
    // Filter logic would be implemented here
    console.log(`Filter by ${title}`);
  };

  return (
    <DashboardCard title="Retention Summary">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(6, 1fr)' }, gap: 2 }}>
        {retentionCards.map((card, index) => (
          <RetentionCard
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

export default RetentionSummaryCards;
