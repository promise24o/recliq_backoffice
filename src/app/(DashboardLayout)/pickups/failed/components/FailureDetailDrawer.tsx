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
  Divider,
  Alert,
} from '@mui/material';
import {
  X,
  RefreshCw,
  ArrowRightLeft,
  Gift,
  Flag,
  Check,
  Clock,
  MapPin,
  User,
  AlertTriangle,
} from 'lucide-react';

interface FailedPickup {
  id: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  city: string;
  zone: string;
  address: string;
  pickupMode: 'pickup' | 'dropoff';
  matchType: 'auto' | 'user';
  wasteType: string;
  estimatedWeight: number;
  status: 'failed' | 'cancelled';
  failureReason: string;
  timeToFailure: number;
  assignedAgent?: string;
  agentPhone?: string;
  triggerSource: 'user' | 'agent' | 'system';
  createdAt: string;
  failedAt: string;
  matchingAttempts: number;
  agentsNotified: number;
  slaCountdown: number;
  availabilitySnapshot: any;
  distanceConstraints: any;
  agentReliability: any;
}

interface FailureDetailDrawerProps {
  pickup: FailedPickup | null;
  open: boolean;
  onClose: () => void;
  onRecreateRequest?: () => void;
  onConvertMode?: () => void;
  onOfferIncentive?: () => void;
  onFlagAgent?: () => void;
  onMarkResolved?: () => void;
}

const FailureDetailDrawer: React.FC<FailureDetailDrawerProps> = ({
  pickup,
  open,
  onClose,
  onRecreateRequest,
  onConvertMode,
  onOfferIncentive,
  onFlagAgent,
  onMarkResolved,
}) => {
  if (!pickup) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 560 } }}
    >
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>Failure Investigation</Typography>
          <IconButton onClick={onClose}>
            <X size={20} />
          </IconButton>
        </Stack>

        {/* Request Overview */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>Request Overview</Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Request ID:</Typography>
              <Typography variant="body2" fontWeight={600}>{pickup.id}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">User:</Typography>
              <Box>
                <Typography variant="body2" fontWeight={600}>{pickup.userName}</Typography>
                <Typography variant="caption" color="text.secondary">{pickup.userPhone}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Location:</Typography>
              <Box textAlign="right">
                <Typography variant="body2">{pickup.address}</Typography>
                <Typography variant="caption" color="text.secondary">{pickup.city}, {pickup.zone}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Pickup Mode:</Typography>
              <Chip 
                size="small" 
                label={pickup.pickupMode === 'pickup' ? 'Agent → User' : 'User → Agent'}
                color={pickup.pickupMode === 'pickup' ? 'primary' : 'secondary'}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Match Type:</Typography>
              <Chip 
                size="small" 
                label={pickup.matchType === 'auto' ? 'Auto-matched' : 'User-selected'}
                color={pickup.matchType === 'auto' ? 'info' : 'warning'}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Waste Type:</Typography>
              <Typography variant="body2">{pickup.wasteType.replace('_', ' ')}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Estimated Weight:</Typography>
              <Typography variant="body2">{pickup.estimatedWeight.toFixed(1)} kg</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Created:</Typography>
              <Typography variant="body2">{pickup.createdAt}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Failed/Cancelled:</Typography>
              <Typography variant="body2">{pickup.failedAt}</Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Failure Timeline */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>Failure Timeline</Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Request Created:</Typography>
              <Typography variant="body2">{pickup.createdAt}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Matching Attempts:</Typography>
              <Typography variant="body2">{pickup.matchingAttempts}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Agents Notified:</Typography>
              <Typography variant="body2">{pickup.agentsNotified}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Assigned Agent:</Typography>
              <Typography variant="body2">{pickup.assignedAgent || 'None'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Time to Failure:</Typography>
              <Typography variant="body2" fontWeight={600}>{pickup.timeToFailure} min</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Trigger Source:</Typography>
              <Chip 
                size="small" 
                label={pickup.triggerSource}
                color={pickup.triggerSource === 'user' ? 'info' : pickup.triggerSource === 'agent' ? 'secondary' : 'error'}
              />
            </Box>
          </Stack>
        </Paper>

        {/* Root Cause Signals */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>Root Cause Signals</Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary" mb={1}>Availability Snapshot:</Typography>
              <Alert severity={pickup.failureReason === 'no_agent' ? 'error' : 'info'}>
                {pickup.failureReason === 'no_agent' 
                  ? `0 agents available within 5km radius at request time`
                  : `${pickup.agentsNotified} agents notified, ${pickup.matchingAttempts} matching attempts`
                }
              </Alert>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Distance Constraints:</Typography>
              <Typography variant="body2">Within 5km radius</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">SLA Countdown:</Typography>
              <Typography variant="body2">{pickup.slaCountdown} min remaining</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Agent Reliability:</Typography>
              <Typography variant="body2">N/A (no agent assigned)</Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Recovery Actions */}
        <Stack spacing={2}>
          <Typography variant="subtitle2" fontWeight={600}>Recovery Actions</Typography>
          <Button 
            variant="contained" 
            startIcon={<RefreshCw size={16} />}
            onClick={onRecreateRequest}
          >
            Recreate Pickup Request
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<ArrowRightLeft size={16} />}
            onClick={onConvertMode}
          >
            Convert Pickup ↔ Drop-off
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Gift size={16} />}
            onClick={onOfferIncentive}
          >
            Offer User Incentive
          </Button>
          {pickup.assignedAgent && (
            <Button 
              variant="outlined" 
              color="warning"
              startIcon={<Flag size={16} />}
              onClick={onFlagAgent}
            >
              Flag Agent Behavior
            </Button>
          )}
          <Button 
            variant="outlined" 
            color="success"
            startIcon={<Check size={16} />}
            onClick={onMarkResolved}
          >
            Mark as Resolved (Audited)
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default FailureDetailDrawer;
