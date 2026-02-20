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
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from '@mui/material';
import {
  IconWallet,
  IconUserCircle,
  IconBuilding,
  IconLock,
  IconClock,
  IconArrowUp,
  IconArrowDown,
  IconEye,
  IconExternalLink,
  IconFileText,
  IconAlertTriangle,
  IconCheck,
  IconX,
} from '@tabler/icons-react';

import { 
  type Wallet, 
  type WalletTransaction, 
  type WalletStatus, 
  type KYCStatus,
  type UserDetails
} from '@/hooks/useWallets';

interface WalletDetailDrawerProps {
  wallet: Wallet | null;
  open: boolean;
  onClose: () => void;
}

const WalletDetailDrawer: React.FC<WalletDetailDrawerProps> = ({
  wallet,
  open,
  onClose
}) => {
  const getWalletStatusColor = (status: WalletStatus) => {
    switch (status) {
      case 'normal': return 'success';
      case 'locked': return 'error';
      case 'compliance_hold': return 'warning';
      case 'negative_balance': return 'error';
      case 'high_risk': return 'error';
      default: return 'default';
    }
  };

  const getWalletStatusIcon = (status: WalletStatus) => {
    switch (status) {
      case 'normal': return <IconWallet size={16} />;
      case 'locked': return <IconLock size={16} />;
      case 'compliance_hold': return <IconClock size={16} />;
      case 'negative_balance': return <IconArrowDown size={16} />;
      case 'high_risk': return <IconAlertTriangle size={16} />;
      default: return <IconAlertTriangle size={16} />;
    }
  };

  const getWalletStatusLabel = (status: WalletStatus) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'locked': return 'Locked';
      case 'compliance_hold': return 'Compliance Hold';
      case 'negative_balance': return 'Negative Balance';
      case 'high_risk': return 'High Risk';
      default: return 'Unknown';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'credit': return <IconArrowUp size={16} />;
      case 'debit': return <IconArrowDown size={16} />;
      case 'lock': return <IconLock size={16} />;
      case 'release': return <IconWallet size={16} />;
      default: return <IconFileText size={16} />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'credit': return 'success';
      case 'debit': return 'error';
      case 'lock': return 'warning';
      case 'release': return 'info';
      default: return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  const handleCrossLink = (destination: string) => {
    switch (destination) {
      case 'finance_ledger':
        if (wallet?.id) {
          window.location.href = `/finance/users/${wallet.userDetails?.id}`;
        }
        break;
      case 'disputes':
        if (wallet?.id) {
          window.location.href = `/disputes?userId=${wallet.id}`;
        }
        break;
      default:
        console.log('Unknown destination:', destination);
    }
  };

  if (!wallet || !open) return null;

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Drawer Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar 
            sx={{ width: 48, height: 48 }}
            src={wallet.userDetails?.profilePhoto}
          >
            {!wallet.userDetails?.profilePhoto && wallet.userDetails?.name?.slice(0, 2).toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {wallet.userDetails?.name || wallet.name}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" mt={0.5}>
              <Typography variant="body2" color="text.secondary">
                {wallet.userDetails?.email || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {wallet.userDetails?.phone || wallet.phone}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <Chip
                icon={getWalletStatusIcon(wallet.walletStatus)}
                label={getWalletStatusLabel(wallet.walletStatus)}
                color={getWalletStatusColor(wallet.walletStatus) as any}
                size="small"
              />
              <Chip
                label={`KYC: ${wallet.kycStatus.toUpperCase()}`}
                color={wallet.kycStatus === 'approved' ? 'success' : 'warning'}
                size="small"
                variant="outlined"
              />
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Read-Only Alert */}
      <Box sx={{ p: 3, bgcolor: 'info.light' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconEye size={16} />
          <Typography variant="body2" fontWeight={600}>
            🔒 Read-Only Financial View
          </Typography>
        </Box>
        <Typography variant="caption">
          All values are derived from the immutable transaction ledger. No modifications allowed.
        </Typography>
      </Box>

      {/* User Information */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          User Information
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">User ID</Typography>
            <Typography variant="body2">{wallet.userDetails?.id || wallet.id}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">User Type</Typography>
            <Typography variant="body2">{wallet.userDetails?.type || 'N/A'}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Status</Typography>
            <Chip
              label={wallet.userDetails?.status?.toUpperCase() || 'N/A'}
              color={wallet.userDetails?.status === 'active' ? 'success' : 'default'}
              size="small"
            />
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Location</Typography>
            <Typography variant="body2">
              {wallet.userDetails?.location?.address || 
               `${wallet.userDetails?.city || wallet.city}, ${wallet.userDetails?.state || 'N/A'}`}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Total Recycles</Typography>
            <Typography variant="body2">{wallet.userDetails?.totalRecycles || 0}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Last Activity</Typography>
            <Typography variant="body2">
              {wallet.userDetails?.lastActivity ? 
               new Date(wallet.userDetails.lastActivity).toLocaleDateString() : 'N/A'}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Member Since</Typography>
            <Typography variant="body2">
              {wallet.userDetails?.created ? 
               new Date(wallet.userDetails.created).toLocaleDateString() : 'N/A'}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      {/* Wallet Snapshot */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Wallet Snapshot
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Available Balance</Typography>
            <Typography 
              variant="body2" 
              fontWeight={600}
              color={wallet.availableBalance < 0 ? 'error' : 'success.main'}
            >
              {formatCurrency(wallet.availableBalance)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Pending Escrow</Typography>
            <Typography variant="body2" color="info.main">
              {formatCurrency(wallet.pendingEscrow)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">On Hold</Typography>
            <Typography variant="body2" color="warning.main">
              {formatCurrency(wallet.onHold)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Lifetime Earned</Typography>
            <Typography variant="body2" color="success.main">
              {formatCurrency(wallet.lifetimeEarned)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Lifetime Withdrawn</Typography>
            <Typography variant="body2" color="text.secondary">
              {formatCurrency(wallet.lifetimeWithdrawn)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Last Updated</Typography>
            <Typography variant="body2">{formatDateTime(wallet.lastUpdated)}</Typography>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      {/* Cross-Links */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Cross-Links
        </Typography>
        <Stack spacing={2}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<IconExternalLink size={16} />}
            onClick={() => handleCrossLink('finance_ledger')}
            fullWidth
          >
            View in Finance → User Ledger
          </Button>
      
          <Button
            variant="outlined"
            size="small"
            startIcon={<IconFileText size={16} />}
            onClick={() => handleCrossLink('disputes')}
            fullWidth
          >
            View Linked Disputes
          </Button>
        </Stack>
      </Box>

      {/* Security Notice */}
      <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        <Alert severity="info">
          <Typography variant="body2" fontWeight={600}>
            🔐 Security Notice
          </Typography>
          <Typography variant="caption">
            All wallet access is logged. This page never executes financial actions.
          </Typography>
        </Alert>
      </Box>
    </Box>
  );
};

export default WalletDetailDrawer;
