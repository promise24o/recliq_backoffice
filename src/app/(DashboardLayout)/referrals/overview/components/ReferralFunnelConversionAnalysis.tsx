'use client';
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Button, Alert, Grid, LinearProgress, Chip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CheckCircle, 
  Target, 
  BarChart3, 
  Calendar,
  MapPin,
  Clock,
  Zap,
  RefreshCw,
  Download,
  Eye
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { ReferralFunnel, ReferralAnalytics } from '../types';

interface ReferralFunnelConversionAnalysisProps {
  funnel: ReferralFunnel[];
  analytics: ReferralAnalytics;
  onExportAnalytics: () => void;
  onGenerateReport: () => void;
}

const ReferralFunnelConversionAnalysis: React.FC<ReferralFunnelConversionAnalysisProps> = ({
  funnel,
  analytics,
  onExportAnalytics,
  onGenerateReport
}) => {
  const [viewMode, setViewMode] = useState<'funnel' | 'trends' | 'breakdown'>('funnel');
  const [breakdownType, setBreakdownType] = useState<'city' | 'referrer_type' | 'action_type' | 'reward_type'>('city');

  const getFunnelStepColor = (step: string): string => {
    switch (step) {
      case 'Invites Sent': return '#3b82f6';
      case 'Signups Completed': return '#10b981';
      case 'First Action': return '#8b5cf6';
      case 'Rewards Issued': return '#059669';
      default: return '#6b7280';
    }
  };

  const getTrendColor = (trend: number): string => {
    if (trend > 0) return '#10b981';
    if (trend < 0) return '#ef4444';
    return '#6b7280';
  };

  const getPerformanceColor = (value: number, type: 'conversion' | 'time' | 'quality'): string => {
    switch (type) {
      case 'conversion':
        if (value >= 40) return '#10b981';
        if (value >= 30) return '#3b82f6';
        if (value >= 20) return '#f59e0b';
        return '#ef4444';
      case 'time':
        if (value <= 24) return '#10b981';
        if (value <= 48) return '#3b82f6';
        if (value <= 72) return '#f59e0b';
        return '#ef4444';
      case 'quality':
        if (value >= 8) return '#10b981';
        if (value >= 6) return '#3b82f6';
        if (value >= 4) return '#f59e0b';
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const formatDuration = (hours: number): string => {
    if (hours < 1) return '< 1h';
    if (hours < 24) return `${hours.toFixed(1)}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <DashboardCard title="Referral Funnel & Conversion Analysis">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📊 Funnel visualization • Conversion trends • Performance breakdowns
          </Typography>
        </Box>

        {/* Controls */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3} flexWrap="wrap">
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, newViewMode) => setViewMode(newViewMode as 'funnel' | 'trends' | 'breakdown')}
            size="small"
          >
            <ToggleButton value="funnel">Funnel</ToggleButton>
            <ToggleButton value="trends">Trends</ToggleButton>
            <ToggleButton value="breakdown">Breakdown</ToggleButton>
          </ToggleButtonGroup>

          {viewMode === 'breakdown' && (
            <ToggleButtonGroup
              value={breakdownType}
              exclusive
              onChange={(e, newBreakdownType) => setBreakdownType(newBreakdownType as 'city' | 'referrer_type' | 'action_type' | 'reward_type')}
              size="small"
            >
              <ToggleButton value="city">City</ToggleButton>
              <ToggleButton value="referrer_type">Referrer Type</ToggleButton>
              <ToggleButton value="action_type">Action Type</ToggleButton>
              <ToggleButton value="reward_type">Reward Type</ToggleButton>
            </ToggleButtonGroup>
          )}

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

        {/* Funnel View */}
        {viewMode === 'funnel' && (
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight="600">
              Referral Conversion Funnel
            </Typography>
            
            <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Stack spacing={3}>
                {funnel.map((step, index) => (
                  <Box key={step.step}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2" fontWeight="500">
                        {step.step}
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="body2" fontWeight="600" color={getFunnelStepColor(step.step)}>
                          {step.count.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ({step.percentage.toFixed(1)}%)
                        </Typography>
                      </Stack>
                    </Stack>
                    
                    <Box sx={{ position: 'relative' }}>
                      <LinearProgress
                        variant="determinate"
                        value={step.percentage}
                        sx={{
                          height: 12,
                          borderRadius: 6,
                          bgcolor: '#e2e8f0',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 6,
                            bgcolor: getFunnelStepColor(step.step)
                          }
                        }}
                      />
                    </Box>

                    {step.dropOffReason && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                        Drop-off: {step.dropOffReason}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Funnel Insights */}
            <Alert severity="info">
              <Typography variant="body2" fontWeight="600" mb={1}>
                Funnel Analysis
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  • {funnel[0].count} invites sent with {funnel[1].count} signups ({((funnel[1].count / funnel[0].count) * 100).toFixed(1)}% signup rate)
                </Typography>
                <Typography variant="body2">
                  • {funnel[2].count} activated users ({((funnel[2].count / funnel[1].count) * 100).toFixed(1)}% activation rate)
                </Typography>
                <Typography variant="body2">
                  • {funnel[3].count} rewards issued ({((funnel[3].count / funnel[2].count) * 100).toFixed(1)}% reward rate)
                </Typography>
                <Typography variant="body2">
                  • Overall conversion: {((funnel[3].count / funnel[0].count) * 100).toFixed(1)}% from invite to reward
                </Typography>
              </Stack>
            </Alert>
          </Stack>
        )}

        {/* Trends View */}
        {viewMode === 'trends' && (
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight="600">
              Monthly Conversion Trends
            </Typography>
            
            <Grid container spacing={3}>
              {analytics.monthlyTrends.map((trend, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={trend.month}>
                  <Card sx={{ bgcolor: '#f8fafc' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography variant="body2" fontWeight="500">
                          {trend.month}
                        </Typography>
                        
                        <Stack spacing={1}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Invites
                            </Typography>
                            <Typography variant="body2" fontWeight="600">
                              {trend.invites.toLocaleString()}
                            </Typography>
                          </Stack>
                          
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Signups
                            </Typography>
                            <Typography variant="body2" fontWeight="600">
                              {trend.signups.toLocaleString()}
                            </Typography>
                          </Stack>
                          
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Activations
                            </Typography>
                            <Typography variant="body2" fontWeight="600">
                              {trend.activations.toLocaleString()}
                            </Typography>
                          </Stack>
                          
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Rewards
                            </Typography>
                            <Typography variant="body2" fontWeight="600">
                              {trend.rewards.toLocaleString()}
                            </Typography>
                          </Stack>
                        </Stack>
                        
                        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e2e8f0' }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="caption" color="text.secondary">
                              Conversion Rate
                            </Typography>
                            <Typography variant="caption" fontWeight="600" color={getPerformanceColor((trend.activations / trend.invites) * 100, 'conversion')}>
                              {((trend.activations / trend.invites) * 100).toFixed(1)}%
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}

        {/* Breakdown View */}
        {viewMode === 'breakdown' && (
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight="600">
              Performance Breakdown by {breakdownType.replace('_', ' ').charAt(0).toUpperCase() + breakdownType.slice(1)}
            </Typography>
            
            {breakdownType === 'city' && (
              <Grid container spacing={3}>
                {analytics.performanceByCity.map((city, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={city.city}>
                    <Card sx={{ bgcolor: '#f8fafc' }}>
                      <CardContent>
                        <Stack spacing={2}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" spacing={1} alignItems="center">
                              <MapPin size={16} color="#3b82f6" />
                              <Typography variant="body2" fontWeight="500">
                                {city.city}
                              </Typography>
                            </Stack>
                            <Chip
                              label={`${city.referrals} referrals`}
                              size="small"
                              sx={{ fontSize: '0.75rem' }}
                            />
                          </Stack>
                          
                          <Stack spacing={1}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="body2" color="text.secondary">
                                Conversion Rate
                              </Typography>
                              <Typography variant="body2" fontWeight="600" color={getPerformanceColor(city.conversionRate, 'conversion')}>
                                {city.conversionRate.toFixed(1)}%
                              </Typography>
                            </Stack>
                            
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="body2" color="text.secondary">
                                Avg Time to Activation
                              </Typography>
                              <Typography variant="body2" fontWeight="600" color={getPerformanceColor(city.avgTimeToActivation, 'time')}>
                                {formatDuration(city.avgTimeToActivation)}
                              </Typography>
                            </Stack>
                            
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="body2" color="text.secondary">
                                Abuse Rate
                              </Typography>
                              <Typography variant="body2" fontWeight="600" color={city.abuseRate > 2 ? '#ef4444' : city.abuseRate > 1 ? '#f59e0b' : '#10b981'}>
                                {city.abuseRate.toFixed(1)}%
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {breakdownType === 'referrer_type' && (
              <Grid container spacing={3}>
                {analytics.performanceByReferrerType.map((type, index) => (
                  <Grid size={{ xs: 12, md: 4 }} key={type.type}>
                    <Card sx={{ bgcolor: '#f8fafc' }}>
                      <CardContent>
                        <Stack spacing={2}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Users size={16} color="#8b5cf6" />
                              <Typography variant="body2" fontWeight="500">
                                {type.type.charAt(0).toUpperCase() + type.type.slice(1)}s
                              </Typography>
                            </Stack>
                            <Chip
                              label={`${type.referrals} referrals`}
                              size="small"
                              sx={{ fontSize: '0.75rem' }}
                            />
                          </Stack>
                          
                          <Stack spacing={1}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="body2" color="text.secondary">
                                Conversion Rate
                              </Typography>
                              <Typography variant="body2" fontWeight="600" color={getPerformanceColor(type.conversionRate, 'conversion')}>
                                {type.conversionRate.toFixed(1)}%
                              </Typography>
                            </Stack>
                            
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="body2" color="text.secondary">
                                Avg Time to Activation
                              </Typography>
                              <Typography variant="body2" fontWeight="600" color={getPerformanceColor(type.avgTimeToActivation, 'time')}>
                                {formatDuration(type.avgTimeToActivation)}
                              </Typography>
                            </Stack>
                            
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="body2" color="text.secondary">
                                Quality Score
                              </Typography>
                              <Typography variant="body2" fontWeight="600" color={getPerformanceColor(type.qualityScore, 'quality')}>
                                {type.qualityScore.toFixed(1)}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Stack>
        )}

        {/* Summary */}
        <Alert severity="success" sx={{ mt: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            Conversion Analysis Summary
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • Overall conversion rate: {analytics.conversionRate.toFixed(1)}% from invite to activation
            </Typography>
            <Typography variant="body2">
              • Average activation time: {formatDuration(analytics.avgTimeToActivation)}
            </Typography>
            <Typography variant="body2">
              • {analytics.abuseRate.toFixed(1)}% abuse rate indicates {analytics.abuseRate < 2 ? 'healthy' : 'concerning'} referral quality
            </Typography>
            <Typography variant="body2">
              • {analytics.retentionRate.toFixed(1)}% retention rate shows {analytics.retentionRate >= 75 ? 'strong' : 'moderate'} long-term value
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default ReferralFunnelConversionAnalysis;
