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
  Monitor,
  Smartphone,
  Globe,
  MapPin,
  Clock,
  LogOut,
  Wifi,
} from 'lucide-react';
import type { ActiveSession } from '../types';

interface ActiveSessionsPanelProps {
  sessions: ActiveSession[];
  onTerminateSession?: (sessionId: string) => void;
  onTerminateAll?: () => void;
}

const ActiveSessionsPanel: React.FC<ActiveSessionsPanelProps> = ({
  sessions,
  onTerminateSession,
  onTerminateAll,
}) => {
  const activeSessions = sessions.filter((s) => s.status === 'active');

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android') || device.toLowerCase().includes('phone')) {
      return <Smartphone size={18} />;
    }
    return <Monitor size={18} />;
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Wifi size={20} color="#6366F1" />
          <Typography variant="h6" fontWeight="600">Active Sessions & Devices</Typography>
          <Chip
            label={`${activeSessions.length} active`}
            size="small"
            sx={{ bgcolor: '#10B98115', color: '#10B981', fontWeight: 600, fontSize: '0.65rem' }}
          />
        </Stack>
        {activeSessions.length > 1 && (
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<LogOut size={14} />}
            onClick={onTerminateAll}
          >
            Terminate All Others
          </Button>
        )}
      </Stack>

      <Stack spacing={2}>
        {sessions.map((session) => (
          <Box
            key={session.id}
            sx={{
              p: 2,
              border: '1px solid',
              borderColor: session.isCurrent ? '#3B82F630' : 'divider',
              borderRadius: 1,
              bgcolor: session.isCurrent ? '#3B82F605' : 'transparent',
              borderLeft: session.isCurrent ? '4px solid #3B82F6' : '4px solid transparent',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Stack direction="row" spacing={2} alignItems="flex-start" flex={1}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    bgcolor: session.status === 'active' ? '#EFF6FF' : '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: session.status === 'active' ? '#3B82F6' : '#9CA3AF',
                    mt: 0.25,
                  }}
                >
                  {getDeviceIcon(session.device)}
                </Box>
                <Box flex={1}>
                  <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                    <Typography variant="body2" fontWeight="600">{session.device}</Typography>
                    {session.isCurrent && (
                      <Chip label="Current" size="small" color="primary" sx={{ fontSize: '0.6rem', height: 20 }} />
                    )}
                    <Chip
                      label={session.status === 'active' ? 'Active' : 'Expired'}
                      size="small"
                      sx={{
                        bgcolor: session.status === 'active' ? '#10B98115' : '#6B728015',
                        color: session.status === 'active' ? '#10B981' : '#6B7280',
                        fontWeight: 600,
                        fontSize: '0.6rem',
                        height: 20,
                      }}
                    />
                  </Stack>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {session.browser} • {session.os}
                  </Typography>
                  <Stack direction="row" spacing={2} mt={1} flexWrap="wrap">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Globe size={12} color="#6B7280" />
                      <Typography variant="caption" color="text.secondary">{session.ipAddress}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <MapPin size={12} color="#6B7280" />
                      <Typography variant="caption" color="text.secondary">{session.location}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Clock size={12} color="#6B7280" />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(session.lastActivity).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' })}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>

              {!session.isCurrent && session.status === 'active' && (
                <Tooltip title="Terminate session">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onTerminateSession?.(session.id)}
                  >
                    <LogOut size={16} />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Box>
        ))}
      </Stack>

      <Box sx={{ mt: 2, p: 1.5, bgcolor: '#FEF2F208', borderRadius: 1, border: '1px solid #EF444410' }}>
        <Typography variant="caption" color="text.secondary">
          If you notice any unrecognized sessions, terminate them immediately and change your password.
        </Typography>
      </Box>
    </Paper>
  );
};

export default ActiveSessionsPanel;
