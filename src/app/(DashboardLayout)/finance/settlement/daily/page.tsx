'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { IconDownload, IconCalendar, IconRefresh, IconLock } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import DailySummaryCards from './components/DailySummaryCards';
import ProviderDailyBreakdown from './components/ProviderDailyBreakdown';
import DailyReconciliationTable from './components/DailyReconciliationTable';
import TransactionReconciliationDrawer from './components/TransactionReconciliationDrawer';
import ExceptionsUnmatched from './components/ExceptionsUnmatched';
import DailyCloseConfirmation from './components/DailyCloseConfirmation';

interface TransactionData {
  id: string;
  txnId: string;
  source: 'paystack' | 'flutterwave' | 'bank' | 'manual';
  ledgerAmount: number;
  providerAmount: number;
  fee: number;
  variance: number;
  status: 'matched' | 'missing_provider' | 'missing_ledger' | 'amount_mismatch' | 'pending_settlement';
  internalReference: string;
  providerReference: string;
  initiatedAt: string;
  settledAt?: string;
}

const DailyReconciliation: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('yesterday');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [isReconciliationRunning, setIsReconciliationRunning] = useState(false);
  const [isDayClosed, setIsDayClosed] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleTransactionClick = (transaction: TransactionData) => {
    setSelectedTransaction(transaction);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedTransaction(null);
  };

  const handleRunReconciliation = () => {
    setIsReconciliationRunning(true);
    // Simulate reconciliation process
    setTimeout(() => {
      setIsReconciliationRunning(false);
    }, 3000);
  };

  const handleCloseDay = () => {
    // Close day logic would be implemented here
    setIsDayClosed(true);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting reconciliation data as ${format}`);
  };

  const isDayBalanced = true; // This would come from reconciliation results

  return (
    <PageContainer title="Daily Reconciliation" description="Close and verify daily financial activity">
      <Breadcrumb title="Daily Reconciliation" subtitle="Close and verify daily financial activity" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Daily Reconciliation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Close and verify daily financial activity
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                type="date"
                size="small"
                value={selectedDate === 'today' ? new Date().toISOString().split('T')[0] : 
                       selectedDate === 'yesterday' ? new Date(Date.now() - 86400000).toISOString().split('T')[0] : 
                       selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                sx={{ minWidth: 150 }}
              />
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Provider</InputLabel>
                <Select
                  value={selectedProvider}
                  label="Provider"
                  onChange={(e) => setSelectedProvider(e.target.value)}
                >
                  <MenuItem value="all">All Providers</MenuItem>
                  <MenuItem value="paystack">Paystack</MenuItem>
                  <MenuItem value="flutterwave">Flutterwave</MenuItem>
                  <MenuItem value="bank">Bank Transfers</MenuItem>
                  <MenuItem value="manual">Manual Entries</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                startIcon={<IconRefresh size={16} />}
                onClick={handleRunReconciliation}
                disabled={isReconciliationRunning || isDayClosed}
              >
                {isReconciliationRunning ? 'Running...' : 'Run Reconciliation'}
              </Button>

              <Button
                variant="contained"
                color="success"
                startIcon={<IconLock size={16} />}
                onClick={handleCloseDay}
                disabled={!isDayBalanced || isDayClosed}
              >
                {isDayClosed ? 'Day Closed' : 'Close Day'}
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

      {/* Daily Summary Cards */}
      <Box mb={3}>
        <DailySummaryCards />
      </Box>

      {/* Provider Daily Breakdown */}
      <Box mb={3}>
        <ProviderDailyBreakdown />
      </Box>

      {/* Exceptions & Unmatched */}
      <Box mb={3}>
        <ExceptionsUnmatched />
      </Box>

      {/* Daily Reconciliation Table */}
      <Box mb={3}>
        <DailyReconciliationTable onRowClick={handleTransactionClick} />
      </Box>

      {/* Daily Close Confirmation */}
      {isDayBalanced && !isDayClosed && (
        <Box mb={3}>
          <DailyCloseConfirmation onCloseDay={handleCloseDay} />
        </Box>
      )}

      {/* Transaction Reconciliation Drawer */}
      <TransactionReconciliationDrawer
        transaction={selectedTransaction}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default DailyReconciliation;
