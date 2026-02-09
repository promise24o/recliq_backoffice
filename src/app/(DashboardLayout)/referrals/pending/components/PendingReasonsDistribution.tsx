'use client';
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Button, Alert, Grid, LinearProgress, Chip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Search, 
  Filter, 
  RefreshCw,
  Download,
  Eye,
  Activity,
  Calendar,
  Users,
  MapPin,
  Target
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { PendingReasonDistribution, TimeInPendingHistogram } from '../types';

interface PendingReasonsDistributionProps {
  reasonDistribution: PendingReasonDistribution[];
  timeHistogram: TimeInPendingHistogram[];
  onExportAnalytics: () => void;
  onGenerateReport: () => void;
}

const PendingReasonsDistribution: React.FC<PendingReasonsDistributionProps> = ({
  reasonDistribution,
  timeHistogram,
  onExportAnalytics,
  onGenerateReport
}) => {
  const [viewMode, setViewMode] = useState<'reasons' | 'time_histogram'>('reasons');

  const getReasonColor = (reason: string): string => {
    switch (reason) {
      case 'awaiting_first_action': return '#3b82f6';
      case 'awaiting_verification': return '#f59e0b';
      case 'awaiting_reward_approval': return '#10b981';
      case 'flagged_for_review': return '#ef4444';
      case 'dispute_open': return '#f97316';
      case 'fraud_checks': return '#dc2626';
      case 'weight_confirmation_pending': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getRiskLevelColor = (level: string): string => {
    switch (level) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      case 'critical': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getConversionRateColor = (rate: number): string => {
    if (rate >= 50) return '#10b981';
    if (rate >= 25) return '#3b82f6';
    if (rate >= 10) return '#f59e0b';
    return '#ef4444';
  };

  const getDaysRangeColor = (daysRange: string): string => {
    if (daysRange === '0-1 days') return '#10b981';
    if (daysRange === '2-3 days') return '#3b82f6';
    if (daysRange === '4-7 days') return '#f59e0b';
    if (daysRange === '8-14 days') return '#f97316';
    if (daysRange === '15+ days') return '#ef4444';
    return '#6b7280';
  };

  const formatDaysRange = (range: string): string => {
    if (range === '0-1 days') return '0-1';
    if (range === '2-3 days') return '2-3';
    if (range === '4-7 days') return '4-7';
    if (range === '8-14 days') return '8-14';
    if (range === '15+ days') return '15+';
    return range;
  };

  return (
    <DashboardCard title="Pending Reasons Distribution">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📊 Pending reason breakdown • Time-in-pending analysis • Bottleneck identification
          </Typography>
        </Box>

        {/* Controls */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, newViewMode) => setViewMode(newViewMode as 'reasons' | 'time_histogram')}
            size="small"
          >
            <ToggleButton value="reasons">Reasons</ToggleButton>
            <ToggleButton value="time_histogram">Time Histogram</ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ flex: 1 }} />

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<BarChart3 />}
              onClick={onGenerateReport}
            >
              Generate Report
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={onExportAnalytics}
            >
              Export Analytics
            </Button>
          </Stack>
        </Stack>

        {/* Reasons Distribution View */}
        {viewMode === 'reasons' && (
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight="600">
              Pending Reasons Breakdown
            </Typography>
            
            <Grid container spacing={3}>
              {reasonDistribution.map((reason, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={reason.reason}>
                  <Card sx={{ bgcolor: '#f8fafc' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                bgcolor: `${getReasonColor(reason.reason)}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Activity size={20} color={getReasonColor(reason.reason)} />
                            </Box>
                            <Box flex={1}>
                              <Typography variant="body2" fontWeight="500">
                                {reason.reason.replace('_', ' ').charAt(0).toUpperCase() + reason.reason.slice(1).replace('_', ' ')}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {reason.description}
                              </Typography>
                            </Box>
                          </Stack>
                          
                          <Chip
                            label={`${reason.count} referrals`}
                            size="small"
                            sx={{ fontSize: '0.75rem' }}
                          />
                        </Stack>
                        
                        <Stack spacing={1}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Percentage
                            </Typography>
                            <Typography variant="body2" fontWeight="600">
                              {reason.percentage.toFixed(1)}%
                            </Typography>
                          </Stack>
                          
                          <LinearProgress
                            variant="determinate"
                            value={reason.percentage}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: '#e2e8f0',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                                bgcolor: getReasonColor(reason.reason)
                              }
                            }}
                          />
                        </Stack>
                        
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" color="text.secondary">
                            Avg Days Pending
                          </Typography>
                          <Typography variant="body2" fontWeight="600">
                            {reason.avgDaysPending.toFixed(1)} days
                          </Typography>
                        </Stack>
                        
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" color="text.secondary">
                            Conversion Rate
                          </Typography>
                          <Typography variant="body2" fontWeight="600" color={getConversionRateColor(reason.conversionRate)}>
                            {reason.conversionRate.toFixed(1)}%
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}

        {/* Time Histogram View */}
        {viewMode === 'time_histogram' && (
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight="600">
              Time-in-Pending Histogram
            </Typography>
            
            <Grid container spacing={3}>
              {timeHistogram.map((histogram, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={histogram.daysRange}>
                  <Card sx={{ bgcolor: '#f8fafc' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                bgcolor: `${getDaysRangeColor(histogram.daysRange)}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Clock size={20} color={getDaysRangeColor(histogram.daysRange)} />
                            </Box>
                            <Box flex={1}>
                              <Typography variant="body2" fontWeight="500">
                                {formatDaysRange(histogram.daysRange)} Days
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Time in pending range
                              </Typography>
                            </Box>
                          </Stack>
                          
                          <Stack direction="row" spacing={1}>
                            <Chip
                              label={`${histogram.count} referrals`}
                              size="small"
                              sx={{ fontSize: '0.75rem' }}
                            />
                            <Chip
                              label={histogram.riskLevel.toUpperCase()}
                              size="small"
                              sx={{
                                bgcolor: `${getRiskLevelColor(histogram.riskLevel)}15`,
                                color: getRiskLevelColor(histogram.riskLevel),
                                fontSize: '0.7rem'
                              }}
                            />
                          </Stack>
                        </Stack>
                        
                        <Stack spacing={1}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Percentage
                            </Typography>
                            <Typography variant="body2" fontWeight="600">
                              {histogram.percentage.toFixed(1)}%
                            </Typography>
                          </Stack>
                          
                          <LinearProgress
                            variant="determinate"
                            value={histogram.percentage}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: '#e2e8f0',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                                bgcolor: getDaysRangeColor(histogram.daysRange)
                              }
                            }}
                          />
                        </Stack>
                        
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" color="text.secondary">
                            Conversion Rate
                          </Typography>
                          <Typography variant="body2" fontWeight="600" color={getConversionRateColor(histogram.conversionRate)}>
                            {histogram.conversionRate.toFixed(1)}%
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}

        {/* Summary */}
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            Distribution Analysis
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {reasonDistribution.find(r => r.reason === 'awaiting_first_action')?.count || 0} referrals awaiting first action - need activation nudges
            </Typography>
            <Typography variant="body2">
              • {reasonDistribution.find(r => r.reason === 'awaiting_verification')?.count || 0} referrals in verification - process optimization needed
            </Typography>
            <Typography variant="body2">
              • {reasonDistribution.find(r => r.reason === 'flagged_for_review')?.count || 0} referrals flagged for review - fraud prevention active
            </Typography>
            <Typography variant="body2">
              • {timeHistogram.filter(h => parseInt(h.daysRange.split('-')[0]) >= 8).reduce((acc, h) => acc + h.count, 0)} referrals stuck over 7 days - high drop-off risk
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default PendingReasonsDistribution;
