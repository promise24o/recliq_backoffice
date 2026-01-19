'use client'
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Stack,
  Chip,
  Divider,
  Button,
  IconButton,
  Grid,
  LinearProgress
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import {
  IconX,
  IconCheck,
  IconClock,
  IconX as IconFailed,
  IconRefresh,
  IconDownload,
  IconAlertTriangle,
  IconNotes,
  IconLock,
  IconLockOpen,
  IconCalendar,
  IconTruck,
  IconReceipt,
  IconBriefcase,
  IconUsers,
  IconBuilding,
  IconCurrencyNaira,
  IconShield
} from '@tabler/icons-react';

export interface EscrowData {
  id: string;
  escrowId: string;
  source: 'user_payment' | 'enterprise_payment';
  counterparty: 'agent' | 'user' | 'enterprise_client';
  amount: number;
  reason: 'verification' | 'dispute' | 'compliance_hold' | 'scheduled_release';
  heldSince: string;
  status: 'active' | 'released' | 'refunded';
  linkedWork?: {
    pickupId?: string;
    invoiceId?: string;
    jobId?: string;
  };
  agent?: {
    name: string;
    email: string;
  };
  user?: {
    name: string;
    email: string;
  };
  enterprise?: {
    name: string;
    email: string;
  };
  releaseCondition?: string;
  slaDeadline?: string;
  holdStartTime: string;
}

interface EscrowDetailDrawerProps {
  escrow: EscrowData | null;
  open: boolean;
  onClose: () => void;
}

const EscrowDetailDrawer: React.FC<EscrowDetailDrawerProps> = ({
  escrow,
  open,
  onClose
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'warning';
      case 'released': return 'success';
      case 'refunded': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <IconClock size={16} />;
      case 'released': return <IconCheck size={16} />;
      case 'refunded': return <IconFailed size={16} />;
      default: return <div style={{ width: 16 }} />;
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'verification': return 'info';
      case 'dispute': return 'error';
      case 'compliance_hold': return 'warning';
      case 'scheduled_release': return 'success';
      default: return 'default';
    }
  };

  const getCounterpartyIcon = (counterparty: string) => {
    switch (counterparty) {
      case 'agent': return <IconBriefcase size={20} />;
      case 'user': return <IconUsers size={20} />;
      case 'enterprise_client': return <IconBuilding size={20} />;
      default: return <IconUsers size={20} />;
    }
  };

  const getLinkedWorkIcon = (linkedWork: any) => {
    if (linkedWork?.pickupId) return <IconTruck size={16} />;
    if (linkedWork?.invoiceId) return <IconReceipt size={16} />;
    if (linkedWork?.jobId) return <IconBriefcase size={16} />;
    return null;
  };

  const getLinkedWorkText = (linkedWork: any) => {
    if (linkedWork?.pickupId) return linkedWork.pickupId;
    if (linkedWork?.invoiceId) return linkedWork.invoiceId;
    if (linkedWork?.jobId) return linkedWork.jobId;
    return '';
  };

  const getCounterpartyName = (escrow: EscrowData) => {
    if (escrow.agent) return escrow.agent.name;
    if (escrow.user) return escrow.user.name;
    if (escrow.enterprise) return escrow.enterprise.name;
    return '';
  };

  const getCounterpartyEmail = (escrow: EscrowData) => {
    if (escrow.agent) return escrow.agent.email;
    if (escrow.user) return escrow.user.email;
    if (escrow.enterprise) return escrow.enterprise.email;
    return '';
  };

  const getTimelineDotColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'grey';
    }
  };

  if (!open || !escrow) return null;

  // Mock timeline events
  const getTimelineEvents = () => {
    const baseEvents = [
      {
        title: 'Escrow Initiated',
        time: escrow.holdStartTime,
        status: 'info',
        description: `Escrow ${escrow.escrowId} created for ${escrow.reason.replace('_', ' ')}`
      }
    ];

    if (escrow.status === 'active') {
      return [
        ...baseEvents,
        {
          title: 'Funds Locked',
          time: escrow.holdStartTime,
          status: 'warning',
          description: `₦${escrow.amount.toLocaleString()} locked in escrow`
        },
        {
          title: 'Awaiting Release',
          time: new Date().toISOString(),
          status: 'warning',
          description: escrow.releaseCondition || 'Release condition pending'
        }
      ];
    }

    if (escrow.status === 'released') {
      return [
        ...baseEvents,
        {
          title: 'Funds Locked',
          time: escrow.holdStartTime,
          status: 'warning',
          description: `₦${escrow.amount.toLocaleString()} locked in escrow`
        },
        {
          title: 'Release Condition Met',
          time: escrow.heldSince,
          status: 'success',
          description: escrow.releaseCondition || 'Conditions satisfied'
        },
        {
          title: 'Funds Released',
          time: escrow.heldSince,
          status: 'success',
          description: `₦${escrow.amount.toLocaleString()} released to counterparty`
        }
      ];
    }

    if (escrow.status === 'refunded') {
      return [
        ...baseEvents,
        {
          title: 'Funds Locked',
          time: escrow.holdStartTime,
          status: 'warning',
          description: `₦${escrow.amount.toLocaleString()} locked in escrow`
        },
        {
          title: 'Refund Initiated',
          time: escrow.heldSince,
          status: 'error',
          description: 'Escrow refunded to original payer'
        },
        {
          title: 'Refund Completed',
          time: escrow.heldSince,
          status: 'info',
          description: `₦${escrow.amount.toLocaleString()} refunded successfully`
        }
      ];
    }

    return baseEvents;
  };

  const timelineEvents = getTimelineEvents();

  // Calculate hold duration
  const calculateHoldDuration = () => {
    const holdStart = new Date(escrow.holdStartTime);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - holdStart.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  // Check if overdue
  const isOverdue = escrow.status === 'active' && escrow.slaDeadline && new Date(escrow.slaDeadline) < new Date();

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
              Escrow Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {escrow.escrowId}
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
          {/* Status */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Status
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                icon={getStatusIcon(escrow.status)}
                label={escrow.status.charAt(0).toUpperCase() + escrow.status.slice(1)}
                color={getStatusColor(escrow.status) as any}
                variant="outlined"
              />
              <Chip
                icon={<IconAlertTriangle size={16} />}
                label={escrow.reason.replace('_', ' ').charAt(0).toUpperCase() + escrow.reason.replace('_', ' ').slice(1)}
                color={getReasonColor(escrow.reason) as any}
                variant="outlined"
              />
              {isOverdue && (
                <Chip
                  icon={<IconAlertTriangle size={16} />}
                  label="Overdue SLA"
                  color="error"
                  variant="outlined"
                />
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Escrow Summary */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Escrow Summary
            </Typography>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Escrow Amount
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="primary.main">
                      ₦{escrow.amount.toLocaleString()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Hold Duration
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {calculateHoldDuration()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Hold Start Time
                    </Typography>
                    <Typography variant="body2" fontFamily="monospace">
                      {escrow.holdStartTime}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                      Held Since
                    </Typography>
                    <Typography variant="body2" fontFamily="monospace">
                      {escrow.heldSince}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Linked Work */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Linked Work
            </Typography>
            <Stack spacing={2}>
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
                  {getLinkedWorkIcon(escrow.linkedWork)}
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" fontWeight={600}>
                    {getLinkedWorkText(escrow.linkedWork || {})}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {escrow.source === 'user_payment' ? 'User Payment' : 'Enterprise Payment'}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Counterparty Information */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Counterparty Information
            </Typography>
            <Stack spacing={2}>
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
                  {getCounterpartyIcon(escrow.counterparty)}
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" fontWeight={600}>
                    {escrow.counterparty === 'agent' ? 'Agent' : 
                     escrow.counterparty === 'user' ? 'User' : 'Enterprise Client'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getCounterpartyName(escrow)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {getCounterpartyEmail(escrow)}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Release Rules */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Release Rules
            </Typography>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  Auto-Release Condition
                </Typography>
                <Typography variant="body2">
                  {escrow.releaseCondition || 'No auto-release condition'}
                </Typography>
              </Stack>
              {escrow.slaDeadline && (
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    SLA Deadline
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color={isOverdue ? 'error.main' : 'text.secondary'}
                    fontWeight={isOverdue ? 600 : 400}
                  >
                    {escrow.slaDeadline}
                    {isOverdue && ' (OVERDUE)'}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>

          <Divider />

          {/* Timeline */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Escrow Timeline
            </Typography>
            <Timeline>
              {timelineEvents.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color={getTimelineDotColor(event.status) as any}>
                      {event.status === 'success' && <IconCheck size={16} />}
                      {event.status === 'error' && <IconFailed size={16} />}
                      {event.status === 'warning' && <IconAlertTriangle size={16} />}
                      {event.status === 'info' && <IconClock size={16} />}
                    </TimelineDot>
                    {index < timelineEvents.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="body2" fontWeight={600}>
                      {event.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {event.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>

          <Divider />

          {/* Actions */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Actions
            </Typography>
            <Stack spacing={2}>
              {escrow.status === 'active' && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<IconLockOpen size={16} />}
                    size="small"
                  >
                    Release Funds
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IconRefresh size={16} />}
                    size="small"
                  >
                    Refund Funds
                  </Button>
                </Stack>
              )}
              
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<IconCalendar size={16} />}
                  size="small"
                >
                  Extend Hold
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconDownload size={16} />}
                  size="small"
                >
                  Download Report
                </Button>
              </Stack>
              
              <Button
                variant="text"
                startIcon={<IconNotes size={16} />}
                size="small"
                sx={{ justifyContent: 'flex-start' }}
              >
                Add Internal Note
              </Button>
              
              <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                ⚠️ Read-only (except Finance Admin)
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default EscrowDetailDrawer;
