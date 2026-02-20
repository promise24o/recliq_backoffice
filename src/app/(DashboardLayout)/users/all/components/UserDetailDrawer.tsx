'use client'
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  Avatar,
  Chip,
} from '@mui/material';
import {
  IconBuilding,
  IconUserCircle,
  IconBan,
  IconCheck,
  IconAlertTriangle,
  IconClock,
  IconTrendingUp,
} from '@tabler/icons-react';

import { type User } from '@/hooks/useUsers';

interface UserDetailDrawerProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onUserAction: (action: string, user: User) => void;
  isActionLoading?: boolean;
}

const UserDetailDrawer: React.FC<UserDetailDrawerProps> = ({
  user,
  open,
  onClose,
  onUserAction,
  isActionLoading = false
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'dormant': return 'warning';
      case 'churned': return 'error';
      case 'suspended': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <IconCheck size={16} />;
      case 'dormant': return <IconClock size={16} />;
      case 'churned': return <IconTrendingUp size={16} />;
      case 'suspended': return <IconBan size={16} />;
      default: return <IconAlertTriangle size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const getTrustScore = (disputes: number) => {
    if (disputes === 0) return 'High';
    if (disputes <= 2) return 'Medium';
    return 'Low';
  };

  const getTrustScoreColor = (disputes: number) => {
    if (disputes === 0) return 'success.main';
    if (disputes <= 2) return 'warning.main';
    return 'error.main';
  };

  if (!user || !open) return null;

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Drawer Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
            {user.type === 'enterprise' ? <IconBuilding size={24} /> : <IconUserCircle size={24} />}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.id}
            </Typography>
            <Chip
              icon={getStatusIcon(user.status)}
              label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              color={getStatusColor(user.status) as any}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Stack>
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
            <Typography variant="body2" color="text.secondary">Location</Typography>
            <Typography variant="body2" textAlign="right">
              {user.location ? 
                `${user.location.city}, ${user.location.state}` : 
                (user.city && user.zone ? `${user.city}, ${user.zone}` : 'N/A')
              }
            </Typography>
          </Stack>
          {user.location?.address && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">Address</Typography>
              <Typography variant="body2" textAlign="right" sx={{ maxWidth: '200px' }}>
                {user.location.address}
              </Typography>
            </Stack>
          )}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">User Type</Typography>
            <Typography variant="body2">
              {user.type === 'enterprise' ? 'Enterprise-linked' : 'Individual'}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Signup Date</Typography>
            <Typography variant="body2">{formatDate(user.created)}</Typography>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      {/* Activity Summary */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Activity Summary
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Total Pickups Requested</Typography>
            <Typography variant="body2">{user.totalRecycles}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Completed Pickups</Typography>
            <Typography variant="body2">{user.totalRecycles}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Failed / Cancelled</Typography>
            <Typography variant="body2">{user.cancellations}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Avg Response Time</Typography>
            <Typography variant="body2">{user.avgResponseTime} mins</Typography>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      {/* Wallet Snapshot */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Wallet Snapshot (Read-only)
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Wallet Balance</Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatCurrency(user.walletBalance)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Pending Escrow</Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatCurrency(user.pendingEscrow)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Lifetime Rewards</Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatCurrency(user.walletBalance * 0.1)}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      {/* Risk & Trust Signals */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Risk & Trust Signals
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Disputes Raised</Typography>
            <Typography variant="body2">{user.disputesRaised}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Cancellations</Typography>
            <Typography variant="body2">{user.cancellations}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Trust Score</Typography>
            <Typography variant="body2" color={getTrustScoreColor(user.disputesRaised)}>
              {getTrustScore(user.disputesRaised)}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* User Actions */}
      <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        <Stack spacing={2}>
          {user.status === 'active' && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<IconBan size={16} />}
              onClick={() => onUserAction('suspend', user)}
              disabled={isActionLoading}
            >
              {isActionLoading ? 'Processing...' : 'Suspend User'}
            </Button>
          )}
          {(user.status === 'dormant' || user.status === 'suspended') && (
            <Button
              variant="outlined"
              color="success"
              startIcon={<IconCheck size={16} />}
              onClick={() => onUserAction('reactivate', user)}
              disabled={isActionLoading}
            >
              {isActionLoading ? 'Processing...' : 'Reactivate User'}
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<IconAlertTriangle size={16} />}
            onClick={() => onUserAction('flag', user)}
            disabled={isActionLoading}
          >
            {isActionLoading ? 'Processing...' : 'Flag for Review'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserDetailDrawer;
