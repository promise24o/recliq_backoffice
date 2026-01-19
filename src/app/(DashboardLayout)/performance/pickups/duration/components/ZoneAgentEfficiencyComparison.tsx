'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { 
  IconMap,
  IconUser,
  IconClock,
  IconTrendingUp,
  IconActivity
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface ZoneAgentEfficiencyComparisonProps {
  onViewChange?: (view: 'zone' | 'agent') => void;
}

const ZoneAgentEfficiencyComparison: React.FC<ZoneAgentEfficiencyComparisonProps> = ({ 
  onViewChange 
}) => {
  const [view, setView] = useState<'zone' | 'agent'>('zone');

  // Mock zone efficiency data
  const zoneData = [
    {
      zone: 'GRA Phase 2',
      avgDuration: 29,
      slaBreachRate: 8.2,
      pickupCount: 234,
      agentCount: 12,
      efficiency: 'excellent'
    },
    {
      zone: 'Lagos Mainland',
      avgDuration: 35,
      slaBreachRate: 15.6,
      pickupCount: 456,
      agentCount: 18,
      efficiency: 'good'
    },
    {
      zone: 'Lagos Island',
      avgDuration: 41,
      slaBreachRate: 22.3,
      pickupCount: 312,
      agentCount: 14,
      efficiency: 'moderate'
    },
    {
      zone: 'Abuja Central',
      avgDuration: 38,
      slaBreachRate: 19.8,
      pickupCount: 198,
      agentCount: 10,
      efficiency: 'good'
    },
    {
      zone: 'Port Harcourt',
      avgDuration: 46,
      slaBreachRate: 28.7,
      pickupCount: 167,
      agentCount: 8,
      efficiency: 'poor'
    },
    {
      zone: 'Kano',
      avgDuration: 52,
      slaBreachRate: 34.2,
      pickupCount: 143,
      agentCount: 6,
      efficiency: 'poor'
    }
  ];

  // Mock agent efficiency data
  const agentData = [
    {
      agentId: 'AG001',
      agentName: 'John Smith',
      avgDuration: 28,
      slaBreachRate: 6.5,
      pickupCount: 89,
      efficiency: 'excellent',
      zone: 'GRA Phase 2'
    },
    {
      agentId: 'AG002',
      agentName: 'Sarah Johnson',
      avgDuration: 32,
      slaBreachRate: 9.8,
      pickupCount: 76,
      efficiency: 'good',
      zone: 'Lagos Mainland'
    },
    {
      agentId: 'AG003',
      agentName: 'Mike Wilson',
      avgDuration: 35,
      slaBreachRate: 12.3,
      pickupCount: 94,
      efficiency: 'good',
      zone: 'Lagos Island'
    },
    {
      agentId: 'AG004',
      agentName: 'Emily Davis',
      avgDuration: 31,
      slaBreachRate: 8.1,
      pickupCount: 82,
      efficiency: 'excellent',
      zone: 'GRA Phase 2'
    },
    {
      agentId: 'AG005',
      agentName: 'David Brown',
      avgDuration: 44,
      slaBreachRate: 24.7,
      pickupCount: 68,
      efficiency: 'poor',
      zone: 'Port Harcourt'
    },
    {
      agentId: 'AG006',
      agentName: 'Lisa Martinez',
      avgDuration: 38,
      slaBreachRate: 18.9,
      pickupCount: 71,
      efficiency: 'moderate',
      zone: 'Abuja Central'
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

  const getProgressColor = (efficiency: string) => {
    switch (efficiency) {
      case 'excellent': return '#10b981';
      case 'good': return '#3b82f6';
      case 'moderate': return '#f59e0b';
      case 'poor': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case 'excellent': return 'success';
      case 'good': return 'info';
      case 'moderate': return 'warning';
      case 'poor': return 'error';
      default: return 'default';
    }
  };

  const getDurationColor = (duration: number) => {
    if (duration <= 30) return 'success';
    if (duration <= 40) return 'info';
    if (duration <= 50) return 'warning';
    return 'error';
  };

  const currentData = view === 'zone' ? zoneData : agentData;

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: 'zone' | 'agent' | null,
  ) => {
    if (newView !== null) {
      setView(newView);
      onViewChange?.(newView);
    }
  };

  return (
    <DashboardCard title="Zone & Agent Efficiency Comparison">
      <Box sx={{ width: '100%' }}>
        {/* View Toggle */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
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
              {view === 'zone' ? <IconMap size={24} /> : <IconUser size={24} />}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {view === 'zone' ? 'Zone Efficiency' : 'Agent Efficiency'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {view === 'zone' ? 'Performance comparison by geographic zones' : 'Individual agent performance metrics'}
              </Typography>
            </Box>
          </Stack>

          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="view toggle"
            size="small"
          >
            <ToggleButton value="zone" aria-label="zone view">
              <IconMap size={16} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Zone View
              </Typography>
            </ToggleButton>
            <ToggleButton value="agent" aria-label="agent view">
              <IconUser size={16} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Agent View
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {/* Efficiency Rankings */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          {currentData.map((item, index) => (
            <Card 
              key={index}
              sx={{ 
                border: '1px solid', 
                borderColor: 'divider',
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2,
                  borderColor: getColor(getEfficiencyColor(item.efficiency)),
                }
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Stack direction="row" spacing={2} alignItems="center">
                      {view === 'zone' ? <IconMap size={20} /> : <IconUser size={20} />}
                      <Box>
                        <Typography variant="body1" fontWeight={600}>
                          {view === 'zone' ? item.zone : (item as any).agentName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {view === 'zone' 
                            ? `${(item as any).agentCount} agents • ${item.pickupCount} pickups`
                            : `${(item as any).agentId} • ${(item as any).zone} • ${item.pickupCount} pickups`
                          }
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconClock size={16} color={getColor(getDurationColor(item.avgDuration))} />
                        <Typography variant="h6" fontWeight={700} color={getColor(getDurationColor(item.avgDuration))}>
                          {item.avgDuration}m
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconActivity size={16} color={getColor(getEfficiencyColor(item.efficiency))} />
                        <Typography variant="body2" fontWeight={600} color={getColor(getEfficiencyColor(item.efficiency))}>
                          {item.efficiency.charAt(0).toUpperCase() + item.efficiency.slice(1)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Avg Duration
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          {item.avgDuration} mins
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={Math.max(0, Math.min(100, ((60 - item.avgDuration) / 60) * 100))} // Inverted - lower is better
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getProgressColor(item.efficiency),
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="caption" color="error.main">
                          SLA Breach Rate
                        </Typography>
                        <Typography variant="caption" color="error.main" fontWeight={600}>
                          {item.slaBreachRate}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={Math.max(0, Math.min(100, ((40 - item.slaBreachRate) / 40) * 100))} // Inverted - lower is better
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: item.slaBreachRate <= 10 ? '#10b981' : item.slaBreachRate <= 20 ? '#f59e0b' : '#ef4444',
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Box>
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
              📊 Efficiency Analysis
            </Typography>
            <Stack spacing={2}>
              {view === 'zone' ? (
                <>
                  <Box>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Top Performing Zones
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • GRA Phase 2 leads with 29 mins average - excellent agent density
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Lagos Mainland performs well with 35 mins - balanced operations
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Abuja Central shows good efficiency at 38 mins - optimized routing
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Areas Needing Attention
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Port Harcourt struggles at 46 mins - needs agent density increase
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Kano faces challenges at 52 mins - requires operational overhaul
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Strategic Opportunities
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Agent density correlates strongly with performance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Urban zones outperform rural zones by 30% on average
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Top Performing Agents
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • John Smith (AG001) leads with 28 mins - exceptional efficiency
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Emily Davis (AG004) follows closely at 31 mins - consistent performer
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Sarah Johnson (AG002) maintains 32 mins - reliable service
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Performance Variations
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Individual performance varies by 16 minutes (28-44 mins range)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Zone assignment impacts performance significantly
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Development Opportunities
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Best practices from top performers can be shared across team
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Targeted training for underperforming agents
                    </Typography>
                  </Box>
                </>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight={600} gutterBottom>
            💡 Optimization Recommendations
          </Typography>
          <Stack spacing={1}>
            {view === 'zone' ? (
              <>
                <Typography variant="body2" color="text.secondary">
                  • Increase agent density in Port Harcourt and Kano zones
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Implement GRA Phase 2 best practices in underperforming zones
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Optimize routing for Lagos Island to reduce travel time
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="body2" color="text.secondary">
                  • Implement peer mentoring program with top performers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Provide additional training for agents exceeding 40 mins average
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Consider zone reassignment for consistently underperforming agents
                </Typography>
              </>
            )}
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default ZoneAgentEfficiencyComparison;
