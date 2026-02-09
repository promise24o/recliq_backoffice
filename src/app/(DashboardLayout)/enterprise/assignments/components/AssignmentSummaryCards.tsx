'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Grid, LinearProgress, Alert } from '@mui/material';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  RotateCcw, 
  Target,
  Activity,
  Timer,
  Package,
  TrendingUp,
  UserCheck,
  AlertCircle,
  RefreshCw,
  Shield,
  Truck
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { AssignmentSummary } from '../types';

interface AssignmentSummaryCardsProps {
  summary: AssignmentSummary;
  onCardClick?: (metricType: string) => void;
}

const AssignmentSummaryCards: React.FC<AssignmentSummaryCardsProps> = ({ 
  summary, 
  onCardClick 
}) => {
  const summaryCards = [
    {
      title: 'Assigned Collections',
      value: summary.assignedCollections.toLocaleString(),
      subtitle: 'Total enterprise jobs assigned',
      icon: <Users size={24} color="#3b82f6" />,
      color: '#3b82f6',
      bgColor: '#3b82f615',
      metricType: 'assigned_collections'
    },
    {
      title: 'Pending Assignments',
      value: summary.pendingAssignments.toLocaleString(),
      subtitle: 'Awaiting agent confirmation',
      icon: <Clock size={24} color="#f59e0b" />,
      color: '#f59e0b',
      bgColor: '#f59e0b15',
      metricType: 'pending_assignments'
    },
    {
      title: 'Confirmed Agents',
      value: summary.confirmedAgents.toLocaleString(),
      subtitle: 'Ready for execution',
      icon: <CheckCircle size={24} color="#10b981" />,
      color: '#10b981',
      bgColor: '#10b98115',
      metricType: 'confirmed_agents'
    },
    {
      title: 'At-Risk Assignments',
      value: summary.atRiskAssignments.toLocaleString(),
      subtitle: 'SLA risk',
      icon: <AlertTriangle size={24} color="#ef4444" />,
      color: '#ef4444',
      bgColor: '#ef444415',
      metricType: 'at_risk_assignments'
    },
    {
      title: 'Reassignments',
      value: summary.reassignments.toLocaleString(),
      subtitle: 'Changed assignments',
      icon: <RotateCcw size={24} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgColor: '#8b5cf615',
      metricType: 'reassignments'
    },
    {
      title: 'Unassigned Jobs',
      value: summary.unassignedJobs.toLocaleString(),
      subtitle: 'Immediate action needed',
      icon: <AlertCircle size={24} color="#dc2626" />,
      color: '#dc2626',
      bgColor: '#dc262615',
      metricType: 'unassigned_jobs'
    }
  ];

  const handleCardClick = (metricType: string) => {
    if (onCardClick) {
      onCardClick(metricType);
    }
  };

  const getCompletionRateColor = (rate: number): string => {
    if (rate >= 90) return '#10b981';
    if (rate >= 80) return '#3b82f6';
    if (rate >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const getReliabilityColor = (score: number): string => {
    if (score >= 90) return '#10b981';
    if (score >= 80) return '#3b82f6';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const getSLABreachColor = (rate: number): string => {
    if (rate <= 5) return '#10b981';
    if (rate <= 10) return '#3b82f6';
    if (rate <= 20) return '#f59e0b';
    return '#ef4444';
  };

  const getUnassignedColor = (count: number): string => {
    if (count === 0) return '#10b981';
    if (count <= 2) return '#f59e0b';
    if (count <= 5) return '#f97316';
    return '#ef4444';
  };

  return (
    <DashboardCard title="Assignment Summary">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            👷 Enterprise collection responsibility • Agent readiness • SLA protection
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

        {/* Additional Metrics */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Performance Metrics
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Total Volume
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Package size={16} color="#3b82f6" />
                  <Typography variant="h6" fontWeight="600" color="#3b82f6">
                    {(summary.totalVolume / 1000).toFixed(1)} tons
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Avg Agent Reliability
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <UserCheck size={16} color={getReliabilityColor(summary.avgAgentReliability)} />
                  <Typography variant="h6" fontWeight="600" color={getReliabilityColor(summary.avgAgentReliability)}>
                    {summary.avgAgentReliability.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

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
                  SLA Breach Rate
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AlertCircle size={16} color={getSLABreachColor(summary.slaBreachRate)} />
                  <Typography variant="h6" fontWeight="600" color={getSLABreachColor(summary.slaBreachRate)}>
                    {summary.slaBreachRate.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Progress Indicators */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Execution Readiness
          </Typography>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Assignment Coverage
                </Typography>
                <Typography variant="body2" fontWeight="500" color="#3b82f6">
                  {((summary.assignedCollections / (summary.assignedCollections + summary.unassignedJobs)) * 100).toFixed(0)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={(summary.assignedCollections / (summary.assignedCollections + summary.unassignedJobs)) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: '#3b82f6'
                  }
                }}
              />
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Agent Readiness
                </Typography>
                <Typography variant="body2" fontWeight="500" color={getReliabilityColor(summary.avgAgentReliability)}>
                  {summary.avgAgentReliability.toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={summary.avgAgentReliability}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: getReliabilityColor(summary.avgAgentReliability)
                  }
                }}
              />
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  SLA Compliance
                </Typography>
                <Typography variant="body2" fontWeight="500" color={getCompletionRateColor(summary.completionRate)}>
                  {(100 - summary.slaBreachRate).toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={100 - summary.slaBreachRate}
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
          </Stack>
        </Box>

        {/* Operational Health Alert */}
        <Alert 
          severity={summary.unassignedJobs > 0 ? 'warning' : summary.atRiskAssignments > 0 ? 'info' : 'success'}
          sx={{ mt: 3 }}
        >
          <Typography variant="body2" fontWeight="600" mb={1}>
            Assignment Health Assessment
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {summary.assignedCollections} collections assigned to {summary.confirmedAgents} confirmed agents
            </Typography>
            <Typography variant="body2">
              • {summary.pendingAssignments} assignments pending agent confirmation
            </Typography>
            <Typography variant="body2">
              • {(summary.totalVolume / 1000).toFixed(1)} tons total volume requiring capacity planning
            </Typography>
            <Typography variant="body2">
              • {summary.atRiskAssignments} at-risk assignments requiring immediate attention
            </Typography>
            <Typography variant="body2">
              • {summary.reassignments} reassignments indicating assignment quality issues
            </Typography>
            <Typography variant="body2">
              • {summary.unassignedJobs} unassigned jobs requiring immediate assignment
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default AssignmentSummaryCards;
