'use client'
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  Avatar,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import {
  IconUser,
  IconMapPin,
  IconCalendar,
  IconCheck,
  IconX,
  IconBan,
  IconClock,
  IconEye,
  IconFileText,
  IconNotes,
  IconHistory,
  IconShield,
  IconAlertTriangle,
  IconFlag,
  IconX as IconClose,
} from '@tabler/icons-react';

interface KYCDocument {
  id: string;
  type: 'government_id' | 'address_proof' | 'company_registration' | 'vehicle_details' | 'agent_photo';
  status: 'valid' | 'expired' | 'rejected' | 'pending';
  uploadedDate: string;
  reviewerNotes?: string;
  url: string;
}

interface Agent {
  id: string;
  name: string;
  type: 'individual' | 'company' | 'fleet';
  city: string;
  zone: string;
  signupDate: string;
  kycStatus: 'pending' | 'under_review' | 'verified' | 'rejected' | 'suspended';
  submittedDocs: number;
  lastReviewDate?: string;
  riskFlag: 'low' | 'medium' | 'high';
  documents: KYCDocument[];
  verificationTimeline: {
    signup: string;
    documentSubmission?: string;
    reviewStart?: string;
    approval?: string;
    rejection?: string;
    suspension?: string;
  };
  riskHistory: {
    disputes: number;
    missedPickups: number;
    complaints: number;
    priorRejections: number;
  };
  notes?: string;
}

interface VerificationDetailDrawerProps {
  agent: Agent | null;
  open: boolean;
  onClose: () => void;
  onAgentAction: (action: string, agent: Agent, reason?: string) => void;
}

const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'valid':
        return { color: 'success', icon: <IconCheck size={14} />, label: 'Valid' };
      case 'expired':
        return { color: 'warning', icon: <IconClock size={14} />, label: 'Expired' };
      case 'rejected':
        return { color: 'error', icon: <IconX size={14} />, label: 'Rejected' };
      case 'pending':
        return { color: 'info', icon: <IconEye size={14} />, label: 'Pending' };
      default:
        return { color: 'default', icon: <IconClock size={14} />, label: status };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      color={config.color as any}
      icon={config.icon}
      label={config.label}
      size="small"
      variant="outlined"
    />
  );
};

const RiskChip: React.FC<{ risk: string }> = ({ risk }) => {
  const getRiskConfig = (risk: string) => {
    switch (risk) {
      case 'low':
        return { color: 'success', icon: <IconShield size={14} /> };
      case 'medium':
        return { color: 'warning', icon: <IconAlertTriangle size={14} /> };
      case 'high':
        return { color: 'error', icon: <IconFlag size={14} /> };
      default:
        return { color: 'default', icon: <IconShield size={14} /> };
    }
  };

  const config = getRiskConfig(risk);

  return (
    <Chip
      color={config.color as any}
      icon={config.icon}
      label={risk.charAt(0).toUpperCase() + risk.slice(1) + ' Risk'}
      size="small"
      variant="filled"
    />
  );
};

const VerificationDetailDrawer: React.FC<VerificationDetailDrawerProps> = ({
  agent,
  open,
  onClose,
  onAgentAction
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    action: string;
    title: string;
    description: string;
  }>({
    open: false,
    action: '',
    title: '',
    description: ''
  });
  const [actionReason, setActionReason] = useState('');

  if (!agent) return null;

  const handleAction = (action: string) => {
    if (action === 'reject' || action === 'suspend') {
      setActionDialog({
        open: true,
        action,
        title: `Confirm ${action}`,
        description: `Please provide a reason for ${action}ing ${agent.name}`
      });
    } else if (action === 'add_note') {
      setActionDialog({
        open: true,
        action,
        title: 'Add Compliance Note',
        description: `Add a note for ${agent.name}`
      });
    } else {
      onAgentAction(action, agent);
    }
  };

  const handleActionConfirm = () => {
    onAgentAction(actionDialog.action, agent, actionReason);
    setActionDialog({ open: false, action: '', title: '', description: '' });
    setActionReason('');
    onClose();
  };

  const getTimelineIcon = (stage: string) => {
    switch (stage) {
      case 'signup': return <IconUser size={20} />;
      case 'documentSubmission': return <IconFileText size={20} />;
      case 'reviewStart': return <IconEye size={20} />;
      case 'approval': return <IconCheck size={20} />;
      case 'rejection': return <IconX size={20} />;
      case 'suspension': return <IconBan size={20} />;
      default: return <IconClock size={20} />;
    }
  };

  const getTimelineLabel = (stage: string) => {
    switch (stage) {
      case 'signup': return 'Agent Signup';
      case 'documentSubmission': return 'Documents Submitted';
      case 'reviewStart': return 'Review Started';
      case 'approval': return 'Approved';
      case 'rejection': return 'Rejected';
      case 'suspension': return 'Suspended';
      default: return stage;
    }
  };

  return (
    <>
      <Box sx={{ width: 600, height: '100%', overflow: 'auto' }}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {agent.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {agent.id} • {agent.type.charAt(0).toUpperCase() + agent.type.slice(1)}
              </Typography>
            </Box>
            <IconButton onClick={onClose}>
              <IconClose size={20} />
            </IconButton>
          </Stack>
        </Box>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 3 }}>
          <Tab label="Overview" />
          <Tab label="Documents" />
          <Tab label="Timeline" />
          <Tab label="Risk Analysis" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Agent Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      City / Zone
                    </Typography>
                    <Typography variant="body1">
                      {agent.city}, {agent.zone}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Signup Date
                    </Typography>
                    <Typography variant="body1">
                      {agent.signupDate}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Box mt={1}>
                      <StatusChip status={agent.kycStatus} />
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Risk Level
                    </Typography>
                    <Box mt={1}>
                      <RiskChip risk={agent.riskFlag} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {agent.notes && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Notes
                  </Typography>
                  <Typography variant="body2">
                    {agent.notes}
                  </Typography>
                </Box>
              )}

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Actions
                </Typography>
                <Stack direction="row" spacing={2}>
                  {agent.kycStatus === 'pending' && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<IconCheck size={16} />}
                        onClick={() => handleAction('approve')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<IconX size={16} />}
                        onClick={() => handleAction('reject')}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {agent.kycStatus === 'verified' && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<IconBan size={16} />}
                      onClick={() => handleAction('suspend')}
                    >
                      Suspend
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    startIcon={<IconNotes size={16} />}
                    onClick={() => handleAction('add_note')}
                  >
                    Add Note
                  </Button>
                </Stack>
              </Box>
            </Stack>
          )}

          {activeTab === 1 && (
            <Stack spacing={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Submitted Documents ({agent.submittedDocs})
              </Typography>
              {agent.documents.map((doc) => (
                <Card key={doc.id} variant="outlined">
                  <CardContent sx={{ py: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {doc.type.replace('_', ' ').charAt(0).toUpperCase() + doc.type.replace('_', ' ').slice(1)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Uploaded: {doc.uploadedDate}
                        </Typography>
                        {doc.reviewerNotes && (
                          <Typography variant="caption" color="error" display="block">
                            {doc.reviewerNotes}
                          </Typography>
                        )}
                      </Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <StatusChip status={doc.status} />
                        <IconButton size="small">
                          <IconEye size={16} />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}

          {activeTab === 2 && (
            <Stack spacing={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Verification Timeline
              </Typography>
              <List>
                {Object.entries(agent.verificationTimeline).map(([key, value]) => {
                  if (!value) return null;
                  return (
                    <ListItem key={key}>
                      <ListItemIcon>
                        {getTimelineIcon(key)}
                      </ListItemIcon>
                      <ListItemText
                        primary={getTimelineLabel(key)}
                        secondary={value}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Stack>
          )}

          {activeTab === 3 && (
            <Stack spacing={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Risk & History Analysis
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Disputes
                  </Typography>
                  <Typography variant="h6" color="error.main">
                    {agent.riskHistory.disputes}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Missed Pickups
                  </Typography>
                  <Typography variant="h6" color="warning.main">
                    {agent.riskHistory.missedPickups}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Complaints
                  </Typography>
                  <Typography variant="h6" color="error.main">
                    {agent.riskHistory.complaints}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Prior Rejections
                  </Typography>
                  <Typography variant="h6" color="warning.main">
                    {agent.riskHistory.priorRejections}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          )}
        </Box>
      </Box>

      {/* Action Dialog */}
      <Dialog open={actionDialog.open} onClose={() => setActionDialog({ ...actionDialog, open: false })} maxWidth="sm" fullWidth>
        <DialogTitle>{actionDialog.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {actionDialog.description}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Reason"
            value={actionReason}
            onChange={(e) => setActionReason(e.target.value)}
            placeholder="Please provide a detailed reason..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialog({ ...actionDialog, open: false })}>
            Cancel
          </Button>
          <Button 
            onClick={handleActionConfirm} 
            variant="contained"
            disabled={!actionReason.trim()}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VerificationDetailDrawer;
