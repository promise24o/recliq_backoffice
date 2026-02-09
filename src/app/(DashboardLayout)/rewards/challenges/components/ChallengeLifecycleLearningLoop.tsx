'use client';
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Button, Alert, Accordion, AccordionSummary, AccordionDetails, Grid, LinearProgress, Chip } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  RefreshCw, 
  ChevronDown,
  Download,
  Calendar,
  Target,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { ChallengeLifecycle } from '../types';

interface ChallengeLifecycleLearningLoopProps {
  lifecycleData: ChallengeLifecycle[];
  onExportLifecycle: () => void;
  onSetNotification?: (notification: { open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }) => void;
}

const ChallengeLifecycleLearningLoop: React.FC<ChallengeLifecycleLearningLoopProps> = ({
  lifecycleData,
  onExportLifecycle,
  onSetNotification
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const getPhaseColor = (phase: string): 'grey' | 'info' | 'success' | 'warning' => {
    switch (phase) {
      case 'baseline': return 'grey';
      case 'during': return 'info';
      case 'post_challenge': return 'success';
      case 'decay': return 'warning';
      default: return 'grey';
    }
  };

  const getPhaseIcon = (phase: string): React.ReactNode => {
    switch (phase) {
      case 'baseline': return <Activity size={16} />;
      case 'during': return <Target size={16} />;
      case 'post_challenge': return <CheckCircle size={16} />;
      case 'decay': return <Clock size={16} />;
      default: return <Activity size={16} />;
    }
  };

  const formatPhaseLabel = (phase: string): string => {
    switch (phase) {
      case 'baseline': return 'Baseline';
      case 'during': return 'During Challenge';
      case 'post_challenge': return 'Post-Challenge';
      case 'decay': return 'Decay Analysis';
      default: return phase;
    }
  };

  return (
    <DashboardCard title="Challenge Lifecycle & Learning Loop">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🔄 Challenge lifecycle analysis • Pre-challenge baseline • During challenge delta • Post-challenge decay
          </Typography>
        </Box>

        {/* Controls */}
        <Stack direction="row" spacing={2} mb={3}>
          <Button
            variant="contained"
            startIcon={<RefreshCw />}
            onClick={() => onSetNotification && onSetNotification({
              open: true,
              message: 'Lifecycle data refreshed',
              severity: 'success'
            })}
          >
            Refresh Data
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={onExportLifecycle}
          >
            Export Lifecycle
          </Button>
        </Stack>

        {/* Lifecycle Timeline */}
        <Stack spacing={3}>
          {lifecycleData.map((lifecycle) => (
            <Card key={lifecycle.id} sx={{ border: '1px solid #e2e8f0' }}>
              <CardContent>
                <Stack spacing={2}>
                  {/* Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight="600">
                        Challenge {lifecycle.challengeId}
                      </Typography>
                      <Chip
                        label={formatPhaseLabel(lifecycle.phase)}
                        size="small"
                        sx={{
                          bgcolor: `${getPhaseColor(lifecycle.phase)}15`,
                          color: getPhaseColor(lifecycle.phase),
                          fontSize: '0.75rem'
                        }}
                      />
                    </Box>
                    
                    <Stack direction="row" spacing={1}>
                      {getPhaseIcon(lifecycle.phase)}
                      <Typography variant="body2" color="text.secondary">
                        {new Date(lifecycle.metrics.baseline.avgPickupsPerDay).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* Phase Metrics */}
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="600" mb={2}>
                      {formatPhaseLabel(lifecycle.phase)} Metrics
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Avg Pickups/Day
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {lifecycle.metrics.baseline.avgPickupsPerDay.toFixed(1)}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Avg Quality Score
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {lifecycle.metrics.baseline.avgQualityScore.toFixed(1)}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            Participant Count
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {lifecycle.metrics.baseline.participantCount.toLocaleString()}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>

                {/* Progress Timeline */}
                <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                  <Typography variant="body2" fontWeight="600" mb={2}>
                    Progress Timeline
                  </Typography>
                  
                  <Timeline>
                    <TimelineItem>
                      <TimelineSeparator />
                      <TimelineDot color={getPhaseColor(lifecycle.phase)} />
                      <TimelineContent>
                        <Typography variant="body2" fontWeight="500">
                          Baseline Period
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {lifecycle.metrics.baseline.avgPickupsPerDay} pickups/day average
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>

                    {lifecycle.phase !== 'baseline' && (
                      <TimelineItem>
                        <TimelineSeparator />
                        <TimelineDot color={getPhaseColor(lifecycle.phase)} />
                        <TimelineContent>
                          <Typography variant="body2" fontWeight="500">
                            Challenge Period
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {lifecycle.metrics.during.avgPickupsPerDay} pickups/day average
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {lifecycle.metrics.during.participantCount} participants
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    )}

                    {lifecycle.phase !== 'baseline' && lifecycle.phase !== 'during' && (
                      <TimelineItem>
                        <TimelineSeparator />
                        <TimelineDot color={getPhaseColor(lifecycle.phase)} />
                        <TimelineContent>
                          <Typography variant="body2" fontWeight="500">
                            Post-Challenge
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {lifecycle.metrics.postChallenge.avgPickupsPerDay} pickups/day average
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {lifecycle.metrics.postChallenge.participantCount} participants
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    )}

                    {lifecycle.phase === 'decay' && (
                      <TimelineItem>
                        <TimelineSeparator />
                        <TimelineDot color={getPhaseColor(lifecycle.phase)} />
                        <TimelineContent>
                          <Typography variant="body2" fontWeight="500">
                            Decay Analysis
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {lifecycle.metrics.decay.daysAfterChallenge} days after challenge
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {lifecycle.metrics.decay.retentionRate.toFixed(1)}% retention rate
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {lifecycle.metrics.decay.behaviorPersistence.toFixed(1)}% behavior persistence
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    )}
                  </Timeline>
                </Box>

                {/* Insights */}
                <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                  <Typography variant="body2" fontWeight="600" mb={2}>
                    Key Insights
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      • Challenge was {lifecycle.insights.wasEffective ? 'effective' : 'ineffective'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Key drivers: {lifecycle.insights.keyDrivers.join(', ')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • {lifecycle.insights.unintendedConsequences.length > 0 ? 'Unintended consequences detected' : 'No unintended consequences'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • {lifecycle.insights.shouldRepeat ? 'Recommended to repeat' : 'Not recommended to repeat'}
                    </Typography>
                  </Stack>
                </Box>

                {/* Progress Indicators */}
                <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                  <Typography variant="body2" fontWeight="600" mb={2}>
                    Progress Indicators
                  </Typography>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Baseline → During
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {lifecycle.metrics.during.avgPickupsPerDay > lifecycle.metrics.baseline.avgPickupsPerDay ? (
                          <TrendingUp size={16} color="#10b981" />
                        ) : (
                          <TrendingDown size={16} color="#ef4444" />
                        )}
                        <Typography variant="body2" fontWeight="500">
                          {((lifecycle.metrics.during.avgPickupsPerDay / lifecycle.metrics.baseline.avgPickupsPerDay - 1) * 100).toFixed(1)}%
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        During → Post-Challenge
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                      {lifecycle.metrics.postChallenge.avgPickupsPerDay > lifecycle.metrics.during.avgPickupsPerDay ? (
                        <TrendingUp size={16} color="#10b981" />
                      ) : (
                        <TrendingDown size={16} color="#ef4444" />
                      )}
                      <Typography variant="body2" fontWeight="500">
                        {((lifecycle.metrics.postChallenge.avgPickupsPerDay / lifecycle.metrics.during.avgPickupsPerDay - 1) * 100).toFixed(1)}%
                      </Typography>
                    </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Retention Rate
                      </Typography>
                      <Typography variant="body2" fontWeight="500" color="#10b981">
                        {lifecycle.metrics.decay.retentionRate.toFixed(1)}%
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>

                {/* Recommended Changes */}
                {lifecycle.insights.recommendedChanges.length > 0 && (
                  <Box sx={{ p: 2, bgcolor: '#f0f9ff', borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="600" mb={1}>
                      Recommended Changes
                    </Typography>
                    <Stack spacing={1}>
                      {lifecycle.insights.recommendedChanges.map((change, index) => (
                        <Typography key={index} variant="body2" color="text.secondary">
                          • {change}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Summary */}
        <Alert severity="success" sx={{ mt: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            Lifecycle Summary
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {lifecycleData.length} challenges analyzed with complete lifecycle data
            </Typography>
            <Typography variant="body2">
              • {lifecycleData.filter(l => l.insights.wasEffective).length} challenges showed positive impact
            </Typography>
            <Typography variant="body2">
              • Review decay analysis for long-term behavior patterns
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default ChallengeLifecycleLearningLoop;
