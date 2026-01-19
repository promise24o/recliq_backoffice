'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload, IconCalendar, IconMap, IconRecycle } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import FrequencySummaryCards from './components/FrequencySummaryCards';
import FrequencyDistribution from './components/FrequencyDistribution';
import UserFrequencyTable from './components/UserFrequencyTable';
import UserFrequencyDetailDrawer from './components/UserFrequencyDetailDrawer';
import FrequencyBySegmentLocation from './components/FrequencyBySegmentLocation';

interface UserFrequencyData {
  id: string;
  userId: string;
  name: string;
  email: string;
  city: string;
  zone: string;
  avgRecyclesPerMonth: number;
  lastRecycleDate: string;
  currentStreak: number;
  longestStreak: number;
  preferredMaterials: string[];
  frequencySegment: 'power_recycler' | 'regular' | 'occasional' | 'at_risk';
  pickupVsDropoffRatio: number;
  avgWeightPerRecycle: number;
  accountAge: number;
  totalRecycles: number;
  frequencyTrend: 'increasing' | 'stable' | 'decreasing';
}

const RecyclingFrequency: React.FC = () => {
  const [timeWindow, setTimeWindow] = useState('monthly');
  const [dateRange, setDateRange] = useState('30days');
  const [cityFilter, setCityFilter] = useState('all');
  const [materialFilter, setMaterialFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<UserFrequencyData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleUserClick = (user: UserFrequencyData) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedUser(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting recycling frequency data as ${format}`);
  };

  return (
    <PageContainer title="Recycling Frequency" description="How often users recycle over time">
      <Breadcrumb title="Recycling Frequency" subtitle="How often users recycle over time" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Recycling Frequency
              </Typography>
              <Typography variant="body2" color="text.secondary">
                How often users recycle over time
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Time Window</InputLabel>
                <Select
                  value={timeWindow}
                  label="Time Window"
                  onChange={(e) => setTimeWindow(e.target.value)}
                >
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
              
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
                <InputLabel>Material</InputLabel>
                <Select
                  value={materialFilter}
                  label="Material"
                  onChange={(e) => setMaterialFilter(e.target.value)}
                >
                  <MenuItem value="all">All Materials</MenuItem>
                  <MenuItem value="pet">PET</MenuItem>
                  <MenuItem value="metal">Metal</MenuItem>
                  <MenuItem value="mixed">Mixed</MenuItem>
                  <MenuItem value="ewaste">E-waste</MenuItem>
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

      {/* Frequency Summary Cards */}
      <Box mb={3}>
        <FrequencySummaryCards />
      </Box>

      {/* Frequency Distribution */}
      <Box mb={3}>
        <FrequencyDistribution />
      </Box>

      {/* Frequency by Segment & Location */}
      <Box mb={3}>
        <FrequencyBySegmentLocation />
      </Box>

      {/* User Frequency Table */}
      <Box mb={3}>
        <UserFrequencyTable onRowClick={handleUserClick} />
      </Box>

      {/* User Frequency Detail Drawer */}
      <UserFrequencyDetailDrawer
        user={selectedUser}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default RecyclingFrequency;
