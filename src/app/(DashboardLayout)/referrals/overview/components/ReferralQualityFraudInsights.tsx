'use client';
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Button, Alert, Accordion, AccordionSummary, AccordionDetails, Grid, LinearProgress, Chip } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  AlertTriangle, 
  Settings, 
  RefreshCw, 
  ChevronDown,
  Download,
  Eye,
  CheckCircle,
  Clock,
  Users,
  Target,
  Zap,
  Activity,
  MapPin
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { ReferralQualityInsight, ReferralFraudPattern } from '../types';

interface ReferralQualityFraudInsightsProps {
  insights: ReferralQualityInsight[];
  onExportInsights: () => void;
  onGenerateReport: () => void;
  onSetNotification?: (notification: { open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }) => void;
}

const ReferralQualityFraudInsights: React.FC<ReferralQualityFraudInsightsProps> = ({
  insights,
  onExportInsights,
  onGenerateReport,
  onSetNotification
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const getInsightIcon = (category: string): React.ReactNode => {
    switch (category) {
      case 'engagement': return <Activity size={16} />;
      case 'retention': return <Clock size={16} />;
      case 'quality': return <Target size={16} />;
      case 'abuse': return <AlertTriangle size={16} />;
      case 'efficiency': return <Zap size={16} />;
      default: return <Settings size={16} />;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable'): React.ReactNode => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} />;
      case 'down': return <TrendingDown size={16} />;
      case 'stable': return <Activity size={16} />;
      default: return <Activity size={16} />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable'): string => {
    switch (trend) {
      case 'up': return '#10b981';
      case 'down': return '#ef4444';
      case 'stable': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high'): string => {
    switch (severity) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getInsightValueColor = (category: string, value: number): string => {
    switch (category) {
      case 'engagement':
        return value >= 70 ? '#10b981' : value >= 50 ? '#3b82f6' : '#f59e0b';
      case 'retention':
        return value >= 80 ? '#10b981' : value >= 60 ? '#3b82f6' : '#f59e0b';
      case 'quality':
        return value >= 8 ? '#10b981' : value >= 6 ? '#3b82f6' : '#f59e0b';
      case 'abuse':
        return value <= 2 ? '#10b981' : value <= 5 ? '#f59e0b' : '#ef4444';
      case 'efficiency':
        return value <= 500 ? '#10b981' : value <= 1000 ? '#3b82f6' : '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const formatValue = (category: string, value: number): string => {
    switch (category) {
      case 'engagement':
      case 'retention':
        return `${value.toFixed(1)}%`;
      case 'quality':
        return value.toFixed(1);
      case 'abuse':
        return `${value.toFixed(1)}%`;
      case 'efficiency':
        return `₦${value.toLocaleString()}`;
      default:
        return value.toString();
    }
  };

  // Mock fraud patterns data
  const mockFraudPatterns: ReferralFraudPattern[] = [
    {
      id: 'FRAUD001',
      patternType: 'shared_device',
      description: 'Multiple referrals from same device/IP address',
      affectedReferrals: 12,
      severity: 'medium',
      detectedAt: '2024-01-15T10:00:00Z',
      status: 'active',
      recommendedAction: 'Implement device verification for suspicious patterns',
      affectedCities: ['Lagos', 'Abuja'],
      affectedReferrers: ['USER002', 'USER003']
    },
    {
      id: 'FRAUD002',
      patternType: 'rapid_self_referral',
      description: 'Users referring themselves with multiple accounts',
      affectedReferrals: 8,
      severity: 'high',
      detectedAt: '2024-01-18T14:30:00Z',
      status: 'monitoring',
      recommendedAction: 'Implement identity verification for new accounts',
      affectedCities: ['Lagos'],
      affectedReferrers: ['USER004', 'USER005']
    }
  ];

  return (
    <DashboardCard title="Referral Quality & Fraud Insights">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🛡️ Quality metrics • Fraud detection • Abuse patterns • Risk assessment
          </Typography>
        </Box>

        {/* Controls */}
        <Stack direction="row" spacing={2} mb={3}>
          <Button
            variant="contained"
            startIcon={<RefreshCw />}
            onClick={() => onSetNotification && onSetNotification({
              open: true,
              message: 'Quality insights refreshed',
              severity: 'success'
            })}
          >
            Refresh Insights
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={onExportInsights}
          >
            Export Insights
          </Button>
        </Stack>

        {/* Quality Insights */}
        <Stack spacing={3}>
          <Typography variant="h6" fontWeight="600">
            Quality Metrics
          </Typography>
          
          {insights.map((insight, index) => (
            <Card key={index} sx={{ border: '1px solid #e2e8f0' }}>
              <CardContent>
                <Stack spacing={2}>
                  {/* Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                      {getInsightIcon(insight.category)}
                      <Box>
                        <Typography variant="body2" fontWeight="600">
                          {insight.metric}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
                        </Typography>
                      </Box>
                    </Stack>
                    
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getTrendIcon(insight.trend)}
                      <Typography variant="body2" color={getTrendColor(insight.trend)}>
                        {insight.change > 0 ? '+' : ''}{insight.change.toFixed(1)}%
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* Value and Progress */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight="600" color={getInsightValueColor(insight.category, insight.value)}>
                      {formatValue(insight.category, insight.value)}
                    </Typography>
                    
                    <Chip
                      label={insight.severity.toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: `${getSeverityColor(insight.severity)}15`,
                        color: getSeverityColor(insight.severity),
                        fontSize: '0.75rem'
                      }}
                    />
                  </Stack>

                  {/* Progress Bar */}
                  <LinearProgress
                    variant="determinate"
                    value={insight.category === 'abuse' ? Math.min(insight.value * 10, 100) : insight.value}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        bgcolor: getInsightValueColor(insight.category, insight.value)
                      }
                    }}
                  />

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary">
                    {insight.description}
                  </Typography>

                  {/* Recommendation */}
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="600" mb={1}>
                      Recommendation
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {insight.recommendation}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Fraud Detection Patterns */}
        <Stack spacing={3} sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="600">
            Fraud Detection Patterns
          </Typography>
          
          {mockFraudPatterns.map((pattern, index) => (
            <Card key={index} sx={{ border: '1px solid #e2e8f0' }}>
              <CardContent>
                <Stack spacing={2}>
                  {/* Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Shield size={20} color={getSeverityColor(pattern.severity)} />
                      <Box>
                        <Typography variant="body2" fontWeight="600">
                          {pattern.patternType.replace('_', ' ').toUpperCase()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {pattern.affectedReferrals} affected referrals
                        </Typography>
                      </Box>
                    </Stack>
                    
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={pattern.severity.toUpperCase()}
                        size="small"
                        sx={{
                          bgcolor: `${getSeverityColor(pattern.severity)}15`,
                          color: getSeverityColor(pattern.severity),
                          fontSize: '0.75rem'
                        }}
                      />
                      <Chip
                        label={pattern.status.toUpperCase()}
                        size="small"
                        sx={{
                          bgcolor: pattern.status === 'active' ? '#ef444415' : '#f59e0b15',
                          color: pattern.status === 'active' ? '#ef4444' : '#f59e0b',
                          fontSize: '0.75rem'
                        }}
                      />
                    </Stack>
                  </Stack>

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary">
                    {pattern.description}
                  </Typography>

                  {/* Affected Areas */}
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Affected Cities
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {pattern.affectedCities.map((city, idx) => (
                            <Chip
                              key={idx}
                              label={city}
                              size="small"
                              sx={{ fontSize: '0.7rem' }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Affected Referrers
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {pattern.affectedReferrers.slice(0, 2).map((referrer, idx) => (
                            <Chip
                              key={idx}
                              label={referrer}
                              size="small"
                              sx={{ fontSize: '0.7rem' }}
                            />
                          ))}
                          {pattern.affectedReferrers.length > 2 && (
                            <Chip
                              label={`+${pattern.affectedReferrers.length - 2} more`}
                              size="small"
                              sx={{ fontSize: '0.7rem' }}
                            />
                          )}
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Recommended Action */}
                  <Box sx={{ p: 2, bgcolor: '#fef2f2', borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="600" mb={1}>
                      Recommended Action
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pattern.recommendedAction}
                    </Typography>
                  </Box>

                  {/* Detection Info */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                      Detected: {new Date(pattern.detectedAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Pattern ID: {pattern.id}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Summary */}
        <Alert severity={insights.filter(i => i.severity === 'high').length > 0 ? 'warning' : 'success'} sx={{ mt: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            Quality Assessment Summary
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {insights.filter(i => i.severity === 'high').length} high-priority issues require immediate attention
            </Typography>
            <Typography variant="body2">
              • {mockFraudPatterns.filter(p => p.severity === 'high').length} high-severity fraud patterns detected
            </Typography>
            <Typography variant="body2">
              • Overall referral quality is {insights.filter(i => i.category === 'quality')[0]?.value >= 7 ? 'good' : 'needs improvement'}
            </Typography>
            <Typography variant="body2">
              • Abuse rate is {insights.filter(i => i.category === 'abuse')[0]?.value <= 2 ? 'within acceptable limits' : 'requires intervention'}
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default ReferralQualityFraudInsights;
