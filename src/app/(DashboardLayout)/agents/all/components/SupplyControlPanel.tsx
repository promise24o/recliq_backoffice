'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, Avatar, Chip, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { 
  IconUser, 
  IconClock, 
  IconPlayerPause, 
  IconAlertTriangle, 
  IconBan,
  IconTrendingUp,
  IconTrendingDown,
  IconFilter
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface CityCapacity {
  activeAgents: number;
  idleAgents: number;
  offlineAgents: number;
  flaggedAgents: number;
  suspendedAgents: number;
  totalDemand: number;
  agentToPickupRatio: number;
}

interface SupplyControlPanelProps {
  cityCapacity: CityCapacity;
  filters: {
    city: string;
    status: string;
    tier: string;
    kycStatus: string;
    vehicleType: string;
    performanceTier: string;
  };
  onFiltersChange: (filters: any) => void;
  sortMode: 'closest_to_failure' | 'highest_performers' | 'most_overloaded' | 'idle_capacity';
  onSortModeChange: (mode: 'closest_to_failure' | 'highest_performers' | 'most_overloaded' | 'idle_capacity') => void;
}

const SupplyControlPanel: React.FC<SupplyControlPanelProps> = ({
  cityCapacity,
  filters,
  onFiltersChange,
  sortMode,
  onSortModeChange
}) => {
  const capacityCards = [
    {
      title: 'Active Agents',
      value: cityCapacity.activeAgents,
      icon: <IconUser size={20} />,
      color: 'success',
      subtitle: 'Working now'
    },
    {
      title: 'Idle Agents',
      value: cityCapacity.idleAgents,
      icon: <IconClock size={20} />,
      color: 'info',
      subtitle: 'Available'
    },
    {
      title: 'Offline Agents',
      value: cityCapacity.offlineAgents,
      icon: <IconPlayerPause size={20} />,
      color: 'warning',
      subtitle: 'Not available'
    },
    {
      title: 'Flagged Agents',
      value: cityCapacity.flaggedAgents,
      icon: <IconAlertTriangle size={20} />,
      color: 'warning',
      subtitle: 'Needs attention'
    },
    {
      title: 'Suspended Agents',
      value: cityCapacity.suspendedAgents,
      icon: <IconBan size={20} />,
      color: 'error',
      subtitle: 'Blocked'
    }
  ];

  const getCapacityStatus = () => {
    const ratio = cityCapacity.agentToPickupRatio;
    if (ratio >= 0.8) return { status: 'Healthy', color: 'success', icon: <IconTrendingUp size={16} /> };
    if (ratio >= 0.5) return { status: 'At Risk', color: 'warning', icon: <IconTrendingDown size={16} /> };
    return { status: 'Critical', color: 'error', icon: <IconAlertTriangle size={16} /> };
  };

  const capacityStatus = getCapacityStatus();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* City Capacity Overview */}
      <DashboardCard title="City Capacity">
        <CardContent>
          <Stack spacing={2}>
            <Box sx={{ textAlign: 'center', py: 1 }}>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                {capacityStatus.icon}
                <Typography variant="h6" color={`${capacityStatus.color}.main`} fontWeight={600}>
                  {capacityStatus.status}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Agent-to-Pickup Ratio: {cityCapacity.agentToPickupRatio.toFixed(2)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {cityCapacity.totalDemand} total pickups today
              </Typography>
            </Box>
            
            {capacityCards.map((card, index) => (
              <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ py: 1.5 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: `${card.color}.main`, width: 32, height: 32 }}>
                      {card.icon}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {card.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {card.title}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </CardContent>
      </DashboardCard>

      {/* Filters */}
      <DashboardCard title="Filters">
        <CardContent>
          <Stack spacing={2}>
            <FormControl size="small" fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                value={filters.city}
                label="City"
                onChange={(e) => onFiltersChange({ ...filters, city: e.target.value })}
              >
                <MenuItem value="all">All Cities</MenuItem>
                <MenuItem value="Nairobi">Nairobi</MenuItem>
                <MenuItem value="Mombasa">Mombasa</MenuItem>
                <MenuItem value="Kisumu">Kisumu</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>Agent Status</InputLabel>
              <Select
                value={filters.status}
                label="Agent Status"
                onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="idle">Idle</MenuItem>
                <MenuItem value="en_route">En Route</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
                <MenuItem value="flagged">Flagged</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>Agent Tier</InputLabel>
              <Select
                value={filters.tier}
                label="Agent Tier"
                onChange={(e) => onFiltersChange({ ...filters, tier: e.target.value })}
              >
                <MenuItem value="all">All Tiers</MenuItem>
                <MenuItem value="regular">Regular</MenuItem>
                <MenuItem value="power_agent">Power Agent</MenuItem>
                <MenuItem value="enterprise">Enterprise</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>KYC Status</InputLabel>
              <Select
                value={filters.kycStatus}
                label="KYC Status"
                onChange={(e) => onFiltersChange({ ...filters, kycStatus: e.target.value })}
              >
                <MenuItem value="all">All KYC</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="submitted">Submitted</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>Vehicle Type</InputLabel>
              <Select
                value={filters.vehicleType}
                label="Vehicle Type"
                onChange={(e) => onFiltersChange({ ...filters, vehicleType: e.target.value })}
              >
                <MenuItem value="all">All Vehicles</MenuItem>
                <MenuItem value="bicycle">Bicycle</MenuItem>
                <MenuItem value="motorcycle">Motorcycle</MenuItem>
                <MenuItem value="van">Van</MenuItem>
                <MenuItem value="truck">Truck</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>Performance Tier</InputLabel>
              <Select
                value={filters.performanceTier}
                label="Performance Tier"
                onChange={(e) => onFiltersChange({ ...filters, performanceTier: e.target.value })}
              >
                <MenuItem value="all">All Performance</MenuItem>
                <MenuItem value="bronze">Bronze</MenuItem>
                <MenuItem value="silver">Silver</MenuItem>
                <MenuItem value="gold">Gold</MenuItem>
                <MenuItem value="platinum">Platinum</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </DashboardCard>

      {/* Sort Mode */}
      <DashboardCard title="Sort By">
        <CardContent>
          <Stack spacing={1}>
            <Button
              variant={sortMode === 'closest_to_failure' ? 'contained' : 'outlined'}
              size="small"
              fullWidth
              onClick={() => onSortModeChange('closest_to_failure')}
              sx={{ justifyContent: 'flex-start' }}
            >
              <IconAlertTriangle size={16} style={{ marginRight: 8 }} />
              Closest to Failure
            </Button>
            <Button
              variant={sortMode === 'highest_performers' ? 'contained' : 'outlined'}
              size="small"
              fullWidth
              onClick={() => onSortModeChange('highest_performers')}
              sx={{ justifyContent: 'flex-start' }}
            >
              <IconTrendingUp size={16} style={{ marginRight: 8 }} />
              Highest Performers
            </Button>
            <Button
              variant={sortMode === 'most_overloaded' ? 'contained' : 'outlined'}
              size="small"
              fullWidth
              onClick={() => onSortModeChange('most_overloaded')}
              sx={{ justifyContent: 'flex-start' }}
            >
              <IconUser size={16} style={{ marginRight: 8 }} />
              Most Overloaded
            </Button>
            <Button
              variant={sortMode === 'idle_capacity' ? 'contained' : 'outlined'}
              size="small"
              fullWidth
              onClick={() => onSortModeChange('idle_capacity')}
              sx={{ justifyContent: 'flex-start' }}
            >
              <IconClock size={16} style={{ marginRight: 8 }} />
              Idle Capacity
            </Button>
          </Stack>
        </CardContent>
      </DashboardCard>
    </Box>
  );
};

export default SupplyControlPanel;
