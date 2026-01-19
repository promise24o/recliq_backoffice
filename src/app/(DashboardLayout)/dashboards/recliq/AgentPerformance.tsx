import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  LinearProgress,
  Stack,
  Chip,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  IconStar,
  IconClock,
  IconCircleCheck,
  IconTrendingUp,
  IconTrendingDown,
  IconTruck,
  IconLeaf,
  IconMapPin,
} from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

interface AgentPerformanceProps {
  isLoading?: boolean;
}

const AgentPerformance = ({ isLoading }: AgentPerformanceProps) => {
  const topAgents = [
    {
      name: 'John A.',
      pickups: 42,
      rating: 4.9,
      earnings: '₦320k',
      completion: '96%',
      avgTime: '38m',
      avatar: 'JA',
      area: 'Lagos Mainland',
      materials: ['Plastic', 'Metal'],
      ecoScore: 92,
      co2Saved: '1.2t',
    },
    {
      name: 'Musa K.',
      pickups: 38,
      rating: 4.7,
      earnings: '₦295k',
      completion: '94%',
      avgTime: '41m',
      avatar: 'MK',
      area: 'Abuja Central',
      materials: ['E-waste', 'Paper'],
      ecoScore: 88,
      co2Saved: '0.9t',
    },
    {
      name: 'Blessing O.',
      pickups: 35,
      rating: 4.8,
      earnings: '₦280k',
      completion: '95%',
      avgTime: '39m',
      avatar: 'BO',
      area: 'Port Harcourt',
      materials: ['Glass', 'Organic'],
      ecoScore: 90,
      co2Saved: '1.0t',
    },
  ];

  const efficiencyMetrics = [
    {
      title: 'Avg Collection Time',
      value: '12 mins',
      subtitle: 'Speed from job assignment to arrival',
      percentage: 85,
      trend: -5,
      color: 'success',
      insight: 'Improved routing & agent proximity',
    },
    {
      title: 'Material Dispute Rate',
      value: '2.3%',
      subtitle: 'Weight & material quality disputes',
      percentage: 2.3,
      trend: -0.5,
      color: 'error',
      insight: 'Down due to better agent training',
    },
    {
      title: 'Collection Completion',
      value: '94.2%',
      subtitle: 'Jobs successfully completed',
      percentage: 94.2,
      trend: 2.1,
      color: 'primary',
      insight: 'Healthy operational reliability',
    },
  ];

  const renderStars = (rating: number) => (
    <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="flex-end">
      <IconStar size={14} color="#FFD700" fill="#FFD700" />
      <Typography variant="body2" fontWeight={600}>
        {rating}
      </Typography>
    </Stack>
  );

  if (isLoading) {
    return (
      <DashboardCard title="Agent Performance">
        <Box sx={{ height: 280, bgcolor: 'grey.100', borderRadius: 2 }} />
      </DashboardCard>
    );
  }

  return (
      <Grid container spacing={3}>
        {/* Top Agents */}
        <Grid size={{ xs: 12, lg: 12 }}>
          <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
            Top Recycling Agents
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Highest performing agents based on reliability, earnings, and environmental impact
          </Typography>

          <Card sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 'auto' }}>
                <Table size="small" sx={{ 
                  '& .MuiTableCell-root': {
                    py: 2,
                    px: 1.5,
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                  },
                  '& .MuiTableCell-head': {
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: 'text.primary',
                    bgcolor: 'grey.50'
                  }
                }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ minWidth: 200 }}>Agent</TableCell>
                      <TableCell align="center" sx={{ minWidth: 80 }}>Collections</TableCell>
                      <TableCell align="center" sx={{ minWidth: 80 }}>Rating</TableCell>
                      <TableCell align="center" sx={{ minWidth: 90 }}>Avg Time</TableCell>
                      <TableCell align="center" sx={{ minWidth: 80 }}>Success</TableCell>
                      <TableCell align="center" sx={{ minWidth: 100 }}>Eco Score</TableCell>
                      <TableCell align="center" sx={{ minWidth: 90 }}>Earnings</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topAgents.map((agent, index) => (
                      <TableRow 
                        key={index} 
                        hover 
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'grey.50'
                          }
                        }}
                      >
                        <TableCell>
                          <Stack spacing={1}>
                            <Stack direction="row" spacing={1.5} alignItems="center">
                              <Avatar
                                sx={{
                                  width: 36,
                                  height: 36,
                                  bgcolor: 'primary.main',
                                  fontSize: '0.85rem',
                                  fontWeight: 600,
                                }}
                              >
                                {agent.avatar}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                                  {agent.name}
                                </Typography>
                                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.25 }}>
                                  <IconMapPin size={11} />
                                  <Typography variant="caption" color="text.secondary">
                                    {agent.area}
                                  </Typography>
                                </Stack>
                              </Box>
                            </Stack>

                            <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                              {agent.materials.map((m, i) => (
                                <Chip key={i} size="small" label={m} sx={{ height: 20 }} />
                              ))}
                            </Stack>
                          </Stack>
                        </TableCell>

                        <TableCell align="center">
                          <Typography variant="body2" fontWeight={600}>
                            {agent.pickups}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          {renderStars(agent.rating)}
                        </TableCell>

                        <TableCell align="center">
                          <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center">
                            <IconClock size={13} />
                            <Typography variant="body2">{agent.avgTime}</Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="center">
                          <Chip size="small" label={agent.completion} color="success" variant="outlined" />
                        </TableCell>

                        <TableCell align="center">
                          <Tooltip title="Environmental Impact Score">
                            <Stack spacing={0.5} alignItems="center">
                              <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center">
                                <IconLeaf size={13} />
                                <Typography variant="body2" fontWeight={600}>
                                  {agent.ecoScore}
                                </Typography>
                              </Stack>
                              <Typography variant="caption" color="text.secondary">
                                {agent.co2Saved} CO₂
                              </Typography>
                            </Stack>
                          </Tooltip>
                        </TableCell>

                        <TableCell align="center">
                          <Typography variant="body2" fontWeight={700} color="success.main">
                            {agent.earnings}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Efficiency */}
        <Grid size={{ xs: 12, lg: 12 }}>
          <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
            Collection Efficiency
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Platform-wide agent efficiency and quality indicators
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }} >
            {efficiencyMetrics.map((metric, index) => (
              <Grid size={{ xs: 4 }} key={index}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent>
                    <Stack spacing={1.2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: `${metric.color}.main` }}
                          >
                            {metric.value}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {metric.title}
                          </Typography>
                        </Box>

                        <Stack direction="row" spacing={0.5} alignItems="center">
                          {metric.trend > 0 ? (
                            <IconTrendingUp size={14} />
                          ) : (
                            <IconTrendingDown size={14} />
                          )}
                          <Typography
                            variant="caption"
                            fontWeight={600}
                            color={metric.trend > 0 ? 'success.main' : 'error.main'}
                          >
                            {Math.abs(metric.trend)}%
                          </Typography>
                        </Stack>
                      </Stack>

                      <Typography variant="caption" color="text.secondary">
                        {metric.subtitle}
                      </Typography>

                      <LinearProgress
                        variant="determinate"
                        value={metric.percentage}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: `${metric.color}.main`,
                          },
                        }}
                      />

                      <Typography variant="caption" color="text.secondary">
                        {metric.insight}
                      </Typography>

                      <Divider />

                      <Stack direction="row" spacing={1}>
                        <Chip size="small" icon={<IconCircleCheck size={14} />} label="Verified Data" />
                        <Chip size="small" icon={<IconTruck size={14} />} label="Active Fleet" />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
  );
};

export default AgentPerformance;
