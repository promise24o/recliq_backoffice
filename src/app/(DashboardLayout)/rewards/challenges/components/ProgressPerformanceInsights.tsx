'use client';
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Button, Alert, Accordion, AccordionSummary, AccordionDetails, Grid, LinearProgress, Chip } from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  Activity, 
  BarChart3, 
  Zap, 
  RefreshCw,
  ChevronDown,
  Download,
  Eye,
  AlertTriangle
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { ChallengePerformanceInsight } from '../types';

interface ProgressPerformanceInsightsProps {
  insights: ChallengePerformanceInsight[];
  onExportInsights: () => void;
  onGenerateReport: () => void;
}

const ProgressPerformanceInsights: React.FC<ProgressPerformanceInsightsProps> = ({
  insights,
  onExportInsights,
  onGenerateReport
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const getImpactColor = (value: number): string => {
    if (value >= 80) return '#10b981';
    if (value >= 60) return '#3b82f6';
    if (value >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getRoiColor = (roi: number): string => {
    if (roi >= 3) return '#10b981';
    if (roi >= 1) return '#3b82f6';
    if (roi >= 0) return '#f59e0b';
    return '#ef4444';
  };

  const formatCurrency = (value: number): string => {
    return `₦${value.toLocaleString()}`;
  };

  return (
    <DashboardCard title="Progress & Performance Insights">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📊 Analytics panels • Progress distribution • Behavioral impact • Cost vs outcome analysis
          </Typography>
        </Box>

        {/* Controls */}
        <Stack direction="row" spacing={2} mb={3}>
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
            onClick={onExportInsights}
          >
            Export Insights
          </Button>
        </Stack>

        {/* Summary Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ bgcolor: '#f8fafc' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: '#3b82f615',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <BarChart3 size={24} color="#3b82f6" />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="h6" fontWeight="600">
                      Total Challenges
                    </Typography>
                    <Typography variant="h4" fontWeight="600">
                      {insights.length}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ bgcolor: '#f8fafc' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: '#10b98115',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <TrendingUp size={24} color="#10b981" />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="h6" fontWeight="600">
                      Avg Target Achievement
                    </Typography>
                    <Typography variant="h4" fontWeight="600" color="#10b981">
                      {(insights.reduce((acc, insight) => acc + insight.effectiveness.targetAchievement, 0) / insights.length).toFixed(1)}%
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ bgcolor: '#f8fafc' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: '#f59e0b15',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <DollarSign size={24} color="#f59e0b" />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="h6" fontWeight="600">
                      Avg ROI
                    </Typography>
                    <Typography variant="h4" fontWeight="600" color="#f59e0b">
                      {(insights.reduce((acc, insight) => acc + insight.costAnalysis.roi, 0) / insights.length).toFixed(2)}x
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Challenge Insights */}
        <Stack spacing={3}>
          {insights.map((insight) => (
            <Card key={insight.challengeId} sx={{ border: '1px solid #e2e8f0' }}>
              <CardContent>
                <Stack spacing={3}>
                  {/* Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight="600">
                        {insight.challengeName}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={`Target: ${insight.effectiveness.targetAchievement.toFixed(1)}%`}
                          size="small"
                          sx={{
                            bgcolor: `${getImpactColor(insight.effectiveness.targetAchievement)}15`,
                            color: getImpactColor(insight.effectiveness.targetAchievement),
                            fontSize: '0.75rem'
                          }}
                        />
                        <Chip
                          label={`ROI: ${insight.costAnalysis.roi.toFixed(2)}x`}
                          size="small"
                          sx={{
                            bgcolor: `${getRoiColor(insight.costAnalysis.roi)}15`,
                            color: getRoiColor(insight.costAnalysis.roi),
                            fontSize: '0.75rem'
                          }}
                        />
                      </Stack>
                    </Box>
                  </Stack>

                  {/* Effectiveness */}
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="600" mb={2}>
                      Effectiveness Metrics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Target Achievement
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <TrendingUp size={16} color={getImpactColor(insight.effectiveness.targetAchievement)} />
                            <Typography variant="body2" fontWeight="500">
                              {insight.effectiveness.targetAchievement.toFixed(1)}%
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Participation vs Baseline
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            {insight.effectiveness.participationVsBaseline >= 0 ? (
                              <TrendingUp size={16} color="#10b981" />
                            ) : (
                              <TrendingDown size={16} color="#ef4444" />
                            )}
                            <Typography variant="body2" fontWeight="500">
                              {insight.effectiveness.participationVsBaseline > 0 ? '+' : ''}{insight.effectiveness.participationVsBaseline.toFixed(1)}%
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Post-Challenge Retention
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <TrendingUp size={16} color="#10b981" />
                            <Typography variant="body2" fontWeight="500">
                              {insight.effectiveness.postChallengeRetention.toFixed(1)}%
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Cost Analysis */}
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="600" mb={2}>
                      Cost Analysis
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Reward Cost
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {formatCurrency(insight.costAnalysis.rewardCost)}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Operational Cost
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {formatCurrency(insight.costAnalysis.operationalCost)}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Total Cost
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {formatCurrency(insight.costAnalysis.rewardCost + insight.costAnalysis.operationalCost)}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Behavioral Impact */}
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="600" mb={2}>
                      Behavioral Impact
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Pickup Frequency Change
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            {insight.behavioralImpact.pickupFrequencyChange >= 0 ? (
                              <TrendingUp size={16} color="#10b981" />
                            ) : (
                              <TrendingDown size={16} color="#ef4444" />
                            )}
                            <Typography variant="body2" fontWeight="500">
                              {insight.behavioralImpact.pickupFrequencyChange > 0 ? '+' : ''}{insight.behavioralImpact.pickupFrequencyChange.toFixed(1)}%
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Quality Score Change
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            {insight.behavioralImpact.qualityScoreChange >= 0 ? (
                              <TrendingUp size={16} color="#10b981" />
                            ) : (
                              <TrendingDown size={16} color="#ef4444" />
                            )}
                            <Typography variant="body2" fontWeight="500">
                              {insight.behavioralImpact.qualityScoreChange > 0 ? '+' : ''}{insight.behavioralImpact.qualityScoreChange.toFixed(1)}%
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Zone Coverage Change
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            {insight.behavioralImpact.zoneCoverageChange >= 0 ? (
                              <TrendingUp size={16} color="#10b981" />
                            ) : (
                              <TrendingDown size={16} color="#ef4444" />
                            )}
                            <Typography variant="body2" fontWeight="500">
                              {insight.behavioralImpact.zoneCoverageChange > 0 ? '+' : ''}{insight.behavioralImpact.zoneCoverageChange.toFixed(1)}%
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Recommendations */}
                  <Box sx={{ p: 2, bgcolor: '#f0f9ff', borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="600" mb={2}>
                      Recommendations
                    </Typography>
                    <Stack spacing={1}>
                      {insight.recommendations.map((recommendation, index) => (
                        <Typography key={index} variant="body2" color="text.secondary">
                          • {recommendation}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Summary */}
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            Performance Summary
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • Average target achievement: {(insights.reduce((acc, insight) => acc + insight.effectiveness.targetAchievement, 0) / insights.length).toFixed(1)}%
            </Typography>
            <Typography variant="body2">
              • Average ROI: {(insights.reduce((acc, insight) => acc + insight.costAnalysis.roi, 0) / insights.length).toFixed(2)}x
            </Typography>
            <Typography variant="body2">
              • Challenges show {insights.filter(i => i.effectiveness.targetAchievement > 70).length} high effectiveness
            </Typography>
            <Typography variant="body2">
              • Review recommendations for underperforming challenges
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default ProgressPerformanceInsights;
