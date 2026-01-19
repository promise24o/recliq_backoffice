'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Chip } from '@mui/material';
import { 
  IconCheck,
  IconUser,
  IconTrendingUp,
  IconAlertTriangle,
  IconTrophy
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface CompletionCardProps {
  title: string;
  amount?: number;
  value?: string;
  description: string;
  icon: React.ReactNode;
  color: 'success' | 'warning' | 'error' | 'info';
  trend?: number;
  onClick?: () => void;
}

const CompletionCard: React.FC<CompletionCardProps> = ({ title, amount, value, description, icon, color, trend, onClick }) => {
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

const CompletionSummaryCards: React.FC = () => {
  const completionCards = [
    {
      title: 'Total Pickups Completed',
      amount: 4892,
      description: 'Successful pickups in selected period',
      icon: <IconCheck size={24} />,
      trend: 12.5,
      color: 'success' as const,
    },
    {
      title: 'Active Agents',
      amount: 132,
      description: 'Agents who completed pickups',
      icon: <IconUser size={24} />,
      trend: 8.3,
      color: 'info' as const,
    },
    {
      title: 'Avg Pickups per Agent',
      amount: 37,
      description: 'Average pickups per active agent',
      icon: <IconTrendingUp size={24} />,
      trend: 3.2,
      color: 'success' as const,
    },
    {
      title: 'Low Activity Agents',
      amount: 18,
      description: 'Agents with below-average performance',
      icon: <IconAlertTriangle size={24} />,
      trend: -15.8,
      color: 'warning' as const,
    },
    {
      title: 'Top Agent',
      value: 'Agent ID #A102',
      description: '214 pickups completed',
      icon: <IconTrophy size={24} />,
      color: 'success' as const,
    }
  ];

  const handleCardClick = (title: string) => {
    // Filter logic would be implemented here
    console.log(`Filter by ${title}`);
  };

  return (
    <DashboardCard title="Completion Summary">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(5, 1fr)' }, gap: 2 }}>
        {completionCards.map((card, index) => (
          <CompletionCard
            key={index}
            title={card.title}
            amount={card.amount}
            value={card.value}
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

export default CompletionSummaryCards;
