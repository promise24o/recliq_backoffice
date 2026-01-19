'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent } from '@mui/material';
import { IconTrendingUp, IconTrendingDown, IconActivity } from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface TrendData {
  date: string;
  verified: number;
  pending: number;
  rejected: number;
  suspended: number;
}

interface VerificationTrendChartProps {
  data: TrendData[];
}

const VerificationTrendChart: React.FC<VerificationTrendChartProps> = ({ data }) => {
  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <IconTrendingUp size={16} color="green" />;
    if (current < previous) return <IconTrendingDown size={16} color="red" />;
    return <IconActivity size={16} color="grey" />;
  };

  const getTrendColor = (current: number, previous: number) => {
    if (current > previous) return 'success.main';
    if (current < previous) return 'error.main';
    return 'text.secondary';
  };

  return (
    <DashboardCard title="Verification Status Trend">
      <CardContent>
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
                      <Typography variant="caption" color="success.main">
                        ✓ {item.verified}
                      </Typography>
                      {getTrendIcon(item.verified, previousItem.verified)}
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Typography variant="caption" color="warning.main">
                        ⏳ {item.pending}
                      </Typography>
                      {getTrendIcon(item.pending, previousItem.pending)}
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Typography variant="caption" color="error.main">
                        ✗ {item.rejected}
                      </Typography>
                      {getTrendIcon(item.rejected, previousItem.rejected)}
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Typography variant="caption" color="error.main">
                        🚫 {item.suspended}
                      </Typography>
                      {getTrendIcon(item.suspended, previousItem.suspended)}
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </DashboardCard>
  );
};

export default VerificationTrendChart;
