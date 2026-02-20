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
  Building2,
  MapPin,
  Users,
  AlertTriangle,
  Package,
  Clock,
} from 'lucide-react';
import { useZoneSummary, type ZoneSummary } from '@/hooks/useZoneSummary';

interface ZoneSummaryCardsProps {
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

const ZoneSummaryCards: React.FC<ZoneSummaryCardsProps> = ({
  onCardClick,
  selectedMetric,
}) => {
  const { data: summary, isLoading, error } = useZoneSummary();

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">Loading...</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Failed to load zone summary</Typography>
      </Paper>
    );
  }

  const cards: CardConfig[] = [
    {
      id: 'cities_covered',
      title: 'Cities Covered',
      value: summary?.citiesCovered || 0,
      subtitle: 'Active cities',
      icon: <Building2 size={24} />,
      color: '#3B82F6',
      bgColor: '#EFF6FF',
    },
    {
      id: 'active_zones',
      title: 'Active Zones',
      value: summary?.activeZones || 0,
      subtitle: 'Operational zones',
      icon: <MapPin size={24} />,
      color: '#10B981',
      bgColor: '#ECFDF5',
    },
    {
      id: 'agents_assigned',
      title: 'Agents Assigned',
      value: summary?.agentsAssigned || 0,
      subtitle: 'Per zone',
      icon: <Users size={24} />,
      color: '#8B5CF6',
      bgColor: '#F5F3FF',
    },
    {
      id: 'low_coverage',
      title: 'Low Coverage Zones',
      value: summary?.lowCoverageZones || 0,
      subtitle: 'Supply risk',
      icon: <AlertTriangle size={24} />,
      color: '#EF4444',
      bgColor: '#FEF2F2',
    },
    {
      id: 'avg_pickups',
      title: 'Avg Pickups / Zone',
      value: summary?.avgPickupsPerZone || 0,
      subtitle: 'Demand density',
      icon: <Package size={24} />,
      color: '#F59E0B',
      bgColor: '#FFFBEB',
    },
    {
      id: 'sla_performance',
      title: 'Zone SLA Performance',
      value: `${summary?.avgSlaPerformancePercent || 0}%`,
      subtitle: 'Reliability indicator',
      icon: <Clock size={24} />,
      color: '#6366F1',
      bgColor: '#EEF2FF',
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid key={card.id} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
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

export default ZoneSummaryCards;
