'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { 
  IconWallet, 
  IconClock, 
  IconCurrencyDollar, 
  IconRefresh,
  IconAlertTriangle,
  IconBan,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface WalletSummary {
  totalBalance: number;
  pendingEarnings: number;
  availableForPayout: number;
  payoutsProcessed: number;
  negativeWallets: number;
  frozenWallets: number;
}

interface WalletSummaryCardsProps {
  summary: WalletSummary;
  onStatusFilter: (status: string) => void;
}

const WalletSummaryCards: React.FC<WalletSummaryCardsProps> = ({ summary, onStatusFilter }) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    return `₦${(amount / 1000).toFixed(0)}K`;
  };

  const cards = [
    {
      title: 'Total Agent Wallet Balance',
      value: formatCurrency(summary.totalBalance),
      icon: <IconWallet size={20} />,
      color: 'primary',
      status: 'all'
    },
    {
      title: 'Pending Earnings',
      value: formatCurrency(summary.pendingEarnings),
      subtitle: 'Awaiting clearance',
      icon: <IconClock size={20} />,
      color: 'warning',
      status: 'pending'
    },
    {
      title: 'Available for Payout',
      value: formatCurrency(summary.availableForPayout),
      subtitle: 'Ready for withdrawal',
      icon: <IconCurrencyDollar size={20} />,
      color: 'success',
      status: 'available'
    },
    {
      title: 'Payouts Processed (Period)',
      value: formatCurrency(summary.payoutsProcessed),
      icon: <IconRefresh size={20} />,
      color: 'info',
      status: 'all'
    },
    {
      title: 'Negative Wallets',
      value: summary.negativeWallets.toString(),
      icon: <IconAlertTriangle size={20} />,
      color: 'error',
      status: 'negative'
    },
    {
      title: 'Frozen Wallets',
      value: summary.frozenWallets.toString(),
      icon: <IconBan size={20} />,
      color: 'error',
      status: 'frozen'
    }
  ];

  return (
    <DashboardCard title="Wallet Summary">
      <CardContent>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={index}>
              <Card 
                sx={{ 
                  cursor: card.status !== 'all' ? 'pointer' : 'default',
                  transition: 'all 0.2s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': card.status !== 'all' ? {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                    borderColor: 'primary.main',
                  } : {}
                }}
                onClick={() => card.status !== 'all' && onStatusFilter(card.status)}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: `${card.color}.main` }}>
                      {card.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {card.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {card.title}
                      </Typography>
                      {card.subtitle && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          {card.subtitle}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </DashboardCard>
  );
};

export default WalletSummaryCards;
