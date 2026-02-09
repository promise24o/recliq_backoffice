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
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { 
  X, 
  Scale, 
  User, 
  Phone, 
  Calendar, 
  Clock, 
  MapPin, 
  Camera, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Flag,
  MessageSquare,
  ChevronDown,
  Settings,
  DollarSign,
  Receipt,
  Shield,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { WeightLog } from '../types';

interface WeightLogDetailDrawerProps {
  log: WeightLog | null;
  open: boolean;
  onClose: () => void;
  onApproveWeight: (log: WeightLog) => void;
  onAdjustWeight: (log: WeightLog, newWeight: number, reason: string) => void;
  onOpenDispute: (log: WeightLog) => void;
  onFlagAgent: (log: WeightLog) => void;
  onAddInvestigationNote: (log: WeightLog, note: string) => void;
}

const WeightLogDetailDrawer: React.FC<WeightLogDetailDrawerProps> = ({
  log,
  open,
  onClose,
  onApproveWeight,
  onAdjustWeight,
  onOpenDispute,
  onFlagAgent,
  onAddInvestigationNote
}) => {
  const [adjustmentWeight, setAdjustmentWeight] = useState('');
  const [adjustmentReason, setAdjustmentReason] = useState('');
  const [investigationNote, setInvestigationNote] = useState('');
  const [showAdjustmentForm, setShowAdjustmentForm] = useState(false);
  const [showInvestigationForm, setShowInvestigationForm] = useState(false);

  if (!log) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'success';
      case 'disputed':
        return 'warning';
      case 'adjusted':
        return 'info';
      case 'flagged':
        return 'error';
      default:
        return 'default';
    }
  };

  const getVerificationIcon = (method: string) => {
    switch (method) {
      case 'agent_scale':
        return <Scale size={16} />;
      case 'user_confirmation':
        return <User size={16} />;
      case 'photo_assisted':
        return <Camera size={16} />;
      case 'smart_scale':
        return <Settings size={16} />;
      default:
        return <Scale size={16} />;
    }
  };

  const handleAdjustWeight = () => {
    if (adjustmentWeight && adjustmentReason) {
      onAdjustWeight(log, parseFloat(adjustmentWeight), adjustmentReason);
      setShowAdjustmentForm(false);
      setAdjustmentWeight('');
      setAdjustmentReason('');
    }
  };

  const handleAddNote = () => {
    if (investigationNote.trim()) {
      onAddInvestigationNote(log, investigationNote);
      setShowInvestigationForm(false);
      setInvestigationNote('');
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 700,
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
                <Scale size={24} color="white" />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="600">
                  Weight Log {log.id}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={log.status.toUpperCase()}
                    size="small"
                    color={getStatusColor(log.status) as any}
                  />
                  <Chip
                    label={log.relatedType}
                    size="small"
                    variant="outlined"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(log.timestamp).toLocaleString()}
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
            {/* Log Overview */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Log Overview</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <User size={20} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">User</Typography>
                          <Typography variant="body2">{log.userName}</Typography>
                          <Typography variant="caption" color="text.secondary">{log.userPhone}</Typography>
                        </Box>
                      </Stack>
                      
                      <Stack direction="row" spacing={2}>
                        <User size={20} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">Agent</Typography>
                          <Typography variant="body2">{log.agentName}</Typography>
                          <Typography variant="caption" color="text.secondary">{log.agentPhone}</Typography>
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
                          <Typography variant="body2">{log.city}, {log.zone}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {log.coordinates.lat.toFixed(4)}, {log.coordinates.lng.toFixed(4)}
                          </Typography>
                        </Box>
                      </Stack>
                      
                      <Stack direction="row" spacing={2}>
                        <Calendar size={20} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">Related ID</Typography>
                          <Typography variant="body2">{log.relatedId}</Typography>
                          <Typography variant="caption" color="text.secondary">{log.relatedType}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Weight Measurements */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Weight Measurements</Typography>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Estimated Weight</Typography>
                    <Typography variant="body2" fontWeight="500">{log.estimatedWeight.toFixed(1)} kg</Typography>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Measured Weight</Typography>
                    <Typography variant="body2" fontWeight="500">{log.measuredWeight.toFixed(1)} kg</Typography>
                  </Stack>
                  
                  <Divider />
                  
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" fontWeight="600">Final Weight</Typography>
                    <Typography variant="body2" fontWeight="600" color="primary.main">
                      {log.finalWeight.toFixed(1)} kg
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Variance</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {log.variance > 0 ? <TrendingUp size={16} color="#ef4444" /> : <TrendingDown size={16} color="#10b981" />}
                      <Typography 
                        variant="body2" 
                        fontWeight="500"
                        color={Math.abs(log.variance) > 15 ? 'error.main' : Math.abs(log.variance) > 8 ? 'warning.main' : 'success.main'}
                      >
                        {log.variance > 0 ? '+' : ''}{log.variance.toFixed(1)}%
                      </Typography>
                    </Stack>
                  </Stack>
                  
                  <Stack direction="row" spacing={1} alignItems="center">
                    {getVerificationIcon(log.verificationMethod)}
                    <Typography variant="body2" color="text.secondary">
                      Verification: {log.verificationMethod.replace('_', ' ').toUpperCase()}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Measurement Timeline */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Measurement Timeline</Typography>
                <Timeline>
                  <TimelineItem>
                    <TimelineOppositeContent color="textSecondary">
                      {new Date(log.measurementTimeline.estimatedAt).toLocaleTimeString()}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color="primary" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body2" fontWeight="500">User Estimate</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {log.estimatedWeight.toFixed(1)} kg estimated
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  
                  <TimelineItem>
                    <TimelineOppositeContent color="textSecondary">
                      {new Date(log.measurementTimeline.measuredAt).toLocaleTimeString()}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color="secondary" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body2" fontWeight="500">Agent Weigh-in</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {log.measuredWeight.toFixed(1)} kg measured
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  
                  <TimelineItem>
                    <TimelineOppositeContent color="textSecondary">
                      {new Date(log.measurementTimeline.confirmedAt).toLocaleTimeString()}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color="success" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body2" fontWeight="500">User Confirmation</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Weight confirmed
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  
                  <TimelineItem>
                    <TimelineOppositeContent color="textSecondary">
                      {new Date(log.measurementTimeline.lockedAt).toLocaleTimeString()}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color="info" />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body2" fontWeight="500">Final Locked</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {log.finalWeight.toFixed(1)} kg locked for settlement
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </CardContent>
            </Card>

            {/* Evidence */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Evidence</Typography>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Camera size={16} color="#6b7280" />
                    <Typography variant="body2">Scale Photos: {log.evidence.scalePhotos.length}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {log.evidence.scalePhotos.join(', ')}
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Camera size={16} color="#6b7280" />
                    <Typography variant="body2">Waste Photos: {log.evidence.wastePhotos.length}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {log.evidence.wastePhotos.join(', ')}
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" spacing={2} alignItems="center">
                    <MapPin size={16} color="#6b7280" />
                    <Typography variant="body2">Location Verified:</Typography>
                    <Chip
                      label={log.evidence.locationVerified ? 'Yes' : 'No'}
                      size="small"
                      color={log.evidence.locationVerified ? 'success' : 'error'}
                    />
                  </Stack>
                  
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Settings size={16} color="#6b7280" />
                    <Typography variant="body2">Device:</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {log.evidence.deviceMetadata.deviceType}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Financial Impact */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Financial Impact</Typography>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Payout Difference</Typography>
                    <Typography variant="body2" fontWeight="500" color="success.main">
                      ₦{Math.abs(log.financialImpact.payoutDifference).toLocaleString()}
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Agent Earnings Impact</Typography>
                    <Typography variant="body2" fontWeight="500" color="primary.main">
                      ₦{Math.abs(log.financialImpact.agentEarningsImpact).toLocaleString()}
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Platform Margin Adjustment</Typography>
                    <Typography variant="body2" fontWeight="500">
                      ₦{Math.abs(log.financialImpact.platformMarginAdjustment).toLocaleString()}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Manual Adjustments */}
            {log.manualAdjustments && log.manualAdjustments.length > 0 && (
              <Accordion>
                <AccordionSummary expandIcon={<ChevronDown />}>
                  <Typography variant="h6">Manual Adjustments ({log.manualAdjustments.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    {log.manualAdjustments.map((adjustment, index) => (
                      <Alert key={index} severity="info">
                        <Typography variant="body2">
                          <strong>{adjustment.originalWeight.toFixed(1)} kg → {adjustment.adjustedWeight.toFixed(1)} kg</strong>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {adjustment.reason} by {adjustment.adjustedBy} on {new Date(adjustment.adjustedAt).toLocaleDateString()}
                        </Typography>
                      </Alert>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            )}

            {/* Investigation Notes */}
            {log.auditNotes && log.auditNotes.length > 0 && (
              <Accordion>
                <AccordionSummary expandIcon={<ChevronDown />}>
                  <Typography variant="h6">Investigation Notes ({log.auditNotes.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    {log.auditNotes.map((note, index) => (
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
            {!showAdjustmentForm && !showInvestigationForm ? (
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button
                  variant="contained"
                  startIcon={<CheckCircle />}
                  onClick={() => onApproveWeight(log)}
                >
                  Approve Weight
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Scale />}
                  onClick={() => setShowAdjustmentForm(true)}
                >
                  Adjust Weight
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<AlertTriangle />}
                  color="warning"
                  onClick={() => onOpenDispute(log)}
                >
                  Open Dispute
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Flag />}
                  color="error"
                  onClick={() => onFlagAgent(log)}
                >
                  Flag Agent
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<MessageSquare />}
                  onClick={() => setShowInvestigationForm(true)}
                >
                  Add Note
                </Button>
              </Stack>
            ) : showAdjustmentForm ? (
              <Stack spacing={2}>
                <Typography variant="h6">Adjust Weight</Typography>
                <TextField
                  label="New Weight (kg)"
                  type="number"
                  value={adjustmentWeight}
                  onChange={(e) => setAdjustmentWeight(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Reason for Adjustment"
                  multiline
                  rows={3}
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    onClick={handleAdjustWeight}
                    disabled={!adjustmentWeight || !adjustmentReason}
                  >
                    Submit Adjustment
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setShowAdjustmentForm(false);
                      setAdjustmentWeight('');
                      setAdjustmentReason('');
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Typography variant="h6">Add Investigation Note</Typography>
                <TextField
                  multiline
                  rows={3}
                  placeholder="Enter investigation note..."
                  value={investigationNote}
                  onChange={(e) => setInvestigationNote(e.target.value)}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    onClick={handleAddNote}
                    disabled={!investigationNote.trim()}
                  >
                    Add Note
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setShowInvestigationForm(false);
                      setInvestigationNote('');
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

export default WeightLogDetailDrawer;
