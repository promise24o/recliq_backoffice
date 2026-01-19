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
  IconUserCircle,
  IconBuilding,
  IconWallet,
  IconLock,
  IconClock,
  IconAlertTriangle,
  IconArrowUp,
  IconTrendingUp,
  IconArrowDown,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

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
  transactions: any[];
}

interface UserWalletsTableProps {
  wallets: UserWallet[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onWalletClick: (wallet: UserWallet) => void;
}

const UserWalletsTable: React.FC<UserWalletsTableProps> = ({
  wallets,
  page,
  rowsPerPage,
  onPageChange,
  onWalletClick
}) => {
  const [actionMenuAnchor, setActionMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedWallet, setSelectedWallet] = React.useState<UserWallet | null>(null);

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

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'submitted': return 'warning';
      case 'rejected': return 'error';
      default: return 'info';
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

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, wallet: UserWallet) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedWallet(wallet);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedWallet(null);
  };

  const handleViewWallet = () => {
    if (selectedWallet) {
      onWalletClick(selectedWallet);
    }
    handleActionMenuClose();
  };

  // Pagination
  const paginatedWallets = wallets.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <DashboardCard>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          🔒 Read-only view - Balances derived from immutable transaction ledger
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>City</TableCell>
              <TableCell>KYC Status</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>In Escrow</TableCell>
              <TableCell>On Hold</TableCell>
              <TableCell>Lifetime Earned</TableCell>
              <TableCell>Lifetime Withdrawn</TableCell>
              <TableCell>Wallet Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedWallets.map((wallet) => (
              <TableRow 
                key={wallet.id} 
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
              >
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <IconWallet size={16} />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {wallet.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {wallet.id}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{wallet.city}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={wallet.kycStatus.replace('_', ' ').toUpperCase()}
                    color={getKYCStatusColor(wallet.kycStatus) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body2" 
                    fontWeight={600}
                    color={wallet.availableBalance < 0 ? 'error' : 'text.primary'}
                  >
                    {formatCurrency(wallet.availableBalance)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="info.main">
                    {formatCurrency(wallet.pendingEscrow)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="warning.main">
                    {formatCurrency(wallet.onHold)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="success.main">
                    {formatCurrency(wallet.lifetimeEarned)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(wallet.lifetimeWithdrawn)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getWalletStatusIcon(wallet.walletStatus)}
                    label={getWalletStatusLabel(wallet.walletStatus)}
                    color={getWalletStatusColor(wallet.walletStatus) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleActionMenuOpen(e, wallet)}
                    size="small"
                  >
                    <IconDotsVertical size={16} />
                  </IconButton>
                  <Menu
                    anchorEl={actionMenuAnchor}
                    open={Boolean(actionMenuAnchor)}
                    onClose={handleActionMenuClose}
                  >
                    <MenuItem onClick={handleViewWallet}>
                      <IconEye size={16} style={{ marginRight: 8 }} />
                      View Wallet Details
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Pagination */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, wallets.length)} of {wallets.length} wallets
          </Typography>
          <Pagination
            count={Math.ceil(wallets.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => onPageChange(value)}
            color="primary"
          />
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default UserWalletsTable;
