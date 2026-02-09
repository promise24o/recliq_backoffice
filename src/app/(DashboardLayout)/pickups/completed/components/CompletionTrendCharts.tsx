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

interface CompletionTrendChartsProps {
  timeSeriesData: any[];
  breakdownData: any[];
  selectedBreakdown: string;
  onBreakdownChange: (value: string) => void;
}

const CompletionTrendCharts: React.FC<CompletionTrendChartsProps> = ({
  timeSeriesData,
  breakdownData,
  selectedBreakdown,
  onBreakdownChange,
}) => {
  const maxValue = Math.max(...timeSeriesData.map(d => d.completed));

  return (
    <Grid container spacing={3}>
      {/* Pickups Completed Over Time */}
      <Grid size={{ xs: 12, md: 8 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Pickups Completed Over Time
            </Typography>
            <Stack spacing={2}>
              {timeSeriesData.map((item, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{item.date}</Typography>
                    <Typography variant="body2" fontWeight={600}>{item.completed} pickups</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(item.completed / maxValue) * 100} 
                    color="primary"
                  />
                </Box>
              ))}
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>

      {/* Pickup vs Drop-off Completion Ratio */}
      <Grid size={{ xs: 12, md: 4 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Pickup vs Drop-off Ratio
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Pickup</Typography>
                  <Typography variant="body2" fontWeight={600}>65%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={65} color="primary" />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Drop-off</Typography>
                  <Typography variant="body2" fontWeight={600}>35%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={35} color="secondary" />
              </Box>
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>

      {/* Breakdown Analysis */}
      <Grid size={{ xs: 12 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Completion Breakdown
              </Typography>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Breakdown By</InputLabel>
                <Select
                  value={selectedBreakdown}
                  label="Breakdown By"
                  onChange={(e) => onBreakdownChange(e.target.value)}
                >
                  <MenuItem value="city">By City</MenuItem>
                  <MenuItem value="waste_type">By Waste Type</MenuItem>
                  <MenuItem value="pickup_mode">By Pickup Mode</MenuItem>
                  <MenuItem value="match_type">By Match Type</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack spacing={2}>
              {breakdownData.map((item, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{item.name}</Typography>
                    <Typography variant="body2" fontWeight={600}>{item.completed} pickups</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(item.completed / Math.max(...breakdownData.map(d => d.completed))) * 100} 
                    color="primary"
                  />
                </Box>
              ))}
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default CompletionTrendCharts;
