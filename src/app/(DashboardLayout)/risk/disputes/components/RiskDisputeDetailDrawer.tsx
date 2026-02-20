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
  Eye,
  Scale,
  Activity,
  Target,
  Info,
} from 'lucide-react';
import type { RiskDispute } from '../types';
import {
  getSeverityColor,
  getStatusColor,
  getCategoryColor,
  getRiskLevelColor,
  getEscalationSourceColor,
  getCategoryLabel,
  getSeverityLabel,
  getStatusLabel,
  formatCurrency,
} from '../mockData';

interface RiskDisputeDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  dispute: RiskDispute | null;
}

const RiskDisputeDetailDrawer: React.FC<RiskDisputeDetailDrawerProps> = ({
  open,
  onClose,
  dispute
}) => {
  if (!dispute) return null;

  const severityColor = getSeverityColor(dispute.severity);
  const statusColor = getStatusColor(dispute.status);
  const categoryColor = getCategoryColor(dispute.category);

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
              <Shield size={24} color={severityColor} />
              <Box>
                <Typography variant="h6" fontWeight="600">
                  {dispute.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dispute.disputeId} • {dispute.title}
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
              label={getSeverityLabel(dispute.severity).toUpperCase()}
              size="small"
              sx={{
                bgcolor: severityColor + '15',
                color: severityColor,
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            />
            <Chip
              label={getStatusLabel(dispute.status).toUpperCase()}
              size="small"
              sx={{
                bgcolor: statusColor + '15',
                color: statusColor,
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            />
            <Chip
              label={getCategoryLabel(dispute.category)}
              size="small"
              sx={{
                bgcolor: categoryColor + '15',
                color: categoryColor,
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            />
            {dispute.isRepeatOffender && (
              <Chip label="REPEAT OFFENDER" size="small" color="error" variant="outlined" />
            )}
            {dispute.isAuditTagged && (
              <Chip label="AUDIT TAGGED" size="small" color="warning" variant="outlined" />
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
                {dispute.description}
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <DollarSign size={18} color="#EF4444" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Financial Exposure</Typography>
                        <Typography variant="subtitle1" fontWeight="600" color="#EF4444">
                          {formatCurrency(dispute.financialExposure)}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <DollarSign size={18} color="#F59E0B" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Funds at Risk</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {formatCurrency(dispute.fundsAtRisk)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <CheckCircle size={18} color="#10B981" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Recovered</Typography>
                        <Typography variant="subtitle1" fontWeight="600" color="#10B981">
                          {formatCurrency(dispute.recoveredAmount)}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Clock size={18} color="#6B7280" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Days Open</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {dispute.daysOpen === 0 ? 'Closed' : `${dispute.daysOpen} days`}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Parties Involved */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Parties Involved
              </Typography>
              <Stack spacing={2}>
                {dispute.parties.map((party) => (
                  <Box key={party.id} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <User size={18} color="#3b82f6" />
                        <Box>
                          <Typography variant="subtitle2" fontWeight="600">
                            {party.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {party.id} • {party.role.charAt(0).toUpperCase() + party.role.slice(1)} • {party.type.charAt(0).toUpperCase() + party.type.slice(1)}
                          </Typography>
                        </Box>
                      </Stack>
                      {party.priorDisputes > 0 && (
                        <Chip
                          label={`${party.priorDisputes} prior`}
                          size="small"
                          color="warning"
                          variant="outlined"
                        />
                      )}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Location & Escalation */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Location & Escalation
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <MapPin size={18} color="#6366f1" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Location</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {dispute.city}, {dispute.zone}, {dispute.state}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Calendar size={18} color="#f59e0b" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Escalated At</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {new Date(dispute.escalatedAt).toLocaleString('en-NG')}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <ExternalLink size={18} color="#8B5CF6" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Escalation Source</Typography>
                        <Chip
                          label={dispute.escalationSource.replace('_', ' ').toUpperCase()}
                          size="small"
                          sx={{
                            mt: 0.5,
                            bgcolor: getEscalationSourceColor(dispute.escalationSource) + '15',
                            color: getEscalationSourceColor(dispute.escalationSource),
                            fontWeight: 500
                          }}
                        />
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <User size={18} color="#3b82f6" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Assigned To</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {dispute.assignedTo}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Risk Assessment */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Risk Assessment
              </Typography>
              <Grid container spacing={2} mb={2}>
                {[
                  { label: 'Legal Risk', value: dispute.riskAssessment.legalRisk },
                  { label: 'Financial Risk', value: dispute.riskAssessment.financialRisk },
                  { label: 'Reputational Risk', value: dispute.riskAssessment.reputationalRisk },
                  { label: 'Systemic Risk', value: dispute.riskAssessment.systemicRisk },
                ].map((item) => (
                  <Grid key={item.label} size={{ xs: 6, md: 3 }}>
                    <Box sx={{ textAlign: 'center', p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {item.label}
                      </Typography>
                      <Chip
                        label={item.value.toUpperCase()}
                        size="small"
                        sx={{
                          mt: 0.5,
                          bgcolor: getRiskLevelColor(item.value) + '15',
                          color: getRiskLevelColor(item.value),
                          fontWeight: 600
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="body2" color="text.secondary">
                {dispute.riskAssessment.assessmentNotes}
              </Typography>
              <Typography variant="caption" color="text.secondary" mt={1} display="block">
                Assessed by {dispute.riskAssessment.assessedBy} on {new Date(dispute.riskAssessment.assessedAt).toLocaleDateString('en-NG')}
              </Typography>
            </Paper>

            {/* Evidence */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Evidence & Audit Trail
              </Typography>
              <Stack spacing={1.5}>
                {dispute.evidence.map((ev) => (
                  <Box key={ev.id} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <FileText size={16} color="#6B7280" />
                        <Box>
                          <Typography variant="body2" fontWeight="500">
                            {ev.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {ev.type.replace('_', ' ')} • Uploaded by {ev.uploadedBy} • {new Date(ev.uploadedAt).toLocaleDateString('en-NG')}
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

            {/* Timeline */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Timeline
              </Typography>
              <Stack spacing={2}>
                {dispute.timeline.map((event, index) => (
                  <Stack key={event.id} direction="row" spacing={2}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: index === 0 ? '#3B82F6' : '#CBD5E1' }} />
                      {index < dispute.timeline.length - 1 && (
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

            {/* Pattern Flags */}
            {dispute.patternFlags.length > 0 && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Pattern Flags
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {dispute.patternFlags.map((flag, index) => (
                    <Chip
                      key={index}
                      label={flag.replace(/_/g, ' ').toUpperCase()}
                      size="small"
                      color="error"
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>
              </Paper>
            )}

            {/* Resolution (if resolved) */}
            {dispute.resolution && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Resolution
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Scale size={18} color="#10B981" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Outcome</Typography>
                          <Chip
                            label={dispute.resolution.outcome.replace(/_/g, ' ').toUpperCase()}
                            size="small"
                            color="success"
                            variant="outlined"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <User size={18} color="#3b82f6" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Resolved By</Typography>
                          <Typography variant="subtitle1" fontWeight="600">
                            {dispute.resolution.resolvedBy}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    {dispute.resolution.financialAction && (
                      <Stack direction="row" spacing={2}>
                        <DollarSign size={18} color="#F59E0B" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Financial Action</Typography>
                          <Typography variant="subtitle1" fontWeight="600">
                            {dispute.resolution.financialAction.type.toUpperCase()} - {formatCurrency(dispute.resolution.financialAction.amount)}
                          </Typography>
                        </Box>
                      </Stack>
                    )}
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" fontWeight="600" mb={1}>Findings</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {dispute.resolution.findings}
                </Typography>
                {dispute.resolution.preventiveMeasures.length > 0 && (
                  <>
                    <Typography variant="subtitle2" fontWeight="600" mb={1}>Preventive Measures</Typography>
                    <Stack spacing={0.5}>
                      {dispute.resolution.preventiveMeasures.map((measure, index) => (
                        <Typography key={index} variant="body2" color="text.secondary">
                          • {measure}
                        </Typography>
                      ))}
                    </Stack>
                  </>
                )}
              </Paper>
            )}

            {/* Actions */}
            {dispute.status !== 'resolved' && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Final Actions
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                  Every action is permanent and logged.
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Button variant="outlined" startIcon={<CheckCircle size={16} />} color="success">
                    Uphold Ops Decision
                  </Button>
                  <Button variant="outlined" startIcon={<Scale size={16} />} color="warning">
                    Override Resolution
                  </Button>
                  <Button variant="outlined" startIcon={<DollarSign size={16} />} color="error">
                    Reverse Payouts
                  </Button>
                  <Button variant="outlined" startIcon={<Lock size={16} />} color="error">
                    Lock Accounts
                  </Button>
                  <Button variant="outlined" startIcon={<ExternalLink size={16} />} color="secondary">
                    Escalate to Legal
                  </Button>
                  <Button variant="outlined" startIcon={<FileText size={16} />}>
                    Close with Findings
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

export default RiskDisputeDetailDrawer;
