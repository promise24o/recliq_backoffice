'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { 
  IconChartBar,
  IconTrendingUp,
  IconCalendar,
  IconMap,
  IconActivity,
  IconUsers
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface ActivityDistributionTrendsProps {
  onTimeRangeClick?: (range: string) => void;
  onLocationClick?: (location: string) => void;
}

const ActivityDistributionTrends: React.FC<ActivityDistributionTrendsProps> = ({ 
  onTimeRangeClick, 
  onLocationClick 
}) => {
  // Mock data for active users over time
  const activeUsersOverTime = [
    {
      period: 'Last 7 days',
      activeUsers: 2847,
      previousPeriod: 2531,
      growth: 12.5,
      description: 'Weekly active users'
    },
    {
      period: 'Last 30 days',
      activeUsers: 3842,
      previousPeriod: 3418,
      growth: 12.4,
      description: 'Monthly active users'
    },
    {
      period: 'Last 90 days',
      activeUsers: 5234,
      previousPeriod: 4892,
      growth: 7.0,
      description: 'Quarterly active users'
    }
  ];

  // Mock data for daily vs weekly activity
  const activityPatterns = [
    {
      pattern: 'Daily Active Users',
      count: 2847,
      percentage: 74.1,
      description: 'Users active at least once per day'
    },
    {
      pattern: 'Weekly Active Users',
      count: 3842,
      percentage: 100,
      description: 'Users active at least once per week'
    },
    {
      pattern: 'Monthly Active Users',
      count: 5234,
      percentage: 136.2,
      description: 'Users active at least once per month'
    }
  ];

  // Mock data for engagement by location
  const locationEngagement = [
    {
      location: 'Lagos Mainland',
      activeUsers: 1456,
      percentage: 37.9,
      growth: 15.2,
      risk: 'high_growth'
    },
    {
      location: 'Lagos Island',
      activeUsers: 987,
      percentage: 25.7,
      growth: 8.7,
      risk: 'stable'
    },
    {
      location: 'Abuja Central',
      activeUsers: 654,
      percentage: 17.0,
      growth: 12.3,
      risk: 'high_growth'
    },
    {
      location: 'Port Harcourt',
      activeUsers: 445,
      percentage: 11.6,
      growth: 5.1,
      risk: 'stable'
    },
    {
      location: 'Kano',
      activeUsers: 300,
      percentage: 7.8,
      growth: 18.9,
      risk: 'high_growth'
    }
  ];

  // Mock data for seasonal patterns
  const seasonalPatterns = [
    {
      season: 'Q1 2024',
      activeUsers: 3234,
      growth: 8.5,
      trend: 'increasing',
      notes: 'Post-holiday recycling surge'
    },
    {
      season: 'Q4 2023',
      activeUsers: 2981,
      growth: 12.1,
      trend: 'increasing',
      notes: 'Holiday recycling campaigns'
    },
    {
      season: 'Q3 2023',
      activeUsers: 2659,
      growth: 5.2,
      trend: 'stable',
      notes: 'Summer maintenance period'
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

  const getGrowthColor = (growth: number) => {
    if (growth >= 15) return 'success';
    if (growth >= 5) return 'warning';
    return 'error';
  };

  return (
    <DashboardCard title="Activity Distribution & Trends">
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
                User Activity Trends
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Understanding user engagement patterns and seasonal variations
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Active Users Over Time */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Active Users Growth
          </Typography>
          <Stack spacing={2}>
            {activeUsersOverTime.map((period, index) => (
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
                    borderColor: getColor(getGrowthColor(period.growth)),
                  }
                }}
                onClick={() => onTimeRangeClick?.(period.period)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <IconCalendar size={20} />
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {period.period}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {period.description}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconTrendingUp size={16} color={getColor(getGrowthColor(period.growth))} />
                        <Typography variant="h6" fontWeight={700} color={getColor(getGrowthColor(period.growth))}>
                          +{period.growth}%
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">
                          Current Period
                        </Typography>
                        <Typography variant="h6" fontWeight={700} color="primary.main">
                          {period.activeUsers.toLocaleString()}
                        </Typography>
                      </Stack>
                      <Stack spacing={1} sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary">
                          Previous Period
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {period.previousPeriod.toLocaleString()}
                        </Typography>
                      </Stack>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={Math.min(period.growth * 5, 100)}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getProgressColor(getGrowthColor(period.growth)),
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Activity Patterns */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Engagement Patterns
          </Typography>
          <Stack spacing={2}>
            {activityPatterns.map((pattern, index) => (
              <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <IconActivity size={20} />
                        <Typography variant="body1" fontWeight={600}>
                          {pattern.pattern}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h6" fontWeight={700} color="primary.main">
                          {pattern.count.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ({pattern.percentage}%)
                        </Typography>
                      </Stack>
                    </Stack>

                    <Typography variant="caption" color="text.secondary">
                      {pattern.description}
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={Math.min(pattern.percentage / 1.5, 100)}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'primary.main',
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Location Engagement */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Engagement by Location
          </Typography>
          <Stack spacing={2}>
            {locationEngagement.map((location, index) => (
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
                    borderColor: getColor(getGrowthColor(location.growth)),
                  }
                }}
                onClick={() => onLocationClick?.(location.location)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <IconMap size={20} />
                        <Typography variant="body1" fontWeight={600}>
                          {location.location}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {location.growth >= 10 ? <IconTrendingUp size={16} color="green" /> : <IconActivity size={16} color="blue" />}
                        <Typography variant="h6" fontWeight={700} color={getColor(getGrowthColor(location.growth))}>
                          +{location.growth}%
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" fontWeight={600}>
                        {location.activeUsers.toLocaleString()} active users
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {location.percentage}% of total
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={location.percentage}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getProgressColor(getGrowthColor(location.growth)),
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Seasonal Patterns */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Seasonal Patterns
          </Typography>
          <Stack spacing={2}>
            {seasonalPatterns.map((season, index) => (
              <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" fontWeight={600}>
                        {season.season}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconTrendingUp size={16} color={getColor(getGrowthColor(season.growth))} />
                        <Typography variant="caption" color={getColor(getGrowthColor(season.growth))}>
                          +{season.growth}%
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {season.activeUsers.toLocaleString()} active users
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {season.notes}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Insights */}
        <Card sx={{ border: '1px solid', borderColor: 'info.light' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom color="info.main">
              📊 Strategic Insights
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Growth Patterns
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Strong weekly growth (12.5%) indicates healthy user engagement
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Monthly consistency suggests sustainable platform adoption
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Geographic Opportunities
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Lagos Mainland leads with 37.9% of active users
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Kano shows highest growth rate (18.9%) - expansion opportunity
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Seasonal Planning
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Q1 shows post-holiday recycling surge - plan for increased demand
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Summer maintenance periods require user engagement campaigns
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            💡 Action Recommendations
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • Match agent availability to peak activity periods (2-4 PM daily)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Prioritize expansion in high-growth areas (Kano, Abuja)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Plan seasonal campaigns around Q1 recycling surge
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Monitor Lagos Mainland for capacity planning needs
            </Typography>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default ActivityDistributionTrends;
