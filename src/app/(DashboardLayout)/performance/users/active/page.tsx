'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload, IconCalendar, IconMap, IconUsers } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import ActiveUserSummaryCards from './components/ActiveUserSummaryCards';
import ActiveUsersTable from './components/ActiveUsersTable';
import UserActivityDetailDrawer from './components/UserActivityDetailDrawer';
import ActivityDistributionTrends from './components/ActivityDistributionTrends';

interface UserActivityData {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  zone: string;
  lastActive: string;
  actionsInPeriod: number;
  pickupsCompleted: number;
  dropoffsCompleted: number;
  scheduledPickups: number;
  preferredMethod: 'pickup' | 'dropoff' | 'schedule';
  status: 'highly_active' | 'normal' | 'at_risk';
  accountAge: number; // in days
  totalActions: number;
  engagementTrend: 'increasing' | 'stable' | 'decreasing';
}

const ActiveUsers: React.FC = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  const [cityFilter, setCityFilter] = useState('all');
  const [activityTypeFilter, setActivityTypeFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<UserActivityData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleUserClick = (user: UserActivityData) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedUser(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting active users data as ${format}`);
  };

  return (
    <PageContainer title="Active Users" description="Users actively engaging with recycling and pickups">
      <Breadcrumb title="Active Users" subtitle="Users actively engaging with recycling and pickups" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Active Users
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Users actively engaging with recycling and pickups
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Time Range</InputLabel>
                <Select
                  value={timeRange}
                  label="Time Range"
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
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
                <InputLabel>Activity Type</InputLabel>
                <Select
                  value={activityTypeFilter}
                  label="Activity Type"
                  onChange={(e) => setActivityTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="pickup">Pickup</MenuItem>
                  <MenuItem value="dropoff">Drop-off</MenuItem>
                  <MenuItem value="schedule">Scheduling</MenuItem>
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

      {/* Active User Summary Cards */}
      <Box mb={3}>
        <ActiveUserSummaryCards />
      </Box>

      {/* Activity Distribution & Trends */}
      <Box mb={3}>
        <ActivityDistributionTrends />
      </Box>

      {/* Active Users Table */}
      <Box mb={3}>
        <ActiveUsersTable onRowClick={handleUserClick} />
      </Box>

      {/* User Activity Detail Drawer */}
      <UserActivityDetailDrawer
        user={selectedUser}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default ActiveUsers;
