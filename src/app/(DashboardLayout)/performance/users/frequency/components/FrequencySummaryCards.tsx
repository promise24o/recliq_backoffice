'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Chip } from '@mui/material';
import { 
  IconRecycle,
  IconTrendingUp,
  IconUsers,
  IconAlertTriangle,
  IconActivity
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface FrequencyCardProps {
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

const FrequencyCard: React.FC<FrequencyCardProps> = ({ title, amount, value, percentage, description, icon, color, trend, onClick }) => {
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

const FrequencySummaryCards: React.FC = () => {
  const frequencyCards = [
    {
      title: 'Avg Recycling Frequency',
      value: '2.8 / month',
      description: 'Average recycles per user per month',
      icon: <IconRecycle size={24} />,
      trend: 8.5,
      color: 'success' as const,
    },
    {
      title: 'High-Frequency Users',
      amount: 624,
      description: 'Users with ≥4× per month recycling',
      icon: <IconTrendingUp size={24} />,
      trend: 15.2,
      color: 'success' as const,
    },
    {
      title: 'Low-Frequency Users',
      amount: 1042,
      description: 'Users with ≤1× per month recycling',
      icon: <IconAlertTriangle size={24} />,
      trend: -3.8,
      color: 'warning' as const,
    },
    {
      title: 'Repeat Recycling Rate',
      percentage: 68,
      description: 'Users who recycle multiple times',
      icon: <IconActivity size={24} />,
      trend: 5.7,
      color: 'info' as const,
    },
    {
      title: 'Frequency Growth',
      percentage: 9,
      description: 'Growth vs last period',
      icon: <IconUsers size={24} />,
      trend: 2.1,
      color: 'success' as const,
    }
  ];

  const handleCardClick = (title: string) => {
    // Filter logic would be implemented here
    console.log(`Filter by ${title}`);
  };

  return (
    <DashboardCard title="Frequency Summary">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(5, 1fr)' }, gap: 2 }}>
        {frequencyCards.map((card, index) => (
          <FrequencyCard
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

export default FrequencySummaryCards;
