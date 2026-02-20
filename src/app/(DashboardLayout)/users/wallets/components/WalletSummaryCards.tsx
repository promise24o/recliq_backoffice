'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar } from '@mui/material';
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
  totalUserBalances: number;
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
      title: 'Total User Balances',
      value: formatCurrency(summary.totalUserBalances),
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
        <Box 
          sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'stretch',
            justifyContent: 'flex-start'
          }}
        >
          {cards.map((card, index) => (
            <Box 
              key={index}
              sx={{ 
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.333% - 16px)', lg: '1 1 calc(33.333% - 16px)' },
                minWidth: { xs: '100%', sm: 'calc(50% - 8px)', md: '280px', lg: '280px' }
              }}
            >
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                    borderColor: `${card.color}.main`,
                  }
                }} 
                onClick={() => onStatusFilter(card.status)}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: `${card.color}.main` }}>
                      {card.icon}
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="h4" 
                        fontWeight={600} 
                        color={`${card.color}.main`}
                      >
                        {card.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.title}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </CardContent>
    </DashboardCard>
  );
};

export default WalletSummaryCards;
