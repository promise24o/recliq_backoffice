'use client'
import React from 'react';
import { Box, Stack, Typography, Grid } from '@mui/material';
import { 
  AlertTriangle, 
  Search, 
  CheckCircle, 
  Shield, 
  Scale, 
  DollarSign
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { DisputeSummary } from '../types';

interface DisputeSummaryCardsProps {
  summary: DisputeSummary;
  onCardClick: (filterType: string) => void;
}

const DisputeSummaryCards: React.FC<DisputeSummaryCardsProps> = ({ summary, onCardClick }) => {
  const cards = [
    {
      title: 'Open Disputes',
      value: summary.openDisputes.toLocaleString(),
      subtitle: 'Awaiting action',
      icon: AlertTriangle,
      color: '#ef4444',
      filterType: 'open'
    },
    {
      title: 'Under Review',
      value: summary.underReview.toLocaleString(),
      subtitle: 'Being investigated',
      icon: Search,
      color: '#f59e0b',
      filterType: 'under_review'
    },
    {
      title: 'Resolved',
      value: summary.resolved.toLocaleString(),
      subtitle: 'Closed disputes',
      icon: CheckCircle,
      color: '#10b981',
      filterType: 'resolved'
    },
    {
      title: 'Escalated',
      value: summary.escalated.toLocaleString(),
      subtitle: 'Compliance-level cases',
      icon: Shield,
      color: '#8b5cf6',
      filterType: 'escalated'
    },
    {
      title: 'Weight-Related',
      value: summary.weightRelated.toLocaleString(),
      subtitle: 'Measurement conflicts',
      icon: Scale,
      color: '#06b6d4',
      filterType: 'weight'
    },
    {
      title: 'Payout-Related',
      value: summary.payoutRelated.toLocaleString(),
      subtitle: 'Wallet or earnings issues',
      icon: DollarSign,
      color: '#f97316',
      filterType: 'payout'
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

export default DisputeSummaryCards;
