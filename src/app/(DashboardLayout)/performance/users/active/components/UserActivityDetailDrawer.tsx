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
  IconTrendingUp,
  IconTrendingDown,
  IconAlertTriangle,
  IconFlag,
  IconEye,
  IconRefresh,
  IconPackage,
  IconClock,
  IconStar
} from '@tabler/icons-react';

export interface UserActivityData {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  zone: string;
  lastActive: string;
  actionsInPeriod: number;
  pickupsCompleted: number;
  dropoffsCompleted: number;
  scheduledPickups: number;
  preferredMethod: 'pickup' | 'dropoff' | 'schedule';
  status: 'highly_active' | 'normal' | 'at_risk';
  accountAge: number; // in days
  totalActions: number;
  engagementTrend: 'increasing' | 'stable' | 'decreasing';
}

interface UserActivityDetailDrawerProps {
  user: UserActivityData | null;
  open: boolean;
  onClose: () => void;
}

const UserActivityDetailDrawer: React.FC<UserActivityDetailDrawerProps> = ({
  user,
  open,
  onClose
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'highly_active': return 'success';
      case 'normal': return 'info';
      case 'at_risk': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'highly_active': return <IconTrendingUp size={16} />;
      case 'normal': return <IconActivity size={16} />;
      case 'at_risk': return <IconAlertTriangle size={16} />;
      default: return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <IconTrendingUp size={16} color="green" />;
      case 'decreasing': return <IconTrendingDown size={16} color="red" />;
      case 'stable': return <IconActivity size={16} color="blue" />;
      default: return null;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'pickup': return 'primary';
      case 'dropoff': return 'success';
      case 'schedule': return 'info';
      default: return 'default';
    }
  };

  if (!open || !user) return null;

  // Mock trend data for the chart
  const getTrendData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      actions: Math.floor(Math.random() * 5) + 1
    }));
  };

  const trendData = getTrendData();
  const maxActions = Math.max(...trendData.map(d => d.actions));

  // Mock behavioral insights
  const behavioralInsights = [
    {
      label: 'Preferred Pickup Time',
      value: '2:00 PM - 4:00 PM',
      icon: <IconClock size={16} />
    },
    {
      label: 'Preferred Agent Type',
      value: 'Experienced Agents',
      icon: <IconStar size={16} />
    },
    {
      label: 'Material Types',
      value: 'Plastic, Paper, Metal',
      icon: <IconPackage size={16} />
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
              User Activity Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comprehensive user engagement and activity analysis
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
                      Phone
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {user.phone}
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
                      Account Age
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {user.accountAge} days
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Activity Summary */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Activity Summary
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Last Activity
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconCalendar size={16} />
                  <Typography variant="body2" fontWeight={600}>
                    {new Date(user.lastActive).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(user.lastActive).toLocaleTimeString()}
                  </Typography>
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Actions in Selected Period
                </Typography>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                  {user.actionsInPeriod}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Pickups Completed
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="success.main">
                    {user.pickupsCompleted}
                  </Typography>
                </Stack>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Drop-offs Completed
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="info.main">
                    {user.dropoffsCompleted}
                  </Typography>
                </Stack>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Scheduled Pickups
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="warning.main">
                    {user.scheduledPickups}
                  </Typography>
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Total Actions (All Time)
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {user.totalActions.toLocaleString()}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* User Status */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Engagement Status
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              {getStatusIcon(user.status)}
              <Chip
                label={user.status.charAt(0).toUpperCase() + user.status.slice(1).replace('_', ' ')}
                color={getStatusColor(user.status) as any}
                variant="outlined"
              />
              {getTrendIcon(user.engagementTrend)}
              <Typography variant="caption" color="text.secondary">
                {user.engagementTrend.charAt(0).toUpperCase() + user.engagementTrend.slice(1)} trend
              </Typography>
            </Stack>
          </Box>

          <Divider />

          {/* Engagement Trend Chart */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Engagement Trend
            </Typography>
            <Stack spacing={2}>
              <Typography variant="caption" color="text.secondary">
                Daily actions (last 7 days)
              </Typography>
              <Stack spacing={1}>
                {trendData.map((data, index) => (
                  <Box key={index}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="caption" sx={{ width: 40 }}>
                        {data.day}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(data.actions / maxActions) * 100}
                        sx={{
                          flex: 1,
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: 'primary.main',
                            borderRadius: 4,
                          },
                        }}
                      />
                      <Typography variant="caption" sx={{ width: 30, textAlign: 'right' }}>
                        {data.actions}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Behavioral Insights */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Behavioral Insights
            </Typography>
            <List dense>
              {behavioralInsights.map((insight, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    {insight.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={insight.label}
                    secondary={insight.value}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                    secondaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider />

          {/* Preferred Method */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Preferred Method
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                label={user.preferredMethod.charAt(0).toUpperCase() + user.preferredMethod.slice(1)}
                color={getMethodColor(user.preferredMethod) as any}
                variant="filled"
              />
              <Typography variant="body2" color="text.secondary">
                Most frequently used recycling method
              </Typography>
            </Stack>
          </Box>

          <Divider />

          {/* Actions (Role-based) */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Actions
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<IconEye size={16} />}
                  size="small"
                >
                  View User Profile
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconFlag size={16} />}
                  size="small"
                  color="warning"
                >
                  Flag for Re-engagement
                </Button>
              </Stack>
              <Button
                variant="outlined"
                startIcon={<IconRefresh size={16} />}
                size="small"
                sx={{ justifyContent: 'flex-start' }}
              >
                Send Incentive (via Marketing)
              </Button>
            </Stack>
          </Box>

          {/* Performance Notes */}
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              👤 Activity metrics are based on backend-defined "active" rules. 
              Users are considered active if they perform meaningful actions like creating pickup requests, 
              completing drop-offs, scheduling pickups, or completing transactions within the selected time window.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default UserActivityDetailDrawer;
