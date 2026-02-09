'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Grid, Alert } from '@mui/material';
import { 
  Users, 
  CheckCircle, 
  Award, 
  Gift, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { ReferralSummary } from '../types';

interface ReferralSummaryCardsProps {
  summary: ReferralSummary;
  onCardClick?: (metricType: string) => void;
}

const ReferralSummaryCards: React.FC<ReferralSummaryCardsProps> = ({ 
  summary, 
  onCardClick 
}) => {
  const summaryCards = [
    {
      title: 'Invites Sent',
      value: summary.invitesSent.toLocaleString(),
      subtitle: 'Total referral invites',
      icon: <Users size={24} color="#3b82f6" />,
      color: '#3b82f6',
      bgColor: '#3b82f615',
      metricType: 'invites_sent'
    },
    {
      title: 'Signups Completed',
      value: summary.signupsCompleted.toLocaleString(),
      subtitle: 'Successful registrations',
      icon: <CheckCircle size={24} color="#10b981" />,
      color: '#10b981',
      bgColor: '#10b98115',
      metricType: 'signups_completed'
    },
    {
      title: 'Activated Referrals',
      value: summary.activatedReferrals.toLocaleString(),
      subtitle: 'Completed first pickup/drop-off',
      icon: <Award size={24} color="#059669" />,
      color: '#059669',
      bgColor: '#05966915',
      metricType: 'activated_referrals'
    },
    {
      title: 'Rewards Issued',
      value: summary.rewardsIssued.toLocaleString(),
      subtitle: 'Points / bonuses paid',
      icon: <Gift size={24} color="#f59e0b" />,
      color: '#f59e0b',
      bgColor: '#f59e0b15',
      metricType: 'rewards_issued'
    },
    {
      title: 'Conversion Rate',
      value: `${summary.conversionRate.toFixed(1)}%`,
      subtitle: 'Invite → activation',
      icon: <TrendingUp size={24} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgColor: '#8b5cf615',
      metricType: 'conversion_rate'
    },
    {
      title: 'Flagged Referrals',
      value: summary.flaggedReferrals.toLocaleString(),
      subtitle: 'Suspected abuse',
      icon: <AlertTriangle size={24} color="#ef4444" />,
      color: '#ef4444',
      bgColor: '#ef444415',
      metricType: 'flagged_referrals'
    }
  ];

  const handleCardClick = (metricType: string) => {
    if (onCardClick) {
      onCardClick(metricType);
    }
  };

  const getConversionRateColor = (rate: number): string => {
    if (rate >= 40) return '#10b981';
    if (rate >= 30) return '#3b82f6';
    if (rate >= 20) return '#f59e0b';
    return '#ef4444';
  };

  const getFlaggedReferralsColor = (count: number): string => {
    if (count === 0) return '#10b981';
    if (count <= 5) return '#f59e0b';
    if (count <= 15) return '#f97316';
    return '#ef4444';
  };

  return (
    <DashboardCard title="Referral Summary">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            👥 Growth pipeline health • Real user acquisition • Quality vs quantity metrics
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
                      color={
                        card.metricType === 'conversion_rate' 
                          ? getConversionRateColor(summary.conversionRate)
                          : card.metricType === 'flagged_referrals'
                          ? getFlaggedReferralsColor(summary.flaggedReferrals)
                          : card.color
                      }
                      mb={0.5}
                    >
                      {card.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {card.subtitle}
                    </Typography>
                  </Box>

                  {/* Status Indicators */}
                  {card.metricType === 'conversion_rate' && (
                    <Chip
                      label={summary.conversionRate >= 30 ? 'Good' : 'Needs Improvement'}
                      size="small"
                      sx={{
                        bgcolor: `${getConversionRateColor(summary.conversionRate)}15`,
                        color: getConversionRateColor(summary.conversionRate),
                        fontWeight: 500
                      }}
                    />
                  )}

                  {card.metricType === 'flagged_referrals' && (
                    <Chip
                      label={
                        summary.flaggedReferrals === 0 ? 'Clean' :
                        summary.flaggedReferrals <= 5 ? 'Monitor' :
                        summary.flaggedReferrals <= 15 ? 'Warning' : 'Critical'
                      }
                      size="small"
                      sx={{
                        bgcolor: `${getFlaggedReferralsColor(summary.flaggedReferrals)}15`,
                        color: getFlaggedReferralsColor(summary.flaggedReferrals),
                        fontWeight: 500
                      }}
                    />
                  )}

                  {card.metricType === 'rewards_issued' && (
                    <Chip
                      label={`₦${(summary.totalRewardValue / 1000).toFixed(1)}K total`}
                      size="small"
                      sx={{
                        bgcolor: '#f59e0b15',
                        color: '#f59e0b',
                        fontWeight: 500
                      }}
                    />
                  )}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Key Insights */}
        <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            Growth Health Indicators
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • {summary.conversionRate.toFixed(1)}% conversion rate shows {summary.conversionRate >= 30 ? 'healthy' : 'needs improvement'} referral quality
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • {summary.flaggedReferrals} flagged referrals require {summary.flaggedReferrals > 0 ? 'immediate attention' : 'monitoring'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Average {summary.avgTimeToActivation.toFixed(1)} hours to activation indicates {summary.avgTimeToActivation <= 48 ? 'efficient' : 'slow'} onboarding
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • ₦{(summary.totalRewardValue / 1000).toFixed(1)}K total reward exposure across {summary.rewardsIssued} successful referrals
            </Typography>
          </Stack>
        </Box>

        {/* Performance Metrics */}
        <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Performance Metrics
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Avg Time to Activation
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Clock size={16} color="#3b82f6" />
                  <Typography variant="h6" fontWeight="600" color="#3b82f6">
                    {summary.avgTimeToActivation.toFixed(1)}h
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Avg First Action Weight
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Target size={16} color="#10b981" />
                  <Typography variant="h6" fontWeight="600" color="#10b981">
                    {summary.avgFirstActionWeight.toFixed(1)}kg
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  30-Day Retention Rate
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Zap size={16} color="#059669" />
                  <Typography variant="h6" fontWeight="600" color="#059669">
                    {summary.retentionRate.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Quality Assessment */}
        <Alert 
          severity={summary.flaggedReferrals > 10 ? 'warning' : summary.flaggedReferrals > 0 ? 'info' : 'success'}
          sx={{ mt: 3 }}
        >
          <Typography variant="body2" fontWeight="600" mb={1}>
            Quality Assessment
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {summary.flaggedReferrals === 0 ? 'No abuse detected' : `${summary.flaggedReferrals} potential abuse cases detected`}
            </Typography>
            <Typography variant="body2">
              • {summary.conversionRate >= 30 ? 'Conversion rate is healthy' : 'Conversion rate needs improvement'}
            </Typography>
            <Typography variant="body2">
              • {summary.retentionRate >= 75 ? 'Referral retention is strong' : 'Monitor referral retention closely'}
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default ReferralSummaryCards;
