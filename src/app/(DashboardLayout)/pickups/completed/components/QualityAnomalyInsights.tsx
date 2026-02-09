'use client';

import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Paper,
  LinearProgress,
  Chip,
  Alert,
  Stack,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Users,
  Clock,
  Scale,
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface QualityAnomalyInsightsProps {
  weightVarianceData: any[];
  highVarianceAgents: any[];
  repeatDisputes: any[];
  timeOutliers: any[];
}

const QualityAnomalyInsights: React.FC<QualityAnomalyInsightsProps> = ({
  weightVarianceData,
  highVarianceAgents,
  repeatDisputes,
  timeOutliers,
}) => {
  const getVarianceColor = (variance: number) => {
    if (variance > 30) return 'error';
    if (variance > 15) return 'warning';
    return 'success';
  };

  return (
    <Grid container spacing={3}>
      {/* Weight Variance Distribution */}
      <Grid size={{ xs: 12, md: 6 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Weight Variance Distribution
            </Typography>
            <Stack spacing={2}>
              {weightVarianceData.map((item, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{item.range}</Typography>
                    <Typography variant="body2" fontWeight={600}>{item.count} pickups</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(item.count / weightVarianceData[0].count) * 100} 
                    color={getVarianceColor(item.maxVariance) as any}
                  />
                </Box>
              ))}
            </Stack>
            <Alert severity="info" sx={{ mt: 2 }}>
              High variance (&gt;30%) may indicate estimation issues or manipulation
            </Alert>
          </Box>
        </DashboardCard>
      </Grid>

      {/* High-Variance Agents */}
      <Grid size={{ xs: 12, md: 6 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              High-Variance Agents
            </Typography>
            <Stack spacing={2}>
              {highVarianceAgents.map((agent, index) => (
                <Paper key={index} sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{agent.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{agent.totalPickups} pickups</Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        color={agent.avgVariance > 30 ? 'error.main' : agent.avgVariance > 15 ? 'warning.main' : 'success.main'}
                      >
                        {agent.avgVariance.toFixed(1)}% avg variance
                      </Typography>
                      <Chip 
                        size="small" 
                        label={agent.riskLevel}
                        color={agent.riskLevel === 'high' ? 'error' : agent.riskLevel === 'medium' ? 'warning' : 'success'}
                      />
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>

      {/* Repeat Post-Completion Disputes */}
      <Grid size={{ xs: 12, md: 6 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Repeat Post-Completion Disputes
            </Typography>
            <Stack spacing={2}>
              {repeatDisputes.map((dispute, index) => (
                <Paper key={index} sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{dispute.user}</Typography>
                      <Typography variant="caption" color="text.secondary">{dispute.disputeCount} disputes</Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography variant="body2" color="text.secondary">
                        {dispute.lastDispute}
                      </Typography>
                      <Chip 
                        size="small" 
                        label={dispute.status}
                        color={dispute.status === 'active' ? 'error' : 'warning'}
                      />
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>

      {/* Completion Time Outliers */}
      <Grid size={{ xs: 12, md: 6 }}>
        <DashboardCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Completion Time Outliers
            </Typography>
            <Stack spacing={2}>
              {timeOutliers.map((outlier, index) => (
                <Paper key={index} sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{outlier.pickupId}</Typography>
                      <Typography variant="caption" color="text.secondary">{outlier.agent}</Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        color={outlier.completionTime > 180 ? 'error.main' : outlier.completionTime > 120 ? 'warning.main' : 'success.main'}
                      >
                        {outlier.completionTime} min
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {outlier.deviation} from avg
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
            <Alert severity="warning" sx={{ mt: 2 }}>
              Unusual completion times may indicate operational issues or delays
            </Alert>
          </Box>
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default QualityAnomalyInsights;
