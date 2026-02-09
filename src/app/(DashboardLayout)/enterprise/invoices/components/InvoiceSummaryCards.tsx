'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Grid, LinearProgress, Alert } from '@mui/material';
import { 
  FileText, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  CreditCard,
  Target,
  Activity,
  Timer,
  Users,
  Package,
  Calendar,
  TrendingDown,
  Receipt
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { InvoiceSummary } from '../types';

interface InvoiceSummaryCardsProps {
  summary: InvoiceSummary;
  onCardClick?: (metricType: string) => void;
}

const InvoiceSummaryCards: React.FC<InvoiceSummaryCardsProps> = ({ 
  summary, 
  onCardClick 
}) => {
  const formatCurrency = (amount: number): string => {
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return formatter.format(amount);
  };

  const summaryCards = [
    {
      title: 'Total Invoices',
      value: summary.totalInvoices.toLocaleString(),
      subtitle: 'All generated invoices',
      icon: <FileText size={24} color="#3b82f6" />,
      color: '#3b82f6',
      bgColor: '#3b82f615',
      metricType: 'total_invoices'
    },
    {
      title: 'Total Billed Amount',
      value: formatCurrency(summary.totalBilledAmount),
      subtitle: 'Invoice value issued',
      icon: <DollarSign size={24} color="#10b981" />,
      color: '#10b981',
      bgColor: '#10b98115',
      metricType: 'total_billed_amount'
    },
    {
      title: 'Paid Invoices',
      value: summary.paidInvoices.toLocaleString(),
      subtitle: 'Successfully settled',
      icon: <CheckCircle size={24} color="#059669" />,
      color: '#059669',
      bgColor: '#05966915',
      metricType: 'paid_invoices'
    },
    {
      title: 'Outstanding Amount',
      value: formatCurrency(summary.outstandingAmount),
      subtitle: 'Awaiting payment',
      icon: <Clock size={24} color="#f59e0b" />,
      color: '#f59e0b',
      bgColor: '#f59e0b15',
      metricType: 'outstanding_amount'
    },
    {
      title: 'Overdue Invoices',
      value: summary.overdueInvoices.toLocaleString(),
      subtitle: 'Past due date',
      icon: <AlertTriangle size={24} color="#ef4444" />,
      color: '#ef4444',
      bgColor: '#ef444415',
      metricType: 'overdue_invoices'
    },
    {
      title: 'Avg Days to Pay',
      value: `${summary.avgDaysToPay} days`,
      subtitle: 'Cash flow speed',
      icon: <TrendingUp size={24} color="#8b5cf6" />,
      color: '#8b5cf6',
      bgColor: '#8b5cf615',
      metricType: 'avg_days_to_pay'
    }
  ];

  const handleCardClick = (metricType: string) => {
    if (onCardClick) {
      onCardClick(metricType);
    }
  };

  const getPaymentRateColor = (rate: number): string => {
    if (rate >= 80) return '#10b981';
    if (rate >= 60) return '#3b82f6';
    if (rate >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getOverdueColor = (count: number): string => {
    if (count === 0) return '#10b981';
    if (count <= 2) return '#f59e0b';
    if (count <= 5) return '#f97316';
    return '#ef4444';
  };

  const getDaysToPayColor = (days: number): string => {
    if (days <= 7) return '#10b981';
    if (days <= 14) return '#3b82f6';
    if (days <= 30) return '#f59e0b';
    return '#ef4444';
  };

  const paymentRate = summary.totalBilledAmount > 0 ? (summary.paidAmount / summary.totalBilledAmount) * 100 : 0;
  const overdueRate = summary.totalInvoices > 0 ? (summary.overdueInvoices / summary.totalInvoices) * 100 : 0;

  return (
    <DashboardCard title="Invoice Summary">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🧾 Enterprise billing • Payment tracking • Revenue realization
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
            Billing Performance Metrics
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Draft Invoices
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <FileText size={16} color="#6b7280" />
                  <Typography variant="h6" fontWeight="600" color="#6b7280">
                    {summary.draftInvoices.toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Partially Paid
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CreditCard size={16} color="#f59e0b" />
                  <Typography variant="h6" fontWeight="600" color="#f59e0b">
                    {summary.partiallyPaidInvoices.toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Disputed Invoices
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AlertTriangle size={16} color="#ef4444" />
                  <Typography variant="h6" fontWeight="600" color="#ef4444">
                    {summary.disputedInvoices.toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Payment Rate
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Activity size={16} color={getPaymentRateColor(paymentRate)} />
                  <Typography variant="h6" fontWeight="600" color={getPaymentRateColor(paymentRate)}>
                    {paymentRate.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Progress Indicators */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={2}>
            Cash Flow Indicators
          </Typography>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Payment Collection Rate
                </Typography>
                <Typography variant="body2" fontWeight="500" color={getPaymentRateColor(paymentRate)}>
                  {paymentRate.toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={paymentRate}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: getPaymentRateColor(paymentRate)
                  }
                }}
              />
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Overdue Invoice Rate
                </Typography>
                <Typography variant="body2" fontWeight="500" color={getOverdueColor(summary.overdueInvoices)}>
                  {overdueRate.toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={overdueRate}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: getOverdueColor(summary.overdueInvoices)
                  }
                }}
              />
            </Stack>
          </Stack>
        </Box>

        {/* Revenue Health Alert */}
        <Alert 
          severity={summary.overdueInvoices > 0 ? 'warning' : summary.disputedInvoices > 0 ? 'info' : 'success'}
          sx={{ mt: 3 }}
        >
          <Typography variant="body2" fontWeight="600" mb={1}>
            Revenue Health Assessment
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {summary.totalInvoices} invoices generated with {formatCurrency(summary.totalBilledAmount)} total billed amount
            </Typography>
            <Typography variant="body2">
              • {summary.paidInvoices} invoices paid ({formatCurrency(summary.paidAmount)}) with {summary.avgDaysToPay} days average payment time
            </Typography>
            <Typography variant="body2">
              • {formatCurrency(summary.outstandingAmount)} outstanding across {summary.totalInvoices - summary.paidInvoices} unpaid invoices
            </Typography>
            <Typography variant="body2">
              • {summary.overdueInvoices} overdue invoices requiring immediate follow-up
            </Typography>
            <Typography variant="body2">
              • {summary.disputedInvoices} disputed invoices requiring resolution
            </Typography>
            <Typography variant="body2">
              • {summary.draftInvoices} draft invoices pending review and issuance
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default InvoiceSummaryCards;
