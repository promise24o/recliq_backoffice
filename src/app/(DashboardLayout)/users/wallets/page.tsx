'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  LinearProgress,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  CardContent,
} from '@mui/material';
import {
  IconWallet,
  IconSearch,
  IconFilter,
  IconDownload,
  IconRefresh,
} from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import WalletSummaryCards from './components/WalletSummaryCards';
import UserWalletsTable from './components/UserWalletsTable';
import WalletDetailDrawer from './components/WalletDetailDrawer';

// Types
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

interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit' | 'lock' | 'release';
  amount: number;
  description: string;
  timestamp: string;
  reference: string;
  status: 'completed' | 'pending' | 'failed';
}

interface WalletSummary {
  totalUserBalances: number;
  totalInEscrow: number;
  totalOnHold: number;
  availableForWithdrawal: number;
  lifetimeRewardsIssued: number;
  walletsWithIssues: number;
}

// Mock Data
const mockUserWallets: UserWallet[] = [
  {
    id: 'USR001',
    name: 'John Smith',
    phone: '+254712345678',
    city: 'Nairobi',
    kycStatus: 'approved',
    availableBalance: 2450.00,
    pendingEscrow: 150.00,
    onHold: 0.00,
    lifetimeEarned: 3200.00,
    lifetimeWithdrawn: 550.00,
    walletStatus: 'normal',
    lastUpdated: '2024-01-15T10:30:00Z',
    transactions: [
      {
        id: 'TXN001',
        type: 'credit',
        amount: 85.00,
        description: 'Recycling reward - Pickup #1234',
        timestamp: '2024-01-15T09:15:00Z',
        reference: 'PICKUP1234',
        status: 'completed'
      },
      {
        id: 'TXN002',
        type: 'lock',
        amount: 150.00,
        description: 'Escrow for pickup #1235',
        timestamp: '2024-01-15T10:30:00Z',
        reference: 'ESCROW1235',
        status: 'pending'
      }
    ]
  },
  {
    id: 'USR002',
    name: 'Mary Johnson',
    phone: '+254723456789',
    city: 'Mombasa',
    kycStatus: 'approved',
    availableBalance: 890.50,
    pendingEscrow: 75.00,
    onHold: 0.00,
    lifetimeEarned: 1200.00,
    lifetimeWithdrawn: 284.50,
    walletStatus: 'normal',
    lastUpdated: '2024-01-14T14:20:00Z',
    transactions: [
      {
        id: 'TXN003',
        type: 'debit',
        amount: 50.00,
        description: 'Withdrawal to M-Pesa',
        timestamp: '2024-01-14T12:00:00Z',
        reference: 'WITHDRAW789',
        status: 'completed'
      }
    ]
  },
  {
    id: 'USR003',
    name: 'GreenTech Solutions',
    phone: '+254734567890',
    city: 'Nairobi',
    kycStatus: 'approved',
    availableBalance: 12500.00,
    pendingEscrow: 500.00,
    onHold: 200.00,
    lifetimeEarned: 15000.00,
    lifetimeWithdrawn: 2800.00,
    walletStatus: 'compliance_hold',
    lastUpdated: '2024-01-15T09:15:00Z',
    transactions: [
      {
        id: 'TXN004',
        type: 'credit',
        amount: 500.00,
        description: 'Enterprise recycling bonus',
        timestamp: '2024-01-15T08:00:00Z',
        reference: 'BONUS001',
        status: 'completed'
      }
    ]
  },
  {
    id: 'USR004',
    name: 'David Kimani',
    phone: '+254745678901',
    city: 'Kisumu',
    kycStatus: 'submitted',
    availableBalance: -25.00,
    pendingEscrow: 0.00,
    onHold: 0.00,
    lifetimeEarned: 100.00,
    lifetimeWithdrawn: 125.00,
    walletStatus: 'negative_balance',
    lastUpdated: '2024-01-13T16:45:00Z',
    transactions: []
  },
  {
    id: 'USR005',
    name: 'EcoCollect Ltd',
    phone: '+254756789012',
    city: 'Nairobi',
    kycStatus: 'rejected',
    availableBalance: 4200.00,
    pendingEscrow: 200.00,
    onHold: 0.00,
    lifetimeEarned: 5000.00,
    lifetimeWithdrawn: 800.00,
    walletStatus: 'locked',
    lastUpdated: '2024-01-10T13:30:00Z',
    transactions: []
  }
];

const mockWalletSummary: WalletSummary = {
  totalUserBalances: 28465.50,
  totalInEscrow: 925.00,
  totalOnHold: 200.00,
  availableForWithdrawal: 27340.50,
  lifetimeRewardsIssued: 45600.00,
  walletsWithIssues: 3
};

// Main Component
const UserWalletsPage: React.FC = () => {
  const [wallets, setWallets] = useState<UserWallet[]>(mockUserWallets);
  const [summary, setSummary] = useState<WalletSummary>(mockWalletSummary);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedKYC, setSelectedKYC] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedWallet, setSelectedWallet] = useState<UserWallet | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Filter wallets based on search and filters
  const filteredWallets = wallets.filter(wallet => {
    const matchesSearch = wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wallet.phone.includes(searchTerm) ||
                         wallet.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || wallet.city === selectedCity;
    const matchesStatus = selectedStatus === 'all' || wallet.walletStatus === selectedStatus;
    const matchesKYC = selectedKYC === 'all' || wallet.kycStatus === selectedKYC;
    
    return matchesSearch && matchesCity && matchesStatus && matchesKYC;
  });

  const handleWalletClick = (wallet: UserWallet) => {
    setSelectedWallet(wallet);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedWallet(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    setNotification({
      open: true,
      message: `Exporting wallet data as ${format.toUpperCase()} - Read-only access logged`,
      severity: 'success'
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setNotification({
        open: true,
        message: 'Wallet data refreshed successfully - Values reconciled with Finance ledger',
        severity: 'success'
      });
    }, 1000);
  };

  return (
    <PageContainer title="User Wallets" description="Read-only financial state of recyclers">
      <Breadcrumb title="User Wallets" subtitle="Read-only financial state of recyclers" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                User Wallets
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Read-only financial state of recyclers
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                variant="outlined"
                startIcon={<IconRefresh size={16} />}
                onClick={handleRefresh}
                disabled={loading}
              >
                Refresh
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<IconDownload size={16} />}
                onClick={() => handleExport('csv')}
              >
                CSV
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<IconDownload size={16} />}
                onClick={() => handleExport('pdf')}
              >
                PDF
              </Button>
            </Stack>
          </Stack>
        </DashboardCard>
      </Box>

      {/* Filters */}
      <Box mt={3}>
        <DashboardCard>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                placeholder="Search by name, phone, or user ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <IconSearch size={16} style={{ marginRight: 8 }} />,
                }}
                sx={{ minWidth: 300 }}
              />
              
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>City</InputLabel>
                <Select
                  value={selectedCity}
                  label="City"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <MenuItem value="all">All Cities</MenuItem>
                  <MenuItem value="Nairobi">Nairobi</MenuItem>
                  <MenuItem value="Mombasa">Mombasa</MenuItem>
                  <MenuItem value="Kisumu">Kisumu</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Wallet Status</InputLabel>
                <Select
                  value={selectedStatus}
                  label="Wallet Status"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="locked">Locked</MenuItem>
                  <MenuItem value="compliance_hold">Compliance Hold</MenuItem>
                  <MenuItem value="negative_balance">Negative Balance</MenuItem>
                  <MenuItem value="high_risk">High Risk</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>KYC Status</InputLabel>
                <Select
                  value={selectedKYC}
                  label="KYC Status"
                  onChange={(e) => setSelectedKYC(e.target.value)}
                >
                  <MenuItem value="all">All KYC</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="submitted">Submitted</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </DashboardCard>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Wallet Summary Cards */}
      <Box mt={3}>
        <WalletSummaryCards 
          summary={summary} 
          onStatusFilter={(status) => setSelectedStatus(status)}
        />
      </Box>

      {/* User Wallets Table */}
      <Box mt={3}>
        <UserWalletsTable
          wallets={filteredWallets}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onWalletClick={handleWalletClick}
        />
      </Box>

      {/* Wallet Detail Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 600,
            p: 0,
          },
        }}
      >
        <WalletDetailDrawer
          wallet={selectedWallet}
          open={isDrawerOpen}
          onClose={handleDrawerClose}
        />
      </Drawer>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default UserWalletsPage;
