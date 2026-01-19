'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Chip } from '@mui/material';
import { 
  IconLock,
  IconClock,
  IconAlertTriangle,
  IconLockOpen,
  IconTrendingUp,
  IconTrendingDown,
  IconCheck
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface EscrowCardProps {
  title: string;
  amount?: number;
  value?: string;
  description: string;
  icon: React.ReactNode;
  color: 'success' | 'warning' | 'error' | 'info';
  trend?: number;
  onClick?: () => void;
}

const EscrowCard: React.FC<EscrowCardProps> = ({ title, amount, value, description, icon, color, trend, onClick }) => {
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

  const getStatusIcon = (colorType: string) => {
    switch (colorType) {
      case 'success': return <IconCheck size={16} />;
      case 'warning': return <IconAlertTriangle size={16} />;
      case 'error': return <IconAlertTriangle size={16} />;
      case 'info': return <IconClock size={16} />;
      default: return null;
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
            <Stack direction="row" alignItems="center" spacing={1}>
              {getStatusIcon(color)}
              {trend !== undefined && (
                <Chip
                  size="small"
                  label={`${trend > 0 ? '+' : ''}${trend}%`}
                  color={trend > 0 ? 'success' : 'error'}
                  variant="outlined"
                  icon={trend > 0 ? <IconTrendingUp size={14} /> : <IconTrendingDown size={14} />}
                />
              )}
            </Stack>
          </Stack>
          
          <Box>
            {amount !== undefined && (
              <Typography variant="h4" fontWeight={700} color={getColor(color)}>
                ₦{amount.toLocaleString()}
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

const EscrowSummaryCards: React.FC = () => {
  const escrowCards = [
    {
      title: 'Total in Escrow',
      amount: 42600000,
      description: 'Funds currently locked pending release',
      icon: <IconLock size={24} />,
      trend: 8.3,
      color: 'info' as const,
    },
    {
      title: 'Active Escrows',
      value: '318',
      description: 'Number of active escrow transactions',
      icon: <IconClock size={24} />,
      trend: 12.1,
      color: 'warning' as const,
    },
    {
      title: 'Avg Hold Time',
      value: '3.4 days',
      description: 'Average time funds remain in escrow',
      icon: <IconClock size={24} />,
      trend: -5.2,
      color: 'warning' as const,
    },
    {
      title: 'Overdue Escrows',
      value: '27',
      description: 'Escrows exceeding SLA deadlines',
      icon: <IconAlertTriangle size={24} />,
      trend: 15.8,
      color: 'error' as const,
    },
    {
      title: 'Released (This Period)',
      amount: 18900000,
      description: 'Funds released from escrow this period',
      icon: <IconLockOpen size={24} />,
      trend: 6.7,
      color: 'success' as const,
    }
  ];

  const handleCardClick = (title: string) => {
    // Filter logic would be implemented here
    console.log(`Filter by ${title}`);
  };

  return (
    <DashboardCard title="Escrow Summary">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(5, 1fr)' }, gap: 2 }}>
        {escrowCards.map((card, index) => (
          <EscrowCard
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

export default EscrowSummaryCards;
