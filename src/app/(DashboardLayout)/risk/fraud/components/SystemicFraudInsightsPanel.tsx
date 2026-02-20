'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  Shield,
  Target,
} from 'lucide-react';
import type { FraudControlMetric, RepeatOffender } from '../types';
import { formatCurrency, getEntityTypeColor, getEntityTypeLabel } from '../mockData';

interface SystemicFraudInsightsPanelProps {
  metrics: FraudControlMetric[];
  repeatOffenders: RepeatOffender[];
}

const SystemicFraudInsightsPanel: React.FC<SystemicFraudInsightsPanelProps> = ({
  metrics,
  repeatOffenders
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle size={16} color="#10B981" />;
      case 'warning': return <AlertTriangle size={16} color="#F59E0B" />;
      case 'critical': return <AlertTriangle size={16} color="#EF4444" />;
      default: return <Shield size={16} color="#6B7280" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={14} />;
      case 'down': return <TrendingDown size={14} />;
      default: return <Minus size={14} />;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return '#EF4444';
    if (score >= 60) return '#F59E0B';
    return '#10B981';
  };

  const getAccountStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'restricted': return 'warning';
      case 'suspended': return 'error';
      case 'terminated': return 'error';
      default: return 'default';
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box mb={3}>
        <Typography variant="h6" fontWeight="600">
          Systemic Fraud & Control Insights
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Platform-wide fraud indicators and repeat offender tracking
        </Typography>
      </Box>

      {/* Control Metrics Grid */}
      <Grid container spacing={2} mb={4}>
        {metrics.map((metric) => (
          <Grid key={metric.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Box
              sx={{
                p: 2.5,
                border: '1px solid',
                borderColor: getStatusColor(metric.status) + '40',
                borderRadius: 2,
                bgcolor: getStatusColor(metric.status) + '08'
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Typography variant="caption" color="text.secondary" fontWeight="500">
                  {metric.label}
                </Typography>
                {getStatusIcon(metric.status)}
              </Stack>
              <Stack direction="row" alignItems="baseline" spacing={1}>
                <Typography variant="h5" fontWeight="700" color={getStatusColor(metric.status)}>
                  {metric.value}{metric.unit === '%' ? '%' : ''}
                </Typography>
                {metric.unit && metric.unit !== '%' && (
                  <Typography variant="caption" color="text.secondary">
                    {metric.unit}
                  </Typography>
                )}
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5} mt={1}>
                <Box sx={{
                  color: metric.label.includes('False Positive') || metric.label.includes('Time')
                    ? (metric.trend === 'down' ? '#10B981' : '#EF4444')
                    : (metric.trend === 'up' && metric.label.includes('Accuracy') || metric.label.includes('Recovery')
                      ? '#10B981'
                      : metric.trend === 'up' ? '#EF4444' : '#10B981')
                }}>
                  {getTrendIcon(metric.trend)}
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight="500"
                >
                  {metric.trendValue > 0 ? '+' : ''}{metric.trendValue}% vs last month
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                <Target size={10} color="#6B7280" />
                <Typography variant="caption" color="text.secondary">
                  Threshold: {metric.threshold}{metric.unit === '%' ? '%' : ` ${metric.unit}`}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Repeat Offenders */}
      <Typography variant="subtitle1" fontWeight="600" mb={2}>
        Repeat Offenders
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Entity</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="center">Flags</TableCell>
              <TableCell>Total Exposure</TableCell>
              <TableCell align="center">Risk Score</TableCell>
              <TableCell>Last Flag</TableCell>
              <TableCell>Account Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repeatOffenders.map((entity) => (
              <TableRow key={entity.id} hover>
                <TableCell>
                  <Stack spacing={0}>
                    <Typography variant="body2" fontWeight="600">
                      {entity.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {entity.id}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getEntityTypeLabel(entity.type)}
                    size="small"
                    sx={{
                      bgcolor: getEntityTypeColor(entity.type) + '15',
                      color: getEntityTypeColor(entity.type),
                      fontSize: '0.7rem'
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" fontWeight="600" color="#EF4444">
                    {entity.flagCount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="500">
                    {formatCurrency(entity.totalExposure)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={entity.riskScore}
                    size="small"
                    sx={{
                      bgcolor: getRiskScoreColor(entity.riskScore) + '15',
                      color: getRiskScoreColor(entity.riskScore),
                      fontWeight: 700,
                      fontSize: '0.75rem'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(entity.lastFlagDate).toLocaleDateString('en-NG')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={entity.accountStatus.toUpperCase()}
                    size="small"
                    color={getAccountStatusColor(entity.accountStatus) as any}
                    variant="outlined"
                    sx={{ fontSize: '0.65rem' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SystemicFraudInsightsPanel;
