'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { 
  MapPin, 
  Scale, 
  Wallet, 
  Users, 
  Clock, 
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { DropoffSummary } from '../types';

interface DropoffSummaryCardsProps {
  summary: DropoffSummary;
  onCardClick: (filterType: string) => void;
}

const DropoffSummaryCards: React.FC<DropoffSummaryCardsProps> = ({ summary, onCardClick }) => {
  const cards = [
    {
      title: 'Completed Drop-offs',
      value: summary.completedDropoffs.toLocaleString(),
      subtitle: 'Total successful drop-offs',
      icon: MapPin,
      color: '#10b981',
      filterType: 'completed'
    },
    {
      title: 'Total Weight Received',
      value: `${summary.totalWeightReceived.toLocaleString()} kg`,
      subtitle: 'Verified kg via drop-off',
      icon: Scale,
      color: '#3b82f6',
      filterType: 'weight'
    },
    {
      title: 'Total User Payouts',
      value: `₦${summary.totalUserPayouts.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: 'Wallet credits issued',
      icon: Wallet,
      color: '#8b5cf6',
      filterType: 'payouts'
    },
    {
      title: 'Active Drop-off Agents',
      value: summary.activeDropoffAgents.toLocaleString(),
      subtitle: 'Agents receiving drop-offs',
      icon: Users,
      color: '#f59e0b',
      filterType: 'agents'
    },
    {
      title: 'Avg Drop-off Duration',
      value: `${summary.avgDropoffDuration} min`,
      subtitle: 'Arrival → completion',
      icon: Clock,
      color: '#06b6d4',
      filterType: 'duration'
    },
    {
      title: 'Drop-off Issues',
      value: summary.dropoffIssues.toLocaleString(),
      subtitle: 'Post-completion disputes',
      icon: AlertTriangle,
      color: '#ef4444',
      filterType: 'issues'
    }
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={index}>
            <DashboardCard>
              <CardContent sx={{ p: '24px !important' }}>
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
                  <Avatar
                    sx={{
                      bgcolor: `${card.color}15`,
                      color: card.color,
                      width: 48,
                      height: 48,
                    }}
                  >
                    <IconComponent size={24} />
                  </Avatar>
                </Stack>
              </CardContent>
            </DashboardCard>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DropoffSummaryCards;
