'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconDownload, IconCalendar, IconMap, IconTrendingUp } from '@tabler/icons-react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import DashboardCard from '@/app/components/shared/DashboardCard';
import RetentionSummaryCards from './components/RetentionSummaryCards';
import CohortRetentionChart from './components/CohortRetentionChart';
import RetentionChurnTrendChart from './components/RetentionChurnTrendChart';
import ChurnedUsersTable from './components/ChurnedUsersTable';
import UserRetentionDetailDrawer from './components/UserRetentionDetailDrawer';
import RetentionDriversBreakdowns from './components/RetentionDriversBreakdowns';

interface UserRetentionData {
  id: string;
  userId: string;
  name: string;
  email: string;
  city: string;
  zone: string;
  signupDate: string;
  firstRecycleDate: string;
  lastActivityDate: string;
  recyclesCompleted: number;
  lifetimeDays: number;
  churnReason: string;
  churnSegment: 'early_churn' | 'mid_lifecycle' | 'long_term_churn' | 'active';
  avgResponseTime: number;
  disputesEncountered: number;
  rewardsEarned: number;
  userType: 'pickup' | 'dropoff' | 'enterprise_linked';
}

const RetentionChurn: React.FC = () => {
  const [cohortSelector, setCohortSelector] = useState('monthly');
  const [dateRange, setDateRange] = useState('90days');
  const [cityFilter, setCityFilter] = useState('all');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<UserRetentionData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleUserClick = (user: UserRetentionData) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedUser(null);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality would be implemented here
    console.log(`Exporting retention & churn data as ${format}`);
  };

  return (
    <PageContainer title="Retention & Churn" description="User engagement over time">
      <Breadcrumb title="Retention & Churn" subtitle="User engagement over time" />
      
      {/* Page Header */}
      <Box mt={3}>
        <DashboardCard>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Retention & Churn
              </Typography>
              <Typography variant="body2" color="text.secondary">
                User engagement over time
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Cohort</InputLabel>
                <Select
                  value={cohortSelector}
                  label="Cohort"
                  onChange={(e) => setCohortSelector(e.target.value)}
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
                  <MenuItem value="30days">Last 30 days</MenuItem>
                  <MenuItem value="90days">Last 90 days</MenuItem>
                  <MenuItem value="180days">Last 180 days</MenuItem>
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
                <InputLabel>User Type</InputLabel>
                <Select
                  value={userTypeFilter}
                  label="User Type"
                  onChange={(e) => setUserTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="pickup">Pickup</MenuItem>
                  <MenuItem value="dropoff">Drop-off</MenuItem>
                  <MenuItem value="enterprise_linked">Enterprise-linked</MenuItem>
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

      {/* Retention Summary Cards */}
      <Box mb={3}>
        <RetentionSummaryCards />
      </Box>

      {/* Cohort Retention Chart */}
      <Box mb={3}>
        <CohortRetentionChart />
      </Box>

      {/* Retention vs Churn Trend Chart */}
      <Box mb={3}>
        <RetentionChurnTrendChart />
      </Box>

      {/* Retention Drivers & Breakdowns */}
      <Box mb={3}>
        <RetentionDriversBreakdowns />
      </Box>

      {/* Churned Users Table */}
      <Box mb={3}>
        <ChurnedUsersTable onRowClick={handleUserClick} />
      </Box>

      {/* User Retention Detail Drawer */}
      <UserRetentionDetailDrawer
        user={selectedUser}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default RetentionChurn;
