'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { 
  IconChartBar,
  IconMap,
  IconPackage,
  IconUsers,
  IconActivity,
  IconClock,
  IconTrendingUp
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface RetentionDriversBreakdownsProps {
  onDriverClick?: (driver: string) => void;
  onLocationClick?: (location: string) => void;
  onMaterialClick?: (material: string) => void;
}

const RetentionDriversBreakdowns: React.FC<RetentionDriversBreakdownsProps> = ({ 
  onDriverClick, 
  onLocationClick,
  onMaterialClick
}) => {
  // Mock data for retention by material type
  const retentionByMaterial = [
    {
      material: 'PET',
      retentionRate: 68,
      userCount: 2156,
      avgLifetime: 85,
      churnReason: 'Low rewards value',
      growth: 5.2
    },
    {
      material: 'Metal',
      retentionRate: 64,
      userCount: 1234,
      avgLifetime: 72,
      churnReason: 'Agent availability',
      growth: 8.7
    },
    {
      material: 'Mixed',
      retentionRate: 59,
      userCount: 876,
      avgLifetime: 68,
      churnReason: 'Complex sorting requirements',
      growth: 3.1
    },
    {
      material: 'E-waste',
      retentionRate: 72,
      userCount: 234,
      avgLifetime: 95,
      churnReason: 'Limited pickup locations',
      growth: 12.4
    }
  ];

  // Mock data for retention by city/zone
  const retentionByLocation = [
    {
      location: 'Lagos Mainland',
      retentionRate: 66,
      userCount: 1244,
      avgResponseTime: 3.2,
      agentDensity: 'High',
      churnRate: 34
    },
    {
      location: 'Lagos Island',
      retentionRate: 63,
      userCount: 877,
      avgResponseTime: 4.5,
      agentDensity: 'Medium',
      churnRate: 37
    },
    {
      location: 'Abuja Central',
      retentionRate: 61,
      userCount: 630,
      avgResponseTime: 5.8,
      agentDensity: 'Medium',
      churnRate: 39
    },
    {
      location: 'Port Harcourt',
      retentionRate: 58,
      userCount: 475,
      avgResponseTime: 7.2,
      agentDensity: 'Low',
      churnRate: 42
    },
    {
      location: 'Kano',
      retentionRate: 55,
      userCount: 449,
      avgResponseTime: 9.1,
      agentDensity: 'Low',
      churnRate: 45
    }
  ];

  // Mock data for retention vs agent response time
  const responseTimeCorrelation = [
    {
      responseTime: 'Under 3 hours',
      retentionRate: 74,
      userSatisfaction: 89,
      repeatRate: 68,
      userCount: 892
    },
    {
      responseTime: '3-6 hours',
      retentionRate: 62,
      userSatisfaction: 76,
      repeatRate: 54,
      userCount: 1456
    },
    {
      responseTime: '6-12 hours',
      retentionRate: 48,
      userSatisfaction: 62,
      repeatRate: 38,
      userCount: 987
    },
    {
      responseTime: 'Over 12 hours',
      retentionRate: 31,
      userSatisfaction: 41,
      repeatRate: 22,
      userCount: 509
    }
  ];

  // Mock data for retention vs dispute rate
  const disputeCorrelation = [
    {
      disputeRate: 'No disputes',
      retentionRate: 78,
      userCount: 2156,
      avgLifetime: 95,
      churnReason: 'Moving away'
    },
    {
      disputeRate: '1-2 disputes',
      retentionRate: 64,
      userCount: 1234,
      avgLifetime: 72,
      churnReason: 'Service quality'
    },
    {
      disputeRate: '3+ disputes',
      retentionRate: 41,
      userCount: 454,
      avgLifetime: 45,
      churnReason: 'Trust issues'
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

  const getProgressColor = (rate: number) => {
    if (rate >= 70) return '#10b981';
    if (rate >= 60) return '#3b82f6';
    if (rate >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getRetentionColor = (rate: number) => {
    if (rate >= 70) return 'success';
    if (rate >= 60) return 'info';
    if (rate >= 50) return 'warning';
    return 'error';
  };

  return (
    <DashboardCard title="Retention Drivers & Breakdowns">
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
                Why Users Stay or Leave
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Understanding retention drivers across materials, locations, and service factors
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Retention by Material Type */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Retention by Material Type
          </Typography>
          <Stack spacing={2}>
            {retentionByMaterial.map((material, index) => (
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
                    borderColor: getColor(getRetentionColor(material.retentionRate)),
                  }
                }}
                onClick={() => onMaterialClick?.(material.material)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <IconPackage size={20} />
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {material.material}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {material.userCount.toLocaleString()} users
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconTrendingUp size={16} color={getColor(getRetentionColor(material.retentionRate))} />
                        <Typography variant="h6" fontWeight={700} color={getColor(getRetentionColor(material.retentionRate))}>
                          {material.retentionRate}%
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Avg lifetime: {material.avgLifetime} days
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Top churn: {material.churnReason}
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={material.retentionRate}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getProgressColor(material.retentionRate),
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

        {/* Retention by Location */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Retention by City / Zone
          </Typography>
          <Stack spacing={2}>
            {retentionByLocation.map((location, index) => (
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
                    borderColor: getColor(getRetentionColor(location.retentionRate)),
                  }
                }}
                onClick={() => onLocationClick?.(location.location)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <IconMap size={20} />
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {location.location}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {location.userCount.toLocaleString()} users • {location.agentDensity} density
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h6" fontWeight={700} color={getColor(getRetentionColor(location.retentionRate))}>
                          {location.retentionRate}%
                        </Typography>
                        <Typography variant="caption" color="error.main">
                          {location.churnRate}% churn
                        </Typography>
                      </Stack>
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                      Avg response time: {location.avgResponseTime} hours
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={location.retentionRate}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getProgressColor(location.retentionRate),
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

        {/* Retention vs Response Time */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Retention vs Agent Response Time
          </Typography>
          <Stack spacing={2}>
            {responseTimeCorrelation.map((correlation, index) => (
              <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <IconClock size={20} />
                        <Typography variant="body1" fontWeight={600}>
                          {correlation.responseTime}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h6" fontWeight={700} color={getColor(getRetentionColor(correlation.retentionRate))}>
                          {correlation.retentionRate}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          retention
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Satisfaction: {correlation.userSatisfaction}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Repeat rate: {correlation.repeatRate}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {correlation.userCount} users
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={correlation.retentionRate}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getProgressColor(correlation.retentionRate),
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

        {/* Retention vs Dispute Rate */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Retention vs Dispute History
          </Typography>
          <Stack spacing={2}>
            {disputeCorrelation.map((correlation, index) => (
              <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body1" fontWeight={600}>
                        {correlation.disputeRate}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h6" fontWeight={700} color={getColor(getRetentionColor(correlation.retentionRate))}>
                          {correlation.retentionRate}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          retention
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Avg lifetime: {correlation.avgLifetime} days
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {correlation.userCount} users
                      </Typography>
                    </Stack>

                    <Typography variant="caption" color="text.secondary">
                      Primary churn reason: {correlation.churnReason}
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={correlation.retentionRate}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getProgressColor(correlation.retentionRate),
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

        {/* Key Insights */}
        <Card sx={{ border: '1px solid', borderColor: 'info.light' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom color="info.main">
              🎯 Retention Driver Analysis
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Material Insights
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • E-waste shows highest retention (72%) - high value items drive loyalty
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Mixed materials lowest retention (59%) - complexity reduces repeat usage
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • PET steady retention (68%) - consistent demand and pickup availability
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Geographic Patterns
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • High agent density correlates with 66%+ retention rates
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Response time under 3 hours drives 74% retention - critical threshold
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Low-density areas show 55% retention - expansion opportunity
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Service Quality Impact
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • No dispute users show 78% retention - trust is paramount
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Each dispute reduces retention by ~15 percentage points
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Fast response times more important than pricing for retention
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            💡 Retention Optimization Strategies
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • Prioritize agent density in low-retention areas to improve response times
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Focus on dispute prevention and resolution - biggest retention killer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Expand e-waste services - highest retention material category
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Simplify mixed material sorting to reduce complexity barriers
            </Typography>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default RetentionDriversBreakdowns;
