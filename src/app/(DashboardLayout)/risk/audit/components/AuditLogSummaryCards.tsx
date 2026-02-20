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
  ClipboardList,
  User,
  Cpu,
  DollarSign,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import type { AuditLogSummary } from '../types';
import { formatTimestamp } from '../mockData';

interface AuditLogSummaryCardsProps {
  summary: AuditLogSummary;
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

const AuditLogSummaryCards: React.FC<AuditLogSummaryCardsProps> = ({
  summary,
  onCardClick,
  selectedMetric
}) => {
  const cards: CardConfig[] = [
    {
      id: 'total_logged',
      title: 'Total Logged Actions',
      value: (summary?.totalLoggedActions || 0).toLocaleString(),
      subtitle: 'Recorded events',
      icon: <ClipboardList size={24} />,
      color: '#3B82F6',
      bgColor: '#EFF6FF'
    },
    {
      id: 'admin_actions',
      title: 'Admin Actions',
      value: (summary?.adminActions || 0).toLocaleString(),
      subtitle: 'Human-triggered',
      icon: <User size={24} />,
      color: '#6366F1',
      bgColor: '#EEF2FF'
    },
    {
      id: 'system_actions',
      title: 'System Actions',
      value: (summary?.systemActions || 0).toLocaleString(),
      subtitle: 'Automated',
      icon: <Cpu size={24} />,
      color: '#8B5CF6',
      bgColor: '#F5F3FF'
    },
    {
      id: 'financial_actions',
      title: 'Financial Actions',
      value: (summary?.financialActions || 0).toLocaleString(),
      subtitle: 'Monetary impact',
      icon: <DollarSign size={24} />,
      color: '#F59E0B',
      bgColor: '#FFFBEB'
    },
    {
      id: 'high_risk',
      title: 'High-Risk Actions',
      value: summary?.highRiskActions || 0,
      subtitle: 'Sensitive operations',
      icon: <AlertTriangle size={24} />,
      color: '#EF4444',
      bgColor: '#FEF2F2'
    },
    {
      id: 'last_event',
      title: 'Last Logged Event',
      value: summary?.lastLoggedEvent
        ? new Date(summary.lastLoggedEvent).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
        : '--:--',
      subtitle: 'Recency indicator',
      icon: <Clock size={24} />,
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

export default AuditLogSummaryCards;
