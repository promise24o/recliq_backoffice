'use client';
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Button, TextField, Accordion, AccordionSummary, AccordionDetails, LinearProgress, Chip, IconButton, Grid, Alert } from '@mui/material';
import { ChevronDown, Plus, Edit, Trash2, TrendingUp, Award, Target, Users, Clock, ArrowRight } from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { BadgeProgression } from '../types';

interface BadgeEarningFlowProgressionProps {
  progressions: BadgeProgression[];
  onCreateProgression: (progression: Omit<BadgeProgression, 'id'>) => void;
  onUpdateProgression: (id: string, progression: Partial<BadgeProgression>) => void;
  onDeleteProgression: (id: string) => void;
}

const BadgeEarningFlowProgression: React.FC<BadgeEarningFlowProgressionProps> = ({
  progressions,
  onCreateProgression,
  onUpdateProgression,
  onDeleteProgression
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProgression, setNewProgression] = useState({
    name: '',
    requirements: '',
    description: '',
    path: [] as any[]
  });

  const handleCreate = () => {
    if (newProgression.name && newProgression.requirements && newProgression.description) {
      onCreateProgression(newProgression);
      setNewProgression({
        name: '',
        requirements: '',
        description: '',
        path: []
      });
      setIsCreating(false);
    }
  };

  const handleUpdate = (id: string, field: keyof BadgeProgression, value: any) => {
    onUpdateProgression(id, { [field]: value });
  };

  const getStepColor = (step: number, isCompleted: boolean, isCurrent: boolean) => {
    if (isCompleted) return '#10b981';
    if (isCurrent) return '#3b82f6';
    return '#e2e8f0';
  };

  const getStepIcon = (step: number, isCompleted: boolean, isCurrent: boolean) => {
    if (isCompleted) return '✓';
    if (isCurrent) return step;
    return step;
  };

  return (
    <DashboardCard title="Badge Earning Flow & Progression">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🎯 Ensure badges support long-term engagement • Create progression ladders and upgrade paths
          </Typography>
        </Box>

        {/* Create New Progression */}
        {!isCreating ? (
          <Button
            variant="outlined"
            startIcon={<Plus />}
            onClick={() => setIsCreating(true)}
            sx={{ mb: 3 }}
          >
            Create Progression Path
          </Button>
        ) : (
          <Card sx={{ mb: 3, bgcolor: '#f8fafc', border: '2px dashed #3b82f6' }}>
            <CardContent>
              <Typography variant="h6" mb={2}>New Progression Path</Typography>
              <Stack spacing={2}>
                <TextField
                  label="Path Name"
                  value={newProgression.name}
                  onChange={(e) => setNewProgression(prev => ({ ...prev, name: e.target.value }))}
                  fullWidth
                  size="small"
                />
                
                <TextField
                  label="Requirements"
                  value={newProgression.requirements}
                  onChange={(e) => setNewProgression(prev => ({ ...prev, requirements: e.target.value }))}
                  fullWidth
                  size="small"
                  multiline
                  rows={2}
                />
                
                <TextField
                  label="Description"
                  value={newProgression.description}
                  onChange={(e) => setNewProgression(prev => ({ ...prev, description: e.target.value }))}
                  fullWidth
                  size="small"
                  multiline
                  rows={2}
                />
                
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    onClick={handleCreate}
                    disabled={!newProgression.name || !newProgression.requirements || !newProgression.description}
                  >
                    Create Path
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Progression Paths */}
        <Stack spacing={3}>
          {progressions.map((progression) => (
            <Card key={progression.id} sx={{ border: '1px solid #e2e8f0' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box>
                    {editingId === progression.id ? (
                      <TextField
                        value={progression.name}
                        onChange={(e) => handleUpdate(progression.id, 'name', e.target.value)}
                        variant="standard"
                        sx={{ fontWeight: 600, mb: 1 }}
                      />
                    ) : (
                      <Typography variant="h6" fontWeight="600" mb={1}>
                        {progression.name}
                      </Typography>
                    )}
                    
                    {editingId === progression.id ? (
                      <TextField
                        value={progression.description}
                        onChange={(e) => handleUpdate(progression.id, 'description', e.target.value)}
                        variant="standard"
                        multiline
                        fullWidth
                        size="small"
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        {progression.description}
                      </Typography>
                    )}
                    
                    <Typography variant="body2" color="text.secondary">
                      <strong>Requirements:</strong> {progression.requirements}
                    </Typography>
                  </Box>
                  
                  <Stack direction="row" spacing={1}>
                    {editingId === progression.id ? (
                      <>
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
                      </>
                    ) : (
                      <>
                        <IconButton
                          size="small"
                          onClick={() => setEditingId(progression.id)}
                        >
                          <Edit size={16} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => onDeleteProgression(progression.id)}
                          sx={{ color: '#ef4444' }}
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </>
                    )}
                  </Stack>
                </Stack>

                {/* Progression Path Visualization */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" fontWeight="600" mb={2}>
                    Progression Path
                  </Typography>
                  
                  <Stack spacing={2}>
                    {progression.path.map((step, index) => (
                      <Box key={step.badgeId}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          {/* Step Circle */}
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              bgcolor: getStepColor(step.step, step.isCompleted, step.isCurrent),
                              color: step.isCompleted || step.isCurrent ? 'white' : '#6b7280',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              border: step.isCurrent ? '3px solid #3b82f6' : 'none'
                            }}
                          >
                            {getStepIcon(step.step, step.isCompleted, step.isCurrent)}
                          </Box>
                          
                          {/* Step Content */}
                          <Box flex={1}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Box>
                                <Typography variant="body2" fontWeight="500">
                                  Step {step.step}: {step.badgeName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Unlocks at {step.unlocksAt} {step.unlocksAt === 1 ? 'pickup' : 'pickups'}
                                </Typography>
                              </Box>
                              
                              <Stack direction="row" spacing={1}>
                                {step.isCompleted && (
                                  <Chip
                                    label="Completed"
                                    size="small"
                                    color="success"
                                    sx={{ fontSize: '0.75rem' }}
                                  />
                                )}
                                {step.isCurrent && (
                                  <Chip
                                    label="Current"
                                    size="small"
                                    color="primary"
                                    sx={{ fontSize: '0.75rem' }}
                                  />
                                )}
                              </Stack>
                            </Stack>
                          </Box>
                        </Stack>
                        
                        {/* Connector Line */}
                        {index < progression.path.length - 1 && (
                          <Box sx={{ 
                            ml: 5, 
                            height: 20, 
                            width: 2, 
                            bgcolor: '#e2e8f0',
                            position: 'relative'
                          }}>
                            <ArrowRight 
                              size={16} 
                              color="#6b7280" 
                              style={{ 
                                position: 'absolute', 
                                top: -8, 
                                left: -7 
                              }} 
                            />
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Box>

                {/* Progress Overview */}
                <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2" fontWeight="600">
                      Overall Progress
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {progression.path.filter(s => s.isCompleted).length} of {progression.path.length} completed
                    </Typography>
                  </Stack>
                  
                  <LinearProgress
                    variant="determinate"
                    value={(progression.path.filter(s => s.isCompleted).length / progression.path.length) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        bgcolor: '#3b82f6'
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Examples */}
        <Accordion sx={{ mt: 3 }}>
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Typography variant="h6">Example Progression Paths</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <Alert severity="info">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Eco Warrior Path
                </Typography>
                <Typography variant="body2" mb={1}>
                  <strong>Path:</strong> Eco Starter → Lagos Recycler → Waste Warrior
                </Typography>
                <Typography variant="body2" mb={1}>
                  <strong>Requirements:</strong> Complete pickups and recycle waste to advance
                </Typography>
                <Typography variant="body2">
                  <strong>Description:</strong> Progress from beginner to expert recycler
                </Typography>
              </Alert>
              
              <Alert severity="info">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Trust Builder Path
                </Typography>
                <Typography variant="body2" mb={1}>
                  <strong>Path:</strong> Eco Starter → Trust Agent
                </Typography>
                <Typography variant="body2" mb={1}>
                  <strong>Requirements:</strong> Maintain quality and dispute-free record
                </Typography>
                <Typography variant="body2">
                  <strong>Description:</strong> Build trust through consistent quality service
                </Typography>
              </Alert>

              <Alert severity="info">
                <Typography variant="body2" fontWeight="600" mb={1}>
                  Growth Champion Path
                </Typography>
                <Typography variant="body2" mb={1}>
                  <strong>Path:</strong> Eco Starter → Green Champion → Community Leader
                </Typography>
                <Typography variant="body2" mb={1}>
                  <strong>Requirements:</strong> Refer active users and build community
                </Typography>
                <Typography variant="body2">
                  <strong>Description:</strong> Grow the Recliq community through referrals
                </Typography>
              </Alert>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Best Practices */}
        <Alert severity="success" sx={{ mt: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            Progression Best Practices
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • Start with achievable early badges to build momentum
            </Typography>
            <Typography variant="body2">
              • Ensure each step provides meaningful progression
            </Typography>
            <Typography variant="body2">
              • Balance difficulty to maintain engagement without frustration
            </Typography>
            <Typography variant="body2">
              • Align progression paths with user behavior patterns
            </Typography>
          </Stack>
        </Alert>
      </CardContent>
    </DashboardCard>
  );
};

export default BadgeEarningFlowProgression;
