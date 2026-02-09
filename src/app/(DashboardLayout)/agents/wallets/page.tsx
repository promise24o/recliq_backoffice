'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
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
import AgentWalletsTable from './components/AgentWalletsTable';
import WalletDetailDrawer from './components/WalletDetailDrawer';

// Types
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
  totalAgentBalances: number;
  totalInEscrow: number;
  totalOnHold: number;
  availableForWithdrawal: number;
  lifetimeRewardsIssued: number;
  walletsWithIssues: number;
}

// Mock Data
const mockAgentWallets: AgentWallet[] = [
  {
    id: 'AGT001',
    name: 'Samuel Kamau',
    phone: '+254712345678',
    city: 'Nairobi',
    zone: 'Westlands',
    agentType: 'individual',
    kycStatus: 'verified',
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
        reference: 'PICKUP1235',
        status: 'completed'
      }
    ]
  },
  {
    id: 'AGT002',
    name: 'Grace Wanjiru',
    phone: '+254723456789',
    city: 'Nairobi',
    zone: 'Karen',
    agentType: 'company',
    kycStatus: 'verified',
    availableBalance: 3850.00,
    pendingEscrow: 425.00,
    onHold: 200.00,
    lifetimeEarned: 5800.00,
    lifetimeWithdrawn: 1725.00,
    walletStatus: 'normal',
    lastUpdated: '2024-01-15T11:45:00Z',
    transactions: [
      {
        id: 'TXN003',
        type: 'credit',
        amount: 120.00,
        description: 'Recycling reward - Pickup #1236',
        timestamp: '2024-01-15T11:00:00Z',
        reference: 'PICKUP1236',
        status: 'completed'
      }
    ]
  },
  {
    id: 'AGT003',
    name: 'Michael Ochieng',
    phone: '+254734567890',
    city: 'Mombasa',
    zone: 'Town Center',
    agentType: 'fleet',
    kycStatus: 'verified',
    availableBalance: 1250.00,
    pendingEscrow: 75.00,
    onHold: 0.00,
    lifetimeEarned: 2100.00,
    lifetimeWithdrawn: 825.00,
    walletStatus: 'normal',
    lastUpdated: '2024-01-15T09:20:00Z',
    transactions: [
      {
        id: 'TXN004',
        type: 'debit',
        amount: 200.00,
        description: 'Withdrawal to bank account',
        timestamp: '2024-01-14T15:30:00Z',
        reference: 'WITHDRAW001',
        status: 'completed'
      }
    ]
  },
  {
    id: 'AGT004',
    name: 'Sarah Mwangi',
    phone: '+254745678901',
    city: 'Kisumu',
    zone: 'CBD',
    agentType: 'individual',
    kycStatus: 'under_review',
    availableBalance: -150.00,
    pendingEscrow: 0.00,
    onHold: 0.00,
    lifetimeEarned: 800.00,
    lifetimeWithdrawn: 950.00,
    walletStatus: 'negative_balance',
    lastUpdated: '2024-01-15T08:15:00Z',
    transactions: []
  },
  {
    id: 'AGT005',
    name: 'EcoCollect Ltd',
    phone: '+254756789012',
    city: 'Nairobi',
    zone: 'Karen',
    agentType: 'company',
    kycStatus: 'rejected',
    availableBalance: 0.00,
    pendingEscrow: 0.00,
    onHold: 500.00,
    lifetimeEarned: 1200.00,
    lifetimeWithdrawn: 700.00,
    walletStatus: 'compliance_hold',
    lastUpdated: '2024-01-14T16:45:00Z',
    transactions: []
  }
];

const mockSummary: WalletSummary = {
  totalAgentBalances: 48200000,
  totalInEscrow: 9600000,
  totalOnHold: 2500000,
  availableForWithdrawal: 36100000,
  lifetimeRewardsIssued: 124000000,
  walletsWithIssues: 54
};

// Main Component
const AgentWalletsPage: React.FC = () => {
  const [wallets, setWallets] = useState<AgentWallet[]>(mockAgentWallets);
  const [summary, setSummary] = useState<WalletSummary>(mockSummary);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedWallet, setSelectedWallet] = useState<AgentWallet | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' });

  // Filter wallets
  const filteredWallets = wallets.filter(wallet => {
    const matchesSearch = wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wallet.phone.includes(searchTerm) ||
                         wallet.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || wallet.walletStatus === selectedStatus;
    const matchesCity = selectedCity === 'all' || wallet.city === selectedCity;
    const matchesType = selectedType === 'all' || wallet.agentType === selectedType;
    
    return matchesSearch && matchesStatus && matchesCity && matchesType;
  });

  const handleWalletClick = (wallet: AgentWallet) => {
    setSelectedWallet(wallet);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedWallet(null);
  };

  const handleWalletAction = (action: string, wallet: AgentWallet, reason?: string) => {
    switch (action) {
      case 'payout':
        setNotification({
          open: true,
          message: `Payout initiated for ${wallet.name}`,
          severity: 'success'
        });
        break;
      case 'freeze':
        setNotification({
          open: true,
          message: `Wallet for ${wallet.name} has been frozen: ${reason}`,
          severity: 'warning'
        });
        break;
      case 'unfreeze':
        setNotification({
          open: true,
          message: `Wallet for ${wallet.name} has been unfrozen`,
          severity: 'success'
        });
        break;
      case 'adjustment':
        setNotification({
          open: true,
          message: `Adjustment applied to ${wallet.name}: ${reason}`,
          severity: 'warning'
        });
        break;
      case 'add_note':
        setNotification({
          open: true,
          message: `Note added for ${wallet.name}`,
          severity: 'success'
        });
        break;
    }
    handleDrawerClose();
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    setNotification({
      open: true,
      message: `Exporting wallet data as ${format.toUpperCase()}`,
      severity: 'success'
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotification({
        open: true,
        message: 'Wallet data refreshed successfully',
        severity: 'success'
      });
    }, 1000);
  };

  return (
    <PageContainer title="Agent Wallets" description="Manage agent earnings, balances, and payouts">
      <Breadcrumb title="Agent Wallets" subtitle="Manage agent earnings, balances, and payouts" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Agent Wallets
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage agent earnings, balances, and payouts
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
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
                <InputLabel>City / Zone</InputLabel>
                <Select
                  value={selectedCity}
                  label="City / Zone"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <MenuItem value="all">All Cities</MenuItem>
                  <MenuItem value="Nairobi">Nairobi</MenuItem>
                  <MenuItem value="Mombasa">Mombasa</MenuItem>
                  <MenuItem value="Kisumu">Kisumu</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Agent Type</InputLabel>
                <Select
                  value={selectedType}
                  label="Agent Type"
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="individual">Individual</MenuItem>
                  <MenuItem value="company">Company</MenuItem>
                  <MenuItem value="fleet">Fleet</MenuItem>
                </Select>
              </FormControl>
              
              <Button
                variant="outlined"
                startIcon={<IconDownload size={16} />}
                onClick={() => handleExport('csv')}
              >
                Export
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<IconRefresh size={16} />}
                onClick={handleRefresh}
                disabled={loading}
              >
                Refresh
              </Button>
            </Stack>
          </Stack>
        </DashboardCard>
      </Box>

      {/* Search and Filters */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              placeholder="Search agents by name, phone, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ minWidth: 300 }}
              InputProps={{
                startAdornment: <IconSearch size={16} style={{ marginRight: 8 }} />
              }}
            />
            <Button
              variant="outlined"
              startIcon={<IconFilter size={16} />}
            >
              Advanced Filters
            </Button>
          </Stack>
        </DashboardCard>
      </Box>

      {/* Summary Cards */}
      <Box mt={3}>
        <WalletSummaryCards
          summary={summary}
          onStatusFilter={(status) => setSelectedStatus(status)}
        />
      </Box>

      {/* Wallets Table */}
      <Box mt={3}>
        <AgentWalletsTable
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
          onWalletAction={handleWalletAction}
        />
      </Drawer>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default AgentWalletsPage;
