'use client'
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Alert, IconButton, Button, Collapse, Avatar } from '@mui/material';
import { 
  AlertTriangle, 
  Users, 
  Scale, 
  Clock, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Eye,
  Flag,
  Search,
  Target,
  Activity
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { WeightAnomaly } from '../types';

interface AnomalyFraudSignalsProps {
  anomalies: WeightAnomaly[];
  onAnomalyClick: (anomaly: WeightAnomaly) => void;
  onFlagLogs: (logIds: string[]) => void;
}

const AnomalyFraudSignals: React.FC<AnomalyFraudSignalsProps> = ({ anomalies, onAnomalyClick, onFlagLogs }) => {
  const [expandedAnomaly, setExpandedAnomaly] = useState<string | null>(null);

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

  const getAnomalyIcon = (type: string) => {
    switch (type) {
      case 'repeated_variance':
        return <Users size={20} />;
      case 'suspicious_rounding':
        return <Target size={20} />;
      case 'peak_hour_variance':
        return <Clock size={20} />;
      case 'dropoff_vs_pickup':
        return <Activity size={20} />;
      default:
        return <AlertTriangle size={20} />;
    }
  };

  const getAnomalyDescription = (anomaly: WeightAnomaly) => {
    return {
      analysis: {
        'repeated_variance': 'Agents showing consistent high variance patterns may indicate scale manipulation, estimation bias, or systematic measurement errors.',
        'suspicious_rounding': 'Weights consistently rounded to standard increments suggest manual estimation rather than actual measurement, potentially indicating fraud.',
        'peak_hour_variance': 'Elevated variance during peak hours may reflect rushed measurements, increased estimation errors, or opportunistic behavior.',
        'dropoff_vs_pickup': 'Significant variance differences between drop-offs and pickups may indicate estimation model biases or verification gaps.'
      }[anomaly.type] || 'Pattern detected requiring investigation.',
      
      impact: {
        'repeated_variance': 'Affects payout accuracy, agent trust, and platform margin integrity. May require agent retraining or equipment replacement.',
        'suspicious_rounding': 'Undermines measurement accuracy and user trust. Could indicate systematic fraud that impacts financial fairness.',
        'peak_hour_variance': 'Creates inconsistent user experience and may lead to disputes during busy periods. Affects operational efficiency.',
        'dropoff_vs_pickup': 'Creates unfair compensation differences between pickup and drop-off users. May require estimation model adjustments.'
      }[anomaly.type] || 'Operational and financial impact requires assessment.',
      
      nextSteps: anomaly.recommendations
    };
  };

  const totalHighRisk = anomalies.filter(a => a.severity === 'high').length;
  const totalMediumRisk = anomalies.filter(a => a.severity === 'medium').length;
  const totalAffectedLogs = anomalies.reduce((sum, anomaly) => sum + anomaly.count, 0);

  return (
    <DashboardCard title="Anomaly & Fraud Signals">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🔍 Detect fraud • Improve trust • Enforce compliance • Protect payouts
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
              {totalAffectedLogs}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Affected Logs
            </Typography>
          </Box>
        </Stack>

        {/* Anomalies List */}
        <Stack spacing={2}>
          {anomalies.map((anomaly) => {
            const isExpanded = expandedAnomaly === anomaly.type;
            const description = getAnomalyDescription(anomaly);
            
            return (
              <Card
                key={anomaly.type}
                sx={{
                  border: `1px solid ${getSeverityColor(anomaly.severity)}30`,
                  '&:hover': {
                    boxShadow: 2
                  }
                }}
              >
                <CardContent sx={{ pb: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      sx={{
                        bgcolor: getSeverityBgColor(anomaly.severity),
                        color: getSeverityColor(anomaly.severity),
                        width: 40,
                        height: 40
                      }}
                    >
                      {getAnomalyIcon(anomaly.type)}
                    </Avatar>
                    
                    <Box flex={1}>
                      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                        <Typography variant="h6" fontWeight="600">
                          {anomaly.title}
                        </Typography>
                        <Chip
                          label={anomaly.severity.toUpperCase()}
                          size="small"
                          sx={{
                            bgcolor: getSeverityBgColor(anomaly.severity),
                            color: getSeverityColor(anomaly.severity),
                            fontSize: '0.7rem',
                            fontWeight: 500
                          }}
                        />
                        <Chip
                          label={`${anomaly.count} logs`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      </Stack>
                      
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        {anomaly.description}
                      </Typography>
                      
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Button
                          size="small"
                          startIcon={<Eye size={16} />}
                          onClick={() => onAnomalyClick(anomaly)}
                        >
                          View Details
                        </Button>
                        
                        <Button
                          size="small"
                          startIcon={<Flag size={16} />}
                          color="warning"
                          onClick={() => onFlagLogs(anomaly.affectedLogs)}
                        >
                          Flag Logs
                        </Button>
                        
                        <IconButton
                          size="small"
                          onClick={() => setExpandedAnomaly(isExpanded ? null : anomaly.type)}
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
                                Sample Affected Logs
                              </Typography>
                              <Stack direction="row" spacing={1} flexWrap="wrap">
                                {anomaly.affectedLogs.slice(0, 3).map((logId) => (
                                  <Chip
                                    key={logId}
                                    label={`WGT-${logId.slice(-3)}`}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.7rem' }}
                                  />
                                ))}
                                {anomaly.affectedLogs.length > 3 && (
                                  <Chip
                                    label={`+${anomaly.affectedLogs.length - 3} more`}
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
        {anomalies.length > 0 && (
          <Alert severity="info" sx={{ mt:3 }}>
            <Typography variant="body2">
              <strong>Investigation Priority:</strong> Address high-risk anomalies first, then medium-risk patterns. 
              Document all findings and implement corrective actions to prevent recurrence.
            </Typography>
          </Alert>
        )}
        
        {anomalies.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <AlertTriangle size={48} color="#10b981" />
            <Typography variant="h6" color="success.main" mt={2}>
              No Anomalies Detected
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All weight measurements appear to be within normal parameters.
            </Typography>
          </Box>
        )}
      </CardContent>
    </DashboardCard>
  );
};

export default AnomalyFraudSignals;
