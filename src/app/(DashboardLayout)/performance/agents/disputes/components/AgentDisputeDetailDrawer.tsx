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
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  IconX,
  IconUser,
  IconMap,
  IconAlertTriangle,
  IconCheck,
  IconClock,
  IconFlag,
  IconEye,
  IconRefresh,
  IconScale,
  IconCurrency,
  IconUserOff,
  IconPackage,
  IconStar
} from '@tabler/icons-react';

export interface AgentDisputeData {
  id: string;
  agentId: string;
  name: string;
  city: string;
  zone: string;
  completedPickups: number;
  totalDisputes: number;
  openDisputes: number;
  resolvedDisputes: number;
  disputeRate: number;
  riskLevel: 'low' | 'medium' | 'high';
  disputeTypes: {
    weight: number;
    payment: number;
    conduct: number;
    missed: number;
    quality: number;
  };
  avgResolutionTime: number;
  resolvedInUserFavor: number;
  activeStatus: 'active' | 'suspended';
}

interface AgentDisputeDetailDrawerProps {
  agent: AgentDisputeData | null;
  open: boolean;
  onClose: () => void;
}

const AgentDisputeDetailDrawer: React.FC<AgentDisputeDetailDrawerProps> = ({
  agent,
  open,
  onClose
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <IconCheck size={16} />;
      case 'medium': return <IconAlertTriangle size={16} />;
      case 'high': return <IconAlertTriangle size={16} />;
      default: return null;
    }
  };

  const getDisputeRateColor = (rate: number) => {
    if (rate <= 2) return 'success';
    if (rate <= 5) return 'warning';
    return 'error';
  };

  const getDisputeTypeIcon = (type: string) => {
    switch (type) {
      case 'weight': return <IconScale size={16} />;
      case 'payment': return <IconCurrency size={16} />;
      case 'conduct': return <IconUserOff size={16} />;
      case 'missed': return <IconPackage size={16} />;
      case 'quality': return <IconStar size={16} />;
      default: return <IconAlertTriangle size={16} />;
    }
  };

  const getDisputeTypeName = (type: string) => {
    switch (type) {
      case 'weight': return 'Weight Disagreements';
      case 'payment': return 'Payment Issues';
      case 'conduct': return 'Conduct Complaints';
      case 'missed': return 'Missed Pickups';
      case 'quality': return 'Quality Issues';
      default: return 'Other';
    }
  };

  if (!open || !agent) return null;

  // Mock trend data for the chart
  const getTrendData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      disputes: Math.floor(Math.random() * 3)
    }));
  };

  const trendData = getTrendData();
  const maxDisputes = Math.max(...trendData.map(d => d.disputes));

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
              Agent Dispute Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comprehensive dispute analysis and risk assessment
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
                      {agent.activeStatus === 'active' ? <IconCheck size={16} /> : <IconAlertTriangle size={16} />}
                      <Chip
                        size="small"
                        label={agent.activeStatus.charAt(0).toUpperCase() + agent.activeStatus.slice(1)}
                        color={agent.activeStatus === 'active' ? 'success' : 'error'}
                        variant="outlined"
                      />
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Dispute Breakdown */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Dispute Breakdown
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Total Disputes
                </Typography>
                <Typography variant="h6" fontWeight={700} color="error.main">
                  {agent.totalDisputes}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Open
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="warning.main">
                    {agent.openDisputes}
                  </Typography>
                </Stack>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Resolved
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="success.main">
                    {agent.resolvedDisputes}
                  </Typography>
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Dispute Rate
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography 
                    variant="h6" 
                    fontWeight={700}
                    color={getDisputeRateColor(agent.disputeRate) + '.main' as any}
                  >
                    {agent.disputeRate.toFixed(1)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(agent.disputeRate * 10, 100)}
                    sx={{
                      flex: 1,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getDisputeRateColor(agent.disputeRate) + '.main' as any,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Risk Level */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Risk Level
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              {getRiskIcon(agent.riskLevel)}
              <Chip
                label={agent.riskLevel.charAt(0).toUpperCase() + agent.riskLevel.slice(1)}
                color={getRiskColor(agent.riskLevel) as any}
                variant="outlined"
              />
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {agent.riskLevel === 'low' && '≤ 2% dispute rate - Low risk agent'}
              {agent.riskLevel === 'medium' && '2–5% dispute rate - Medium risk agent'}
              {agent.riskLevel === 'high' && '> 5% dispute rate - High risk agent'}
            </Typography>
          </Box>

          <Divider />

          {/* Dispute Types */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Dispute Types
            </Typography>
            <List dense>
              {Object.entries(agent.disputeTypes).map(([type, count]) => (
                <ListItem key={type} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    {getDisputeTypeIcon(type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={getDisputeTypeName(type)}
                    secondary={`${count} disputes`}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                  <Typography variant="body2" fontWeight={600} color="text.secondary">
                    {count}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider />

          {/* Weekly Trend Chart */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Dispute Trend
            </Typography>
            <Stack spacing={2}>
              <Typography variant="caption" color="text.secondary">
                Disputes per day (last 7 days)
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
                        value={maxDisputes > 0 ? (data.disputes / maxDisputes) * 100 : 0}
                        sx={{
                          flex: 1,
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: data.disputes > 0 ? 'error.main' : 'success.main',
                            borderRadius: 4,
                          },
                        }}
                      />
                      <Typography variant="caption" sx={{ width: 30, textAlign: 'right' }}>
                        {data.disputes}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Resolution Metrics */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Resolution Metrics
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Avg Resolution Time</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {agent.avgResolutionTime} hours
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Resolved in User's Favor</Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600}>
                    {agent.resolvedInUserFavor}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={agent.resolvedInUserFavor}
                    sx={{
                      width: 60,
                      height: 4,
                      borderRadius: 2,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: agent.resolvedInUserFavor > 70 ? 'error.main' : 
                               agent.resolvedInUserFavor > 40 ? 'warning.main' : 'success.main',
                        borderRadius: 2,
                      },
                    }}
                  />
                </Stack>
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
                  View Dispute Cases
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconFlag size={16} />}
                  size="small"
                  color="warning"
                >
                  Flag for Audit
                </Button>
              </Stack>
              <Button
                variant="outlined"
                startIcon={<IconAlertTriangle size={16} />}
                size="small"
                color="error"
              >
                Recommend Suspension
              </Button>
              <Button
                variant="text"
                startIcon={<IconRefresh size={16} />}
                size="small"
                sx={{ justifyContent: 'flex-start' }}
              >
                Assign Retraining
              </Button>
            </Stack>
          </Box>

          {/* Performance Notes */}
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              ⚠️ Dispute rate is calculated based on completed pickups only. 
              Open disputes are tracked separately from resolved disputes. 
              Metrics exclude complaints without formal dispute tickets.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default AgentDisputeDetailDrawer;
