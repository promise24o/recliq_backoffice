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
  Clock,
  User,
  Cpu,
  Globe,
  Smartphone,
  FileText,
  ArrowRight,
  Link,
  Download,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import type { AuditLog } from '../types';
import {
  getActorTypeColor,
  getActionTypeColor,
  getEntityTypeColor,
  getRiskLevelColor,
  getActionTypeLabel,
  getEntityTypeLabel,
  getRiskLevelLabel,
  getSourceLabel,
} from '../mockData';

interface AuditLogDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  log: AuditLog | null;
}

const AuditLogDetailDrawer: React.FC<AuditLogDetailDrawerProps> = ({
  open,
  onClose,
  log
}) => {
  if (!log) return null;

  const riskColor = getRiskLevelColor(log.riskLevel);

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
              <FileText size={24} color={riskColor} />
              <Box>
                <Typography variant="h6" fontWeight="600">
                  {log.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {log.actionLabel}
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
              label={getActionTypeLabel(log.actionType).toUpperCase()}
              size="small"
              sx={{ bgcolor: getActionTypeColor(log.actionType) + '15', color: getActionTypeColor(log.actionType), fontSize: '0.75rem', fontWeight: 600 }}
            />
            <Chip
              label={getEntityTypeLabel(log.entityType)}
              size="small"
              sx={{ bgcolor: getEntityTypeColor(log.entityType) + '15', color: getEntityTypeColor(log.entityType), fontSize: '0.75rem', fontWeight: 500 }}
            />
            <Chip
              label={getRiskLevelLabel(log.riskLevel).toUpperCase()}
              size="small"
              sx={{ bgcolor: riskColor + '15', color: riskColor, fontSize: '0.75rem', fontWeight: 600 }}
            />
            <Chip
              icon={log.success ? <CheckCircle size={14} /> : <XCircle size={14} />}
              label={log.success ? 'SUCCESS' : 'FAILED'}
              size="small"
              color={log.success ? 'success' : 'error'}
              variant="outlined"
            />
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <Stack spacing={3}>
            {/* Event Overview */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Event Overview
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <Clock size={18} color="#3B82F6" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Exact Timestamp (UTC)</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {new Date(log.timestamp).toISOString()}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      {log.actor.type === 'admin' ? <User size={18} color={getActorTypeColor('admin')} /> : <Cpu size={18} color={getActorTypeColor('system')} />}
                      <Box>
                        <Typography variant="body2" color="text.secondary">Actor</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {log.actor.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {log.actor.id} • {log.actor.role}
                          {log.actor.email && ` • ${log.actor.email}`}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                      <Globe size={18} color="#6B7280" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Source</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {getSourceLabel(log.source)}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Smartphone size={18} color="#6B7280" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Device / IP</Typography>
                        <Typography variant="subtitle1" fontWeight="600">
                          {log.device}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {log.ipAddress} • Session: {log.sessionId}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
              {log.durationMs !== undefined && (
                <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f8fafc', borderRadius: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Execution time: {log.durationMs < 1000 ? `${log.durationMs}ms` : `${(log.durationMs / 1000).toFixed(1)}s`}
                  </Typography>
                </Box>
              )}
            </Paper>

            {/* Entity Details */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Entity Details
              </Typography>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6, md: 4 }}>
                    <Typography variant="caption" color="text.secondary">Entity Type</Typography>
                    <Box mt={0.5}>
                      <Chip
                        label={getEntityTypeLabel(log.entityType)}
                        size="small"
                        sx={{ bgcolor: getEntityTypeColor(log.entityType) + '15', color: getEntityTypeColor(log.entityType) }}
                      />
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 6, md: 4 }}>
                    <Typography variant="caption" color="text.secondary">Entity ID</Typography>
                    <Typography variant="body2" fontWeight="600" mt={0.5}>
                      {log.entityId}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="caption" color="text.secondary">Entity Label</Typography>
                    <Typography variant="body2" fontWeight="500" mt={0.5}>
                      {log.entityLabel}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Typography variant="body2" color="text.secondary" mt={2}>
                {log.changeSummary}
              </Typography>
            </Paper>

            {/* Change Details (Before → After) */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Change Details
              </Typography>
              <Stack spacing={1.5}>
                {log.changeDetails.map((change, index) => (
                  <Box key={index} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight="600" display="block" mb={1}>
                      {change.field}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ flex: 1, p: 1.5, bgcolor: '#FEF2F2', borderRadius: 1, border: '1px solid #FECACA' }}>
                        <Typography variant="caption" color="text.secondary" display="block">Before</Typography>
                        <Typography variant="body2" fontWeight="500" color="#DC2626">
                          {change.before}
                        </Typography>
                      </Box>
                      <ArrowRight size={20} color="#6B7280" />
                      <Box sx={{ flex: 1, p: 1.5, bgcolor: '#ECFDF5', borderRadius: 1, border: '1px solid #A7F3D0' }}>
                        <Typography variant="caption" color="text.secondary" display="block">After</Typography>
                        <Typography variant="body2" fontWeight="500" color="#059669">
                          {change.after}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Reason */}
            {log.reason && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Reason / Comment
                </Typography>
                <Box sx={{ p: 2, bgcolor: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 1 }}>
                  <Typography variant="body2">
                    {log.reason}
                  </Typography>
                </Box>
              </Paper>
            )}

            {/* Linked Entities */}
            {log.linkedEntities.length > 0 && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Related Entities
                </Typography>
                <Stack spacing={1.5}>
                  {log.linkedEntities.map((entity, index) => (
                    <Box key={index} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Link size={16} color="#6B7280" />
                          <Box>
                            <Typography variant="body2" fontWeight="500">
                              {entity.label}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {entity.id}
                            </Typography>
                          </Box>
                        </Stack>
                        <Chip
                          label={getEntityTypeLabel(entity.type)}
                          size="small"
                          sx={{
                            bgcolor: getEntityTypeColor(entity.type) + '15',
                            color: getEntityTypeColor(entity.type),
                            fontSize: '0.65rem'
                          }}
                        />
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            )}

            {/* Error (if failed) */}
            {!log.success && log.errorMessage && (
              <Paper sx={{ p: 3, border: '1px solid #FECACA', bgcolor: '#FEF2F2' }}>
                <Typography variant="h6" fontWeight="600" mb={2} color="#DC2626">
                  Error Details
                </Typography>
                <Typography variant="body2" color="#DC2626">
                  {log.errorMessage}
                </Typography>
              </Paper>
            )}

            {/* Export */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Export
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<Download size={16} />}>
                  Export Event (JSON)
                </Button>
                <Button variant="outlined" startIcon={<FileText size={16} />}>
                  Generate Evidence Bundle
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default AuditLogDetailDrawer;
