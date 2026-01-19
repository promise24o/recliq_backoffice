'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, Chip } from '@mui/material';
import { 
  IconCurrencyNaira,
  IconTrendingUp,
  IconTrendingDown,
  IconWallet,
  IconShield,
  IconLock,
  IconClock
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

const PlatformBalanceOverview: React.FC = () => {
  const overviewData = {
    totalBalance: 128450000,
    breakdown: {
      available: 82300000,
      reserved: 31800000,
      restricted: 14350000
    }
  };

  const getPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <DashboardCard title="Platform Balance Overview">
      <Box sx={{ width: '100%' }}>
        {/* Primary Card - Total Balance */}
        <Card
          sx={{
            mb: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            boxShadow: 3
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconCurrencyNaira size={32} />
                </Box>
                <Box flex={1}>
                  <Typography variant="h2" fontWeight={700}>
                    ₦{overviewData.totalBalance.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Platform Balance
                  </Typography>
                </Box>
                <Chip
                  label="Live"
                  color="success"
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    '& .MuiChip-label': { color: 'white' }
                  }}
                />
              </Stack>

              {/* Sub-breakdown */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                  Balance Breakdown
                </Typography>
                <Stack spacing={1.5}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconWallet size={16} />
                      <Typography variant="body2">
                        Available
                      </Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={600}>
                      ₦{overviewData.breakdown.available.toLocaleString()} ({getPercentage(overviewData.breakdown.available, overviewData.totalBalance)}%)
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconShield size={16} />
                      <Typography variant="body2">
                        Reserved
                      </Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={600}>
                      ₦{overviewData.breakdown.reserved.toLocaleString()} ({getPercentage(overviewData.breakdown.reserved, overviewData.totalBalance)}%)
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconLock size={16} />
                      <Typography variant="body2">
                        Restricted
                      </Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={600}>
                      ₦{overviewData.breakdown.restricted.toLocaleString()} ({getPercentage(overviewData.breakdown.restricted, overviewData.totalBalance)}%)
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Stack direction="row" spacing={2}>
          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'divider' }}>
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
                  <IconTrendingUp size={20} />
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Available Ratio
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="success.main">
                    {getPercentage(overviewData.breakdown.available, overviewData.totalBalance)}%
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'warning.light',
                    color: 'warning.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconClock size={20} />
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Reserve Ratio
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="warning.main">
                    {getPercentage(overviewData.breakdown.reserved, overviewData.totalBalance)}%
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'error.light',
                    color: 'error.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconTrendingDown size={20} />
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Risk Exposure
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="error.main">
                    {getPercentage(overviewData.breakdown.restricted, overviewData.totalBalance)}%
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default PlatformBalanceOverview;
