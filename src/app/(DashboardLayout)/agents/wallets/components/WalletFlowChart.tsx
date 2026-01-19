'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress } from '@mui/material';
import { 
  IconArrowDown, 
  IconArrowUp, 
  IconArrowRight,
  IconTrendingUp,
  IconTrendingDown,
  IconCurrencyDollar,
  IconWallet,
  IconRefresh,
  IconClock,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface FlowData {
  source: string;
  target: string;
  value: number;
}

interface WalletFlowChartProps {
  data: FlowData[];
}

const WalletFlowChart: React.FC<WalletFlowChartProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    return `₦${(amount / 1000).toFixed(0)}K`;
  };

  const getFlowIcon = (type: string) => {
    switch (type) {
      case 'Completed Pickups':
        return <IconTrendingUp size={20} color="green" />;
      case 'Wallet Credits':
        return <IconWallet size={20} color="blue" />;
      case 'Available Balance':
        return <IconCurrencyDollar size={20} color="green" />;
      case 'Pending Earnings':
        return <IconClock size={20} color="orange" />;
      case 'Adjustments & Penalties':
        return <IconTrendingDown size={20} color="red" />;
      case 'Wallet Debits':
        return <IconArrowDown size={20} color="red" />;
      case 'Payout Requests':
        return <IconRefresh size={20} color="blue" />;
      case 'Processed Payouts':
        return <IconArrowUp size={20} color="green" />;
      default:
        return <IconArrowRight size={20} />;
    }
  };

  const getFlowColor = (type: string) => {
    switch (type) {
      case 'Completed Pickups':
        return 'success.main';
      case 'Wallet Credits':
        return 'info.main';
      case 'Available Balance':
        return 'success.main';
      case 'Pending Earnings':
        return 'warning.main';
      case 'Adjustments & Penalties':
        return 'error.main';
      case 'Wallet Debits':
        return 'error.main';
      case 'Payout Requests':
        return 'info.main';
      case 'Processed Payouts':
        return 'success.main';
      default:
        return 'grey.main';
    }
  };

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <DashboardCard title="Wallet Flow Overview">
      <CardContent>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Movement of value through the agent wallet system
        </Typography>
        <Stack spacing={3}>
          {data.map((flow, index) => (
            <Box key={index}>
              <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                {getFlowIcon(flow.source)}
                <Typography variant="body2" fontWeight={500} sx={{ minWidth: 120 }}>
                  {flow.source}
                </Typography>
                <IconArrowRight size={16} color="grey" />
                <Typography variant="body2" fontWeight={500} sx={{ minWidth: 120 }}>
                  {flow.target}
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(flow.value)}
                  </Typography>
                </Box>
              </Stack>
              <Box
                sx={{
                  height: 8,
                  backgroundColor: 'grey.200',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={(flow.value / maxValue) * 100}
                  sx={{
                    height: '100%',
                    backgroundColor: 'transparent',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getFlowColor(flow.source),
                    }
                  }}
                />
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </DashboardCard>
  );
};

export default WalletFlowChart;
