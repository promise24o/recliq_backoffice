'use client'
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, LinearProgress, Stack } from '@mui/material';
import DashboardCard from '@/app/components/shared/DashboardCard';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AgentPerformance {
  id: string;
  name: string;
  acceptanceSpeed: number;
  disputeRate: number;
  repeatUserRate: number;
}

interface EfficiencyQualityProps {
  agents: AgentPerformance[];
}

const EfficiencyQuality: React.FC<EfficiencyQualityProps> = ({ agents }) => {
  // Acceptance Speed Distribution
  const speedDistribution = [
    { range: '0-5 mins', count: agents.filter(a => a.acceptanceSpeed <= 5).length, color: '#4CAF50' },
    { range: '5-10 mins', count: agents.filter(a => a.acceptanceSpeed > 5 && a.acceptanceSpeed <= 10).length, color: '#8BC34A' },
    { range: '10-15 mins', count: agents.filter(a => a.acceptanceSpeed > 10 && a.acceptanceSpeed <= 15).length, color: '#FFC107' },
    { range: '15+ mins', count: agents.filter(a => a.acceptanceSpeed > 15).length, color: '#FF5722' }
  ];

  // Cancellation Reasons (mock data)
  const cancellationReasons = [
    { reason: 'Distance too far', percentage: 35 },
    { reason: 'Low payout', percentage: 25 },
    { reason: 'Schedule conflict', percentage: 20 },
    { reason: 'Technical issues', percentage: 12 },
    { reason: 'Other', percentage: 8 }
  ];

  // Weight Variance Alerts
  const weightVarianceData = agents.map(agent => ({
    name: agent.name.split(' ')[0],
    variance: Math.random() * 20 - 10, // Mock variance between -10% and +10%
    status: Math.abs(Math.random() * 20 - 10) > 5 ? 'alert' : 'normal'
  }));

  // Repeat User Rate
  const avgRepeatRate = agents.reduce((sum, agent) => sum + agent.repeatUserRate, 0) / agents.length;

  const COLORS = ['#4CAF50', '#8BC34A', '#FFC107', '#FF5722', '#9E9E9E'];

  // ApexCharts options for speed distribution
  const speedChartOptions = {
    chart: {
      type: 'bar' as const,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%'
      }
    },
    xaxis: {
      categories: speedDistribution.map(d => d.range)
    },
    yaxis: {
      title: { text: 'Number of Agents' }
    },
    colors: speedDistribution.map(d => d.color)
  };

  const speedChartSeries = [{
    name: 'Agents',
    data: speedDistribution.map(d => d.count)
  }];

  // ApexCharts options for cancellation reasons
  const cancellationChartOptions = {
    chart: {
      type: 'pie' as const,
      toolbar: { show: false }
    },
    labels: cancellationReasons.map(r => r.reason),
    colors: COLORS
  };

  const cancellationChartSeries = cancellationReasons.map(r => r.percentage);

  return (
    <DashboardCard title="Efficiency & Quality">
      <CardContent>
        <Grid container spacing={3}>
          {/* Acceptance Speed Distribution */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Acceptance Speed Distribution
            </Typography>
            <Box sx={{ height: 200 }}>
              <Chart
                options={speedChartOptions}
                series={speedChartSeries}
                type="bar"
                height={200}
              />
            </Box>
          </Grid>

          {/* Cancellation Reasons */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Cancellation Reasons
            </Typography>
            <Box sx={{ height: 200 }}>
              <Chart
                options={cancellationChartOptions}
                series={cancellationChartSeries}
                type="pie"
                height={200}
              />
            </Box>
          </Grid>

          {/* Weight Variance Alerts */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Weight Variance Alerts
            </Typography>
            <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
              {weightVarianceData.map((agent, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">{agent.name}</Typography>
                    <Typography 
                      variant="body2" 
                      color={agent.status === 'alert' ? 'error.main' : 'success.main'}
                    >
                      {agent.variance > 0 ? '+' : ''}{agent.variance.toFixed(1)}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={50 + (agent.variance * 5)} // Center at 50%
                    color={agent.status === 'alert' ? 'error' : 'success'}
                    sx={{ height: 4, borderRadius: 2 }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Repeat User Rate */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Repeat User Rate
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="h4" fontWeight={600} color="primary.main">
                  {avgRepeatRate.toFixed(1)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average repeat user rate across all agents
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" gutterBottom>
                  Top Performers
                </Typography>
                {agents
                  .sort((a, b) => b.repeatUserRate - a.repeatUserRate)
                  .slice(0, 3)
                  .map((agent, index) => (
                    <Stack key={agent.id} direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="body2">{agent.name}</Typography>
                      <Typography variant="body2" color="success.main">
                        {agent.repeatUserRate}%
                      </Typography>
                    </Stack>
                  ))}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </DashboardCard>
  );
};

export default EfficiencyQuality;
