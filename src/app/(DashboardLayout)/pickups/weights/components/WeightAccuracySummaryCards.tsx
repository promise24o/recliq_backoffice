'use client'
import React from 'react';
import { Box, Stack, Typography, Grid } from '@mui/material';
import { 
  Scale, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Search, 
  CheckCircle
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { WeightAccuracySummary } from '../types';

interface WeightAccuracySummaryCardsProps {
  summary: WeightAccuracySummary;
  onCardClick: (filterType: string) => void;
}

const WeightAccuracySummaryCards: React.FC<WeightAccuracySummaryCardsProps> = ({ summary, onCardClick }) => {
  const cards = [
    {
      title: 'Total Weigh-ins',
      value: summary.totalWeighins.toLocaleString(),
      subtitle: 'All verified measurements',
      icon: Scale,
      color: '#3b82f6',
      filterType: 'all'
    },
    {
      title: 'Avg Weight Variance',
      value: `${summary.avgWeightVariance.toFixed(1)}%`,
      subtitle: 'Estimated vs final',
      icon: TrendingUp,
      color: '#8b5cf6',
      filterType: 'variance'
    },
    {
      title: 'High-Variance Logs',
      value: summary.highVarianceLogs.toLocaleString(),
      subtitle: 'Above tolerance threshold',
      icon: AlertTriangle,
      color: '#ef4444',
      filterType: 'high_variance'
    },
    {
      title: 'Agents with Repeated Variance',
      value: summary.agentsWithRepeatedVariance.toLocaleString(),
      subtitle: 'Potential manipulation',
      icon: Users,
      color: '#f59e0b',
      filterType: 'agents'
    },
    {
      title: 'Disputed Weights',
      value: summary.disputedWeights.toLocaleString(),
      subtitle: 'Awaiting review',
      icon: Search,
      color: '#06b6d4',
      filterType: 'disputed'
    },
    {
      title: 'Total Weight Verified',
      value: `${summary.totalWeightVerified.toLocaleString()} kg`,
      subtitle: 'Kg confirmed (finance-safe)',
      icon: CheckCircle,
      color: '#10b981',
      filterType: 'verified'
    }
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={index}>
            <DashboardCard>
              <Box sx={{ p: '24px !important' }}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h4" fontWeight="600">
                      {card.value}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" mt={0.5}>
                      {card.subtitle}
                    </Typography>
                    <Typography variant="h6" color={card.color} mt={1}>
                      {card.title}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: `${card.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconComponent size={24} color={card.color} />
                  </Box>
                </Stack>
              </Box>
            </DashboardCard>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default WeightAccuracySummaryCards;
