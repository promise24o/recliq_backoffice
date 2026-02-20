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
  Divider,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  X,
  AlertTriangle,
  DollarSign,
  Shield,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  User,
  FileText,
  Flag,
  ExternalLink,
  Lock,
  Smartphone,
  Wifi,
  Activity,
  Target,
  Bookmark,
  Scale,
} from 'lucide-react';
import type { FraudFlag } from '../types';
import {
  getSeverityColor,
  getStatusColor,
  getFraudTypeColor,
  getEntityTypeColor,
  getFlagSourceColor,
  getSeverityLabel,
  getStatusLabel,
  getFraudTypeLabel,
  getEntityTypeLabel,
  formatCurrency,
} from '../mockData';

interface FraudCaseDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  flag: FraudFlag | null;
}

const FraudCaseDetailDrawer: React.FC<FraudCaseDetailDrawerProps> = ({
  open,
  onClose,
  flag
}) => {
  if (!flag) return null;

  const severityColor = getSeverityColor(flag.severity);
  const statusColor = getStatusColor(flag.status);

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return '#EF4444';
    if (score >= 60) return '#F59E0B';
    return '#10B981';
  };

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
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Flag size={24} color={severityColor} />
              <Box>
                <Typography variant="h6" fontWeight="600">
                  {flag.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {flag.title}
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
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Chip
              label={getSeverityLabel(flag.severity).toUpperCase()}
              size="small"
              sx={{ bgcolor: severityColor + '15', color: severityColor, fontSize: '0.75rem', fontWeight: 600 }}
            />
            <Chip
              label={getStatusLabel(flag.status).toUpperCase()}
              size="small"
              sx={{ bgcolor: statusColor + '15', color: statusColor, fontSize: '0.75rem', fontWeight: 500 }}
            />
            <Chip
              label={getFraudTypeLabel(flag.fraudType)}
              size="small"
              sx={{ bgcolor: getFraudTypeColor(flag.fraudType) + '15', color: getFraudTypeColor(flag.fraudType), fontSize: '0.75rem', fontWeight: 500 }}
            />
            <Chip
              label={`Risk Score: ${flag.riskScore}`}
              size="small"
              sx={{ bgcolor: getRiskScoreColor(flag.riskScore) + '15', color: getRiskScoreColor(flag.riskScore), fontWeight: 700 }}
            />
            {flag.linkedFlagIds.length > 0 && (
              <Chip label={`${flag.linkedFlagIds.length} LINKED`} size="small" color="info" variant="outlined" />
            )}
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <Stack spacing={3}>
            {/* Case Overview */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Case Overview
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                {flag.description}
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Stack spacing={0.5}>
                    <Typography variant="caption" color="text.secondary">Financial Exposure</Typography>
                    <Typography variant="subtitle1" fontWeight="700" color="#EF4444">
                      {formatCurrency(flag.financialExposure)}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Stack spacing={0.5}>
                    <Typography variant="caption" color="text.secondary">Funds Frozen</Typography>
                    <Typography variant="subtitle1" fontWeight="700" color="#F59E0B">
                      {formatCurrency(flag.fundsFrozen)}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Stack spacing={0.5}>
                    <Typography variant="caption" color="text.secondary">Affected Txns</Typography>
                    <Typography variant="subtitle1" fontWeight="700">
                      {flag.affectedTransactions}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Stack spacing={0.5}>
                    <Typography variant="caption" color="text.secondary">Days Open</Typography>
                    <Typography variant="subtitle1" fontWeight="700">
                      {flag.daysOpen === 0 ? 'Closed' : `${flag.daysOpen} days`}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Entity Profile */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Entity Profile
              </Typography>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <User size={20} color="#3b82f6" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="600">
                        {flag.entity.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {flag.entity.id} • {flag.entity.email || 'No email'} • {flag.entity.phone || 'No phone'}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={getEntityTypeLabel(flag.entity.type)}
                      size="small"
                      sx={{ bgcolor: getEntityTypeColor(flag.entity.type) + '15', color: getEntityTypeColor(flag.entity.type) }}
                    />
                    <Chip
                      label={flag.entity.accountStatus.toUpperCase()}
                      size="small"
                      color={flag.entity.accountStatus === 'active' ? 'success' : flag.entity.accountStatus === 'restricted' ? 'warning' : 'error'}
                      variant="outlined"
                    />
                  </Stack>
                </Stack>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <Typography variant="caption" color="text.secondary">Registered</Typography>
                    <Typography variant="body2" fontWeight="500">
                      {new Date(flag.entity.registeredAt).toLocaleDateString('en-NG')}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <Typography variant="caption" color="text.secondary">Prior Flags</Typography>
                    <Typography variant="body2" fontWeight="600" color={flag.entity.priorFlags > 0 ? '#EF4444' : 'text.primary'}>
                      {flag.entity.priorFlags}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <Typography variant="caption" color="text.secondary">Location</Typography>
                    <Typography variant="body2" fontWeight="500">
                      {flag.city}, {flag.zone}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <Typography variant="caption" color="text.secondary">Flag Source</Typography>
                    <Chip
                      label={flag.flagSource.replace(/_/g, ' ').toUpperCase()}
                      size="small"
                      sx={{ bgcolor: getFlagSourceColor(flag.flagSource) + '15', color: getFlagSourceColor(flag.flagSource), fontSize: '0.65rem' }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Paper>

            {/* Risk Score Breakdown */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Risk Score Breakdown
              </Typography>
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography variant="h2" fontWeight="800" color={getRiskScoreColor(flag.riskScore)}>
                  {flag.riskScore}
                </Typography>
                <Typography variant="body2" color="text.secondary">Overall Risk Score</Typography>
              </Box>
              <Stack spacing={2}>
                {[
                  { label: 'Behavior', value: flag.riskScoreBreakdown.behaviorScore },
                  { label: 'Financial', value: flag.riskScoreBreakdown.financialScore },
                  { label: 'Velocity', value: flag.riskScoreBreakdown.velocityScore },
                  { label: 'Network', value: flag.riskScoreBreakdown.networkScore },
                  { label: 'History', value: flag.riskScoreBreakdown.historyScore },
                ].map((item) => (
                  <Box key={item.label}>
                    <Stack direction="row" justifyContent="space-between" mb={0.5}>
                      <Typography variant="body2" fontWeight="500">{item.label}</Typography>
                      <Typography variant="body2" fontWeight="600" color={getRiskScoreColor(item.value)}>
                        {item.value}/100
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={item.value}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: '#f1f5f9',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getRiskScoreColor(item.value),
                          borderRadius: 3
                        }
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Signals */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Fraud Signals
              </Typography>
              <Stack spacing={1.5}>
                {flag.signals.map((signal) => (
                  <Box key={signal.id} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Activity size={16} color="#EF4444" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">
                            {signal.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {signal.type.replace(/_/g, ' ')} • {new Date(signal.detectedAt).toLocaleString('en-NG')}
                          </Typography>
                        </Box>
                      </Stack>
                      <Chip
                        label={`${signal.confidence}%`}
                        size="small"
                        sx={{
                          bgcolor: getRiskScoreColor(signal.confidence) + '15',
                          color: getRiskScoreColor(signal.confidence),
                          fontWeight: 700
                        }}
                      />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Evidence */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Evidence
              </Typography>
              <Stack spacing={1.5}>
                {flag.evidence.map((ev) => (
                  <Box key={ev.id} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <FileText size={16} color="#6B7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">
                            {ev.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {ev.type.replace(/_/g, ' ')} • {ev.collectedBy} • {new Date(ev.collectedAt).toLocaleDateString('en-NG')}
                          </Typography>
                        </Box>
                      </Stack>
                      <Chip
                        label={ev.verified ? 'Verified' : 'Unverified'}
                        size="small"
                        color={ev.verified ? 'success' : 'default'}
                        variant="outlined"
                      />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Device / IP History */}
            {flag.deviceHistory.length > 0 && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Device & IP History
                </Typography>
                <Stack spacing={1.5}>
                  {flag.deviceHistory.map((device) => (
                    <Box key={device.id} sx={{ p: 2, border: '1px solid', borderColor: device.flagged ? '#EF444440' : 'divider', borderRadius: 1, bgcolor: device.flagged ? '#FEF2F2' : 'transparent' }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, md: 4 }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Smartphone size={16} color={device.flagged ? '#EF4444' : '#6B7280'} />
                            <Box>
                              <Typography variant="body2" fontWeight="500">{device.deviceType}</Typography>
                              <Typography variant="caption" color="text.secondary">{device.deviceId}</Typography>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Wifi size={14} color="#6B7280" />
                            <Typography variant="caption">{device.ipAddress}</Typography>
                          </Stack>
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <MapPin size={14} color="#6B7280" />
                            <Typography variant="caption">{device.location}</Typography>
                          </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                          {device.flagged && (
                            <Chip label="FLAGGED" size="small" color="error" variant="outlined" sx={{ fontSize: '0.65rem' }} />
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            )}

            {/* Linked Accounts */}
            {flag.linkedAccountIds.length > 0 && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Linked Accounts
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {flag.linkedAccountIds.map((accountId) => (
                    <Chip key={accountId} label={accountId} size="small" variant="outlined" sx={{ mb: 1 }} />
                  ))}
                </Stack>
              </Paper>
            )}

            {/* Timeline */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Activity Timeline
              </Typography>
              <Stack spacing={2}>
                {flag.timeline.map((event, index) => (
                  <Stack key={event.id} direction="row" spacing={2}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: index === 0 ? '#3B82F6' : '#CBD5E1' }} />
                      {index < flag.timeline.length - 1 && (
                        <Box sx={{ width: 1, flex: 1, bgcolor: '#E2E8F0', mt: 0.5 }} />
                      )}
                    </Box>
                    <Box sx={{ pb: 2 }}>
                      <Typography variant="subtitle2" fontWeight="600">
                        {event.action}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {event.performedBy} • {new Date(event.performedAt).toLocaleString('en-NG')}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Paper>

            {/* Enforcement History */}
            {flag.enforcementActions.length > 0 && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Enforcement Actions Taken
                </Typography>
                <Stack spacing={1.5}>
                  {flag.enforcementActions.map((action) => (
                    <Box key={action.id} sx={{ p: 2, border: '1px solid', borderColor: '#EF444440', borderRadius: 1, bgcolor: '#FEF2F2' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Lock size={16} color="#EF4444" />
                          <Box>
                            <Typography variant="body2" fontWeight="600">
                              {action.action.replace(/_/g, ' ').toUpperCase()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {action.description} • {action.performedBy} • {new Date(action.performedAt).toLocaleString('en-NG')}
                            </Typography>
                          </Box>
                        </Stack>
                        <Chip
                          label={action.reversible ? 'Reversible' : 'Permanent'}
                          size="small"
                          color={action.reversible ? 'warning' : 'error'}
                          variant="outlined"
                        />
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            )}

            {/* Enforcement Actions (for open/investigating cases) */}
            {(flag.status === 'open' || flag.status === 'investigating') && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Enforcement Actions
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                  Every action is logged, irreversible, and reviewable.
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Button variant="outlined" startIcon={<CheckCircle size={16} />} color="success">
                    Clear Flag
                  </Button>
                  <Button variant="outlined" startIcon={<Lock size={16} />} color="warning">
                    Restrict Account
                  </Button>
                  <Button variant="outlined" startIcon={<DollarSign size={16} />} color="error">
                    Reverse Payouts
                  </Button>
                  <Button variant="outlined" startIcon={<Shield size={16} />} color="error">
                    Suspend Privileges
                  </Button>
                  <Button variant="outlined" startIcon={<ExternalLink size={16} />} color="secondary">
                    Escalate to Legal
                  </Button>
                  <Button variant="outlined" startIcon={<Bookmark size={16} />}>
                    Add to Watchlist
                  </Button>
                </Stack>
              </Paper>
            )}
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FraudCaseDetailDrawer;
