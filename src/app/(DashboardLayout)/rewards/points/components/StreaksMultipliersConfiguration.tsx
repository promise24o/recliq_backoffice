'use client'
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Chip, Button, TextField, Switch, FormControlLabel, Accordion, AccordionSummary, AccordionDetails, Grid, IconButton, MenuItem, Avatar, Alert } from '@mui/material';
import { Zap, Plus, Edit, Trash2, ChevronDown, Play, Pause, Calendar, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { StreakMultiplier } from '../types';

interface StreaksMultipliersConfigurationProps {
  streakMultipliers: StreakMultiplier[];
  onAddMultiplier: (multiplier: Omit<StreakMultiplier, 'id'>) => void;
  onUpdateMultiplier: (id: string, multiplier: Partial<StreakMultiplier>) => void;
  onDeleteMultiplier: (id: string) => void;
  onActivateMultiplier: (id: string) => void;
  onPauseMultiplier: (id: string) => void;
}

const StreaksMultipliersConfiguration: React.FC<StreaksMultipliersConfigurationProps> = ({
  streakMultipliers,
  onAddMultiplier,
  onUpdateMultiplier,
  onDeleteMultiplier,
  onActivateMultiplier,
  onPauseMultiplier
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newMultiplier, setNewMultiplier] = useState({
    type: 'daily' as 'daily' | 'weekly',
    threshold: 3,
    multiplier: 1.2,
    decayRule: 'Reset after 48 hours of inactivity',
    resetCondition: 'No activity for 48 hours',
    status: 'active' as 'active' | 'paused'
  });

  const handleAddNew = () => {
    onAddMultiplier(newMultiplier);
    setNewMultiplier({
      type: 'daily',
      threshold: 3,
      multiplier: 1.2,
      decayRule: 'Reset after 48 hours of inactivity',
      resetCondition: 'No activity for 48 hours',
      status: 'active'
    });
    setIsAddingNew(false);
  };

  const handleUpdate = (id: string, field: keyof StreakMultiplier, value: any) => {
    onUpdateMultiplier(id, { [field]: value });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily':
        return <Clock size={16} />;
      case 'weekly':
        return <Calendar size={16} />;
      default:
        return <TrendingUp size={16} />;
    }
  };

  return (
    <DashboardCard title="Streaks & Multipliers Configuration">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🔥 Encourage consistent behavior, not one-offs • Drive engagement through streak rewards
          </Typography>
        </Box>

        {/* Summary */}
        <Stack direction="row" spacing={3} mb={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Zap size={20} color="#f59e0b" />
            <Typography variant="h6" fontWeight="600">
              {streakMultipliers.filter(m => m.status === 'active').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Multipliers
            </Typography>
          </Stack>
          
          <Stack direction="row" spacing={1} alignItems="center">
            <TrendingUp size={20} color="#10b981" />
            <Typography variant="h6" fontWeight="600">
              {Math.max(...streakMultipliers.map(m => m.multiplier)).toFixed(1)}×
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Max Multiplier
            </Typography>
          </Stack>
        </Stack>

        {/* Add New Multiplier */}
        {!isAddingNew ? (
          <Button
            variant="outlined"
            startIcon={<Plus />}
            onClick={() => setIsAddingNew(true)}
            sx={{ mb: 2 }}
          >
            Add New Multiplier
          </Button>
        ) : (
          <Card sx={{ mb: 2, bgcolor: '#f8fafc', border: '2px dashed #3b82f6' }}>
            <CardContent>
              <Typography variant="h6" mb={2}>New Streak Multiplier</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <TextField
                      label="Type"
                      select
                      value={newMultiplier.type}
                      onChange={(e) => setNewMultiplier(prev => ({ ...prev, type: e.target.value as 'daily' | 'weekly' }))}
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="daily">Daily Streak</MenuItem>
                      <MenuItem value="weekly">Weekly Streak</MenuItem>
                    </TextField>
                    
                    <TextField
                      label="Threshold"
                      type="number"
                      value={newMultiplier.threshold}
                      onChange={(e) => setNewMultiplier(prev => ({ ...prev, threshold: parseInt(e.target.value) || 0 }))}
                      fullWidth
                      size="small"
                    />
                    
                    <TextField
                      label="Multiplier"
                      type="number"
                      inputProps={{ step: "0.1" }}
                      value={newMultiplier.multiplier}
                      onChange={(e) => setNewMultiplier(prev => ({ ...prev, multiplier: parseFloat(e.target.value) || 0 }))}
                      fullWidth
                      size="small"
                    />
                  </Stack>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <TextField
                      label="Decay Rule"
                      value={newMultiplier.decayRule}
                      onChange={(e) => setNewMultiplier(prev => ({ ...prev, decayRule: e.target.value }))}
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                    />
                    
                    <TextField
                      label="Reset Condition"
                      value={newMultiplier.resetCondition}
                      onChange={(e) => setNewMultiplier(prev => ({ ...prev, resetCondition: e.target.value }))}
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={newMultiplier.status === 'active'}
                          onChange={(e) => setNewMultiplier(prev => ({ 
                            ...prev, 
                            status: e.target.checked ? 'active' : 'paused' 
                          }))}
                        />
                      }
                      label="Active"
                    />
                  </Stack>
                </Grid>
              </Grid>
              
              <Stack direction="row" spacing={2} mt={2}>
                <Button
                  variant="contained"
                  onClick={handleAddNew}
                >
                  Add Multiplier
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsAddingNew(false)}
                >
                  Cancel
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Existing Multipliers */}
        <Stack spacing={2}>
          {streakMultipliers.map((multiplier) => (
            <Card key={multiplier.id} sx={{ border: `1px solid ${multiplier.status === 'active' ? '#10b98130' : '#f59e0b30'}` }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Avatar
                    sx={{
                      bgcolor: multiplier.status === 'active' ? '#10b98115' : '#f59e0b15',
                      color: multiplier.status === 'active' ? '#10b981' : '#f59e0b',
                      width: 40,
                      height: 40
                    }}
                  >
                    {getTypeIcon(multiplier.type)}
                  </Avatar>
                  
                  <Box flex={1}>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <Typography variant="h6" fontWeight="600">
                        {multiplier.type === 'daily' ? 'Daily' : 'Weekly'} Streak
                      </Typography>
                      <Chip
                        label={`${multiplier.threshold} ${multiplier.type}`}
                        size="small"
                        sx={{ bgcolor: '#3b82f615', color: '#3b82f6' }}
                      />
                      <Chip
                        label={`×${multiplier.multiplier}`}
                        size="small"
                        sx={{ bgcolor: '#f59e0b15', color: '#f59e0b' }}
                      />
                      <Chip
                        label={multiplier.status.toUpperCase()}
                        size="small"
                        color={getStatusColor(multiplier.status) as any}
                      />
                    </Stack>
                    
                    <Stack spacing={1} mb={2}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <AlertTriangle size={16} color="#6b7280" />
                        <Typography variant="body2" color="text.secondary">
                          <strong>Decay:</strong> {multiplier.decayRule}
                        </Typography>
                      </Stack>
                      
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Clock size={16} color="#6b7280" />
                        <Typography variant="body2" color="text.secondary">
                          <strong>Reset:</strong> {multiplier.resetCondition}
                        </Typography>
                      </Stack>
                    </Stack>
                    
                    {/* Edit Mode */}
                    {editingId === multiplier.id ? (
                      <Stack spacing={2}>
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                              label="Threshold"
                              type="number"
                              value={multiplier.threshold}
                              onChange={(e) => handleUpdate(multiplier.id, 'threshold', parseInt(e.target.value) || 0)}
                              size="small"
                              fullWidth
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                              label="Multiplier"
                              type="number"
                              inputProps={{ step: "0.1" }}
                              value={multiplier.multiplier}
                              onChange={(e) => handleUpdate(multiplier.id, 'multiplier', parseFloat(e.target.value) || 0)}
                              size="small"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                        
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => setEditingId(null)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </Button>
                        </Stack>
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing={1}>
                        {multiplier.status === 'paused' ? (
                          <IconButton
                            size="small"
                            onClick={() => onActivateMultiplier(multiplier.id)}
                            sx={{ color: '#10b981' }}
                          >
                            <Play size={16} />
                          </IconButton>
                        ) : (
                          <IconButton
                            size="small"
                            onClick={() => onPauseMultiplier(multiplier.id)}
                            sx={{ color: '#f59e0b' }}
                          >
                            <Pause size={16} />
                          </IconButton>
                        )}
                        
                        <IconButton
                          size="small"
                          onClick={() => setEditingId(multiplier.id)}
                        >
                          <Edit size={16} />
                        </IconButton>
                        
                        <IconButton
                          size="small"
                          onClick={() => onDeleteMultiplier(multiplier.id)}
                          sx={{ color: '#ef4444' }}
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </Stack>
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Examples */}
        <Accordion sx={{ mt: 3 }}>
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Typography variant="h6">Example Configurations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <Alert severity="info">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Daily Streak Example
                </Typography>
                <Typography variant="body2" mb={1}>
                  Day 3 streak → 1.2× points
                </Typography>
                <Typography variant="body2" mb={1}>
                  Day 7 streak → 1.5× points
                </Typography>
                <Typography variant="body2">
                  Miss 48h → reset
                </Typography>
              </Alert>
              
              <Alert severity="info">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Weekly Streak Example
                </Typography>
                <Typography variant="body2" mb={1}>
                  4 consecutive weeks → 1.3× points
                </Typography>
                <Typography variant="body2">
                  Miss 1 week → reset
                </Typography>
              </Alert>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </DashboardCard>
  );
};

export default StreaksMultipliersConfiguration;
