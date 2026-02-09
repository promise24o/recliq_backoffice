'use client';
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Button, Switch, FormControlLabel, TextField, Alert, Accordion, AccordionSummary, AccordionDetails, Grid, Chip, IconButton } from '@mui/material';
import { Shield, AlertTriangle, Settings, Plus, Trash2, ChevronDown, Lock, Clock, Users, CheckCircle } from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { AntiAbuseControl } from '../types';

interface AntiAbuseDilutionControlsProps {
  controls: AntiAbuseControl[];
  onUpdateControl: (id: string, control: Partial<AntiAbuseControl>) => void;
  onAddControl: (control: Omit<AntiAbuseControl, 'id'>) => void;
  onDeleteControl: (id: string) => void;
}

const AntiAbuseDilutionControls: React.FC<AntiAbuseDilutionControlsProps> = ({
  controls,
  onUpdateControl,
  onAddControl,
  onDeleteControl
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newControl, setNewControl] = useState({
    name: '',
    type: 'verification_threshold' as const,
    isActive: true,
    description: '',
    configuration: {}
  });

  const handleAddControl = () => {
    if (newControl.name && newControl.description) {
      onAddControl(newControl);
      setNewControl({
        name: '',
        type: 'verification_threshold',
        isActive: true,
        description: '',
        configuration: {}
      });
      setIsAdding(false);
    }
  };

  const handleToggleControl = (id: string) => {
    const control = controls.find(c => c.id === id);
    if (control) {
      onUpdateControl(id, { isActive: !control.isActive });
    }
  };

  const getControlTypeLabel = (type: string): string => {
    switch (type) {
      case 'verification_threshold': return 'Verification Threshold';
      case 'dispute_free_requirement': return 'Dispute-Free Requirement';
      case 'fraud_exclusion': return 'Fraud Exclusion';
      case 'cool_down_period': return 'Cool-Down Period';
      default: return type;
    }
  };

  const getControlTypeIcon = (type: string) => {
    switch (type) {
      case 'verification_threshold': return <Shield size={16} />;
      case 'dispute_free_requirement': return <CheckCircle size={16} />;
      case 'fraud_exclusion': return <AlertTriangle size={16} />;
      case 'cool_down_period': return <Clock size={16} />;
      default: return <Settings size={16} />;
    }
  };

  const getControlTypeColor = (type: string): string => {
    switch (type) {
      case 'verification_threshold': return '#3b82f6';
      case 'dispute_free_requirement': return '#10b981';
      case 'fraud_exclusion': return '#ef4444';
      case 'cool_down_period': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const renderConfiguration = (control: AntiAbuseControl) => {
    const { type, configuration } = control;

    switch (type) {
      case 'verification_threshold':
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Minimum Account Age
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {configuration.minAccountAge || 7} days
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Minimum Pickups
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {configuration.minPickups || 1}
              </Typography>
            </Grid>
          </Grid>
        );

      case 'dispute_free_requirement':
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Dispute-Free Days
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {configuration.minDisputeFreeDays || 30} days
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Max Dispute Count
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {configuration.maxDisputeCount || 0}
              </Typography>
            </Grid>
          </Grid>
        );

      case 'fraud_exclusion':
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Fraud Score Threshold
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {configuration.fraudScoreThreshold || 0.7}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Exclusion Period
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {configuration.exclusionPeriod || 365} days
              </Typography>
            </Grid>
          </Grid>
        );

      case 'cool_down_period':
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Min Time Between Badges
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {configuration.minTimeBetweenBadges || 24} hours
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Max Badges Per Day
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {configuration.maxBadgesPerDay || 3}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Max Badges Per Week
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {configuration.maxBadgesPerWeek || 10}
              </Typography>
            </Grid>
          </Grid>
        );

      default:
        return (
          <Typography variant="body2" color="text.secondary">
            No specific configuration
          </Typography>
        );
    }
  };

  return (
    <DashboardCard title="Anti-Abuse & Dilution Controls">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🛡️ Safeguards • Minimum verification thresholds • Dispute-free requirements • Fraud exclusion rules
          </Typography>
        </Box>

        {/* Summary */}
        <Stack direction="row" spacing={3} mb={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Shield size={20} color="#3b82f6" />
            <Typography variant="h6" fontWeight="600">
              {controls.filter(c => c.isActive).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Controls
            </Typography>
          </Stack>
          
          <Stack direction="row" spacing={1} alignItems="center">
            <Lock size={20} color="#ef4444" />
            <Typography variant="h6" fontWeight="600">
              {controls.filter(c => c.type === 'fraud_exclusion').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fraud Controls
            </Typography>
          </Stack>
        </Stack>

        {/* Add New Control */}
        {!isAdding ? (
          <Button
            variant="outlined"
            startIcon={<Plus />}
            onClick={() => setIsAdding(true)}
            sx={{ mb: 3 }}
          >
            Add Control
          </Button>
        ) : (
          <Card sx={{ mb: 3, bgcolor: '#f8fafc', border: '2px dashed #3b82f6' }}>
            <CardContent>
              <Typography variant="h6" mb={2}>New Anti-Abuse Control</Typography>
              <Stack spacing={2}>
                <TextField
                  label="Control Name"
                  value={newControl.name}
                  onChange={(e) => setNewControl(prev => ({ ...prev, name: e.target.value }))}
                  fullWidth
                  size="small"
                />
                
                <TextField
                  label="Type"
                  select
                  value={newControl.type}
                  onChange={(e) => setNewControl(prev => ({ ...prev, type: e.target.value as any }))}
                  fullWidth
                  size="small"
                >
                  <option value="verification_threshold">Verification Threshold</option>
                  <option value="dispute_free_requirement">Dispute-Free Requirement</option>
                  <option value="fraud_exclusion">Fraud Exclusion</option>
                  <option value="cool_down_period">Cool-Down Period</option>
                </TextField>
                
                <TextField
                  label="Description"
                  value={newControl.description}
                  onChange={(e) => setNewControl(prev => ({ ...prev, description: e.target.value }))}
                  fullWidth
                  size="small"
                  multiline
                  rows={2}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={newControl.isActive}
                      onChange={(e) => setNewControl(prev => ({ ...prev, isActive: e.target.checked }))}
                    />
                  }
                  label="Active"
                />
                
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    onClick={handleAddControl}
                    disabled={!newControl.name || !newControl.description}
                  >
                    Add Control
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setIsAdding(false)}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Controls List */}
        <Stack spacing={2}>
          {controls.map((control) => (
            <Card key={control.id} sx={{ 
              border: `1px solid ${control.isActive ? '#10b98130' : '#6b728030'}`,
              opacity: control.isActive ? 1 : 0.7
            }}>
              <CardContent>
                <Stack spacing={3}>
                  {/* Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: `${getControlTypeColor(control.type)}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: getControlTypeColor(control.type)
                        }}
                      >
                        {getControlTypeIcon(control.type)}
                      </Box>
                      
                      <Box>
                        <Typography variant="h6" fontWeight="600">
                          {control.name}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            label={getControlTypeLabel(control.type)}
                            size="small"
                            sx={{
                              bgcolor: `${getControlTypeColor(control.type)}15`,
                              color: getControlTypeColor(control.type),
                              fontSize: '0.75rem'
                            }}
                          />
                          <Chip
                            label={control.isActive ? 'Active' : 'Inactive'}
                            size="small"
                            color={control.isActive ? 'success' : 'default'}
                            sx={{ fontSize: '0.75rem' }}
                          />
                        </Stack>
                      </Box>
                    </Stack>
                    
                    <Stack direction="row" spacing={1} alignItems="center">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={control.isActive}
                            onChange={() => handleToggleControl(control.id)}
                            size="small"
                          />
                        }
                        label=""
                      />
                      <IconButton
                        size="small"
                        onClick={() => onDeleteControl(control.id)}
                        sx={{ color: '#ef4444' }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Stack>
                  </Stack>

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary">
                    {control.description}
                  </Typography>

                  {/* Configuration */}
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="600" mb={2}>
                      Configuration
                    </Typography>
                    {renderConfiguration(control)}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Control Types Explanation */}
        <Accordion sx={{ mt: 3 }}>
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Typography variant="h6">Control Types & Best Practices</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <Alert severity="info">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Verification Thresholds
                </Typography>
                <Typography variant="body2">
                  Ensure users meet minimum requirements before earning badges. Prevents automated or fake accounts from gaming the system.
                </Typography>
              </Alert>

              <Alert severity="info">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Dispute-Free Requirements
                </Typography>
                <Typography variant="body2">
                  Trust-based badges require clean dispute records. Maintains badge value and credibility.
                </Typography>
              </Alert>

              <Alert severity="warning">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Fraud Exclusion Rules
                </Typography>
                <Typography variant="body2">
                  Automatically exclude users with fraud history from earning badges. Protects system integrity.
                </Typography>
              </Alert>

              <Alert severity="warning">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Cool-Down Periods
                </Typography>
                <Typography variant="body2">
                  Prevent badge farming through time restrictions. Ensures badges reflect genuine achievement.
                </Typography>
              </Alert>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* System Health */}
        <Alert severity="success" sx={{ mt: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            System Health Status
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {controls.filter(c => c.isActive).length} of {controls.length} controls are active
            </Typography>
            <Typography variant="body2">
              • All fraud prevention measures are operational
            </Typography>
            <Typography variant="body2">
              • Badge dilution protections are in place
            </Typography>
            <Typography variant="body2">
              • System integrity maintained through layered safeguards
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default AntiAbuseDilutionControls;
