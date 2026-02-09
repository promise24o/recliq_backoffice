'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { 
  IconWallet, 
  IconLock, 
  IconClock, 
  IconArrowUp, 
  IconTrendingUp, 
  IconAlertTriangle 
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface WalletSummary {
  totalAgentBalances: number;
  totalInEscrow: number;
  totalOnHold: number;
  availableForWithdrawal: number;
  lifetimeRewardsIssued: number;
  walletsWithIssues: number;
}

interface WalletSummaryCardsProps {
  summary: WalletSummary;
  onStatusFilter: (status: string) => void;
}

const WalletSummaryCards: React.FC<WalletSummaryCardsProps> = ({ summary, onStatusFilter }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const cards = [
    {
      title: 'Total Agent Balances',
      value: formatCurrency(summary.totalAgentBalances),
      icon: <IconWallet size={20} />,
      color: 'primary',
      status: 'all'
    },
    {
      title: 'Total in Escrow',
      value: formatCurrency(summary.totalInEscrow),
      icon: <IconLock size={20} />,
      color: 'info',
      status: 'locked'
    },
    {
      title: 'Total On Hold',
      value: formatCurrency(summary.totalOnHold),
      icon: <IconClock size={20} />,
      color: 'warning',
      status: 'compliance_hold'
    },
    {
      title: 'Available for Withdrawal',
      value: formatCurrency(summary.availableForWithdrawal),
      icon: <IconArrowUp size={20} />,
      color: 'success',
      status: 'normal'
    },
    {
      title: 'Lifetime Rewards Issued',
      value: formatCurrency(summary.lifetimeRewardsIssued),
      icon: <IconTrendingUp size={20} />,
      color: 'info',
      status: 'all'
    },
    {
      title: 'Wallets with Issues',
      value: summary.walletsWithIssues.toLocaleString(),
      icon: <IconAlertTriangle size={20} />,
      color: 'error',
      status: 'negative_balance'
    }
  ];

  return (
    <DashboardCard title="Wallet Summary">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            💰 Platform-wide financial exposure - Values reconcile with Finance → Wallet Float
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 2 }} key={index}>
              <Card 
                sx={{ 
                  cursor: card.status !== 'all' ? 'pointer' : 'default',
                  transition: 'all 0.25s ease',
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
                <CardContent sx={{ p: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar 
                      sx={{ 
                        bgcolor: `${card.color}.main`,
                        width: 40,
                        height: 40
                      }}
                    >
                      {card.icon}
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="h4" fontWeight={600}>
                        {card.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.title}
                      </Typography>
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
