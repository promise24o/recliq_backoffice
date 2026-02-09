'use client';

import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  LinearProgress,
} from '@mui/material';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface FailureDistributionChartsProps {
  failureBreakdownData: any[];
  trendData: any[];
  selectedBreakdown: string;
  onBreakdownChange: (value: string) => void;
}

const FailureDistributionCharts: React.FC<FailureDistributionChartsProps> = ({
  failureBreakdownData,
  trendData,
  selectedBreakdown,
  onBreakdownChange,
}) => {
  const maxValue = Math.max(...failureBreakdownData.map(d => d.count));

  return (
    <Grid container spacing={3}>
      {/* Failure Breakdown */}
      <Grid size={{ xs: 12, md: 8 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Failure Breakdown
            </Typography>
            <Stack spacing={2}>
              {failureBreakdownData.map((item, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{item.reason}</Typography>
                    <Typography variant="body2" fontWeight={600}>{item.count} failures</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(item.count / maxValue) * 100} 
                    color={item.color}
                  />
                </Box>
              ))}
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>

      {/* Cancellation vs Failure Ratio */}
      <Grid size={{ xs: 12, md: 4 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Cancelled vs Failed Ratio
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Cancelled</Typography>
                  <Typography variant="body2" fontWeight={600}>42%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={42} color="warning" />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Failed</Typography>
                  <Typography variant="body2" fontWeight={600}>58%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={58} color="error" />
              </Box>
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>

      {/* Failure Trend Over Time */}
      <Grid size={{ xs: 12 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Failure Trend Over Time
              </Typography>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>View By</InputLabel>
                <Select
                  value={selectedBreakdown}
                  label="View By"
                  onChange={(e) => onBreakdownChange(e.target.value)}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="hourly">Hourly</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack spacing={2}>
              {trendData.map((item, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{item.date}</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {item.cancelled} cancelled / {item.failed} failed
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={(item.cancelled / Math.max(...trendData.map(d => d.cancelled + d.failed))) * 100} 
                      color="warning"
                      sx={{ flex: 1 }}
                    />
                    <LinearProgress 
                      variant="determinate" 
                      value={(item.failed / Math.max(...trendData.map(d => d.cancelled + d.failed))) * 100} 
                      color="error"
                      sx={{ flex: 1 }}
                    />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default FailureDistributionCharts;
