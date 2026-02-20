'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ShieldAlert,
  Clock,
  Smartphone,
  XCircle,
  MapPin,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { useSecuritySignals, useAcknowledgeSecuritySignal, type SecuritySignal } from '@/hooks/useActivityLogs';
import {
  getSecuritySignalTypeColor,
  getSecuritySignalTypeLabel,
  getSecuritySignalSeverityColor,
  formatRelativeTime,
} from '../utils/activityUtils';
import { SecuritySignalsSkeleton } from './SkeletonLoader';

interface SecuritySignalsPanelProps {
  // No longer needs signals prop - fetches internally
}

const getSignalIcon = (type: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    unusual_time: <Clock size={18} />,
    new_device: <Smartphone size={18} />,
    failed_login: <XCircle size={18} />,
    location_anomaly: <MapPin size={18} />,
  };
  return iconMap[type] || <AlertTriangle size={18} />;
};

const SecuritySignalsPanel: React.FC<SecuritySignalsPanelProps> = () => {
  const { data: signals = [], isLoading, error } = useSecuritySignals({ acknowledged: false });
  const acknowledgeMutation = useAcknowledgeSecuritySignal();

  const handleAcknowledge = async (signalId: string) => {
    try {
      await acknowledgeMutation.mutateAsync(signalId);
    } catch (error) {
      console.error('Failed to acknowledge signal:', error);
    }
  };

  if (isLoading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
          <ShieldAlert size={20} color="#EF4444" />
          <Typography variant="h6" fontWeight="600">Security Signals & Warnings</Typography>
        </Stack>
        <SecuritySignalsSkeleton count={3} />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography color="error">Failed to load security signals</Typography>
      </Paper>
    );
  }
  const unacknowledged = signals.filter((s) => !s.acknowledged);
  const acknowledged = signals.filter((s) => s.acknowledged);

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
        <ShieldAlert size={20} color="#EF4444" />
        <Typography variant="h6" fontWeight="600">Security Signals & Warnings</Typography>
        {unacknowledged.length > 0 && (
          <Chip
            label={`${unacknowledged.length} unresolved`}
            size="small"
            sx={{ bgcolor: '#EF444415', color: '#EF4444', fontWeight: 600, fontSize: '0.65rem' }}
          />
        )}
      </Stack>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Unusual patterns detected in your account activity. Review and acknowledge each signal.
      </Typography>

      <Stack spacing={2}>
        {/* Unacknowledged first */}
        {unacknowledged.map((signal) => {
          const color = getSecuritySignalSeverityColor(signal.severity);
          return (
            <Box
              key={signal.id}
              sx={{
                p: 2.5,
                border: '1px solid',
                borderColor: color + '30',
                borderLeft: `4px solid ${color}`,
                borderRadius: 1,
                bgcolor: color + '05',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Stack direction="row" spacing={2} alignItems="flex-start" flex={1}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      bgcolor: color + '15',
                      color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      mt: 0.25,
                    }}
                  >
                    {getSignalIcon(signal.type)}
                  </Box>
                  <Box flex={1}>
                    <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                      <Typography variant="body2" fontWeight="700">{signal.title}</Typography>
                      <Chip
                        label={signal.severity === 'critical' ? 'Critical' : 'Warning'}
                        size="small"
                        sx={{
                          bgcolor: color + '15',
                          color,
                          fontWeight: 600,
                          fontSize: '0.6rem',
                          height: 20,
                        }}
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {signal.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Detected: {new Date(signal.timestamp).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' })}
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<CheckCircle size={14} />}
                  onClick={() => handleAcknowledge(signal.id)}
                  sx={{ ml: 2, flexShrink: 0 }}
                >
                  Acknowledge
                </Button>
              </Stack>
            </Box>
          );
        })}

        {/* Acknowledged */}
        {acknowledged.map((signal) => {
          const color = getSecuritySignalSeverityColor(signal.severity);
          return (
            <Box
              key={signal.id}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                opacity: 0.7,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    bgcolor: '#f1f5f9',
                    color: '#9CA3AF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    mt: 0.25,
                  }}
                >
                  {getSignalIcon(signal.type)}
                </Box>
                <Box flex={1}>
                  <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                    <Typography variant="body2" fontWeight="600" color="text.secondary">{signal.title}</Typography>
                    <Chip
                      icon={<CheckCircle size={10} />}
                      label="Acknowledged"
                      size="small"
                      sx={{
                        bgcolor: '#10B98115',
                        color: '#10B981',
                        fontWeight: 600,
                        fontSize: '0.6rem',
                        height: 20,
                        '& .MuiChip-icon': { color: '#10B981' },
                      }}
                    />
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {signal.description}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Stack>

      {signals.length === 0 && (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircle size={32} color="#10B981" />
          <Typography variant="body2" color="text.secondary" mt={1}>
            No security signals detected. Your account activity looks normal.
          </Typography>
        </Box>
      )}

      <Box sx={{ mt: 3, p: 1.5, bgcolor: '#FEF2F2', borderRadius: 1, border: '1px solid #FECACA' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <AlertTriangle size={14} color="#EF4444" />
          <Typography variant="caption" color="#991B1B">
            If you notice unrecognized activity, change your password immediately and terminate all sessions.
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
};

export default SecuritySignalsPanel;
