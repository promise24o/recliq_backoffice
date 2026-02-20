'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  AlertTriangle,
  Info,
  AlertCircle,
} from 'lucide-react';
import { useZoneInsights, type ZoneInsight } from '@/hooks/useZoneInsights';

interface ZonePerformanceInsightsPanelProps {
  // No longer needs insights prop - fetches internally
}

const ZonePerformanceInsightsPanel: React.FC<ZonePerformanceInsightsPanelProps> = () => {
  const { data: insights = [], isLoading, error } = useZoneInsights();
  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      info: '#3B82F6',
      warning: '#F59E0B',
      critical: '#EF4444',
    };
    return colors[severity] || '#6B7280';
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertCircle size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      default: return <Info size={16} />;
    }
  };

  const getSeverityLabel = (severity: string) => {
    const labels: Record<string, string> = {
      info: 'Info',
      warning: 'Warning',
      critical: 'Critical',
    };
    return labels[severity] || severity;
  };

  if (isLoading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <Typography color="text.secondary">Loading zone insights...</Typography>
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <Typography color="error">Failed to load zone insights</Typography>
        </Box>
      </Paper>
    );
  }

  const criticalInsights = insights.filter((i: ZoneInsight) => i.severity === 'critical');
  const warningInsights = insights.filter((i: ZoneInsight) => i.severity === 'warning');
  const infoInsights = insights.filter((i: ZoneInsight) => i.severity === 'info');

  return (
    <Paper sx={{ p: 3 }}>
      <Box mb={3}>
        <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
          <TrendingUp size={20} color="#8B5CF6" />
          <Typography variant="h6" fontWeight="600">
            Zone Performance & Expansion Insights
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Identify expansion-ready zones, flag overextended areas, and optimize boundaries
        </Typography>
      </Box>

      {/* Summary Row */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 4 }}>
          <Box sx={{ p: 2, bgcolor: '#FEF2F2', borderRadius: 1, textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="700" color="#EF4444">{criticalInsights.length}</Typography>
            <Typography variant="caption" color="text.secondary">Critical</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Box sx={{ p: 2, bgcolor: '#FFFBEB', borderRadius: 1, textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="700" color="#F59E0B">{warningInsights.length}</Typography>
            <Typography variant="caption" color="text.secondary">Warnings</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Box sx={{ p: 2, bgcolor: '#EFF6FF', borderRadius: 1, textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="700" color="#3B82F6">{infoInsights.length}</Typography>
            <Typography variant="caption" color="text.secondary">Info</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Insights List */}
      <Stack spacing={2}>
        {insights.map((insight: ZoneInsight, i: number) => {
          const color = getSeverityColor(insight.severity);
          return (
            <Box
              key={i}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: color + '30',
                borderRadius: 1,
                bgcolor: color + '05',
                borderLeft: `4px solid ${color}`,
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Stack direction="row" spacing={1.5} alignItems="flex-start" flex={1}>
                  <Box sx={{ color, mt: 0.25 }}>
                    {getSeverityIcon(insight.severity)}
                  </Box>
                  <Box flex={1}>
                    <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                      <Typography variant="body2" fontWeight="600">{insight.zoneName}</Typography>
                      <Typography variant="caption" color="text.secondary">• {insight.city}</Typography>
                      <Chip
                        label={getSeverityLabel(insight.severity)}
                        size="small"
                        sx={{ bgcolor: color + '15', color, fontSize: '0.6rem', fontWeight: 600, height: 20 }}
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {insight.recommendation}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="caption" color="text.secondary">
                        {insight.metric}: <strong>{insight.value}{insight.metric.includes('%') || insight.metric === 'Utilization' || insight.metric === 'Coverage Gap' || insight.metric === 'SLA Performance' ? '%' : ''}</strong>
                      </Typography>
                      {(insight.metric === 'Utilization' || insight.metric === 'Coverage Gap' || insight.metric === 'SLA Performance') && (
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(insight.value, 100)}
                          sx={{
                            width: 100,
                            height: 4,
                            borderRadius: 2,
                            bgcolor: '#f1f5f9',
                            '& .MuiLinearProgress-bar': { bgcolor: color },
                          }}
                        />
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Paper>
  );
};

export default ZonePerformanceInsightsPanel;
