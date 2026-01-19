'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload, IconCalendar, IconMap, IconClock } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import ResponseTimeSummaryCards from './components/ResponseTimeSummaryCards';
import AgentResponseTimeTable from './components/AgentResponseTimeTable';
import AgentResponseDetailDrawer from './components/AgentResponseDetailDrawer';
import ResponseTimeDistribution from './components/ResponseTimeDistribution';

interface AgentResponseData {
  id: string;
  agentId: string;
  name: string;
  city: string;
  zone: string;
  avgResponseTime: number; // in seconds
  medianResponseTime: number; // in seconds
  percentile90Response: number; // in seconds
  requestsSeen: number;
  requestsAccepted: number;
  slaStatus: 'excellent' | 'acceptable' | 'poor';
  fastestResponse: number; // in seconds
  slowestResponse: number; // in seconds
  onlineHours: number;
  availabilityRate: number;
}

const AvgResponseTime: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [cityFilter, setCityFilter] = useState('all');
  const [pickupTypeFilter, setPickupTypeFilter] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState<AgentResponseData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAgentClick = (agent: AgentResponseData) => {
    setSelectedAgent(agent);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedAgent(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting response time data as ${format}`);
  };

  return (
    <PageContainer title="Avg Response Time" description="Time taken by agents to accept pickup requests">
      <Breadcrumb title="Avg Response Time" subtitle="Time taken by agents to accept pickup requests" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Avg Response Time
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Time taken by agents to accept pickup requests
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

      {/* Response Time Summary Cards */}
      <Box mb={3}>
        <ResponseTimeSummaryCards />
      </Box>

      {/* Response Time Distribution */}
      <Box mb={3}>
        <ResponseTimeDistribution />
      </Box>

      {/* Agent Response Time Table */}
      <Box mb={3}>
        <AgentResponseTimeTable onRowClick={handleAgentClick} />
      </Box>

      {/* Agent Response Detail Drawer */}
      <AgentResponseDetailDrawer
        agent={selectedAgent}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default AvgResponseTime;
