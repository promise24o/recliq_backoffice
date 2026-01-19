'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import RefundsReversalsKPICards from './components/RefundsReversalsKPICards';
import RefundsReversalsTable from './components/RefundsReversalsTable';
import RefundDetailDrawer from './components/RefundDetailDrawer';
import FailedPendingRefunds from './components/FailedPendingRefunds';
import { FailedPendingRefund } from './components/FailedPendingRefunds';

interface RefundData {
  id: string;
  date: string;
  referenceId: string;
  originalTransaction: {
    id: string;
    type: 'user_payment' | 'enterprise_payment';
    user?: {
      name: string;
      email: string;
    };
    enterprise?: {
      name: string;
      email: string;
    };
    pickupId?: string;
    invoiceId?: string;
  };
  amount: number;
  type: 'refund' | 'reversal';
  reason: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  providerReference: string;
  initiatedAt: string;
  completedAt?: string;
}

const RefundsReversals: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRefund, setSelectedRefund] = useState<RefundData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRefundClick = (refund: RefundData) => {
    setSelectedRefund(refund);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedRefund(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting as ${format}`);
  };

  return (
    <PageContainer title="Refunds & Reversals" description="Returned or voided payments">
      <Breadcrumb title="Refunds & Reversals" subtitle="Track and manage refunds and transaction reversals" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Refunds & Reversals
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Returned or voided payments
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  label="Date Range"
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="7">7 days</MenuItem>
                  <MenuItem value="30">30 days</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={typeFilter}
                  label="Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="refund">Refund</MenuItem>
                  <MenuItem value="reversal">Reversal</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
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

      {/* Refunds & Reversals Summary Cards */}
      <Box mb={3}>
        <RefundsReversalsKPICards />
      </Box>

      {/* Refunds & Reversals Table */}
      <Box mb={3}>
        <RefundsReversalsTable onRowClick={handleRefundClick} />
      </Box>

      {/* Failed & Pending Refunds Section */}
      <Box mb={3}>
        <FailedPendingRefunds 
          onRowClick={(refund: FailedPendingRefund) => {
            // Create a mock refund object for the drawer
            const mockRefund: RefundData = {
              id: refund.id,
              date: new Date().toISOString().split('T')[0],
              referenceId: refund.referenceId,
              originalTransaction: refund.originalTransaction,
              amount: refund.amount,
              type: refund.type,
              reason: refund.reason,
              status: refund.status,
              providerReference: refund.providerReference,
              initiatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
            };
            setSelectedRefund(mockRefund);
            setIsDrawerOpen(true);
          }}
        />
      </Box>

      {/* Refund Detail Drawer */}
      <RefundDetailDrawer
        refund={selectedRefund}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default RefundsReversals;
