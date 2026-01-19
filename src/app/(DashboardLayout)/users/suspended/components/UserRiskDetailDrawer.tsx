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
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from '@mui/material';
import {
  IconBan,
  IconUserCircle,
  IconClock,
  IconAlertTriangle,
  IconShield,
  IconEye,
  IconFlag,
  IconPlayerPause,
  IconPlayerPlay,
  IconArrowRight,
  IconCalendar,
  IconFileText,
  IconTrendingUp,
  IconTrendingDown,
  IconRefresh,
} from '@tabler/icons-react';

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

interface RiskUser {
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
  riskTimeline: RiskEvent[];
  activityContext: ActivityContext;
}

interface UserRiskDetailDrawerProps {
  user: RiskUser | null;
  open: boolean;
  onClose: () => void;
  onRiskAction: (action: string, user: RiskUser, reason?: string, duration?: string) => void;
}

const UserRiskDetailDrawer: React.FC<UserRiskDetailDrawerProps> = ({
  user,
  open,
  onClose,
  onRiskAction
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
  const [actionDuration, setActionDuration] = useState('7');

  const getRiskStateColor = (state: string) => {
    switch (state) {
      case 'flagged': return 'info';
      case 'temporarily_suspended': return 'warning';
      case 'permanently_banned': return 'error';
      case 'compliance_hold': return 'warning';
      default: return 'success';
    }
  };

  const getRiskStateIcon = (state: string) => {
    switch (state) {
      case 'flagged': return <IconAlertTriangle size={16} />;
      case 'temporarily_suspended': return <IconClock size={16} />;
      case 'permanently_banned': return <IconBan size={16} />;
      case 'compliance_hold': return <IconShield size={16} />;
      default: return <IconUserCircle size={16} />;
    }
  };

  const getRiskStateLabel = (state: string) => {
    switch (state) {
      case 'flagged': return 'Flagged';
      case 'temporarily_suspended': return 'Temporarily Suspended';
      case 'permanently_banned': return 'Permanently Banned';
      case 'compliance_hold': return 'Compliance Hold';
      default: return 'Active';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'flag': return <IconFlag size={16} />;
      case 'suspend': return <IconPlayerPause size={16} />;
      case 'reinstate': return <IconPlayerPlay size={16} />;
      case 'ban': return <IconBan size={16} />;
      default: return <IconFileText size={16} />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'flag': return 'info';
      case 'suspend': return 'warning';
      case 'reinstate': return 'success';
      case 'ban': return 'error';
      default: return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  const handleActionClick = (action: string) => {
    const actionConfigs = {
      flag: {
        title: 'Flag User',
        description: 'Flag this user for review and monitoring'
      },
      suspend: {
        title: 'Suspend User',
        description: 'Temporarily suspend user access to the platform'
      },
      reinstate: {
        title: 'Reinstate User',
        description: 'Remove all restrictions and restore full access'
      },
      extend_suspension: {
        title: 'Extend Suspension',
        description: 'Extend the current suspension period'
      },
      ban: {
        title: 'Permanently Ban User',
        description: 'Permanently ban this user from the platform'
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
    if (user && actionReason.trim()) {
      onRiskAction(actionDialog.action, user, actionReason, actionDuration);
      setActionDialog({ open: false, action: '', title: '', description: '' });
      setActionReason('');
      setActionDuration('7');
    }
  };

  const handleActionCancel = () => {
    setActionDialog({ open: false, action: '', title: '', description: '' });
    setActionReason('');
    setActionDuration('7');
  };

  if (!user || !open) return null;

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Drawer Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'error.main', width: 48, height: 48 }}>
            {getRiskStateIcon(user.riskState)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.id}
            </Typography>
            <Chip
              icon={getRiskStateIcon(user.riskState)}
              label={getRiskStateLabel(user.riskState)}
              color={getRiskStateColor(user.riskState) as any}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Stack>
      </Box>

      {/* Security Alert */}
      <Box sx={{ p: 3, bgcolor: 'error.light' }}>
        <Alert severity="error" icon={<IconBan size={16} />}>
          <Typography variant="body2" fontWeight={600}>
            🚨 High-Risk User Profile
          </Typography>
          <Typography variant="caption">
            All actions are logged and require justification. Access is restricted to authorized personnel.
          </Typography>
        </Alert>
      </Box>

      {/* User Overview */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          User Overview
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Phone</Typography>
            <Typography variant="body2">{user.phone}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">City / Zone</Typography>
            <Typography variant="body2">{user.city}, {user.zone}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Account Age</Typography>
            <Typography variant="body2">{user.accountAge}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">KYC Status</Typography>
            <Typography variant="body2">
              {user.kycStatus.replace('_', ' ').toUpperCase()}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Current Risk Since</Typography>
            <Typography variant="body2">{formatDate(user.since)}</Typography>
          </Stack>
          {user.expires && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">Expires</Typography>
              <Typography variant="body2" color="warning.main">
                {formatDate(user.expires)}
              </Typography>
            </Stack>
          )}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Last Activity</Typography>
            <Typography variant="body2">{formatDate(user.lastActivity)}</Typography>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      {/* Risk Timeline */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Risk Timeline
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Event</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Actor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Expires</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.riskTimeline.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {getEventIcon(event.type)}
                      <Typography variant="caption">
                        {event.type.toUpperCase()}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{event.reason}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{event.actor}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{formatDateTime(event.timestamp)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">
                      {event.expires ? formatDate(event.expires) : '-'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Divider />

      {/* Activity Context */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Activity Context
        </Typography>
        <Stack spacing={2}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Disputes
                  </Typography>
                  <Typography variant="h5" color="error.main">
                    {user.activityContext.disputes}
                  </Typography>
                </Box>
                <IconFileText size={24} color="error" />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Cancellations
                  </Typography>
                  <Typography variant="h5" color="warning.main">
                    {user.activityContext.cancellations}
                  </Typography>
                </Box>
                <IconTrendingDown size={24} color="warning" />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Pickup History
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.activityContext.pickupHistory.total} total • {user.activityContext.pickupHistory.completed} completed • {user.activityContext.pickupHistory.cancelled} cancelled • {user.activityContext.pickupHistory.noShows} no-shows
                  </Typography>
                </Box>
                <IconTrendingUp size={24} color="info" />
              </Stack>
            </CardContent>
          </Card>

          {user.activityContext.walletAnomalies && (
            <Alert severity="warning">
              <Typography variant="body2" fontWeight={600}>
                ⚠️ Wallet Anomalies Detected
              </Typography>
              <Typography variant="caption">
                Unusual transaction patterns detected in user wallet
              </Typography>
            </Alert>
          )}
        </Stack>
      </Box>

      {/* Enforcement Actions */}
      <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Enforcement Actions
        </Typography>
        
        <Stack spacing={2}>
          {user.riskState === 'active' && (
            <>
              <Button
                variant="outlined"
                color="info"
                startIcon={<IconFlag size={16} />}
                onClick={() => handleActionClick('flag')}
                fullWidth
              >
                Flag User
              </Button>
              <Button
                variant="outlined"
                color="warning"
                startIcon={<IconPlayerPause size={16} />}
                onClick={() => handleActionClick('suspend')}
                fullWidth
              >
                Suspend User
              </Button>
            </>
          )}
          
          {(user.riskState === 'flagged' || user.riskState === 'temporarily_suspended') && (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={<IconPlayerPlay size={16} />}
                onClick={() => handleActionClick('reinstate')}
                fullWidth
              >
                Reinstate User
              </Button>
              {user.riskState === 'temporarily_suspended' && (
                <Button
                  variant="outlined"
                  color="warning"
                  startIcon={<IconClock size={16} />}
                  onClick={() => handleActionClick('extend_suspension')}
                  fullWidth
                >
                  Extend Suspension
                </Button>
              )}
            </>
          )}
          
          {(user.riskState === 'flagged' || user.riskState === 'temporarily_suspended' || user.riskState === 'compliance_hold') && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<IconBan size={16} />}
              onClick={() => handleActionClick('ban')}
              fullWidth
            >
              Permanently Ban User
            </Button>
          )}
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
            sx={{ mb: 2 }}
          />
          
          {actionDialog.action === 'suspend' && (
            <TextField
              fullWidth
              select
              label="Duration"
              value={actionDuration}
              onChange={(e) => setActionDuration(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="3">3 days</MenuItem>
              <MenuItem value="7">7 days</MenuItem>
              <MenuItem value="14">14 days</MenuItem>
              <MenuItem value="30">30 days</MenuItem>
            </TextField>
          )}
          
          {actionDialog.action === 'extend_suspension' && (
            <TextField
              fullWidth
              select
              label="Extension Duration"
              value={actionDuration}
              onChange={(e) => setActionDuration(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="3">3 days</MenuItem>
              <MenuItem value="7">7 days</MenuItem>
              <MenuItem value="14">14 days</MenuItem>
              <MenuItem value="30">30 days</MenuItem>
            </TextField>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleActionCancel}>Cancel</Button>
          <Button 
            onClick={handleActionConfirm} 
            variant="contained"
            disabled={!actionReason.trim()}
            color={actionDialog.action === 'ban' ? 'error' : actionDialog.action === 'reinstate' ? 'success' : 'primary'}
          >
            {actionDialog.title}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserRiskDetailDrawer;
