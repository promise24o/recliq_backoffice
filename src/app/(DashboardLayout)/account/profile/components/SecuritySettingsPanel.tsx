'use client';
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
  Chip,
  Button,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  Lock,
  Shield,
  Key,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';
import type { SecuritySettings } from '../types';

interface SecuritySettingsPanelProps {
  security: SecuritySettings;
  onChangePassword?: () => void;
}

const SecuritySettingsPanel: React.FC<SecuritySettingsPanelProps> = ({
  security,
  onChangePassword,
}) => {
  const getStrengthColor = (strength: string) => {
    const colors: Record<string, string> = {
      weak: '#EF4444',
      moderate: '#F59E0B',
      strong: '#10B981',
    };
    return colors[strength] || '#6B7280';
  };

  const getStrengthValue = (strength: string) => {
    const values: Record<string, number> = {
      weak: 33,
      moderate: 66,
      strong: 100,
    };
    return values[strength] || 0;
  };

  const daysSincePasswordChange = Math.floor(
    (Date.now() - new Date(security.passwordLastChanged).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
        <Lock size={20} color="#3B82F6" />
        <Typography variant="h6" fontWeight="600">Security Settings</Typography>
      </Stack>

      <Grid container spacing={4}>
        {/* Authentication */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle2" fontWeight="600" mb={2}>Authentication</Typography>

          {/* Password Status */}
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Key size={16} color="#6B7280" />
                <Typography variant="body2" fontWeight="600">Password</Typography>
              </Stack>
              <Chip
                label={security.passwordStrength.charAt(0).toUpperCase() + security.passwordStrength.slice(1)}
                size="small"
                sx={{
                  bgcolor: getStrengthColor(security.passwordStrength) + '15',
                  color: getStrengthColor(security.passwordStrength),
                  fontWeight: 600,
                  fontSize: '0.65rem',
                }}
              />
            </Stack>

            <Typography variant="caption" color="text.secondary" display="block" mb={1}>
              Password Strength
            </Typography>
            <LinearProgress
              variant="determinate"
              value={getStrengthValue(security.passwordStrength)}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: '#f1f5f9',
                mb: 1.5,
                '& .MuiLinearProgress-bar': {
                  bgcolor: getStrengthColor(security.passwordStrength),
                  borderRadius: 3,
                },
              }}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" color="text.secondary">
                Last changed: {new Date(security.passwordLastChanged).toLocaleDateString('en-NG', { dateStyle: 'medium' })}
                {' '}({daysSincePasswordChange} days ago)
              </Typography>
            </Stack>

            {daysSincePasswordChange > 60 && (
              <Stack direction="row" spacing={0.5} alignItems="center" mt={1}>
                <AlertTriangle size={12} color="#F59E0B" />
                <Typography variant="caption" color="#F59E0B">
                  Consider changing your password — it&apos;s been over 60 days
                </Typography>
              </Stack>
            )}

            <Button
              size="small"
              variant="outlined"
              startIcon={<RefreshCw size={14} />}
              sx={{ mt: 2 }}
              onClick={onChangePassword}
            >
              Change Password
            </Button>
          </Box>

          {/* Strong Password Enforcement */}
          <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Shield size={14} color="#10B981" />
              <Typography variant="caption" color="text.secondary">
                Strong password enforcement: <strong>{security.enforceStrongPassword ? 'Enabled' : 'Disabled'}</strong>
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SecuritySettingsPanel;
