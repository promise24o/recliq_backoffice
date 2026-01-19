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
  IconClock,
  IconTrendingUp,
  IconAlertTriangle,
  IconFlag,
  IconEye,
  IconRefresh,
  IconRocket,
  IconWalk as IconTurtle
} from '@tabler/icons-react';

export interface AgentResponseData {
  id: string;
  agentId: string;
  name: string;
  city: string;
  zone: string;
  avgResponseTime: number; // in seconds
  medianResponseTime: number; // in seconds
  percentile90Response: number; // in seconds
  requestsSeen: number;
  requestsAccepted: number;
  slaStatus: 'excellent' | 'acceptable' | 'poor';
  fastestResponse: number; // in seconds
  slowestResponse: number; // in seconds
  onlineHours: number;
  availabilityRate: number;
}

interface AgentResponseDetailDrawerProps {
  agent: AgentResponseData | null;
  open: boolean;
  onClose: () => void;
}

const AgentResponseDetailDrawer: React.FC<AgentResponseDetailDrawerProps> = ({
  agent,
  open,
  onClose
}) => {
  const formatTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getSlaColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'acceptable': return 'warning';
      case 'poor': return 'error';
      default: return 'default';
    }
  };

  const getSlaIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <IconTrendingUp size={16} />;
      case 'acceptable': return <IconClock size={16} />;
      case 'poor': return <IconAlertTriangle size={16} />;
      default: return null;
    }
  };

  const getResponseTimeColor = (seconds: number) => {
    if (seconds <= 120) return 'success'; // ≤ 2 min
    if (seconds <= 300) return 'warning'; // 2-5 min
    return 'error'; // > 5 min
  };

  if (!open || !agent) return null;

  // Mock trend data for the chart
  const getTrendData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      responseTime: 30 + Math.floor(Math.random() * 400)
    }));
  };

  const trendData = getTrendData();
  const maxResponseTime = Math.max(...trendData.map(d => d.responseTime));

  const acceptanceRate = agent.requestsSeen > 0 ? 
    Math.round((agent.requestsAccepted / agent.requestsSeen) * 100) : 0;

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
              Agent Response Detail
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Detailed response time analysis and metrics
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
          {/* Agent Info */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Agent Information
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
                      Online Hours
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {agent.onlineHours.toFixed(1)} hrs/day
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Response Breakdown */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Response Breakdown
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Average Response Time
                </Typography>
                <Typography 
                  variant="h6" 
                  fontWeight={700}
                  color={getResponseTimeColor(agent.avgResponseTime) + '.main' as any}
                >
                  {formatTime(agent.avgResponseTime)}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Median Response Time
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {formatTime(agent.medianResponseTime)}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  90th Percentile Response
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {formatTime(agent.percentile90Response)}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Fastest Response
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconRocket size={16} color="green" />
                  <Typography variant="h6" fontWeight={600} color="success.main">
                    {formatTime(agent.fastestResponse)}
                  </Typography>
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Slowest Response
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconTurtle size={16} color="red" />
                  <Typography variant="h6" fontWeight={600} color="error.main">
                    {formatTime(agent.slowestResponse)}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* SLA Status */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              SLA Status
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              {getSlaIcon(agent.slaStatus)}
              <Chip
                label={agent.slaStatus.charAt(0).toUpperCase() + agent.slaStatus.slice(1)}
                color={getSlaColor(agent.slaStatus) as any}
                variant="outlined"
              />
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {agent.slaStatus === 'excellent' && '≤ 2 minutes average response time'}
              {agent.slaStatus === 'acceptable' && '2–5 minutes average response time'}
              {agent.slaStatus === 'poor' && '> 5 minutes average response time'}
            </Typography>
          </Box>

          <Divider />

          {/* Context Metrics */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Context Metrics
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Requests Seen</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {agent.requestsSeen.toLocaleString()}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Requests Accepted</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {agent.requestsAccepted.toLocaleString()}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Acceptance Rate</Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600}>
                    {acceptanceRate}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={acceptanceRate}
                    sx={{
                      width: 60,
                      height: 4,
                      borderRadius: 2,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: acceptanceRate >= 80 ? 'success.main' : 
                               acceptanceRate >= 60 ? 'warning.main' : 'error.main',
                        borderRadius: 2,
                      },
                    }}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Availability Rate</Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600}>
                    {agent.availabilityRate.toFixed(1)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={agent.availabilityRate}
                    sx={{
                      width: 60,
                      height: 4,
                      borderRadius: 2,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: agent.availabilityRate >= 80 ? 'success.main' : 
                               agent.availabilityRate >= 60 ? 'warning.main' : 'error.main',
                        borderRadius: 2,
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Weekly Trend Chart */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Response Time Trend
            </Typography>
            <Stack spacing={2}>
              <Typography variant="caption" color="text.secondary">
                Average response time per day (last 7 days)
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
                        value={(data.responseTime / maxResponseTime) * 100}
                        sx={{
                          flex: 1,
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getResponseTimeColor(data.responseTime) + '.main' as any,
                            borderRadius: 4,
                          },
                        }}
                      />
                      <Typography variant="caption" sx={{ width: 60, textAlign: 'right' }}>
                        {formatTime(data.responseTime)}
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
                startIcon={<IconRefresh size={16} />}
                size="small"
                sx={{ justifyContent: 'flex-start' }}
              >
                Adjust Availability Rules
              </Button>
              <Button
                variant="text"
                startIcon={<IconTrendingUp size={16} />}
                size="small"
                color="success"
                sx={{ justifyContent: 'flex-start' }}
              >
                Recommend Training
              </Button>
            </Stack>
          </Box>

          {/* Performance Notes */}
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              ⏱️ Response time is calculated from pickup request creation to agent acceptance.
              Auto-assignments are excluded from these metrics. All times are normalized for agent availability.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default AgentResponseDetailDrawer;
