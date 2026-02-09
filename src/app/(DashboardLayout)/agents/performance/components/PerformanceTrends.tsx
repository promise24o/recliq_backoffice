'use client'
import React from 'react';
import { Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DashboardCard from '@/app/components/shared/DashboardCard';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface PerformanceTrend {
  date: string;
  pickups: number;
  completionRate: number;
  avgResponseTime: number;
  disputeRate: number;
}

interface PerformanceTrendsProps {
  trends: PerformanceTrend[];
  period: string;
}

const PerformanceTrends: React.FC<PerformanceTrendsProps> = ({ trends, period }) => {
  // Format data for charts
  const chartData = trends.map(trend => ({
    ...trend,
    date: new Date(trend.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    responseTime: trend.avgResponseTime,
    disputes: trend.disputeRate * 10 // Scale up for visibility
  }));

  // ApexCharts options for main trends
  const trendsChartOptions = {
    chart: {
      type: 'line' as const,
      toolbar: { show: false }
    },
    stroke: {
      curve: 'smooth' as const,
      width: 2
    },
    xaxis: {
      categories: chartData.map(d => d.date)
    },
    yaxis: [
      {
        title: { text: 'Pickups / Rate (%)' },
        opposite: false
      },
      {
        title: { text: 'Response Time (mins)' },
        opposite: true
      }
    ],
    tooltip: {
      shared: true,
      intersect: false
    },
    legend: {
      position: 'top' as const,
      horizontalAlign: 'right' as const
    },
    colors: ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c']
  };

  const trendsChartSeries = [
    {
      name: 'Pickups',
      data: chartData.map(d => d.pickups)
    },
    {
      name: 'Completion Rate (%)',
      data: chartData.map(d => d.completionRate)
    },
    {
      name: 'Avg Response (mins)',
      data: chartData.map(d => d.responseTime)
    },
    {
      name: 'Dispute Rate (x10)',
      data: chartData.map(d => d.disputes)
    }
  ];

  // ApexCharts options for area chart
  const areaChartOptions = {
    chart: {
      type: 'area' as const,
      toolbar: { show: false },
      stacked: true
    },
    stroke: {
      curve: 'smooth' as const,
      width: 2
    },
    xaxis: {
      categories: chartData.map(d => d.date)
    },
    yaxis: {
      title: { text: 'Count / Rate' }
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    fill: {
      type: 'gradient' as const,
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.3
      }
    },
    colors: ['#8884d8', '#82ca9d']
  };

  const areaChartSeries = [
    {
      name: 'Pickups',
      data: chartData.map(d => d.pickups)
    },
    {
      name: 'Completion Rate',
      data: chartData.map(d => d.completionRate)
    }
  ];

  return (
    <DashboardCard title="Performance Trends">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Pickups vs Completion Rate
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Overlays: Avg Response Time, Dispute Rate
          </Typography>
        </Box>
        
        <Box sx={{ height: 300 }}>
          <Chart
            options={trendsChartOptions}
            series={trendsChartSeries}
            type="line"
            height={300}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Performance Distribution
          </Typography>
          <Box sx={{ height: 200 }}>
            <Chart
              options={areaChartOptions}
              series={areaChartSeries}
              type="area"
              height={200}
            />
          </Box>
        </Box>
      </CardContent>
    </DashboardCard>
  );
};

export default PerformanceTrends;
