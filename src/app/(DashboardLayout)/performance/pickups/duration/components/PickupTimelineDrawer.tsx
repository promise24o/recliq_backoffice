'use client'
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Stack,
  Chip,
  Divider,
  IconButton,
  Grid,
  LinearProgress,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent
} from '@mui/material';
import {
  IconX,
  IconPackage,
  IconUser,
  IconMap,
  IconClock,
  IconNavigation,
  IconTruck,
  IconCheck,
  IconCalendar,
  IconScale,
  IconFlag,
  IconRoute,
  IconActivity,
  IconAlertTriangle
} from '@tabler/icons-react';

export interface PickupTimelineData {
  id: string;
  pickupId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  agentId: string;
  agentName: string;
  agentPhone: string;
  zone: string;
  city: string;
  address: string;
  wasteType: string;
  estimatedWeight: number;
  actualWeight: number;
  requestTime: string;
  assignmentTime: string;
  arrivalTime: string;
  completionTime: string;
  totalDuration: number;
  requestToAssignment: number;
  assignmentToArrival: number;
  arrivalToCompletion: number;
  slaBreach: boolean;
  delaySegment: 'assignment_delay' | 'travel_delay' | 'onsite_delay' | 'normal';
  distance: number;
  agentLoadAtAssignment: number;
  timeOfDay: string;
  weatherCondition: string;
  notes: string;
}

interface PickupTimelineDrawerProps {
  pickup: PickupTimelineData | null;
  open: boolean;
  onClose: () => void;
}

const PickupTimelineDrawer: React.FC<PickupTimelineDrawerProps> = ({
  pickup,
  open,
  onClose
}) => {
  const getDelaySegmentColor = (segment: string) => {
    switch (segment) {
      case 'assignment_delay': return 'error';
      case 'travel_delay': return 'warning';
      case 'onsite_delay': return 'info';
      case 'normal': return 'success';
      default: return 'default';
    }
  };

  const getDelaySegmentIcon = (segment: string) => {
    switch (segment) {
      case 'assignment_delay': return <IconNavigation size={16} />;
      case 'travel_delay': return <IconTruck size={16} />;
      case 'onsite_delay': return <IconCheck size={16} />;
      case 'normal': return <IconClock size={16} />;
      default: return null;
    }
  };

  const getDelaySegmentLabel = (segment: string) => {
    switch (segment) {
      case 'assignment_delay': return 'Assignment Delay';
      case 'travel_delay': return 'Travel Delay';
      case 'onsite_delay': return 'On-site Delay';
      case 'normal': return 'Normal';
      default: return segment;
    }
  };

  const getDurationColor = (duration: number) => {
    if (duration <= 10) return 'success';
    if (duration <= 20) return 'info';
    if (duration <= 30) return 'warning';
    return 'error';
  };

  const getProgressColor = (duration: number) => {
    if (duration <= 20) return '#3b82f6';
    if (duration <= 30) return '#f59e0b';
    return '#ef4444';
  };

  const getDelaySegmentIconHelper = (segment: string) => {
    switch (segment) {
      case 'assignment': return <IconNavigation size={16} />;
      case 'travel': return <IconTruck size={16} />;
      case 'onsite': return <IconClock size={16} />;
      default: return <IconAlertTriangle size={16} />;
    }
  };

  const getDelaySegmentLabelHelper = (segment: string) => {
    switch (segment) {
      case 'assignment': return 'Assignment Delay';
      case 'travel': return 'Travel Delay';
      case 'onsite': return 'On-site Delay';
      default: return 'Other Delay';
    }
  };

  const getDelaySegmentColorHelper = (segment: string) => {
    switch (segment) {
      case 'assignment': return 'info';
      case 'travel': return 'warning';
      case 'onsite': return 'error';
      default: return 'default';
    }
  };

  if (!open || !pickup) return null;

  // Timeline events
  const timelineEvents = [
    {
      time: pickup?.requestTime,
      title: 'Pickup Requested',
      description: 'User initiated pickup request',
      icon: <IconPackage size={16} />,
      color: 'primary'
    },
    {
      time: pickup?.assignmentTime,
      title: 'Agent Assigned',
      description: `${pickup?.agentName} assigned to pickup`,
      icon: <IconNavigation size={16} />,
      color: 'info'
    },
    {
      time: pickup?.arrivalTime,
      title: 'Agent Arrived',
      description: 'Agent reached pickup location',
      icon: <IconTruck size={16} />,
      color: 'warning'
    },
    {
      time: pickup?.completionTime,
      title: 'Pickup Completed',
      description: `Recycling completed - ${pickup?.actualWeight}kg`,
      icon: <IconCheck size={16} />,
      color: 'success'
    }
  ];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 500, md: 600 },
          p: 0,
        }
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: 'grey.50'
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Pickup Timeline
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Detailed lifecycle analysis for pickup {pickup?.pickupId}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <IconX size={20} />
          </IconButton>
        </Stack>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
        <Stack spacing={3}>
          {/* Pickup Overview */}
          <Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Pickup Overview
            </Typography>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Pickup ID
                    </Typography>
                    <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                      {pickup?.pickupId}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Waste Type
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {pickup?.wasteType}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Estimated Weight
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {pickup?.estimatedWeight} kg
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Actual Weight
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {pickup?.actualWeight} kg
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Location
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconMap size={16} />
                      <Typography variant="body2" fontWeight={600}>
                        {pickup?.address}, {pickup?.zone}, {pickup?.city}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* User & Agent Information */}
          <Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Participants
            </Typography>
            <Stack spacing={2}>
              <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconUser size={20} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight={600}>
                        {pickup?.userName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {pickup?.userEmail} • {pickup?.userPhone}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: 'success.light',
                        color: 'success.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconUser size={20} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight={600}>
                        {pickup?.agentName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {pickup?.agentId} • {pickup?.agentPhone}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Box>

          <Divider />

          {/* Visual Timeline */}
          <Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Lifecycle Timeline
            </Typography>
            <Stack spacing={2}>
              {timelineEvents.map((event, index) => (
                <Stack key={index} direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: event.color + '.light',
                      color: event.color + '.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mt: 0.5
                    }}
                  >
                    {event.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>
                      {event.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(event.time).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {event.description}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Duration Breakdown */}
          <Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Duration Analysis
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconNavigation size={16} />
                    <Typography variant="body2" fontWeight={600}>
                      Request → Assignment
                    </Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight={700} color={getDurationColor(pickup?.requestToAssignment || 0)}>
                    {pickup?.requestToAssignment} mins
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(100, ((pickup?.requestToAssignment || 0) / 30) * 100)}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getProgressColor(pickup?.requestToAssignment || 0),
                      borderRadius: 3,
                    },
                  }}
                />
              </Stack>

              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconTruck size={16} />
                    <Typography variant="body2" fontWeight={600}>
                      Assignment → Arrival
                    </Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight={700} color={getDurationColor(pickup?.assignmentToArrival || 0)}>
                    {pickup?.assignmentToArrival} mins
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(100, ((pickup?.assignmentToArrival || 0) / 60) * 100)}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getProgressColor(pickup?.assignmentToArrival || 0),
                      borderRadius: 3,
                    },
                  }}
                />
              </Stack>

              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconCheck size={16} />
                    <Typography variant="body2" fontWeight={600}>
                      Arrival → Completion
                    </Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight={700} color={getDurationColor(pickup?.arrivalToCompletion || 0)}>
                    {pickup?.arrivalToCompletion} mins
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(100, ((pickup?.arrivalToCompletion || 0) / 30) * 100)}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getProgressColor(pickup?.arrivalToCompletion || 0),
                      borderRadius: 3,
                    },
                  }}
                />
              </Stack>

              <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconClock size={20} color="primary.main" />
                    <Typography variant="body2" fontWeight={600}>
                      Total Duration
                    </Typography>
                  </Stack>
                  <Typography variant="h6" fontWeight={700} color="primary.main">
                    {pickup?.totalDuration} mins
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* Contextual Signals */}
          <Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Contextual Signals
            </Typography>
            <List dense>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <IconRoute size={16} />
                </ListItemIcon>
                <ListItemText
                  primary="Distance to Pickup"
                  secondary={`${pickup?.distance} km`}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <IconActivity size={16} />
                </ListItemIcon>
                <ListItemText
                  primary="Agent Load at Assignment"
                  secondary={`${pickup?.agentLoadAtAssignment} active pickups`}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <IconCalendar size={16} />
                </ListItemIcon>
                <ListItemText
                  primary="Time of Day"
                  secondary={pickup?.timeOfDay}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <IconAlertTriangle size={16} />
                </ListItemIcon>
                <ListItemText
                  primary="Weather Condition"
                  secondary={pickup?.weatherCondition}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                />
              </ListItem>
            </List>
          </Box>

          <Divider />

          {/* Delay Analysis */}
          <Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Delay Analysis
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={600}>
                  SLA Status
                </Typography>
                <Chip
                  label={pickup?.slaBreach ? 'Breach' : 'Within SLA'}
                  color={pickup?.slaBreach ? 'error' : 'success'}
                  variant="outlined"
                />
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={600}>
                  Delay Segment
                </Typography>
                <Chip
                  icon={getDelaySegmentIconHelper(pickup?.delaySegment || '')}
                  label={getDelaySegmentLabelHelper(pickup?.delaySegment || '')}
                  color={getDelaySegmentColorHelper(pickup?.delaySegment || '') as any}
                  variant="filled"
                />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {pickup?.notes}
              </Typography>
            </Stack>
          </Box>

          <Divider />

          {/* Actions */}
          <Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Operational Actions
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<IconFlag size={16} />}
                  size="small"
                >
                  Flag Ops Bottleneck
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconRoute size={16} />}
                  size="small"
                >
                  Tag Routing Issue
                </Button>
              </Stack>
              <Button
                variant="text"
                startIcon={<IconActivity size={16} />}
                size="small"
                sx={{ justifyContent: 'flex-start' }}
              >
                Feed into Ops Review
              </Button>
            </Stack>
          </Box>

          {/* Analysis Notes */}
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              ⏱️ All durations calculated from backend event timestamps. 
              No frontend timing or estimates used. 
              Delay segments automatically identified based on stage duration thresholds.
              This analysis feeds into operational optimization and agent performance reviews.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default PickupTimelineDrawer;
