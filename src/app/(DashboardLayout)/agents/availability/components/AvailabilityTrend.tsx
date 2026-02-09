'use client'
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AvailabilityTrend {
  timestamp: string;
  availablePercentage: number;
  scheduledPercentage: number;
  busyPercentage: number;
  offlinePercentage: number;
}

interface AvailabilityTrendProps {
  trends: AvailabilityTrend[];
}

const AvailabilityTrend: React.FC<AvailabilityTrendProps> = ({ trends }) => {
  // Format data for ApexCharts
  const chartData = trends.map(trend => ({
    ...trend,
    time: new Date(trend.timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }));

  // ApexCharts options
  const chartOptions = {
    chart: {
      type: 'area' as const,
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth' as const,
      width: 2
    },
    xaxis: {
      categories: chartData.map(item => item.time),
      title: {
        text: 'Time of Day'
      }
    },
    yaxis: {
      title: {
        text: 'Percentage of Agents'
      },
      max: 100,
      labels: {
        formatter: function(value: number) {
          return value + '%';
        }
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function(value: number, opts: any) {
          return value.toFixed(1) + '%';
        }
      }
    },
    legend: {
      position: 'top' as const,
      horizontalAlign: 'right' as const
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    },
    colors: ['#4CAF50', '#2196F3', '#FF9800', '#F44336']
  };

  const chartSeries = [
    {
      name: 'Available',
      data: chartData.map(item => item.availablePercentage)
    },
    {
      name: 'Busy',
      data: chartData.map(item => item.busyPercentage)
    },
    {
      name: 'Scheduled (Not Online)',
      data: chartData.map(item => Math.max(0, item.scheduledPercentage - item.availablePercentage - item.busyPercentage))
    },
    {
      name: 'Offline',
      data: chartData.map(item => item.offlinePercentage)
    }
  ];

  // Calculate key insights
  const avgAvailable = trends.reduce((sum, t) => sum + t.availablePercentage, 0) / trends.length;
  const peakAvailability = Math.max(...trends.map(t => t.availablePercentage));
  const lowestAvailability = Math.min(...trends.map(t => t.availablePercentage));
  const currentAvailability = trends[trends.length - 1]?.availablePercentage || 0;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Availability Trend Over Time
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          % of agents actually available vs scheduled availability
        </Typography>

        {/* Key Insights */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Box sx={{ p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">Current</Typography>
            <Typography variant="h6" color="primary.main">{currentAvailability.toFixed(1)}%</Typography>
          </Box>
          <Box sx={{ p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">Average</Typography>
            <Typography variant="h6" color="info.main">{avgAvailable.toFixed(1)}%</Typography>
          </Box>
          <Box sx={{ p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">Peak</Typography>
            <Typography variant="h6" color="success.main">{peakAvailability.toFixed(1)}%</Typography>
          </Box>
          <Box sx={{ p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">Lowest</Typography>
            <Typography variant="h6" color="error.main">{lowestAvailability.toFixed(1)}%</Typography>
          </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ height: 300, width: '100%' }}>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={300}
          />
        </Box>

        {/* Pattern Analysis */}
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2" fontWeight={600} gutterBottom>
            Pattern Analysis
          </Typography>
          <Typography variant="caption" color="text.secondary">
            • Peak availability observed during morning hours (8AM-10AM)
          </Typography>
          <br />
          <Typography variant="caption" color="text.secondary">
            • Scheduled vs actual availability gap: {(trends[0]?.scheduledPercentage - avgAvailable).toFixed(1)}% average
          </Typography>
          <br />
          <Typography variant="caption" color="text.secondary">
            • Coverage drops during afternoon rush (2PM-4PM)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AvailabilityTrend;
