'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Grid, LinearProgress, Alert } from '@mui/material';
import { 
  Clock, 
  Search, 
  Scale, 
  Award, 
  AlertTriangle, 
  Calendar,
  TrendingUp,
  Users,
  Target,
  Zap,
  Activity
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { PendingReferralSummary } from '../types';

interface PendingSummaryCardsProps {
  summary: PendingReferralSummary;
  onCardClick?: (metricType: string) => void;
}

const PendingSummaryCards: React.FC<PendingSummaryCardsProps> = ({ 
  summary, 
  onCardClick 
}) => {
  const summaryCards = [
    {
      title: 'Total Pending Referrals',
      value: summary.totalPendingReferrals.toLocaleString(),
      subtitle: 'All incomplete referrals',
      icon: <Clock size={24} color="#3b82f6" />,
      color: '#3b82f6',
      bgColor: '#3b82f615',
      metricType: 'total_pending'
    },
    {
      title: 'Awaiting First Action',
      value: summary.awaitingFirstAction.toLocaleString(),
      subtitle: 'No pickup / drop-off yet',
      icon: <Search size={24} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgColor: '#8b5cf615',
      metricType: 'awaiting_first_action'
    },
    {
      title: 'Awaiting Verification',
      value: summary.awaitingVerification.toLocaleString(),
      subtitle: 'Weight / payout pending',
      icon: <Scale size={24} color="#f59e0b" />,
      color: '#f59e0b',
      bgColor: '#f59e0b15',
      metricType: 'awaiting_verification'
    },
    {
      title: 'Awaiting Reward Approval',
      value: summary.awaitingRewardApproval.toLocaleString(),
      subtitle: 'Passed activation, reward on hold',
      icon: <Award size={24} color="#10b981" />,
      color: '#10b981',
      bgColor: '#10b98115',
      metricType: 'awaiting_reward_approval'
    },
    {
      title: 'Flagged for Review',
      value: summary.flaggedForReview.toLocaleString(),
      subtitle: 'Fraud / abuse checks',
      icon: <AlertTriangle size={24} color="#ef4444" />,
      color: '#ef4444',
      bgColor: '#ef444415',
      metricType: 'flagged_for_review'
    },
    {
      title: 'Stuck > 7 Days',
      value: summary.stuckOver7Days.toLocaleString(),
      subtitle: 'High-risk drop-off',
      icon: <Calendar size={24} color="#f97316" />,
      color: '#f97316',
      bgColor: '#f9731615',
      metricType: 'stuck_over_7_days'
    }
  ];

  const handleCardClick = (metricType: string) => {
    if (onCardClick) {
      onCardClick(metricType);
    }
  };

  const getConversionRateColor = (rate: number): string => {
    if (rate >= 40) return '#10b981';
    if (rate >= 25) return '#3b82f6';
    if (rate >= 15) return '#f59e0b';
    return '#ef4444';
  };

  const getHighRiskColor = (count: number): string => {
    if (count === 0) return '#10b981';
    if (count <= 2) return '#f59e0b';
    if (count <= 5) return '#f97316';
    return '#ef4444';
  };

  const getAvgDaysColor = (days: number): string => {
    if (days <= 3) return '#10b981';
    if (days <= 7) return '#3b82f6';
    if (days <= 14) return '#f59e0b';
    return '#ef4444';
  };

  const getInterventionSuccessColor = (rate: number): string => {
    if (rate >= 80) return '#10b981';
    if (rate >= 60) return '#3b82f6';
    if (rate >= 40) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <DashboardCard title="Pending Summary">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            ⏳ Activation backlog • Conversion pipeline • Risk assessment
          </Typography>
        </Box>

        <Stack spacing={2}>
          {summaryCards.map((card, index) => (
            <Card
              key={index}
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
                <Stack direction="row" spacing={3} alignItems="center">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
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

                  {/* Status Indicators */}
                  {card.metricType === 'flagged_for_review' && (
                    <Chip
                      label={summary.highRiskCount > 0 ? `${summary.highRiskCount} high risk` : 'Low risk'}
                      size="small"
                      sx={{
                        bgcolor: `${getHighRiskColor(summary.highRiskCount)}15`,
                        color: getHighRiskColor(summary.highRiskCount),
                        fontWeight: 500
                      }}
                    />
                  )}

                  {card.metricType === 'stuck_over_7_days' && (
                    <Chip
                      label={summary.stuckOver7Days > 5 ? 'Critical' : summary.stuckOver7Days > 2 ? 'Warning' : 'Monitor'}
                      size="small"
                      sx={{
                        bgcolor: `${getHighRiskColor(summary.stuckOver7Days)}15`,
                        color: getHighRiskColor(summary.stuckOver7Days),
                        fontWeight: 500
                      }}
                    />
                  )}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Key Metrics */}
        <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Key Performance Metrics
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Avg Days Pending
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Clock size={16} color={getAvgDaysColor(summary.avgDaysPending)} />
                  <Typography variant="h6" fontWeight="600" color={getAvgDaysColor(summary.avgDaysPending)}>
                    {summary.avgDaysPending.toFixed(1)} days
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Conversion Rate
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TrendingUp size={16} color={getConversionRateColor(summary.conversionRate)} />
                  <Typography variant="h6" fontWeight="600" color={getConversionRateColor(summary.conversionRate)}>
                    {summary.conversionRate.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Intervention Success
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Target size={16} color={getInterventionSuccessColor(summary.interventionSuccessRate)} />
                  <Typography variant="h6" fontWeight="600" color={getInterventionSuccessColor(summary.interventionSuccessRate)}>
                    {summary.interventionSuccessRate.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Progress Indicators */}
        <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Conversion Progress
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Pending → Activated
              </Typography>
              <Typography variant="body2" fontWeight="500" color={getConversionRateColor(summary.conversionRate)}>
                {summary.conversionRate.toFixed(1)}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={summary.conversionRate}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: '#e2e8f0',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  bgcolor: getConversionRateColor(summary.conversionRate)
                }
              }}
            />
          </Stack>

          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Intervention Success Rate
              </Typography>
              <Typography variant="body2" fontWeight="500" color={getInterventionSuccessColor(summary.interventionSuccessRate)}>
                {summary.interventionSuccessRate.toFixed(1)}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={summary.interventionSuccessRate}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: '#e2e8f0',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  bgcolor: getInterventionSuccessColor(summary.interventionSuccessRate)
                }
              }}
            />
          </Stack>
        </Box>

        {/* Risk Assessment */}
        <Alert 
          severity={summary.highRiskCount > 2 ? 'warning' : summary.highRiskCount > 0 ? 'info' : 'success'}
          sx={{ mt: 3 }}
        >
          <Typography variant="body2" fontWeight="600" mb={1}>
            Risk Assessment
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {summary.highRiskCount} high-risk referrals require immediate attention
            </Typography>
            <Typography variant="body2">
              • {summary.stuckOver7Days} referrals stuck over 7 days indicate drop-off risk
            </Typography>
            <Typography variant="body2">
              • {summary.conversionRate.toFixed(1)}% conversion rate shows {summary.conversionRate >= 25 ? 'healthy' : 'needs improvement'} activation flow
            </Typography>
            <Typography variant="body2">
              • {summary.interventionSuccessRate.toFixed(1)}% intervention success rate indicates {summary.interventionSuccessRate >= 70 ? 'effective' : 'needs optimization'} recovery strategies
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default PendingSummaryCards;
