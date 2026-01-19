'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, Card, CardContent, LinearProgress, Chip, Tabs, Tab, Grid } from '@mui/material';
import { 
  IconBuilding, 
  IconCalendar, 
  IconMapPin, 
  IconFileText,
  IconPackage,
  IconTruck,
  IconTrendingUp,
  IconTrendingDown
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
      id={`payment-breakdown-tabpanel-${index}`}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const PaymentBreakdownTabs: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Mock data for different breakdowns
  const byClientData = [
    {
      client: 'Nigerian Bottling Company',
      totalPaid: 45000000,
      outstanding: 5000000,
      contractStatus: 'Active',
      trend: 12,
      color: 'primary'
    },
    {
      client: 'Lagos State Government',
      totalPaid: 38000000,
      outstanding: 2000000,
      contractStatus: 'Active',
      trend: 8,
      color: 'success'
    },
    {
      client: 'Shoprite Nigeria',
      totalPaid: 28000000,
      outstanding: 3000000,
      contractStatus: 'Active',
      trend: -5,
      color: 'warning'
    },
    {
      client: 'Dangote Group',
      totalPaid: 22000000,
      outstanding: 0,
      contractStatus: 'Completed',
      trend: 15,
      color: 'info'
    }
  ];

  const byContractTypeData = [
    {
      type: 'Scheduled Collection',
      icon: <IconCalendar size={20} />,
      revenue: 85000000,
      volume: 450000,
      avgTicket: 188888,
      percentage: 45,
      color: 'primary'
    },
    {
      type: 'One-time Collection',
      icon: <IconTruck size={20} />,
      revenue: 52000000,
      volume: 280000,
      avgTicket: 185714,
      percentage: 28,
      color: 'success'
    },
    {
      type: 'Recycling Services',
      icon: <IconPackage size={20} />,
      revenue: 32000000,
      volume: 180000,
      avgTicket: 177777,
      percentage: 17,
      color: 'warning'
    },
    {
      type: 'Disposal Services',
      icon: <IconFileText size={20} />,
      revenue: 16420000,
      volume: 90000,
      avgTicket: 182444,
      percentage: 10,
      color: 'info'
    }
  ];

  const byLocationData = [
    {
      location: 'Lagos Mainland',
      revenue: 72000000,
      volume: 280000,
      clients: 45,
      percentage: 39,
      color: 'primary'
    },
    {
      location: 'Lagos Island',
      revenue: 58000000,
      volume: 220000,
      clients: 38,
      percentage: 31,
      color: 'success'
    },
    {
      location: 'Abuja',
      revenue: 32000000,
      volume: 150000,
      clients: 22,
      percentage: 17,
      color: 'warning'
    },
    {
      location: 'Port Harcourt',
      revenue: 23420000,
      volume: 100000,
      clients: 18,
      percentage: 13,
      color: 'info'
    }
  ];

  const byTimeData = [
    {
      period: 'January 2024',
      revenue: 28500000,
      growth: 12,
      trend: 'up',
      color: 'primary'
    },
    {
      period: 'December 2023',
      revenue: 25400000,
      growth: 8,
      trend: 'up',
      color: 'success'
    },
    {
      period: 'November 2023',
      revenue: 23500000,
      growth: -3,
      trend: 'down',
      color: 'warning'
    },
    {
      period: 'October 2023',
      revenue: 24200000,
      growth: 5,
      trend: 'up',
      color: 'info'
    }
  ];

  const getProgressColor = (color: string) => {
    switch (color) {
      case 'primary': return 'primary.main';
      case 'success': return 'success.main';
      case 'warning': return 'warning.main';
      case 'info': return 'info.main';
      default: return 'grey.500';
    }
  };

  const getBgColor = (color: string) => {
    switch (color) {
      case 'primary': return 'primary.light';
      case 'success': return 'success.light';
      case 'warning': return 'warning.light';
      case 'info': return 'info.light';
      default: return 'grey.100';
    }
  };

  return (
    <DashboardCard title="Payment Breakdown">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Payment breakdown tabs">
          <Tab label="By Client" />
          <Tab label="By Contract Type" />
          <Tab label="By Location" />
          <Tab label="By Time" />
        </Tabs>
      </Box>

      {/* By Client Tab */}
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          {byClientData.map((client, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Card
                variant="outlined"
                sx={{
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {client.client}
                        </Typography>
                        <Chip
                          size="small"
                          label={client.contractStatus}
                          color={client.contractStatus === 'Active' ? 'success' : 'default'}
                          variant="outlined"
                        />
                      </Box>
                      <Chip
                        size="small"
                        label={`${client.trend > 0 ? '+' : ''}${client.trend}%`}
                        color={client.trend > 0 ? 'success' : 'error'}
                        variant="outlined"
                        icon={client.trend > 0 ? <IconTrendingUp size={14} /> : <IconTrendingDown size={14} />}
                      />
                    </Stack>

                    <Stack spacing={1}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Total Paid
                        </Typography>
                        <Typography variant="h6" fontWeight={700} color="success.main">
                          ₦{client.totalPaid.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Outstanding
                        </Typography>
                        <Typography variant="body1" fontWeight={600} color="warning.main">
                          ₦{client.outstanding.toLocaleString()}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* By Contract Type Tab */}
      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
          {byContractTypeData.map((contract, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Card
                variant="outlined"
                sx={{
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: getBgColor(contract.color),
                          color: getProgressColor(contract.color),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {contract.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {contract.type}
                        </Typography>
                        <Chip
                          size="small"
                          label={`${contract.percentage}%`}
                          color={contract.color as any}
                          variant="outlined"
                        />
                      </Box>
                    </Stack>

                    <Stack spacing={1}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Revenue
                        </Typography>
                        <Typography variant="h6" fontWeight={700}>
                          ₦{contract.revenue.toLocaleString()}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={2}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Volume
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {contract.volume.toLocaleString()} kg
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Avg Ticket
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            ₦{contract.avgTicket.toLocaleString()}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>

                    <Box>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Share of revenue
                        </Typography>
                        <Typography variant="caption" fontWeight={600}>
                          {contract.percentage}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={contract.percentage}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getProgressColor(contract.color),
                          },
                        }}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* By Location Tab */}
      <TabPanel value={value} index={2}>
        <Grid container spacing={2}>
          {byLocationData.map((location, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Card
                variant="outlined"
                sx={{
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <IconMapPin size={24} color={getProgressColor(location.color)} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {location.location}
                        </Typography>
                        <Chip
                          size="small"
                          label={`${location.percentage}%`}
                          color={location.color as any}
                          variant="outlined"
                        />
                      </Box>
                    </Stack>

                    <Stack spacing={1}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Revenue Generated
                        </Typography>
                        <Typography variant="h6" fontWeight={700}>
                          ₦{location.revenue.toLocaleString()}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={2}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Volume
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {location.volume.toLocaleString()} kg
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Clients
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {location.clients}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>

                    <Box>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Share of revenue
                        </Typography>
                        <Typography variant="caption" fontWeight={600}>
                          {location.percentage}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={location.percentage}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getProgressColor(location.color),
                          },
                        }}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* By Time Tab */}
      <TabPanel value={value} index={3}>
        <Grid container spacing={2}>
          {byTimeData.map((period, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Card
                variant="outlined"
                sx={{
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {period.period}
                        </Typography>
                        <Chip
                          size="small"
                          label={`${period.growth > 0 ? '+' : ''}${period.growth}%`}
                          color={period.growth > 0 ? 'success' : 'error'}
                          variant="outlined"
                          icon={period.trend === 'up' ? <IconTrendingUp size={14} /> : <IconTrendingDown size={14} />}
                        />
                      </Box>
                      <IconCalendar size={20} color="text.secondary" />
                    </Stack>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Revenue
                      </Typography>
                      <Typography variant="h6" fontWeight={700} color="primary.main">
                        ₦{period.revenue.toLocaleString()}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={2}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Growth Rate
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {period.growth > 0 ? '+' : ''}{period.growth}%
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Trend
                        </Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          {period.trend === 'up' ? <IconTrendingUp size={14} color="green" /> : <IconTrendingDown size={14} color="red" />}
                          <Typography variant="body2" fontWeight={600}>
                            {period.trend}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </DashboardCard>
  );
};

export default PaymentBreakdownTabs;
