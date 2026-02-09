'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { 
  IconUsers, 
  IconRecycle, 
  IconClock, 
  IconTrendingUp, 
  IconAlertTriangle,
  IconCurrency
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface PerformanceSummary {
  activeAgents: number;
  onDutyToday: number;
  utilizationRate: number;
  completedPickups: number;
  avgResponseTime: number;
  completionRate: number;
  disputeRate: number;
  totalAgentEarnings: number;
}

interface PerformanceOverviewCardsProps {
  summary: PerformanceSummary;
}

const PerformanceOverviewCards: React.FC<PerformanceOverviewCardsProps> = ({ summary }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const cards = [
    {
      title: 'Active Agents',
      value: summary.activeAgents.toLocaleString(),
      subtitle: `${summary.onDutyToday} on duty today • ${summary.utilizationRate.toFixed(1)}% utilization`,
      icon: <IconUsers size={20} />,
      color: 'primary',
      status: 'active'
    },
    {
      title: 'Completed Pickups',
      value: summary.completedPickups.toLocaleString(),
      subtitle: 'This period',
      icon: <IconRecycle size={20} />,
      color: 'success',
      status: 'pickups'
    },
    {
      title: 'Avg Response Time',
      value: `${summary.avgResponseTime} mins`,
      subtitle: 'Acceptance speed',
      icon: <IconClock size={20} />,
      color: 'info',
      status: 'response_time'
    },
    {
      title: 'Completion Rate',
      value: `${summary.completionRate}%`,
      subtitle: 'Jobs completed vs assigned',
      icon: <IconTrendingUp size={20} />,
      color: 'success',
      status: 'completion'
    },
    {
      title: 'Dispute Rate',
      value: `${summary.disputeRate}%`,
      subtitle: 'Quality & payout disputes',
      icon: <IconAlertTriangle size={20} />,
      color: summary.disputeRate > 3 ? 'error' : 'warning',
      status: 'disputes'
    },
    {
      title: 'Total Agent Earnings',
      value: formatCurrency(summary.totalAgentEarnings),
      subtitle: 'This month',
      icon: <IconCurrency size={20} />,
      color: 'success',
      status: 'earnings'
    }
  ];

  return (
    <DashboardCard title="Performance Overview">
      <CardContent>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 2 }} key={index}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                    borderColor: 'primary.main',
                  }
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar 
                      sx={{ 
                        bgcolor: `${card.color}.main`,
                        width: 40,
                        height: 40
                      }}
                    >
                      {card.icon}
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="h4" fontWeight={600}>
                        {card.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {card.subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </DashboardCard>
  );
};

export default PerformanceOverviewCards;
