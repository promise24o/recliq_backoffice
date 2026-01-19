'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload, IconCalendar } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import EscrowSummaryCards from './components/EscrowSummaryCards';
import EscrowBreakdown from './components/EscrowBreakdown';
import EscrowRecordsTable from './components/EscrowRecordsTable';
import EscrowDetailDrawer from './components/EscrowDetailDrawer';
import OverdueAtRiskEscrows from './components/OverdueAtRiskEscrows';

interface EscrowData {
  id: string;
  escrowId: string;
  source: 'user_payment' | 'enterprise_payment';
  counterparty: 'agent' | 'user' | 'enterprise_client';
  amount: number;
  reason: 'verification' | 'dispute' | 'compliance_hold' | 'scheduled_release';
  heldSince: string;
  status: 'active' | 'released' | 'refunded';
  linkedWork?: {
    pickupId?: string;
    invoiceId?: string;
    jobId?: string;
  };
  agent?: {
    name: string;
    email: string;
  };
  user?: {
    name: string;
    email: string;
  };
  enterprise?: {
    name: string;
    email: string;
  };
  releaseCondition?: string;
  slaDeadline?: string;
  holdStartTime: string;
}

const EscrowAmounts: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [escrowTypeFilter, setEscrowTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEscrow, setSelectedEscrow] = useState<EscrowData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleEscrowClick = (escrow: EscrowData) => {
    setSelectedEscrow(escrow);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedEscrow(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting escrow data as ${format}`);
  };

  return (
    <PageContainer title="Escrow Amounts" description="Funds held pending verification, disputes, or completion">
      <Breadcrumb title="Escrow Amounts" subtitle="Locked funds awaiting release conditions" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Escrow Amounts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Funds held pending verification, disputes, or completion
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
                <InputLabel>Escrow Type</InputLabel>
                <Select
                  value={escrowTypeFilter}
                  label="Escrow Type"
                  onChange={(e) => setEscrowTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="b2b">B2B Job</MenuItem>
                  <MenuItem value="pickup">Pickup</MenuItem>
                  <MenuItem value="disposal">Disposal</MenuItem>
                  <MenuItem value="subscription">Subscription</MenuItem>
                  <MenuItem value="dispute">Dispute</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 100 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="released">Released</MenuItem>
                  <MenuItem value="refunded">Refunded</MenuItem>
                </Select>
              </FormControl>

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

      {/* Escrow Summary Cards */}
      <Box mb={3}>
        <EscrowSummaryCards />
      </Box>

      {/* Overdue & At-Risk Escrows */}
      <Box mb={3}>
        <OverdueAtRiskEscrows />
      </Box>

      {/* Escrow Breakdown */}
      <Box mb={3}>
        <EscrowBreakdown />
      </Box>

      {/* Escrow Records Table */}
      <Box mb={3}>
        <EscrowRecordsTable onRowClick={handleEscrowClick} />
      </Box>

      {/* Escrow Detail Drawer */}
      <EscrowDetailDrawer
        escrow={selectedEscrow}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default EscrowAmounts;
