'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import AgentCommissionKPICards from './components/AgentCommissionKPICards';
import CommissionBreakdownTabs from './components/CommissionBreakdownTabs';
import CommissionTransactionsTable from './components/CommissionTransactionsTable';
import CommissionDetailDrawer from './components/CommissionDetailDrawer';
import CommissionRulesPreview from './components/CommissionRulesPreview';
import CommissionAlertsPanel from './components/CommissionAlertsPanel';

interface CommissionData {
  id: string;
  date: string;
  agent: {
    name: string;
    avatar: string;
    email: string;
  };
  pickupId: string;
  pickupType: 'user' | 'b2b' | 'dropoff';
  grossValue: number;
  commission: number;
  rate: number;
  netPayout: number;
  material: string;
  weight: number;
  location: string;
}

const AgentCommission: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [agentFilter, setAgentFilter] = useState('all');
  const [selectedCommission, setSelectedCommission] = useState<CommissionData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCommissionClick = (commission: CommissionData) => {
    setSelectedCommission(commission);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedCommission(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting as ${format}`);
  };

  return (
    <PageContainer title="Agent Commission" description="Platform earnings from agent-performed collections">
      <Breadcrumb title="Agent Commission" subtitle="Track and analyze commission earnings from agents" />

      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Agent Commission
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Platform earnings from agent-performed collections
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
                <InputLabel>Agent</InputLabel>
                <Select
                  value={agentFilter}
                  label="Agent"
                  onChange={(e) => setAgentFilter(e.target.value)}
                >
                  <MenuItem value="all">All Agents</MenuItem>
                  <MenuItem value="active">Active Only</MenuItem>
                  <MenuItem value="top">Top Performers</MenuItem>
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
        <AgentCommissionKPICards />
      </Box>

      {/* Commission Breakdown Section */}
      <Box sx={{ mb: 3 }}>
        <CommissionBreakdownTabs />
      </Box>

      {/* Commission Transactions Table */}
      <Box sx={{ mb: 3 }}>
        <CommissionTransactionsTable onRowClick={handleCommissionClick} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <CommissionAlertsPanel />
      </Box>

      <Box sx={{ mb: 3 }}>
        <CommissionRulesPreview />
      </Box>

      {/* Commission Detail Drawer */}
      <CommissionDetailDrawer
        commission={selectedCommission}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};
 
export default AgentCommission;
