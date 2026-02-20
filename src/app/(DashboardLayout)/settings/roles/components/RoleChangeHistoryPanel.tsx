'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
} from '@mui/material';
import {
  UserPlus,
  UserMinus,
  ToggleLeft,
  ToggleRight,
  Settings,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import type { RoleChangeEvent } from '../types';
import {
  getRoleColor,
  getRoleLabel,
  getChangeActionColor,
  getChangeActionLabel,
} from '../mockData';

interface RoleChangeHistoryPanelProps {
  changeHistory: RoleChangeEvent[];
}

const RoleChangeHistoryPanel: React.FC<RoleChangeHistoryPanelProps> = ({
  changeHistory,
}) => {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'role_assigned': return <UserPlus size={16} />;
      case 'role_revoked': return <UserMinus size={16} />;
      case 'role_disabled': return <ToggleLeft size={16} />;
      case 'role_enabled': return <ToggleRight size={16} />;
      case 'permission_updated': return <Settings size={16} />;
      case 'admin_suspended': return <AlertTriangle size={16} />;
      case 'admin_activated': return <ToggleRight size={16} />;
      default: return <Settings size={16} />;
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box mb={3}>
        <Typography variant="h6" fontWeight="600">
          Change History & Audit Linkage
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Role change timeline — who changed what, and why
        </Typography>
      </Box>

      <Stack spacing={0}>
        {changeHistory.map((event, index) => (
          <Stack key={event.id} direction="row" spacing={2}>
            {/* Timeline line */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 32 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: getChangeActionColor(event.action) + '15',
                  color: getChangeActionColor(event.action),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {getActionIcon(event.action)}
              </Box>
              {index < changeHistory.length - 1 && (
                <Box sx={{ width: 2, flex: 1, bgcolor: '#E2E8F0', mt: 0.5 }} />
              )}
            </Box>

            {/* Content */}
            <Box sx={{ pb: 3, flex: 1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                    <Chip
                      label={getChangeActionLabel(event.action)}
                      size="small"
                      sx={{
                        bgcolor: getChangeActionColor(event.action) + '15',
                        color: getChangeActionColor(event.action),
                        fontSize: '0.7rem',
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      label={getRoleLabel(event.targetRole)}
                      size="small"
                      sx={{
                        bgcolor: getRoleColor(event.targetRole) + '15',
                        color: getRoleColor(event.targetRole),
                        fontSize: '0.65rem',
                      }}
                    />
                  </Stack>
                  <Typography variant="body2" fontWeight="500">
                    {event.description}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" noWrap sx={{ ml: 2 }}>
                  {new Date(event.timestamp).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                </Typography>
              </Stack>

              <Typography variant="caption" color="text.secondary" display="block">
                By {event.actor} ({getRoleLabel(event.actorRole)})
                {event.targetAdmin && ` • Target: ${event.targetAdmin}`}
              </Typography>

              {event.reason && (
                <Box sx={{ mt: 1, p: 1.5, bgcolor: '#f8fafc', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="caption" color="text.secondary">
                    Reason: {event.reason}
                  </Typography>
                </Box>
              )}

              {event.linkedAuditLogId && (
                <Stack direction="row" spacing={0.5} alignItems="center" mt={1}>
                  <ExternalLink size={12} color="#3B82F6" />
                  <Typography variant="caption" color="#3B82F6" fontWeight="500">
                    Linked: {event.linkedAuditLogId}
                  </Typography>
                </Stack>
              )}
            </Box>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};

export default RoleChangeHistoryPanel;
