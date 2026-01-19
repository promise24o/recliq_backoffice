'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress } from '@mui/material';
import { 
  IconChartBar,
  IconRecycle,
  IconTrendingUp,
  IconActivity
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface FrequencyDistributionProps {
  onFrequencyBandClick?: (band: string) => void;
}

const FrequencyDistribution: React.FC<FrequencyDistributionProps> = ({ 
  onFrequencyBandClick 
}) => {
  // Mock data for frequency distribution
  const frequencyBands = [
    {
      band: '1× / month',
      count: 1042,
      percentage: 27.1,
      description: 'Occasional recyclers',
      color: 'error',
      trend: -3.8
    },
    {
      band: '2–3× / month',
      count: 1567,
      percentage: 40.8,
      description: 'Regular recyclers',
      color: 'warning',
      trend: 5.2
    },
    {
      band: '4–5× / month',
      count: 876,
      percentage: 22.8,
      description: 'Frequent recyclers',
      color: 'info',
      trend: 12.5
    },
    {
      band: '6+ / month',
      count: 357,
      percentage: 9.3,
      description: 'Power recyclers',
      color: 'success',
      trend: 18.7
    }
  ];

  const totalUsers = frequencyBands.reduce((sum, band) => sum + band.count, 0);
  const avgFrequency = 2.8; // from summary cards

  const getColor = (colorType: string) => {
    switch (colorType) {
      case 'success': return 'success.main';
      case 'warning': return 'warning.main';
      case 'error': return 'error.main';
      case 'info': return 'info.main';
      default: return 'primary.main';
    }
  };

  const getBgColor = (colorType: string) => {
    switch (colorType) {
      case 'success': return 'success.light';
      case 'warning': return 'warning.light';
      case 'error': return 'error.light';
      case 'info': return 'info.light';
      default: return 'primary.light';
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

  return (
    <DashboardCard title="Frequency Distribution">
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
                Recycling Habit Distribution
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Understanding user recycling patterns and habit formation
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Distribution Bars */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          {frequencyBands.map((band, index) => (
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
                  borderColor: getColor(band.color),
                }
              }}
              onClick={() => onFrequencyBandClick?.(band.band)}
            >
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        {band.band}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {band.description}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="h6" fontWeight={700} color={getColor(band.color)}>
                        {band.count.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ({band.percentage}%)
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <LinearProgress
                      variant="determinate"
                      value={band.percentage}
                      sx={{
                        flex: 1,
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getProgressColor(band.color),
                          borderRadius: 4,
                        },
                      }}
                    />
                    <Typography variant="caption" color={band.trend > 0 ? 'success.main' : 'error.main'}>
                      {band.trend > 0 ? '+' : ''}{band.trend}%
                    </Typography>
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
              📊 Habit Formation Analysis
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  User Behavior Insights
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {frequencyBands[0].percentage}% of users are occasional recyclers (1×/month) - opportunity for habit building
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {frequencyBands[1].percentage}% are regular recyclers (2–3×/month) - core user base
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {frequencyBands[2].percentage + frequencyBands[3].percentage}% are frequent/power recyclers - strong habit formation
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Growth Patterns
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Power recyclers showing strongest growth (+{frequencyBands[3].trend}%)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Occasional recyclers declining (-{Math.abs(frequencyBands[0].trend)}%) - potential churn risk
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Habit Strength Indicators
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Average frequency: {avgFrequency}/month indicates moderate habit formation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {frequencyBands[2].percentage + frequencyBands[3].percentage}% of users show strong recycling habits
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            💡 Habit Building Strategies
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • Target occasional recyclers with reminder campaigns and incentives
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Create loyalty programs for regular recyclers to encourage frequency increase
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Recognize power recyclers as brand ambassadors and community leaders
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Analyze barriers preventing occasional users from becoming regular recyclers
            </Typography>
          </Stack>
        </Box>

        {/* Frequency Summary */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom color="success.dark">
            ♻️ Frequency Health Score
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Strong Habit Users (&ge;4×/month)
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                {frequencyBands[2].percentage + frequencyBands[3].percentage}%
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                At Risk Users (&le;1×/month)
              </Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {frequencyBands[0].percentage}%
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Overall Habit Strength
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                {avgFrequency}/month average
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default FrequencyDistribution;
