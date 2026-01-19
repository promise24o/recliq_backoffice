import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import {
  IconTruck,
  IconClock,
  IconCircleCheck,
  IconCircle,
  IconMapPin,
  IconAlertTriangle,
  IconTrendingUp,
  IconUsers,
} from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

interface OperationsSnapshotProps {
  isLoading?: boolean;
}

const OperationsSnapshot = ({ isLoading }: OperationsSnapshotProps) => {
  const pickupStats = [
    {
      title: 'Completed Pickups',
      value: '1,284',
      subtitle: 'Successful jobs',
      icon: <IconCircleCheck size={22} />,
      color: 'success',
      percentage: 93,
      trend: '+6%',
    },
    {
      title: 'Cancelled Pickups',
      value: '86',
      subtitle: 'User / agent cancelled',
      icon: <IconCircle size={22} />,
      color: 'error',
      percentage: 7,
      trend: '-2%',
    },
    {
      title: 'Avg Pickup Time',
      value: '42 mins',
      subtitle: 'Job acceptance → completion',
      icon: <IconClock size={22} />,
      color: 'warning',
      percentage: 75,
      trend: '+3%',
    },
    {
      title: 'Success Rate',
      value: '93%',
      subtitle: 'Completed vs assigned',
      icon: <IconTruck size={22} />,
      color: 'primary',
      percentage: 93,
      trend: '+1%',
    },
  ];

  const locationData = [
    {
      location: 'Port Harcourt South',
      pickups: 487,
      percentage: 38,
      avgTime: '39m',
      activeAgents: 42,
      successRate: '95%',
    },
    {
      location: 'Obio/Akpor',
      pickups: 346,
      percentage: 27,
      avgTime: '44m',
      activeAgents: 36,
      successRate: '92%',
    },
    {
      location: 'Eleme',
      pickups: 231,
      percentage: 18,
      avgTime: '48m',
      activeAgents: 28,
      successRate: '90%',
    },
    {
      location: 'Oyigbo',
      pickups: 218,
      percentage: 17,
      avgTime: '46m',
      activeAgents: 25,
      successRate: '91%',
    },
  ];

  if (isLoading) {
    return (
      <DashboardCard title="Operations Snapshot">
        <Box sx={{ height: 220, bgcolor: 'grey.100', borderRadius: 2 }} />
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="Operations Snapshot">
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        {/* Pickups Overview */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
            Pickups Overview
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Real-time operational health and efficiency metrics
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {pickupStats.map((stat, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Stack spacing={1.5}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography
                            variant="h4"
                            sx={{ fontWeight: 700, color: `${stat.color}.main` }}
                          >
                            {stat.value}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary">
                            {stat.title}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: '50%',
                            bgcolor: `${stat.color}.light`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: `${stat.color}.main`,
                          }}
                        >
                          {stat.icon}
                        </Box>
                      </Stack>

                      <Typography variant="caption" color="text.secondary">
                        {stat.subtitle}
                      </Typography>

                      <LinearProgress
                        variant="determinate"
                        value={stat.percentage}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: `${stat.color}.main`,
                          },
                        }}
                      />

                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" color="text.secondary">
                          Performance
                        </Typography>
                        <Chip
                          size="small"
                          icon={<IconTrendingUp size={14} />}
                          label={stat.trend}
                          color={stat.color as any}
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Location Performance */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Typography
            variant="h6"
            sx={{ mb: 0.5, fontWeight: 600, display: 'flex', alignItems: 'center' }}
          >
            <IconMapPin size={18} style={{ marginRight: 6 }} />
            Location Performance
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Pickup distribution and efficiency by area
          </Typography>

          <Card
            sx={{
              mt: 2,
              height: 'calc(100% - 60px)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: 2,
              }}
            >
              <TableContainer
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                }}
              >
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Location</TableCell>
                      <TableCell align="right">Pickups</TableCell>
                      <TableCell align="right">Agents</TableCell>
                      <TableCell align="right">Avg Time</TableCell>
                      <TableCell align="right">Success</TableCell>
                      <TableCell align="right">Share</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {locationData.map((row, index) => (
                      <TableRow key={index} hover>
                        <TableCell sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                          {row.location}
                        </TableCell>
                        <TableCell align="right">{row.pickups}</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                            <IconUsers size={14} />
                            <Typography variant="body2">{row.activeAgents}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">{row.avgTime}</TableCell>
                        <TableCell align="right">
                          <Chip
                            size="small"
                            label={row.successRate}
                            color="success"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color="primary.main"
                          >
                            {row.percentage}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" spacing={1}>
                <Chip
                  size="small"
                  icon={<IconAlertTriangle size={14} />}
                  label="High demand zones"
                  color="warning"
                />
                <Chip size="small" label="Live tracking" color="success" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default OperationsSnapshot;
