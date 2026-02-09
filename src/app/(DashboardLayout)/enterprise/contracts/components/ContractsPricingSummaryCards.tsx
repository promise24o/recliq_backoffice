'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Grid, LinearProgress, Alert } from '@mui/material';
import { 
  FileText, 
  Clock, 
  DollarSign, 
  Settings, 
  AlertTriangle, 
  TrendingUp,
  CheckCircle,
  Scale,
  Shield,
  Target,
  Zap,
  Activity,
  Calendar,
  Building
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { ContractsPricingSummary } from '../types';

interface ContractsPricingSummaryCardsProps {
  summary: ContractsPricingSummary;
  onCardClick?: (metricType: string) => void;
}

const ContractsPricingSummaryCards: React.FC<ContractsPricingSummaryCardsProps> = ({ 
  summary, 
  onCardClick 
}) => {
  const summaryCards = [
    {
      title: 'Active Contracts',
      value: summary.activeContracts.toLocaleString(),
      subtitle: 'Currently enforceable',
      icon: <CheckCircle size={24} color="#10b981" />,
      color: '#10b981',
      bgColor: '#10b98115',
      metricType: 'active_contracts'
    },
    {
      title: 'Expiring Soon',
      value: summary.expiringSoon.toLocaleString(),
      subtitle: 'Renewal window',
      icon: <Clock size={24} color="#f59e0b" />,
      color: '#f59e0b',
      bgColor: '#f59e0b15',
      metricType: 'expiring_soon'
    },
    {
      title: 'Avg Contract Value',
      value: `₦${(summary.avgContractValue / 1000000).toFixed(1)}M`,
      subtitle: 'Estimated monthly value',
      icon: <DollarSign size={24} color="#059669" />,
      color: '#059669',
      bgColor: '#05966915',
      metricType: 'avg_contract_value'
    },
    {
      title: 'Custom Pricing Rules',
      value: summary.customPricingRules.toLocaleString(),
      subtitle: 'Non-standard rates',
      icon: <Settings size={24} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgColor: '#8b5cf615',
      metricType: 'custom_pricing_rules'
    },
    {
      title: 'SLA Penalty Clauses',
      value: summary.slaPenaltyClauses.toLocaleString(),
      subtitle: 'Risk exposure',
      icon: <AlertTriangle size={24} color="#ef4444" />,
      color: '#ef4444',
      bgColor: '#ef444415',
      metricType: 'sla_penalty_clauses'
    },
    {
      title: 'Revenue Covered',
      value: `${summary.revenueCovered.toFixed(1)}%`,
      subtitle: '% of enterprise revenue under contract',
      icon: <TrendingUp size={24} color="#3b82f6" />,
      color: '#3b82f6',
      bgColor: '#3b82f615',
      metricType: 'revenue_covered'
    }
  ];

  const handleCardClick = (metricType: string) => {
    if (onCardClick) {
      onCardClick(metricType);
    }
  };

  const getRevenueCoverageColor = (percentage: number): string => {
    if (percentage >= 90) return '#10b981';
    if (percentage >= 75) return '#3b82f6';
    if (percentage >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getMarginColor = (margin: number): string => {
    if (margin >= 35) return '#10b981';
    if (margin >= 25) return '#3b82f6';
    if (margin >= 15) return '#f59e0b';
    return '#ef4444';
  };

  const getRiskColor = (count: number): string => {
    if (count === 0) return '#10b981';
    if (count <= 2) return '#f59e0b';
    if (count <= 5) return '#f97316';
    return '#ef4444';
  };

  const getContractValueColor = (value: number): string => {
    if (value >= 5000000) return '#10b981';
    if (value >= 2000000) return '#3b82f6';
    if (value >= 1000000) return '#f59e0b';
    return '#6b7280';
  };

  return (
    <DashboardCard title="Contracts & Pricing Summary">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📄 Commercial exposure • Contract status • Pricing enforcement
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

        {/* Contract Portfolio Metrics */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Contract Portfolio Metrics
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Total Contracts
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <FileText size={16} color="#3b82f6" />
                  <Typography variant="h6" fontWeight="600" color="#3b82f6">
                    {summary.totalContracts.toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Total Contract Value
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <DollarSign size={16} color={getContractValueColor(summary.totalContractValue)} />
                  <Typography variant="h6" fontWeight="600" color={getContractValueColor(summary.totalContractValue)}>
                    ₦{(summary.totalContractValue / 1000000).toFixed(1)}M
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Average Margin
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Scale size={16} color={getMarginColor(summary.avgMargin)} />
                  <Typography variant="h6" fontWeight="600" color={getMarginColor(summary.avgMargin)}>
                    {summary.avgMargin.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  High-Risk Contracts
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AlertTriangle size={16} color={getRiskColor(summary.highRiskContracts)} />
                  <Typography variant="h6" fontWeight="600" color={getRiskColor(summary.highRiskContracts)}>
                    {summary.highRiskContracts.toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Contract Status Breakdown */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Contract Status Breakdown
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Draft Contracts
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <FileText size={16} color="#6b7280" />
                  <Typography variant="h6" fontWeight="600" color="#6b7280">
                    {summary.draftContracts.toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Expired Contracts
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Clock size={16} color="#ef4444" />
                  <Typography variant="h6" fontWeight="600" color="#ef4444">
                    {summary.expiredContracts.toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Renewal Pending
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Calendar size={16} color="#f59e0b" />
                  <Typography variant="h6" fontWeight="600" color="#f59e0b">
                    {summary.renewalPending.toLocaleString()}
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
                  Revenue Coverage
                </Typography>
                <Typography variant="body2" fontWeight="500" color={getRevenueCoverageColor(summary.revenueCovered)}>
                  {summary.revenueCovered.toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={summary.revenueCovered}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: getRevenueCoverageColor(summary.revenueCovered)
                  }
                }}
              />
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Average Margin
                </Typography>
                <Typography variant="body2" fontWeight="500" color={getMarginColor(summary.avgMargin)}>
                  {summary.avgMargin.toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={Math.min(summary.avgMargin * 2, 100)} // Scale to 0-100 (50% = 100)
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: getMarginColor(summary.avgMargin)
                  }
                }}
              />
            </Stack>
          </Stack>
        </Box>

        {/* Commercial Health Alert */}
        <Alert 
          severity={summary.highRiskContracts > 0 ? 'warning' : summary.expiringSoon > 0 ? 'info' : 'success'}
          sx={{ mt: 3 }}
        >
          <Typography variant="body2" fontWeight="600" mb={1}>
            Commercial Health Assessment
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {summary.activeContracts} of {summary.totalContracts} contracts currently active and enforceable
            </Typography>
            <Typography variant="body2">
              • ₦{(summary.totalContractValue / 1000000).toFixed(1)}M total contract value with {summary.avgMargin.toFixed(1)}% average margin
            </Typography>
            <Typography variant="body2">
              • {summary.revenueCovered.toFixed(1)}% of enterprise revenue covered by contracts
            </Typography>
            <Typography variant="body2">
              • {summary.expiringSoon} contracts expiring soon require renewal attention
            </Typography>
            <Typography variant="body2">
              • {summary.customPricingRules} custom pricing rules require ongoing monitoring
            </Typography>
            <Typography variant="body2">
              • {summary.highRiskContracts} high-risk contracts identified for review
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default ContractsPricingSummaryCards;
