'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress } from '@mui/material';
import { 
  IconChartBar,
  IconClock,
  IconTrendingUp,
  IconAlertTriangle
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface PickupDurationDistributionProps {
  onDurationRangeClick?: (range: string) => void;
}

const PickupDurationDistribution: React.FC<PickupDurationDistributionProps> = ({ 
  onDurationRangeClick 
}) => {
  // Mock duration distribution data
  const durationDistribution = [
    {
      range: '0-15 mins',
      count: 342,
      percentage: 18.5,
      color: 'success'
    },
    {
      range: '15-30 mins',
      count: 678,
      percentage: 36.7,
      color: 'success'
    },
    {
      range: '30-45 mins',
      count: 456,
      percentage: 24.7,
      color: 'warning'
    },
    {
      range: '45-60 mins',
      count: 234,
      percentage: 12.7,
      color: 'warning'
    },
    {
      range: '60-90 mins',
      count: 98,
      percentage: 5.3,
      color: 'error'
    },
    {
      range: '90+ mins',
      count: 42,
      percentage: 2.1,
      color: 'error'
    }
  ];

  // Mock SLA and percentile data
  const slaThreshold = 45; // minutes
  const medianDuration = 32;
  const percentile90 = 58;
  const totalPickups = 1850;

  const getColor = (colorType: string) => {
    switch (colorType) {
      case 'success': return 'success.main';
      case 'warning': return 'warning.main';
      case 'error': return 'error.main';
      case 'info': return 'info.main';
      default: return 'primary.main';
    }
  };

  const getProgressColor = (colorType: string) => {
    switch (colorType) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getDurationColor = (maxDuration: number) => {
    if (maxDuration <= 30) return 'success';
    if (maxDuration <= 60) return 'warning';
    return 'error';
  };

  return (
    <DashboardCard title="Pickup Duration Distribution">
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
              <IconChartBar size={24} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Duration Frequency Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Distribution of pickup completion times
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Histogram Visualization */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          {durationDistribution.map((bucket, index) => (
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
                  borderColor: getColor(bucket.color),
                }
              }}
              onClick={() => onDurationRangeClick?.(bucket.range)}
            >
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="body1" fontWeight={600}>
                      {bucket.range}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="h6" fontWeight={700} color={getColor(bucket.color)}>
                        {bucket.count}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ({bucket.percentage}%)
                      </Typography>
                    </Stack>
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={bucket.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getProgressColor(bucket.color),
                        borderRadius: 4,
                      },
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* SLA and Percentile Indicators */}
        <Card sx={{ border: '1px solid', borderColor: 'info.light', mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom color="info.main">
              📊 Performance Benchmarks
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconAlertTriangle size={20} color="warning.main" />
                  <Typography variant="body2" fontWeight={600}>
                    SLA Threshold
                  </Typography>
                </Stack>
                <Typography variant="h6" fontWeight={700} color="warning.main">
                  {slaThreshold} mins
                </Typography>
              </Stack>
              
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconClock size={20} color="info.main" />
                  <Typography variant="body2" fontWeight={600}>
                    Median Duration
                  </Typography>
                </Stack>
                <Typography variant="h6" fontWeight={700} color="info.main">
                  {medianDuration} mins
                </Typography>
              </Stack>
              
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconTrendingUp size={20} color="error.main" />
                  <Typography variant="body2" fontWeight={600}>
                    90th Percentile
                  </Typography>
                </Stack>
                <Typography variant="h6" fontWeight={700} color="error.main">
                  {percentile90} mins
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card sx={{ border: '1px solid', borderColor: 'success.light' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom color="success.main">
              📈 Distribution Analysis Insights
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                    Performance Patterns
                  </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 55.2% of pickups completed within 30 minutes - excellent baseline performance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 18.5% completed in under 15 minutes - exceptional fast pickups
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 7.4% exceed 60 minutes - indicates systemic delays in some areas
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  SLA Compliance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 79.9% of pickups meet 45-minute SLA threshold
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Long-tail delays (90+ mins) represent 2.1% but impact user satisfaction significantly
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Operational Implications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Median (32 mins) significantly below SLA - healthy operational capacity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 90th percentile (58 mins) above SLA - indicates outlier performance issues
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight={600} gutterBottom>
            💡 Optimization Opportunities
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • Focus on reducing 45-60 minute pickups - represents 12.7% of total volume
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Investigate root causes of 90+ minute delays - high impact on user experience
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Scale practices from under-15 minute segment to improve overall performance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Monitor 90th percentile trends to detect systemic performance degradation
            </Typography>
          </Stack>
        </Box>

        {/* Summary Stats */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight={600} gutterBottom color="info.dark">
            📊 Distribution Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Total Pickups Analyzed
              </Typography>
              <Typography variant="caption" fontWeight={600} color="info.main">
                {totalPickups.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                SLA Compliance Rate
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                79.9%
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Performance Consistency
              </Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                Moderate (26 min spread)
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default PickupDurationDistribution;
