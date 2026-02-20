'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Grid,
  Paper,
} from '@mui/material';
import {
  LogIn,
  Wrench,
  AlertTriangle,
  MapPin,
  Clock,
} from 'lucide-react';
import { useActivitySummary, type ActivitySummary } from '@/hooks/useActivityLogs';
import { SummaryGridSkeleton } from './SkeletonLoader';

interface ActivitySummaryCardsProps {
  selectedMetric: string | null;
  onMetricClick: (metric: string) => void;
}

const cards = [
  {
    key: 'recentLogins',
    label: 'Recent Logins',
    subtitle: 'Last 30 days',
    icon: LogIn,
    color: '#10B981',
    bg: '#ECFDF5',
  },
  {
    key: 'actionsPerformed',
    label: 'Actions Performed',
    subtitle: 'Approvals & edits',
    icon: Wrench,
    color: '#3B82F6',
    bg: '#EFF6FF',
  },
  {
    key: 'sensitiveActions',
    label: 'Sensitive Actions',
    subtitle: 'High-impact events',
    icon: AlertTriangle,
    color: '#F59E0B',
    bg: '#FFFBEB',
  },
  {
    key: 'distinctLocations',
    label: 'Distinct Locations',
    subtitle: 'Login diversity',
    icon: MapPin,
    color: '#8B5CF6',
    bg: '#F5F3FF',
  },
  {
    key: 'lastActivityTime',
    label: 'Last Activity',
    subtitle: 'Recency indicator',
    icon: Clock,
    color: '#6366F1',
    bg: '#EEF2FF',
  },
];

const ActivitySummaryCards: React.FC<ActivitySummaryCardsProps> = ({
  selectedMetric,
  onMetricClick,
}) => {
  const { data: summary, isLoading, error } = useActivitySummary();

  if (isLoading) {
    return <SummaryGridSkeleton count={4} />;
  }

  if (error || !summary) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Failed to load activity summary</Typography>
      </Paper>
    );
  }
  const getValue = (key: string) => {
    if (key === 'lastActivityTime') {
      const d = new Date(summary.lastActivityTime);
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHrs = Math.floor(diffMins / 60);
      if (diffHrs < 24) return `${diffHrs}h ago`;
      const diffDays = Math.floor(diffHrs / 24);
      return `${diffDays}d ago`;
    }
    return (summary as any)[key];
  };

  return (
    <Grid container spacing={2}>
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = selectedMetric === card.key;
        return (
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={card.key}>
            <Paper
              onClick={() => onMetricClick(isSelected ? '' : card.key)}
              sx={{
                p: 2.5,
                cursor: 'pointer',
                border: '2px solid',
                borderColor: isSelected ? card.color : 'transparent',
                bgcolor: isSelected ? card.color + '08' : 'background.paper',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: card.color + '60',
                  transform: 'translateY(-2px)',
                  boxShadow: 2,
                },
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    bgcolor: card.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color={card.color} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight="700" color={card.color}>
                    {getValue(card.key)}
                  </Typography>
                  <Typography variant="body2" fontWeight="600" noWrap>
                    {card.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {card.subtitle}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ActivitySummaryCards;
