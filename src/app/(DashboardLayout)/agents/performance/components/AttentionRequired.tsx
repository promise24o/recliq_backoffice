'use client'
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip, Button, Stack } from '@mui/material';
import {
  IconAlertTriangle,
  IconClock,
  IconUserCheck,
  IconX,
  IconMessage,
  IconEye,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface AgentPerformance {
  id: string;
  name: string;
  disputeRate: number;
  acceptanceSpeed: number;
  status: 'active' | 'on_duty' | 'offline';
}

interface AttentionRequiredProps {
  agents: AgentPerformance[];
}

const AttentionRequired: React.FC<AttentionRequiredProps> = ({ agents }) => {
  // Filter agents needing attention
  const risingDisputes = agents.filter(agent => agent.disputeRate > 3.0);
  const slowResponders = agents.filter(agent => agent.acceptanceSpeed > 15);
  const verificationPending = agents.filter(agent => agent.status === 'active').slice(0, 3); // Mock
  const repeatedCancellations = agents.slice(0, 2); // Mock data

  const handleAction = (action: string, agentName: string) => {
    console.log(`${action} for ${agentName}`);
  };

  return (
    <DashboardCard title="Attention Required">
      <CardContent>
        <Grid container spacing={3}>
          {/* Rising Disputes */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom color="error.main">
              <IconAlertTriangle size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Agents with Rising Disputes
            </Typography>
            <Stack spacing={2}>
              {risingDisputes.map((agent) => (
                <Card key={agent.id} variant="outlined" sx={{ borderLeft: 4, borderLeftColor: 'error.main' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {agent.name}
                        </Typography>
                        <Typography variant="caption" color="error.main">
                          Dispute Rate: {agent.disputeRate}%
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" startIcon={<IconEye size={14} />}>
                          Review
                        </Button>
                        <Button size="small" startIcon={<IconMessage size={14} />}>
                          Contact
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
              {risingDisputes.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                  No agents with high dispute rates
                </Typography>
              )}
            </Stack>
          </Grid>

          {/* Slow Responders */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom color="warning.main">
              <IconClock size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Slow Responders
            </Typography>
            <Stack spacing={2}>
              {slowResponders.map((agent) => (
                <Card key={agent.id} variant="outlined" sx={{ borderLeft: 4, borderLeftColor: 'warning.main' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {agent.name}
                        </Typography>
                        <Typography variant="caption" color="warning.main">
                          Avg Response: {agent.acceptanceSpeed} mins
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" startIcon={<IconEye size={14} />}>
                          Analyze
                        </Button>
                        <Button size="small" startIcon={<IconMessage size={14} />}>
                          Coach
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
              {slowResponders.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                  All agents responding within acceptable time
                </Typography>
              )}
            </Stack>
          </Grid>

          {/* Verification Pending */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom color="info.main">
              <IconUserCheck size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Verification Pending
            </Typography>
            <Stack spacing={2}>
              {verificationPending.map((agent) => (
                <Card key={agent.id} variant="outlined" sx={{ borderLeft: 4, borderLeftColor: 'info.main' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {agent.name}
                        </Typography>
                        <Typography variant="caption" color="info.main">
                          Documents submitted for review
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" startIcon={<IconEye size={14} />}>
                          Review
                        </Button>
                        <Button size="small" startIcon={<IconUserCheck size={14} />}>
                          Verify
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* Repeated Cancellations */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom color="error.main">
              <IconX size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Repeated Cancellations
            </Typography>
            <Stack spacing={2}>
              {repeatedCancellations.map((agent) => (
                <Card key={agent.id} variant="outlined" sx={{ borderLeft: 4, borderLeftColor: 'error.main' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {agent.name}
                        </Typography>
                        <Typography variant="caption" color="error.main">
                          5 cancellations this week
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" startIcon={<IconEye size={14} />}>
                          Investigate
                        </Button>
                        <Button size="small" startIcon={<IconAlertTriangle size={14} />}>
                          Flag
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Summary */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Total agents requiring attention: {risingDisputes.length + slowResponders.length + verificationPending.length + repeatedCancellations.length}
            </Typography>
            <Button variant="outlined" size="small">
              Generate Action Plan
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </DashboardCard>
  );
};

export default AttentionRequired;
