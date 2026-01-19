'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress } from '@mui/material';
import { 
  IconChartLine,
  IconTrendingUp,
  IconTrendingDown,
  IconActivity
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface DurationTrendsOverTimeProps {
  onTimeRangeClick?: (range: string) => void;
}

const DurationTrendsOverTime: React.FC<DurationTrendsOverTimeProps> = ({ 
  onTimeRangeClick 
}) => {
  // Mock trend data for duration over time
  const trendData = [
    {
      date: '2024-01-01',
      avgDuration: 42,
      percentile90: 58,
      pickupCount: 156,
      improvement: 'Agent routing optimization',
      slaCompliance: 78.2
    },
    {
      date: '2024-01-02',
      avgDuration: 45,
      percentile90: 62,
      pickupCount: 142,
      improvement: 'Weather delays',
      slaCompliance: 74.6
    },
    {
      date: '2024-01-03',
      avgDuration: 38,
      percentile90: 54,
      pickupCount: 178,
      improvement: 'New agent onboarding',
      slaCompliance: 82.0
    },
    {
      date: '2024-01-04',
      avgDuration: 51,
      percentile90: 68,
      pickupCount: 134,
      improvement: 'System maintenance',
      slaCompliance: 69.4
    },
    {
      date: '2024-01-05',
      avgDuration: 39,
      percentile90: 55,
      pickupCount: 165,
      improvement: 'Zone rebalancing',
      slaCompliance: 80.6
    },
    {
      date: '2024-01-06',
      avgDuration: 43,
      percentile90: 59,
      pickupCount: 151,
      improvement: 'Normal operations',
      slaCompliance: 76.8
    },
    {
      date: '2024-01-07',
      avgDuration: 36,
      percentile90: 52,
      pickupCount: 189,
      improvement: 'Peak performance',
      slaCompliance: 84.1
    }
  ];

  const getColor = (colorType: string) => {
    switch (colorType) {
      case 'success': return 'success.main';
      case 'warning': return 'warning.main';
      case 'error': return 'error.main';
      case 'info': return 'info.main';
      default: return 'primary.main';
    }
  };

  const getProgressColor = (duration: number) => {
    if (duration <= 35) return '#10b981';
    if (duration <= 45) return '#3b82f6';
    if (duration <= 55) return '#f59e0b';
    return '#ef4444';
  };

  const getDurationColor = (duration: number) => {
    if (duration <= 35) return 'success';
    if (duration <= 45) return 'info';
    if (duration <= 55) return 'warning';
    return 'error';
  };

  const getPercentileColor = (percentile: number) => {
    if (percentile <= 50) return 'success';
    if (percentile <= 60) return 'info';
    if (percentile <= 70) return 'warning';
    return 'error';
  };

  // Calculate averages
  const avgDuration = Math.round(trendData.reduce((sum, day) => sum + day.avgDuration, 0) / trendData.length);
  const avgPercentile90 = Math.round(trendData.reduce((sum, day) => sum + day.percentile90, 0) / trendData.length);
  const avgSlaCompliance = Math.round(trendData.reduce((sum, day) => sum + day.slaCompliance, 0) / trendData.length * 10) / 10;

  return (
    <DashboardCard title="Duration Trends Over Time">
      <Box sx={{ width: '100%' }}>
        {/* Overview */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: 'primary.light',
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <IconChartLine size={24} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Performance Trends Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average and 90th percentile duration trends over time
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Summary Stats */}
        <Card sx={{ border: '1px solid', borderColor: 'info.light', mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom color="info.main">
              📊 Trend Summary
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconActivity size={20} color="primary.main" />
                  <Typography variant="body2" fontWeight={600}>
                    Average Duration
                  </Typography>
                </Stack>
                <Typography variant="h6" fontWeight={700} color={getColor(getDurationColor(avgDuration))}>
                  {avgDuration} mins
                </Typography>
              </Stack>
              
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconTrendingUp size={20} color="error.main" />
                  <Typography variant="body2" fontWeight={600">
                    90th Percentile
                  </Typography>
                </Stack>
                <Typography variant="h6" fontWeight={700} color={getColor(getPercentileColor(avgPercentile90))}>
                  {avgPercentile90} mins
                </Typography>
              </Stack>
              
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconActivity size={20} color="success.main" />
                  <Typography variant="body2" fontWeight={600">
                    SLA Compliance
                  </Typography>
                </Stack>
                <Typography variant="h6" fontWeight={700} color="success.main">
                  {avgSlaCompliance}%
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Daily Trends */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Daily Performance Trends
          </Typography>
          {trendData.map((day, index) => (
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
                  borderColor: getColor(getDurationColor(day.avgDuration)),
                }
              }}
              onClick={() => onTimeRangeClick?.(day.date)}
            >
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        {new Date(day.date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {day.improvement}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h6" fontWeight={700} color={getColor(getDurationColor(day.avgDuration))}>
                          {day.avgDuration}m
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          avg
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h6" fontWeight={700} color={getColor(getPercentileColor(day.percentile90))}>
                          {day.percentile90}m
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          90th
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="caption" color="primary.main">
                          Average Duration
                        </Typography>
                        <Typography variant="caption" color="primary.main" fontWeight={600}>
                          {day.avgDuration} mins
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={(day.avgDuration / 70) * 100} // Scale to 70 min max
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getProgressColor(day.avgDuration),
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="caption" color="error.main">
                          90th Percentile
                        </Typography>
                        <Typography variant="caption" color="error.main" fontWeight={600}>
                          {day.percentile90} mins
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={(day.percentile90 / 80) * 100} // Scale to 80 min max
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getProgressColor(day.percentile90),
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Box>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack spacing={1} sx={{ textAlign: 'left' }}>
                      <Typography variant="caption" color="text.secondary">
                        Pickups
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="info.main">
                        {day.pickupCount}
                      </Typography>
                    </Stack>
                    <Stack spacing={1} sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" color="text.secondary">
                        SLA Compliance
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color={day.slaCompliance >= 80 ? 'success.main' : day.slaCompliance >= 70 ? 'warning.main' : 'error.main'}>
                        {day.slaCompliance}%
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Key Insights */}
        <Card sx={{ border: '1px solid', borderColor: 'success.light' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom color="success.main">
              📈 Trend Analysis Insights
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Performance Patterns
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Best performance on Jan 7 (36 mins) - peak operational efficiency
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Worst performance on Jan 4 (51 mins) - system maintenance impact
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Consistent improvement after agent onboarding (Jan 3)
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Impact Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Agent routing optimization reduced average by 6 minutes (14% improvement)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Zone rebalancing improved 90th percentile by 6 minutes (10% improvement)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Weather events increased duration by 7 minutes (16% degradation)
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Consistency Metrics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 90th percentile consistently 15-20 minutes above average
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • SLA compliance ranges from 69% to 84% - shows operational variability
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Volume correlates with performance - higher volume = better efficiency
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight={600} gutterBottom>
            💡 Performance Optimization Strategies
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • Scale agent onboarding program - shows 11% performance improvement
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Implement weather contingency plans - reduces weather impact by 50%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Schedule maintenance during low-volume periods
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Monitor 90th percentile trends to detect systemic issues early
            </Typography>
          </Stack>
        </Box>

        {/* Performance Score */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight={600} gutterBottom color="success.dark">
            🎯 Performance Health Score
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Current Average
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                42 mins (Good)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                90th Percentile
              </Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                58 mins (Moderate)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                SLA Compliance
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                77.8% (Good)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                7-Day Trend
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                Improving ↗️
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default DurationTrendsOverTime;
