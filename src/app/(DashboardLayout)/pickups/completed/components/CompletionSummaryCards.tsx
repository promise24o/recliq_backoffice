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
  Recycle,
  Weight,
  DollarSign,
  Building,
  Clock,
  AlertTriangle,
} from 'lucide-react';

interface CompletionStats {
  totalCompleted: number;
  totalWeightCollected: number;
  totalPayouts: number;
  platformRevenue: number;
  avgCompletionTime: number;
  postCompletionIssues: number;
}

interface CompletionSummaryCardsProps {
  stats: CompletionStats;
  onCardClick?: (filterType: string) => void;
}

const CompletionSummaryCards: React.FC<CompletionSummaryCardsProps> = ({ 
  stats, 
  onCardClick 
}) => {
  const cards = [
    {
      title: 'Completed Pickups',
      value: stats.totalCompleted.toLocaleString(),
      icon: <Recycle size={24} />,
      color: 'success',
      description: 'Total completed in period',
      filterType: 'completed'
    },
    {
      title: 'Total Weight Collected',
      value: `${stats.totalWeightCollected.toLocaleString()} kg`,
      icon: <Weight size={24} />,
      color: 'primary',
      description: 'Verified kg recycled',
      filterType: 'weight'
    },
    {
      title: 'Total Payouts',
      value: `₦${stats.totalPayouts.toLocaleString()}`,
      icon: <DollarSign size={24} />,
      color: 'info',
      description: 'Paid to agents',
      filterType: 'payouts'
    },
    {
      title: 'Platform Revenue',
      value: `₦${stats.platformRevenue.toLocaleString()}`,
      icon: <Building size={24} />,
      color: 'secondary',
      description: 'Net margin from completed jobs',
      filterType: 'revenue'
    },
    {
      title: 'Avg Completion Time',
      value: `${stats.avgCompletionTime} min`,
      icon: <Clock size={24} />,
      color: 'warning',
      description: 'Request → completion',
      filterType: 'time'
    },
    {
      title: 'Post-Completion Issues',
      value: stats.postCompletionIssues.toLocaleString(),
      icon: <AlertTriangle size={24} />,
      color: 'error',
      description: 'Disputes / reversals',
      filterType: 'issues'
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

export default CompletionSummaryCards;
