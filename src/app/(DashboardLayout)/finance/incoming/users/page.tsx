'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import UserPaymentsKPICards from './components/UserPaymentsKPICards';
import PaymentMethodsBreakdown from './components/PaymentMethodsBreakdown';
import UserPaymentsTable from './components/UserPaymentsTable';
import FailedPendingPayments from './components/FailedPendingPayments';
import PaymentAlertsPanel from './components/PaymentAlertsPanel';
import PaymentDetailDrawer from './components/PaymentDetailDrawer';

interface PaymentData {
  id: string;
  date: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  paymentId: string;
  method: 'card' | 'transfer' | 'ussd' | 'wallet';
  amount: number;
  purpose: string;
  status: 'successful' | 'pending' | 'failed';
  providerRef: string;
  linkedTransaction: string;
}

const UserPayments: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
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
    <PageContainer title="User Payments" description="Payments made by users for recycling services">
      <Breadcrumb title="User Payments" subtitle="Track and monitor payments made by users for recycling services" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                User Payments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Payments made by users for recycling services
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
                <InputLabel>Payment Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Payment Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="successful">Successful</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={methodFilter}
                  label="Payment Method"
                  onChange={(e) => setMethodFilter(e.target.value)}
                >
                  <MenuItem value="all">All Methods</MenuItem>
                  <MenuItem value="card">Card</MenuItem>
                  <MenuItem value="transfer">Bank Transfer</MenuItem>
                  <MenuItem value="ussd">USSD</MenuItem>
                  <MenuItem value="wallet">Wallet</MenuItem>
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

      {/* KPI Summary Cards */}
      <Box mb={3}>
        <UserPaymentsKPICards />
      </Box>

      {/* Payment Methods Breakdown */}
      <Box mb={3}>
        <PaymentMethodsBreakdown />
      </Box>

      {/* User Payments Table */}
      <Box mb={3}>
        <UserPaymentsTable onRowClick={handlePaymentClick} />
      </Box>

      {/* Failed & Pending Payments Section */}
      <Box mb={3}>
        <FailedPendingPayments />
      </Box>

      {/* Alerts & Anomalies Panel */}
      <Box mb={3}>
        <PaymentAlertsPanel />
      </Box>

      {/* Payment Detail Drawer */}
      <PaymentDetailDrawer
        payment={selectedPayment}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default UserPayments;
