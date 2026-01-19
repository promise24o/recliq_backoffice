'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload, IconCalendar, IconMap, IconAlertTriangle } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import DisputeSummaryCards from './components/DisputeSummaryCards';
import AgentDisputeTable from './components/AgentDisputeTable';
import AgentDisputeDetailDrawer from './components/AgentDisputeDetailDrawer';
import DisputeDistributionPatterns from './components/DisputeDistributionPatterns';

interface AgentDisputeData {
  id: string;
  agentId: string;
  name: string;
  city: string;
  zone: string;
  completedPickups: number;
  totalDisputes: number;
  openDisputes: number;
  resolvedDisputes: number;
  disputeRate: number;
  riskLevel: 'low' | 'medium' | 'high';
  disputeTypes: {
    weight: number;
    payment: number;
    conduct: number;
    missed: number;
    quality: number;
  };
  avgResolutionTime: number;
  resolvedInUserFavor: number;
  activeStatus: 'active' | 'suspended';
}

const DisputeRate: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [cityFilter, setCityFilter] = useState('all');
  const [pickupTypeFilter, setPickupTypeFilter] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState<AgentDisputeData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAgentClick = (agent: AgentDisputeData) => {
    setSelectedAgent(agent);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedAgent(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting dispute rate data as ${format}`);
  };

  return (
    <PageContainer title="Dispute Rate" description="Frequency of disputes raised against agents">
      <Breadcrumb title="Dispute Rate" subtitle="Frequency of disputes raised against agents" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Dispute Rate
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Frequency of disputes raised against agents
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
                <InputLabel>City / Zone</InputLabel>
                <Select
                  value={cityFilter}
                  label="City / Zone"
                  onChange={(e) => setCityFilter(e.target.value)}
                >
                  <MenuItem value="all">All Cities</MenuItem>
                  <MenuItem value="lagos">Lagos</MenuItem>
                  <MenuItem value="abuja">Abuja</MenuItem>
                  <MenuItem value="port-harcourt">Port Harcourt</MenuItem>
                  <MenuItem value="kano">Kano</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Pickup Type</InputLabel>
                <Select
                  value={pickupTypeFilter}
                  label="Pickup Type"
                  onChange={(e) => setPickupTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
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

      {/* Dispute Summary Cards */}
      <Box mb={3}>
        <DisputeSummaryCards />
      </Box>

      {/* Dispute Distribution & Patterns */}
      <Box mb={3}>
        <DisputeDistributionPatterns />
      </Box>

      {/* Agent Dispute Table */}
      <Box mb={3}>
        <AgentDisputeTable onRowClick={handleAgentClick} />
      </Box>

      {/* Agent Dispute Detail Drawer */}
      <AgentDisputeDetailDrawer
        agent={selectedAgent}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default DisputeRate;
