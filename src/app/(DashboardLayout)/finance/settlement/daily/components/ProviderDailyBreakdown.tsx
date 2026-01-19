'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Card, CardContent, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { 
  IconBuildingBank,
  IconCreditCard,
  IconTruck,
  IconNotes,
  IconCurrencyNaira,
  IconClock,
  IconCheck,
  IconAlertTriangle
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const ProviderDailyBreakdown: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data for different providers
  const providerData = {
    paystack: {
      grossCollected: 12450000,
      feesDeducted: 247000,
      netSettled: 12203000,
      settlementTime: '2024-01-15 14:30:00',
      transactions: 856,
      successRate: 98.5,
      avgTransactionValue: 14550
    },
    flutterwave: {
      grossCollected: 5230000,
      feesDeducted: 104600,
      netSettled: 5125400,
      settlementTime: '2024-01-15 15:45:00',
      transactions: 312,
      successRate: 97.2,
      avgTransactionValue: 16760
    },
    bank: {
      grossCollected: 740000,
      feesDeducted: 0,
      netSettled: 740000,
      settlementTime: '2024-01-15 16:00:00',
      transactions: 45,
      successRate: 100.0,
      avgTransactionValue: 16444
    },
    manual: {
      grossCollected: 0,
      feesDeducted: 0,
      netSettled: 0,
      settlementTime: 'N/A',
      transactions: 35,
      successRate: 0.0,
      avgTransactionValue: 0
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'paystack': return <IconBuildingBank size={20} />;
      case 'flutterwave': return <IconCreditCard size={20} />;
      case 'bank': return <IconTruck size={20} />;
      case 'manual': return <IconNotes size={20} />;
      default: return <IconBuildingBank size={20} />;
    }
  };

  const getStatusColor = (successRate: number) => {
    if (successRate >= 98) return 'success';
    if (successRate >= 95) return 'warning';
    return 'error';
  };

  const getStatusIcon = (successRate: number) => {
    if (successRate >= 98) return <IconCheck size={16} color="green" />;
    if (successRate >= 95) return <IconAlertTriangle size={16} color="orange" />;
    return <IconAlertTriangle size={16} color="red" />;
  };

  const renderProviderBreakdown = (provider: keyof typeof providerData) => {
    const data = providerData[provider];
    
    return (
      <Stack spacing={3}>
        {/* Summary Cards */}
        <Stack direction="row" spacing={2}>
          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Gross Collected
                </Typography>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                  ₦{data.grossCollected.toLocaleString()}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Fees Deducted
                </Typography>
                <Typography variant="h6" fontWeight={700} color="warning.main">
                  -₦{data.feesDeducted.toLocaleString()}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Net Settled
                </Typography>
                <Typography variant="h6" fontWeight={700} color="success.main">
                  ₦{data.netSettled.toLocaleString()}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        {/* Detailed Breakdown */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Metric</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {getProviderIcon(provider)}
                    <Typography variant="body2" fontWeight={600}>
                      Provider
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={600}>
                    {provider.charAt(0).toUpperCase() + provider.slice(1)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {getStatusIcon(data.successRate)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body2">Transactions</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={600}>
                    {data.transactions.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="caption" color="text.secondary">
                    Count
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body2">Success Rate</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={600} color={getStatusColor(data.successRate) + '.main' as any}>
                    {data.successRate}%
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {getStatusIcon(data.successRate)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body2">Average Transaction</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={600}>
                    ₦{data.avgTransactionValue.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="caption" color="text.secondary">
                    Per txn
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body2">Settlement Time</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontFamily="monospace">
                    {data.settlementTime}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconClock size={16} color="gray" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body2">Fee Rate</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={600}>
                    {data.grossCollected > 0 ? ((data.feesDeducted / data.grossCollected) * 100).toFixed(2) : '0.00'}%
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="caption" color="text.secondary">
                    Rate
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    );
  };

  return (
    <DashboardCard title="Provider Daily Breakdown">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="Paystack" icon={<IconBuildingBank size={16} />} iconPosition="start" />
            <Tab label="Flutterwave" icon={<IconCreditCard size={16} />} iconPosition="start" />
            <Tab label="Bank Transfers" icon={<IconTruck size={16} />} iconPosition="start" />
            <Tab label="Manual Entries" icon={<IconNotes size={16} />} iconPosition="start" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {renderProviderBreakdown('paystack')}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {renderProviderBreakdown('flutterwave')}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          {renderProviderBreakdown('bank')}
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          {renderProviderBreakdown('manual')}
        </TabPanel>
      </Box>
    </DashboardCard>
  );
};

export default ProviderDailyBreakdown;
