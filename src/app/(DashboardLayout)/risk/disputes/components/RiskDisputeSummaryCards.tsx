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
  AlertTriangle,
  DollarSign,
  RefreshCw,
  Search,
  FileText,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import type { RiskDisputeSummary } from '../types';
import { formatCurrency } from '../mockData';

interface RiskDisputeSummaryCardsProps {
  summary: RiskDisputeSummary;
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

const RiskDisputeSummaryCards: React.FC<RiskDisputeSummaryCardsProps> = ({
  summary,
  onCardClick,
  selectedMetric
}) => {
  const cards: CardConfig[] = [
    {
      id: 'high_risk',
      title: 'High-Risk Disputes',
      value: summary?.highRiskDisputes || 0,
      subtitle: 'Immediate attention required',
      icon: <AlertTriangle size={24} />,
      color: '#EF4444',
      bgColor: '#FEF2F2'
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
      id: 'repeat_offenders',
      title: 'Repeat Offenders',
      value: summary?.repeatOffenders || 0,
      subtitle: 'Patterned disputes',
      icon: <RefreshCw size={24} />,
      color: '#8B5CF6',
      bgColor: '#F5F3FF'
    },
    {
      id: 'under_investigation',
      title: 'Under Investigation',
      value: summary?.underInvestigation || 0,
      subtitle: 'Compliance review',
      icon: <Search size={24} />,
      color: '#3B82F6',
      bgColor: '#EFF6FF'
    },
    {
      id: 'audit_tagged',
      title: 'Audit-Tagged Cases',
      value: summary?.auditTaggedCases || 0,
      subtitle: 'Logged for audit',
      icon: <FileText size={24} />,
      color: '#EC4899',
      bgColor: '#FDF2F8'
    },
    {
      id: 'resolved_cleared',
      title: 'Resolved (Risk Cleared)',
      value: summary?.resolvedCleared || 0,
      subtitle: 'Closed with no exposure',
      icon: <CheckCircle size={24} />,
      color: '#10B981',
      bgColor: '#ECFDF5'
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

export default RiskDisputeSummaryCards;
