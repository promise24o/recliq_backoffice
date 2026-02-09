'use client'
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Stack, Chip, LinearProgress } from '@mui/material';
import { IconMap, IconUsers, IconClock, IconAlertTriangle } from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface ZoneCoverage {
  zone: string;
  availableAgents: number;
  totalAgents: number;
  demandLevel: 'low' | 'medium' | 'high' | 'critical';
  coverageLevel: 'healthy' | 'strained' | 'critical' | 'dead';
  avgResponseTime: number;
}

interface CityZoneCoverageMapProps {
  zoneCoverage: ZoneCoverage[];
  selectedCity: string;
  selectedZone: string;
}

const CityZoneCoverageMap: React.FC<CityZoneCoverageMapProps> = ({
  zoneCoverage,
  selectedCity,
  selectedZone
}) => {
  const getCoverageColor = (level: string) => {
    switch (level) {
      case 'healthy': return '#4CAF50';
      case 'strained': return '#FFC107';
      case 'critical': return '#FF5722';
      case 'dead': return '#D32F2F';
      default: return '#9E9E9E';
    }
  };

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'low': return '#4CAF50';
      case 'medium': return '#FFC107';
      case 'high': return '#FF9800';
      case 'critical': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getCoverageLabel = (level: string) => {
    switch (level) {
      case 'healthy': return 'Healthy Coverage';
      case 'strained': return 'Strained Supply';
      case 'critical': return 'Critical Shortage';
      case 'dead': return 'Dead Zone';
      default: return 'Unknown';
    }
  };

  const getDemandLabel = (level: string) => {
    switch (level) {
      case 'low': return 'Low Demand';
      case 'medium': return 'Medium Demand';
      case 'high': return 'High Demand';
      case 'critical': return 'Critical Demand';
      default: return 'Unknown';
    }
  };

  // Filter zones based on selections
  const filteredZones = zoneCoverage.filter(zone => {
    const cityMatch = selectedCity === 'all' || zone.zone.toLowerCase().includes(selectedCity.toLowerCase());
    const zoneMatch = selectedZone === 'all' || zone.zone.toLowerCase().includes(selectedZone.toLowerCase());
    return cityMatch && zoneMatch;
  });

  // Calculate overall metrics
  const totalZones = filteredZones.length;
  const healthyZones = filteredZones.filter(z => z.coverageLevel === 'healthy').length;
  const criticalZones = filteredZones.filter(z => z.coverageLevel === 'critical' || z.coverageLevel === 'dead').length;
  const avgResponseTime = filteredZones.reduce((sum, z) => sum + z.avgResponseTime, 0) / totalZones || 0;

  return (
    <DashboardCard title="City & Zone Coverage Map">
      <CardContent>
        {/* Map Overview */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Real-time Coverage Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            If a user requests a pickup right now, where will it fail?
          </Typography>
        </Box>

        {/* Zone Grid */}
        <Grid container spacing={2}>
          {filteredZones.map((zone) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={zone.zone}>
              <Card 
                sx={{ 
                  height: '100%',
                  border: '2px solid',
                  borderColor: getCoverageColor(zone.coverageLevel),
                  backgroundColor: `${getCoverageColor(zone.coverageLevel)}08`,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  }
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    {/* Zone Header */}
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {zone.zone}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip
                          label={getCoverageLabel(zone.coverageLevel)}
                          size="small"
                          sx={{
                            backgroundColor: getCoverageColor(zone.coverageLevel),
                            color: 'white',
                            fontWeight: 600
                          }}
                        />
                        <Chip
                          label={getDemandLabel(zone.demandLevel)}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: getDemandColor(zone.demandLevel),
                            color: getDemandColor(zone.demandLevel)
                          }}
                        />
                      </Stack>
                    </Box>

                    {/* Agent Availability */}
                    <Box>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Agent Availability
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {zone.availableAgents}/{zone.totalAgents}
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={(zone.availableAgents / zone.totalAgents) * 100}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getCoverageColor(zone.coverageLevel)
                          }
                        }}
                      />
                    </Box>

                    {/* Response Time */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconClock size={16} color={zone.avgResponseTime > 15 ? '#F44336' : zone.avgResponseTime > 10 ? '#FF9800' : '#4CAF50'} />
                      <Typography variant="body2">
                        Avg Response: {zone.avgResponseTime} mins
                      </Typography>
                    </Stack>

                    {/* Alert for critical zones */}
                    {(zone.coverageLevel === 'critical' || zone.coverageLevel === 'dead') && (
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                        <IconAlertTriangle size={16} color="#F44336" />
                        <Typography variant="caption" color="error.main">
                          {zone.coverageLevel === 'dead' ? 'No agents available' : 'Severe shortage'}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Coverage Summary */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Zones: {totalZones} | Healthy: {healthyZones} | Critical: {criticalZones}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Response Time: {avgResponseTime.toFixed(1)} mins
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', spacing: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#4CAF50' }} />
                <Typography variant="caption">Healthy</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', spacing: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FFC107' }} />
                <Typography variant="caption">Strained</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', spacing: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FF5722' }} />
                <Typography variant="caption">Critical</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', spacing: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#D32F2F' }} />
                <Typography variant="caption">Dead Zone</Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </DashboardCard>
  );
};

export default CityZoneCoverageMap;
