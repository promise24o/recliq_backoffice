'use client';

import React from 'react';
import {
  Box,
  Stack,
  Typography,
  Paper,
  Button,
  Chip,
  IconButton,
  Drawer,
} from '@mui/material';
import {
  X,
  Check,
  Calendar,
  Users,
  Timer,
  AlertCircle,
} from 'lucide-react';

interface ScheduledPickup {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  city: string;
  zone: string;
  address: string;
  scheduledDate: string;
  scheduledTime: string;
  pickupMode: 'pickup' | 'dropoff';
  wasteType: 'plastic' | 'paper' | 'metal' | 'glass' | 'organic' | 'e_waste' | 'mixed';
  estimatedWeight: number;
  status: 'scheduled' | 'assigned' | 'agent_confirmed' | 'at_risk' | 'cancelled' | 'rescheduled';
  assignedAgentId?: string;
  assignedAgentName?: string;
  agentConfirmationStatus?: 'confirmed' | 'pending' | 'rejected';
  backupAgentId?: string;
  backupAgentName?: string;
  slaRisk: 'low' | 'medium' | 'high' | 'critical';
  timeRemaining: string;
  riskScore: number;
  createdAt: string;
  updatedAt: string;
  rescheduleCount: number;
  cancellationReason?: string;
}

interface ScheduledPickupDetailDrawerProps {
  pickup: ScheduledPickup | null;
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onReschedule?: () => void;
  onCancel?: () => void;
}

const ScheduledPickupDetailDrawer: React.FC<ScheduledPickupDetailDrawerProps> = ({
  pickup,
  open,
  onClose,
  onConfirm,
  onReschedule,
  onCancel,
}) => {
  const getSlaRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const getConfirmationColor = (status?: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  if (!pickup) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 480 } }}
    >
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>Pickup Details</Typography>
          <IconButton onClick={onClose}>
            <X size={20} />
          </IconButton>
        </Stack>

        {/* Pickup Overview */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>Pickup Overview</Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Pickup ID:</Typography>
              <Typography variant="body2" fontWeight={600}>{pickup.id}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">User:</Typography>
              <Typography variant="body2" fontWeight={600}>{pickup.userName}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Phone:</Typography>
              <Typography variant="body2">{pickup.userPhone}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Address:</Typography>
              <Typography variant="body2" textAlign="right">{pickup.address}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Scheduled:</Typography>
              <Typography variant="body2">{pickup.scheduledDate} at {pickup.scheduledTime}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Pickup Mode:</Typography>
              <Typography variant="body2">{pickup.pickupMode === 'pickup' ? 'Agent → User' : 'User → Agent'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Waste Type:</Typography>
              <Typography variant="body2">{pickup.wasteType.replace('_', ' ')}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Est. Weight:</Typography>
              <Typography variant="body2">{pickup.estimatedWeight} kg</Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Assignment Status */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>Assignment Status</Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Assigned Agent:</Typography>
              <Typography variant="body2" fontWeight={600}>
                {pickup.assignedAgentName || 'Unassigned'}
              </Typography>
            </Box>
            {pickup.assignedAgentName && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Confirmation:</Typography>
                <Chip 
                  size="small" 
                  label={pickup.agentConfirmationStatus || 'N/A'}
                  color={getConfirmationColor(pickup.agentConfirmationStatus) as any}
                />
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Backup Agent:</Typography>
              <Typography variant="body2">{pickup.backupAgentName || 'None'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Reschedule Count:</Typography>
              <Typography variant="body2">{pickup.rescheduleCount}</Typography>
            </Box>
          </Stack>
        </Paper>

        {/* SLA Indicators */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>SLA Indicators</Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Time Remaining:</Typography>
              <Typography variant="body2" fontWeight={600}>{pickup.timeRemaining}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Risk Score:</Typography>
              <Typography variant="body2" fontWeight={600} color={pickup.riskScore > 50 ? 'error.main' : pickup.riskScore > 25 ? 'warning.main' : 'success.main'}>
                {pickup.riskScore}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">SLA Risk:</Typography>
              <Chip 
                size="small" 
                label={pickup.slaRisk.replace('_', ' ')}
                color={getSlaRiskColor(pickup.slaRisk) as any}
              />
            </Box>
          </Stack>
        </Paper>

        {/* History & Changes */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>History & Changes</Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Created:</Typography>
              <Typography variant="body2">{new Date(pickup.createdAt).toLocaleDateString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Last Updated:</Typography>
              <Typography variant="body2">{new Date(pickup.updatedAt).toLocaleDateString()}</Typography>
            </Box>
            {pickup.cancellationReason && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Cancellation Reason:</Typography>
                <Typography variant="body2">{pickup.cancellationReason}</Typography>
              </Box>
            )}
          </Stack>
        </Paper>

        {/* Actions */}
        <Stack spacing={2}>
          <Button 
            variant="contained" 
            startIcon={<Check size={16} />}
            onClick={onConfirm}
            disabled={pickup.status === 'cancelled'}
          >
            Confirm Pickup
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Calendar size={16} />}
            onClick={onReschedule}
          >
            Reschedule
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<X size={16} />}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default ScheduledPickupDetailDrawer;
