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
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  IconBuilding,
  IconUserCircle,
  IconCheck,
  IconX,
  IconEye,
  IconDownload,
  IconAlertTriangle,
  IconBriefcase,
  IconCircleCheck,
  IconCircleX,
} from '@tabler/icons-react';
import { useKYCRecord, useKYCApprove, useKYCReject, type KYCRecord } from '@/hooks/useKYC';
import { KYCDetailCardSkeleton, KYCChecklistSkeleton } from './KYCSkeletonLoader';

interface KYCDetailDrawerProps {
  record: KYCRecord | null;
  open: boolean;
  onClose: () => void;
}

const KYCDetailDrawer: React.FC<KYCDetailDrawerProps> = ({
  record,
  open,
  onClose,
}) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const { data: detailedRecord, isLoading } = useKYCRecord(record?.userId || '');
  const approveMutation = useKYCApprove();
  const rejectMutation = useKYCReject();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED': return 'success';
      case 'PENDING': return 'warning';
      case 'IN_PROGRESS': return 'info';
      case 'REJECTED': return 'error';
      default: return 'default';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'SPROUT': return '#10B981';
      case 'BLOOM': return '#3B82F6';
      case 'THRIVE': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'INDIVIDUAL': return <IconUserCircle size={24} />;
      case 'ENTERPRISE': return <IconBuilding size={24} />;
      case 'AGENT': return <IconBriefcase size={24} />;
      default: return <IconUserCircle size={24} />;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const handleApprove = async () => {
    if (detailedRecord) {
      try {
        await approveMutation.mutateAsync(detailedRecord.userId);
        onClose();
      } catch (error) {
        console.error('Failed to approve KYC:', error);
      }
    }
  };

  const handleReject = async () => {
    if (detailedRecord && rejectionReason.trim()) {
      try {
        await rejectMutation.mutateAsync({
          userId: detailedRecord.userId,
          payload: { rejectionReason: rejectionReason.trim() }
        });
        setShowRejectForm(false);
        setRejectionReason('');
        onClose();
      } catch (error) {
        console.error('Failed to reject KYC:', error);
      }
    }
  };

  const handleDocumentView = (docUrl: string) => {
    window.open(docUrl, '_blank');
  };

  if (!record || !open) return null;

  if (isLoading) {
    return (
      <Box sx={{ height: '100%', overflow: 'auto', p: 3 }}>
        <KYCDetailCardSkeleton />
        <KYCChecklistSkeleton />
        <KYCDetailCardSkeleton />
      </Box>
    );
  }

  if (!detailedRecord) {
    return (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
        <Typography color="error">Failed to load KYC details</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Drawer Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
            {getUserTypeIcon(detailedRecord.userType)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {detailedRecord.userDetails?.name || `${detailedRecord.userType} User`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {detailedRecord.userDetails?.email || detailedRecord.userDetails?.phone || `ID: ${detailedRecord.userId}`}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip
                label={detailedRecord.status}
                color={getStatusColor(detailedRecord.status) as any}
                size="small"
              />
              <Chip
                label={detailedRecord.currentTier}
                size="small"
                sx={{
                  bgcolor: getTierColor(detailedRecord.currentTier) + '15',
                  color: getTierColor(detailedRecord.currentTier),
                  fontWeight: 600,
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Security Alert */}
      <Box sx={{ p: 2, bgcolor: 'warning.light' }}>
        <Alert severity="warning" icon={<IconAlertTriangle size={16} />}>
          <Typography variant="caption">
            🔒 All document views are logged. Handle sensitive data with care.
          </Typography>
        </Alert>
      </Box>

      {/* Verification Checklist */}
      {/* <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Verification Status
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              {detailedRecord.emailVerified ? <IconCircleCheck color="#10B981" /> : <IconCircleX color="#EF4444" />}
            </ListItemIcon>
            <ListItemText primary="Email Verified" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              {detailedRecord.bvnVerified ? <IconCircleCheck color="#10B981" /> : <IconCircleX color="#EF4444" />}
            </ListItemIcon>
            <ListItemText primary="BVN Verified" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              {detailedRecord.documentsUploaded ? <IconCircleCheck color="#10B981" /> : <IconCircleX color="#EF4444" />}
            </ListItemIcon>
            <ListItemText primary="Documents Uploaded" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              {detailedRecord.selfieUploaded ? <IconCircleCheck color="#10B981" /> : <IconCircleX color="#EF4444" />}
            </ListItemIcon>
            <ListItemText primary="Selfie Uploaded" />
          </ListItem>
          {detailedRecord.userType === 'ENTERPRISE' && (
            <>
              <ListItem>
                <ListItemIcon>
                  {detailedRecord.businessDocumentsUploaded ? <IconCircleCheck color="#10B981" /> : <IconCircleX color="#EF4444" />}
                </ListItemIcon>
                <ListItemText primary="Business Documents Uploaded" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {detailedRecord.businessDetailsSubmitted ? <IconCircleCheck color="#10B981" /> : <IconCircleX color="#EF4444" />}
                </ListItemIcon>
                <ListItemText primary="Business Details Submitted" />
              </ListItem>
            </>
          )}
        </List>
      </Box> */}

      <Divider />

      {/* Account Limits */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Account Limits
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Daily Withdrawal</Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatCurrency(detailedRecord.limits.dailyWithdrawal)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Max Wallet Balance</Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatCurrency(detailedRecord.limits.maxWalletBalance)}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      {/* BVN Data
      {detailedRecord.bvnData && (
        <>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              BVN Information
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">BVN</Typography>
                <Typography variant="body2">{detailedRecord.bvnData.bvn}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Full Name</Typography>
                <Typography variant="body2">
                  {detailedRecord.bvnData.firstName} {detailedRecord.bvnData.lastName}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
                <Typography variant="body2">{formatDate(detailedRecord.bvnData.dateOfBirth)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Phone Number</Typography>
                <Typography variant="body2">{detailedRecord.bvnData.phoneNumber}</Typography>
              </Stack>
            </Stack>
          </Box>
          <Divider />
        </>
      )} */}

      {/* Business Details */}
      {detailedRecord.businessDetails && (
        <>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Business Information
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Business Name</Typography>
                <Typography variant="body2">{detailedRecord.businessDetails.businessName}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Address</Typography>
                <Typography variant="body2" textAlign="right" sx={{ maxWidth: '60%' }}>
                  {detailedRecord.businessDetails.businessAddress}
                </Typography>
              </Stack>
              {detailedRecord.businessDetails.businessLocation && (
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Coordinates</Typography>
                  <Typography variant="body2">
                    {detailedRecord.businessDetails.businessLocation.latitude.toFixed(6)}, {detailedRecord.businessDetails.businessLocation.longitude.toFixed(6)}
                  </Typography>
                </Stack>
              )}
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Nature of Business</Typography>
                <Typography variant="body2">{detailedRecord.businessDetails.natureOfBusiness}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Description</Typography>
                <Typography variant="body2" textAlign="right" sx={{ maxWidth: '60%' }}>
                  {detailedRecord.businessDetails.businessDescription}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Email</Typography>
                <Typography variant="body2">{detailedRecord.businessDetails.businessEmail}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Phone</Typography>
                <Typography variant="body2">{detailedRecord.businessDetails.businessPhone}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Registration Number</Typography>
                <Typography variant="body2">{detailedRecord.businessDetails.registrationNumber}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">TIN</Typography>
                <Typography variant="body2">{detailedRecord.businessDetails.taxIdentificationNumber}</Typography>
              </Stack>
            </Stack>
          </Box>
          <Divider />
        </>
      )}

      {/* Selfie */}
      {detailedRecord.selfie && detailedRecord.selfie.selfieUrl && (
        <>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Selfie / Liveness Proof
            </Typography>
            <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      Selfie Image
                    </Typography>
                    {detailedRecord.selfie.uploadedAt && (
                      <Typography variant="caption" color="text.secondary">
                        Uploaded: {formatDateTime(detailedRecord.selfie.uploadedAt)}
                      </Typography>
                    )}
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDocumentView(detailedRecord.selfie!.selfieUrl!)}
                    >
                      <IconEye size={16} />
                    </IconButton>
                    <IconButton 
                      size="small"
                      component="a"
                      href={detailedRecord.selfie.selfieUrl}
                      download
                    >
                      <IconDownload size={16} />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>
          <Divider />
        </>
      )}

      {/* Documents */}
      {detailedRecord.documents && detailedRecord.documents.length > 0 && (
        <>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Identity Documents
            </Typography>
            <Stack spacing={2}>
              {detailedRecord.documents.map((doc, index) => (
                <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {doc.documentType.replace(/_/g, ' ').toUpperCase()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Uploaded: {formatDateTime(doc.uploadedAt)}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleDocumentView(doc.documentUrl)}
                        >
                          <IconEye size={16} />
                        </IconButton>
                        <IconButton 
                          size="small"
                          component="a"
                          href={doc.documentUrl}
                          download
                        >
                          <IconDownload size={16} />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
          <Divider />
        </>
      )}

      {/* Business Documents */}
      {detailedRecord.businessDocuments && detailedRecord.businessDocuments.length > 0 && (
        <>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Business Documents
            </Typography>
            <Stack spacing={2}>
              {detailedRecord.businessDocuments.map((doc, index) => (
                <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {doc.documentType.replace(/_/g, ' ').toUpperCase()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Uploaded: {formatDateTime(doc.uploadedAt)}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleDocumentView(doc.documentUrl)}
                        >
                          <IconEye size={16} />
                        </IconButton>
                        <IconButton 
                          size="small"
                          component="a"
                          href={doc.documentUrl}
                          download
                        >
                          <IconDownload size={16} />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
          <Divider />
        </>
      )}

      {/* Missing Requirements */}
      {/* {detailedRecord.missingRequirements && detailedRecord.missingRequirements.length > 0 && (
        <>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Missing Requirements
            </Typography>
            <Alert severity="warning">
              <Typography variant="body2" fontWeight={600} gutterBottom>
                The following items are required for approval:
              </Typography>
              <List dense>
                {detailedRecord.missingRequirements.map((req, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`• ${req}`} />
                  </ListItem>
                ))}
              </List>
            </Alert>
          </Box>
          <Divider />
        </>
      )} */}

      {/* Rejection Reason */}
      {detailedRecord.rejectionReason && (
        <>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Rejection Reason
            </Typography>
            <Alert severity="error">
              <Typography variant="body2">{detailedRecord.rejectionReason}</Typography>
            </Alert>
          </Box>
          <Divider />
        </>
      )}

      {/* Timestamps */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Timeline
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Created</Typography>
            <Typography variant="body2">{formatDateTime(detailedRecord.createdAt)}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Last Updated</Typography>
            <Typography variant="body2">{formatDateTime(detailedRecord.updatedAt)}</Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Review Actions */}
      {(detailedRecord.status === 'PENDING' || detailedRecord.status === 'IN_PROGRESS') && (
        <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
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
                  disabled={!rejectionReason.trim() || rejectMutation.isPending}
                  startIcon={<IconX size={16} />}
                >
                  {rejectMutation.isPending ? 'Rejecting...' : 'Reject KYC'}
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
              <Button
                variant="contained"
                color="success"
                startIcon={<IconCheck size={16} />}
                onClick={handleApprove}
                disabled={approveMutation.isPending}
                fullWidth
              >
                {approveMutation.isPending ? 'Approving...' : 'Approve KYC'}
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<IconX size={16} />}
                onClick={() => setShowRejectForm(true)}
                fullWidth
              >
                Reject KYC
              </Button>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
};

export default KYCDetailDrawer;
