'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Chip } from '@mui/material';
import { 
  IconBuildingBank,
  IconCurrencyNaira,
  IconReceipt,
  IconX,
  IconTrendingUp,
  IconTrendingDown
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface ProviderCardProps {
  title: string;
  amount?: number;
  value?: string;
  description: string;
  icon: React.ReactNode;
  color: 'success' | 'warning' | 'error' | 'info';
  trend?: number;
  onClick?: () => void;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ title, amount, value, description, icon, color, trend, onClick }) => {
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
      case 'success': return null;
      case 'warning': return null;
      case 'error': return null;
      case 'info': return null;
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

const ProviderSummaryCards: React.FC = () => {
  const providerCards = [
    {
      title: 'Total Providers Collected',
      amount: 72480000,
      description: 'Total amount reported by providers',
      icon: <IconBuildingBank size={24} />,
      trend: 12.3,
      color: 'success' as const,
    },
    {
      title: 'Total Provider Fees',
      amount: 1380000,
      description: 'Total fees charged by providers',
      icon: <IconCurrencyNaira size={24} />,
      trend: 8.7,
      color: 'warning' as const,
    },
    {
      title: 'Net Settled',
      amount: 71100000,
      description: 'Net amount after provider fees',
      icon: <IconReceipt size={24} />,
      trend: 12.5,
      color: 'success' as const,
    },
    {
      title: 'Settlement Batches',
      value: '14',
      description: 'Number of settlement batches',
      icon: <IconReceipt size={24} />,
      trend: 5.2,
      color: 'info' as const,
    },
    {
      title: 'Unmatched Records',
      value: '23',
      description: 'Provider entries without ledger match',
      icon: <IconX size={24} />,
      trend: -15.8,
      color: 'error' as const,
    }
  ];

  const handleCardClick = (title: string) => {
    // Filter logic would be implemented here
    console.log(`Filter by ${title}`);
  };

  return (
    <DashboardCard title="Provider Summary">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(5, 1fr)' }, gap: 2 }}>
        {providerCards.map((card, index) => (
          <ProviderCard
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

export default ProviderSummaryCards;
