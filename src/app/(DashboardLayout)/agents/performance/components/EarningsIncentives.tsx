'use client'
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Stack, LinearProgress } from '@mui/material';
import DashboardCard from '@/app/components/shared/DashboardCard';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AgentPerformance {
  id: string;
  name: string;
  earnings: number;
}

interface EarningsIncentivesProps {
  agents: AgentPerformance[];
}

const EarningsIncentives: React.FC<EarningsIncentivesProps> = ({ agents }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Earnings by agent (top 10)
  const topEarners = agents
    .sort((a, b) => b.earnings - a.earnings)
    .slice(0, 10)
    .map(agent => ({
      name: agent.name.split(' ')[0],
      earnings: agent.earnings
    }));

  // Mock bonuses and penalties data
  const bonusesData = [
    { type: 'Performance Bonus', amount: 2450000, count: 45 },
    { type: 'Eco Warrior Bonus', amount: 1680000, count: 28 },
    { type: 'Perfect Attendance', amount: 980000, count: 19 },
    { type: 'Customer Service', amount: 735000, count: 15 },
    { type: 'Weekend Warrior', amount: 490000, count: 12 }
  ];

  const penaltiesData = [
    { type: 'Late Cancellation', amount: -245000, count: 8 },
    { type: 'Weight Discrepancy', amount: -147000, count: 5 },
    { type: 'Customer Complaint', amount: -73500, count: 3 },
    { type: 'Route Deviation', amount: -49000, count: 2 }
  ];

  // Payout success rate (mock data)
  const payoutSuccessRate = 96.8;
  const totalPayouts = agents.reduce((sum, agent) => sum + agent.earnings, 0);
  const failedPayouts = totalPayouts * (1 - payoutSuccessRate / 100);

  const COLORS = ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#FF5722'];

  // ApexCharts options for top earners
  const topEarnersOptions = {
    chart: {
      type: 'bar' as const,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '60%'
      }
    },
    xaxis: {
      categories: topEarners.map(e => e.name)
    },
    yaxis: {
      title: { text: 'Earnings (₦)' }
    },
    tooltip: {
      y: {
        formatter: function(value: number) {
          return formatCurrency(value);
        }
      }
    },
    colors: ['#4CAF50']
  };

  const topEarnersSeries = [{
    name: 'Earnings',
    data: topEarners.map(e => e.earnings)
  }];

  // ApexCharts options for bonuses
  const bonusesOptions = {
    chart: {
      type: 'pie' as const,
      toolbar: { show: false }
    },
    labels: bonusesData.map(b => b.type),
    colors: COLORS,
    tooltip: {
      y: {
        formatter: function(value: number) {
          return formatCurrency(value);
        }
      }
    }
  };

  const bonusesSeries = bonusesData.map(b => b.amount);

  return (
    <DashboardCard title="Earnings & Incentives">
      <CardContent>
        <Grid container spacing={3}>
          {/* Earnings by Agent */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h6" gutterBottom>
              Top Earners This Month
            </Typography>
            <Box sx={{ height: 250 }}>
              <Chart
                options={topEarnersOptions}
                series={topEarnersSeries}
                type="bar"
                height={250}
              />
            </Box>
          </Grid>

          {/* Payout Success Rate */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              Payout Success Rate
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h3" fontWeight={700} color="success.main">
                  {payoutSuccessRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Success Rate
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Payouts: {formatCurrency(totalPayouts)}
                </Typography>
                <Typography variant="body2" color="error.main">
                  Failed: {formatCurrency(failedPayouts)}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={payoutSuccessRate}
                color="success"
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Stack>
          </Grid>

          {/* Bonuses Earned */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Bonuses Earned
            </Typography>
            <Box sx={{ height: 200 }}>
              <Chart
                options={bonusesOptions}
                series={bonusesSeries}
                type="pie"
                height={200}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              {bonusesData.map((bonus, index) => (
                <Stack key={bonus.type} direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%',
                        bgcolor: COLORS[index % COLORS.length]
                      }} 
                    />
                    <Typography variant="caption">{bonus.type}</Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {bonus.count} agents
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Grid>

          {/* Penalties Applied */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Penalties Applied
            </Typography>
            <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
              {penaltiesData.map((penalty) => (
                <Box key={penalty.type} sx={{ mb: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">{penalty.type}</Typography>
                    <Typography variant="body2" color="error.main" fontWeight={600}>
                      {formatCurrency(penalty.amount)}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {penalty.count} agents affected
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.abs(penalty.amount) / 245000 * 100}
                    color="error"
                    sx={{ height: 4, borderRadius: 2, mt: 1 }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </DashboardCard>
  );
};

export default EarningsIncentives;
