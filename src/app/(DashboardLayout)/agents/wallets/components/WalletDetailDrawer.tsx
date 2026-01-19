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
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  IconUser,
  IconMapPin,
  IconCalendar,
  IconCheck,
  IconX,
  IconBan,
  IconClock,
  IconEye,
  IconFileText,
  IconNotes,
  IconHistory,
  IconWallet,
  IconCurrencyDollar,
  IconAdjustments,
  IconRefresh,
  IconSnowflake,
  IconX as IconClose,
  IconTrendingUp,
  IconTrendingDown,
  IconAlertTriangle,
} from '@tabler/icons-react';

interface WalletTransaction {
  id: string;
  date: string;
  type: 'pickup_credit' | 'adjustment' | 'payout' | 'penalty' | 'bonus';
  referenceId: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

interface AgentWallet {
  id: string;
  agentId: string;
  agentName: string;
  agentType: 'individual' | 'company' | 'fleet';
  city: string;
  zone: string;
  walletStatus: 'active' | 'frozen' | 'negative' | 'review_required';
  balance: number;
  pendingEarnings: number;
  availableBalance: number;
  lastPayoutDate?: string;
  lastPayoutAmount?: number;
  transactions: WalletTransaction[];
  payoutHistory: {
    id: string;
    method: 'bank_transfer' | 'mobile_money' | 'crypto';
    amount: number;
    date: string;
    status: 'processing' | 'completed' | 'failed';
  }[];
  riskControls: {
    isFrozen: boolean;
    freezeReason?: string;
    manualAdjustments: number;
    notes: string[];
  };
}

interface WalletDetailDrawerProps {
  wallet: AgentWallet | null;
  open: boolean;
  onClose: () => void;
  onWalletAction: (action: string, wallet: AgentWallet, reason?: string) => void;
  formatCurrency: (amount: number) => string;
}

const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'success', icon: <IconCheck size={14} />, label: 'Active' };
      case 'frozen':
        return { color: 'error', icon: <IconSnowflake size={14} />, label: 'Frozen' };
      case 'negative':
        return { color: 'error', icon: <IconAlertTriangle size={14} />, label: 'Negative' };
      case 'review_required':
        return { color: 'warning', icon: <IconEye size={14} />, label: 'Review Required' };
      default:
        return { color: 'default', icon: <IconEye size={14} />, label: status };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      color={config.color as any}
      icon={config.icon}
      label={config.label}
      size="small"
      variant="outlined"
    />
  );
};

const TransactionStatusChip: React.FC<{ status: string }> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { color: 'success', icon: <IconCheck size={14} />, label: 'Completed' };
      case 'pending':
        return { color: 'warning', icon: <IconClock size={14} />, label: 'Pending' };
      case 'failed':
        return { color: 'error', icon: <IconX size={14} />, label: 'Failed' };
      default:
        return { color: 'default', icon: <IconClock size={14} />, label: status };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      color={config.color as any}
      icon={config.icon}
      label={config.label}
      size="small"
      variant="outlined"
    />
  );
};

const WalletDetailDrawer: React.FC<WalletDetailDrawerProps> = ({
  wallet,
  open,
  onClose,
  onWalletAction,
  formatCurrency
}) => {
  const [activeTab, setActiveTab] = useState(0);
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

  if (!wallet) return null;

  const handleAction = (action: string) => {
    if (action === 'freeze' || action === 'adjustment') {
      setActionDialog({
        open: true,
        action,
        title: `Confirm ${action}`,
        description: `Please provide a reason for ${action}ing ${wallet.agentName}'s wallet`
      });
    } else {
      onWalletAction(action, wallet);
    }
  };

  const handleActionConfirm = () => {
    onWalletAction(actionDialog.action, wallet, actionReason);
    setActionDialog({ open: false, action: '', title: '', description: '' });
    setActionReason('');
    onClose();
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'pickup_credit': return <IconTrendingUp size={20} color="green" />;
      case 'adjustment': return <IconAdjustments size={20} color="blue" />;
      case 'payout': return <IconRefresh size={20} color="orange" />;
      case 'penalty': return <IconTrendingDown size={20} color="red" />;
      case 'bonus': return <IconCurrencyDollar size={20} color="green" />;
      default: return <IconFileText size={20} />;
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case 'pickup_credit': return 'Pickup Credit';
      case 'adjustment': return 'Adjustment';
      case 'payout': return 'Payout';
      case 'penalty': return 'Penalty';
      case 'bonus': return 'Bonus';
      default: return type.replace('_', ' ');
    }
  };

  return (
    <>
      <Box sx={{ width: 600, height: '100%', overflow: 'auto' }}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {wallet.agentName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {wallet.agentId} • {wallet.agentType.charAt(0).toUpperCase() + wallet.agentType.slice(1)}
              </Typography>
            </Box>
            <IconButton onClick={onClose}>
              <IconClose size={20} />
            </IconButton>
          </Stack>
        </Box>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 3 }}>
          <Tab label="Overview" />
          <Tab label="Transactions" />
          <Tab label="Payouts" />
          <Tab label="Risk & Controls" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Agent Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      City / Zone
                    </Typography>
                    <Typography variant="body1">
                      {wallet.city}, {wallet.zone}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Wallet Status
                    </Typography>
                    <Box mt={1}>
                      <StatusChip status={wallet.walletStatus} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Balance Breakdown
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Balance
                    </Typography>
                    <Typography variant="h6" color={wallet.balance < 0 ? 'error.main' : 'success.main'}>
                      {formatCurrency(wallet.balance)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Pending Earnings
                    </Typography>
                    <Typography variant="h6" color="warning.main">
                      {formatCurrency(wallet.pendingEarnings)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Available Balance
                    </Typography>
                    <Typography variant="h6" color="success.main">
                      {formatCurrency(wallet.availableBalance)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Last Payout
                    </Typography>
                    <Typography variant="h6">
                      {wallet.lastPayoutAmount ? formatCurrency(wallet.lastPayoutAmount) : 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {wallet.lastPayoutDate || 'No payouts'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Actions
                </Typography>
                <Stack direction="row" spacing={2}>
                  {wallet.availableBalance > 0 && (
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<IconCurrencyDollar size={16} />}
                      onClick={() => handleAction('payout')}
                    >
                      Trigger Payout
                    </Button>
                  )}
                  {wallet.riskControls.isFrozen ? (
                    <Button
                      variant="outlined"
                      color="success"
                      startIcon={<IconCheck size={16} />}
                      onClick={() => handleAction('unfreeze')}
                    >
                      Unfreeze Wallet
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<IconSnowflake size={16} />}
                      onClick={() => handleAction('freeze')}
                    >
                      Freeze Wallet
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    startIcon={<IconAdjustments size={16} />}
                    onClick={() => handleAction('adjustment')}
                  >
                    Apply Adjustment
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IconNotes size={16} />}
                    onClick={() => handleAction('add_note')}
                  >
                    Add Note
                  </Button>
                </Stack>
              </Box>
            </Stack>
          )}

          {activeTab === 1 && (
            <Stack spacing={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Wallet Transaction Ledger
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Reference</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wallet.transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            {getTransactionIcon(transaction.type)}
                            <Typography variant="body2">
                              {getTransactionTypeLabel(transaction.type)}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{transaction.referenceId}</TableCell>
                        <TableCell>
                          <Typography variant="body2" color={transaction.amount < 0 ? 'error.main' : 'success.main'}>
                            {formatCurrency(transaction.amount)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <TransactionStatusChip status={transaction.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          )}

          {activeTab === 2 && (
            <Stack spacing={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Payout History
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Method</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wallet.payoutHistory.map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell>{payout.date}</TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {payout.method.replace('_', ' ').toUpperCase()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="success.main">
                            {formatCurrency(payout.amount)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <TransactionStatusChip status={payout.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          )}

          {activeTab === 3 && (
            <Stack spacing={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Risk & Controls
              </Typography>
              
              <Box>
                <Typography variant="body2" fontWeight={600} gutterBottom>
                  Wallet Controls
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Frozen Status
                    </Typography>
                    <Typography variant="body2">
                      {wallet.riskControls.isFrozen ? 'Frozen' : 'Active'}
                    </Typography>
                    {wallet.riskControls.freezeReason && (
                      <Typography variant="caption" color="error.main" display="block">
                        {wallet.riskControls.freezeReason}
                      </Typography>
                    )}
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Manual Adjustments
                    </Typography>
                    <Typography variant="body2">
                      {wallet.riskControls.manualAdjustments}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {wallet.riskControls.notes.length > 0 && (
                <Box>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Finance Notes
                  </Typography>
                  <List dense>
                    {wallet.riskControls.notes.map((note, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={note} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Stack>
          )}
        </Box>
      </Box>

      {/* Action Dialog */}
      <Dialog open={actionDialog.open} onClose={() => setActionDialog({ ...actionDialog, open: false })} maxWidth="sm" fullWidth>
        <DialogTitle>{actionDialog.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {actionDialog.description}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Reason"
            value={actionReason}
            onChange={(e) => setActionReason(e.target.value)}
            placeholder="Please provide a detailed reason..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialog({ ...actionDialog, open: false })}>
            Cancel
          </Button>
          <Button 
            onClick={handleActionConfirm} 
            variant="contained"
            disabled={!actionReason.trim()}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WalletDetailDrawer;
