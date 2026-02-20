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
  Flag,
  AlertTriangle,
  DollarSign,
  Search,
  CheckCircle,
  Lock,
} from 'lucide-react';
import type { FraudSummary } from '../types';
import { formatCurrency } from '../mockData';

interface FraudSummaryCardsProps {
  summary: FraudSummary;
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

const FraudSummaryCards: React.FC<FraudSummaryCardsProps> = ({
  summary,
  onCardClick,
  selectedMetric
}) => {
  const cards: CardConfig[] = [
    {
      id: 'active_flags',
      title: 'Active Fraud Flags',
      value: summary?.activeFraudFlags || 0,
      subtitle: 'Currently under review',
      icon: <Flag size={24} />,
      color: '#EF4444',
      bgColor: '#FEF2F2'
    },
    {
      id: 'high_severity',
      title: 'High-Severity Flags',
      value: summary?.highSeverityFlags || 0,
      subtitle: 'Immediate action required',
      icon: <AlertTriangle size={24} />,
      color: '#DC2626',
      bgColor: '#FEE2E2'
    },
    {
      id: 'financial_exposure',
      title: 'Financial Exposure',
      value: formatCurrency(summary?.financialExposure || 0),
      subtitle: 'Funds at risk',
      icon: <DollarSign size={24} />,
      color: '#F59E0B',
      bgColor: '#FFFBEB'
    },
    {
      id: 'under_investigation',
      title: 'Under Investigation',
      value: summary?.underInvestigation || 0,
      subtitle: 'Being reviewed',
      icon: <Search size={24} />,
      color: '#3B82F6',
      bgColor: '#EFF6FF'
    },
    {
      id: 'cleared_flags',
      title: 'Cleared Flags',
      value: summary?.clearedFlags || 0,
      subtitle: 'False positives resolved',
      icon: <CheckCircle size={24} />,
      color: '#10B981',
      bgColor: '#ECFDF5'
    },
    {
      id: 'accounts_restricted',
      title: 'Accounts Restricted',
      value: summary?.accountsRestricted || 0,
      subtitle: 'Enforcement actions taken',
      icon: <Lock size={24} />,
      color: '#8B5CF6',
      bgColor: '#F5F3FF'
    }
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
              '&:hover': onCardClick ? {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              } : {}
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
                  color: card.color
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

export default FraudSummaryCards;
