'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { 
  IconCurrencyNaira,
  IconTrendingUp,
  IconTrendingDown,
  IconBuildingBank,
  IconCreditCard,
  IconTruck,
  IconNotes
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface ProviderFeesAnalysisProps {
  onProviderClick?: (provider: string) => void;
}

const ProviderFeesAnalysis: React.FC<ProviderFeesAnalysisProps> = ({ onProviderClick }) => {
  // Mock data for provider fees
  const providerFeesData = [
    {
      provider: 'paystack',
      icon: <IconBuildingBank size={20} />,
      totalCollected: 45000000,
      totalFees: 900000,
      feeRate: 2.0,
      trend: 0.2,
      color: 'success'
    },
    {
      provider: 'flutterwave',
      icon: <IconCreditCard size={20} />,
      totalCollected: 27480000,
      totalFees: 480000,
      feeRate: 1.75,
      trend: -0.1,
      color: 'success'
    },
    {
      provider: 'bank',
      icon: <IconTruck size={20} />,
      totalCollected: 0,
      totalFees: 0,
      feeRate: 0.0,
      trend: 0.0,
      color: 'info'
    },
    {
      provider: 'manual',
      icon: <IconNotes size={20} />,
      totalCollected: 0,
      totalFees: 0,
      feeRate: 0.0,
      trend: 0.0,
      color: 'info'
    }
  ];

  // Fee trends over time (mock data)
  const feeTrends = [
    { period: 'Last 7 days', paystack: 2.1, flutterwave: 1.8, bank: 0.0, manual: 0.0 },
    { period: 'Last 30 days', paystack: 2.0, flutterwave: 1.75, bank: 0.0, manual: 0.0 },
    { period: 'Last 90 days', paystack: 1.9, flutterwave: 1.7, bank: 0.0, manual: 0.0 }
  ];

  // Unexpected fee spikes
  const feeSpikes = [
    {
      provider: 'flutterwave',
      date: '2024-01-10',
      normalRate: 1.75,
      actualRate: 2.5,
      spikeAmount: 0.75,
      reason: 'International transaction fees applied'
    }
  ];

  const totalFees = providerFeesData.reduce((sum, provider) => sum + provider.totalFees, 0);
  const totalCollected = providerFeesData.reduce((sum, provider) => sum + provider.totalCollected, 0);
  const overallFeeRate = totalCollected > 0 ? ((totalFees / totalCollected) * 100).toFixed(2) : '0.00';

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <IconTrendingUp size={16} color="green" />;
    if (trend < 0) return <IconTrendingDown size={16} color="red" />;
    return null;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'success';
    if (trend < 0) return 'error';
    return 'default';
  };

  const getFeeRateColor = (rate: number) => {
    if (rate <= 1.5) return 'success';
    if (rate <= 2.0) return 'warning';
    return 'error';
  };

  return (
    <DashboardCard title="Provider Fees Analysis">
      <Box sx={{ width: '100%' }}>
        {/* Overall Fee Summary */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'primary.light' }}>
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconCurrencyNaira size={20} />
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Total Provider Fees
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="primary.main">
                    ₦{totalFees.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {overallFeeRate}% overall rate
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'success.light' }}>
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'success.light',
                    color: 'success.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconTrendingDown size={20} />
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Best Fee Rate
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="success.main">
                    1.75%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Flutterwave
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        {/* Provider Fee Breakdown */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Provider Fee Breakdown
          </Typography>
          <Stack spacing={2}>
            {providerFeesData.map((provider, index) => (
              <Card 
                key={index} 
                sx={{ 
                  border: '1px solid', 
                  borderColor: 'divider',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                    borderColor: 'primary.main',
                  }
                }}
                onClick={() => onProviderClick?.(provider.provider)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            bgcolor: 'primary.light',
                            color: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {provider.icon}
                        </Box>
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {provider.provider.charAt(0).toUpperCase() + provider.provider.slice(1)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Payment provider
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {getTrendIcon(provider.trend)}
                        <Typography variant="caption" color={getTrendColor(provider.trend) + '.main' as any}>
                          {provider.trend > 0 ? '+' : ''}{provider.trend}%
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">
                          Total Collected
                        </Typography>
                        <Typography variant="h6" fontWeight={700} color="primary.main">
                          ₦{provider.totalCollected.toLocaleString()}
                        </Typography>
                      </Stack>
                      
                      <Stack spacing={1} sx={{ textAlign: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          Fee Rate
                        </Typography>
                        <Typography 
                          variant="h6" 
                          fontWeight={700}
                          color={getFeeRateColor(provider.feeRate) + '.main' as any}
                        >
                          {provider.feeRate}%
                        </Typography>
                      </Stack>
                      
                      <Stack spacing={1} sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary">
                          Total Fees
                        </Typography>
                        <Typography variant="h6" fontWeight={700} color="warning.main">
                          ₦{provider.totalFees.toLocaleString()}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Fee efficiency
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={100 - (provider.feeRate * 10)} // Invert so lower fees = higher progress
                        sx={{
                          flex: 1,
                          height: 4,
                          borderRadius: 2,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getFeeRateColor(provider.feeRate) + '.main' as any,
                            borderRadius: 2,
                          },
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {100 - (provider.feeRate * 10)}%
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Fee Trends Table */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Fee Trends Over Time
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Period</TableCell>
                  <TableCell align="right">Paystack</TableCell>
                  <TableCell align="right">Flutterwave</TableCell>
                  <TableCell align="right">Bank</TableCell>
                  <TableCell align="right">Manual</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feeTrends.map((trend, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {trend.period}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color={getFeeRateColor(trend.paystack) + '.main' as any}>
                        {trend.paystack}%
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color={getFeeRateColor(trend.flutterwave) + '.main' as any}>
                        {trend.flutterwave}%
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="success.main">
                        {trend.bank}%
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="success.main">
                        {trend.manual}%
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Unexpected Fee Spikes */}
        {feeSpikes.length > 0 && (
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom color="warning.main">
              ⚠️ Unexpected Fee Spikes
            </Typography>
            <Stack spacing={2}>
              {feeSpikes.map((spike, index) => (
                <Card key={index} sx={{ border: '1px solid', borderColor: 'warning.light' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack spacing={1}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" fontWeight={600}>
                          {spike.provider.charAt(0).toUpperCase() + spike.provider.slice(1)} - {spike.date}
                        </Typography>
                        <Typography variant="caption" color="warning.main">
                          +{spike.spikeAmount}% spike
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        Normal: {spike.normalRate}% → Actual: {spike.actualRate}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {spike.reason}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}

        {/* Analysis Summary */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Fee Analysis Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Most Cost-Effective Provider
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                Flutterwave (1.75%)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Fee Optimization Opportunity
              </Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                ₦{Math.round((2.0 - 1.75) * totalCollected / 100).toLocaleString()} potential savings
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Fee Trend Direction
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                Generally decreasing
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Last Analysis
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                {new Date().toLocaleString()}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default ProviderFeesAnalysis;
