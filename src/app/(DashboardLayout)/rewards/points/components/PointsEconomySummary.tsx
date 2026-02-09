'use client'
import React from 'react';
import { Box, Stack, Typography, Grid } from '@mui/material';
import { 
  Coins, 
  TrendingUp, 
  Zap, 
  Shield, 
  Target, 
  DollarSign
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { PointsEconomySummary } from '../types';

interface PointsEconomySummaryProps {
  summary: PointsEconomySummary;
  onCardClick: (metricType: string) => void;
}

const PointsEconomySummary: React.FC<PointsEconomySummaryProps> = ({ summary, onCardClick }) => {
  const cards = [
    {
      title: 'Active Rules',
      value: summary.activeRules.toLocaleString(),
      subtitle: 'Currently applied rules',
      icon: Coins,
      color: '#3b82f6',
      metricType: 'rules'
    },
    {
      title: 'Avg Points per Pickup',
      value: summary.avgPointsPerPickup.toFixed(1),
      subtitle: 'Reward intensity',
      icon: TrendingUp,
      color: '#10b981',
      metricType: 'intensity'
    },
    {
      title: 'Streak Multipliers Active',
      value: summary.streakMultipliersActive.toLocaleString(),
      subtitle: 'Engagement drivers',
      icon: Zap,
      color: '#f59e0b',
      metricType: 'streaks'
    },
    {
      title: 'Abuse Guards Enabled',
      value: summary.abuseGuardsEnabled.toLocaleString(),
      subtitle: 'Caps & throttles',
      icon: Shield,
      color: '#ef4444',
      metricType: 'guards'
    },
    {
      title: 'Campaign Overrides',
      value: summary.campaignOverrides.toLocaleString(),
      subtitle: 'Temporary boosts',
      icon: Target,
      color: '#8b5cf6',
      metricType: 'campaigns'
    },
    {
      title: 'Projected Monthly Issuance',
      value: (summary.projectedMonthlyIssuance / 1000000).toFixed(1) + 'M',
      subtitle: 'Liability estimate',
      icon: DollarSign,
      color: '#06b6d4',
      metricType: 'issuance'
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

export default PointsEconomySummary;
