'use client'
import React from 'react';
import { Box, Typography, Stack, Card, CardContent, Chip, Alert, AlertTitle, LinearProgress, Button } from '@mui/material';
import { 
  IconAlertTriangle,
  IconClock,
  IconCurrencyNaira,
  IconEye,
  IconRefresh,
  IconUsers,
  IconBriefcase,
  IconBuilding,
  IconCalendar,
  IconTrendingUp,
  IconTrendingDown,
  IconCheck
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface RiskEscrow {
  id: string;
  escrowId: string;
  counterparty: 'agent' | 'user' | 'enterprise_client';
  amount: number;
  overdueDays: number;
  reason: string;
  riskLevel: 'high' | 'critical';
  counterpartyName: string;
}

interface AtRiskEscrowsProps {
  onEscrowClick?: (escrowId: string) => void;
}

const OverdueAtRiskEscrows: React.FC<AtRiskEscrowsProps> = ({ onEscrowClick }) => {
  // Mock data for overdue escrows
  const overdueEscrows: RiskEscrow[] = [
    {
      id: '1',
      escrowId: 'ESC-2024-045',
      counterparty: 'agent',
      amount: 250000,
      overdueDays: 5,
      reason: 'Weight confirmation pending',
      riskLevel: 'high',
      counterpartyName: 'John Doe'
    },
    {
      id: '2',
      escrowId: 'ESC-2024-067',
      counterparty: 'enterprise_client',
      amount: 850000,
      overdueDays: 8,
      reason: 'Dispute resolution pending',
      riskLevel: 'critical',
      counterpartyName: 'Tech Corp Ltd'
    },
    {
      id: '3',
      escrowId: 'ESC-2024-089',
      counterparty: 'user',
      amount: 75000,
      overdueDays: 3,
      reason: 'Compliance review pending',
      riskLevel: 'high',
      counterpartyName: 'Jane Smith'
    },
    {
      id: '4',
      escrowId: 'ESC-2024-112',
      counterparty: 'agent',
      amount: 180000,
      overdueDays: 12,
      reason: 'Document verification pending',
      riskLevel: 'critical',
      counterpartyName: 'Mike Johnson'
    }
  ];

  // Risk metrics
  const riskMetrics = {
    totalOverdue: overdueEscrows.length,
    totalAmount: overdueEscrows.reduce((sum, escrow) => sum + escrow.amount, 0),
    criticalCount: overdueEscrows.filter(e => e.riskLevel === 'critical').length,
    highCount: overdueEscrows.filter(e => e.riskLevel === 'high').length,
    avgOverdueDays: Math.round(overdueEscrows.reduce((sum, escrow) => sum + escrow.overdueDays, 0) / overdueEscrows.length)
  };

  const getCounterpartyIcon = (counterparty: string) => {
    switch (counterparty) {
      case 'agent': return <IconBriefcase size={16} />;
      case 'user': return <IconUsers size={16} />;
      case 'enterprise_client': return <IconBuilding size={16} />;
      default: return <IconUsers size={16} />;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      default: return 'default';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return <IconAlertTriangle size={16} color="red" />;
      case 'high': return <IconAlertTriangle size={16} color="orange" />;
      default: return <IconClock size={16} color="gray" />;
    }
  };

  const getOverdueProgress = (overdueDays: number) => {
    // Progress based on days overdue (max 14 days for full progress)
    return Math.min((overdueDays / 14) * 100, 100);
  };

  const getProgressColor = (overdueDays: number) => {
    if (overdueDays <= 3) return 'success';
    if (overdueDays <= 7) return 'warning';
    return 'error';
  };

  return (
    <DashboardCard title="Overdue & At-Risk Escrows">
      <Box sx={{ width: '100%' }}>
        {/* Risk Alert */}
        <Alert 
          severity="error" 
          variant="outlined"
          sx={{ mb: 3 }}
          icon={<IconAlertTriangle size={20} />}
        >
          <AlertTitle sx={{ fontWeight: 600 }}>
            {riskMetrics.totalOverdue} Escrows Overdue SLA
          </AlertTitle>
          <Typography variant="body2">
            Total amount at risk: ₦{riskMetrics.totalAmount.toLocaleString()} | 
            Average overdue: {riskMetrics.avgOverdueDays} days
          </Typography>
        </Alert>

        {/* Risk Summary Cards */}
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
                    Critical Risk
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="error.main">
                    {riskMetrics.criticalCount}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Escrows
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
                    High Risk
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="warning.main">
                    {riskMetrics.highCount}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Escrows
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
                    Amount at Risk
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="info.main">
                    ₦{(riskMetrics.totalAmount / 1000000).toFixed(1)}M
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total value
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        {/* Overdue Escrows List */}
        <Box>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Overdue Escrows
          </Typography>
          <Stack spacing={2}>
            {overdueEscrows.map((escrow) => (
              <Card 
                key={escrow.id} 
                sx={{ 
                  border: '1px solid', 
                  borderColor: escrow.riskLevel === 'critical' ? 'error.light' : 'warning.light',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                    borderColor: escrow.riskLevel === 'critical' ? 'error.main' : 'warning.main',
                  }
                }}
                onClick={() => onEscrowClick?.(escrow.escrowId)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Stack direction="row" spacing={2} alignItems="center">
                        {getRiskIcon(escrow.riskLevel)}
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {escrow.escrowId}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {escrow.reason}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          size="small"
                          label={escrow.riskLevel.toUpperCase()}
                          color={getRiskColor(escrow.riskLevel) as any}
                          variant="outlined"
                        />
                        <Chip
                          size="small"
                          label={`${escrow.overdueDays} days overdue`}
                          color="error"
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
                          {getCounterpartyIcon(escrow.counterparty)}
                        </Box>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {escrow.counterparty === 'agent' ? 'Agent' : 
                             escrow.counterparty === 'user' ? 'User' : 'Enterprise Client'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {escrow.counterpartyName}
                          </Typography>
                        </Box>
                      </Stack>
                      
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" fontWeight={700} color="primary.main">
                          ₦{escrow.amount.toLocaleString()}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Overdue progress
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={getOverdueProgress(escrow.overdueDays)}
                            sx={{
                              width: 80,
                              height: 4,
                              borderRadius: 2,
                              bgcolor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getProgressColor(escrow.overdueDays) + '.main' as any,
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
            color="error"
          >
            Review All Overdue
          </Button>
          <Button
            variant="outlined"
            startIcon={<IconEye size={16} />}
          >
            View Full Report
          </Button>
        </Stack>

        {/* Risk Summary */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'error.light', borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom color="error.dark">
            Risk Assessment Summary
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Immediate Action Required
              </Typography>
              <Typography variant="caption" fontWeight={600} color="error.main">
                {riskMetrics.criticalCount} critical escrows
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                High Priority Review
              </Typography>
              <Typography variant="caption" fontWeight={600} color="warning.main">
                {riskMetrics.highCount} high-risk escrows
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Total Financial Exposure
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                ₦{riskMetrics.totalAmount.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Last Risk Assessment
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

export default OverdueAtRiskEscrows;
