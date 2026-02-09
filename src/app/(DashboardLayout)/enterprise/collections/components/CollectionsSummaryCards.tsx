'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Grid, LinearProgress, Alert } from '@mui/material';
import { 
  Calendar, 
  Building, 
  User, 
  AlertTriangle, 
  RotateCcw, 
  Clock,
  TrendingUp,
  Package,
  Target,
  Activity,
  Timer,
  Users,
  CheckCircle
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { CollectionsSummary } from '../types';

interface CollectionsSummaryCardsProps {
  summary: CollectionsSummary;
  onCardClick?: (metricType: string) => void;
}

const CollectionsSummaryCards: React.FC<CollectionsSummaryCardsProps> = ({ 
  summary, 
  onCardClick 
}) => {
  const summaryCards = [
    {
      title: 'Upcoming Collections',
      value: summary.upcomingCollections.toLocaleString(),
      subtitle: 'Scheduled jobs',
      icon: <Calendar size={24} color="#3b82f6" />,
      color: '#3b82f6',
      bgColor: '#3b82f615',
      metricType: 'upcoming_collections'
    },
    {
      title: 'Active Enterprise Clients',
      value: summary.activeEnterpriseClients.toLocaleString(),
      subtitle: 'With upcoming pickups',
      icon: <Building size={24} color="#10b981" />,
      color: '#10b981',
      bgColor: '#10b98115',
      metricType: 'active_clients'
    },
    {
      title: 'Agents Assigned',
      value: summary.agentsAssigned.toLocaleString(),
      subtitle: 'Coverage readiness',
      icon: <User size={24} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgColor: '#8b5cf615',
      metricType: 'agents_assigned'
    },
    {
      title: 'At-Risk Collections',
      value: summary.atRiskCollections.toLocaleString(),
      subtitle: 'SLA breach risk',
      icon: <AlertTriangle size={24} color="#ef4444" />,
      color: '#ef4444',
      bgColor: '#ef444415',
      metricType: 'at_risk_collections'
    },
    {
      title: 'Recurring Schedules',
      value: summary.recurringSchedules.toLocaleString(),
      subtitle: 'Active recurring jobs',
      icon: <RotateCcw size={24} color="#f59e0b" />,
      color: '#f59e0b',
      bgColor: '#f59e0b15',
      metricType: 'recurring_schedules'
    },
    {
      title: 'Avg Lead Time',
      value: `${summary.avgLeadTime}h`,
      subtitle: 'Schedule → execution',
      icon: <Clock size={24} color="#059669" />,
      color: '#059669',
      bgColor: '#05966915',
      metricType: 'avg_lead_time'
    }
  ];

  const handleCardClick = (metricType: string) => {
    if (onCardClick) {
      onCardClick(metricType);
    }
  };

  const getLeadTimeColor = (hours: number): string => {
    if (hours >= 48) return '#10b981';
    if (hours >= 24) return '#3b82f6';
    if (hours >= 12) return '#f59e0b';
    return '#ef4444';
  };

  const getRiskColor = (count: number): string => {
    if (count === 0) return '#10b981';
    if (count <= 2) return '#f59e0b';
    if (count <= 5) return '#f97316';
    return '#ef4444';
  };

  const getUtilizationColor = (assigned: number, total: number): string => {
    const utilization = (assigned / total) * 100;
    if (utilization >= 90) return '#ef4444';
    if (utilization >= 75) return '#f59e0b';
    if (utilization >= 50) return '#3b82f6';
    return '#10b981';
  };

  return (
    <DashboardCard title="Scheduled Collections Summary">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📅 Execution planning • Agent readiness • SLA protection
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
            Execution Metrics
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Total Estimated Volume
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Package size={16} color="#3b82f6" />
                  <Typography variant="h6" fontWeight="600" color="#3b82f6">
                    {(summary.totalEstimatedVolume / 1000).toFixed(1)} tons
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  High Priority Collections
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Target size={16} color="#ef4444" />
                  <Typography variant="h6" fontWeight="600" color="#ef4444">
                    {summary.highPriorityCollections.toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Unassigned Collections
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Users size={16} color={getRiskColor(summary.unassignedCollections)} />
                  <Typography variant="h6" fontWeight="600" color={getRiskColor(summary.unassignedCollections)}>
                    {summary.unassignedCollections.toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Agent Utilization
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Activity size={16} color={getUtilizationColor(summary.agentsAssigned, 5)} />
                  <Typography variant="h6" fontWeight="600" color={getUtilizationColor(summary.agentsAssigned, 5)}>
                    {((summary.agentsAssigned / 5) * 100).toFixed(0)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Progress Indicators */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Performance Indicators
          </Typography>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Collection Readiness
                </Typography>
                <Typography variant="body2" fontWeight="500" color="#3b82f6">
                  {((summary.agentsAssigned / summary.upcomingCollections) * 100).toFixed(0)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={Math.min((summary.agentsAssigned / summary.upcomingCollections) * 100, 100)}
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
                  Risk Exposure
                </Typography>
                <Typography variant="body2" fontWeight="500" color={getRiskColor(summary.atRiskCollections)}>
                  {((summary.atRiskCollections / summary.upcomingCollections) * 100).toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={(summary.atRiskCollections / summary.upcomingCollections) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: getRiskColor(summary.atRiskCollections)
                  }
                }}
              />
            </Stack>
          </Stack>
        </Box>

        {/* Operational Health Alert */}
        <Alert 
          severity={summary.atRiskCollections > 0 ? 'warning' : summary.unassignedCollections > 0 ? 'info' : 'success'}
          sx={{ mt: 3 }}
        >
          <Typography variant="body2" fontWeight="600" mb={1}>
            Operational Readiness Assessment
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {summary.upcomingCollections} collections scheduled with {summary.avgLeadTime}h average lead time
            </Typography>
            <Typography variant="body2">
              • {summary.agentsAssigned} agents assigned to {summary.activeEnterpriseClients} active enterprise clients
            </Typography>
            <Typography variant="body2">
              • {summary.recurringSchedules} recurring schedules maintaining operational consistency
            </Typography>
            <Typography variant="body2">
              • {summary.totalEstimatedVolume.toLocaleString()} kg total estimated volume requiring capacity planning
            </Typography>
            <Typography variant="body2">
              • {summary.atRiskCollections} collections at risk requiring immediate attention
            </Typography>
            <Typography variant="body2">
              • {summary.unassignedCollections} unassigned collections requiring agent assignment
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default CollectionsSummaryCards;
