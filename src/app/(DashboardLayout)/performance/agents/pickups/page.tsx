'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload, IconCalendar, IconMap } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import CompletionSummaryCards from './components/CompletionSummaryCards';
import AgentPickupsTable from './components/AgentPickupsTable';
import AgentPerformanceDrawer from './components/AgentPerformanceDrawer';
import PerformanceDistribution from './components/PerformanceDistribution';

interface AgentData {
  id: string;
  agentId: string;
  name: string;
  city: string;
  zone: string;
  totalPickups: number;
  thisWeek: number;
  thisMonth: number;
  avgPerDay: number;
  completionRate: number;
  status: 'excellent' | 'normal' | 'at_risk';
  cancelledPickups: number;
  failedPickups: number;
  avgCompletionTime: number;
  activeStatus: 'active' | 'suspended';
}

const PickupsCompleted: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [cityFilter, setCityFilter] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAgentClick = (agent: AgentData) => {
    setSelectedAgent(agent);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedAgent(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting pickups completed data as ${format}`);
  };

  return (
    <PageContainer title="Pickups Completed" description="Successful recycling and disposal pickups by agents">
      <Breadcrumb title="Pickups Completed" subtitle="Successful recycling and disposal pickups by agents" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Pickups Completed
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Successful recycling and disposal pickups by agents
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

      {/* Completion Summary Cards */}
      <Box mb={3}>
        <CompletionSummaryCards />
      </Box>

      {/* Performance Distribution */}
      <Box mb={3}>
        <PerformanceDistribution />
      </Box>

      {/* Agent Pickups Table */}
      <Box mb={3}>
        <AgentPickupsTable onRowClick={handleAgentClick} />
      </Box>

      {/* Agent Performance Drawer */}
      <AgentPerformanceDrawer
        agent={selectedAgent}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default PickupsCompleted;
