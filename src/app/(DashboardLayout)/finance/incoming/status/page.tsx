'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import PaymentStatusKPICards from './components/PaymentStatusKPICards';
import PaymentStatusTable from './components/PaymentStatusTable';
import PaymentStatusDetailDrawer from './components/PaymentStatusDetailDrawer';
import StuckFailedPayments from './components/StuckFailedPayments';
import ProviderHealthIndicators from './components/ProviderHealthIndicators';

interface PaymentData {
  id: string;
  date: string;
  paymentId: string;
  source: 'user' | 'enterprise';
  payer: {
    name: string;
    avatar: string;
    email: string;
  };
  amount: number;
  method: 'card' | 'transfer' | 'ussd' | 'wallet';
  status: 'successful' | 'pending' | 'failed' | 'reversed' | 'timeout';
  provider: string;
  providerRef: string;
  attemptCount: number;
  linkedEntity: {
    type: 'pickup' | 'invoice';
    id: string;
  };
}

const PaymentStatus: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<PaymentData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handlePaymentClick = (payment: PaymentData) => {
    setSelectedPayment(payment);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedPayment(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting as ${format}`);
  };

  return (
    <PageContainer title="Payment Status" description="Real-time status of all incoming payments">
      <Breadcrumb title="Payment Status" subtitle="Monitor and manage payment status across all sources" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Payment Status
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Real-time status of all incoming payments
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
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="successful">Successful</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
                  <MenuItem value="reversed">Reversed</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Source</InputLabel>
                <Select
                  value={sourceFilter}
                  label="Source"
                  onChange={(e) => setSourceFilter(e.target.value)}
                >
                  <MenuItem value="all">All Sources</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="enterprise">Enterprise</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                startIcon={<IconDownload size={16} />}
                onClick={() => handleExport('csv')}
              >
                CSV
              </Button>
            </Stack>
          </Stack>
        </DashboardCard>
      </Box>

      {/* Status Summary Cards */}
      <Box mb={3}>
        <PaymentStatusKPICards />
      </Box>

      {/* Payment Status Table */}
      <Box mb={3}>
        <PaymentStatusTable onRowClick={handlePaymentClick} />
      </Box>

      {/* Stuck & Failed Payments Section */}
      <Box mb={3}>
        <StuckFailedPayments />
      </Box>

      {/* Provider Health Indicators */}
      <Box mb={3}>
        <ProviderHealthIndicators />
      </Box>

      {/* Payment Status Detail Drawer */}
      <PaymentStatusDetailDrawer
        payment={selectedPayment}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default PaymentStatus;
