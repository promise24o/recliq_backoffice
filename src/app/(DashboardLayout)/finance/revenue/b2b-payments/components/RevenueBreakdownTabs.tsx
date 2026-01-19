'use client'
import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Stack, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  IconBuilding,
  IconFileDescription,
  IconMapPin,
  IconCalendar
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface RevenueBreakdownTabsProps {
  value: number;
}

const RevenueBreakdownTabs: React.FC<RevenueBreakdownTabsProps> = ({ value }) => {
  // Mock data for different tabs
  const clientData = [
    { name: 'Lagos Industries', totalPaid: 45000000, outstanding: 2500000, status: 'Active', revenue: 47500000 },
    { name: 'Port Harcourt Manufacturing', totalPaid: 32000000, outstanding: 1800000, status: 'Active', revenue: 33800000 },
    { name: 'Abuja Logistics Hub', totalPaid: 28000000, outstanding: 0, status: 'Active', revenue: 28000000 },
    { name: 'Kano Food Processing', totalPaid: 15000000, outstanding: 3200000, status: 'Active', revenue: 18200000 },
    { name: 'Ibadan Textiles Ltd', totalPaid: 12000000, outstanding: 1500000, status: 'Active', revenue: 13500000 },
  ];

  const contractTypeData = [
    { type: 'Scheduled Weekly', count: 45, revenue: 68000000, avgValue: 1511111 },
    { type: 'Scheduled Monthly', count: 28, revenue: 42000000, avgValue: 1500000 },
    { type: 'One-time Collections', count: 67, revenue: 18500000, avgValue: 276119 },
    { type: 'Disposal Only', count: 12, revenue: 8500000, avgValue: 708333 },
    { type: 'Recycling Only', count: 34, revenue: 12000000, avgValue: 352941 },
  ];

  const locationData = [
    { location: 'Lagos', revenue: 85000000, volume: 125000, clients: 12 },
    { location: 'Port Harcourt', revenue: 42000000, volume: 78000, clients: 8 },
    { location: 'Abuja', revenue: 28000000, volume: 55000, clients: 6 },
    { location: 'Kano', revenue: 18000000, volume: 42000, clients: 4 },
    { location: 'Ibadan', revenue: 13500000, volume: 28000, clients: 3 },
  ];

  const timeData = [
    { month: 'Jan 2024', revenue: 9800000, target: 10000000, growth: 12 },
    { month: 'Feb 2024', revenue: 11200000, target: 10500000, growth: 14 },
    { month: 'Mar 2024', revenue: 10800000, target: 11000000, growth: -4 },
    { month: 'Apr 2024', revenue: 12500000, target: 11500000, growth: 16 },
    { month: 'May 2024', revenue: 13200000, target: 12000000, growth: 6 },
  ];

  const renderByClient = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell align="right">Total Paid (₦)</TableCell>
            <TableCell align="right">Outstanding (₦)</TableCell>
            <TableCell align="center">Contract Status</TableCell>
            <TableCell align="right">Total Revenue (₦)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientData.map((client, index) => (
            <TableRow key={index} hover>
              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconBuilding size={16} />
                  </Box>
                  <Typography variant="body2" fontWeight={600}>
                    {client.name}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" fontWeight={600}>
                  ₦{client.totalPaid.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" color={client.outstanding > 0 ? 'warning.main' : 'success.main'}>
                  ₦{client.outstanding.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Chip 
                  size="small" 
                  label={client.status} 
                  color="success" 
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" fontWeight={600}>
                  ₦{client.revenue.toLocaleString()}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderByContractType = () => (
    <Grid container spacing={3}>
      {contractTypeData.map((contract, index) => (
        <Grid size={{ xs: 12, sm: 4, md: 4 }} key={index}>
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
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight={600}>
                    {contract.type}
                  </Typography>
                  <Chip 
                    size="small" 
                    label={`${contract.count} contracts`} 
                    color="primary" 
                    variant="outlined"
                  />
                </Stack>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="primary.main">
                    ₦{contract.revenue.toLocaleString()}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Average Value
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    ₦{contract.avgValue.toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ mt: 'auto' }}>
                  <LinearProgress
                    variant="determinate"
                    value={(contract.revenue / 68000000) * 100}
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

  const renderByLocation = () => (
    <Grid container spacing={3}>
      {locationData.map((location, index) => (
        <Grid size={{ xs: 12, sm: 4, md: 4 }} key={index}>
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
                <Stack direction="row" justifyContent="space-between" alignItems="center">
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
                    <IconMapPin size={20} />
                  </Box>
                  <Chip 
                    size="small" 
                    label={`${location.clients} clients`} 
                    color="info" 
                    variant="outlined"
                  />
                </Stack>
                
                <Typography variant="h6" fontWeight={600}>
                  {location.location}
                </Typography>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Revenue Generated
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="info.main">
                    ₦{location.revenue.toLocaleString()}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Collection Volume
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {location.volume.toLocaleString()} kg
                  </Typography>
                </Box>

                <Box sx={{ mt: 'auto' }}>
                  <LinearProgress
                    variant="determinate"
                    value={(location.revenue / 85000000) * 100}
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

  const renderByTime = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell align="right">Revenue (₦)</TableCell>
            <TableCell align="right">Target (₦)</TableCell>
            <TableCell align="center">Achievement</TableCell>
            <TableCell align="center">Growth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeData.map((month, index) => (
            <TableRow key={index} hover>
              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      bgcolor: 'secondary.light',
                      color: 'secondary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconCalendar size={16} />
                  </Box>
                  <Typography variant="body2" fontWeight={600}>
                    {month.month}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" fontWeight={600}>
                  ₦{month.revenue.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" color="text.secondary">
                  ₦{month.target.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Stack spacing={1}>
                  <Typography variant="body2" fontWeight={600}>
                    {Math.round((month.revenue / month.target) * 100)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min((month.revenue / month.target) * 100, 100)}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: month.revenue >= month.target ? 'success.main' : 'warning.main',
                      },
                    }}
                  />
                </Stack>
              </TableCell>
              <TableCell align="center">
                <Chip 
                  size="small" 
                  label={`${month.growth > 0 ? '+' : ''}${month.growth}%`}
                  color={month.growth > 0 ? 'success' : month.growth < 0 ? 'error' : 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderContent = () => {
    switch (value) {
      case 0:
        return renderByClient();
      case 1:
        return renderByContractType();
      case 2:
        return renderByLocation();
      case 3:
        return renderByTime();
      default:
        return renderByClient();
    }
  };

  return (
    <DashboardCard title="Revenue Analysis">
      {renderContent()}
    </DashboardCard>
  );
};

export default RevenueBreakdownTabs;
