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
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
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
  AlertTriangle, 
  User, 
  Phone, 
  Calendar, 
  Clock, 
  MapPin, 
  Camera, 
  CheckCircle, 
  DollarSign,
  Download,
  Flag,
  MessageSquare,
  ChevronDown,
  Scale,
  Shield,
  Gavel,
  FileText,
  Video
} from 'lucide-react';
import { Dispute } from '../types';

interface DisputeDetailDrawerProps {
  dispute: Dispute | null;
  open: boolean;
  onClose: () => void;
  onApproveAgentClaim: (dispute: Dispute) => void;
  onApproveUserClaim: (dispute: Dispute) => void;
  onSplitResolution: (dispute: Dispute, userAmount: number, agentAmount: number) => void;
  onAdjustPayout: (dispute: Dispute, newAmount: number, reason: string) => void;
  onDismissDispute: (dispute: Dispute) => void;
  onEscalateToCompliance: (dispute: Dispute) => void;
}

const DisputeDetailDrawer: React.FC<DisputeDetailDrawerProps> = ({
  dispute,
  open,
  onClose,
  onApproveAgentClaim,
  onApproveUserClaim,
  onSplitResolution,
  onAdjustPayout,
  onDismissDispute,
  onEscalateToCompliance
}) => {
  const [showSplitForm, setShowSplitForm] = useState(false);
  const [showAdjustForm, setShowAdjustForm] = useState(false);
  const [userAmount, setUserAmount] = useState('');
  const [agentAmount, setAgentAmount] = useState('');
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustReason, setAdjustReason] = useState('');

  if (!dispute) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'error';
      case 'under_review':
        return 'warning';
      case 'resolved':
        return 'success';
      case 'escalated':
        return 'info';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return '#ef4444';
      case 'high':
        return '#f59e0b';
      case 'medium':
        return '#06b6d4';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getDisputeTypeLabel = (type: string) => {
    switch (type) {
      case 'weight_disagreement':
        return 'Weight Disagreement';
      case 'missing_damaged':
        return 'Missing/Damaged';
      case 'payout_mismatch':
        return 'Payout Mismatch';
      case 'agent_no_show':
        return 'Agent No-Show';
      case 'dropoff_rejection':
        return 'Drop-off Rejection';
      case 'suspicious_behavior':
        return 'Suspicious Behavior';
      default:
        return type;
    }
  };

  const getRaisedByLabel = (raisedBy: string) => {
    switch (raisedBy) {
      case 'user':
        return 'User';
      case 'agent':
        return 'Agent';
      case 'system':
        return 'System';
      default:
        return raisedBy;
    }
  };

  const handleSplitResolution = () => {
    if (userAmount && agentAmount) {
      onSplitResolution(dispute, parseFloat(userAmount), parseFloat(agentAmount));
      setShowSplitForm(false);
      setUserAmount('');
      setAgentAmount('');
    }
  };

  const handleAdjustPayout = () => {
    if (adjustAmount && adjustReason) {
      onAdjustPayout(dispute, parseFloat(adjustAmount), adjustReason);
      setShowAdjustForm(false);
      setAdjustAmount('');
      setAdjustReason('');
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 800,
          p: 0
        }
      }}
    >
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: '#ef4444' }}>
                <AlertTriangle size={24} color="white" />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="600">
                  Dispute {dispute.id}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={dispute.status.replace('_', ' ').toUpperCase()}
                    size="small"
                    color={getStatusColor(dispute.status) as any}
                  />
                  <Chip
                    label={dispute.priority.toUpperCase()}
                    size="small"
                    sx={{
                      bgcolor: `${getPriorityColor(dispute.priority)}15`,
                      color: getPriorityColor(dispute.priority),
                      fontSize: '0.7rem'
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Open for {dispute.openDuration}h
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
            {/* Dispute Overview */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Dispute Overview</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <FileText size={20} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">Dispute Type</Typography>
                          <Typography variant="body2">{getDisputeTypeLabel(dispute.disputeType)}</Typography>
                        </Box>
                      </Stack>
                      
                      <Stack direction="row" spacing={2}>
                        <User size={20} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">Raised By</Typography>
                          <Typography variant="body2">{getRaisedByLabel(dispute.raisedBy)}</Typography>
                        </Box>
                      </Stack>
                      
                      <Stack direction="row" spacing={2}>
                        <Calendar size={20} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">Created</Typography>
                          <Typography variant="body2">{new Date(dispute.createdAt).toLocaleString()}</Typography>
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
                          <Typography variant="body2">{dispute.city}, {dispute.zone}</Typography>
                        </Box>
                      </Stack>
                      
                      <Stack direction="row" spacing={2}>
                        <FileText size={20} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">Related ID</Typography>
                          <Typography variant="body2">{dispute.relatedId}</Typography>
                          <Typography variant="caption" color="text.secondary">{dispute.relatedType}</Typography>
                        </Box>
                      </Stack>
                      
                      <Stack direction="row" spacing={2}>
                        <Clock size={20} color="#6b7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">Duration</Typography>
                          <Typography variant="body2">{dispute.openDuration} hours</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Parties Involved */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Parties Involved</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="primary.main">User</Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: '#3b82f6' }}>
                          <User size={20} color="white" />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="500">{dispute.userName}</Typography>
                          <Typography variant="caption" color="text.secondary">{dispute.userPhone}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="warning.main">Agent</Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: '#f59e0b' }}>
                          <User size={20} color="white" />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="500">{dispute.agentName}</Typography>
                          <Typography variant="caption" color="text.secondary">{dispute.agentPhone}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Evidence & Context */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Evidence & Context</Typography>
                <Stack spacing={2}>
                  {/* Chat Logs */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ChevronDown />}>
                      <Typography variant="subtitle1">Chat Logs ({dispute.evidence.chatLogs.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {dispute.evidence.chatLogs.map((chat, index) => (
                          <ListItem key={index} sx={{ pl: 0 }}>
                            <ListItemIcon>
                              {chat.sender === 'user' ? (
                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#3b82f6' }}>
                                  <User size={16} color="white" />
                                </Avatar>
                              ) : chat.sender === 'agent' ? (
                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#f59e0b' }}>
                                  <User size={16} color="white" />
                                </Avatar>
                              ) : (
                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#6b7280' }}>
                                  <AlertTriangle size={16} color="white" />
                                </Avatar>
                              )}
                            </ListItemIcon>
                            <ListItemText
                              primary={chat.message}
                              secondary={`${chat.sender.charAt(0).toUpperCase() + chat.sender.slice(1)} • ${new Date(chat.timestamp).toLocaleTimeString()}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>

                  {/* Timeline */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ChevronDown />}>
                      <Typography variant="subtitle1">Event Timeline</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Timeline>
                        {dispute.evidence.timeline.map((event, index) => (
                          <TimelineItem key={index}>
                            <TimelineOppositeContent color="textSecondary">
                              {new Date(event.timestamp).toLocaleTimeString()}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                              <TimelineDot color="primary" />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Typography variant="body2" fontWeight="500">
                                {event.event}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {event.details}
                              </Typography>
                            </TimelineContent>
                          </TimelineItem>
                        ))}
                      </Timeline>
                    </AccordionDetails>
                  </Accordion>

                  {/* Media Evidence */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Camera size={16} color="#6b7280" />
                    <Typography variant="body2">Photos: {dispute.evidence.photos.length}</Typography>
                    <Video size={16} color="#6b7280" />
                    <Typography variant="body2">Videos: {dispute.evidence.videos.length}</Typography>
                    {dispute.evidence.weightLogs && (
                      <>
                        <Scale size={16} color="#6b7280" />
                        <Typography variant="body2">Weight Logs: {dispute.evidence.weightLogs.length}</Typography>
                      </>
                    )}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Financial Context */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Financial Context</Typography>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Original Payout</Typography>
                    <Typography variant="body2" fontWeight="500">
                      ₦{dispute.financialContext.originalPayout.toLocaleString()}
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Funds on Hold</Typography>
                    <Typography variant="body2" fontWeight="500" color="warning.main">
                      ₦{dispute.financialContext.fundsOnHold.toLocaleString()}
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Potential Adjustment</Typography>
                    <Typography variant="body2" fontWeight="500" color="info.main">
                      ₦{dispute.financialContext.potentialAdjustment.toLocaleString()}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Resolution History */}
            {dispute.resolution && (
              <Card>
                <CardContent>
                  <Typography variant="h6" mb={2}>Resolution History</Typography>
                  <Alert severity="success">
                    <Typography variant="body2" fontWeight="600" mb={1}>
                      Resolved by {dispute.resolution.resolvedBy}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                      <strong>Action:</strong> {dispute.resolution.action.replace('_', ' ').toUpperCase()}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                      <strong>Final Payout:</strong> ₦{dispute.resolution.finalPayout.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Notes:</strong> {dispute.resolution.notes}
                    </Typography>
                  </Alert>
                </CardContent>
              </Card>
            )}

            {/* Audit Notes */}
            {dispute.auditNotes && dispute.auditNotes.length > 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" mb={2}>Investigation Notes</Typography>
                  <Stack spacing={1}>
                    {dispute.auditNotes.map((note, index) => (
                      <Alert key={index} severity="info" sx={{ mb: 1 }}>
                        {note}
                      </Alert>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Box>

        {/* Resolution Actions */}
        {dispute.status !== 'resolved' && (
          <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
            <Stack spacing={2}>
              {!showSplitForm && !showAdjustForm ? (
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<User />}
                    onClick={() => onApproveAgentClaim(dispute)}
                  >
                    Approve Agent Claim
                  </Button>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<User />}
                    onClick={() => onApproveUserClaim(dispute)}
                  >
                    Approve User Claim
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<DollarSign />}
                    onClick={() => setShowSplitForm(true)}
                  >
                    Split Resolution
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Scale />}
                    onClick={() => setShowAdjustForm(true)}
                  >
                    Adjust Payout
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<FileText />}
                    onClick={() => onDismissDispute(dispute)}
                  >
                    Dismiss Dispute
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Shield />}
                    onClick={() => onEscalateToCompliance(dispute)}
                  >
                    Escalate to Compliance
                  </Button>
                </Stack>
              ) : showSplitForm ? (
                <Stack spacing={2}>
                  <Typography variant="h6">Split Resolution</Typography>
                  <TextField
                    label="User Amount (₦)"
                    type="number"
                    value={userAmount}
                    onChange={(e) => setUserAmount(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Agent Amount (₦)"
                    type="number"
                    value={agentAmount}
                    onChange={(e) => setAgentAmount(e.target.value)}
                    fullWidth
                  />
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      onClick={handleSplitResolution}
                      disabled={!userAmount || !agentAmount}
                    >
                      Apply Split
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setShowSplitForm(false);
                        setUserAmount('');
                        setAgentAmount('');
                      }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <Stack spacing={2}>
                  <Typography variant="h6">Adjust Payout</Typography>
                  <TextField
                    label="New Amount (₦)"
                    type="number"
                    value={adjustAmount}
                    onChange={(e) => setAdjustAmount(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Reason for Adjustment"
                    multiline
                    rows={3}
                    value={adjustReason}
                    onChange={(e) => setAdjustReason(e.target.value)}
                    fullWidth
                  />
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      onClick={handleAdjustPayout}
                      disabled={!adjustAmount || !adjustReason}
                    >
                      Apply Adjustment
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setShowAdjustForm(false);
                        setAdjustAmount('');
                        setAdjustReason('');
                      }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default DisputeDetailDrawer;
