'use client'
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Alert, IconButton, Button, Collapse, Avatar } from '@mui/material';
import { 
  AlertTriangle, 
  Users, 
  Scale, 
  Clock, 
  UserCheck, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Eye,
  Flag,
  Search
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { DropoffFraudInsight } from '../types';

interface FraudInsightsProps {
  insights: DropoffFraudInsight[];
  onInsightClick: (insight: DropoffFraudInsight) => void;
  onFlagRecords: (recordIds: string[]) => void;
}

const FraudInsights: React.FC<FraudInsightsProps> = ({ insights, onInsightClick, onFlagRecords }) => {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#ef444415';
      case 'medium':
        return '#f59e0b15';
      case 'low':
        return '#10b98115';
      default:
        return '#6b728015';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'repeat_users':
        return <Users size={20} />;
      case 'weight_variance':
        return <Scale size={20} />;
      case 'suspicious_frequency':
        return <Clock size={20} />;
      case 'agent_anomaly':
        return <UserCheck size={20} />;
      default:
        return <AlertTriangle size={20} />;
    }
  };

  const getInsightDescription = (insight: DropoffFraudInsight) => {
    switch (insight.type) {
      case 'repeat_users':
        return {
          details: 'Users performing more than 5 drop-offs per week may indicate gaming behavior or coordinated activity.',
          recommendation: 'Review user patterns and consider implementing frequency limits.',
          affectedRecords: insight.affectedRecords.slice(0, 3).map(id => `DROP-${id.slice(-3)}`)
        };
      case 'weight_variance':
        return {
          details: 'Final weight varying significantly from estimate (>20%) may indicate scale manipulation or estimation errors.',
          recommendation: 'Require photo verification for high-variance transactions.',
          affectedRecords: insight.affectedRecords.slice(0, 3).map(id => `DROP-${id.slice(-3)}`)
        };
      case 'suspicious_frequency':
        return {
          details: 'Drop-offs occurring outside normal operating hours or at unusual frequencies.',
          recommendation: 'Implement time-based validation and agent schedule verification.',
          affectedRecords: insight.affectedRecords.slice(0, 3).map(id => `DROP-${id.slice(-3)}`)
        };
      case 'agent_anomaly':
        return {
          details: 'Agents with unusually high dispute rates or inconsistent verification patterns.',
          recommendation: 'Conduct agent performance review and additional training.',
          affectedRecords: insight.affectedRecords.slice(0, 3).map(id => `DROP-${id.slice(-3)}`)
        };
      default:
        return {
          details: 'Unusual pattern detected requiring further investigation.',
          recommendation: 'Review the affected records manually.',
          affectedRecords: insight.affectedRecords.slice(0, 3).map(id => `DROP-${id.slice(-3)}`)
        };
    }
  };

  const totalHighRisk = insights.filter(i => i.severity === 'high').length;
  const totalMediumRisk = insights.filter(i => i.severity === 'medium').length;
  const totalAffectedRecords = insights.reduce((sum, insight) => sum + insight.count, 0);

  return (
    <DashboardCard title="Quality, Fraud & Abuse Insights">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🔍 Pattern detection • Prevent gaming • Validate incentives
          </Typography>
        </Box>

        {/* Risk Summary */}
        <Stack direction="row" spacing={3} mb={3} flexWrap="wrap">
          <Box>
            <Typography variant="h4" fontWeight="600" color="error.main">
              {totalHighRisk}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              High Risk
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="h4" fontWeight="600" color="warning.main">
              {totalMediumRisk}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Medium Risk
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="h4" fontWeight="600" color="info.main">
              {totalAffectedRecords}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Affected Records
            </Typography>
          </Box>
        </Stack>

        {/* Insights List */}
        <Stack spacing={2}>
          {insights.map((insight) => {
            const isExpanded = expandedInsight === insight.type;
            const description = getInsightDescription(insight);
            
            return (
              <Card
                key={insight.type}
                sx={{
                  border: `1px solid ${getSeverityColor(insight.severity)}30`,
                  '&:hover': {
                    boxShadow: 2
                  }
                }}
              >
                <CardContent sx={{ pb: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      sx={{
                        bgcolor: getSeverityBgColor(insight.severity),
                        color: getSeverityColor(insight.severity),
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
                          label={insight.severity.toUpperCase()}
                          size="small"
                          sx={{
                            bgcolor: getSeverityBgColor(insight.severity),
                            color: getSeverityColor(insight.severity),
                            fontSize: '0.7rem',
                            fontWeight: 500
                          }}
                        />
                        <Chip
                          label={`${insight.count} records`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
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
                        
                        <Button
                          size="small"
                          startIcon={<Flag size={16} />}
                          color="warning"
                          onClick={() => onFlagRecords(insight.affectedRecords)}
                        >
                          Flag Records
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
                          <Stack spacing={2}>
                            <Box>
                              <Typography variant="subtitle2" fontWeight="600" mb={1}>
                                Analysis Details
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {description.details}
                              </Typography>
                            </Box>
                            
                            <Box>
                              <Typography variant="subtitle2" fontWeight="600" mb={1}>
                                Recommendation
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {description.recommendation}
                              </Typography>
                            </Box>
                            
                            <Box>
                              <Typography variant="subtitle2" fontWeight="600" mb={1}>
                                Sample Affected Records
                              </Typography>
                              <Stack direction="row" spacing={1} flexWrap="wrap">
                                {description.affectedRecords.map((recordId) => (
                                  <Chip
                                    key={recordId}
                                    label={recordId}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.7rem' }}
                                  />
                                ))}
                                {insight.affectedRecords.length > 3 && (
                                  <Chip
                                    label={`+${insight.affectedRecords.length - 3} more`}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.7rem' }}
                                  />
                                )}
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

        {/* Quick Actions */}
        {insights.length > 0 && (
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>Next Steps:</strong> Review high-risk insights first, then investigate medium-risk patterns. 
              Consider implementing automated rules for common fraud patterns.
            </Typography>
          </Alert>
        )}
        
        {insights.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <AlertTriangle size={48} color="#10b981" />
            <Typography variant="h6" color="success.main" mt={2}>
              No Fraud Patterns Detected
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All drop-off records appear to be within normal parameters.
            </Typography>
          </Box>
        )}
      </CardContent>
    </DashboardCard>
  );
};

export default FraudInsights;
