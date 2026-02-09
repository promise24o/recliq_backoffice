'use client'
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Stack, LinearProgress, Avatar } from '@mui/material';
import { IconLeaf, IconRecycle, IconWorld } from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AgentPerformance {
  id: string;
  name: string;
  ecoScore: number;
}

interface EnvironmentalImpactProps {
  agents: AgentPerformance[];
}

const EnvironmentalImpact: React.FC<EnvironmentalImpactProps> = ({ agents }) => {
  // Mock environmental data
  const totalWasteCollected = 45678; // kg
  const co2Saved = 123456; // kg CO2 equivalent
  const sdgContributions = [
    { goal: 'SDG 11: Sustainable Cities', impact: 85 },
    { goal: 'SDG 12: Responsible Consumption', impact: 92 },
    { goal: 'SDG 13: Climate Action', impact: 78 },
    { goal: 'SDG 8: Decent Work', impact: 88 }
  ];

  // Material breakdown (mock data)
  const materialBreakdown = [
    { material: 'Plastic', amount: 15678, percentage: 34.3 },
    { material: 'Paper', amount: 12345, percentage: 27.0 },
    { material: 'Metal', amount: 8901, percentage: 19.5 },
    { material: 'Glass', amount: 5678, percentage: 12.4 },
    { material: 'Organic', amount: 3076, percentage: 6.7 }
  ];

  // ApexCharts options for material breakdown
  const materialChartOptions = {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: materialBreakdown.map(item => item.material)
    },
    yaxis: {
      title: {
        text: 'Amount (kg)'
      }
    },
    tooltip: {
      y: {
        formatter: function(value: number, opts: any) {
          const item = materialBreakdown[opts.dataPointIndex];
          return `${value.toLocaleString()} kg (${item.percentage}%)`;
        }
      }
    },
    colors: ['#4CAF50']
  };

  const materialChartSeries = [{
    name: 'Amount (kg)',
    data: materialBreakdown.map(item => item.amount)
  }];

  // ApexCharts options for SDG contributions
  const sdgChartOptions = {
    chart: {
      type: 'radialBar' as const,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '30%',
        },
        track: {
          background: '#f3f3f3',
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: '22px',
          }
        }
      }
    },
    labels: sdgContributions.map(sdg => sdg.goal.split(':')[1].trim()),
    colors: ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800']
  };

  const sdgChartSeries = sdgContributions.map(sdg => sdg.impact);

  return (
    <DashboardCard title="Environmental Impact (Agent-driven)">
      <CardContent>
        <Grid container spacing={3}>
          {/* Impact Overview */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              <Card variant="outlined">
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <IconRecycle size={20} />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" fontWeight={700} color="success.main">
                        {totalWasteCollected.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        kg Waste Collected
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                      <IconWorld size={20} />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" fontWeight={700} color="info.main">
                        {co2Saved.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        kg CO₂ Saved
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Material Breakdown */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h6" gutterBottom>
              Material Collection Breakdown
            </Typography>
            <Box sx={{ height: 250 }}>
              <Chart
                options={materialChartOptions}
                series={materialChartSeries}
                type="bar"
                height={250}
              />
            </Box>
          </Grid>

          {/* SDG Contributions */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              SDG Contribution
            </Typography>
            <Box sx={{ height: 250 }}>
              <Chart
                options={sdgChartOptions}
                series={sdgChartSeries}
                type="radialBar"
                height={250}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              {sdgContributions.map((sdg, index) => (
                <Stack key={sdg.goal} direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="caption">{sdg.goal.split(':')[1].trim()}</Typography>
                  <Typography variant="caption" color="success.main">
                    {sdg.impact}%
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Grid>

          {/* Top Eco Performers */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              Top Eco Performers 🌱
            </Typography>
            <Stack spacing={2}>
              {agents
                .sort((a, b) => b.ecoScore - a.ecoScore)
                .slice(0, 5)
                .map((agent) => (
                  <Card key={agent.id} variant="outlined" sx={{ p: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: 'success.main' }}>
                        <IconLeaf size={16} />
                      </Avatar>
                      <Box flex={1}>
                        <Typography variant="body2" fontWeight={600}>
                          {agent.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Eco Score: {agent.ecoScore}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={agent.ecoScore}
                        color="success"
                        sx={{ width: 60, height: 4, borderRadius: 2 }}
                      />
                    </Stack>
                  </Card>
                ))}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </DashboardCard>
  );
};

export default EnvironmentalImpact;
