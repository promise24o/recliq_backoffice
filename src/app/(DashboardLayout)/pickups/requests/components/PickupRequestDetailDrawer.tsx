'use client'
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  IconPackage,
  IconUser,
  IconCar,
  IconWalk,
  IconClock,
  IconMapPin,
  IconPhone,
  IconCalendar,
  IconRoute,
  IconPlayerPlay,
  IconEdit,
  IconSwitchHorizontal,
  IconBan,
  IconFlag,
  IconHistory,
  IconActivity,
  IconCurrency,
  IconScale,
  IconPhoto,
  IconFileText,
  IconCheck,
  IconX,
} from '@tabler/icons-react';
import DashboardCard from '@/app/components/shared/DashboardCard';

interface PickupRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  city: string;
  zone: string;
  pickupMode: 'pickup' | 'dropoff';
  matchType: 'auto' | 'user_selected';
  wasteType: 'plastic' | 'paper' | 'metal' | 'glass' | 'organic' | 'e_waste' | 'mixed';
  estimatedWeight: number;
  status: 'new' | 'matching' | 'assigned' | 'agent_en_route' | 'arrived' | 'completed' | 'cancelled' | 'failed';
  createdAt: string;
  assignedAgentId?: string;
  assignedAgentName?: string;
  slaDeadline: string;
  pricing: {
    baseAmount: number;
    bonusAmount: number;
    totalAmount: number;
    currency: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  notes?: string;
  matchingTimeline: MatchingEvent[];
  failureReason?: string;
  delayReason?: string;
}

interface MatchingEvent {
  id: string;
  type: 'matching_started' | 'agent_notified' | 'agent_accepted' | 'agent_rejected' | 'reassigned' | 'timeout';
  timestamp: string;
  agentId?: string;
  agentName?: string;
  details: string;
}

interface PickupRequestDetailDrawerProps {
  request: PickupRequest | null;
  open: boolean;
  onClose: () => void;
  onRequestAction: (action: string, request: PickupRequest, reason?: string) => void;
}

const PickupRequestDetailDrawer: React.FC<PickupRequestDetailDrawerProps> = ({
  request,
  open,
  onClose,
  onRequestAction,
}) => {
  const [actionReason, setActionReason] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');

  if (!request) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'info';
      case 'matching': return 'warning';
      case 'assigned': return 'success';
      case 'agent_en_route': return 'primary';
      case 'arrived': return 'secondary';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <IconPackage size={16} />;
      case 'matching': return <IconClock size={16} />;
      case 'assigned': return <IconCar size={16} />;
      case 'agent_en_route': return <IconCar size={16} />;
      case 'arrived': return <IconMapPin size={16} />;
      case 'completed': return <IconUser size={16} />;
      case 'cancelled': return <IconUser size={16} />;
      case 'failed': return <IconUser size={16} />;
      default: return <IconPackage size={16} />;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'matching_started': return <IconPlayerPlay size={16} />;
      case 'agent_notified': return <IconPhone size={16} />;
      case 'agent_accepted': return <IconCheck size={16} />;
      case 'agent_rejected': return <IconX size={16} />;
      case 'reassigned': return <IconSwitchHorizontal size={16} />;
      case 'timeout': return <IconClock size={16} />;
      default: return <IconHistory size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSLATimer = (slaDeadline: string) => {
    const now = new Date();
    const deadline = new Date(slaDeadline);
    const diffMs = deadline.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMs < 0) {
      return { text: 'Overdue', color: 'error', percentage: 100 };
    } else if (diffMins < 15) {
      return { text: `${diffMins} min`, color: 'warning', percentage: 75 };
    } else {
      return { text: `${diffMins} min`, color: 'success', percentage: 25 };
    }
  };

  const handleAction = (action: string) => {
    onRequestAction(action, request, actionReason);
    setActionReason('');
    setSelectedAgent('');
  };

  return (
    <Box sx={{ width: 600, height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Pickup Request Details
          </Typography>
          <Button onClick={onClose} size="small">
            <IconX size={16} />
          </Button>
        </Stack>
      </Box>

      {/* Request Overview */}
      <Box sx={{ p: 3 }}>
        <DashboardCard>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Request Overview
          </Typography>
          <CardContent>
            <Stack spacing={3}>
              {/* Basic Info */}
              <Stack direction="row" alignItems="center" spacing={3}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
                  <IconPackage size={32} />
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h6" fontWeight={600}>
                    {request.id}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1}>
                    <Chip
                      icon={getStatusIcon(request.status)}
                      label={request.status.replace('_', ' ').toUpperCase()}
                      color={getStatusColor(request.status) as any}
                      size="small"
                    />
                    <Chip
                      icon={request.pickupMode === 'pickup' ? <IconCar size={14} /> : <IconWalk size={14} />}
                      label={request.pickupMode === 'pickup' ? 'Agent → User' : 'User → Agent'}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={request.matchType === 'auto' ? 'Auto-matched' : 'User-selected'}
                      color={request.matchType === 'auto' ? 'success' : 'warning' as any}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                </Box>
              </Stack>

              {/* User Info */}
              <Stack spacing={2}>
                <Typography variant="body2" color="text.secondary">
                  User Information
                </Typography>
                <Stack direction="row" spacing={3}>
                  <Box flex={1}>
                    <Typography variant="body2" color="text.secondary">
                      Name
                    </Typography>
                    <Typography variant="body1">
                      {request.userName}
                    </Typography>
                  </Box>
                  <Box flex={1}>
                    <Typography variant="body2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1">
                      {request.userPhone}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              {/* Location */}
              <Stack spacing={2}>
                <Typography variant="body2" color="text.secondary">
                  Location
                </Typography>
                <Stack direction="row" spacing={2}>
                  <IconMapPin size={16} color="text.secondary" />
                  <Typography variant="body1">
                    {request.address}
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  {request.city}, {request.zone}
                </Typography>
              </Stack>

              {/* Waste Details */}
              <Stack spacing={2}>
                <Typography variant="body2" color="text.secondary">
                  Waste Details
                </Typography>
                <Stack direction="row" spacing={3}>
                  <Box flex={1}>
                    <Typography variant="body2" color="text.secondary">
                      Type
                    </Typography>
                    <Chip
                      label={request.wasteType.replace('_', ' ').toUpperCase()}
                      color="primary"
                      size="small"
                    />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="body2" color="text.secondary">
                      Estimated Weight
                    </Typography>
                    <Typography variant="body1">
                      {request.estimatedWeight} kg
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              {/* Pricing */}
              <Stack spacing={2}>
                <Typography variant="body2" color="text.secondary">
                  Pricing Snapshot (Locked)
                </Typography>
                <Stack direction="row" spacing={3}>
                  <Box flex={1}>
                    <Typography variant="body2" color="text.secondary">
                      Base Amount
                    </Typography>
                    <Typography variant="body1">
                      {request.pricing.currency} {request.pricing.baseAmount}
                    </Typography>
                  </Box>
                  <Box flex={1}>
                    <Typography variant="body2" color="text.secondary">
                      Bonus Amount
                    </Typography>
                    <Typography variant="body1" color="success.main">
                      +{request.pricing.currency} {request.pricing.bonusAmount}
                    </Typography>
                  </Box>
                  <Box flex={1}>
                    <Typography variant="body2" color="text.secondary">
                      Total Amount
                    </Typography>
                    <Typography variant="h6" color="primary.main">
                      {request.pricing.currency} {request.pricing.totalAmount}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              {/* Notes */}
              {request.notes && (
                <Stack spacing={2}>
                  <Typography variant="body2" color="text.secondary">
                    Notes
                  </Typography>
                  <Typography variant="body2">
                    {request.notes}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </CardContent>
        </DashboardCard>

        {/* Matching Timeline */}
        <DashboardCard>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Matching Timeline
          </Typography>
          <CardContent>
            <List>
              {request.matchingTimeline.map((event, index) => (
                <ListItem key={event.id} sx={{ pl: 0 }}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: getStatusColor(event.type) + '.main', width: 32, height: 32 }}>
                      {getEventIcon(event.type)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" fontWeight={600}>
                          {event.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(event.timestamp)}
                        </Typography>
                      </Stack>
                    }
                    secondary={
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                          {event.details}
                        </Typography>
                        {event.agentName && (
                          <Typography variant="caption" color="text.secondary">
                            Agent: {event.agentName}
                          </Typography>
                        )}
                      </Stack>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </DashboardCard>

        {/* Live Status */}
        {request.status !== 'completed' && request.status !== 'cancelled' && request.status !== 'failed' && (
          <DashboardCard>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Live Status
            </Typography>
            <CardContent>
              <Stack spacing={3}>
                {/* SLA Timer */}
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    SLA Timer
                  </Typography>
                  {(() => {
                    const sla = getSLATimer(request.slaDeadline);
                    return (
                      <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">
                            Time Remaining
                          </Typography>
                          <Chip
                            label={sla.text}
                            color={sla.color as any}
                            size="small"
                          />
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={sla.percentage}
                          color={sla.color as any}
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    );
                  })()}
                </Box>

                {/* Assigned Agent */}
                {request.assignedAgentName && (
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Assigned Agent
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: 'success.main' }}>
                        <IconUser size={16} />
                      </Avatar>
                      <Box>
                        <Typography variant="body1">
                          {request.assignedAgentName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {request.assignedAgentId}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                )}

                {/* Drop-off Directions */}
                {request.pickupMode === 'dropoff' && (
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Drop-off Directions
                    </Typography>
                    <Typography variant="body2">
                      User will meet agent at the specified location. Directions and navigation
                      details will be provided to both parties upon confirmation.
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </DashboardCard>
        )}

        {/* Intervention Actions */}
        <DashboardCard>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Intervention Actions
          </Typography>
          <CardContent>
            <Alert severity="warning" sx={{ mb: 3 }}>
              All manual interventions are logged and audited. Please ensure you have proper authorization before proceeding.
            </Alert>

            <Stack spacing={2}>
              {/* Re-trigger Matching */}
              {(request.status === 'failed' || request.status === 'cancelled') && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<IconPlayerPlay />}
                  onClick={() => handleAction('retrigger_matching')}
                  fullWidth
                >
                  Re-trigger Matching
                </Button>
              )}

              {/* Manual Assign */}
              {request.status === 'matching' && (
                <Box>
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Select Agent</InputLabel>
                    <Select
                      value={selectedAgent}
                      label="Select Agent"
                      onChange={(e) => setSelectedAgent(e.target.value)}
                    >
                      <MenuItem value="AGT001">Samuel Kamau</MenuItem>
                      <MenuItem value="AGT002">Grace Okafor</MenuItem>
                      <MenuItem value="AGT003">Ahmed Bello</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<IconEdit />}
                    onClick={() => handleAction('manual_assign')}
                    fullWidth
                  >
                    Manually Assign Agent
                  </Button>
                </Box>
              )}

              {/* Convert Mode */}
              <Button
                variant="outlined"
                startIcon={<IconSwitchHorizontal />}
                onClick={() => handleAction('convert_mode')}
                fullWidth
              >
                Convert to {request.pickupMode === 'pickup' ? 'Drop-off' : 'Pickup'}
              </Button>

              {/* Cancel */}
              <Box>
                <TextField
                  fullWidth
                  size="small"
                  label="Cancellation Reason"
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<IconBan />}
                  onClick={() => handleAction('cancel')}
                  fullWidth
                >
                  Cancel Request
                </Button>
              </Box>

              {/* Escalate */}
              <Button
                variant="outlined"
                color="warning"
                startIcon={<IconFlag />}
                onClick={() => handleAction('escalate')}
                fullWidth
              >
                Escalate to Ops Lead
              </Button>
            </Stack>
          </CardContent>
        </DashboardCard>
      </Box>
    </Box>
  );
};

export default PickupRequestDetailDrawer;
