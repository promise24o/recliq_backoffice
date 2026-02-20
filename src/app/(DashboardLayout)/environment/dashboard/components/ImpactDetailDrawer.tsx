'use client';
import React from 'react';
import {
  Box,
  Drawer,
  Typography,
  Stack,
  Grid,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Recycle,
  Leaf,
  TreePine,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  User,
  Building,
  Scale,
  Target,
  Info,
  X,
  Flag,
} from 'lucide-react';
import { EnvironmentalImpact, VerificationStatus } from '../types';
import {
  formatWeight,
  formatCO2,
  formatTrees,
  getWasteTypeColor,
  getActivityTypeColor,
  getVerificationStatusColor,
} from '../mockData';

interface ImpactDetailDrawerProps {
  impact: EnvironmentalImpact | null;
  open: boolean;
  onClose: () => void;
}

const ImpactDetailDrawer: React.FC<ImpactDetailDrawerProps> = ({
  impact,
  open,
  onClose,
}) => {
  if (!impact) return null;

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle size={20} color="#10B981" />;
      case 'pending':
        return <Clock size={20} color="#F59E0B" />;
      case 'flagged':
        return <AlertCircle size={20} color="#8B5CF6" />;
      case 'rejected':
        return <XCircle size={20} color="#EF4444" />;
      default:
        return <Clock size={20} color="#6B7280" />;
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'pickup': return 'Pickup';
      case 'drop_off': return 'Drop-off';
      case 'enterprise': return 'Enterprise';
      case 'community': return 'Community';
      default: return type;
    }
  };

  const getWasteLabel = (type: string) => {
    switch (type) {
      case 'plastic': return 'Plastic';
      case 'metal': return 'Metal';
      case 'paper': return 'Paper';
      case 'glass': return 'Glass';
      case 'organic': return 'Organic';
      case 'e_waste': return 'E-Waste';
      case 'textile': return 'Textile';
      case 'mixed': return 'Mixed';
      default: return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'verified': return 'VERIFIED';
      case 'pending': return 'PENDING';
      case 'flagged': return 'FLAGGED';
      case 'rejected': return 'REJECTED';
      default: return status?.toUpperCase() || 'UNKNOWN';
    }
  };

  const statusColor = getVerificationStatusColor(impact.verificationStatus || 'pending');
  const wasteColor = getWasteTypeColor(impact.wasteType || 'paper');
  const activityColor = getActivityTypeColor(impact.activityType || 'pickup');

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', md: 900 },
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
            <Stack direction="row" spacing={2} alignItems="center">
              <Recycle size={24} color="#10B981" />
              <Box>
                <Typography variant="h6" fontWeight="600">
                  Impact Record
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {impact.id || 'N/A'} • {new Date(impact.date || new Date()).toLocaleDateString('en-US')}
                </Typography>
              </Box>
            </Stack>

            <IconButton onClick={onClose}>
              <X size={20} />
            </IconButton>
          </Stack>
        </Box>

        {/* Status Bar */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip
              icon={getVerificationIcon(impact.verificationStatus || 'pending')}
              label={getStatusLabel(impact.verificationStatus)}
              size="small"
              sx={{
                bgcolor: statusColor + '15',
                color: statusColor,
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            />
            <Chip
              label={getWasteLabel(impact.wasteType)}
              size="small"
              sx={{
                bgcolor: wasteColor + '15',
                color: wasteColor,
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            />
            <Chip
              label={getActivityLabel(impact.activityType)}
              size="small"
              sx={{
                bgcolor: activityColor + '15',
                color: activityColor,
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            />
          </Stack>
        </Box>

        {/* All Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <Stack spacing={3}>
            {/* Impact Metrics */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Impact Metrics
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <Recycle size={18} color="#10B981" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Waste Recycled</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {formatWeight(impact.weightKg || 0)}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Leaf size={18} color="#3B82F6" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">CO₂ Avoided</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {formatCO2(impact.co2AvoidedKg || 0)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <TreePine size={18} color="#84CC16" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Trees Equivalent</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {formatTrees(impact.treesSaved || 0)}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Scale size={18} color="#F59E0B" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Landfill Diverted</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {formatWeight(impact.landfillDivertedKg || 0)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Location Details */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Location Details
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <MapPin size={18} color="#6366f1" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">City</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {impact.city || 'Unknown'}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Target size={18} color="#8B5CF6" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Zone</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {impact.zone || 'Unknown'}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <Calendar size={18} color="#f59e0b" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Date</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {new Date(impact.date || new Date()).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Client Information */}
            {impact.clientInfo && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Client Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      {impact.clientInfo.clientName && (
                        <Stack direction="row" spacing={2}>
                          <User size={18} color="#3b82f6" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Client Name</Typography>
                            <Typography variant="subtitle1" fontWeight="600">
                              {impact.clientInfo.clientName}
                            </Typography>
                          </Box>
                        </Stack>
                      )}
                      {impact.clientInfo.clientId && (
                        <Stack direction="row" spacing={2}>
                          <Info size={18} color="#6b7280" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Client ID</Typography>
                            <Typography variant="subtitle1" fontWeight="600">
                              {impact.clientInfo.clientId}
                            </Typography>
                          </Box>
                        </Stack>
                      )}
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    {impact.clientInfo.clientType && (
                      <Stack direction="row" spacing={2}>
                        <Building size={18} color="#8b5cf6" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Client Type</Typography>
                          <Typography variant="subtitle1" fontWeight="600">
                            {impact.clientInfo.clientType.charAt(0).toUpperCase() + impact.clientInfo.clientType.slice(1)}
                          </Typography>
                        </Box>
                      </Stack>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            )}

            {/* Verification Details */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Verification Details
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <CheckCircle size={18} color="#10B981" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Verification Status</Typography>
                        <Chip
                          label={getStatusLabel(impact.verificationStatus)}
                          size="small"
                          sx={{
                            mt: 0.5,
                            bgcolor: statusColor + '15',
                            color: statusColor,
                            fontWeight: 500
                          }}
                        />
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Info size={18} color="#6b7280" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Verification Source</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {impact.verificationSource || 'Unknown'}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <Calendar size={18} color="#f59e0b" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Recorded At</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {impact.metadata?.recordedAt
                            ? new Date(impact.metadata.recordedAt).toLocaleString('en-US')
                            : 'N/A'}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <User size={18} color="#3b82f6" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Recorded By</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {impact.metadata?.recordedBy || 'Unknown'}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Verification Audit */}
            {impact.metadata?.verifiedAt && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Verification Audit
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack direction="row" spacing={2}>
                      <CheckCircle size={18} color="#10B981" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Verified At</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {new Date(impact.metadata.verifiedAt).toLocaleString('en-US')}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    {impact.metadata?.verifiedBy && (
                      <Stack direction="row" spacing={2}>
                        <User size={18} color="#3b82f6" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Verified By</Typography>
                          <Typography variant="subtitle1" fontWeight="600">
                            {impact.metadata.verifiedBy}
                          </Typography>
                        </Box>
                      </Stack>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            )}

            {/* Notes */}
            {impact.metadata?.notes && impact.metadata.notes.length > 0 && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Notes
                </Typography>
                <Stack spacing={1}>
                  {impact.metadata.notes.map((note: string, index: number) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                      • {note}
                    </Typography>
                  ))}
                </Stack>
              </Paper>
            )}

            {/* SDG Contributions */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                SDG Contributions
              </Typography>
              {impact.sdgContributions && impact.sdgContributions.length > 0 ? (
                <Stack spacing={2}>
                  {impact.sdgContributions.map((sdg: any, index: number) => {
                    const goal = sdg.goal || `SDG_${sdg.sdgNumber}`;
                    const title = sdg.sdgTitle || sdg.description || goal;
                    const description = sdg.sdgDescription || sdg.description || '';
                    const contribution = sdg.totalContribution ?? sdg.contributionKg ?? sdg.impactWeight ?? 0;
                    const unit = sdg.unit || 'kg';

                    return (
                      <Box key={goal + index} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="subtitle1" fontWeight="600">
                            {title}
                          </Typography>
                          {sdg.targetMet && (
                            <Chip label="Target Met" size="small" color="success" />
                          )}
                        </Stack>
                        {description && (
                          <Typography variant="body2" color="text.secondary" mb={2}>
                            {description}
                          </Typography>
                        )}
                        <Grid container spacing={3}>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <Stack direction="row" spacing={2}>
                              <Scale size={18} color="#10B981" />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Contribution</Typography>
                                <Typography variant="subtitle1" fontWeight="600">
                                  {contribution} {unit}
                                </Typography>
                              </Box>
                            </Stack>
                          </Grid>
                          {(sdg.progressPercentage || sdg.targetAchievement) && (
                            <Grid size={{ xs: 12, md: 6 }}>
                              <Stack direction="row" spacing={2}>
                                <Target size={18} color="#3B82F6" />
                                <Box>
                                  <Typography variant="body2" color="text.secondary">Progress</Typography>
                                  <Typography variant="subtitle1" fontWeight="600">
                                    {(sdg.progressPercentage ?? sdg.targetAchievement ?? 0).toFixed(1)}%
                                  </Typography>
                                </Box>
                              </Stack>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    );
                  })}
                </Stack>
              ) : (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    No SDG contributions recorded for this impact.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ImpactDetailDrawer;
