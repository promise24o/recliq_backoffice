'use client'
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
} from '@mui/material';
import {
  IconDotsVertical,
  IconEye,
  IconUser,
  IconMapPin,
  IconWallet,
  IconClock,
  IconCurrencyDollar,
  IconRefresh,
  IconBan,
  IconAlertTriangle,
  IconCheck,
  IconSnowflake,
  IconAdjustments,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

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

interface WalletTableProps {
  wallets: AgentWallet[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onWalletClick: (wallet: AgentWallet) => void;
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

const WalletTable: React.FC<WalletTableProps> = ({
  wallets,
  page,
  rowsPerPage,
  onPageChange,
  onWalletClick,
  onWalletAction,
  formatCurrency
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedWallet, setSelectedWallet] = React.useState<AgentWallet | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, wallet: AgentWallet) => {
    setAnchorEl(event.currentTarget);
    setSelectedWallet(wallet);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedWallet(null);
  };

  const handleAction = (action: string) => {
    if (selectedWallet) {
      onWalletAction(action, selectedWallet);
    }
    handleMenuClose();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'individual': return 'info';
      case 'company': return 'warning';
      case 'fleet': return 'error';
      default: return 'default';
    }
  };

  const getBalanceColor = (balance: number) => {
    if (balance < 0) return 'error.main';
    if (balance === 0) return 'warning.main';
    return 'success.main';
  };

  const paginatedWallets = wallets.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <DashboardCard title="Agent Wallets">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Agent</TableCell>
              <TableCell>City / Zone</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Last Payout</TableCell>
              <TableCell>Wallet Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedWallets.map((wallet) => (
              <TableRow
                key={wallet.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => onWalletClick(wallet)}
              >
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 40, height: 40 }}>
                      <IconUser size={24} />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {wallet.agentName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {wallet.agentId}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconMapPin size={14} />
                      <Typography variant="body2">
                        {wallet.zone}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {wallet.city}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600} color={getBalanceColor(wallet.balance)}>
                    {formatCurrency(wallet.balance)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconClock size={16} />
                    <Typography variant="body2">
                      {formatCurrency(wallet.pendingEarnings)}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconCurrencyDollar size={16} />
                    <Typography variant="body2" color="success.main">
                      {formatCurrency(wallet.availableBalance)}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack spacing={0.5}>
                    {wallet.lastPayoutDate && (
                      <>
                        <Typography variant="body2">
                          {formatCurrency(wallet.lastPayoutAmount || 0)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {wallet.lastPayoutDate}
                        </Typography>
                      </>
                    )}
                    {!wallet.lastPayoutDate && (
                      <Typography variant="caption" color="text.secondary">
                        No payouts
                      </Typography>
                    )}
                  </Stack>
                </TableCell>
                <TableCell>
                  <StatusChip status={wallet.walletStatus} />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(e, wallet);
                    }}
                  >
                    <IconDotsVertical size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAction('view')}>
          <IconEye size={16} style={{ marginRight: 8 }} />
          View Details
        </MenuItem>
        {selectedWallet && selectedWallet.availableBalance > 0 && (
          <MenuItem onClick={() => handleAction('payout')}>
            <IconCurrencyDollar size={16} style={{ marginRight: 8 }} />
            Trigger Payout
          </MenuItem>
        )}
        {selectedWallet?.riskControls.isFrozen ? (
          <MenuItem onClick={() => handleAction('unfreeze')}>
            <IconCheck size={16} style={{ marginRight: 8 }} />
            Unfreeze Wallet
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleAction('freeze')}>
            <IconSnowflake size={16} style={{ marginRight: 8 }} />
            Freeze Wallet
          </MenuItem>
        )}
        <MenuItem onClick={() => handleAction('adjustment')}>
          <IconAdjustments size={16} style={{ marginRight: 8 }} />
          Apply Adjustment
        </MenuItem>
      </Menu>

      {/* Pagination */}
      {wallets.length > rowsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, pr: 2 }}>
          <Pagination
            count={Math.ceil(wallets.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => onPageChange(value)}
            color="primary"
          />
        </Box>
      )}
    </DashboardCard>
  );
};

export default WalletTable;
