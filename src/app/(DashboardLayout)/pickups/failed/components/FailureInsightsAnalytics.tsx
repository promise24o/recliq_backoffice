'use client';

import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Paper,
  LinearProgress,
  Chip,
  Alert,
  Stack,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  MapPin,
  Users,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface FailureInsightsAnalyticsProps {
  cityFailureData: any[];
  modeFailureData: any[];
  matchTypeData: any[];
  peakHourData: any[];
  agentVsSystemData: any[];
}

const FailureInsightsAnalytics: React.FC<FailureInsightsAnalyticsProps> = ({
  cityFailureData,
  modeFailureData,
  matchTypeData,
  peakHourData,
  agentVsSystemData,
}) => {
  const getFailureRateColor = (rate: number) => {
    if (rate > 25) return 'error';
    if (rate > 15) return 'warning';
    return 'success';
  };

  return (
    <Grid container spacing={3}>
      {/* Failure Rate by City */}
      <Grid size={{ xs: 12, md: 6 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Failure Rate by City
            </Typography>
            <Stack spacing={2}>
              {cityFailureData.map((city, index) => (
                <Paper key={index} sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{city.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{city.totalPickups} requests</Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        color={getFailureRateColor(city.failureRate) + '.main' as any}
                      >
                        {city.failureRate.toFixed(1)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {city.failures} failures
                      </Typography>
                    </Box>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={city.failureRate} 
                    color={getFailureRateColor(city.failureRate) as any}
                    sx={{ mt: 1 }}
                  />
                </Paper>
              ))}
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>

      {/* Failure Rate by Pickup Mode */}
      <Grid size={{ xs: 12, md: 6 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Failure Rate by Pickup Mode
            </Typography>
            <Stack spacing={2}>
              {modeFailureData.map((mode, index) => (
                <Paper key={index} sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {mode.mode === 'pickup' ? 'Agent → User' : 'User → Agent'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">{mode.totalPickups} requests</Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        color={getFailureRateColor(mode.failureRate) + '.main' as any}
                      >
                        {mode.failureRate.toFixed(1)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {mode.failures} failures
                      </Typography>
                    </Box>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={mode.failureRate} 
                    color={getFailureRateColor(mode.failureRate) as any}
                    sx={{ mt: 1 }}
                  />
                </Paper>
              ))}
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>

      {/* Auto-match vs User-selected Failures */}
      <Grid size={{ xs: 12, md: 6 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Auto-match vs User-selected Failures
            </Typography>
            <Stack spacing={2}>
              {matchTypeData.map((match, index) => (
                <Paper key={index} sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {match.type === 'auto' ? 'Auto-matched' : 'User-selected'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">{match.totalPickups} requests</Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        color={getFailureRateColor(match.failureRate) + '.main' as any}
                      >
                        {match.failureRate.toFixed(1)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {match.failures} failures
                      </Typography>
                    </Box>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={match.failureRate} 
                    color={getFailureRateColor(match.failureRate) as any}
                    sx={{ mt: 1 }}
                  />
                </Paper>
              ))}
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>

      {/* Peak-hour Failure Analysis */}
      <Grid size={{ xs: 12, md: 6 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Peak-hour Failure Analysis
            </Typography>
            <Stack spacing={2}>
              {peakHourData.map((hour, index) => (
                <Paper key={index} sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{hour.timeRange}</Typography>
                      <Typography variant="caption" color="text.secondary">{hour.totalPickups} requests</Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        color={getFailureRateColor(hour.failureRate) + '.main' as any}
                      >
                        {hour.failureRate.toFixed(1)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {hour.failures} failures
                      </Typography>
                    </Box>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={hour.failureRate} 
                    color={getFailureRateColor(hour.failureRate) as any}
                    sx={{ mt: 1 }}
                  />
                </Paper>
              ))}
            </Stack>
            <Alert severity="info" sx={{ mt: 2 }}>
              Peak hours show higher failure rates due to demand spikes
            </Alert>
          </Box>
        </DashboardCard>
      </Grid>

      {/* Agent-driven vs System-driven Cancellations */}
      <Grid size={{ xs: 12 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Agent-driven vs System-driven Cancellations
            </Typography>
            <Stack spacing={2}>
              {agentVsSystemData.map((source, index) => (
                <Paper key={index} sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{source.source}</Typography>
                      <Typography variant="caption" color="text.secondary">{source.totalPickups} requests</Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        color={getFailureRateColor(source.failureRate) + '.main' as any}
                      >
                        {source.failureRate.toFixed(1)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {source.failures} failures
                      </Typography>
                    </Box>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={source.failureRate} 
                    color={getFailureRateColor(source.failureRate) as any}
                    sx={{ mt: 1 }}
                  />
                </Paper>
              ))}
            </Stack>
            <Alert severity="warning" sx={{ mt: 2 }}>
              High agent-driven cancellations may indicate reliability issues
            </Alert>
          </Box>
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default FailureInsightsAnalytics;
