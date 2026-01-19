'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { IconDownload, IconCalendar, IconRefresh, IconUpload } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import ProviderSummaryCards from './components/ProviderSummaryCards';
import ProviderReportTable from './components/ProviderReportTable';
import ProviderEntryDetailDrawer from './components/ProviderEntryDetailDrawer';
import UnmatchedProviderEntries from './components/UnmatchedProviderEntries';
import ProviderFeesAnalysis from './components/ProviderFeesAnalysis';

interface ProviderEntryData {
  id: string;
  provider: 'paystack' | 'flutterwave' | 'bank' | 'manual';
  batchId: string;
  txnId: string;
  grossAmount: number;
  fee: number;
  netAmount: number;
  status: 'settled' | 'pending' | 'failed';
  settlementDate: string;
  providerReference: string;
  transactionDate: string;
  matchedLedgerTxn?: string;
}

const ProvidersReport: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<ProviderEntryData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleEntryClick = (entry: ProviderEntryData) => {
    setSelectedEntry(entry);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedEntry(null);
  };

  const handleImportSync = () => {
    setIsSyncing(true);
    // Simulate import/sync process
    setTimeout(() => {
      setIsSyncing(false);
    }, 3000);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting provider report data as ${format}`);
  };

  return (
    <PageContainer title="Providers Report" description="Settlement reports from payment providers">
      <Breadcrumb title="Providers Report" subtitle="Settlement reports from payment providers" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Providers Report
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Settlement reports from payment providers
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
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
                variant="outlined"
                startIcon={<IconUpload size={16} />}
                onClick={handleImportSync}
                disabled={isSyncing}
              >
                {isSyncing ? 'Syncing...' : 'Import / Sync'}
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

      {/* Provider Summary Cards */}
      <Box mb={3}>
        <ProviderSummaryCards />
      </Box>

      {/* Provider Fees Analysis */}
      <Box mb={3}>
        <ProviderFeesAnalysis />
      </Box>

      {/* Unmatched Provider Entries */}
      <Box mb={3}>
        <UnmatchedProviderEntries />
      </Box>

      {/* Provider Report Table */}
      <Box mb={3}>
        <ProviderReportTable onRowClick={handleEntryClick} />
      </Box>

      {/* Provider Entry Detail Drawer */}
      <ProviderEntryDetailDrawer
        entry={selectedEntry}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default ProvidersReport;
