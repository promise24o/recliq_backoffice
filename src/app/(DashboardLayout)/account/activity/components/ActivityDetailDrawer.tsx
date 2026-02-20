'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Drawer,
  Chip,
  Divider,
  IconButton,
} from '@mui/material';
import {
  X,
  Clock,
  Monitor,
  Globe,
  MapPin,
  ArrowRight,
  FileText,
  MessageSquare,
  Link2,
  Shield,
} from 'lucide-react';
import type { ActivityEvent } from '@/hooks/useActivityLogs';
import {
  getActionColor,
  getRiskColor,
  getRiskLabel,
  getOutcomeColor,
  getSourceLabel,
  getSourceColor,
  formatTimestamp,
} from '../utils/activityUtils';
import { ActivityDetailSkeleton } from './SkeletonLoader';

interface ActivityDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  event: ActivityEvent | null;
}

const ActivityDetailDrawer: React.FC<ActivityDetailDrawerProps> = ({
  open,
  onClose,
  event,
}) => {
  if (!event) return null;

  // Show skeleton while loading event details
  if (event.id === 'loading') {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { width: { xs: '100%', sm: 480 }, p: 0 } }}
      >
        <ActivityDetailSkeleton />
      </Drawer>
    );
  }

  const actionColor = getActionColor(event.action);
  const riskColor = getRiskColor(event.riskLevel);
  const outcomeColor = getOutcomeColor(event.outcome);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', sm: 480 }, p: 0 } }}
    >
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', bgcolor: actionColor + '05' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <Chip
                label={event.actionLabel}
                size="small"
                sx={{
                  bgcolor: actionColor + '15',
                  color: actionColor,
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              />
              <Chip
                label={event.outcome === 'success' ? 'Success' : event.outcome === 'failed' ? 'Failed' : 'Pending'}
                size="small"
                sx={{
                  bgcolor: outcomeColor + '15',
                  color: outcomeColor,
                  fontWeight: 600,
                  fontSize: '0.65rem',
                }}
              />
            </Stack>
            <Typography variant="caption" color="text.secondary">{event.id}</Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <X size={18} />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={{ p: 3, overflowY: 'auto' }}>
        {/* Full Description */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <FileText size={16} color="#6B7280" />
            <Typography variant="subtitle2" fontWeight="600">Full Description</Typography>
          </Stack>
          <Typography variant="body2">{event.description}</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Entity Info */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" fontWeight="600" mb={1.5}>Target Entity</Typography>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">Entity Type</Typography>
              <Typography variant="caption" fontWeight="600">{event.entityType}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">Entity ID</Typography>
              <Typography variant="caption" fontWeight="600" fontFamily="monospace">{event.entityId}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">Entity Name</Typography>
              <Typography variant="caption" fontWeight="600">{event.entityName}</Typography>
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Before / After State */}
        {event.beforeState && event.afterState && (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" fontWeight="600" mb={1.5}>State Change</Typography>
              <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Before</Typography>
                    <Typography
                      variant="body2"
                      sx={{ bgcolor: '#FEE2E2', px: 1, py: 0.5, borderRadius: 0.5, color: '#991B1B', display: 'inline-block' }}
                    >
                      {event.beforeState}
                    </Typography>
                  </Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ArrowRight size={14} color="#6B7280" />
                    <Typography variant="caption" color="text.secondary">Changed to</Typography>
                  </Stack>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>After</Typography>
                    <Typography
                      variant="body2"
                      sx={{ bgcolor: '#D1FAE5', px: 1, py: 0.5, borderRadius: 0.5, color: '#065F46', display: 'inline-block' }}
                    >
                      {event.afterState}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
          </>
        )}

        {/* Reason / Comment */}
        {event.reason && (
          <>
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <MessageSquare size={16} color="#6B7280" />
                <Typography variant="subtitle2" fontWeight="600">Reason / Comment</Typography>
              </Stack>
              <Box sx={{ p: 2, bgcolor: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 1 }}>
                <Typography variant="body2">{event.reason}</Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
          </>
        )}

        {/* Risk & Source */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" fontWeight="600" mb={1.5}>Risk & Source</Typography>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" color="text.secondary">Risk Level</Typography>
              <Chip
                label={getRiskLabel(event.riskLevel)}
                size="small"
                sx={{
                  bgcolor: riskColor + '15',
                  color: riskColor,
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  height: 22,
                }}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">Source</Typography>
              <Chip
                label={getSourceLabel(event.source)}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.65rem', height: 22 }}
              />
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Device & Location */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" fontWeight="600" mb={1.5}>Device & Location</Typography>
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Monitor size={14} color="#3B82F6" />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Device</Typography>
                <Typography variant="body2" fontWeight="600">{event.device}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={14} color="#8B5CF6" />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">IP Address</Typography>
                <Typography variant="body2" fontWeight="600" fontFamily="monospace">{event.ipAddress}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={14} color="#10B981" />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Location</Typography>
                <Typography variant="body2" fontWeight="600">{event.location}</Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Timestamp */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={14} color="#F59E0B" />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Timestamp (Local)</Typography>
              <Typography variant="body2" fontWeight="600">
                {new Date(event.timestamp).toLocaleString('en-NG', { dateStyle: 'full', timeStyle: 'medium' })}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                UTC: {event.timestamp}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Audit Reference */}
        {event.auditRef && (
          <>
            <Divider sx={{ mb: 3 }} />
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Link2 size={16} color="#6B7280" />
                <Typography variant="subtitle2" fontWeight="600">Audit Reference</Typography>
              </Stack>
              <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" fontFamily="monospace" fontWeight="600">{event.auditRef}</Typography>
                <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                  This action is linked to the system audit log and is immutable.
                </Typography>
              </Box>
            </Box>
          </>
        )}

        {/* Read-only notice */}
        <Box sx={{ mt: 3, p: 1.5, bgcolor: '#EFF6FF', borderRadius: 1, border: '1px solid #BFDBFE' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Shield size={14} color="#3B82F6" />
            <Typography variant="caption" color="#1E40AF">
              This record is read-only and immutable. It cannot be edited or deleted.
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ActivityDetailDrawer;
