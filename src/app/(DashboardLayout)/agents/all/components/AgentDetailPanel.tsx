'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Card, CardContent, Avatar, Chip, Button, Divider, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { 
  IconUser, 
  IconPhone, 
  IconMapPin,
  IconNavigation,
  IconClock,
  IconPackage,
  IconStar,
  IconTrendingUp,
  IconTrendingDown,
  IconWallet,
  IconShield,
  IconAlertTriangle,
  IconBan,
  IconFlag,
  IconPlayerPlay,
  IconRefresh,
  IconEdit,
  IconSnowflake
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

interface AgentDetailPanelProps {
  agent: Agent | null;
  onAgentAction: (action: string, agent: Agent, reason?: string) => void;
}

const AgentDetailPanel: React.FC<AgentDetailPanelProps> = ({
  agent,
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
      case 'offline': return <IconPlayerPlay size={16} />;
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
      <DashboardCard title="Agent Details">
        <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <IconUser size={48} color="text.secondary" />
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Select an agent to view details
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Click any agent card in the grid
            </Typography>
          </Box>
        </CardContent>
      </DashboardCard>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Agent Overview */}
      <DashboardCard title="Agent Overview">
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar 
                src={agent.photo} 
                sx={{ 
                  width: 56, 
                  height: 56,
                  bgcolor: 'primary.main',
                  border: '3px solid',
                  borderColor: getStatusColor(agent.status) + '.main'
                }}
              >
                <IconUser size={28} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={600}>
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
                  sx={{ mt: 0.5 }}
                />
              </Box>
            </Stack>

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
                  {agent.tier.replace('_', ' ').toUpperCase()} • {agent.vehicleType.replace('_', ' ')}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconShield size={16} />
                <Typography variant="body2">
                  KYC: {agent.kycStatus.replace('_', ' ').toUpperCase()}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </DashboardCard>

      {/* Live Status */}
      <DashboardCard title="Live Status">
        <CardContent>
          <Stack spacing={2}>
            {agent.currentPickup && (
              <Card sx={{ bgcolor: 'primary.light', border: '1px solid', borderColor: 'primary.main' }}>
                <CardContent sx={{ py: 1.5 }}>
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
                </CardContent>
              </Card>
            )}

            {agent.lastCompletedPickup && (
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Last Completed
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {agent.lastCompletedPickup.address}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {formatDateTime(agent.lastCompletedPickup.completedAt)}
                </Typography>
              </Box>
            )}

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Last Activity
              </Typography>
              <Typography variant="body2">
                {agent.timeSinceLastActivity} ago
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </DashboardCard>

      {/* Performance Snapshot */}
      <DashboardCard title="Performance Snapshot">
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Completion Rate
              </Typography>
              <Typography variant="body2" color={getPerformanceColor(agent.completionRate) + '.main' as any}>
                {agent.completionRate.toFixed(1)}%
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Avg Pickup Time
              </Typography>
              <Typography variant="body2">
                {agent.avgPickupTime} min
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
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
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Reliability Score
              </Typography>
              <Typography variant="body2" color={getPerformanceColor(agent.reliabilityScore) + '.main' as any}>
                {agent.reliabilityScore}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Disputes
              </Typography>
              <Typography variant="body2" color={agent.disputes > 0 ? 'error.main' : 'text.secondary'}>
                {agent.disputes}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </DashboardCard>

      {/* Financial Snapshot */}
      <DashboardCard title="Financial Snapshot">
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Wallet Balance
              </Typography>
              <Typography variant="body2" color="success.main">
                {formatCurrency(agent.walletBalance)}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Escrow
              </Typography>
              <Typography variant="body2" color="info.main">
                {formatCurrency(agent.escrow)}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Pending Payouts
              </Typography>
              <Typography variant="body2" color="warning.main">
                {formatCurrency(agent.pendingPayouts)}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </DashboardCard>

      {/* Risk & Trust */}
      <DashboardCard title="Risk & Trust">
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Flags
              </Typography>
              <Typography variant="body2" color={agent.flags > 0 ? 'warning.main' : 'text.secondary'}>
                {agent.flags}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Suspensions
              </Typography>
              <Typography variant="body2" color={agent.suspensions > 0 ? 'error.main' : 'text.secondary'}>
                {agent.suspensions}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Complaints
              </Typography>
              <Typography variant="body2" color={agent.complaints > 0 ? 'error.main' : 'text.secondary'}>
                {agent.complaints}
              </Typography>
            </Stack>
            {agent.notes && (
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Notes
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {agent.notes}
                </Typography>
              </Box>
            )}
          </Stack>
        </CardContent>
      </DashboardCard>

      {/* Agent Actions */}
      <DashboardCard title="Actions">
        <CardContent>
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
        </CardContent>
      </DashboardCard>

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

export default AgentDetailPanel;
