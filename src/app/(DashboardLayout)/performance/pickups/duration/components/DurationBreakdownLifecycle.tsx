'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress } from '@mui/material';
import { 
  IconChartBar,
  IconNavigation,
  IconTruck,
  IconCheck,
  IconClock
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface DurationBreakdownLifecycleProps {
  onStageClick?: (stage: string) => void;
}

const DurationBreakdownLifecycle: React.FC<DurationBreakdownLifecycleProps> = ({ 
  onStageClick 
}) => {
  // Mock lifecycle breakdown data
  const lifecycleData = [
    {
      date: '2024-01-01',
      totalDuration: 42,
      stages: {
        requestToAssignment: 9,
        assignmentToArrival: 21,
        arrivalToCompletion: 12
      },
      pickupCount: 156
    },
    {
      date: '2024-01-02',
      totalDuration: 45,
      stages: {
        requestToAssignment: 11,
        assignmentToArrival: 23,
        arrivalToCompletion: 11
      },
      pickupCount: 142
    },
    {
      date: '2024-01-03',
      totalDuration: 38,
      stages: {
        requestToAssignment: 8,
        assignmentToArrival: 19,
        arrivalToCompletion: 11
      },
      pickupCount: 178
    },
    {
      date: '2024-01-04',
      totalDuration: 51,
      stages: {
        requestToAssignment: 12,
        assignmentToArrival: 26,
        arrivalToCompletion: 13
      },
      pickupCount: 134
    },
    {
      date: '2024-01-05',
      totalDuration: 39,
      stages: {
        requestToAssignment: 7,
        assignmentToArrival: 20,
        arrivalToCompletion: 12
      },
      pickupCount: 165
    },
    {
      date: '2024-01-06',
      totalDuration: 43,
      stages: {
        requestToAssignment: 9,
        assignmentToArrival: 22,
        arrivalToCompletion: 12
      },
      pickupCount: 151
    }
  ];

  // Stage definitions
  const stages = [
    {
      key: 'requestToAssignment',
      name: 'Request → Assignment',
      icon: <IconNavigation size={16} />,
      color: 'success',
      description: 'Time to assign agent to pickup request'
    },
    {
      key: 'assignmentToArrival',
      name: 'Assignment → Arrival',
      icon: <IconTruck size={16} />,
      color: 'warning',
      description: 'Agent travel time to pickup location'
    },
    {
      key: 'arrivalToCompletion',
      name: 'Arrival → Completion',
      icon: <IconCheck size={16} />,
      color: 'info',
      description: 'On-site pickup processing time'
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

  const getProgressColor = (colorType: string) => {
    switch (colorType) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStageColor = (stageKey: string) => {
    switch (stageKey) {
      case 'requestToAssignment': return 'success';
      case 'assignmentToArrival': return 'warning';
      case 'arrivalToCompletion': return 'info';
      default: return 'primary';
    }
  };

  // Calculate averages
  const avgStages = stages.reduce((acc, stage) => {
    const total = lifecycleData.reduce((sum, day) => sum + day.stages[stage.key as keyof typeof day.stages], 0);
    acc[stage.key] = Math.round(total / lifecycleData.length);
    return acc;
  }, {} as Record<string, number>);

  const avgTotal = Math.round(lifecycleData.reduce((sum, day) => sum + day.totalDuration, 0) / lifecycleData.length);

  return (
    <DashboardCard title="Duration Breakdown by Lifecycle Stage">
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
                Lifecycle Stage Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average pickup duration broken down by lifecycle stages
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Average Breakdown */}
        <Card sx={{ border: '1px solid', borderColor: 'info.light', mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom color="info.main">
              📊 Average Duration Breakdown
            </Typography>
            <Stack spacing={2}>
              {stages.map((stage) => (
                <Box key={stage.key}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      {stage.icon}
                      <Typography variant="body2" fontWeight={600}>
                        {stage.name}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="h6" fontWeight={700} color={getColor(stage.color)}>
                        {avgStages[stage.key]} mins
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ({Math.round((avgStages[stage.key] / avgTotal) * 100)}%)
                      </Typography>
                    </Stack>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(avgStages[stage.key] / avgTotal) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getProgressColor(stage.color),
                        borderRadius: 4,
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {stage.description}
                  </Typography>
                </Box>
              ))}
              
              <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <IconClock size={20} color="primary.main" />
                    <Typography variant="body2" fontWeight={600}>
                      Total Average Duration
                    </Typography>
                  </Stack>
                  <Typography variant="h6" fontWeight={700} color="primary.main">
                    {avgTotal} mins
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Daily Breakdown */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Daily Breakdown Trends
          </Typography>
          {lifecycleData.map((day, index) => (
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
                  borderColor: 'primary.main',
                }
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        {new Date(day.date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {day.pickupCount} pickups
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconClock size={16} color="primary.main" />
                      <Typography variant="h6" fontWeight={700} color="primary.main">
                        {day.totalDuration} mins
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack spacing={1}>
                    {stages.map((stage) => (
                      <Stack key={stage.key} direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                          {stage.icon}
                          <Typography variant="caption" color="text.secondary">
                            {stage.name}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2" fontWeight={600} color={getColor(stage.color)}>
                            {day.stages[stage.key as keyof typeof day.stages]} mins
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={(day.stages[stage.key as keyof typeof day.stages] / day.totalDuration) * 100}
                            sx={{
                              width: 60,
                              height: 4,
                              borderRadius: 2,
                              bgcolor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getProgressColor(stage.color),
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Stack>
                      </Stack>
                    ))}
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
              🎯 Bottleneck Analysis
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Stage Performance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Assignment → Arrival is the biggest bottleneck (50% of total time)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Request → Assignment is most efficient (21% of total time)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Arrival → Completion is consistent (29% of total time)
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Operational Insights
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Travel time shows highest variance - indicates routing optimization opportunities
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Assignment time is stable - suggests good dispatch system performance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • On-site processing is consistent - indicates standardized agent training
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Improvement Opportunities
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Focus on routing optimization to reduce travel time by 15-20%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Consider zone-based agent allocation to minimize travel distances
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Maintain efficient dispatch system performance
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight={600} gutterBottom>
            💡 Strategic Recommendations
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • Implement dynamic routing algorithms to optimize agent travel paths
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Increase agent density in high-travel-time zones to reduce distances
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Maintain current dispatch efficiency - no major changes needed
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Monitor on-site processing consistency as volume scales
            </Typography>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default DurationBreakdownLifecycle;
