'use client';

import React from 'react';
import {
  Grid,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import {
  Calendar,
  Users,
  AlertTriangle,
  Timer,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface ScheduleStats {
  totalScheduled: number;
  assignedToAgent: number;
  unassignedAtRisk: number;
  nextTwoHours: number;
  slaRiskPickups: number;
  cancelledUpcoming: number;
}

interface ScheduleOverviewCardsProps {
  stats: ScheduleStats;
}

const ScheduleOverviewCards: React.FC<ScheduleOverviewCardsProps> = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
        <DashboardCard>
          <Box sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ p: 1, borderRadius: 1, bgcolor: 'primary.main', color: 'white' }}>
                <Calendar size={24} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={600}>{stats.totalScheduled}</Typography>
                <Typography variant="body2" color="text.secondary">Total Scheduled</Typography>
              </Box>
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
        <DashboardCard>
          <Box sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ p: 1, borderRadius: 1, bgcolor: 'success.main', color: 'white' }}>
                <Users size={24} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={600}>{stats.assignedToAgent}</Typography>
                <Typography variant="body2" color="text.secondary">Assigned to Agent</Typography>
              </Box>
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
        <DashboardCard>
          <Box sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ p: 1, borderRadius: 1, bgcolor: 'warning.main', color: 'white' }}>
                <AlertTriangle size={24} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={600}>{stats.unassignedAtRisk}</Typography>
                <Typography variant="body2" color="text.secondary">Unassigned (At Risk)</Typography>
              </Box>
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
        <DashboardCard>
          <Box sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ p: 1, borderRadius: 1, bgcolor: 'info.main', color: 'white' }}>
                <Timer size={24} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={600}>{stats.nextTwoHours}</Typography>
                <Typography variant="body2" color="text.secondary">Next 2 Hours</Typography>
              </Box>
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
        <DashboardCard>
          <Box sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ p: 1, borderRadius: 1, bgcolor: 'error.main', color: 'white' }}>
                <AlertCircle size={24} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={600}>{stats.slaRiskPickups}</Typography>
                <Typography variant="body2" color="text.secondary">SLA Risk Pickups</Typography>
              </Box>
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
        <DashboardCard>
          <Box sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ p: 1, borderRadius: 1, bgcolor: 'secondary.main', color: 'white' }}>
                <XCircle size={24} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={600}>{stats.cancelledUpcoming}</Typography>
                <Typography variant="body2" color="text.secondary">Cancelled (Upcoming)</Typography>
              </Box>
            </Stack>
          </Box>
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default ScheduleOverviewCards;
