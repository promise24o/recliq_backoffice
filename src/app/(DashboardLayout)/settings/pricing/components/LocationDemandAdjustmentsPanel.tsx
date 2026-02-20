'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  MapPin,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
} from 'lucide-react';
import type { LocationAdjustment } from '../types';
import { getStatusColor, getStatusLabel } from '../mockData';

interface LocationDemandAdjustmentsPanelProps {
  adjustments: LocationAdjustment[];
}

const LocationDemandAdjustmentsPanel: React.FC<LocationDemandAdjustmentsPanelProps> = ({
  adjustments,
}) => {
  const cityMultipliers = adjustments.filter((a) => a.type === 'city_multiplier');
  const lowCoverageIncentives = adjustments.filter((a) => a.type === 'low_coverage_incentive');
  const peakHourRules = adjustments.filter((a) => a.type === 'peak_hour');

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      city_multiplier: '#3B82F6',
      low_coverage_incentive: '#F59E0B',
      peak_hour: '#8B5CF6',
    };
    return colors[type] || '#6B7280';
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      city_multiplier: 'City Multiplier',
      low_coverage_incentive: 'Low-Coverage Incentive',
      peak_hour: 'Peak Hour',
    };
    return labels[type] || type;
  };

  const getMultiplierColor = (multiplier: number) => {
    if (multiplier > 1.1) return '#EF4444';
    if (multiplier > 1.0) return '#F59E0B';
    if (multiplier < 1.0) return '#10B981';
    return '#6B7280';
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box mb={3}>
        <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
          <MapPin size={20} color="#3B82F6" />
          <Typography variant="h6" fontWeight="600">
            Location & Demand Adjustments
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          City-based multipliers, low-coverage incentives, and peak-hour pricing
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* City Multipliers */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <Target size={16} color="#3B82F6" />
              <Typography variant="subtitle2" fontWeight="600">City Multipliers</Typography>
            </Stack>
            <Stack spacing={1.5}>
              {cityMultipliers.map((adj) => (
                <Box key={adj.id} sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" fontWeight="500">{adj.city}</Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      {adj.multiplier > 1 ? (
                        <TrendingUp size={14} color={getMultiplierColor(adj.multiplier)} />
                      ) : adj.multiplier < 1 ? (
                        <TrendingDown size={14} color={getMultiplierColor(adj.multiplier)} />
                      ) : null}
                      <Typography variant="body2" fontWeight="700" color={getMultiplierColor(adj.multiplier)}>
                        {adj.multiplier}x
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">{adj.reason}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* Low-Coverage Incentives */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ p: 2, border: '1px solid', borderColor: '#F59E0B40', borderRadius: 2, bgcolor: '#FFFBEB08' }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <MapPin size={16} color="#F59E0B" />
              <Typography variant="subtitle2" fontWeight="600">Low-Coverage Incentives</Typography>
            </Stack>
            {lowCoverageIncentives.length > 0 ? (
              <Stack spacing={1.5}>
                {lowCoverageIncentives.map((adj) => (
                  <Box key={adj.id} sx={{ p: 1.5, bgcolor: '#FFFBEB', borderRadius: 1, border: '1px solid #FDE68A' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight="500">{adj.city}</Typography>
                        {adj.zone && (
                          <Typography variant="caption" color="text.secondary">{adj.zone}</Typography>
                        )}
                      </Box>
                      <Chip
                        label={`${adj.multiplier}x`}
                        size="small"
                        sx={{ bgcolor: '#F59E0B15', color: '#F59E0B', fontWeight: 700 }}
                      />
                    </Stack>
                    <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                      {adj.reason}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">No active incentives</Typography>
            )}
          </Box>
        </Grid>

        {/* Peak Hour Rules */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ p: 2, border: '1px solid', borderColor: '#8B5CF640', borderRadius: 2, bgcolor: '#F5F3FF08' }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <Clock size={16} color="#8B5CF6" />
              <Typography variant="subtitle2" fontWeight="600">Peak-Hour Pricing</Typography>
            </Stack>
            {peakHourRules.length > 0 ? (
              <Stack spacing={1.5}>
                {peakHourRules.map((adj) => (
                  <Box key={adj.id} sx={{ p: 1.5, bgcolor: '#F5F3FF', borderRadius: 1, border: '1px solid #DDD6FE' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" fontWeight="500">{adj.city}</Typography>
                      <Chip
                        label={`${adj.multiplier}x`}
                        size="small"
                        sx={{ bgcolor: '#8B5CF615', color: '#8B5CF6', fontWeight: 700 }}
                      />
                    </Stack>
                    <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                      {adj.reason}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">No peak-hour rules</Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Multipliers are applied on top of base rates. A 1.15x multiplier on a ₦130/kg base rate = ₦149.50/kg effective rate. Low-coverage incentives attract agents to underserved zones.
        </Typography>
      </Box>
    </Paper>
  );
};

export default LocationDemandAdjustmentsPanel;
