'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { 
  IconChartBar,
  IconMap,
  IconPackage,
  IconUsers,
  IconActivity,
  IconTrendingUp
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface FrequencyBySegmentLocationProps {
  onSegmentClick?: (segment: string) => void;
  onLocationClick?: (location: string) => void;
  onMaterialClick?: (material: string) => void;
}

const FrequencyBySegmentLocation: React.FC<FrequencyBySegmentLocationProps> = ({ 
  onSegmentClick, 
  onLocationClick,
  onMaterialClick
}) => {
  // Mock data for frequency by city/zone
  const locationFrequency = [
    {
      location: 'Lagos Mainland',
      avgFrequency: 3.2,
      powerRecyclers: 245,
      regularUsers: 567,
      occasionalUsers: 298,
      atRiskUsers: 134,
      totalUsers: 1244,
      growth: 12.5
    },
    {
      location: 'Lagos Island',
      avgFrequency: 2.8,
      powerRecyclers: 156,
      regularUsers: 389,
      occasionalUsers: 234,
      atRiskUsers: 98,
      totalUsers: 877,
      growth: 8.7
    },
    {
      location: 'Abuja Central',
      avgFrequency: 2.5,
      powerRecyclers: 98,
      regularUsers: 267,
      occasionalUsers: 189,
      atRiskUsers: 76,
      totalUsers: 630,
      growth: 15.2
    },
    {
      location: 'Port Harcourt',
      avgFrequency: 2.1,
      powerRecyclers: 67,
      regularUsers: 198,
      occasionalUsers: 156,
      atRiskUsers: 54,
      totalUsers: 475,
      growth: 6.3
    },
    {
      location: 'Kano',
      avgFrequency: 1.8,
      powerRecyclers: 58,
      regularUsers: 146,
      occasionalUsers: 165,
      atRiskUsers: 80,
      totalUsers: 449,
      growth: 18.9
    }
  ];

  // Mock data for frequency by material type
  const materialFrequency = [
    {
      material: 'PET',
      avgFrequency: 3.5,
      userCount: 2156,
      percentage: 56.1,
      growth: 14.2,
      description: 'Plastic bottles and containers'
    },
    {
      material: 'Metal',
      avgFrequency: 2.8,
      userCount: 1234,
      percentage: 32.1,
      growth: 8.7,
      description: 'Aluminum cans, steel containers'
    },
    {
      material: 'Mixed',
      avgFrequency: 2.2,
      userCount: 876,
      percentage: 22.8,
      growth: 5.3,
      description: 'Mixed recyclable materials'
    },
    {
      material: 'E-waste',
      avgFrequency: 1.5,
      userCount: 234,
      percentage: 6.1,
      growth: 22.1,
      description: 'Electronic waste and devices'
    }
  ];

  // Mock data for frequency vs agent density
  const agentDensityCorrelation = [
    {
      densityLevel: 'High (5+ agents/zone)',
      avgUserFrequency: 3.8,
      userSatisfaction: 87,
      responseTime: '2.1 hours',
      growth: 15.3
    },
    {
      densityLevel: 'Medium (2-4 agents/zone)',
      avgUserFrequency: 2.6,
      userSatisfaction: 74,
      responseTime: '4.5 hours',
      growth: 8.9
    },
    {
      densityLevel: 'Low (0-1 agents/zone)',
      avgUserFrequency: 1.4,
      userSatisfaction: 62,
      responseTime: '8.2 hours',
      growth: 3.2
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

  const getFrequencyColor = (frequency: number) => {
    if (frequency >= 3.5) return 'success';
    if (frequency >= 2.5) return 'warning';
    return 'error';
  };

  return (
    <DashboardCard title="Frequency by Segment & Location">
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
                Geographic & Material Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Understanding recycling patterns by location and material type
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Frequency by Location */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Frequency by City / Zone
          </Typography>
          <Stack spacing={2}>
            {locationFrequency.map((location, index) => (
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
                    borderColor: getColor(getFrequencyColor(location.avgFrequency)),
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
                            {location.totalUsers.toLocaleString()} active users
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconTrendingUp size={16} color={getColor(getFrequencyColor(location.avgFrequency))} />
                        <Typography variant="h6" fontWeight={700} color={getColor(getFrequencyColor(location.avgFrequency))}>
                          {location.avgFrequency.toFixed(1)}/month
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                      <Typography variant="caption" color="success.main">
                        Power: {location.powerRecyclers}
                      </Typography>
                      <Typography variant="caption" color="info.main">
                        Regular: {location.regularUsers}
                      </Typography>
                      <Typography variant="caption" color="warning.main">
                        Occasional: {location.occasionalUsers}
                      </Typography>
                      <Typography variant="caption" color="error.main">
                        At Risk: {location.atRiskUsers}
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={(location.avgFrequency / 5) * 100}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getProgressColor(getFrequencyColor(location.avgFrequency)),
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

        {/* Frequency by Material */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Frequency by Material Type
          </Typography>
          <Stack spacing={2}>
            {materialFrequency.map((material, index) => (
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
                    borderColor: getColor(getFrequencyColor(material.avgFrequency)),
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
                            {material.description}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconTrendingUp size={16} color={getColor(getFrequencyColor(material.avgFrequency))} />
                        <Typography variant="h6" fontWeight={700} color={getColor(getFrequencyColor(material.avgFrequency))}>
                          {material.avgFrequency.toFixed(1)}/month
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" fontWeight={600}>
                        {material.userCount.toLocaleString()} users
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {material.percentage}% of total
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={material.percentage}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getProgressColor(getFrequencyColor(material.avgFrequency)),
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

        {/* Agent Density Correlation */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Frequency vs Agent Density
          </Typography>
          <Stack spacing={2}>
            {agentDensityCorrelation.map((correlation, index) => (
              <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body1" fontWeight={600}>
                        {correlation.densityLevel}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconTrendingUp size={16} color={getColor(getFrequencyColor(correlation.avgUserFrequency))} />
                        <Typography variant="h6" fontWeight={700} color={getColor(getFrequencyColor(correlation.avgUserFrequency))}>
                          {correlation.avgUserFrequency.toFixed(1)}/month
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Satisfaction: {correlation.userSatisfaction}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Response: {correlation.responseTime}
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={(correlation.avgUserFrequency / 5) * 100}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getProgressColor(getFrequencyColor(correlation.avgUserFrequency)),
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

        {/* Strategic Insights */}
        <Card sx={{ border: '1px solid', borderColor: 'info.light' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom color="info.main">
              🎯 Strategic Insights
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Geographic Opportunities
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Lagos Mainland leads with 3.2/month frequency - high market penetration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Kano shows highest growth (18.9%) - expansion opportunity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Low-density areas show 1.4/month frequency - agent deployment needed
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Material Preferences
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • PET drives highest frequency (3.5/month) - focus on plastic recycling
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • E-waste shows rapid growth (22.1%) - emerging market opportunity
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Agent Impact
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • High agent density correlates with 3.8/month user frequency
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Response time under 3 hours drives strong habit formation
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            💡 Operational Recommendations
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • Increase agent density in low-frequency zones to boost habit formation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Target PET recycling campaigns in high-potential areas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Expand e-waste collection in urban centers with high growth rates
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Optimize agent placement based on frequency-density correlation
            </Typography>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default FrequencyBySegmentLocation;
