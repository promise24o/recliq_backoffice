'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent } from '@mui/material';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface FunnelData {
  stage: string;
  count: number;
  percentage: number;
}

interface KYCFunnelChartProps {
  data: FunnelData[];
}

const KYCFunnelChart: React.FC<KYCFunnelChartProps> = ({ data }) => {
  return (
    <DashboardCard title="KYC Funnel Overview">
      <CardContent>
        <Stack spacing={2}>
          {data.map((item, index) => (
            <Box key={item.stage}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2" fontWeight={500}>
                  {item.stage}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    {item.count.toLocaleString()} ({item.percentage}%)
                  </Typography>
                  {index > 0 && (
                    item.percentage > data[index - 1].percentage ? 
                      <IconTrendingUp size={16} color="green" /> :
                      <IconTrendingDown size={16} color="red" />
                  )}
                </Stack>
              </Stack>
              <Box
                sx={{
                  height: 24,
                  backgroundColor: 'grey.200',
                  borderRadius: 1,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${item.percentage}%`,
                    backgroundColor: item.percentage > 70 ? 'success.main' : 
                                   item.percentage > 40 ? 'warning.main' : 'error.main',
                    transition: 'width 0.3s ease',
                    borderRadius: 1,
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

export default KYCFunnelChart;
