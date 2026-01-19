'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { 
  IconLock,
  IconBuildingBank,
  IconTruck,
  IconAlertTriangle,
  IconCalendar,
  IconUsers,
  IconBriefcase,
  IconBuilding,
  IconClock,
  IconCheck,
  IconX,
  IconAlertTriangle as IconWarning
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

const EscrowBreakdown: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data for different tabs
  const escrowTypeData = [
    {
      type: 'B2B Job Escrow',
      amount: 18500000,
      count: 124,
      avgHoldTime: 4.2,
      icon: <IconBuildingBank size={20} />,
      status: 'active'
    },
    {
      type: 'Pickup Verification Escrow',
      amount: 12800000,
      count: 89,
      avgHoldTime: 2.8,
      icon: <IconTruck size={20} />,
      status: 'active'
    },
    {
      type: 'Dispute Escrow',
      amount: 6800000,
      count: 45,
      avgHoldTime: 7.5,
      icon: <IconAlertTriangle size={20} />,
      status: 'active'
    },
    {
      type: 'Subscription Escrow',
      amount: 4500000,
      count: 60,
      avgHoldTime: 1.2,
      icon: <IconCalendar size={20} />,
      status: 'active'
    }
  ];

  const counterpartyData = [
    {
      counterparty: 'Agent',
      amountLocked: 18500000,
      jobsAffected: 124,
      percentage: 43.4,
      icon: <IconBriefcase size={20} />,
      status: 'active'
    },
    {
      counterparty: 'User',
      amountLocked: 15600000,
      jobsAffected: 98,
      percentage: 36.6,
      icon: <IconUsers size={20} />,
      status: 'active'
    },
    {
      counterparty: 'Enterprise Client',
      amountLocked: 8500000,
      jobsAffected: 96,
      percentage: 20.0,
      icon: <IconBuilding size={20} />,
      status: 'active'
    }
  ];

  const ageData = [
    {
      ageRange: '0–24 hours',
      amount: 8900000,
      count: 67,
      percentage: 20.9,
      riskLevel: 'low',
      status: 'normal'
    },
    {
      ageRange: '2–7 days',
      amount: 15600000,
      count: 98,
      percentage: 36.6,
      riskLevel: 'medium',
      status: 'normal'
    },
    {
      ageRange: '8–14 days',
      amount: 12800000,
      count: 89,
      percentage: 30.0,
      riskLevel: 'high',
      status: 'warning'
    },
    {
      ageRange: '15+ days',
      amount: 5300000,
      count: 64,
      percentage: 12.5,
      riskLevel: 'critical',
      status: 'critical'
    }
  ];

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'warning';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return <IconCheck size={16} color="green" />;
      case 'medium': return <IconWarning size={16} color="orange" />;
      case 'high': return <IconWarning size={16} color="orange" />;
      case 'critical': return <IconX size={16} color="red" />;
      default: return <IconClock size={16} color="gray" />;
    }
  };

  const renderEscrowTypeTab = () => (
    <Stack spacing={2}>
      {escrowTypeData.map((item, index) => (
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {item.count} escrows
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.avgHoldTime} days avg
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                  ₦{item.amount.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {((item.amount / 42600000) * 100).toFixed(1)}% of total escrow
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(item.amount / 42600000) * 100}
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

  const renderCounterpartyTab = () => (
    <Stack spacing={2}>
      {counterpartyData.map((item, index) => (
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
                    {item.counterparty}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.jobsAffected} jobs affected
                  </Typography>
                </Stack>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                  ₦{item.amountLocked.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {item.percentage}% of total escrow
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

  const renderAgeTab = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Age Range</TableCell>
            <TableCell align="right">Amount (₦)</TableCell>
            <TableCell align="center">Count</TableCell>
            <TableCell align="center">% of Total</TableCell>
            <TableCell align="center">Risk Level</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ageData.map((item, index) => (
            <TableRow key={index} hover>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconClock size={16} />
                  <Typography variant="body2" fontWeight={600}>
                    {item.ageRange}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" fontWeight={700}>
                  ₦{item.amount.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2">
                  {item.count}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2">
                  {item.percentage}%
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                  {getRiskIcon(item.riskLevel)}
                  <Typography variant="caption" color={getRiskColor(item.riskLevel) + '.main' as any}>
                    {item.riskLevel.toUpperCase()}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="center">
                <Chip
                  size="small"
                  label={item.status === 'critical' ? 'SLA Breach' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  color={item.status === 'critical' ? 'error' : item.status === 'warning' ? 'warning' : 'success'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <DashboardCard title="Escrow Breakdown">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="By Escrow Type" icon={<IconLock size={16} />} iconPosition="start" />
            <Tab label="By Counterparty" icon={<IconUsers size={16} />} iconPosition="start" />
            <Tab label="By Age" icon={<IconClock size={16} />} iconPosition="start" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {renderEscrowTypeTab()}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {renderCounterpartyTab()}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          {renderAgeTab()}
        </TabPanel>
      </Box>
    </DashboardCard>
  );
};

export default EscrowBreakdown;
