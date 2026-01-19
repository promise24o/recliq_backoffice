'use client'
import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Grid, Card, CardContent, Stack, LinearProgress, Chip } from '@mui/material';
import { IconUser, IconPackage, IconCube, IconMapPin } from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

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
      id={`commission-tabpanel-${index}`}
      aria-labelledby={`commission-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const CommissionBreakdownTabs: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Mock data for different breakdowns
  const agentData = [
    { name: 'Ahmed Bello', pickups: 156, grossValue: 2450000, commission: 294000, rate: 12, avatar: 'AB' },
    { name: 'Fatima Ibrahim', pickups: 142, grossValue: 2180000, commission: 261600, rate: 12, avatar: 'FI' },
    { name: 'Chukwu Okafor', pickups: 134, grossValue: 1950000, commission: 234000, rate: 12, avatar: 'CO' },
    { name: 'Amina Yusuf', pickups: 128, grossValue: 1820000, commission: 218400, rate: 12, avatar: 'AY' },
    { name: 'Tunde Adekunle', pickups: 119, grossValue: 1680000, commission: 201600, rate: 12, avatar: 'TA' },
  ];

  const pickupTypeData = [
    { type: 'User Pickup', volume: 2456, commission: 12500000, margin: 12.5, icon: <IconUser size={20} /> },
    { type: 'B2B Pickup', volume: 1234, commission: 5800000, margin: 11.8, icon: <IconPackage size={20} /> },
    { type: 'Drop-off Handling', volume: 202, commission: 150000, margin: 8.2, icon: <IconCube size={20} /> },
  ];

  const materialTypeData = [
    { material: 'PET', totalKg: 45678, commissionPerKg: 45, totalCommission: 2055510, icon: '🍶' },
    { material: 'Metal', totalKg: 32145, commissionPerKg: 38, totalCommission: 1221510, icon: '🔧' },
    { material: 'E-waste', totalKg: 8934, commissionPerKg: 125, totalCommission: 1116750, icon: '📱' },
    { material: 'Mixed', totalKg: 23456, commissionPerKg: 25, totalCommission: 586400, icon: '🗑️' },
  ];

  const locationData = [
    { area: 'Lagos Mainland', pickups: 892, commission: 8450000, avgCommission: 9472, avatar: 'LM' },
    { area: 'Lagos Island', pickups: 654, commission: 6230000, avgCommission: 9526, avatar: 'LI' },
    { area: 'Abuja', pickups: 445, commission: 2120000, avgCommission: 4764, avatar: 'ABJ' },
    { area: 'Port Harcourt', pickups: 321, commission: 1650000, avgCommission: 5140, avatar: 'PH' },
  ];

  const renderByAgent = () => (
    <Grid container spacing={3}>
      {agentData.map((agent, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Card 
            variant="outlined" 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Stack spacing={2} sx={{ flex: 1 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                    }}
                  >
                    {agent.avatar}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {agent.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {agent.pickups} pickups
                    </Typography>
                  </Box>
                  <Chip 
                    size="small" 
                    label={`${agent.rate}%`}
                    color="primary"
                    variant="outlined"
                  />
                </Stack>

                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      Gross Value
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ₦{agent.grossValue.toLocaleString()}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      Commission
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      ₦{agent.commission.toLocaleString()}
                    </Typography>
                  </Stack>
                </Stack>

                <Box sx={{ mt: 'auto' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Performance
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      Top {index + 1}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={100 - (index * 20)}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'primary.main',
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
  );

  const renderByPickupType = () => (
    <Grid container spacing={3}>
      {pickupTypeData.map((type, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Card 
            variant="outlined" 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Stack spacing={2} sx={{ flex: 1 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: 'info.light',
                      color: 'info.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {type.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {type.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {type.volume} pickups
                    </Typography>
                  </Box>
                </Stack>

                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      Commission Earned
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="success.main">
                      ₦{type.commission.toLocaleString()}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      Margin
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {type.margin}%
                    </Typography>
                  </Stack>
                </Stack>

                <Box sx={{ mt: 'auto' }}>
                  <LinearProgress
                    variant="determinate"
                    value={(type.commission / 12500000) * 100}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'info.main',
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
  );

  const renderByMaterial = () => (
    <Grid container spacing={3}>
      {materialTypeData.map((material, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Card 
            variant="outlined" 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Stack spacing={2} sx={{ flex: 1 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="h4">
                    {material.icon}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {material.material}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {material.totalKg.toLocaleString()} kg total
                    </Typography>
                  </Box>
                </Stack>

                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      Commission per kg
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ₦{material.commissionPerKg}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      Total Commission
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="success.main">
                      ₦{material.totalCommission.toLocaleString()}
                    </Typography>
                  </Stack>
                </Stack>

                <Box sx={{ mt: 'auto' }}>
                  <LinearProgress
                    variant="determinate"
                    value={(material.totalCommission / 2055510) * 100}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'warning.main',
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
  );

  const renderByLocation = () => (
    <Grid container spacing={3}>
      {locationData.map((location, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Card 
            variant="outlined" 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Stack spacing={2} sx={{ flex: 1 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: 'secondary.light',
                      color: 'secondary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                    }}
                  >
                    {location.avatar}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {location.area}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {location.pickups} pickups
                    </Typography>
                  </Box>
                  <Chip 
                    size="small" 
                    icon={<IconMapPin size={14} />}
                    label="Active"
                    color="secondary"
                    variant="outlined"
                  />
                </Stack>

                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      Total Commission
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="success.main">
                      ₦{location.commission.toLocaleString()}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      Avg per Pickup
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ₦{location.avgCommission.toLocaleString()}
                    </Typography>
                  </Stack>
                </Stack>

                <Box sx={{ mt: 'auto' }}>
                  <LinearProgress
                    variant="determinate"
                    value={(location.commission / 8450000) * 100}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'secondary.main',
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
  );

  return (
    <DashboardCard title="Commission Breakdown">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="commission breakdown tabs">
          <Tab label="By Agent" />
          <Tab label="By Pickup Type" />
          <Tab label="By Material Type" />
          <Tab label="By Location" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {renderByAgent()}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {renderByPickupType()}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {renderByMaterial()}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {renderByLocation()}
      </TabPanel>
    </DashboardCard>
  );
};

export default CommissionBreakdownTabs;
