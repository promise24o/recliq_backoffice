'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload, IconCalendar, IconMap, IconPackage, IconUser, IconClock } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import DurationSummaryCards from './components/DurationSummaryCards';
import PickupDurationDistribution from './components/PickupDurationDistribution';
import DurationBreakdownLifecycle from './components/DurationBreakdownLifecycle';
import DurationTrendsOverTime from './components/DurationTrendsOverTime';
import ZoneAgentEfficiencyComparison from './components/ZoneAgentEfficiencyComparison';
import SlowPickupAnalysisTable from './components/SlowPickupAnalysisTable';
import PickupTimelineDrawer from './components/PickupTimelineDrawer';

interface PickupData {
  id: string;
  pickupId: string;
  userId: string;
  userName: string;
  agentId: string;
  agentName: string;
  zone: string;
  city: string;
  wasteType: string;
  pickupType: 'scheduled' | 'on_demand';
  requestTime: string;
  assignmentTime: string;
  arrivalTime: string;
  completionTime: string;
  totalDuration: number;
  requestToAssignment: number;
  assignmentToArrival: number;
  arrivalToCompletion: number;
  slaBreach: boolean;
  delaySegment: 'assignment_delay' | 'travel_delay' | 'onsite_delay' | 'normal';
  distance: number;
  agentLoadAtAssignment: number;
}

const DurationAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [cityFilter, setCityFilter] = useState('all');
  const [wasteTypeFilter, setWasteTypeFilter] = useState('all');
  const [agentTypeFilter, setAgentTypeFilter] = useState('all');
  const [pickupTypeFilter, setPickupTypeFilter] = useState('all');
  const [selectedPickup, setSelectedPickup] = useState<PickupData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handlePickupClick = (pickup: PickupData) => {
    setSelectedPickup(pickup);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedPickup(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting duration analytics data as ${format}`);
  };

  return (
    <PageContainer title="Pickup Duration Analytics" description="Time-based efficiency across pickup lifecycle">
      <Breadcrumb title="Pickup Duration Analytics" subtitle="Time-based efficiency across pickup lifecycle" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Pickup Duration Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Time-based efficiency across pickup lifecycle
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
                <InputLabel>Waste Type</InputLabel>
                <Select
                  value={wasteTypeFilter}
                  label="Waste Type"
                  onChange={(e) => setWasteTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="pet">PET</MenuItem>
                  <MenuItem value="metal">Metal</MenuItem>
                  <MenuItem value="mixed">Mixed</MenuItem>
                  <MenuItem value="ewaste">E-waste</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Agent Type</InputLabel>
                <Select
                  value={agentTypeFilter}
                  label="Agent Type"
                  onChange={(e) => setAgentTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="full_time">Full Time</MenuItem>
                  <MenuItem value="part_time">Part Time</MenuItem>
                  <MenuItem value="freelance">Freelance</MenuItem>
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
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="on_demand">On-demand</MenuItem>
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

      {/* Duration Summary Cards */}
      <Box mb={3}>
        <DurationSummaryCards />
      </Box>

      {/* Pickup Duration Distribution */}
      <Box mb={3}>
        <PickupDurationDistribution />
      </Box>

      {/* Duration Breakdown by Lifecycle Stage */}
      <Box mb={3}>
        <DurationBreakdownLifecycle />
      </Box>

      {/* Duration Trends Over Time */}
      <Box mb={3}>
        <DurationTrendsOverTime />
      </Box>

      {/* Zone & Agent Efficiency Comparison */}
      <Box mb={3}>
        <ZoneAgentEfficiencyComparison />
      </Box>

      {/* Slow Pickup Analysis Table */}
      <Box mb={3}>
        <SlowPickupAnalysisTable onRowClick={handlePickupClick} />
      </Box>

      {/* Pickup Timeline Drawer */}
      <PickupTimelineDrawer
        pickup={selectedPickup}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default DurationAnalytics;
