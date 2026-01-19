'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, Chip, Alert, AlertTitle, Button, LinearProgress } from '@mui/material';
import { 
  IconAlertTriangle,
  IconClock,
  IconCurrencyNaira,
  IconEye,
  IconRefresh,
  IconBuildingBank,
  IconCreditCard,
  IconTruck,
  IconNotes,
  IconSearch
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface UnmatchedEntry {
  id: string;
  txnId: string;
  provider: 'paystack' | 'flutterwave' | 'bank' | 'manual';
  amount: number;
  settlementDate: string;
  issue: 'missing_ledger' | 'delayed_sync' | 'data_mismatch';
  description: string;
  severity: 'high' | 'medium' | 'low';
}

interface UnmatchedProviderEntriesProps {
  onEntryClick?: (entryId: string) => void;
}

const UnmatchedProviderEntries: React.FC<UnmatchedProviderEntriesProps> = ({ onEntryClick }) => {
  // Mock data for unmatched entries
  const unmatchedEntries: UnmatchedEntry[] = [
    {
      id: '1',
      txnId: 'FLW-2024-002',
      provider: 'flutterwave',
      amount: 45000,
      settlementDate: '2024-01-15 16:30:00',
      issue: 'missing_ledger',
      description: 'Provider settled transaction but no corresponding ledger record found',
      severity: 'high'
    },
    {
      id: '2',
      txnId: 'PAY-2024-003',
      provider: 'paystack',
      amount: 25000,
      settlementDate: '2024-01-16 09:00:00',
      issue: 'delayed_sync',
      description: 'Provider data not yet synced to internal system',
      severity: 'medium'
    },
    {
      id: '3',
      txnId: 'BANK-2024-002',
      provider: 'bank',
      amount: 75000,
      settlementDate: '2024-01-15 17:30:00',
      issue: 'data_mismatch',
      description: 'Amount discrepancy between provider and expected values',
      severity: 'high'
    },
    {
      id: '4',
      txnId: 'MAN-2024-002',
      provider: 'manual',
      amount: 15000,
      settlementDate: '2024-01-15 18:00:00',
      issue: 'missing_ledger',
      description: 'Manual entry not reflected in internal ledger',
      severity: 'low'
    },
    {
      id: '5',
      txnId: 'FLW-2024-003',
      provider: 'flutterwave',
      amount: 35000,
      settlementDate: '2024-01-16 10:30:00',
      issue: 'delayed_sync',
      description: 'Provider data processing delayed',
      severity: 'medium'
    }
  ];

  // Unmatched metrics
  const unmatchedMetrics = {
    totalUnmatched: unmatchedEntries.length,
    highSeverity: unmatchedEntries.filter(e => e.severity === 'high').length,
    mediumSeverity: unmatchedEntries.filter(e => e.severity === 'medium').length,
    lowSeverity: unmatchedEntries.filter(e => e.severity === 'low').length,
    totalImpact: unmatchedEntries.reduce((sum, e) => sum + e.amount, 0),
    missingLedger: unmatchedEntries.filter(e => e.issue === 'missing_ledger').length,
    delayedSync: unmatchedEntries.filter(e => e.issue === 'delayed_sync').length,
    dataMismatch: unmatchedEntries.filter(e => e.issue === 'data_mismatch').length
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
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
      case 'medium': return <IconClock size={16} color="orange" />;
      case 'low': return <IconSearch size={16} color="blue" />;
      default: return <IconClock size={16} color="gray" />;
    }
  };

  const getIssueColor = (issue: string) => {
    switch (issue) {
      case 'missing_ledger': return 'error';
      case 'delayed_sync': return 'warning';
      case 'data_mismatch': return 'warning';
      default: return 'default';
    }
  };

  const getUnmatchedProgress = (severity: string) => {
    switch (severity) {
      case 'high': return 100;
      case 'medium': return 60;
      case 'low': return 30;
      default: return 0;
    }
  };

  return (
    <DashboardCard title="Unmatched Provider Entries">
      <Box sx={{ width: '100%' }}>
        {/* Unmatched Alert */}
        <Alert 
          severity="warning" 
          variant="outlined"
          sx={{ mb: 3 }}
          icon={<IconAlertTriangle size={20} />}
        >
          <AlertTitle sx={{ fontWeight: 600 }}>
            {unmatchedMetrics.totalUnmatched} Unmatched Provider Entries
          </AlertTitle>
          <Typography variant="body2">
            Total financial impact: ₦{unmatchedMetrics.totalImpact.toLocaleString()} | 
            {unmatchedMetrics.highSeverity} high severity issues
          </Typography>
        </Alert>

        {/* Unmatched Summary Cards */}
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
                  <IconAlertTriangle size={20} />
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Missing in Ledger
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="error.main">
                    {unmatchedMetrics.missingLedger}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Entries
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
                  <IconClock size={20} />
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    Delayed Sync
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="warning.main">
                    {unmatchedMetrics.delayedSync}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Entries
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
                    ₦{(unmatchedMetrics.totalImpact / 1000).toFixed(0)}K
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    At risk
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        {/* Unmatched Entries List */}
        <Box>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Unmatched Entry Details
          </Typography>
          <Stack spacing={2}>
            {unmatchedEntries.map((entry) => (
              <Card 
                key={entry.id} 
                sx={{ 
                  border: '1px solid', 
                  borderColor: entry.severity === 'high' ? 'error.light' : 
                                 entry.severity === 'medium' ? 'warning.light' : 'info.light',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                    borderColor: entry.severity === 'high' ? 'error.main' : 
                                   entry.severity === 'medium' ? 'warning.main' : 'info.main',
                  }
                }}
                onClick={() => onEntryClick?.(entry.id)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Stack direction="row" spacing={2} alignItems="center">
                        {getSeverityIcon(entry.severity)}
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {entry.txnId}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {entry.description}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          size="small"
                          label={entry.severity.toUpperCase()}
                          color={getSeverityColor(entry.severity) as any}
                          variant="outlined"
                        />
                        <Chip
                          size="small"
                          label={entry.issue.replace('_', ' ').charAt(0).toUpperCase() + entry.issue.replace('_', ' ').slice(1)}
                          color={getIssueColor(entry.issue) as any}
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
                          {getProviderIcon(entry.provider)}
                        </Box>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {entry.provider.charAt(0).toUpperCase() + entry.provider.slice(1)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Payment provider
                          </Typography>
                        </Box>
                      </Stack>
                      
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" fontWeight={700} color="primary.main">
                          ₦{entry.amount.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Settled: {entry.settlementDate}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Severity
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={getUnmatchedProgress(entry.severity)}
                            sx={{
                              width: 60,
                              height: 4,
                              borderRadius: 2,
                              bgcolor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getSeverityColor(entry.severity) + '.main' as any,
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
            Sync Missing Entries
          </Button>
          <Button
            variant="outlined"
            startIcon={<IconEye size={16} />}
          >
            Investigation Report
          </Button>
        </Stack>

        {/* Investigation Summary */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom color="warning.dark">
            Investigation Required
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Immediate Action Required
              </Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {unmatchedMetrics.highSeverity} high severity
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Data Sync Issues
              </Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                {unmatchedMetrics.delayedSync} delayed entries
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Total Financial Exposure
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                ₦{unmatchedMetrics.totalImpact.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Last Sync Check
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

export default UnmatchedProviderEntries;
