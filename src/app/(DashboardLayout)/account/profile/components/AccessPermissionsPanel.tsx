'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
  Chip,
} from '@mui/material';
import {
  Shield,
  Check,
  X,
  Lock,
  Stamp,
} from 'lucide-react';
import type { AdminRole, RolePermissions } from '../types';
import { getRoleColor, getRoleLabel } from '../mockData';

interface AccessPermissionsPanelProps {
  permissions: RolePermissions;
}

const AccessPermissionsPanel: React.FC<AccessPermissionsPanelProps> = ({ permissions }) => {
  const roleColor = getRoleColor(permissions.role);

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
        <Shield size={20} color={roleColor} />
        <Typography variant="h6" fontWeight="600">Access & Permissions</Typography>
        <Chip
          label="Read-only"
          size="small"
          variant="outlined"
          sx={{ fontSize: '0.65rem', height: 22 }}
        />
      </Stack>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Your current role and what you can access. Role changes are managed by Super Admins only.
      </Typography>

      {/* Role Description */}
      <Box sx={{ p: 2, bgcolor: roleColor + '08', border: `1px solid ${roleColor}20`, borderRadius: 1, mb: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <Chip
            label={getRoleLabel(permissions.role)}
            size="small"
            sx={{ bgcolor: roleColor + '15', color: roleColor, fontWeight: 700 }}
          />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {permissions.description}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Accessible Modules */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
            <Check size={16} color="#10B981" />
            <Typography variant="subtitle2" fontWeight="600">Accessible Modules</Typography>
          </Stack>
          <Stack spacing={0.75}>
            {permissions.accessibleModules.map((mod, i) => (
              <Stack key={i} direction="row" spacing={1} alignItems="center">
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10B981' }} />
                <Typography variant="body2">{mod}</Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>

        {/* Restricted Modules */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
            <Lock size={16} color="#EF4444" />
            <Typography variant="subtitle2" fontWeight="600">Restricted Modules</Typography>
          </Stack>
          {permissions.restrictedModules.length > 0 ? (
            <Stack spacing={0.75}>
              {permissions.restrictedModules.map((mod, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#EF4444' }} />
                  <Typography variant="body2" color="text.secondary">{mod}</Typography>
                </Stack>
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">No restrictions — full access</Typography>
          )}
        </Grid>

        {/* Approval Authority */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
            <Stamp size={16} color="#8B5CF6" />
            <Typography variant="subtitle2" fontWeight="600">Approval Authority</Typography>
          </Stack>
          {permissions.approvalAuthority.length > 0 ? (
            <Stack spacing={0.75}>
              {permissions.approvalAuthority.map((auth, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#8B5CF6' }} />
                  <Typography variant="body2">{auth}</Typography>
                </Stack>
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">No approval authority</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccessPermissionsPanel;
