'use client';

import React from 'react';
import {
  Grid,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import DashboardCard from '@/app/components/shared/DashboardCard';
import {
  X,
  UserX,
  UserMinus,
  Clock,
  AlertTriangle,
  Flame,
} from 'lucide-react';

interface FailureStats {
  totalFailedPickups: number;
  userCancellations: number;
  agentCancellations: number;
  timeoutFailures: number;
  slaBreaches: number;
  highFailureZones: number;
}

interface FailureSummaryCardsProps {
  stats: FailureStats;
  onCardClick?: (filterType: string) => void;
}

const FailureSummaryCards: React.FC<FailureSummaryCardsProps> = ({ 
  stats, 
  onCardClick 
}) => {
  const cards = [
    {
      title: 'Total Failed Pickups',
      value: stats.totalFailedPickups.toLocaleString(),
      icon: <X size={24} />,
      color: 'error',
      description: 'System or supply breakdowns',
      filterType: 'failed'
    },
    {
      title: 'User Cancellations',
      value: stats.userCancellations.toLocaleString(),
      icon: <UserX size={24} />,
      color: 'warning',
      description: 'Demand drop-offs',
      filterType: 'user_cancelled'
    },
    {
      title: 'Agent Cancellations',
      value: stats.agentCancellations.toLocaleString(),
      icon: <UserMinus size={24} />,
      color: 'secondary',
      description: 'Reliability issues',
      filterType: 'agent_cancelled'
    },
    {
      title: 'Timeout Failures',
      value: stats.timeoutFailures.toLocaleString(),
      icon: <Clock size={24} />,
      color: 'info',
      description: 'Matching / response delays',
      filterType: 'timeout'
    },
    {
      title: 'SLA Breaches',
      value: stats.slaBreaches.toLocaleString(),
      icon: <AlertTriangle size={24} />,
      color: 'warning',
      description: 'Operational threshold exceeded',
      filterType: 'sla_breach'
    },
    {
      title: 'High-Failure Zones',
      value: stats.highFailureZones.toLocaleString(),
      icon: <Flame size={24} />,
      color: 'error',
      description: 'Areas with repeated breakdowns',
      filterType: 'high_failure_zones'
    }
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 2 }} key={index}>
          <DashboardCard>
            <Box sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ p: 1, borderRadius: 1, bgcolor: `${card.color}.main`, color: 'white' }}>
                  {card.icon}
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={600}>{card.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{card.title}</Typography>
                </Box>
              </Stack>
            </Box>
          </DashboardCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default FailureSummaryCards;
