'use client'
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Drawer, 
  Stack, 
  Chip, 
  Avatar, 
  Divider,
  IconButton,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { 
  X, 
  MapPin, 
  User, 
  Phone, 
  Calendar, 
  Clock, 
  Scale, 
  Wallet, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Download,
  Flag,
  MessageSquare,
  Camera,
  QrCode,
  Map,
  Leaf,
  DollarSign,
  Receipt,
  Shield,
  ChevronDown
} from 'lucide-react';
import { DropoffRecord } from '../types';

interface DropoffDetailDrawerProps {
  record: DropoffRecord | null;
  open: boolean;
  onClose: () => void;
  onFlagRecord: (record: DropoffRecord, reason: string) => void;
  onOpenDispute: (record: DropoffRecord) => void;
  onExportReceipt: (record: DropoffRecord) => void;
  onAddAuditNote: (record: DropoffRecord, note: string) => void;
}

const DropoffDetailDrawer: React.FC<DropoffDetailDrawerProps> = ({
  record,
  open,
  onClose,
  onFlagRecord,
  onOpenDispute,
  onExportReceipt,
  onAddAuditNote
}) => {
  const [auditNote, setAuditNote] = useState('');
  const [showAuditForm, setShowAuditForm] = useState(false);

  if (!record) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'disputed':
        return 'warning';
      case 'flagged':
        return 'error';
      default:
        return 'default';
    }
  };

  const getVerificationIcon = (verified: boolean) => {
    return verified ? (
      <CheckCircle size={16} color="#10b981" />
    ) : (
      <XCircle size={16} color="#ef4444" />
    );
  };

  const handleAddAuditNote = () => {
    if (auditNote.trim()) {
      onAddAuditNote(record, auditNote);
      setAuditNote('');
      setShowAuditForm(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 600,
          p: 0
        }
      }}
    >
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: '#3b82f6' }}>
                <MapPin size={24} color="white" />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="600">
                  Drop-off {record.id}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={record.status.toUpperCase()}
                    size="small"
                    color={getStatusColor(record.status) as any}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(record.completionDate).toLocaleString()}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <IconButton onClick={onClose}>
              <X size={20} />
            </IconButton>
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <Stack spacing={3}>
            {/* Drop-off Overview */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Drop-off Overview</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <User size={20} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">User</Typography>
                          <Typography variant="body2">{record.userName}</Typography>
                          <Typography variant="caption" color="text.secondary">{record.userPhone}</Typography>
                        </Box>
                      </Stack>
                      
                      <Stack direction="row" spacing={2}>
                        <User size={20} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">Agent</Typography>
                          <Typography variant="body2">{record.agentName}</Typography>
                          <Typography variant="caption" color="text.secondary">{record.agentPhone}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <MapPin size={20} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">Location</Typography>
                          <Typography variant="body2">{record.dropoffLocationName}</Typography>
                          <Typography variant="caption" color="text.secondary">{record.city}, {record.zone}</Typography>
                        </Box>
                      </Stack>
                      
                      <Stack direction="row" spacing={2}>
                        <Clock size={20} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">Duration</Typography>
                          <Typography variant="body2">{record.duration} minutes</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {record.arrivalTime} - {record.completionTime}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Waste Details */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Waste Details</Typography>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Waste Type</Typography>
                    <Chip
                      label={record.wasteType.replace('_', ' ').toUpperCase()}
                      size="small"
                      sx={{ bgcolor: '#3b82f615', color: '#3b82f6' }}
                    />
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Estimated Weight</Typography>
                    <Typography variant="body2" fontWeight="500">{record.estimatedWeight.toFixed(1)} kg</Typography>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Final Weight</Typography>
                    <Typography variant="body2" fontWeight="500">{record.finalWeight.toFixed(1)} kg</Typography>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Weight Variance</Typography>
                    <Typography 
                      variant="body2" 
                      fontWeight="500"
                      color={Math.abs(record.finalWeight - record.estimatedWeight) > record.estimatedWeight * 0.2 ? 'warning.main' : 'text.primary'}
                    >
                      {((record.finalWeight - record.estimatedWeight) / record.estimatedWeight * 100).toFixed(1)}%
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Verification Signals */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Verification Signals</Typography>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <QrCode size={16} color="#6b7280" />
                      <Typography variant="body2">Check-in Confirmed</Typography>
                    </Stack>
                    {getVerificationIcon(record.verificationSignals.checkInConfirmed)}
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Camera size={16} color="#6b7280" />
                      <Typography variant="body2">Photo Evidence</Typography>
                    </Stack>
                    {getVerificationIcon(record.verificationSignals.photoEvidence)}
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Scale size={16} color="#6b7280" />
                      <Typography variant="body2">Weight Verified</Typography>
                    </Stack>
                    {getVerificationIcon(record.verificationSignals.weightVerified)}
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Map size={16} color="#6b7280" />
                      <Typography variant="body2">Location Match</Typography>
                    </Stack>
                    {getVerificationIcon(record.verificationSignals.locationMatch)}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Financial Breakdown */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Financial Breakdown</Typography>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Price per kg</Typography>
                    <Typography variant="body2" fontWeight="500">
                      ₦{record.pricing.pricePerKg.toLocaleString()}
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Gross Value</Typography>
                    <Typography variant="body2" fontWeight="500">
                      ₦{record.pricing.grossValue.toLocaleString()}
                    </Typography>
                  </Stack>
                  
                  <Divider />
                  
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">User Payout</Typography>
                    <Typography variant="body2" fontWeight="500" color="success.main">
                      ₦{record.pricing.userPayout.toLocaleString()}
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Agent Earnings</Typography>
                    <Typography variant="body2" fontWeight="500" color="primary.main">
                      ₦{record.pricing.agentEarnings.toLocaleString()}
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Platform Fee</Typography>
                    <Typography variant="body2" fontWeight="500">
                      ₦{record.pricing.platformFee.toLocaleString()}
                    </Typography>
                  </Stack>
                  
                  <Divider />
                  
                  <Stack direction="row" spacing={1}>
                    <Receipt size={16} color="#6b7280" />
                    <Typography variant="caption" color="text.secondary">
                      Wallet TXN: {record.walletTransactionId}
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" spacing={1}>
                    <Receipt size={16} color="#6b7280" />
                    <Typography variant="caption" color="text.secondary">
                      Agent TXN: {record.agentTransactionId}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Impact Metrics */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Impact Metrics</Typography>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Leaf size={16} color="#10b981" />
                      <Typography variant="body2">Kg Recycled</Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight="500" color="success.main">
                      {record.impactMetrics.kgRecycled.toFixed(1)} kg
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Leaf size={16} color="#10b981" />
                      <Typography variant="body2">CO₂ Saved</Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight="500" color="success.main">
                      {record.impactMetrics.co2Saved.toFixed(1)} kg
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Leaf size={16} color="#10b981" />
                      <Typography variant="body2">Environmental Credits</Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight="500" color="success.main">
                      {record.impactMetrics.environmentalCredits.toFixed(1)}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Notes & Disputes */}
            {record.notes && (
              <Card>
                <CardContent>
                  <Typography variant="h6" mb={2}>Notes</Typography>
                  <Alert severity="info">
                    {record.notes}
                  </Alert>
                </CardContent>
              </Card>
            )}

            {record.disputeCount > 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" mb={2}>Dispute History</Typography>
                  <Alert severity="warning">
                    This drop-off has {record.disputeCount} dispute(s) filed against it.
                  </Alert>
                </CardContent>
              </Card>
            )}

            {/* Audit Notes */}
            {record.auditNotes && record.auditNotes.length > 0 && (
              <Accordion>
                <AccordionSummary expandIcon={<ChevronDown />}>
                  <Typography variant="h6">Audit Notes ({record.auditNotes.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    {record.auditNotes.map((note, index) => (
                      <Alert key={index} severity="info" sx={{ mb: 1 }}>
                        {note}
                      </Alert>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            )}
          </Stack>
        </Box>

        {/* Actions */}
        <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
          <Stack spacing={2}>
            {!showAuditForm ? (
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<MessageSquare />}
                  onClick={() => setShowAuditForm(true)}
                >
                  Add Audit Note
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Flag />}
                  color="warning"
                  onClick={() => onFlagRecord(record, 'Manual flag from detail view')}
                >
                  Flag
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AlertTriangle />}
                  color="error"
                  onClick={() => onOpenDispute(record)}
                >
                  Open Dispute
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => onExportReceipt(record)}
                >
                  Export Receipt
                </Button>
              </Stack>
            ) : (
              <Stack spacing={2}>
                <TextField
                  multiline
                  rows={3}
                  placeholder="Enter audit note..."
                  value={auditNote}
                  onChange={(e) => setAuditNote(e.target.value)}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    onClick={handleAddAuditNote}
                    disabled={!auditNote.trim()}
                  >
                    Add Note
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setShowAuditForm(false);
                      setAuditNote('');
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DropoffDetailDrawer;
