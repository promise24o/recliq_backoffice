'use client'
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Stack, LinearProgress, Chip } from '@mui/material';
import DashboardCard from '@/app/components/shared/DashboardCard';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AgentAvailability {
  id: string;
  name: string;
  city: string;
  zone: string;
  currentStatus: 'available' | 'busy' | 'idle' | 'offline' | 'suspended';
  avgAvailability: number;
  agentType: 'individual' | 'fleet';
  pickupsAcceptedWhileOnline: number;
  missedAssignments: number;
  reliabilityScore: number;
}

interface ZoneCoverage {
  zone: string;
  availableAgents: number;
  totalAgents: number;
  demandLevel: 'low' | 'medium' | 'high' | 'critical';
  coverageLevel: 'healthy' | 'strained' | 'critical' | 'dead';
  avgResponseTime: number;
}

interface AvailabilityInsightsProps {
  agents: AgentAvailability[];
  zoneCoverage: ZoneCoverage[];
}

const AvailabilityInsights: React.FC<AvailabilityInsightsProps> = ({
  agents,
  zoneCoverage
}) => {
  // Calculate insights
  const totalAgents = agents.length;
  const individualAgents = agents.filter(a => a.agentType === 'individual').length;
  const fleetAgents = agents.filter(a => a.agentType === 'fleet').length;
  
  const avgAvailability = agents.reduce((sum, a) => sum + a.avgAvailability, 0) / totalAgents;
  const highPerformers = agents.filter(a => a.avgAvailability > 85).length;
  const lowPerformers = agents.filter(a => a.avgAvailability < 60).length;
  
  const totalPickupsAccepted = agents.reduce((sum, a) => sum + a.pickupsAcceptedWhileOnline, 0);
  const totalMissedAssignments = agents.reduce((sum, a) => sum + a.missedAssignments, 0);
  const acceptanceRate = totalPickupsAccepted / (totalPickupsAccepted + totalMissedAssignments) * 100;

  // Availability vs Performance Tier
  const performanceData = [
    { tier: 'Excellent (>90%)', count: agents.filter(a => a.avgAvailability > 90).length, avgReliability: 95 },
    { tier: 'Good (75-90%)', count: agents.filter(a => a.avgAvailability >= 75 && a.avgAvailability <= 90).length, avgReliability: 82 },
    { tier: 'Fair (60-75%)', count: agents.filter(a => a.avgAvailability >= 60 && a.avgAvailability < 75).length, avgReliability: 68 },
    { tier: 'Poor (<60%)', count: agents.filter(a => a.avgAvailability < 60).length, avgReliability: 45 }
  ];

  // Fleet vs Individual behavior
  const fleetComparison = [
    { type: 'Individual', agents: individualAgents, avgAvailability: agents.filter(a => a.agentType === 'individual').reduce((sum, a) => sum + a.avgAvailability, 0) / individualAgents || 0 },
    { type: 'Fleet', agents: fleetAgents, avgAvailability: agents.filter(a => a.agentType === 'fleet').reduce((sum, a) => sum + a.avgAvailability, 0) / fleetAgents || 0 }
  ];

  // Peak hour supply gaps
  const peakHourGaps = [
    { hour: '6-8AM', demand: 25, supply: 15, gap: 40 },
    { hour: '8-10AM', demand: 45, supply: 38, gap: 16 },
    { hour: '10-12PM', demand: 35, supply: 32, gap: 9 },
    { hour: '12-2PM', demand: 30, supply: 28, gap: 7 },
    { hour: '2-4PM', demand: 40, supply: 25, gap: 38 },
    { hour: '4-6PM', demand: 50, supply: 42, gap: 16 }
  ];

  // Coverage breakdown
  const coverageBreakdown = [
    { level: 'Healthy', count: zoneCoverage.filter(z => z.coverageLevel === 'healthy').length, color: '#4CAF50' },
    { level: 'Strained', count: zoneCoverage.filter(z => z.coverageLevel === 'strained').length, color: '#FFC107' },
    { level: 'Critical', count: zoneCoverage.filter(z => z.coverageLevel === 'critical').length, color: '#FF5722' },
    { level: 'Dead', count: zoneCoverage.filter(z => z.coverageLevel === 'dead').length, color: '#D32F2F' }
  ];

  const COLORS = ['#4CAF50', '#FFC107', '#FF5722', '#D32F2F'];

  // ApexCharts options for performance data
  const performanceChartOptions = {
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
      categories: performanceData.map(d => d.tier)
    },
    yaxis: {
      title: { text: 'Number of Agents' }
    },
    colors: ['#4CAF50']
  };

  const performanceChartSeries = [{
    name: 'Agents',
    data: performanceData.map(d => d.count)
  }];

  // Fleet comparison chart
  const fleetChartOptions = {
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
      categories: fleetComparison.map(d => d.type)
    },
    yaxis: {
      title: { text: 'Average Availability %' }
    },
    colors: ['#2196F3']
  };

  const fleetChartSeries = [{
    name: 'Avg Availability',
    data: fleetComparison.map(d => d.avgAvailability)
  }];

  // Peak hour gaps chart
  const peakHourChartOptions = {
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
      categories: peakHourGaps.map(d => d.hour)
    },
    yaxis: {
      title: { text: 'Number of Assignments' }
    },
    colors: ['#FF9800', '#4CAF50', '#F44336']
  };

  const peakHourChartSeries = [
    { name: 'Demand', data: peakHourGaps.map(d => d.demand) },
    { name: 'Supply', data: peakHourGaps.map(d => d.supply) },
    { name: 'Gap', data: peakHourGaps.map(d => d.gap) }
  ];

  // Coverage pie chart
  const coverageChartOptions = {
    chart: {
      type: 'pie' as const,
      toolbar: { show: false }
    },
    labels: coverageBreakdown.map(c => c.level),
    colors: COLORS
  };

  const coverageChartSeries = coverageBreakdown.map(c => c.count);

  return (
    <DashboardCard title="Availability Insights & Breakdowns">
      <CardContent>
        <Grid container spacing={3}>
          {/* Availability vs Performance Tier */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Availability vs Performance Tier
            </Typography>
            <Box sx={{ height: 200 }}>
              <Chart
                options={performanceChartOptions}
                series={performanceChartSeries}
                type="bar"
                height={200}
              />
            </Box>
          </Grid>

          {/* Fleet vs Individual */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Fleet vs Individual Agent Behavior
            </Typography>
            <Box sx={{ height: 200 }}>
              <Chart
                options={fleetChartOptions}
                series={fleetChartSeries}
                type="bar"
                height={200}
              />
            </Box>
          </Grid>

          {/* Peak Hour Supply Gaps */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h6" gutterBottom>
              Peak-Hour Supply Gaps
            </Typography>
            <Box sx={{ height: 200 }}>
              <Chart
                options={peakHourChartOptions}
                series={peakHourChartSeries}
                type="bar"
                height={200}
              />
            </Box>
          </Grid>

          {/* Coverage Breakdown */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              Zone Coverage Breakdown
            </Typography>
            <Box sx={{ height: 200 }}>
              <Chart
                options={coverageChartOptions}
                series={coverageChartSeries}
                type="pie"
                height={200}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              {coverageBreakdown.map((coverage, index) => (
                <Stack key={coverage.level} direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%',
                        bgcolor: COLORS[index % COLORS.length]
                      }} 
                    />
                    <Typography variant="caption">{coverage.level}</Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {coverage.count} zones
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Grid>

          {/* Key Insights */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>
              Key Insights
            </Typography>
            <Stack spacing={2}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight={600} color="primary.main">
                  Why do pickups fail in this city?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Supply gaps most severe during 6-8AM and 2-4PM (40% gap)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Dead zones in Port Harcourt and Kano Municipal areas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Individual agents show 12% higher availability than fleets
                </Typography>
              </Card>

              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight={600} color="info.main">
                  Are incentives changing agent behavior?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • High performers (&gt;90% availability) show 95% reliability score
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {lowPerformers} agents below 60% availability may need intervention
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Acceptance rate: {acceptanceRate.toFixed(1)}% (target: &gt;90%)
                </Typography>
              </Card>

              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight={600} color="warning.main">
                  Is growth outpacing supply readiness?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {highPerformers} agents consistently excellent performance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Average availability: {avgAvailability.toFixed(1)}% (target: &gt;80%)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Consider recruitment incentives for critical zones
                </Typography>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </DashboardCard>
  );
};

export default AvailabilityInsights;
