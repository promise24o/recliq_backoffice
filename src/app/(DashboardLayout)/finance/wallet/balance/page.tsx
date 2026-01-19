'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, IconButton, Tooltip } from '@mui/material';
import { IconDownload, IconRefresh } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import PlatformBalanceOverview from './components/PlatformBalanceOverview';
import BalanceBreakdownCards from './components/BalanceBreakdownCards';
import FundsSourceBreakdown from './components/FundsSourceBreakdown';
import PlatformBalanceTable from './components/PlatformBalanceTable';
import BalanceDetailDrawer from './components/BalanceDetailDrawer';
import AlertsRiskIndicators from './components/AlertsRiskIndicators';

interface BalanceData {
  id: string;
  source: string;
  provider: string;
  balance: number;
  status: 'reconciled' | 'pending' | 'error';
  lastUpdated: string;
  variance: number;
  internalLedgerBalance: number;
  providerReportedBalance: number;
  pendingTransactions: number;
  walletType?: string;
  purpose?: string;
}

const PlatformBalance: React.FC = () => {
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleString());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedBalance, setSelectedBalance] = useState<BalanceData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setLastSyncTime(new Date().toLocaleString());
      setIsRefreshing(false);
    }, 2000);
  };

  const handleBalanceClick = (balance: BalanceData) => {
    setSelectedBalance(balance);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedBalance(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting as ${format}`);
  };

  return (
    <PageContainer title="Platform Balance" description="Total funds currently held by Recliq">
      <Breadcrumb title="Platform Balance" subtitle="Real-time platform liquidity and fund management" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Platform Balance
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total funds currently held by Recliq
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                Last synced: {lastSyncTime}
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Tooltip title="Refresh balances">
                <IconButton
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  sx={{ 
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'primary.main', color: 'white' },
                    '&:disabled': { bgcolor: 'grey.200', color: 'grey.500' }
                  }}
                >
                  <IconRefresh size={20} />
                </IconButton>
              </Tooltip>
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

      {/* Platform Balance Overview */}
      <Box mb={3}>
        <PlatformBalanceOverview />
      </Box>

      {/* Balance Breakdown Cards */}
      <Box mb={3}>
        <BalanceBreakdownCards />
      </Box>

      {/* Alerts & Risk Indicators */}
      <Box mb={3}>
        <AlertsRiskIndicators />
      </Box>

      {/* Funds Source Breakdown */}
      <Box mb={3}>
        <FundsSourceBreakdown />
      </Box>

      {/* Platform Balance Table */}
      <Box mb={3}>
        <PlatformBalanceTable onRowClick={handleBalanceClick} />
      </Box>

      {/* Balance Detail Drawer */}
      <BalanceDetailDrawer
        balance={selectedBalance}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default PlatformBalance;
