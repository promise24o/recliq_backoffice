'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import UserWithdrawalsKPICards from './components/UserWithdrawalsKPICards';
import WithdrawalRequestsTable from './components/WithdrawalRequestsTable';
import WithdrawalDetailDrawer from './components/WithdrawalDetailDrawer';
import FailedHeldWithdrawals from './components/FailedHeldWithdrawals';

interface WithdrawalData {
  id: string;
  date: string;
  user: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
    kycStatus: 'verified' | 'pending' | 'unverified';
  };
  amount: number;
  method: 'bank' | 'mobile_money';
  bankInfo: {
    bankName: string;
    accountNumber: string;
    verified: boolean;
  };
  status: 'requested' | 'processing' | 'paid' | 'failed' | 'held';
  requestedAt: string;
}

const UserWithdrawals: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleWithdrawalClick = (withdrawal: WithdrawalData) => {
    setSelectedWithdrawal(withdrawal);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedWithdrawal(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting as ${format}`);
  };

  return (
    <PageContainer title="User Withdrawals" description="Payouts to users from their Recliq wallet">
      <Breadcrumb title="User Withdrawals" subtitle="Manage and track withdrawals from user wallets" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                User Withdrawals
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Payouts to users from their Recliq wallet
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
                  <MenuItem value="requested">Requested</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
                  <MenuItem value="held">Held</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Withdrawal Method</InputLabel>
                <Select
                  value={methodFilter}
                  label="Withdrawal Method"
                  onChange={(e) => setMethodFilter(e.target.value)}
                >
                  <MenuItem value="all">All Methods</MenuItem>
                  <MenuItem value="bank">Bank Transfer</MenuItem>
                  <MenuItem value="mobile_money">Mobile Money</MenuItem>
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

      {/* Withdrawal Summary Cards */}
      <Box mb={3}>
        <UserWithdrawalsKPICards />
      </Box>

      {/* Withdrawal Requests Table */}
      <Box mb={3}>
        <WithdrawalRequestsTable onRowClick={handleWithdrawalClick} />
      </Box>

      {/* Failed & Held Withdrawals Section */}
      <Box mb={3}>
        <FailedHeldWithdrawals 
          onRowClick={(withdrawal) => {
            // Create a mock withdrawal object for the drawer
            const mockWithdrawal: WithdrawalData = {
              id: withdrawal.id,
              date: new Date().toISOString().split('T')[0],
              user: {
                name: withdrawal.user.name,
                avatar: withdrawal.user.avatar,
                email: `${withdrawal.user.name.toLowerCase().replace(' ', '.')}@email.com`,
                phone: '+234-801-234-5678',
                kycStatus: withdrawal.user.kycStatus
              },
              amount: withdrawal.amount,
              method: withdrawal.method,
              bankInfo: withdrawal.bankInfo,
              status: withdrawal.type === 'failed' ? 'failed' : 'held',
              requestedAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
            };
            setSelectedWithdrawal(mockWithdrawal);
            setIsDrawerOpen(true);
          }}
        />
      </Box>

      {/* Withdrawal Detail Drawer */}
      <WithdrawalDetailDrawer
        withdrawal={selectedWithdrawal}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default UserWithdrawals;
