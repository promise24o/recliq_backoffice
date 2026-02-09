'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Grid, LinearProgress, Alert } from '@mui/material';
import { 
  Building, 
  CheckCircle, 
  Calendar, 
  Package, 
  Scale, 
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Users,
  Target,
  Zap,
  Activity,
  Truck
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { EnterpriseClientSummary } from '../types';

interface EnterpriseSummaryCardsProps {
  summary: EnterpriseClientSummary;
  onCardClick?: (metricType: string) => void;
}

const EnterpriseSummaryCards: React.FC<EnterpriseSummaryCardsProps> = ({ 
  summary, 
  onCardClick 
}) => {
  const summaryCards = [
    {
      title: 'Total Clients',
      value: summary.totalClients.toLocaleString(),
      subtitle: 'All onboarded enterprises',
      icon: <Building size={24} color="#3b82f6" />,
      color: '#3b82f6',
      bgColor: '#3b82f615',
      metricType: 'total_clients'
    },
    {
      title: 'Active Clients',
      value: summary.activeClients.toLocaleString(),
      subtitle: 'Recycling in last 30 days',
      icon: <CheckCircle size={24} color="#10b981" />,
      color: '#10b981',
      bgColor: '#10b98115',
      metricType: 'active_clients'
    },
    {
      title: 'Scheduled Pickups',
      value: summary.scheduledPickups.toLocaleString(),
      subtitle: 'Upcoming enterprise jobs',
      icon: <Calendar size={24} color="#f59e0b" />,
      color: '#f59e0b',
      bgColor: '#f59e0b15',
      metricType: 'scheduled_pickups'
    },
    {
      title: 'Total Weight Collected',
      value: `${(summary.totalWeightCollected / 1000).toFixed(1)} tons`,
      subtitle: 'Enterprise recycling volume',
      icon: <Scale size={24} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgColor: '#8b5cf615',
      metricType: 'total_weight'
    },
    {
      title: 'Enterprise Revenue',
      value: `₦${(summary.enterpriseRevenue / 1000000).toFixed(1)}M`,
      subtitle: 'Contract & per-pickup value',
      icon: <DollarSign size={24} color="#059669" />,
      color: '#059669',
      bgColor: '#05966915',
      metricType: 'enterprise_revenue'
    },
    {
      title: 'SLA Issues',
      value: summary.slaIssues.toLocaleString(),
      subtitle: 'Breaches & risks',
      icon: <AlertTriangle size={24} color="#ef4444" />,
      color: '#ef4444',
      bgColor: '#ef444415',
      metricType: 'sla_issues'
    }
  ];

  const handleCardClick = (metricType: string) => {
    if (onCardClick) {
      onCardClick(metricType);
    }
  };

  const getRetentionRateColor = (rate: number): string => {
    if (rate >= 95) return '#10b981';
    if (rate >= 85) return '#3b82f6';
    if (rate >= 75) return '#f59e0b';
    return '#ef4444';
  };

  const getSLAComplianceColor = (rate: number): string => {
    if (rate >= 95) return '#10b981';
    if (rate >= 85) return '#3b82f6';
    if (rate >= 75) return '#f59e0b';
    return '#ef4444';
  };

  const getAtRiskColor = (count: number): string => {
    if (count === 0) return '#10b981';
    if (count <= 2) return '#f59e0b';
    if (count <= 5) return '#f97316';
    return '#ef4444';
  };

  const getNewClientsColor = (count: number): string => {
    if (count >= 3) return '#10b981';
    if (count >= 1) return '#3b82f6';
    return '#f59e0b';
  };

  return (
    <DashboardCard title="Enterprise Summary">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🏢 Enterprise portfolio health • Volume & revenue tracking • SLA compliance
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
            Performance Metrics
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Avg Monthly Volume
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Package size={16} color="#3b82f6" />
                  <Typography variant="h6" fontWeight="600" color="#3b82f6">
                    {summary.avgMonthlyVolume.toFixed(1)} kg
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Avg Revenue per Client
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <DollarSign size={16} color="#059669" />
                  <Typography variant="h6" fontWeight="600" color="#059669">
                    ₦{summary.avgRevenuePerClient.toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Client Retention Rate
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Users size={16} color={getRetentionRateColor(summary.clientRetentionRate)} />
                  <Typography variant="h6" fontWeight="600" color={getRetentionRateColor(summary.clientRetentionRate)}>
                    {summary.clientRetentionRate.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  SLA Compliance Rate
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Target size={16} color={getSLAComplianceColor(summary.slaComplianceRate)} />
                  <Typography variant="h6" fontWeight="600" color={getSLAComplianceColor(summary.slaComplianceRate)}>
                    {summary.slaComplianceRate.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Growth Metrics */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Growth & Risk Metrics
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  New Clients This Month
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TrendingUp size={16} color={getNewClientsColor(summary.newClientsThisMonth)} />
                  <Typography variant="h6" fontWeight="600" color={getNewClientsColor(summary.newClientsThisMonth)}>
                    {summary.newClientsThisMonth.toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  At Risk Clients
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AlertTriangle size={16} color={getAtRiskColor(summary.atRiskClients)} />
                  <Typography variant="h6" fontWeight="600" color={getAtRiskColor(summary.atRiskClients)}>
                    {summary.atRiskClients.toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Total Enterprise Revenue
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <DollarSign size={16} color="#059669" />
                  <Typography variant="h6" fontWeight="600" color="#059669">
                    ₦{(summary.enterpriseRevenue / 1000000).toFixed(1)}M
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Total Weight Collected
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Scale size={16} color="#8b5cf6" />
                  <Typography variant="h6" fontWeight="600" color="#8b5cf6">
                    {(summary.totalWeightCollected / 1000).toFixed(1)} tons
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
                  Client Retention Rate
                </Typography>
                <Typography variant="body2" fontWeight="500" color={getRetentionRateColor(summary.clientRetentionRate)}>
                  {summary.clientRetentionRate.toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={summary.clientRetentionRate}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: getRetentionRateColor(summary.clientRetentionRate)
                  }
                }}
              />
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  SLA Compliance Rate
                </Typography>
                <Typography variant="body2" fontWeight="500" color={getSLAComplianceColor(summary.slaComplianceRate)}>
                  {summary.slaComplianceRate.toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={summary.slaComplianceRate}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: getSLAComplianceColor(summary.slaComplianceRate)
                  }
                }}
              />
            </Stack>
          </Stack>
        </Box>

        {/* Portfolio Health Alert */}
        <Alert 
          severity={summary.slaIssues > 0 ? 'warning' : summary.atRiskClients > 0 ? 'info' : 'success'}
          sx={{ mt: 3 }}
        >
          <Typography variant="body2" fontWeight="600" mb={1}>
            Portfolio Health Assessment
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {summary.totalClients} total enterprise clients with {summary.activeClients} active accounts
            </Typography>
            <Typography variant="body2">
              • {(summary.totalWeightCollected / 1000).toFixed(1)} tons recycled through enterprise partnerships
            </Typography>
            <Typography variant="body2">
              • ₦{(summary.enterpriseRevenue / 1000000).toFixed(1)}M enterprise revenue generated
            </Typography>
            <Typography variant="body2">
              • {summary.clientRetentionRate.toFixed(1)}% retention rate indicates {summary.clientRetentionRate >= 95 ? 'excellent' : summary.clientRetentionRate >= 85 ? 'good' : 'needs improvement'} client satisfaction
            </Typography>
            <Typography variant="body2">
              • {summary.slaComplianceRate.toFixed(1)}% SLA compliance shows {summary.slaComplianceRate >= 95 ? 'excellent' : summary.slaComplianceRate >= 85 ? 'good' : 'needs improvement'} operational performance
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default EnterpriseSummaryCards;
