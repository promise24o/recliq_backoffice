'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import EnterprisePaymentsKPICards from './components/EnterprisePaymentsKPICards';
import PaymentBreakdownTabs from './components/PaymentBreakdownTabs';
import EnterprisePaymentsTable from './components/EnterprisePaymentsTable';
import PaymentDetailDrawer from './components/PaymentDetailDrawer';
import OverdueEscalation from './components/OverdueEscalation';
import EnterpriseAlertsPanel from './components/EnterpriseAlertsPanel';

interface PaymentData {
  id: string;
  date: string;
  client: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
  };
  invoiceId: string;
  contract: string;
  contractType: 'one-time' | 'scheduled' | 'recycling' | 'disposal';
  amount: number;
  paid: number;
  status: 'paid' | 'partial' | 'pending' | 'overdue';
  dueDate: string;
  location: string;
  providerRef: string;
}

const EnterprisePayments: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
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
    <PageContainer title="Enterprise Payments" description="Payments received from corporate waste clients">
      <Breadcrumb title="Enterprise Payments" subtitle="Track and monitor payments received from corporate waste clients" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Enterprise Payments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Payments received from corporate waste clients
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
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="partial">Partial</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="overdue">Overdue</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Client</InputLabel>
                <Select
                  value={clientFilter}
                  label="Client"
                  onChange={(e) => setClientFilter(e.target.value)}
                >
                  <MenuItem value="all">All Clients</MenuItem>
                  <MenuItem value="manufacturing">Manufacturing</MenuItem>
                  <MenuItem value="retail">Retail</MenuItem>
                  <MenuItem value="office">Office</MenuItem>
                  <MenuItem value="estate">Estate</MenuItem>
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
        <EnterprisePaymentsKPICards />
      </Box>

      {/* Payment Breakdown Section */}
      <Box mb={3}>
        <PaymentBreakdownTabs />
      </Box>

      {/* Enterprise Payments Table */}
      <Box mb={3}>
        <EnterprisePaymentsTable onRowClick={handlePaymentClick} />
      </Box>

      {/* Overdue & Escalation Section */}
      <Box mb={3}>
        <OverdueEscalation />
      </Box>

      {/* Alerts & Anomalies Panel */}
      <Box mb={3}>
        <EnterpriseAlertsPanel />
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

export default EnterprisePayments;
