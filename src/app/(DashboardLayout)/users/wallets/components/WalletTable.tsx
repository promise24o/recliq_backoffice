'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVertical,
  Shield,
  AlertTriangle,
  Clock,
  Lock,
  TrendingUp,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { 
  useWallets, 
  type Wallet, 
  type WalletStatus, 
  type KYCStatus,
  type WalletsQuery,
  type UserDetails
} from '@/hooks/useWallets';
import { WalletTableRowsSkeleton } from './WalletSkeletonLoader';

interface WalletTableProps {
  onWalletClick: (wallet: Wallet) => void;
  filters?: WalletsQuery;
}

const WalletTable: React.FC<WalletTableProps> = ({ onWalletClick, filters = {} }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: walletsData, isLoading, error } = useWallets({
    ...filters,
    page: page + 1,
    limit: rowsPerPage,
  });

  const wallets = walletsData?.data || [];
  const total = walletsData?.pagination?.total || 0;

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

  const getKycStatusColor = (status: KYCStatus) => {
    switch (status) {
      case 'approved': return 'success';
      case 'submitted': return 'warning';
      case 'under_review': return 'info';
      case 'rejected': return 'error';
      case 'expired': return 'error';
      default: return 'default';
    }
  };

  const getWalletStatusIcon = (status: WalletStatus) => {
    switch (status) {
      case 'normal': return <Shield size={16} />;
      case 'locked': return <Lock size={16} />;
      case 'compliance_hold': return <Clock size={16} />;
      case 'negative_balance': return <ArrowDown size={16} />;
      case 'high_risk': return <AlertTriangle size={16} />;
      default: return <Shield size={16} />;
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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, wallet: Wallet) => {
    setAnchorEl(event.currentTarget);
    setSelectedWallet(wallet);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedWallet(null);
  };

  // Show skeleton on first render and during loading to prevent hydration mismatch
  if (!mounted || isLoading) {
    return (
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>City</TableCell>
                <TableCell>KYC Status</TableCell>
                <TableCell>Available Balance</TableCell>
                <TableCell>In Escrow</TableCell>
                <TableCell>On Hold</TableCell>
                <TableCell>Lifetime Earned</TableCell>
                <TableCell>Wallet Status</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <WalletTableRowsSkeleton count={rowsPerPage} />
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Failed to load wallet records</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>City</TableCell>
              <TableCell>KYC Status</TableCell>
              <TableCell>Available Balance</TableCell>
              <TableCell>In Escrow</TableCell>
              <TableCell>On Hold</TableCell>
              <TableCell>Lifetime Earned</TableCell>
              <TableCell>Wallet Status</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wallets.map((wallet) => (
              <TableRow
                key={wallet.id}
                hover
                onClick={() => onWalletClick(wallet)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar 
                      sx={{ bgcolor: 'primary.main' }}
                      src={wallet.userDetails?.profilePhoto}
                    >
                      {!wallet.userDetails?.profilePhoto && 
                       (wallet.userDetails?.name || wallet.name)?.slice(0, 2).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {wallet.userDetails?.name || wallet.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {wallet.userDetails?.email || 'N/A'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {wallet.userDetails?.phone || wallet.phone}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {wallet.userDetails?.location?.address || 
                     `${wallet.userDetails?.city || wallet.city}, ${wallet.userDetails?.state || 'N/A'}`}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={wallet.kycStatus.replace('_', ' ').toUpperCase()}
                    variant="outlined"
                    size="small"
                    color={getKycStatusColor(wallet.kycStatus) as any}
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {formatCurrency(wallet.availableBalance)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(wallet.pendingEscrow)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(wallet.onHold)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(wallet.lifetimeEarned)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {getWalletStatusIcon(wallet.walletStatus)}
                    <Chip
                      label={wallet.walletStatus.replace('_', ' ').toUpperCase()}
                      variant="outlined"
                      size="small"
                      color={getWalletStatusColor(wallet.walletStatus) as any}
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontSize="0.875rem">
                    {new Date(wallet.lastUpdated).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, wallet);
                    }}
                  >
                    <MoreVertical size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} wallets`}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          if (selectedWallet) {
            onWalletClick(selectedWallet);
          }
          handleMenuClose();
        }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <TrendingUp size={16} />
            <Typography variant="body2">View Details</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default WalletTable;
