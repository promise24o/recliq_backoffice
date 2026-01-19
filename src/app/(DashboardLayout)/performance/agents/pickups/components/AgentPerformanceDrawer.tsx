'use client'
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Stack,
  Chip,
  Divider,
  IconButton,
  Grid,
  LinearProgress,
  Button
} from '@mui/material';
import {
  IconX,
  IconUser,
  IconMap,
  IconCheck,
  IconX as IconFailed,
  IconClock,
  IconTrendingUp,
  IconAlertTriangle,
  IconFlag,
  IconAward,
  IconEye,
  IconRefresh
} from '@tabler/icons-react';

export interface AgentData {
  id: string;
  agentId: string;
  name: string;
  city: string;
  zone: string;
  totalPickups: number;
  thisWeek: number;
  thisMonth: number;
  avgPerDay: number;
  completionRate: number;
  status: 'excellent' | 'normal' | 'at_risk';
  cancelledPickups: number;
  failedPickups: number;
  avgCompletionTime: number;
  activeStatus: 'active' | 'suspended';
}

interface AgentPerformanceDrawerProps {
  agent: AgentData | null;
  open: boolean;
  onClose: () => void;
}

const AgentPerformanceDrawer: React.FC<AgentPerformanceDrawerProps> = ({
  agent,
  open,
  onClose
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'normal': return 'info';
      case 'at_risk': return 'warning';
      case 'active': return 'success';
      case 'suspended': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <IconAward size={16} />;
      case 'normal': return <IconUser size={16} />;
      case 'at_risk': return <IconAlertTriangle size={16} />;
      case 'active': return <IconCheck size={16} />;
      case 'suspended': return <IconFailed size={16} />;
      default: return null;
    }
  };

  const getPerformanceColor = (rate: number) => {
    if (rate >= 95) return 'success';
    if (rate >= 85) return 'warning';
    return 'error';
  };

  if (!open || !agent) return null;

  // Mock trend data for the chart
  const getTrendData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      pickups: Math.floor(Math.random() * 15) + 5
    }));
  };

  const trendData = getTrendData();
  const maxPickups = Math.max(...trendData.map(d => d.pickups));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 500, md: 600 },
          p: 0,
        }
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: 'grey.50'
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Agent Performance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Detailed pickup metrics and analysis
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <IconX size={20} />
          </IconButton>
        </Stack>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
        <Stack spacing={3}>
          {/* Agent Overview */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Agent Overview
            </Typography>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Agent ID
                    </Typography>
                    <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                      {agent.agentId}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Name
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {agent.name}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      City / Zone
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconMap size={16} />
                      <Typography variant="body2" fontWeight={600}>
                        {agent.city} • {agent.zone}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getStatusIcon(agent.activeStatus)}
                      <Chip
                        size="small"
                        label={agent.activeStatus.charAt(0).toUpperCase() + agent.activeStatus.slice(1)}
                        color={getStatusColor(agent.activeStatus) as any}
                        variant="outlined"
                      />
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Pickup Metrics */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Pickup Metrics
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Total Completed
                </Typography>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                  {agent.totalPickups.toLocaleString()}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  This Week
                </Typography>
                <Typography variant="h6" fontWeight={600} color="success.main">
                  {agent.thisWeek.toLocaleString()}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  This Month
                </Typography>
                <Typography variant="h6" fontWeight={600} color="info.main">
                  {agent.thisMonth.toLocaleString()}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Average per Day
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {agent.avgPerDay.toFixed(1)}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Completion Rate
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography 
                    variant="h6" 
                    fontWeight={700}
                    color={getPerformanceColor(agent.completionRate) + '.main' as any}
                  >
                    {agent.completionRate}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={agent.completionRate}
                    sx={{
                      flex: 1,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getPerformanceColor(agent.completionRate) + '.main' as any,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Performance Status */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Performance Status
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              {getStatusIcon(agent.status)}
              <Chip
                label={agent.status.charAt(0).toUpperCase() + agent.status.slice(1).replace('_', ' ')}
                color={getStatusColor(agent.status) as any}
                variant="outlined"
              />
            </Stack>
          </Box>

          <Divider />

          {/* Issue Tracking */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Issue Tracking
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Cancelled Pickups</Typography>
                <Typography variant="body2" fontWeight={600} color="warning.main">
                  {agent.cancelledPickups}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Failed Pickups</Typography>
                <Typography variant="body2" fontWeight={600} color="error.main">
                  {agent.failedPickups}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Avg Completion Time</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {agent.avgCompletionTime} minutes
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Weekly Trend Chart */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Weekly Trend
            </Typography>
            <Stack spacing={2}>
              <Typography variant="caption" color="text.secondary">
                Pickups per day (last 7 days)
              </Typography>
              <Stack spacing={1}>
                {trendData.map((data, index) => (
                  <Box key={index}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="caption" sx={{ width: 40 }}>
                        {data.day}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(data.pickups / maxPickups) * 100}
                        sx={{
                          flex: 1,
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: 'primary.main',
                            borderRadius: 4,
                          },
                        }}
                      />
                      <Typography variant="caption" sx={{ width: 30, textAlign: 'right' }}>
                        {data.pickups}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Actions (Role-based) */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Actions
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<IconEye size={16} />}
                  size="small"
                >
                  View Full Profile
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconFlag size={16} />}
                  size="small"
                  color="warning"
                >
                  Flag for Review
                </Button>
              </Stack>
              <Button
                variant="outlined"
                startIcon={<IconAward size={16} />}
                size="small"
                color="success"
              >
                Assign to B2B Priority Pool
              </Button>
              <Button
                variant="text"
                startIcon={<IconRefresh size={16} />}
                size="small"
                sx={{ justifyContent: 'flex-start' }}
              >
                Refresh Performance Data
              </Button>
            </Stack>
          </Box>

          {/* Performance Notes */}
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              📊 Performance metrics are calculated based on completed pickups only. 
              Cancelled and failed pickups are tracked separately for quality assessment.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default AgentPerformanceDrawer;
