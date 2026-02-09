'use client'
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Drawer, 
  Stack, 
  Chip, 
  Avatar, 
  Divider,
  IconButton,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { 
  X, 
  Coins, 
  Settings, 
  Play, 
  Pause, 
  Copy, 
  Calendar,
  MapPin,
  Users,
  Zap,
  Shield,
  Target,
  ChevronDown,
  Save,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import type { PointsRule } from '../types';

interface RuleDetailDrawerProps {
  rule: PointsRule | null;
  open: boolean;
  onClose: () => void;
  onSave: (rule: PointsRule) => void;
  onActivate: (rule: PointsRule) => void;
  onPause: (rule: PointsRule) => void;
  onDuplicate: (rule: PointsRule) => void;
  onSchedule: (rule: PointsRule) => void;
  onRetire: (rule: PointsRule) => void;
}

const RuleDetailDrawer: React.FC<RuleDetailDrawerProps> = ({
  rule,
  open,
  onClose,
  onSave,
  onActivate,
  onPause,
  onDuplicate,
  onSchedule,
  onRetire
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRule, setEditedRule] = useState<PointsRule | null>(null);

  if (!rule) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'scheduled':
        return 'info';
      case 'retired':
        return 'default';
      default:
        return 'default';
    }
  };

  const getTriggerActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      'completed_pickup': 'Completed Pickup',
      'completed_dropoff': 'Completed Drop-off',
      'kg_recycled': 'Kg Recycled',
      'daily_streak': 'Daily Streak',
      'weekly_streak': 'Weekly Streak',
      'referral_completion': 'Referral Completion',
      'high_quality_waste': 'High Quality Waste',
      'peak_hour_recycling': 'Peak Hour Recycling',
      'first_pickup': 'First Pickup',
      'milestone_achievement': 'Milestone Achievement',
      'campaign_participation': 'Campaign Participation'
    };
    return labels[action] || action;
  };

  const handleSave = () => {
    if (editedRule) {
      onSave(editedRule);
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setEditedRule({ ...rule });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedRule(null);
    setIsEditing(false);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 900,
          p: 0
        }
      }}
    >
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: '#3b82f6' }}>
                <Coins size={24} color="white" />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="600">
                  {isEditing ? (
                    <TextField
                      value={editedRule?.name || rule.name}
                      onChange={(e) => setEditedRule(prev => prev ? { ...prev, name: e.target.value } : null)}
                      size="small"
                      variant="outlined"
                    />
                  ) : (
                    rule.name
                  )}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={rule.status.toUpperCase()}
                    size="small"
                    color={getStatusColor(rule.status) as any}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {rule.id}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                    disabled={!editedRule}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<Settings />}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
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
            {/* Rule Definition */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Rule Definition</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Target size={20} color="#6b7280" />
                        <Box flex={1}>
                          <Typography variant="body2" fontWeight="500">Trigger Action</Typography>
                          {isEditing ? (
                            <Select
                              value={editedRule?.triggerAction || rule.triggerAction}
                              onChange={(e) => setEditedRule(prev => prev ? { ...prev, triggerAction: e.target.value as any } : null)}
                              fullWidth
                              size="small"
                            >
                              <MenuItem value="completed_pickup">Completed Pickup</MenuItem>
                              <MenuItem value="completed_dropoff">Completed Drop-off</MenuItem>
                              <MenuItem value="kg_recycled">Kg Recycled</MenuItem>
                              <MenuItem value="daily_streak">Daily Streak</MenuItem>
                              <MenuItem value="weekly_streak">Weekly Streak</MenuItem>
                              <MenuItem value="referral_completion">Referral Completion</MenuItem>
                              <MenuItem value="high_quality_waste">High Quality Waste</MenuItem>
                              <MenuItem value="peak_hour_recycling">Peak Hour Recycling</MenuItem>
                            </Select>
                          ) : (
                            <Typography variant="body2">{getTriggerActionLabel(rule.triggerAction)}</Typography>
                          )}
                        </Box>
                      </Stack>
                      
                      <Stack direction="row" spacing={2}>
                        <Users size={20} color="#6b7280" />
                        <Box flex={1}>
                          <Typography variant="body2" fontWeight="500">Eligible User Types</Typography>
                          <Stack direction="row" spacing={1} mt={0.5}>
                            {(isEditing ? editedRule?.eligibleUserTypes : rule.eligibleUserTypes)?.map((type, index) => (
                              <Chip
                                key={index}
                                label={type.charAt(0).toUpperCase() + type.slice(1)}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Stack>
                        </Box>
                      </Stack>
                      
                      <Stack direction="row" spacing={2}>
                        <MapPin size={20} color="#6b7280" />
                        <Box flex={1}>
                          <Typography variant="body2" fontWeight="500">Scope</Typography>
                          <Typography variant="body2">
                            {rule.scope.type === 'global' ? 'Global' : 
                             rule.scope.type === 'city' ? `Cities: ${rule.scope.locations?.join(', ')}` :
                             rule.scope.type === 'campaign' ? 'Campaign' : 'Zone'}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Clock size={20} color="#6b7280" />
                        <Box flex={1}>
                          <Typography variant="body2" fontWeight="500">Created</Typography>
                          <Typography variant="body2">{new Date(rule.createdAt).toLocaleString()}</Typography>
                          <Typography variant="caption" color="text.secondary">by {rule.createdBy}</Typography>
                        </Box>
                      </Stack>
                      
                      <Stack direction="row" spacing={2}>
                        <Clock size={20} color="#6b7280" />
                        <Box flex={1}>
                          <Typography variant="body2" fontWeight="500">Last Modified</Typography>
                          <Typography variant="body2">{new Date(rule.lastModified).toLocaleString()}</Typography>
                          <Typography variant="caption" color="text.secondary">by {rule.modifiedBy}</Typography>
                        </Box>
                      </Stack>
                      
                      <Stack direction="row" spacing={2}>
                        <AlertTriangle size={20} color="#6b7280" />
                        <Box flex={1}>
                          <Typography variant="body2" fontWeight="500">Status</Typography>
                          <Chip
                            label={rule.status.toUpperCase()}
                            size="small"
                            color={getStatusColor(rule.status) as any}
                          />
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Points Logic */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Points Logic</Typography>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Coins size={20} color="#6b7280" />
                    <Typography variant="body2" fontWeight="500">Base Points</Typography>
                    {isEditing ? (
                      <TextField
                        type="number"
                        value={editedRule?.pointsLogic.basePoints || rule.pointsLogic.basePoints}
                        onChange={(e) => setEditedRule(prev => prev ? {
                          ...prev,
                          pointsLogic: { ...prev.pointsLogic, basePoints: parseInt(e.target.value) || 0 }
                        } : null)}
                        size="small"
                        sx={{ width: 100 }}
                      />
                    ) : (
                      <Typography variant="body2">{rule.pointsLogic.basePoints}</Typography>
                    )}
                  </Stack>
                  
                  {rule.pointsLogic.weightBasedScaling && (
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Zap size={20} color="#6b7280" />
                      <Typography variant="body2" fontWeight="500">Weight Scaling</Typography>
                      <Typography variant="body2">
                        {rule.pointsLogic.weightBasedScaling.pointsPerKg} points/kg 
                        ({rule.pointsLogic.weightBasedScaling.minWeight}-{rule.pointsLogic.weightBasedScaling.maxWeight}kg)
                      </Typography>
                    </Stack>
                  )}
                  
                  <Box>
                    <Typography variant="body2" fontWeight="500" mb={1}>Multipliers</Typography>
                    <Stack spacing={1}>
                      {rule.pointsLogic.multipliers.map((multiplier, index) => (
                        <Stack key={index} direction="row" spacing={2} alignItems="center">
                          <Chip
                            label={`${multiplier.type}`}
                            size="small"
                            sx={{ bgcolor: '#f59e0b15', color: '#f59e0b' }}
                          />
                          <Typography variant="body2">×{multiplier.value}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {multiplier.conditions.join(', ')}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="500" mb={1}>Conditional Bonuses</Typography>
                    <Stack spacing={1}>
                      {rule.pointsLogic.conditionalBonuses.map((bonus, index) => (
                        <Stack key={index} direction="row" spacing={2} alignItems="center">
                          <Chip
                            label={`+${bonus.bonusPoints}`}
                            size="small"
                            sx={{ bgcolor: '#10b98115', color: '#10b981' }}
                          />
                          <Typography variant="body2">{bonus.condition}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Safeguards */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Safeguards</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">Daily Cap</Typography>
                        <Typography variant="body2" fontWeight="500">{rule.safeguards.dailyCap}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">Weekly Cap</Typography>
                        <Typography variant="body2" fontWeight="500">{rule.safeguards.weeklyCap}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">Per User Limit</Typography>
                        <Typography variant="body2" fontWeight="500">{rule.safeguards.perUserLimit}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">Per Kg Limit</Typography>
                        <Typography variant="body2" fontWeight="500">{rule.safeguards.perKgLimit}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">Drop-off Frequency Cap</Typography>
                        <Typography variant="body2" fontWeight="500">{rule.safeguards.dropoffFrequencyCap}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">Referral Fraud Throttle</Typography>
                        <Typography variant="body2" fontWeight="500">{rule.safeguards.referralFraudThrottle}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
                
                <Box mt={2}>
                  <Typography variant="body2" fontWeight="500" mb={1}>Anti-Gaming Constraints</Typography>
                  <List dense>
                    {rule.safeguards.antiGamingConstraints.map((constraint, index) => (
                      <ListItem key={index} sx={{ pl: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Shield size={16} color="#ef4444" />
                        </ListItemIcon>
                        <ListItemText primary={constraint} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </CardContent>
            </Card>

            {/* Visibility */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Visibility</Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight="500">User-Facing Copy</Typography>
                    <Typography variant="body2">{rule.visibility.userFacingCopy}</Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="500">In-App Explanation</Typography>
                    <Typography variant="body2">{rule.visibility.inAppExplanation}</Typography>
                  </Box>
                  
                  <Stack direction="row" spacing={2}>
                    <FormControlLabel
                      control={<Switch checked={rule.visibility.showInHistory} />}
                      label="Show in History"
                    />
                    <FormControlLabel
                      control={<Switch checked={rule.visibility.showInLeaderboard} />}
                      label="Show in Leaderboard"
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Audit Trail */}
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Audit Trail</Typography>
                <List>
                  {rule.auditTrail.map((entry, index) => (
                    <ListItem key={index} sx={{ pl: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {entry.action === 'created' ? (
                          <CheckCircle size={16} color="#10b981" />
                        ) : entry.action === 'modified' ? (
                          <Settings size={16} color="#3b82f6" />
                        ) : (
                          <Clock size={16} color="#6b7280" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={`${entry.action.charAt(0).toUpperCase() + entry.action.slice(1)} by ${entry.performedBy}`}
                        secondary={`${new Date(entry.timestamp).toLocaleString()} - ${entry.details}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Stack>
        </Box>

        {/* Actions */}
        <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {rule.status === 'paused' && (
              <Button
                variant="contained"
                color="success"
                startIcon={<Play />}
                onClick={() => onActivate(rule)}
              >
                Activate Rule
              </Button>
            )}
            
            {rule.status === 'active' && (
              <Button
                variant="contained"
                color="warning"
                startIcon={<Pause />}
                onClick={() => onPause(rule)}
              >
                Pause Rule
              </Button>
            )}
            
            <Button
              variant="outlined"
              startIcon={<Copy />}
              onClick={() => onDuplicate(rule)}
            >
              Duplicate Rule
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Calendar />}
              onClick={() => onSchedule(rule)}
            >
              Schedule Rule
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              startIcon={<Shield />}
              onClick={() => onRetire(rule)}
            >
              Retire Rule
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default RuleDetailDrawer;
