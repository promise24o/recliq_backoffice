'use client';
import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  Typography, 
  Stack, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Chip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
  Alert,
  LinearProgress
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { 
  X, 
  Edit, 
  Save, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Target,
  Users,
  Zap,
  Award,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  Shield
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { Referral, ReferralStatus, ReferrerType, ActionType, RewardType, AbuseFlag } from '../types';
import { getReferralStatusColor, getReferrerTypeColor, getAbuseFlagColor, formatDuration, formatCurrency } from '../mockData';

interface ReferralDetailDrawerProps {
  referral: Referral | null;
  open: boolean;
  onClose: () => void;
  onSave: (referral: Referral) => void;
  onApproveReward: (referral: Referral) => void;
  onRevokeReward: (referral: Referral) => void;
  onFlagAbuse: (referral: Referral) => void;
  onClearFlag: (referral: Referral) => void;
}

const ReferralDetailDrawer: React.FC<ReferralDetailDrawerProps> = ({
  referral,
  open,
  onClose,
  onSave,
  onApproveReward,
  onRevokeReward,
  onFlagAbuse,
  onClearFlag
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReferral, setEditedReferral] = useState<Referral | null>(null);

  React.useEffect(() => {
    if (referral) {
      setEditedReferral({ ...referral });
    }
  }, [referral]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedReferral) {
      onSave(editedReferral);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedReferral(referral);
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof Referral, value: any) => {
    if (editedReferral) {
      setEditedReferral({ ...editedReferral, [field]: value });
    }
  };

  const getStatusLabel = (status: ReferralStatus): string => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'signed_up': return 'Signed Up';
      case 'activated': return 'Activated';
      case 'rewarded': return 'Rewarded';
      case 'flagged': return 'Flagged';
      case 'revoked': return 'Revoked';
      default: return status;
    }
  };

  const getReferrerTypeLabel = (type: ReferrerType): string => {
    switch (type) {
      case 'user': return 'User';
      case 'agent': return 'Agent';
      case 'business': return 'Business';
      default: return type;
    }
  };

  const getActionTypeLabel = (type: ActionType): string => {
    switch (type) {
      case 'pickup': return 'Pickup';
      case 'dropoff': return 'Dropoff';
      case 'both': return 'Both';
      default: return type;
    }
  };

  const getRewardTypeLabel = (type: RewardType): string => {
    switch (type) {
      case 'points': return 'Points';
      case 'bonus': return 'Bonus';
      case 'cash': return 'Cash';
      case 'perk': return 'Perk';
      default: return type;
    }
  };

  const getAbuseFlagLabel = (flag: AbuseFlag): string => {
    switch (flag) {
      case 'shared_device': return 'Shared Device';
      case 'rapid_self_referral': return 'Rapid Self-Referral';
      case 'pattern_anomaly': return 'Pattern Anomaly';
      case 'location_anomaly': return 'Location Anomaly';
      case 'duplicate_signup': return 'Duplicate Signup';
      default: return flag;
    }
  };

  if (!referral || !editedReferral) return null;

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
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          p: 3, 
          borderBottom: 1, 
          borderColor: 'divider',
          bgcolor: '#f8fafc'
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight="600">
                Referral Details
              </Typography>
              <Stack direction="row" spacing={1} mt={0.5}>
                <Chip
                  label={getStatusLabel(editedReferral.status)}
                  size="small"
                  sx={{
                    bgcolor: `${getReferralStatusColor(editedReferral.status)}15`,
                    color: getReferralStatusColor(editedReferral.status),
                    fontSize: '0.75rem'
                  }}
                />
                <Chip
                  label={getReferrerTypeLabel(editedReferral.referrerType)}
                  size="small"
                  sx={{
                    bgcolor: `${getReferrerTypeColor(editedReferral.referrerType)}15`,
                    color: getReferrerTypeColor(editedReferral.referrerType),
                    fontSize: '0.75rem'
                  }}
                />
              </Stack>
            </Box>

            <Stack direction="row" spacing={1}>
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<X />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <IconButton onClick={handleEdit}>
                    <Edit size={20} />
                  </IconButton>
                </>
              )}
              <IconButton onClick={onClose}>
                <X size={20} />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <Stack spacing={3}>
            {/* Referral Overview */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Referral Overview
                </Typography>
                
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Referral Code
                    </Typography>
                    <Typography variant="body2" fontFamily="monospace" fontWeight="500">
                      {editedReferral.referralCode}
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Status
                        </Typography>
                        <Chip
                          label={getStatusLabel(editedReferral.status)}
                          size="small"
                          sx={{
                            bgcolor: `${getReferralStatusColor(editedReferral.status)}15`,
                            color: getReferralStatusColor(editedReferral.status),
                            fontSize: '0.75rem'
                          }}
                        />
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Referrer Type
                        </Typography>
                        <Chip
                          label={getReferrerTypeLabel(editedReferral.referrerType)}
                          size="small"
                          sx={{
                            bgcolor: `${getReferrerTypeColor(editedReferral.referrerType)}15`,
                            color: getReferrerTypeColor(editedReferral.referrerType),
                            fontSize: '0.75rem'
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Invite Sent
                        </Typography>
                        <Typography variant="body2">
                          {new Date(editedReferral.inviteSentAt).toLocaleDateString()} {new Date(editedReferral.inviteSentAt).toLocaleTimeString()}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Time to Activation
                        </Typography>
                        <Typography variant="body2">
                          {editedReferral.conversionMetrics ? formatDuration(editedReferral.conversionMetrics.timeToActivation) : 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>

            {/* Referrer Profile */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Referrer Profile
                </Typography>
                
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Name
                    </Typography>
                    <Typography variant="body2" fontWeight="500">
                      {editedReferral.referrerName}
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Mail size={16} color="#6b7280" />
                        <Typography variant="body2">
                          {editedReferral.referrerEmail}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Phone size={16} color="#6b7280" />
                        <Typography variant="body2">
                          {editedReferral.referrerPhone}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <MapPin size={16} color="#6b7280" />
                        <Typography variant="body2">
                          {editedReferral.referrerCity}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <MapPin size={16} color="#6b7280" />
                        <Typography variant="body2">
                          {editedReferral.referrerZone}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>

            {/* Invited User Profile */}
            {editedReferral.invitedUserName && (
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Invited User Profile
                  </Typography>
                  
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Name
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        {editedReferral.invitedUserName}
                      </Typography>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Mail size={16} color="#6b7280" />
                          <Typography variant="body2">
                            {editedReferral.invitedUserEmail}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Phone size={16} color="#6b7280" />
                          <Typography variant="body2">
                            {editedReferral.invitedUserPhone}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <MapPin size={16} color="#6b7280" />
                          <Typography variant="body2">
                            {editedReferral.invitedUserCity}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <MapPin size={16} color="#6b7280" />
                          <Typography variant="body2">
                            {editedReferral.invitedUserZone}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>
            )}

            {/* Activation Evidence */}
            {editedReferral.activatedAt && (
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Activation Evidence
                  </Typography>
                  
                  <Stack spacing={2}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary" mb={1}>
                            First Action Type
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {editedReferral.firstActionType ? getActionTypeLabel(editedReferral.firstActionType) : 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary" mb={1}>
                            First Action Weight
                          </Typography>
                          <Typography variant="body2" fontWeight="500">
                            {editedReferral.firstActionWeight ? `${editedReferral.firstActionWeight.toFixed(1)}kg` : 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary" mb={1}>
                            First Action Date
                          </Typography>
                          <Typography variant="body2">
                            {editedReferral.activatedAt ? new Date(editedReferral.activatedAt).toLocaleDateString() : 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary" mb={1}>
                            Transaction ID
                          </Typography>
                          <Typography variant="body2" fontFamily="monospace">
                            {editedReferral.firstActionId || 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>
            )}

            {/* Rewards */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Rewards
                </Typography>
                
                <Stack spacing={2}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Reward Type
                        </Typography>
                        <Typography variant="body2" fontWeight="500">
                          {editedReferral.rewardType ? getRewardTypeLabel(editedReferral.rewardType) : 'No reward'}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Reward Amount
                        </Typography>
                        <Typography variant="body2" fontWeight="500">
                          {editedReferral.rewardIssued ? formatCurrency(editedReferral.rewardIssued) : 'No reward'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Reward Date
                    </Typography>
                    <Typography variant="body2">
                      {editedReferral.rewardedAt ? new Date(editedReferral.rewardedAt).toLocaleDateString() : 'Not rewarded'}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Abuse Signals */}
            {editedReferral.abuseFlags && editedReferral.abuseFlags.length > 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Abuse Signals
                  </Typography>
                  
                  <Stack spacing={2}>
                    {editedReferral.abuseFlags.map((flag, index) => (
                      <Box key={index} sx={{ 
                        p: 2, 
                        bgcolor: '#fef2f2', 
                        borderRadius: 2,
                        border: '1px solid #fecaca'
                      }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <AlertTriangle size={20} color="#ef4444" />
                          <Box flex={1}>
                            <Typography variant="body2" fontWeight="500">
                              {getAbuseFlagLabel(flag)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Flagged for suspicious activity pattern
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            )}

            {/* Audit Trail */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown />}>
                <Typography variant="h6">Audit Trail</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {editedReferral.auditTrail.map((entry) => (
                    <Box key={entry.id} sx={{ 
                      p: 2, 
                      bgcolor: '#f8fafc', 
                      borderRadius: 2,
                      border: '1px solid #e2e8f0'
                    }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="body2" fontWeight="500">
                            {entry.action.replace('_', ' ').toUpperCase()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            by {entry.performedBy}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString()}
                          </Typography>
                        </Box>
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {entry.details}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Box>

        {/* Actions */}
        <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Stack direction="row" spacing={2}>
            {editedReferral.status === 'activated' && (
              <Button
                variant="contained"
                startIcon={<CheckCircle />}
                onClick={() => onApproveReward(editedReferral)}
                sx={{ bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}
              >
                Approve Reward
              </Button>
            )}
            
            {editedReferral.status === 'rewarded' && (
              <Button
                variant="outlined"
                startIcon={<X />}
                onClick={() => onRevokeReward(editedReferral)}
                sx={{ color: '#f59e0b', borderColor: '#f59e0b', '&:hover': { borderColor: '#d97706' } }}
              >
                Revoke Reward
              </Button>
            )}
            
            {editedReferral.status !== 'flagged' && (
              <Button
                variant="outlined"
                startIcon={<AlertTriangle />}
                onClick={() => onFlagAbuse(editedReferral)}
                sx={{ color: '#ef4444', borderColor: '#ef4444', '&:hover': { borderColor: '#dc2626' } }}
              >
                Flag Abuse
              </Button>
            )}
            
            {editedReferral.status === 'flagged' && editedReferral.abuseFlags && editedReferral.abuseFlags.length > 0 && (
              <Button
                variant="outlined"
                startIcon={<CheckCircle />}
                onClick={() => onClearFlag(editedReferral)}
                sx={{ color: '#3b82f6', borderColor: '#3b82f6', '&:hover': { borderColor: '#2563eb' } }}
              >
                Clear Flag
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ReferralDetailDrawer;
