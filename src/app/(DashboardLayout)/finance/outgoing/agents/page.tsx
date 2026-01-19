'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import AgentPayoutsKPICards from './components/AgentPayoutsKPICards';
import PayableAgentsTable from './components/PayableAgentsTable';
import PayoutTransactionsTable from './components/PayoutTransactionsTable';
import PayoutDetailDrawer from './components/PayoutDetailDrawer';
import FailedHeldPayouts from './components/FailedHeldPayouts';

interface AgentData {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  bankName: string;
  accountNumber: string;
  jobType: 'enterprise' | 'disposal' | 'subscription';
  jobsCompleted: number;
  grossAmount: number;
  platformFee: number;
  netPayable: number;
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'held';
}

interface PayoutTransaction {
  id: string;
  date: string;
  payoutId: string;
  agent: {
    name: string;
    avatar: string;
  };
  amount: number;
  method: 'bank_transfer' | 'wallet' | 'cash';
  status: 'processing' | 'paid' | 'failed' | 'reversed';
  reference: string;
}

const AgentPayouts: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<PayoutTransaction | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<'agent' | 'transaction'>('agent');

  const handleAgentClick = (agent: AgentData) => {
    setSelectedAgent(agent);
    setSelectedTransaction(null);
    setDrawerType('agent');
    setIsDrawerOpen(true);
  };

  const handleTransactionClick = (transaction: PayoutTransaction) => {
    setSelectedTransaction(transaction);
    setSelectedAgent(null);
    setDrawerType('transaction');
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedAgent(null);
    setSelectedTransaction(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting as ${format}`);
  };

  return (
    <PageContainer title="Agent Payouts" description="Payments made to agents for platform-managed jobs">
      <Breadcrumb title="Agent Payouts" subtitle="Manage and track payouts to collection agents" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Agent Payouts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Payments made to agents for platform-managed jobs
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
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
                  <MenuItem value="held">Held</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Payout Type</InputLabel>
                <Select
                  value={typeFilter}
                  label="Payout Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="enterprise">B2B</MenuItem>
                  <MenuItem value="disposal">Disposal</MenuItem>
                  <MenuItem value="subscription">Subscription</MenuItem>
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

      {/* Payout Summary Cards */}
      <Box mb={3}>
        <AgentPayoutsKPICards />
      </Box>

      {/* Payable Agents Table */}
      <Box mb={3}>
        <PayableAgentsTable onRowClick={handleAgentClick} />
      </Box>

      {/* Payout Transactions Table */}
      <Box mb={3}>
        <PayoutTransactionsTable onRowClick={handleTransactionClick} />
      </Box>

      {/* Failed / Held Payouts Section */}
      <Box mb={3}>
        <FailedHeldPayouts 
          onRowClick={(payout) => {
            // Create a mock agent object for the drawer
            const mockAgent: AgentData = {
              id: payout.id,
              name: payout.agent.name,
              avatar: payout.agent.avatar,
              email: `${payout.agent.name.toLowerCase().replace(' ', '.')}@email.com`,
              phone: '+234-801-234-5678',
              bankName: 'GTBank',
              accountNumber: '0123456789',
              jobType: 'enterprise',
              jobsCompleted: 25,
              grossAmount: payout.amount + Math.floor(payout.amount * 0.1),
              platformFee: Math.floor(payout.amount * 0.1),
              netPayable: payout.amount,
              status: payout.type === 'failed' ? 'failed' : 'held'
            };
            setSelectedAgent(mockAgent);
            setSelectedTransaction(null);
            setDrawerType('agent');
            setIsDrawerOpen(true);
          }}
        />
      </Box>

      {/* Payout Detail Drawer */}
      <PayoutDetailDrawer
        agent={selectedAgent}
        transaction={selectedTransaction}
        drawerType={drawerType}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default AgentPayouts;
