'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { 
  IconPackage, 
  IconSearch, 
  IconCheck, 
  IconWalk, 
  IconAlertTriangle, 
  IconClock, 
  IconX,
  IconTrendingUp
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface RequestSummary {
  newRequests: number;
  matchingInProgress: number;
  assignedPickups: number;
  dropoffRequests: number;
  atRiskSLA: number;
  failedRequests: number;
  completedToday: number;
}

interface PickupRequestSummaryCardsProps {
  summary: RequestSummary;
  onCardClick: (filterType: string) => void;
}

const PickupRequestSummaryCards: React.FC<PickupRequestSummaryCardsProps> = ({ summary, onCardClick }) => {
  const cards = [
    {
      title: 'New Requests',
      value: summary.newRequests.toLocaleString(),
      icon: <IconPackage size={20} />,
      color: 'info',
      description: 'Created, not yet matched',
      filterType: 'new'
    },
    {
      title: 'Matching in Progress',
      value: summary.matchingInProgress.toLocaleString(),
      icon: <IconSearch size={20} />,
      color: 'warning',
      description: 'Searching for agent acceptance',
      filterType: 'matching'
    },
    {
      title: 'Assigned Pickups',
      value: summary.assignedPickups.toLocaleString(),
      icon: <IconCheck size={20} />,
      color: 'success',
      description: 'Agent accepted request',
      filterType: 'assigned'
    },
    {
      title: 'Drop-off Requests',
      value: summary.dropoffRequests.toLocaleString(),
      icon: <IconWalk size={20} />,
      color: 'primary',
      description: 'User will meet agent',
      filterType: 'dropoff'
    },
    {
      title: 'At Risk (SLA)',
      value: summary.atRiskSLA.toLocaleString(),
      icon: <IconAlertTriangle size={20} />,
      color: 'warning',
      description: 'Approaching delay threshold',
      filterType: 'at_risk'
    },
    {
      title: 'Failed Requests',
      value: summary.failedRequests.toLocaleString(),
      icon: <IconX size={20} />,
      color: 'error',
      description: 'No agent / timeout / cancellation',
      filterType: 'failed'
    },
    {
      title: 'Completed Today',
      value: summary.completedToday.toLocaleString(),
      icon: <IconTrendingUp size={20} />,
      color: 'success',
      description: 'Successfully fulfilled requests',
      filterType: 'completed'
    }
  ];

  return (
    <DashboardCard title="Pickup Request Summary">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📊 Real-time demand health - Click cards to filter data
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 12, lg: 6, xl: 3 }} key={index}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                    borderColor: `${card.color}.main`,
                  }
                }} 
                onClick={() => onCardClick(card.filterType)}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: `${card.color}.main` }}>
                      {card.icon}
                    </Avatar>
                    <Box flex={1}>
                      <Typography 
                        variant="h4" 
                        fontWeight={600} 
                        color={`${card.color}.main`}
                      >
                        {card.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {card.description}
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

export default PickupRequestSummaryCards;
