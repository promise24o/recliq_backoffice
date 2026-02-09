'use client'
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
  Divider,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Alert,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  IconUser,
  IconPhone,
  IconMapPin,
  IconClock,
  IconAlertTriangle,
  IconBan,
  IconShield,
  IconCheck,
  IconX,
  IconFlag,
  IconHistory,
  IconActivity,
  IconCalendar,
  IconUserOff,
  IconRefresh,
  IconEye,
  IconPhoto,
  IconFileText,
  IconScale,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface RiskAgent {
  id: string;
  name: string;
  phone: string;
  city: string;
  zone: string;
  riskState: 'active' | 'flagged' | 'temporarily_suspended' | 'permanently_banned' | 'compliance_hold';
  reason: string;
  since: string;
  expires?: string;
  flaggedBy: string;
  lastActivity: string;
  accountAge: string;
  kycStatus: 'not_started' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'expired';
  agentType: 'individual' | 'fleet';
  riskTimeline: RiskEvent[];
  activityContext: ActivityContext;
}

interface RiskEvent {
  id: string;
  type: 'flag' | 'suspend' | 'reinstate' | 'ban';
  reason: string;
  timestamp: string;
  actor: string;
  expires?: string;
  resolved?: boolean;
}

interface ActivityContext {
  disputes: number;
  cancellations: number;
  walletAnomalies: boolean;
  pickupHistory: {
    total: number;
    completed: number;
    cancelled: number;
    noShows: number;
  };
}

interface AgentRiskDetailDrawerProps {
  agent: RiskAgent | null;
  open: boolean;
  onClose: () => void;
  onRiskAction: (action: string, agent: RiskAgent, reason?: string, duration?: string) => void;
}

const AgentRiskDetailDrawer: React.FC<AgentRiskDetailDrawerProps> = ({
  agent,
  open,
  onClose,
  onRiskAction,
}) => {
  const [actionReason, setActionReason] = useState('');
  const [suspensionDuration, setSuspensionDuration] = useState('7');

  if (!agent) return null;

  const getRiskStateColor = (state: string) => {
    switch (state) {
      case 'flagged': return 'warning';
      case 'temporarily_suspended': return 'warning';
      case 'permanently_banned': return 'error';
      case 'compliance_hold': return 'info';
      case 'active': return 'success';
      default: return 'default';
    }
  };

  const getRiskStateIcon = (state: string) => {
    switch (state) {
      case 'flagged': return <IconAlertTriangle size={16} />;
      case 'temporarily_suspended': return <IconClock size={16} />;
      case 'permanently_banned': return <IconBan size={16} />;
      case 'compliance_hold': return <IconShield size={16} />;
      case 'active': return <IconCheck size={16} />;
      default: return <IconUser size={16} />;
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'not_started': return 'default';
      case 'submitted': return 'info';
      case 'under_review': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'expired': return 'error';
      default: return 'default';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'flag': return <IconFlag size={16} />;
      case 'suspend': return <IconClock size={16} />;
      case 'reinstate': return <IconCheck size={16} />;
      case 'ban': return <IconBan size={16} />;
      default: return <IconHistory size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAction = (action: string) => {
    onRiskAction(action, agent, actionReason, suspensionDuration);
    setActionReason('');
    setSuspensionDuration('7');
  };

  return (
    <Box sx={{ width: 600, height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Agent Risk Profile
          </Typography>
          <Button onClick={onClose} size="small">
            <IconX size={16} />
          </Button>
        </Stack>
      </Box>

      {/* Agent Overview */}
      <Box sx={{ p: 3 }}>
        <DashboardCard>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Agent Overview
          </Typography>
          <CardContent>
            <Stack spacing={3}>
              {/* Basic Info */}
              <Stack direction="row" alignItems="center" spacing={3}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
                  <IconUser size={32} />
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h6" fontWeight={600}>
                    {agent.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {agent.id} • {agent.agentType}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1}>
                    <Chip
                      icon={getRiskStateIcon(agent.riskState)}
                      label={agent.riskState.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      color={getRiskStateColor(agent.riskState) as any}
                      size="small"
                    />
                    <Chip
                      label={agent.kycStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      color={getKycStatusColor(agent.kycStatus) as any}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                </Box>
              </Stack>

              {/* Contact & Location */}
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconPhone size={16} color="text.secondary" />
                  <Typography variant="body2">{agent.phone}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconMapPin size={16} color="text.secondary" />
                  <Typography variant="body2">{agent.city}, {agent.zone}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconCalendar size={16} color="text.secondary" />
                  <Typography variant="body2">Account age: {agent.accountAge}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconActivity size={16} color="text.secondary" />
                  <Typography variant="body2">Last active: {formatDate(agent.lastActivity)}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </DashboardCard>

        {/* Risk Details */}
        <DashboardCard>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Risk Details
          </Typography>
          <CardContent>
            <Stack spacing={3}>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Current Risk State
                </Typography>
                <Chip
                  icon={getRiskStateIcon(agent.riskState)}
                  label={agent.riskState.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  color={getRiskStateColor(agent.riskState) as any}
                />
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Reason
                </Typography>
                <Typography variant="body1">{agent.reason}</Typography>
              </Box>

              <Stack direction="row" spacing={3}>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Since
                  </Typography>
                  <Typography variant="body2">{formatDate(agent.since)}</Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Expires
                  </Typography>
                  <Typography variant="body2">
                    {agent.expires ? formatDate(agent.expires) : 'Never'}
                  </Typography>
                </Box>
              </Stack>

              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Flagged By
                </Typography>
                <Typography variant="body2">{agent.flaggedBy}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </DashboardCard>

        {/* Activity Context */}
        <DashboardCard sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Activity Context
          </Typography>
          <CardContent>
            <Stack spacing={3}>
              <Stack direction="row" spacing={3}>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Disputes
                  </Typography>
                  <Typography variant="h6" color="error.main">
                    {agent.activityContext.disputes}
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Cancellations
                  </Typography>
                  <Typography variant="h6" color="warning.main">
                    {agent.activityContext.cancellations}
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Wallet Anomalies
                  </Typography>
                  <Chip
                    label={agent.activityContext.walletAnomalies ? 'Detected' : 'None'}
                    color={agent.activityContext.walletAnomalies ? 'error' : 'success'}
                    size="small"
                  />
                </Box>
              </Stack>

              <Divider />

              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Pickup History
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">Total Pickups</Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {agent.activityContext.pickupHistory.total}
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={(agent.activityContext.pickupHistory.total / 100) * 100}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Box>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">Completed</Typography>
                      <Typography variant="body2" fontWeight={600} color="success.main">
                        {agent.activityContext.pickupHistory.completed}
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={(agent.activityContext.pickupHistory.completed / agent.activityContext.pickupHistory.total) * 100}
                      color="success"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Box>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">Cancelled</Typography>
                      <Typography variant="body2" fontWeight={600} color="warning.main">
                        {agent.activityContext.pickupHistory.cancelled}
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={(agent.activityContext.pickupHistory.cancelled / agent.activityContext.pickupHistory.total) * 100}
                      color="warning"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Box>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">No Shows</Typography>
                      <Typography variant="body2" fontWeight={600} color="error.main">
                        {agent.activityContext.pickupHistory.noShows}
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={(agent.activityContext.pickupHistory.noShows / agent.activityContext.pickupHistory.total) * 100}
                      color="error"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </DashboardCard>

        {/* Risk Timeline */}
        <DashboardCard sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Risk Timeline
          </Typography>
          <CardContent>
            <List>
              {agent.riskTimeline.map((event, index) => (
                <ListItem key={event.id} sx={{ pl: 0 }}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: getRiskStateColor(event.type) + '.main', width: 32, height: 32 }}>
                      {getEventIcon(event.type)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" fontWeight={600}>
                          {event.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(event.timestamp)}
                        </Typography>
                      </Stack>
                    }
                    secondary={
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                          {event.reason}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                          <Typography variant="caption" color="text.secondary">
                            By: {event.actor}
                          </Typography>
                          {event.expires && (
                            <Typography variant="caption" color="text.secondary">
                              Expires: {formatDate(event.expires)}
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </DashboardCard>

        {/* Risk Actions */}
        <DashboardCard sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Risk Actions
          </Typography>
          <CardContent>
            <Alert severity="warning" sx={{ mb: 3 }}>
              All risk actions are logged and audited. Please ensure you have proper authorization before proceeding.
            </Alert>

            <Stack spacing={2}>
              {/* Reinstate Action */}
              {agent.riskState !== 'active' && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<IconCheck />}
                  onClick={() => handleAction('reinstate')}
                  fullWidth
                >
                  Reinstate Agent
                </Button>
              )}

              {/* Suspend Action */}
              {agent.riskState === 'flagged' && (
                <Box>
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Suspension Duration</InputLabel>
                    <Select
                      value={suspensionDuration}
                      label="Suspension Duration"
                      onChange={(e) => setSuspensionDuration(e.target.value)}
                    >
                      <MenuItem value="3">3 Days</MenuItem>
                      <MenuItem value="7">7 Days</MenuItem>
                      <MenuItem value="14">14 Days</MenuItem>
                      <MenuItem value="30">30 Days</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    label="Suspension Reason"
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<IconClock />}
                    onClick={() => handleAction('suspend')}
                    fullWidth
                  >
                    Suspend Agent
                  </Button>
                </Box>
              )}

              {/* Extend Suspension */}
              {agent.riskState === 'temporarily_suspended' && (
                <Box>
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Extension Duration</InputLabel>
                    <Select
                      value={suspensionDuration}
                      label="Extension Duration"
                      onChange={(e) => setSuspensionDuration(e.target.value)}
                    >
                      <MenuItem value="3">3 Days</MenuItem>
                      <MenuItem value="7">7 Days</MenuItem>
                      <MenuItem value="14">14 Days</MenuItem>
                      <MenuItem value="30">30 Days</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    label="Extension Reason"
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="outlined"
                    color="warning"
                    startIcon={<IconClock />}
                    onClick={() => handleAction('extend_suspension')}
                    fullWidth
                  >
                    Extend Suspension
                  </Button>
                </Box>
              )}

              {/* Ban Action */}
              {agent.riskState !== 'permanently_banned' && (
                <Box>
                  <TextField
                    fullWidth
                    size="small"
                    label="Ban Reason"
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<IconBan />}
                    onClick={() => handleAction('ban')}
                    fullWidth
                  >
                    Permanently Ban Agent
                  </Button>
                </Box>
              )}

              {/* Flag Action */}
              {agent.riskState === 'active' && (
                <Box>
                  <TextField
                    fullWidth
                    size="small"
                    label="Flag Reason"
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="outlined"
                    color="warning"
                    startIcon={<IconFlag />}
                    onClick={() => handleAction('flag')}
                    fullWidth
                  >
                    Flag for Review
                  </Button>
                </Box>
              )}
            </Stack>
          </CardContent>
        </DashboardCard>
      </Box>
    </Box>
  );
};

export default AgentRiskDetailDrawer;
