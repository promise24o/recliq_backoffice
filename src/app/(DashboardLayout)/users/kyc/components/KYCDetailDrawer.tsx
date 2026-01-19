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

interface KYCUser {
  id: string;
  name: string;
  phone: string;
  city: string;
  zone: string;
  type: 'individual' | 'enterprise';
  kycStatus: 'not_started' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'expired';
  submittedOn: string;
  reviewedOn?: string;
  reviewer?: string;
  documents: {
    governmentId: string;
    selfie: string;
    proofOfAddress?: string;
  };
  rejectionReason?: string;
}

interface KYCDetailDrawerProps {
  user: KYCUser | null;
  open: boolean;
  onClose: () => void;
  onKYCAction: (action: string, user: KYCUser, reason?: string) => void;
}

const KYCDetailDrawer: React.FC<KYCDetailDrawerProps> = ({
  user,
  open,
  onClose,
  onKYCAction
}) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case 'not_started': return 'info';
      case 'submitted': return 'warning';
      case 'under_review': return 'info';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'expired': return 'error';
      default: return 'default';
    }
  };

  const getKYCStatusIcon = (status: string) => {
    switch (status) {
      case 'not_started': return <IconClock size={16} />;
      case 'submitted': return <IconSend size={16} />;
      case 'under_review': return <IconSearch size={16} />;
      case 'approved': return <IconCheck size={16} />;
      case 'rejected': return <IconX size={16} />;
      case 'expired': return <IconAlertTriangle size={16} />;
      default: return <IconAlertTriangle size={16} />;
    }
  };

  const getKYCStatusLabel = (status: string) => {
    switch (status) {
      case 'not_started': return 'Not Started';
      case 'submitted': return 'Submitted';
      case 'under_review': return 'Under Review';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'expired': return 'Expired';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  const handleApprove = () => {
    if (user) {
      onKYCAction('approve', user);
    }
  };

  const handleReject = () => {
    if (user && rejectionReason.trim()) {
      onKYCAction('reject', user, rejectionReason);
      setShowRejectForm(false);
      setRejectionReason('');
    }
  };

  const handleRequestResubmission = () => {
    if (user) {
      onKYCAction('request_resubmission', user);
    }
  };

  const handleDocumentView = (docType: string, docUrl: string) => {
    // Log document access for security
    console.log(`Document viewed: ${docType} for user ${user?.id}`);
    // In production, this would open a secure viewer
  };

  if (!user || !open) return null;

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Drawer Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
            {user.type === 'enterprise' ? <IconBuilding size={24} /> : <IconUserCircle size={24} />}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.id}
            </Typography>
            <Chip
              icon={getKYCStatusIcon(user.kycStatus)}
              label={getKYCStatusLabel(user.kycStatus)}
              color={getKYCStatusColor(user.kycStatus) as any}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Stack>
      </Box>

      {/* Security Alert */}
      <Box sx={{ p: 3, bgcolor: 'warning.light' }}>
        <Alert severity="warning" icon={<IconAlertTriangle size={16} />}>
          <Typography variant="body2" fontWeight={600}>
            🔒 Secure Document Review
          </Typography>
          <Typography variant="caption">
            All document views are logged and access is restricted by role. Handle sensitive data with care.
          </Typography>
        </Alert>
      </Box>

      {/* User Overview */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          User Overview
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Phone</Typography>
            <Typography variant="body2">{user.phone}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">City / Zone</Typography>
            <Typography variant="body2">{user.city}, {user.zone}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">User Type</Typography>
            <Typography variant="body2">
              {user.type === 'enterprise' ? 'Enterprise' : 'Individual'}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Submitted On</Typography>
            <Typography variant="body2">{formatDateTime(user.submittedOn)}</Typography>
          </Stack>
          {user.reviewedOn && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">Reviewed On</Typography>
              <Typography variant="body2">{formatDateTime(user.reviewedOn)}</Typography>
            </Stack>
          )}
          {user.reviewer && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">Reviewer</Typography>
              <Typography variant="body2">{user.reviewer}</Typography>
            </Stack>
          )}
        </Stack>
      </Box>

      <Divider />

      {/* Submitted Documents */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Submitted Documents
        </Typography>
        <Stack spacing={2}>
          {/* Government ID */}
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Government ID
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.documents.governmentId ? 'Available' : 'Not submitted'}
                  </Typography>
                </Box>
                {user.documents.governmentId && (
                  <Stack direction="row" spacing={1}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDocumentView('government_id', user.documents.governmentId)}
                    >
                      <IconEye size={16} />
                    </IconButton>
                    <IconButton size="small">
                      <IconDownload size={16} />
                    </IconButton>
                  </Stack>
                )}
              </Stack>
            </CardContent>
          </Card>

          {/* Selfie */}
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Selfie / Liveness Proof
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.documents.selfie ? 'Available' : 'Not submitted'}
                  </Typography>
                </Box>
                {user.documents.selfie && (
                  <Stack direction="row" spacing={1}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDocumentView('selfie', user.documents.selfie)}
                    >
                      <IconEye size={16} />
                    </IconButton>
                    <IconButton size="small">
                      <IconDownload size={16} />
                    </IconButton>
                  </Stack>
                )}
              </Stack>
            </CardContent>
          </Card>

          {/* Proof of Address */}
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Proof of Address
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.documents.proofOfAddress ? 'Available' : 'Not required/Not submitted'}
                  </Typography>
                </Box>
                {user.documents.proofOfAddress && (
                  <Stack direction="row" spacing={1}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDocumentView('proof_of_address', user.documents.proofOfAddress || '')}
                    >
                      <IconEye size={16} />
                    </IconButton>
                    <IconButton size="small">
                      <IconDownload size={16} />
                    </IconButton>
                  </Stack>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {/* Previous Rejection Reason */}
      {user.rejectionReason && (
        <>
          <Divider />
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Previous Rejection Reason
            </Typography>
            <Alert severity="error">
              <Typography variant="body2">{user.rejectionReason}</Typography>
            </Alert>
          </Box>
        </>
      )}

      {/* Review Actions */}
      <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Review Actions
        </Typography>
        
        {showRejectForm ? (
          <Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Rejection Reason (Required)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please provide a clear reason for rejection..."
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="error"
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                startIcon={<IconX size={16} />}
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
          </Box>
        ) : (
          <Stack spacing={2}>
            {user.kycStatus === 'submitted' || user.kycStatus === 'under_review' ? (
              <>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<IconCheck size={16} />}
                  onClick={handleApprove}
                >
                  Approve KYC
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<IconX size={16} />}
                  onClick={() => setShowRejectForm(true)}
                >
                  Reject KYC
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<IconRefresh size={16} />}
                  onClick={handleRequestResubmission}
                >
                  Request Resubmission
                </Button>
              </>
            ) : user.kycStatus === 'rejected' ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<IconRefresh size={16} />}
                onClick={handleRequestResubmission}
              >
                Allow Resubmission
              </Button>
            ) : null}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default KYCDetailDrawer;
