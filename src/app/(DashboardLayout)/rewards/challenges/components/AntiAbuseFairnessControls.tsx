'use client';
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Stack, Button, Alert, Accordion, AccordionSummary, AccordionDetails, Grid, Switch, FormControlLabel, TextField, Chip, IconButton } from '@mui/material';
import { 
  Shield, 
  AlertTriangle, 
  Settings, 
  Plus, 
  Trash2, 
  ChevronDown,
  CheckCircle,
  Clock,
  Users,
  Lock,
  Zap
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { Challenge } from '../types';

interface AntiAbuseFairnessControlsProps {
  challenges: Challenge[];
  onUpdateControl: (id: string, control: any) => void;
  onAddControl: (control: any) => void;
  onDeleteControl: (id: string) => void;
}

const AntiAbuseFairnessControls: React.FC<AntiAbuseFairnessControlsProps> = ({
  challenges,
  onUpdateControl,
  onAddControl,
  onDeleteControl
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const activeChallenges = challenges.filter(c => c.status === 'active');
  const totalControls = activeChallenges.reduce((acc, challenge) => {
    return acc + Object.keys(challenge.safeguards).length;
  }, 0);

  const getControlIcon = (controlType: string): React.ReactNode => {
    switch (controlType) {
      case 'participationCaps': return <Users size={16} />;
      case 'dailyLimits': return <Clock size={16} />;
      case 'antiGaming': return <Shield size={16} />;
      case 'conflictHandling': return <Settings size={16} />;
      default: return <Lock size={16} />;
    }
  };

  const getControlStatus = (control: any): boolean => {
    if (typeof control === 'object' && control !== null) {
      // Check if any safeguard is active
      return Object.values(control).some((value: any) => {
        if (typeof value === 'object' && value !== null) {
          return Object.values(value).some((subValue: any) => 
            typeof subValue === 'boolean' ? subValue : subValue > 0
          );
        }
        return typeof value === 'boolean' ? value : value > 0;
      });
    }
    return false;
  };

  return (
    <DashboardCard title="Anti-Abuse & Fairness Controls">
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            🛡️ Safeguards • Verification thresholds • Dispute-free requirements • Fraud exclusion rules
          </Typography>
        </Box>

        {/* Summary */}
        <Grid container spacing={2} mb={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ bgcolor: '#f8fafc' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: '#10b98115',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Shield size={24} color="#10b981" />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="h6" fontWeight="600">
                      {totalControls}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Controls
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ bgcolor: '#f8fafc' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: '#3b82f615',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <CheckCircle size={24} color="#3b82f6" />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="h6" fontWeight="600">
                      {activeChallenges.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Challenges
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Controls Overview */}
        <Stack spacing={2}>
          {activeChallenges.map((challenge) => (
            <Card key={challenge.id} sx={{ border: '1px solid #e2e8f0' }}>
              <CardContent>
                <Stack spacing={2}>
                  {/* Challenge Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight="600">
                        {challenge.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)} Challenge
                      </Typography>
                    </Box>
                    <Chip
                      label={challenge.status.toUpperCase()}
                      size="small"
                      color="success"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </Stack>

                  {/* Safeguards */}
                  <Stack spacing={2}>
                    <Typography variant="body2" fontWeight="600">
                      Safeguards Configuration
                    </Typography>
                    
                    {/* Participation Caps */}
                    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center">
                          {getControlIcon('participationCaps')}
                          <Typography variant="body2" fontWeight="500">
                            Participation Caps
                          </Typography>
                        </Stack>
                        <Switch
                          checked={getControlStatus(challenge.safeguards.participationCaps)}
                          onChange={(e) => onUpdateControl(challenge.id, {
                            ...challenge.safeguards.participationCaps,
                            maxParticipants: e.target.checked ? 1000 : null
                          })}
                        />
                      </Stack>
                      
                      {challenge.safeguards.participationCaps && (
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                              label="Max Participants"
                              type="number"
                              value={challenge.safeguards.participationCaps.maxParticipants || ''}
                              onChange={(e) => onUpdateControl(challenge.id, {
                                ...challenge.safeguards.participationCaps,
                                maxParticipants: parseInt(e.target.value) || null
                              })}
                              size="small"
                              fullWidth
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                              label="Max Per User"
                              type="number"
                              value={challenge.safeguards.participationCaps.maxPerUser || ''}
                              onChange={(e) => onUpdateControl(challenge.id, {
                                ...challenge.safeguards.participationCaps,
                                maxPerUser: parseInt(e.target.value) || null
                              })}
                              size="small"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Box>

                    {/* Daily Limits */}
                    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center">
                          {getControlIcon('dailyLimits')}
                          <Typography variant="body2" fontWeight="500">
                            Daily Limits
                          </Typography>
                        </Stack>
                        <Switch
                          checked={getControlStatus(challenge.safeguards.dailyLimits)}
                          onChange={(e) => onUpdateControl(challenge.id, {
                            ...challenge.safeguards.dailyLimits,
                            maxProgressPerDay: e.target.checked ? 5 : null
                          })}
                        />
                      </Stack>
                      
                      {challenge.safeguards.dailyLimits && (
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                              label="Max Progress Per Day"
                              type="number"
                              value={challenge.safeguards.dailyLimits.maxProgressPerDay || ''}
                              onChange={(e) => onUpdateControl(challenge.id, {
                                ...challenge.safeguards.dailyLimits,
                                maxProgressPerDay: parseInt(e.target.value) || null
                              })}
                              size="small"
                              fullWidth
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                              label="Max Reward Per Day"
                              type="number"
                              value={challenge.safeguards.dailyLimits.maxRewardPerDay || ''}
                              onChange={(e) => onUpdateControl(challenge.id, {
                                ...challenge.safeguards.dailyLimits,
                                maxRewardPerDay: parseInt(e.target.value) || null
                              })}
                              size="small"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Box>

                    {/* Anti-Gaming */}
                    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center">
                          {getControlIcon('antiGaming')}
                          <Typography variant="body2" fontWeight="500">
                            Anti-Gaming Rules
                          </Typography>
                        </Stack>
                        <Switch
                          checked={getControlStatus(challenge.safeguards.antiGaming)}
                          onChange={(e) => onUpdateControl(challenge.id, {
                            ...challenge.safeguards.antiGaming,
                            verifiedActionRequired: e.target.checked
                          })}
                        />
                      </Stack>
                      
                      {challenge.safeguards.antiGaming && (
                        <Stack spacing={2} sx={{ mt: 2 }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={challenge.safeguards.antiGaming.verifiedActionRequired}
                                onChange={(e) => onUpdateControl(challenge.id, {
                                  ...challenge.safeguards.antiGaming,
                                  verifiedActionRequired: e.target.checked
                                })}
                              />
                            }
                            label="Verified Action Required"
                          />
                          
                          <FormControlLabel
                            control={
                              <Switch
                                checked={challenge.safeguards.antiGaming.disputeFreeEligibility}
                                onChange={(e) => onUpdateControl(challenge.id, {
                                  ...challenge.safeguards.antiGaming,
                                  disputeFreeEligibility: e.target.checked
                                })}
                              />
                            }
                            label="Dispute-Free Eligibility"
                          />
                          
                          <FormControlLabel
                            control={
                              <Switch
                                checked={challenge.safeguards.antiGaming.fraudExclusion}
                                onChange={(e) => onUpdateControl(challenge.id, {
                                  ...challenge.safeguards.antiGaming,
                                  fraudExclusion: e.target.checked
                                })}
                              />
                            }
                            label="Fraud Exclusion"
                          />
                          
                          <TextField
                            label="Cool-Down Between Challenges (hours)"
                            type="number"
                            value={challenge.safeguards.antiGaming.coolDownBetweenChallenges || ''}
                            onChange={(e) => onUpdateControl(challenge.id, {
                              ...challenge.safeguards.antiGaming,
                              coolDownBetweenChallenges: parseInt(e.target.value) || 0
                            })}
                            size="small"
                            fullWidth
                          />
                        </Stack>
                      )}
                    </Box>

                    {/* Conflict Handling */}
                    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center">
                          {getControlIcon('conflictHandling')}
                          <Typography variant="body2" fontWeight="500">
                            Conflict Handling
                          </Typography>
                        </Stack>
                        <Switch
                          checked={getControlStatus(challenge.safeguards.conflictHandling)}
                          onChange={(e) => onUpdateControl(challenge.id, {
                            ...challenge.safeguards.conflictHandling,
                            preventConflictingChallenges: e.target.checked
                          })}
                        />
                      </Stack>
                      
                      {challenge.safeguards.conflictHandling && (
                        <Stack spacing={2} sx={{ mt: 2 }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={challenge.safeguards.conflictHandling.preventConflictingChallenges}
                                onChange={(e) => onUpdateControl(challenge.id, {
                                  ...challenge.safeguards.conflictHandling,
                                  preventConflictingChallenges: e.target.checked
                                })}
                              />
                            }
                            label="Prevent Conflicting Challenges"
                          />
                          
                          <TextField
                            label="Priority Level"
                            type="number"
                            value={challenge.safeguards.conflictHandling.priorityLevel || ''}
                            onChange={(e) => onUpdateControl(challenge.id, {
                              ...challenge.safeguards.conflictHandling,
                              priorityLevel: parseInt(e.target.value) || 0
                            })}
                            size="small"
                            fullWidth
                          />
                        </Stack>
                      )}
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Summary */}
        <Alert severity="success" sx={{ mt: 3 }}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            System Health Status
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {totalControls} anti-abuse controls are active across {activeChallenges.length} challenges
            </Typography>
            <Typography variant="body2">
              • All fraud prevention measures are operational
            </Typography>
            <Typography variant="body2">
              • Challenge dilution protections are in place
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

export default AntiAbuseFairnessControls;
