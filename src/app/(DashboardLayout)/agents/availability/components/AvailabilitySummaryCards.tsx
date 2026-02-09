'use client'
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { 
  IconPlayerPlay, 
  IconPlayerPause, 
  IconPlayerStop,
  IconCalendar,
  IconMap,
  IconAlertTriangle,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface AvailabilitySummary {
  availableAgents: number;
  idleAgents: number;
  busyAgents: number;
  unavailableAgents: number;
  scheduledAvailability: number;
  lowCoverageZones: number;
  supplyShortageAlerts: number;
}

interface AvailabilitySummaryCardsProps {
  summary: AvailabilitySummary;
}

const AvailabilitySummaryCards: React.FC<AvailabilitySummaryCardsProps> = ({ summary }) => {
  const cards = [
    {
      title: 'Available Agents',
      value: summary.availableAgents.toLocaleString(),
      subtitle: 'Online, idle, and eligible for new pickups',
      icon: <IconPlayerPlay size={20} />,
      color: 'success',
      status: 'available'
    },
    {
      title: 'Idle (Online, No Jobs)',
      value: summary.idleAgents.toLocaleString(),
      subtitle: 'Available but underutilized agents',
      icon: <IconPlayerPause size={20} />,
      color: 'warning',
      status: 'idle'
    },
    {
      title: 'Busy (On Pickup)',
      value: summary.busyAgents.toLocaleString(),
      subtitle: 'Agents currently executing jobs',
      icon: <IconPlayerStop size={20} />,
      color: 'info',
      status: 'busy'
    },
    {
      title: 'Unavailable / Offline',
      value: summary.unavailableAgents.toLocaleString(),
      subtitle: 'Agents not reachable or inactive',
      icon: <IconPlayerStop size={20} />,
      color: 'error',
      status: 'offline'
    },
    {
      title: 'Scheduled Availability',
      value: summary.scheduledAvailability.toLocaleString(),
      subtitle: 'Agents who said they\'d be available',
      icon: <IconCalendar size={20} />,
      color: 'primary',
      status: 'scheduled'
    },
    {
      title: 'Low Coverage Zones',
      value: summary.lowCoverageZones.toLocaleString(),
      subtitle: 'Zones below minimum supply threshold',
      icon: <IconMap size={20} />,
      color: summary.lowCoverageZones > 5 ? 'error' : 'warning',
      status: 'coverage'
    }
  ];

  return (
    <DashboardCard title="Availability Summary">
      <CardContent>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 2 }} key={index}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                    borderColor: `${card.color}.main`,
                  }
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar 
                      sx={{ 
                        bgcolor: `${card.color}.main`,
                        width: 40,
                        height: 40
                      }}
                    >
                      {card.icon}
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="h4" fontWeight={600}>
                        {card.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {card.subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* Supply Shortage Alerts */}
        {summary.supplyShortageAlerts > 0 && (
          <Box mt={2}>
            <Card sx={{ borderLeft: 4, borderLeftColor: 'error.main', bgcolor: 'error.light' }}>
              <CardContent sx={{ py: 1.5 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconAlertTriangle size={20} color="error" />
                  <Typography variant="body2" color="error.main" fontWeight={600}>
                    {summary.supplyShortageAlerts} Active Supply Shortage Alerts
                  </Typography>
                  <Typography variant="body2" color="error.main">
                    Demand exceeds supply in critical zones
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        )}
      </CardContent>
    </DashboardCard>
  );
};

export default AvailabilitySummaryCards;
