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
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  IconX,
  IconUser,
  IconCalendar,
  IconFileText,
  IconCurrencyNaira,
  IconPackage,
  IconMapPin,
  IconWeight,
  IconSettings,
  IconClock,
  IconDownload,
  IconEdit,
  IconMail,
  IconPrinter
} from '@tabler/icons-react';

interface CommissionData {
  id: string;
  date: string;
  agent: {
    name: string;
    avatar: string;
    email: string;
  };
  pickupId: string;
  pickupType: 'user' | 'b2b' | 'dropoff';
  grossValue: number;
  commission: number;
  rate: number;
  netPayout: number;
  material: string;
  weight: number;
  location: string;
}

interface CommissionDetailDrawerProps {
  commission: CommissionData | null;
  open: boolean;
  onClose: () => void;
}

const CommissionDetailDrawer: React.FC<CommissionDetailDrawerProps> = ({
  commission,
  open,
  onClose
}) => {
  const getPickupTypeColor = (type: string) => {
    switch (type) {
      case 'user': return 'primary';
      case 'b2b': return 'success';
      case 'dropoff': return 'info';
      default: return 'default';
    }
  };

  const getPickupTypeLabel = (type: string) => {
    switch (type) {
      case 'user': return 'User Pickup';
      case 'b2b': return 'B2B Pickup';
      case 'dropoff': return 'Drop-off';
      default: return type;
    }
  };

  if (!commission) return null;

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
              Commission Details
            </Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="monospace">
              {commission.pickupId}
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
          {/* Agent Information */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Agent Information
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'primary.main',
                  fontSize: '1rem',
                  fontWeight: 600
                }}
              >
                {commission.agent.avatar}
              </Avatar>
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  {commission.agent.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {commission.agent.email}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* Pickup Summary */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Pickup Summary
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  label={getPickupTypeLabel(commission.pickupType)}
                  color={getPickupTypeColor(commission.pickupType) as any}
                  variant="outlined"
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  {new Date(commission.date).toLocaleDateString()}
                </Typography>
              </Stack>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconPackage size={16} />
                      <Typography variant="caption" color="text.secondary">
                        Material
                      </Typography>
                    </Stack>
                    <Typography variant="body1" fontWeight={600}>
                      {commission.material}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconWeight size={16} />
                      <Typography variant="caption" color="text.secondary">
                      Weight
                      </Typography>
                    </Stack>
                    <Typography variant="body1" fontWeight={600}>
                      {commission.weight} kg
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconMapPin size={16} />
                      <Typography variant="caption" color="text.secondary">
                        Location
                      </Typography>
                    </Stack>
                    <Typography variant="body1" fontWeight={600}>
                      {commission.location}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconFileText size={16} />
                      <Typography variant="caption" color="text.secondary">
                        Pickup ID
                      </Typography>
                    </Stack>
                    <Typography variant="body1" fontWeight={600} fontFamily="monospace">
                      {commission.pickupId}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <Divider />

          {/* Financial Breakdown */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Financial Breakdown
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    Gross Pickup Value
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    ₦{commission.grossValue.toLocaleString()}
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    Agent Agreed Rate
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="primary.main">
                    {commission.rate}%
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    Commission Amount
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="success.main">
                    ₦{commission.commission.toLocaleString()}
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    Agent Net Payout
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="info.main">
                    ₦{commission.netPayout.toLocaleString()}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Commission Margin
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {commission.rate}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={commission.rate}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'success.main',
                  },
                }}
              />
            </Box>
          </Box>

          <Divider />

          {/* Rule Metadata */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Rule Metadata
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconSettings size={16} />
                <Typography variant="body2" color="text.secondary">
                  Commission Rule Version
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  v2.1.0
                </Typography>
              </Stack>
              
              <Stack direction="row" spacing={2} alignItems="center">
                <IconFileText size={16} />
                <Typography variant="body2" color="text.secondary">
                  Applied Pricing Config
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  Standard Agent Rates
                </Typography>
              </Stack>
              
              <Stack direction="row" spacing={2} alignItems="center">
                <IconClock size={16} />
                <Typography variant="body2" color="text.secondary">
                  Processed Timestamp
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {new Date(commission.date).toLocaleString()}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Actions */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Actions
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<IconDownload size={16} />}
                  size="small"
                >
                  Download Receipt
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconMail size={16} />}
                  size="small"
                >
                  Send to Agent
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconPrinter size={16} />}
                  size="small"
                >
                  Print
                </Button>
              </Stack>
              
              <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                ⚠️ Read-only (except Super Admin)
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default CommissionDetailDrawer;
