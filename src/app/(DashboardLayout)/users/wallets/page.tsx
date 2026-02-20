'use client';

import React, { useState } from 'react';
import {
  Box,
  Alert,
  Snackbar,
  Drawer,
} from '@mui/material';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import WalletSummaryCards from './components/WalletSummaryCards';
import WalletSearch from './components/WalletSearch';
import WalletTable from './components/WalletTable';
import WalletDetailDrawer from './components/WalletDetailDrawer';
import { 
  type Wallet, 
  type WalletsQuery, 
  type WalletSummary,
  useWalletSummary,
  useWalletExport
} from '@/hooks/useWallets';

// Breadcrumb items
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'User Wallets',
  },
];

// Main Component
const UserWalletsPage: React.FC = () => {
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<WalletsQuery>({});
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' 
  });

  const { data: summary, isLoading: summaryLoading } = useWalletSummary();
  const exportMutation = useWalletExport();

  const handleWalletClick = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedWallet(null);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setFilters({ ...filters, search: query });
    } else {
      const newFilters = { ...filters };
      delete newFilters.search;
      setFilters(newFilters);
    }
  };

  const handleFilter = (newFilters: WalletsQuery) => {
    setFilters(newFilters);
  };

  const handleStatusFilter = (status: string) => {
    if (status === 'all') {
      const newFilters = { ...filters };
      delete newFilters.status;
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, status: status as any });
    }
  };

  const handleExport = async (format: 'csv' | 'pdf') => {
    try {
      await exportMutation.mutateAsync({ 
        format,
        ...filters 
      });
      
      setNotification({
        open: true,
        message: `Wallet data exported as ${format.toUpperCase()} successfully`,
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: `Failed to export wallet data: ${error instanceof Error ? error.message : 'Unknown error'}`,
        severity: 'error'
      });
    }
  };

  return (
    <PageContainer title="User Wallets" description="Read-only financial state of recyclers">
      <Breadcrumb title="User Wallets" items={BCrumb} />
      
      {/* Wallet Summary Cards */}
      <Box mt={3}>
        <WalletSummaryCards 
          summary={summary || {
            totalUserBalances: 0,
            totalInEscrow: 0,
            totalOnHold: 0,
            availableForWithdrawal: 0,
            lifetimeRewardsIssued: 0,
            walletsWithIssues: 0,
          }} 
          onStatusFilter={handleStatusFilter}
        />
      </Box>

      {/* Search and Filters */}
      <Box mt={3}>
        <WalletSearch 
          onSearch={handleSearch}
          onFilter={handleFilter}
          onUserSelect={handleWalletClick}
          filters={filters}
        />
      </Box>

      {/* Wallets Table */}
      <Box mt={3}>
        <WalletTable
          onWalletClick={handleWalletClick}
          filters={filters}
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
