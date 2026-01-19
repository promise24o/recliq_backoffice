'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Chip } from '@mui/material';
import { 
  IconAlertTriangle,
  IconPackage,
  IconPercentage,
  IconUserCheck,
  IconTrophy
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface DisputeCardProps {
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

const DisputeCard: React.FC<DisputeCardProps> = ({ title, amount, value, percentage, description, icon, color, trend, onClick }) => {
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
                color={trend > 0 ? 'error' : 'success'}
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

const DisputeSummaryCards: React.FC = () => {
  const disputeCards = [
    {
      title: 'Total Disputes',
      amount: 186,
      description: 'Total disputes filed against agents',
      icon: <IconAlertTriangle size={24} />,
      trend: 12.5,
      color: 'error' as const,
    },
    {
      title: 'Completed Pickups',
      amount: 4892,
      description: 'Total pickups completed in period',
      icon: <IconPackage size={24} />,
      trend: 8.3,
      color: 'info' as const,
    },
    {
      title: 'Avg Dispute Rate',
      percentage: 3.8,
      description: 'Disputes per 100 completed pickups',
      icon: <IconPercentage size={24} />,
      trend: -2.1,
      color: 'warning' as const,
    },
    {
      title: 'High-Risk Agents',
      amount: 14,
      description: 'Agents with &gt;5% dispute rate',
      icon: <IconUserCheck size={24} />,
      trend: -8.5,
      color: 'error' as const,
    },
    {
      title: 'Lowest Dispute Agent',
      value: 'Agent ID #A041',
      description: '0.2% dispute rate',
      icon: <IconTrophy size={24} />,
      color: 'success' as const,
    }
  ];

  const handleCardClick = (title: string) => {
    // Filter logic would be implemented here
    console.log(`Filter by ${title}`);
  };

  return (
    <DashboardCard title="Dispute Summary">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(5, 1fr)' }, gap: 2 }}>
        {disputeCards.map((card, index) => (
          <DisputeCard
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

export default DisputeSummaryCards;
