'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Grid, LinearProgress, Alert } from '@mui/material';
import { 
  AlertTriangle, 
  Shield, 
  CheckCircle, 
  Clock, 
  DollarSign,
  TrendingUp,
  Users,
  Target,
  Zap,
  Activity,
  Ban,
  Eye
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { FraudRiskSummary } from '../types';

interface FraudRiskSummaryCardsProps {
  summary: FraudRiskSummary;
  onCardClick?: (metricType: string) => void;
}

const FraudRiskSummaryCards: React.FC<FraudRiskSummaryCardsProps> = ({ 
  summary, 
  onCardClick 
}) => {
  const summaryCards = [
    {
      title: 'Flagged Referrals',
      value: summary.flaggedReferrals.toLocaleString(),
      subtitle: 'Total under review',
      icon: <AlertTriangle size={24} color="#f59e0b" />,
      color: '#f59e0b',
      bgColor: '#f59e0b15',
      metricType: 'flagged_referrals'
    },
    {
      title: 'High-Risk Cases',
      value: summary.highRiskCases.toLocaleString(),
      subtitle: 'Immediate attention needed',
      icon: <Shield size={24} color="#ef4444" />,
      color: '#ef4444',
      bgColor: '#ef444415',
      metricType: 'high_risk_cases'
    },
    {
      title: 'Confirmed Fraud',
      value: summary.confirmedFraud.toLocaleString(),
      subtitle: 'Verified abuse cases',
      icon: <Ban size={24} color="#dc2626" />,
      color: '#dc2626',
      bgColor: '#dc262615',
      metricType: 'confirmed_fraud'
    },
    {
      title: 'Cleared Cases',
      value: summary.clearedCases.toLocaleString(),
      subtitle: 'False positives resolved',
      icon: <CheckCircle size={24} color="#10b981" />,
      color: '#10b981',
      bgColor: '#10b98115',
      metricType: 'cleared_cases'
    },
    {
      title: 'Avg Review Time',
      value: `${summary.avgReviewTime.toFixed(1)} days`,
      subtitle: 'Investigation efficiency',
      icon: <Clock size={24} color="#3b82f6" />,
      color: '#3b82f6',
      bgColor: '#3b82f615',
      metricType: 'avg_review_time'
    },
    {
      title: 'Rewards Protected',
      value: `₦${summary.rewardsProtected.toLocaleString()}`,
      subtitle: 'Prevented payouts',
      icon: <DollarSign size={24} color="#059669" />,
      color: '#059669',
      bgColor: '#05966915',
      metricType: 'rewards_protected'
    }
  ];

  const handleCardClick = (metricType: string) => {
    if (onCardClick) {
      onCardClick(metricType);
    }
  };

  const getFraudRateColor = (rate: number): string => {
    if (rate >= 5) return '#ef4444';
    if (rate >= 3) return '#f59e0b';
    if (rate >= 1) return '#3b82f6';
    return '#10b981';
  };

  const getDetectionAccuracyColor = (accuracy: number): string => {
    if (accuracy >= 90) return '#10b981';
    if (accuracy >= 75) return '#3b82f6';
    if (accuracy >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getFalsePositiveRateColor = (rate: number): string => {
    if (rate <= 5) return '#10b981';
    if (rate <= 10) return '#3b82f6';
    if (rate <= 20) return '#f59e0b';
    return '#ef4444';
  };

  const getFinancialExposureColor = (exposure: number): string => {
    if (exposure >= 10000) return '#ef4444';
    if (exposure >= 5000) return '#f59e0b';
    if (exposure >= 1000) return '#3b82f6';
    return '#10b981';
  };

  return (
    <DashboardCard title="Fraud Risk Summary">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🚩 Growth risk exposure • Fraud detection • Enforcement actions
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
            Detection Performance
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Fraud Rate
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AlertTriangle size={16} color={getFraudRateColor(summary.fraudRate)} />
                  <Typography variant="h6" fontWeight="600" color={getFraudRateColor(summary.fraudRate)}>
                    {summary.fraudRate.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Detection Accuracy
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Target size={16} color={getDetectionAccuracyColor(summary.detectionAccuracy)} />
                  <Typography variant="h6" fontWeight="600" color={getDetectionAccuracyColor(summary.detectionAccuracy)}>
                    {summary.detectionAccuracy.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  False Positive Rate
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Eye size={16} color={getFalsePositiveRateColor(summary.falsePositiveRate)} />
                  <Typography variant="h6" fontWeight="600" color={getFalsePositiveRateColor(summary.falsePositiveRate)}>
                    {summary.falsePositiveRate.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Financial Exposure
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <DollarSign size={16} color={getFinancialExposureColor(summary.totalFinancialExposure)} />
                  <Typography variant="h6" fontWeight="600" color={getFinancialExposureColor(summary.totalFinancialExposure)}>
                    ₦{summary.totalFinancialExposure.toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Case Status Overview */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Case Status Overview
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Open Cases
                </Typography>
                <Typography variant="h6" fontWeight="600" color="#3b82f6">
                  {summary.openCases.toLocaleString()}
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Escalated Cases
                </Typography>
                <Typography variant="h6" fontWeight="600" color="#dc2626">
                  {summary.escalatedCases.toLocaleString()}
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Total Cases Processed
                </Typography>
                <Typography variant="h6" fontWeight="600" color="#6b7280">
                  {(summary.confirmedFraud + summary.clearedCases).toLocaleString()}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Progress Indicators */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Detection Performance
          </Typography>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Detection Accuracy
                </Typography>
                <Typography variant="body2" fontWeight="500" color={getDetectionAccuracyColor(summary.detectionAccuracy)}>
                  {summary.detectionAccuracy.toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={summary.detectionAccuracy}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: getDetectionAccuracyColor(summary.detectionAccuracy)
                  }
                }}
              />
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  False Positive Rate (Lower is Better)
                </Typography>
                <Typography variant="body2" fontWeight="500" color={getFalsePositiveRateColor(summary.falsePositiveRate)}>
                  {summary.falsePositiveRate.toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={100 - summary.falsePositiveRate}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: getFalsePositiveRateColor(summary.falsePositiveRate)
                  }
                }}
              />
            </Stack>
          </Stack>
        </Box>

        {/* Risk Assessment Alert */}
        <Alert 
          severity={summary.highRiskCases > 0 ? 'warning' : summary.confirmedFraud > 0 ? 'error' : 'success'}
          sx={{ mt: 3 }}
        >
          <Typography variant="body2" fontWeight="600" mb={1}>
            Risk Assessment Summary
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {summary.flaggedReferrals} referrals currently under investigation
            </Typography>
            <Typography variant="body2">
              • {summary.highRiskCases} high-risk cases require immediate attention
            </Typography>
            <Typography variant="body2">
              • ₦{summary.rewardsProtected.toLocaleString()} in rewards protected from fraud
            </Typography>
            <Typography variant="body2">
              • {summary.fraudRate.toFixed(1)}% fraud rate indicates {summary.fraudRate <= 2 ? 'healthy' : summary.fraudRate <= 5 ? 'moderate' : 'high'} risk level
            </Typography>
            <Typography variant="body2">
              • {summary.detectionAccuracy.toFixed(1)}% detection accuracy shows {summary.detectionAccuracy >= 85 ? 'excellent' : summary.detectionAccuracy >= 75 ? 'good' : 'needs improvement'} system performance
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default FraudRiskSummaryCards;
