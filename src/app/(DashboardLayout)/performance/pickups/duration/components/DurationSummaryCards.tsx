'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Chip } from '@mui/material';
import { 
  IconClock,
  IconNavigation,
  IconTruck,
  IconCheck,
  IconAlertTriangle,
  IconMap
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface DurationCardProps {
  title: string;
  amount?: number;
  value?: string;
  unit?: string;
  description: string;
  icon: React.ReactNode;
  color: 'success' | 'warning' | 'error' | 'info';
  trend?: number;
  onClick?: () => void;
}

const DurationCard: React.FC<DurationCardProps> = ({ title, amount, value, unit, description, icon, color, trend, onClick }) => {
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
                {amount.toLocaleString()}{unit || ''}
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

const DurationSummaryCards: React.FC = () => {
  const durationCards = [
    {
      title: 'Avg Total Pickup Duration',
      amount: 42,
      unit: ' mins',
      description: 'Request → Assignment → Arrival → Completion',
      icon: <IconClock size={24} />,
      trend: 8.3,
      color: 'warning' as const,
    },
    {
      title: 'Request → Assignment',
      amount: 9,
      unit: ' mins',
      description: 'Time to assign agent to pickup request',
      icon: <IconNavigation size={24} />,
      trend: -2.1,
      color: 'success' as const,
    },
    {
      title: 'Assignment → Arrival',
      amount: 21,
      unit: ' mins',
      description: 'Agent travel time to pickup location',
      icon: <IconTruck size={24} />,
      trend: 12.7,
      color: 'error' as const,
    },
    {
      title: 'Arrival → Completion',
      amount: 12,
      unit: ' mins',
      description: 'On-site pickup processing time',
      icon: <IconCheck size={24} />,
      trend: -5.4,
      color: 'success' as const,
    },
    {
      title: 'Pickups Exceeding SLA',
      amount: 18,
      unit: '%',
      description: 'Pickups taking longer than SLA threshold',
      icon: <IconAlertTriangle size={24} />,
      trend: -3.2,
      color: 'warning' as const,
    },
    {
      title: 'Fastest Zone (Avg)',
      value: 'GRA Phase 2',
      description: '29 mins average pickup duration',
      icon: <IconMap size={24} />,
      trend: -7.8,
      color: 'success' as const,
    }
  ];

  const handleCardClick = (title: string) => {
    // Filter logic would be implemented here
    console.log(`Filter by ${title}`);
  };

  return (
    <DashboardCard title="Duration Summary">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(6, 1fr)' }, gap: 2 }}>
        {durationCards.map((card, index) => (
          <DurationCard
            key={index}
            title={card.title}
            amount={card.amount}
            value={card.value}
            unit={card.unit}
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

export default DurationSummaryCards;
