'use client'
import React from 'react';
import { Box, Typography, Card, CardContent, LinearProgress, Stack, Chip } from '@mui/material';
import DashboardCard from '@/app/components/shared/DashboardCard';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface FunnelData {
  stage: string;
  count: number;
  percentage: number;
  breakdown: {
    pickup: number;
    dropoff: number;
    auto: number;
    userSelected: number;
  };
}

interface PickupRequestFunnelProps {
  data: FunnelData[];
}

const PickupRequestFunnel: React.FC<PickupRequestFunnelProps> = ({ data }) => {
  // Chart options for funnel visualization
  const funnelChartOptions = {
    chart: {
      type: 'bar' as const,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true,
        dataLabels: {
          position: 'right'
        }
      }
    },
    colors: ['#2196f3', '#1976d2', '#1565c0', '#0d47a1', '#01579b', '#004d40'],
    xaxis: {
      categories: data.map(d => d.stage),
      labels: {
        formatter: function (val: string) {
          return val;
        }
      }
    },
    yaxis: {
      labels: {
        show: true
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opt: any) {
        return `${val} (${opt.w.globals.labels[opt.dataPointIndex]})`;
      },
      dropShadow: {
        enabled: true
      }
    },
    tooltip: {
      custom: function ({ dataPointIndex, w }: any) {
        const point = data[dataPointIndex];
        return `
          <div style="padding: 10px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="font-weight: 600; margin-bottom: 8px;">${point.stage}</div>
            <div style="margin-bottom: 4px;">Total: ${point.count} (${point.percentage}%)</div>
            <div style="font-size: 12px; color: #666;">
              <div>Pickup: ${point.breakdown.pickup}</div>
              <div>Drop-off: ${point.breakdown.dropoff}</div>
              <div>Auto: ${point.breakdown.auto}</div>
              <div>User Selected: ${point.breakdown.userSelected}</div>
            </div>
          </div>
        `;
      }
    }
  };

  const funnelChartData = data.map(d => d.count);

  return (
    <DashboardCard title="Pickup Request Flow Funnel">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📊 Request breakdown analysis - Where pickups succeed or fail
          </Typography>
        </Box>
        
        {/* Funnel Chart */}
        <Box sx={{ height: 350, mb: 3 }}>
          <Chart
            options={funnelChartOptions}
            series={[{ data: funnelChartData }]}
            type="bar"
            height={350}
          />
        </Box>

        {/* Breakdown by Mode and Type */}
        <Stack spacing={2}>
          <Typography variant="subtitle2" fontWeight={600}>
            Breakdown Analysis
          </Typography>
          
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Chip 
              label={`Pickup: ${data[data.length - 1].breakdown.pickup}`} 
              size="small" 
              color="primary" 
            />
            <Chip 
              label={`Drop-off: ${data[data.length - 1].breakdown.dropoff}`} 
              size="small" 
              color="secondary" 
            />
            <Chip 
              label={`Auto-matched: ${data[data.length - 1].breakdown.auto}`} 
              size="small" 
              color="info" 
            />
            <Chip 
              label={`User-selected: ${data[data.length - 1].breakdown.userSelected}`} 
              size="small" 
              color="warning" 
            />
          </Stack>

          {/* Conversion Rate */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Overall Conversion Rate
            </Typography>
            <LinearProgress
              variant="determinate"
              value={data[data.length - 1].percentage}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="text.secondary">
              {data[data.length - 1].percentage}% of requests completed
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </DashboardCard>
  );
};

export default PickupRequestFunnel;
