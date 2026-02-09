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

interface AgentWallet {
  id: string;
  name: string;
  phone: string;
  city: string;
  zone: string;
  agentType: 'individual' | 'company' | 'fleet';
  kycStatus: 'pending' | 'under_review' | 'verified' | 'rejected' | 'suspended';
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
  wallet: AgentWallet | null;
  open: boolean;
  onClose: () => void;
  onWalletAction: (action: string, wallet: AgentWallet, reason?: string) => void;
}

const WalletDetailDrawer: React.FC<WalletDetailDrawerProps> = ({
  wallet,
  open,
  onClose,
  onWalletAction
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'credit': return <IconArrowUp size={16} />;
      case 'debit': return <IconArrowDown size={16} />;
      case 'lock': return <IconLock size={16} />;
      case 'release': return <IconCheck size={16} />;
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

  if (!wallet) return null;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            {wallet.agentType === 'company' ? <IconBuilding size={32} /> : <IconUserCircle size={32} />}
          </Avatar>
          <Box flex={1}>
            <Typography variant="h6" fontWeight={600}>
              {wallet.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {wallet.id} • {wallet.phone}
            </Typography>
            <Chip
              icon={getWalletStatusIcon(wallet.walletStatus)}
              label={getWalletStatusLabel(wallet.walletStatus)}
              color={getWalletStatusColor(wallet.walletStatus) as any}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
          <IconButton onClick={onClose}>
            <IconX size={20} />
          </IconButton>
        </Stack>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
        {/* Agent Information */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Agent Information
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Agent Type
                </Typography>
                <Typography variant="body1">
                  {wallet.agentType === 'company' ? 'Company' : wallet.agentType === 'fleet' ? 'Fleet' : 'Individual'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body1">
                  {wallet.city}, {wallet.zone}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  KYC Status
                </Typography>
                <Typography variant="body1">
                  {wallet.kycStatus.replace('_', ' ').charAt(0).toUpperCase() + wallet.kycStatus.replace('_', ' ').slice(1)}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Wallet Balance */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Wallet Balance
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Available Balance
                </Typography>
                <Typography variant="h5" fontWeight={600} color="success.main">
                  {formatCurrency(wallet.availableBalance)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Pending Escrow
                </Typography>
                <Typography variant="h6" color="warning.main">
                  {formatCurrency(wallet.pendingEscrow)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  On Hold
                </Typography>
                <Typography variant="h6" color="error.main">
                  {formatCurrency(wallet.onHold)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Lifetime Earned
                </Typography>
                <Typography variant="h6" color="info.main">
                  {formatCurrency(wallet.lifetimeEarned)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Lifetime Withdrawn
                </Typography>
                <Typography variant="h6">
                  {formatCurrency(wallet.lifetimeWithdrawn)}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Reference</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {wallet.transactions.slice(0, 5).map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {getTransactionIcon(transaction.type)}
                          <Typography variant="body2">
                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {transaction.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {transaction.reference}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          fontWeight={600}
                          color={getTransactionColor(transaction.type) + '.main' as any}
                        >
                          {transaction.type === 'debit' ? '-' : '+'}{formatCurrency(transaction.amount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(transaction.timestamp)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          color={transaction.status === 'completed' ? 'success' : transaction.status === 'failed' ? 'error' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {wallet.transactions.length === 0 && (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No transactions found
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Wallet Status Alert */}
        {wallet.walletStatus !== 'normal' && (
          <Alert 
            severity={wallet.walletStatus === 'locked' ? 'error' : 'warning'} 
            sx={{ mb: 3 }}
          >
            <Typography variant="body2">
              <strong>{getWalletStatusLabel(wallet.walletStatus)}</strong> - This wallet requires attention.
            </Typography>
          </Alert>
        )}
      </Box>

      {/* Actions */}
      <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={2}>
          {(wallet.walletStatus === 'normal' || wallet.walletStatus === 'compliance_hold') && wallet.availableBalance > 0 && (
            <Button
              variant="contained"
              color="success"
              startIcon={<IconArrowUp size={16} />}
              fullWidth
            >
              Process Payout
            </Button>
          )}
          {wallet.walletStatus === 'normal' && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<IconLock size={16} />}
              fullWidth
            >
              Freeze Wallet
            </Button>
          )}
          {wallet.walletStatus === 'locked' && (
            <Button
              variant="outlined"
              color="success"
              startIcon={<IconCheck size={16} />}
              fullWidth
            >
              Unfreeze Wallet
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<IconFileText size={16} />}
            fullWidth
          >
            View Full History
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default WalletDetailDrawer;
