'use client'
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Alert, Button, Accordion, AccordionSummary, AccordionDetails, LinearProgress, Chip, Grid } from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  ChevronDown,
  Target,
  Activity,
  BarChart3,
  Zap,
  RefreshCw
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { ImpactSimulation } from '../types';

interface ImpactPreviewSimulationProps {
  simulation: ImpactSimulation;
  onRunSimulation: () => void;
  onExportReport: () => void;
  isSimulating?: boolean;
}

const ImpactPreviewSimulation: React.FC<ImpactPreviewSimulationProps> = ({
  simulation,
  onRunSimulation,
  onExportReport,
  isSimulating = false
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const getChangeColor = (value: number) => {
    if (value > 0) return '#10b981';
    if (value < 0) return '#ef4444';
    return '#6b7280';
  };

  const getChangeIcon = (value: number) => {
    if (value > 0) return <TrendingUp size={16} />;
    if (value < 0) return <TrendingDown size={16} />;
    return <Activity size={16} />;
  };

  const getRiskLevel = (riskCount: number) => {
    if (riskCount <= 1) return { level: 'Low', color: '#10b981' };
    if (riskCount <= 3) return { level: 'Medium', color: '#f59e0b' };
    return { level: 'High', color: '#ef4444' };
  };

  const formatCurrency = (value: number) => {
    return `₦${(value / 1000000).toFixed(1)}M`;
  };

  const riskLevel = getRiskLevel(simulation.riskFactors.length);

  return (
    <DashboardCard title="Impact Preview & Simulation">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📊 Test rules before activation • Avoid unintended consequences • Predict business impact
          </Typography>
        </Box>

        {/* Simulation Controls */}
        <Stack direction="row" spacing={2} mb={3}>
          <Button
            variant="contained"
            startIcon={<RefreshCw />}
            onClick={onRunSimulation}
            disabled={isSimulating}
          >
            {isSimulating ? 'Running Simulation...' : 'Run Simulation'}
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Target />}
            onClick={onExportReport}
          >
            Export Report
          </Button>
        </Stack>

        {/* Key Metrics */}
        <Grid container spacing={3} mb={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ bgcolor: '#f8fafc' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: '#3b82f615',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <BarChart3 size={24} color="#3b82f6" />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="h6" fontWeight="600">
                      {formatCurrency(simulation.estimatedMonthlyIssuance)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Estimated Monthly Issuance
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ bgcolor: '#f8fafc' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: '#10b98115',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Users size={24} color="#10b981" />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="h6" fontWeight="600">
                      {simulation.userEngagementChange.toFixed(1)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      User Engagement Change
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Impact Analysis */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" mb={2}>Impact Analysis</Typography>
            
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Activity size={20} color="#6b7280" />
                <Typography variant="body2" fontWeight="500">Pickup Frequency</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  {getChangeIcon(simulation.pickupFrequencyChange)}
                  <Typography 
                    variant="body2" 
                    fontWeight="600"
                    color={getChangeColor(simulation.pickupFrequencyChange)}
                  >
                    {simulation.pickupFrequencyChange > 0 ? '+' : ''}{simulation.pickupFrequencyChange.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Target size={20} color="#6b7280" />
                <Typography variant="body2" fontWeight="500">Drop-off vs Pickup Shift</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  {getChangeIcon(simulation.dropoffVsPickupShift)}
                  <Typography 
                    variant="body2" 
                    fontWeight="600"
                    color={getChangeColor(simulation.dropoffVsPickupShift)}
                  >
                    {simulation.dropoffVsPickupShift > 0 ? '+' : ''}{simulation.dropoffVsPickupShift.toFixed(1)}%
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <DollarSign size={20} color="#6b7280" />
                <Typography variant="body2" fontWeight="500">Cost Impact (if redeemed)</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TrendingUp size={16} color="#ef4444" />
                  <Typography 
                    variant="body2" 
                    fontWeight="600"
                    color="#ef4444"
                  >
                    {formatCurrency(simulation.costImpactIfRedeemed)}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Risk Assessment</Typography>
              <Chip
                label={`${riskLevel.level} Risk`}
                size="small"
                sx={{
                  bgcolor: `${riskLevel.color}15`,
                  color: riskLevel.color,
                  fontWeight: 500
                }}
              />
            </Stack>

            <Stack spacing={2}>
              {simulation.riskFactors.map((risk, index) => (
                <Stack key={index} direction="row" spacing={2} alignItems="center">
                  <AlertTriangle size={16} color="#f59e0b" />
                  <Typography variant="body2">{risk}</Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" mb={2}>Recommendations</Typography>
            
            <Stack spacing={2}>
              {simulation.recommendations.map((recommendation, index) => (
                <Alert key={index} severity="info" sx={{ mb: 1 }}>
                  <Typography variant="body2">{recommendation}</Typography>
                </Alert>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <Accordion>
          <AccordionSummary 
            expandIcon={<ChevronDown />}
            onClick={() => setExpandedSection(expandedSection === 'detailed' ? null : 'detailed')}
          >
            <Typography variant="h6">Detailed Analysis</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              {/* User Behavior Impact */}
              <Box>
                <Typography variant="subtitle1" fontWeight="600" mb={2}>User Behavior Impact</Typography>
                <Stack spacing={2}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">New User Acquisition</Typography>
                      <Typography variant="body2" color="#10b981">
                        +{Math.abs(simulation.userEngagementChange * 0.3).toFixed(1)}%
                      </Typography>
                    </Stack>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(Math.abs(simulation.userEngagementChange * 0.3) * 10, 100)}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  
                  <Box>
                    <Stack direction="row" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">User Retention</Typography>
                      <Typography variant="body2" color="#10b981">
                        +{Math.abs(simulation.userEngagementChange * 0.4).toFixed(1)}%
                      </Typography>
                    </Stack>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(Math.abs(simulation.userEngagementChange * 0.4) * 10, 100)}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  
                  <Box>
                    <Stack direction="row" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Activity Frequency</Typography>
                      <Typography variant="body2" color="#10b981">
                        +{Math.abs(simulation.pickupFrequencyChange).toFixed(1)}%
                      </Typography>
                    </Stack>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(Math.abs(simulation.pickupFrequencyChange) * 10, 100)}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </Stack>
              </Box>

              {/* Financial Impact */}
              <Box>
                <Typography variant="subtitle1" fontWeight="600" mb={2}>Financial Impact</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Points Liability</Typography>
                      <Typography variant="h6" color="#ef4444">
                        {formatCurrency(simulation.estimatedMonthlyIssuance)}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">Redemption Cost</Typography>
                      <Typography variant="h6" color="#ef4444">
                        {formatCurrency(simulation.costImpactIfRedeemed)}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>

              {/* Operational Impact */}
              <Box>
                <Typography variant="subtitle1" fontWeight="600" mb={2}>
                  Operational Impact
                </Typography>
                <Stack spacing={2}>
                  <Alert severity="info">
                    <Typography variant="body2" fontWeight="600" mb={1}>
                      Agent Capacity
                    </Typography>
                    <Typography variant="body2">
                      {simulation.pickupFrequencyChange > 10 ? 
                        'High pickup increase may strain agent capacity. Consider agent scaling.' :
                        'Moderate impact on agent operations within current capacity.'
                      }
                    </Typography>
                  </Alert>
                  
                  <Alert severity="info">
                    <Typography variant="body2" fontWeight="600" mb={1}>
                      Support Load
                    </Typography>
                    <Typography variant="body2">
                      Expected increase in support tickets proportional to user engagement growth.
                    </Typography>
                  </Alert>
                </Stack>
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Summary */}
        <Alert severity="success" sx={{ mt: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            Simulation Summary
          </Typography>
          <Typography variant="body2">
            Current rules show {simulation.userEngagementChange > 0 ? 'positive' : 'neutral'} impact on user engagement 
            with {riskLevel.level.toLowerCase()} risk level. Review recommendations before activation.
          </Typography>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default ImpactPreviewSimulation;
