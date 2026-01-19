import React from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  Divider, 
  Stack, 
  Chip, 
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  IconX, 
  IconReceipt, 
  IconTruck, 
  IconPackage, 
  IconAlertTriangle,
  IconUser,
  IconMapPin,
  IconCalendar,
  IconScale,
  IconClock,
  IconCheck,
  IconRefresh
} from '@tabler/icons-react';

interface FeeData {
  id: string;
  date: string;
  user: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
  };
  pickupId: string;
  feeType: 'transaction' | 'weight' | 'convenience' | 'penalty';
  material: string;
  weight: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'reversed';
}

interface FeeDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  fee: FeeData | null;
}

const FeeDetailDrawer: React.FC<FeeDetailDrawerProps> = ({ open, onClose, fee }) => {
  if (!fee) return null;

  const getFeeTypeIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return <IconReceipt size={20} />;
      case 'weight':
        return <IconPackage size={20} />;
      case 'convenience':
        return <IconTruck size={20} />;
      case 'penalty':
        return <IconAlertTriangle size={20} />;
      default:
        return <IconReceipt size={20} />;
    }
  };

  const getFeeTypeLabel = (type: string) => {
    switch (type) {
      case 'transaction':
        return 'Per-Transaction Fee';
      case 'weight':
        return 'Weight-Based Fee';
      case 'convenience':
        return 'Pickup Convenience Fee';
      case 'penalty':
        return 'Penalty / Adjustment';
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      case 'reversed':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      case 'reversed':
        return 'Reversed';
      default:
        return status;
    }
  };

  // Mock additional data for demonstration
  const feeCalculation = {
    baseRate: 50,
    weightRate: 25,
    convenienceFee: 80,
    penaltyAmount: fee.amount < 0 ? Math.abs(fee.amount) : 0,
    total: Math.abs(fee.amount),
  };

  const pickupInfo = {
    agentName: 'John Agent',
    agentId: 'AG-001',
    location: 'Obio/Akpor, Rivers State',
    scheduledTime: '2024-01-15 10:00 AM',
    completedTime: '2024-01-15 10:38 AM',
    distance: '3.2 km',
  };

  const paymentInfo = {
    referenceId: 'PAY-2024-001234',
    settlementDate: '2024-01-16',
    method: 'Wallet Balance',
    reversalHistory: fee.status === 'reversed' ? [
      { date: '2024-01-16', reason: 'Quality dispute', amount: -50 },
    ] : [],
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 480,
          p: 0,
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          p: 3, 
          borderBottom: 1, 
          borderColor: 'divider',
          bgcolor: 'grey.50'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600}>
              Fee Details
            </Typography>
            <IconButton onClick={onClose} size="small">
              <IconX size={20} />
            </IconButton>
          </Box>
          
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: 'primary.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main',
              }}
            >
              {getFeeTypeIcon(fee.feeType)}
            </Box>
            
            <Box>
              <Typography variant="body1" fontWeight={600}>
                {getFeeTypeLabel(fee.feeType)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {fee.pickupId}
              </Typography>
            </Box>
            
            <Chip
              label={getStatusLabel(fee.status)}
              color={getStatusColor(fee.status) as any}
              variant="outlined"
              size="small"
            />
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <Stack spacing={3}>
            {/* User Information */}
            <Card>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  <IconUser size={16} style={{ marginRight: 8 }} />
                  Customer Information
                </Typography>
                
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: 'primary.main',
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    {fee.user.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      {fee.user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {fee.user.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {fee.user.phone}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Pickup Summary */}
            <Card>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  <IconTruck size={16} style={{ marginRight: 8 }} />
                  Pickup Summary
                </Typography>
                
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Agent
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {pickupInfo.agentName} ({pickupInfo.agentId})
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {pickupInfo.location}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Material & Weight
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {fee.material} • {fee.weight}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Distance
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {pickupInfo.distance}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Fee Calculation */}
            <Card>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  <IconReceipt size={16} style={{ marginRight: 8 }} />
                  Fee Calculation
                </Typography>
                
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Base Transaction Fee
                    </Typography>
                    <Typography variant="body2">
                      ₦{feeCalculation.baseRate}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Weight-Based Fee ({fee.weight})
                    </Typography>
                    <Typography variant="body2">
                      ₦{feeCalculation.weightRate}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Convenience Fee
                    </Typography>
                    <Typography variant="body2">
                      ₦{feeCalculation.convenienceFee}
                    </Typography>
                  </Box>
                  
                  {feeCalculation.penaltyAmount > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="error.main">
                        Penalty Amount
                      </Typography>
                      <Typography variant="body2" color="error.main">
                        -₦{feeCalculation.penaltyAmount}
                      </Typography>
                    </Box>
                  )}
                  
                  <Divider />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" fontWeight={600}>
                      Total Amount
                    </Typography>
                    <Typography 
                      variant="body1" 
                      fontWeight={700}
                      color={fee.amount < 0 ? 'error.main' : 'success.main'}
                    >
                      ₦{feeCalculation.total.toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Settlement Status */}
            <Card>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  <IconCheck size={16} style={{ marginRight: 8 }} />
                  Settlement Status
                </Typography>
                
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Payment Reference
                    </Typography>
                    <Typography variant="body2" fontFamily="monospace">
                      {paymentInfo.referenceId}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Settlement Date
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {paymentInfo.settlementDate}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Payment Method
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {paymentInfo.method}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Reversal History */}
            {paymentInfo.reversalHistory.length > 0 && (
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    <IconRefresh size={16} style={{ marginRight: 8 }} />
                    Reversal History
                  </Typography>
                  
                  {paymentInfo.reversalHistory.map((reversal, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          {reversal.date}
                        </Typography>
                        <Typography variant="body2" color="error.main" fontWeight={600}>
                          -₦{reversal.amount}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {reversal.reason}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            )}
          </Stack>
        </Box>

        {/* Footer Actions */}
        <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="outlined" 
              onClick={onClose}
              sx={{ flex: 1 }}
            >
              Close
            </Button>
            <Button 
              variant="contained" 
              sx={{ flex: 1 }}
              startIcon={<IconRefresh size={16} />}
            >
              Process Refund
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FeeDetailDrawer;
