'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent } from '@mui/material';
import { 
  IconTrendingUp, 
  IconTrendingDown, 
  IconActivity,
  IconWallet,
  IconClock,
  IconCurrencyDollar,
  IconRefresh
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface TrendData {
  date: string;
  totalBalance: number;
  pendingFunds: number;
  availableFunds: number;
  payoutVolume: number;
}

interface WalletTrendChartProps {
  data: TrendData[];
}

const WalletTrendChart: React.FC<WalletTrendChartProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    return `₦${(amount / 1000).toFixed(0)}K`;
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <IconTrendingUp size={16} color="green" />;
    if (current < previous) return <IconTrendingDown size={16} color="red" />;
    return <IconActivity size={16} color="grey" />;
  };

  const maxValue = Math.max(...data.map(item => item.totalBalance));

  return (
    <DashboardCard title="Wallet Balance & Payout Trend">
      <CardContent>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Track wallet balances and payout volumes over time
        </Typography>
        <Stack spacing={2}>
          {data.slice(-7).map((item, index) => {
            const previousItem = index > 0 ? data[index - 1] : data[0];
            return (
              <Box key={item.date}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2" fontWeight={500}>
                    {item.date}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconWallet size={14} />
                      <Typography variant="caption" color="primary.main">
                        Total: {formatCurrency(item.totalBalance)}
                      </Typography>
                      {getTrendIcon(item.totalBalance, previousItem.totalBalance)}
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconClock size={14} />
                      <Typography variant="caption" color="warning.main">
                        Pending: {formatCurrency(item.pendingFunds)}
                      </Typography>
                      {getTrendIcon(item.pendingFunds, previousItem.pendingFunds)}
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconCurrencyDollar size={14} />
                      <Typography variant="caption" color="success.main">
                        Available: {formatCurrency(item.availableFunds)}
                      </Typography>
                      {getTrendIcon(item.availableFunds, previousItem.availableFunds)}
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconRefresh size={14} />
                      <Typography variant="caption" color="info.main">
                        Payouts: {formatCurrency(item.payoutVolume)}
                      </Typography>
                      {getTrendIcon(item.payoutVolume, previousItem.payoutVolume)}
                    </Stack>
                  </Stack>
                </Stack>
                <Box
                  sx={{
                    height: 6,
                    backgroundColor: 'grey.200',
                    borderRadius: 1,
                    overflow: 'hidden',
                    mt: 1,
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${(item.totalBalance / maxValue) * 100}%`,
                      backgroundColor: 'primary.main',
                      borderRadius: 1,
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </DashboardCard>
  );
};

export default WalletTrendChart;
