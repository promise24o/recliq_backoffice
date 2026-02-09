'use client';
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Button, Grid, LinearProgress, Chip, Alert, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Award, 
  ChevronDown,
  BarChart3,
  Activity,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { BadgeEarningsInsight } from '../types';

interface BadgeEarningsQualityInsightsProps {
  insights: BadgeEarningsInsight[];
  onExportInsights: () => void;
  onGenerateReport: () => void;
}

const BadgeEarningsQualityInsights: React.FC<BadgeEarningsQualityInsightsProps> = ({
  insights,
  onExportInsights,
  onGenerateReport
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const getImpactColor = (score: number) => {
    if (score >= 9) return '#10b981';
    if (score >= 7) return '#3b82f6';
    if (score >= 5) return '#f59e0b';
    return '#ef4444';
  };

  const getRetentionColor = (correlation: number) => {
    if (correlation >= 20) return '#10b981';
    if (correlation >= 10) return '#3b82f6';
    if (correlation >= 5) return '#f59e0b';
    return '#ef4444';
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const calculateBehaviorChange = (holder: number, nonHolder: number) => {
    const change = ((holder - nonHolder) / nonHolder) * 100;
    return change;
  };

  const getChangeIcon = (value: number) => {
    return value > 0 ? <TrendingUp size={16} color="#10b981" /> : <TrendingDown size={16} color="#ef4444" />;
  };

  const getChangeColor = (value: number) => {
    return value > 0 ? '#10b981' : '#ef4444';
  };

  return (
    <DashboardCard title="Badge Earnings & Quality Insights">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📊 Analytics panels • Badge earn rates • Retention correlation • Behavior impact analysis
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
            startIcon={<Target />}
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
                    <Award size={24} color="#3b82f6" />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="h6" fontWeight="600">
                      {insights.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Badges Analyzed
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
                      {formatPercentage(insights.reduce((acc, insight) => acc + insight.retentionCorrelation, 0) / insights.length)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Retention Impact
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
                    <Star size={24} color="#f59e0b" />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="h6" fontWeight="600">
                      {insights.filter(i => i.impactScore >= 8).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      High-Impact Badges
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Badge Insights */}
        <Stack spacing={3}>
          {insights.map((insight) => (
            <Card key={insight.badgeId} sx={{ border: '1px solid #e2e8f0' }}>
              <CardContent>
                <Stack spacing={3}>
                  {/* Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight="600" mb={1}>
                        {insight.badgeName}
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Chip
                          label={`${insight.earnRate.toFixed(1)}/day`}
                          size="small"
                          sx={{ bgcolor: '#3b82f615', color: '#3b82f6' }}
                        />
                        <Chip
                          label={`Impact: ${insight.impactScore.toFixed(1)}`}
                          size="small"
                          sx={{ 
                            bgcolor: `${getImpactColor(insight.impactScore)}15`,
                            color: getImpactColor(insight.impactScore)
                          }}
                        />
                      </Stack>
                    </Box>
                    
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getChangeIcon(insight.retentionCorrelation)}
                      <Typography 
                        variant="h6" 
                        fontWeight="600"
                        color={getRetentionColor(insight.retentionCorrelation)}
                      >
                        +{formatPercentage(insight.retentionCorrelation)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        retention
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* Behavior Comparison */}
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box sx={{ p: 2, bgcolor: '#10b98115', borderRadius: 2 }}>
                        <Typography variant="body2" fontWeight="600" mb={2} color="#10b981">
                          Badge Holders
                        </Typography>
                        
                        <Stack spacing={2}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Avg Pickups/Month
                            </Typography>
                            <Typography variant="body2" fontWeight="600">
                              {insight.holderBehavior.avgPickupsPerMonth.toFixed(1)}
                            </Typography>
                          </Stack>
                          
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Avg KG/Pickup
                            </Typography>
                            <Typography variant="body2" fontWeight="600">
                              {insight.holderBehavior.avgKgPerPickup.toFixed(1)}
                            </Typography>
                          </Stack>
                          
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Churn Rate
                            </Typography>
                            <Typography variant="body2" fontWeight="600" color="#10b981">
                              {formatPercentage(insight.holderBehavior.churnRate)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box sx={{ p: 2, bgcolor: '#ef444415', borderRadius: 2 }}>
                        <Typography variant="body2" fontWeight="600" mb={2} color="#ef4444">
                          Non-Holders
                        </Typography>
                        
                        <Stack spacing={2}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Avg Pickups/Month
                            </Typography>
                            <Typography variant="body2" fontWeight="600">
                              {insight.nonHolderBehavior.avgPickupsPerMonth.toFixed(1)}
                            </Typography>
                          </Stack>
                          
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Avg KG/Pickup
                            </Typography>
                            <Typography variant="body2" fontWeight="600">
                              {insight.nonHolderBehavior.avgKgPerPickup.toFixed(1)}
                            </Typography>
                          </Stack>
                          
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Churn Rate
                            </Typography>
                            <Typography variant="body2" fontWeight="600" color="#ef4444">
                              {formatPercentage(insight.nonHolderBehavior.churnRate)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Impact Metrics */}
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="600" mb={2}>
                      Behavior Impact Analysis
                    </Typography>
                    
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Pickup Frequency Change
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            {getChangeIcon(calculateBehaviorChange(
                              insight.holderBehavior.avgPickupsPerMonth,
                              insight.nonHolderBehavior.avgPickupsPerMonth
                            ))}
                            <Typography 
                              variant="body2" 
                              fontWeight="600"
                              color={getChangeColor(calculateBehaviorChange(
                                insight.holderBehavior.avgPickupsPerMonth,
                                insight.nonHolderBehavior.avgPickupsPerMonth
                              ))}
                            >
                              {formatPercentage(calculateBehaviorChange(
                                insight.holderBehavior.avgPickupsPerMonth,
                                insight.nonHolderBehavior.avgPickupsPerMonth
                              ))}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Weight per Pickup Change
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            {getChangeIcon(calculateBehaviorChange(
                              insight.holderBehavior.avgKgPerPickup,
                              insight.nonHolderBehavior.avgKgPerPickup
                            ))}
                            <Typography 
                              variant="body2" 
                              fontWeight="600"
                              color={getChangeColor(calculateBehaviorChange(
                                insight.holderBehavior.avgKgPerPickup,
                                insight.nonHolderBehavior.avgKgPerPickup
                              ))}
                            >
                              {formatPercentage(calculateBehaviorChange(
                                insight.holderBehavior.avgKgPerPickup,
                                insight.nonHolderBehavior.avgKgPerPickup
                              ))}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Churn Reduction
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <TrendingDown size={16} color="#10b981" />
                            <Typography 
                              variant="body2" 
                              fontWeight="600"
                              color="#10b981"
                            >
                              {formatPercentage(insight.nonHolderBehavior.churnRate - insight.holderBehavior.churnRate)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Overall Impact Score */}
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2" fontWeight="600">
                        Overall Impact Score
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {insight.impactScore.toFixed(1)}/10
                      </Typography>
                    </Stack>
                    
                    <LinearProgress
                      variant="determinate"
                      value={insight.impactScore * 10}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: '#e2e8f0',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          bgcolor: getImpactColor(insight.impactScore)
                        }
                      }}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Key Insights Summary */}
        <Accordion sx={{ mt: 3 }}>
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Typography variant="h6">Key Insights Summary</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <Alert severity="success">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  High-Performing Badges
                </Typography>
                <Typography variant="body2">
                  Badges with impact scores above 8.0 show significantly improved user retention and engagement. 
                  Consider expanding these badge categories to further enhance user experience.
                </Typography>
              </Alert>

              <Alert severity="info">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Behavior Patterns
                </Typography>
                <Typography variant="body2">
                  Badge holders consistently show higher pickup frequency and better quality metrics compared to non-holders, 
                  indicating that badges are effectively motivating desired behaviors and driving positive change.
                </Typography>
              </Alert>

              <Alert severity="warning">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Optimization Opportunities
                </Typography>
                <Typography variant="body2">
                  Some badges show low earn rates but high impact. Consider adjusting unlock requirements 
                  to improve accessibility while maintaining value.
                </Typography>
              </Alert>

              <Alert severity="error">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Areas for Improvement
                </Typography>
                <Typography variant="body2">
                  Badges with impact scores below 5.0 may need redesign or better perk alignment to drive meaningful behavior change.
                </Typography>
              </Alert>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Recommendations */}
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            Strategic Recommendations
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • Focus on high-impact badges for user acquisition campaigns
            </Typography>
            <Typography variant="body2">
              • Optimize unlock requirements for low-earning, high-impact badges
            </Typography>
            <Typography variant="body2">
              • Consider badge progression paths to encourage long-term engagement
            </Typography>
            <Typography variant="body2">
              • Monitor badge effectiveness quarterly and adjust criteria accordingly
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default BadgeEarningsQualityInsights;
