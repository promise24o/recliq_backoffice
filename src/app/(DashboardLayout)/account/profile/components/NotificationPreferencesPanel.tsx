'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Switch,
  Chip,
  Tooltip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Bell,
  Mail,
  Lock,
  Info,
  CheckCircle,
} from 'lucide-react';
import type { NotificationPreference } from '../types';

interface NotificationPreferencesPanelProps {
  preferences: NotificationPreference[];
  onToggle?: (id: string, channel: 'email' | 'inApp', value: boolean) => void;
}

const NotificationPreferencesPanel: React.FC<NotificationPreferencesPanelProps> = ({
  preferences,
  onToggle,
}) => {
  const [localPrefs, setLocalPrefs] = useState<NotificationPreference[]>(preferences);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleToggle = async (id: string, channel: 'email' | 'inApp', value: boolean) => {
    // Clear previous messages
    setError(null);
    setSuccessMessage(null);
    
    // Set loading state for this specific preference
    setIsUpdating(`${id}-${channel}`);
    
    try {
      // Find the preference to get the correct field name
      const preference = localPrefs.find(p => p.id === id);
      if (!preference) {
        throw new Error('Preference not found');
      }

      // Prepare the update payload
      const updatePayload = {
        [`${preference.type}.${channel}`]: value
      };

      // Make API call
      const response = await fetch('/admins/profile/me/notifications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {
        throw new Error('Failed to update notification preference');
      }

      const result = await response.json();
      
      // Update local state
      setLocalPrefs((prev) =>
        prev.map((p) => {
          if (p.id === id && !p.forced) {
            const updated = { ...p, [channel]: value };
            onToggle?.(id, channel, updated[channel]);
            return updated;
          }
          return p;
        })
      );

      // Show success message
      setSuccessMessage(result.message || 'Notification preference updated successfully');
      
    } catch (error) {
      console.error('Error updating notification preference:', error);
      setError('Failed to update notification preference. Please try again.');
    } finally {
      // Clear loading state
      setIsUpdating(null);
    }
  };

  // Handle toggle with immediate UI update
  const handleToggleClick = (id: string, channel: 'email' | 'inApp') => {
    const preference = localPrefs.find(p => p.id === id);
    if (!preference || preference.forced) return;

    const currentValue = preference[channel];
    const newValue = !currentValue;
    
    // Update UI immediately for better UX
    setLocalPrefs((prev) =>
      prev.map((p) => {
        if (p.id === id && !p.forced) {
          const updated = { ...p, [channel]: newValue };
          onToggle?.(id, channel, updated[channel]);
          return updated;
        }
        return p;
      })
    );

    // Then make API call
    handleToggle(id, channel, newValue);
  };

  const categories = Array.from(new Set(localPrefs.map((p) => p.category)));

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      Security: '#EF4444',
      Operations: '#3B82F6',
      Finance: '#10B981',
      System: '#8B5CF6',
    };
    return colors[cat] || '#6B7280';
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
        <Bell size={20} color="#F59E0B" />
        <Typography variant="h6" fontWeight="600">Notification Preferences</Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Control how you receive notifications. Security alerts cannot be disabled.
      </Typography>

      {/* Success Message */}
      {successMessage && (
        <Alert 
          severity="success" 
          sx={{ mb: 2 }}
          icon={<CheckCircle size={16} />}
        >
          {successMessage}
        </Alert>
      )}

      {/* Error Message */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      <Stack spacing={3}>
        {categories.map((category) => {
          const catColor = getCategoryColor(category);
          const catPrefs = localPrefs.filter((p) => p.category === category);

          return (
            <Box key={category}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: catColor }} />
                <Typography variant="subtitle2" fontWeight="600">{category}</Typography>
              </Stack>

              <Stack spacing={0}>
                {catPrefs.map((pref) => (
                  <Box
                    key={pref.id}
                    sx={{
                      py: 1.5,
                      px: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': { borderBottom: 'none' },
                      '&:hover': { bgcolor: '#f8fafc' },
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box flex={1} mr={2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2" fontWeight="600">{pref.label}</Typography>
                          {pref.forced && (
                            <Tooltip title="This alert is mandatory and cannot be disabled">
                              <Chip
                                icon={<Lock size={10} />}
                                label="Required"
                                size="small"
                                sx={{
                                  bgcolor: '#EF444415',
                                  color: '#EF4444',
                                  fontWeight: 600,
                                  fontSize: '0.55rem',
                                  height: 18,
                                  '& .MuiChip-icon': { color: '#EF4444', fontSize: 10 },
                                }}
                              />
                            </Tooltip>
                          )}
                        </Stack>
                        <Typography variant="caption" color="text.secondary">{pref.description}</Typography>
                      </Box>

                      <Stack direction="row" spacing={3} alignItems="center">
                        <Stack alignItems="center" spacing={0.25}>
                          <Mail size={14} color="#6B7280" />
                          {isUpdating === `${pref.id}-email` ? (
                            <CircularProgress size={20} />
                          ) : (
                            <Switch
                              size="small"
                              checked={pref.email}
                              disabled={pref.forced}
                              onChange={() => handleToggleClick(pref.id, 'email')}
                            />
                          )}
                        </Stack>
                        <Stack alignItems="center" spacing={0.25}>
                          <Bell size={14} color="#6B7280" />
                          {isUpdating === `${pref.id}-inApp` ? (
                            <CircularProgress size={20} />
                          ) : (
                            <Switch
                              size="small"
                              checked={pref.inApp}
                              disabled={pref.forced}
                              onChange={() => handleToggleClick(pref.id, 'inApp')}
                            />
                          )}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
          );
        })}
      </Stack>

      {/* Legend */}
      <Box sx={{ mt: 3, p: 1.5, bgcolor: '#f8fafc', borderRadius: 1 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Mail size={12} color="#6B7280" />
            <Typography variant="caption" color="text.secondary">Email</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Bell size={12} color="#6B7280" />
            <Typography variant="caption" color="text.secondary">In-App</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Lock size={12} color="#EF4444" />
            <Typography variant="caption" color="text.secondary">Required — cannot be disabled</Typography>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default NotificationPreferencesPanel;
