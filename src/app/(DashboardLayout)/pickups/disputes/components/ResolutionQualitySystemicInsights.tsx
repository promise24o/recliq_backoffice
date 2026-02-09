'use client'
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Alert, IconButton, Button, Collapse, Avatar } from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Users, 
  User, 
  Activity, 
  Target,
  ChevronDown,
  ChevronUp,
  Eye,
  AlertTriangle,
  Clock,
  BarChart3
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { DisputeInsight } from '../types';

interface ResolutionQualitySystemicInsightsProps {
  insights: DisputeInsight[];
  avgResolutionTime: number;
  onInsightClick: (insight: DisputeInsight) => void;
}

const ResolutionQualitySystemicInsights: React.FC<ResolutionQualitySystemicInsightsProps> = ({ 
  insights, 
  avgResolutionTime, 
  onInsightClick 
}) => {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} color="#ef4444" />;
      case 'down':
        return <TrendingDown size={16} color="#10b981" />;
      case 'stable':
        return <Minus size={16} color="#f59e0b" />;
      default:
        return <Minus size={16} color="#6b7280" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return '#ef4444';
      case 'down':
        return '#10b981';
      case 'stable':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'repeat_users':
        return <Users size={20} />;
      case 'repeat_agents':
        return <User size={20} />;
      case 'disputes_per_100':
        return <Activity size={20} />;
      case 'weight_correlation':
        return <Target size={20} />;
      default:
        return <AlertTriangle size={20} />;
    }
  };

  const getInsightDescription = (insight: DisputeInsight) => {
    return {
      analysis: {
        'repeat_users': 'Users repeatedly filing disputes may indicate poor user experience, unclear expectations, or potential abuse patterns.',
        'repeat_agents': 'Agents frequently involved in disputes may require additional training, equipment issues, or performance concerns.',
        'disputes_per_100': 'Dispute rate relative to transaction volume indicates overall system health and user satisfaction.',
        'weight_correlation': 'Strong correlation between weight variance and disputes suggests estimation accuracy issues.'
      }[insight.type] || 'Pattern detected requiring investigation.',
      
      impact: {
        'repeat_users': 'Affects user retention, support costs, and platform reputation. May indicate onboarding gaps.',
        'repeat_agents': 'Impacts agent performance, user trust, and operational efficiency. May require intervention.',
        'disputes_per_100': 'Direct indicator of platform health. High rates suggest systemic issues needing attention.',
        'weight_correlation': 'Indicates fundamental measurement or estimation problems affecting user trust.'
      }[insight.type] || 'Operational impact requires assessment.',
      
      nextSteps: insight.recommendations
    };
  };

  const getSLAStatus = (avgTime: number) => {
    if (avgTime <= 24) return { status: 'Good', color: '#10b981' };
    if (avgTime <= 48) return { status: 'Warning', color: '#f59e0b' };
    return { status: 'Critical', color: '#ef4444' };
  };

  const slaStatus = getSLAStatus(avgResolutionTime);

  return (
    <DashboardCard title="Resolution Quality & Systemic Insights">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📊 Are disputes rising? • Are agents gaming weights? • Are users misunderstanding pricing?
          </Typography>
        </Box>

        {/* Resolution Time SLA */}
        <Card sx={{ mb: 3, bgcolor: `${slaStatus.color}10`, border: `1px solid ${slaStatus.color}30` }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: slaStatus.color }}>
                <Clock size={20} color="white" />
              </Avatar>
              <Box flex={1}>
                <Typography variant="h6" fontWeight="600" color={slaStatus.color}>
                  Average Resolution Time: {avgResolutionTime.toFixed(1)} hours
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  SLA Status: {slaStatus.status} (Target: ≤24 hours)
                </Typography>
              </Box>
              <Chip
                label={slaStatus.status}
                size="small"
                sx={{
                  bgcolor: slaStatus.color,
                  color: 'white',
                  fontSize: '0.7rem'
                }}
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Key Questions */}
        <Stack spacing={2} mb={3}>
          {[
            'Are disputes rising?',
            'Are agents gaming weights?',
            'Are users misunderstanding pricing?',
            'Is product UX causing friction?'
          ].map((question, index) => (
            <Alert key={index} severity="info" sx={{ mb: 1 }}>
              <Typography variant="body2">
                <strong>Q: {question}</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Insights below help answer this question
              </Typography>
            </Alert>
          ))}
        </Stack>

        {/* Systemic Insights */}
        <Stack spacing={2}>
          {insights.map((insight) => {
            const isExpanded = expandedInsight === insight.type;
            const description = getInsightDescription(insight);
            
            return (
              <Card
                key={insight.type}
                sx={{
                  border: `1px solid ${getTrendColor(insight.trend)}30`,
                  '&:hover': {
                    boxShadow: 2
                  }
                }}
              >
                <CardContent sx={{ pb: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      sx={{
                        bgcolor: `${getTrendColor(insight.trend)}15`,
                        color: getTrendColor(insight.trend),
                        width: 40,
                        height: 40
                      }}
                    >
                      {getInsightIcon(insight.type)}
                    </Avatar>
                    
                    <Box flex={1}>
                      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                        <Typography variant="h6" fontWeight="600">
                          {insight.title}
                        </Typography>
                        <Chip
                          label={`${insight.value}`}
                          size="small"
                          sx={{
                            bgcolor: `${getTrendColor(insight.trend)}15`,
                            color: getTrendColor(insight.trend),
                            fontSize: '0.7rem',
                            fontWeight: 500
                          }}
                        />
                        {getTrendIcon(insight.trend)}
                      </Stack>
                      
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        {insight.description}
                      </Typography>
                      
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Button
                          size="small"
                          startIcon={<Eye size={16} />}
                          onClick={() => onInsightClick(insight)}
                        >
                          View Details
                        </Button>
                        
                        <IconButton
                          size="small"
                          onClick={() => setExpandedInsight(isExpanded ? null : insight.type)}
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </IconButton>
                      </Stack>
                      
                      <Collapse in={isExpanded}>
                        <Box sx={{ mt: 2, p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                          <Stack spacing={3}>
                            <Box>
                              <Typography variant="subtitle2" fontWeight="600" mb={1}>
                                Analysis
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {description.analysis}
                              </Typography>
                            </Box>
                            
                            <Box>
                              <Typography variant="subtitle2" fontWeight="600" mb={1}>
                                Business Impact
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {description.impact}
                              </Typography>
                            </Box>
                            
                            <Box>
                              <Typography variant="subtitle2" fontWeight="600" mb={1}>
                                Recommended Actions
                              </Typography>
                              <Stack spacing={1}>
                                {description.nextSteps.map((step, index) => (
                                  <Stack key={index} direction="row" spacing={1} alignItems="flex-start">
                                    <Typography variant="body2" color="text.secondary">
                                      • {step}
                                    </Typography>
                                  </Stack>
                                ))}
                              </Stack>
                            </Box>
                            
                            <Box>
                              <Typography variant="subtitle2" fontWeight="600" mb={1}>
                                Affected Entities
                              </Typography>
                              <Stack direction="row" spacing={1} flexWrap="wrap">
                                {insight.affectedEntities.map((entity, index) => (
                                  <Chip
                                    key={index}
                                    label={entity}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.7rem' }}
                                  />
                                ))}
                              </Stack>
                            </Box>
                          </Stack>
                        </Box>
                      </Collapse>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>

        {/* Overall Assessment */}
        {insights.length > 0 && (
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>System Health Assessment:</strong> Monitor these insights weekly to identify trends and take proactive measures. 
              Rising disputes indicate friction points that need immediate attention.
            </Typography>
          </Alert>
        )}
        
        {insights.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <BarChart3 size={48} color="#10b981" />
            <Typography variant="h6" color="success.main" mt={2}>
              No Systemic Issues Detected
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All dispute metrics are within normal parameters.
            </Typography>
          </Box>
        )}
      </CardContent>
    </DashboardCard>
  );
};

export default ResolutionQualitySystemicInsights;
