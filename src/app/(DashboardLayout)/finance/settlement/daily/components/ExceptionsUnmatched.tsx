'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, Chip, Alert, AlertTitle, Button, LinearProgress } from '@mui/material';
import { 
  IconAlertTriangle,
  IconClock,
  IconCurrencyNaira,
  IconEye,
  IconRefresh,
  IconX,
  IconBuildingBank,
  IconCreditCard,
  IconTruck,
  IconNotes,
  IconTrendingUp
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface ExceptionItem {
  id: string;
  type: 'missing_provider' | 'missing_ledger' | 'amount_mismatch' | 'delayed_settlement';
  txnId: string;
  source: 'paystack' | 'flutterwave' | 'bank' | 'manual';
  amount: number;
  description: string;
  severity: 'high' | 'medium' | 'low';
  impact: string;
}

interface ExceptionsUnmatchedProps {
  onExceptionClick?: (exceptionId: string) => void;
}

const ExceptionsUnmatched: React.FC<ExceptionsUnmatchedProps> = ({ onExceptionClick }) => {
  // Mock data for exceptions
  const exceptions: ExceptionItem[] = [
    {
      id: '1',
      type: 'missing_provider',
      txnId: 'TXN-2024-003',
      source: 'paystack',
      amount: 25000,
      description: 'Ledger record exists but not found in provider records',
      severity: 'high',
      impact: '₦25,000 at risk of double payment'
    },
    {
      id: '2',
      type: 'missing_ledger',
      txnId: 'TXN-2024-004',
      source: 'flutterwave',
      amount: 45000,
      description: 'Provider settled but no corresponding ledger record',
      severity: 'high',
      impact: '₦45,000 revenue not recognized'
    },
    {
      id: '3',
      type: 'amount_mismatch',
      txnId: 'TXN-2024-005',
      source: 'paystack',
      amount: 500,
      description: 'Ledger amount (₦60,000) differs from provider (₦59,500)',
      severity: 'medium',
      impact: '₦500 variance in reconciliation'
    },
    {
      id: '4',
      type: 'delayed_settlement',
      txnId: 'TXN-2024-006',
      source: 'bank',
      amount: 100000,
      description: 'Bank transfer initiated but not yet settled',
      severity: 'medium',
      impact: '₦100,000 pending settlement'
    },
    {
      id: '5',
      type: 'missing_provider',
      txnId: 'TXN-2024-007',
      source: 'flutterwave',
      amount: 15000,
      description: 'Ledger record exists but not found in provider records',
      severity: 'medium',
      impact: '₦15,000 at risk of double payment'
    }
  ];

  // Exception metrics
  const exceptionMetrics = {
    totalExceptions: exceptions.length,
    highSeverity: exceptions.filter(e => e.severity === 'high').length,
    mediumSeverity: exceptions.filter(e => e.severity === 'medium').length,
    lowSeverity: exceptions.filter(e => e.severity === 'low').length,
    totalImpact: exceptions.reduce((sum, e) => sum + e.amount, 0),
    missingProvider: exceptions.filter(e => e.type === 'missing_provider').length,
    missingLedger: exceptions.filter(e => e.type === 'missing_ledger').length,
    amountMismatch: exceptions.filter(e => e.type === 'amount_mismatch').length,
    delayedSettlement: exceptions.filter(e => e.type === 'delayed_settlement').length
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'paystack': return <IconBuildingBank size={16} />;
      case 'flutterwave': return <IconCreditCard size={16} />;
      case 'bank': return <IconTruck size={16} />;
      case 'manual': return <IconNotes size={16} />;
      default: return <IconBuildingBank size={16} />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <IconAlertTriangle size={16} color="red" />;
      case 'medium': return <IconAlertTriangle size={16} color="orange" />;
      case 'low': return <IconClock size={16} color="blue" />;
      default: return <IconClock size={16} color="gray" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'missing_provider': return 'warning';
      case 'missing_ledger': return 'error';
      case 'amount_mismatch': return 'warning';
      case 'delayed_settlement': return 'info';
      default: return 'default';
    }
  };

  const getExceptionProgress = (severity: string) => {
    switch (severity) {
      case 'high': return 100;
      case 'medium': return 60;
      case 'low': return 30;
      default: return 0;
    }
  };

  return (
    <DashboardCard title="Exceptions & Unmatched">
      <Box sx={{ width: '100%' }}>
        {/* Exception Alert */}
        <Alert 
          severity="warning" 
          variant="outlined"
          sx={{ mb: 3 }}
          icon={<IconAlertTriangle size={20} />}
        >
          <AlertTitle sx={{ fontWeight: 600 }}>
            {exceptionMetrics.totalExceptions} Exceptions Require Attention
          </AlertTitle>
          <Typography variant="body2">
            Total financial impact: ₦{exceptionMetrics.totalImpact.toLocaleString()} | 
            {exceptionMetrics.highSeverity} high severity issues
          </Typography>
        </Alert>

        {/* Exception Summary Cards */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'error.light' }}>
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'error.light',
                    color: 'error.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconX size={20} />
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Missing in Provider
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="error.main">
                    {exceptionMetrics.missingProvider}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Exceptions
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'warning.light' }}>
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'warning.light',
                    color: 'warning.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconAlertTriangle size={20} />
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Missing in Ledger
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="warning.main">
                    {exceptionMetrics.missingLedger}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Exceptions
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, border: '1px solid', borderColor: 'info.light' }}>
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'info.light',
                    color: 'info.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconCurrencyNaira size={20} />
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Financial Impact
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="info.main">
                    ₦{(exceptionMetrics.totalImpact / 1000).toFixed(0)}K
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total variance
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        {/* Exceptions List */}
        <Box>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Exception Details
          </Typography>
          <Stack spacing={2}>
            {exceptions.map((exception) => (
              <Card 
                key={exception.id} 
                sx={{ 
                  border: '1px solid', 
                  borderColor: exception.severity === 'high' ? 'error.light' : 
                                 exception.severity === 'medium' ? 'warning.light' : 'info.light',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                    borderColor: exception.severity === 'high' ? 'error.main' : 
                                   exception.severity === 'medium' ? 'warning.main' : 'info.main',
                  }
                }}
                onClick={() => onExceptionClick?.(exception.id)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Stack direction="row" spacing={2} alignItems="center">
                        {getSeverityIcon(exception.severity)}
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {exception.txnId}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {exception.description}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          size="small"
                          label={exception.severity.toUpperCase()}
                          color={getSeverityColor(exception.severity) as any}
                          variant="outlined"
                        />
                        <Chip
                          size="small"
                          label={exception.type.replace('_', ' ').charAt(0).toUpperCase() + exception.type.replace('_', ' ').slice(1)}
                          color={getTypeColor(exception.type) as any}
                          variant="outlined"
                        />
                      </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 1,
                            bgcolor: 'grey.100',
                            color: 'grey.600',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {getSourceIcon(exception.source)}
                        </Box>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {exception.source.charAt(0).toUpperCase() + exception.source.slice(1)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Payment provider
                          </Typography>
                        </Box>
                      </Stack>
                      
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" fontWeight={700} color="primary.main">
                          ₦{exception.amount.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {exception.impact}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Severity
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={getExceptionProgress(exception.severity)}
                            sx={{
                              width: 60,
                              height: 4,
                              borderRadius: 2,
                              bgcolor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getSeverityColor(exception.severity) + '.main' as any,
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            startIcon={<IconRefresh size={16} />}
            color="warning"
          >
            Resolve All Exceptions
          </Button>
          <Button
            variant="outlined"
            startIcon={<IconEye size={16} />}
          >
            View Detailed Report
          </Button>
        </Stack>

        {/* Exception Summary */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom color="warning.dark">
            Exception Resolution Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Immediate Action Required
              </Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {exceptionMetrics.highSeverity} high severity
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Medium Priority Review
              </Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                {exceptionMetrics.mediumSeverity} medium severity
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Total Financial Exposure
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                ₦{exceptionMetrics.totalImpact.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Last Exception Check
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                {new Date().toLocaleString()}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default ExceptionsUnmatched;
