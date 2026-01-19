'use client';

import React, { useState } from 'react';
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import AppCard from "@/app/components/shared/AppCard";
import { Grid, Typography, Box, Button, Stack, Tab, Tabs, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import {
  IconDownload,
  IconCalendar,
  IconSearch,
  IconFilter,
  IconTrendingUp,
  IconTrendingDown,
  IconReceipt,
  IconPackage,
  IconScale,
  IconAlertTriangle
} from '@tabler/icons-react';
// import DashboardCard from '../../../components/shared/DashboardCard'; // Not needed
import FinanceKPICards from './components/FinanceKPICards';
import FeesBreakdownTabs from './components/FeesBreakdownTabs';
import DetailedFeesTable from './components/DetailedFeesTable';
import FeeDetailDrawer from './components/FeeDetailDrawer';
import AlertsPanel from './components/AlertsPanel';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`fees-tabpanel-${index}`}
      aria-labelledby={`fees-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const ServiceFees = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [dateRange, setDateRange] = useState('30 days');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleRowClick = (fee: any) => {
    setSelectedFee(fee);
    setDrawerOpen(true);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Export functionality
    console.log(`Exporting as ${format}`);
  };

  return (
    <PageContainer title="Service Fees" description="Revenue earned from individual recycling transactions">
      <Breadcrumb title="Service Fees" subtitle="Finance → Revenue Overview → Service Fees" />

      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              Service Fees
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Revenue earned from individual recycling transactions
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction="row" spacing={1}>
              {['Today', '7 days', '30 days', 'Custom'].map((range) => (
                <Button
                  key={range}
                  variant={dateRange === range ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setDateRange(range)}
                  sx={{ textTransform: 'none' }}
                >
                  {range}
                </Button>
              ))}
            </Stack>

            <Stack direction="row" spacing={1}>
              <Tooltip title="Export as CSV">
                <IconButton
                  onClick={() => handleExport('csv')}
                  sx={{ border: '1px solid', borderColor: 'divider' }}
                >
                  <IconDownload size={18} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Export as PDF">
                <IconButton
                  onClick={() => handleExport('pdf')}
                  sx={{ border: '1px solid', borderColor: 'divider' }}
                >
                  <IconDownload size={18} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* KPI Summary Cards */}
      <FinanceKPICards />

      {/* Fees Breakdown Tabs */}
      <Box sx={{ mb: 2, mt: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="By Fee Type" />
            <Tab label="By Material" />
            <Tab label="By Pickup Type" />
            <Tab label="By Location" />
          </Tabs>
        </Box>

        <TabPanel value={selectedTab} index={0}>
          <FeesBreakdownTabs type="feeType" />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <FeesBreakdownTabs type="material" />
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <FeesBreakdownTabs type="pickupType" />
        </TabPanel>
        <TabPanel value={selectedTab} index={3}>
          <FeesBreakdownTabs type="location" />
        </TabPanel>
      </Box>


      {/* Detailed Fees Table */}
      <Grid size={{ xs: 12, lg: 12 }} mb={3}>
        <DetailedFeesTable
          searchQuery={searchQuery}
          onRowClick={handleRowClick}
        />
      </Grid>

      <Grid size={{ xs: 12, lg: 12 }} mt={2}>
        <AlertsPanel />
      </Grid>

      {/* Fee Detail Drawer */}
      <FeeDetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        fee={selectedFee}
      />
    </PageContainer>
  );
};

export default ServiceFees;
