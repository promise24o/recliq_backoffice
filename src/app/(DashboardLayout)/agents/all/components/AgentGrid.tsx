'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, Avatar, Chip, Grid, IconButton } from '@mui/material';
import { 
  IconUser, 
  IconClock, 
  IconNavigation,
  IconPlayerPause,
  IconAlertTriangle,
  IconBan,
  IconPackage,
  IconTrendingUp,
  IconStar
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface Agent {
  id: string;
  name: string;
  phone: string;
  photo: string;
  city: string;
  zone: string;
  status: 'active' | 'idle' | 'en_route' | 'offline' | 'suspended' | 'flagged';
  tier: 'regular' | 'power_agent' | 'enterprise';
  kycStatus: 'not_started' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'expired';
  vehicleType: 'bicycle' | 'motorcycle' | 'van' | 'truck';
  performanceTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  activePickups: number;
  todayCompleted: number;
  completionRate: number;
  avgPickupTime: number;
  walletBalance: number;
  currentPickup?: {
    id: string;
    address: string;
    estimatedTime: string;
  };
  lastCompletedPickup?: {
    id: string;
    address: string;
    completedAt: string;
  };
  timeSinceLastActivity: string;
  disputes: number;
  userRating: number;
  reliabilityScore: number;
  escrow: number;
  pendingPayouts: number;
  flags: number;
  suspensions: number;
  complaints: number;
  notes: string;
}

interface AgentGridProps {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
  selectedAgentId?: string;
}

const AgentGrid: React.FC<AgentGridProps> = ({
  agents,
  onAgentClick,
  selectedAgentId
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'idle': return 'info';
      case 'en_route': return 'primary';
      case 'offline': return 'warning';
      case 'suspended': return 'error';
      case 'flagged': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <IconUser size={16} />;
      case 'idle': return <IconClock size={16} />;
      case 'en_route': return <IconNavigation size={16} />;
      case 'offline': return <IconPlayerPause size={16} />;
      case 'suspended': return <IconBan size={16} />;
      case 'flagged': return <IconAlertTriangle size={16} />;
      default: return <IconUser size={16} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Available';
      case 'idle': return 'Idle';
      case 'en_route': return 'On Pickup';
      case 'offline': return 'Offline';
      case 'suspended': return 'Suspended';
      case 'flagged': return 'Flagged';
      default: return 'Unknown';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'regular': return 'info';
      case 'power_agent': return 'warning';
      case 'enterprise': return 'error';
      default: return 'default';
    }
  };

  const getPerformanceColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return '#CD7F32';
      case 'silver': return '#C0C0C0';
      case 'gold': return '#FFD700';
      case 'platinum': return '#E5E4E2';
      default: return 'grey';
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'bicycle': return '🚴';
      case 'motorcycle': return '🏍️';
      case 'van': return '🚐';
      case 'truck': return '🚚';
      default: return '🚗';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardCard title="Agent Grid">
      <CardContent sx={{ flex: 1, overflow: 'auto' }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🧑‍🔧 Live agent workforce - Click any card for details
          </Typography>
        </Box>
        
        <Grid container spacing={2}>
          {agents.map((agent) => (
            <Grid size={{ xs: 12, sm: 6, md: 12 }} key={agent.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: selectedAgentId === agent.id ? '2px solid' : '1px solid',
                  borderColor: selectedAgentId === agent.id ? 'primary.main' : 'divider',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                    borderColor: 'primary.main',
                  }
                }} 
                onClick={() => onAgentClick(agent)}
              >
                <CardContent sx={{ pb: 2 }}>
                  <Stack spacing={2}>
                    {/* Header */}
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar 
                        src={agent.photo} 
                        sx={{ 
                          width: 48, 
                          height: 48,
                          bgcolor: 'primary.main',
                          border: `2px solid ${getPerformanceColor(agent.performanceTier)}`
                        }}
                      >
                        <IconUser size={24} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight={600}>
                          {agent.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {agent.zone} • {getVehicleIcon(agent.vehicleType)} {agent.vehicleType.replace('_', ' ')}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                          <Chip
                            icon={getStatusIcon(agent.status)}
                            label={getStatusLabel(agent.status)}
                            color={getStatusColor(agent.status) as any}
                            size="small"
                          />
                          <Chip
                            label={agent.tier.replace('_', ' ').toUpperCase()}
                            color={getTierColor(agent.tier) as any}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                      </Box>
                    </Stack>

                    {/* Current Status */}
                    {agent.currentPickup && (
                      <Box sx={{ 
                        p: 1.5, 
                        bgcolor: 'primary.light', 
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'primary.main'
                      }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <IconNavigation size={16} color="primary" />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="caption" fontWeight={600}>
                              Current Pickup
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                              {agent.currentPickup.address}
                            </Typography>
                            <Typography variant="caption" color="primary.main">
                              ETA: {agent.currentPickup.estimatedTime}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    )}

                    {/* Metrics */}
                    <Grid container spacing={1}>
                      <Grid size={{ xs: 4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" fontWeight={600} color="primary.main">
                            {agent.activePickups}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Active
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" fontWeight={600} color="success.main">
                            {agent.todayCompleted}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Today
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" fontWeight={600} color="info.main">
                            {agent.completionRate.toFixed(1)}%
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Rate
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Performance Indicators */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconStar size={16} color="warning" />
                        <Typography variant="caption">
                          {agent.userRating.toFixed(1)} ⭐
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconTrendingUp size={16} color="success" />
                        <Typography variant="caption">
                          {agent.avgPickupTime}min avg
                        </Typography>
                      </Stack>
                      <Typography variant="caption" fontWeight={600} color="success.main">
                        {formatCurrency(agent.walletBalance)}
                      </Typography>
                    </Stack>

                    {/* Risk Indicators */}
                    {(agent.flags > 0 || agent.suspensions > 0 || agent.complaints > 0) && (
                      <Box sx={{ 
                        p: 1, 
                        bgcolor: 'error.light', 
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'error.main'
                      }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          {agent.flags > 0 && (
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                              <IconAlertTriangle size={14} color="error" />
                              <Typography variant="caption" color="error.main">
                                {agent.flags} flags
                              </Typography>
                            </Stack>
                          )}
                          {agent.suspensions > 0 && (
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                              <IconBan size={14} color="error" />
                              <Typography variant="caption" color="error.main">
                                {agent.suspensions} suspensions
                              </Typography>
                            </Stack>
                          )}
                          {agent.complaints > 0 && (
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                              <IconAlertTriangle size={14} color="error" />
                              <Typography variant="caption" color="error.main">
                                {agent.complaints} complaints
                              </Typography>
                            </Stack>
                          )}
                        </Stack>
                      </Box>
                    )}

                    {/* Last Activity */}
                    <Typography variant="caption" color="text.secondary">
                      Last activity: {agent.timeSinceLastActivity} ago
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {agents.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No agents found matching the current filters
            </Typography>
          </Box>
        )}
      </CardContent>
    </DashboardCard>
  );
};

export default AgentGrid;
