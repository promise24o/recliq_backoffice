'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { 
  IconChartBar,
  IconMap,
  IconClock,
  IconScale,
  IconCurrency,
  IconUserOff,
  IconPackage,
  IconStar
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface DisputeDistributionPatternsProps {
  onTypeClick?: (type: string) => void;
  onLocationClick?: (location: string) => void;
}

const DisputeDistributionPatterns: React.FC<DisputeDistributionPatternsProps> = ({ 
  onTypeClick, 
  onLocationClick 
}) => {
  // Mock data for dispute types
  const disputeTypes = [
    {
      type: 'weight',
      name: 'Weight Disagreements',
      count: 58,
      percentage: 31.2,
      icon: <IconScale size={20} />,
      color: 'error',
      description: 'Disputes over measured weight'
    },
    {
      type: 'payment',
      name: 'Payment Issues',
      count: 42,
      percentage: 22.6,
      icon: <IconCurrency size={20} />,
      color: 'warning',
      description: 'Payment processing and pricing disputes'
    },
    {
      type: 'conduct',
      name: 'Conduct Complaints',
      count: 38,
      percentage: 20.4,
      icon: <IconUserOff size={20} />,
      color: 'error',
      description: 'Agent behavior and professionalism'
    },
    {
      type: 'missed',
      name: 'Missed Pickups',
      count: 28,
      percentage: 15.1,
      icon: <IconPackage size={20} />,
      color: 'warning',
      description: 'Failed to arrive for scheduled pickups'
    },
    {
      type: 'quality',
      name: 'Quality Issues',
      count: 20,
      percentage: 10.7,
      icon: <IconStar size={20} />,
      color: 'info',
      description: 'Service quality and handling complaints'
    }
  ];

  // Mock data for location hotspots
  const locationHotspots = [
    {
      location: 'Lagos Mainland',
      disputes: 68,
      percentage: 36.6,
      risk: 'high'
    },
    {
      location: 'Lagos Island',
      disputes: 45,
      percentage: 24.2,
      risk: 'medium'
    },
    {
      location: 'Abuja Central',
      disputes: 32,
      percentage: 17.2,
      risk: 'medium'
    },
    {
      location: 'Port Harcourt',
      disputes: 25,
      percentage: 13.4,
      risk: 'low'
    },
    {
      location: 'Kano',
      disputes: 16,
      percentage: 8.6,
      risk: 'low'
    }
  ];

  // Mock data for spike detection
  const spikeData = [
    {
      date: '2024-01-10',
      normalDisputes: 8,
      actualDisputes: 22,
      spikePercentage: 175,
      reason: 'System pricing update confusion'
    },
    {
      date: '2024-01-15',
      normalDisputes: 10,
      actualDisputes: 19,
      spikePercentage: 90,
      reason: 'Weather-related service disruptions'
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'error.main';
      case 'medium': return 'warning.main';
      case 'low': return 'success.main';
      default: return 'text.secondary';
    }
  };

  return (
    <DashboardCard title="Dispute Distribution & Patterns">
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
                Dispute Pattern Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Understanding dispute types, locations, and temporal patterns
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Dispute Types */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Disputes by Type
          </Typography>
          <Stack spacing={2}>
            {disputeTypes.map((type, index) => (
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
                    borderColor: getColor(type.color),
                  }
                }}
                onClick={() => onTypeClick?.(type.type)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            bgcolor: getBgColor(type.color),
                            color: getColor(type.color),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {type.icon}
                        </Box>
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {type.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {type.description}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h6" fontWeight={700} color={getColor(type.color)}>
                          {type.count}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ({type.percentage}%)
                        </Typography>
                      </Stack>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={type.percentage}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getProgressColor(type.color),
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

        {/* Location Hotspots */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Dispute Hotspots by Location
          </Typography>
          <Stack spacing={2}>
            {locationHotspots.map((location, index) => (
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
                    borderColor: getRiskColor(location.risk),
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
                        <Typography variant="h6" fontWeight={700} color={getRiskColor(location.risk)}>
                          {location.disputes}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ({location.percentage}%)
                        </Typography>
                      </Stack>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={location.percentage}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getProgressColor(location.risk === 'high' ? 'error' : location.risk === 'medium' ? 'warning' : 'success'),
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

        {/* Spike Detection */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom color="warning.main">
            ⚠️ Dispute Spike Detection
          </Typography>
          <Stack spacing={2}>
            {spikeData.map((spike, index) => (
              <Card key={index} sx={{ border: '1px solid', borderColor: 'warning.light' }}>
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" fontWeight={600}>
                        {spike.date}
                      </Typography>
                      <Typography variant="caption" color="warning.main">
                        +{spike.spikePercentage}% spike
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Normal: {spike.normalDisputes} → Actual: {spike.actualDisputes}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {spike.reason}
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
              🔍 Pattern Insights
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Systemic Issues
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Weight disputes (31.2%) suggest scale calibration issues
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Payment issues (22.6%) indicate pricing transparency problems
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Regional Problems
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Lagos Mainland accounts for 36.6% of all disputes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • High-density areas show elevated dispute rates
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Fraud Indicators
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Conduct complaints cluster around specific agents
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Spike patterns correlate with system changes
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
              • Implement scale verification program for high-dispute agents
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Review pricing transparency in Lagos Mainland zone
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Set up automated alerts for dispute spike detection
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Conduct targeted training for agents with conduct complaints
            </Typography>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default DisputeDistributionPatterns;
