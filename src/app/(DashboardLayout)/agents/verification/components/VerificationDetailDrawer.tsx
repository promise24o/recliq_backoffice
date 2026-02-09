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
  Alert,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  IconBuilding,
  IconUserCircle,
  IconCheck,
  IconX,
  IconRefresh,
  IconEye,
  IconDownload,
  IconAlertTriangle,
  IconClock,
  IconSend,
  IconSearch,
} from '@tabler/icons-react';

interface Agent {
  id: string;
  name: string;
  phone: string;
  city: string;
  zone: string;
  type: 'individual' | 'company' | 'fleet';
  kycStatus: 'pending' | 'under_review' | 'verified' | 'rejected' | 'suspended';
  submittedOn: string;
  reviewedOn?: string;
  reviewer?: string;
  documents: {
    governmentId: string;
    agentPhoto: string;
    proofOfAddress?: string;
  };
  rejectionReason?: string;
}

interface VerificationDetailDrawerProps {
  agent: Agent | null;
  open: boolean;
  onClose: () => void;
}

const VerificationDetailDrawer: React.FC<VerificationDetailDrawerProps> = ({
  agent,
  open,
  onClose
}) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'under_review': return 'info';
      case 'verified': return 'success';
      case 'rejected': return 'error';
      case 'suspended': return 'error';
      default: return 'default';
    }
  };

  const getKYCStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <IconClock size={16} />;
      case 'under_review': return <IconSearch size={16} />;
      case 'verified': return <IconCheck size={16} />;
      case 'rejected': return <IconX size={16} />;
      case 'suspended': return <IconAlertTriangle size={16} />;
      default: return <IconAlertTriangle size={16} />;
    }
  };

  const getKYCStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'under_review': return 'Under Review';
      case 'verified': return 'Verified';
      case 'rejected': return 'Rejected';
      case 'suspended': return 'Suspended';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  if (!agent) return null;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            {agent.type === 'company' ? <IconBuilding size={32} /> : <IconUserCircle size={32} />}
          </Avatar>
          <Box flex={1}>
            <Typography variant="h6" fontWeight={600}>
              {agent.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {agent.id}
            </Typography>
            <Chip
              icon={getKYCStatusIcon(agent.kycStatus)}
              label={getKYCStatusLabel(agent.kycStatus)}
              color={getKYCStatusColor(agent.kycStatus) as any}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
          <IconButton onClick={onClose}>
            <IconX size={20} />
          </IconButton>
        </Stack>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
        {/* Agent Information */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Agent Information
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Agent Type
                </Typography>
                <Typography variant="body1">
                  {agent.type === 'company' ? 'Company' : agent.type === 'fleet' ? 'Fleet' : 'Individual'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Phone Number
                </Typography>
                <Typography variant="body1">
                  {agent.phone}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body1">
                  {agent.city}, {agent.zone}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* KYC Information */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Verification Information
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Submitted On
                </Typography>
                <Typography variant="body1">
                  {formatDate(agent.submittedOn)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Reviewed On
                </Typography>
                <Typography variant="body1">
                  {formatDate(agent.reviewedOn || '')}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Reviewed By
                </Typography>
                <Typography variant="body1">
                  {agent.reviewer || '-'}
                </Typography>
              </Box>
              {agent.rejectionReason && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Rejection Reason
                  </Typography>
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {agent.rejectionReason}
                  </Alert>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Documents
            </Typography>
            <Stack spacing={2}>
              {agent.documents.governmentId && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Government ID
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<IconEye size={16} />}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<IconDownload size={16} />}
                    >
                      Download
                    </Button>
                  </Stack>
                </Box>
              )}
              {agent.documents.agentPhoto && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Agent Photo
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<IconEye size={16} />}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<IconDownload size={16} />}
                    >
                      Download
                    </Button>
                  </Stack>
                </Box>
              )}
              {agent.documents.proofOfAddress && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Proof of Address
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<IconEye size={16} />}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<IconDownload size={16} />}
                    >
                      Download
                    </Button>
                  </Stack>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Reject Form */}
        {showRejectForm && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rejection Reason
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Enter reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    // Handle rejection
                    setShowRejectForm(false);
                    setRejectionReason('');
                  }}
                >
                  Reject KYC
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowRejectForm(false);
                    setRejectionReason('');
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Actions */}
      <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={2}>
          {(agent.kycStatus === 'pending' || agent.kycStatus === 'under_review') && (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={<IconCheck size={16} />}
                fullWidth
              >
                Approve Verification
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<IconX size={16} />}
                onClick={() => setShowRejectForm(true)}
                fullWidth
              >
                Reject Verification
              </Button>
            </>
          )}
          {agent.kycStatus === 'verified' && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<IconX size={16} />}
              fullWidth
            >
              Suspend Agent
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<IconRefresh size={16} />}
            fullWidth
          >
            Refresh Data
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default VerificationDetailDrawer;
