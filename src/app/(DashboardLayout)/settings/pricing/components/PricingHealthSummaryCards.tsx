'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
} from '@mui/material';
import {
  DollarSign,
  Scale,
  Truck,
  TrendingUp,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import type { PricingSummary } from '../types';
import { formatRate } from '../mockData';

interface PricingHealthSummaryCardsProps {
  summary: PricingSummary;
  onCardClick?: (metricType: string) => void;
  selectedMetric?: string | null;
}

interface CardConfig {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const PricingHealthSummaryCards: React.FC<PricingHealthSummaryCardsProps> = ({
  summary,
  onCardClick,
  selectedMetric,
}) => {
  const cards: CardConfig[] = [
    {
      id: 'active_rules',
      title: 'Active Pricing Rules',
      value: summary?.activeRules || 0,
      subtitle: 'Enforced rules',
      icon: <DollarSign size={24} />,
      color: '#3B82F6',
      bgColor: '#EFF6FF',
    },
    {
      id: 'avg_price',
      title: 'Avg Price per kg',
      value: formatRate(summary?.avgPricePerKg || 0),
      subtitle: 'Consumer rate',
      icon: <Scale size={24} />,
      color: '#10B981',
      bgColor: '#ECFDF5',
    },
    {
      id: 'avg_payout',
      title: 'Avg Agent Payout / kg',
      value: formatRate(summary?.avgAgentPayoutPerKg || 0),
      subtitle: 'Supply cost',
      icon: <Truck size={24} />,
      color: '#F59E0B',
      bgColor: '#FFFBEB',
    },
    {
      id: 'margin',
      title: 'Est. Platform Margin',
      value: `${summary?.estimatedMarginPercent || 0}%`,
      subtitle: 'Rule-based projection',
      icon: <TrendingUp size={24} />,
      color: '#8B5CF6',
      bgColor: '#F5F3FF',
    },
    {
      id: 'overrides',
      title: 'Override Rules Active',
      value: summary?.overrideRulesActive || 0,
      subtitle: 'Non-default pricing',
      icon: <AlertTriangle size={24} />,
      color: '#EF4444',
      bgColor: '#FEF2F2',
    },
    {
      id: 'last_change',
      title: 'Last Price Change',
      value: summary?.lastPriceChange
        ? new Date(summary.lastPriceChange).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })
        : '—',
      subtitle: 'Governance signal',
      icon: <Clock size={24} />,
      color: '#6366F1',
      bgColor: '#EEF2FF',
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <Paper
            sx={{
              p: 3,
              cursor: onCardClick ? 'pointer' : 'default',
              border: selectedMetric === card.id ? `2px solid ${card.color}` : '1px solid',
              borderColor: selectedMetric === card.id ? card.color : 'divider',
              transition: 'all 0.2s ease',
              '&:hover': onCardClick
                ? { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }
                : {},
            }}
            onClick={() => onCardClick?.(card.id)}
          >
            <Stack spacing={2}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: card.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: card.color,
                }}
              >
                {card.icon}
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="700" color={card.color}>
                  {card.value}
                </Typography>
                <Typography variant="subtitle2" fontWeight="600" mt={0.5}>
                  {card.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {card.subtitle}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default PricingHealthSummaryCards;
