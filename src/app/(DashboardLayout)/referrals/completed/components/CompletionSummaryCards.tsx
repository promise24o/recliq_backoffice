'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Grid, LinearProgress, Alert } from '@mui/material';
import { 
  CheckCircle, 
  Recycle, 
  Scale, 
  Gift, 
  Users, 
  Clock,
  TrendingUp,
  Target,
  Zap,
  Activity,
  DollarSign,
  Award
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { CompletionSummary } from '../types';

interface CompletionSummaryCardsProps {
  summary: CompletionSummary;
  onCardClick?: (metricType: string) => void;
}

const CompletionSummaryCards: React.FC<CompletionSummaryCardsProps> = ({ 
  summary, 
  onCardClick 
}) => {
  const summaryCards = [
    {
      title: 'Total Completed Referrals',
      value: summary.totalCompletedReferrals.toLocaleString(),
      subtitle: 'Fully activated referrals',
      icon: <CheckCircle size={24} color="#10b981" />,
      color: '#10b981',
      bgColor: '#10b98115',
      metricType: 'total_completed'
    },
    {
      title: 'First Actions Completed',
      value: summary.firstActionsCompleted.toLocaleString(),
      subtitle: 'Pickups & drop-offs',
      icon: <Recycle size={24} color="#3b82f6" />,
      color: '#3b82f6',
      bgColor: '#3b82f615',
      metricType: 'first_actions'
    },
    {
      title: 'Total Weight Recycled',
      value: `${summary.totalWeightRecycled.toFixed(1)} kg`,
      subtitle: 'Via referred users',
      icon: <Scale size={24} color="#f59e0b" />,
      color: '#f59e0b',
      bgColor: '#f59e0b15',
      metricType: 'total_weight'
    },
    {
      title: 'Total Rewards Issued',
      value: `₦${summary.totalRewardsIssued.toLocaleString()}`,
      subtitle: 'Points / bonuses',
      icon: <Gift size={24} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgColor: '#8b5cf615',
      metricType: 'total_rewards'
    },
    {
      title: 'Top Referrers',
      value: summary.topReferrersCount.toLocaleString(),
      subtitle: 'Highest-quality growth',
      icon: <Users size={24} color="#059669" />,
      color: '#059669',
      bgColor: '#05966915',
      metricType: 'top_referrers'
    },
    {
      title: 'Avg Time to Completion',
      value: `${summary.avgTimeToCompletion.toFixed(1)} days`,
      subtitle: 'Invite → first action',
      icon: <Clock size={24} color="#f97316" />,
      color: '#f97316',
      bgColor: '#f9731615',
      metricType: 'avg_time'
    }
  ];

  const handleCardClick = (metricType: string) => {
    if (onCardClick) {
      onCardClick(metricType);
    }
  };

  const getCompletionRateColor = (rate: number): string => {
    if (rate >= 80) return '#10b981';
    if (rate >= 60) return '#3b82f6';
    if (rate >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getRetentionRateColor = (rate: number): string => {
    if (rate >= 75) return '#10b981';
    if (rate >= 50) return '#3b82f6';
    if (rate >= 25) return '#f59e0b';
    return '#ef4444';
  };

  const getROIColor = (roi: number): string => {
    if (roi >= 200) return '#10b981';
    if (roi >= 150) return '#3b82f6';
    if (roi >= 100) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <DashboardCard title="Completion Summary">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            ✅ Successful growth outcomes • Verified recycling activity • Reward issuance
          </Typography>
        </Box>

        {/* Main Summary Cards */}
        <Grid container spacing={2} mb={3}>
          {summaryCards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2
                  }
                }}
                onClick={() => handleCardClick(card.metricType)}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: card.bgColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {card.icon}
                      </Box>
                      
                      <Box flex={1}>
                        <Typography variant="body2" color="text.secondary" mb={0.5}>
                          {card.title}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          fontWeight="600" 
                          color={card.color}
                          mb={0.5}
                        >
                          {card.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {card.subtitle}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Key Performance Metrics */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Key Performance Metrics
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Completion Rate
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Target size={16} color={getCompletionRateColor(summary.completionRate)} />
                  <Typography variant="h6" fontWeight="600" color={getCompletionRateColor(summary.completionRate)}>
                    {summary.completionRate.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  30-Day Retention
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Activity size={16} color={getRetentionRateColor(summary.retention30DayRate)} />
                  <Typography variant="h6" fontWeight="600" color={getRetentionRateColor(summary.retention30DayRate)}>
                    {summary.retention30DayRate.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  60-Day Retention
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Clock size={16} color={getRetentionRateColor(summary.retention60DayRate)} />
                  <Typography variant="h6" fontWeight="600" color={getRetentionRateColor(summary.retention60DayRate)}>
                    {summary.retention60DayRate.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Overall ROI
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <DollarSign size={16} color={getROIColor(summary.overallROI)} />
                  <Typography variant="h6" fontWeight="600" color={getROIColor(summary.overallROI)}>
                    {summary.overallROI.toFixed(0)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Financial Summary */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Financial Summary
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Total Referral Cost
                </Typography>
                <Typography variant="h6" fontWeight="600" color="#ef4444">
                  ₦{summary.totalReferralCost.toLocaleString()}
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Revenue Generated
                </Typography>
                <Typography variant="h6" fontWeight="600" color="#10b981">
                  ₦{summary.totalRevenueGenerated.toLocaleString()}
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Avg Reward per Referral
                </Typography>
                <Typography variant="h6" fontWeight="600" color="#3b82f6">
                  ₦{summary.avgRewardPerReferral.toLocaleString()}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Progress Indicators */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Success Metrics
          </Typography>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Completion Rate
                </Typography>
                <Typography variant="body2" fontWeight="500" color={getCompletionRateColor(summary.completionRate)}>
                  {summary.completionRate.toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={summary.completionRate}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: getCompletionRateColor(summary.completionRate)
                  }
                }}
              />
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  30-Day Retention Rate
                </Typography>
                <Typography variant="body2" fontWeight="500" color={getRetentionRateColor(summary.retention30DayRate)}>
                  {summary.retention30DayRate.toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={summary.retention30DayRate}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: getRetentionRateColor(summary.retention30DayRate)
                  }
                }}
              />
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  60-Day Retention Rate
                </Typography>
                <Typography variant="body2" fontWeight="500" color={getRetentionRateColor(summary.retention60DayRate)}>
                  {summary.retention60DayRate.toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={summary.retention60DayRate}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: getRetentionRateColor(summary.retention60DayRate)
                  }
                }}
              />
            </Stack>
          </Stack>
        </Box>

        {/* Success Alert */}
        <Alert 
          severity={summary.completionRate >= 80 ? 'success' : summary.completionRate >= 60 ? 'warning' : 'error'}
          sx={{ mt: 3 }}
        >
          <Typography variant="body2" fontWeight="600" mb={1}>
            Growth Quality Assessment
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {summary.totalCompletedReferrals} referrals successfully completed activation
            </Typography>
            <Typography variant="body2">
              • {summary.totalWeightRecycled.toFixed(1)} kg recycled through referred users
            </Typography>
            <Typography variant="body2">
              • ₦{summary.totalRevenueGenerated.toLocaleString()} revenue generated from referrals
            </Typography>
            <Typography variant="body2">
              • {summary.overallROI.toFixed(0)}% ROI indicates {summary.overallROI >= 150 ? 'excellent' : summary.overallROI >= 100 ? 'good' : 'needs improvement'} program performance
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default CompletionSummaryCards;
