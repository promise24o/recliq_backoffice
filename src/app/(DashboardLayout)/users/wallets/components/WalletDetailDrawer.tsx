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

interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit' | 'lock' | 'release';
  amount: number;
  description: string;
  timestamp: string;
  reference: string;
  status: 'completed' | 'pending' | 'failed';
}

interface UserWallet {
  id: string;
  name: string;
  phone: string;
  city: string;
  kycStatus: 'not_started' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'expired';
  availableBalance: number;
  pendingEscrow: number;
  onHold: number;
  lifetimeEarned: number;
  lifetimeWithdrawn: number;
  walletStatus: 'normal' | 'locked' | 'compliance_hold' | 'negative_balance' | 'high_risk';
  lastUpdated: string;
  transactions: WalletTransaction[];
}

interface WalletDetailDrawerProps {
  wallet: UserWallet | null;
  open: boolean;
  onClose: () => void;
}

const WalletDetailDrawer: React.FC<WalletDetailDrawerProps> = ({
  wallet,
  open,
  onClose
}) => {
  const getWalletStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'success';
      case 'locked': return 'error';
      case 'compliance_hold': return 'warning';
      case 'negative_balance': return 'error';
      case 'high_risk': return 'error';
      default: return 'default';
    }
  };

  const getWalletStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <IconWallet size={16} />;
      case 'locked': return <IconLock size={16} />;
      case 'compliance_hold': return <IconClock size={16} />;
      case 'negative_balance': return <IconArrowDown size={16} />;
      case 'high_risk': return <IconAlertTriangle size={16} />;
      default: return <IconAlertTriangle size={16} />;
    }
  };

  const getWalletStatusLabel = (status: string) => {
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
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  const handleCrossLink = (destination: string) => {
    // Log cross-link access for security
    console.log(`Cross-link accessed: ${destination} for user ${wallet?.id}`);
    // In production, this would navigate to the appropriate page
  };

  if (!wallet || !open) return null;

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Drawer Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
            <IconWallet size={24} />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {wallet.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {wallet.id}
            </Typography>
            <Chip
              icon={getWalletStatusIcon(wallet.walletStatus)}
              label={getWalletStatusLabel(wallet.walletStatus)}
              color={getWalletStatusColor(wallet.walletStatus) as any}
              size="small"
              sx={{ mt: 1 }}
            />
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

      {/* Ledger Summary */}
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Ledger Summary
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Last 10 transactions
          </Typography>
        </Stack>
        
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wallet.transactions.slice(0, 10).map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {getTransactionIcon(transaction.type)}
                      <Typography variant="caption">
                        {transaction.type.toUpperCase()}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      color={getTransactionColor(transaction.type) + '.main' as any}
                      fontWeight={600}
                    >
                      {transaction.type === 'debit' ? '-' : '+'}{formatCurrency(transaction.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{transaction.description}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{transaction.reference}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{formatDateTime(transaction.timestamp)}</Typography>
                  </TableCell>
                </TableRow>
              ))}
              {wallet.transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No transactions found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
            startIcon={<IconUserCircle size={16} />}
            onClick={() => handleCrossLink('user_profile')}
            fullWidth
          >
            View in User Profile
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
