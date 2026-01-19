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
  IconRecycle,
  IconClock,
  IconPackage,
  IconScale,
  IconStar,
  IconFlag,
  IconEye,
  IconRefresh
} from '@tabler/icons-react';

export interface UserFrequencyData {
  id: string;
  userId: string;
  name: string;
  email: string;
  city: string;
  zone: string;
  avgRecyclesPerMonth: number;
  lastRecycleDate: string;
  currentStreak: number;
  longestStreak: number;
  preferredMaterials: string[];
  frequencySegment: 'power_recycler' | 'regular' | 'occasional' | 'at_risk';
  pickupVsDropoffRatio: number;
  avgWeightPerRecycle: number;
  accountAge: number;
  totalRecycles: number;
  frequencyTrend: 'increasing' | 'stable' | 'decreasing';
}

interface UserFrequencyDetailDrawerProps {
  user: UserFrequencyData | null;
  open: boolean;
  onClose: () => void;
}

const UserFrequencyDetailDrawer: React.FC<UserFrequencyDetailDrawerProps> = ({
  user,
  open,
  onClose
}) => {
  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'power_recycler': return 'success';
      case 'regular': return 'info';
      case 'occasional': return 'warning';
      case 'at_risk': return 'error';
      default: return 'default';
    }
  };

  const getSegmentIcon = (segment: string) => {
    switch (segment) {
      case 'power_recycler': return <IconTrendingUp size={16} />;
      case 'regular': return <IconActivity size={16} />;
      case 'occasional': return <IconRecycle size={16} />;
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

  const getFrequencyColor = (frequency: number) => {
    if (frequency >= 6) return 'success';
    if (frequency >= 2) return 'info';
    if (frequency >= 1) return 'warning';
    return 'error';
  };

  if (!open || !user) return null;

  // Mock recycling timeline data
  const getRecyclingTimeline = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Random recycling activity (more likely for power recyclers)
      const hasActivity = user.frequencySegment === 'power_recycler' ? 
        Math.random() > 0.3 : 
        Math.random() > 0.7;
      
      dates.push({
        date: date.toISOString().split('T')[0],
        hasActivity,
        weight: hasActivity ? 2 + Math.random() * 5 : 0
      });
    }
    
    return dates.reverse();
  };

  const timelineData = getRecyclingTimeline();

  // Mock context signals
  const contextSignals = [
    {
      label: 'Preferred Material',
      value: user.preferredMaterials.join(', '),
      icon: <IconPackage size={16} />
    },
    {
      label: 'Pickup vs Drop-off Ratio',
      value: `${(user.pickupVsDropoffRatio * 100).toFixed(0)}% pickups`,
      icon: <IconScale size={16} />
    },
    {
      label: 'Avg Weight per Recycle',
      value: `${user.avgWeightPerRecycle.toFixed(1)} kg`,
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
              User Frequency Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comprehensive recycling frequency and habit analysis
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
                      Account Age
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {user.accountAge} days
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Total Recycles
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {user.totalRecycles}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Recycling Pattern */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Recycling Pattern
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Average Frequency
                </Typography>
                <Typography 
                  variant="h6" 
                  fontWeight={700}
                  color={getFrequencyColor(user.avgRecyclesPerMonth) + '.main' as any}
                >
                  {user.avgRecyclesPerMonth.toFixed(1)} / month
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Last Recycling Activity
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconCalendar size={16} />
                  <Typography variant="body2" fontWeight={600}>
                    {new Date(user.lastRecycleDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(user.lastRecycleDate).toLocaleTimeString()}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Current Streak
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="success.main">
                    {user.currentStreak} days
                  </Typography>
                </Stack>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Longest Streak
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="primary.main">
                    {user.longestStreak} days
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Frequency Segment */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Frequency Segment
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              {getSegmentIcon(user.frequencySegment)}
              <Chip
                label={user.frequencySegment.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                color={getSegmentColor(user.frequencySegment) as any}
                variant="outlined"
              />
              {getTrendIcon(user.frequencyTrend)}
              <Typography variant="caption" color="text.secondary">
                {user.frequencyTrend.charAt(0).toUpperCase() + user.frequencyTrend.slice(1)} trend
              </Typography>
            </Stack>
          </Box>

          <Divider />

          {/* Recycling Timeline */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Recycling Timeline (Last 30 Days)
            </Typography>
            <Stack spacing={2}>
              <Typography variant="caption" color="text.secondary">
                Daily recycling activity and weight
              </Typography>
              <Stack spacing={1}>
                {timelineData.slice(-14).map((data, index) => (
                  <Box key={index}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="caption" sx={{ width: 60 }}>
                        {new Date(data.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={data.hasActivity ? (data.weight / 7) * 100 : 0}
                        sx={{
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: data.hasActivity ? 'success.main' : 'grey.300',
                            borderRadius: 3,
                          },
                        }}
                      />
                      <Typography variant="caption" sx={{ width: 40, textAlign: 'right' }}>
                        {data.hasActivity ? `${data.weight.toFixed(1)}kg` : '-'}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Context Signals */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Context Signals
            </Typography>
            <List dense>
              {contextSignals.map((signal, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    {signal.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={signal.label}
                    secondary={signal.value}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                    secondaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider />

          {/* Preferred Materials */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Preferred Materials
            </Typography>
            <Stack direction="row" spacing={1}>
              {user.preferredMaterials.map((material, index) => (
                <Chip
                  key={index}
                  label={material}
                  variant="filled"
                  color="primary"
                  size="small"
                />
              ))}
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
                  startIcon={<IconStar size={16} />}
                  size="small"
                  color="success"
                >
                  Add to Rewards Campaign
                </Button>
              </Stack>
              <Button
                variant="outlined"
                startIcon={<IconClock size={16} />}
                size="small"
              >
                Recommend Scheduled Pickup
              </Button>
              <Button
                variant="text"
                startIcon={<IconFlag size={16} />}
                size="small"
                color="warning"
                sx={{ justifyContent: 'flex-start' }}
              >
                Flag for Churn Prevention
              </Button>
            </Stack>
          </Box>

          {/* Performance Notes */}
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              ♻️ Frequency metrics are based on completed recycling events only, 
              normalized by the selected time window. Frequency bands: 
              Power Recycler (&ge;6×/month), Regular (2–5×/month), 
              Occasional (1–2×/month), At Risk (&lt;1×/month).
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default UserFrequencyDetailDrawer;
