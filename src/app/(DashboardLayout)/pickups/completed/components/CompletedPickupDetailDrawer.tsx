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
} from '@mui/material';
import {
  X,
  Check,
  AlertTriangle,
  Scale,
  DollarSign,
  Clock,
  MapPin,
  Flag,
  Download,
} from 'lucide-react';

interface CompletedPickup {
  id: string;
  completionDate: string;
  userName: string;
  userPhone: string;
  agentName: string;
  agentPhone: string;
  city: string;
  zone: string;
  address: string;
  pickupMode: 'pickup' | 'dropoff';
  matchType: 'auto' | 'user';
  wasteType: string;
  estimatedWeight: number;
  finalWeight: number;
  weightVariance: number;
  userPayout: number;
  agentEarnings: number;
  platformFee: number;
  pricePerKg: number;
  grossValue: number;
  completionTime: number;
  walletTransactionId: string;
  kgRecycled: number;
  co2Saved: number;
  sdgContribution: string;
  photoEvidence?: string[];
  userConfirmation: boolean;
  agentConfirmation: boolean;
  status: 'completed';
}

interface CompletedPickupDetailDrawerProps {
  pickup: CompletedPickup | null;
  open: boolean;
  onClose: () => void;
  onOpenDispute?: () => void;
  onFlagAnomaly?: () => void;
  onAdjustRecords?: () => void;
  onExportReceipt?: () => void;
}

const CompletedPickupDetailDrawer: React.FC<CompletedPickupDetailDrawerProps> = ({
  pickup,
  open,
  onClose,
  onOpenDispute,
  onFlagAnomaly,
  onAdjustRecords,
  onExportReceipt,
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
          <Typography variant="h6" fontWeight={600}>Completed Pickup Details</Typography>
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
              <Typography variant="body2" color="text.secondary">Completion Date:</Typography>
              <Typography variant="body2">{pickup.completionDate}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">User:</Typography>
              <Box>
                <Typography variant="body2" fontWeight={600}>{pickup.userName}</Typography>
                <Typography variant="caption" color="text.secondary">{pickup.userPhone}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Agent:</Typography>
              <Box>
                <Typography variant="body2" fontWeight={600}>{pickup.agentName}</Typography>
                <Typography variant="caption" color="text.secondary">{pickup.agentPhone}</Typography>
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
          </Stack>
        </Paper>

        {/* Waste & Weight Verification */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>Waste & Weight Verification</Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Waste Type:</Typography>
              <Typography variant="body2">{pickup.wasteType.replace('_', ' ')}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Estimated Weight:</Typography>
              <Typography variant="body2">{pickup.estimatedWeight.toFixed(1)} kg</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Final Weight:</Typography>
              <Typography variant="body2" fontWeight={600}>{pickup.finalWeight.toFixed(1)} kg</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Variance:</Typography>
              <Typography 
                variant="body2" 
                fontWeight={600}
                color={Math.abs(pickup.weightVariance) > 20 ? 'error.main' : Math.abs(pickup.weightVariance) > 10 ? 'warning.main' : 'success.main'}
              >
                {pickup.weightVariance > 0 ? '+' : ''}{pickup.weightVariance.toFixed(1)}%
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">User Confirmation:</Typography>
              <Chip 
                size="small" 
                label={pickup.userConfirmation ? 'Confirmed' : 'Not Confirmed'}
                color={pickup.userConfirmation ? 'success' : 'default'}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Agent Confirmation:</Typography>
              <Chip 
                size="small" 
                label={pickup.agentConfirmation ? 'Confirmed' : 'Not Confirmed'}
                color={pickup.agentConfirmation ? 'success' : 'default'}
              />
            </Box>
            {pickup.photoEvidence && pickup.photoEvidence.length > 0 && (
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>Photo Evidence:</Typography>
                <Typography variant="caption" color="primary">{pickup.photoEvidence.length} photos available</Typography>
              </Box>
            )}
          </Stack>
        </Paper>

        {/* Financial Breakdown */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>Financial Breakdown</Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Price per kg:</Typography>
              <Typography variant="body2">₦{pickup.pricePerKg.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Gross Value:</Typography>
              <Typography variant="body2">₦{pickup.grossValue.toLocaleString()}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Agent Payout:</Typography>
              <Typography variant="body2" fontWeight={600} color="success.main">₦{pickup.agentEarnings.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Platform Fee:</Typography>
              <Typography variant="body2" fontWeight={600} color="primary.main">₦{pickup.platformFee.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Wallet Transaction ID:</Typography>
              <Typography variant="caption" color="primary">{pickup.walletTransactionId}</Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Impact Metrics */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>Impact Metrics</Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Kg Recycled:</Typography>
              <Typography variant="body2" fontWeight={600}>{pickup.kgRecycled.toFixed(1)} kg</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">CO₂ Saved:</Typography>
              <Typography variant="body2" fontWeight={600}>{pickup.co2Saved.toFixed(1)} kg</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">SDG Contribution:</Typography>
              <Typography variant="body2">{pickup.sdgContribution}</Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Post-Completion Actions */}
        <Stack spacing={2}>
          <Button 
            variant="outlined" 
            color="error"
            startIcon={<AlertTriangle size={16} />}
            onClick={onOpenDispute}
          >
            Open Dispute
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Flag size={16} />}
            onClick={onFlagAnomaly}
          >
            Flag Anomaly
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Scale size={16} />}
            onClick={onAdjustRecords}
          >
            Adjust Records (Audited)
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Download size={16} />}
            onClick={onExportReceipt}
          >
            Export Receipt
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default CompletedPickupDetailDrawer;
