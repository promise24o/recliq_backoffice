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

interface RetentionChurnTrendChartProps {
  onTimeRangeClick?: (range: string) => void;
}

const RetentionChurnTrendChart: React.FC<RetentionChurnTrendChartProps> = ({ 
  onTimeRangeClick 
}) => {
  // Mock trend data for retention and churn over time
  const trendData = [
    {
      month: 'Oct 2023',
      retentionRate: 58,
      churnRate: 42,
      newUsers: 892,
      returningUsers: 517,
      improvements: 'Initial onboarding'
    },
    {
      month: 'Nov 2023',
      retentionRate: 60,
      churnRate: 40,
      newUsers: 945,
      returningUsers: 567,
      improvements: 'Agent response optimization'
    },
    {
      month: 'Dec 2023',
      retentionRate: 59,
      churnRate: 41,
      newUsers: 1123,
      returningUsers: 663,
      improvements: 'Holiday campaigns'
    },
    {
      month: 'Jan 2024',
      retentionRate: 62,
      churnRate: 38,
      newUsers: 1240,
      returningUsers: 768,
      improvements: 'New user onboarding flow'
    },
    {
      month: 'Feb 2024',
      retentionRate: 64,
      churnRate: 36,
      newUsers: 1187,
      returningUsers: 760,
      improvements: 'Pricing transparency updates'
    },
    {
      month: 'Mar 2024',
      retentionRate: 65,
      churnRate: 35,
      newUsers: 1298,
      returningUsers: 844,
      improvements: 'Agent density increase'
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

  const getProgressColor = (rate: number, isRetention: boolean) => {
    if (isRetention) {
      if (rate >= 65) return '#10b981';
      if (rate >= 60) return '#3b82f6';
      if (rate >= 55) return '#f59e0b';
      return '#ef4444';
    } else {
      // For churn, lower is better
      if (rate <= 35) return '#10b981';
      if (rate <= 40) return '#3b82f6';
      if (rate <= 45) return '#f59e0b';
      return '#ef4444';
    }
  };

  const getRetentionColor = (rate: number) => {
    if (rate >= 65) return 'success';
    if (rate >= 60) return 'info';
    if (rate >= 55) return 'warning';
    return 'error';
  };

  const getChurnColor = (rate: number) => {
    if (rate <= 35) return 'success';
    if (rate <= 40) return 'info';
    if (rate <= 45) return 'warning';
    return 'error';
  };

  return (
    <DashboardCard title="Retention vs Churn Trends">
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
                Retention & Churn Over Time
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monthly trends showing user retention and churn patterns
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Trend Chart Visualization */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          {trendData.map((data, index) => (
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
                  borderColor: getColor(getRetentionColor(data.retentionRate)),
                }
              }}
              onClick={() => onTimeRangeClick?.(data.month)}
            >
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        {data.month}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {data.improvements}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconTrendingUp size={16} color={getColor(getRetentionColor(data.retentionRate))} />
                        <Typography variant="h6" fontWeight={700} color={getColor(getRetentionColor(data.retentionRate))}>
                          {data.retentionRate}%
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconTrendingDown size={16} color={getColor(getChurnColor(data.churnRate))} />
                        <Typography variant="h6" fontWeight={700} color={getColor(getChurnColor(data.churnRate))}>
                          {data.churnRate}%
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="caption" color="success.main">
                          Retention Rate
                        </Typography>
                        <Typography variant="caption" color="success.main" fontWeight={600}>
                          {data.retentionRate}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={data.retentionRate}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getProgressColor(data.retentionRate, true),
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="caption" color="error.main">
                          Churn Rate
                        </Typography>
                        <Typography variant="caption" color="error.main" fontWeight={600}>
                          {data.churnRate}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={data.churnRate}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getProgressColor(data.churnRate, false),
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack spacing={1} sx={{ textAlign: 'left' }}>
                      <Typography variant="caption" color="text.secondary">
                        New Users
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="info.main">
                        {data.newUsers.toLocaleString()}
                      </Typography>
                    </Stack>
                    <Stack spacing={1} sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" color="text.secondary">
                        Returning Users
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="success.main">
                        {data.returningUsers.toLocaleString()}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Key Insights */}
        <Card sx={{ border: '1px solid', borderColor: 'info.light' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom color="info.main">
              📈 Trend Analysis Insights
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Positive Trends
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Retention rate improved from 58% to 65% (+7 points) over 6 months
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Churn rate decreased from 42% to 35% (-7 points) - significant improvement
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Returning users grew from 517 to 844 (+63%) - strong user loyalty
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Impact Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • New onboarding flow (Jan) drove 4-point retention improvement
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Agent density increase (Mar) correlated with highest retention (65%)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Pricing transparency (Feb) reduced churn by 2 percentage points
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Seasonal Patterns
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Holiday campaigns (Dec) increased new users but didn't improve retention
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Q1 2024 shows consistent improvement across all metrics
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            💡 Strategic Recommendations
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • Continue agent density investments - shows strongest retention correlation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Scale successful onboarding improvements to all new user segments
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Focus on converting holiday users to returning users with better follow-up
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Monitor for retention plateau at 65% - plan next improvement initiatives
            </Typography>
          </Stack>
        </Box>

        {/* Health Score */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom color="success.dark">
            🎯 Retention Health Score
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Current Retention Rate
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                65% (Excellent)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Current Churn Rate
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                35% (Good)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                6-Month Trend
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                Strongly Improving ↗️
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Business Health
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                Sustainable Growth ✅
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default RetentionChurnTrendChart;
