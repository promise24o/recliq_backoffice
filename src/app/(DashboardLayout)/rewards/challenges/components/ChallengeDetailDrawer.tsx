'use client';
import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  Typography, 
  Stack, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Chip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
  Alert,
  Slider,
  DatePicker
} from '@mui/material';
import { 
  X, 
  Edit, 
  Save, 
  Play, 
  Pause, 
  Calendar, 
  Copy, 
  Clock, 
  Target,
  Users,
  Zap,
  Award,
  TrendingUp,
  DollarSign,
  ChevronDown
} from 'lucide-react';
import DashboardCard from '@/app/components/shared/DashboardCard';
import type { Challenge, ChallengeCategory, ChallengeStatus, ChallengeScope, ChallengeUserType, ChallengeRewardType, ChallengeWinnerLogic } from '../types';

interface ChallengeDetailDrawerProps {
  challenge: Challenge | null;
  open: boolean;
  onClose: () => void;
  onSave: (challenge: Challenge) => void;
  onActivate: (challenge: Challenge) => void;
  onPause: (challenge: Challenge) => void;
  onEnd: (challenge: Challenge) => void;
  onDuplicate: (challenge: Challenge) => void;
}

const ChallengeDetailDrawer: React.FC<ChallengeDetailDrawerProps> = ({
  challenge,
  open,
  onClose,
  onSave,
  onActivate,
  onPause,
  onEnd,
  onDuplicate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedChallenge, setEditedChallenge] = useState<Challenge | null>(null);

  React.useEffect(() => {
    if (challenge) {
      setEditedChallenge({ ...challenge });
    }
  }, [challenge]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedChallenge) {
      onSave(editedChallenge);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedChallenge(challenge);
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof Challenge, value: any) => {
    if (editedChallenge) {
      setEditedChallenge({ ...editedChallenge, [field]: value });
    }
  };

  const getCategoryLabel = (category: ChallengeCategory): string => {
    switch (category) {
      case 'volume': return 'Volume';
      case 'consistency': return 'Consistency';
      case 'quality': return 'Quality';
      case 'growth': return 'Growth';
      default: return category;
    }
  };

  const getStatusLabel = (status: ChallengeStatus): string => {
    switch (status) {
      case 'active': return 'Active';
      case 'upcoming': return 'Upcoming';
      case 'completed': return 'Completed';
      case 'paused': return 'Paused';
      default: return status;
    }
  };

  const getScopeLabel = (scope: ChallengeScope): string => {
    switch (scope) {
      case 'global': return 'Global';
      case 'city': return 'City';
      case 'zone': return 'Zone';
      default: return scope;
    }
  };

  const getUserTypeLabel = (userType: ChallengeUserType): string => {
    switch (userType) {
      case 'user': return 'Users';
      case 'agent': return 'Agents';
      case 'business': return 'Businesses';
      case 'all': return 'All';
      default: return userType;
    }
  };

  const getRewardTypeLabel = (rewardType: ChallengeRewardType): string => {
    switch (rewardType) {
      case 'points': return 'Points';
      case 'badge': return 'Badge';
      case 'perks': return 'Perks';
      case 'mixed': return 'Mixed';
      default: return rewardType;
    }
  };

  const getWinnerLogicLabel = (logic: ChallengeWinnerLogic): string => {
    switch (logic) {
      case 'all': return 'All Participants';
      case 'top_performers': return 'Top Performers';
      case 'lottery': return 'Lottery';
      default: return logic;
    }
  };

  if (!challenge || !editedChallenge) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 600,
          p: 0
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          p: 3, 
          borderBottom: 1, 
          borderColor: 'divider',
          bgcolor: '#f8fafc'
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight="600">
                {editedChallenge.name}
              </Typography>
              <Stack direction="row" spacing={1} mt={0.5}>
                <Chip
                  label={getCategoryLabel(editedChallenge.category)}
                  size="small"
                  color="primary"
                  sx={{ fontSize: '0.75rem' }}
                />
                <Chip
                  label={getStatusLabel(editedChallenge.status)}
                  size="small"
                  color={editedChallenge.status === 'active' ? 'success' : editedChallenge.status === 'upcoming' ? 'warning' : 'default'}
                  sx={{ fontSize: '0.75rem' }}
                />
                <Chip
                  label={getScopeLabel(editedChallenge.scope)}
                  size="small"
                  color="info"
                  sx={{ fontSize: '0.75rem' }}
                />
              </Stack>
            </Box>

            <Stack direction="row" spacing={1}>
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<X />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <IconButton onClick={handleEdit}>
                    <Edit size={20} />
                  </IconButton>
                  <IconButton onClick={() => onDuplicate(challenge)}>
                    <Copy size={20} />
                  </IconButton>
                </>
              )}
              <IconButton onClick={onClose}>
                <X size={20} />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <Stack spacing={3}>
            {/* Challenge Definition */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Challenge Definition
                </Typography>
                
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Name
                    </Typography>
                    {isEditing ? (
                      <TextField
                        value={editedChallenge.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        fullWidth
                        size="small"
                      />
                    ) : (
                      <Typography variant="body2">
                        {editedChallenge.name}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Description
                    </Typography>
                    {isEditing ? (
                      <TextField
                        value={editedChallenge.description}
                        onChange={(e) => handleFieldChange('description', e.target.value)}
                        multiline
                        rows={3}
                        fullWidth
                        size="small"
                      />
                    ) : (
                      <Typography variant="body2">
                        {editedChallenge.description}
                      </Typography>
                    )}
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Category
                        </Typography>
                        {isEditing ? (
                          <FormControl size="small" fullWidth>
                            <Select
                              value={editedChallenge.category}
                              onChange={(e) => handleFieldChange('category', e.target.value)}
                              fullWidth
                            >
                              <MenuItem value="volume">Volume</MenuItem>
                              <MenuItem value="consistency">Consistency</MenuItem>
                              <MenuItem value="quality">Quality</MenuItem>
                              <MenuItem value="growth">Growth</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <Typography variant="body2">
                            {getCategoryLabel(editedChallenge.category)}
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Status
                        </Typography>
                        {isEditing ? (
                          <FormControl size="small" fullWidth>
                            <Select
                              value={editedChallenge.status}
                              onChange={(e) => handleFieldChange('status', e.target.value)}
                              fullWidth
                            >
                              <MenuItem value="active">Active</MenuItem>
                              <MenuItem value="upcoming">Upcoming</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="paused">Paused</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <Typography variant="body2">
                            {getStatusLabel(editedChallenge.status)}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Target User Type
                        </Typography>
                        {isEditing ? (
                          <FormControl size="small" fullWidth>
                            <Select
                              value={editedChallenge.targetUserType}
                              onChange={(e) => handleFieldChange('targetUserType', e.target.value)}
                              fullWidth
                            >
                              <MenuItem value="user">Users</MenuItem>
                              <MenuItem value="agent">Agents</MenuItem>
                              <MenuItem value="business">Businesses</MenuItem>
                              <MenuItem value="all">All</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <Typography variant="body2">
                            {getUserTypeLabel(editedChallenge.targetUserType)}
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Scope
                        </Typography>
                        {isEditing ? (
                          <FormControl size="small" fullWidth>
                            <Select
                              value={editedChallenge.scope}
                              onChange={(e) => handleFieldChange('scope', e.target.value)}
                              fullWidth
                            >
                              <MenuItem value="global">Global</MenuItem>
                              <MenuItem value="city">City</MenuItem>
                              <MenuItem value="zone">Zone</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <Typography variant="body2">
                            {getScopeLabel(editedChallenge.scope)}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>

                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Target Locations
                    </Typography>
                    {isEditing ? (
                      <TextField
                        value={editedChallenge.targetLocations.join(', ')}
                        onChange={(e) => handleFieldChange('targetLocations', e.target.value.split(', '))}
                        fullWidth
                        size="small"
                        helperText="Separate multiple locations with commas"
                      />
                    ) : (
                      <Typography variant="body2">
                        {editedChallenge.targetLocations.join(', ')}
                      </Typography>
                    )}
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Start Date
                        </Typography>
                        {isEditing ? (
                          <TextField
                            type="datetime-local"
                            value={editedChallenge.startDate.slice(0, 16)}
                            onChange={(e) => handleFieldChange('startDate', e.target.value + ':00:00:00Z')}
                            fullWidth
                            size="small"
                          />
                        ) : (
                          <Typography variant="body2">
                            {new Date(editedChallenge.startDate).toLocaleDateString()}
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          End Date
                        </Typography>
                        {isEditing ? (
                          <TextField
                            type="datetime-local"
                            value={editedChallenge.endDate.slice(0, 16)}
                            onChange={(e) => handleFieldChange('endDate', e.target.value + ':23:59:59Z')}
                            fullWidth
                            size="small"
                          />
                        ) : (
                          <Typography variant="body2">
                            {new Date(editedChallenge.endDate).toLocaleDateString()}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>

            {/* Objective Logic */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Objective Logic
                </Typography>
                
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Objective Type
                    </Typography>
                    <Typography variant="body2">
                      {editedChallenge.objective.type.replace('_', ' ').toUpperCase()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {editedChallenge.objective.description}
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Target Value
                        </Typography>
                        <Typography variant="body2" fontWeight="500">
                          {editedChallenge.objective.value}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Operator
                        </Typography>
                        <Typography variant="body2" fontWeight="500">
                          {editedChallenge.objective.operator === 'greater_than_or_equal' ? '>=' : 
                           editedChallenge.objective.operator === 'greater_than' ? '>' : 
                           editedChallenge.objective.operator === 'less_than' ? '<' : '='}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {editedChallenge.objective.wasteType && (
                    <Box>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Waste Type
                      </Typography>
                      <Typography variant="body2">
                        {editedChallenge.objective.wasteType}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>

            {/* Reward Configuration */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Reward Configuration
                </Typography>
                
                <Stack spacing={2}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Reward Type
                        </Typography>
                        {isEditing ? (
                          <FormControl size="small" fullWidth>
                            <Select
                              value={editedChallenge.reward.type}
                              onChange={(e) => handleFieldChange('reward', { ...editedChallenge.reward, type: e.target.value as ChallengeRewardType })}
                              fullWidth
                            >
                              <MenuItem value="points">Points</MenuItem>
                              <MenuItem value="badge">Badge</MenuItem>
                              <MenuItem value="perks">Perks</MenuItem>
                              <MenuItem value="mixed">Mixed</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <Typography variant="body2">
                            {getRewardTypeLabel(editedChallenge.reward.type)}
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Winner Logic
                        </Typography>
                        {isEditing ? (
                          <FormControl size="small" fullWidth>
                            <Select
                              value={editedChallenge.winnerLogic}
                              onChange={(e) => handleFieldChange('winnerLogic', e.target.value as ChallengeWinnerLogic)}
                              fullWidth
                            >
                              <MenuItem value="all">All Participants</MenuItem>
                              <MenuItem value="top_performers">Top Performers</MenuItem>
                              <MenuItem value="lottery">Lottery</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <Typography variant="body2">
                            {getWinnerLogicLabel(editedChallenge.winnerLogic)}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>

                  {editedChallenge.reward.type === 'points' && (
                    <Box>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Points Awarded
                      </Typography>
                      {isEditing ? (
                        <TextField
                          type="number"
                          value={editedChallenge.reward.pointsAwarded || 0}
                          onChange={(e) => handleFieldChange('reward', { ...editedChallenge.reward, pointsAwarded: parseInt(e.target.value) || 0 })}
                          fullWidth
                          size="small"
                        />
                      ) : (
                        <Typography variant="body2" fontWeight="500">
                          {editedChallenge.reward.pointsAwarded || 0} points
                        </Typography>
                      )}
                    </Box>
                  )}

                  {editedChallenge.reward.type === 'badge' && (
                    <Box>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Badge Unlock
                      </Typography>
                      {isEditing ? (
                        <TextField
                          value={editedChallenge.reward.badgeUnlock || ''}
                          onChange={(e) => handleFieldChange('reward', { ...editedChallenge.reward, badgeUnlock: e.target.value })}
                          fullWidth
                          size="small"
                        />
                      ) : (
                        <Typography variant="body2">
                          {editedChallenge.reward.badgeUnlock || 'No badge'}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Performance Metrics
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Total Participants
                      </Typography>
                      <Typography variant="h6" fontWeight="600">
                        {editedChallenge.metrics.totalParticipants.toLocaleString()}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Active Participants
                      </Typography>
                      <Typography variant="h6" fontWeight="600">
                        {editedChallenge.metrics.activeParticipants.toLocaleString()}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Completion Rate
                      </Typography>
                      <Typography variant="h6" fontWeight="600" color="#10b981">
                        {editedChallenge.metrics.completionRate.toFixed(1)}%
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Average Progress
                      </Typography>
                      <Typography variant="h6" fontWeight="600">
                        {editedChallenge.metrics.averageProgress.toFixed(1)}/{editedChallenge.objective.value}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Total Rewards Issued
                      </Typography>
                      <Typography variant="h6" fontWeight="600">
                        {editedChallenge.metrics.totalRewardsIssued.toLocaleString()}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Reward Exposure
                      </Typography>
                      <Typography variant="h6" fontWeight="600">
                        ₦{(editedChallenge.metrics.rewardExposure / 1000000).toFixed(1)}M
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Audit Trail */}
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDown />}>
                <Typography variant="h6">Audit Trail</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {editedChallenge.auditTrail.map((entry) => (
                    <Box key={entry.id} sx={{ 
                      p: 2, 
                      bgcolor: '#f8fafc', 
                      borderRadius: 2,
                      border: '1px solid #e2e8f0'
                    }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="body2" fontWeight="500">
                            {entry.action.toUpperCase()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            by {entry.performedBy}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString()}
                          </Typography>
                        </Box>
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {entry.details}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Box>

        {/* Actions */}
        <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
          <Stack direction="row" spacing={2}>
            {editedChallenge.status === 'active' ? (
              <Button
                variant="outlined"
                startIcon={<Pause />}
                onClick={() => onPause(challenge)}
                sx={{ color: '#f59e0b', borderColor: '#f59e0b' }}
              >
                Pause Challenge
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<Play />}
                onClick={() => onActivate(challenge)}
                disabled={editedChallenge.status === 'completed'}
              >
                Activate Challenge
              </Button>
            )}
            
            <Button
              variant="outlined"
              startIcon={<Calendar />}
              onClick={() => onEnd(challenge)}
              sx={{ color: '#6b7280', borderColor: '#6b7280' }}
            >
              End Challenge
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Copy />}
              onClick={() => onDuplicate(challenge)}
            >
              Duplicate
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ChallengeDetailDrawer;
