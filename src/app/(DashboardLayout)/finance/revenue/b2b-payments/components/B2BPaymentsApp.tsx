'use client'
import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Stack, 
  Typography, 
  Button, 
  Select, 
  MenuItem, 
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import { 
  IconDownload, 
  IconFilter,
  IconCalendar,
  IconChevronDown
} from '@tabler/icons-react';
import B2BPaymentsKPICards from './B2BPaymentsKPICards';
import RevenueBreakdownTabs from './RevenueBreakdownTabs';
import InvoicesTable from './InvoicesTable';
import OutstandingPayments from './OutstandingPayments';
import B2BAlertsPanel from './B2BAlertsPanel';
import InvoiceDetailDrawer from './InvoiceDetailDrawer';

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
      id={`b2b-tabpanel-${index}`}
      aria-labelledby={`b2b-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const B2BPaymentsApp: React.FC = () => {
  const [dateRange, setDateRange] = useState('30');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleInvoiceClick = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ 
        mb: 3, 
        p: 3, 
        bgcolor: 'background.paper', 
        borderRadius: 2, 
        border: '1px solid rgba(0, 0, 0, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                B2B Payments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Revenue from enterprise waste collection contracts
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack direction="row" spacing={2} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  label="Date Range"
                  onChange={(e) => setDateRange(e.target.value)}
                  startAdornment={<IconCalendar size={16} style={{ marginRight: 8 }} />}
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
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="overdue">Overdue</MenuItem>
                </Select>
              </FormControl>
              
              <Button 
                variant="outlined" 
                startIcon={<IconDownload size={16} />}
                sx={{ minWidth: 100 }}
              >
                Export
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* KPI Summary Cards */}
      <Box sx={{ mb: 3 }}>
        <B2BPaymentsKPICards />
      </Box>

      {/* Revenue Breakdown Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Revenue Breakdown
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="By Client" />
            <Tab label="By Contract Type" />
            <Tab label="By Location" />
            <Tab label="By Time" />
          </Tabs>
        </Box>
        <RevenueBreakdownTabs value={selectedTab} />
      </Box>

      {/* Main Invoices Table */}
      <Box sx={{ mb: 3 }}>
        <InvoicesTable 
          onInvoiceClick={handleInvoiceClick}
          onRowClick={handleInvoiceClick}
          dateRange={dateRange}
          statusFilter={statusFilter}
        />
      </Box>

      {/* Bottom Section: Outstanding Payments and Alerts */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <OutstandingPayments />
        </Grid>
        <Grid size={{ xs: 12, lg: 12 }}>
          <B2BAlertsPanel />
        </Grid>
      </Grid>

      {/* Invoice Detail Drawer */}
      <InvoiceDetailDrawer
        invoice={selectedInvoice}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </Box>
  );
};

export default B2BPaymentsApp;
