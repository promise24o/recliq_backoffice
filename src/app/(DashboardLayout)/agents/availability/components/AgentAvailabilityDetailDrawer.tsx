'use client'
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Button,
  Divider,
  Avatar,
} from '@mui/material';
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerStop,
  IconWifi,
  IconWifiOff,
  IconClock,
  IconCalendar,
  IconTrendingUp,
  IconAlertTriangle,
  IconMessage,
  IconFlag,
  IconAdjustments,
  IconGift,
} from '@tabler/icons-react';

interface AgentAvailability {
  id: string;
  name: string;
  city: string;
  zone: string;
  currentStatus: 'available' | 'busy' | 'idle' | 'offline' | 'suspended';
  lastActive: string;
  avgAvailability: number;
  idleTimeToday: number;
  assignedPickupsToday: number;
  agentType: 'individual' | 'fleet';
  scheduledHours: string;
  actualOnlineDuration: number;
  pickupsAcceptedWhileOnline: number;
  missedAssignments: number;
  reliabilityScore: number;
  peakHourParticipation: number;
}

interface AgentAvailabilityDetailDrawerProps {
  agent: AgentAvailability;
  onClose: () => void;
  onAgentAction: (action: string, agent: AgentAvailability) => void;
}

const AgentAvailabilityDetailDrawer: React.FC<AgentAvailabilityDetailDrawerProps> = ({
  agent,
  onClose,
  onAgentAction
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success';
      case 'busy': return 'info';
      case 'idle': return 'warning';
      case 'offline': return 'error';
      case 'suspended': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <IconPlayerPlay size={20} />;
      case 'busy': return <IconPlayerStop size={20} />;
      case 'idle': return <IconPlayerPause size={20} />;
      case 'offline': return <IconWifiOff size={20} />;
      case 'suspended': return <IconWifiOff size={20} />;
      default: return <IconWifi size={20} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'idle': return 'Idle';
      case 'offline': return 'Offline';
      case 'suspended': return 'Suspended';
      default: return status;
    }
  };

  const formatLastActive = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getReliabilityColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 75) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {agent.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {agent.id} • {agent.agentType.charAt(0).toUpperCase() + agent.agentType.slice(1)} Agent
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {agent.city}, {agent.zone}
            </Typography>
            <Chip
              icon={getStatusIcon(agent.currentStatus)}
              label={getStatusLabel(agent.currentStatus)}
              color={getStatusColor(agent.currentStatus) as any}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
          <Button onClick={onClose} sx={{ minWidth: 'auto' }}>
            ×
          </Button>
        </Stack>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
        <Stack spacing={3}>
          {/* Availability Signals */}
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Availability Signals
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Current Status</Typography>
                      <Chip
                        icon={getStatusIcon(agent.currentStatus)}
                        label={getStatusLabel(agent.currentStatus)}
                        color={getStatusColor(agent.currentStatus) as any}
                        size="small"
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Last Online</Typography>
                      <Typography variant="body1">{formatLastActive(agent.lastActive)}</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Scheduled Hours</Typography>
                      <Typography variant="body1">{agent.scheduledHours}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Actual Online Today</Typography>
                      <Typography variant="body1">{formatDuration(agent.actualOnlineDuration)}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Activity Signals */}
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Activity Signals
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Pickups Accepted While Online</Typography>
                      <Typography variant="h5" color="success.main">{agent.pickupsAcceptedWhileOnline}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Missed Assignments</Typography>
                      <Typography variant="h5" color="error.main">{agent.missedAssignments}</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Idle Time Today</Typography>
                      <Typography variant="h5">{formatDuration(agent.idleTimeToday)}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Assigned Pickups Today</Typography>
                      <Typography variant="h5">{agent.assignedPickupsToday}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Reliability Indicators */}
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Reliability Indicators
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="body2">Availability Consistency Score</Typography>
                    <Typography variant="body2" color={getReliabilityColor(agent.reliabilityScore) + '.main' as any}>
                      {agent.reliabilityScore}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={agent.reliabilityScore}
                    color={getReliabilityColor(agent.reliabilityScore) as any}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="body2">Peak Hour Participation</Typography>
                    <Typography variant="body2" color="info.main">
                      {agent.peakHourParticipation}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={agent.peakHourParticipation}
                    color="info"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="body2">Average Availability</Typography>
                    <Typography variant="body2" color="success.main">
                      {agent.avgAvailability.toFixed(1)}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={agent.avgAvailability}
                    color="success"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Insights
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconTrendingUp size={20} color="green" />
                  <Typography variant="body2">
                    Strong performance during peak hours (8AM-6PM)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconClock size={20} color="orange" />
                  <Typography variant="body2">
                    Above-average idle time indicates capacity for more assignments
                  </Typography>
                </Box>
                {agent.missedAssignments > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconAlertTriangle size={20} color="red" />
                    <Typography variant="body2" color="error.main">
                      {agent.missedAssignments} missed assignments require follow-up
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {/* Actions */}
      <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
        <Stack spacing={2}>
          <Typography variant="h6">Actions</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Button
                variant="outlined"
                startIcon={<IconMessage size={16} />}
                onClick={() => onAgentAction('send_reminder', agent)}
                fullWidth
              >
                Send Availability Reminder
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Button
                variant="outlined"
                startIcon={<IconAdjustments size={16} />}
                onClick={() => onAgentAction('adjust_eligibility', agent)}
                fullWidth
              >
                Adjust Assignment Eligibility
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Button
                variant="outlined"
                startIcon={<IconFlag size={16} />}
                onClick={() => onAgentAction('flag_followup', agent)}
                fullWidth
              >
                Flag for Ops Follow-up
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Button
                variant="outlined"
                startIcon={<IconGift size={16} />}
                onClick={() => onAgentAction('recommend_incentive', agent)}
                fullWidth
              >
                Recommend Incentive Targeting
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
};

export default AgentAvailabilityDetailDrawer;
