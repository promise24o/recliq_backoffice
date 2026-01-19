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
  ListItemIcon
} from '@mui/material';
import {
  IconX,
  IconUser,
  IconMap,
  IconCalendar,
  IconActivity,
  IconRecycle,
  IconAlertTriangle,
  IconClock,
  IconScale,
  IconCurrency,
  IconFlag,
  IconEye,
  IconRefresh,
  IconGift,
  IconTrendingUp,
  IconTrendingDown
} from '@tabler/icons-react';

export interface UserRetentionData {
  id: string;
  userId: string;
  name: string;
  email: string;
  city: string;
  zone: string;
  signupDate: string;
  firstRecycleDate: string;
  lastActivityDate: string;
  recyclesCompleted: number;
  lifetimeDays: number;
  churnReason: string;
  churnSegment: 'early_churn' | 'mid_lifecycle' | 'long_term_churn' | 'active';
  avgResponseTime: number;
  disputesEncountered: number;
  rewardsEarned: number;
  userType: 'pickup' | 'dropoff' | 'enterprise_linked';
}

interface UserRetentionDetailDrawerProps {
  user: UserRetentionData | null;
  open: boolean;
  onClose: () => void;
}

const UserRetentionDetailDrawer: React.FC<UserRetentionDetailDrawerProps> = ({
  user,
  open,
  onClose
}) => {
  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'early_churn': return 'error';
      case 'mid_lifecycle': return 'warning';
      case 'long_term_churn': return 'info';
      case 'active': return 'success';
      default: return 'default';
    }
  };

  const getSegmentIcon = (segment: string) => {
    switch (segment) {
      case 'early_churn': return <IconTrendingDown size={16} />;
      case 'mid_lifecycle': return <IconActivity size={16} />;
      case 'long_term_churn': return <IconRecycle size={16} />;
      case 'active': return <IconTrendingUp size={16} />;
      default: return null;
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'No agent availability': return 'error';
      case 'Pricing dissatisfaction': return 'warning';
      case 'Dispute history': return 'error';
      case 'Low rewards': return 'warning';
      default: return 'default';
    }
  };

  const getReasonIcon = (reason: string) => {
    switch (reason) {
      case 'No agent availability': return <IconMap size={16} />;
      case 'Pricing dissatisfaction': return <IconCurrency size={16} />;
      case 'Dispute history': return <IconAlertTriangle size={16} />;
      case 'Low rewards': return <IconGift size={16} />;
      default: return null;
    }
  };

  const getResponseTimeColor = (time: number) => {
    if (time <= 3) return 'success';
    if (time <= 6) return 'warning';
    return 'error';
  };

  if (!open || !user) return null;

  // Mock lifecycle timeline data
  const getLifecycleTimeline = () => {
    const events = [];
    const signupDate = new Date(user.signupDate);
    const lastActivityDate = new Date(user.lastActivityDate);
    
    // Add key lifecycle events
    events.push({
      date: user.signupDate,
      type: 'signup',
      description: 'User signed up',
      icon: <IconUser size={16} />
    });

    events.push({
      date: user.firstRecycleDate,
      type: 'first_recycle',
      description: 'First recycling activity',
      icon: <IconRecycle size={16} />
    });

    // Add some mock activities
    for (let i = 0; i < Math.min(user.recyclesCompleted - 2, 5); i++) {
      const activityDate = new Date(signupDate);
      activityDate.setDate(activityDate.getDate() + (i + 1) * 7);
      
      events.push({
        date: activityDate.toISOString().split('T')[0],
        type: 'activity',
        description: `Recycling activity #${i + 2}`,
        icon: <IconActivity size={16} />
      });
    }

    events.push({
      date: user.lastActivityDate,
      type: 'last_activity',
      description: 'Last recorded activity',
      icon: <IconClock size={16} />
    });

    return events;
  };

  const lifecycleEvents = getLifecycleTimeline();

  // Mock experience signals
  const experienceSignals = [
    {
      label: 'Avg Response Time',
      value: `${user.avgResponseTime.toFixed(1)} hours`,
      icon: <IconClock size={16} />,
      color: getResponseTimeColor(user.avgResponseTime)
    },
    {
      label: 'Disputes Encountered',
      value: user.disputesEncountered.toString(),
      icon: <IconAlertTriangle size={16} />,
      color: user.disputesEncountered > 2 ? 'error' : user.disputesEncountered > 0 ? 'warning' : 'success'
    },
    {
      label: 'Rewards Earned',
      value: `${user.rewardsEarned} points`,
      icon: <IconGift size={16} />,
      color: user.rewardsEarned > 200 ? 'success' : user.rewardsEarned > 50 ? 'info' : 'warning'
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
              User Retention Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comprehensive user lifecycle and churn analysis
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
          {/* User Overview */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              User Overview
            </Typography>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      User ID
                    </Typography>
                    <Typography variant="body2" fontWeight={600} fontFamily="monospace">
                      {user.userId}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Name
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {user.name}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {user.email}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      City / Zone
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconMap size={16} />
                      <Typography variant="body2" fontWeight={600}>
                        {user.city} • {user.zone}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      User Type
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {user.userType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Lifetime
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {user.lifetimeDays} days
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Lifecycle Timeline */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Lifecycle Timeline
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Key Events
                </Typography>
                <Stack spacing={1}>
                  {lifecycleEvents.map((event, index) => (
                    <Stack key={index} direction="row" spacing={2} alignItems="center">
                      {event.icon}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {new Date(event.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {event.description}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Activity Gaps
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.churnSegment === 'early_churn' && 'User churned shortly after first activity - indicates poor first experience'}
                  {user.churnSegment === 'mid_lifecycle' && 'User showed initial engagement but dropped off - potential service gaps'}
                  {user.churnSegment === 'long_term_churn' && 'User was engaged for extended period before churn - may indicate pricing or service changes'}
                  {user.churnSegment === 'active' && 'User is currently active and engaged with platform'}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Churn Analysis */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Churn Analysis
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Churn Segment
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  {getSegmentIcon(user.churnSegment)}
                  <Chip
                    label={user.churnSegment.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    color={getSegmentColor(user.churnSegment) as any}
                    variant="outlined"
                  />
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Likely Churn Reason
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  {getReasonIcon(user.churnReason)}
                  <Chip
                    label={user.churnReason}
                    color={getReasonColor(user.churnReason) as any}
                    variant="filled"
                  />
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Engagement Level
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {user.recyclesCompleted} recycles over {user.lifetimeDays} days
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {(user.recyclesCompleted / Math.max(user.lifetimeDays / 30, 1)).toFixed(1)} recycles per month
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Experience Signals */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Experience Signals
            </Typography>
            <List dense>
              {experienceSignals.map((signal, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    {signal.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={signal.label}
                    secondary={signal.value}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                    secondaryTypographyProps={{ 
                      variant: 'body2', 
                      color: signal.color + '.main' as any,
                      fontWeight: 600
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider />

          {/* Actions (Role-based) */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Retention Actions
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<IconEye size={16} />}
                  size="small"
                >
                  View Full Profile
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconRefresh size={16} />}
                  size="small"
                  color="success"
                >
                  Add to Win-back Campaign
                </Button>
              </Stack>
              <Button
                variant="outlined"
                startIcon={<IconGift size={16} />}
                size="small"
              >
                Trigger Retention Incentive
              </Button>
              <Button
                variant="text"
                startIcon={<IconFlag size={16} />}
                size="small"
                color="warning"
                sx={{ justifyContent: 'flex-start' }}
              >
                Flag UX/Service Issue
              </Button>
            </Stack>
          </Box>

          {/* Retention Notes */}
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              📈 Retention metrics are based on completed recycling events only. 
              Churn is inferred from lack of activity over extended periods. 
              Early churn (&lt;30 days) often indicates onboarding or first-experience issues,
              while long-term churn may relate to pricing, service quality, or competitive factors.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default UserRetentionDetailDrawer;
