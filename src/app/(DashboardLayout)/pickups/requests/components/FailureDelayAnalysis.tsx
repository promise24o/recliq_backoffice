'use client'
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, LinearProgress, Stack } from '@mui/material';
import { 
  IconX, 
  IconAlertTriangle, 
  IconClock,
  IconCar,
  IconUsers,
  IconTrendingUp
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface FailureAnalysis {
  totalFailures: number;
  failureReasons: {
    noAvailableAgent: number;
    agentRejection: number;
    timeout: number;
    userCancellation: number;
  };
  delayCauses: {
    supplyShortage: number;
    distance: number;
    peakHourCongestion: number;
    agentFlakiness: number;
  };
  cityBreakdown: Record<string, {
    failures: number;
    delays: number;
    totalRequests: number;
  }>;
}

interface FailureDelayAnalysisProps {
  data: FailureAnalysis;
}

const FailureDelayAnalysis: React.FC<FailureDelayAnalysisProps> = ({ data }) => {
  const getFailureReasonData = () => [
    { label: 'No Available Agent', value: data.failureReasons.noAvailableAgent, percentage: (data.failureReasons.noAvailableAgent / data.totalFailures) * 100 },
    { label: 'Agent Rejection', value: data.failureReasons.agentRejection, percentage: (data.failureReasons.agentRejection / data.totalFailures) * 100 },
    { label: 'Timeout', value: data.failureReasons.timeout, percentage: (data.failureReasons.timeout / data.totalFailures) * 100 },
    { label: 'User Cancellation', value: data.failureReasons.userCancellation, percentage: (data.failureReasons.userCancellation / data.totalFailures) * 100 },
  ];

  const getDelayCauseData = () => [
    { label: 'Supply Shortage', value: data.delayCauses.supplyShortage },
    { label: 'Distance', value: data.delayCauses.distance },
    { label: 'Peak Hour Congestion', value: data.delayCauses.peakHourCongestion },
    { label: 'Agent Flakiness', value: data.delayCauses.agentFlakiness },
  ];

  const getCityData = () => Object.entries(data.cityBreakdown).map(([city, stats]) => ({
    city,
    ...stats,
    failureRate: (stats.failures / stats.totalRequests) * 100,
    delayRate: (stats.delays / stats.totalRequests) * 100
  }));

  return (
    <DashboardCard title="Failure & Delay Analysis">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📉 Performance insights - Understanding where and why pickups fail
          </Typography>
        </Box>

        {/* Summary Stats */}
        <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
          <Box flex={1}>
            <Typography variant="h4" fontWeight={700} color="error.main">
              {data.totalFailures}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Failures
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography variant="h4" fontWeight={700} color="warning.main">
              {Object.values(data.delayCauses).reduce((a, b) => a + b, 0)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Delays
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography variant="h4" fontWeight={700} color="info.main">
              {Object.keys(data.cityBreakdown).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cities Analyzed
            </Typography>
          </Box>
        </Stack>

        {/* Failure Reasons */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Failure Reasons
            </Typography>
            <Stack spacing={2}>
              {getFailureReasonData().map((reason, index) => (
                <Box key={index}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      {reason.label}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {reason.value} ({reason.percentage.toFixed(1)}%)
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={reason.percentage}
                    color="error"
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Delay Causes */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Delay Causes
            </Typography>
            <Stack spacing={2}>
              {getDelayCauseData().map((cause, index) => (
                <Box key={index}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      {cause.label}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {cause.value}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(cause.value / Object.values(data.delayCauses).reduce((a, b) => a + b, 0)) * 100}
                    color="warning"
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* City Breakdown */}
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          City Performance Breakdown
        </Typography>
        <Grid container spacing={2}>
          {getCityData().map((cityData, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card variant="outlined">
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {cityData.city}
                  </Typography>
                  <Stack spacing={1}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Failure Rate
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" fontWeight={600} color="error.main">
                          {cityData.failureRate.toFixed(1)}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={cityData.failureRate}
                          color="error"
                          sx={{ flex: 1, height: 4 }}
                        />
                      </Stack>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Delay Rate
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" fontWeight={600} color="warning.main">
                          {cityData.delayRate.toFixed(1)}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={cityData.delayRate}
                          color="warning"
                          sx={{ flex: 1, height: 4 }}
                        />
                      </Stack>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Total Requests
                      </Typography>
                      <Typography variant="body2">
                        {cityData.totalRequests}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Insights */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Key Insights
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" component="div">
              • {data.failureReasons.noAvailableAgent > data.failureReasons.agentRejection ? 
                'Supply shortage is the primary failure cause' : 
                'Agent rejections are the primary failure cause'}
            </Typography>
            <Typography variant="body2" component="div">
              • {data.delayCauses.supplyShortage > data.delayCauses.distance ? 
                'Supply shortages are causing most delays' : 
                'Distance issues are the main delay factor'}
            </Typography>
            <Typography variant="body2" component="div">
              • {getCityData()[0]?.failureRate > 20 ? 
                'Some cities need immediate attention for high failure rates' : 
                'Failure rates are within acceptable ranges across cities'}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </DashboardCard>
  );
};

export default FailureDelayAnalysis;
