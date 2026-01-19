'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, LinearProgress, Chip } from '@mui/material';
import { 
  IconCreditCard, 
  IconBuildingBank, 
  IconDeviceMobile, 
  IconWallet 
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface PaymentMethodData {
  method: string;
  icon: React.ReactNode;
  amount: number;
  percentage: number;
  transactions: number;
  color: string;
}

const PaymentMethodsBreakdown: React.FC = () => {
  const paymentMethods: PaymentMethodData[] = [
    {
      method: 'Card Payments',
      icon: <IconCreditCard size={20} />,
      amount: 18500000,
      percentage: 57,
      transactions: 2354,
      color: 'primary',
    },
    {
      method: 'Bank Transfer',
      icon: <IconBuildingBank size={20} />,
      amount: 9800000,
      percentage: 30,
      transactions: 1247,
      color: 'success',
    },
    {
      method: 'USSD',
      icon: <IconDeviceMobile size={20} />,
      amount: 3250000,
      percentage: 10,
      transactions: 412,
      color: 'warning',
    },
    {
      method: 'Wallet',
      icon: <IconWallet size={20} />,
      amount: 900000,
      percentage: 3,
      transactions: 115,
      color: 'info',
    },
  ];

  const getProgressColor = (color: string) => {
    switch (color) {
      case 'primary': return 'primary.main';
      case 'success': return 'success.main';
      case 'warning': return 'warning.main';
      case 'info': return 'info.main';
      default: return 'grey.500';
    }
  };

  const getBgColor = (color: string) => {
    switch (color) {
      case 'primary': return 'primary.light';
      case 'success': return 'success.light';
      case 'warning': return 'warning.light';
      case 'info': return 'info.light';
      default: return 'grey.100';
    }
  };

  return (
    <DashboardCard title="Payment Methods Breakdown">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
        {paymentMethods.map((method, index) => (
          <Card
            key={index}
            sx={{
              transition: 'all 0.25s ease',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
              },
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                {/* Icon and Method Name */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: getBgColor(method.color),
                      color: getProgressColor(method.color),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {method.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {method.method}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {method.transactions} transactions
                    </Typography>
                  </Box>
                </Stack>

                {/* Amount and Percentage */}
                <Box>
                  <Typography variant="h5" fontWeight={700} color={getProgressColor(method.color)}>
                    ₦{method.amount.toLocaleString()}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      of total
                    </Typography>
                    <Chip
                      size="small"
                      label={`${method.percentage}%`}
                      color={method.color as any}
                      variant="outlined"
                    />
                  </Stack>
                </Box>

                {/* Progress Bar */}
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Share of payments
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      {method.percentage}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={method.percentage}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getProgressColor(method.color),
                      },
                    }}
                  />
                </Box>

                {/* Average per Transaction */}
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Avg per transaction
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    ₦{Math.round(method.amount / method.transactions).toLocaleString()}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Summary Row */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Total Processed
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            ₦32,450,000
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Across all payment methods
          </Typography>
          <Typography variant="caption" fontWeight={600}>
            4,128 transactions
          </Typography>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default PaymentMethodsBreakdown;
