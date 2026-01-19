'use client'
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  Avatar,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  IconUser,
  IconPhone,
  IconMapPin,
  IconNavigation,
  IconClock,
  IconPackage,
  IconStar,
  IconTrendingUp,
  IconWallet,
  IconShield,
  IconAlertTriangle,
  IconBan,
  IconFlag,
  IconPlayerPlay,
  IconEdit,
  IconSnowflake,
  IconX,
} from '@tabler/icons-react';

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

interface AgentDetailDrawerProps {
  agent: Agent | null;
  open: boolean;
  onClose: () => void;
  onAgentAction: (action: string, agent: Agent, reason?: string) => void;
}

const AgentDetailDrawer: React.FC<AgentDetailDrawerProps> = ({
  agent,
  open,
  onClose,
  onAgentAction
}) => {
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    action: string;
    title: string;
    description: string;
  }>({
    open: false,
    action: '',
    title: '',
    description: ''
  });
  const [actionReason, setActionReason] = useState('');

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
      case 'offline': return <IconClock size={16} />;
      case 'suspended': return <IconBan size={16} />;
      case 'flagged': return <IconFlag size={16} />;
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

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 75) return 'warning';
    return 'error';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
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

  const handleActionClick = (action: string) => {
    const actionConfigs = {
      suspend: {
        title: 'Suspend Agent',
        description: 'Temporarily suspend agent from taking new pickups'
      },
      reinstate: {
        title: 'Reinstate Agent',
        description: 'Remove suspension and restore agent access'
      },
      flag: {
        title: 'Flag Agent',
        description: 'Flag agent for review and monitoring'
      },
      move_zone: {
        title: 'Move Zone',
        description: 'Change agent operating zone'
      },
      change_tier: {
        title: 'Change Tier',
        description: 'Update agent tier level'
      },
      freeze_payouts: {
        title: 'Freeze Payouts',
        description: 'Freeze agent wallet and pending payouts'
      }
    };

    const config = actionConfigs[action as keyof typeof actionConfigs];
    if (config) {
      setActionDialog({
        open: true,
        action,
        title: config.title,
        description: config.description
      });
    }
  };

  const handleActionConfirm = () => {
    if (agent && actionReason.trim()) {
      onAgentAction(actionDialog.action, agent, actionReason);
      setActionDialog({ open: false, action: '', title: '', description: '' });
      setActionReason('');
    }
  };

  const handleActionCancel = () => {
    setActionDialog({ open: false, action: '', title: '', description: '' });
    setActionReason('');
  };

  if (!agent) {
    return (
      <Box sx={{ width: 600, height: '100%', overflow: 'auto' }}>
        <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>
              Agent Details
            </Typography>
            <Button
              variant="text"
              size="small"
              onClick={onClose}
              startIcon={<IconX size={16} />}
            >
              Close
            </Button>
          </Stack>
        </Box>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No agent selected
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: 600, height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Agent Details
          </Typography>
          <Button
            variant="text"
            size="small"
            onClick={onClose}
            startIcon={<IconX size={16} />}
          >
            Close
          </Button>
        </Stack>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Agent Overview */}
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar 
              src={agent.photo} 
              sx={{ 
                width: 64, 
                height: 64,
                bgcolor: 'primary.main',
                border: '3px solid',
                borderColor: getStatusColor(agent.status) + '.main'
              }}
            >
              <IconUser size={32} />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" fontWeight={600}>
                {agent.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {agent.id}
              </Typography>
              <Chip
                icon={getStatusIcon(agent.status)}
                label={getStatusLabel(agent.status)}
                color={getStatusColor(agent.status) as any}
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
          </Stack>

          {/* Contact & Location */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Contact & Location
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconPhone size={16} />
                <Typography variant="body2">{agent.phone}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconMapPin size={16} />
                <Typography variant="body2">{agent.zone}, {agent.city}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconPackage size={16} />
                <Typography variant="body2">
                  {agent.tier.replace('_', ' ').toUpperCase()} • {getVehicleIcon(agent.vehicleType)} {agent.vehicleType.replace('_', ' ')}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconShield size={16} />
                <Typography variant="body2">
                  KYC: {agent.kycStatus.replace('_', ' ').toUpperCase()}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Current Status */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Current Status
            </Typography>
            {agent.currentPickup && (
              <Box sx={{ 
                p: 2, 
                bgcolor: 'primary.light', 
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'primary.main',
                mb: 2
              }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconNavigation size={16} color="primary" />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>
                      Current Pickup
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {agent.currentPickup.address}
                    </Typography>
                    <Typography variant="caption" color="primary.main" sx={{ display: 'block' }}>
                      ETA: {agent.currentPickup.estimatedTime}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Last Activity
                </Typography>
                <Typography variant="body2">
                  {agent.timeSinceLastActivity} ago
                </Typography>
              </Stack>
              {agent.lastCompletedPickup && (
                <>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Last Completed
                    </Typography>
                    <Typography variant="body2">
                      {formatDateTime(agent.lastCompletedPickup.completedAt)}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {agent.lastCompletedPickup.address}
                  </Typography>
                </>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Performance Metrics */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Performance Metrics
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Completion Rate
                </Typography>
                <Typography variant="body2" color={getPerformanceColor(agent.completionRate) + '.main' as any}>
                  {agent.completionRate.toFixed(1)}%
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Avg Pickup Time
                </Typography>
                <Typography variant="body2">
                  {agent.avgPickupTime} min
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  User Rating
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <IconStar size={16} color="warning" />
                  <Typography variant="body2">
                    {agent.userRating.toFixed(1)}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Reliability Score
                </Typography>
                <Typography variant="body2" color={getPerformanceColor(agent.reliabilityScore) + '.main' as any}>
                  {agent.reliabilityScore}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Today's Performance
                </Typography>
                <Typography variant="body2">
                  {agent.activePickups} active • {agent.todayCompleted} completed
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Financial Information */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Financial Information
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Wallet Balance
                </Typography>
                <Typography variant="body2" color="success.main">
                  {formatCurrency(agent.walletBalance)}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Escrow
                </Typography>
                <Typography variant="body2" color="info.main">
                  {formatCurrency(agent.escrow)}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Pending Payouts
                </Typography>
                <Typography variant="body2" color="warning.main">
                  {formatCurrency(agent.pendingPayouts)}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Risk & Compliance */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Risk & Compliance
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Flags
                </Typography>
                <Typography variant="body2" color={agent.flags > 0 ? 'warning.main' : 'text.secondary'}>
                  {agent.flags}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Suspensions
                </Typography>
                <Typography variant="body2" color={agent.suspensions > 0 ? 'error.main' : 'text.secondary'}>
                  {agent.suspensions}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Disputes
                </Typography>
                <Typography variant="body2" color={agent.disputes > 0 ? 'warning.main' : 'text.secondary'}>
                  {agent.disputes}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Complaints
                </Typography>
                <Typography variant="body2" color={agent.complaints > 0 ? 'error.main' : 'text.secondary'}>
                  {agent.complaints}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {agent.notes && (
            <>
              <Divider />
              <Box>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Notes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {agent.notes}
                </Typography>
              </Box>
            </>
          )}

          {/* Actions */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Actions
            </Typography>
            <Stack spacing={1}>
              {agent.status === 'active' || agent.status === 'idle' ? (
                <>
                  <Button
                    variant="outlined"
                    color="warning"
                    startIcon={<IconFlag size={16} />}
                    onClick={() => handleActionClick('flag')}
                    fullWidth
                  >
                    Flag for Review
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<IconBan size={16} />}
                    onClick={() => handleActionClick('suspend')}
                    fullWidth
                  >
                    Suspend Agent
                  </Button>
                </>
              ) : agent.status === 'suspended' || agent.status === 'flagged' ? (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<IconPlayerPlay size={16} />}
                  onClick={() => handleActionClick('reinstate')}
                  fullWidth
                >
                  Reinstate Agent
                </Button>
              ) : null}
              
              <Button
                variant="outlined"
                startIcon={<IconEdit size={16} />}
                onClick={() => handleActionClick('move_zone')}
                fullWidth
              >
                Move Zone
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<IconTrendingUp size={16} />}
                onClick={() => handleActionClick('change_tier')}
                fullWidth
              >
                Change Tier
              </Button>
              
              <Button
                variant="outlined"
                color="error"
                startIcon={<IconSnowflake size={16} />}
                onClick={() => handleActionClick('freeze_payouts')}
                fullWidth
              >
                Freeze Payouts
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Action Dialog */}
      <Dialog open={actionDialog.open} onClose={handleActionCancel} maxWidth="sm" fullWidth>
        <DialogTitle>{actionDialog.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {actionDialog.description}
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Reason (Required)"
            value={actionReason}
            onChange={(e) => setActionReason(e.target.value)}
            placeholder="Please provide a clear reason for this action..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleActionCancel}>Cancel</Button>
          <Button 
            onClick={handleActionConfirm} 
            variant="contained"
            disabled={!actionReason.trim()}
            color={actionDialog.action === 'suspend' || actionDialog.action === 'freeze_payouts' ? 'error' : 'primary'}
          >
            {actionDialog.title}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AgentDetailDrawer;
