'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { 
  IconWallet,
  IconBuildingBank,
  IconCreditCard,
  IconReceipt,
  IconUsers,
  IconBriefcase,
  IconShield,
  IconCurrency,
  IconClock,
  IconCheck,
  IconX,
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

const FundsSourceBreakdown: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data for different tabs
  const walletTypeData = [
    {
      type: 'User Wallets',
      amount: 45200000,
      percentage: 35.2,
      icon: <IconUsers size={20} />,
      status: 'active'
    },
    {
      type: 'Agent Wallets',
      amount: 31800000,
      percentage: 24.8,
      icon: <IconBriefcase size={20} />,
      status: 'active'
    },
    {
      type: 'Enterprise Escrow',
      amount: 28500000,
      percentage: 22.2,
      icon: <IconBuildingBank size={20} />,
      status: 'active'
    },
    {
      type: 'Subscription Balances',
      amount: 22950000,
      percentage: 17.8,
      icon: <IconReceipt size={20} />,
      status: 'active'
    }
  ];

  const paymentProviderData = [
    {
      provider: 'Paystack',
      balance: 52300000,
      percentage: 40.7,
      lastSync: '2 mins ago',
      variance: 0,
      status: 'reconciled'
    },
    {
      provider: 'Flutterwave',
      balance: 41200000,
      percentage: 32.1,
      lastSync: '5 mins ago',
      variance: 150000,
      status: 'warning'
    },
    {
      provider: 'Bank Escrow',
      balance: 28500000,
      percentage: 22.2,
      lastSync: '1 hour ago',
      variance: 0,
      status: 'reconciled'
    },
    {
      provider: 'Manual Settlements',
      balance: 6450000,
      percentage: 5.0,
      lastSync: '3 hours ago',
      variance: -50000,
      status: 'error'
    }
  ];

  const purposeData = [
    {
      purpose: 'Agent Payouts',
      amount: 31800000,
      percentage: 24.8,
      icon: <IconBriefcase size={20} />,
      status: 'pending'
    },
    {
      purpose: 'User Withdrawals',
      amount: 28500000,
      percentage: 22.2,
      icon: <IconUsers size={20} />,
      status: 'pending'
    },
    {
      purpose: 'Refunds',
      amount: 14500000,
      percentage: 11.3,
      icon: <IconCurrency size={20} />,
      status: 'processing'
    },
    {
      purpose: 'Operational Reserves',
      amount: 53650000,
      percentage: 41.7,
      icon: <IconShield size={20} />,
      status: 'available'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reconciled':
      case 'active':
      case 'available':
        return <IconCheck size={16} color="green" />;
      case 'warning':
      case 'pending':
      case 'processing':
        return <IconAlertTriangle size={16} color="orange" />;
      case 'error':
        return <IconX size={16} color="red" />;
      default:
        return <IconClock size={16} color="gray" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reconciled':
      case 'active':
      case 'available':
        return 'success';
      case 'warning':
      case 'pending':
      case 'processing':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const renderWalletTypeTab = () => (
    <Stack spacing={2}>
      {walletTypeData.map((item, index) => (
        <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <CardContent sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {item.icon}
              </Box>
              <Box flex={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1" fontWeight={600}>
                    {item.type}
                  </Typography>
                  {getStatusIcon(item.status)}
                </Stack>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                  ₦{item.amount.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {item.percentage}% of total float
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={item.percentage}
                    sx={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      bgcolor: 'grey.200',
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );

  const renderPaymentProviderTab = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Provider</TableCell>
            <TableCell align="right">Balance (₦)</TableCell>
            <TableCell align="center">% of Total</TableCell>
            <TableCell align="center">Last Sync</TableCell>
            <TableCell align="center">Variance</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentProviderData.map((provider, index) => (
            <TableRow key={index} hover>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconBuildingBank size={16} />
                  <Typography variant="body2" fontWeight={600}>
                    {provider.provider}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" fontWeight={700}>
                  ₦{provider.balance.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2">
                  {provider.percentage}%
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="caption" color="text.secondary">
                  {provider.lastSync}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography 
                  variant="body2" 
                  fontWeight={600}
                  color={provider.variance === 0 ? 'success.main' : provider.variance > 0 ? 'warning.main' : 'error.main'}
                >
                  {provider.variance === 0 ? '₦0' : `${provider.variance > 0 ? '+' : ''}₦${Math.abs(provider.variance).toLocaleString()}`}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                  {getStatusIcon(provider.status)}
                  <Typography variant="caption" color={getStatusColor(provider.status) + '.main' as any}>
                    {provider.status}
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderPurposeTab = () => (
    <Stack spacing={2}>
      {purposeData.map((item, index) => (
        <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <CardContent sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: getStatusColor(item.status) + '.light' as any,
                  color: getStatusColor(item.status) + '.main' as any,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {item.icon}
              </Box>
              <Box flex={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1" fontWeight={600}>
                    {item.purpose}
                  </Typography>
                  {getStatusIcon(item.status)}
                </Stack>
                <Typography variant="h6" fontWeight={700} color={getStatusColor(item.status) + '.main' as any}>
                  ₦{item.amount.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {item.percentage}% of total float
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={item.percentage}
                    sx={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getStatusColor(item.status) + '.main' as any,
                      },
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );

  return (
    <DashboardCard title="Funds Source Breakdown">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="By Wallet Type" icon={<IconWallet size={16} />} iconPosition="start" />
            <Tab label="By Payment Provider" icon={<IconBuildingBank size={16} />} iconPosition="start" />
            <Tab label="By Purpose" icon={<IconCurrency size={16} />} iconPosition="start" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {renderWalletTypeTab()}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {renderPaymentProviderTab()}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          {renderPurposeTab()}
        </TabPanel>
      </Box>
    </DashboardCard>
  );
};

export default FundsSourceBreakdown;
