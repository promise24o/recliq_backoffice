'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Chip } from '@mui/material';
import { 
  IconWallet,
  IconShield,
  IconLock,
  IconClock,
  IconArrowUp,
  IconArrowDown,
  IconCheck,
  IconAlertTriangle
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface BalanceCardProps {
  title: string;
  amount: number;
  description: string;
  icon: React.ReactNode;
  color: 'success' | 'warning' | 'error' | 'info';
  trend: number;
  onClick?: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ title, amount, description, icon, color, trend, onClick }) => {
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
              {trend !== 0 && (
                <Chip
                  size="small"
                  label={`${trend > 0 ? '+' : ''}${trend}%`}
                  color={trend > 0 ? 'success' : 'error'}
                  variant="outlined"
                  icon={trend > 0 ? <IconArrowUp size={14} /> : <IconArrowDown size={14} />}
                />
              )}
            </Stack>
          </Stack>
          
          <Box>
            <Typography variant="h4" fontWeight={700} color={getColor(color)}>
              ₦{amount.toLocaleString()}
            </Typography>
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

const BalanceBreakdownCards: React.FC = () => {
  const balanceCards = [
    {
      title: 'Available Balance',
      amount: 82300000,
      description: 'Funds ready for payouts',
      icon: <IconWallet size={24} />,
      trend: 5.2,
      color: 'success' as const,
    },
    {
      title: 'Reserved Funds',
      amount: 31800000,
      description: 'Pending agent payouts & user withdrawals',
      icon: <IconShield size={24} />,
      trend: -2.1,
      color: 'warning' as const,
    },
    {
      title: 'Restricted Funds',
      amount: 14350000,
      description: 'Disputes, compliance holds, chargebacks',
      icon: <IconLock size={24} />,
      trend: 8.7,
      color: 'error' as const,
    },
    {
      title: 'In-Transit Funds',
      amount: 14500000,
      description: 'Processing with payment providers',
      icon: <IconClock size={24} />,
      trend: 3.4,
      color: 'info' as const,
    },
  ];

  const handleCardClick = (title: string) => {
    // Filter logic would be implemented here
    console.log(`Filter by ${title}`);
  };

  return (
    <DashboardCard title="Balance Breakdown">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
        {balanceCards.map((card, index) => (
          <BalanceCard
            key={index}
            title={card.title}
            amount={card.amount}
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

export default BalanceBreakdownCards;
