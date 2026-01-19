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

interface ResponseTimeDistributionProps {
  onRangeClick?: (range: string) => void;
}

const ResponseTimeDistribution: React.FC<ResponseTimeDistributionProps> = ({ onRangeClick }) => {
  // Mock data for response time distribution
  const distributionData = [
    {
      range: '< 1 min',
      count: 18,
      percentage: 13.6,
      color: 'success',
      description: 'Excellent response time'
    },
    {
      range: '1–3 min',
      count: 45,
      percentage: 34.1,
      color: 'success',
      description: 'Fast response time'
    },
    {
      range: '3–5 min',
      count: 42,
      percentage: 31.8,
      color: 'warning',
      description: 'Acceptable response time'
    },
    {
      range: '> 5 min',
      count: 27,
      percentage: 20.5,
      color: 'error',
      description: 'Poor response time'
    }
  ];

  const totalAgents = distributionData.reduce((sum, item) => sum + item.count, 0);
  const avgResponseTime = 272; // 4m 32s from summary cards

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
    <DashboardCard title="Response Time Distribution">
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
                System-wide Responsiveness
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Distribution of agent response times across all requests
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
              📊 System Health Insights
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Responsiveness Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {distributionData[0].count + distributionData[1].count} agents ({(distributionData[0].percentage + distributionData[1].percentage).toFixed(1)}%) respond within 3 minutes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {distributionData[3].count} agents ({distributionData[3].percentage}%) exceed 5-minute SLA threshold
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Average system response time: {Math.floor(avgResponseTime / 60)}m {avgResponseTime % 60}s
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Structural Issues
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {distributionData[3].percentage}% of responses indicate potential coverage gaps
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Peak response delays likely during high-demand periods
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Performance Impact
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Fast responders ({distributionData[0].percentage}%) likely improve user satisfaction
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Slow responders may cause user drop-offs and manual reassignments
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            💡 Optimization Recommendations
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • Implement response time incentives for agents in &gt;5min range
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Consider agent density adjustments in zones with poor response times
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Monitor peak hours and implement dynamic agent allocation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Set up automated alerts for SLA breaches in real-time
            </Typography>
          </Stack>
        </Box>

        {/* SLA Summary */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom color="warning.dark">
            ⚠️ SLA Compliance Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Excellent (≤ 2 min)
              </Typography>
              <Typography variant="caption" fontWeight={600} color="success.main">
                {distributionData[0].percentage}% of agents
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Acceptable (2–5 min)
              </Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                {distributionData[2].percentage}% of agents
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Poor (&gt; 5 min) - SLA Breach
              </Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {distributionData[3].percentage}% of agents
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Overall SLA Compliance
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                {(distributionData[0].percentage + distributionData[1].percentage + distributionData[2].percentage).toFixed(1)}%
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default ResponseTimeDistribution;
