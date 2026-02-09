'use client'
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Alert, Slider, TextField, Switch, FormControlLabel, Button, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, ListItemIcon, IconButton, Grid } from '@mui/material';
import { Shield, AlertTriangle, Settings, Plus, Trash2, ChevronDown, TrendingUp, Users, Clock, Target } from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { AbusePreventionConfig } from '../types';

interface AbusePreventionLimitsProps {
  config: AbusePreventionConfig;
  onUpdateConfig: (config: Partial<AbusePreventionConfig>) => void;
}

const AbusePreventionLimits: React.FC<AbusePreventionLimitsProps> = ({ config, onUpdateConfig }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newConstraint, setNewConstraint] = useState('');
  const [editingConfig, setEditingConfig] = useState<AbusePreventionConfig>(config);

  const handleSave = () => {
    onUpdateConfig(editingConfig);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingConfig(config);
    setIsEditing(false);
  };

  const handleAddConstraint = () => {
    if (newConstraint.trim()) {
      setEditingConfig(prev => ({
        ...prev,
        antiGamingConstraints: [...prev.antiGamingConstraints, newConstraint.trim()]
      }));
      setNewConstraint('');
    }
  };

  const handleRemoveConstraint = (index: number) => {
    setEditingConfig(prev => ({
      ...prev,
      antiGamingConstraints: prev.antiGamingConstraints.filter((_, i) => i !== index)
    }));
  };

  const getRiskLevel = (value: number, thresholds: { low: number; medium: number; high: number }) => {
    if (value <= thresholds.low) return { level: 'Low', color: '#10b981' };
    if (value <= thresholds.medium) return { level: 'Medium', color: '#f59e0b' };
    return { level: 'High', color: '#ef4444' };
  };

  return (
    <DashboardCard title="Abuse Prevention & Limits">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🛡️ Prevent farming • Protect liabilities • Maintain fairness • Monitor suspicious patterns
          </Typography>
        </Box>

        {/* Risk Assessment */}
        <Stack spacing={2} mb={3}>
          <Alert severity="warning">
            <Typography variant="body2" fontWeight="600">
              Current Risk Assessment
            </Typography>
            <Typography variant="body2">
              Review limits regularly to balance user experience with platform protection
            </Typography>
          </Alert>
        </Stack>

        {/* Main Limits */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Core Limits</Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={isEditing ? <Settings /> : <Settings />}
                onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
              >
                {isEditing ? 'Cancel' : 'Edit Limits'}
              </Button>
            </Stack>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={3}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2" fontWeight="500">Max Points per Day</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {isEditing ? editingConfig.maxPointsPerDay : config.maxPointsPerDay}
                      </Typography>
                    </Stack>
                    {isEditing && (
                      <Slider
                        value={editingConfig.maxPointsPerDay}
                        onChange={(e, value) => setEditingConfig(prev => ({ ...prev, maxPointsPerDay: value as number }))}
                        min={50}
                        max={500}
                        step={10}
                        marks={[
                          { value: 50, label: '50' },
                          { value: 200, label: '200' },
                          { value: 500, label: '500' }
                        ]}
                        sx={{ mt: 1 }}
                      />
                    )}
                    <Typography variant="caption" color="text.secondary">
                      Risk: {getRiskLevel(config.maxPointsPerDay, { low: 100, medium: 200, high: 300 }).level}
                    </Typography>
                  </Box>

                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2" fontWeight="500">Max Points per Kg</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {isEditing ? editingConfig.maxPointsPerKg : config.maxPointsPerKg}
                      </Typography>
                    </Stack>
                    {isEditing && (
                      <Slider
                        value={editingConfig.maxPointsPerKg}
                        onChange={(e, value) => setEditingConfig(prev => ({ ...prev, maxPointsPerKg: value as number }))}
                        min={1}
                        max={10}
                        step={0.5}
                        marks={[
                          { value: 1, label: '1' },
                          { value: 5, label: '5' },
                          { value: 10, label: '10' }
                        ]}
                        sx={{ mt: 1 }}
                      />
                    )}
                    <Typography variant="caption" color="text.secondary">
                      Risk: {getRiskLevel(config.maxPointsPerKg, { low: 3, medium: 6, high: 8 }).level}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={3}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2" fontWeight="500">Drop-off Frequency Cap</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {isEditing ? editingConfig.dropoffFrequencyCap : config.dropoffFrequencyCap}
                      </Typography>
                    </Stack>
                    {isEditing && (
                      <Slider
                        value={editingConfig.dropoffFrequencyCap}
                        onChange={(e, value) => setEditingConfig(prev => ({ ...prev, dropoffFrequencyCap: value as number }))}
                        min={1}
                        max={20}
                        step={1}
                        marks={[
                          { value: 1, label: '1' },
                          { value: 10, label: '10' },
                          { value: 20, label: '20' }
                        ]}
                        sx={{ mt: 1 }}
                      />
                    )}
                    <Typography variant="caption" color="text.secondary">
                      Per day limit
                    </Typography>
                  </Box>

                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2" fontWeight="500">Referral Fraud Throttle</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {isEditing ? editingConfig.referralFraudThrottle : config.referralFraudThrottle}
                      </Typography>
                    </Stack>
                    {isEditing && (
                      <Slider
                        value={editingConfig.referralFraudThrottle}
                        onChange={(e, value) => setEditingConfig(prev => ({ ...prev, referralFraudThrottle: value as number }))}
                        min={1}
                        max={10}
                        step={1}
                        marks={[
                          { value: 1, label: '1' },
                          { value: 5, label: '5' },
                          { value: 10, label: '10' }
                        ]}
                        sx={{ mt: 1 }}
                      />
                    )}
                    <Typography variant="caption" color="text.secondary">
                      Max referrals per user
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>

            {isEditing && (
              <Stack direction="row" spacing={2} mt={3}>
                <Button variant="contained" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* Anti-Gaming Constraints */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" mb={2}>Anti-Gaming Constraints</Typography>
            
            <Stack spacing={2}>
              {(isEditing ? editingConfig.antiGamingConstraints : config.antiGamingConstraints).map((constraint, index) => (
                <Stack key={index} direction="row" spacing={2} alignItems="center">
                  <Shield size={16} color="#ef4444" />
                  <Typography variant="body2" flex={1}>
                    {constraint}
                  </Typography>
                  {isEditing && (
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveConstraint(index)}
                      sx={{ color: '#ef4444' }}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  )}
                </Stack>
              ))}
            </Stack>

            {isEditing && (
              <Stack direction="row" spacing={2} mt={2}>
                <TextField
                  placeholder="Add new constraint..."
                  value={newConstraint}
                  onChange={(e) => setNewConstraint(e.target.value)}
                  size="small"
                  sx={{ flex: 1 }}
                />
                <Button
                  variant="outlined"
                  startIcon={<Plus />}
                  onClick={handleAddConstraint}
                  disabled={!newConstraint.trim()}
                >
                  Add
                </Button>
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* Alert Thresholds */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" mb={2}>Alert Thresholds</Typography>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AlertTriangle size={16} color="#f59e0b" />
                    <Typography variant="body2" fontWeight="500">Suspicious Activity</Typography>
                  </Stack>
                  <Typography variant="h6" color="#f59e0b">
                    {config.alertThresholds.suspiciousActivity}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Points threshold
                  </Typography>
                </Stack>
              </Grid>
              
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TrendingUp size={16} color="#ef4444" />
                    <Typography variant="body2" fontWeight="500">Unusual Patterns</Typography>
                  </Stack>
                  <Typography variant="h6" color="#ef4444">
                    {config.alertThresholds.unusualPatterns}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Activity threshold
                  </Typography>
                </Stack>
              </Grid>
              
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Users size={16} color="#8b5cf6" />
                    <Typography variant="body2" fontWeight="500">Potential Abuse</Typography>
                  </Stack>
                  <Typography variant="h6" color="#8b5cf6">
                    {config.alertThresholds.potentialAbuse}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Risk score threshold
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Prevention Strategies */}
        <Accordion>
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Typography variant="h6">Prevention Strategies</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <Alert severity="info">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Location-Based Controls
                </Typography>
                <Typography variant="body2">
                  Monitor pickup frequency by location to prevent concentration abuse
                </Typography>
              </Alert>
              
              <Alert severity="info">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Time-Based Restrictions
                </Typography>
                <Typography variant="body2">
                  Implement cooldown periods between pickups to prevent rapid farming
                </Typography>
              </Alert>
              
              <Alert severity="info">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Weight Validation
                </Typography>
                <Typography variant="body2">
                  Cross-reference weight data with historical patterns to detect anomalies
                </Typography>
              </Alert>
              
              <Alert severity="info">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Account Verification
                </Typography>
                <Typography variant="body2">
                  Require additional verification for high-value or high-frequency accounts
                </Typography>
              </Alert>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Impact Summary */}
        <Alert severity="success" sx={{ mt: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            Protection Summary
          </Typography>
          <Typography variant="body2">
            Current limits protect against point farming while maintaining fair user experience. 
            Monitor alert thresholds and adjust based on observed abuse patterns.
          </Typography>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default AbusePreventionLimits;
