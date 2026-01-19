'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress } from '@mui/material';
import { 
  IconChartBar,
  IconTrendingUp,
  IconUsers
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface PerformanceDistributionProps {
  onRangeClick?: (range: string) => void;
}

const PerformanceDistribution: React.FC<PerformanceDistributionProps> = ({ onRangeClick }) => {
  // Mock data for performance distribution
  const distributionData = [
    {
      range: '0–10 pickups',
      count: 8,
      percentage: 6.1,
      color: 'error',
      description: 'Low activity agents'
    },
    {
      range: '11–30 pickups',
      count: 35,
      percentage: 26.5,
      color: 'warning',
      description: 'Below average performers'
    },
    {
      range: '31–60 pickups',
      count: 67,
      percentage: 50.8,
      color: 'info',
      description: 'Average performers'
    },
    {
      range: '60+ pickups',
      count: 22,
      percentage: 16.6,
      color: 'success',
      description: 'High performers'
    }
  ];

  const totalAgents = distributionData.reduce((sum, item) => sum + item.count, 0);
  const avgPickups = 37; // From summary cards

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
    <DashboardCard title="Performance Distribution">
      <Box sx={{ width: '100%' }}>
        {/* Distribution Overview */}
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
                Agent Capacity Distribution
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Understanding agent workload and performance spread
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Distribution Bars */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          {distributionData.map((item, index) => (
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
                  borderColor: getColor(item.color),
                }
              }}
              onClick={() => onRangeClick?.(item.range)}
            >
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        {item.range}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="h6" fontWeight={700} color={getColor(item.color)}>
                        {item.count}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ({item.percentage}%)
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <LinearProgress
                      variant="determinate"
                      value={item.percentage}
                      sx={{
                        flex: 1,
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getProgressColor(item.color),
                          borderRadius: 4,
                        },
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ minWidth: 40 }}>
                      {item.percentage}%
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Insights Section */}
        <Card sx={{ border: '1px solid', borderColor: 'info.light' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom color="info.main">
              📊 Leadership Insights
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Staffing Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {distributionData[0].count + distributionData[1].count} agents ({(distributionData[0].percentage + distributionData[1].percentage).toFixed(1)}%) are underperforming
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {distributionData[3].count} top agents ({distributionData[3].percentage}%) handle disproportionate workload
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Capacity Planning
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Average performance: {avgPickups} pickups per agent
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • High performers exceed average by {Math.round((60 / avgPickups - 1) * 100)}%
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Risk Assessment
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Over-reliance on {distributionData[3].count} agents creates operational risk
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {distributionData[0].count} agents may need additional training or support
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            💡 Recommendations
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • Consider incentive programs for low-activity agents to improve engagement
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Develop B2B priority pool using top {distributionData[3].count} performers
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Monitor workload distribution to prevent agent burnout
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Target recruitment to balance agent capacity across zones
            </Typography>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default PerformanceDistribution;
