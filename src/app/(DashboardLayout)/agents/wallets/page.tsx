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
  Grid,
} from '@mui/material';
import {
  IconSearch,
  IconFilter,
  IconDownload,
  IconRefresh,
} from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';

// Try regular imports with error handling
let WalletSummaryCards: any = null;
let WalletFlowChart: any = null;
let WalletTrendChart: any = null;
let WalletTable: any = null;
let WalletDetailDrawer: any = null;

try {
  WalletSummaryCards = require('./components/WalletSummaryCards').default;
  WalletFlowChart = require('./components/WalletFlowChart').default;
  WalletTrendChart = require('./components/WalletTrendChart').default;
  WalletTable = require('./components/WalletTable').default;
  WalletDetailDrawer = require('./components/WalletDetailDrawer').default;
} catch (error) {
  console.warn('Some wallet components could not be loaded:', error);
}

// Types
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

interface WalletSummary {
  totalBalance: number;
  pendingEarnings: number;
  availableForPayout: number;
  payoutsProcessed: number;
  negativeWallets: number;
  frozenWallets: number;
}

interface FlowData {
  source: string;
  target: string;
  value: number;
}

interface TrendData {
  date: string;
  totalBalance: number;
  pendingFunds: number;
  availableFunds: number;
  payoutVolume: number;
}

// Mock Data
const mockWallets: AgentWallet[] = [
  {
    id: 'WLT001',
    agentId: 'AGT001',
    agentName: 'Samuel Kamau',
    agentType: 'individual',
    city: 'Nairobi',
    zone: 'Westlands',
    walletStatus: 'active',
    balance: 2450.00,
    pendingEarnings: 850.00,
    availableBalance: 1600.00,
    lastPayoutDate: '2024-01-14',
    lastPayoutAmount: 1200.00,
    transactions: [
      {
        id: 'TXN001',
        date: '2024-01-15',
        type: 'pickup_credit',
        referenceId: 'PU1234',
        amount: 150.00,
        status: 'completed',
        description: 'Pickup completion - Westlands Mall'
      },
      {
        id: 'TXN002',
        date: '2024-01-15',
        type: 'pickup_credit',
        referenceId: 'PU1235',
        amount: 200.00,
        status: 'completed',
        description: 'Pickup completion - Sarit Centre'
      },
      {
        id: 'TXN003',
        date: '2024-01-14',
        type: 'payout',
        referenceId: 'PAY001',
        amount: -1200.00,
        status: 'completed',
        description: 'Monthly payout'
      }
    ],
    payoutHistory: [
      {
        id: 'PAY001',
        method: 'bank_transfer',
        amount: 1200.00,
        date: '2024-01-14',
        status: 'completed'
      }
    ],
    riskControls: {
      isFrozen: false,
      manualAdjustments: 0,
      notes: ['Reliable agent, consistent performance']
    }
  },
  {
    id: 'WLT002',
    agentId: 'AGT002',
    agentName: 'Grace Wanjiru',
    agentType: 'company',
    city: 'Nairobi',
    zone: 'Karen',
    walletStatus: 'active',
    balance: 1820.00,
    pendingEarnings: 620.00,
    availableBalance: 1200.00,
    lastPayoutDate: '2024-01-13',
    lastPayoutAmount: 800.00,
    transactions: [
      {
        id: 'TXN004',
        date: '2024-01-15',
        type: 'pickup_credit',
        referenceId: 'PU1236',
        amount: 180.00,
        status: 'completed',
        description: 'Pickup completion - Karen Shopping Centre'
      },
      {
        id: 'TXN005',
        date: '2024-01-14',
        type: 'adjustment',
        referenceId: 'ADJ001',
        amount: 50.00,
        status: 'completed',
        description: 'Bonus for excellent service'
      }
    ],
    payoutHistory: [
      {
        id: 'PAY002',
        method: 'mobile_money',
        amount: 800.00,
        date: '2024-01-13',
        status: 'completed'
      }
    ],
    riskControls: {
      isFrozen: false,
      manualAdjustments: 1,
      notes: ['Company account, good compliance record']
    }
  },
  {
    id: 'WLT003',
    agentId: 'AGT003',
    agentName: 'Michael Ochieng',
    agentType: 'fleet',
    city: 'Mombasa',
    zone: 'Town Center',
    walletStatus: 'negative',
    balance: -150.00,
    pendingEarnings: 400.00,
    availableBalance: 0.00,
    lastPayoutDate: '2024-01-10',
    lastPayoutAmount: 2000.00,
    transactions: [
      {
        id: 'TXN006',
        date: '2024-01-15',
        type: 'penalty',
        referenceId: 'PEN001',
        amount: -150.00,
        status: 'completed',
        description: 'Penalty for missed pickup'
      }
    ],
    payoutHistory: [
      {
        id: 'PAY003',
        method: 'bank_transfer',
        amount: 2000.00,
        date: '2024-01-10',
        status: 'completed'
      }
    ],
    riskControls: {
      isFrozen: false,
      manualAdjustments: 0,
      notes: ['Negative balance due to penalty, pending earnings will clear']
    }
  },
  {
    id: 'WLT004',
    agentId: 'AGT004',
    agentName: 'Sarah Mwangi',
    agentType: 'individual',
    city: 'Kisumu',
    zone: 'CBD',
    walletStatus: 'frozen',
    balance: 450.00,
    pendingEarnings: 180.00,
    availableBalance: 0.00,
    lastPayoutDate: '2024-01-08',
    lastPayoutAmount: 300.00,
    transactions: [
      {
        id: 'TXN007',
        date: '2024-01-12',
        type: 'pickup_credit',
        referenceId: 'PU1237',
        amount: 120.00,
        status: 'completed',
        description: 'Pickup completion - Kisumu Market'
      }
    ],
    payoutHistory: [
      {
        id: 'PAY004',
        method: 'mobile_money',
        amount: 300.00,
        date: '2024-01-08',
        status: 'completed'
      }
    ],
    riskControls: {
      isFrozen: true,
      freezeReason: 'Under investigation for disputed transactions',
      manualAdjustments: 0,
      notes: ['Account frozen pending fraud investigation']
    }
  }
];

const mockSummary: WalletSummary = {
  totalBalance: 48200000,
  pendingEarnings: 9600000,
  availableForPayout: 38600000,
  payoutsProcessed: 21400000,
  negativeWallets: 36,
  frozenWallets: 18
};

const mockFlowData: FlowData[] = [
  { source: 'Completed Pickups', target: 'Wallet Credits', value: 15000000 },
  { source: 'Wallet Credits', target: 'Available Balance', value: 12000000 },
  { source: 'Wallet Credits', target: 'Pending Earnings', value: 3000000 },
  { source: 'Adjustments & Penalties', target: 'Wallet Debits', value: 500000 },
  { source: 'Available Balance', target: 'Payout Requests', value: 8000000 },
  { source: 'Payout Requests', target: 'Processed Payouts', value: 7500000 }
];

const mockTrendData: TrendData[] = [
  { date: '2024-01-01', totalBalance: 45000000, pendingFunds: 8000000, availableFunds: 37000000, payoutVolume: 18000000 },
  { date: '2024-01-02', totalBalance: 45500000, pendingFunds: 8200000, availableFunds: 37300000, payoutVolume: 18500000 },
  { date: '2024-01-03', totalBalance: 46000000, pendingFunds: 8500000, availableFunds: 37500000, payoutVolume: 19000000 },
  { date: '2024-01-04', totalBalance: 46800000, pendingFunds: 8800000, availableFunds: 38000000, payoutVolume: 19500000 },
  { date: '2024-01-05', totalBalance: 47200000, pendingFunds: 9000000, availableFunds: 38200000, payoutVolume: 20000000 },
  { date: '2024-01-06', totalBalance: 47800000, pendingFunds: 9300000, availableFunds: 38500000, payoutVolume: 20500000 },
  { date: '2024-01-07', totalBalance: 48200000, pendingFunds: 9600000, availableFunds: 38600000, payoutVolume: 21400000 }
];

// Main Component
const AgentWalletsPage: React.FC = () => {
  const [wallets, setWallets] = useState<AgentWallet[]>(mockWallets);
  const [summary, setSummary] = useState<WalletSummary>(mockSummary);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedWallet, setSelectedWallet] = useState<AgentWallet | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' });

  // Filter wallets
  const filteredWallets = wallets.filter(wallet => {
    const matchesSearch = wallet.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wallet.agentId.toLowerCase().includes(searchTerm.toLowerCase());
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
          message: `Payout initiated for ${wallet.agentName}`,
          severity: 'success'
        });
        break;
      case 'freeze':
        setNotification({
          open: true,
          message: `Wallet for ${wallet.agentName} has been frozen: ${reason}`,
          severity: 'warning'
        });
        break;
      case 'unfreeze':
        setNotification({
          open: true,
          message: `Wallet for ${wallet.agentName} has been unfrozen`,
          severity: 'success'
        });
        break;
      case 'adjustment':
        setNotification({
          open: true,
          message: `Adjustment applied to ${wallet.agentName}: ${reason}`,
          severity: 'warning'
        });
        break;
      case 'add_note':
        setNotification({
          open: true,
          message: `Note added for ${wallet.agentName}`,
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <PageContainer title="Agent Wallets" description="Earnings, balances, and payouts">
      <Breadcrumb title="Agent Wallets" subtitle="Earnings, balances, and payouts" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Agent Wallets
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Earnings, balances, and payouts
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedStatus}
                  label="Status"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="frozen">Frozen</MenuItem>
                  <MenuItem value="negative">Negative</MenuItem>
                  <MenuItem value="review_required">Review Required</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  label="Date Range"
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <MenuItem value="7days">Last 7 days</MenuItem>
                  <MenuItem value="30days">Last 30 days</MenuItem>
                  <MenuItem value="90days">Last 90 days</MenuItem>
                  <MenuItem value="all">All time</MenuItem>
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
            </Stack>
          </Stack>
        </DashboardCard>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Summary Cards */}
      <Box mt={3}>
        {WalletSummaryCards && (
          <WalletSummaryCards 
            summary={summary} 
            onStatusFilter={(status: string) => {
              if (status === 'pending') {
                // Handle pending filter (incomplete KYC equivalent)
                setSelectedStatus('pending');
              } else {
                setSelectedStatus(status);
              }
            }}
          />
        )}
      </Box>

      {/* Charts Row */}
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            {WalletFlowChart && <WalletFlowChart data={mockFlowData} />}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {WalletTrendChart && <WalletTrendChart data={mockTrendData} />}
          </Grid>
        </Grid>
      </Box>

      {/* Filters */}
      <Box mt={3}>
        <DashboardCard>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                placeholder="Search by agent name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <IconSearch size={16} style={{ marginRight: 8 }} />,
                }}
                sx={{ minWidth: 300 }}
              />
              
              <Button
                variant="outlined"
                startIcon={<IconRefresh size={16} />}
                onClick={handleRefresh}
                disabled={loading}
              >
                Refresh
              </Button>
            </Stack>
          </CardContent>
        </DashboardCard>
      </Box>

      {/* Wallets Table */}
      <Box mt={3}>
        {WalletTable && (
          <WalletTable
            wallets={filteredWallets}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onWalletClick={handleWalletClick}
            onWalletAction={handleWalletAction}
            formatCurrency={formatCurrency}
          />
        )}
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
        {WalletDetailDrawer && (
          <WalletDetailDrawer
            wallet={selectedWallet}
            open={isDrawerOpen}
            onClose={handleDrawerClose}
            onWalletAction={handleWalletAction}
            formatCurrency={formatCurrency}
          />
        )}
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

export default AgentWalletsPage;
